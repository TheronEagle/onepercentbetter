'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  File, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Eye,
  Download,
  DollarSign,
  ShoppingCart,
  Upload,
  Save,
  X,
  Image,
  Archive,
  Music,
  Video,
  Star,
  Users,
  Calendar,
  Tag
} from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Complete React Guide PDF',
      description: 'A comprehensive guide to React development covering hooks, context, state management, and best practices.',
      type: 'pdf',
      price: 29.99,
      originalPrice: 49.99,
      sales: 45,
      revenue: 1349.55,
      rating: 4.8,
      downloads: 42,
      status: 'active',
      category: 'Development',
      tags: ['react', 'javascript', 'frontend'],
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      fileSize: '2.4 MB',
      createdAt: '2024-01-15',
      featured: true
    },
    {
      id: 2,
      title: 'JavaScript Cheat Sheet',
      description: 'Quick reference guide for JavaScript syntax, methods, and common patterns.',
      type: 'pdf',
      price: 9.99,
      originalPrice: 19.99,
      sales: 123,
      revenue: 1228.77,
      rating: 4.6,
      downloads: 118,
      status: 'active',
      category: 'Development',
      tags: ['javascript', 'cheat-sheet', 'reference'],
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      fileSize: '1.2 MB',
      createdAt: '2024-01-12',
      featured: false
    },
    {
      id: 3,
      title: 'Design System Templates',
      description: 'Complete design system with components, icons, and style guides for modern web applications.',
      type: 'archive',
      price: 49.99,
      originalPrice: 99.99,
      sales: 23,
      revenue: 1149.77,
      rating: 4.9,
      downloads: 20,
      status: 'active',
      category: 'Design',
      tags: ['design-system', 'ui', 'components'],
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      fileSize: '15.7 MB',
      createdAt: '2024-01-10',
      featured: true
    },
    {
      id: 4,
      title: 'Data Science Project Templates',
      description: 'Ready-to-use Jupyter notebooks and project structures for data science workflows.',
      type: 'archive',
      price: 39.99,
      originalPrice: 79.99,
      sales: 18,
      revenue: 719.82,
      rating: 4.7,
      downloads: 15,
      status: 'draft',
      category: 'Data Science',
      tags: ['data-science', 'python', 'jupyter'],
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      fileSize: '8.3 MB',
      createdAt: '2024-01-08',
      featured: false
    },
    {
      id: 5,
      title: 'Marketing Strategy Playbook',
      description: 'Comprehensive marketing strategies and templates for digital marketing campaigns.',
      type: 'pdf',
      price: 24.99,
      originalPrice: 39.99,
      sales: 67,
      revenue: 1674.33,
      rating: 4.5,
      downloads: 62,
      status: 'active',
      category: 'Marketing',
      tags: ['marketing', 'strategy', 'campaigns'],
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      fileSize: '3.1 MB',
      createdAt: '2024-01-05',
      featured: false
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const categories = ['all', 'Development', 'Design', 'Data Science', 'Marketing', 'Business', 'Personal Development']
  const statuses = ['all', 'active', 'draft', 'archived']
  const types = ['all', 'pdf', 'archive', 'video', 'audio']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesType = selectedType === 'all' || product.type === selectedType
    
    return matchesSearch && matchesStatus && matchesCategory && matchesType
  })

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: newStatus } : product
    ))
  }

  const handleFeaturedToggle = (id: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, featured: !product.featured } : product
    ))
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setShowAddForm(true)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <File className="h-4 w-4 text-red-400" />
      case 'archive':
        return <Archive className="h-4 w-4 text-blue-400" />
      case 'video':
        return <Video className="h-4 w-4 text-purple-400" />
      case 'audio':
        return <Music className="h-4 w-4 text-green-400" />
      default:
        return <File className="h-4 w-4 text-gray-400" />
    }
  }

  const totalRevenue = products.reduce((sum, product) => sum + product.revenue, 0)
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0)
  const activeProducts = products.filter(product => product.status === 'active').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Digital Products</h1>
              <p className="text-white/70 font-medium">
                Manage your digital products and downloads
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
              >
                Back to Dashboard
              </Link>
              <Button 
                onClick={() => {
                  setSelectedProduct(null)
                  setShowAddForm(true)
                }}
                className="btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20 text-green-400">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 font-medium">Total Sales</p>
                  <p className="text-2xl font-bold text-white">{totalSales}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                  <ShoppingCart className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 font-medium">Active Products</p>
                  <p className="text-2xl font-bold text-white">{activeProducts}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                  <File className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none"
              >
                {types.map(type => (
                  <option key={type} value={type} className="bg-slate-800">
                    {type === 'all' ? 'All Types' : type.toUpperCase()}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status} className="bg-slate-800">
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedType('all')
                  setSelectedStatus('all')
                }}
                variant="outline"
                className="btn-haptic border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {product.featured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' ? 'bg-green-500/20 text-green-400' : 
                    product.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {product.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-sm font-semibold text-white">
                    ${product.price}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {getTypeIcon(product.type)}
                    <span className="text-xs text-white/50 uppercase">{product.type}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-3">{product.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                    <span className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {product.sales} sales
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      {product.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {product.downloads} downloads
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${product.revenue.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                    <span className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {product.category}
                    </span>
                    <span className="text-xs">
                      {product.fileSize}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="btn-haptic border-white/20 text-white hover:bg-white/10"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`btn-haptic ${
                        product.featured 
                          ? 'border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10' 
                          : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                      onClick={() => handleFeaturedToggle(product.id)}
                    >
                      <Star className="h-3 w-3" />
                    </Button>
                    
                    <select
                      value={product.status}
                      onChange={(e) => handleStatusChange(product.id, e.target.value)}
                      className="bg-white/10 border border-white/20 text-white rounded px-2 py-1 text-xs focus:border-orange-500 focus:outline-none"
                    >
                      <option value="draft" className="bg-slate-800">Draft</option>
                      <option value="active" className="bg-slate-800">Active</option>
                      <option value="archived" className="bg-slate-800">Archived</option>
                    </select>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="btn-haptic border-red-500/20 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-12 text-center">
              <File className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-white/70 mb-4">Try adjusting your search or filters</p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-white/20 rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <Button 
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="btn-haptic border-white/20 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Product Title</label>
                  <Input 
                    placeholder="Enter product title"
                    defaultValue={selectedProduct?.title || ''}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Product Type</label>
                  <select className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none">
                    <option value="" className="bg-slate-800">Select Type</option>
                    <option value="pdf" className="bg-slate-800">PDF</option>
                    <option value="archive" className="bg-slate-800">Archive (ZIP)</option>
                    <option value="video" className="bg-slate-800">Video</option>
                    <option value="audio" className="bg-slate-800">Audio</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <Textarea 
                  placeholder="Enter product description"
                  defaultValue={selectedProduct?.description || ''}
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Price ($)</label>
                  <Input 
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    defaultValue={selectedProduct?.price || ''}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Original Price ($)</label>
                  <Input 
                    type="number"
                    step="0.01"
                    placeholder="49.99"
                    defaultValue={selectedProduct?.originalPrice || ''}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none">
                    <option value="" className="bg-slate-800">Select Category</option>
                    <option value="development" className="bg-slate-800">Development</option>
                    <option value="design" className="bg-slate-800">Design</option>
                    <option value="data-science" className="bg-slate-800">Data Science</option>
                    <option value="marketing" className="bg-slate-800">Marketing</option>
                    <option value="business" className="bg-slate-800">Business</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Tags</label>
                <Input 
                  placeholder="tag1, tag2, tag3"
                  defaultValue={selectedProduct?.tags?.join(', ') || ''}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Product File</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-white/50 mx-auto mb-2" />
                  <p className="text-white/70">Click to upload or drag and drop</p>
                  <p className="text-white/50 text-sm">PDF, ZIP, MP4, MP3 up to 100MB</p>
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Thumbnail Image</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <Image className="h-8 w-8 text-white/50 mx-auto mb-2" />
                  <p className="text-white/70">Click to upload or drag and drop</p>
                  <p className="text-white/50 text-sm">PNG, JPG up to 10MB</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-white">
                    <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                    <span>Featured Product</span>
                  </label>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button 
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    variant="outline"
                    className="btn-haptic border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {selectedProduct ? 'Update Product' : 'Create Product'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


