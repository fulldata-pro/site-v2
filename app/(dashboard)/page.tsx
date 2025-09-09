'use client'

import { useState, useRef } from 'react'
import { useAppSelector } from '@/store/hooks'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    MagnifyingGlassIcon,
    EllipsisHorizontalIcon,
    SparklesIcon,
    ChartBarIcon,
    ClockIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { ServiceIcon } from '@/components/icons/service-icon'
import { PaymentMethodIcon } from '@/components/payment-method-icon'
import { PaymentMethod, RequestStatus, ServicesType, TransactionStatus } from '@/lib/constants'
import { ChipRequestStatus } from '@/components/ChipRequestStatus'
import { ChipTransactionStatus } from '@/components/transaction-status'
import { DataTable } from '@/components/ui/data-table'
import { SEARCH_MANAGEMENT_ROUTES, SEARCH_ROUTES, REPORT_ROUTES } from '@/lib/routes'
import Link from 'next/link'

interface SearchTransaction {
    id: string
    type: 'purchase' | 'usage'
    service?: string
    paymentMethod?: PaymentMethod
    amount: number
    date: string
    status: TransactionStatus
    description: string
}

interface ServiceStats {
    id: string
    name: string
    searches: number
    change: number
    bgColor: string
}

interface RecentSearch {
    id: string
    service: string
    query: string
    date: string
    status: RequestStatus
}

