'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Save, X, Upload, Plus, Trash2, GripVertical, BookOpen, Video } from 'lucide-react'

interface Module {
  id?: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}

interface Lesson {
  id?: string
  title: string
  content: string
  videoUrl?: string
  order: number
}

interface CourseFormProps {
  course?: {
    id?: string
    title: string
    description: string
    price: number
    thumbnail?: string
    isPublished: boolean
    modules?: {
      id?: string
      title: string
      description?: string
      order: number
      lessons: {
        id?: string
        title: string
        content?: string
        videoUrl?: string
        order: number
      }[]
    }[]
  }
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

export default function CourseForm({ course, onSubmit, onCancel, loading = false }: CourseFormProps) {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    price: course?.price || 0,
    thumbnail: course?.thumbnail || '',
    isPublished: course?.isPublished || false
  })

  const [modules, setModules] = useState<any[]>(
    course?.modules?.map(m => ({
      ...m,
      description: m.description || '',
      lessons: m.lessons || []
    })) || []
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      modules: modules.map((module, index) => ({
        ...module,
        order: index + 1,
        lessons: module.lessons.map((lesson: any, lessonIndex: number) => ({
          ...lesson,
          order: lessonIndex + 1
        }))
      }))
    })
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addModule = () => {
    const newModule: Module = {
      title: '',
      description: '',
      order: modules.length + 1,
      lessons: []
    }
    setModules([...modules, newModule])
  }

  const updateModule = (index: number, field: string, value: string) => {
    const updatedModules = [...modules]
    updatedModules[index] = { ...updatedModules[index], [field]: value }
    setModules(updatedModules)
  }

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index))
  }

  const addLesson = (moduleIndex: number) => {
    const updatedModules = [...modules]
    const newLesson: Lesson = {
      title: '',
      content: '',
      order: updatedModules[moduleIndex].lessons.length + 1
    }
    updatedModules[moduleIndex].lessons.push(newLesson)
    setModules(updatedModules)
  }

  const updateLesson = (moduleIndex: number, lessonIndex: number, field: string, value: string) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      [field]: value
    }
    setModules(updatedModules)
  }

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1)
    setModules(updatedModules)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{course?.id ? 'Edit Course' : 'Create New Course'}</CardTitle>
              <CardDescription>
                {course?.id ? 'Update your course information and content' : 'Add a new course to your platform'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Course Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter course title"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter course description"
                rows={3}
                required
              />
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {formData.thumbnail && (
                <div className="mt-2">
                  <img 
                    src={formData.thumbnail} 
                    alt="Preview" 
                    className="w-32 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            {/* Published Status */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isPublished"
                checked={formData.isPublished}
                onCheckedChange={(checked) => handleInputChange('isPublished', checked)}
              />
              <Label htmlFor="isPublished">Publish course</Label>
            </div>

            {/* Modules Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Course Modules</Label>
                <Button type="button" onClick={addModule} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </div>

              {modules.map((module, moduleIndex) => (
                <Card key={moduleIndex} className="border-2 border-dashed border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="font-medium">Module {moduleIndex + 1}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeModule(moduleIndex)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Module Title</Label>
                        <Input
                          value={module.title}
                          onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                          placeholder="Enter module title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Module Description</Label>
                        <Input
                          value={module.description}
                          onChange={(e) => updateModule(moduleIndex, 'description', e.target.value)}
                          placeholder="Enter module description"
                        />
                      </div>
                    </div>

                    {/* Lessons */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Lessons</Label>
                        <Button
                          type="button"
                          onClick={() => addLesson(moduleIndex)}
                          variant="outline"
                          size="sm"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Lesson
                        </Button>
                      </div>

                      {module.lessons.map((lesson: any, lessonIndex: number) => (
                        <div key={lessonIndex} className="border border-border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Video className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">Lesson {lessonIndex + 1}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLesson(moduleIndex, lessonIndex)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Lesson Title</Label>
                              <Input
                                value={lesson.title}
                                onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'title', e.target.value)}
                                placeholder="Enter lesson title"
                                size={1}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Video URL (optional)</Label>
                              <Input
                                value={lesson.videoUrl || ''}
                                onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'videoUrl', e.target.value)}
                                placeholder="https://youtube.com/..."
                                size={1}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <Label className="text-xs">Lesson Content</Label>
                            <Textarea
                              value={lesson.content}
                              onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'content', e.target.value)}
                              placeholder="Enter lesson content or description..."
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : (course?.id ? 'Update Course' : 'Create Course')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 