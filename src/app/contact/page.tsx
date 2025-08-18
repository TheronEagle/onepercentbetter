'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react'
import { useToast } from '@/components/toast-notification'

export default function ContactPage() {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      showToast({
        type: 'success',
        title: 'Message Sent!',
        message: 'Thank you for contacting us. We\'ll get back to you soon.',
        duration: 5000
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'hello@1percentbetter.com',
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      value: '+1 (555) 123-4567',
      color: 'text-green-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our office location',
      value: '123 Learning St, Education City, EC 12345',
      color: 'text-purple-500'
    }
  ]

  const features = [
    {
      icon: MessageSquare,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your learning needs',
      color: 'text-orange-500'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'We typically respond within 2-4 hours',
      color: 'text-blue-500'
    },
    {
      icon: CheckCircle,
      title: 'Expert Team',
      description: 'Get help from our experienced learning specialists',
      color: 'text-green-500'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-orange-500/10 to-purple-500/10">
        <div className="absolute inset-0 bg-pattern opacity-50" />
        <div className="relative container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient hero-text-animate cursor-text">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto hero-text-animate stagger-1 cursor-text">
            Have questions about our courses or need support? We're here to help you succeed in your learning journey.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="text-center hero-text-animate cursor-card interactive"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <Card className="p-8 hover:shadow-2xl transition-all duration-500 card-premium card-hover-3d">
                  <div className={`flex justify-center mb-6 ${info.color} cursor-magnet`}>
                    <info.icon className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-xl mb-3 cursor-text">{info.title}</CardTitle>
                  <CardDescription className="mb-4 cursor-text">{info.description}</CardDescription>
                  <p className="text-foreground font-medium cursor-text">{info.value}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="hero-text-animate">
              <Card className="p-8 hover:shadow-2xl transition-all duration-500 card-premium">
                <CardHeader>
                  <CardTitle className="text-3xl mb-2 cursor-text">Send us a Message</CardTitle>
                  <CardDescription className="cursor-text">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="cursor-text">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="form-premium cursor-text"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="cursor-text">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-premium cursor-text"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="cursor-text">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="form-premium cursor-text"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="cursor-text">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="form-premium cursor-text resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    
                    <div className="interactive cursor-button">
                      <Button 
                        type="submit" 
                        className="w-full btn-futuristic btn-haptic text-lg py-4"
                        disabled={isSubmitting}
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Features and FAQ */}
            <div className="space-y-8">
              {/* Features */}
              <div className="hero-text-animate" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-3xl font-bold mb-6 text-gradient cursor-text">Why Choose Us?</h2>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 cursor-card interactive"
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className={`flex-shrink-0 ${feature.color} cursor-magnet`}>
                        <feature.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 cursor-text">{feature.title}</h3>
                        <p className="text-foreground/70 cursor-text">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="hero-text-animate" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-3xl font-bold mb-6 text-gradient cursor-text">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-card rounded-lg border border-border hover:border-orange-500/30 transition-all duration-300 cursor-card interactive">
                    <h3 className="font-semibold mb-2 cursor-text">How do I get started with a course?</h3>
                    <p className="text-foreground/70 cursor-text">
                      Simply browse our course catalog, select a course that interests you, and click "Enroll Now" to begin your learning journey.
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border hover:border-orange-500/30 transition-all duration-300 cursor-card interactive">
                    <h3 className="font-semibold mb-2 cursor-text">What if I need help during my course?</h3>
                    <p className="text-foreground/70 cursor-text">
                      Our support team is available 24/7 to help you with any questions or technical issues you may encounter.
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border border-border hover:border-orange-500/30 transition-all duration-300 cursor-card interactive">
                    <h3 className="font-semibold mb-2 cursor-text">Can I get a refund if I'm not satisfied?</h3>
                    <p className="text-foreground/70 cursor-text">
                      Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied, we'll refund your purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500/10 to-purple-500/10">
        <div className="container mx-auto px-4 text-center">
          <div className="hero-text-animate">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient cursor-text">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 text-foreground/80 max-w-2xl mx-auto cursor-text">
              Join thousands of learners who are already transforming their careers with our courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="interactive cursor-button">
                <Button size="lg" className="btn-futuristic btn-haptic text-lg px-8 py-4">
                  Browse Courses
                </Button>
              </div>
              <div className="interactive cursor-button">
                <Button size="lg" variant="outline" className="btn-haptic text-lg px-8 py-4 border-2">
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

