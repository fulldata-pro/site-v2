import { Metadata } from 'next'
import ClientLayout from './client-layout'

export const metadata: Metadata = {
  title: 'Dashboard | Fulldata',
  description: 'Panel principal de Fulldata para gestionar búsquedas y reportes',
  keywords: 'dashboard, panel, fulldata, búsquedas, reportes',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}