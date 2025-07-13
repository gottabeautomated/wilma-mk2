'use client';

import { useState } from 'react';
import { Button } from './button';
import { Menu, X, Heart } from 'lucide-react';
import { cn } from './utils';

interface NavigationProps {
  currentApp?: 'landing' | 'budget' | 'timeline' | 'guests' | 'venue' | 'wellness';
}

export function Navigation({ currentApp = 'landing' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    { id: 'budget', name: 'Budget Calculator', url: 'https://budget.wilma-wedding.com', status: 'active' },
    { id: 'timeline', name: 'Timeline Generator', url: 'https://timeline.wilma-wedding.com', status: 'coming-soon' },
    { id: 'guests', name: 'Guest Manager', url: 'https://guests.wilma-wedding.com', status: 'coming-soon' },
    { id: 'venue', name: 'Venue Analyzer', url: 'https://venue.wilma-wedding.com', status: 'coming-soon' },
    { id: 'wellness', name: 'Wellness Planner', url: 'https://wellness.wilma-wedding.com', status: 'coming-soon' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-wedding-rose/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-wedding-rose to-wedding-mauve rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <a href="https://wilma-wedding.com" className="font-wedding-serif text-2xl font-bold text-gray-900">
              Wilma
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {tools.map(tool => (
              <a 
                key={tool.id}
                href={tool.status === 'active' ? tool.url : '#'} 
                className={`transition-colors ${
                  currentApp === tool.id 
                    ? 'text-wedding-rose font-medium' 
                    : 'text-gray-600 hover:text-wedding-rose'
                } ${tool.status === 'coming-soon' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {tool.name} {tool.status === 'coming-soon' ? '(Soon)' : ''}
              </a>
            ))}
          </div>

          {/* CTA */}
          <Button className="wedding-button">
            {currentApp === 'landing' ? 'Start Planning' : 'Back to Wilma'}
          </Button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-wedding-rose focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-wedding-rose/10">
            <div className="flex flex-col space-y-4">
              {tools.map(tool => (
                <a
                  key={tool.id}
                  href={tool.status === 'active' ? tool.url : '#'}
                  className={`transition-colors ${
                    currentApp === tool.id 
                      ? 'text-wedding-rose font-medium' 
                      : 'text-gray-600 hover:text-wedding-rose'
                  } ${tool.status === 'coming-soon' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {tool.name} {tool.status === 'coming-soon' ? '(Soon)' : ''}
                </a>
              ))}

              <a
                href="https://wilma-wedding.com#about"
                className="text-gray-600 hover:text-wedding-rose transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
