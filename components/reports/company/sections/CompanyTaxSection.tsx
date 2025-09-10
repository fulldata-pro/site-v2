'use client'

import React from 'react'
import { FileCheck, AlertTriangle, CheckCircle, Calendar } from 'lucide-react'

interface CompanyTaxSectionProps {
  taxData: any
}

export default function CompanyTaxSection({ taxData }: CompanyTaxSectionProps) {
  const formatDate = (timestamp: number | string | null) => {
    if (!timestamp) return 'N/A'
    const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp
    return new Date(ts).toLocaleDateString('es-AR')
  }

  if (!taxData) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-red-50 rounded-2xl">
            <FileCheck className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Información Tributaria</h2>
            <p className="text-slate-600">No hay información tributaria disponible</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Información General Tributaria */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-red-50 rounded-2xl">
            <FileCheck className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Estado Tributario</h2>
            <p className="text-slate-600">Información de inscripciones y obligaciones fiscales</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Estado Ganancias</h3>
            <p className="text-lg font-semibold text-slate-900">{taxData.gcia || 'N/A'}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Inscripción Ganancias</h3>
            <p className="text-lg font-semibold text-slate-900">
              {formatDate(taxData.gciaInscriptionDate)}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Inscripción AFIP</h3>
            <p className="text-lg font-semibold text-slate-900">
              {formatDate(taxData.afipInscriptionDate)}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-600">Excluido Ganancias</h3>
              {taxData.gciaExcluded ? (
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              ) : (
                <CheckCircle className="h-6 w-6 text-green-500" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Aportes Jubilatorios */}
      {taxData.retirementContributions24m && taxData.retirementContributions24m.length > 0 && (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-2xl">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Aportes Jubilatorios</h2>
              <p className="text-slate-600">Historial de pagos de los últimos 24 meses</p>
            </div>
          </div>

          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
            {taxData.retirementContributions24m.map((contribution: any, index: number) => {
              const date = formatDate(contribution.period)
              const monthYear = date.substring(3, 8) // Extract MM/YY
              
              return (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg text-center transition-all hover:scale-105 cursor-pointer ${
                    contribution.payed 
                      ? 'bg-green-100 border border-green-300' 
                      : 'bg-red-100 border border-red-300'
                  }`}
                  title={date}
                >
                  <span className="text-xs font-medium">
                    {monthYear}
                  </span>
                  <div className="mt-1">
                    {contribution.payed ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-600 mx-auto" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-sm text-slate-600">Pagado</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-sm text-slate-600">Pendiente</span>
            </div>
          </div>
        </div>
      )}

      {/* Detalle de Impuestos */}
      {taxData.taxesDetail && taxData.taxesDetail.length > 0 && (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-purple-50 rounded-2xl">
              <FileCheck className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Detalle de Impuestos</h2>
              <p className="text-slate-600">Obligaciones tributarias registradas</p>
            </div>
          </div>

          <div className="space-y-3">
            {taxData.taxesDetail.map((tax: any, index: number) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-slate-50 rounded-xl border border-slate-200"
              >
                <span className="text-sm text-slate-700 flex-1">{tax.description}</span>
                <span className="text-sm font-semibold text-slate-900 ml-4">
                  {tax.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}