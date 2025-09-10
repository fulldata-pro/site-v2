'use client'

import { useState, useEffect } from 'react'
import { usePathname, useParams } from 'next/navigation'
import reportService from '@/services/reportService'
import { formatBirthDateWithAge, formatDateTime } from '@/lib/utils/dateUtils'
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
  CheckCircle, Copy, ChevronDown, Building2, Car, Phone, Banknote
} from 'lucide-react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import ReportViewer, { ReportType } from '@/components/reports/ReportViewer'

interface ReportSection {
  id: string
  label: string
  icon: React.ElementType
  active?: boolean
}

export default function ReportDetailPage() {
  const pathname = usePathname()
  const params = useParams()
  const reportId = params.id as string
  const [activeSection, setActiveSection] = useState('resumen')
  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)

  // Check if we're on a report page (matches sidebar logic)
  const isReportPage = pathname.includes('/reports/')

  // Load report data from API
  useEffect(() => {
    const loadReportData = async () => {
      if (!reportId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // Fetch report data using the service
        const data = await reportService.getReport(reportId)
        setReportData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error loading report data:', error)
        // If API fails, it will automatically fallback to mock data
        setLoading(false)
      }
    }

    loadReportData()
  }, [reportId])

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

  // Get report type to determine sections
  const getReportType = (): ReportType | null => {
    if (!reportData) return null
    const feature = reportData.feature?.toUpperCase()
    
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

  // Define sections based on report type
  const getSections = (): ReportSection[] => {
    switch (reportType) {
      case ReportType.PEOPLE:
        return [
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
      case ReportType.COMPANY:
        return [
          { id: 'resumen', label: 'Resumen', icon: DocumentIcon },
          { id: 'fiscal', label: 'Información Fiscal', icon: CreditCard },
          { id: 'direcciones', label: 'Direcciones', icon: PinIcon },
          { id: 'socios', label: 'Socios', icon: PeopleIcon },
          { id: 'actividades', label: 'Actividades', icon: BriefcaseIcon },
          { id: 'adicional', label: 'Información Adicional', icon: Info }
        ]
      case ReportType.VEHICLE:
        return [
          { id: 'resumen', label: 'Resumen', icon: DocumentIcon },
          { id: 'titular', label: 'Titular', icon: PeopleIcon },
          { id: 'historial', label: 'Historial', icon: BookOpenIcon },
          { id: 'infracciones', label: 'Infracciones', icon: AlertCircle },
          { id: 'adicional', label: 'Información Adicional', icon: Info }
        ]
      case ReportType.PHONE:
        return [
          { id: 'resumen', label: 'Resumen', icon: DocumentIcon },
          { id: 'titular', label: 'Titular', icon: PeopleIcon },
          { id: 'ubicacion', label: 'Ubicación', icon: PinIcon },
          { id: 'adicional', label: 'Información Adicional', icon: Info }
        ]
      case ReportType.BANK:
        return [
          { id: 'resumen', label: 'Resumen', icon: DocumentIcon },
          { id: 'titular', label: 'Titular', icon: PeopleIcon },
          { id: 'movimientos', label: 'Movimientos', icon: TrendingUp },
          { id: 'adicional', label: 'Información Adicional', icon: Info }
        ]
      default:
        return [
          { id: 'resumen', label: 'Resumen', icon: DocumentIcon }
        ]
    }
  }

  const sections = getSections()


  const handleAction = async (action: string) => {
    setShowActionsDropdown(false)

    switch (action) {
      case 'edit':
        alert('Función de editar datos - Por implementar')
        break
      case 'refresh':
        try {
          setLoading(true)
          const data = await reportService.getReport(reportId)
          setReportData(data)
          setLoading(false)
          alert('Reporte actualizado correctamente')
        } catch (error) {
          console.error('Error updating report:', error)
          alert('Error al actualizar el reporte')
          setLoading(false)
        }
        break
      case 'webhook':
        try {
          const result = await reportService.resendWebhook(reportId)
          alert(result.message || 'Webhook reenviado correctamente')
        } catch (error) {
          console.error('Error resending webhook:', error)
          alert('Error al reenviar el webhook')
        }
        break
      case 'delete':
        if (confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
          try {
            await reportService.deleteReport(reportId)
            alert('Reporte eliminado correctamente')
            // Redirect to reports list or dashboard
            window.location.href = '/dashboard'
          } catch (error) {
            console.error('Error deleting report:', error)
            alert('Error al eliminar el reporte')
          }
        }
        break
      case 'download':
        try {
          const blob = await reportService.downloadReportPDF(reportId)
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.download = `report-${reportId}.pdf`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        } catch (error) {
          console.error('Error downloading PDF:', error)
          alert('Error al descargar el PDF')
        }
        break
    }
  }

  const renderContent = () => {
    if (!reportData) return null
    
    return (
      <ReportViewer 
        reportData={reportData}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    )
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

  if (!reportData) {
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

  // Get display data based on report type
  const getDisplayData = () => {
    switch (reportType) {
      case ReportType.PEOPLE:
        const personData = reportData.people?.summary
        return {
          name: `${personData?.firstName || ''} ${personData?.lastName || ''}`.trim(),
          initials: (personData?.firstName?.charAt(0) || '') + (personData?.lastName?.charAt(0) || ''),
          subtitle: 'Verificación completada',
          identifier: personData?.taxId || '',
          birthDate: personData?.birthDate,
          age: personData?.age,
          location: reportData.people?.addressData?.[0]
        }
      case ReportType.COMPANY:
        return {
          name: reportData.companies?.summary?.rz || 'Empresa',
          initials: reportData.companies?.summary?.rz?.substring(0, 2).toUpperCase() || 'EM',
          subtitle: 'Verificación de empresa',
          identifier: reportData.companies?.summary?.taxId || '',
          location: reportData.companies?.addressData?.[0]
        }
      case ReportType.VEHICLE:
        return {
          name: reportData.vehicle?.vehicleInformation?.licensePlate || 'Vehículo',
          initials: 'VH',
          subtitle: `${reportData.vehicle?.vehicleInformation?.brand || ''} ${reportData.vehicle?.vehicleInformation?.model || ''}`.trim(),
          identifier: reportData.vehicle?.vehicleInformation?.licensePlate || ''
        }
      case ReportType.PHONE:
        return {
          name: reportData.phone?.phoneNumber || 'Teléfono',
          initials: 'TL',
          subtitle: reportData.phone?.operator || 'Verificación telefónica',
          identifier: reportData.phone?.phoneNumber || ''
        }
      case ReportType.BANK:
        return {
          name: reportData.bank?.alias || reportData.bank?.cbu || 'Cuenta Bancaria',
          initials: 'CB',
          subtitle: 'Verificación bancaria',
          identifier: reportData.bank?.cbu || ''
        }
      default:
        return {
          name: 'Reporte',
          initials: 'RP',
          subtitle: 'Verificación',
          identifier: reportData._id || ''
        }
    }
  }

  const displayData = getDisplayData()

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
                    {displayData.initials}
                  </div>
                </div>
                <h1 className="text-xl font-semibold text-slate-800 mb-1">{displayData.name}</h1>
                <p className="text-sm text-slate-500">{displayData.subtitle}</p>
              </div>

              <div className="space-y-6">
                {displayData.birthDate && (
                  <div className="bg-slate-50/60 rounded-2xl p-4">
                    <div className="text-xs text-slate-600 mb-2 font-medium">Fecha de nacimiento</div>
                    <div className="flex items-center text-slate-700">
                      <CalendarIcon className="w-4 h-4 mr-2 text-slate-500" />
                      <span className="text-sm">
                        {formatBirthDateWithAge(displayData.birthDate, displayData.age)}
                      </span>
                    </div>
                  </div>
                )}

                {displayData.location && (
                  <div className="bg-slate-50/60 rounded-2xl p-4">
                    <div className="text-xs text-slate-600 mb-2 font-medium">Ubicación</div>
                    <div className="flex items-start text-slate-700">
                      <PinIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-500" />
                      <span className="text-sm leading-relaxed">
                        {`${displayData.location.city || ''}, ${displayData.location.province || ''}`}
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50/60 rounded-2xl p-4">
                  <div className="text-xs text-slate-600 mb-2 font-medium">Identificación</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-slate-800">{displayData.identifier}</span>
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
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 text-left group ${isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-700 shadow-sm border border-blue-100'
                        : 'text-slate-600 hover:bg-slate-50/80 hover:text-slate-700 hover:shadow-sm'
                        }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-600'
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
                    <div className="font-semibold text-slate-700 mb-1">
                      {formatDateTime(reportData.updatedAt)}
                    </div>
                    <div className="text-slate-500">Fecha de verificación</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleAction('download')}
                    className="px-5 py-3 bg-white border border-slate-200/60 text-slate-600 rounded-2xl hover:bg-slate-50/50 hover:border-slate-300/80 hover:shadow-sm flex items-center gap-2 text-sm font-medium transition-all duration-300">
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