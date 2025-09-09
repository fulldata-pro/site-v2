import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Empresas | Fulldata',
  description: 'Busca información completa de empresas en la base de datos de Fulldata',
  keywords: 'buscar empresas, búsqueda, compañías, fulldata',
}

export default function CompaniesSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}