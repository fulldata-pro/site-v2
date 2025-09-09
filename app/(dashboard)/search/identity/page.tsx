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

interface IdentitySearchRecord {
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

export default function IdentitySearchPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all')

  const searches: IdentitySearchRecord[] = [
    {
      id: 701,
      name: 'BIOMETRIC VERIFICATION',
      document: 'face-scan-001.jpg',
      documentType: 'Biometric',
      status: RequestStatus.SUCCESS,
      date: '06/09/2025, 4:50 p.m.',
      credits: 5,
      provider: 'AWS Rekognition',
      label: 'KYC'
    },
    {
      id: 689,
      name: 'DOCUMENT AUTHENTICITY',
      document: 'dni-scan-456789.pdf',
      documentType: 'Document',
      status: RequestStatus.PROCESSING,
      date: '05/09/2025, 2:30 p.m.',
      credits: 3,
      provider: 'IDAnalyzer',
      label: 'Onboarding'
    },
    {
      id: 665,
      name: 'LIVENESS DETECTION',
      document: 'video-selfie-789.mp4',
      documentType: 'Video',
      status: RequestStatus.SUCCESS,
      date: '04/09/2025, 10:15 a.m.',
      credits: 4,
      provider: 'Jumio',
      label: 'Anti-Fraud'
    },
    {
      id: 654,
      name: 'PASSPORT VERIFICATION',
      document: 'passport-scan-102.pdf',
      documentType: 'Document',
      status: RequestStatus.SUCCESS,
      date: '03/09/2025, 3:45 p.m.',
      credits: 3,
      provider: 'IDAnalyzer'
    },
    {
      id: 643,
      name: 'FACIAL RECOGNITION',
      document: 'face-match-303.jpg',
      documentType: 'Biometric',
      status: RequestStatus.ERROR,
      date: '02/09/2025, 11:20 a.m.',
      credits: 5,
      provider: 'AWS Rekognition'
    },
    {
      id: 632,
      name: 'ID CARD VERIFICATION',
      document: 'id-card-405.jpg',
      documentType: 'Document',
      status: RequestStatus.SUCCESS,
      date: '01/09/2025, 9:00 a.m.',
      credits: 3,
      provider: 'Veriff',
      label: 'Priority'
    },
    {
      id: 621,
      name: 'SELFIE VERIFICATION',
      document: 'selfie-506.jpg',
      documentType: 'Biometric',
      status: RequestStatus.PROCESSING,
      date: '31/08/2025, 2:15 p.m.',
      credits: 4,
      provider: 'Jumio'
    },
    {
      id: 610,
      name: 'DRIVER LICENSE CHECK',
      document: 'license-607.pdf',
      documentType: 'Document',
      status: RequestStatus.SUCCESS,
      date: '30/08/2025, 4:30 p.m.',
      credits: 3,
      provider: 'IDAnalyzer'
    },
    {
      id: 599,
      name: 'AGE VERIFICATION',
      document: 'age-verify-708.jpg',
      documentType: 'Biometric',
      status: RequestStatus.SUCCESS,
      date: '29/08/2025, 1:00 p.m.',
      credits: 2,
      provider: 'Yoti',
      label: 'Compliance'
    },
    {
      id: 588,
      name: 'MULTI-FACTOR AUTH',
      document: 'mfa-session-809.mp4',
      documentType: 'Video',
      status: RequestStatus.ERROR,
      date: '28/08/2025, 10:45 a.m.',
      credits: 6,
      provider: 'Onfido'
    },
    {
      id: 577,
      name: 'DOCUMENT TAMPERING CHECK',
      document: 'doc-tamper-910.pdf',
      documentType: 'Document',
      status: RequestStatus.SUCCESS,
      date: '27/08/2025, 3:20 p.m.',
      credits: 4,
      provider: 'Veriff'
    },
    {
      id: 566,
      name: 'VOICE BIOMETRICS',
      document: 'voice-sample-011.wav',
      documentType: 'Audio',
      status: RequestStatus.PROCESSING,
      date: '26/08/2025, 12:00 p.m.',
      credits: 5,
      provider: 'Nuance',
      label: 'VIP'
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
                <div className="w-12 h-12 bg-services-identity rounded-xl flex items-center justify-center">
                  <ServiceIcon service={ServicesType.IDENTITY} className="text-2xl " />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Validación de Identidad</h1>
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
                  placeholder="Buscar validación o documento..."
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
                  header: 'Validación',
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
                  header: 'Archivo',
                  render: (search) => (
                    <div>
                      <div className="text-sm font-medium text-slate-800">{search.document}</div>
                      <div className="text-xs text-slate-500">{search.documentType} • {search.provider}</div>
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
                icon: <ServiceIcon service={ServicesType.IDENTITY} className="text-4xl text-slate-400 mx-auto" />,
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