'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ServiceIcon } from '@/components/icons/service-icon'
import Image from 'next/image'
import { PaymentMethod, ServicesType } from '@/lib/constants'
import { ShieldCheckIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { MercadoPagoService } from '@/services/mercadoPago'
import { PaymentMethodIcon } from '@/components/payment-method-icon'
import { FlagIcon } from '@/components/flag-icon'

interface ServiceCredit {
  id: string
  name: string
  service: string
  price: number
  quantity: number
  description: string
  available?: number
  features: string[]
}

interface TabConfig {
  id: 'argentina' | 'global' | 'chile'
  name: string
  countryCode: string
}

interface iPaymentMethod {
  id: PaymentMethod
  name: string
  description: string
  available: boolean
  trusted: boolean
}

const TABS: TabConfig[] = [
  { id: 'argentina', name: 'Argentina', countryCode: 'ar' },
  { id: 'global', name: 'Global', countryCode: 'global' },
  { id: 'chile', name: 'Chile', countryCode: 'cl' }
]

const PAYMENT_METHODS: iPaymentMethod[] = [
  {
    id: PaymentMethod.MERCADO_PAGO,
    name: 'Mercado Pago',
    description: 'Solo para pagos en pesos argentinos (ARS)',
    available: true,
    trusted: true
  },
  {
    id: PaymentMethod.STRIPE,
    name: 'Stripe',
    description: 'Solo para pagos en dólares americanos (USD)',
    available: true,
    trusted: true
  }
]

export default function CreditsPurchase3Page() {
  const [currentStep, setCurrentStep] = useState(1)
  const [activeTab, setActiveTab] = useState<'argentina' | 'global' | 'chile'>('argentina')
  const [currency, setCurrency] = useState('ARS')
  const [hasDiscount, setHasDiscount] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discountError, setDiscountError] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [argentinaServices, setArgentinaServices] = useState<ServiceCredit[]>([
    {
      id: ServicesType.PEOPLE,
      name: 'Consulta de Personas',
      service: 'PEOPLE',
      price: 1389.66,
      quantity: 0,
      description: 'Búsqueda completa de datos personales',
      available: 478,
      features: [
        'Datos personales completos',
        'Historial de domicilios',
        'Información de contacto',
        'Antecedentes judiciales',
        'Verificación de identidad',
        'Vínculos familiares'
      ]
    },
    {
      id: ServicesType.COMPANIES,
      name: 'Información Empresarial',
      service: 'COMPANIES',
      price: 2751.8,
      quantity: 0,
      description: 'Datos corporativos, financieros y registros empresariales',
      available: 498,
      features: [
        'Datos de constitución',
        'Estados financieros',
        'Directorio de autoridades',
        'Situación fiscal (AFIP)',
        'Participación societaria',
        'Antecedentes comerciales',
        'Registro de marcas'
      ]
    },
    {
      id: ServicesType.PHONES,
      name: 'Validación Telefónica',
      service: 'PHONES',
      price: 385.25,
      quantity: 0,
      description: 'Verificación y datos de líneas telefónicas',
      available: 500,
      features: [
        'Validación de número',
        'Operadora y plan',
        'Titular de la línea',
        'Fecha de activación',
        'Tipo de servicio',
        'Ubicación geográfica'
      ]
    },
    {
      id: ServicesType.VEHICLES,
      name: 'Registro Vehicular',
      service: 'VEHICLES',
      price: 1100.72,
      quantity: 0,
      description: 'Historial y datos técnicos de automotores',
      available: 499,
      features: [
        'Datos del propietario',
        'Historial de transferencias',
        'Información técnica',
        'Verificación policial',
        'Prendas e inhibiciones',
        'Multas e infracciones',
        'Verificación VTV'
      ]
    },
    {
      id: ServicesType.BANKS,
      name: 'Información Bancaria',
      service: 'BANKS',
      price: 151.35,
      quantity: 0,
      description: 'Datos de cuentas y productos financieros',
      available: 460,
      features: [
        'Cuentas bancarias activas',
        'Productos crediticios',
        'Situación crediticia',
        'Central de deudores',
        'Garantías otorgadas',
        'Calificación crediticia'
      ]
    }
  ])

  const [globalServices, setGlobalServices] = useState<ServiceCredit[]>([
    {
      id: ServicesType.OSINT,
      name: 'Inteligencia Digital',
      service: 'OSINT',
      price: 450.00,
      quantity: 0,
      description: 'Búsqueda avanzada en fuentes abiertas',
      features: [
        'Redes sociales públicas',
        'Presencia digital',
        'Noticias y menciones',
        'Registros públicos online',
        'Bases de datos abiertas',
        'Análisis de patrones'
      ]
    },
    {
      id: ServicesType.IDENTITY,
      name: 'Verificación Global',
      service: 'IDENTITY',
      price: 850.00,
      quantity: 0,
      description: 'Validación biométrica internacional',
      features: [
        'Verificación biométrica',
        'Validación de documentos',
        'Detección de fraude',
        'Listas internacionales',
        'Verificación facial',
        'Análisis de autenticidad',
        'Reportes forenses'
      ]
    }
  ])

  const currencies = [
    { code: 'ARS', name: 'Pesos Argentinos', flag: '🇦🇷' },
    { code: 'USD', name: 'Dólares Americanos', flag: '🇺🇸' }
  ]

  const currentServices = useMemo(() => {
    return activeTab === 'argentina' ? argentinaServices : activeTab === 'global' ? globalServices : []
  }, [activeTab, argentinaServices, globalServices])

  const setCurrentServices = activeTab === 'argentina' ? setArgentinaServices : activeTab === 'global' ? setGlobalServices : () => { }

  const updateQuantity = (services: ServiceCredit[], setServices: Function, id: string, delta: number) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, quantity: Math.max(0, service.quantity + delta) }
        : service
    ))
  }

  const totals = useMemo(() => {
    const subtotal = currentServices.reduce((acc, service) => acc + (service.price * service.quantity), 0)
    const discount = hasDiscount ? subtotal * 0.05 : 0
    const total = subtotal - discount
    const credits = currentServices.reduce((acc, service) => acc + service.quantity, 0)

    return { subtotal, discount, total, credits }
  }, [currentServices, hasDiscount])

  const validateDiscountCode = () => {
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

  const handleNextStep = () => {
    if (totals.credits > 0) {
      setCurrentStep(2)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(1)
  }

  const handlePurchase = async () => {
    if (!selectedPaymentMethod) {
      alert('Por favor selecciona un método de pago')
      return
    }

    setIsProcessing(true)

    try {
      if (selectedPaymentMethod === 'mercadopago') {
        // Format services for MercadoPago
        const items = MercadoPagoService.formatPaymentItems(
          currentServices.filter(s => s.quantity > 0),
          totals.discount
        )

        // Get current URL for redirect
        const baseUrl = window.location.origin

        // Create payment data
        const paymentData = MercadoPagoService.createPaymentData(
          items,
          baseUrl,
          `order-${Date.now()}` // External reference
        )

        // Call API endpoint to create preference
        const apiResponse = await fetch('/api/payment/mercadopago', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        })

        const response = await apiResponse.json()

        if (response.success && response.init_point) {
          // Redirect to MercadoPago payment page
          window.location.href = response.init_point
        } else {
          throw new Error(response.error || 'Error al crear la preferencia de pago')
        }
      } else if (selectedPaymentMethod === 'stripe') {
        // For Stripe payment (to be implemented later)
        alert('Stripe payment will be implemented soon')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert(`Error al procesar el pago: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
      setScrollPosition(scrollLeft)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
      setTimeout(checkScrollButtons, 100)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
      setTimeout(checkScrollButtons, 100)
    }
  }

  const getCardScale = (index: number) => {
    if (!scrollContainerRef.current) return 1

    const container = scrollContainerRef.current
    const containerWidth = container.clientWidth
    const scrollLeft = container.scrollLeft
    const cardWidth = 308 // 288px card width + 20px gap

    // Calculate which card should be in the center
    const centerPosition = scrollLeft + (containerWidth / 2)
    const cardCenter = (index * cardWidth) + (cardWidth / 2) + 64 // Add padding offset
    const distance = Math.abs(centerPosition - cardCenter)

    // If card is close to center, scale it up
    return distance < cardWidth / 1.5 ? 1.05 : 1
  }

  const handleScroll = () => {
    checkScrollButtons()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollButtons()
    }, 500)
    return () => clearTimeout(timer)
  }, [currentServices, activeTab])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
      <div className="max-w-5xl mx-auto px-6 py-8 pb-32">



        {/* Step Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-4 bg-white rounded-3xl p-3 shadow-lg border border-blue-100/50">
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${currentStep === 1 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
              }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-white text-blue-700'
                }`}>
                {currentStep === 1 ? '1' : '✓'}
              </div>
              <span className="text-sm font-medium">Selección</span>
            </div>

            <div className="w-20 h-1.5 bg-blue-100 rounded-full">
              <div className={`h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ${currentStep === 2 ? 'w-full' : 'w-0'
                }`}></div>
            </div>

            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${currentStep === 2 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' : 'bg-gray-100 text-gray-500'
              }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                2
              </div>
              <span className="text-sm font-medium">Pago</span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Region Tabs */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white rounded-3xl p-2 shadow-lg border border-blue-100/50">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-blue-50'
                        }`}
                    >
                      <span>{<FlagIcon countryCode={tab.countryCode} />}</span>
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services Horizontal Carousel */}
              <AnimatePresence mode="wait">
                {activeTab !== 'chile' ? (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 relative"
                  >
                    {/* Navigation Arrow Left */}
                    {canScrollLeft && (
                      <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl border border-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 hover:scale-110"
                      >
                        <ChevronLeftIcon className="w-6 h-6" />
                      </button>
                    )}

                    {/* Navigation Arrow Right */}
                    {canScrollRight && (
                      <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl border border-blue-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 hover:scale-110"
                      >
                        <ChevronRightIcon className="w-6 h-6" />
                      </button>
                    )}

                    <div
                      ref={scrollContainerRef}
                      className="overflow-x-auto scrollbar-hide px-16 py-8"
                      onScroll={handleScroll}
                    >
                      <div className="flex gap-5 pb-4" style={{ width: 'max-content' }}>
                        {currentServices.map((service, index) => {
                          const cardScale = getCardScale(index)
                          const isHighlighted = cardScale > 1

                          return (
                            <motion.div
                              key={service.id}
                              initial={{ opacity: 0, x: 50 }}
                              animate={{
                                opacity: 1,
                                x: 0,
                                scale: cardScale,
                                zIndex: isHighlighted ? 10 : 1
                              }}
                              transition={{
                                delay: index * 0.1,
                                duration: 0.4,
                                scale: { duration: 0.3 }
                              }}
                              className="relative flex-shrink-0 w-72 min-h-[460px]"
                            >
                              <div className={`relative h-full bg-gradient-to-br from-white to-slate-50/50 rounded-3xl border-2 transition-all duration-300 hover:shadow-xl ${isHighlighted
                                ? 'border-blue-400 shadow-xl ring-2 ring-blue-200/50'
                                : service.quantity > 0
                                  ? 'ring-2 ring-blue-500 shadow-xl border-blue-300'
                                  : 'border-slate-200 hover:border-blue-300 shadow-lg'
                                }`}>

                                {/* Quantity Badge */}
                                {service.quantity > 0 && (
                                  <div className="absolute -top-2 -left-2 z-10">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                      <span className="text-white font-bold text-xs">{service.quantity}</span>
                                    </div>
                                  </div>
                                )}

                                <div className="p-4 h-full flex flex-col">
                                  {/* Service Header */}
                                  <div className="text-center mb-3">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3 border border-gray-100">
                                      <ServiceIcon service={service.id} className="text-xl" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-1">{service.name}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-1">{service.description}</p>
                                    {service.available && (
                                      <span className="inline-block text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full font-medium border border-emerald-200">
                                        {service.available} disponibles
                                      </span>
                                    )}
                                  </div>

                                  {/* Features Checklist */}
                                  <div className="flex-1 mb-3">
                                    <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-1.5">
                                      <CheckCircleIcon className="w-3 h-3 text-blue-600" />
                                      Incluye:
                                    </h4>
                                    <div className="space-y-1">
                                      {service.features.slice(0, 3).map((feature, idx) => (
                                        <motion.div
                                          key={feature}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                                          className="flex items-center gap-1.5 p-1 "
                                        >
                                          <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                                          <span className="text-gray-700 text-sm">{feature}</span>
                                        </motion.div>
                                      ))}
                                      {service.features.length > 3 && (
                                        <div className="text-sm text-gray-500 text-center py-1">
                                          +{service.features.length - 3} más
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Pricing and Controls */}
                                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 border border-gray-200 shadow-md mt-auto">
                                    <div className="text-center mb-3">
                                      <span className="text-xl font-bold text-gray-800">
                                        ${service.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                                      </span>
                                      <span className="text-sm text-gray-500 ml-1">ARS</span>
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => updateQuantity(currentServices, setCurrentServices, service.id, -1)}
                                          disabled={service.quantity === 0}
                                          className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-rose-200 hover:scale-110"
                                        >
                                          −
                                        </button>

                                        <div className="text-center min-w-[40px]">
                                          <span className="block text-xl font-bold text-gray-800">
                                            {service.quantity}
                                          </span>
                                        </div>

                                        <button
                                          onClick={() => updateQuantity(currentServices, setCurrentServices, service.id, 1)}
                                          className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600 font-bold text-sm transition-all duration-200 border border-emerald-200 hover:scale-110"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-500">
                        {currentServices.length > 3 ? 'Usa las flechas o desliza para ver más servicios' : 'Todos los servicios disponibles'}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-200">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Próximamente</h3>
                    <p className="text-gray-600">Los servicios para Chile estarán disponibles muy pronto</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Purchase Summary & CTA - Moved to fixed footer */}
              {false && totals.credits > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/55 backdrop-blur-md rounded-2xl border border-gray-200/15 p-6 shadow-lg shadow-gray-200/8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">Servicios</div>
                        <div className="text-lg font-bold text-gray-700">{currentServices.filter(s => s.quantity > 0).length}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-emerald-500/60 mb-1">Créditos</div>
                        <div className="text-lg font-bold text-emerald-500/50">{totals.credits}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-500 mb-1">Total</div>
                        <div className="text-lg font-bold text-slate-700">
                          ${totals.subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })} ARS
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm"
                    >
                      Continuar
                      <span className="text-sm">→</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Trust Indicators */}
              {activeTab !== 'chile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 text-center"
                >
                  <div className="inline-flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-gray-200 shadow-sm">
                      <ShieldCheckIcon className="w-4 h-4 text-blue-600" />
                      <span>Datos protegidos</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-200 shadow-sm">
                      <span className="text-emerald-600">🔒</span>
                      <span>Pago seguro</span>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2.5 rounded-full border border-indigo-200 shadow-sm">
                      <span className="text-indigo-600">✓</span>
                      <span>Sin suscripciones</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Payment & Confirmation */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-2xl mx-auto"
            >
              {/* Order Summary */}
              <div className="bg-white rounded-3xl border border-blue-100/50 mb-6 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                  <h3 className="font-semibold text-gray-800">Resumen del pedido</h3>
                </div>

                <div className="p-6 space-y-4">
                  {/* Currency Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 border border-blue-200 rounded-2xl text-gray-800 bg-white focus:border-blue-500 focus:outline-none transition-colors focus:ring-2 focus:ring-blue-100"
                    >
                      {currencies.map(curr => (
                        <option key={curr.code} value={curr.code}>
                          {curr.name} ({curr.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Services */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Servicios seleccionados</h4>
                    <div className="space-y-2">
                      {currentServices.filter(s => s.quantity > 0).map(service => (
                        <div key={service.id} className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-2xl border border-blue-100">
                          <div className='flex items-center'>
                            <ServiceIcon service={service.id} className="inline-block mr-2 text-xl" />
                            <span className="font-medium text-gray-800">{service.name}</span>
                            <span className="text-gray-600 ml-2">× {service.quantity}</span>
                          </div>
                          <span className="font-semibold text-gray-800">
                            ${(service.price * service.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discount Section */}
                  <div className="border-t border-blue-100 pt-4">
                    {!hasDiscount && !showCodeInput && (
                      <button
                        onClick={() => setShowCodeInput(true)}
                        className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2 py-2.5 px-4 hover:bg-blue-50 rounded-2xl transition-colors w-full justify-center border border-blue-200"
                      >
                        {/* <GeminiStarsIcon className="w-4 h-4" /> */}
                        ¿Tienes un código de descuento?
                      </button>
                    )}

                    {showCodeInput && (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => {
                            setDiscountCode(e.target.value.toUpperCase())
                            setDiscountError('')
                          }}
                          placeholder="Ingresa tu código"
                          className="w-full px-4 py-3 border border-blue-200 rounded-2xl text-sm focus:border-blue-500 focus:outline-none transition-colors focus:ring-2 focus:ring-blue-100"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') validateDiscountCode()
                          }}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={validateDiscountCode}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm"
                          >
                            Aplicar
                          </button>
                          <button
                            onClick={() => {
                              setShowCodeInput(false)
                              setDiscountCode('')
                              setDiscountError('')
                            }}
                            className="flex-1 px-4 py-2.5 border border-blue-200 text-gray-700 text-sm font-medium rounded-2xl hover:bg-blue-50 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                        {discountError && (
                          <p className="text-sm text-gray-600 text-center">{discountError}</p>
                        )}
                      </div>
                    )}

                    {hasDiscount && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-emerald-700 font-medium text-sm">✓ Descuento aplicado</span>
                          <button
                            onClick={removeDiscount}
                            className="text-xs text-rose-500 hover:text-rose-600 underline"
                          >
                            quitar
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium border border-emerald-200">
                            {discountCode.toUpperCase()} (-5%)
                          </span>
                          <span className="font-semibold text-emerald-700">
                            -${totals.discount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t border-blue-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-700">Total</span>
                      <span className="text-2xl font-bold text-gray-800">
                        ${totals.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })} {currency}
                      </span>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-sm text-gray-500">{totals.credits} créditos incluidos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-3xl border border-blue-100/50 mb-6 shadow-lg">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                  <h3 className="font-semibold text-gray-800">Método de pago</h3>
                </div>

                <div className="p-6 space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const isCompatibleWithCurrency =
                      (method.id === PaymentMethod.MERCADO_PAGO && currency === 'ARS') ||
                      (method.id === PaymentMethod.STRIPE && currency === 'USD')

                    return (
                      <button
                        key={method.id}
                        onClick={() => method.available && isCompatibleWithCurrency && setSelectedPaymentMethod(method.id)}
                        className={`w-full p-5 border rounded-3xl text-left transition-all duration-200 ${selectedPaymentMethod === method.id
                          ? 'border-blue-200 bg-blue-50 shadow-md ring-1 ring-blue-100'
                          : isCompatibleWithCurrency
                            ? 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
                            : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          }`}
                        disabled={!method.available || !isCompatibleWithCurrency}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <PaymentMethodIcon method={method.id} size={52} />
                            <div>
                              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                {method.name}
                                {method.trusted && <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">✓ Verificado</span>}
                              </h4>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Security & Actions */}
              <div className="text-center space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-blue-700 font-medium">
                    <span>🔒</span>
                    <span>Transacción protegida con encriptación SSL</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handlePreviousStep}
                    className="flex-1 px-6 py-3 border border-blue-200 text-gray-700 rounded-2xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    ← Volver
                  </button>

                  <button
                    onClick={handlePurchase}
                    disabled={!selectedPaymentMethod || isProcessing}
                    className="flex-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <span>🔒</span>
                        Completar compra segura
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Floating Footer */}
      {currentStep === 1 && totals.credits > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 -right-72 z-50 p-6"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-blue-200/50 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Servicios</div>
                    <div className="text-base font-semibold text-gray-600">{currentServices.filter(s => s.quantity > 0).length}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-blue-600 mb-1">Créditos</div>
                    <div className="text-base font-semibold text-blue-600">{totals.credits}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Total</div>
                    <div className="text-base font-semibold text-gray-700">
                      ${totals.subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })} ARS
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-2xl font-medium transition-all duration-200 flex items-center gap-2 shadow-md"
                >
                  Continuar
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}