'use client'

import Link from 'next/link'

export default function SearchPage() {
  const searchTypes = [
    {
      title: 'Búsqueda de Personas',
      description: 'Busque información personal utilizando email o CUIT/CUIL',
      href: '/search/people',
      icon: '👤',
      color: 'bg-blue-500',
    },
    {
      title: 'Búsqueda de Empresas',
      description: 'Encuentre información corporativa usando CUIT',
      href: '/search/company',
      icon: '🏢',
      color: 'bg-green-500',
    },
    {
      title: 'Búsqueda de Vehículos',
      description: 'Consulte información vehicular por matrícula',
      href: '/search/vehicle',
      icon: '🚗',
      color: 'bg-purple-500',
    },
    {
      title: 'Búsqueda de Teléfonos',
      description: 'Identifique propietarios de números telefónicos',
      href: '/search/phone',
      icon: '📱',
      color: 'bg-orange-500',
    },
    {
      title: 'Búsqueda Bancaria',
      description: 'Consulte información bancaria por CBU o ALIAS',
      href: '/search/bank',
      icon: '🏦',
      color: 'bg-red-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nueva Búsqueda</h1>
        <p className="text-gray-600 mt-2">
          Seleccione el tipo de búsqueda que desea realizar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchTypes.map((type) => (
          <Link
            key={type.title}
            href={type.href}
            className="card hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-start space-x-4">
              <div className={`${type.color} p-3 rounded-lg`}>
                <span className="text-2xl">{type.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {type.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}