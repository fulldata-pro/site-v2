import React from 'react'
import { PersonalPropertyData } from '@/lib/types/people_types'
import { HomeIcon } from '@/components/icons/Home-icon'
import { Car2Icon } from '@/components/icons/car-2-icon'
import { CreditCard, Building } from 'lucide-react'

interface PersonalPropertySectionProps {
  propertyData: PersonalPropertyData
}

export default function PersonalPropertySection({ propertyData }: PersonalPropertySectionProps) {
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(num)
  }

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

  return (
    <div className="space-y-8">
      {/* Inmuebles */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Inmuebles ({propertyData.buildings?.length || 0})
        </h3>
        {!propertyData.buildings || propertyData.buildings.length === 0 ? (
          <p className="text-gray-500">No se encontraron inmuebles registrados.</p>
        ) : (
          <div className="space-y-4">
            {propertyData.buildings.map((building, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{building.address}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-gray-500">Superficie del terreno:</label>
                        <p className="text-gray-900 font-medium">{building.landSurface} m²</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Superficie construida:</label>
                        <p className="text-gray-900 font-medium">{building.buildingSurface} m²</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vehículos */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Vehículos ({propertyData.cars?.length || 0})
        </h3>
        {!propertyData.cars || propertyData.cars.length === 0 ? (
          <p className="text-gray-500">No se encontraron vehículos registrados.</p>
        ) : (
          <div className="space-y-4">
            {propertyData.cars.map((car, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Car2Icon className="text-lg text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">
                        {car.brand} {car.model} ({car.year})
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        car.inPossession 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {car.inPossession ? 'En posesión' : 'No en posesión'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <label className="text-gray-500">Patente:</label>
                        <p className="text-gray-900 font-medium">{car.licencePlate}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Tipo:</label>
                        <p className="text-gray-900 font-medium">{car.type}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Origen:</label>
                        <p className="text-gray-900 font-medium">{car.origin}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha de compra:</label>
                        <p className="text-gray-900 font-medium">{formatDate(car.buyed)}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha de fabricación:</label>
                        <p className="text-gray-900 font-medium">{formatDate(car.manufactured)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Embargos de Vehículos */}
      {propertyData.carsEmbargoes && propertyData.carsEmbargoes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Embargos de Vehículos ({propertyData.carsEmbargoes.length})
          </h3>
          <div className="space-y-4">
            {propertyData.carsEmbargoes.map((embargo, idx) => (
              <div key={idx} className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{embargo.brand}</h4>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Embargado
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-gray-500">Patente:</label>
                        <p className="text-gray-900 font-medium">{embargo.licensePlate}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Provincia:</label>
                        <p className="text-gray-900 font-medium">{embargo.province}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Deuda:</label>
                        <p className="text-red-600 font-medium">{embargo.debt}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Valuación:</label>
                        <p className="text-gray-900 font-medium">{embargo.valuation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marcas Registradas */}
      {propertyData.registeredTrademarks && propertyData.registeredTrademarks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Marcas Registradas ({propertyData.registeredTrademarks.length})
          </h3>
          <div className="space-y-2">
            {propertyData.registeredTrademarks.map((trademark, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <HomeIcon className="text-base text-blue-600" />
                  <span className="text-gray-900 font-medium">{trademark}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}