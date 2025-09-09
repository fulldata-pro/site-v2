import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compra Pendiente | Fulldata',
  description: 'Tu compra de créditos está siendo procesada',
  keywords: 'compra pendiente, pago procesando, créditos, fulldata',
}

export default function PurchasePendingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}