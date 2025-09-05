'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  Home,
  Search,
  Users,
  Building,
  Car,
  Phone,
  Landmark,
  Clock,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  Plus,
  TrendingUp,
  FileText,
  Globe,
  Shield,
  Sparkles
} from 'lucide-react'

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
    icon: Home 
  },
  { 
    name: 'Nueva Búsqueda', 
    href: '/dashboard/searches/new', 
    icon: Plus,
    badge: 'Quick',
    badgeColor: 'bg-green-500'
  },
  {
    name: 'Búsquedas',
    icon: Search,
    children: [
      { name: 'Todas las Búsquedas', href: '/dashboard/searches', icon: FileText },
      { name: 'Personas', href: '/dashboard/search/people', icon: Users },
      { name: 'Empresas', href: '/dashboard/search/company', icon: Building },
      { name: 'Vehículos', href: '/dashboard/search/vehicle', icon: Car },
      { name: 'Teléfonos', href: '/dashboard/search/phone', icon: Phone },
      { name: 'Cuentas Bancarias', href: '/dashboard/search/bank', icon: Landmark },
    ]
  },
  { 
    name: 'Historial', 
    href: '/dashboard/history', 
    icon: Clock,
    badge: '12',
    badgeColor: 'bg-blue-500'
  },
  {
    name: 'Créditos',
    icon: CreditCard,
    children: [
      { name: 'Comprar Créditos', href: '/dashboard/credits/purchase', icon: Sparkles },
      { name: 'Historial de Créditos', href: '/dashboard/credits/history', icon: TrendingUp },
      { name: 'Planes y Precios', href: '/dashboard/credits/plans', icon: BarChart3 },
    ]
  },
  {
    name: 'Servicios Globales',
    icon: Globe,
    children: [
      { name: 'Rastreo Web', href: '/dashboard/services/web-tracking', icon: Globe },
      { name: 'Validación de Identidad', href: '/dashboard/services/identity', icon: Shield },
    ]
  },
]

const bottomMenuItems: MenuItem[] = [
  { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
  { name: 'Centro de Ayuda', href: '/dashboard/help', icon: HelpCircle },
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
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
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
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Fulldata</h2>
            <p className="text-xs text-gray-400">Sistema de Búsqueda</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
        
        {/* Bottom Menu Items */}
        <div className="mt-8 pt-8 border-t border-gray-800 space-y-1">
          {bottomMenuItems.map(item => renderMenuItem(item))}
        </div>
      </nav>

      {/* Credits Summary */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-4 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-gray-300">Saldo de Créditos</span>
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-white">3,121</p>
              <p className="text-xs text-gray-400 mt-1">847 usados este mes</p>
            </div>
            <Link
              href="/dashboard/credits/purchase"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur text-white text-xs font-medium rounded-lg transition-colors"
            >
              Comprar +
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}