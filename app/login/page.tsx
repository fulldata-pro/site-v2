'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useAppDispatch } from '@/store/hooks'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import authService from '@/services/authService'
import { loginSchema, type LoginInput } from '@/lib/validations/auth.validation'
import { DASHBOARD_ROUTES, AUTH_ROUTES } from '@/lib/routes'
import avatar from '/public/images/subject.png'
import AuthLogo from '@/components/ui/AuthLogo'

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginInput>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginInput>>({})
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleInputChange = (field: keyof LoginInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    // Clear general error
    if (error) {
      setError('')
    }
  }

  const validateForm = (): boolean => {
    const result = loginSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<LoginInput> = {}
      result.error.issues.forEach((err: any) => {
        const field = err.path[0] as keyof LoginInput
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    dispatch(loginStart())

    try {
      const { user } = await authService.login(formData)
      dispatch(loginSuccess(user))
      // Use replace instead of push to avoid navigation conflicts
      router.replace(DASHBOARD_ROUTES.HOME)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión'
      dispatch(loginFailure(errorMessage))
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('google', {
        callbackUrl: ' ',
        redirect: false
      })

      if (result?.error) {
        setError('Error al iniciar sesión con Google')
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (err) {
      setError('Error al iniciar sesión con Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Login Form */}
      <div className="w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <AuthLogo  />
            <h1 className="text-3xl font-bold text-[#192440] mb-2">¡Hola de nuevo!</h1>
            <p className="text-gray-600">¡Bienvenido de vuelta, te hemos extrañado!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-6 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 ${errors.email ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                placeholder="Ingresa tu usuario"
                disabled={isLoading}
                required
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-6 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 ${errors.password ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                placeholder="Contraseña"
                disabled={isLoading}
                required
              />
              <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link href={AUTH_ROUTES.FORGOT_PASSWORD} className="text-sm text-[#eb1034] hover:text-[#d10e2e]">
                Recuperar contraseña
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 text-red-800 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-[#eb1034] hover:bg-[#d10e2e] text-white rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">o continúa con</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex justify-center items-center px-4 py-3 border border-[#192440]/20 rounded-2xl shadow-sm bg-white text-[#192440] hover:bg-gray-50 hover:border-[#192440]/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar con Google
              </button>
            </div>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">¿No tienes cuenta? </span>
              <Link href={AUTH_ROUTES.REGISTER} className="text-sm text-[#eb1034] hover:text-[#d10e2e] font-medium">
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}