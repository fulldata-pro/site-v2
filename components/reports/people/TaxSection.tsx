import React from 'react'
import { TaxData } from '@/lib/types/people_types'
import { Calculator } from '@/components/icons/CalculatorIcon'
import { DocumentIcon } from '@/components/icons/Document-icon'
import { TimeIcon } from '@/components/icons/time-icon'
import { CheckCircleIcon } from '@/components/icons/check-circle-icon'
import { CrossCircleIcon } from '@/components/icons/cross-circle-icon'

interface TaxSectionProps {
  taxData: TaxData
}

export default function TaxSection({ taxData }: TaxSectionProps) {
  const formatDate = (timestamp: number | { $numberLong: string } | null) => {
    if (!timestamp) return 'N/A'

    let date: Date
    if (typeof timestamp === 'object' && '$numberLong' in timestamp) {
      date = new Date(parseInt(timestamp.$numberLong))
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp)
    } else {
      return 'N/A'
    }

    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTaxId = (taxId: number | { $numberLong: string }) => {
    if (typeof taxId === 'object' && '$numberLong' in taxId) {
      return taxId.$numberLong
    }
    return String(taxId)
  }

  return (
    <div className="space-y-8">
      {/* Monotributo */}
      {taxData.monotribute && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Monotributo
          </h3>
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Calculator className="text-xl text-blue-600 mt-0.5" />
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Tipo</label>
                    <p className="text-gray-900 font-medium">{taxData.monotribute.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Categoría</label>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {taxData.monotribute.category}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">GCIA</label>
                    <div className="flex items-center gap-2">
                      {taxData.monotribute.gcia === 'No' ? (
                        <CrossCircleIcon className="text-base text-red-500" />
                      ) : (
                        <CheckCircleIcon className="text-base text-green-500" />
                      )}
                      <span className="text-gray-900 font-medium">{taxData.monotribute.gcia}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">IVA</label>
                    <div className="flex items-center gap-2">
                      {taxData.monotribute.iva === 'No' ? (
                        <CrossCircleIcon className="text-base text-red-500" />
                      ) : (
                        <CheckCircleIcon className="text-base text-green-500" />
                      )}
                      <span className="text-gray-900 font-medium">{taxData.monotribute.iva}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">En Sociedad</label>
                    <div className="flex items-center gap-2">
                      {taxData.monotribute.inSociety ? (
                        <CheckCircleIcon className="text-base text-green-500" />
                      ) : (
                        <CrossCircleIcon className="text-base text-red-500" />
                      )}
                      <span className="text-gray-900 font-medium">
                        {taxData.monotribute.inSociety ? 'Sí' : 'No'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Fecha de inicio</label>
                    <div className="flex items-center gap-2">
                      <TimeIcon className="text-base text-gray-400" />
                      <span className="text-gray-900 font-medium">
                        {formatDate(taxData.monotribute.startDate || 0)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Fecha de fin</label>
                    <div className="flex items-center gap-2">
                      <TimeIcon className="text-base text-gray-400" />
                      <span className="text-gray-900 font-medium">
                        {taxData.monotribute.finishDate ? formatDate(taxData.monotribute.finishDate) : 'Activo'}
                      </span>
                    </div>
                  </div>
                  {taxData.monotribute.code && (
                    <div>
                      <label className="text-sm text-gray-500">Código</label>
                      <p className="text-gray-900 font-medium">{taxData.monotribute.code}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inscripciones Tributarias */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Inscripciones Tributarias
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GCIA */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <DocumentIcon className="text-lg text-gray-600" />
              <h4 className="font-medium text-gray-900">Ganancias</h4>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-500">Inscrito</label>
                <div className="flex items-center gap-2">
                  {taxData.gciaInscription ? (
                    <CheckCircleIcon className="text-base text-green-500" />
                  ) : (
                    <CrossCircleIcon className="text-base text-red-500" />
                  )}
                  <span className="text-gray-900 font-medium">
                    {taxData.gciaInscription ? 'Sí' : 'No'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Condición</label>
                <p className="text-gray-900 font-medium">{taxData.gciaInscriptionCondition}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Fecha de inscripción</label>
                <p className="text-gray-900 font-medium">{formatDate(taxData.gciaInscriptionDate || 0)}</p>
              </div>
            </div>
          </div>

          {/* IVA */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <DocumentIcon className="text-lg text-gray-600" />
              <h4 className="font-medium text-gray-900">IVA</h4>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-500">Inscrito</label>
                <div className="flex items-center gap-2">
                  {taxData.ivaInscription ? (
                    <CheckCircleIcon className="text-base text-green-500" />
                  ) : (
                    <CrossCircleIcon className="text-base text-red-500" />
                  )}
                  <span className="text-gray-900 font-medium">
                    {taxData.ivaInscription ? 'Sí' : 'No'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Condición</label>
                <p className="text-gray-900 font-medium">{taxData.ivaInscriptionCondition}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Fecha de inscripción</label>
                <p className="text-gray-900 font-medium">{formatDate(taxData.ivaInscriptionDate || 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trabajo Autónomo */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Trabajo Autónomo
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-500">Valor</label>
              <p className="text-gray-900 font-medium">{taxData.autonomous || '0'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Fecha</label>
              <p className="text-gray-900 font-medium">{formatDate(taxData.autonomousDate || 0)}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Acta</label>
              <p className="text-gray-900 font-medium">{taxData.autonomousAct || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}