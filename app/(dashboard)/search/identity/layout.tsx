import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Identidad | Fulldata',
  description: 'Verifica y busca información de identidad en la base de datos de Fulldata',
  keywords: 'buscar identidad, verificación, identificación, fulldata',
}

export default function IdentitySearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}