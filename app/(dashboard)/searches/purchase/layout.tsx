import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comprar Créditos | Fulldata',
  description: 'Adquiere créditos para realizar más búsquedas en Fulldata',
  keywords: 'comprar créditos, pagar, búsquedas, fulldata',
}

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}