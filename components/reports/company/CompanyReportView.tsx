'use client'

import React from 'react'
import { ReportResponse } from '@/services/reportService'
import { CompaniesData } from '@/lib/types/companies_types'
import CompanySummary from './sections/CompanySummary'
import CompanyAddressSection from './sections/CompanyAddressSection'
import CompanyContactSection from './sections/CompanyContactSection'
import CompanyFinancialSection from './sections/CompanyFinancialSection'
import CompanyTaxSection from './sections/CompanyTaxSection'
import CompanyAdditionalSection from './sections/CompanyAdditionalSection'
import { AlertCircle } from 'lucide-react'

interface CompanyReportViewProps {
  reportData: ReportResponse
  companyData: CompaniesData
  activeSection: string
  onSectionChange?: (section: string) => void
}

export default function CompanyReportView({ 
  reportData,
  companyData,
  activeSection,
  onSectionChange 
}: CompanyReportViewProps) {

  const renderContent = () => {
    if (!companyData) return null

    switch (activeSection) {
      case 'resumen':
        return (
          <CompanySummary
            summary={companyData.summary}
            scoreHistory={companyData.summary?.score || []}
          />
        )

      case 'direcciones':
        return (
          <CompanyAddressSection
            addresses={companyData.addressData || []}
          />
        )

      case 'contacto':
        return (
          <CompanyContactSection
            contactData={companyData.contactData || { email: [], phones: [] }}
          />
        )

      case 'fiscal':
      case 'impuestos':
        return (
          <CompanyTaxSection
            taxData={companyData.taxes}
          />
        )
      
      case 'financiero':
      case 'financiera':
        return (
          <CompanyFinancialSection
            financialData={companyData.financialSituation}
          />
        )
      
      case 'socios':
        // TODO: Implementar sección de socios
        return (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-200/30 mb-8">
              <AlertCircle className="w-12 h-12 text-amber-600/80 mx-auto" />
            </div>
            <div className="text-center space-y-3">
              <p className="text-slate-700 font-semibold text-lg">Sección en desarrollo</p>
              <p className="text-slate-500/70">Esta información estará disponible próximamente</p>
            </div>
          </div>
        )
      
      case 'actividades':
        // TODO: Implementar sección de actividades
        return (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-200/30 mb-8">
              <AlertCircle className="w-12 h-12 text-amber-600/80 mx-auto" />
            </div>
            <div className="text-center space-y-3">
              <p className="text-slate-700 font-semibold text-lg">Sección en desarrollo</p>
              <p className="text-slate-500/70">Esta información estará disponible próximamente</p>
            </div>
          </div>
        )
      
      case 'adicional':
        return (
          <CompanyAdditionalSection
            summary={companyData.summary}
          />
        )

      default:
        return (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-200/30 mb-8">
              <AlertCircle className="w-12 h-12 text-amber-600/80 mx-auto" />
            </div>
            <div className="text-center space-y-3">
              <p className="text-slate-700 font-semibold text-lg">Sección en desarrollo</p>
              <p className="text-slate-500/70">Esta información estará disponible próximamente</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-8">
      {renderContent()}
    </div>
  )
}