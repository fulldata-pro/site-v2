import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compra Exitosa | Fulldata',
  description: 'Tu compra de créditos se ha procesado exitosamente',
  keywords: 'compra exitosa, pago procesado, créditos, fulldata',
}

export default function PurchaseSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}