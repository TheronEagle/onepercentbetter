import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.product.findUnique({
      where: { id: params.id },
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
      }
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, price, thumbnail, isPublished, modules = [] } = body

    // First, delete existing modules and lessons
    await prisma.lesson.deleteMany({
      where: {
        module: {
          productId: params.id
        }
      }
    })

    await prisma.module.deleteMany({
      where: {
        productId: params.id
      }
    })

    // Update course and create new modules/lessons
    const course = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        description,
        price: parseFloat(price),
        thumbnail,
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

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
} 