import {Resend} from 'resend'

export interface LeadPayload {
  name: string
  company: string
  phone: string
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(apiKey)
}

function formatSubmittedAt(date: Date): string {
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

  const text = [
    'Novo lead — LP Vendas Perfecting',
    '',
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `WhatsApp: ${lead.phone}`,
    `Enviado em: ${submittedAt}`,
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
    `.trim(),
  })

  if (error) throw new Error(error.message)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
