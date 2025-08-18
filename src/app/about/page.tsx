import { Users, Target, Award, Globe, Heart, Zap, BookOpen, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  { label: 'Courses Available', value: '6+', icon: BookOpen },
  { label: 'Learning Paths', value: '4+', icon: Users },
  { label: 'Expert Instructors', value: '3+', icon: Award },
  { label: 'Quality Rating', value: '4.8/5', icon: Globe }
]

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from course quality to customer support.'
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'We understand the learning journey and provide compassionate support every step of the way.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We continuously innovate our platform and teaching methods to deliver the best learning experience.'
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description: 'We believe in continuous improvement and helping our students grow both personally and professionally.'
  }
]

const industries = [
  {
    name: 'Technology',
    description: 'Web development, programming, and digital skills for the modern workforce.',
    icon: '💻'
  },
  {
    name: 'Marketing',
    description: 'Digital marketing, SEO, and growth strategies for businesses.',
    icon: '📈'
  },
  {
    name: 'Design',
    description: 'UI/UX design, graphic design, and creative skills.',
    icon: '🎨'
  },
  {
    name: 'Business',
    description: 'Entrepreneurship, leadership, and business development.',
    icon: '💼'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About 1% Better
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make quality education accessible to everyone. 
            Our platform helps learners become 1% better every day through comprehensive 
            online courses and personalized learning experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At 1% Better, we believe that small, consistent improvements lead to extraordinary results. 
                Our mission is to democratize education by providing high-quality, accessible learning 
                experiences that empower individuals to achieve their goals.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Whether you're looking to advance your career, learn a new skill, or explore your passions, 
                our platform provides the tools, resources, and support you need to succeed.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-blue-600 font-semibold">
                  <Target className="h-5 w-5 mr-2" />
                  Quality Education
                </div>
                <div className="flex items-center text-purple-600 font-semibold">
                  <Globe className="h-5 w-5 mr-2" />
                  Global Access
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why 1% Better?</h3>
                <p className="text-blue-100 mb-6">
                  The concept of becoming 1% better each day is powerful. Over time, these small improvements 
                  compound into remarkable results. Our platform is designed to support this journey of 
                  continuous improvement.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Personalized learning paths</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Expert-led instruction</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Community support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Lifetime access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries We Focus On */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Focus On</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We specialize in teaching specific industries how to get 1% better every day through targeted, practical learning experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 card-premium">
                <CardHeader>
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <CardTitle className="text-xl">{industry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {industry.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape the learning experience we provide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 card-premium">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="mb-20">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    1% Better was founded in 2024 with a simple yet powerful vision: to help individuals and businesses 
                    in specific industries become 1% better every day. We recognized that traditional education often 
                    fails to address the real-world challenges that professionals face daily.
                  </p>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Our founder, a seasoned professional with experience across multiple industries, understood that 
                    the key to success isn't massive overnight changes, but consistent, incremental improvements. 
                    This philosophy became the foundation of our learning platform.
                  </p>
                  <p className="text-blue-100 leading-relaxed">
                    Today, we're building a platform that serves professionals in technology, marketing, design, 
                    and business, helping them achieve continuous improvement through practical, industry-focused education.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Key Milestones</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                      <span>2024: Platform launched with industry-focused courses</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                      <span>2024: Building our community of industry professionals</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                      <span>2024: Expanding course offerings for specific industries</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                      <span>2024: Launching AI-powered personalized learning</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                      <span>Future: Industry partnerships and advanced analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to start your learning journey? Join our growing community of professionals who are 
            becoming 1% better every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl btn-futuristic btn-haptic"
            >
              Explore Courses
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 btn-haptic"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

