'use client'

import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { usePathname, useRouter } from 'next/navigation'
import { ExclamationIcon } from '@/components/icons/exclamation-icon'
import { NotificationIcon } from '../icons/notification-icon'
import { CreditCardIcon } from '@/components/icons/credit-card'
import { TwoCreditCardIcon } from '../icons/two-credit-card'
import NotificationDropdown from './NotificationDropdown'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { SEARCH_MANAGEMENT_ROUTES } from '@/lib/routes'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery)
  }
  // For all other routes (protected), wrap with dashboard layout
  const isReportPage = pathname?.includes('/reports/')
  return (
    <header className="bg-white border-b px-8 border-gray-100 shadow-sm">
      <div className={`${isReportPage ? 'ml-14' : ' '} mx-auto`}>
        <div className="flex items-center justify-between h-16">
          {/* Search Input */}
          {isAuthenticated && (
            <div className="flex-1 max-w-lg">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar personas, empresas, vehículos..."
                    className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  />
                </div>
              </form>
            </div>
          )}

          {!isAuthenticated && <div></div>}

          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  <NotificationIcon className="text-xl" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <NotificationDropdown
                  isOpen={isNotificationOpen}
                  onClose={() => setIsNotificationOpen(false)}
                />
              </div>

              {/* Search Management Button */}
              {/* <button
                onClick={() => router.push(SEARCH_MANAGEMENT_ROUTES.PURCHASE)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                title="Comprar Búsquedas"
              >
                <CreditCardIcon className="text-xl" />
              </button> */}

              {/* Search Balance */}
              <button
                onClick={() => router.push(SEARCH_MANAGEMENT_ROUTES.HISTORY)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
                title="Búsquedas disponibles"
              >
                <TwoCreditCardIcon className="text-xl text-blue-500" />
                <span className="font-semibold">3,121</span>
                <span className="text-xs">búsquedas</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}