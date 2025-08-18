import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const courses = await prisma.product.findMany({
      where: {
        type: 'COURSE'
      },
      include: {
        modules: {
          include: {
            lessons: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        enrollments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, price, thumbnail, isPublished = false, modules = [] } = body

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const course = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        price: parseFloat(price),
        thumbnail,
        type: 'COURSE',
        isPublished,
        modules: {
          create: modules.map((module: any) => ({
            title: module.title,
            description: module.description,
            order: module.order,
            lessons: {
              create: module.lessons.map((lesson: any) => ({
                title: lesson.title,
                content: lesson.content,
                videoUrl: lesson.videoUrl,
                order: lesson.order
              }))
            }
          }))
        }
      },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
} 