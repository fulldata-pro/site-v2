import React from 'react'
import { ContactData } from '@/lib/types/people_types'
import { PhoneIcon } from '@/components/icons/Phone-icon'
import { SmsIcon } from '@/components/icons/Sms-icon'
import { Mail } from 'lucide-react'

interface ContactSectionProps {
  contactData: ContactData
}

export default function ContactSection({ contactData }: ContactSectionProps) {
  return (
    <div className="space-y-8">
      {/* Teléfonos */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <PhoneIcon className="text-lg text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Teléfonos ({contactData.phones?.length || 0})
          </h3>
        </div>
        
        {!contactData.phones || contactData.phones.length === 0 ? (
          <p className="text-gray-500">No se encontraron teléfonos registrados.</p>
        ) : (
          <div className="space-y-3">
            {contactData.phones.map((phone, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <PhoneIcon className="text-base text-gray-400" />
                <div className="flex-1">
                  <span className="text-gray-900 font-medium">
                    {phone.code ? `${phone.code}-${phone.phoneNumber}` : phone.phoneNumber}
                  </span>
                  {phone.operator && (
                    <span className="ml-2 text-sm text-gray-500">({phone.operator})</span>
                  )}
                </div>
                {phone.wsp && (
                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs">
                    <SmsIcon className="text-xs" />
                    <span>WhatsApp</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emails */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Emails ({contactData.emails?.length || 0})
          </h3>
        </div>
        
        {!contactData.emails || contactData.emails.length === 0 ? (
          <p className="text-gray-500">No se encontraron emails registrados.</p>
        ) : (
          <div className="space-y-3">
            {contactData.emails.map((email, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">{email}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}