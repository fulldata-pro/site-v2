import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Vehículos | Fulldata',
  description: 'Busca información detallada de vehículos por patente en la base de datos de Fulldata',
  keywords: 'buscar vehículos, patentes, automóviles, fulldata',
}

export default function VehicleSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}