'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { startSearch } from '@/store/slices/searchSlice'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchCompanyPage() {
  const [cuit, setCuit] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    dispatch(startSearch({
      type: 'company',
      query: cuit
    }))
    
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Búsqueda de Empresas</h1>
        <p className="text-gray-600 mt-2">
          Ingrese el CUIT de la empresa que desea buscar
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-2">
              CUIT de la empresa
            </label>
            <input
              id="cuit"
              type="text"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              className="input-field"
              placeholder="30-12345678-9"
              pattern="[0-9]{2}-[0-9]{8}-[0-9]"
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

      <div className="mt-6 card bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-900 mb-2">Información útil</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• El CUIT debe incluir los guiones (formato: XX-XXXXXXXX-X)</li>
          <li>• Los resultados incluirán información corporativa, financiera y de activos</li>
          <li>• Se mostrarán datos de contacto y ubicación de la empresa</li>
        </ul>
      </div>
    </div>
  )
}