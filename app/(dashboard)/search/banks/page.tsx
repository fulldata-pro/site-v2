'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'
import GeminiStarsIcon from '@/components/icons/Magic-wand'
import { RequestStatus, RequestStatusLabel } from '@/lib/constants'
import { ChipRequestStatus } from '@/components/ChipRequestStatus'
import { ServiceIcon } from '@/components/icons/service-icon'
import { ServicesType } from '@/lib/constants'
import { DataTable } from '@/components/ui/data-table'

interface BankSearchRecord {
  id: number
  name: string
  document: string
  documentType: string
  status: RequestStatus
  date: string
  credits: number
  provider: string
  label?: string
}

export default function BankSearchPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all')

  const searches: BankSearchRecord[] = [
    {
      id: 578,
      name: 'CUENTA BANCO NACIÓN',
      document: '0110599520000001234567',
      documentType: 'CBU',
      status: RequestStatus.SUCCESS,
      date: '06/09/2025, 3:45 p.m.',
      credits: 2,
      provider: 'BCRA',
      label: 'Compliance'
    },
    {
      id: 556,
      name: 'CUENTA BANCO GALICIA',
      document: '0070033020000009876543',
      documentType: 'CBU',
      status: RequestStatus.PROCESSING,
      date: '05/09/2025, 10:30 a.m.',
      credits: 2,
      provider: 'Coelsa'
    },
    {
      id: 534,
      name: 'CUENTA BANCO SANTANDER',
      document: '0720001920000005555555',
      documentType: 'CBU',
      status: RequestStatus.SUCCESS,
      date: '04/09/2025, 2:00 p.m.',
      credits: 2,
      provider: 'BCRA',
      label: 'AML Check'
    },
    {
      id: 523,
      name: 'CUENTA BANCO PROVINCIA',
      document: '0140999801000012345678',
      documentType: 'CBU',
      status: RequestStatus.SUCCESS,
      date: '03/09/2025, 11:15 a.m.',
      credits: 2,
      provider: 'BCRA'
    },
    {
      id: 512,
      name: 'CUENTA BANCO MACRO',
      document: '2850001540000024681357',
      documentType: 'CBU',
      status: RequestStatus.ERROR,
      date: '02/09/2025, 4:30 p.m.',
      credits: 2,
      provider: 'Coelsa'
    },
    {
      id: 501,
      name: 'CUENTA BANCO HSBC',
      document: '1500609940000087654321',
      documentType: 'CBU',
      status: RequestStatus.SUCCESS,
      date: '01/09/2025, 9:00 a.m.',
      credits: 2,
      provider: 'BCRA',
      label: 'Priority'
    },
    {
      id: 490,
      name: 'CUENTA BANCO BBVA',
      document: '0170888801000011223344',
      documentType: 'CBU',
      status: RequestStatus.PROCESSING,
      date: '31/08/2025, 2:45 p.m.',
      credits: 2,
      provider: 'Coelsa'
    },
    {
      id: 479,
      name: 'CUENTA BANCO CIUDAD',
      document: '0290011210000033445566',
      documentType: 'CBU',
      status: RequestStatus.SUCCESS,
      date: '30/08/2025, 10:20 a.m.',
      credits: 2,
      provider: 'BCRA'
    },
    {
      id: 468,
      name: 'CUENTA BANCO PATAGONIA',
      document: '0340100800000099887766',
      documentType: 'CBU',
      status: RequestStatus.SUCCESS,
      date: '29/08/2025, 3:30 p.m.',
      credits: 2,
      provider: 'BCRA',
      label: 'VIP'
    },
    {
      id: 457,
      name: 'CUENTA BANCO ICBC',
      document: '0150502601000055667788',
      documentType: 'CBU',
      status: RequestStatus.ERROR,
      date: '28/08/2025, 1:00 p.m.',
      credits: 2,
      provider: 'Coelsa'
    },
    {
      id: 446,
      name: 'CUENTA BANCO SUPERVIELLE',
      document: '0270001910000044556677',
      documentType: 'CBU',
      status: RequestStatus.SUCCESS,
      date: '27/08/2025, 4:15 p.m.',
      credits: 2,
      provider: 'BCRA'
    },
    {
      id: 435,
      name: 'CUENTA BANCO HIPOTECARIO',
      document: '0440000010000066778899',
      documentType: 'CBU',
      status: RequestStatus.PROCESSING,
      date: '26/08/2025, 11:45 a.m.',
      credits: 2,
      provider: 'Coelsa'
    }
  ]

  const filteredSearches = useMemo(() => {
    return searches.filter(search => {
      const matchesSearch = search.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        search.document.includes(searchTerm)
      const matchesStatus = statusFilter === 'all' || search.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 to-stone-50/30 ">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 flex flex-col overflow-hidden">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-white to-slate-50/30 px-8 py-6 border-b border-slate-100/60">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-services-banks rounded-xl flex items-center justify-center">
                  <ServiceIcon service={ServicesType.BANKS} className="text-2xl" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Bancos</h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {filteredSearches.length} búsquedas encontradas
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/search/new')}
              className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-red-500/25 flex items-center gap-2"
            >
              <GeminiStarsIcon className="w-5 h-5" color='#FFFFFF' />
              Nueva Búsqueda
            </button>
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
                  placeholder="Buscar banco o CBU..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-50/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300/60 transition-all duration-200 text-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-3 bg-slate-50/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300/60 transition-all duration-200 text-slate-700 text-sm font-medium"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'all')}
              >
                <option value="all">Todos los estados</option>
                {Object.entries(RequestStatus).map(([key, value]) => (
                  <option key={key} value={value}>{RequestStatusLabel[value]}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-slate-500 font-medium">
              {filteredSearches.length} de {searches.length} registros
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-white to-slate-50/20">
          <div className="h-full p-8 flex flex-col">
            <DataTable
              data={filteredSearches}
              columns={[
                {
                  key: 'name',
                  header: 'Cuenta',
                  render: (search) => (
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-slate-600">
                          {search.name.split(' ').slice(-1)[0].slice(0, 2)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-semibold text-slate-800">{search.name}</div>
                        {search.label && (
                          <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 mt-1">
                            {search.label}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                },
                {
                  key: 'document',
                  header: 'CBU',
                  render: (search) => (
                    <div>
                      <div className="text-sm font-medium text-slate-800 font-mono">{search.document}</div>
                      <div className="text-xs text-slate-500">{search.provider}</div>
                    </div>
                  )
                },
                {
                  key: 'status',
                  header: 'Estado',
                  render: (search) => (
                    <ChipRequestStatus status={search.status} />
                  )
                },
                {
                  key: 'date',
                  header: 'Fecha',
                  render: (search) => (
                    <div className="text-sm text-slate-500">{search.date.split(',')[0]}</div>
                  )
                },
                {
                  key: 'credits',
                  header: 'Créditos',
                  render: (search) => (
                    <div className="text-sm font-semibold text-slate-600">
                      {search.credits}
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
                icon: <ServiceIcon service={ServicesType.BANKS} className="text-4xl text-slate-400 mx-auto" />,
                title: "No se encontraron búsquedas",
                description: "Intenta ajustar los filtros o realiza una nueva búsqueda",
                action: (
                  <button
                    onClick={() => router.push('/search/new')}
                    className="mt-4 px-4 py-2 bg-slate-700 text-white text-sm rounded-xl font-medium hover:bg-slate-800 transition-colors"
                  >
                    Nueva búsqueda
                  </button>
                )
              }}
              onRowClick={(search) => {
                if (search.status === RequestStatus.SUCCESS) {
                  router.push(`/reports/${search.id}`)
                }
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