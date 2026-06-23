'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import {isLeadFormComplete, trackLead} from '@/lib/meta-pixel'
import {submitLead} from '@/lib/submit-lead'
import {getUtmParams} from '@/lib/utm'

const CLOSE_MS = 320

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export const WHATSAPP_MODAL_ID = 'whatsapp-modal'

/** Abre o modal de demonstração (usado pelo CtaButton). */
export function openWhatsAppModal() {
  const dialog = document.getElementById(WHATSAPP_MODAL_ID) as HTMLDialogElement | null
  if (dialog && !dialog.open) dialog.showModal()
}

export default function WhatsAppModal() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const closeGracefully = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog?.open) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close()
      return
    }
    dialog.classList.add('is-closing')
    setTimeout(() => {
      dialog.classList.remove('is-closing')
      if (dialog.open) dialog.close()
    }, CLOSE_MS)
  }, [])

  // Reset ao fechar
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () =>
      setTimeout(() => {
        setSent(false)
        setError('')
        setName('')
        setCompany('')
        setPhone('')
      }, 200)
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) closeGracefully()
    },
    [closeGracefully],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError('')

      if (!isLeadFormComplete(name, company, phone)) return

      setSubmitting(true)
      try {
        await submitLead({name, company, phone, utm: getUtmParams()})
        trackLead()
        setSent(true)
      } catch {
        setError('Não foi possível enviar agora. Tente novamente em instantes.')
      } finally {
        setSubmitting(false)
      }
    },
    [name, company, phone],
  )

  return (
    <dialog
      ref={dialogRef}
      id={WHATSAPP_MODAL_ID}
      onClick={handleBackdropClick}
      aria-labelledby="whatsapp-modal-title"
    >
      <div className="m-auto flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl bg-parchment shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black/8 px-6 py-5">
          <div>
            <h2 id="whatsapp-modal-title" className="text-lg font-bold text-parchment-text">
              Agendar demonstração
            </h2>
            <p className="mt-0.5 text-sm font-normal text-parchment-text/60">
              Preencha seus dados e nossa equipe entra em contato
            </p>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={closeGracefully}
            className="rounded-lg p-1 text-parchment-text/60 transition-colors hover:bg-parchment-dark hover:text-parchment-text"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {sent ? (
            <div className="py-6 text-center">
              <div className="mb-3 text-4xl">✓</div>
              <p className="text-lg font-semibold text-parchment-text">Solicitação enviada!</p>
              <p className="mt-1 text-sm text-parchment-text/60">
                Recebemos seus dados. Em breve nossa equipe entra em contato para agendar a demonstração.
              </p>
              <button
                type="button"
                onClick={closeGracefully}
                className="btn-primary mt-5 h-11 w-full px-6 text-sm"
              >
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="wa-name" className="label-field">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  id="wa-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Seu nome"
                  className="input-field"
                  disabled={submitting}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="wa-company" className="label-field">
                  Empresa <span className="text-red-500">*</span>
                </label>
                <input
                  id="wa-company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                  placeholder="Nome da empresa"
                  className="input-field"
                  disabled={submitting}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="wa-phone" className="label-field">
                  WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  id="wa-phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  className="input-field"
                  disabled={submitting}
                />
              </div>

              {error ? (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-1 h-12 px-6 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Enviando...' : 'Solicitar demonstração'}
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  )
}
