'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BookOpen, Users, Trophy, Star, Play, Sparkles, Zap, Target, TrendingUp, ChevronDown, Quote, Award, Globe, Clock, Lock } from 'lucide-react'
import { useAnimation } from '@/lib/animation-context'
import { useToast } from '@/components/toast-notification'
import { useEffect, useRef, useState } from 'react'

export default function HomePage() {
  const { animationEnabled } = useAnimation()
  const { showToast } = useToast()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)

  useEffect(() => {
    // Show welcome toast only once per session
    if (!hasShownWelcome) {
      const timer = setTimeout(() => {
        showToast({
          type: 'success',
          title: 'Welcome to 1% Better!',
          message: 'Start your learning journey today.',
          duration: 4000
        })
        setHasShownWelcome(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [showToast, hasShownWelcome])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrollY(scrollPosition)

      // Calculate current section based on scroll position
      const sections = document.querySelectorAll('[data-section]')
      const windowHeight = window.innerHeight
      const current = Math.floor(scrollPosition / windowHeight)
      setCurrentSection(Math.min(current, sections.length - 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  const featuredCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and launch your career in web development.',
      price: 99.99,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      lessons: 24,
      rating: 4.8,
      instructor: 'Sarah Johnson',
      duration: '12 weeks',
      level: 'Beginner'
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      description: 'Master Python, statistics, machine learning, and data visualization. Start your journey in the exciting field of data science.',
      price: 149.99,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      lessons: 32,
      rating: 4.9,
      instructor: 'Dr. Michael Chen',
      duration: '16 weeks',
      level: 'Intermediate'
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      description: 'Learn SEO, social media marketing, content creation, and analytics. Grow your business or start a career in digital marketing.',
      price: 79.99,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      lessons: 18,
      rating: 4.7,
      instructor: 'Emma Rodriguez',
      duration: '8 weeks',
      level: 'Beginner'
    },
  ]

  const stats = [
    { label: 'Courses Available', value: '50+', icon: BookOpen, color: 'text-blue-500' },
    { label: 'Learning Paths', value: '12+', icon: Users, color: 'text-green-500' },
    { label: 'Expert Instructors', value: '25+', icon: Trophy, color: 'text-purple-500' },
    { label: 'Average Rating', value: '4.8/5', icon: Star, color: 'text-yellow-500' },
  ]

  const features = [
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'AI-powered recommendations tailored to your goals and learning style.',
      color: 'text-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your advancement with detailed analytics and achievements.',
      color: 'text-green-500'
    },
    {
      icon: Sparkles,
      title: 'Premium Content',
      description: 'High-quality courses created by industry experts and thought leaders.',
      color: 'text-purple-500'
    },
    {
      icon: Zap,
      title: 'Flexible Learning',
      description: 'Learn at your own pace with lifetime access to all course materials.',
      color: 'text-orange-500'
    }
  ]

  const testimonials = [
    {
      name: 'Alex Thompson',
      role: 'Software Engineer',
      content: 'The web development course completely transformed my career. I went from knowing nothing to landing my dream job in just 6 months.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      role: 'Marketing Manager',
      content: 'The digital marketing course gave me the skills and confidence to start my own agency. The practical projects were invaluable.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'Data Scientist',
      content: 'Outstanding content and expert instructors. The data science course helped me transition into a new field successfully.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5
    }
  ]

  const achievements = [
    { icon: Award, title: 'Industry Recognition', value: 'Top 10 Learning Platform 2024' },
    { icon: Globe, title: 'Global Reach', value: '150+ Countries' },
    { icon: Users, title: 'Active Learners', value: '100K+ Students' },
    { icon: Clock, title: 'Learning Hours', value: '2M+ Hours' }
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">
      {/* 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl float-animation cursor-magnet"
          style={{ 
            transform: `translateZ(${scrollY * 0.1}px) translateY(${scrollY * 0.05}px)`,
            opacity: Math.max(0, 1 - scrollY / 1000)
          }}
        />
        <div 
          className="absolute top-40 right-32 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl float-animation cursor-magnet"
          style={{ 
            transform: `translateZ(${scrollY * 0.15}px) translateY(${scrollY * -0.03}px)`,
            opacity: Math.max(0, 1 - scrollY / 1200)
          }}
        />
        <div 
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl float-animation cursor-magnet"
          style={{ 
            transform: `translateZ(${scrollY * 0.08}px) translateY(${scrollY * 0.02}px)`,
            opacity: Math.max(0, 1 - scrollY / 800)
          }}
        />
      </div>



      {/* Section 1: Hero */}
      <section 
        data-section="0"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          transform: `translateZ(${scrollY * 0.1}px)`,
          opacity: Math.max(0.3, 1 - scrollY / 800)
        }}
      >
        <div className="container mx-auto px-4 py-24 text-center z-10">
          <div className="mb-8 hero-text-animate">
            <h1 
              className="text-6xl md:text-8xl font-bold mb-6 text-gradient hero-text-animate cursor-text"
              style={{
                transform: `translateZ(${scrollY * 0.2}px) scale(${Math.max(0.8, 1 - scrollY / 1000)})`,
                filter: `blur(${Math.min(2, scrollY / 200)}px)`
              }}
            >
              1% Better
            </h1>
            <p 
              className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto hero-text-animate stagger-1 cursor-text"
              style={{
                transform: `translateZ(${scrollY * 0.15}px) translateY(${scrollY * 0.1}px)`,
                opacity: Math.max(0.5, 1 - scrollY / 600)
              }}
            >
              Transform your skills with our comprehensive online courses. 
              Learn at your own pace and become 1% better every day.
            </p>
          </div>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 hero-text-animate stagger-2"
            style={{
              transform: `translateZ(${scrollY * 0.1}px) translateY(${scrollY * 0.05}px)`,
              opacity: Math.max(0.7, 1 - scrollY / 500)
            }}
          >
            <div className="interactive cursor-button">
              <Button size="lg" className="btn-futuristic btn-haptic text-lg px-8 py-4">
                <Link href="/courses" className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="interactive cursor-button">
              <Button size="lg" variant="outline" className="btn-haptic text-lg px-8 py-4 border-2">
                <Link href="/auth/signup" className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Stats */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            style={{
              transform: `translateZ(${scrollY * 0.05}px)`,
              opacity: Math.max(0.8, 1 - scrollY / 400)
            }}
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center hero-text-animate cursor-card interactive"
                style={{ 
                  animationDelay: `${0.3 + index * 0.1}s`,
                  transform: `translateZ(${scrollY * 0.1 + index * 10}px) translateY(${scrollY * 0.02}px)`
                }}
              >
                <div className={`flex justify-center mb-4 ${stat.color} cursor-magnet`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 cursor-text">{stat.value}</div>
                <div className="text-foreground/60 cursor-text">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-button interactive"
            style={{
              opacity: Math.max(0, 1 - scrollY / 200),
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          >
            <ChevronDown className="h-8 w-8 text-foreground/60" />
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section 
        data-section="1"
        className="relative min-h-screen flex items-center justify-center py-24"
        style={{
          transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight) * 0.1 : 0}px)`,
          opacity: typeof window !== 'undefined' ? Math.max(0.3, Math.min(1, (scrollY - window.innerHeight * 0.5) / (window.innerHeight * 0.5))) : 1
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 hero-text-animate">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight) * 0.2 : 0}px) scale(${Math.max(0.9, 1 - Math.max(0, scrollY - window.innerHeight) / 1000)})`
              }}
            >
              Why Choose 1% Better?
            </h2>
            <p 
              className="text-xl text-foreground/70 max-w-2xl mx-auto cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight) * 0.15 : 0}px)`
              }}
            >
              Experience learning reimagined with cutting-edge technology and proven methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-orange-500/30 transition-all duration-300 card-premium hero-text-animate cursor-card interactive"
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`,
                  transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight) * 0.1 + index * 20 : 0}px) translateY(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight) * 0.05 : 0}px) rotateY(${index * 5}deg)`,
                  opacity: Math.max(0.5, Math.min(1, (scrollY - window.innerHeight * 0.8) / (window.innerHeight * 0.3)))
                }}
              >
                <div className={`flex justify-center mb-4 ${feature.color} cursor-magnet`}>
                  <feature.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground cursor-text">{feature.title}</h3>
                <p className="text-foreground/70 cursor-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Featured Courses */}
      <section 
        data-section="2"
        className="relative min-h-screen flex items-center justify-center py-24"
        style={{
          transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 2) * 0.1 : 0}px)`,
          opacity: typeof window !== 'undefined' ? Math.max(0.3, Math.min(1, (scrollY - window.innerHeight * 1.5) / (window.innerHeight * 0.5))) : 1
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 hero-text-animate">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 2) * 0.2 : 0}px) scale(${Math.max(0.9, 1 - Math.max(0, scrollY - window.innerHeight * 2) / 1000)})`
              }}
            >
              Featured Courses
            </h2>
            <p 
              className="text-xl text-foreground/70 max-w-2xl mx-auto cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 2) * 0.15 : 0}px)`
              }}
            >
              Start your learning journey with our carefully crafted courses, 
              designed by industry experts to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div
                key={course.id}
                className="group hero-text-animate cursor-card interactive"
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`,
                  transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 2) * 0.1 + index * 30 : 0}px) translateY(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 2) * 0.03 : 0}px) rotateY(${index * 8}deg)`,
                  opacity: typeof window !== 'undefined' ? Math.max(0.6, Math.min(1, (scrollY - window.innerHeight * 1.8) / (window.innerHeight * 0.3))) : 1
                }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 card-premium card-hover-3d h-full">
                  <div className="relative overflow-hidden cursor-image">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-foreground cursor-text">
                      ${course.price}
                    </div>
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
                    <div className="flex items-center justify-between text-sm text-foreground/60 mb-4 cursor-text">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="text-sm text-foreground/60 mb-4 cursor-text">
                      <div>Instructor: {course.instructor}</div>
                      <div>Duration: {course.duration}</div>
                    </div>
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

          <div 
            className="text-center mt-16 hero-text-animate"
            style={{
              transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 2) * 0.1 : 0}px)`,
              opacity: typeof window !== 'undefined' ? Math.max(0.7, Math.min(1, (scrollY - window.innerHeight * 1.9) / (window.innerHeight * 0.2))) : 1
            }}
          >
            <div className="interactive cursor-button">
              <Button size="lg" variant="outline" className="btn-futuristic btn-haptic text-lg px-8 py-4">
                <Link href="/courses" className="flex items-center">
                  View All Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section 
        data-section="3"
        className="relative min-h-screen flex items-center justify-center py-24"
        style={{
          transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 3) * 0.1 : 0}px)`,
          opacity: typeof window !== 'undefined' ? Math.max(0.3, Math.min(1, (scrollY - window.innerHeight * 2.5) / (window.innerHeight * 0.5))) : 1
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 hero-text-animate">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 3) * 0.2 : 0}px) scale(${Math.max(0.9, 1 - Math.max(0, scrollY - window.innerHeight * 3) / 1000)})`
              }}
            >
              What Our Students Say
            </h2>
            <p 
              className="text-xl text-foreground/70 max-w-2xl mx-auto cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 3) * 0.15 : 0}px)`
              }}
            >
              Join thousands of learners who have transformed their careers with our courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover:border-orange-500/30 transition-all duration-300 card-premium hero-text-animate cursor-card interactive"
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`,
                  transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 3) * 0.1 + index * 25 : 0}px) translateY(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 3) * 0.02 : 0}px) rotateY(${index * 6}deg)`,
                  opacity: typeof window !== 'undefined' ? Math.max(0.6, Math.min(1, (scrollY - window.innerHeight * 2.8) / (window.innerHeight * 0.3))) : 1
                }}
              >
                <div className="flex items-center mb-4 cursor-text">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3 cursor-text">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/80 italic cursor-text">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Achievements */}
      <section 
        data-section="4"
        className="relative min-h-screen flex items-center justify-center py-24"
        style={{
          transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 4) * 0.1 : 0}px)`,
          opacity: typeof window !== 'undefined' ? Math.max(0.3, Math.min(1, (scrollY - window.innerHeight * 3.5) / (window.innerHeight * 0.5))) : 1
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 hero-text-animate">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 4) * 0.2 : 0}px) scale(${Math.max(0.9, 1 - Math.max(0, scrollY - window.innerHeight * 4) / 1000)})`
              }}
            >
              Our Achievements
            </h2>
            <p 
              className="text-xl text-foreground/70 max-w-2xl mx-auto cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 4) * 0.15 : 0}px)`
              }}
            >
              Trusted by learners worldwide and recognized by industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-orange-500/30 transition-all duration-300 card-premium hero-text-animate cursor-card interactive"
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`,
                  transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 4) * 0.1 + index * 20 : 0}px) translateY(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 4) * 0.03 : 0}px) rotateY(${index * 4}deg)`,
                  opacity: typeof window !== 'undefined' ? Math.max(0.6, Math.min(1, (scrollY - window.innerHeight * 3.8) / (window.innerHeight * 0.3))) : 1
                }}
              >
                <div className="flex justify-center mb-4 text-orange-500 cursor-magnet">
                  <achievement.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground cursor-text">{achievement.title}</h3>
                <p className="text-foreground/70 cursor-text">{achievement.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section 
        data-section="5"
        className="relative min-h-screen flex items-center justify-center py-24 bg-gradient-to-r from-orange-500/10 to-purple-500/10"
        style={{
          transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 5) * 0.1 : 0}px)`,
          opacity: typeof window !== 'undefined' ? Math.max(0.3, Math.min(1, (scrollY - window.innerHeight * 4.5) / (window.innerHeight * 0.5))) : 1
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div 
            className="hero-text-animate"
            style={{
              transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 5) * 0.2 : 0}px) scale(${Math.max(0.9, 1 - Math.max(0, scrollY - window.innerHeight * 5) / 1000)})`
            }}
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gradient cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 5) * 0.3 : 0}px)`
              }}
            >
              Ready to Start Learning?
            </h2>
            <p 
              className="text-xl mb-8 text-foreground/80 max-w-2xl mx-auto cursor-text"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 5) * 0.25 : 0}px)`
              }}
            >
              Join our growing community of learners who are transforming their careers 
              with our comprehensive online courses.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{
                transform: `translateZ(${typeof window !== 'undefined' ? Math.max(0, scrollY - window.innerHeight * 5) * 0.2 : 0}px)`
              }}
            >
              <div className="interactive cursor-button">
                <Button size="lg" className="btn-futuristic btn-haptic text-lg px-8 py-4">
                  <Link href="/auth/signup" className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Learning Today
                  </Link>
                </Button>
              </div>
              <div className="interactive cursor-button">
                <Button size="lg" variant="outline" className="btn-haptic text-lg px-8 py-4 border-2">
                  <Link href="/courses" className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Browse Courses
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {[0, 1, 2, 3, 4, 5].map((section) => (
          <button
            key={section}
            onClick={() => {
              const targetSection = document.querySelector(`[data-section="${section}"]`)
              targetSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-button interactive ${
              currentSection === section 
                ? 'bg-orange-500 scale-125' 
                : 'bg-foreground/30 hover:bg-foreground/50'
            }`}
            style={{
              transform: `translateZ(${scrollY * 0.1}px)`
            }}
          />
        ))}
      </div>
    </div>
  )
}