export default function DashboardPage() {
    const router = useRouter()
    const { user } = useAppSelector((state) => state.auth)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Mock data - in production this would come from API/Redux
    const [searchTransactions] = useState<SearchTransaction[]>([
        {
            id: '1',
            type: 'purchase',
            paymentMethod: PaymentMethod.MERCADO_PAGO,
            amount: 500,
            date: '17 Sep 2025, 8:45 am',
            status: TransactionStatus.SUCCESS,
            description: 'Compra de búsquedas - Mercado Pago'
        },
        {
            id: '2',
            type: 'usage',
            service: ServicesType.PEOPLE,
            amount: -25,
            date: '16 Sep 2025, 11:30 pm',
            status: TransactionStatus.SUCCESS,
            description: 'Consulta de Personas - DNI 37657175'
        },
        {
            id: '3',
            type: 'usage',
            service: ServicesType.COMPANIES,
            amount: -50,
            date: '14 Sep 2025, 2:00 am',
            status: TransactionStatus.SUCCESS,
            description: 'Información Empresarial - CUIT 30-71234567-8'
        },
        {
            id: '4',
            type: 'purchase',
            paymentMethod: PaymentMethod.STRIPE,
            amount: 1000,
            date: '14 Sep 2025, 2:00 am',
            status: TransactionStatus.SUCCESS,
            description: 'Compra de búsquedas - Stripe'
        },
        {
            id: '5',
            type: 'usage',
            service: ServicesType.VEHICLES,
            amount: -40,
            date: '14 Sep 2025, 2:00 am',
            status: TransactionStatus.SUCCESS,
            description: 'Registro Vehicular - ABC-123'
        },
        {
            id: '6',
            type: 'purchase',
            paymentMethod: PaymentMethod.MERCADO_PAGO,
            amount: 2500,
            date: '09 Sep 2025, 4:30 pm',
            status: TransactionStatus.ERROR,
            description: 'Compra de búsquedas - Mercado Pago'
        }
    ])

    const [serviceStats] = useState<ServiceStats[]>([
        {
            id: ServicesType.PEOPLE,
            name: 'Personas',
            searches: 1250,
            change: 24,
            bgColor: 'bg-services-people',
        },
        {
            id: ServicesType.COMPANIES,
            name: 'Empresas',
            searches: 780,
            change: -14,
            bgColor: 'bg-services-companies',
        },
        {
            id: ServicesType.VEHICLES,
            name: 'Vehículos',
            searches: 890,
            change: 12,
            bgColor: 'bg-services-vehicles',
        },
        {
            id: ServicesType.PHONES,
            name: 'Teléfonos',
            searches: 560,
            change: -17,
            bgColor: 'bg-services-phones',
        },
        {
            id: ServicesType.BANKS,
            name: 'Bancos',
            searches: 340,
            change: 32,
            bgColor: 'bg-services-banks',
        },
        {
            id: ServicesType.OSINT,
            name: 'OSINT',
            searches: 1150,
            change: 8,
            bgColor: 'bg-services-osint',
        }
    ])

    const [recentSearches] = useState<RecentSearch[]>([
        {
            id: '1',
            service: ServicesType.PEOPLE,
            query: 'DNI: 37657175',
            date: '17 Sep 2025, 8:45 am',
            status: RequestStatus.SUCCESS
        },
        {
            id: '2',
            service: ServicesType.COMPANIES,
            query: 'CUIT: 30-71234567-8',
            date: '16 Sep 2025, 11:30 pm',
            status: RequestStatus.PENDING
        },
        {
            id: '3',
            service: ServicesType.VEHICLES,
            query: 'Patente: ABC-123',
            date: '14 Sep 2025, 2:00 am',
            status: RequestStatus.SUCCESS
        },
        {
            id: '4',
            service: ServicesType.PHONES,
            query: '+54 11 4444-5555',
            date: '14 Sep 2025, 2:00 am',
            status: RequestStatus.SUCCESS
        },
        {
            id: '5',
            service: ServicesType.OSINT,
            query: 'juan.perez@email.com',
            date: '14 Sep 2025, 2:00 am',
            status: RequestStatus.ERROR
        }
    ])

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50/30 via-blue-50/20 to-purple-50/30">
            <div className="space-y-8">
                {/* Header Section */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/5 to-pink-400/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl border border-white/30 p-8 shadow-xl shadow-slate-200/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                        <SparklesIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold  text-secondary-dark">
                                            Bienvenido, {user?.firstName} {user?.lastName}
                                        </h1>
                                    </div>
                                </div>
                                <p className="text-slate-600 font-medium">
                                    Resumen de tu actividad y transacciones recientes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Statistics */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/5 to-cyan-400/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl shadow-slate-200/20 overflow-hidden">
                        <div className="bg-gradient-to-r from-white/60 to-slate-50/30 px-8 py-6 border-b border-white/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                        Búsquedas por Servicio
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={scrollLeft}
                                        className="p-2 hover:bg-white/60 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/30 hover:shadow-md"
                                    >
                                        <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
                                    </button>
                                    <button
                                        onClick={scrollRight}
                                        className="p-2 hover:bg-white/60 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/30 hover:shadow-md"
                                    >
                                        <ChevronRightIcon className="w-5 h-5 text-slate-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div
                                ref={scrollRef}
                                className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {serviceStats.map((service, index) => (
                                    <div
                                        key={service.id}
                                        className="group flex-shrink-0 w-80 relative cursor-pointer"
                                        onClick={() => router.push(`/search/${service.id}`)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/20 rounded-3xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                                        <div className="relative bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-300/30 ">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    {/* <div className={` rounded-2xl flex items-center justify-center `}> */}
                                                    <ServiceIcon service={service.id} className="text-2xl" />
                                                    {/* </div> */}
                                                    <div>
                                                        <h3 className="font-bold text-lg text-slate-800">{service.name}</h3>
                                                        <p className="text-sm text-slate-500 font-medium">Último mes</p>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1.5 rounded-2xl text-xs font-bold ${service.change > 0
                                                    ? 'bg-emerald-100/80 text-emerald-700'
                                                    : 'bg-red-100/80 text-red-700'
                                                    }`}>
                                                    {service.change > 0 ? '+' : ''}{service.change}%
                                                </div>
                                            </div>

                                            <div className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                                                {service.searches.toLocaleString()}
                                            </div>
                                            <p className="text-sm text-slate-500 font-semibold">búsquedas realizadas</p>

                                            <div className="mt-4 h-1 bg-slate-200/50 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${service.bgColor} rounded-full transition-all duration-1000`}
                                                    style={{ width: `${Math.min((service.searches / 1500) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-blue-400/5 to-purple-400/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl shadow-slate-200/20 overflow-hidden">
                        <div className="bg-gradient-to-r from-white/60 to-slate-50/30 px-8 py-6 border-b border-white/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                        Últimas Transacciones
                                    </h2>
                                </div>
                                <Link href={SEARCH_ROUTES.SEARCHES} className="text-sm font-semibold text-slate-500">
                                    Ver todas
                                </Link>
                            </div>
                        </div>

                        <div className="">
                            <DataTable
                                data={searchTransactions.slice(0, 10)}
                                columns={[
                                    {
                                        key: 'type',
                                        header: 'Tipo',
                                        render: (transaction) => (
                                            <div className="flex items-center">
                                                {transaction.type !== 'purchase' ? (
                                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200/50 rounded-2xl flex items-center justify-center">
                                                        <ArrowDownIcon className="w-5 h-5 text-emerald-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-50 border border-red-200/50 rounded-2xl flex items-center justify-center">
                                                        <ArrowUpIcon className="w-5 h-5 text-red-600" />
                                                    </div>
                                                )}
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-slate-800">
                                                        {transaction.type === 'purchase' ? 'Compra' : 'Consumo'}
                                                    </div>
                                                    {transaction.service && (
                                                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                            <ServiceIcon service={transaction.service} className="inline w-3 h-3" />
                                                            {serviceStats.find(s => s.id === transaction.service)?.name}
                                                        </div>
                                                    )}
                                                    {transaction.paymentMethod && (
                                                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                            <PaymentMethodIcon method={transaction.paymentMethod} size={16} />
                                                            {transaction.paymentMethod === PaymentMethod.MERCADO_PAGO ? 'Mercado Pago' : 'Stripe'}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        key: 'description',
                                        header: 'Descripción',
                                        render: (transaction) => (
                                            <div className="text-sm text-slate-800 font-medium">{transaction.description}</div>
                                        )
                                    },
                                    {
                                        key: 'date',
                                        header: 'Fecha',
                                        render: (transaction) => (
                                            <div className="text-sm text-slate-500">{transaction.date}</div>
                                        )
                                    },
                                    {
                                        key: 'status',
                                        header: 'Estado',
                                        render: (transaction) => (
                                            <ChipTransactionStatus status={transaction.status} size="sm" />
                                        )
                                    },
                                    {
                                        key: 'amount',
                                        header: 'Cantidad',
                                        render: (transaction) => (
                                            <div className={`text-sm font-bold ${transaction.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                                            </div>
                                        )
                                    },
                                    {
                                        key: 'action',
                                        header: 'Acción',
                                        render: () => (
                                            <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-white/40 rounded-xl transition-all duration-200">
                                                <EllipsisHorizontalIcon className="w-5 h-5" />
                                            </button>
                                        )
                                    }
                                ]}
                                className="bg-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Recent Searches */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/5 to-pink-400/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl shadow-slate-200/20 overflow-hidden">
                        <div className="bg-gradient-to-r from-white/60 to-slate-50/30 px-8 py-6 border-b border-white/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                        Búsquedas Recientes
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <DataTable
                                data={recentSearches}
                                columns={[
                                    {
                                        key: 'service',
                                        header: 'Servicio',
                                        render: (search) => (
                                            <div className="flex items-center">
                                                <div className=" rounded-2xl flex items-center justify-center">
                                                    <ServiceIcon service={search.service} className="text-lg" />
                                                </div>
                                                <div className="ml-2">
                                                    <div className="text-sm font-semibold text-slate-800">
                                                        {serviceStats.find(s => s.id === search.service)?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        key: 'query',
                                        header: 'Consulta',
                                        render: (search) => (
                                            <div>
                                                <div className="text-sm font-medium text-slate-800">{search.query}</div>
                                                {/* <div className="text-xs text-slate-500">{search.documentType} • {search.provider}</div> */}
                                            </div>
                                        )
                                    },
                                    {
                                        key: 'status',
                                        header: 'Estado',
                                        render: (search) => (
                                            <ChipRequestStatus status={search.status} />
                                        )
                                    },
                                    {
                                        key: 'date',
                                        header: 'Fecha',
                                        render: (search) => (
                                            <div className="text-sm text-slate-500">{search.date.split(',')[0]}</div>
                                        )
                                    },
                                ]}
                                className="bg-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}