import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.scss'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Fulldata - Plataforma Profesional de Búsquedas',
  description: 'Plataforma profesional para búsquedas e investigación de personas, empresas, vehículos y más',
  keywords: 'fulldata, búsquedas profesionales, investigación, personas, empresas, vehículos, OSINT',
  icons: {
    icon: '/images/logo-icon.svg',
    apple: '/images/logo-icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        <Providers>
          <>{children}</>
        </Providers>
      </body>
    </html>
  )
}