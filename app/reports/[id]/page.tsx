'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, Shield, Download, FileText, MapPin, Phone, Mail, 
  Briefcase, CreditCard, Home, Users, BookOpen, TrendingUp,
  ChevronRight, User, Calendar, Globe, AlertCircle, Star
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface ReportSection {
  id: string
  label: string
  icon: React.ElementType
  active?: boolean
}

export default function ReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const reportId = params.id as string
  const [activeSection, setActiveSection] = useState('resumen')

  // Mock data based on the screenshots
  const reportData = {
    id: reportId,
    completedDate: '31 de julio de 2025',
    person: {
      firstName: 'PATRICIO JOSE',
      lastName: 'FARA AYUP',
      dni: '37657175',
      exemplar: 'A',
      cuit: '20376571751',
      age: 31,
      nationality: 'N/A',
      gender: 'M',
      birthDate: null,
      deathDate: null,
      maritalStatus: 'N/A',
      score: 568,
      socioeconomicLevel: 'C2',
      isProtected: true,
      address: 'ALVEAR MARCELO T DE 1906, Dept -0, CP: 1122, capital federal, Capital Federal'
    },
    scoreHistory: [
      { period: 'Hace 24 meses', score: 380 },
      { period: 'Hace 18 meses', score: 315 },
      { period: 'Hace 12 meses', score: 495 },
      { period: 'Hace 9 meses', score: 580 },
      { period: 'Hace 6 meses', score: 590 },
      { period: 'Hace 3 meses', score: 595 },
      { period: 'Actual', score: 568 }
    ],
    addresses: {
      fiscal: [
        {
          address: 'ALVEAR MARCELO T DE 1906',
          phone: '-',
          country: '-',
          province: 'Capital Federal',
          city: 'CAPITAL FEDERAL',
          floor: '-',
          apartment: '0',
          zipCode: '1122'
        }
      ],
      other: [
        {
          address: 'ARRIBEÑOS 3800',
          phone: '-',
          country: '-',
          province: 'Capital Federal',
          city: 'CAPITAL FEDERAL',
          floor: '3',
          apartment: 'A',
          zipCode: '1429'
        },
        {
          address: 'PARAGUAY 3098',
          phone: '-',
          country: '-',
          province: 'Tucumán',
          city: 'S M DE TUCUMAN',
          floor: '-',
          apartment: '-',
          zipCode: '0'
        }
      ]
    },
    contact: {
      phones: ['4343958'],
      emails: [],
      whatsapp: false
    },
    labor: {
      status: 'MONOTRIBUTO',
      afipSince: '21 de octubre de 2022'
    }
  }

  const sections: ReportSection[] = [
    { id: 'resumen', label: 'Resumen', icon: FileText },
    { id: 'direcciones', label: 'Direcciones', icon: MapPin },
    { id: 'contacto', label: 'Datos de Contacto', icon: User },
    { id: 'laborales', label: 'Datos Laborales', icon: Briefcase },
    { id: 'impuestos', label: 'Impuestos', icon: CreditCard },
    { id: 'financiera', label: 'Situación Financiera', icon: TrendingUp },
    { id: 'vinculos', label: 'Vínculos', icon: Users },
    { id: 'bienes', label: 'Bienes Personales', icon: Home },
    { id: 'boletin', label: 'Boletín Oficial', icon: BookOpen },
    { id: 'relaciones', label: 'Relaciones', icon: Users }
  ]

  const getSocioeconomicLevelInfo = (level: string) => {
    const levels = {
      'A': { label: 'Ingresos elevados, educación universitaria, ocupaciones profesionales.', position: 0 },
      'B': { label: 'Clase media alta, ingresos sólidos, educación universitaria o técnica.', position: 1 },
      'C1': { label: 'Clase media, ingresos moderados, educación secundaria completa.', position: 2 },
      'C2': { label: 'Clase media baja, ingresos ajustados, educación secundaria completa.', position: 3 },
      'C3': { label: 'Clase media baja, ingresos ligeramente más bajos.', position: 4 },
      'D1': { label: 'Ingresos bajos, educación básica, ocupaciones manuales.', position: 5 },
      'D2': { label: 'Ingresos bajos, educación básica, ocupaciones manuales o de servicios.', position: 6 }
    }
    return levels[level as keyof typeof levels] || levels['C2']
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'resumen':
        return (
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
                Información Básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Nombre</label>
                  <p className="text-gray-900 font-medium">{reportData.person.firstName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Apellido</label>
                  <p className="text-gray-900 font-medium">{reportData.person.lastName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">DNI</label>
                  <p className="text-gray-900 font-medium">
                    {reportData.person.dni} 
                    <span className="text-sm text-gray-500 ml-2">[Ejemplar {reportData.person.exemplar}]</span>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">CUIT</label>
                  <p className="text-gray-900 font-medium">{reportData.person.cuit}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Edad</label>
                  <p className="text-gray-900 font-medium">{reportData.person.age} Años</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Estado Civil</label>
                  <p className="text-gray-500">{reportData.person.maritalStatus}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Nacionalidad</label>
                  <p className="text-gray-500">{reportData.person.nationality}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Sexo</label>
                  <p className="text-gray-900 font-medium">{reportData.person.gender}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Fecha de Nacimiento</label>
                  <p className="text-gray-500">{reportData.person.birthDate || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Fecha de Fallecimiento</label>
                  <p className="text-gray-500">{reportData.person.deathDate || 'N/A'}</p>
                </div>
              </div>

              {/* Score Circle */}
              <div className="mt-8 flex justify-center">
                <div className="relative">
                  <svg className="w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#ef4444"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(reportData.person.score / 850) * 553} 553`}
                      strokeLinecap="round"
                      transform="rotate(-90 96 96)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm text-gray-500">Score</span>
                    <span className="text-4xl font-bold text-gray-900">{reportData.person.score}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Score History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Score</h3>
              <p className="text-sm text-gray-500 mb-6">Evolución del puntaje crediticio en los últimos 24 meses</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportData.scoreHistory}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="period" 
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      domain={[250, 650]}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      fill="url(#scoreGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Socioeconomic Level */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nivel Socioeconómico</h3>
              <p className="text-sm text-gray-500 mb-6">Clasificación según ingresos y educación</p>
              
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-4xl font-bold bg-gray-800 text-white w-20 h-20 rounded-full flex items-center justify-center">
                    {reportData.person.socioeconomicLevel}
                  </div>
                </div>
                
                {/* Pyramid */}
                <div className="relative mx-auto" style={{ maxWidth: '400px' }}>
                  <svg viewBox="0 0 400 280" className="w-full">
                    {/* Pyramid layers */}
                    <polygon points="200,20 240,60 160,60" fill="#9ca3af" opacity="0.8" />
                    <polygon points="160,60 240,60 260,100 140,100" fill="#9ca3af" opacity="0.8" />
                    <polygon points="140,100 260,100 280,140 120,140" fill="#9ca3af" opacity="0.8" />
                    <polygon points="120,140 280,140 300,180 100,180" fill={reportData.person.socioeconomicLevel === 'C2' ? '#ef4444' : '#9ca3af'} opacity="0.8" />
                    <polygon points="100,180 300,180 320,220 80,220" fill="#6b7280" opacity="0.8" />
                    <polygon points="80,220 320,220 340,260 60,260" fill="#6b7280" opacity="0.8" />
                    <polygon points="60,260 340,260 360,300 40,300" fill="#374151" opacity="0.8" />
                    
                    {/* Labels */}
                    <text x="200" y="45" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">A</text>
                    <text x="200" y="85" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">B</text>
                    <text x="200" y="125" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">C1</text>
                    <text x="200" y="165" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">C2</text>
                    <text x="200" y="205" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">C3</text>
                    <text x="200" y="245" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">D1</text>
                    <text x="200" y="285" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">D2</text>
                    
                    {/* Person icon at C2 level */}
                    <circle cx="200" cy="160" r="12" fill="#ef4444" />
                    <text x="200" y="165" textAnchor="middle" fill="#fff" fontSize="16">👤</text>
                  </svg>
                </div>

                {/* Level descriptions */}
                <div className="mt-8 space-y-2">
                  {['A', 'B', 'C1', 'C2', 'C3', 'D1', 'D2'].map((level) => {
                    const info = getSocioeconomicLevelInfo(level)
                    return (
                      <div key={level} className={`flex items-start gap-3 p-2 rounded ${level === reportData.person.socioeconomicLevel ? 'bg-red-50' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${level === reportData.person.socioeconomicLevel ? 'bg-red-500' : 'bg-gray-400'}`} />
                        <p className={`text-sm ${level === reportData.person.socioeconomicLevel ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {info.label}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )

      case 'direcciones':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
                Domicilios Fiscales
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provincia</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Piso</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Postal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.addresses.fiscal.map((addr, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-blue-600">{addr.address}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{addr.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{addr.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.province}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{addr.floor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.apartment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.zipCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
                Otros Domicilios
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provincia</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Piso</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Postal</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.addresses.other.map((addr, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-blue-600">{addr.address}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{addr.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{addr.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.province}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.floor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.apartment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{addr.zipCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'contacto':
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Teléfonos ({reportData.contact.phones.length})</h3>
              </div>
              {reportData.contact.phones.map((phone, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">{phone}</span>
                  {!reportData.contact.whatsapp && (
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                      ⚠️ El número no tiene whatsapp.
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Emails ({reportData.contact.emails.length})</h3>
              </div>
              {reportData.contact.emails.length === 0 ? (
                <p className="text-gray-500">N/A</p>
              ) : (
                reportData.contact.emails.map((email, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-medium">{email}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )

      case 'laborales':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
                Información Básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Situación Laboral</label>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800">
                      {reportData.labor.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Inscripto en Afip desde</label>
                  <p className="text-gray-900 font-medium mt-1">{reportData.labor.afipSince}</p>
                </div>
              </div>
            </div>
          </div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.push('/searches')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a búsquedas</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <span>Acciones</span>
                <ChevronRight className="w-4 h-4 rotate-90" />
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Person Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                PA
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{reportData.person.firstName} {reportData.person.lastName}</h1>
                <div className="flex items-center gap-4 text-blue-100">
                  <span>Dni: {reportData.person.dni}</span>
                  <span>Cuit: {reportData.person.cuit}</span>
                  {reportData.person.isProtected && (
                    <div className="flex items-center gap-1 bg-blue-500/30 px-3 py-1 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Datos protegidos</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-blue-100">
                  <MapPin className="w-4 h-4" />
                  <span>{reportData.person.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      <div className="bg-green-50 border-y border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-green-700">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-medium">Completado el : {reportData.completedDate}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <nav className="py-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const Icon = sections.find(s => s.id === activeSection)?.icon || FileText
                  return <Icon className="w-6 h-6 text-blue-600" />
                })()}
                <h2 className="text-2xl font-bold text-gray-900">
                  {sections.find(s => s.id === activeSection)?.label}
                </h2>
              </div>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Button */}
      <button className="fixed bottom-8 right-8 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
        <Star className="w-5 h-5" />
        <span>Asistente IA</span>
      </button>
    </div>
  )
}