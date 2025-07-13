import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navigation } from './Navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="wedding-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-wedding-serif text-2xl font-bold text-[hsl(var(--wedding-navy))]">
              Wilma<span className="text-[hsl(var(--wedding-rose))]">Mk2</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Navigation />
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="wedding" size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="wedding-container">
            <nav className="flex flex-col space-y-4">
              <Navigation />
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" asChild className="justify-center">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button variant="wedding" size="sm" asChild className="justify-center">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
