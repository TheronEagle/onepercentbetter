
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogOut, Users, BookOpen, MessageSquare, ShoppingCart, TrendingUp, DollarSign, Calendar, Eye } from 'lucide-react'

// Check if Clerk is configured
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && key !== 'pk_test_placeholder' && key.length > 20
}

export default function AdminPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Only use Clerk hooks if configured
  let clerkUser = null
  let signOut = null
  
  try {
    if (isClerkConfigured()) {
      clerkUser = useUser()
      const clerk = useClerk()
      signOut = clerk.signOut
    }
  } catch (error) {
    console.log('Clerk hooks error:', error)
  }

  useEffect(() => {
    const initializeAuth = async () => {
      if (isClerkConfigured() && clerkUser) {
        // Use Clerk authentication
        if (clerkUser.isLoaded) {
          if (clerkUser.user) {
            setUser(clerkUser.user)
            setIsAdmin(true)
            setIsLoaded(true)
          } else {
            router.push('/auth/signin?redirect=/admin')
          }
        }
      } else {
        // Fallback for demo/development mode
        const fallbackUser = localStorage.getItem('user')
        if (fallbackUser) {
          const userData = JSON.parse(fallbackUser)
          setUser(userData)
          setIsAdmin(true)
          setIsLoaded(true)
        } else {
          // Allow admin access in development
          setUser({ 
            firstName: 'Admin', 
            emailAddresses: [{ emailAddress: 'admin@1percentbetter.com' }] 
          })
          setIsAdmin(true)
          setIsLoaded(true)
        }
      }
    }

    initializeAuth()
  }, [clerkUser?.isLoaded, clerkUser?.user, router])

  const handleSignOut = async () => {
    if (isClerkConfigured() && signOut) {
      await signOut()
    } else {
      localStorage.removeItem('user')
    }
    router.push('/')
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAdmin) {
    router.push('/auth/signin?redirect=/admin')
    return null
  }

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
              {!isClerkConfigured() && (
                <p className="text-yellow-400 text-sm mt-1">
                  Development Mode - Clerk not configured
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                View Site
              </Link>
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold text-white">1,234</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">Active Courses</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">Monthly Revenue</p>
                <p className="text-2xl font-bold text-white">$12,450</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">New Messages</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Management */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Course Management
              </h2>
              <Link href="/admin/courses">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Manage
                </Button>
              </Link>
            </div>
            <p className="text-white/70 mb-4">Create, edit, and manage all courses and content.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Published Courses</span>
                <span className="text-white">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Draft Courses</span>
                <span className="text-white">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Total Enrollments</span>
                <span className="text-white">1,234</span>
              </div>
            </div>
          </div>

          {/* Contact Messages */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact Messages
              </h2>
              <Link href="/admin/contacts">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  View All
                </Button>
              </Link>
            </div>
            <p className="text-white/70 mb-4">Manage and respond to customer inquiries.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Unread Messages</span>
                <span className="text-white">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Total Messages</span>
                <span className="text-white">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Response Rate</span>
                <span className="text-white">98%</span>
              </div>
            </div>
          </div>

          {/* Blog Management */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Blog Management
              </h2>
              <Link href="/admin/blog">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Manage
                </Button>
              </Link>
            </div>
            <p className="text-white/70 mb-4">Create and manage blog posts and content.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Published Posts</span>
                <span className="text-white">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Draft Posts</span>
                <span className="text-white">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Total Views</span>
                <span className="text-white">12.5K</span>
              </div>
            </div>
          </div>

          {/* Product Management */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Product Management
              </h2>
              <Link href="/admin/products">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Manage
                </Button>
              </Link>
            </div>
            <p className="text-white/70 mb-4">Manage products and digital downloads.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Active Products</span>
                <span className="text-white">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Total Sales</span>
                <span className="text-white">$45,230</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Conversion Rate</span>
                <span className="text-white">3.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
