export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '4548204188778795'

const MIN_PHONE_DIGITS = 10

export function isLeadFormComplete(
  name: string,
  company: string,
  phone: string,
): boolean {
  if (!name.trim() || !company.trim()) return false
  return phone.replace(/\D/g, '').length >= MIN_PHONE_DIGITS
}

export function trackLead(): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', 'Lead')
}
