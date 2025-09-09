import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nueva Búsqueda | Fulldata',
  description: 'Inicia una nueva búsqueda en la base de datos de Fulldata',
  keywords: 'nueva búsqueda, buscar, investigación, fulldata',
}

export default function NewSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}