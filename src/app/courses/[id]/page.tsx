import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  CheckCircle, 
  PlayCircle,
  ArrowRight,
  Calendar,
  Award
} from 'lucide-react'

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  // Mock course data - in real app, fetch from database
  const course = {
    id: params.id,
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and launch your career in web development. This comprehensive course covers everything you need to know to become a full-stack web developer.',
    longDescription: `This comprehensive web development bootcamp is designed to take you from complete beginner to job-ready developer. You'll learn modern web technologies and build real-world projects that you can showcase to potential employers.

    What you'll learn:
    • HTML5, CSS3, and modern JavaScript (ES6+)
    • React.js for building dynamic user interfaces
    • Node.js and Express for backend development
    • Database design and management
    • RESTful API development
    • Git version control and deployment
    • Responsive design and mobile-first development
    • Performance optimization and best practices`,
    price: 99.99,
    originalPrice: 199.99,
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    lessons: 24,
    rating: 4.8,
    reviews: 0,
    duration: '12 hours',
    level: 'Beginner',
    category: 'Development',
    instructor: 'Sarah Johnson',
    lastUpdated: 'December 2023',
    modules: [
      {
        id: '1',
        title: 'Getting Started with Web Development',
        description: 'Introduction to web development and setting up your development environment',
        lessons: [
          { id: '1', title: 'Welcome to the Course', duration: '5 min', isPreview: true },
          { id: '2', title: 'Setting Up Your Development Environment', duration: '15 min', isPreview: false },
          { id: '3', title: 'Understanding How the Web Works', duration: '10 min', isPreview: false },
        ]
      },
      {
        id: '2',
        title: 'HTML Fundamentals',
        description: 'Learn the building blocks of web pages with HTML',
        lessons: [
          { id: '4', title: 'Introduction to HTML', duration: '12 min', isPreview: false },
          { id: '5', title: 'HTML Structure and Elements', duration: '18 min', isPreview: false },
          { id: '6', title: 'Forms and Input Elements', duration: '20 min', isPreview: false },
        ]
      },
      {
        id: '3',
        title: 'CSS Styling',
        description: 'Make your websites beautiful with CSS',
        lessons: [
          { id: '7', title: 'CSS Basics and Selectors', duration: '15 min', isPreview: false },
          { id: '8', title: 'Layout with Flexbox and Grid', duration: '25 min', isPreview: false },
          { id: '9', title: 'Responsive Design', duration: '20 min', isPreview: false },
        ]
      },
      {
        id: '4',
        title: 'JavaScript Programming',
        description: 'Add interactivity to your websites with JavaScript',
        lessons: [
          { id: '10', title: 'JavaScript Fundamentals', duration: '30 min', isPreview: false },
          { id: '11', title: 'DOM Manipulation', duration: '25 min', isPreview: false },
          { id: '12', title: 'Async JavaScript', duration: '20 min', isPreview: false },
        ]
      },
      {
        id: '5',
        title: 'React.js Development',
        description: 'Build modern user interfaces with React',
        lessons: [
          { id: '13', title: 'Introduction to React', duration: '35 min', isPreview: false },
          { id: '14', title: 'Components and Props', duration: '30 min', isPreview: false },
          { id: '15', title: 'State and Hooks', duration: '40 min', isPreview: false },
        ]
      },
      {
        id: '6',
        title: 'Backend Development with Node.js',
        description: 'Create server-side applications with Node.js and Express',
        lessons: [
          { id: '16', title: 'Introduction to Node.js', duration: '25 min', isPreview: false },
          { id: '17', title: 'Express.js Framework', duration: '30 min', isPreview: false },
          { id: '18', title: 'Building REST APIs', duration: '35 min', isPreview: false },
        ]
      },
    ]
  }

  const features = [
    '24 hours of video content',
    'Downloadable resources',
    'Full lifetime access',
    'Access on mobile and TV',
    'Certificate of completion',
    '30-day money-back guarantee'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                  {course.category}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              
              {/* Course Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {course.rating} rating
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last updated {course.lastUpdated}
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{course.instructor}</p>
                  <p className="text-sm text-gray-600">Web Development Instructor</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold">${course.price}</span>
                    <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                    <span className="text-sm text-green-600 font-semibold">50% off</span>
                  </div>
                  <CardDescription>
                    Limited time offer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                  
                  {/* Course Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">This course includes:</h4>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            {/* What you'll learn */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.longDescription.split('•').slice(1).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item.trim()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {course.modules.length} sections • {course.lessons} lectures • {course.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border rounded-lg">
                      <div className="p-4 bg-gray-50 border-b">
                        <h3 className="font-semibold">{moduleIndex + 1}. {module.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                      </div>
                      <div className="p-4">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                              {lesson.isPreview ? (
                                <PlayCircle className="h-4 w-4 text-blue-500 mr-2" />
                              ) : (
                                <div className="w-4 h-4 border border-gray-300 rounded mr-2" />
                              )}
                              <span className="text-sm">
                                {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                              </span>
                              {lesson.isPreview && (
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                  Preview
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>No prior programming experience required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>A computer with internet connection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Willingness to learn and practice</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete beginners who want to learn web development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Students looking to switch careers to tech</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Entrepreneurs who want to build their own websites</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 