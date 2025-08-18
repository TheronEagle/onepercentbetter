'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  User, 
  Search,
  Filter,
  Eye,
  Reply,
  Trash2,
  Archive,
  Star,
  Calendar,
  Clock,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  MinusCircle
} from 'lucide-react'

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Alex Thompson',
      email: 'alex@example.com',
      phone: '+1 (555) 123-4567',
      subject: 'Course Inquiry',
      message: 'I would like to know more about the web development course. What programming languages are covered and do you offer any certifications upon completion?',
      date: '2024-01-15',
      time: '14:30',
      status: 'unread',
      priority: 'high',
      category: 'sales'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '+1 (555) 987-6543',
      subject: 'Technical Support',
      message: 'I\'m having trouble accessing the course materials. I purchased the data science course but can\'t seem to download the PDF resources.',
      date: '2024-01-14',
      time: '09:15',
      status: 'read',
      priority: 'medium',
      category: 'support'
    },
    {
      id: 3,
      name: 'David Kim',
      email: 'david@example.com',
      phone: '+1 (555) 456-7890',
      subject: 'Refund Request',
      message: 'I would like to request a refund for the digital marketing course. I found the content wasn\'t what I expected and would like to return it.',
      date: '2024-01-13',
      time: '16:45',
      status: 'replied',
      priority: 'high',
      category: 'refund'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 (555) 321-0987',
      subject: 'Partnership Inquiry',
      message: 'I run a coding bootcamp and would like to discuss potential partnership opportunities. Your platform looks great!',
      date: '2024-01-12',
      time: '11:20',
      status: 'unread',
      priority: 'medium',
      category: 'partnership'
    },
    {
      id: 5,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 654-3210',
      subject: 'Feature Request',
      message: 'I love your platform! Would it be possible to add mobile app development courses? I think there\'s a huge demand for that.',
      date: '2024-01-11',
      time: '13:10',
      status: 'read',
      priority: 'low',
      category: 'feedback'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyMessage, setReplyMessage] = useState('')

  const statuses = ['all', 'unread', 'read', 'replied', 'archived']
  const priorities = ['all', 'high', 'medium', 'low']
  const categories = ['all', 'sales', 'support', 'refund', 'partnership', 'feedback']

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || contact.priority === selectedPriority
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const handleStatusChange = (id: number, newStatus: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ))
  }

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleReply = (contact: any) => {
    setSelectedContact(contact)
    setShowReplyForm(true)
  }

  const sendReply = () => {
    if (replyMessage.trim()) {
      // Update contact status to replied
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id ? { ...contact, status: 'replied' } : contact
      ))
      setShowReplyForm(false)
      setReplyMessage('')
      setSelectedContact(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case 'read':
        return <CheckCircle className="h-4 w-4 text-blue-400" />
      case 'replied':
        return <Send className="h-4 w-4 text-green-400" />
      default:
        return <MinusCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/20'
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20'
      case 'low':
        return 'text-green-400 bg-green-500/20'
      default:
        return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Contact Management</h1>
              <p className="text-white/70 font-medium">
                Manage customer inquiries and support requests
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
              >
                Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-white/70 text-sm">
                  {contacts.filter(c => c.status === 'unread').length} unread
                </span>
                <span className="text-white/70 text-sm">
                  {contacts.length} total
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500"
                />
              </div>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none"
              >
                {statuses.map(status => (
                  <option key={status} value={status} className="bg-slate-800">
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority} className="bg-slate-800">
                    {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:border-orange-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedStatus('all')
                  setSelectedPriority('all')
                  setSelectedCategory('all')
                }}
                variant="outline"
                className="btn-haptic border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className={`bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-all duration-300 ${
              contact.status === 'unread' ? 'border-l-4 border-l-red-500' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(contact.status)}
                        <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                          {contact.priority}
                        </span>
                      </div>
                      <span className="text-sm text-white/50">
                        {contact.date} at {contact.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-white/70 mb-3">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {contact.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {contact.phone}
                      </span>
                      <span className="px-2 py-1 bg-white/10 rounded text-xs">
                        {contact.category}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="font-medium text-white mb-2">{contact.subject}</h4>
                      <p className="text-white/70 text-sm line-clamp-2">{contact.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                      className="bg-white/10 border border-white/20 text-white rounded px-2 py-1 text-xs focus:border-orange-500 focus:outline-none"
                    >
                      <option value="unread" className="bg-slate-800">Unread</option>
                      <option value="read" className="bg-slate-800">Read</option>
                      <option value="replied" className="bg-slate-800">Replied</option>
                      <option value="archived" className="bg-slate-800">Archived</option>
                    </select>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="btn-haptic border-white/20 text-white hover:bg-white/10"
                      onClick={() => handleReply(contact)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="btn-haptic border-red-500/20 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No contacts found</h3>
              <p className="text-white/70">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyForm && selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-white/20 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Reply to {selectedContact.name}</h2>
              <Button 
                onClick={() => setShowReplyForm(false)}
                variant="outline"
                className="btn-haptic border-white/20 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Original Message</h4>
                <p className="text-white/70 text-sm mb-2">
                  <strong>Subject:</strong> {selectedContact.subject}
                </p>
                <p className="text-white/70 text-sm">
                  <strong>Message:</strong> {selectedContact.message}
                </p>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Your Reply</label>
                <Textarea 
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-orange-500 resize-none"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-4">
                <Button 
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  variant="outline"
                  className="btn-haptic border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={sendReply}
                  className="btn-futuristic btn-haptic bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

