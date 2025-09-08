'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { UserIcon } from '@/components/icons/User-icon'
import { Setting2Icon } from '@/components/icons/setting-2-icon'
import { ProfileUserIcon } from '@/components/icons/profile-user-icon'

export default function MyAccountPage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState('personal')

  // Personal Information form state
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    phone: '',
    company: '',
    address: ''
  })

  // Security form state  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSecurityChange = (field: string, value: string) => {
    setSecurityForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to update personal information
    console.log('Updating personal info:', personalInfo)
  }

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault()

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    // TODO: Implement API call to reset password
    console.log('Resetting password')

    // Clear form
    setSecurityForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
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

              <form onSubmit={handlePersonalInfoSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={personalInfo.name}
                      onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                      className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-gray-400"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all placeholder:text-gray-400"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all placeholder:text-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="company" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={personalInfo.company}
                      onChange={(e) => handlePersonalInfoChange('company', e.target.value)}
                      className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all placeholder:text-gray-400"
                      placeholder="Tu empresa"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="address" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Dirección
                  </label>
                  <textarea
                    id="address"
                    rows={4}
                    value={personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                    className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-gray-400 resize-none"
                    placeholder="Tu dirección completa"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="role" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Rol
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="role"
                      value={personalInfo.role}
                      disabled
                      className="w-full px-4 py-3 border-0 bg-gray-50/80 rounded-xl shadow-sm ring-1 ring-gray-200 text-gray-500 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-4v2m0 0v2m0-2h2m-2 0H10m0-2V9a3 3 0 116 0v2.25" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 bg-gray-50/50 rounded-lg p-3 border-l-4 border-gray-200">
                    🔒 El rol es asignado por el administrador y no puede ser modificado
                  </p>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                  >
                    💾 Guardar Cambios
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
                        Cambiar Contraseña
                      </h2>
                      <p className="text-gray-600 mt-1">Actualiza tu contraseña para mantener tu cuenta segura</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePasswordReset} className="space-y-6 max-w-lg">
                  <div className="space-y-3">
                    <label htmlFor="currentPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={securityForm.currentPassword}
                      onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                      required
                      className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      placeholder="Ingresa tu contraseña actual"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={securityForm.newPassword}
                      onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                      placeholder="Ingresa tu nueva contraseña"
                    />
                    <p className="text-xs text-gray-500 bg-gray-50/50 rounded-lg p-3 border-l-4 border-green-200">
                      🔐 La contraseña debe tener al menos 8 caracteres
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={securityForm.confirmPassword}
                      onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                      required
                      className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-red-300/50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                    >
                      🔒 Cambiar Contraseña
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