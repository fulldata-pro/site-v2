'use client'

import { useState, useEffect, useRef } from 'react'
import { CreditCardIcon } from '@/components/icons/credit-card'
import { WalletEmptyIcon } from '@/components/icons/wallet-empty'

interface Notification {
  id: number
  type: 'credit_consumption' | 'credit_purchase'
  title: string
  message: string
  time: string
  isRead: boolean
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'credit_consumption',
    title: 'Créditos utilizados',
    message: 'Se han consumido 15 créditos en una búsqueda de persona',
    time: 'Hace 2 minutos',
    isRead: false
  },
  {
    id: 2,
    type: 'credit_purchase',
    title: 'Compra de créditos exitosa',
    message: 'Se han agregado 500 créditos a tu cuenta',
    time: 'Hace 1 hora',
    isRead: false
  },
  {
    id: 3,
    type: 'credit_consumption',
    title: 'Créditos utilizados',
    message: 'Se han consumido 25 créditos en una búsqueda de empresa',
    time: 'Hace 3 horas',
    isRead: true
  },
  {
    id: 4,
    type: 'credit_consumption',
    title: 'Créditos utilizados',
    message: 'Se han consumido 10 créditos en una búsqueda de vehículo',
    time: 'Ayer',
    isRead: true
  }
]

interface NotificationDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }

  if (!isOpen) return null

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              Leer todo
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No tienes notificaciones
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50' : ''
                }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'credit_purchase'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-orange-100 text-orange-600'
                  }`}>
                  {notification.type === 'credit_purchase' ? (
                    <CreditCardIcon className="w-4 h-4" />
                  ) : (
                    <WalletEmptyIcon className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  )
}