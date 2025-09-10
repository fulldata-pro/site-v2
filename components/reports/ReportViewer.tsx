'use client'

import React from 'react'
import { ReportResponse } from '@/services/reportService'
import PeopleReportView from './people/PeopleReportView'
import CompanyReportView from './company/CompanyReportView'
import VehicleReportView from './vehicle/VehicleReportView'
import PhoneReportView from './phone/PhoneReportView'
import BankReportView from './bank/BankReportView'
import { AlertCircle } from 'lucide-react'

interface ReportViewerProps {
  reportData: ReportResponse
  activeSection: string
  onSectionChange: (section: string) => void
}

export enum ReportType {
  PEOPLE = 'PEOPLE',
  COMPANY = 'COMPANY',
  COMPANIES = 'COMPANIES',
  VEHICLE = 'VEHICLE',
  VEHICLES = 'VEHICLES',
  PHONE = 'PHONE',
  PHONES = 'PHONES',
  BANK = 'BANK',
  BANKS = 'BANKS',
}

export default function ReportViewer({ 
  reportData, 
  activeSection, 
  onSectionChange 
}: ReportViewerProps) {
  
  // Determine report type from feature field
  const getReportType = (): ReportType | null => {
    const feature = reportData.feature?.toUpperCase()
    
    // Map feature to report type
    switch (feature) {
      case 'PEOPLE':
      case 'PERSON':
        return ReportType.PEOPLE
      case 'COMPANY':
      case 'COMPANIES':
        return ReportType.COMPANY
      case 'VEHICLE':
      case 'VEHICLES':
        return ReportType.VEHICLE
      case 'PHONE':
      case 'PHONES':
        return ReportType.PHONE
      case 'BANK':
      case 'BANKS':
        return ReportType.BANK
      default:
        return null
    }
  }

  const reportType = getReportType()

  // Render appropriate component based on report type
  switch (reportType) {
    case ReportType.PEOPLE:
      if (!reportData.people) {
        return <NoDataView type="personas" />
      }
      return (
        <PeopleReportView 
          reportData={reportData}
          peopleData={reportData.people}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      )

    case ReportType.COMPANY:
      if (!reportData.companies) {
        return <NoDataView type="empresa" />
      }
      return (
        <CompanyReportView 
          reportData={reportData}
          companyData={reportData.companies}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      )

    case ReportType.VEHICLE:
      if (!reportData.vehicle) {
        return <NoDataView type="vehículo" />
      }
      return (
        <VehicleReportView 
          reportData={reportData}
          vehicleData={reportData.vehicle}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      )

    case ReportType.PHONE:
      if (!reportData.phone) {
        return <NoDataView type="teléfono" />
      }
      return (
        <PhoneReportView 
          reportData={reportData}
          phoneData={reportData.phone}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      )

    case ReportType.BANK:
      if (!reportData.bank) {
        return <NoDataView type="banco" />
      }
      return (
        <BankReportView 
          reportData={reportData}
          bankData={reportData.bank}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      )

    default:
      return <UnsupportedReportView feature={reportData.feature} />
  }
}

// Component for when there's no data
function NoDataView({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-200/30 mb-8">
        <AlertCircle className="w-12 h-12 text-amber-600/80 mx-auto" />
      </div>
      <div className="text-center space-y-3">
        <p className="text-slate-700 font-semibold text-lg">
          No hay datos de {type}
        </p>
        <p className="text-slate-500/70">
          El reporte no contiene información de {type}
        </p>
      </div>
    </div>
  )
}

// Component for unsupported report types
function UnsupportedReportView({ feature }: { feature?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="p-6 bg-rose-50/60 rounded-2xl border border-rose-200/40 mb-8 inline-block">
        <AlertCircle className="w-12 h-12 text-rose-500/80 mx-auto" />
      </div>
      <div className="text-center space-y-4">
        <p className="text-slate-800 font-semibold text-lg">
          Tipo de reporte no soportado
        </p>
        <p className="text-slate-600/70">
          {feature ? `El tipo de reporte "${feature}" no está implementado aún` : 'Tipo de reporte desconocido'}
        </p>
      </div>
    </div>
  )
}