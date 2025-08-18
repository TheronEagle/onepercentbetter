import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                progress: true
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        },
        enrollments: true,
        purchases: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
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
    const { 
      title, 
      description, 
      price, 
      thumbnail, 
      type,
      isPublished,
      modules = []
    } = body

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        description,
        price: parseFloat(price),
        thumbnail,
        type,
        isPublished,
        modules: {
          deleteMany: {},
          create: modules.map((module: any) => ({
            title: module.title,
            description: module.description,
            order: module.order,
            lessons: {
              create: module.lessons?.map((lesson: any) => ({
                title: lesson.title,
                content: lesson.content,
                videoUrl: lesson.videoUrl,
                duration: lesson.duration,
                order: lesson.order
              })) || []
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

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
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

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
