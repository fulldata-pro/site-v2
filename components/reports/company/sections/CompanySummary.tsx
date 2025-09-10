'use client'

import React from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface CompanySummaryProps {
  summary: any
  scoreHistory: any[]
}

export default function CompanySummary({ summary, scoreHistory }: CompanySummaryProps) {
  const formatDate = (timestamp: number | string | null) => {
    if (!timestamp) return 'N/A'
    const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp
    return new Date(ts).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (!summary) {
    return (
      <div className="p-8">
        <p className="text-center text-gray-500">No hay información de resumen disponible</p>
      </div>
    )
  }

  const currentScore = scoreHistory.find(s => s.period === "0")?.value || "N/A"
  const scoreChartData = scoreHistory.map(item => ({
    period: `${item.period} meses`,
    score: parseInt(item.value)
  })).reverse()

  return (
    <div className="space-y-8">
      {/* Información General */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Información General
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Razón Social</label>
            <p className="text-gray-900 font-medium">{summary.rz || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">CUIT</label>
            <p className="text-gray-900 font-medium">{summary.taxId || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Tipo de Sociedad</label>
            <p className="text-gray-900 font-medium">{summary.societyType || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Actividad Principal</label>
            <p className="text-gray-900 font-medium">{summary.activity || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Actividad Secundaria</label>
            <p className="text-gray-500">{summary.activity2 || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Código CIIU</label>
            <p className="text-gray-900 font-medium">{summary.ciiu || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Empleados</label>
            <p className="text-gray-900 font-medium">{summary.employees || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Antigüedad</label>
            <p className="text-gray-900 font-medium">
              {summary.age ? `${summary.age} años` : 'N/A'}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Fecha de Inicio</label>
            <p className="text-gray-900 font-medium">{formatDate(summary.startDate)}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Fecha de Constitución</label>
            <p className="text-gray-500">{formatDate(summary.constitutionDate)}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Provincia</label>
            <p className="text-gray-900 font-medium">{summary.province || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Ciudad</label>
            <p className="text-gray-900 font-medium">{summary.city || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Código Postal</label>
            <p className="text-gray-500">{summary.cp || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Estado</label>
            <p className="text-gray-500">{summary.state || 'N/A'}</p>
          </div>
        </div>

        {/* Score Circle */}
        {currentScore !== "N/A" && (
          <div className="mt-8 flex justify-center">
            <div className="relative">
              <svg className="w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#eb1034"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(parseInt(currentScore) / 999) * 553} 553`}
                  strokeLinecap="round"
                  transform="rotate(-90 96 96)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm text-gray-500">Score Actual</span>
                <span className="text-4xl font-bold text-gray-900">{currentScore}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estado de la Empresa */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Estado de la Empresa
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Bancarizada:</span>
            {summary.isBanked ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Exportadora:</span>
            {summary.isExporter ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Proveedor del Estado:</span>
            {summary.stateSupplier === 'Si' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Cesación:</span>
            {summary.cessation ? (
              <span className="text-red-600 font-medium">Sí</span>
            ) : (
              <span className="text-green-600 font-medium">No</span>
            )}
          </div>
        </div>
      </div>

      {/* Score History */}
      {scoreChartData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Score</h3>
          <p className="text-sm text-gray-500 mb-6">Evolución del puntaje crediticio</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreChartData}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eb1034" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#eb1034" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="period" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  domain={[0, 999]}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#eb1034" 
                  strokeWidth={3}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

    </div>
  )
}