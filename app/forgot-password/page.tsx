'use client'

import { useState } from 'react'
import Link from 'next/link'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth.validation'
import { AUTH_ROUTES } from '@/lib/routes'
import AuthLogo from '@/components/ui/AuthLogo'

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState<ForgotPasswordInput>({
    email: ''
  })
  const [errors, setErrors] = useState<Partial<ForgotPasswordInput>>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof ForgotPasswordInput, value: string) => {
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
    const result = forgotPasswordSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<ForgotPasswordInput> = {}
      result.error.issues.forEach((err: any) => {
        const field = err.path[0] as keyof ForgotPasswordInput
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
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el correo de recuperación')
      }

      if (data.success) {
        setSuccess('Se ha enviado un correo de recuperación a tu email. Revisa tu bandeja de entrada.')
        setFormData({ email: '' })
      } else {
        throw new Error(data.error || 'Error al enviar el correo de recuperación')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar el correo de recuperación'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Forgot Password Form */}
      <div className="w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <AuthLogo />
            <h1 className="text-3xl font-bold text-[#192440] mb-2">Recuperar contraseña</h1>
            <p className="text-gray-600">Ingresa tu email para recuperar tu contraseña</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-6 py-4 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 ${errors.email ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                placeholder="Ingresa tu email"
                disabled={isLoading}
                required
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
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
                  Enviando...
                </span>
              ) : (
                'Enviar correo de recuperación'
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                {/* empty string */}
                <span className="px-4 bg-white text-gray-500"> </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                ¿Recordaste tu contraseña?{' '}
                <Link href={AUTH_ROUTES.LOGIN} className="text-[#eb1034] hover:text-[#d10e2e] font-medium">
                  Inicia sesión
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                ¿No tienes una cuenta?{' '}
                <Link href={AUTH_ROUTES.REGISTER} className="text-[#eb1034] hover:text-[#d10e2e] font-medium">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}