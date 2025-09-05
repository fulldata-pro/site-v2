'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon, PrinterIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

export default function ReportPage() {
  const params = useParams()
  const router = useRouter()
  const reportId = params.id as string

  // Mock data para demostración
  const mockReport = {
    id: reportId,
    type: 'people',
    createdAt: new Date(),
    searchQuery: 'email:juan.perez@email.com',
    data: {
      summary: {
        fullName: 'Juan Carlos Pérez',
        documentNumber: '20-12345678-9',
        email: 'juan.perez@email.com',
        age: 45,
        nationality: 'Argentina'
      },
      contact: {
        phones: ['+54 11 1234-5678', '+54 11 8765-4321'],
        addresses: ['Av. Corrientes 1234, CABA', 'Av. Santa Fe 5678, CABA'],
        emails: ['juan.perez@email.com', 'jcperez@trabajo.com']
      },
      financial: {
        creditScore: 750,
        activeBanks: ['Banco Nación', 'Banco Santander'],
        creditCards: 3,
        loans: 1
      },
      labor: {
        currentEmployer: 'Tech Solutions SA',
        position: 'Gerente de IT',
        startDate: '2020-03-15',
        salary: 'Confidencial'
      },
      legal: {
        criminalRecord: false,
        activeJudgments: 0,
        pendingCases: 0
      },
      property: {
        realEstate: 2,
        vehicles: 1,
        otherAssets: ['Embarcación']
      }
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    // Aquí iría la lógica para exportar el reporte
    alert('Exportando reporte...')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reporte de Búsqueda</h1>
              <p className="text-gray-600 mt-1">ID: {reportId}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <PrinterIcon className="w-5 h-5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 btn-primary"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="space-y-6">
          {/* Summary Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nombre Completo</p>
                <p className="font-medium">{mockReport.data.summary.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CUIT/CUIL</p>
                <p className="font-medium">{mockReport.data.summary.documentNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{mockReport.data.summary.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Edad</p>
                <p className="font-medium">{mockReport.data.summary.age} años</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nacionalidad</p>
                <p className="font-medium">{mockReport.data.summary.nationality}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Teléfonos</p>
                {mockReport.data.contact.phones.map((phone, idx) => (
                  <p key={idx} className="font-medium">{phone}</p>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Direcciones</p>
                {mockReport.data.contact.addresses.map((address, idx) => (
                  <p key={idx} className="font-medium">{address}</p>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Emails</p>
                {mockReport.data.contact.emails.map((email, idx) => (
                  <p key={idx} className="font-medium">{email}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Financiera</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Score Crediticio</p>
                <p className="font-medium text-2xl text-green-600">{mockReport.data.financial.creditScore}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bancos Activos</p>
                <p className="font-medium">{mockReport.data.financial.activeBanks.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tarjetas de Crédito</p>
                <p className="font-medium">{mockReport.data.financial.creditCards}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Préstamos Activos</p>
                <p className="font-medium">{mockReport.data.financial.loans}</p>
              </div>
            </div>
          </div>

          {/* Labor Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Laboral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Empleador Actual</p>
                <p className="font-medium">{mockReport.data.labor.currentEmployer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cargo</p>
                <p className="font-medium">{mockReport.data.labor.position}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha de Inicio</p>
                <p className="font-medium">{mockReport.data.labor.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Salario</p>
                <p className="font-medium">{mockReport.data.labor.salary}</p>
              </div>
            </div>
          </div>

          {/* Legal Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Legal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Antecedentes Penales</p>
                <p className="font-medium">
                  <span className={mockReport.data.legal.criminalRecord ? 'text-red-600' : 'text-green-600'}>
                    {mockReport.data.legal.criminalRecord ? 'Sí' : 'No'}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Juicios Activos</p>
                <p className="font-medium">{mockReport.data.legal.activeJudgments}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Casos Pendientes</p>
                <p className="font-medium">{mockReport.data.legal.pendingCases}</p>
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Propiedades y Activos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Propiedades Inmuebles</p>
                <p className="font-medium">{mockReport.data.property.realEstate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehículos</p>
                <p className="font-medium">{mockReport.data.property.vehicles}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Otros Activos</p>
                <p className="font-medium">{mockReport.data.property.otherAssets.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}