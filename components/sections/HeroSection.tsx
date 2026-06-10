import SectionLabel from '@/components/ui/SectionLabel'
import SplitHeading from '@/components/anim/SplitHeading'
import Reveal from '@/components/anim/Reveal'
import CtaButton from '@/components/ui/CtaButton'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const metrics = [
  {value: 2, suffix: '×', label: 'redução de ramp-up', prefix: ''},
  {value: 23, suffix: '%', label: 'aumento de conversão', prefix: '+'},
  {value: 52, suffix: '%', label: 'mais metas batidas', prefix: ''},
]

const logos = [
  {src: '/believe/totus.svg', alt: 'Totus', className: 'h-6'},
  {src: '/believe/rd-station-default.svg', alt: 'RD Station', className: 'h-6'},
  {src: '/believe/marca-fiesc-reduzida_cor.webp', alt: 'FIESC', className: 'h-5'},
]

function LogoStrip({className = ''}: {className?: string}) {
  return (
    <Reveal delay={0.5} className={`flex flex-col items-center gap-3 lg:items-start ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-parchment-text/40">
        Empresas que acreditam
      </span>
      <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 lg:justify-start">
        {logos.map((logo) => (
          <li key={logo.alt}>
            <img
              src={logo.src}
              alt={logo.alt}
              className={`${logo.className} w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
            />
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden rounded-b-3xl bg-parchment pt-28 sm:pt-32">
      {/* glow de fundo */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{background: 'radial-gradient(circle, rgba(107,179,255,0.35) 0%, transparent 70%)'}}
        data-speed="0.85"
      />

      <div className="container relative z-10 flex flex-1 flex-col gap-12 pb-16 lg:gap-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* esquerda */}
          <div className="flex w-full flex-col gap-6 text-center lg:w-[48%] lg:text-left">
            <Reveal>
              <SectionLabel gradient>Plataforma Impulsionadora de Receita com IA</SectionLabel>
            </Reveal>

            <SplitHeading
              as="h1"
              immediate
              delay={0.15}
              className="font-sans text-[28px] font-extrabold leading-[1.1] tracking-tight text-parchment-text sm:text-[34px] lg:text-[clamp(30px,3.2vw,44px)]"
            >
              Em até 48 horas, seu time começa a praticar conversas reais com IA e o gestor
              acompanha a evolução da performance
            </SplitHeading>

            <Reveal delay={0.3}>
              <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-parchment-text/70 lg:mx-0 lg:text-lg">
                A Perfecting transforma prática em execução, com roleplays por IA, capacitação
                comercial e visibilidade clara da evolução do time.
              </p>
            </Reveal>

            <Reveal delay={0.4} className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <CtaButton className="w-full sm:w-auto sm:min-w-[230px]" />
            </Reveal>

            {/* logos — desktop fica abaixo do CTA */}
            <LogoStrip className="hidden lg:flex" />
          </div>

          {/* direita — vídeo do produto */}
          <div className="w-full lg:w-[52%]" data-speed="1.08">
            <div className="relative overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_20px_60px_-15px_rgba(46,99,205,0.25)]">
              <video
                className="block h-auto w-full"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/hero-perfecting-poster.jpg"
              >
                <source src="/media/hero-perfecting.webm" type="video/webm" />
                <source src="/media/hero-perfecting.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* logos — mobile fica abaixo do vídeo, deixando o vídeo na primeira dobra */}
          <LogoStrip className="lg:hidden" />
        </div>

        {/* métricas */}
        <Reveal
          as="ul"
          stagger
          className="grid grid-cols-1 gap-6 border-t border-black/8 pt-8 sm:grid-cols-3"
        >
          {metrics.map((m) => (
            <li key={m.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-stat text-gradient-stat">
                <AnimatedCounter to={m.value} prefix={m.prefix} suffix={m.suffix} />
              </span>
              <span className="text-sm font-medium text-parchment-text/60">{m.label}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
