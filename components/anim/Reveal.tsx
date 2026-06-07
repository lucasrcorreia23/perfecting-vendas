'use client'

import {useRef} from 'react'
import {gsap, useGSAP} from '@/lib/gsap'

type Tag = 'div' | 'section' | 'ul' | 'li' | 'p' | 'span'

interface RevealProps {
  children: React.ReactNode
  className?: string
  as?: Tag
  /** Anima os filhos diretos em stagger ao invés do próprio elemento */
  stagger?: boolean
  delay?: number
  y?: number
  /** começa a animação quando o elemento atinge esse ponto da viewport */
  start?: string
}

/**
 * Reveal on-scroll (fade + slide up). Sob reduced-motion o conteúdo já está visível
 * (data-anim + CSS), então o efeito apenas não dispara.
 */
export default function Reveal({
  children,
  className = '',
  as = 'div',
  stagger = false,
  delay = 0,
  y = 32,
  start = 'top 85%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const Tag = as as React.ElementType

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = ref.current
      if (!el) return

      const targets = stagger ? Array.from(el.children) : el
      // Estado inicial via set + anima com `to` (não `from`): evita que um
      // ScrollTrigger.refresh() — disparado pelos pins das seções abaixo —
      // re-aplique o estado inicial e congele o conteúdo escondido.
      gsap.set(targets, {opacity: 0, y})
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    },
    {scope: ref},
  )

  return (
    <Tag ref={ref} data-anim className={className}>
      {children}
    </Tag>
  )
}
