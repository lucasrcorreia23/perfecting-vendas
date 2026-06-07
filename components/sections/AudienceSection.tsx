import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/anim/Reveal'
import SplitHeading from '@/components/anim/SplitHeading'

const personas = [
  {
    title: 'Diretor ou gestor comercial',
    body: 'Com time comercial em expansão, que passa mais tempo fazendo coaching manual do que escalando a performance do time.',
  },
  {
    title: 'Head de Revenue e VP de Vendas',
    body: 'Que precisam de consistência de execução em todo o time, não apenas nos top performers.',
  },
  {
    title: 'Founders e CEOs',
    body: 'Que não conseguem escalar a operação comercial porque tudo ainda depende de uma pessoa específica para funcionar.',
  },
  {
    title: 'Operações comerciais',
    body: 'Onde ramp-up lento impacta diretamente conversão, previsibilidade e receita.',
  },
]

export default function AudienceSection() {
  return (
    <section id="para-quem" className="scroll-mt-24 bg-parchment py-14 lg:py-20">
      <div className="container">
        <div className="mx-auto mb-8 max-w-2xl text-center lg:mb-10">
          <Reveal>
            <SectionLabel>Para quem</SectionLabel>
          </Reveal>
          <SplitHeading
            as="h2"
            className="mt-4 text-display-sm text-parchment-text"
          >
            Para quem a Perfecting foi construída?
          </SplitHeading>
        </div>

        <Reveal as="ul" stagger className="grid gap-5 sm:grid-cols-2">
          {personas.map((p) => (
            <li
              key={p.title}
              className="group flex gap-4 rounded-card border border-black/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3.2 3L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="text-base font-bold text-parchment-text">{p.title}</h3>
                <p className="mt-1 text-sm font-light leading-relaxed text-parchment-text/70">{p.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
