import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, BookOpen, CreditCard, User, Settings, MessageSquare, ChevronDown, ChevronRight } from 'lucide-react'

export default function HelpPage() {
  const categories = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      description: 'Learn how to get started with our platform',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Get Started" button in the top navigation and follow the registration process. You\'ll need to provide your email address and create a password.'
        },
        {
          question: 'How do I access my purchased courses?',
          answer: 'After purchasing a course, you can access it immediately from your dashboard. Simply log in and click on "My Courses" to view all your enrolled courses.'
        },
        {
          question: 'Can I access courses on mobile devices?',
          answer: 'Yes! Our platform is fully responsive and works on all devices including smartphones, tablets, and desktop computers.'
        }
      ]
    },
    {
      title: 'Billing & Payments',
      icon: CreditCard,
      description: 'Information about payments and billing',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through our payment partners.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No, the price you see is the price you pay. There are no hidden fees or additional charges.'
        },
        {
          question: 'Can I get a refund?',
          answer: 'All purchases are final. However, if you have technical issues or concerns, please contact us directly and we\'ll work with you to resolve any problems.'
        }
      ]
    },
    {
      title: 'Account & Profile',
      icon: User,
      description: 'Manage your account and profile settings',
      faqs: [
        {
          question: 'How do I update my profile information?',
          answer: 'Go to your account settings by clicking on your profile picture in the top navigation, then select "Settings" to update your information.'
        },
        {
          question: 'Can I change my email address?',
          answer: 'Yes, you can update your email address in your account settings. You\'ll need to verify the new email address before the change takes effect.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click on "Sign In" and then "Forgot Password" to receive a password reset link via email.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: Settings,
      description: 'Technical issues and troubleshooting',
      faqs: [
        {
          question: 'What browsers are supported?',
          answer: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser.'
        },
        {
          question: 'Videos are not loading properly',
          answer: 'Try refreshing your browser, clearing your cache, or switching to a different browser. If the issue persists, check your internet connection and contact support.'
        },
        {
          question: 'I can\'t log into my account',
          answer: 'First, make sure you\'re using the correct email and password. If you\'ve forgotten your password, use the "Forgot Password" feature. If you\'re still having issues, contact our support team.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions and get the support you need to make the most of your learning experience.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="card-premium hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="btn-futuristic btn-haptic">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-premium hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle>Browse Courses</CardTitle>
              <CardDescription>
                Explore our course catalog
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="btn-futuristic btn-haptic">
                <Link href="/courses">
                  View Courses
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-premium hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Settings className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="btn-futuristic btn-haptic">
                <Link href="/profile">
                  Go to Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h3 className="text-lg font-semibold text-gray-900 group-open:text-blue-600 transition-colors duration-200">
                          {faq.question}
                        </h3>
                        <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                      </summary>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl mb-6 opacity-90">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 btn-haptic">
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 btn-haptic">
                <Link href="/courses">
                  Browse Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



