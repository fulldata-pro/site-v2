'use client'

import React from 'react'
import { Globe } from 'lucide-react'
import { CheckCircle, XCircle } from 'lucide-react'

interface CompanyAdditionalSectionProps {
  summary: any
}

export default function CompanyAdditionalSection({ summary }: CompanyAdditionalSectionProps) {
  
  return (
    <div className="space-y-8">
      {/* Estado de la Empresa */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Información Adicional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Bancarizada</label>
            <div className="flex items-center gap-2 mt-2">
              {summary?.isBanked ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Sí</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-medium">No</span>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Exportadora</label>
            <div className="flex items-center gap-2 mt-2">
              {summary?.isExporter ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Sí</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-medium">No</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Proveedor del Estado</label>
            <div className="flex items-center gap-2 mt-2">
              {summary?.stateSupplier === 'Si' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Sí</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-medium">No</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Estado</label>
            <div className="flex items-center gap-2 mt-2">
              {summary?.cessation ? (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-medium">Con cesación</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Activa</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dominios Web Registrados */}
      {summary?.webs && summary.webs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Dominios Web Registrados ({summary.webs.length})
          </h3>
          <div className="space-y-3">
            {summary.webs.map((web: any, idx: number) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <a 
                        href={`https://${web.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        {web.url}
                      </a>
                    </div>
                  </div>
                  <div>
                    {web.checked ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3" />
                        Verificado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <XCircle className="h-3 w-3" />
                        No Verificado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}