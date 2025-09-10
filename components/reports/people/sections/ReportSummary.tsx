import React from 'react'
import { SummaryData, Score, SocioeconomicLevel } from '@/lib/types/people_types'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ReportSummaryProps {
  summary: SummaryData
  scoreHistory: Score[]
}

export default function ReportSummary({ summary, scoreHistory }: ReportSummaryProps) {
  const getSocioeconomicLevelInfo = (level: string) => {
    const levels = {
      'A': { label: 'Ingresos elevados, educación universitaria, ocupaciones profesionales.', color: '#1e40af' },
      'B': { label: 'Clase media alta, ingresos sólidos, educación universitaria o técnica.', color: '#2563eb' },
      'C1': { label: 'Clase media, ingresos moderados, educación secundaria completa.', color: '#3b82f6' },
      'C2': { label: 'Clase media baja, ingresos ajustados, educación secundaria completa.', color: '#60a5fa' },
      'C3': { label: 'Clase media baja, ingresos ligeramente más bajos.', color: '#93bbfc' },
      'D1': { label: 'Ingresos bajos, educación básica, ocupaciones manuales.', color: '#cbd5e1' },
      'D2': { label: 'Ingresos bajos, educación básica, ocupaciones manuales o de servicios.', color: '#e2e8f0' },
      'E': { label: 'Ingresos muy bajos, educación limitada.', color: '#f1f5f9' }
    }
    return levels[level as keyof typeof levels] || levels['C2']
  }

  const formatDate = (timestamp: number | { $numberLong: string }) => {
    if (!timestamp) return 'N/A'
    
    let date: Date
    if (typeof timestamp === 'object' && '$numberLong' in timestamp) {
      date = new Date(parseInt(timestamp.$numberLong))
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp)
    } else {
      return 'N/A'
    }
    
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const currentScore = scoreHistory.find(s => s.period === "0")?.value || "N/A"
  const scoreChartData = scoreHistory.map(item => ({
    period: `${item.period} meses`,
    score: parseInt(item.value)
  })).reverse()

  return (
    <div className="space-y-8">
      {/* Información Básica */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
          Información Básica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Nombre</label>
            <p className="text-gray-900 font-medium">{summary.firstName || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Apellido</label>
            <p className="text-gray-900 font-medium">{summary.lastName || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">DNI</label>
            <p className="text-gray-900 font-medium">
              {summary.nationalId} 
              {summary.nationalIdVersion && (
                <span className="text-sm text-gray-500 ml-2">[Ejemplar {summary.nationalIdVersion}]</span>
              )}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">CUIT/CUIL</label>
            <p className="text-gray-900 font-medium">{summary.taxId}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Edad</label>
            <p className="text-gray-900 font-medium">{summary.age} años</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Sexo</label>
            <p className="text-gray-900 font-medium">
              {summary.sex === 'M' ? 'Masculino' : summary.sex === 'F' ? 'Femenino' : summary.sex}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Estado Civil</label>
            <p className="text-gray-500">{summary.maritalStatus || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Nacionalidad</label>
            <p className="text-gray-500">{summary.nationality || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Fecha de Nacimiento</label>
            <p className="text-gray-900 font-medium">{formatDate(summary.birthDate)}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Fecha de Fallecimiento</label>
            <p className="text-gray-500">{summary.deathDate ? formatDate(summary.deathDate) : 'N/A'}</p>
          </div>
        </div>

        {/* Score Circle */}
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

      {/* Nivel Socioeconómico */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nivel Socioeconómico</h3>
        <p className="text-sm text-gray-500 mb-6">Clasificación según ingresos y educación</p>
        
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="text-4xl font-bold bg-gray-800 text-white w-20 h-20 rounded-full flex items-center justify-center">
              {summary.socioeconomicLevel || 'N/A'}
            </div>
          </div>
          
          {/* Level descriptions */}
          <div className="mt-8 space-y-2">
            {['A', 'B', 'C1', 'C2', 'C3', 'D1', 'D2', 'E'].map((level) => {
              const info = getSocioeconomicLevelInfo(level)
              const isActive = level === summary.socioeconomicLevel
              return (
                <div 
                  key={level} 
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-red-50 border border-red-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-[60px]">
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        isActive ? 'bg-red-500' : 'bg-gray-300'
                      }`} 
                    />
                    <span className={`font-semibold ${isActive ? 'text-red-600' : 'text-gray-600'}`}>
                      {level}
                    </span>
                  </div>
                  <p className={`text-sm ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {info.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}