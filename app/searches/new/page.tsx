'use client'

import { useState } from 'react'
import { ChevronRight, User, Building, Car, FileText, Search, Upload, Info, AlertCircle, Globe, Tag, CreditCard, Send, ArrowLeft, Sparkles, Clock, Zap, X } from 'lucide-react'
import Link from 'next/link'

interface SearchFormData {
  searchType: 'individual' | 'bulk'
  entityType: 'person' | 'company' | 'vehicle'
  country: string
  label: string
  searchBy: 'dni' | 'cuit' | 'patente' | 'name'
  documentValue: string
  additionalData: {
    name?: string
    lastName?: string
    birthDate?: string
    address?: string
  }
  bulkFile?: File
  priority: 'normal' | 'high' | 'urgent'
  webhookUrl?: string
}

export default function NewSearchPage() {
  const [activeTab, setActiveTab] = useState<'individual' | 'bulk'>('individual')
  const [formData, setFormData] = useState<SearchFormData>({
    searchType: 'individual',
    entityType: 'person',
    country: 'ar',
    label: '',
    searchBy: 'cuit',
    documentValue: '',
    additionalData: {},
    priority: 'normal'
  })
  const [estimatedCredits, setEstimatedCredits] = useState(2)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const countries = [
    { code: 'ar', name: 'Argentina', flag: '🇦🇷', available: 478 },
    { code: 'br', name: 'Brasil', flag: '🇧🇷', available: 215 },
    { code: 'cl', name: 'Chile', flag: '🇨🇱', available: 189 },
    { code: 'uy', name: 'Uruguay', flag: '🇺🇾', available: 94 },
    { code: 'py', name: 'Paraguay', flag: '🇵🇾', available: 67 }
  ]

  const getEntityConfig = (type: string) => {
    switch (type) {
      case 'person':
        return {
          icon: User,
          color: 'from-indigo-500 to-blue-500',
          bgLight: 'bg-indigo-50',
          borderColor: 'border-indigo-200',
          title: 'Personas',
          description: 'Búsqueda de datos personales, laborales y patrimoniales',
          searchFields: ['DNI', 'CUIT/CUIL', 'Nombre Completo']
        }
      case 'company':
        return {
          icon: Building,
          color: 'from-purple-500 to-pink-500',
          bgLight: 'bg-purple-50',
          borderColor: 'border-purple-200',
          title: 'Empresas',
          description: 'Información corporativa, financiera y societaria',
          searchFields: ['CUIT', 'Razón Social', 'Denominación']
        }
      case 'vehicle':
        return {
          icon: Car,
          color: 'from-cyan-500 to-teal-500',
          bgLight: 'bg-cyan-50',
          borderColor: 'border-cyan-200',
          title: 'Vehículos',
          description: 'Datos de dominio, titularidad e historial',
          searchFields: ['Patente', 'Dominio', 'VIN']
        }
      default:
        return {
          icon: FileText,
          color: 'from-gray-500 to-gray-600',
          bgLight: 'bg-gray-50',
          borderColor: 'border-gray-200',
          title: 'Otros',
          description: 'Búsquedas especializadas',
          searchFields: []
        }
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    setFormData(prev => ({ ...prev, bulkFile: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  const currentEntityConfig = getEntityConfig(formData.entityType)
  const EntityIcon = currentEntityConfig.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/searches"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al historial
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Nueva Búsqueda
              </h1>
              <p className="text-gray-600 mt-1">Consulta información detallada de personas, empresas o vehículos</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Créditos disponibles</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Type Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'individual'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Búsqueda Individual
              </div>
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'bulk'
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Búsqueda Múltiple
              </div>
            </button>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          {activeTab === 'individual' ? (
            <div className="space-y-6">
              {/* Entity Type Selection */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Qué deseas buscar?</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['person', 'company', 'vehicle'].map((type) => {
                    const config = getEntityConfig(type)
                    const Icon = config.icon
                    const isSelected = formData.entityType === type
                    
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, entityType: type as any }))}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? `${config.borderColor} ${config.bgLight}`
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-1">{config.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{config.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Country and Label */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">País y Etiqueta</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name} ({country.available} disponibles)
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Etiqueta
                      <span className="text-xs text-gray-400 ml-2">(Opcional)</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Ej: Cliente VIP, Proveedor..."
                        value={formData.label}
                        onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Parameters */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos de Búsqueda</h3>
                
                {/* Search Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Buscar por</label>
                  <div className="grid grid-cols-2 gap-3">
                    {formData.entityType === 'person' && (
                      <>
                        <label className="relative">
                          <input
                            type="radio"
                            name="searchBy"
                            value="dni"
                            checked={formData.searchBy === 'dni'}
                            onChange={(e) => setFormData(prev => ({ ...prev, searchBy: 'dni' }))}
                            className="sr-only peer"
                          />
                          <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 hover:bg-gray-100">
                            <div className="font-medium text-gray-900">DNI</div>
                          </div>
                        </label>
                        <label className="relative">
                          <input
                            type="radio"
                            name="searchBy"
                            value="cuit"
                            checked={formData.searchBy === 'cuit'}
                            onChange={(e) => setFormData(prev => ({ ...prev, searchBy: 'cuit' }))}
                            className="sr-only peer"
                          />
                          <div className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 hover:bg-gray-100">
                            <div className="font-medium text-gray-900">CUIT/CUIL</div>
                          </div>
                        </label>
                      </>
                    )}
                    {formData.entityType === 'company' && (
                      <label className="relative col-span-2">
                        <input
                          type="radio"
                          name="searchBy"
                          value="cuit"
                          checked={true}
                          className="sr-only peer"
                        />
                        <div className="px-4 py-3 bg-red-50 border-2 border-red-500 rounded-xl cursor-pointer">
                          <div className="font-medium text-gray-900">CUIT</div>
                        </div>
                      </label>
                    )}
                    {formData.entityType === 'vehicle' && (
                      <label className="relative col-span-2">
                        <input
                          type="radio"
                          name="searchBy"
                          value="patente"
                          checked={true}
                          className="sr-only peer"
                        />
                        <div className="px-4 py-3 bg-red-50 border-2 border-red-500 rounded-xl cursor-pointer">
                          <div className="font-medium text-gray-900">Patente/Dominio</div>
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Document Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.searchBy === 'dni' ? 'DNI' : 
                     formData.searchBy === 'cuit' ? 'CUIT/CUIL' : 
                     'Patente'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      formData.searchBy === 'dni' ? '12345678' : 
                      formData.searchBy === 'cuit' ? '20-12345678-9' : 
                      'ABC123'
                    }
                    value={formData.documentValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, documentValue: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-lg font-mono"
                    required
                  />
                </div>

                {/* Additional Fields Button */}
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
                >
                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showAdvanced ? 'rotate-90' : ''}`} />
                  Datos adicionales (opcional)
                </button>

                {/* Advanced Fields */}
                {showAdvanced && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    {formData.entityType === 'person' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                            <input
                              type="text"
                              placeholder="Juan"
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                            <input
                              type="text"
                              placeholder="Pérez"
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                          <input
                            type="date"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                      <input
                        type="text"
                        placeholder="Av. Corrientes 1234, CABA"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Priority and Options */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Opciones de Búsqueda</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Prioridad</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'normal', label: 'Normal', description: '24-48 hs', icon: Clock },
                        { value: 'high', label: 'Alta', description: '2-6 hs', icon: Zap },
                        { value: 'urgent', label: 'Urgente', description: 'Inmediato', icon: Sparkles }
                      ].map((priority) => {
                        const Icon = priority.icon
                        const isSelected = formData.priority === priority.value
                        
                        return (
                          <label key={priority.value} className="relative">
                            <input
                              type="radio"
                              name="priority"
                              value={priority.value}
                              checked={isSelected}
                              onChange={(e) => setFormData(prev => ({ ...prev, priority: priority.value as any }))}
                              className="sr-only peer"
                            />
                            <div className={`px-4 py-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                            }`}>
                              <div className="flex items-center gap-2 mb-1">
                                <Icon className="w-4 h-4 text-gray-600" />
                                <span className="font-medium text-gray-900">{priority.label}</span>
                              </div>
                              <div className="text-xs text-gray-500">{priority.description}</div>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL
                      <span className="text-xs text-gray-400 ml-2">(Para notificaciones)</span>
                    </label>
                    <div className="relative">
                      <Send className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="url"
                        placeholder="https://tu-servidor.com/webhook"
                        value={formData.webhookUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Bulk Upload Section */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                
                {formData.bulkFile ? (
                  <div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <FileText className="w-8 h-8 text-gray-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{formData.bulkFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(formData.bulkFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, bulkFile: undefined }))}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Cambiar archivo
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Arrastra tu archivo aquí
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      o haz clic para seleccionar
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0])
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-red-500/25"
                    >
                      Seleccionar archivo
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-900 font-medium mb-1">Formato del archivo</p>
                  <p className="text-blue-700">
                    El archivo debe ser CSV o Excel con columnas: Tipo, Documento, País, Etiqueta (opcional)
                  </p>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline mt-2 inline-block">
                    Descargar plantilla de ejemplo
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Cost Estimation */}
          <div className="mt-6 mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Estimación de Créditos</h3>
                <p className="text-purple-100 text-sm">
                  {activeTab === 'individual' ? 'Búsqueda individual' : 'Búsqueda múltiple'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {activeTab === 'individual' ? estimatedCredits : '15-20'}
                </div>
                <div className="text-purple-100 text-sm">créditos</div>
              </div>
            </div>
            
            {formData.priority === 'urgent' && (
              <div className="mt-4 flex items-center gap-2 p-3 bg-white/20 rounded-lg backdrop-blur">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">
                  Las búsquedas urgentes tienen un costo adicional del 50%
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Link
              href="/searches"
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Iniciar Búsqueda
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}