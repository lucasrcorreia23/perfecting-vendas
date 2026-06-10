'use client'

import {useEffect, useRef, useState} from 'react'
import CtaButton from '@/components/ui/CtaButton'

/**
 * Header fixo = AnnouncementBar (bloco 0) + Navbar.
 * Renderizado FORA do #smooth-content para não ser transformado pelo ScrollSmoother.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // direção: descendo além de 80px esconde a navbar; subindo (ou perto do topo) mostra
      if (y < 80) {
        setNavHidden(false)
      } else if (y > lastY.current + 4) {
        setNavHidden(true)
      } else if (y < lastY.current - 4) {
        setNavHidden(false)
      }
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Bloco 0 — announcement bar (gradiente azul da marca).
          z-20 + relative para a navbar deslizar PARA TRÁS dela ao esconder. */}
      <div className="relative z-20 bg-[linear-gradient(90deg,#14306b_0%,#1c4088_55%,#2e63cd_100%)] text-white">
        <div className="container flex h-9 items-center justify-center gap-2 text-center text-[11px] font-medium tracking-wide sm:text-xs">
          <span className="font-semibold">Perfecting</span>
          <span className="text-white/40">•</span>
          <span className="text-white/85">Plataforma de Execução Comercial com IA</span>
          <span className="hidden text-white/40 sm:inline">•</span>
          <span className="hidden text-white/85 sm:inline">100% Remoto</span>
        </div>
      </div>

      {/* Navbar — esconde ao descer (desliza atrás da barra de anúncio), reaparece ao subir */}
      <div
        className={`relative z-10 transition-all duration-300 ${navHidden ? '-translate-y-full' : 'translate-y-0'} ${
          scrolled
            ? 'border-b border-black/8 bg-parchment/85 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <a
            href="#top"
            className="col-start-1 justify-self-start text-xl font-black tracking-tight leading-none"
          >
            <span className="text-primary">Perfecting</span>
          </a>

          <nav className="col-start-2 hidden items-center justify-self-center gap-1 md:flex">
            {[
              {label: 'Para quem', href: '#para-quem'},
              {label: 'A plataforma', href: '#plataforma'},
              {label: 'Como funciona', href: '#etapas'},
              {label: 'FAQ', href: '#faq'},
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-parchment-text/70 transition-colors hover:bg-parchment-dark hover:text-parchment-text"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <CtaButton className="col-start-3 !h-10 !px-3 !text-[13px] justify-self-end whitespace-nowrap sm:!px-5 sm:!text-sm">
            Agendar demonstração
          </CtaButton>
        </div>
      </div>
    </header>
  )
}
