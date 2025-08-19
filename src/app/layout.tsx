import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import MouseAnimation from '@/components/mouse-animation'
import FloatingActionButton from '@/components/floating-action-button'
import { AnimationProvider } from '@/lib/animation-context'
import { ToastProvider } from '@/components/toast-notification'
import { ClerkProviderWrapper } from "@/lib/clerk-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1% Better - Premium Online Learning Platform',
  description: 'Transform your skills with our comprehensive online courses. Learn at your own pace and become 1% better every day.',
  keywords: 'online learning, courses, education, skills, development, programming, marketing, design',
  authors: [{ name: '1% Better Team' }],
  creator: '1% Better',
  publisher: '1% Better',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://1percentbetter.com'),
  openGraph: {
    title: '1% Better - Premium Online Learning Platform',
    description: 'Transform your skills with our comprehensive online courses.',
    url: 'https://1percentbetter.com',
    siteName: '1% Better',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '1% Better Learning Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1% Better - Premium Online Learning Platform',
    description: 'Transform your skills with our comprehensive online courses.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProviderWrapper>
      <html lang="en" className="scroll-smooth">
        <head>
          {/* Security Headers */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />

          {/* Performance and SEO */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="theme-color" content="#667eea" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="1% Better" />

          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://images.unsplash.com" />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={`${inter.className} font-premium antialiased bg-background text-foreground`}>
          <AnimationProvider>
            <ToastProvider>
              <MouseAnimation />
              <Navigation />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <FloatingActionButton />
            </ToastProvider>
          </AnimationProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  )
}