import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reporte Detallado | Fulldata',
  description: 'Vista detallada del reporte de búsqueda en Fulldata',
  keywords: 'reporte, detalle, búsqueda, resultados, fulldata',
}

export default function ReportDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}