'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { updateProfile } from '@/store/slices/authSlice'
import { UserIcon } from '@/components/icons/User-icon'
import { Setting2Icon } from '@/components/icons/setting-2-icon'
import { ProfileUserIcon } from '@/components/icons/profile-user-icon'
import { 
  updateProfileSchema, 
  changePasswordSchema, 
  setPasswordSchema,
  type UpdateProfileInput,
  type ChangePasswordInput,
  type SetPasswordInput
} from '@/lib/validations/auth.validation'

export default function MyAccountPage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('personal')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Personal Information form state
  const [personalInfo, setPersonalInfo] = useState<UpdateProfileInput>({
    firstName: '',
    lastName: '',
    phone: '',
    phonePrefix: ''
  })

  // Security form state  
  const [securityForm, setSecurityForm] = useState<ChangePasswordInput | SetPasswordInput>({
    newPassword: '',
    confirmPassword: '',
    ...(user?.isGoogleUser ? {} : { currentPassword: '' })
  })

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        phonePrefix: user.phonePrefix || ''
      })
    }
  }, [user])

  const handlePersonalInfoChange = (field: keyof UpdateProfileInput, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear field error
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }))
    }
    clearMessages()
  }

  const handleSecurityChange = (field: string, value: string) => {
    setSecurityForm(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear field error
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }))
    }
    clearMessages()
  }

  const clearMessages = () => {
    if (successMessage) setSuccessMessage('')
    if (errorMessage) setErrorMessage('')
  }

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    clearMessages()

    // Validate form
    const result = updateProfileSchema.safeParse(personalInfo)
    if (!result.success) {
      const fieldErrors: any = {}
      result.error.issues.forEach((err: any) => {
        const field = err.path[0] as keyof UpdateProfileInput
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personalInfo),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar el perfil')
      }

      // Update Redux store
      dispatch(updateProfile(data.user))
      setSuccessMessage('Perfil actualizado exitosamente')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar el perfil'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    clearMessages()

    // Validate form based on user type
    const schema = user?.isGoogleUser ? setPasswordSchema : changePasswordSchema
    const result = schema.safeParse(securityForm)

    if (!result.success) {
      const fieldErrors: any = {}
      result.error.issues.forEach((err: any) => {
        const field = err.path[0]
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(securityForm),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al cambiar la contraseña')
      }

      setSuccessMessage(data.message)
      // Clear form
      setSecurityForm({
        newPassword: '',
        confirmPassword: '',
        ...(user?.isGoogleUser ? {} : { currentPassword: '' })
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cambiar la contraseña'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'personal', name: 'Información Personal', icon: UserIcon, description: 'Gestiona tus datos personales' },
    { id: 'security', name: 'Seguridad', icon: Setting2Icon, description: 'Cambia contraseña y configuraciones' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg shadow-red-500/25">
              <ProfileUserIcon className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Mi Cuenta
              </h1>
              <p className="text-gray-600 mt-1">Gestiona tu información personal y configuración de seguridad</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 bg-white/70 backdrop-blur-sm rounded-t-xl">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`text-lg transition-colors ${activeTab === tab.id ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-600'
                        }`} />
                      <span>{tab.name}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{tab.description}</div>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50">
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Información Personal
                    </h2>
                    <p className="text-gray-600 mt-1">Actualiza tu información personal y datos de contacto</p>
                  </div>
                </div>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handlePersonalInfoSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                      className={`w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-gray-400 ${
                        errors.firstName ? 'ring-red-300 focus:ring-red-500' : ''
                      }`}
                      placeholder="Tu nombre"
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                      className={`w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all placeholder:text-gray-400 ${
                        errors.lastName ? 'ring-red-300 focus:ring-red-500' : ''
                      }`}
                      placeholder="Tu apellido"
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Correo Electrónico
                      {user?.isGoogleUser && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Google</span>
                      )}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-3 border-0 bg-gray-50/80 rounded-xl shadow-sm ring-1 ring-gray-200 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 bg-gray-50/50 rounded-lg p-3 border-l-4 border-gray-200">
                      🔒 El correo electrónico no puede ser modificado
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={personalInfo.phone || ''}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all placeholder:text-gray-400 ${
                        errors.phone ? 'ring-red-300 focus:ring-red-500' : ''
                      }`}
                      placeholder="+1 (555) 123-4567"
                      disabled={isLoading}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? '⏳ Guardando...' : '💾 Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password Change Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50">
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        {user?.isGoogleUser ? 'Establecer Contraseña' : 'Cambiar Contraseña'}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {user?.isGoogleUser 
                          ? 'Establece una contraseña para poder acceder también sin Google'
                          : 'Actualiza tu contraseña para mantener tu cuenta segura'
                        }
                      </p>
                      {user?.isGoogleUser && (
                        <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                          <p className="text-sm text-blue-700">
                            🔑 Como iniciaste sesión con Google, puedes establecer una contraseña adicional para mayor flexibilidad.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-6">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-6 max-w-lg">
                  {!user?.isGoogleUser && (
                    <div className="space-y-3">
                      <label htmlFor="currentPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={(securityForm as ChangePasswordInput).currentPassword || ''}
                        onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                        required={!user?.isGoogleUser}
                        className={`w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all ${
                          errors.currentPassword ? 'ring-red-300 focus:ring-red-500' : ''
                        }`}
                        placeholder="Ingresa tu contraseña actual"
                        disabled={isLoading}
                      />
                      {errors.currentPassword && (
                        <p className="text-sm text-red-600">{errors.currentPassword}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-3">
                    <label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {user?.isGoogleUser ? 'Contraseña' : 'Nueva Contraseña'}
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={securityForm.newPassword}
                      onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                      required
                      minLength={6}
                      className={`w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all ${
                        errors.newPassword ? 'ring-red-300 focus:ring-red-500' : ''
                      }`}
                      placeholder={user?.isGoogleUser ? 'Ingresa tu contraseña' : 'Ingresa tu nueva contraseña'}
                      disabled={isLoading}
                    />
                    {errors.newPassword && (
                      <p className="text-sm text-red-600">{errors.newPassword}</p>
                    )}
                    <p className="text-xs text-gray-500 bg-gray-50/50 rounded-lg p-3 border-l-4 border-green-200">
                      🔐 La contraseña debe tener al menos 6 caracteres
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Confirmar {user?.isGoogleUser ? 'Contraseña' : 'Nueva Contraseña'}
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={securityForm.confirmPassword}
                      onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                      required
                      className={`w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
                        errors.confirmPassword ? 'ring-red-300 focus:ring-red-500' : ''
                      }`}
                      placeholder={user?.isGoogleUser ? 'Confirma tu contraseña' : 'Confirma tu nueva contraseña'}
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-red-300/50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading 
                        ? '⏳ Procesando...' 
                        : user?.isGoogleUser 
                          ? '🔑 Establecer Contraseña' 
                          : '🔒 Cambiar Contraseña'
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Additional Security Options */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50">
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg shadow-purple-500/25">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Seguridad Avanzada
                      </h2>
                      <p className="text-gray-600 mt-1">Configura opciones adicionales de seguridad</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="bg-white/60 rounded-xl p-6 border border-gray-100 transition-all hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Sesiones Activas</h4>
                          <p className="text-sm text-gray-600">Revisa y cierra sesiones activas en otros dispositivos</p>
                        </div>
                      </div>
                      <button className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-medium">
                        Ver Sesiones
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/60 rounded-xl p-6 border border-gray-100 transition-all hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-4v2m0 0v2m0-2h2m-2 0H10" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Autenticación de Dos Factores</h4>
                          <p className="text-sm text-gray-600">Añade una capa extra de seguridad a tu cuenta</p>
                        </div>
                      </div>
                      <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-medium">
                        Configurar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}