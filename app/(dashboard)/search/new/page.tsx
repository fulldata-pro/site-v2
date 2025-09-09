'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ServiceIcon } from '@/components/icons/service-icon'
import { ServicesLabel, ServicesType } from '@/lib/constants'
import Image from 'next/image'

// Mock credit data - in real app this would come from Redux store or API
const mockCredits = {
  available: 1247,
  serviceCosts: {
    [ServicesType.PEOPLE]: 2,
    [ServicesType.COMPANIES]: 3,
    [ServicesType.VEHICLES]: 2,
    [ServicesType.PHONES]: 1,
    [ServicesType.BANKS]: 4,
    [ServicesType.OSINT]: 5,
    [ServicesType.IDENTITY]: 2,
  }
}

const servicePatterns = {
  [ServicesType.PEOPLE]: {
    pattern: /^\d{2}-?\d{8}-?\d$/,
    name: ServicesLabel.people,
    example: '20-12345678-9',
    placeholder: 'Ingresa el CUIT/CUIL (ej: 20-12345678-9)'
  },
  [ServicesType.COMPANIES]: {
    pattern: /^\d{2}-?\d{8}-?\d$/,
    name: ServicesLabel.companies,
    example: '30-12345678-9',
    placeholder: 'Ingresa el CUIT de la empresa (ej: 30-12345678-9)'
  },
  [ServicesType.VEHICLES]: {
    pattern: /^[A-Z]{2,3}\d{3}[A-Z]{0,2}$/i,
    name: ServicesLabel.vehicles,
    example: 'AB123CD',
    placeholder: 'Ingresa la patente del vehículo (ej: AB123CD)'
  },
  [ServicesType.PHONES]: {
    pattern: /^(\+?54\s?)?(\(?\d{2,4}\)?[\s-]?)?\d{4}[\s-]?\d{4}$/,
    name: ServicesLabel.phones,
    example: '+54 11 1234-5678',
    placeholder: 'Ingresa el número telefónico (ej: +54 11 1234-5678)'
  },
  [ServicesType.BANKS]: {
    pattern: /^\d{2}-?\d{8}-?\d$/,
    name: ServicesLabel.banks,
    example: '20-12345678-9',
    placeholder: 'Ingresa el CUIT para búsqueda bancaria (ej: 20-12345678-9)'
  },
  [ServicesType.OSINT]: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: ServicesLabel.osint,
    example: 'usuario@ejemplo.com',
    placeholder: 'Ingresa el email para búsqueda OSINT (ej: usuario@ejemplo.com)'
  },
  [ServicesType.IDENTITY]: {
    pattern: /^\d{2}-?\d{8}-?\d$/,
    name: ServicesLabel.identity,
    example: '20-12345678-9',
    placeholder: 'Ingresa el CUIT/CUIL para búsqueda de identidad (ej: 20-12345678-9)'
  }
}

function detectServiceType(input: string): ServicesType | null {
  const trimmedInput = input.trim()
  for (const [serviceType, config] of Object.entries(servicePatterns)) {
    if (config.pattern.test(trimmedInput)) {
      return serviceType as ServicesType
    }
  }
  return null
}

