import React from 'react'
import { FinancialSituationData } from '@/lib/types/people_types'
import { DangerIcon } from '@/components/icons/danger-icon'
import { DollarIcon } from '@/components/icons/Dollar-icon'
import { TrendingUp, Building, CreditCard } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface FinancialSectionProps {
  financialData: FinancialSituationData
}

export default function FinancialSection({ financialData }: FinancialSectionProps) {
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseInt(amount) : amount
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(num / 100)
  }

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleDateString('es-AR', {
      month: 'short',
      year: 'numeric'
    })
  }

  const historicalDebtChart = financialData.historicalDebt?.map(debt => ({
    period: formatDate(debt.period),
    amount: typeof debt.amount === 'string' ? parseInt(debt.amount) : debt.amount
  })).reverse() || []

  const getSituationColor = (situation: string) => {
    const code = parseInt(situation)
    if (code === 1) return 'text-green-600 bg-green-50'
    if (code <= 3) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getSituationLabel = (situation: string) => {
    const situations: { [key: string]: string } = {
      '1': 'Normal',
      '2': 'Con retraso',
      '3': 'Irregular',
      '4': 'Muy irregular',
      '5': 'Perdida total'
    }
    return situations[situation] || situation
  }

  return (
    <div className="space-y-8">
      {/* Resumen Financiero */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Resumen Financiero
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-blue-600" />
              <label className="text-sm font-medium text-blue-900">Bancos Operativos</label>
            </div>
            <p className="text-2xl font-bold text-blue-600">{financialData.banks || '0'}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarIcon className="text-lg text-green-600" />
              <label className="text-sm font-medium text-green-900">Monto Total</label>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(financialData.banksAmount || '0')}
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DangerIcon className="text-lg text-orange-600" />
              <label className="text-sm font-medium text-orange-900">Peor Situación</label>
            </div>
            <p className="text-lg font-bold text-orange-600">
              {getSituationLabel(financialData.worstSituation || '1')}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <label className="text-sm font-medium text-purple-900">Comparación Mensual</label>
            </div>
            <p className="text-lg font-bold text-purple-600">
              {formatCurrency(financialData.monthlyComparison || '0')}
            </p>
          </div>
        </div>
      </div>

      {/* Bancos Operativos */}
      {financialData.operativeBanks && financialData.operativeBanks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Bancos Operativos
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Situación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {financialData.operativeBanks.map((bank, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{bank.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSituationColor(bank.situation)}`}>
                        {getSituationLabel(bank.situation)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bank.amount ? formatCurrency(bank.amount) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bank.type || 'UNKNOWN'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Historial de Deuda */}
      {historicalDebtChart.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolución de Deuda</h3>
          <p className="text-sm text-gray-500 mb-6">Historial de deuda en el sistema financiero</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalDebtChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="period" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                  formatter={(value: any) => [formatCurrency(value), 'Deuda']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#eb1034" 
                  strokeWidth={2}
                  dot={{ fill: '#eb1034', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Información Adicional */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Información Adicional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Cheques en 24 meses</label>
            <p className="text-gray-900 font-medium">{financialData.checks24m || '0'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Quiebras en 24 meses</label>
            <p className="text-gray-900 font-medium">{financialData.bankruptcy24m || '0'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Juicios en 24 meses</label>
            <p className="text-gray-900 font-medium">{financialData.lawsuits24m || '0'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Impagos en 6 meses</label>
            <p className="text-gray-900 font-medium">
              {financialData.nonPaid6m} ({formatCurrency(financialData.nonPaid6mAmount || '0')})
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">% Peor Situación</label>
            <p className="text-gray-900 font-medium">{financialData.worstSituationPercentage}%</p>
          </div>
          {financialData.ansesBenefits && (
            <div>
              <label className="text-sm text-gray-500">Beneficios ANSES</label>
              <p className="text-gray-900 font-medium">{financialData.ansesBenefits}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}