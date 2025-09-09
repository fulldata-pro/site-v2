'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth.validation'
import { AUTH_ROUTES } from '@/lib/routes'
import Image from 'next/image'
import avatar from '/public/images/subject.png'

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
      {/* Left side - 3D Avatar */}
      <div className='hidden bg-white lg:flex p-1 lg:w-1/2'>
        <div className="bg-gradient-to-br w-full h-full rounded-xl from-[#4a5c7a] to-[#3a4c63] items-center justify-center relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-8">
                <Image
                  src={avatar}
                  alt="3D Avatar Illustration"
                  width={1000}
                  height={1000}
                  className="w-[500px] h-[500px] object-contain mx-auto"
                />
              </div>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-24 right-24 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 right-16 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className=" mb-4">
              <span className="text-sm text-gray-500">¿Ya tienes cuenta? </span>
              <Link href={AUTH_ROUTES.LOGIN} className="text-sm text-[#eb1034] hover:text-[#d10e2e] font-medium">
                Inicia sesión
              </Link>
            </div>
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
                  className={`w-full px-4 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eb1034]/20 focus:bg-white transition-all duration-200 ${errors.firstName ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
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
                  className={`w-full px-4 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eb1034]/20 focus:bg-white transition-all duration-200 ${errors.lastName ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
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
                className={`w-full px-6 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eb1034]/20 focus:bg-white transition-all duration-200 ${errors.email ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                placeholder="Correo electrónico"
                disabled={isLoading}
                required
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-6 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eb1034]/20 focus:bg-white transition-all duration-200 ${errors.password ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                placeholder="Contraseña"
                disabled={isLoading}
                required
              />
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
              className="w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-[#eb1034] hover:bg-[#d10e2e] text-white rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
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

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              ¿Olvidaste tu contraseña?{' '}
              <Link href={AUTH_ROUTES.FORGOT_PASSWORD} className="text-[#eb1034] hover:text-[#d10e2e] font-medium">
                Recuperar contraseña
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}