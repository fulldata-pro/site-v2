'use client'

import { useState } from 'react'
import { WalletEmptyIcon } from '@/components/icons/wallet-empty'
import { InformationIcon } from '@/components/icons/information-icon'
import GeminiStarsIcon from '@/components/icons/Magic-wand'
import { ServiceIcon } from '@/components/icons/service-icon'
import { Technology4 } from '@/components/icons/technology-4'
import { FaceIdIcon } from '@/components/icons/face-id-icon'

interface ServiceCredit {
  id: string
  name: string
  service: string
  color: string
  bgColor: string
  price: number
  quantity: number
  description: string
  available?: number
}

export default function CreditsPurchasePage() {
  const [activeTab, setActiveTab] = useState<'argentina' | 'global' | 'chile'>('argentina')
  const [currency, setCurrency] = useState('ARS')
  const [hasDiscount, setHasDiscount] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discountError, setDiscountError] = useState('')
  
  const [argentinaServices, setArgentinaServices] = useState<ServiceCredit[]>([
    {
      id: 'personas',
      name: 'Personas',
      service: 'PEOPLE',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      price: 1389.66,
      quantity: 2,
      description: 'Búsqueda completa de datos personales',
      available: 478
    },
    {
      id: 'empresas',
      name: 'Empresas',
      service: 'COMPANIES',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      price: 2751.8,
      quantity: 1,
      description: 'Información corporativa y financiera',
      available: 498
    },
    {
      id: 'telefonos',
      name: 'Teléfonos',
      service: 'PHONES',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      price: 385.25,
      quantity: 0,
      description: 'Validación y datos de líneas telefónicas',
      available: 500
    },
    {
      id: 'vehiculos',
      name: 'Vehículos',
      service: 'VEHICLES',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      price: 1100.72,
      quantity: 0,
      description: 'Historial y datos de automotores',
      available: 499
    },
    {
      id: 'cuentas',
      name: 'Cuentas Bancarias',
      service: 'BANKS',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      price: 151.35,
      quantity: 0,
      description: 'Información de cuentas bancarias',
      available: 460
    }
  ])

  const [globalServices, setGlobalServices] = useState<ServiceCredit[]>([
    {
      id: 'rastreo',
      name: 'Rastreo Web',
      service: 'OSINT',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      price: 450.00,
      quantity: 0,
      description: 'Búsqueda en internet y redes sociales'
    },
    {
      id: 'validacion',
      name: 'Validación de Identidad',
      service: 'IDENTITY',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      price: 850.00,
      quantity: 0,
      description: 'Verificación biométrica y documental'
    }
  ])

  const updateQuantity = (services: ServiceCredit[], setServices: Function, id: string, delta: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, quantity: Math.max(0, service.quantity + delta) }
        : service
    ))
  }

  const calculateSubtotal = () => {
    let total = 0
    if (activeTab === 'argentina') {
      total = argentinaServices.reduce((acc, service) => acc + (service.price * service.quantity), 0)
    } else if (activeTab === 'global') {
      total = globalServices.reduce((acc, service) => acc + (service.price * service.quantity), 0)
    }
    return total
  }

  const calculateDiscount = () => {
    if (!hasDiscount) return 0
    return calculateSubtotal() * 0.05 // 5% first purchase discount
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount()
  }

  const validateDiscountCode = () => {
    // Simulated validation - in production this would call an API
    const validCodes = ['PROMO2024', 'FULLDATA10', 'WELCOME5', 'FIRST5']
    
    if (discountCode.trim() === '') {
      setDiscountError('Por favor ingresa un código')
      return
    }
    
    if (validCodes.includes(discountCode.toUpperCase())) {
      setHasDiscount(true)
      setShowCodeInput(false)
      setDiscountError('')
    } else {
      setDiscountError('Código inválido')
    }
  }

  const removeDiscount = () => {
    setHasDiscount(false)
    setDiscountCode('')
    setDiscountError('')
    setShowCodeInput(false)
  }

  const getTotalCredits = () => {
    if (activeTab === 'argentina') {
      return argentinaServices.reduce((acc, service) => acc + service.quantity, 0)
    } else if (activeTab === 'global') {
      return globalServices.reduce((acc, service) => acc + service.quantity, 0)
    }
    return 0
  }

  const handlePurchase = () => {
    // Here would go the payment integration
    alert('Redirecting to payment gateway...')
  }

  const currencies = [
    { code: 'ARS', name: 'Pesos Argentinos', symbol: '$' },
    { code: 'USD', name: 'Dólares', symbol: 'U$S' },
    { code: 'EUR', name: 'Euros', symbol: '€' }
  ]

  const currentServices = activeTab === 'argentina' ? argentinaServices : activeTab === 'global' ? globalServices : []
  const setCurrentServices = activeTab === 'argentina' ? setArgentinaServices : activeTab === 'global' ? setGlobalServices : () => {}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Compra de Créditos
              </h1>
              <p className="text-gray-600 mt-1">
                Selecciona los servicios que deseas adquirir para tu cuenta y personaliza la cantidad de créditos para cada uno.
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Saldo actual</p>
                <p className="text-2xl font-bold text-gray-900">3,121</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
                <WalletEmptyIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Country Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveTab('argentina')}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === 'argentina'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">🇦🇷</span>
                  Argentina
                </button>
                <button
                  onClick={() => setActiveTab('global')}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === 'global'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Technology4 className="w-5 h-5" />
                  Global
                </button>
                <button
                  onClick={() => setActiveTab('chile')}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === 'chile'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">🇨🇱</span>
                  Chile
                </button>
              </div>
            </div>

            {/* Services List */}
            {activeTab !== 'chile' ? (
              <div className="space-y-4">
                {currentServices.map((service) => {
                  return (
                    <div
                      key={service.id}
                      className={`bg-white rounded-2xl shadow-sm border ${
                        service.quantity > 0 ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100'
                      } p-6 transition-all duration-200`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center`}>
                            <ServiceIcon service={service.service} className={`w-6 h-6 ${service.color}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                              {service.available && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {service.available} disponibles
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{service.description}</p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              ARS {service.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(currentServices, setCurrentServices, service.id, -1)}
                            className="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                            disabled={service.quantity === 0}
                          >
                            <span className="text-gray-600">−</span>
                          </button>
                          <div className="w-16 text-center">
                            <span className="text-xl font-semibold text-gray-900">{service.quantity}</span>
                          </div>
                          <button
                            onClick={() => updateQuantity(currentServices, setCurrentServices, service.id, 1)}
                            className="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                          >
                            <span className="text-gray-600">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <InformationIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Próximamente</h3>
                <p className="text-gray-500">Los servicios para Chile estarán disponibles pronto</p>
              </div>
            )}

            {/* Info Note */}
            {activeTab !== 'chile' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <InformationIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Nota importante</p>
                    <p>(*) Las compras que se realicen en fullData pueden demorar algunos minutos en impactar. 
                    Estos valores son estimados con el tipo de Cambio del día, esto puede variar al finalizar el proceso.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Purchase Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <WalletEmptyIcon className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Resumen de Compra</h3>
                </div>
                
                {/* Currency Selector */}
                <div className="mb-4">
                  <label className="text-white/80 text-sm mb-2 block">Moneda</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur"
                  >
                    {currencies.map(curr => (
                      <option key={curr.code} value={curr.code} className="text-gray-900">
                        ({curr.code}) {curr.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Services Summary */}
                {activeTab === 'argentina' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-xl">🇦🇷</span>
                      <span className="font-medium">Argentina</span>
                    </div>
                    {argentinaServices.filter(s => s.quantity > 0).map(service => {
                          return (
                        <div key={service.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <ServiceIcon service={service.service} className="w-4 h-4 text-white/80" />
                            <span className="text-white/90">{service.name} x{service.quantity}</span>
                          </div>
                          <span className="font-medium">
                            ARS {(service.price * service.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              
              <div className="p-6 space-y-4">
                {/* Totals */}
                <div className="space-y-3 pb-4 border-b border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ARS {calculateSubtotal().toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {hasDiscount && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">Descuento</span>
                          <button
                            onClick={removeDiscount}
                            className="text-xs text-red-500 hover:text-red-700 underline"
                          >
                            quitar
                          </button>
                        </div>
                        <span className="font-semibold text-green-600">
                          -ARS {calculateDiscount().toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-center">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Código: {discountCode.toUpperCase()} (-5%)
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {!hasDiscount && !showCodeInput && (
                    <button
                      onClick={() => setShowCodeInput(true)}
                      className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <GeminiStarsIcon className="w-4 h-4" />
                      Agregar Código de Beneficio
                    </button>
                  )}
                  
                  {showCodeInput && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => {
                            setDiscountCode(e.target.value.toUpperCase())
                            setDiscountError('')
                          }}
                          placeholder="Ingresa tu código"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              validateDiscountCode()
                            }
                          }}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={validateDiscountCode}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Aplicar
                          </button>
                          <button
                            onClick={() => {
                              setShowCodeInput(false)
                              setDiscountCode('')
                              setDiscountError('')
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                      {discountError && (
                        <p className="text-xs text-red-500 text-center">{discountError}</p>
                      )}
                      <p className="text-xs text-gray-500 text-center">Códigos de prueba: PROMO2024, FULLDATA10, WELCOME5, FIRST5</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ARS {calculateTotal().toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Credits Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GeminiStarsIcon className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-purple-700 font-medium">Total de créditos</span>
                    </div>
                    <span className="text-xl font-bold text-purple-900">{getTotalCredits()}</span>
                  </div>
                </div>
                
                {/* Purchase Button */}
                <button
                  onClick={handlePurchase}
                  disabled={getTotalCredits() === 0}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <WalletEmptyIcon className="w-5 h-5" />
                  Pagar con Mercado Pago
                </button>
                
                {/* Security Note */}
                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                  <FaceIdIcon className="w-4 h-4" />
                  <span>Pago 100% seguro y procesado al instante</span>
                </div>
                
                {/* Mercado Pago Logo */}
                <div className="flex justify-center pt-2">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <span className="text-sm font-semibold text-gray-700">mercado pago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}