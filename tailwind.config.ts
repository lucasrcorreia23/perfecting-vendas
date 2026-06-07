import type {Config} from 'tailwindcss'

/**
 * Tailwind v4: a configuração de tema (cores, fontes, raios, sombras) vive no
 * bloco `@theme` em `app/globals.css`. Em v4 este arquivo JS NÃO é carregado
 * automaticamente — só seria lido via diretiva `@config` no CSS, que não usamos.
 * Mantido apenas como `content` de referência; não adicione tokens aqui (eles
 * seriam ignorados). Edite os tokens em `app/globals.css`.
 */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
} satisfies Config
