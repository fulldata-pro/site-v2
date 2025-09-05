import React from 'react'
import { LaborData } from '@/lib/types/people_types'
import { Briefcase, Calendar, Building2, Users, Shield } from 'lucide-react'

interface LaborSectionProps {
  laborData: LaborData
}

export default function LaborSection({ laborData }: LaborSectionProps) {
  const formatDate = (timestamp: number | { $numberLong: string }) => {
    if (!timestamp) return 'N/A'
    
    let date: Date
    if (typeof timestamp === 'object' && '$numberLong' in timestamp) {
      date = new Date(parseInt(timestamp.$numberLong))
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp)
    } else {
      return 'N/A'
    }
    
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTaxId = (taxId: number | { $numberLong: string }) => {
    if (typeof taxId === 'object' && '$numberLong' in taxId) {
      return taxId.$numberLong
    }
    return String(taxId)
  }

  return (
    <div className="space-y-8">
      {/* Información Básica */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Información Laboral
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Situación Laboral</label>
            <div className="mt-2">
              {laborData.laborSituation?.map((situation, idx) => (
                <span key={idx} className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 mr-2">
                  {situation}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Semanas de inscripción AFIP</label>
            <p className="text-gray-900 font-medium mt-1">{laborData.afipInscriptionWeeks || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Historial de aportes</label>
            <p className="text-gray-900 font-medium mt-1">{laborData.aportHistory || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Es empleador</label>
            <div className="flex items-center gap-2 mt-1">
              {laborData.employer ? (
                <span className="text-green-600 font-medium">Sí</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">En sociedad</label>
            <div className="flex items-center gap-2 mt-1">
              {laborData.inSociety ? (
                <span className="text-green-600 font-medium">Sí</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Jubilado</label>
            <div className="flex items-center gap-2 mt-1">
              {laborData.retired ? (
                <span className="text-green-600 font-medium">Sí</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actividades */}
      {laborData.activities && laborData.activities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Actividades Económicas
          </h3>
          <div className="space-y-4">
            {laborData.activities.map((activity, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.description}</h4>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <label className="text-gray-500">Tipo:</label>
                        <p className="text-gray-900 font-medium">{activity.type || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Sector:</label>
                        <p className="text-gray-900 font-medium">{activity.sector || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Categoría:</label>
                        <p className="text-gray-900 font-medium">{activity.category || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha de inicio:</label>
                        <p className="text-gray-900 font-medium">{formatDate(activity.startDate || 0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historial de Empleadores */}
      {laborData.employerHistory && laborData.employerHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Historial de Empleadores ({laborData.employerHistory.length})
          </h3>
          <div className="space-y-4">
            {laborData.employerHistory.map((employer, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{employer.name}</h4>
                        {employer.employerActivity && (
                          <p className="text-sm text-gray-600 mt-1">{employer.employerActivity}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {employer.active !== undefined && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {employer.active ? 'Activo' : 'Inactivo'}
                          </span>
                        )}
                        {employer.salary && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            Salario: {employer.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {formatDate(employer.startDate)} - {formatDate(employer.finishDate)}
                        </span>
                      </div>
                      
                      {employer.employerData && (
                        <>
                          {employer.employerData.taxId && (
                            <div>
                              <span className="text-gray-500">CUIT:</span>
                              <span className="ml-2 text-gray-900 font-medium">
                                {formatTaxId(employer.employerData.taxId)}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {employer.employerData && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {employer.employerData.address && (
                            <div>
                              <span className="text-gray-500">Dirección:</span>
                              <span className="ml-2 text-gray-700">
                                {employer.employerData.address}
                              </span>
                            </div>
                          )}
                          {employer.employerData.city && (
                            <div>
                              <span className="text-gray-500">Ciudad:</span>
                              <span className="ml-2 text-gray-700">
                                {employer.employerData.city}, {employer.employerData.province}
                              </span>
                            </div>
                          )}
                          {employer.employerData.postalCode && (
                            <div>
                              <span className="text-gray-500">CP:</span>
                              <span className="ml-2 text-gray-700">
                                {employer.employerData.postalCode}
                              </span>
                            </div>
                          )}
                          {employer.employerData.employees !== undefined && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500">Empleados:</span>
                              <span className="ml-1 text-gray-900 font-medium">
                                {employer.employerData.employees}
                              </span>
                            </div>
                          )}
                          {employer.employerData.phone && (
                            <div>
                              <span className="text-gray-500">Teléfono:</span>
                              <span className="ml-2 text-gray-700">
                                {employer.employerData.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Obra Social */}
      {(laborData.osName || laborData.osCondition) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Obra Social
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{laborData.osName || 'N/A'}</h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-gray-500">Condición:</label>
                    <p className="text-gray-900 font-medium">{laborData.osCondition || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-gray-500">Relación:</label>
                    <p className="text-gray-900 font-medium">{laborData.osRelationship || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-gray-500">Fecha:</label>
                    <p className="text-gray-900 font-medium">{formatDate(laborData.osDate || 0)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}