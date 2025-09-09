import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear Cuenta | Fulldata',
  description: 'Regístrate en Fulldata para acceder a búsquedas avanzadas',
  keywords: 'registro, crear cuenta, registrarse, fulldata',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}