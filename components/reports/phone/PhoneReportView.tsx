'use client'

import React from 'react'
import { ReportResponse } from '@/services/reportService'
import { PhoneData as PhoneReportData } from '@/lib/types/phones_types'
import { Phone, User, MapPin, Building2 } from 'lucide-react'

interface PhoneReportViewProps {
  reportData: ReportResponse
  phoneData: PhoneReportData
  activeSection: string
  onSectionChange?: (section: string) => void
}

export default function PhoneReportView({ 
  reportData,
  phoneData,
  activeSection,
  onSectionChange 
}: PhoneReportViewProps) {

  // TODO: Implement phone report sections
  return (
    <div className="space-y-8">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-purple-50 rounded-2xl">
            <Phone className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Reporte de Teléfono</h2>
            <p className="text-slate-600">Información detallada del número telefónico</p>
          </div>
        </div>

        {/* Phone Summary */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Propietarios</h3>
              <p className="text-lg font-semibold text-slate-900">
                {phoneData.owners?.length || 0} encontrados
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Estado</h3>
              <p className="text-lg font-semibold text-slate-900">
                Activo
              </p>
            </div>
          </div>

          {/* Placeholder sections */}
          <div className="mt-8 p-8 bg-amber-50/30 border border-amber-200/50 rounded-2xl">
            <p className="text-amber-800 text-center">
              La visualización completa del reporte de teléfono está en desarrollo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}