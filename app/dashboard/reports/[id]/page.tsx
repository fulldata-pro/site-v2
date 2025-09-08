'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { DocumentIcon } from '@/components/icons/Document-icon'
import { PinIcon } from '@/components/icons/Pin-icon'
import { PhoneIcon } from '@/components/icons/Phone-icon'
import { BriefcaseIcon } from '@/components/icons/Briefcase-icon'
import { HomeIcon } from '@/components/icons/Home-icon'
import { PeopleIcon } from '@/components/icons/People-icon'
import { BookOpenIcon } from '@/components/icons/BookOpen-icon'
import {
  Download, CreditCard, TrendingUp,
  AlertCircle, Edit3, Send, Trash2, Info,
  CheckCircle, Copy, ChevronDown
} from 'lucide-react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import ReportSummary from '@/components/reports/people/ReportSummary'
import AddressSection from '@/components/reports/people/AddressSection'
import ContactSection from '@/components/reports/people/ContactSection'
import LaborSection from '@/components/reports/people/LaborSection'
import TaxSection from '@/components/reports/people/TaxSection'
import FinancialSection from '@/components/reports/people/FinancialSection'
import PersonalPropertySection from '@/components/reports/people/PersonalPropertySection'
import OfficialBulletinSection from '@/components/reports/people/OfficialBulletinSection'
import BondsSection from '@/components/reports/people/BondsSection'
import AdditionalDataSection from '@/components/reports/people/AdditionalDataSection'

interface ReportSection {
  id: string
  label: string
  icon: React.ElementType
  active?: boolean
}

