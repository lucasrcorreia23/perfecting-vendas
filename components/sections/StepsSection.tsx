'use client'

import {useRef} from 'react'
import {gsap, useGSAP} from '@/lib/gsap'
import SectionLabel from '@/components/ui/SectionLabel'
import CtaButton from '@/components/ui/CtaButton'

const steps = [
  {
    n: '01',
    title: 'Organização do contexto comercial',
    body: 'Você traz o que define a sua operação: produto, metodologia, perfil de cliente, objeções mais comuns. A Perfecting organiza tudo isso e transforma em base para os cenários de prática.',
    tags: ['Produto', 'Metodologia', 'ICP', 'Objeções'],
  },
  {
    n: '02',
    title: 'Planejamento dos cenários',
    body: 'Você define quais situações quer trabalhar: onboarding de novos reps, abordagem inicial, negociação de preço, fechamento. A plataforma monta cenários alinhados exatamente aos pontos que mais impactam a conversão da sua operação.',
    tags: ['Onboarding', 'Abordagem', 'Negociação', 'Fechamento'],
  },
  {
    n: '03',
    title: 'Prática com IA por voz',
    body: 'O vendedor pratica. De forma real: conversa por voz com um agente de IA que simula o cliente, levanta objeções e responde como um prospect verdadeiro. Quando e onde quiser. Ao final de cada sessão, recebe scorecard detalhado: clareza, escuta ativa, manejo de objeções, próximos passos.',
    tags: ['Voz', 'Scorecard', 'Escuta ativa', 'Próximos passos'],
  },
  {
    n: '04',
    title: 'Visibilidade e ajuste contínuo',
    body: 'Você passa a ver, com precisão, onde cada vendedor está travando. Quem está evoluindo. Qual gap está impactando a conversão do time. Com dados.',
    tags: ['Dashboard', 'Evolução', 'Gaps', 'Decisão'],
  },
]

export default function StepsSection() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', root.current!)
        const dots = gsap.utils.toArray<HTMLElement>('[data-dot]', root.current!)
        gsap.set(panels, {autoAlpha: 0, y: 40})
        gsap.set(panels[0], {autoAlpha: 1, y: 0})
        gsap.set(dots[0], {color: '#2E63CD'})

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: `+=${panels.length * 90}%`,
            pin: '[data-pin]',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        panels.forEach((panel, i) => {
          if (i === 0) return
          tl.to(panels[i - 1], {autoAlpha: 0, y: -40, duration: 0.5, ease: 'power2.in'})
            .to(dots[i - 1], {color: 'rgba(30,28,36,0.25)', duration: 0.3}, '<')
            .to(panel, {autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out'}, '<0.1')
            .to(dots[i], {color: '#2E63CD', duration: 0.3}, '<')
        })
      })

      // mobile / reduced-motion: stack revelado
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-panel]', {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {trigger: root.current, start: 'top 70%'},
        })
      })

      return () => mm.revert()
    },
    {scope: root},
  )

  return (
    <section id="etapas" className="scroll-mt-24 bg-parchment">
      <div ref={root}>
        <div data-pin className="flex min-h-screen flex-col justify-center pb-12 pt-12 lg:pb-12 lg:pt-24">
          <div className="container">
            <div className="mx-auto mb-6 max-w-3xl text-center lg:mb-8">
              <SectionLabel>Como funciona</SectionLabel>
              <h2 className="mx-auto mt-3 max-w-2xl text-balance text-[26px] font-extrabold leading-[1.15] tracking-tight text-parchment-text lg:text-[38px]">
                Da operação confusa à performance comercial mensurável. Em 4 etapas.
              </h2>
            </div>

            {/* progresso */}
            <div className="mx-auto mb-6 flex max-w-3xl items-center justify-center gap-3 lg:mb-8">
              {steps.map((s, i) => (
                <div key={s.n} className="flex items-center gap-3">
                  <span
                    data-dot
                    className="text-lg font-bold"
                    style={{color: i === 0 ? '#2E63CD' : 'rgba(30,28,36,0.25)'}}
                  >
                    {s.n}
                  </span>
                  {i < steps.length - 1 && <span className="h-px w-6 bg-black/10 lg:w-10" />}
                </div>
              ))}
            </div>

            {/* painéis: grid-stack só com motion (crossfade pinado). Sob reduced-motion
                ficam em fluxo vertical normal e legíveis. */}
            <div className="mx-auto max-w-3xl motion-safe:lg:grid">
              {steps.map((s) => (
                <article
                  key={s.n}
                  data-panel
                  className="mb-6 rounded-3xl border border-black/8 bg-white p-7 shadow-card lg:p-8 motion-safe:lg:mb-0 motion-safe:lg:[grid-area:1/1]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                    <span className="text-5xl font-black text-gradient-stat lg:text-6xl">
                      {s.n}
                    </span>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold text-parchment-text lg:text-2xl">{s.title}</h3>
                      <p className="text-base font-light leading-relaxed text-parchment-text/70">
                        {s.body}
                      </p>
                      <ul className="mt-1 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex justify-center lg:mt-8">
              <CtaButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
