# 1% Better - Online Learning Platform

A modern, production-ready online learning platform built with Next.js, TypeScript, and Tailwind CSS. Transform your skills with comprehensive courses and become 1% better every day.

## 🌟 Features

- **Modern UI/UX**: Beautiful, responsive design with dark mode support
- **Course Management**: Browse, view, and enroll in courses
- **User Authentication**: Secure signup/login with Clerk
- **Payment Processing**: Stripe integration for secure payments
- **Progress Tracking**: Track your learning progress across lessons
- **Admin Dashboard**: Manage courses, modules, and content
- **Responsive Design**: Mobile-friendly interface
- **SEO Optimized**: Built for search engine visibility

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma + SQLite (dev) / PlanetScale (prod)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Deployment**: Vercel

## 📁 Project Structure

```
1percent-better/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── courses/         # Course-related pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable UI components
│   │   └── ui/             # Base UI components
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── hooks/              # Custom React hooks
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 1percent-better
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the `.env.local` file with your API keys:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database with sample data**
   ```bash
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🎯 Key Features Implementation

### Homepage
- Hero section with platform branding
- Featured courses showcase
- Statistics and social proof
- Call-to-action buttons

### Course List
- Grid layout with course cards
- Search and filtering functionality
- Pagination support
- Course categories and difficulty levels

### Course Detail
- Comprehensive course information
- Curriculum breakdown by modules
- Enrollment options
- Instructor information
- Course requirements and target audience

### Database Schema
- **Users**: Authentication and profile data
- **Courses**: Course information and metadata
- **Modules**: Course sections and organization
- **Lessons**: Individual learning content
- **Enrollments**: User course registrations
- **Progress**: Lesson completion tracking
- **Orders**: Payment and purchase records

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Third-Party Services Setup

#### Clerk Authentication
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable and secret keys
4. Update your environment variables

#### Stripe Payments
1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Set up webhook endpoints
4. Update your environment variables

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository**
   - Push your code to GitHub
   - Connect your repository to Vercel

2. **Configure environment variables**
   - Add all environment variables in Vercel dashboard

3. **Deploy**
   - Vercel will automatically deploy on push to main branch

### Database Migration

For production deployment:

1. **Update database URL**
   ```env
   DATABASE_URL="your_production_database_url"
   ```

2. **Run migrations**
   ```bash
   npx prisma db push
   ```

3. **Seed production data**
   ```bash
   npm run db:seed
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Prisma](https://prisma.io/) for the database toolkit
- [Clerk](https://clerk.com/) for authentication
- [Stripe](https://stripe.com/) for payments
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the learning community** 