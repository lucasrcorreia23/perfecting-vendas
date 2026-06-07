'use client'

import {useRef} from 'react'
import {gsap, useGSAP, SplitText} from '@/lib/gsap'

type Tag = 'h1' | 'h2' | 'h3' | 'p'

interface SplitHeadingProps {
  children: React.ReactNode
  className?: string
  as?: Tag
  /** dispara no load (hero) ao invés de no scroll */
  immediate?: boolean
  delay?: number
}

/**
 * Revela o texto por palavra (mask + slide up) usando SplitText.
 * Sob reduced-motion mantém o texto estático.
 */
export default function SplitHeading({
  children,
  className = '',
  as = 'h2',
  immediate = false,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const Tag = as as React.ElementType

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = ref.current
      if (!el) return

      let split: InstanceType<typeof SplitText> | null = null

      const run = () => {
        if (!ref.current) return
        // mask por linha com folga vertical para não cortar acentos (ç/ã/ó) e descendentes
        split = new SplitText(el, {
          type: 'lines,words',
          linesClass: 'overflow-hidden [line-height:1.18] [padding-bottom:0.08em]',
        })

        gsap.from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.06,
          delay,
          scrollTrigger: immediate
            ? undefined
            : {
                trigger: el,
                start: 'top 85%',
              },
          onComplete: () => split?.revert(),
        })
      }

      // Mede a quebra de linhas só depois da fonte carregar (evita "pulo" do H1)
      if (document.fonts?.ready) {
        document.fonts.ready.then(run)
      } else {
        run()
      }

      return () => split?.revert()
    },
    {scope: ref},
  )

  return (
    <Tag ref={ref} data-anim className={className}>
      {children}
    </Tag>
  )
}
