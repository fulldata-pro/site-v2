'use client'

import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { 
  ChartBarIcon, 
  UsersIcon, 
  DocumentMagnifyingGlassIcon,
  ClockIcon,
  CreditCardIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  TruckIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)
  const { searchHistory, activeSearches } = useAppSelector((state) => state.search)
  
  // Mock credits data - in production this would come from API/Redux
  const [creditsData] = useState({
    argentina: {
      personas: 478,
      empresas: 498,
      telefonos: 500,
      vehiculos: 499,
      cuentasBancarias: 460
    },
    global: {
      rastreoWeb: 600,
      validacionIdentidad: 86
    },
    totalCredits: 3121,
    monthlyUsage: 847,
    lastPurchase: '15 de noviembre, 2024'
  })

  const stats = [
    {
      name: 'Búsquedas Totales',
      value: '1,847',
      change: '+12%',
      changeType: 'increase',
      icon: DocumentMagnifyingGlassIcon,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: 'Este mes'
    },
    {
      name: 'Búsquedas Activas',
      value: '24',
      change: '3 en proceso',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      description: 'En tiempo real'
    },
    {
      name: 'Reportes Generados',
      value: '892',
      change: '+8%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      description: 'Últimos 30 días'
    },
    {
      name: 'Tasa de Éxito',
      value: '98.5%',
      change: '+2.3%',
      changeType: 'increase',
      icon: SparklesIcon,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      description: 'Precisión'
    },
  ]

  const quickActions = [
    { 
      name: 'Persona', 
      href: '/searches/new?type=person', 
      icon: UsersIcon,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'DNI, CUIT, Nombre'
    },
    { 
      name: 'Empresa', 
      href: '/searches/new?type=company', 
      icon: BuildingOfficeIcon,
      gradient: 'from-purple-500 to-pink-500',
      description: 'CUIT, Razón Social'
    },
    { 
      name: 'Vehículo', 
      href: '/searches/new?type=vehicle', 
      icon: TruckIcon,
      gradient: 'from-orange-500 to-red-500',
      description: 'Patente, Dominio'
    },
    { 
      name: 'Teléfono', 
      href: '/searches/new?type=phone', 
      icon: PhoneIcon,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Validación, Titular'
    },
  ]

  return (
    <div>
      {/* Credits Balance Card */}
      <div className="mb-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                <CreditCardIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Saldo de Créditos</p>
                <p className="text-4xl font-bold">{creditsData.totalCredits.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-white/70 text-xs mb-1">Uso mensual</p>
                <p className="text-xl font-semibold">{creditsData.monthlyUsage}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-white/70 text-xs mb-1">Personas (AR)</p>
                <p className="text-xl font-semibold">{creditsData.argentina.personas}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-white/70 text-xs mb-1">Empresas (AR)</p>
                <p className="text-xl font-semibold">{creditsData.argentina.empresas}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <p className="text-white/70 text-xs mb-1">Rastreo Web</p>
                <p className="text-xl font-semibold">{creditsData.global.rastreoWeb}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/credits/purchase')}
                className="px-5 py-2.5 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <SparklesIcon className="w-5 h-5" />
                Comprar Créditos
              </button>
              <button
                onClick={() => router.push('/credits/history')}
                className="px-5 py-2.5 bg-white/20 backdrop-blur text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
              >
                <ArrowTrendingUpIcon className="w-5 h-5" />
                Ver Historial
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block ml-8">
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 min-w-[280px]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">Última compra</p>
                  <p className="text-white font-semibold text-lg">{creditsData.lastPurchase}</p>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-green-300" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-t border-white/10">
                  <span className="text-white/70 text-sm">Monto</span>
                  <span className="text-white font-medium">ARS 5,254.56</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Créditos</span>
                  <span className="text-white font-medium">+600</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Método</span>
                  <div className="flex items-center gap-2">
                    <CreditCardIcon className="w-4 h-4 text-white/80" />
                    <span className="text-white text-sm">Mercado Pago</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => router.push('/credits/history')}
                className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ClockIcon className="w-4 h-4" />
                Ver historial completo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bienvenido, {user?.name}
            </h1>
            <p className="text-gray-600 mt-2">
              Panel de control del sistema de búsqueda Fulldata
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/searches"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <DocumentMagnifyingGlassIcon className="w-5 h-5" />
              Ver Historial
            </Link>
            <Link
              href="/searches/new"
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-colors flex items-center gap-2 shadow-lg shadow-red-500/25"
            >
              <DocumentMagnifyingGlassIcon className="w-5 h-5" />
              Nueva Búsqueda
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Búsqueda Rápida</h2>
          <Link 
            href="/searches/new"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            Ver todas las opciones
            <ArrowTrendingUpIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.name}
                href={action.href}
                className="group relative bg-white rounded-xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">
                  Buscar {action.name}
                </h3>
                <p className="text-xs text-gray-500">{action.description}</p>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Searches */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Búsquedas Activas</h2>
                  <p className="text-xs text-white/80">En proceso ahora mismo</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-sm font-semibold">
                {activeSearches.length || 3}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            {(activeSearches.length > 0 || true) ? (
              <div className="space-y-3">
                {[
                  { id: 1, type: 'Persona', query: 'DNI: 37657175', status: 'processing', provider: 'Nosis', time: 'Hace 2 min' },
                  { id: 2, type: 'Empresa', query: 'CUIT: 30-71234567-8', status: 'processing', provider: 'BIND', time: 'Hace 5 min' },
                  { id: 3, type: 'Vehículo', query: 'ABC-123', status: 'completed', provider: 'OSINT', time: 'Hace 12 min' },
                ].slice(0, 3).map((search) => {
                  const getIcon = () => {
                    switch(search.type) {
                      case 'Persona': return UsersIcon
                      case 'Empresa': return BuildingOfficeIcon
                      case 'Vehículo': return TruckIcon
                      default: return DocumentMagnifyingGlassIcon
                    }
                  }
                  const Icon = getIcon()
                  
                  return (
                    <div key={search.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg group-hover:shadow-md transition-shadow">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{search.type}</p>
                            <span className="text-xs text-gray-500">• {search.provider}</span>
                          </div>
                          <p className="text-sm text-gray-600">{search.query}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {search.status === 'processing' ? (
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                              <span className="text-xs font-medium text-amber-600">Procesando</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-xs font-medium text-green-600">Completado</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{search.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <ClockIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No hay búsquedas activas</p>
                <Link href="/searches/new" className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">
                  Iniciar nueva búsqueda →
                </Link>
              </div>
            )}
            
            <Link
              href="/searches"
              className="mt-4 w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium text-sm text-center transition-colors flex items-center justify-center gap-2"
            >
              Ver todas las búsquedas
              <ArrowTrendingUpIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recent History */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
                  <ChartBarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Reportes Recientes</h2>
                  <p className="text-xs text-white/80">Últimos resultados completados</p>
                </div>
              </div>
              <Link
                href="/history"
                className="text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                Ver todos →
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {(searchHistory.length > 0 || true) ? (
              <div className="space-y-3">
                {[
                  { id: 1, type: 'Persona', name: 'JUAN CARLOS PÉREZ', date: 'Hoy 10:30 AM', score: 750 },
                  { id: 2, type: 'Empresa', name: 'TECH SOLUTIONS SA', date: 'Hoy 09:15 AM', score: 'A+' },
                  { id: 3, type: 'Persona', name: 'MARÍA GONZÁLEZ', date: 'Ayer 04:45 PM', score: 680 },
                  { id: 4, type: 'Vehículo', name: 'Toyota Corolla 2020', date: 'Ayer 02:30 PM', score: null },
                ].slice(0, 4).map((report) => {
                  const getIcon = () => {
                    switch(report.type) {
                      case 'Persona': return UsersIcon
                      case 'Empresa': return BuildingOfficeIcon
                      case 'Vehículo': return TruckIcon
                      default: return DocumentMagnifyingGlassIcon
                    }
                  }
                  const Icon = getIcon()
                  
                  return (
                    <Link
                      key={report.id}
                      href={`/reports/${report.id}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg group-hover:shadow-md transition-shadow">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{report.name}</p>
                          <p className="text-xs text-gray-500">{report.type} • {report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {report.score && (
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Score</p>
                            <p className="font-bold text-gray-900">{report.score}</p>
                          </div>
                        )}
                        <ArrowTrendingUpIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <ChartBarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No hay reportes recientes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}