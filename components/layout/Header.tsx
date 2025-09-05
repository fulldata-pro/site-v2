'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'
import authService from '@/services/authService'
import { ChevronDown, User, LogOut, Settings, CreditCard, Bell } from 'lucide-react'

export default function Header() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    await authService.logout()
    dispatch(logout())
    router.push('/login')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo-icon.svg"
              alt="Fulldata Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Fulldata</span>
          </Link>

          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Credits Balance */}
              <button 
                onClick={() => router.push('/credits/purchase')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
              >
                <CreditCard className="w-4 h-4" />
                <span className="font-semibold">3,121</span>
                <span className="text-xs">créditos</span>
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                    </div>
                    
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowDropdown(false)
                          router.push('/profile')
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        Mi Perfil
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowDropdown(false)
                          router.push('/credits/history')
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        Historial de Créditos
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowDropdown(false)
                          router.push('/settings')
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                        Configuración
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={() => {
                          setShowDropdown(false)
                          handleLogout()
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}