// src/components/Navigation.tsx
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  external?: boolean;
}

const navigationItems: NavItem[] = [
  { 
    label: 'About',
    href: '/about'
  },
  { 
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Mechanical Repairs', href: '/services/mechanical' },
      { label: 'Crash Repairs', href: '/services/crash' },
      { label: 'Electrical', href: '/services/electrical' },
      { label: 'Dyno Tuning', href: '/services/dyno' },
      { label: 'Paint Refinishing', href: '/services/paint' }
    ]
  },
  { 
    label: 'GB Auto Care',
    href: '/gb-auto'
  },
  { 
    label: 'Contact',
    href: '/contact'
  },
  { 
    label: 'News & Offers',
    href: '/news-offers'
  },
]

interface NavigationProps {
  isScrolled?: boolean;
}

export default function Navigation({ isScrolled = false }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleDropdownEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  const NavLink = ({ item }: { item: NavItem }) => {
    const hasChildren = item.children && item.children.length > 0
    
    return (
      <div
        className="relative"
        onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
        onMouseLeave={handleDropdownLeave}
      >
        <a
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          className="flex items-center gap-1 px-4 py-2 text-white hover:text-gray-300 transition-colors"
        >
          {item.label}
          {hasChildren && <ChevronDown className="h-4 w-4" />}
        </a>

        {/* Dropdown Menu */}
        {hasChildren && activeDropdown === item.label && (
          <div className="absolute left-0 w-48 py-2 mt-2 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl">
            {item.children.map((child) => (
              <a
                key={child.label}
                href={child.href}
                className="block px-4 py-2 text-sm text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
              >
                {child.label}
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className={`${isScrolled ? 'py-2' : 'py-4'} transition-all duration-300`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center space-x-2">
        {navigationItems.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="block py-2 text-white hover:text-gray-300 transition-colors"
                    onClick={() => {
                      if (!item.children) {
                        setIsMobileMenuOpen(false)
                      }
                    }}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block py-2 text-gray-300 hover:text-white transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}