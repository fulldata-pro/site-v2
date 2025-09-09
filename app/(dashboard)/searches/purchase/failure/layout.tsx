import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error en Compra | Fulldata',
  description: 'Hubo un problema procesando tu compra de créditos',
  keywords: 'error compra, pago fallido, problema pago, fulldata',
}

export default function PurchaseFailureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}