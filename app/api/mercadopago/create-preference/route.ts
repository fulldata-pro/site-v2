import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoService, PaymentData } from '@/services/mercadoPago'

export async function POST(request: NextRequest) {
  try {
    const body: PaymentData = await request.json()
    
    console.log('Received payment request:', JSON.stringify(body, null, 2))
    
    // Validate required fields
    if (!body.items || body.items.length === 0) {
      console.error('Validation error: Items are required')
      return NextResponse.json(
        { success: false, error: 'Items are required' },
        { status: 400 }
      )
    }

    // Validate items have required fields
    for (const item of body.items) {
      if (!item.title || !item.unit_price || !item.quantity) {
        console.error('Validation error: Item missing required fields:', item)
        return NextResponse.json(
          { success: false, error: 'Items must have title, unit_price, and quantity' },
          { status: 400 }
        )
      }
    }

    console.log('Creating MercadoPago preference...')
    
    // Create payment preference
    const result = await MercadoPagoService.createPaymentPreference(body)

    console.log('MercadoPago result:', result)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      console.error('MercadoPago error:', result.error)
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}