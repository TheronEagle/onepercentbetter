import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { productId, productTitle, productPrice, productType } = await request.json()

    // Determine success and cancel URLs based on product type
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const successUrl = productType === 'COURSE' 
      ? `${baseUrl}/products/${productId}/learn?success=true`
      : `${baseUrl}/products/${productId}/download?success=true`
    const cancelUrl = `${baseUrl}/products/${productId}?canceled=true`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productTitle,
              description: `${productType === 'COURSE' ? 'Course' : 'Digital Product'}: ${productTitle}`,
            },
            unit_amount: Math.round(productPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        productId,
        userId,
        productType,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 