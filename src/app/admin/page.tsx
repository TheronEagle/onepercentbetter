
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  LogOut,
  FileText,
  MessageSquare,
  Download,
  Upload,
  Eye,
  BarChart3,
  Mail,
  Calendar,
  Star,
  ShoppingCart,
  CreditCard,
  File,
  Image,
  Video,
  Music,
  Archive
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// Dynamic import to handle cases where Clerk might not be available
let useUser: any = null
let useClerk: any = null

try {
  const clerkHooks = require('@clerk/nextjs')
  useUser = clerkHooks.useUser
  useClerk = clerkHooks.useClerk
} catch (error) {
  console.log('Clerk not available, using fallback')
}

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Check if Clerk is properly configured
  const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
                           process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder'

  // Use Clerk hooks if available and configured
  let clerkUser = null
  let clerkIsLoaded = false
  let signOut = null

  if (isClerkConfigured && useUser && useClerk) {
    try {
      const clerkUserData = useUser()
      clerkUser = clerkUserData.user
      clerkIsLoaded = clerkUserData.isLoaded
      signOut = useClerk().signOut
    } catch (error) {
      console.log('Error using Clerk hooks:', error)
    }
  }

  useEffect(() => {
    if (isClerkConfigured) {
      // Use Clerk authentication
      if (clerkIsLoaded) {
        if (!clerkUser) {
          router.push('/auth/signin?redirect=/admin')
          return
        }
        setUser(clerkUser)
        setIsAdmin(true)
        setIsLoaded(true)
      }
    } else {
      // Fallback for development when Clerk is not configured
      console.log('Clerk not configured, allowing admin access for development')
      setUser({ firstName: 'Admin', emailAddresses: [{ emailAddress: 'admin@1percentbetter.com' }] })
      setIsAdmin(true)
      setIsLoaded(true)
    }
  }, [clerkUser, clerkIsLoaded, router, isClerkConfigured])

  const handleSignOut = async () => {
    if (signOut) {
      await signOut()
    }
    router.push('/')
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading Admin Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white font-medium">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  // Mock data for analytics
  const analytics = {
    totalRevenue: 15420,
    monthlyRevenue: 3240,
    totalCourses: 12,
    totalUsers: 847,
    totalSales: 156,
    conversionRate: 3.2,
    averageRating: 4.8,
    activeUsers: 234
  }

  const recentSales = [
    { id: 1, course: 'Complete Web Development Bootcamp', user: 'john.doe@email.com', amount: 99.99, date: '2024-01-15', status: 'completed' },
    { id: 2, course: 'Data Science Fundamentals', user: 'sarah.smith@email.com', amount: 149.99, date: '2024-01-14', status: 'completed' },
    { id: 3, course: 'Digital Marketing Mastery', user: 'mike.johnson@email.com', amount: 79.99, date: '2024-01-13', status: 'pending' },
    { id: 4, course: 'UI/UX Design Principles', user: 'emma.wilson@email.com', amount: 89.99, date: '2024-01-12', status: 'completed' },
  ]

  const recentContacts = [
    { id: 1, name: 'Alex Thompson', email: 'alex@example.com', subject: 'Course Inquiry', message: 'I would like to know more about the web development course...', date: '2024-01-15', status: 'unread' },
    { id: 2, name: 'Maria Garcia', email: 'maria@example.com', subject: 'Technical Support', message: 'I\'m having trouble accessing the course materials...', date: '2024-01-14', status: 'read' },
    { id: 3, name: 'David Kim', email: 'david@example.com', subject: 'Refund Request', message: 'I would like to request a refund for the data science course...', date: '2024-01-13', status: 'replied' },
  ]

  const courses = [
    { id: 1, title: 'Complete Web Development Bootcamp', price: 99.99, students: 234, rating: 4.8, status: 'published', category: 'Development' },
    { id: 2, title: 'Data Science Fundamentals', price: 149.99, students: 156, rating: 4.9, status: 'published', category: 'Data Science' },
    { id: 3, title: 'Digital Marketing Mastery', price: 79.99, students: 189, rating: 4.7, status: 'draft', category: 'Marketing' },
    { id: 4, title: 'UI/UX Design Principles', price: 89.99, students: 98, rating: 4.6, status: 'published', category: 'Design' },
  ]

  const blogPosts = [
    { id: 1, title: 'The Power of 1% Improvements', status: 'published', views: 1247, date: '2024-01-15' },
    { id: 2, title: 'Mastering Web Development in 2024', status: 'published', views: 892, date: '2024-01-12' },
    { id: 3, title: 'Data Science Career Guide', status: 'draft', views: 0, date: '2024-01-10' },
  ]

  const digitalProducts = [
    { id: 1, title: 'Complete React Guide PDF', type: 'pdf', price: 29.99, sales: 45, status: 'active' },
    { id: 2, title: 'JavaScript Cheat Sheet', type: 'pdf', price: 9.99, sales: 123, status: 'active' },
    { id: 3, title: 'Design System Templates', type: 'archive', price: 49.99, sales: 23, status: 'active' },
  ]

  const stats = [
    { 
      label: 'Total Revenue', 
      value: `$${analytics.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'text-green-500',
      change: '+12.5%',
      changeColor: 'text-green-500'
    },
    { 
      label: 'Total Users', 
      value: analytics.totalUsers.toLocaleString(), 
      icon: Users, 
      color: 'text-blue-500',
      change: '+8.2%',
      changeColor: 'text-blue-500'
    },
    { 
      label: 'Active Courses', 
      value: analytics.totalCourses.toString(), 
      icon: BookOpen, 
      color: 'text-purple-500',
      change: '+2',
      changeColor: 'text-purple-500'
    },
    { 
      label: 'Conversion Rate', 
      value: `${analytics.conversionRate}%`, 
      icon: TrendingUp, 
      color: 'text-orange-500',
      change: '+0.8%',
      changeColor: 'text-orange-500'
    },
  ]

  const quickActions = [
    {
      title: 'Add New Course',
      description: 'Create a new course for your platform',
      icon: Plus,
      href: '/admin/courses/new',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      title: 'Manage Blog',
      description: 'Add or edit blog posts',
      icon: FileText,
      href: '/admin/blog',
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      title: 'View Messages',
      description: 'Check contact form submissions',
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      title: 'Upload Products',
      description: 'Add PDFs and digital products',
      icon: Upload,
      href: '/admin/products',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-white/70 font-medium">
                Welcome back, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'Admin'}
              </p>
              {!isClerkConfigured && (
                <p className="text-yellow-400 text-sm mt-1">
                  Development Mode - Clerk not configured
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
              >
                View Site
              </Link>
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="btn-futuristic btn-haptic border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-white/10 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className={`text-sm font-medium ${stat.changeColor}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/70 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${action.color} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{action.description}</p>
                  <Button asChild className="w-full btn-futuristic btn-haptic bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    <Link href={action.href}>
                      {action.title}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Sales */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Recent Sales
              </CardTitle>
              <CardDescription className="text-white/70">
                Latest course purchases and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <p className="font-medium text-white">{sale.course}</p>
                      <p className="text-sm text-white/70">{sale.user}</p>
                      <p className="text-xs text-white/50">{sale.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">${sale.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        sale.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {sale.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600">
                  <Link href="/admin/sales">
                    View All Sales
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Contacts */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <MessageSquare className="h-5 w-5 mr-2" />
                Recent Contacts
              </CardTitle>
              <CardDescription className="text-white/70">
                Latest customer inquiries and support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-white">{contact.name}</p>
                        <p className="text-sm text-white/70">{contact.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        contact.status === 'unread' ? 'bg-red-500/20 text-red-400' : 
                        contact.status === 'read' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 mb-2 font-medium">{contact.subject}</p>
                    <p className="text-sm text-white/60 line-clamp-2">{contact.message}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-white/50">{contact.date}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                          <Mail className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full btn-futuristic btn-haptic bg-gradient-to-r from-blue-500 to-blue-600">
                  <Link href="/admin/contacts">
                    View All Contacts
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Course Management */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BookOpen className="h-5 w-5 mr-2" />
                Course Management
              </CardTitle>
              <CardDescription className="text-white/70">
                Manage your course catalog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <p className="font-medium text-white">{course.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-white/70">
                        <span>${course.price}</span>
                        <span>{course.students} students</span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                          {course.rating}
                        </span>
                      </div>
                      <p className="text-xs text-white/50">{course.category}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        course.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {course.status}
                      </span>
                      <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full btn-futuristic btn-haptic bg-gradient-to-r from-purple-500 to-purple-600">
                  <Link href="/admin/courses">
                    Manage All Courses
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Blog & Digital Products */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <FileText className="h-5 w-5 mr-2" />
                Blog & Digital Products
              </CardTitle>
              <CardDescription className="text-white/70">
                Manage content and digital products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Blog Posts */}
                <div>
                  <h4 className="text-white font-medium mb-3">Blog Posts</h4>
                  {blogPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 mb-2">
                      <div>
                        <p className="font-medium text-white">{post.title}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>{post.views} views</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {post.status}
                        </span>
                        <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Digital Products */}
                <div>
                  <h4 className="text-white font-medium mb-3">Digital Products</h4>
                  {digitalProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 mb-2">
                      <div className="flex items-center">
                        <div className="p-2 bg-orange-500/20 rounded-lg mr-3">
                          {product.type === 'pdf' ? (
                            <File className="h-4 w-4 text-orange-400" />
                          ) : (
                            <Archive className="h-4 w-4 text-orange-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">{product.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-white/70">
                            <span>${product.price}</span>
                            <span>{product.sales} sales</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          {product.status}
                        </span>
                        <Button size="sm" variant="outline" className="btn-haptic border-white/20 text-white hover:bg-white/10">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button asChild className="w-full btn-futuristic btn-haptic bg-gradient-to-r from-indigo-500 to-indigo-600">
                  <Link href="/admin/blog">
                    Manage Blog
                  </Link>
                </Button>
                <Button asChild className="w-full btn-futuristic btn-haptic bg-gradient-to-r from-orange-500 to-orange-600">
                  <Link href="/admin/products">
                    Manage Products
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
