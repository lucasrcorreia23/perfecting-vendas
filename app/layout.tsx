import './globals.css'

import type {Metadata, Viewport} from 'next'
import {Manrope} from 'next/font/google'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppModal from '@/components/layout/WhatsAppModal'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://perfecting.com.br'

const manrope = Manrope({
  variable: '--font-manrope',
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Perfecting — Pratique vendas com IA e acelere a performance do seu time',
  description:
    'Em até 48 horas, seu time pratica conversas reais com IA e o gestor acompanha a evolução. Roleplays por voz, scorecards e dashboards. 2× menos ramp-up, +23% de conversão.',
  openGraph: {
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Perfecting',
    url: SITE_URL,
    title: 'Perfecting — Pratique vendas com IA e acelere a performance do seu time',
    description:
      'Roleplays por voz com IA, capacitação comercial e visibilidade clara da evolução do time.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0C0B10',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={manrope.variable} suppressHydrationWarning>
      <body className="bg-parchment font-sans text-parchment-text antialiased">
        <Header />
        <SmoothScrollProvider>
          <main id="top">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <WhatsAppModal />
      </body>
    </html>
  )
}
