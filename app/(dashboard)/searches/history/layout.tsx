import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial de Búsquedas | Fulldata',
  description: 'Revisa el historial completo de tus búsquedas realizadas en Fulldata',
  keywords: 'historial, búsquedas anteriores, histórico, fulldata',
}

export default function SearchHistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}