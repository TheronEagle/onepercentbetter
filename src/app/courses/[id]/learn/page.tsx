import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  PlayCircle, 
  CheckCircle, 
  Lock, 
  ArrowLeft,
  BookOpen,
  Clock,
  Check
} from 'lucide-react'

export default function CoursePlayerPage({ params }: { params: { id: string } }) {
  // Mock course data - in real app, fetch from database
  const course = {
    id: params.id,
    title: 'Complete Web Development Bootcamp',
    modules: [
      {
        id: '1',
        title: 'Getting Started with Web Development',
        lessons: [
          { id: '1', title: 'Welcome to the Course', duration: '5 min', completed: true },
          { id: '2', title: 'Setting Up Your Development Environment', duration: '15 min', completed: true },
          { id: '3', title: 'Understanding How the Web Works', duration: '10 min', completed: false },
        ]
      },
      {
        id: '2',
        title: 'HTML Fundamentals',
        lessons: [
          { id: '4', title: 'Introduction to HTML', duration: '12 min', completed: false },
          { id: '5', title: 'HTML Structure and Elements', duration: '18 min', completed: false },
          { id: '6', title: 'Forms and Input Elements', duration: '20 min', completed: false },
        ]
      },
      {
        id: '3',
        title: 'CSS Styling',
        lessons: [
          { id: '7', title: 'CSS Basics and Selectors', duration: '15 min', completed: false },
          { id: '8', title: 'Layout with Flexbox and Grid', duration: '25 min', completed: false },
          { id: '9', title: 'Responsive Design', duration: '20 min', completed: false },
        ]
      },
    ]
  }

  const currentLesson = {
    id: '3',
    title: 'Understanding How the Web Works',
    content: `
      <h2>Understanding How the Web Works</h2>
      <p>In this lesson, we'll explore the fundamental concepts of how the World Wide Web operates. Understanding these basics is crucial for any web developer.</p>
      
      <h3>What is the Internet?</h3>
      <p>The Internet is a global network of connected computers that communicate using standardized protocols. It's like a massive highway system for information.</p>
      
      <h3>How Web Pages Work</h3>
      <p>When you visit a website, here's what happens:</p>
      <ol>
        <li>Your browser sends a request to a web server</li>
        <li>The server processes the request and sends back HTML, CSS, and JavaScript files</li>
        <li>Your browser renders these files to display the webpage</li>
      </ol>
      
      <h3>Client-Server Model</h3>
      <p>The web operates on a client-server model:</p>
      <ul>
        <li><strong>Client:</strong> Your web browser (Chrome, Firefox, Safari, etc.)</li>
        <li><strong>Server:</strong> A computer that hosts website files and responds to requests</li>
      </ul>
      
      <h3>HTTP Protocol</h3>
      <p>HTTP (HyperText Transfer Protocol) is the language that clients and servers use to communicate. It defines how messages are formatted and transmitted.</p>
      
      <h3>Next Steps</h3>
      <p>Now that you understand the basics, you're ready to start learning HTML, the building block of web pages!</p>
    `,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '10 min'
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0
  )
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/courses/${params.id}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{course.title}</h1>
                <p className="text-sm text-gray-600">Lesson {currentLesson.id} of {totalLessons}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{progressPercentage}% Complete</p>
                <p className="text-xs text-gray-600">{completedLessons} of {totalLessons} lessons</p>
              </div>
              <div className="w-16 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{currentLesson.title}</CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {currentLesson.duration}
                </div>
              </CardHeader>
              <CardContent>
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-lg mb-6">
                  <iframe
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Lesson Content */}
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                ></div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button variant="outline" disabled>
                    Previous Lesson
                  </Button>
                  <Button>
                    Mark as Complete
                  </Button>
                  <Button variant="outline">
                    Next Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module.id}>
                      <h4 className="font-semibold text-sm mb-2">
                        {moduleIndex + 1}. {module.title}
                      </h4>
                      <div className="space-y-1">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between p-2 rounded text-sm ${
                              lesson.id === currentLesson.id
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : lesson.completed
                                ? 'text-green-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              ) : lesson.id === currentLesson.id ? (
                                <PlayCircle className="h-4 w-4 mr-2 text-blue-500" />
                              ) : (
                                <div className="w-4 h-4 border border-gray-300 rounded mr-2" />
                              )}
                              <span className="truncate">
                                {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 