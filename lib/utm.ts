export interface UtmParams {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  referrer?: string
  landingPath?: string
}

const STORAGE_KEY = 'lp_utm'
const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const

/**
 * Captura os parâmetros UTM da URL na primeira visita e os persiste em
 * sessionStorage, para que sobrevivam à navegação dentro da página.
 * Retorna os dados de origem para enviar junto com o lead.
 */
export function getUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {}

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as UtmParams
  } catch {
    // sessionStorage indisponível — segue lendo da URL
  }

  const params = new URLSearchParams(window.location.search)
  const utm: UtmParams = {}

  for (const key of UTM_KEYS) {
    const value = params.get(`utm_${key}`)
    if (value) utm[key] = value
  }

  utm.landingPath = window.location.pathname
  if (document.referrer) utm.referrer = document.referrer

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm))
  } catch {
    // ignore
  }

  return utm
}
