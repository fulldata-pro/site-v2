import React from 'react'
import { NicDomains } from '@/lib/types/people_types'
import { CheckCircleIcon } from '@/components/icons/check-circle-icon'
import { CrossCircleIcon } from '@/components/icons/cross-circle-icon'
import { DangerIcon } from '@/components/icons/danger-icon'
import { Globe, Copy } from 'lucide-react'

interface AdditionalDataSectionProps {
  nicDomains?: NicDomains[]
  isDuplicated?: boolean
  duplicatedList?: any[]
  isBanked?: boolean
}

export default function AdditionalDataSection({ 
  nicDomains, 
  isDuplicated, 
  duplicatedList,
  isBanked 
}: AdditionalDataSectionProps) {
  
  return (
    <div className="space-y-8">
      {/* Estado Bancario */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Información Adicional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Bancarizado</label>
            <div className="flex items-center gap-2 mt-2">
              {isBanked ? (
                <>
                  <CheckCircleIcon className="text-lg text-green-600" />
                  <span className="text-green-600 font-medium">Sí</span>
                </>
              ) : (
                <>
                  <CrossCircleIcon className="text-lg text-red-600" />
                  <span className="text-red-600 font-medium">No</span>
                </>
              )}
            </div>
          </div>
          
          {isDuplicated !== undefined && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Registro Duplicado</label>
              <div className="flex items-center gap-2 mt-2">
                {isDuplicated ? (
                  <>
                    <DangerIcon className="text-lg text-yellow-600" />
                    <span className="text-yellow-600 font-medium">Sí</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="text-lg text-green-600" />
                    <span className="text-green-600 font-medium">No</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dominios NIC */}
      {nicDomains && nicDomains.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Dominios Web Registrados ({nicDomains.length})
          </h3>
          <div className="space-y-3">
            {nicDomains.map((domain, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <a 
                        href={`https://${domain.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        {domain.url}
                      </a>
                    </div>
                  </div>
                  <div>
                    {domain.status === 'VERIFIED' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="text-xs" />
                        Verificado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <CrossCircleIcon className="text-xs" />
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

      {/* Lista de Duplicados */}
      {duplicatedList && duplicatedList.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-yellow-500 inline-block">
            Registros Duplicados Encontrados ({duplicatedList.length})
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Copy className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  Se encontraron {duplicatedList.length} registros duplicados para esta persona.
                </p>
                {duplicatedList.map((duplicate, idx) => (
                  <div key={idx} className="mt-3 p-3 bg-white rounded border border-yellow-100">
                    <pre className="text-xs text-gray-600 overflow-x-auto">
                      {JSON.stringify(duplicate, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}