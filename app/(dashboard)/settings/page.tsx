'use client'

import { useState } from 'react'
import { ProfileUserIcon } from '@/components/icons/profile-user-icon'
import { Cube2Icon } from '@/components/icons/cube-2-icon'
import { Car2Icon } from '@/components/icons/car-2-icon'
import { WhatsappIcon } from '@/components/icons/whatsapp-icon'
import { BankIcon } from '@/components/icons/bank-icon'
import { Technology4 } from '@/components/icons/technology-4'
import { FaceIdIcon } from '@/components/icons/face-id-icon'
import { Setting2Icon } from '@/components/icons/setting-2-icon'
import { UserIcon } from '@/components/icons/User-icon'
import { Abstract26Icon } from '@/components/icons/abstract-26-icon'
import { ServiceIcon } from '@/components/icons/service-icon'
import { ServicesType } from '@/lib/constants'

interface WebhookConfig {
  id: string
  name: string
  icon: React.ElementType
  enabled: boolean
  url: string
  headers: { key: string; value: string }[]
  events: string[]
  testStatus?: 'success' | 'error' | 'pending'
  testMessage?: string
}

const initialWebhooks: WebhookConfig[] = [
  {
    id: ServicesType.PEOPLE,
    name: 'Personas',
    icon: ProfileUserIcon,
    enabled: false,
    url: '',
    headers: [{ key: 'Authorization', value: '' }],
    events: ['search_completed', 'report_generated']
  },
  {
    id: ServicesType.COMPANIES,
    name: 'Empresas',
    icon: Cube2Icon,
    enabled: false,
    url: '',
    headers: [{ key: 'Authorization', value: '' }],
    events: ['search_completed', 'report_generated']
  },
  {
    id: ServicesType.VEHICLES,
    name: 'Vehículos',
    icon: Car2Icon,
    enabled: false,
    url: '',
    headers: [{ key: 'Authorization', value: '' }],
    events: ['search_completed', 'report_generated']
  },
  {
    id: ServicesType.PHONES,
    name: 'Teléfonos',
    icon: WhatsappIcon,
    enabled: false,
    url: '',
    headers: [{ key: 'Authorization', value: '' }],
    events: ['search_completed', 'report_generated']
  },
  {
    id: ServicesType.BANKS,
    name: 'Cuentas Bancarias',
    icon: BankIcon,
    enabled: false,
    url: '',
    headers: [{ key: 'Authorization', value: '' }],
    events: ['search_completed', 'report_generated']
  },
  {
    id: ServicesType.OSINT,
    name: 'OSINT',
    icon: Technology4,
    enabled: false,
    url: '',
    headers: [{ key: 'Authorization', value: '' }],
    events: ['search_completed', 'analysis_completed']
  },
  {
    id: ServicesType.IDENTITY,
    name: 'Validación de Identidad',
    icon: FaceIdIcon,
    enabled: false,
    url: '',
    headers: [{ key: 'Authorization', value: '' }],
    events: ['validation_completed', 'verification_failed']
  }
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('webhooks')
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>(initialWebhooks)
  const [expandedWebhook, setExpandedWebhook] = useState<string | null>(null)

  const updateWebhook = (id: string, updates: Partial<WebhookConfig>) => {
    setWebhooks(prev => prev.map(webhook =>
      webhook.id === id ? { ...webhook, ...updates } : webhook
    ))
  }

  const toggleWebhook = (id: string) => {
    setExpandedWebhook(expandedWebhook === id ? null : id)
  }

  const testWebhook = async (id: string) => {
    const webhook = webhooks.find(w => w.id === id)
    if (!webhook?.url) return

    updateWebhook(id, { testStatus: 'pending', testMessage: 'Enviando petición de prueba...' })

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const success = Math.random() > 0.3

      if (success) {
        updateWebhook(id, {
          testStatus: 'success',
          testMessage: 'Webhook configurado correctamente'
        })
      } else {
        updateWebhook(id, {
          testStatus: 'error',
          testMessage: 'Error: No se pudo conectar con el webhook'
        })
      }
    } catch (error) {
      updateWebhook(id, {
        testStatus: 'error',
        testMessage: 'Error al probar el webhook'
      })
    }
  }

  const saveWebhook = (id: string) => {
    const webhook = webhooks.find(w => w.id === id)
    console.log('Saving webhook:', webhook)

    // Show success animation
    updateWebhook(id, { testStatus: 'success', testMessage: 'Configuración guardada exitosamente' })
    setTimeout(() => {
      updateWebhook(id, { testStatus: undefined, testMessage: undefined })
    }, 3000)
  }

  const addHeader = (id: string) => {
    updateWebhook(id, {
      headers: [...(webhooks.find(w => w.id === id)?.headers || []), { key: '', value: '' }]
    })
  }

  const updateHeader = (webhookId: string, index: number, field: 'key' | 'value', value: string) => {
    const webhook = webhooks.find(w => w.id === webhookId)
    if (!webhook) return

    const newHeaders = [...webhook.headers]
    newHeaders[index] = { ...newHeaders[index], [field]: value }
    updateWebhook(webhookId, { headers: newHeaders })
  }

  const removeHeader = (webhookId: string, index: number) => {
    const webhook = webhooks.find(w => w.id === webhookId)
    if (!webhook) return

    const newHeaders = webhook.headers.filter((_, i) => i !== index)
    updateWebhook(webhookId, { headers: newHeaders })
  }

  const tabs = [
    { id: 'webhooks', name: 'Webhooks', icon: Abstract26Icon, description: 'Configura webhooks automáticos' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {/* <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg shadow-red-500/25">
              <Setting2Icon className="text-xl text-white" />
            </div> */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Configuración
              </h1>
              <p className="text-gray-600 mt-1">Gestiona las configuraciones de tu plataforma</p>
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

        {/* Webhooks Tab Content */}
        {activeTab === 'webhooks' && (
          <div className="space-y-6">

            {/* Webhook Cards */}
            <div className="grid gap-6">
              {webhooks.map((webhook) => {
                const isExpanded = expandedWebhook === webhook.id

                return (
                  <div
                    key={webhook.id}
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded
                      ? 'border-red-200 shadow-2xl shadow-red-500/10 ring-1 ring-red-500/10'
                      : 'border-white/20 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50'
                      }`}
                  >
                    {/* Card Header */}
                    <div
                      className="p-6 cursor-pointer transition-colors hover:bg-gray-50/50"
                      onClick={() => toggleWebhook(webhook.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl transition-colors`}>
                            <ServiceIcon service={webhook.id} className={`text-xl ${webhook.enabled ? '' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{webhook.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`w-2 h-2 rounded-full ${webhook.enabled ? 'bg-green-500' : 'bg-gray-400'
                                }`}></div>
                              <p className="text-sm text-gray-500">
                                {webhook.enabled ? 'Activo' : 'Inactivo'}
                                {webhook.url && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                      {webhook.url.replace(/^https?:\/\//, '').substring(0, 30)}...
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Toggle Switch */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={webhook.enabled}
                              onChange={(e) => {
                                e.stopPropagation()
                                updateWebhook(webhook.id, { enabled: e.target.checked })
                              }}
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-lg"></div>
                          </label>

                          {/* Expand Icon */}
                          <div className={`p-2 rounded-lg transition-all duration-300 ${isExpanded ? 'bg-red-100 text-red-600 rotate-180' : 'bg-gray-100 text-gray-400'
                            }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Configuration */}
                    {isExpanded && (
                      <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white/50">
                        <div className="p-6 space-y-6">
                          {/* URL Configuration */}
                          <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              URL del Webhook
                            </label>
                            <input
                              type="url"
                              value={webhook.url}
                              onChange={(e) => updateWebhook(webhook.id, { url: e.target.value })}
                              placeholder="https://api.tu-dominio.com/webhooks/fulldata"
                              className="w-full px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all placeholder:text-gray-400"
                            />
                          </div>

                          {/* Headers Configuration */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                Headers HTTP
                              </label>
                              <button
                                onClick={() => addHeader(webhook.id)}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                + Agregar
                              </button>
                            </div>

                            <div className="space-y-3">
                              {webhook.headers.map((header, index) => (
                                <div key={index} className="flex gap-3 items-start">
                                  <input
                                    type="text"
                                    placeholder="Authorization"
                                    value={header.key}
                                    onChange={(e) => updateHeader(webhook.id, index, 'key', e.target.value)}
                                    className="flex-1 px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-gray-400"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Bearer token..."
                                    value={header.value}
                                    onChange={(e) => updateHeader(webhook.id, index, 'value', e.target.value)}
                                    className="flex-1 px-4 py-3 border-0 bg-white/80 rounded-xl shadow-sm ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-gray-400"
                                  />
                                  <button
                                    onClick={() => removeHeader(webhook.id, index)}
                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                              {webhook.headers.length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                  <div className="text-4xl mb-2">🔗</div>
                                  <p>No hay headers configurados</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Events Configuration */}
                          <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              Eventos Suscritos
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {webhook.events.map((event) => (
                                <span
                                  key={event}
                                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm rounded-lg border border-purple-200/50 font-medium"
                                >
                                  {event}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 bg-gray-50/50 rounded-lg p-3 border-l-4 border-purple-200">
                              💡 Este webhook recibirá notificaciones cuando ocurran estos eventos en el servicio {webhook.name.toLowerCase()}
                            </p>
                          </div>

                          {/* Test & Status Section */}
                          <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Prueba de Conectividad
                              </h4>
                              <button
                                onClick={() => testWebhook(webhook.id)}
                                disabled={!webhook.url || webhook.testStatus === 'pending'}
                                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none font-medium"
                              >
                                {webhook.testStatus === 'pending' ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Probando...
                                  </div>
                                ) : 'Probar Webhook'}
                              </button>
                            </div>

                            {webhook.testMessage && (
                              <div className={`p-4 rounded-lg text-sm border transition-all ${webhook.testStatus === 'success'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : webhook.testStatus === 'error'
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                                }`}>
                                <div className="flex items-center gap-2">
                                  {webhook.testStatus === 'success' && <div className="text-green-500 text-lg">✅</div>}
                                  {webhook.testStatus === 'error' && <div className="text-red-500 text-lg">❌</div>}
                                  {webhook.testStatus === 'pending' && <div className="text-blue-500 text-lg">⏳</div>}
                                  {webhook.testMessage}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Save Button */}
                          <div className="flex justify-end pt-4 border-t border-gray-200">
                            <button
                              onClick={() => saveWebhook(webhook.id)}
                              className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-red-300/50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                            >
                              Guardar Configuración
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Documentation Section */}
            <div className="mt-12 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/25">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Documentación de Webhooks
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">📦 Estructura del Payload</h3>
                  <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      {`{
  "event": "search_completed",
  "service": "people", 
  "timestamp": "2024-01-15T10:30:00Z",
  "webhook_id": "uuid-v4",
  "data": {
    "search_id": "uuid-v4",
    "status": "completed",
    "result_url": "https://...",
    "metadata": {
      "query": "...",
      "duration_ms": 1250
    }
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">⚡ Eventos Disponibles</h3>
                  <div className="space-y-3">
                    {[
                      { event: 'search_completed', desc: 'Búsqueda finalizada exitosamente', color: 'green' },
                      { event: 'report_generated', desc: 'Reporte generado y disponible', color: 'blue' },
                      { event: 'validation_completed', desc: 'Validación de identidad completada', color: 'purple' },
                      { event: 'verification_failed', desc: 'Error en proceso de verificación', color: 'red' }
                    ].map(({ event, desc, color }) => (
                      <div key={event} className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 bg-${color}-500 rounded-full`}></div>
                          <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-md">{event}</span>
                        </div>
                        <span className="text-gray-600 text-sm">{desc}</span>
                      </div>
                    ))}
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