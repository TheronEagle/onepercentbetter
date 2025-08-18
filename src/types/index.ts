export interface Course {
  id: string
  title: string
  slug: string
  description: string
  thumbnail?: string
  price: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  modules?: Module[]
  enrollments?: Enrollment[]
}

export interface Module {
  id: string
  title: string
  description?: string
  order: number
  courseId: string
  createdAt: Date
  updatedAt: Date
  course?: Course
  lessons?: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  content?: string
  videoUrl?: string
  order: number
  moduleId: string
  createdAt: Date
  updatedAt: Date
  module?: Module
  progress?: LessonProgress[]
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  createdAt: Date
  updatedAt: Date
  enrollments?: Enrollment[]
  progress?: LessonProgress[]
  orders?: Order[]
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: Date
  user?: User
  course?: Course
}

export interface LessonProgress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
  user?: User
  lesson?: Lesson
}

export interface Order {
  id: string
  userId: string
  courseId: string
  amount: number
  status: string
  stripeSessionId?: string
  createdAt: Date
  updatedAt: Date
  user?: User
  course?: Course
}

export interface CourseWithModules extends Course {
  modules: (Module & {
    lessons: Lesson[]
  })[]
}

export interface CourseWithProgress extends Course {
  modules: (Module & {
    lessons: (Lesson & {
      progress: LessonProgress[]
    })[]
  })[]
} 