import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión | Fulldata',
  description: 'Accede a tu cuenta de Fulldata para gestionar búsquedas de personas, empresas, vehículos y más',
  keywords: 'login, iniciar sesión, fulldata, autenticación',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
