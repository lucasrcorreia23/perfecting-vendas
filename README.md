# LP de Vendas — Perfecting

Landing page de vendas (Next.js 16 + Tailwind v4 + GSAP) seguindo a identidade visual do site Perfecting. Projeto **independente** do `lp-perfecting`.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
npm run type-check
```

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — tokens da marca em `app/globals.css` (`@theme`) e `tailwind.config.ts`
- **GSAP 3.15** (`ScrollSmoother`, `ScrollTrigger`, `SplitText`) via `@gsap/react`
- **Fontes:** Manrope (Google) + Garnett (local, `public/fonts/garnett`)

## Estrutura

- `app/page.tsx` — monta as 8 seções na ordem da copy.
- `components/sections/*` — Hero, Audience, HowItHelps, **Comparison (pin)**, **Steps (pin)**, Pitch, Faq, FinalCta.
- `components/providers/SmoothScrollProvider.tsx` — motor de scroll suave + parallax (`data-speed`).
- `components/anim/*` — `Reveal` (fade-up on-scroll), `SplitHeading` (SplitText por palavra).
- `components/ui/*` — `CtaButton`, `AnimatedCounter`, `PlatformMock`, `SectionLabel`.
- `components/layout/*` — `Header` (announcement bar + navbar), `Footer`, `WhatsAppModal`.
- `lib/whatsapp.ts` — número e montagem do deeplink. `lib/gsap.ts` — registro dos plugins.

## CTAs → WhatsApp

Todos os botões "Agendar uma demonstração" abrem um modal que coleta nome/empresa/telefone e leva ao WhatsApp **+55 48 99924-7580** (`lib/whatsapp.ts`). Para trocar o número, edite `WHATSAPP_NUMBER`.

## Animações

- Cinematográficas no desktop (seções 3 e 4 são **pinadas** com scroll-storytelling).
- Em telas `<1024px` o pin é desativado (reveals em stagger).
- `prefers-reduced-motion: reduce` desliga o ScrollSmoother e as timelines — conteúdo estático e legível.

## Asset do hero (placeholder)

O bloco visual do hero/seção 2 usa o componente **`PlatformMock`** (mock animado em CSS) no lugar do "GIF de alguém treinando com IA". Para usar o material real:

1. Coloque o arquivo em `public/media/` (ex.: `hero.mp4` ou `hero.gif`).
2. Em `components/sections/HeroSection.tsx` e `HowItHelpsSection.tsx`, troque `<PlatformMock />` por um `<video>` / `<Image>` apontando para o asset.

## Ajustes de copy aplicados

- **Seção 3 (comparação):** o 1º item veio corrompido no texto original; foi reconstruído como par coerente (`Vendedor aprende no cliente real…` / `Vendedor pratica antes…`). Revise em `components/sections/ComparisonSection.tsx`.
- **Seção 6 (FAQ):** a copy não trazia as perguntas; foram reaproveitadas 9 perguntas aderentes ao produto. Edite em `components/sections/FaqSection.tsx`.
