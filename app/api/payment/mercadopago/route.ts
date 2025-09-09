import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoService, PaymentData } from '@/services/mercadoPago'

export async function POST(request: NextRequest) {
  try {
    const paymentData: PaymentData = await request.json()

    // Validate required fields
    if (!paymentData.items || paymentData.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items provided' },
        { status: 400 }
      )
    }

    // Create payment preference
    const response = await MercadoPagoService.createPaymentPreference(paymentData)

    return NextResponse.json(response)
  } catch (error) {
    console.error('API Error creating MercadoPago preference:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    )
  }
}