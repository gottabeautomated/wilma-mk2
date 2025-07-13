import { Link } from 'react-router-dom'
import { Heart, Mail, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="wedding-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="font-wedding-serif text-2xl font-bold text-[hsl(var(--wedding-navy))]">
                Wilma<span className="text-[hsl(var(--wedding-rose))]">Mk2</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Modern wedding planning platform designed to make your special day perfect.
              From budgeting to guest management, we've got you covered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-base mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/budget-calculator" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  Budget Calculator
                </Link>
              </li>
              <li>
                <Link to="/timeline-generator" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  Timeline Generator
                </Link>
              </li>
              <li>
                <Link to="/guest-manager" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  Guest Manager
                </Link>
              </li>
              <li>
                <Link to="/venue-analyzer" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  Venue Analyzer
                </Link>
              </li>
              <li>
                <Link to="/stress-planner" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  Stress Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-base mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-[hsl(var(--wedding-rose))] text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <p>
              Made with <Heart className="inline h-4 w-4 text-[hsl(var(--wedding-rose))]" /> by Wilma Team
            </p>
            <p className="ml-6">
              &copy; {new Date().getFullYear()} Wilma Mk2. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-[hsl(var(--wedding-rose))]"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-[hsl(var(--wedding-rose))]"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="mailto:hello@wilmamk2.com" 
              className="text-gray-500 hover:text-[hsl(var(--wedding-rose))]"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
