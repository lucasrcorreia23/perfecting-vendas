'use client'

import {useRef} from 'react'
import {gsap, useGSAP} from '@/lib/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import SplitHeading from '@/components/anim/SplitHeading'
import CtaButton from '@/components/ui/CtaButton'

const items = [
  'Onboarding completo com a equipe da Perfecting',
  'Configuração dos cenários da sua operação',
  'Dashboard individual e do time em tempo real',
  'Scorecard por habilidade de execução',
  'Acompanhamento e suporte',
]

export default function PitchSection() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const items = gsap.utils.toArray<HTMLElement>('[data-item]', root.current!)
      gsap.from(items, {
        opacity: 0,
        x: -24,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {trigger: root.current, start: 'top 75%'},
      })
      gsap.from('[data-check]', {
        strokeDashoffset: 24,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {trigger: root.current, start: 'top 75%'},
      })
    },
    {scope: root},
  )

  return (
    <section className="bg-parchment py-14 lg:py-20">
      <div className="container">
        <div
          ref={root}
          className="relative mx-auto grid max-w-5xl gap-10 overflow-hidden rounded-3xl border border-black/8 bg-parchment-dark p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:p-14"
        >
          <div>
            <SectionLabel>O que você recebe</SectionLabel>
            <SplitHeading as="h2" className="mt-4 text-display-sm text-parchment-text">
              Sua operação comercial com performance e escala
            </SplitHeading>
            <p className="mt-5 max-w-md text-base font-light leading-relaxed text-parchment-text/70">
              Tudo o que o seu time precisa para praticar, evoluir e bater meta — com
              acompanhamento de perto da nossa equipe.
            </p>
            <div className="mt-8">
              <CtaButton className="!h-10 !px-2.5 !text-xs whitespace-nowrap sm:!px-7 sm:!text-sm">
                Quero agendar minha demonstração
              </CtaButton>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item}
                data-item
                className="flex items-center gap-4 rounded-card border border-black/8 bg-white px-5 py-4 shadow-card"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      data-check
                      d="M3 8.5l3.2 3L13 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="24"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium text-parchment-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
