'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import { loadStripe } from '@stripe/stripe-js'
import { Play, Download, BookOpen, Clock, Star, Users, CheckCircle } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  thumbnail: string
  type: 'COURSE' | 'EBOOK' | 'PDF'
  isPublished: boolean
  modules?: any[]
  enrollments?: any[]
  purchases?: any[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [hasPurchased, setHasPurchased] = useState(false)

  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  const checkUserAccess = useCallback(async () => {
    try {
      const response = await fetch(`/api/progress?productId=${params.id}`)
      const data = await response.json()
      
      if (product?.type === 'COURSE') {
        setIsEnrolled(data.length > 0)
      } else {
        setHasPurchased(data.length > 0)
      }
    } catch (error) {
      console.error('Error checking user access:', error)
    }
  }, [params.id, product?.type])

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      const data = await response.json()
      setProduct(data)
      
      // Check if user is enrolled or has purchased
      if (user) {
        checkUserAccess()
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id, user, checkUserAccess])

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id, fetchProduct])

  const handlePurchase = async () => {
    if (!user) {
      // Redirect to sign in
      window.location.href = '/auth/signin'
      return
    }

    setPurchasing(true)
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product?.id,
          productTitle: product?.title,
          productPrice: product?.price,
          productType: product?.type,
        }),
      })

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setPurchasing(false)
    }
  }

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'COURSE': return 'Course'
      case 'EBOOK': return 'E-Book'
      case 'PDF': return 'PDF'
      default: return type
    }
  }

  const getProductTypeColor = (type: string) => {
    switch (type) {
      case 'COURSE': return 'bg-blue-100 text-blue-800'
      case 'EBOOK': return 'bg-green-100 text-green-800'
      case 'PDF': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success/Cancel messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Payment successful! You now have access to this {product.type.toLowerCase()}.
        </div>
      )}
      
      {canceled && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          Payment was canceled. You can try again anytime.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Badge className={getProductTypeColor(product.type)}>
                {getProductTypeLabel(product.type)}
              </Badge>
              <span className="text-2xl font-bold">${product.price}</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{product.description}</p>
          </div>

          {/* Course modules */}
          {product.type === 'COURSE' && product.modules && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div className="space-y-4">
                {product.modules.map((module, index) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Module {index + 1}: {module.title}</span>
                        <span className="text-sm text-gray-500">
                          {module.lessons?.length || 0} lessons
                        </span>
                      </CardTitle>
                      {module.description && (
                        <CardDescription>{module.description}</CardDescription>
                      )}
                    </CardHeader>
                    {module.lessons && module.lessons.length > 0 && (
                      <CardContent>
                        <div className="space-y-2">
                          {module.lessons.map((lesson: any, lessonIndex: number) => (
                            <div key={lesson.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                              <div className="flex items-center">
                                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs mr-3">
                                  {lessonIndex + 1}
                                </span>
                                <span>{lesson.title}</span>
                              </div>
                              {lesson.duration && (
                                <span className="text-sm text-gray-500">
                                  {lesson.duration} min
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* E-book/PDF details */}
          {product.type !== 'COURSE' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What you'll get</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Instant download after purchase
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Lifetime access
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      High-quality digital format
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-2xl">${product.price}</CardTitle>
              <CardDescription>
                {product.type === 'COURSE' ? 'One-time payment' : 'Instant download'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.type === 'COURSE' ? (
                <>
                  {isEnrolled ? (
                    <Button className="w-full" asChild>
                      <a href={`/products/${product.id}/learn`}>
                        Continue Learning
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={handlePurchase}
                      disabled={purchasing}
                    >
                      {purchasing ? 'Processing...' : 'Enroll Now'}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {hasPurchased ? (
                    <Button className="w-full" asChild>
                      <a href={`/products/${product.id}/download`}>
                        Download Again
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={handlePurchase}
                      disabled={purchasing}
                    >
                      {purchasing ? 'Processing...' : 'Buy Now'}
                    </Button>
                  )}
                </>
              )}

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure payment with Stripe
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  30-day money-back guarantee
                </div>
                {product.type === 'COURSE' && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Lifetime access
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}



