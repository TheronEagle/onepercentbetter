'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState<'ALL' | 'COURSE' | 'EBOOK' | 'PDF'>('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?published=true')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    if (filter === 'ALL') return true
    return product.type === filter
  })

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
        <div className="text-center">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover our comprehensive collection of courses and digital products
        </p>
        
        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {(['ALL', 'COURSE', 'EBOOK', 'PDF'] as const).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              onClick={() => setFilter(type)}
              className="capitalize"
            >
              {type === 'ALL' ? 'All Products' : getProductTypeLabel(type)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.thumbnail || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop'}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className={getProductTypeColor(product.type)}>
                  {getProductTypeLabel(product.type)}
                </Badge>
              </div>
              <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                ${product.price}
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl">{product.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                {product.type === 'COURSE' && (
                  <>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {product.modules?.length || 0} modules
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {product.enrollments?.length || 0} students
                    </div>
                  </>
                )}
                {product.type !== 'COURSE' && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {product.purchases?.length || 0} downloads
                  </div>
                )}
              </div>
              
              <Button className="w-full" asChild>
                <Link href={`/products/${product.id}`}>
                  {product.type === 'COURSE' ? 'Learn More' : 'View Details'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  )
}





