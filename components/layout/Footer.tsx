import {buildWhatsAppUrl} from '@/lib/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="relative mt-6 overflow-hidden rounded-t-2xl"
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 50% 120%, rgba(217,226,244,1) 0%, rgba(163,188,238,1) 50%, rgba(109,150,232,1) 100%)',
      }}
    >
      <div className="container flex flex-col gap-8 py-12 md:py-14">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-2xl font-black tracking-tight text-white">Perfecting</div>
            <p className="mt-1 max-w-sm text-sm text-white/80">
              Plataforma de Execução Comercial com IA. 100% remoto.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-black/10 bg-white px-6 text-sm font-semibold text-parchment-text shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-white/95"
          >
            Falar no WhatsApp
          </a>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/25 pt-6 text-sm text-white/75 md:flex-row md:items-center">
          <span>© {year} Perfecting. Todos os direitos reservados.</span>
          <span>Feito para times comerciais que querem vender mais.</span>
        </div>
      </div>
    </footer>
  )
}
