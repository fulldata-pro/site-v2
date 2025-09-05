'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginSuccess } from '@/store/slices/authSlice'
import authService from '@/services/authService'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}