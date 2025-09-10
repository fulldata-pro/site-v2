'use client'

import React from 'react'
import { Phone, Mail } from 'lucide-react'

interface CompanyContactSectionProps {
  contactData: any
}

export default function CompanyContactSection({ contactData }: CompanyContactSectionProps) {
  const hasEmails = contactData?.email && contactData.email.length > 0
  const hasPhones = contactData?.phones && contactData.phones.length > 0
  
  if (!hasEmails && !hasPhones) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-2xl">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Información de Contacto</h2>
            <p className="text-slate-600">No hay información de contacto disponible</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Emails */}
      {hasEmails && (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Correos Electrónicos</h2>
              <p className="text-slate-600">{contactData.email.length} email{contactData.email.length !== 1 ? 's' : ''} registrado{contactData.email.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactData.email.map((email: string, index: number) => (
              <div key={index} className="p-4 bg-slate-50 rounded-xl">
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium break-all">{email}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phones */}
      {hasPhones && (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg shadow-slate-200/20 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-purple-50 rounded-2xl">
              <Phone className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Teléfonos</h2>
              <p className="text-slate-600">{contactData.phones.length} teléfono{contactData.phones.length !== 1 ? 's' : ''} registrado{contactData.phones.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactData.phones.map((phone: any, index: number) => {
              // Handle both phone objects and string phones
              const phoneNumber = typeof phone === 'string' 
                ? phone 
                : phone.phoneNumber 
                  ? `${phone.code ? `(${phone.code}) ` : ''}${phone.phoneNumber}`
                  : 'Número no disponible'
              
              return (
                <div key={index} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{phoneNumber}</p>
                      {typeof phone === 'object' && (
                        <>
                          {phone.operator && (
                            <p className="text-sm text-slate-600 mt-1">
                              Operador: {phone.operator}
                            </p>
                          )}
                          {phone.wsp && (
                            <p className="text-xs text-green-600 mt-1">
                              ✓ WhatsApp disponible
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}