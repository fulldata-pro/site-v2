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
  Shield, Download, CreditCard, TrendingUp,
  AlertCircle, Edit3, Send, Trash2, Info,
  CheckCircle
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

  const formatDate = (timestamp: number | { $numberLong: string } | { $date: string }) => {
    let date: Date

    if (typeof timestamp === 'object') {
      if ('$numberLong' in timestamp) {
        date = new Date(parseInt(timestamp.$numberLong))
      } else if ('$date' in timestamp) {
        date = new Date(timestamp.$date)
      } else {
        return 'N/A'
      }
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp)
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp)
    } else {
      return 'N/A'
    }

    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

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
          <div className="flex flex-col items-center justify-center py-16">
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/40 mb-4">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-zinc-700 font-semibold">Sección en desarrollo</p>
              <p className="text-zinc-500 text-sm">Esta información estará disponible próximamente</p>
            </div>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-50 to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-zinc-200 rounded-full animate-spin border-t-zinc-900 mx-auto mb-5"></div>
            <div className="absolute inset-0 w-12 h-12 border-3 border-transparent rounded-full animate-ping border-t-indigo-500 mx-auto opacity-20"></div>
          </div>
          <div className="space-y-1">
            <p className="text-zinc-700 font-semibold text-sm">Cargando reporte</p>
            <p className="text-sm text-zinc-500">Procesando información...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!reportData || !reportData.people || !reportData.people.summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-50 to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200/40 mb-4 inline-block">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          </div>
          <div className="space-y-1">
            <p className="text-zinc-700 font-semibold text-sm">Error al cargar el reporte</p>
            <p className="text-sm text-zinc-500">Intenta recargar la página</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-5 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
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
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 transition-all duration-500 ease-in-out ${isReportPage ? 'ml-24' : 'ml-64'}`}>
      {/* Full Height Layout with Left Sticky Card */}
      <div className="flex h-screen overflow-hidden">
        {/* Optimized Full Height Sticky Left Card */}
        <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-hidden flex flex-col shadow-lg">
          {/* Compact Profile Header */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-3 py-4 text-center flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2 backdrop-blur-sm border border-white/20 shadow-xl transform transition-all duration-300 hover:scale-105">
                {initials}
              </div>
              <h2 className="text-white font-semibold text-sm truncate px-1 transition-all duration-300 hover:text-blue-100">{personName}</h2>
              <p className="text-blue-100 text-xs mt-0.5 truncate px-1 opacity-90">{personData.taxId}</p>
            </div>
          </div>

          {/* Compact Profile Details */}
          <div className="px-3 py-3 space-y-3 flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="group">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Edad</div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg transition-all duration-300 hover:bg-blue-50/50 group-hover:shadow-sm">
                  <div className="p-1 bg-blue-50 rounded-md flex-shrink-0 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
                    <CalendarIcon className="w-3 h-3 text-blue-600 transition-colors duration-300 group-hover:text-blue-700" />
                  </div>
                  <span className="text-gray-900 font-medium text-xs truncate transition-colors duration-300 group-hover:text-gray-800">35 años</span>
                </div>
              </div>
              
              <div className="group">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Estado</div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg transition-all duration-300 hover:bg-emerald-50/50 group-hover:shadow-sm">
                  <div className="p-1 bg-emerald-50 rounded-md flex-shrink-0 transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-110">
                    <CheckCircle className="w-3 h-3 text-emerald-600 transition-colors duration-300 group-hover:text-emerald-700" />
                  </div>
                  <span className="text-gray-900 font-medium text-xs truncate transition-colors duration-300 group-hover:text-gray-800">Activo</span>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Ubicación</div>
              <div className="flex items-start gap-1.5 p-1.5 rounded-lg transition-all duration-300 hover:bg-green-50/50 group-hover:shadow-sm">
                <div className="p-1 bg-green-50 rounded-md flex-shrink-0 transition-all duration-300 group-hover:bg-green-100 group-hover:scale-110">
                  <PinIcon className="w-3 h-3 text-green-600 transition-colors duration-300 group-hover:text-green-700" />
                </div>
                <div className="text-gray-900 font-medium text-xs leading-tight min-w-0 break-words transition-colors duration-300 group-hover:text-gray-800">
                  {(reportData.people.addressData?.length > 0) ? (
                    <>
                      {reportData.people.addressData[0]?.city || 'José C. Paz'}<br />
                      <span className="text-gray-600">{reportData.people.addressData[0]?.province || 'Buenos Aires'}</span>
                    </>
                  ) : (
                    'José C. Paz, Buenos Aires'
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Optimized Sections Navigation */}
          <div className="border-t border-gray-200 flex-1 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">Secciones</div>
              <nav className="space-y-0.5">
                {sections.map((section, index) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      style={{ animationDelay: `${index * 30}ms` }}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transform transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        } animate-in slide-in-from-left-4 fade-in`}
                    >
                      <Icon className={`w-3 h-3 flex-shrink-0 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-gray-400 group-hover:scale-105'}`} />
                      <span className="truncate transition-all duration-300 text-xs">{section.label}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full ml-auto animate-pulse"></div>
                      )}
                    </button>
                  )
                })}
              </nav>
              
              {/* Quick Stats */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">Resumen</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100/50">
                    <div className="text-xs text-blue-600 font-semibold">Riesgo</div>
                    <div className="text-xs text-blue-800 font-bold mt-0.5">Bajo</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-2 border border-emerald-100/50">
                    <div className="text-xs text-emerald-600 font-semibold">Score</div>
                    <div className="text-xs text-emerald-800 font-bold mt-0.5">8.2/10</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-2 border border-orange-100/50">
                    <div className="text-xs text-orange-600 font-semibold">Datos</div>
                    <div className="text-xs text-orange-800 font-bold mt-0.5">12 fuentes</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-100/50">
                    <div className="text-xs text-purple-600 font-semibold">Última Act.</div>
                    <div className="text-xs text-purple-800 font-bold mt-0.5">2 días</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Action Bar Header */}
          <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-4 py-3 flex-shrink-0 shadow-sm">
            <div className="flex items-center justify-between w-full min-w-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 animate-pulse" />
                  <div className="text-sm">
                    <div className="font-semibold">Verificado</div>
                  </div>
                </div>
                <div className="text-sm text-slate-600 min-w-0 transition-all duration-300 hover:text-slate-800">
                  <div className="font-medium truncate">{formatDate(reportData.updatedAt)}</div>
                  <div className="text-slate-400 text-sm">Fecha verificación</div>
                </div>
                <div className="text-sm text-slate-600 min-w-0 transition-all duration-300 hover:text-slate-800">
                  <div className="font-mono font-medium truncate">{reportData._id?.slice(-12) || 'N/A'}</div>
                  <div className="text-slate-400 text-sm">Número verificación</div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-sm">
                  <Download className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-12" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-sm">
                  <Info className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-12" />
                  <span className="hidden sm:inline">Info</span>
                </button>
                <div className="relative actions-dropdown">
                  <button
                    onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                    className="px-3 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-12" />
                    <span className="hidden sm:inline">Borrar</span>
                  </button>

                  {showActionsDropdown && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() => handleAction('edit')}
                        className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm transition-all duration-200 hover:scale-[1.02] hover:translate-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-gray-500 transition-colors duration-200 hover:text-blue-600" />
                        <span>Editar datos</span>
                      </button>
                      <button
                        onClick={() => handleAction('webhook')}
                        className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm transition-all duration-200 hover:scale-[1.02] hover:translate-x-1"
                      >
                        <Send className="w-3.5 h-3.5 text-gray-500 transition-colors duration-200 hover:text-green-600" />
                        <span>Reenviar webhook</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white overflow-y-auto min-w-0">
            <div className="p-6 max-w-none">
              <div className="transition-all duration-500 ease-in-out min-w-0 animate-in fade-in slide-in-from-right-4">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}