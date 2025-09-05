'use client'

import { useState, useEffect } from 'react'
import { 
  Shield, Download, FileText, MapPin, Phone,
  Briefcase, CreditCard, Home, Users, BookOpen, TrendingUp,
  ChevronRight, AlertCircle, Edit3, RefreshCw, Send, Trash2, Info
} from 'lucide-react'
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
  const [activeSection, setActiveSection] = useState('resumen')
  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)

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
    { id: 'resumen', label: 'Resumen', icon: FileText },
    { id: 'direcciones', label: 'Direcciones', icon: MapPin },
    { id: 'contacto', label: 'Datos de Contacto', icon: Phone },
    { id: 'laborales', label: 'Datos Laborales', icon: Briefcase },
    { id: 'impuestos', label: 'Impuestos', icon: CreditCard },
    { id: 'financiera', label: 'Situación Financiera', icon: TrendingUp },
    { id: 'vinculos', label: 'Vínculos', icon: Users },
    { id: 'bienes', label: 'Bienes Personales', icon: Home },
    { id: 'boletin', label: 'Boletín Oficial', icon: BookOpen },
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
            scoreHistory={reportData.people.summary.score}
          />
        )

      case 'direcciones':
        return (
          <div className="space-y-8">
            <AddressSection 
              addresses={reportData.people.addressData.filter((addr: any) => addr.type === 'TAX')} 
              title="Domicilios Fiscales" 
            />
            <AddressSection 
              addresses={reportData.people.addressData.filter((addr: any) => addr.type === 'OTHER')} 
              title="Otros Domicilios" 
            />
          </div>
        )

      case 'contacto':
        return <ContactSection contactData={reportData.people.contactData} />

      case 'laborales':
        return <LaborSection laborData={reportData.people.laborData} />

      case 'impuestos':
        return <TaxSection taxData={reportData.people.taxes} />

      case 'financiera':
        return <FinancialSection financialData={reportData.people.financialSituation} />

      case 'vinculos':
        return <BondsSection bondsData={reportData.people.bonds} />

      case 'bienes':
        return <PersonalPropertySection propertyData={reportData.people.personalProperty} />

      case 'boletin':
        return <OfficialBulletinSection bulletinData={reportData.people.officialBulletin} />

      case 'adicional':
        return (
          <AdditionalDataSection 
            nicDomains={reportData.people.nicDomains}
            isDuplicated={reportData.people.isDuplicated}
            duplicatedList={reportData.people.duplicatedList}
            isBanked={reportData.people.isBanked}
          />
        )

      default:
        return (
          <div className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">Sección en desarrollo</p>
            <p className="text-gray-400 text-sm mt-2">Esta información estará disponible próximamente</p>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reporte...</p>
        </div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
          <p className="text-gray-600">Error al cargar el reporte</p>
        </div>
      </div>
    )
  }

  const personData = reportData.people.summary
  const personName = `${personData.firstName} ${personData.lastName}`
  const initials = personData.firstName.charAt(0) + personData.lastName.charAt(0)
  
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Person Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white relative">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Action Buttons - Floating */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-3 z-10">
            {/* Actions Dropdown */}
            <div className="relative actions-dropdown">
              <button 
                onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                className="px-3 py-2 bg-white/20 text-white border border-white/30 rounded-lg hover:bg-white/30 transition-all backdrop-blur-sm flex items-center gap-2 text-sm"
              >
                <span>Acciones</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showActionsDropdown ? 'rotate-90' : 'rotate-0'}`} />
              </button>
              
              {showActionsDropdown && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <button
                    onClick={() => handleAction('edit')}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 text-sm"
                  >
                    <Edit3 className="w-4 h-4 text-gray-500" />
                    <span>Editar datos</span>
                  </button>
                  <button
                    onClick={() => handleAction('refresh')}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 text-sm"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-500" />
                    <span>Actualizar reporte</span>
                  </button>
                  <button
                    onClick={() => handleAction('webhook')}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 text-sm"
                  >
                    <Send className="w-4 h-4 text-gray-500" />
                    <span>Reenviar webhook</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => handleAction('delete')}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 text-sm"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                    <span>Eliminar reporte</span>
                  </button>
                </div>
              )}
            </div>
            
            <button className="px-3 py-2 bg-white text-red-600 rounded-lg hover:bg-white/90 transition-all backdrop-blur-sm flex items-center gap-2 text-sm font-medium shadow-sm">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pr-0 sm:pr-40">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white text-4xl font-bold backdrop-blur-sm">
              {initials}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-4xl font-bold mb-3">{personName}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-red-100 mb-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">DNI: {personData.nationalId}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">CUIT: {personData.taxId}</span>
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Datos verificados</span>
                </div>
              </div>
              {reportData.people.addressData.length > 0 && (
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-red-100">
                  <MapPin className="w-4 h-4" />
                  <span>{reportData.people.addressData[0].address} {reportData.people.addressData[0].addressNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="w-full py-6">
        <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Secciones del Reporte</h3>
              </div>
              <nav className="py-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
            
            {/* Completion Status - Subtle */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Completado el {formatDate(reportData.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = sections.find(s => s.id === activeSection)?.icon || FileText
                    return <Icon className="w-6 h-6 text-red-600" />
                  })()}
                  <h2 className="text-2xl font-bold text-gray-900">
                    {sections.find(s => s.id === activeSection)?.label}
                  </h2>
                </div>
              </div>
              <div className="p-4">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}