'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Eye,
  Star,
  Users,
  DollarSign,
  Calendar,
  Tag,
  Upload,
  Save,
  X
} from 'lucide-react'

export default function CoursesPage() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and launch your career in web development.',
      price: 99.99,
      originalPrice: 199.99,
      students: 234,
      rating: 4.8,
      status: 'published',
      category: 'Development',
      instructor: 'Sarah Johnson',
      lessons: 24,
      duration: '12 weeks',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master Python, statistics, machine learning, and data visualization. Start your journey in the exciting field of data science.',
      price: 149.99,
      originalPrice: 299.99,
      students: 156,
      rating: 4.9,
      status: 'published',
      category: 'Data Science',
      instructor: 'Dr. Michael Chen',
      lessons: 32,
      duration: '16 weeks',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      description: 'Learn SEO, social media marketing, content creation, and analytics. Grow your business or start a career in digital marketing.',
      price: 79.99,
      originalPrice: 159.99,
      students: 189,
      rating: 4.7,
      status: 'draft',
      category: 'Marketing',
      instructor: 'Emma Rodriguez',
      lessons: 18,
      duration: '8 weeks',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      createdAt: '2024-01-10'
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      description: 'Master the fundamentals of user interface and user experience design. Create beautiful, functional, and user-friendly designs.',
      price: 89.99,
      originalPrice: 179.99,
      students: 98,
      rating: 4.6,
      status: 'published',
      category: 'Design',
      instructor: 'Alex Thompson',
      lessons: 20,
      duration: '10 weeks',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      createdAt: '2024-01-08'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  const categories = ['all', 'Development', 'Data Science', 'Marketing', 'Design', 'Business', 'Personal Development']
  const statuses = ['all', 'published', 'draft', 'archived']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status: newStatus } : course
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Course Management</h1>
              <p className="text-white/70 font-medium">
                Manage your course catalog and create new courses
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
                onClick={() => setShowAddForm(true)}
                className="btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
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
                  placeholder="Search courses..."
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

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'published' ? 'bg-green-500/20 text-green-400' : 
                    course.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {course.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-sm font-semibold text-white">
                    ${course.price}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-3">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} students
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      {course.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-white/60 mb-4">
                    <Tag className="h-4 w-4 mr-1" />
                    {course.category} • {course.instructor}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <select
                      value={course.status}
                      onChange={(e) => handleStatusChange(course.id, e.target.value)}
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
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
              <p className="text-white/70 mb-4">Try adjusting your search or filters</p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Course
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Course Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-white/20 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Course</h2>
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
                  <label className="block text-white font-medium mb-2">Course Title</label>
                  <Input 
                    placeholder="Enter course title"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none">
                    <option value="" className="bg-slate-800">Select Category</option>
                    <option value="development" className="bg-slate-800">Development</option>
                    <option value="data-science" className="bg-slate-800">Data Science</option>
                    <option value="marketing" className="bg-slate-800">Marketing</option>
                    <option value="design" className="bg-slate-800">Design</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <Textarea 
                  placeholder="Enter course description"
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Price ($)</label>
                  <Input 
                    type="number"
                    placeholder="99.99"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Original Price ($)</label>
                  <Input 
                    type="number"
                    placeholder="199.99"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Number of Lessons</label>
                  <Input 
                    type="number"
                    placeholder="24"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Duration</label>
                  <Input 
                    placeholder="12 weeks"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Instructor</label>
                  <Input 
                    placeholder="Instructor name"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Thumbnail Image</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-white/50 mx-auto mb-2" />
                  <p className="text-white/70">Click to upload or drag and drop</p>
                  <p className="text-white/50 text-sm">PNG, JPG up to 10MB</p>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4">
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
                  Create Course
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


