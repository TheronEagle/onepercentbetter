import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const published = searchParams.get('published')

    const where: any = {}
    
    if (type) {
      where.type = type
    }
    
    if (published === 'true') {
      where.isPublished = true
    }

    const products = await prisma.product.findMany({
      where,
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      price, 
      thumbnail, 
      type = 'COURSE',
      isPublished = false, 
      modules = [],
      downloadUrl = null
    } = body

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        price: parseFloat(price),
        thumbnail,
        type,
        isPublished,
        modules: {
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

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
