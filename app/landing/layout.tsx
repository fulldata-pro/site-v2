import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fulldata - Búsquedas Profesionales',
  description: 'Plataforma profesional de búsquedas e investigación de datos en tiempo real',
  keywords: 'fulldata, búsquedas, investigación, datos, personas, empresas',
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}