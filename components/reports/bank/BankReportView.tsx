'use client'

import React from 'react'
import { ReportResponse } from '@/services/reportService'
import { Banknote, User, Building2, CreditCard } from 'lucide-react'

interface BankReportViewProps {
  reportData: ReportResponse
  bankData: any // TODO: Add proper bank data type when available
  activeSection: string
  onSectionChange?: (section: string) => void
}

export default function BankReportView({ 
  reportData,
  bankData,
  activeSection,
  onSectionChange 
}: BankReportViewProps) {

  // TODO: Implement bank report sections
  return (
    <div className="space-y-8">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-emerald-50 rounded-2xl">
            <Banknote className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Reporte Bancario</h2>
            <p className="text-slate-600">Información detallada de la cuenta bancaria</p>
          </div>
        </div>

        {/* Bank Summary */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h3 className="text-sm font-medium text-slate-600 mb-2">CBU</h3>
              <p className="text-lg font-semibold text-slate-900">
                {bankData?.cbu || 'No disponible'}
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Alias</h3>
              <p className="text-lg font-semibold text-slate-900">
                {bankData?.alias || 'No disponible'}
              </p>
            </div>
          </div>

          {/* Placeholder sections */}
          <div className="mt-8 p-8 bg-amber-50/30 border border-amber-200/50 rounded-2xl">
            <p className="text-amber-800 text-center">
              La visualización completa del reporte bancario está en desarrollo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}