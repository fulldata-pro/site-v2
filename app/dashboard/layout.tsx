'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginSuccess } from '@/store/slices/authSlice'
import authService from '@/services/authService'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.validateToken()
      if (user) {
        dispatch(loginSuccess(user))
      } else {
        router.push('/login')
      }
    }

    if (!isAuthenticated) {
      checkAuth()
    }
  }, [isAuthenticated, dispatch, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  const isReportPage = pathname?.includes('/dashboard/reports/')

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <Header />
        <main className={`flex-1 ${isReportPage ? '' : 'p-8'} overflow-x-hidden`}>
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}