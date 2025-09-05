'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { startSearch } from '@/store/slices/searchSlice'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBankPage() {
  const [searchType, setSearchType] = useState<'cbu' | 'alias'>('cbu')
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    dispatch(startSearch({
      type: 'bank',
      query: `${searchType}:${searchValue}`
    }))
    
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Búsqueda Bancaria</h1>
        <p className="text-gray-600 mt-2">
          Consulte información bancaria usando CBU o ALIAS
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
                  value="cbu"
                  checked={searchType === 'cbu'}
                  onChange={(e) => setSearchType(e.target.value as 'cbu')}
                  className="mr-2 text-primary focus:ring-primary"
                />
                <span>CBU</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="alias"
                  checked={searchType === 'alias'}
                  onChange={(e) => setSearchType(e.target.value as 'alias')}
                  className="mr-2 text-primary focus:ring-primary"
                />
                <span>ALIAS</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="searchValue" className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'cbu' ? 'Número de CBU' : 'ALIAS bancario'}
            </label>
            <input
              id="searchValue"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input-field"
              placeholder={searchType === 'cbu' ? '0000000000000000000000' : 'mi.alias.banco'}
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

      <div className="mt-6 card bg-red-50 border-red-200">
        <h3 className="font-semibold text-red-900 mb-2">Información útil</h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• El CBU debe tener 22 dígitos</li>
          <li>• El ALIAS puede contener letras, números y puntos</li>
          <li>• Los resultados mostrarán información de la entidad bancaria</li>
        </ul>
      </div>
    </div>
  )
}