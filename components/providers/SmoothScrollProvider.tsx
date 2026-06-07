'use client'

import {useRef} from 'react'
import {gsap, useGSAP, ScrollSmoother, ScrollTrigger} from '@/lib/gsap'

/**
 * Motor de scroll suave (ScrollSmoother) + parallax declarativo (data-speed/data-lag).
 * - Navbar/header ficam FORA de #smooth-content (posição fixa).
 * - Sob prefers-reduced-motion: não cria o smoother → scroll nativo, conteúdo estático.
 * - Intercepta âncoras (#id) para rolar suavemente.
 */
export default function SmoothScrollProvider({children}: {children: React.ReactNode}) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          ok: '(prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const {reduceMotion} = ctx.conditions as {reduceMotion: boolean; ok: boolean}
          if (reduceMotion) return

          const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2,
            effects: true,
            normalizeScroll: true,
            ignoreMobileResize: true,
          })

          // Âncoras internas → scroll suave via smoother
          const onAnchorClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
            const anchor = (e.target as Element | null)?.closest?.('a[href^="#"]') as
              | HTMLAnchorElement
              | null
            const hash = anchor?.getAttribute('href')
            if (!hash || hash === '#') return
            const target = document.querySelector(hash)
            if (!target) return
            e.preventDefault()
            smoother.scrollTo(target, true, 'top 80px')
          }
          document.addEventListener('click', onAnchorClick)

          // Recalcula triggers após carregar fontes/imagens
          const refresh = () => ScrollTrigger.refresh()
          if (document.fonts?.ready) document.fonts.ready.then(refresh)
          window.addEventListener('load', refresh)

          return () => {
            document.removeEventListener('click', onAnchorClick)
            window.removeEventListener('load', refresh)
            smoother.kill()
          }
        },
      )

      return () => mm.revert()
    },
    {scope: wrapperRef},
  )

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  )
}
