'use client'

import React from 'react'
import { 
  DollarSign, TrendingUp, AlertTriangle, CheckCircle, 
  XCircle, Building, FileText, Scale, Banknote 
} from 'lucide-react'

interface CompanyFinancialSectionProps {
  financialData: any
}

export default function CompanyFinancialSection({ financialData }: CompanyFinancialSectionProps) {
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(num)
  }

  const formatDate = (timestamp: number | string | null) => {
    if (!timestamp) return 'N/A'
    const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp
    return new Date(ts).toLocaleDateString('es-AR')
  }

  if (!financialData) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-purple-50 rounded-2xl">
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Situación Financiera</h2>
            <p className="text-slate-600">No hay información financiera disponible</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Indicadores Principales */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-purple-50 rounded-2xl">
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Indicadores Financieros</h2>
            <p className="text-slate-600">Métricas principales de la situación financiera</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Peor Situación</h3>
            <p className="text-3xl font-bold text-slate-900">{financialData.worstSituation || 'N/A'}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Aseguradora</h3>
            <p className="text-lg font-semibold text-slate-900">{financialData.insurer || 'N/A'}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Facturación Estimada</h3>
            <p className="text-lg font-semibold text-slate-900">Nivel {financialData.estimatedBilling || 'N/A'}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Compromiso Mensual</h3>
            <p className="text-lg font-semibold text-slate-900">
              {financialData.monthlyCommitment ? formatCurrency(financialData.monthlyCommitment) : 'N/A'}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Tarjetas de Crédito</h3>
            <p className="text-lg font-semibold text-slate-900">
              {financialData.creditCardPaymentAmount ? formatCurrency(financialData.creditCardPaymentAmount) : 'N/A'}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Perfil de Cumplimiento</h3>
            <p className="text-lg font-semibold text-slate-900">
              Tipo {financialData.debtorComplianceProfile || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Indicadores de Riesgo */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-amber-50 rounded-2xl">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Indicadores de Riesgo</h2>
            <p className="text-slate-600">Alertas y señales de riesgo financiero</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <span className="text-sm text-slate-700">Facturas Apócrifas</span>
            {financialData.hasApocryphalInvoices ? (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <span className="text-sm text-slate-700">Deuda Fiscal</span>
            {financialData.hasFiscalDebt === 'true' || financialData.hasFiscalDebt === true ? (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <span className="text-sm text-slate-700">Pago Tardío</span>
            {financialData.isLatePayment ? (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            ) : (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <span className="text-sm text-slate-700">CNE</span>
            {financialData.cne?.[0]?.value ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
          </div>
        </div>
      </div>

      {/* Juicios y Quiebras */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-red-50 rounded-2xl">
            <Scale className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Juicios y Quiebras</h2>
            <p className="text-slate-600">Historial legal y concursal</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-red-50 to-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Juicios (3 meses)</p>
            <p className="text-3xl font-bold text-slate-900">{financialData.judments3m || 0}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-50 to-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Juicios (12 meses)</p>
            <p className="text-3xl font-bold text-slate-900">{financialData.judments12m || 0}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-50 to-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Juicios (24 meses)</p>
            <p className="text-3xl font-bold text-slate-900">{financialData.judments24m || 0}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Concursos/Quiebras (3m)</p>
            <p className="text-3xl font-bold text-slate-900">{financialData.contestAndBankruptcies3m || 0}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Concursos/Quiebras (12m)</p>
            <p className="text-3xl font-bold text-slate-900">{financialData.contestAndBankruptcies12m || 0}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Concursos/Quiebras (24m)</p>
            <p className="text-3xl font-bold text-slate-900">{financialData.contestAndBankruptcies24m || 0}</p>
          </div>
        </div>
      </div>

      {/* Evolución de Deuda */}
      {financialData.historicalDebt && financialData.historicalDebt.length > 0 && (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-indigo-50 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Evolución de Deuda</h2>
              <p className="text-slate-600">Historial de deuda de los últimos períodos</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex space-x-3 pb-2">
              {financialData.historicalDebt.slice(-12).map((debt: any, index: number) => (
                <div 
                  key={index} 
                  className="min-w-[100px] text-center p-3 bg-gradient-to-br from-indigo-50 to-slate-50 rounded-xl border border-slate-200"
                >
                  <p className="text-xs text-slate-600 mb-1">{formatDate(debt.period).substring(3)}</p>
                  <p className="text-xl font-bold text-indigo-600">{debt.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bancos Operativos */}
      {financialData.operativeBanks && financialData.operativeBanks.length > 0 && (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Bancos Operativos</h2>
              <p className="text-slate-600">Entidades bancarias con las que opera</p>
            </div>
          </div>

          <div className="space-y-3">
            {financialData.operativeBanks.map((bank: any, index: number) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-900">{bank.name}</p>
                    <p className="text-sm text-slate-600 mt-1">Situación: {bank.situation}</p>
                    {bank.type && <p className="text-xs text-slate-500 mt-1">{bank.type}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">
                      {bank.amount ? formatCurrency(bank.amount) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información BCRA */}
      {financialData.bcraInfo && financialData.bcraInfo.length > 0 && (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-amber-50 rounded-2xl">
              <FileText className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Información BCRA</h2>
              <p className="text-slate-600">Registro del Banco Central</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-3 text-sm font-semibold text-slate-700">Entidad</th>
                  <th className="text-left py-3 px-3 text-sm font-semibold text-slate-700">Fecha</th>
                  <th className="text-center py-3 px-3 text-sm font-semibold text-slate-700">Situación</th>
                  <th className="text-right py-3 px-3 text-sm font-semibold text-slate-700">Préstamo</th>
                  <th className="text-center py-3 px-3 text-sm font-semibold text-slate-700">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {financialData.bcraInfo.slice(0, 10).map((info: any, index: number) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-sm text-slate-900">{info.name}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{formatDate(info.period)}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        info.situation === '01' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {info.situation}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-slate-900">
                      {info.loan ? formatCurrency(info.loan) : 'N/A'}
                    </td>
                    <td className="py-3 px-3 text-center text-xs text-slate-600">{info.type || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {financialData.bcraInfo.length > 10 && (
              <p className="text-sm text-slate-600 mt-4 text-center">
                Mostrando 10 de {financialData.bcraInfo.length} registros
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}