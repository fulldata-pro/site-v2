'use client'

import React from 'react'
import { ReportResponse } from '@/services/reportService'
import { VehicleData } from '@/lib/types/vehicles_types'
import { Car, FileText, User, CreditCard, AlertTriangle } from 'lucide-react'

interface VehicleReportViewProps {
  reportData: ReportResponse
  vehicleData: VehicleData
  activeSection: string
  onSectionChange?: (section: string) => void
}

export default function VehicleReportView({ 
  reportData,
  vehicleData,
  activeSection,
  onSectionChange 
}: VehicleReportViewProps) {

  // TODO: Implement vehicle report sections
  return (
    <div className="space-y-8">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-green-50 rounded-2xl">
            <Car className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Reporte de Vehículo</h2>
            <p className="text-slate-600">Información detallada del vehículo</p>
          </div>
        </div>

        {/* Vehicle Summary */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Patente</h3>
              <p className="text-lg font-semibold text-slate-900">
                {vehicleData.summary?.licensePlate || 'No disponible'}
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h3 className="text-sm font-medium text-slate-600 mb-2">Marca y Modelo</h3>
              <p className="text-lg font-semibold text-slate-900">
                {vehicleData.summary?.brand} {vehicleData.summary?.model || 'No disponible'}
              </p>
            </div>
          </div>

          {/* Placeholder sections */}
          <div className="mt-8 p-8 bg-amber-50/30 border border-amber-200/50 rounded-2xl">
            <p className="text-amber-800 text-center">
              La visualización completa del reporte de vehículo está en desarrollo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}