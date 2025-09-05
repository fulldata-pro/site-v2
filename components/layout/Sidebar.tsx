'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
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
    name: 'Búsquedas',
    icon: SearchIcon,
    children: [
      { name: 'Todas las Búsquedas', href: '/dashboard/searches', icon: DocumentIcon },
      { name: 'Personas', href: '/dashboard/search/people', icon: ProfileUserIcon },
      { name: 'Empresas', href: '/dashboard/search/company', icon: Cube2Icon },
      { name: 'Vehículos', href: '/dashboard/search/vehicle', icon: Car2Icon },
      { name: 'Teléfonos', href: '/dashboard/search/phone', icon: WhatsappIcon },
      { name: 'Cuentas Bancarias', href: '/dashboard/search/bank', icon: BankIcon },
    ]
  },
  { 
    name: 'Historial', 
    href: '/dashboard/history', 
    icon: TimeIcon,
    badge: '12',
    badgeColor: 'bg-blue-500'
  },
  {
    name: 'Créditos',
    icon: WalletEmptyIcon,
    children: [
      { name: 'Comprar Créditos', href: '/dashboard/credits/purchase', icon: ChartIcon },
      { name: 'Historial de Créditos', href: '/dashboard/credits/history', icon: ChartIcon },
      { name: 'Planes y Precios', href: '/dashboard/credits/plans', icon: ChartIcon },
    ]
  },
  {
    name: 'Servicios Globales',
    icon: Technology4,
    children: [
      { name: 'Rastreo Web', href: '/dashboard/services/web-tracking', icon: Technology4 },
      { name: 'Validación de Identidad', href: '/dashboard/services/identity', icon: FaceIdIcon },
    ]
  },
]

const bottomMenuItems: MenuItem[] = [
  { name: 'Configuración', href: '/dashboard/settings', icon: Abstract26Icon },
  { name: 'Centro de Ayuda', href: '/dashboard/help', icon: Question2Icon },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Búsquedas'])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

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
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
              active || isExpanded
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
              <span className="font-medium text-sm">{item.name}</span>
            </div>
            <ArrowRightIcon 
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </button>
          {isExpanded && (
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
        className={`flex items-center justify-between px-4 ${isChild ? 'py-2 pl-12' : 'py-2.5'} rounded-lg transition-all duration-200 group ${
          isActive(item.href)
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/20'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${
            isActive(item.href) 
              ? 'text-white' 
              : 'text-gray-500 group-hover:text-white'
          }`} />
          <span className="font-medium text-sm">{item.name}</span>
        </div>
        {item.badge && (
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full text-white ${
            item.badgeColor || 'bg-gray-600'
          }`}>
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <aside className="w-64 bg-gray-900 h-screen flex flex-col fixed left-0 top-0 z-40">
      {/* Logo Section */}
      <div className="px-6 py-4 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.svg"
            alt="Fulldata Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-white">Fulldata</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto flex flex-col">
        <div className="space-y-1 flex-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
        
        {/* Bottom Menu Items */}
        <div className="mt-8 pt-8 border-t border-gray-800 space-y-1">
          {bottomMenuItems.map(item => renderMenuItem(item))}
        </div>
      </nav>

    </aside>
  )
}