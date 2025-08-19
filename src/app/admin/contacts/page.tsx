'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Trash2, Eye, Search, Filter } from 'lucide-react'
import Link from 'next/link'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
}

export default function ContactsAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    filterMessages()
  }, [messages, searchTerm, filterStatus])

  const loadMessages = () => {
    const stored = localStorage.getItem('contactMessages')
    if (stored) {
      const parsedMessages = JSON.parse(stored)
      setMessages(parsedMessages)
    }
  }

  const saveMessages = (updatedMessages: ContactMessage[]) => {
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages))
    setMessages(updatedMessages)
  }

  const filterMessages = () => {
    let filtered = messages

    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterStatus === 'unread') {
      filtered = filtered.filter(msg => !msg.isRead)
    } else if (filterStatus === 'read') {
      filtered = filtered.filter(msg => msg.isRead)
    }

    setFilteredMessages(filtered)
  }

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, isRead: true } : msg
    )
    saveMessages(updatedMessages)
  }

  const deleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter(msg => msg.id !== messageId)
      saveMessages(updatedMessages)
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null)
      }
    }
  }

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      markAsRead(message.id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
              <p className="text-white/70">Manage customer inquiries and feedback</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Messages List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Messages ({filteredMessages.length})</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white text-sm"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/50">No contact messages found</p>
                  <p className="text-white/30 text-sm mt-2">Messages will appear here when users submit the contact form</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      !message.isRead
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : 'bg-white/5 border-white/10'
                    } ${
                      selectedMessage?.id === message.id
                        ? 'ring-2 ring-blue-500/50'
                        : 'hover:bg-white/10'
                    }`}
                    onClick={() => viewMessage(message)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white">{message.name}</h3>
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-white/60 text-sm">{message.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            viewMessage(message)
                          }}
                          className="text-white/60 hover:text-white p-1"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteMessage(message.id)
                          }}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-white font-medium text-sm mb-1">{message.subject}</p>
                    <p className="text-white/50 text-sm line-clamp-2">{message.message}</p>
                    <p className="text-white/40 text-xs mt-2">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Details */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            {selectedMessage ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Message Details</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm font-medium">From</label>
                    <p className="text-white font-semibold">{selectedMessage.name}</p>
                    <p className="text-white/60 text-sm">{selectedMessage.email}</p>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm font-medium">Subject</label>
                    <p className="text-white font-semibold">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm font-medium">Date</label>
                    <p className="text-white">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm font-medium">Message</label>
                    <div className="bg-white/5 rounded-lg p-4 mt-2">
                      <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${selectedMessage.isRead ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-white/70 text-sm">
                      {selectedMessage.isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-white/50 text-lg font-medium">Select a message to view details</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}