export default function NewSearchPage() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [detectedService, setDetectedService] = useState<ServicesType | null>(null)
  const [selectedService, setSelectedService] = useState<ServicesType | null>(ServicesType.PEOPLE)
  const [showDropdown, setShowDropdown] = useState(false)
  const [placeholder, setPlaceholder] = useState(servicePatterns[ServicesType.PEOPLE].placeholder)
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState(servicePatterns[ServicesType.PEOPLE].placeholder)
  const [isTyping, setIsTyping] = useState(false)

  // Excel upload states
  const [excelData, setExcelData] = useState<any[]>([])
  const [showColumnModal, setShowColumnModal] = useState(false)
  const [excelColumns, setExcelColumns] = useState<string[]>([])
  const [selectedColumn, setSelectedColumn] = useState<string>('')
  const [bulkSearchData, setBulkSearchData] = useState<string[]>([])

  // Helper function to check if service is available based on credits
  const isServiceAvailable = (service: ServicesType) => {
    const cost = mockCredits.serviceCosts[service]
    return mockCredits.available >= cost
  }

  // Helper function to get dynamic padding based on service name length
  const getServiceSelectorPadding = (service: ServicesType | null) => {
    if (!service) return 'pl-32'

    const serviceName = servicePatterns[service].name
    const baseWidth = 80 // Base width for icon + padding + chevron

    // Approximate character widths (in pixels) for the font size
    const charWidth = 7.5 // Approximate width per character for text-sm font-medium
    const estimatedWidth = baseWidth + (serviceName.length * charWidth)

    // Convert to Tailwind padding classes (4px per unit)
    const paddingUnits = Math.ceil(estimatedWidth / 4)

    // Map to closest Tailwind class, with some buffer
    if (paddingUnits <= 32) return 'pl-40'      // ~144px - for short names like "Banco"
    else if (paddingUnits <= 36) return 'pl-44' // ~160px - for medium names like "Persona"  
    else if (paddingUnits <= 40) return 'pl-48' // ~176px - for longer names like "Empresa"
    else if (paddingUnits <= 44) return 'pl-52' // ~192px - for longest names like "Teléfono"
    else return 'pl-52'                          // ~208px - for very long names
  }

  // Helper function to get dynamic left positioning for placeholder and indicators
  const getServiceSelectorLeftPosition = (service: ServicesType | null) => {
    if (!service) return 'left-32'

    const serviceName = servicePatterns[service].name
    const baseWidth = 80
    const charWidth = 7.5
    const estimatedWidth = baseWidth + (serviceName.length * charWidth)
    const paddingUnits = Math.ceil(estimatedWidth / 4)

    // Map to corresponding left positioning classes
    if (paddingUnits <= 32) return 'left-40'
    else if (paddingUnits <= 36) return 'left-44'
    else if (paddingUnits <= 40) return 'left-48'
    else if (paddingUnits <= 44) return 'left-52'
    else return 'left-52'
  }

  // Show dropdown when input is focused and has content
  useEffect(() => {
    const detected = detectServiceType(input)
    setDetectedService(detected)
  }, [input])

  // Typewriter effect for placeholder
  useEffect(() => {
    if (placeholder === displayedPlaceholder) return

    setIsTyping(true)

    // Clear current placeholder first
    let clearIndex = displayedPlaceholder.length
    const clearIntervalId = setInterval(() => {
      setDisplayedPlaceholder(prev => prev.slice(0, clearIndex - 1))
      clearIndex--

      if (clearIndex <= 0) {
        clearInterval(clearIntervalId)

        // Small delay before typing new placeholder
        setTimeout(() => {
          // Start typing new placeholder
          let typeIndex = 0
          const typeIntervalId = setInterval(() => {
            setDisplayedPlaceholder(placeholder.slice(0, typeIndex + 1))
            typeIndex++

            if (typeIndex >= placeholder.length) {
              clearInterval(typeIntervalId)
              setIsTyping(false)
            }
          }, 50) // Typing speed
        }, 100) // Delay before starting to type
      }
    }, 30) // Clearing speed

    // Cleanup function to prevent memory leaks
    return () => {
      clearInterval(clearIntervalId)
    }
  }, [placeholder, displayedPlaceholder])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const service = detectServiceType(input.trim())
    if (!service) return

    setIsProcessing(true)
    setShowDropdown(false)

    // Simulate processing
    setTimeout(() => {
      router.push('/dashboard/reports/001')
    }, 2000)
  }

  const handleServiceSelect = (service: ServicesType) => {
    if (!isServiceAvailable(service)) return

    setSelectedService(service)
    setInput('')
    setShowDropdown(false)

    // Reset typewriter effect completely
    setIsTyping(false)
    setDisplayedPlaceholder('')

    // Set new placeholder after a brief delay to trigger typewriter effect
    setTimeout(() => {
      setPlaceholder(servicePatterns[service].placeholder)
    }, 50)

    // Focus the input after a brief delay to ensure state updates
    setTimeout(() => {
      const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement
      if (inputElement) {
        inputElement.focus()
      }
    }, 200)
  }

  const handleServiceDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  const handleInputFocus = () => {
    // Input focus doesn't show dropdown anymore
  }

  const handleInputBlur = () => {
    // Input blur doesn't hide dropdown anymore
  }

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector('[data-dropdown]')
      const button = document.querySelector('[data-dropdown-trigger]')

      if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  // Handle Excel file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        // For demo purposes, we'll simulate Excel parsing
        // In a real app, you'd use a library like xlsx or similar
        const mockExcelData = [
          { 'CUIT': '20-12345678-9', 'Nombre': 'Juan Pérez', 'Email': 'juan@example.com' },
          { 'CUIT': '27-87654321-3', 'Nombre': 'María García', 'Email': 'maria@example.com' },
          { 'CUIT': '23-45678912-7', 'Nombre': 'Carlos López', 'Email': 'carlos@example.com' }
        ]

        setExcelData(mockExcelData)
        setExcelColumns(Object.keys(mockExcelData[0]))
        setShowColumnModal(true)
      } catch (error) {
        console.error('Error reading Excel file:', error)
        alert('Error al leer el archivo Excel')
      }
    }
    reader.readAsArrayBuffer(file)
  }

  // Handle column selection
  const handleColumnSelection = () => {
    if (!selectedColumn) return

    const columnData = excelData.map(row => row[selectedColumn]).filter(Boolean)
    setBulkSearchData(columnData)
    setShowColumnModal(false)

    // Simulate API call
    console.log('Sending bulk data to API:', {
      service: selectedService,
      data: columnData,
      totalItems: columnData.length
    })
  }

  // Send bulk data to API
  const processBulkSearch = async () => {
    if (bulkSearchData.length === 0) return

    setIsProcessing(true)

    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/bulk-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: selectedService,
          data: bulkSearchData,
          totalItems: bulkSearchData.length
        })
      })

      if (response.ok) {
        console.log('Bulk search initiated successfully')
        router.push('/dashboard/reports/bulk-001')
      } else {
        throw new Error('Error en la búsqueda masiva')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al procesar la búsqueda masiva')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex rounded-3xl  justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header with Animated Logo */}
        <div className="text-center mb-20 transition-all duration-700 ease-out">

          <div className="mb-4 mt-24">
            <div className="inline-block">
              <Image
                src="/images/logo-icon.svg"
                alt="Fulldata Logo"
                width={80}
                height={80}
                className="mx-auto mb-6 animate-pulse"
                style={{
                  animation: 'float 3s ease-in-out infinite'
                }}
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-3 group">
            <div className="w-2 h-2 bg-slate-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h1 className="text-3xl font-extralight text-slate-800 tracking-wide">
              ¿Qué necesitas encontrar?
            </h1>
          </div>
        </div>

        {/* Search Interface */}
        <div className="space-y-8">
          {/* Main Input */}
          <form onSubmit={handleSubmit} className='relative'>
            <div className="relative group">
              <div className="relative">
                {/* Service Selector as Start Content */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <button
                    type="button"
                    data-dropdown-trigger
                    onClick={handleServiceDropdownToggle}
                    className={`flex items-center gap-2 px-3 py-2 h-10 rounded-xl transition-all duration-200 border-2 ${showDropdown
                      ? 'bg-slate-200 border-slate-300 shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 border-transparent hover:border-slate-300'
                      }`}
                  >
                    <ServiceIcon service={selectedService!} className="text-xl" />
                    <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                      {servicePatterns[selectedService!].name}
                    </span>
                    <svg className="w-3 h-3 text-slate-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder=""
                  className={`w-full ${getServiceSelectorPadding(selectedService)} pr-32 py-6 text-xl font-light border border-gray-200 rounded-3xl focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md focus:shadow-lg`}
                  disabled={isProcessing}
                  autoFocus
                />

                {/* Custom placeholder with typewriter effect */}
                {!input && (
                  <div className={`absolute ${getServiceSelectorLeftPosition(selectedService)} top-1/2 transform -translate-y-1/2 pointer-events-none`}>
                    <span className="text-sm text-gray-400 font-light">
                      {displayedPlaceholder}
                      {isTyping && (
                        <span className="animate-pulse ml-1 text-slate-600">|</span>
                      )}
                    </span>
                  </div>
                )}

                {/* Service Indicator when input matches pattern */}
                {detectedService && !isProcessing && (
                  <div className={`absolute ${getServiceSelectorLeftPosition(selectedService)} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out`}>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{input}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!input.trim() || !selectedService || isProcessing || (selectedService && !detectedService)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-slate-800 text-white rounded-2xl hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Buscando</span>
                    </div>
                  ) : (
                    'Buscar'
                  )}
                </button>
              </div>
            </div>

            {/* Service Dropdown */}
            {showDropdown && (
              <div
                data-dropdown
                className="absolute left-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-30 overflow-hidden backdrop-blur-sm"
                style={{ transform: 'translateX(4px)' }}
              >
                <div className="p-3 border-b border-gray-100 bg-slate-50/50">
                  <p className="text-sm font-medium text-slate-700 px-2">
                    Selecciona el tipo de búsqueda:
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {Object.entries(servicePatterns).map(([service, config]) => {
                    const available = isServiceAvailable(service as ServicesType)

                    return (
                      <button
                        key={service}
                        onClick={() => handleServiceSelect(service as ServicesType)}
                        disabled={!available}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-all duration-200 ${!available
                          ? 'opacity-50 cursor-not-allowed bg-gray-50/50'
                          : 'cursor-pointer hover:bg-slate-50 hover:shadow-sm'
                          } ${selectedService === service ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${available ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                            <ServiceIcon service={service} className={`text-xl ${!available ? 'text-gray-300' : selectedService === service ? '' : 'text-slate-600'}`} />
                          </div>
                          <div>
                            <div className={`text-sm font-semibold ${!available ? 'text-gray-400' : selectedService === service ? 'text-blue-700' : 'text-slate-800'}`}>
                              {config.name}
                            </div>
                            <div className="text-xs text-slate-500">{config.example}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            {/* <div className={`text-xs font-semibold ${available ? 'text-slate-700' : 'text-red-500'}`}>
                              {cost} créditos
                            </div> */}
                            {available && (
                              <div className="text-xs text-slate-500">
                                {mockCredits.available} disponibles
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </form>

          {/* Excel Upload Section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4">
              <div className="h-px bg-gray-200 w-16"></div>
              <span className="text-xs text-gray-400 font-medium">O</span>
              <div className="h-px bg-gray-200 w-16"></div>
            </div>

            <div className="mt-4">
              <label className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl cursor-pointer transition-all duration-200 text-blue-700 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Subir archivo Excel</span>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Formatos soportados: .xlsx, .xls</p>
            </div>

            {/* Bulk search summary */}
            {bulkSearchData.length > 0 && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700">
                      {bulkSearchData.length} elementos cargados para {servicePatterns[selectedService!].name}
                    </span>
                  </div>
                  <button
                    onClick={processBulkSearch}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? 'Procesando...' : 'Iniciar búsqueda masiva'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Processing State */}
          {isProcessing && (
            <div className="text-center py-8 transition-all duration-500 ease-out">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-50 rounded-full">
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-slate-700 font-medium">
                  Analizando información...
                </span>
              </div>
            </div>
          )}

          {/* Validation Error */}
          {selectedService && input && !detectedService && !isProcessing && (
            <div className="text-center transition-all duration-300 ease-out">
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm border border-amber-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>El formato no coincide con {servicePatterns[selectedService].name.toLowerCase()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center transition-all duration-700 ease-out">
          <div className="flex items-center justify-center gap-8 text-xs text-gray-400 font-light">
            <div className="flex items-center gap-2 hover:text-gray-600 transition-colors duration-300">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <span>Seguro</span>
            </div>
            <div className="flex items-center gap-2 hover:text-gray-600 transition-colors duration-300">
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              <span>Rápido</span>
            </div>
            <div className="flex items-center gap-2 hover:text-gray-600 transition-colors duration-300">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <span>Privado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Column Selection Modal */}
      {showColumnModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Seleccionar Columna</h3>
                <button
                  onClick={() => setShowColumnModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Se encontraron {excelData.length} filas. Selecciona la columna que contiene los valores para búsqueda de {servicePatterns[selectedService!].name.toLowerCase()}:
              </p>

              <div className="space-y-3">
                {excelColumns.map((column) => (
                  <label
                    key={column}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${selectedColumn === column
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <input
                      type="radio"
                      name="column"
                      value={column}
                      checked={selectedColumn === column}
                      onChange={(e) => setSelectedColumn(e.target.value)}
                      className="text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{column}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Ejemplo: {excelData[0][column]}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Preview of selected data */}
              {selectedColumn && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-700 mb-2">Vista previa:</div>
                  <div className="text-xs text-gray-600 space-y-1 max-h-20 overflow-y-auto">
                    {excelData.slice(0, 3).map((row, index) => (
                      <div key={index}>{row[selectedColumn]}</div>
                    ))}
                    {excelData.length > 3 && (
                      <div className="text-gray-400">... y {excelData.length - 3} más</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowColumnModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleColumnSelection}
                disabled={!selectedColumn}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Selección
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}