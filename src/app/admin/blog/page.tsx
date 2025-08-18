'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  User,
  Tag,
  Upload,
  Save,
  X,
  Image,
  Link as LinkIcon,
  Share2,
  BarChart3
} from 'lucide-react'

export default function BlogPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'The Power of 1% Improvements',
      excerpt: 'Discover how small, consistent improvements can lead to massive results over time. Learn the science behind incremental progress and how to apply it to your life.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Sarah Johnson',
      category: 'Personal Development',
      tags: ['productivity', 'growth', 'mindset'],
      status: 'published',
      views: 1247,
      likes: 89,
      comments: 23,
      featured: true,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      publishedAt: '2024-01-15',
      createdAt: '2024-01-10',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Mastering Web Development in 2024',
      excerpt: 'A comprehensive guide to the latest web development technologies, frameworks, and best practices for building modern web applications.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Mike Chen',
      category: 'Development',
      tags: ['web development', 'javascript', 'react'],
      status: 'published',
      views: 892,
      likes: 67,
      comments: 15,
      featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      publishedAt: '2024-01-12',
      createdAt: '2024-01-08',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Data Science Career Guide',
      excerpt: 'Everything you need to know about starting and advancing your career in data science, from skills to job opportunities.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Dr. Emily Rodriguez',
      category: 'Data Science',
      tags: ['data science', 'career', 'python'],
      status: 'draft',
      views: 0,
      likes: 0,
      comments: 0,
      featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      publishedAt: null,
      createdAt: '2024-01-10',
      readTime: '12 min read'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategies That Work',
      excerpt: 'Learn proven digital marketing strategies that can help you grow your business and reach more customers online.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
      author: 'Alex Thompson',
      category: 'Marketing',
      tags: ['marketing', 'seo', 'social media'],
      status: 'published',
      views: 567,
      likes: 34,
      comments: 8,
      featured: false,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      publishedAt: '2024-01-08',
      createdAt: '2024-01-05',
      readTime: '6 min read'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)

  const categories = ['all', 'Personal Development', 'Development', 'Data Science', 'Marketing', 'Design', 'Business']
  const statuses = ['all', 'published', 'draft', 'archived']

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: newStatus } : post
    ))
  }

  const handleFeaturedToggle = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ))
  }

  const handleEditPost = (post: any) => {
    setSelectedPost(post)
    setShowAddForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
              <p className="text-white/70 font-medium">
                Create and manage your blog content
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
                  setSelectedPost(null)
                  setShowAddForm(true)
                }}
                className="btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search posts..."
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
                  setSelectedStatus('all')
                }}
                variant="outline"
                className="btn-haptic border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={post.thumbnail} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {post.featured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published' ? 'bg-green-500/20 text-green-400' : 
                    post.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {post.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-sm font-semibold text-white">
                    {post.readTime}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-3 mb-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.publishedAt || post.createdAt}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views} views
                    </span>
                    <span className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      {post.likes} likes
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-white/60 mb-4">
                    <Tag className="h-4 w-4 mr-1" />
                    {post.category}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, index) => (
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
                      onClick={() => handleEditPost(post)}
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
                        post.featured 
                          ? 'border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10' 
                          : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                      onClick={() => handleFeaturedToggle(post.id)}
                    >
                      {post.featured ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </Button>
                    
                    <select
                      value={post.status}
                      onChange={(e) => handleStatusChange(post.id, e.target.value)}
                      className="bg-white/10 border border-white/20 text-white rounded px-2 py-1 text-xs focus:border-orange-500 focus:outline-none"
                    >
                      <option value="draft" className="bg-slate-800">Draft</option>
                      <option value="published" className="bg-slate-800">Published</option>
                      <option value="archived" className="bg-slate-800">Archived</option>
                    </select>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="btn-haptic border-red-500/20 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No blog posts found</h3>
              <p className="text-white/70 mb-4">Try adjusting your search or filters</p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Post Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-white/20 rounded-2xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedPost ? 'Edit Post' : 'Add New Post'}
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
                  <label className="block text-white font-medium mb-2">Post Title</label>
                  <Input 
                    placeholder="Enter post title"
                    defaultValue={selectedPost?.title || ''}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none">
                    <option value="" className="bg-slate-800">Select Category</option>
                    <option value="personal-development" className="bg-slate-800">Personal Development</option>
                    <option value="development" className="bg-slate-800">Development</option>
                    <option value="data-science" className="bg-slate-800">Data Science</option>
                    <option value="marketing" className="bg-slate-800">Marketing</option>
                    <option value="design" className="bg-slate-800">Design</option>
                    <option value="business" className="bg-slate-800">Business</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Excerpt</label>
                <Textarea 
                  placeholder="Enter post excerpt"
                  defaultValue={selectedPost?.excerpt || ''}
                  rows={3}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Content</label>
                <Textarea 
                  placeholder="Write your post content here..."
                  defaultValue={selectedPost?.content || ''}
                  rows={12}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Author</label>
                  <Input 
                    placeholder="Author name"
                    defaultValue={selectedPost?.author || ''}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Tags</label>
                  <Input 
                    placeholder="tag1, tag2, tag3"
                    defaultValue={selectedPost?.tags?.join(', ') || ''}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Read Time</label>
                  <Input 
                    placeholder="5 min read"
                    defaultValue={selectedPost?.readTime || ''}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-white/50 mx-auto mb-2" />
                  <p className="text-white/70">Click to upload or drag and drop</p>
                  <p className="text-white/50 text-sm">PNG, JPG up to 10MB</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-white">
                    <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                    <span>Featured Post</span>
                  </label>
                  <label className="flex items-center space-x-2 text-white">
                    <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                    <span>Allow Comments</span>
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
                    {selectedPost ? 'Update Post' : 'Create Post'}
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

