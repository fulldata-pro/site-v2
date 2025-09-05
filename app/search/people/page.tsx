'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { startSearch } from '@/store/slices/searchSlice'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchPeoplePage() {
  const [searchType, setSearchType] = useState<'email' | 'cuit'>('email')
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    dispatch(startSearch({
      type: 'people',
      query: `${searchType}:${searchValue}`
    }))
    
    // Simular llamada a API
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Búsqueda de Personas</h1>
        <p className="text-gray-600 mt-2">
          Ingrese el email o CUIT/CUIL de la persona que desea buscar
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de búsqueda
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={searchType === 'email'}
                  onChange={(e) => setSearchType(e.target.value as 'email')}
                  className="mr-2 text-primary focus:ring-primary"
                />
                <span>Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cuit"
                  checked={searchType === 'cuit'}
                  onChange={(e) => setSearchType(e.target.value as 'cuit')}
                  className="mr-2 text-primary focus:ring-primary"
                />
                <span>CUIT/CUIL</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="searchValue" className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'email' ? 'Correo electrónico' : 'CUIT/CUIL'}
            </label>
            <input
              id="searchValue"
              type={searchType === 'email' ? 'email' : 'text'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input-field"
              placeholder={searchType === 'email' ? 'ejemplo@correo.com' : '20-12345678-9'}
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

      <div className="mt-6 card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Información útil</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• El email debe ser válido y estar registrado en nuestras bases de datos</li>
          <li>• El CUIT/CUIL debe incluir los guiones (formato: XX-XXXXXXXX-X)</li>
          <li>• Los resultados incluirán información personal, financiera, laboral y legal</li>
        </ul>
      </div>
    </div>
  )
}