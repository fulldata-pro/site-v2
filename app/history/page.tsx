'use client'

import { useAppSelector } from '@/store/hooks'
import Link from 'next/link'
import { ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function HistoryPage() {
  const { searchHistory } = useAppSelector((state) => state.search)

  const mockHistory = [
    {
      id: '1',
      type: 'people',
      query: 'email:juan.perez@email.com',
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'completed' as const,
      reportId: 'report-1'
    },
    {
      id: '2',
      type: 'company',
      query: '30-12345678-9',
      timestamp: new Date('2024-01-14T14:20:00'),
      status: 'completed' as const,
      reportId: 'report-2'
    },
    {
      id: '3',
      type: 'vehicle',
      query: 'ABC123',
      timestamp: new Date('2024-01-13T09:15:00'),
      status: 'completed' as const,
      reportId: 'report-3'
    },
  ]

  const allHistory = searchHistory.length > 0 ? searchHistory : mockHistory

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      people: 'Persona',
      company: 'Empresa',
      vehicle: 'Vehículo',
      phone: 'Teléfono',
      bank: 'Banco'
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      people: 'bg-blue-100 text-blue-800',
      company: 'bg-green-100 text-green-800',
      vehicle: 'bg-purple-100 text-purple-800',
      phone: 'bg-orange-100 text-orange-800',
      bank: 'bg-red-100 text-red-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Historial de Búsquedas</h1>
        <p className="text-gray-600 mt-2">
          Revise todas sus búsquedas anteriores y acceda a los reportes generados
        </p>
      </div>

      {allHistory.length > 0 ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Búsqueda
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allHistory.map((search) => (
                  <tr key={search.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
                        {formatDate(search.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(search.type)}`}>
                        {getTypeLabel(search.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {search.query}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        search.status === 'completed' ? 'bg-green-100 text-green-800' :
                        search.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {search.status === 'completed' ? 'Completado' :
                         search.status === 'failed' ? 'Fallido' : 'Procesando'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {search.status === 'completed' && (
                        <Link
                          href={`/report/${search.id}`}
                          className="text-primary hover:text-primary-dark flex items-center"
                        >
                          <DocumentTextIcon className="w-4 h-4 mr-1" />
                          Ver Reporte
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No hay búsquedas en el historial</p>
          <p className="text-gray-400 text-sm mt-2">
            Las búsquedas que realice aparecerán aquí
          </p>
          <Link
            href="/search"
            className="btn-primary inline-block mt-6"
          >
            Nueva Búsqueda
          </Link>
        </div>
      )}
    </div>
  )
}