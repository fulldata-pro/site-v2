'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircleIcon, HomeIcon, Receipt } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-green-50/30 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl border border-emerald-200/50 shadow-xl shadow-emerald-200/20 p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircleIcon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Pago exitoso!
            </h1>
            <p className="text-gray-600">
              Tu compra se ha procesado correctamente. Los créditos han sido agregados a tu cuenta.
            </p>
          </motion.div>

          {/* Payment Details */}
          {paymentDetails.payment_id && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 text-left"
            >
              <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                Detalles del pago
              </h3>
              <div className="space-y-1 text-sm text-emerald-700">
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

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <Link
              href="/"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <HomeIcon className="w-5 h-5" />
              Ir al Dashboard
            </Link>
            
            <Link
              href="/searches/new"
              className="w-full border border-emerald-200 text-emerald-700 py-3 px-6 rounded-2xl font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Realizar nueva búsqueda
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}