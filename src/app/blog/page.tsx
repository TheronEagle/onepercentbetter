import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: '1',
      title: 'The Power of 1% Improvements: How Small Changes Lead to Big Results',
      excerpt: 'Discover how making just 1% improvements each day can compound into extraordinary results over time. Learn practical strategies for implementing this philosophy in your daily life.',
      category: 'Productivity',
      readTime: '5 min read',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop',
      featured: true,
      slug: 'the-power-of-1-percent-improvements',
      tags: ['productivity', 'self-improvement', 'growth']
    },
    {
      id: '2',
      title: 'Mastering Web Development: A Complete Roadmap for Beginners',
      excerpt: 'A comprehensive guide to learning web development from scratch. This roadmap will take you from complete beginner to job-ready developer.',
      category: 'Technology',
      readTime: '8 min read',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      slug: 'mastering-web-development-roadmap'
    },
    {
      id: '3',
      title: 'Digital Marketing Strategies That Actually Work in 2024',
      excerpt: 'Explore the most effective digital marketing strategies for 2024. Learn how to build a strong online presence and grow your business.',
      category: 'Marketing',
      readTime: '6 min read',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      slug: 'digital-marketing-strategies-2024'
    },
    {
      id: '4',
      title: 'The Future of Online Learning: Trends to Watch',
      excerpt: 'Discover the latest trends in online education and how they\'re shaping the future of learning. From AI-powered personalization to immersive experiences.',
      category: 'Education',
      readTime: '7 min read',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      slug: 'future-of-online-learning'
    },
    {
      id: '5',
      title: 'Building a Successful Career in Data Science',
      excerpt: 'Everything you need to know about starting and advancing your career in data science. From essential skills to industry insights.',
      category: 'Technology',
      readTime: '9 min read',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      slug: 'successful-career-data-science'
    },
    {
      id: '6',
      title: 'Design Principles That Every Professional Should Know',
      excerpt: 'Learn the fundamental design principles that will help you create better products, presentations, and communications.',
      category: 'Design',
      readTime: '4 min read',
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      slug: 'design-principles-professionals'
    }
  ]

  const categories = ['All', 'Technology', 'Marketing', 'Design', 'Education', 'Productivity']

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-xl text-foreground/80">
            Insights, tips, and strategies to help you become 1% better every day
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <div key={post.id} className="mb-12">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow card-premium">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{post.title}</h2>
                  <p className="text-foreground/80 mb-6 leading-relaxed">{post.excerpt}</p>
                  <Button asChild className="btn-futuristic btn-haptic w-fit">
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}

        {/* Filters */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-foreground/10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === 'All' ? 'default' : 'outline'}
                  size="sm"
                  className="btn-futuristic btn-haptic"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow card-premium">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-foreground/60 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="btn-futuristic btn-haptic w-full">
                  <Link href={`/blog/${post.slug}`}>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <Button variant="outline" disabled className="btn-futuristic btn-haptic">
              Previous
            </Button>
            <Button variant="default" className="btn-futuristic btn-haptic">1</Button>
            <Button variant="outline" className="btn-futuristic btn-haptic">2</Button>
            <Button variant="outline" className="btn-futuristic btn-haptic">3</Button>
            <Button variant="outline" className="btn-futuristic btn-haptic">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}