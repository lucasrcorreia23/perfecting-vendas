import {Resend} from 'resend'

import type {UtmParams} from '@/lib/utm'

export interface LeadPayload {
  name: string
  company: string
  phone: string
  utm?: UtmParams
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(apiKey)
}

export function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date)
}

export async function sendLeadNotification(lead: LeadPayload): Promise<void> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL || 'lucas@perfecting.com.br'
  const from = process.env.RESEND_FROM_EMAIL || 'LP Vendas <leads@perfecting.com.br>'
  const resend = getResendClient()
  const submittedAt = formatSubmittedAt(new Date())

  const origin = formatOrigin(lead.utm)

  const text = [
    'Novo lead — LP Vendas Perfecting',
    '',
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `WhatsApp: ${lead.phone}`,
    `Enviado em: ${submittedAt}`,
    `Origem: ${origin.text}`,
  ].join('\n')

  const {error} = await resend.emails.send({
    from,
    to,
    subject: `Novo lead LP — ${lead.name} (${lead.company})`,
    text,
    html: `
      <h2>Novo lead — LP Vendas Perfecting</h2>
      <p><strong>Nome:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(lead.company)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(lead.phone)}</p>
      <p><strong>Enviado em:</strong> ${escapeHtml(submittedAt)}</p>
      <p><strong>Origem:</strong> ${escapeHtml(origin.text)}</p>
    `.trim(),
  })

  if (error) throw new Error(error.message)
}

function formatOrigin(utm?: UtmParams): {text: string} {
  if (!utm) return {text: 'direto / não informado'}

  const parts: string[] = []
  if (utm.source) parts.push(`source: ${utm.source}`)
  if (utm.medium) parts.push(`medium: ${utm.medium}`)
  if (utm.campaign) parts.push(`campaign: ${utm.campaign}`)
  if (utm.term) parts.push(`term: ${utm.term}`)
  if (utm.content) parts.push(`content: ${utm.content}`)

  if (parts.length === 0) {
    const fallback = utm.referrer || utm.landingPath
    return {text: fallback ? `direto (${fallback})` : 'direto / não informado'}
  }

  return {text: parts.join(' · ')}
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
