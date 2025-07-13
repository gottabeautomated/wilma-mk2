import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Calculator, Users, Building2, BrainCircuit } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="wedding-section bg-gradient-to-r from-[hsl(var(--wedding-cream))] to-[hsl(var(--wedding-blush)/0.2)] relative overflow-hidden">
        <div className="wedding-container">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-wedding-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[hsl(var(--wedding-navy))]">
                  Planning Your 
                  <span className="text-[hsl(var(--wedding-rose))]"> Perfect Wedding </span>
                  Made Simple
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  All-in-one wedding planning platform with intelligent tools to help you create your dream wedding without the stress.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="wedding" size="lg" asChild>
                    <Link to="/tools">Explore Tools</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/signup">Create Free Account</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Wedding planning" 
                  className="rounded-lg shadow-xl z-10 relative"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-[hsl(var(--wedding-gold)/0.2)] rounded-lg -z-10"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="text-center mb-16">
            <h2 className="font-wedding-serif text-3xl md:text-4xl font-bold mb-4 text-[hsl(var(--wedding-navy))]">
              Streamline Your Wedding Planning
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our suite of wedding planning tools is designed to save you time, reduce stress, and help you create the wedding of your dreams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calculator className="h-10 w-10 text-[hsl(var(--wedding-rose))]" />,
                title: 'Budget Calculator',
                description: 'Set your budget and track expenses to stay on top of your wedding finances.',
                color: 'bg-[hsl(var(--wedding-rose)/0.1)]',
                link: '/budget-calculator'
              },
              {
                icon: <Calendar className="h-10 w-10 text-[hsl(var(--wedding-gold))]" />,
                title: 'Timeline Generator',
                description: 'Create a personalized timeline for your wedding day and planning journey.',
                color: 'bg-[hsl(var(--wedding-gold)/0.1)]',
                link: '/timeline-generator'
              },
              {
                icon: <Users className="h-10 w-10 text-[hsl(var(--wedding-navy))]" />,
                title: 'Guest Manager',
                description: 'Manage your guest list, track RSVPs, and organize seating arrangements.',
                color: 'bg-[hsl(var(--wedding-navy)/0.1)]',
                link: '/guest-manager'
              },
              {
                icon: <Building2 className="h-10 w-10 text-[hsl(var(--wedding-blush))]" />,
                title: 'Venue Analyzer',
                description: 'Compare wedding venues side-by-side to find the perfect location.',
                color: 'bg-[hsl(var(--wedding-blush)/0.1)]',
                link: '/venue-analyzer'
              },
              {
                icon: <BrainCircuit className="h-10 w-10 text-[hsl(var(--wedding-sage))]" />,
                title: 'Stress Planner',
                description: 'Identify potential stress points and create a plan to manage them.',
                color: 'bg-[hsl(var(--wedding-sage)/0.1)]',
                link: '/stress-planner'
              },
              {
                icon: <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[hsl(var(--wedding-rose))] to-[hsl(var(--wedding-gold))] flex items-center justify-center text-white font-bold">AI</div>,
                title: 'AI Wedding Assistant',
                description: 'Get personalized recommendations and assistance throughout your planning process.',
                color: 'bg-gradient-to-r from-[hsl(var(--wedding-rose)/0.1)] to-[hsl(var(--wedding-gold)/0.1)]',
                link: '/dashboard'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="wedding-card overflow-hidden"
              >
                <div className={`p-6 ${feature.color} rounded-t-lg`}>
                  <div className="flex items-center">
                    {feature.icon}
                    <h3 className="text-xl font-wedding-serif font-semibold ml-3">{feature.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Link 
                    to={feature.link}
                    className="inline-flex items-center font-medium text-[hsl(var(--wedding-rose))] hover:text-[hsl(var(--wedding-rose)/0.8)]"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="wedding-section bg-[hsl(var(--wedding-navy))] text-white">
        <div className="wedding-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-wedding-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Planning Your Perfect Day?
            </h2>
            <p className="text-[hsl(var(--wedding-cream))] mb-8 text-lg">
              Join thousands of couples who have simplified their wedding planning with Wilma Mk2.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="soft" 
                size="lg" 
                className="bg-[hsl(var(--wedding-rose))] text-white hover:bg-[hsl(var(--wedding-rose)/0.9)]"
                asChild
              >
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/tools">Explore Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="wedding-section">
        <div className="wedding-container">
          <div className="text-center mb-12">
            <h2 className="font-wedding-serif text-3xl md:text-4xl font-bold mb-4 text-[hsl(var(--wedding-navy))]">
              What Our Couples Say
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Hear from couples who planned their dream weddings with Wilma Mk2.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The budget calculator saved our wedding! We were able to track every expense and stay on budget without stress.",
                author: "Jessica & Michael",
                location: "New York, NY"
              },
              {
                quote: "The timeline generator made our wedding day flow perfectly. Every vendor knew exactly when to arrive and what to do.",
                author: "Sarah & David",
                location: "Austin, TX"
              },
              {
                quote: "Managing our guest list was so easy with Wilma Mk2. The seating arrangement tool is brilliant!",
                author: "Emily & James",
                location: "Seattle, WA"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="wedding-card"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-[hsl(var(--wedding-gold))]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground flex-grow">"{testimonial.quote}"</p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
