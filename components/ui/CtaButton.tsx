'use client'

import {openWhatsAppModal} from '@/components/layout/WhatsAppModal'

interface CtaButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'light'
  className?: string
}

/**
 * CTA padrão da página. Abre o modal de WhatsApp (renderizado uma vez no layout).
 * variant "light" = botão branco para usar sobre fundos azuis (CTA final/seções).
 */
export default function CtaButton({
  children = 'Agendar uma demonstração',
  variant = 'primary',
  className = '',
}: CtaButtonProps) {
  const base = 'h-12 px-7 text-sm font-semibold rounded-lg'
  const light =
    'inline-flex items-center justify-center bg-white text-primary border border-white/30 shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-colors hover:bg-white/90 cursor-pointer'

  const cls =
    variant === 'light' ? `${base} ${light} ${className}` : `btn-${variant} ${base} ${className}`

  return (
    <button type="button" onClick={openWhatsAppModal} className={cls}>
      {children}
    </button>
  )
}
