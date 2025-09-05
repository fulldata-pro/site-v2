import React from 'react'
import { BondsData } from '@/lib/types/people_types'
import { Users, Heart, Calendar } from 'lucide-react'

interface BondsSectionProps {
  bondsData: BondsData
}

export default function BondsSection({ bondsData }: BondsSectionProps) {
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
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTaxId = (taxId: number | { $numberLong: string } | string) => {
    if (typeof taxId === 'object' && '$numberLong' in taxId) {
      return taxId.$numberLong
    }
    return String(taxId)
  }

  const getRelationshipIcon = (relation: string) => {
    const relationLower = relation.toLowerCase()
    if (relationLower.includes('conyugue') || relationLower.includes('esposo') || relationLower.includes('esposa')) {
      return Heart
    }
    return Users
  }

  const getRelationshipColor = (relation: string) => {
    const relationLower = relation.toLowerCase()
    if (relationLower.includes('conyugue') || relationLower.includes('esposo') || relationLower.includes('esposa')) {
      return 'text-pink-600 bg-pink-50 border-pink-200'
    }
    if (relationLower.includes('hijo') || relationLower.includes('hija')) {
      return 'text-blue-600 bg-blue-50 border-blue-200'
    }
    if (relationLower.includes('padre') || relationLower.includes('madre')) {
      return 'text-green-600 bg-green-50 border-green-200'
    }
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  const isEmpty = (
    (!bondsData.main || bondsData.main.length === 0) &&
    (!bondsData.others || bondsData.others.length === 0)
  )

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Users className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">Sin vínculos registrados</p>
        <p className="text-gray-400 text-sm mt-2">No se encontraron vínculos familiares o personales</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Vínculos Principales */}
      {bondsData.main && bondsData.main.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Vínculos Principales ({bondsData.main.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bondsData.main.map((bond, idx) => {
              const IconComponent = getRelationshipIcon(bond.relation)
              const colorClasses = getRelationshipColor(bond.relation)
              
              return (
                <div key={idx} className={`border p-4 rounded-lg ${colorClasses}`}>
                  <div className="flex items-start gap-3">
                    <IconComponent className="w-5 h-5 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{bond.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <label className="text-gray-500">DNI:</label>
                          <span className="ml-2 text-gray-900 font-medium">{formatTaxId(bond.taxId)}</span>
                        </div>
                        <div>
                          <label className="text-gray-500">Relación:</label>
                          <span className="ml-2 text-gray-900 font-medium capitalize">{bond.relation}</span>
                        </div>
                        <div>
                          <label className="text-gray-500">Sexo:</label>
                          <span className="ml-2 text-gray-900 font-medium">
                            {bond.sex === 'M' ? 'Masculino' : bond.sex === 'F' ? 'Femenino' : bond.sex}
                          </span>
                        </div>
                        <div>
                          <label className="text-gray-500">Edad:</label>
                          <span className="ml-2 text-gray-900 font-medium">
                            {bond.age ? `${bond.age} años` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <label className="text-gray-500">Fecha de nacimiento:</label>
                          <span className="text-gray-900 font-medium">{formatDate(bond.birthDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Otros Vínculos */}
      {bondsData.others && bondsData.others.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Otros Vínculos ({bondsData.others.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bondsData.others.map((bond, idx) => {
              const IconComponent = getRelationshipIcon(bond.relation)
              const colorClasses = getRelationshipColor(bond.relation)
              
              return (
                <div key={idx} className={`border p-4 rounded-lg ${colorClasses}`}>
                  <div className="flex items-start gap-3">
                    <IconComponent className="w-5 h-5 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{bond.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <label className="text-gray-500">DNI:</label>
                          <span className="ml-2 text-gray-900 font-medium">{formatTaxId(bond.taxId)}</span>
                        </div>
                        <div>
                          <label className="text-gray-500">Relación:</label>
                          <span className="ml-2 text-gray-900 font-medium capitalize">{bond.relation}</span>
                        </div>
                        <div>
                          <label className="text-gray-500">Sexo:</label>
                          <span className="ml-2 text-gray-900 font-medium">
                            {bond.sex === 'M' ? 'Masculino' : bond.sex === 'F' ? 'Femenino' : bond.sex}
                          </span>
                        </div>
                        <div>
                          <label className="text-gray-500">Edad:</label>
                          <span className="ml-2 text-gray-900 font-medium">
                            {bond.age ? `${bond.age} años` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <label className="text-gray-500">Fecha de nacimiento:</label>
                          <span className="text-gray-900 font-medium">{formatDate(bond.birthDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}