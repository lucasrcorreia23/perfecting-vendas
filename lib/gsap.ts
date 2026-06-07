'use client'

import {gsap} from 'gsap'
import {useGSAP} from '@gsap/react'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ScrollSmoother} from 'gsap/ScrollSmoother'
import {SplitText} from 'gsap/SplitText'

// Registro único dos plugins (idempotente). Todos gratuitos desde o GSAP 3.13.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText)
}

export {gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
