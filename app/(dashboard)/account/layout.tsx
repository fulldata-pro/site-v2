import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi Cuenta | Fulldata',
  description: 'Administra tu perfil y configuración de cuenta en Fulldata',
  keywords: 'mi cuenta, perfil, configuración, usuario, fulldata',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}