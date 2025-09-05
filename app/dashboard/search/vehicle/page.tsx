'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { startSearch } from '@/store/slices/searchSlice'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchVehiclePage() {
  const [licensePlate, setLicensePlate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    dispatch(startSearch({
      type: 'vehicle',
      query: licensePlate.toUpperCase()
    }))
    
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Búsqueda de Vehículos</h1>
        <p className="text-gray-600 mt-2">
          Ingrese la matrícula del vehículo que desea buscar
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-2">
              Matrícula del vehículo
            </label>
            <input
              id="licensePlate"
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="input-field uppercase"
              placeholder="ABC123 o AB123CD"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Buscando...</span>
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span>Buscar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 card bg-purple-50 border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">Información útil</h3>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Aceptamos tanto formato antiguo (ABC123) como nuevo (AB123CD)</li>
          <li>• La matrícula se procesará en mayúsculas automáticamente</li>
          <li>• Los resultados incluirán información del vehículo e historial de propietarios</li>
        </ul>
      </div>
    </div>
  )
}