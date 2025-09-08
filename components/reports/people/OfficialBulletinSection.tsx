import React from 'react'
import { OfficialBolletinData } from '@/lib/types/people_types'
import { DocumentIcon } from '@/components/icons/Document-icon'
import { DangerIcon } from '@/components/icons/danger-icon'
import { PeopleIcon } from '@/components/icons/People-icon'
import { PinIcon } from '@/components/icons/Pin-icon'
import { PhoneIcon } from '@/components/icons/Phone-icon'
import { Scale } from 'lucide-react'

interface OfficialBulletinSectionProps {
  bulletinData: OfficialBolletinData
}

export default function OfficialBulletinSection({ bulletinData }: OfficialBulletinSectionProps) {
  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const isEmpty = (
    (!bulletinData.bulletin || bulletinData.bulletin.length === 0) &&
    (!bulletinData.embargoes || bulletinData.embargoes.length === 0) &&
    (!bulletinData.participationSocietal || bulletinData.participationSocietal.length === 0) &&
    (!bulletinData.trialsActor || bulletinData.trialsActor.length === 0) &&
    (!bulletinData.trialsDefendant || bulletinData.trialsDefendant.length === 0)
  )

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <DocumentIcon className="text-6xl text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">Sin información en Boletín Oficial</p>
        <p className="text-gray-400 text-sm mt-2">No se encontraron registros en el boletín oficial</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Boletines */}
      {bulletinData.bulletin && bulletinData.bulletin.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Publicaciones en Boletín Oficial ({bulletinData.bulletin.length})
          </h3>
          <div className="space-y-4">
            {bulletinData.bulletin.map((item, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <DocumentIcon className="text-lg text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{item.rz}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-gray-500">Fuente:</label>
                        <p className="text-gray-900 font-medium">{item.source}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha:</label>
                        <p className="text-gray-900 font-medium">{formatDate(item.date)}</p>
                      </div>
                    </div>
                    {item.report && (
                      <div className="mt-3">
                        <label className="text-gray-500">Reporte:</label>
                        <p className="text-gray-900 mt-1">{item.report}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Embargos */}
      {bulletinData.embargoes && bulletinData.embargoes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Embargos ({bulletinData.embargoes.length})
          </h3>
          <div className="space-y-4">
            {bulletinData.embargoes.map((embargo, idx) => (
              <div key={idx} className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <DangerIcon className="text-lg text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Embargo
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-gray-500">Número de expediente:</label>
                        <p className="text-gray-900 font-medium">{embargo.jobNumber}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha:</label>
                        <p className="text-gray-900 font-medium">{formatDate(embargo.date)}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha del expediente:</label>
                        <p className="text-gray-900 font-medium">{formatDate(embargo.jobDate)}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha de levantamiento:</label>
                        <p className="text-gray-900 font-medium">{formatDate(embargo.liftingDate)}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Carátula:</label>
                        <p className="text-gray-900 font-medium">{embargo.cover}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Juzgado:</label>
                        <p className="text-gray-900 font-medium">{embargo.court}</p>
                      </div>
                    </div>
                    {embargo.proceedings && (
                      <div className="mt-3">
                        <label className="text-gray-500">Autos:</label>
                        <p className="text-gray-900 mt-1">{embargo.proceedings}</p>
                      </div>
                    )}
                    {(embargo.adress || embargo.phone) && (
                      <div className="mt-3 flex flex-col gap-2">
                        {embargo.adress && (
                          <div className="flex items-center gap-2">
                            <PinIcon className="text-base text-gray-400" />
                            <span className="text-sm text-gray-900">{embargo.adress}</span>
                          </div>
                        )}
                        {embargo.phone && (
                          <div className="flex items-center gap-2">
                            <PhoneIcon className="text-base text-gray-400" />
                            <span className="text-sm text-gray-900">{embargo.phone}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Participación Societaria */}
      {bulletinData.participationSocietal && bulletinData.participationSocietal.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Participación Societaria ({bulletinData.participationSocietal.length})
          </h3>
          <div className="space-y-4">
            {bulletinData.participationSocietal.map((participation, idx) => (
              <div key={idx} className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <PeopleIcon className="text-lg text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{participation.rz}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-gray-500">Cargo:</label>
                        <p className="text-gray-900 font-medium">{participation.charge}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fuente:</label>
                        <p className="text-gray-900 font-medium">{participation.source}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha de publicación:</label>
                        <p className="text-gray-900 font-medium">{formatDate(participation.publishDate)}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha de constitución:</label>
                        <p className="text-gray-900 font-medium">{formatDate(participation.constitutionDate)}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Expediente:</label>
                        <p className="text-gray-900 font-medium">{participation.file}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Boletín ID:</label>
                        <p className="text-gray-900 font-medium">{participation.bulletinId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Juicios como Actor */}
      {bulletinData.trialsActor && bulletinData.trialsActor.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Juicios como Actor ({bulletinData.trialsActor.length})
          </h3>
          <div className="space-y-4">
            {bulletinData.trialsActor.map((trial, idx) => (
              <div key={idx} className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <label className="text-gray-500">Demandado:</label>
                        <p className="text-gray-900 font-medium">{trial.defendant}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Rol:</label>
                        <p className="text-gray-900 font-medium">{trial.rol}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha:</label>
                        <p className="text-gray-900 font-medium">{formatDate(trial.date)}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Provincia:</label>
                        <p className="text-gray-900 font-medium">{trial.province}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Juzgado:</label>
                        <p className="text-gray-900 font-medium">{trial.court}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Objeto:</label>
                        <p className="text-gray-900 font-medium">{trial.object}</p>
                      </div>
                    </div>
                    {trial.proceedings && (
                      <div className="mb-2">
                        <label className="text-gray-500">Autos:</label>
                        <p className="text-gray-900 mt-1">{trial.proceedings}</p>
                      </div>
                    )}
                    {trial.text && (
                      <div>
                        <label className="text-gray-500">Detalle:</label>
                        <p className="text-gray-900 mt-1">{trial.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Juicios como Demandado */}
      {bulletinData.trialsDefendant && bulletinData.trialsDefendant.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-red-500 inline-block">
            Juicios como Demandado ({bulletinData.trialsDefendant.length})
          </h3>
          <div className="space-y-4">
            {bulletinData.trialsDefendant.map((trial, idx) => (
              <div key={idx} className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <label className="text-gray-500">Actor:</label>
                        <p className="text-gray-900 font-medium">{trial.actor}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Rol:</label>
                        <p className="text-gray-900 font-medium">{trial.rol}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Fecha:</label>
                        <p className="text-gray-900 font-medium">{formatDate(trial.date)}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Provincia:</label>
                        <p className="text-gray-900 font-medium">{trial.province}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Juzgado:</label>
                        <p className="text-gray-900 font-medium">{trial.court}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">Objeto:</label>
                        <p className="text-gray-900 font-medium">{trial.object}</p>
                      </div>
                    </div>
                    {trial.proceedings && (
                      <div className="mb-2">
                        <label className="text-gray-500">Autos:</label>
                        <p className="text-gray-900 mt-1">{trial.proceedings}</p>
                      </div>
                    )}
                    {trial.text && (
                      <div>
                        <label className="text-gray-500">Detalle:</label>
                        <p className="text-gray-900 mt-1">{trial.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}