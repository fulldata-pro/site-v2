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

interface PhoneSearchRecord {
  id: number
  name: string
  document: string
  documentType: string
  status: RequestStatus
  date: string
  label?: string
}

export default function PhoneSearchPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all')

  const searches: PhoneSearchRecord[] = [
    {
      id: 456,
      name: 'LAURA BEATRIZ SILVA',
      document: '+54 11 4567-8901',
      documentType: 'Número',
      status: RequestStatus.SUCCESS,
      date: '06/09/2025, 4:30 p.m.',
      label: 'Verification'
    },
    {
      id: 432,
      name: 'RICARDO MORALES',
      document: '+54 11 2345-6789',
      documentType: 'Número',
      status: RequestStatus.ERROR,
      date: '05/09/2025, 1:20 p.m.',
    },
    {
      id: 411,
      name: 'ANA CRISTINA LOPEZ',
      document: '+54 11 9876-5432',
      documentType: 'Número',
      status: RequestStatus.SUCCESS,
      date: '04/09/2025, 8:15 a.m.',
      label: 'Client Check'
    },
    {
      id: 398,
      name: 'MIGUEL ANGEL TORRES',
      document: '+54 11 1122-3344',
      documentType: 'Número',
      status: RequestStatus.PROCESSING,
      date: '03/09/2025, 3:45 p.m.',
    },
    {
      id: 387,
      name: 'JULIA FERNANDEZ',
      document: '+54 11 5555-1234',
      documentType: 'Número',
      status: RequestStatus.SUCCESS,
      date: '02/09/2025, 11:00 a.m.',
    },
    {
      id: 376,
      name: 'CARLOS EDUARDO GOMEZ',
      document: '+54 11 7777-8888',
      documentType: 'Número',
      status: RequestStatus.SUCCESS,
      date: '01/09/2025, 2:30 p.m.',
      label: 'Priority'
    },
    {
      id: 365,
      name: 'MARIA ALEJANDRA RUIZ',
      document: '+54 11 3333-4444',
      documentType: 'Número',
      status: RequestStatus.PROCESSING,
      date: '31/08/2025, 9:45 a.m.',
    },
    {
      id: 354,
      name: 'FERNANDO LUIS MARTINEZ',
      document: '+54 11 6666-7777',
      documentType: 'Número',
      status: RequestStatus.SUCCESS,
      date: '30/08/2025, 4:00 p.m.',
    },
    {
      id: 343,
      name: 'PATRICIA ANDREA DIAZ',
      document: '+54 11 9999-0000',
      documentType: 'Número',
      status: RequestStatus.ERROR,
      date: '29/08/2025, 1:15 p.m.',
    },
    {
      id: 332,
      name: 'ROBERTO CARLOS SANCHEZ',
      document: '+54 11 1111-2222',
      documentType: 'Número',
      status: RequestStatus.SUCCESS,
      date: '28/08/2025, 10:30 a.m.',
      label: 'VIP'
    },
    {
      id: 321,
      name: 'SOFIA VICTORIA PEREZ',
      document: '+54 11 4444-5555',
      documentType: 'Número',
      status: RequestStatus.SUCCESS,
      date: '27/08/2025, 3:20 p.m.',
    },
    {
      id: 310,
      name: 'DIEGO MARTIN RODRIGUEZ',
      document: '+54 11 8888-9999',
      documentType: 'Número',
      status: RequestStatus.PROCESSING,
      date: '26/08/2025, 12:00 p.m.',
    }
  ]



  const filteredSearches = useMemo(() => {
    return searches.filter(search => {
      const matchesSearch = search.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        search.document.includes(searchTerm)
      const matchesStatus = statusFilter === 'all' || search.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter, searches])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/30 to-stone-50/30 ">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 flex flex-col overflow-hidden">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-white to-slate-50/30 px-8 py-6 border-b border-slate-100/60">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-services-phones rounded-xl flex items-center justify-center">
                  <ServiceIcon service={ServicesType.PHONES} className="text-2xl" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Teléfonos</h1>
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
                  placeholder="Buscar teléfono..."
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
                  header: 'Titular',
                  render: (search) => (
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-slate-600">
                          {search.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
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
                  header: 'Teléfono',
                  render: (search) => (
                    <div className="text-sm font-medium text-slate-800">{search.document}</div>
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
                icon: <ServiceIcon service={ServicesType.PHONES} className="text-4xl text-slate-400 mx-auto" />,
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