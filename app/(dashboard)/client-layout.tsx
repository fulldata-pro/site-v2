'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginSuccess } from '@/store/slices/authSlice'
import authService from '@/services/authService'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  // Public routes that don't need dashboard layout
  const publicRoutes = ['/landing', '/login', '/register', '/forgot-password', '/reset-password']
  const isPublicRoute = publicRoutes.includes(pathname)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.validateToken()
        if (user) {
          dispatch(loginSuccess(user))
        } else if (!isPublicRoute) {
          // Use replace instead of push to avoid navigation conflicts
          router.replace('/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        if (!isPublicRoute) {
          router.replace('/login')
        }
      }
    }

    if (!isAuthenticated && !isPublicRoute) {
      // Add small delay to prevent DOM conflicts during hydration
      const timer = setTimeout(() => {
        checkAuth()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, dispatch, router, isPublicRoute])

  // If it's a public route, just render children without dashboard layout
  if (isPublicRoute) {
    return <>{children}</>
  }

  // Show loading for protected routes while checking authentication
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

  // For all other routes (protected), wrap with dashboard layout
  const isReportPage = pathname?.includes('/reports/')

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`${isReportPage ? 'ml-6' : 'ml-64'} flex flex-col min-h-screen`}>
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