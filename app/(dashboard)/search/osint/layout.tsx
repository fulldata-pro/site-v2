import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OSINT | Fulldata',
  description: 'Herramientas de inteligencia de fuentes abiertas (OSINT) para búsquedas avanzadas',
  keywords: 'osint, inteligencia, fuentes abiertas, investigación, fulldata',
}

export default function OsintSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}