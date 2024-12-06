'use client'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="py-4">
            <img
              src="/api/placeholder/150/50"
              alt="The GB Auto Care"
              className="h-12 w-auto"
            />
          </a>

          {/* Navigation */}
          <Navigation isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  )
}