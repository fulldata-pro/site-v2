import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Bancos | Fulldata',
  description: 'Busca información bancaria y financiera en la base de datos de Fulldata',
  keywords: 'buscar bancos, información financiera, entidades bancarias, fulldata',
}

export default function BanksSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}