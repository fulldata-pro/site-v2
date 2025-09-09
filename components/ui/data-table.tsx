'use client'

import { ReactNode, useState, useMemo, useEffect } from 'react'

interface Column<T> {
  key: string
  header: string | ReactNode
  render?: (item: T, index: number) => ReactNode
  className?: string
  headerClassName?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  emptyState?: {
    icon?: ReactNode
    title?: string
    description?: string
    action?: ReactNode
  }
  className?: string
  hoverable?: boolean
  pagination?: {
    enabled: boolean
    pageSize?: number
    showSizeOptions?: boolean
    sizeOptions?: number[]
  }
  onRowClick?: (item: T, index: number) => void
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  emptyState,
  className = '',
  hoverable = true,
  pagination,
  onRowClick
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 10)

  const { paginatedData, totalPages, startIndex, endIndex } = useMemo(() => {
    if (!pagination?.enabled) {
      return {
        paginatedData: data,
        totalPages: 1,
        startIndex: 1,
        endIndex: data.length
      }
    }

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginated = data.slice(start, end)
    const pages = Math.ceil(data.length / pageSize)

    return {
      paginatedData: paginated,
      totalPages: pages,
      startIndex: start + 1,
      endIndex: Math.min(end, data.length)
    }
  }, [data, currentPage, pageSize, pagination?.enabled])

  // Reset page when data changes
  useEffect(() => {
    setCurrentPage(1)
  }, [data.length])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className={`bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/40 overflow-hidden shadow-sm ${className}`}>
        <div className="px-6 py-20 text-center">
          <div className="mx-auto max-w-sm">
            {emptyState.icon && (
              <div className="p-6 bg-slate-50/60 rounded-2xl border border-slate-200/40 mb-8 inline-block">
                {emptyState.icon}
              </div>
            )}
            <div className="space-y-4">
              {emptyState.title && (
                <h3 className="text-lg font-semibold text-slate-800">
                  {emptyState.title}
                </h3>
              )}
              {emptyState.description && (
                <p className="text-slate-500">
                  {emptyState.description}
                </p>
              )}
              {emptyState.action}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/40 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/80 backdrop-blur-sm">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider ${column.headerClassName || ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-slate-200/40">
              {paginatedData.map((item, index) => {
                const isLast = index === paginatedData.length - 1
                return (
                  <tr
                    key={item.id || index}
                    className={`transition-all duration-200 ${hoverable ? 'hover:bg-slate-50/40' : ''} ${
                      !isLast ? 'border-b border-slate-200/30' : ''
                    } ${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onRowClick?.(item, index)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-5 whitespace-nowrap ${column.className || ''}`}
                      >
                        {column.render ? column.render(item, index) : item[column.key]}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination?.enabled && totalPages > 1 && (
        <div className="mt-6 px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">
                Mostrando{' '}
                <span className="font-semibold text-slate-800">{startIndex}</span>
                {' a '}
                <span className="font-semibold text-slate-800">{endIndex}</span>
                {' de '}
                <span className="font-semibold text-slate-800">{data.length}</span> resultados
              </div>

              {pagination.showSizeOptions && (
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-slate-200/60 rounded-xl bg-white/80 text-slate-700 hover:bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300/60 transition-all duration-200"
                >
                  {(pagination.sizeOptions || [10, 25, 50, 100]).map((size) => (
                    <option key={size} value={size}>
                      {size} por página
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm border border-slate-200/60 rounded-xl text-slate-500 bg-white/80 hover:bg-slate-50/80 hover:border-slate-300/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Anterior
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber
                if (totalPages <= 5) {
                  pageNumber = i + 1
                } else if (currentPage <= 3) {
                  pageNumber = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i
                } else {
                  pageNumber = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 text-sm border rounded-xl transition-all duration-200 ${
                      pageNumber === currentPage
                        ? 'bg-slate-700 text-white border-slate-700 shadow-sm'
                        : 'text-slate-700 bg-white/80 border-slate-200/60 hover:bg-slate-50/80 hover:border-slate-300/60'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm border border-slate-200/60 rounded-xl text-slate-500 bg-white/80 hover:bg-slate-50/80 hover:border-slate-300/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable