import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Teléfonos | Fulldata',
  description: 'Busca información de números telefónicos en la base de datos de Fulldata',
  keywords: 'buscar teléfonos, números, telefonía, fulldata',
}

export default function PhonesSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}