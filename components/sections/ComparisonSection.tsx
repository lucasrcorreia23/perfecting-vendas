'use client'

import {useRef} from 'react'
import {gsap, useGSAP} from '@/lib/gsap'
import SectionLabel from '@/components/ui/SectionLabel'

// Seção 3 — par ❌ (sem prática) / ✅ (com Perfecting).
// NOTE: o 1º item veio corrompido na copy original; reconstruído como par coerente.
const pairs = [
  {
    bad: 'Vendedor aprende no cliente real, queimando leads',
    good: 'Vendedor pratica antes. Chega mais rápido ao resultado',
  },
  {
    bad: 'Gestor sobrecarregado com coaching manual',
    good: 'Gestor tem dados e atua onde realmente gera receita',
  },
  {
    bad: 'Execução inconsistente entre os reps',
    good: 'Padrão de execução replicável para o time todo',
  },
  {
    bad: 'Você não sabe por que a conversão caiu',
    good: 'Você enxerga exatamente onde a execução perdeu força',
  },
  {
    bad: 'Ramp-up de meses. Receita esperando.',
    good: '2× mais rápido para o vendedor chegar ao ritmo certo',
  },
  {
    bad: 'Cada vendedor evolui (ou não) por conta própria',
    good: 'Feedback estruturado após cada sessão de prática',
  },
]

export default function ComparisonSection() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: pin + reveal sequencial (scrub)
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]', root.current!)
        gsap.set(rows, {opacity: 0.18, y: 14})

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: `+=${rows.length * 220}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        rows.forEach((row) => {
          tl.to(row, {opacity: 1, y: 0, duration: 1, ease: 'power2.out'})
            .to(row.querySelector('[data-good]'), {'--lit': 1, duration: 0.6}, '<')
        })
        // O cleanup do useGSAP + mm.revert() já remove os triggers desta media query.
        // (Antes havia um ScrollTrigger.getAll().kill() global que derrubava as outras seções.)
      })

      // Mobile / reduced-motion: reveal simples sem pin
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-row]', {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {trigger: root.current, start: 'top 75%'},
        })
      })

      return () => mm.revert()
    },
    {scope: root},
  )

  return (
    <section className="bg-parchment py-20 lg:py-0">
      <div
        ref={root}
        className="container flex min-h-[auto] flex-col justify-center lg:min-h-screen lg:py-20"
      >
        <div className="mx-auto mb-8 max-w-2xl text-center lg:mb-10">
          <SectionLabel>A escolha</SectionLabel>
          <h2 className="mt-4 text-display-sm text-parchment-text">
            Qual lado da operação você prefere estar?
          </h2>
        </div>

        {/* cabeçalho das colunas (desktop) */}
        <div className="mx-auto hidden w-full max-w-4xl grid-cols-2 gap-4 px-1 pb-3 lg:grid">
          <span className="text-sm font-semibold uppercase tracking-wide text-parchment-text/40">
            Sem prática estruturada
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Com a Perfecting
          </span>
        </div>

        <ul className="mx-auto flex w-full max-w-4xl flex-col gap-3">
          {pairs.map((p, i) => (
            <li key={i} data-row className="grid gap-3 sm:grid-cols-2">
              {/* ❌ */}
              <div className="flex items-center gap-3 rounded-card border border-black/8 bg-parchment-mid px-5 py-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500/80">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-sm font-medium leading-snug text-parchment-text/55">{p.bad}</span>
              </div>
              {/* ✅ */}
              <div
                data-good
                className="flex items-center gap-3 rounded-card border border-primary/25 bg-white px-5 py-4 shadow-[0_0_0_1px_rgba(46,99,205,calc(var(--lit,0)*0.15)),0_10px_30px_-12px_rgba(46,99,205,calc(var(--lit,0)*0.5))]"
                style={{['--lit' as string]: 0}}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.2 3L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm font-semibold leading-snug text-parchment-text">{p.good}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
