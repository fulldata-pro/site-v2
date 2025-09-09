import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restablecer Contraseña | Fulldata',
  description: 'Establece una nueva contraseña para tu cuenta de Fulldata',
  keywords: 'restablecer contraseña, nueva contraseña, cambiar password, fulldata',
}

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}