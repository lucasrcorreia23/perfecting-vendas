interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  /** versão com gradiente da marca (hero/fundos claros de destaque) */
  gradient?: boolean
}

export default function SectionLabel({children, className = '', gradient = false}: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-[11px] font-semibold uppercase tracking-[0.2em] ${
        gradient ? 'text-gradient-primary' : 'text-primary'
      } ${className}`}
    >
      {children}
    </span>
  )
}
