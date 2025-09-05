'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, CreditCard, TrendingUp, TrendingDown, Calendar, 
  Filter, Download, ChevronDown, Search, Users, Building, 
  Phone, Car, Landmark, Globe, Shield, ShoppingCart, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

interface CreditTransaction {
  id: string
  date: string
  type: 'purchase' | 'usage'
  service?: string
  serviceIcon?: React.ElementType
  description: string
  amount: number
  balance: number
  reference?: string
  status: 'completed' | 'pending' | 'failed'
}

export default function CreditsHistoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterService, setFilterService] = useState('all')
  const [dateRange, setDateRange] = useState('month')
  const [showFilters, setShowFilters] = useState(false)

  const transactions: CreditTransaction[] = [
    {
      id: '1',
      date: '2024-11-15 14:30',
      type: 'purchase',
      description: 'Compra de créditos',
      amount: 100,
      balance: 3121,
      reference: 'MP-2024111500123',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-11-14 10:15',
      type: 'usage',
      service: 'personas',
      serviceIcon: Users,
      description: 'Búsqueda de persona - DNI: 37657175',
      amount: -2,
      balance: 3021,
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-11-14 09:45',
      type: 'usage',
      service: 'empresas',
      serviceIcon: Building,
      description: 'Búsqueda de empresa - CUIT: 30-71234567-8',
      amount: -3,
      balance: 3023,
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-11-13 16:20',
      type: 'usage',
      service: 'vehiculos',
      serviceIcon: Car,
      description: 'Búsqueda de vehículo - Patente: ABC123',
      amount: -1,
      balance: 3026,
      status: 'completed'
    },
    {
      id: '5',
      date: '2024-11-12 11:00',
      type: 'purchase',
      description: 'Compra de créditos - Pack empresarial',
      amount: 500,
      balance: 3027,
      reference: 'MP-2024111200456',
      status: 'completed'
    },
    {
      id: '6',
      date: '2024-11-11 15:30',
      type: 'usage',
      service: 'rastreo',
      serviceIcon: Globe,
      description: 'Rastreo web - juan.perez@email.com',
      amount: -5,
      balance: 2527,
      status: 'completed'
    },
    {
      id: '7',
      date: '2024-11-10 09:00',
      type: 'usage',
      service: 'telefonos',
      serviceIcon: Phone,
      description: 'Validación telefónica - +54 11 4343-9580',
      amount: -1,
      balance: 2532,
      status: 'failed'
    },
    {
      id: '8',
      date: '2024-11-09 14:15',
      type: 'usage',
      service: 'cuentas',
      serviceIcon: Landmark,
      description: 'Búsqueda cuentas bancarias - CUIT: 20-37657175-1',
      amount: -2,
      balance: 2533,
      status: 'completed'
    }
  ]

  const stats = {
    totalBalance: 3121,
    monthlyUsage: 847,
    monthlyPurchases: 600,
    averageDaily: 28.2,
    lastPurchase: '15 de noviembre, 2024'
  }

  const getServiceConfig = (service?: string) => {
    const configs: Record<string, { icon: React.ElementType, color: string, bg: string }> = {
      personas: { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      empresas: { icon: Building, color: 'text-purple-600', bg: 'bg-purple-50' },
      telefonos: { icon: Phone, color: 'text-green-600', bg: 'bg-green-50' },
      vehiculos: { icon: Car, color: 'text-orange-600', bg: 'bg-orange-50' },
      cuentas: { icon: Landmark, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      rastreo: { icon: Globe, color: 'text-red-600', bg: 'bg-red-50' },
      validacion: { icon: Shield, color: 'text-cyan-600', bg: 'bg-cyan-50' }
    }
    return configs[service || ''] || { icon: CreditCard, color: 'text-gray-600', bg: 'bg-gray-50' }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || transaction.type === filterType
    const matchesService = filterService === 'all' || transaction.service === filterService
    return matchesSearch && matchesType && matchesService
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Historial de Créditos
              </h1>
              <p className="text-gray-600 mt-1">Revisa todos tus movimientos y compras de créditos</p>
            </div>
            
            <button
              onClick={() => router.push('/dashboard/credits/purchase')}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Comprar Créditos
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalBalance.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">créditos disponibles</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <span className="text-xs text-gray-500">Este mes</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.monthlyUsage}</p>
            <p className="text-xs text-gray-500 mt-1">créditos usados</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-xs text-gray-500">Este mes</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.monthlyPurchases}</p>
            <p className="text-xs text-gray-500 mt-1">créditos comprados</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-gray-500">Promedio</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.averageDaily}</p>
            <p className="text-xs text-gray-500 mt-1">uso diario</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-5 h-5 text-orange-600" />
              <span className="text-xs text-gray-500">Última compra</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{stats.lastPurchase}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por descripción o referencia..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    showFilters
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de movimiento</label>
                  <select
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">Todos</option>
                    <option value="purchase">Compras</option>
                    <option value="usage">Consumos</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Servicio</label>
                  <select
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                  >
                    <option value="all">Todos los servicios</option>
                    <option value="personas">Personas</option>
                    <option value="empresas">Empresas</option>
                    <option value="vehiculos">Vehículos</option>
                    <option value="telefonos">Teléfonos</option>
                    <option value="cuentas">Cuentas Bancarias</option>
                    <option value="rastreo">Rastreo Web</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                  <select
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="today">Hoy</option>
                    <option value="week">Última semana</option>
                    <option value="month">Último mes</option>
                    <option value="year">Último año</option>
                    <option value="all">Todo el tiempo</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Referencia
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Créditos
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Saldo
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredTransactions.map((transaction) => {
                  const serviceConfig = getServiceConfig(transaction.service)
                  const Icon = transaction.serviceIcon || serviceConfig.icon
                  
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50/50 transition-all duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{transaction.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{transaction.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        {transaction.service ? (
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 ${serviceConfig.bg} rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-4 h-4 ${serviceConfig.color}`} />
                            </div>
                            <span className="text-sm text-gray-700 capitalize">{transaction.service}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 font-mono">
                          {transaction.reference || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className={`inline-flex items-center gap-1 text-sm font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          {transaction.balance.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          transaction.status === 'completed'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {transaction.status === 'completed' ? 'Completado' :
                           transaction.status === 'pending' ? 'Pendiente' : 'Fallido'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}