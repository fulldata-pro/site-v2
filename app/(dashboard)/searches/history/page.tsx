'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  CreditCardIcon,
  CalendarIcon,
  ShoppingCartIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon
} from '@heroicons/react/24/outline'
import { PeopleIcon } from '@/components/icons/People-icon'
import { PhoneIcon } from '@/components/icons/Phone-icon'
import { Car2Icon } from '@/components/icons/car-2-icon'
import { BankIcon } from '@/components/icons/bank-icon'
import { Building, Globe, Shield, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { PaymentMethod, ServicesLabel, ServicesType, TransactionStatus } from '@/lib/constants'
import { ChipTransactionStatus } from '@/components/transaction-status'
import { ServiceIcon } from '@/components/icons/service-icon'
import { PaymentMethodIcon } from '@/components/payment-method-icon'

interface SearchTransaction {
  id: string
  date: string
  type: 'purchase' | 'usage'
  service?: ServicesType
  description: string
  amount: number
  balance: number
  paymentMethod?: PaymentMethod
  reference?: string
  status: TransactionStatus
}

const transactions: SearchTransaction[] = [
  {
    id: '1',
    date: '2024-11-15 14:30',
    type: 'purchase',
    description: 'Compra de búsquedas',
    amount: 100,
    balance: 3121,
    paymentMethod: PaymentMethod.MERCADO_PAGO,
    reference: 'MP-2024111500123',
    status: TransactionStatus.SUCCESS
  },
  {
    id: '2',
    date: '2024-11-14 10:15',
    type: 'usage',
    service: ServicesType.PEOPLE,
    description: 'Búsqueda de persona - DNI: 37657175',
    amount: -2,
    balance: 3021,
    status: TransactionStatus.SUCCESS
  },
  {
    id: '3',
    date: '2024-11-14 09:45',
    type: 'usage',
    service: ServicesType.COMPANIES,
    description: 'Búsqueda de empresa - CUIT: 30-71234567-8',
    amount: -3,
    balance: 3023,
    status: TransactionStatus.SUCCESS
  },
  {
    id: '4',
    date: '2024-11-13 16:20',
    type: 'usage',
    service: ServicesType.VEHICLES,
    description: 'Búsqueda de vehículo - Patente: ABC123',
    amount: -1,
    balance: 3026,
    status: TransactionStatus.SUCCESS
  },
  {
    id: '5',
    date: '2024-11-12 11:00',
    type: 'purchase',
    description: 'Compra de búsquedas - Pack empresarial',
    amount: 500,
    balance: 3027,
    reference: 'MP-2024111200456',
    paymentMethod: PaymentMethod.MERCADO_PAGO,
    status: TransactionStatus.SUCCESS
  },
  {
    id: '6',
    date: '2024-11-11 15:30',
    type: 'usage',
    service: ServicesType.OSINT,
    description: 'Rastreo web - juan.perez@email.com',
    amount: -5,
    balance: 2527,
    status: TransactionStatus.SUCCESS
  },
  {
    id: '7',
    date: '2024-11-10 09:00',
    type: 'usage',
    service: ServicesType.PHONES,
    description: 'Validación telefónica - +54 11 4343-9580',
    amount: -1,
    balance: 2532,
    status: TransactionStatus.ERROR
  },
  {
    id: '8',
    date: '2024-11-09 14:15',
    type: 'usage',
    service: ServicesType.BANKS,
    description: 'Búsqueda cuentas bancarias - CUIT: 20-37657175-1',
    amount: -2,
    balance: 2533,
    status: TransactionStatus.SUCCESS
  }
]

export default function SearchesHistoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterService, setFilterService] = useState('all')

  const stats = {
    totalBalance: 3121,
    monthlyUsage: 847,
    monthlyPurchases: 600,
    averageDaily: 28.2,
  }

  const getServiceConfig = (service?: string) => {
    const configs: Record<string, { icon: React.ElementType, color: string, bg: string }> = {
      personas: { icon: PeopleIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
      empresas: { icon: Building, color: 'text-purple-600', bg: 'bg-purple-50' },
      telefonos: { icon: PhoneIcon, color: 'text-green-600', bg: 'bg-green-50' },
      vehiculos: { icon: Car2Icon, color: 'text-orange-600', bg: 'bg-orange-50' },
      cuentas: { icon: BankIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
      rastreo: { icon: Globe, color: 'text-red-600', bg: 'bg-red-50' },
      validacion: { icon: Shield, color: 'text-cyan-600', bg: 'bg-cyan-50' }
    }
    return configs[service || ''] || { icon: CreditCardIcon, color: 'text-gray-600', bg: 'bg-gray-50' }
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || transaction.type === filterType
      const matchesService = filterService === 'all' || transaction.service === filterService
      return matchesSearch && matchesType && matchesService
    })
  }, [searchTerm, filterType, filterService])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 to-stone-50/30">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 flex flex-col overflow-hidden">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-white to-slate-50/30 px-8 py-6 border-b border-slate-100/60">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Historial de Búsquedas</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {filteredTransactions.length} transacciones encontradas
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/searches/purchase')}
              className="px-5 py-2.5 bg-secondary-light text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center gap-2"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Comprar Búsquedas
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-8 py-6 border-b border-slate-100/60">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Searches Card */}
            <div className="group relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl rounded-3xl border border-white/30 p-6 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-purple-200/30 transition-all duration-300 ">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <CreditCardIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="px-2.5 py-1 bg-purple-100/80 rounded-xl">
                    <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Total</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{stats.totalBalance.toLocaleString()}</p>
                <p className="text-xs font-medium text-slate-500">búsquedas disponibles</p>
              </div>
            </div>

            {/* Monthly Usage Card */}
            <div className="group relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl rounded-3xl border border-white/30 p-6 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-red-200/30 transition-all duration-300 ">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                    <TrendingDownIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="px-2.5 py-1 bg-red-100/80 rounded-xl">
                    <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">Este mes</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{stats.monthlyUsage.toLocaleString()}</p>
                <p className="text-xs font-medium text-slate-500">búsquedas usadas</p>
              </div>
            </div>

            {/* Monthly Purchases Card */}
            <div className="group relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl rounded-3xl border border-white/30 p-6 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-green-200/30 transition-all duration-300 ">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <TrendingUpIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="px-2.5 py-1 bg-green-100/80 rounded-xl">
                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Este mes</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{stats.monthlyPurchases.toLocaleString()}</p>
                <p className="text-xs font-medium text-slate-500">búsquedas compradas</p>
              </div>
            </div>

            {/* Daily Average Card */}
            <div className="group relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl rounded-3xl border border-white/30 p-6 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-blue-200/30 transition-all duration-300 ">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="px-2.5 py-1 bg-blue-100/80 rounded-xl">
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Promedio</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800 mb-1">{stats.averageDaily}</p>
                <p className="text-xs font-medium text-slate-500">uso diario</p>
              </div>
            </div>

          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="px-8 py-6 border-b border-slate-100/60">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar transacciones..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-50/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300/60 transition-all duration-200 text-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-3 bg-slate-50/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300/60 transition-all duration-200 text-slate-700 text-sm font-medium"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Todos los tipos</option>
                <option value="purchase">Compras</option>
                <option value="usage">Usos</option>
              </select>

              <select
                className="px-4 py-3 bg-slate-50/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300/60 transition-all duration-200 text-slate-700 text-sm font-medium"
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

            <div className="text-sm text-slate-500 font-medium">
              {filteredTransactions.length} de {transactions.length} registros
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-white to-slate-50/20">
          <div className="h-full p-8 flex flex-col">
            <DataTable
              data={filteredTransactions}
              columns={[
                {
                  key: 'type',
                  header: 'Tipo',
                  render: (transaction) => (
                    <div className="flex items-center">
                      {transaction.type !== 'purchase' ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <ArrowDownRightIcon className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <ArrowUpRightIcon className="w-4 h-4 text-purple-600" />
                        </div>
                      )}
                      <div className="ml-3">
                        <div className="text-sm font-semibold text-slate-800">
                          {transaction.type === 'purchase' ? 'Compra' : 'Consumo'}
                        </div>
                        {transaction.service && (
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            {(() => {
                              return (
                                <>
                                  {transaction.type === 'purchase' ? (
                                    <PaymentMethodIcon method={transaction.paymentMethod!} className="w-3 h-3" />
                                  ) : <ServiceIcon className="text-sm" service={transaction.service} />}
                                  {ServicesLabel[transaction.service]}
                                </>
                              )
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                },
                {
                  key: 'description',
                  header: 'Descripción',
                  render: (transaction) => (
                    <div className="text-sm text-slate-800 font-medium">{transaction.description}</div>
                  )
                },
                {
                  key: 'status',
                  header: 'Estado',
                  render: (transaction) => (
                    <ChipTransactionStatus status={transaction.status} />
                  )
                },
                {
                  key: 'amount',
                  header: 'Cantidad',
                  render: (transaction) => (
                    <div className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'} ${transaction.type === 'purchase' ? '' : 'hidden'}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </div>
                  )
                },
                {
                  key: 'date',
                  header: 'Fecha',
                  render: (transaction) => (
                    <div className="text-sm text-slate-500">{transaction.date}</div>
                  )
                },
                {
                  key: 'reference',
                  header: 'Referencia',
                  render: (transaction) => (
                    <div className="text-sm text-slate-500 font-mono">
                      {transaction.reference || '-'}
                    </div>
                  )
                },
                {
                  key: 'action',
                  header: 'Acción',
                  render: () => (
                    <button className="text-slate-400 hover:text-slate-600">
                      <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                  )
                }
              ]}
              emptyState={{
                icon: <CreditCardIcon className="w-12 h-12 text-slate-400 mx-auto" />,
                title: "No se encontraron transacciones",
                description: "Intenta ajustar los filtros o realiza una nueva transacción",
                action: (
                  <button
                    onClick={() => router.push('/searches/purchase')}
                    className="mt-4 px-4 py-2 bg-slate-700 text-white text-sm rounded-xl font-medium hover:bg-slate-800 transition-colors"
                  >
                    Comprar búsquedas
                  </button>
                )
              }}
              pagination={{
                enabled: true,
                pageSize: 15,
                showSizeOptions: true,
                sizeOptions: [10, 15, 25, 50, 100]
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}