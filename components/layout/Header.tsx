'use client'

import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { ExclamationIcon } from '@/components/icons/exclamation-icon'
import { NotificationIcon } from '../icons/notification-icon'
import { CreditCardIcon } from '@/components/icons/credit-card'
import { TwoCreditCardIcon } from '../icons/two-credit-card'
import NotificationDropdown from './NotificationDropdown'

export default function Header() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div></div>

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

              {/* Credits Button */}
              {/* <button
                onClick={() => router.push('/dashboard/credits')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                title="Créditos"
              >
                <CreditCardIcon className="text-xl" />
              </button> */}

              {/* Credits Balance */}
              <button
                onClick={() => router.push('/dashboard/credits/history')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
              >
                <TwoCreditCardIcon className="text-xl text-blue-500" />
                <span className="font-semibold">3,121</span>
                <span className="text-xs">créditos</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}