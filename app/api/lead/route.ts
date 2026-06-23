import {NextResponse} from 'next/server'

import {formatSubmittedAt, sendLeadNotification} from '@/lib/email'
import {isLeadFormComplete} from '@/lib/meta-pixel'
import {appendLeadToSheet} from '@/lib/sheets'
import type {UtmParams} from '@/lib/utm'

const UTM_FIELDS = [
  'source',
  'medium',
  'campaign',
  'term',
  'content',
  'referrer',
  'landingPath',
] as const

function sanitizeUtm(value: unknown): UtmParams | undefined {
  if (!value || typeof value !== 'object') return undefined
  const input = value as Record<string, unknown>
  const utm: UtmParams = {}
  for (const field of UTM_FIELDS) {
    const raw = input[field]
    if (typeof raw === 'string' && raw.trim()) {
      utm[field] = raw.trim().slice(0, 500)
    }
  }
  return Object.keys(utm).length > 0 ? utm : undefined
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({error: 'Invalid JSON'}, {status: 400})
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({error: 'Invalid payload'}, {status: 400})
  }

  const {name, company, phone, utm} = body as Record<string, unknown>

  if (
    typeof name !== 'string' ||
    typeof company !== 'string' ||
    typeof phone !== 'string' ||
    !isLeadFormComplete(name, company, phone)
  ) {
    return NextResponse.json({error: 'Invalid lead data'}, {status: 400})
  }

  const lead = {
    name: name.trim(),
    company: company.trim(),
    phone: phone.trim(),
    utm: sanitizeUtm(utm),
  }
  const submittedAt = formatSubmittedAt(new Date())

  // A planilha é best-effort: não deve impedir a notificação por e-mail.
  if (process.env.SHEETS_WEBHOOK_URL) {
    void appendLeadToSheet(lead, submittedAt).catch((error) => {
      console.error('[api/lead] sheets', error)
    })
  }

  try {
    await sendLeadNotification(lead)
    return NextResponse.json({ok: true})
  } catch (error) {
    console.error('[api/lead]', error)
    const message =
      error instanceof Error ? error.message : 'Failed to send notification'
    const isDev = process.env.NODE_ENV === 'development'
    return NextResponse.json(
      {error: isDev ? message : 'Failed to send notification'},
      {status: 500},
    )
  }
}
