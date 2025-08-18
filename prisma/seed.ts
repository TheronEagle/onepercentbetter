import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample courses using upsert to handle existing data
  const webDevCourse = await prisma.product.upsert({
    where: { slug: 'complete-web-development-bootcamp' },
    update: {},
    create: {
      title: 'Complete Web Development Bootcamp',
      slug: 'complete-web-development-bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and launch your career in web development.',
      price: 99.99,
      type: 'COURSE',
      isPublished: true,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      modules: {
        create: [
          {
            title: 'HTML Fundamentals',
            description: 'Learn the basics of HTML markup',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Introduction to HTML',
                  content: '<p>HTML is the standard markup language for creating web pages.</p>',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: 15,
                  order: 1
                },
                {
                  title: 'HTML Elements and Tags',
                  content: '<p>Learn about different HTML elements and how to use them.</p>',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: 20,
                  order: 2
                },
                {
                  title: 'HTML Forms',
                  content: '<p>Create interactive forms with HTML.</p>',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: 25,
                  order: 3
                }
              ]
            }
          },
          {
            title: 'CSS Styling',
            description: 'Master CSS for beautiful web design',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'CSS Basics',
                  content: '<p>Learn the fundamentals of CSS styling.</p>',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: 18,
                  order: 1
                },
                {
                  title: 'CSS Layouts',
                  content: '<p>Master CSS layouts and positioning.</p>',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: 22,
                  order: 2
                }
              ]
            }
          }
        ]
      }
    }
  })

  const dataScienceCourse = await prisma.product.upsert({
    where: { slug: 'data-science-fundamentals' },
    update: {},
    create: {
      title: 'Data Science Fundamentals',
      slug: 'data-science-fundamentals',
      description: 'Master Python, statistics, machine learning, and data visualization. Start your journey in the exciting field of data science.',
      price: 149.99,
      type: 'COURSE',
      isPublished: true,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      modules: {
        create: [
          {
            title: 'Python Basics',
            description: 'Learn Python programming fundamentals',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Introduction to Python',
                  content: '<p>Get started with Python programming.</p>',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: 20,
                  order: 1
                },
                {
                  title: 'Data Types and Variables',
                  content: '<p>Learn about Python data types and variables.</p>',
                  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  duration: 25,
                  order: 2
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Create sample e-books using upsert
  const marketingEbook = await prisma.product.upsert({
    where: { slug: 'digital-marketing-mastery' },
    update: {},
    create: {
      title: 'Digital Marketing Mastery',
      slug: 'digital-marketing-mastery',
      description: 'Learn SEO, social media marketing, content creation, and analytics. Grow your business or start a career in digital marketing.',
      price: 79.99,
      type: 'EBOOK',
      isPublished: true,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    }
  })

  const productivityPDF = await prisma.product.upsert({
    where: { slug: 'productivity-blueprint' },
    update: {},
    create: {
      title: 'Productivity Blueprint',
      slug: 'productivity-blueprint',
      description: 'A comprehensive guide to maximizing your productivity and achieving your goals faster.',
      price: 29.99,
      type: 'PDF',
      isPublished: true,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop'
    }
  })

  console.log('Sample data created/updated:')
  console.log('- Web Development Course:', webDevCourse.id)
  console.log('- Data Science Course:', dataScienceCourse.id)
  console.log('- Marketing E-book:', marketingEbook.id)
  console.log('- Productivity PDF:', productivityPDF.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 