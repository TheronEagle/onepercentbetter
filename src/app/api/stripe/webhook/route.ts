import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    try {
      const { productId, userId, productType } = session.metadata || {}
      
      if (!productId || !userId) {
        console.error('Missing productId or userId in session metadata')
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
      }

      const amount = session.amount_total ? session.amount_total / 100 : 0

      if (productType === 'COURSE') {
        // Create enrollment for courses
        await prisma.enrollment.upsert({
          where: {
            userId_productId: {
              userId,
              productId
            }
          },
          update: {},
          create: {
            userId,
            productId,
            enrolledAt: new Date()
          }
        })

        // Create order record
        await prisma.order.create({
          data: {
            userId,
            productId,
            amount,
            status: 'COMPLETED',
            stripeSessionId: session.id
          }
        })
      } else {
        // Create purchase record for e-books/PDFs
        await prisma.purchase.create({
          data: {
            userId,
            productId,
            amount,
            status: 'COMPLETED',
            stripeSessionId: session.id
          }
        })
      }

      console.log('Payment successful for session:', session.id)
      console.log('Product ID:', productId)
      console.log('User ID:', userId)
      console.log('Product Type:', productType)
      
    } catch (error) {
      console.error('Error processing webhook:', error)
      return NextResponse.json(
        { error: 'Failed to process webhook' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
} 