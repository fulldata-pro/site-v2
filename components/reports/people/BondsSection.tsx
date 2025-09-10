import React from 'react'
import { BondsData } from '@/lib/types/people_types'
import { PeopleIcon } from '@/components/icons/People-icon'
import { TimeIcon } from '@/components/icons/time-icon'
import { Heart } from 'lucide-react'
import { formatDate, calculateAge } from '@/lib/utils/dateUtils'
import { 
  translateRelationship, 
  translateSex, 
  getRelationshipStyle 
} from '@/lib/constants/relationshipConstants'

interface BondsSectionProps {
  bondsData: BondsData
}

export default function BondsSection({ bondsData }: BondsSectionProps) {
  const formatLocalDate = (timestamp: number | { $numberLong: string } | { $date: string } | null | undefined) => {
    const formatted = formatDate(timestamp)
    return formatted === 'No disponible' ? 'N/A' : formatted
  }

  const formatTaxId = (taxId: number | { $numberLong: string } | string) => {
    if (typeof taxId === 'object' && '$numberLong' in taxId) {
      return taxId.$numberLong
    }
    return String(taxId)
  }

  const getAge = (ageFromData: number | null, birthDate: number | { $numberLong: string } | { $date: string } | null | undefined): string => {
    // Use provided age if available
    if (ageFromData !== null && ageFromData !== undefined) {
      return `${ageFromData} años`
    }
    
    // Calculate age from birth date if available
    if (birthDate) {
      const calculatedAge = calculateAge(birthDate)
      if (calculatedAge !== null) {
        return `${calculatedAge} años`
      }
    }
    
    return 'N/A'
  }

  const isEmpty = (
    (!bondsData.main || bondsData.main.length === 0) &&
    (!bondsData.others || bondsData.others.length === 0)
  )

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <PeopleIcon className="text-6xl text-gray-400 mb-4" />
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
              const relationshipStyle = getRelationshipStyle(bond.relation, bond.sex)
              const IconComponent = relationshipStyle.icon === 'heart' ? Heart : PeopleIcon
              const translatedRelation = translateRelationship(bond.relation, bond.sex)
              
              return (
                <div key={idx} className={`border p-4 rounded-lg ${relationshipStyle.colorClasses}`}>
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
                          <span className="ml-2 text-gray-900 font-medium">{translatedRelation}</span>
                        </div>
                        <div>
                          <label className="text-gray-500">Sexo:</label>
                          <span className="ml-2 text-gray-900 font-medium">
                            {translateSex(bond.sex)}
                          </span>
                        </div>
                        <div>
                          <label className="text-gray-500">Edad:</label>
                          <span className="ml-2 text-gray-900 font-medium">
                            {getAge(bond.age, bond.birthDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TimeIcon className="text-base text-gray-400" />
                          <label className="text-gray-500">Fecha de nacimiento:</label>
                          <span className="text-gray-900 font-medium">{formatLocalDate(bond.birthDate)}</span>
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
              const relationshipStyle = getRelationshipStyle(bond.relation, bond.sex)
              const IconComponent = relationshipStyle.icon === 'heart' ? Heart : PeopleIcon
              const translatedRelation = translateRelationship(bond.relation, bond.sex)
              
              return (
                <div key={idx} className={`border p-4 rounded-lg ${relationshipStyle.colorClasses}`}>
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
                          <span className="ml-2 text-gray-900 font-medium">{translatedRelation}</span>
                        </div>
                        <div>
                          <label className="text-gray-500">Sexo:</label>
                          <span className="ml-2 text-gray-900 font-medium">
                            {translateSex(bond.sex)}
                          </span>
                        </div>
                        <div>
                          <label className="text-gray-500">Edad:</label>
                          <span className="ml-2 text-gray-900 font-medium">
                            {getAge(bond.age, bond.birthDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TimeIcon className="text-base text-gray-400" />
                          <label className="text-gray-500">Fecha de nacimiento:</label>
                          <span className="text-gray-900 font-medium">{formatLocalDate(bond.birthDate)}</span>
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