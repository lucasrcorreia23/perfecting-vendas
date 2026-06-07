import Reveal from '@/components/anim/Reveal'
import SplitHeading from '@/components/anim/SplitHeading'
import CtaButton from '@/components/ui/CtaButton'

export default function FinalCtaSection() {
  return (
    <section className="bg-parchment py-10 pb-16 lg:py-16 lg:pb-24">
      <div className="container">
        <div
          className="grain relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-8 py-12 text-center lg:py-16"
          style={{
            background:
              'linear-gradient(167deg, var(--color-primary-glow) 0%, var(--color-primary) 50%, var(--color-primary-hover) 100%)',
          }}
        >
          <SplitHeading
            as="h2"
            className="relative z-10 max-w-2xl text-[34px] font-bold leading-tight tracking-tight text-white lg:text-[52px]"
          >
            Sua operação pronta para vender mais?
          </SplitHeading>
          <Reveal delay={0.2}>
            <p className="relative z-10 mx-auto max-w-md text-lg font-light leading-relaxed text-white/80">
              Reduza ramp-up, aumente a consistência de execução e escale resultado com IA. Comece
              em até 48 horas.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="relative z-10 mt-2">
            <CtaButton variant="light" className="min-w-[230px]" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
