import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/anim/Reveal'
import SplitHeading from '@/components/anim/SplitHeading'
import CtaButton from '@/components/ui/CtaButton'
import PlatformMock from '@/components/ui/PlatformMock'

const capabilities = [
  {
    title: 'Escuta ativa',
    body: 'O vendedor aprende a conduzir conversas com mais perguntas e menos monólogos.',
    // ondas de som
    icon: <path d="M2 6.5v3M5 4v8M8 2v12M11 4.5v7M14 6.5v3" />,
  },
  {
    title: 'Tratamento de objeções',
    body: 'A plataforma identifica insegurança, desvio de argumento e oportunidades perdidas durante a conversa.',
    // escudo
    icon: <path d="M8 1.5l5.5 2v4.2c0 3.2-2.4 5.1-5.5 6-3.1-.9-5.5-2.8-5.5-6V3.5l5.5-2z" />,
  },
  {
    title: 'Clareza comercial',
    body: 'Feedback sobre comunicação, ritmo, objetividade e condução da venda.',
    // balão de conversa
    icon: <path d="M2.5 4.5A1.5 1.5 0 014 3h8a1.5 1.5 0 011.5 1.5v5A1.5 1.5 0 0112 11H6.5L3.5 13.5V11H4a1.5 1.5 0 01-1.5-1.5z" />,
  },
  {
    title: 'Próximos passos',
    body: 'A IA avalia se o vendedor conseguiu conduzir a conversa para avanço real da oportunidade.',
    // seta para frente
    icon: <path d="M2.5 8h10M9 4.5L12.5 8 9 11.5" />,
  },
]

export default function HowItHelpsSection() {
  return (
    <section id="plataforma" className="scroll-mt-24 rounded-3xl bg-parchment-dark py-14 lg:py-20">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* texto */}
          <div>
            <Reveal>
              <SectionLabel>A plataforma</SectionLabel>
            </Reveal>
            <SplitHeading as="h2" className="mt-4 text-display-sm text-parchment-text">
              Faça seu time vender mais com IA
            </SplitHeading>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-parchment-text/70 lg:text-lg">
                A Perfecting cria simulações reais de vendas com base no seu playbook, objeções e
                processo comercial. O time pratica discovery, negociação e fechamento com IA, recebe
                feedback imediato e o gestor acompanha evolução, consistência e gaps de execução em
                tempo real.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8">
              <CtaButton />
            </Reveal>
          </div>

          {/* mock */}
          <Reveal delay={0.15}>
            <PlatformMock />
          </Reveal>
        </div>

        {/* cards de capacidade */}
        <Reveal as="ul" stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <li
              key={c.title}
              className="flex flex-col gap-3 rounded-card border border-black/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {c.icon}
                </svg>
              </span>
              <div>
                <h3 className="text-base font-bold text-parchment-text">{c.title}</h3>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-parchment-text/70">{c.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
