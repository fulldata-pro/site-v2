'use client'

import React from 'react'
import { ReportResponse } from '@/services/reportService'
import { PeopleData } from '@/lib/types/people_types'
import ReportSummary from './sections/ReportSummary'
import AddressSection from './sections/AddressSection'
import ContactSection from './sections/ContactSection'
import LaborSection from './sections/LaborSection'
import TaxSection from './sections/TaxSection'
import FinancialSection from './sections/FinancialSection'
import PersonalPropertySection from './sections/PersonalPropertySection'
import OfficialBulletinSection from './sections/OfficialBulletinSection'
import BondsSection from './sections/BondsSection'
import AdditionalDataSection from './sections/AdditionalDataSection'
import { AlertCircle } from 'lucide-react'

interface PeopleReportViewProps {
  reportData: ReportResponse
  peopleData: PeopleData
  activeSection: string
  onSectionChange?: (section: string) => void
}

export default function PeopleReportView({ 
  reportData,
  peopleData,
  activeSection,
  onSectionChange 
}: PeopleReportViewProps) {

  const renderContent = () => {
    if (!peopleData) return null

    switch (activeSection) {
      case 'resumen':
        return (
          <ReportSummary
            summary={peopleData.summary}
            scoreHistory={peopleData.summary?.score || []}
          />
        )

      case 'direcciones':
        return (
          <div className="space-y-8">
            <AddressSection
              addresses={(peopleData.addressData || []).filter((addr: any) => addr.type === 'TAX')}
              title="Domicilios Fiscales"
            />
            <AddressSection
              addresses={(peopleData.addressData || []).filter((addr: any) => addr.type === 'OTHER')}
              title="Otros Domicilios"
            />
          </div>
        )

      case 'contacto':
        return <ContactSection contactData={peopleData.contactData || { emails: [], phones: [] }} />

      case 'laborales':
        return <LaborSection laborData={peopleData.laborData || {
          activities: [],
          afipInscriptionWeeks: null,
          autonomus: null,
          laborSituation: [],
          aportHistory: null,
          employer: false,
          employerHistory: [],
          inSociety: false,
          retired: false,
          osCondition: null,
          osDate: null,
          osCode: null,
          osName: null,
          osRelationship: null,
          socialSecurity: null
        }} />

      case 'impuestos':
        return <TaxSection taxData={peopleData.taxes || {
          contributions: [],
          contributionsEmployer: [],
          gciaInscription: false,
          gciaInscriptionCondition: '',
          gciaInscriptionDate: 0,
          ivaInscription: false,
          ivaInscriptionCondition: '',
          ivaInscriptionDate: 0,
          history: [],
          autonomousDate: 0,
          autonomous: 0,
          autonomousAct: '',
          monotribute: {
            type: '',
            category: '',
            gcia: '',
            iva: '',
            inSociety: false,
            startDate: null,
            finishDate: null,
            code: null
          }
        }} />

      case 'financiera':
        return <FinancialSection financialData={peopleData.financialSituation || {
          veraz: null,
          operativeBanks: [],
          bcraInfo: [],
          bouncedChecks: [],
          bankDebtors: [],
          bankruptcy24m: null,
          banks: '',
          banksAmount: '',
          checks24m: null,
          lawsuits24m: null,
          monthlyComparison: null,
          nonPaid6m: '',
          nonPaid6mAmount: '',
          worstSituation: '',
          worstSituationPercentage: '',
          ansesBenefits: null,
          historicalDebt: []
        }} />

      case 'vinculos':
        return <BondsSection bondsData={peopleData.bonds || { main: [], others: [] }} />

      case 'bienes':
        return <PersonalPropertySection propertyData={peopleData.personalProperty || {
          buildings: [],
          cars: [],
          carsEmbargoes: [],
          registeredTrademarks: []
        }} />

      case 'boletin':
        return <OfficialBulletinSection bulletinData={peopleData.officialBulletin || {
          bulletin: [],
          embargoes: [],
          participationSocietal: [],
          trialsActor: [],
          trialsDefendant: []
        }} />

      case 'adicional':
        return (
          <AdditionalDataSection
            nicDomains={peopleData.nicDomains || []}
            isDuplicated={false}
            duplicatedList={[]}
            isBanked={peopleData.isBanked || false}
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

  return renderContent()
}