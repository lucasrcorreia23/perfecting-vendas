'use client'

import {useRef} from 'react'
import {gsap, useGSAP} from '@/lib/gsap'

const skills = [
  {label: 'Escuta ativa', score: 86},
  {label: 'Tratamento de objeções', score: 72},
  {label: 'Clareza comercial', score: 91},
  {label: 'Próximos passos', score: 78},
]

/**
 * Mock visual da plataforma (roleplay por voz + scorecard).
 * Placeholder premium enquanto não há GIF/vídeo real — barras e waveform animam.
 * Para usar o asset real, troque este componente por <video>/<Image>.
 */
export default function PlatformMock({className = ''}: {className?: string}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = ref.current
      if (!el) return

      // barras do scorecard
      gsap.fromTo(
        el.querySelectorAll('[data-bar]'),
        {width: '0%'},
        {
          width: (i, t) => `${t.getAttribute('data-bar')}%`,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {trigger: el, start: 'top 80%'},
        },
      )
      // waveform pulsando
      gsap.to(el.querySelectorAll('[data-wave]'), {
        scaleY: () => 0.3 + Math.random() * 0.7,
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {each: 0.06, from: 'center'},
        transformOrigin: 'center',
      })
    },
    {scope: ref},
  )

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_20px_60px_-15px_rgba(46,99,205,0.25)] ${className}`}
    >
      {/* topo: janela */}
      <div className="flex items-center gap-2 border-b border-black/6 bg-parchment-mid px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs font-medium text-parchment-text/50">
          Roleplay · Negociação de preço
        </span>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        {/* voz / waveform */}
        <div className="flex flex-col justify-between rounded-xl bg-gradient-to-br from-primary to-primary-hover p-4 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/80">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-white" />
            Ao vivo · IA cliente
          </div>
          <div className="my-4 flex h-16 items-center justify-center gap-1">
            {Array.from({length: 22}).map((_, i) => (
              <span
                key={i}
                data-wave
                className="w-1 rounded-full bg-white/80"
                style={{height: `${20 + ((i * 13) % 40)}px`}}
              />
            ))}
          </div>
          <p className="text-sm font-medium leading-snug text-white/90">
            “Achei o investimento alto pra agora…”
          </p>
        </div>

        {/* scorecard */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-parchment-text">Scorecard</span>
            <span className="text-2xl font-black tracking-tight text-gradient-stat">82</span>
          </div>
          {skills.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-medium text-parchment-text/70">
                <span>{s.label}</span>
                <span>{s.score}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-parchment-darker">
                <div
                  data-bar={s.score}
                  className="h-full rounded-full bg-gradient-to-r from-primary-glow to-primary"
                  style={{width: `${s.score}%`}}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
