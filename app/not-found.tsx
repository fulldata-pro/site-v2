'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HomeIcon, SearchIcon, ArrowLeftIcon } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, router])

  // Don't render anything while checking authentication
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-blue-50/20 to-purple-50/30 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl w-full text-center"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl shadow-slate-200/20 p-12">
          
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-8xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
              404
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto"></div>
          </motion.div>

          {/* Main message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Página no encontrada
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
              <br />
              Verifica la URL o regresa al dashboard.
            </p>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 p-6">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <SearchIcon className="w-5 h-5" />
                Sugerencias:
              </h3>
              <ul className="text-left text-blue-700 space-y-2">
                <li>• Verifica que la URL esté escrita correctamente</li>
                <li>• La página puede haber sido movida o eliminada</li>
                <li>• Regresa al dashboard y navega desde ahí</li>
                <li>• Usa el menú lateral para encontrar lo que buscas</li>
              </ul>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-xl hover:scale-105"
            >
              <HomeIcon className="w-5 h-5" />
              Ir al Dashboard
            </Link>
            
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Página anterior
            </button>
          </motion.div>

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 pt-8 border-t border-gray-200/50"
          >
            <p className="text-sm text-gray-500">
              Si el problema persiste, contacta al{' '}
              <span className="text-blue-600 font-medium">soporte técnico</span>
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}