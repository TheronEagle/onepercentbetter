'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@clerk/nextjs'
import { Play, CheckCircle, Clock, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  type: 'COURSE' | 'EBOOK' | 'PDF'
  modules?: Module[]
}

interface Module {
  id: string
  title: string
  description?: string
  order: number
  lessons?: Lesson[]
}

interface Lesson {
  id: string
  title: string
  content?: string
  videoUrl?: string
  duration?: number
  order: number
  progress?: LessonProgress
}

interface LessonProgress {
  id: string
  lessonId: string
  completed: boolean
  watchTime?: number
  completedAt?: string
}

export default function CourseLearningPage() {
  const params = useParams()
  const { user } = useUser()
  const [product, setProduct] = useState<Product | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [progress, setProgress] = useState<LessonProgress[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      const data = await response.json()
      setProduct(data)
      
      // Set first lesson as current if no lesson is selected
      if (data.modules && data.modules.length > 0 && data.modules[0].lessons && data.modules[0].lessons.length > 0) {
        setCurrentLesson(data.modules[0].lessons[0])
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  const fetchProgress = useCallback(async () => {
    try {
      const response = await fetch(`/api/progress?productId=${params.id}`)
      const data = await response.json()
      setProgress(data)
    } catch (error) {
      console.error('Error fetching progress:', error)
    }
  }, [params.id])

  useEffect(() => {
    if (params.id) {
      fetchProduct()
      fetchProgress()
    }
  }, [params.id, fetchProduct, fetchProgress])

  const updateProgress = async (lessonId: string, completed: boolean, watchTime?: number) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          completed,
          watchTime,
        }),
      })
      
      // Refresh progress
      fetchProgress()
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  const markLessonComplete = (lesson: Lesson) => {
    updateProgress(lesson.id, true)
  }

  const getLessonProgress = (lessonId: string) => {
    return progress.find(p => p.lessonId === lessonId)
  }

  const isLessonCompleted = (lessonId: string) => {
    const lessonProgress = getLessonProgress(lessonId)
    return lessonProgress?.completed || false
  }

  const getCompletedLessonsCount = () => {
    return progress.filter(p => p.completed).length
  }

  const getTotalLessonsCount = () => {
    if (!product?.modules) return 0
    return product.modules.reduce((total, module) => {
      return total + (module.lessons?.length || 0)
    }, 0)
  }

  const getProgressPercentage = () => {
    const total = getTotalLessonsCount()
    const completed = getCompletedLessonsCount()
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading course...</div>
      </div>
    )
  }

  if (!product || product.type !== 'COURSE') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <p className="text-gray-600">This course doesn't exist or you don't have access to it.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">
                  {getCompletedLessonsCount()} of {getTotalLessonsCount()} lessons completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 mt-1">{getProgressPercentage()}% complete</span>
            </div>
          </div>

          {/* Current lesson */}
          {currentLesson && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{currentLesson.title}</CardTitle>
                {currentLesson.duration && (
                  <CardDescription>
                    Duration: {currentLesson.duration} minutes
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {currentLesson.videoUrl ? (
                  <div className="aspect-video mb-4">
                    <iframe
                      src={currentLesson.videoUrl}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600">Video content will be displayed here</p>
                  </div>
                )}
                
                {currentLesson.content && (
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                  </div>
                )}

                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => markLessonComplete(currentLesson)}
                    disabled={isLessonCompleted(currentLesson.id)}
                  >
                    {isLessonCompleted(currentLesson.id) ? 'Completed' : 'Mark as Complete'}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Course content */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {getCompletedLessonsCount()} of {getTotalLessonsCount()} lessons completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.modules?.map((module, moduleIndex) => (
                  <div key={module.id}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {module.lessons?.length || 0} lessons
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      {module.lessons?.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLesson(lesson)}
                          className={`w-full text-left p-2 rounded text-sm transition-colors ${
                            currentLesson?.id === lesson.id
                              ? 'bg-blue-100 text-blue-800'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 ${
                                isLessonCompleted(lesson.id)
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }">
                                {isLessonCompleted(lesson.id) ? '✓' : lessonIndex + 1}
                              </span>
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            {lesson.duration && (
                              <span className="text-xs text-gray-500 ml-2">
                                {lesson.duration}m
                              </span>
                            )}
                          </div>
                        </button>
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
  )
}

