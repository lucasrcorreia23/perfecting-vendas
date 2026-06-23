import type {LeadPayload} from '@/lib/email'

/**
 * Envia o lead para a planilha do Google via Web App do Apps Script.
 * É best-effort: lança erro em caso de falha, mas o chamador deve tratar
 * isso sem derrubar o fluxo principal (e-mail de notificação).
 */
export async function appendLeadToSheet(
  lead: LeadPayload,
  submittedAt: string,
): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL
  if (!url) throw new Error('SHEETS_WEBHOOK_URL is not configured')

  const {utm} = lead
  const payload = {
    submittedAt,
    name: lead.name,
    company: lead.company,
    phone: lead.phone,
    utmSource: utm?.source ?? '',
    utmMedium: utm?.medium ?? '',
    utmCampaign: utm?.campaign ?? '',
    utmTerm: utm?.term ?? '',
    utmContent: utm?.content ?? '',
    referrer: utm?.referrer ?? '',
    landingPath: utm?.landingPath ?? '',
  }

  // O Web App do Apps Script executa o doPost() já na chamada ao /exec e
  // responde com um 302 para googleusercontent.com. A gravação acontece
  // ANTES do redirect, então um 3xx já significa sucesso — não seguimos o
  // redirect (a página de resultado às vezes falha para acesso anônimo).
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
    redirect: 'manual',
  })

  // 2xx = resposta direta; 3xx = redirect após execução bem-sucedida.
  if (response.status >= 400) {
    throw new Error(`Sheets webhook responded with ${response.status}`)
  }
}
