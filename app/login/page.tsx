'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAppDispatch } from '@/store/hooks'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import authService from '@/services/authService'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    dispatch(loginStart())
    
    try {
      const { user, token } = await authService.login({ email, password })
      document.cookie = `authToken=${token}; path=/`
      dispatch(loginSuccess(user))
      router.push('/dashboard')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión'
      dispatch(loginFailure(errorMessage))
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-secondary-light">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo-icon.svg"
                alt="Fulldata Logo"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <h1 className="text-3xl font-bold text-secondary mb-2">Bienvenido a Fulldata</h1>
            <p className="text-gray-600">Sistema de Búsqueda de Información</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg font-semibold"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Credenciales de prueba:
            </p>
            <div className="mt-2 space-y-1 text-xs text-center text-gray-500">
              <p>Admin: admin@fulldata.com / admin123</p>
              <p>Usuario: user@fulldata.com / user123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}