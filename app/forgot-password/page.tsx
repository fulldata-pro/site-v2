'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth.validation'

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
            <h1 className="text-3xl font-bold text-secondary mb-2">Olvidé mi Contraseña</h1>
            <p className="text-gray-600">Ingresa tu email para recuperar tu contraseña</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`input-field ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="usuario@ejemplo.com"
                disabled={isLoading}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enviando...' : 'Enviar Correo de Recuperación'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center space-y-2">
            <p className="text-sm text-gray-600">
              ¿Recordaste tu contraseña?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Iniciar sesión
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}