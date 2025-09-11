'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from '@/components/icons/search-icon'
import GeminiStarsIcon from '@/components/icons/Magic-wand'
import { RequestStatus, RequestStatusLabel } from '@/lib/constants'
import { ChipRequestStatus } from '@/components/ChipRequestStatus'
import { ServiceIcon } from '@/components/icons/service-icon'
import { ServicesType } from '@/lib/constants'

interface OSINTSearchRecord {
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

export default function OSINTSearchPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const searches: OSINTSearchRecord[] = [
    {
      id: 612,
      name: 'DIGITAL FOOTPRINT ANALYSIS',
      document: 'maria.gonzalez@gmail.com',
      documentType: 'Email',
      status: RequestStatus.SUCCESS,
      date: '06/09/2025, 5:20 p.m.',
      credits: 3,
      provider: 'Maltego',
      label: 'Deep Web'
    },
    {
      id: 598,
      name: 'SOCIAL MEDIA INVESTIGATION',
      document: '@carlos_dev_2024',
      documentType: 'Username',
      status: RequestStatus.PROCESSING,
      date: '05/09/2025, 3:15 p.m.',
      credits: 4,
      provider: 'Sherlock',
      label: 'Investigation'
    },
    {
      id: 573,
      name: 'DOMAIN INTELLIGENCE',
      document: 'suspicious-site.com',
      documentType: 'Domain',
      status: RequestStatus.SUCCESS,
      date: '04/09/2025, 11:45 a.m.',
      credits: 2,
      provider: 'Shodan',
      label: 'Threat Intel'
    },
    {
      id: 562,
      name: 'IP ADDRESS RECONNAISSANCE',
      document: '192.168.1.100',
      documentType: 'IP Address',
      status: RequestStatus.ERROR,
      date: '03/09/2025, 2:30 p.m.',
      credits: 2,
      provider: 'Nmap'
    },
    {
      id: 551,
      name: 'BLOCKCHAIN INVESTIGATION',
      document: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      documentType: 'BTC Address',
      status: RequestStatus.SUCCESS,
      date: '02/09/2025, 10:00 a.m.',
      credits: 5,
      provider: 'Chainalysis',
      label: 'Crypto'
    },
    {
      id: 540,
      name: 'DARK WEB MONITORING',
      document: 'company_data_leak',
      documentType: 'Keyword',
      status: RequestStatus.SUCCESS,
      date: '01/09/2025, 4:45 p.m.',
      credits: 6,
      provider: 'DarkOwl'
    },
    {
      id: 529,
      name: 'PHONE NUMBER LOOKUP',
      document: '+1-555-0123',
      documentType: 'Phone',
      status: RequestStatus.PROCESSING,
      date: '31/08/2025, 11:30 a.m.',
      credits: 2,
      provider: 'TrueCaller'
    },
    {
      id: 518,
      name: 'GEOLOCATION ANALYSIS',
      document: '40.7128,-74.0060',
      documentType: 'Coordinates',
      status: RequestStatus.SUCCESS,
      date: '30/08/2025, 3:00 p.m.',
      credits: 3,
      provider: 'Google Earth',
      label: 'Location'
    },
    {
      id: 507,
      name: 'METADATA EXTRACTION',
      document: 'document_2025.pdf',
      documentType: 'File',
      status: RequestStatus.SUCCESS,
      date: '29/08/2025, 9:20 a.m.',
      credits: 1,
      provider: 'ExifTool'
    },
    {
      id: 496,
      name: 'WEBSITE FINGERPRINTING',
      document: 'example-corp.com',
      documentType: 'Domain',
      status: RequestStatus.ERROR,
      date: '28/08/2025, 2:10 p.m.',
      credits: 3,
      provider: 'Wappalyzer'
    },
    {
      id: 485,
      name: 'SOCIAL NETWORK MAPPING',
      document: 'linkedin.com/in/johndoe',
      documentType: 'Profile URL',
      status: RequestStatus.SUCCESS,
      date: '27/08/2025, 4:50 p.m.',
      credits: 4,
      provider: 'Maltego'
    },
    {
      id: 474,
      name: 'DATA BREACH CHECK',
      document: 'admin@company.com',
      documentType: 'Email',
      status: RequestStatus.PROCESSING,
      date: '26/08/2025, 10:15 a.m.',
      credits: 2,
      provider: 'HaveIBeenPwned',
      label: 'Security'
    }
  ]

  const filteredSearches = useMemo(() => {
    return searches.filter(search => {
      const matchesSearch = search.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        search.document.includes(searchTerm)
      const matchesStatus = statusFilter === 'all' || search.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searches, searchTerm, statusFilter])

  const paginatedSearches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredSearches.slice(startIndex, endIndex)
  }, [filteredSearches, currentPage])

  const totalPages = Math.ceil(filteredSearches.length / itemsPerPage)

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleStatusChange = (value: RequestStatus | 'all') => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Header */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-services-osint rounded-xl flex items-center justify-center">
                <ServiceIcon service={ServicesType.OSINT} className="text-2xl" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">OSINT</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {searches.length} búsquedas realizadas
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard/searches/new')}
              className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-red-500/25 flex items-center gap-2"
            >
              <GeminiStarsIcon className="w-5 h-5" color='#FFFFFF' />
              Nueva Búsqueda
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2  text-sm">
                <SearchIcon className='text-gray-300' classPath1='text-gray-300' classPath2='text-gray-300' />
              </div>
              <input
                type="text"
                placeholder="Buscar investigación..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            <select
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value as RequestStatus | 'all')}
            >
              <option value="all">Todos los estados</option>
              {Object.entries(RequestStatus).map(([key, value]) => (
                <option key={key} value={value}>{RequestStatusLabel[value]}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-500">
            {filteredSearches.length} de {searches.length} registros
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Investigación
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Objetivo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Créditos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedSearches.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center">
                    <div className="mx-auto max-w-sm">
                      <ServiceIcon service={ServicesType.OSINT} className="text-4xl text-gray-300 mx-auto mb-4" />
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        No se encontraron búsquedas
                      </h3>
                      <p className="text-sm text-gray-500">
                        Intenta ajustar los filtros o realiza una nueva búsqueda
                      </p>
                      <button
                        onClick={() => router.push('/dashboard/searches/new')}
                        className="mt-4 px-4 py-2 bg-black text-white text-sm rounded-md font-medium hover:bg-gray-800 transition-colors"
                      >
                        Nueva búsqueda
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedSearches.map((search, index) => {
                  const isLast = index === paginatedSearches.length - 1

                  return (
                    <tr
                      key={search.id}
                      onClick={() => search.status === RequestStatus.SUCCESS && router.push(`/dashboard/reports/${search.id}`)}
                      className={`${!isLast ? 'border-b border-gray-200' : ''} ${search.status === RequestStatus.SUCCESS ? 'hover:bg-gray-50 cursor-pointer' : ''} transition-colors`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {search.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{search.name}</div>
                            {search.label && (
                              <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 mt-1">
                                {search.label}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{search.document}</div>
                        <div className="text-xs text-gray-500">{search.documentType} • {search.provider}</div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <ChipRequestStatus status={search.status} />
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div>{search.date.split(',')[0]}</div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {search.credits}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando{' '}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{' '}
              a{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredSearches.length)}
              </span>{' '}
              de <span className="font-medium">{filteredSearches.length}</span> resultados
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm border border-gray-300 rounded-md ${page === currentPage
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'text-gray-900 bg-white hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}