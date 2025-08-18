'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Clock, Star, Users, Filter, Search, Grid, List } from 'lucide-react'
import { useState } from 'react'

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Courses', count: 50 },
    { id: 'web-development', name: 'Web Development', count: 15 },
    { id: 'data-science', name: 'Data Science', count: 12 },
    { id: 'marketing', name: 'Digital Marketing', count: 8 },
    { id: 'design', name: 'Design', count: 10 },
    { id: 'business', name: 'Business', count: 5 },
  ]

  const courses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and launch your career in web development.',
      price: 99.99,
      originalPrice: 199.99,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      lessons: 24,
      duration: '12 weeks',
      rating: 4.8,
      students: 1247,
      instructor: 'Sarah Johnson',
      level: 'Beginner',
      category: 'web-development',
      featured: true,
      bestSeller: true
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      description: 'Master Python, statistics, machine learning, and data visualization. Start your journey in the exciting field of data science.',
      price: 149.99,
      originalPrice: 299.99,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      lessons: 32,
      duration: '16 weeks',
      rating: 4.9,
      students: 892,
      instructor: 'Dr. Michael Chen',
      level: 'Intermediate',
      category: 'data-science',
      featured: true,
      bestSeller: false
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      description: 'Learn SEO, social media marketing, content creation, and analytics. Grow your business or start a career in digital marketing.',
      price: 79.99,
      originalPrice: 159.99,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      lessons: 18,
      duration: '8 weeks',
      rating: 4.7,
      students: 567,
      instructor: 'Emma Rodriguez',
      level: 'Beginner',
      category: 'marketing',
      featured: false,
      bestSeller: true
    },
    {
      id: '4',
      title: 'UI/UX Design Principles',
      description: 'Master the fundamentals of user interface and user experience design. Create beautiful, functional, and user-friendly designs.',
      price: 89.99,
      originalPrice: 179.99,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      lessons: 22,
      duration: '10 weeks',
      rating: 4.6,
      students: 423,
      instructor: 'Alex Thompson',
      level: 'Beginner',
      category: 'design',
      featured: false,
      bestSeller: false
    },
    {
      id: '5',
      title: 'Advanced React Development',
      description: 'Deep dive into React hooks, context, performance optimization, and advanced patterns for building scalable applications.',
      price: 129.99,
      originalPrice: 259.99,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      lessons: 28,
      duration: '14 weeks',
      rating: 4.9,
      students: 756,
      instructor: 'David Kim',
      level: 'Advanced',
      category: 'web-development',
      featured: true,
      bestSeller: true
    },
    {
      id: '6',
      title: 'Machine Learning with Python',
      description: 'Learn machine learning algorithms, neural networks, and deep learning techniques using Python and popular frameworks.',
      price: 169.99,
      originalPrice: 339.99,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      lessons: 35,
      duration: '18 weeks',
      rating: 4.8,
      students: 634,
      instructor: 'Dr. Lisa Wang',
      level: 'Advanced',
      category: 'data-science',
      featured: true,
      bestSeller: false
    }
  ]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-orange-500/10 to-purple-500/10">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="relative container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient hero-text-animate cursor-text">
            Explore Our Courses
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto hero-text-animate stagger-1 cursor-text">
            Discover comprehensive courses designed by industry experts to help you master new skills and advance your career.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 hero-text-animate stagger-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search for courses, skills, or instructors..."
                className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-button interactive ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-card text-foreground/70 hover:bg-orange-500/10 hover:text-orange-500'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/60 mr-2">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 cursor-button interactive ${
                  viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-card text-foreground/60 hover:bg-orange-500/10'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 cursor-button interactive ${
                  viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-card text-foreground/60 hover:bg-orange-500/10'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className={`hero-text-animate cursor-card interactive ${
                  viewMode === 'list' ? 'flex gap-6' : ''
                }`}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-500 card-premium card-hover-3d ${
                  viewMode === 'list' ? 'flex-1' : 'h-full'
                }`}>
                  <div className="relative overflow-hidden cursor-image">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                        viewMode === 'list' ? 'w-64 h-48' : 'w-full h-48'
                      }`}
                    />
                    
                    {/* Course Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {course.featured && (
                        <Badge className="bg-orange-500 text-white cursor-text">Featured</Badge>
                      )}
                      {course.bestSeller && (
                        <Badge className="bg-green-500 text-white cursor-text">Best Seller</Badge>
                      )}
                    </div>
                    
                    {/* Price */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-foreground cursor-text">
                      ${course.price}
                    </div>
                    
                    {/* Level */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white cursor-text">
                      {course.level}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-orange-500 transition-colors duration-300 cursor-text">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-foreground/70 cursor-text">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-foreground/60 mb-4 cursor-text">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {course.lessons} lessons
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                        {course.rating}
                      </div>
                    </div>
                    
                    {/* Instructor */}
                    <div className="text-sm text-foreground/60 mb-4 cursor-text">
                      Instructor: {course.instructor}
                    </div>
                    
                    {/* Price Comparison */}
                    <div className="flex items-center gap-2 mb-4 cursor-text">
                      <span className="text-2xl font-bold text-foreground">${course.price}</span>
                      <span className="text-sm text-foreground/50 line-through">${course.originalPrice}</span>
                      <span className="text-sm text-green-500 font-medium">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                      </span>
                    </div>
                    
                    {/* Action Button */}
                    <div className="interactive cursor-button">
                      <Button className="w-full btn-futuristic btn-haptic">
                        <Link href={`/courses/${course.id}`} className="flex items-center justify-center">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-16 hero-text-animate">
            <div className="interactive cursor-button">
              <Button size="lg" variant="outline" className="btn-futuristic btn-haptic text-lg px-8 py-4">
                <Link href="#" className="flex items-center">
                  Load More Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 