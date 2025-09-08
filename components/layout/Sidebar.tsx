'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import authService from '@/services/authService'
import { HomeIcon } from '@/components/icons/Home-icon'
import { SearchIcon } from '@/components/icons/search-icon'
import { ProfileUserIcon } from '@/components/icons/profile-user-icon'
import { Cube2Icon } from '@/components/icons/cube-2-icon'
import { Car2Icon } from '@/components/icons/car-2-icon'
import { WhatsappIcon } from '@/components/icons/whatsapp-icon'
import { BankIcon } from '@/components/icons/bank-icon'
import { TimeIcon } from '@/components/icons/time-icon'
import { WalletEmptyIcon } from '@/components/icons/wallet-empty'
import { ChartIcon } from '@/components/icons/chart'
import { Abstract26Icon } from '@/components/icons/abstract-26-icon'
import { Question2Icon } from '@/components/icons/question-2-icon'
import { ArrowRightIcon } from '@/components/icons/ArrowRight'
import GeminiStarsIcon from '@/components/icons/Magic-wand'
import { DocumentIcon } from '@/components/icons/Document-icon'
import { Technology4 } from '@/components/icons/technology-4'
import { FaceIdIcon } from '@/components/icons/face-id-icon'
import { ServiceIcon } from '@/components/icons/service-icon'
import { Setting2Icon } from '../icons/setting-2-icon'
import { UserIcon } from '@/components/icons/User-icon'
import { ExitIcon } from '@/components/icons/Exit-icon'

interface MenuItem {
  name: string
  href?: string
  icon: React.ElementType
  badge?: string
  badgeColor?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Nueva Búsqueda',
    href: '/dashboard/searches/new',
    icon: GeminiStarsIcon,
    badge: 'Quick',
    badgeColor: 'bg-green-500'
  },
  {
    name: 'Personas',
    href: '/dashboard/search/people',
    icon: ProfileUserIcon
  },
  {
    name: 'Empresas',
    href: '/dashboard/search/company',
    icon: Cube2Icon
  },
  {
    name: 'Vehículos',
    href: '/dashboard/search/vehicle',
    icon: Car2Icon
  },
  {
    name: 'Teléfonos',
    href: '/dashboard/search/phone',
    icon: WhatsappIcon
  },
  {
    name: 'Cuentas Bancarias',
    href: '/dashboard/search/bank',
    icon: BankIcon
  },
  {
    name: 'OSINT',
    href: '/dashboard/search/osint',
    icon: Technology4
  },
  {
    name: 'Validación de Identidad',
    href: '/dashboard/search/identity',
    icon: FaceIdIcon
  },
]

// Bottom menu items moved to user dropdown

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Check if we're on a report page
  const isReportPage = pathname.includes('/dashboard/reports/')

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const handleLogout = async () => {
    await authService.logout()
    dispatch(logout())
    router.push('/login')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isActive = (href?: string) => {
    if (!href) return false
    // Exact match for dashboard to avoid matching dashboard/searches
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    // Exact match for searches to avoid matching searches/new
    if (href === '/dashboard/searches') {
      return pathname === '/dashboard/searches'
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  const isParentActive = (children?: MenuItem[]) => {
    if (!children) return false
    return children.some(child => isActive(child.href))
  }

  const renderMenuItem = (item: MenuItem, isChild = false) => {
    const Icon = item.icon
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.name)
    const active = isActive(item.href) || isParentActive(item.children)

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`w-full flex items-center ${isReportPage ? 'justify-center' : 'justify-between'} ${isReportPage ? 'px-4' : 'px-4'} py-2.5 rounded-lg transition-all duration-300 group ${active || isExpanded
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            title={isReportPage ? item.name : undefined}
          >
            <div className={`flex items-center ${isReportPage ? 'justify-center' : 'gap-3'}`}>
              <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
              {!isReportPage && <span className="font-medium text-sm">{item.name}</span>}
            </div>
            {!isReportPage && (
              <ArrowRightIcon
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''
                  }`}
              />
            )}
          </button>
          {isExpanded && !isReportPage && (
            <div className="mt-1 ml-4 space-y-1">
              {item.children?.map(child => renderMenuItem(child, true))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href || '#'}
        className={`flex items-center ${isReportPage ? 'justify-center' : 'justify-between'} ${isReportPage ? 'px-4' : 'px-4'} ${isChild && !isReportPage ? 'py-2 pl-12' : 'py-2.5'} rounded-lg transition-all duration-300 group ${isActive(item.href)
          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/20'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        title={isReportPage ? item.name : undefined}
      >
        <div className={`flex items-center ${isReportPage ? 'justify-center' : 'gap-3'}`}>
          <Icon color={isActive(item.href) ? 'white' : 'gray'} className={`w-5 h-5 ${isReportPage ? 'w-6 h-6 text-xl' : ''} ${isActive(item.href)
            ? 'text-white'
            : 'text-gray-500 group-hover:text-white'
            }`} />
          {!isReportPage && <span className="font-medium text-sm">{item.name}</span>}
        </div>
        {item.badge && !isReportPage && (
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full text-white ${item.badgeColor || 'bg-gray-600'
            }`}>
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <aside className={`${isReportPage ? 'w-24' : 'w-64'} bg-gray-900 h-screen flex flex-col fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out`}>
      {/* Logo Section */}
      <div className={`${isReportPage ? 'px-2' : 'px-6'} py-4 border-b border-gray-800 transition-all duration-300`}>
        <Link href="/" className="flex items-center justify-center">
          {isReportPage ? (
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
          ) : (
            <Image
              src="/images/logo-header-w.svg"
              alt="Fulldata Logo"
              width={200}
              height={60}
              className="mx-auto w-full h-10 my-2"
            />
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className={`flex-1 ${isReportPage ? 'px-2' : 'px-4'} py-6 overflow-y-auto flex flex-col transition-all duration-300`}>
        <div className="space-y-1 flex-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>

        {/* User Profile Section */}
        {isAuthenticated && user && (
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className={`w-full flex items-center ${isReportPage ? 'justify-center px-4' : 'gap-3 px-4'} py-3 hover:bg-gray-800 rounded-lg transition-all duration-300 group`}
                title={isReportPage ? `${user.firstName} ${user.lastName}` : undefined}
              >
                {user.avatar ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                    <Image
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md flex-shrink-0">
                    {(user.firstName?.[0] || '').toUpperCase()}{(user.lastName?.[0] || '').toUpperCase()}
                  </div>
                )}
                {!isReportPage && (
                  <>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <ArrowRightIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${showUserDropdown ? 'rotate-90' : ''}`} />
                  </>
                )}
              </button>

              {/* User Dropdown Menu */}
              {showUserDropdown && !isReportPage && (
                <div className="absolute bottom-full left-4 right-4 mb-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false)
                      router.push('/dashboard/account')
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-3 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    Mi Cuenta
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false)
                      router.push('/dashboard/settings')
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-3 transition-colors"
                  >
                    <Setting2Icon className="w-4 h-4 text-gray-400" />
                    Configuración
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false)
                      router.push('/dashboard/help')
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-3 transition-colors"
                  >
                    <Question2Icon className="w-4 h-4 text-gray-400" />
                    Centro de Ayuda
                  </button>

                  <div className="border-t border-gray-700 mt-2 pt-2">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false)
                        handleLogout()
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 flex items-center gap-3 transition-colors"
                    >
                      <ExitIcon className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

    </aside>
  )
}