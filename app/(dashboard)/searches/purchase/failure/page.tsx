'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { XCircleIcon, ArrowLeftIcon, CreditCardIcon } from 'lucide-react'
import Link from 'next/link'

export default function PaymentFailurePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<{
    payment_id?: string
    status?: string
    external_reference?: string
    error?: string
  }>({})

  useEffect(() => {
    // Get payment details from URL params
    const details = {
      payment_id: searchParams.get('payment_id') || undefined,
      status: searchParams.get('status') || undefined,
      external_reference: searchParams.get('external_reference') || undefined,
      error: searchParams.get('error') || undefined,
    }
    setPaymentDetails(details)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-white to-red-50/30 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-rose-200/50 shadow-xl shadow-rose-200/20 p-8 text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <XCircleIcon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Pago no completado
            </h1>
            <p className="text-gray-600">
              Hubo un problema al procesar tu pago. No se realizó ningún cargo a tu cuenta.
            </p>
          </motion.div>

          {/* Error Details */}
          {(paymentDetails.payment_id || paymentDetails.error) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-6 text-left"
            >
              <h3 className="font-semibold text-rose-800 mb-2 flex items-center gap-2">
                <CreditCardIcon className="w-4 h-4" />
                Información del intento
              </h3>
              <div className="space-y-1 text-sm text-rose-700">
                {paymentDetails.payment_id && (
                  <div>ID de pago: <span className="font-mono">{paymentDetails.payment_id}</span></div>
                )}
                {paymentDetails.external_reference && (
                  <div>Referencia: <span className="font-mono">{paymentDetails.external_reference}</span></div>
                )}
                {paymentDetails.status && (
                  <div>Estado: <span className="capitalize">{paymentDetails.status}</span></div>
                )}
                {paymentDetails.error && (
                  <div>Error: <span className="text-rose-600">{paymentDetails.error}</span></div>
                )}
              </div>
            </motion.div>
          )}

          {/* Possible Causes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 text-left"
          >
            <h3 className="font-semibold text-blue-800 mb-2">Posibles causas:</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Fondos insuficientes</li>
              <li>• Datos de tarjeta incorrectos</li>
              <li>• Transacción cancelada por el usuario</li>
              <li>• Problemas de conexión</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <Link
              href="/searches/purchase"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <CreditCardIcon className="w-5 h-5" />
              Intentar nuevamente
            </Link>
            
            <Link
              href="/"
              className="w-full border border-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Volver al Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}