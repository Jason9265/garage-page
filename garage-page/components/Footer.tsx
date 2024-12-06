'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface NewsletterFormData {
  firstName: string
  lastName: string
  email: string
}

export default function Footer() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    firstName: '',
    lastName: '',
    email: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter submission
    console.log('Newsletter submission:', formData)
  }

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">
            Sign up with your email address to receive the latest in news and updates
            from The GB Auto Care team.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-2 bg-white/10 rounded-lg"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  firstName: e.target.value
                }))}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-2 bg-white/10 rounded-lg"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  lastName: e.target.value
                }))}
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 bg-white/10 rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                email: e.target.value
              }))}
            />
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-400">
            We 100% respect your privacy.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div>
              <p>The GB Auto Care © {new Date().getFullYear()}</p>
            </div>
            <div className="flex justify-center space-x-6">
              <a href="https://www.instagram.com/theglyndegarage/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://www.facebook.com/theglyndegarage/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="/contact">Email</a>
            </div>
            <div className="text-right">
              <p>Site built by <em>Clementine Creative</em></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}