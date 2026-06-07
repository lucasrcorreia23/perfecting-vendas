'use client'

import {useState} from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/anim/Reveal'
import CtaButton from '@/components/ui/CtaButton'

const faqs = [
  {
    q: 'O que é a Perfecting?',
    a: 'A Perfecting é uma plataforma que acelera o resultado comercial de equipes de vendas. Ela transforma dados da operação, métodos de venda e metas comerciais em simulações de execução práticas, personalizadas e mensuráveis — com roleplay por voz, scorecards, rankings e dashboards de resultado.',
  },
  {
    q: 'Como a Perfecting personaliza a experiência de cada vendedor?',
    a: 'A plataforma usa o contexto comercial da sua empresa — oferta, objeções, perfil de cliente e metodologia — para criar cenários de execução únicos. O agente de IA adapta as simulações conforme o vendedor avança, focando nos gaps identificados em chamadas reais.',
  },
  {
    q: 'A solução funciona para times distribuídos?',
    a: 'Sim. Toda a plataforma é 100% remota e assíncrona. Vendedores praticam quando e onde quiserem, e gestores acompanham a evolução em tempo real — independente de fuso horário ou localização.',
  },
  {
    q: 'Que tipo de prática o vendedor realiza?',
    a: 'Roleplay com voz: o vendedor conversa com um agente de IA que simula o cliente. Após cada sessão, recebe feedback detalhado sobre clareza, escuta ativa, manejo de objeções e próximos passos — com scorecard e sugestões de execução.',
  },
  {
    q: 'Como os gestores acompanham a evolução?',
    a: 'Através de dashboards individuais e do time com métricas de engajamento, score médio por habilidade de execução, evolução histórica e gaps prioritários. É possível filtrar por rep, cenário ou período.',
  },
  {
    q: 'A plataforma substitui o gestor de vendas?',
    a: 'Não. A Perfecting escala a capacidade do gestor. Em vez de depender de coaching manual para cada evolução, o gestor usa o tempo onde realmente gera receita — com dados concretos em mãos.',
  },
  {
    q: 'Quais metodologias comerciais podem ser usadas?',
    a: 'SPIN Selling, MEDDIC, Challenger Sale, Sandler, ou qualquer metodologia customizada da empresa. A plataforma é agnóstica — você configura o contexto e ela estrutura os cenários de prática de acordo.',
  },
  {
    q: 'Quanto tempo leva para começar?',
    a: 'Em até 48 horas após o onboarding, o time já pode iniciar as primeiras sessões de roleplay. A configuração inicial é feita em conjunto com a equipe da Perfecting e leva cerca de 2 horas.',
  },
  {
    q: 'Como funciona a contratação?',
    a: 'A Perfecting é contratada por assinatura, com planos baseados no número de usuários ativos. Oferecemos um período de piloto para validar resultados antes do compromisso de longo prazo. Fale com a gente para uma proposta customizada.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="scroll-mt-24 bg-parchment py-14 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-8 text-center lg:mb-10">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-4 text-display-sm text-parchment-text">Perguntas frequentes</h2>
          </div>

          <Reveal as="ul" stagger className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <li
                  key={idx}
                  className="overflow-hidden rounded-xl border border-black/8 bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold leading-snug text-parchment-text">
                      {faq.q}
                    </span>
                    <span className="shrink-0 text-xl font-light leading-none text-primary" aria-hidden>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{maxHeight: isOpen ? '420px' : '0px'}}
                  >
                    <p className="px-6 pb-6 text-[14px] font-light leading-relaxed text-parchment-text/60">
                      {faq.a}
                    </p>
                  </div>
                </li>
              )
            })}
          </Reveal>

          <div className="mt-10 flex justify-center">
            <CtaButton />
          </div>
        </div>
      </div>
    </section>
  )
}
