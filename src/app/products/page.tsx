
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, Star, Clock, Users, DollarSign } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  difficulty: string
  duration: string
  rating: number
  students: number
  image: string
  features: string[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Sample products data - replace with API call
  const sampleProducts: Product[] = [
    {
      id: '1',
      title: 'Advanced React Development',
      description: 'Master React with hooks, context, and advanced patterns',
      price: 299,
      category: 'Programming',
      difficulty: 'Advanced',
      duration: '8 weeks',
      rating: 4.8,
      students: 1250,
      image: '/api/placeholder/400/300',
      features: ['React Hooks', 'Context API', 'Performance Optimization', 'Testing']
    },
    {
      id: '2',
      title: 'Node.js Backend Mastery',
      description: 'Build scalable backend applications with Node.js',
      price: 249,
      category: 'Programming',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      rating: 4.7,
      students: 980,
      image: '/api/placeholder/400/300',
      features: ['Express.js', 'Database Design', 'API Development', 'Authentication']
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      description: 'Learn design principles and create stunning interfaces',
      price: 199,
      category: 'Design',
      difficulty: 'Beginner',
      duration: '4 weeks',
      rating: 4.9,
      students: 2100,
      image: '/api/placeholder/400/300',
      features: ['Design Principles', 'Figma', 'Prototyping', 'User Research']
    },
    {
      id: '4',
      title: 'Data Science with Python',
      description: 'Analyze data and build machine learning models',
      price: 349,
      category: 'Data Science',
      difficulty: 'Intermediate',
      duration: '10 weeks',
      rating: 4.6,
      students: 750,
      image: '/api/placeholder/400/300',
      features: ['Python', 'Pandas', 'Machine Learning', 'Data Visualization']
    }
  ]

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        // Replace with actual API call
        // const response = await fetch('/api/products')
        // const data = await response.json()
        
        // For now, use sample data
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate loading
        setProducts(sampleProducts)
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    let filtered = Array.isArray(products) ? [...products] : []

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(product => product.difficulty === selectedDifficulty)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedDifficulty])

  const categories = ['all', 'Programming', 'Design', 'Data Science', 'Marketing']
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Premium Products
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover our exclusive collection of digital products designed to accelerate your learning journey
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-black text-white">
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty} className="bg-black text-white">
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-orange-500 text-white">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="border-white/20 text-white">
                        {product.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2 group-hover:text-orange-500 transition-colors">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-white/70 mb-4">
                    {product.description}
                  </CardDescription>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{product.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{product.duration}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/70">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 3 && (
                        <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                          +{product.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold text-white">{product.price}</span>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
