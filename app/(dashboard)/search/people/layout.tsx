import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Personas | Fulldata',
  description: 'Busca información detallada de personas en la base de datos de Fulldata',
  keywords: 'buscar personas, búsqueda, identidad, fulldata',
}

export default function PeopleSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}