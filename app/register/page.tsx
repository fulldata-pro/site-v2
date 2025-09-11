'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth.validation'
import { AUTH_ROUTES } from '@/lib/routes'
import Image from 'next/image'
import avatar from '/public/images/subject.png'
import AuthLogo from '@/components/ui/AuthLogo'

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterInput>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Partial<RegisterInput>>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: keyof RegisterInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    // Clear general error and success
    if (error) {
      setError('')
    }
    if (success) {
      setSuccess('')
    }
  }

  const validateForm = (): boolean => {
    const result = registerSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<RegisterInput> = {}
      result.error.issues.forEach((err: any) => {
        const field = err.path[0] as keyof RegisterInput
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
    setSuccess('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la cuenta')
      }

      if (data.success) {
        setSuccess('Cuenta creada exitosamente. Redirigiendo al login...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        throw new Error(data.error || 'Error al crear la cuenta')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear la cuenta'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Register Form */}
      <div className="w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <AuthLogo />
            <h1 className="text-3xl font-bold text-[#192440] mb-2">Crear cuenta</h1>
            <p className="text-gray-600">Únete a Fulldata para empezar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-4 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 ${errors.firstName ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                  placeholder="Nombre"
                  disabled={isLoading}
                  required
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-4 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 ${errors.lastName ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                  placeholder="Apellido"
                  disabled={isLoading}
                  required
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-6 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 ${errors.email ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                placeholder="Correo electrónico"
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
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-6 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 ${errors.password ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                placeholder="Contraseña"
                disabled={isLoading}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 text-red-800 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-800 px-4 py-3 rounded-xl text-sm">
                {success}
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
                  Creando cuenta...
                </span>
              ) : (
                'Crear cuenta'
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
                type="button"
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
              <span className="text-sm text-gray-500">¿Ya tienes cuenta? </span>
              <Link href={AUTH_ROUTES.LOGIN} className="text-sm text-[#eb1034] hover:text-[#d10e2e] font-medium">
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}