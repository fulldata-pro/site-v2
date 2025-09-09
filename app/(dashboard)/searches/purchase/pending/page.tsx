'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ClockIcon, RefreshCwIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'

export default function PaymentPendingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<{
    payment_id?: string
    status?: string
    external_reference?: string
    merchant_order_id?: string
  }>({})

  useEffect(() => {
    // Get payment details from URL params
    const details = {
      payment_id: searchParams.get('payment_id') || undefined,
      status: searchParams.get('status') || undefined,
      external_reference: searchParams.get('external_reference') || undefined,
      merchant_order_id: searchParams.get('merchant_order_id') || undefined,
    }
    setPaymentDetails(details)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/30 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-amber-200/50 shadow-xl shadow-amber-200/20 p-8 text-center">
          {/* Pending Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200,
              rotate: { duration: 1, ease: "easeInOut" }
            }}
            className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <ClockIcon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Pending Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Pago pendiente
            </h1>
            <p className="text-gray-600">
              Tu pago está siendo procesado. Te notificaremos cuando se confirme la transacción.
            </p>
          </motion.div>

          {/* Payment Details */}
          {paymentDetails.payment_id && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-left"
            >
              <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <RefreshCwIcon className="w-4 h-4" />
                Detalles del pago
              </h3>
              <div className="space-y-1 text-sm text-amber-700">
                <div>ID de pago: <span className="font-mono">{paymentDetails.payment_id}</span></div>
                {paymentDetails.external_reference && (
                  <div>Referencia: <span className="font-mono">{paymentDetails.external_reference}</span></div>
                )}
                {paymentDetails.status && (
                  <div>Estado: <span className="capitalize">{paymentDetails.status}</span></div>
                )}
              </div>
            </motion.div>
          )}

          {/* Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 text-left"
          >
            <h3 className="font-semibold text-blue-800 mb-2">¿Qué sigue?</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Recibirás un email de confirmación</li>
              <li>• Los créditos se agregarán a tu cuenta automáticamente</li>
              <li>• Puedes verificar el estado en tu historial</li>
              <li>• El proceso puede tomar algunos minutos</li>
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
              href="/"
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-amber-700 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <HomeIcon className="w-5 h-5" />
              Ir al Dashboard
            </Link>
            
            <Link
              href="/searches/history"
              className="w-full border border-amber-200 text-amber-700 py-3 px-6 rounded-2xl font-semibold hover:bg-amber-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Ver historial de compras
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}