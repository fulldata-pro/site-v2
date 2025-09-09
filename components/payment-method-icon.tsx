'use client'

import { PaymentMethod } from '@/lib/constants'
import Image from 'next/image'

interface PaymentMethodIconProps {
  method: PaymentMethod
  size?: number
  className?: string
}

interface PaymentMethodConfig {
  id: string
  name: string
  image: string
  alt: string
}

const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: PaymentMethod.MERCADO_PAGO,
    name: 'Mercado Pago',
    image: '/images/paymentBrands/mercado_pago.svg',
    alt: 'Mercado Pago'
  },
  {
    id: PaymentMethod.STRIPE,
    name: 'Stripe',
    image: '/images/paymentBrands/stripe.svg',
    alt: 'Stripe'
  }
]

export function PaymentMethodIcon({ method, size = 24, className = '' }: PaymentMethodIconProps) {
  const paymentMethod = PAYMENT_METHODS.find(pm =>
    pm.id.toLowerCase() === method.toLowerCase() ||
    pm.name.toLowerCase() === method.toLowerCase()
  )

  if (!paymentMethod) {
    // Fallback for unknown payment methods
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border border-gray-200 rounded ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-xs text-gray-500 font-medium">
          {method.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={paymentMethod.image}
        alt={paymentMethod.alt}
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  )
}

// Helper function to get payment method config
export function getPaymentMethodConfig(method: string): PaymentMethodConfig | undefined {
  return PAYMENT_METHODS.find(pm =>
    pm.id.toLowerCase() === method.toLowerCase() ||
    pm.name.toLowerCase() === method.toLowerCase()
  )
}

// Export the payment methods array for use in other components
export { PAYMENT_METHODS }