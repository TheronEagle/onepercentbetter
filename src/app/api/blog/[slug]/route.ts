
import { NextRequest, NextResponse } from 'next/server'

// Mock blog posts data - same as in the main route
const blogPosts = [
  {
    id: '1',
    title: 'The Power of 1% Improvements: How Small Changes Lead to Big Results',
    slug: 'the-power-of-1-percent-improvements',
    content: `# The Power of 1% Improvements

In the world of personal development and productivity, we often look for dramatic changes that will transform our lives overnight. However, the real secret to lasting success lies in the power of small, consistent improvements.

## The Compound Effect

When you improve by just 1% each day, you're not just adding to your abilities – you're multiplying them. Over the course of a year, a 1% daily improvement compounds to make you 37 times better.

## How to Apply 1% Improvements

1. **Start Small**: Choose one tiny habit you can do consistently
2. **Track Progress**: Measure your improvements daily
3. **Stay Consistent**: Focus on the process, not immediate results
4. **Build Momentum**: Let small wins fuel bigger changes

## Real-World Examples

- Reading 10 pages a day instead of trying to read entire books
- Doing 5 push-ups daily rather than sporadic intense workouts
- Writing 100 words daily instead of waiting for inspiration

## Conclusion

The path to extraordinary results is paved with ordinary actions performed consistently. Start your 1% improvement journey today, and watch how small changes compound into remarkable transformations.`,
    excerpt: 'Discover how making just 1% improvements each day can compound into extraordinary results over time. Learn practical strategies for implementing this philosophy in your daily life.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['productivity', 'self-improvement', 'growth'],
    featuredImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Mastering Web Development: A Complete Roadmap for Beginners',
    slug: 'mastering-web-development-roadmap',
    content: `# Mastering Web Development: A Complete Roadmap for Beginners

Web development can seem overwhelming at first, but with the right roadmap, anyone can become a proficient developer. This guide will take you from complete beginner to job-ready developer.

## Phase 1: Foundations (Months 1-2)

### HTML & CSS
- Learn semantic HTML elements
- Master CSS positioning and layout
- Understand responsive design principles
- Practice with Flexbox and Grid

### JavaScript Basics
- Variables, functions, and control structures
- DOM manipulation
- Event handling
- Asynchronous JavaScript (Promises, async/await)

## Phase 2: Frontend Frameworks (Months 3-4)

### React.js
- Component-based architecture
- State management with hooks
- Routing with React Router
- API integration

### Development Tools
- Git version control
- Package managers (npm/yarn)
- Build tools (Webpack, Vite)
- Developer tools and debugging

## Phase 3: Backend Development (Months 5-6)

### Node.js & Express
- Server-side JavaScript
- RESTful API design
- Database integration
- Authentication and authorization

### Databases
- SQL basics with PostgreSQL
- NoSQL with MongoDB
- Database design principles
- ORMs and query builders

## Phase 4: Advanced Topics (Months 7-8)

### DevOps & Deployment
- Cloud platforms (AWS, Vercel, Netlify)
- Containerization with Docker
- CI/CD pipelines
- Performance optimization

### Testing
- Unit testing with Jest
- Integration testing
- End-to-end testing with Cypress
- Test-driven development

## Building Your Portfolio

Throughout your learning journey, build projects that demonstrate your skills:

1. **Personal Website**: Showcase your skills and projects
2. **Todo App**: Demonstrate CRUD operations
3. **Weather App**: API integration and data handling
4. **E-commerce Site**: Complex state management and payment integration
5. **Full-Stack Application**: Complete web application with authentication

## Landing Your First Job

- Build a strong GitHub profile
- Contribute to open source projects
- Network with other developers
- Prepare for technical interviews
- Keep learning and staying updated

## Conclusion

Web development is a journey, not a destination. Stay curious, keep practicing, and don't be afraid to build things that challenge you. The web development community is welcoming and always ready to help newcomers succeed.`,
    excerpt: 'A comprehensive guide to learning web development from scratch. This roadmap will take you from complete beginner to job-ready developer.',
    author: 'Mike Chen',
    date: '2024-01-12',
    readTime: '8 min read',
    tags: ['web development', 'javascript', 'react'],
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop'
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  
  return NextResponse.json(post)
}
