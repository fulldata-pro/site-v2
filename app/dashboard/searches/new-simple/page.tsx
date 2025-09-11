'use client'

import { useState, useEffect } from 'react'
import { SearchIcon } from '@/components/icons/search-icon'
import { UserIcon } from '@/components/icons/User-icon'
import { Car2Icon } from '@/components/icons/car-2-icon'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeft'
import { PhoneIcon } from '@/components/icons/Phone-icon'
import { BankIcon } from '@/components/icons/bank-icon'
import { Building, CreditCard, Info } from 'lucide-react'
import Link from 'next/link'

interface SearchFormData {
  entityType: string
  country: string
  label: string
  searchBy: string
  documentValue: string
}

interface CountryConfig {
  person?: {
    searchTypes: Array<{
      value: string
      label: string
      placeholder: string
    }>
  }
  company?: {
    searchTypes: Array<{
      value: string
      label: string
      placeholder: string
    }>
  }
  vehicle?: {
    searchTypes: Array<{
      value: string
      label: string
      placeholder: string
    }>
  }
  phone?: {
    searchTypes: Array<{
      value: string
      label: string
      placeholder: string
    }>
  }
  bank?: {
    searchTypes: Array<{
      value: string
      label: string
      placeholder: string
    }>
  }
}

export default function NewSimpleSearchPage() {
  const [formData, setFormData] = useState<SearchFormData>({
    entityType: 'person',
    country: 'ar',
    label: '',
    searchBy: 'cuit',
    documentValue: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const countries = [
    { code: 'ar', name: 'Argentina', flag: '🇦🇷' },
    { code: 'br', name: 'Brasil', flag: '🇧🇷' },
    { code: 'cl', name: 'Chile', flag: '🇨🇱' },
    { code: 'uy', name: 'Uruguay', flag: '🇺🇾' },
    { code: 'py', name: 'Paraguay', flag: '🇵🇾' }
  ]

  // Configuración específica por país
  const countryConfigs: Record<string, CountryConfig> = {
    ar: {
      person: {
        searchTypes: [
          { value: 'dni', label: 'DNI', placeholder: '12345678' },
          { value: 'cuit', label: 'CUIT/CUIL', placeholder: '20-12345678-9' }
        ]
      },
      company: {
        searchTypes: [
          { value: 'cuit', label: 'CUIT', placeholder: '30-12345678-9' },
          { value: 'name', label: 'Razón Social', placeholder: 'Empresa S.A.' }
        ]
      },
      vehicle: {
        searchTypes: [
          { value: 'patente', label: 'Patente', placeholder: 'ABC123 o AB123CD' }
        ]
      },
      phone: {
        searchTypes: [
          { value: 'number', label: 'Número', placeholder: '+54 11 1234-5678' }
        ]
      }
    },
    br: {
      person: {
        searchTypes: [
          { value: 'cpf', label: 'CPF', placeholder: '123.456.789-00' },
          { value: 'rg', label: 'RG', placeholder: '12.345.678-9' }
        ]
      },
      company: {
        searchTypes: [
          { value: 'cnpj', label: 'CNPJ', placeholder: '12.345.678/0001-00' },
          { value: 'name', label: 'Nome Empresarial', placeholder: 'Empresa Ltda' }
        ]
      },
      vehicle: {
        searchTypes: [
          { value: 'placa', label: 'Placa', placeholder: 'ABC-1234 o ABC1D23' }
        ]
      },
      bank: {
        searchTypes: [
          { value: 'account', label: 'Conta Bancária', placeholder: '12345-6' }
        ]
      }
    },
    cl: {
      person: {
        searchTypes: [
          { value: 'rut', label: 'RUT', placeholder: '12.345.678-9' },
          { value: 'name', label: 'Nombre Completo', placeholder: 'Juan Pérez' }
        ]
      },
      company: {
        searchTypes: [
          { value: 'rut', label: 'RUT Empresa', placeholder: '76.123.456-7' }
        ]
      },
      vehicle: {
        searchTypes: [
          { value: 'patente', label: 'Patente', placeholder: 'BBBB12' }
        ]
      }
    },
    uy: {
      person: {
        searchTypes: [
          { value: 'ci', label: 'Cédula', placeholder: '1.234.567-8' }
        ]
      },
      company: {
        searchTypes: [
          { value: 'rut', label: 'RUT', placeholder: '210123456789' }
        ]
      },
      vehicle: {
        searchTypes: [
          { value: 'matricula', label: 'Matrícula', placeholder: 'ABC 1234' }
        ]
      }
    },
    py: {
      person: {
        searchTypes: [
          { value: 'ci', label: 'Cédula', placeholder: '1234567' },
          { value: 'ruc', label: 'RUC', placeholder: '1234567-8' }
        ]
      },
      company: {
        searchTypes: [
          { value: 'ruc', label: 'RUC', placeholder: '80012345-6' }
        ]
      },
      vehicle: {
        searchTypes: [
          { value: 'chapa', label: 'Chapa', placeholder: 'ABC 123' }
        ]
      }
    }
  }

  // Obtener tipos de entidad disponibles para el país actual
  const getAvailableEntityTypes = () => {
    const config = countryConfigs[formData.country]
    if (!config) return []
    
    const types = []
    if (config.person) types.push({ value: 'person', label: 'Persona', icon: UserIcon })
    if (config.company) types.push({ value: 'company', label: 'Empresa', icon: Building })
    if (config.vehicle) types.push({ value: 'vehicle', label: 'Vehículo', icon: Car2Icon })
    if (config.phone) types.push({ value: 'phone', label: 'Teléfono', icon: PhoneIcon })
    if (config.bank) types.push({ value: 'bank', label: 'Banco', icon: BankIcon })
    
    return types
  }

  // Obtener tipos de búsqueda para la entidad y país actual
  const getSearchTypes = () => {
    const config = countryConfigs[formData.country]
    if (!config) return []
    
    const entityConfig = config[formData.entityType as keyof CountryConfig]
    return entityConfig?.searchTypes || []
  }

  const availableEntityTypes = getAvailableEntityTypes()
  const searchTypes = getSearchTypes()

  // Actualizar el tipo de entidad y búsqueda cuando cambia el país
  useEffect(() => {
    const config = countryConfigs[formData.country]
    if (config) {
      // Si el tipo de entidad actual no está disponible en el nuevo país
      if (!config[formData.entityType as keyof CountryConfig]) {
        const firstAvailable = getAvailableEntityTypes()[0]
        if (firstAvailable) {
          setFormData(prev => ({
            ...prev,
            entityType: firstAvailable.value,
            searchBy: config[firstAvailable.value as keyof CountryConfig]?.searchTypes[0]?.value || '',
            documentValue: ''
          }))
        }
      } else {
        // Actualizar el tipo de búsqueda al primero disponible
        const entityConfig = config[formData.entityType as keyof CountryConfig]
        if (entityConfig?.searchTypes[0]) {
          setFormData(prev => ({
            ...prev,
            searchBy: entityConfig.searchTypes[0].value,
            documentValue: ''
          }))
        }
      }
    }
  }, [formData.country, formData.entityType, getAvailableEntityTypes])

  // Actualizar el tipo de búsqueda cuando cambia la entidad
  useEffect(() => {
    const types = getSearchTypes()
    if (types.length > 0 && !types.find(t => t.value === formData.searchBy)) {
      setFormData(prev => ({
        ...prev,
        searchBy: types[0].value,
        documentValue: ''
      }))
    }
  }, [formData.entityType, formData.searchBy, getSearchTypes])

  const currentSearchType = searchTypes.find(t => t.value === formData.searchBy)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  const currentEntity = availableEntityTypes.find(e => e.value === formData.entityType)
  const EntityIcon = currentEntity?.icon || UserIcon

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/searches"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors text-sm"
          >
            <ArrowLeftIcon className="text-base" />
            Volver
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Nueva Búsqueda
          </h1>
          <p className="text-gray-600">
            Ingresa los datos para iniciar tu búsqueda
          </p>
        </div>

        {/* Credits Badge */}
        <div className="mb-8 flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Créditos disponibles</p>
              <p className="font-semibold text-gray-900">1,247</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Costo estimado</p>
            <p className="font-semibold text-red-600">2 créditos</p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Configuration Section - Country & Entity Type */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                País
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Entity Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de búsqueda
              </label>
              <div className={`grid ${availableEntityTypes.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'} gap-2`}>
                {availableEntityTypes.map((type) => {
                  const Icon = type.icon
                  const isSelected = formData.entityType === type.value
                  
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        entityType: type.value
                      }))}
                      className={`p-2.5 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                      }`}
                    >
                      <Icon className={`text-base mx-auto mb-1 ${
                        isSelected ? 'text-red-500' : 'text-gray-400'
                      }`} />
                      <span className="text-xs font-medium block">{type.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Search Data Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            {/* Search Type Selection - If multiple options */}
            {searchTypes.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar por
                </label>
                <div className="flex gap-2">
                  {searchTypes.map((type) => {
                    const isSelected = formData.searchBy === type.value
                    
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ 
                          ...prev, 
                          searchBy: type.value,
                          documentValue: ''
                        }))}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                          isSelected
                            ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                            : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                        }`}
                      >
                        {type.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Document Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentSearchType?.label || 'Documento'}
              </label>
              <input
                type="text"
                placeholder={currentSearchType?.placeholder || ''}
                value={formData.documentValue}
                onChange={(e) => setFormData(prev => ({ ...prev, documentValue: e.target.value }))}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
                autoFocus
              />
              {currentSearchType?.placeholder && (
                <p className="mt-1.5 text-xs text-gray-500">
                  Formato: {currentSearchType.placeholder}
                </p>
              )}
            </div>

            {/* Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etiqueta <span className="text-gray-400 font-normal text-xs">(opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Cliente, Proveedor..."
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Información importante</p>
              <p>La búsqueda puede tardar entre 2 y 48 horas dependiendo de la disponibilidad de los datos.</p>
            </div>
          </div>

          {/* Action Buttons - Simplified */}
          <div className="flex gap-3">
            <Link
              href="/searches"
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isProcessing || !formData.documentValue}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <SearchIcon className="text-lg" />
                  Buscar
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Enlaces rápidos</p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/searches"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Ver historial de búsquedas →
            </Link>
            <Link
              href="/credits"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Comprar más créditos →
            </Link>
            <Link
              href="/searches/new"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Búsqueda avanzada →
            </Link>
            <Link
              href="/help"
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Centro de ayuda →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}