import {NextResponse} from 'next/server'

import {sendLeadNotification} from '@/lib/email'
import {isLeadFormComplete} from '@/lib/meta-pixel'

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

  const {name, company, phone} = body as Record<string, unknown>

  if (
    typeof name !== 'string' ||
    typeof company !== 'string' ||
    typeof phone !== 'string' ||
    !isLeadFormComplete(name, company, phone)
  ) {
    return NextResponse.json({error: 'Invalid lead data'}, {status: 400})
  }

  try {
    await sendLeadNotification({
      name: name.trim(),
      company: company.trim(),
      phone: phone.trim(),
    })
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
