import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración | Fulldata',
  description: 'Ajusta las configuraciones y preferencias de tu cuenta en Fulldata',
  keywords: 'configuración, ajustes, preferencias, settings, fulldata',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}