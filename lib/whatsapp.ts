// Número de destino dos leads — +55 (48) 99924-7580
export const WHATSAPP_NUMBER = '5548999247580'

export interface WhatsAppLead {
  name?: string
  company?: string
  phone?: string
}

/**
 * Monta o deeplink wa.me com a mensagem pré-preenchida.
 * Usado tanto pelo form do modal quanto pelo atalho "falar agora".
 */
export function buildWhatsAppUrl(lead: WhatsAppLead = {}): string {
  const {name, company} = lead
  let message: string

  if (name && company) {
    message = `Olá! Sou ${name} da ${company}. Quero agendar uma demonstração da Perfecting.`
  } else if (name) {
    message = `Olá! Sou ${name}. Quero agendar uma demonstração da Perfecting.`
  } else {
    message = 'Olá! Quero agendar uma demonstração da Perfecting.'
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