export default function ReportDetailPage() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('resumen')
  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)

  // Check if we're on a report page (matches sidebar logic)
  const isReportPage = pathname.includes('/dashboard/reports/')

  // Load mock data
  useEffect(() => {
    const loadMockData = async () => {
      try {
        const response = await fetch('/Requests.Reports.json')
        const data = await response.json()
        setReportData(data[0]) // Get first report from array
        setLoading(false)
      } catch (error) {
        console.error('Error loading mock data:', error)
        setLoading(false)
      }
    }

    loadMockData()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.actions-dropdown')) {
        setShowActionsDropdown(false)
      }
    }

    if (showActionsDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showActionsDropdown])

  const sections: ReportSection[] = [
    { id: 'resumen', label: 'Resumen', icon: DocumentIcon },
    { id: 'direcciones', label: 'Direcciones', icon: PinIcon },
    { id: 'contacto', label: 'Datos de Contacto', icon: PhoneIcon },
    { id: 'laborales', label: 'Datos Laborales', icon: BriefcaseIcon },
    { id: 'impuestos', label: 'Impuestos', icon: CreditCard },
    { id: 'financiera', label: 'Situación Financiera', icon: TrendingUp },
    { id: 'vinculos', label: 'Vínculos', icon: PeopleIcon },
    { id: 'bienes', label: 'Bienes Personales', icon: HomeIcon },
    { id: 'boletin', label: 'Boletín Oficial', icon: BookOpenIcon },
    { id: 'adicional', label: 'Información Adicional', icon: Info }
  ]


  const handleAction = (action: string) => {
    setShowActionsDropdown(false)

    switch (action) {
      case 'edit':
        alert('Función de editar datos - Por implementar')
        break
      case 'refresh':
        alert('Actualizando reporte...')
        break
      case 'webhook':
        alert('Reenviando webhook...')
        break
      case 'delete':
        if (confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
          alert('Eliminando reporte...')
        }
        break
    }
  }

  const renderContent = () => {
    if (!reportData) return null

    switch (activeSection) {
      case 'resumen':
        return (
          <ReportSummary
            summary={reportData.people.summary}
            scoreHistory={reportData.people.summary?.score || []}
          />
        )

      case 'direcciones':
        return (
          <div className="space-y-8">
            <AddressSection
              addresses={(reportData.people.addressData || []).filter((addr: any) => addr.type === 'TAX')}
              title="Domicilios Fiscales"
            />
            <AddressSection
              addresses={(reportData.people.addressData || []).filter((addr: any) => addr.type === 'OTHER')}
              title="Otros Domicilios"
            />
          </div>
        )

      case 'contacto':
        return <ContactSection contactData={reportData.people.contactData || []} />

      case 'laborales':
        return <LaborSection laborData={reportData.people.laborData || []} />

      case 'impuestos':
        return <TaxSection taxData={reportData.people.taxes || []} />

      case 'financiera':
        return <FinancialSection financialData={reportData.people.financialSituation || []} />

      case 'vinculos':
        return <BondsSection bondsData={reportData.people.bonds || []} />

      case 'bienes':
        return <PersonalPropertySection propertyData={reportData.people.personalProperty || []} />

      case 'boletin':
        return <OfficialBulletinSection bulletinData={reportData.people.officialBulletin || []} />

      case 'adicional':
        return (
          <AdditionalDataSection
            nicDomains={reportData.people.nicDomains || []}
            isDuplicated={reportData.people.isDuplicated || false}
            duplicatedList={reportData.people.duplicatedList || []}
            isBanked={reportData.people.isBanked || false}
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

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-50/30 to-stone-50/30 flex items-center justify-center ${isReportPage ? 'ml-16' : 'ml-64'}`}>
        <div className="text-center bg-white/95 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-lg shadow-slate-200/20">
          <div className="w-16 h-16 border-4 border-slate-200/40 rounded-full animate-spin border-t-slate-600/70 mx-auto mb-8"></div>
          <div className="space-y-3">
            <p className="text-slate-800 font-semibold text-lg">Cargando reporte</p>
            <p className="text-slate-600/70">Procesando información...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!reportData || !reportData.people || !reportData.people.summary) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-50/30 to-stone-50/30 flex items-center justify-center ${isReportPage ? 'ml-16' : 'ml-64'}`}>
        <div className="text-center bg-white/95 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-lg shadow-slate-200/20">
          <div className="p-6 bg-rose-50/60 rounded-2xl border border-rose-200/40 mb-8 inline-block">
            <AlertCircle className="w-12 h-12 text-rose-500/80 mx-auto" />
          </div>
          <div className="space-y-4">
            <p className="text-slate-800 font-semibold text-lg">Error al cargar el reporte</p>
            <p className="text-slate-600/70">Intenta recargar la página</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 bg-slate-700 text-white rounded-2xl font-medium hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const personData = reportData.people.summary
  const personName = `${personData.firstName || ''} ${personData.lastName || ''}`.trim()
  const initials = (personData.firstName?.charAt(0) || '') + (personData.lastName?.charAt(0) || '')

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50/30 to-stone-50/30 ${isReportPage ? 'ml-16' : 'ml-64'}`}>
      {/* Two-column layout */}
      <div className="flex gap-6 p-6 h-screen">
        {/* Left Sidebar - Profile + Navigation */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 h-[calc(100vh-48px)] flex flex-col">
            {/* Profile Section */}
            <div className="p-8 flex-shrink-0">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-medium text-lg">
                    {initials}
                  </div>
                </div>
                <h1 className="text-xl font-semibold text-slate-800 mb-1">{personName}</h1>
                <p className="text-sm text-slate-500">Verificación completada</p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50/60 rounded-2xl p-4">
                  <div className="text-xs text-slate-600 mb-2 font-medium">Fecha de nacimiento</div>
                  <div className="flex items-center text-slate-700">
                    <CalendarIcon className="w-4 h-4 mr-2 text-slate-500" />
                    <span className="text-sm">18 sep, 1989 (35 años)</span>
                  </div>
                </div>

                <div className="bg-slate-50/60 rounded-2xl p-4">
                  <div className="text-xs text-slate-600 mb-2 font-medium">Ubicación</div>
                  <div className="flex items-start text-slate-700">
                    <PinIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-500" />
                    <span className="text-sm leading-relaxed">{(reportData.people.addressData?.length > 0)
                      ? `${reportData.people.addressData[0]?.city || 'José C. Paz'}, ${reportData.people.addressData[0]?.province || 'Buenos Aires'}, Argentina`
                      : 'José C. Paz, Provincia de Buenos Aires, Argentina'}</span>
                  </div>
                </div>

                <div className="bg-slate-50/60 rounded-2xl p-4">
                  <div className="text-xs text-slate-600 mb-2 font-medium">Identificación</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-slate-800">{personData.taxId}</span>
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-all">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent mx-6"></div>

            {/* Navigation Section */}
            <div className="flex-1 p-6 pt-4 overflow-y-auto">
              <div className="text-xs text-slate-500 mb-4 font-medium tracking-wide uppercase">Sección del reporte</div>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 text-left group ${
                        isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-700 shadow-sm border border-blue-100'
                        : 'text-slate-600 hover:bg-slate-50/80 hover:text-slate-700 hover:shadow-sm'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-600'
                      }`} />
                      <span className="truncate">{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Content Area - Maximum Space */}
        <div className="flex-1 min-w-0">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 h-[calc(100vh-48px)] flex flex-col overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-white to-slate-50/30 px-8 py-6 border-b border-slate-100/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50/50 text-emerald-700 rounded-2xl border border-emerald-100/60">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-sm text-emerald-800">Verificado</div>
                      <div className="text-xs text-emerald-600/80">Controles completados</div>
                    </div>
                  </div>

                  <div className="text-sm text-slate-600">
                    <div className="font-semibold text-slate-700 mb-1">23 jul, 2025 19:38</div>
                    <div className="text-slate-500">Fecha de verificación</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-5 py-3 bg-white border border-slate-200/60 text-slate-600 rounded-2xl hover:bg-slate-50/50 hover:border-slate-300/80 hover:shadow-sm flex items-center gap-2 text-sm font-medium transition-all duration-300">
                    <Download className="w-4 h-4" />
                    <span>Descargar PDF</span>
                  </button>
                  <button className="px-5 py-3 bg-white border border-slate-200/60 text-slate-600 rounded-2xl hover:bg-slate-50/50 hover:border-slate-300/80 hover:shadow-sm flex items-center gap-2 text-sm font-medium transition-all duration-300">
                    <Info className="w-4 h-4" />
                    <span>Detalles</span>
                  </button>
                  <div className="relative actions-dropdown">
                    <button onClick={() => setShowActionsDropdown(!showActionsDropdown)} className="px-5 py-3 bg-white border border-slate-200/60 text-slate-600 rounded-2xl hover:bg-slate-50/50 hover:border-slate-300/80 hover:shadow-sm flex items-center gap-2 text-sm font-medium transition-all duration-300">
                      <ChevronDown className="w-4 h-4" />
                      <span>Acciones</span>
                    </button>
                    {showActionsDropdown && (
                      <div className="absolute top-full mt-3 right-0 w-48 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/40 py-2 z-50">
                        <button
                          onClick={() => handleAction('edit')}
                          className="w-full px-4 py-3 text-left text-slate-700 hover:bg-slate-50/80 flex items-center gap-3 text-sm transition-all duration-200 rounded-xl mx-2"
                        >
                          <Edit3 className="w-4 h-4 text-slate-500" />
                          <span>Editar datos</span>
                        </button>
                        <button
                          onClick={() => handleAction('webhook')}
                          className="w-full px-4 py-3 text-left text-slate-700 hover:bg-slate-50/80 flex items-center gap-3 text-sm transition-all duration-200 rounded-xl mx-2"
                        >
                          <Send className="w-4 h-4 text-slate-500" />
                          <span>Reenviar webhook</span>
                        </button>
                        <div className="h-px bg-slate-200/60 my-2 mx-4"></div>
                        <button
                          onClick={() => handleAction('delete')}
                          className="w-full px-4 py-3 text-left text-rose-600 hover:bg-rose-50/70 flex items-center gap-3 text-sm transition-all duration-200 rounded-xl mx-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Eliminar reporte</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-white to-slate-50/20">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}