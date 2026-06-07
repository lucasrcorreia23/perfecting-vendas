'use client'

import {useRef} from 'react'
import {gsap, useGSAP} from '@/lib/gsap'

interface AnimatedCounterProps {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  duration?: number
}

/**
 * Contador animado disparado quando entra na viewport.
 * Sob reduced-motion mostra o valor final direto.
 */
export default function AnimatedCounter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  duration = 1.6,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const format = (v: number) =>
        `${prefix}${v.toFixed(decimals).replace('.', ',')}${suffix}`

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = format(to)
        return
      }

      // começa em 0 (evita "pisca valor final → 0 → conta")
      el.textContent = format(0)

      const obj = {val: 0}
      gsap.to(obj, {
        val: to,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = format(obj.val)
        },
        scrollTrigger: {trigger: el, start: 'top 90%'},
      })
    },
    {scope: ref},
  )

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toFixed(decimals).replace('.', ',')}
      {suffix}
    </span>
  )
}
