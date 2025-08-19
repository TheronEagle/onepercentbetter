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

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [clerkUser, setClerkUser] = useState<any>(null)

  // Check if Clerk is properly configured
  const isClerkConfigured = () => {
    const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return key && key !== 'pk_test_placeholder' && key.length > 20
  }

  useEffect(() => {
    const initializeAuth = async () => {
      if (isClerkConfigured()) {
        try {
          // Dynamic import of Clerk hooks
          const { useUser } = await import('@clerk/nextjs')
          // For now, we'll use fallback since hooks can't be called conditionally
          console.log('Clerk configured but using fallback for now')
        } catch (error) {
          console.log('Error loading Clerk:', error)
        }
      }

      // Check for fallback user (development mode)
      const fallbackUser = localStorage.getItem('user')
      if (fallbackUser) {
        const userData = JSON.parse(fallbackUser)
        setUser(userData)
        setIsAdmin(true)
        setIsLoaded(true)
      } else if (!isClerkConfigured()) {
        // Development mode - allow admin access
        console.log('Development mode - allowing admin access')
        setUser({ 
          firstName: 'Admin', 
          emailAddresses: [{ emailAddress: 'admin@1percentbetter.com' }] 
        })
        setIsAdmin(true)
        setIsLoaded(true)
      } else {
        // Redirect to sign-in if no user found
        router.push('/auth/signin?redirect=/admin')
      }
    }

    initializeAuth()
  }, [router])

  const handleSignOut = async () => {
    if (isClerkConfigured()) {
      try {
        const { useClerk } = await import('@clerk/nextjs')
        // Handle Clerk sign out when available
      } catch (error) {
        console.log('Clerk sign out error:', error)
      }
    }

    // Fallback sign out
    localStorage.removeItem('user')
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
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-white/70 mb-6">You don't have permission to access this area.</p>
          <Link href="/">
            <Button className="btn-futuristic bg-gradient-to-r from-orange-500 to-pink-500">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer btn-haptic">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-white/60">No users yet</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer btn-haptic">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$0.00</div>
              <p className="text-xs text-white/60">No sales yet</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer btn-haptic">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-white/60">No courses created</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer btn-haptic">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0%</div>
              <p className="text-xs text-white/60">Pre-launch</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                Course Management
              </CardTitle>
              <CardDescription className="text-white/60">
                Create and manage your courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/courses">
                <Button className="w-full btn-futuristic bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Courses
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-green-400" />
                Product Management
              </CardTitle>
              <CardDescription className="text-white/60">
                Manage your digital products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/products">
                <Button className="w-full btn-futuristic bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Products
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-orange-400" />
                Blog Management
              </CardTitle>
              <CardDescription className="text-white/60">
                Create and publish blog posts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/blog">
                <Button className="w-full btn-futuristic bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Blog
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Management Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                Contact Messages
              </CardTitle>
              <CardDescription className="text-white/60">
                View and respond to user messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/contacts">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Mail className="h-4 w-4 mr-2" />
                  View Messages (0)
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
                Analytics
              </CardTitle>
              <CardDescription className="text-white/60">
                View detailed analytics and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}