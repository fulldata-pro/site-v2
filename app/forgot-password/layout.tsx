import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recuperar Contraseña | Fulldata',
  description: 'Recupera el acceso a tu cuenta de Fulldata',
  keywords: 'recuperar contraseña, olvidé contraseña, restablecer, fulldata',
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}