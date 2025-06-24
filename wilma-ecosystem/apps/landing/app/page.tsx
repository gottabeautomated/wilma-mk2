import { Hero } from '../components/Hero';
import { ToolGallery } from '../components/ToolGallery';

export default function Home() {
  return (
    <>
      <Hero />
      <ToolGallery />
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-wedding-serif">
              How Wilma Makes Wedding Planning Easier
            </h2>
            <p className="text-xl text-gray-600">
              We bring artificial intelligence to every aspect of your wedding planning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-wedding-rose/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wedding-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-wedding-serif">Smart Budget Allocation</h3>
              <p className="text-gray-600">
                Our AI analyzes thousands of real weddings to recommend the perfect budget breakdown based on your priorities.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-wedding-rose/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wedding-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-wedding-serif">Personalized Timeline</h3>
              <p className="text-gray-600">
                Create the perfect wedding day schedule that keeps everyone on track and ensures you don't miss any important moments.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-full bg-wedding-rose/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wedding-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-wedding-serif">Guest Management</h3>
              <p className="text-gray-600">
                Easily manage your guest list, track RSVPs, and organize seating arrangements with our intelligent guest manager.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-wedding-cream/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-wedding-serif">
              Ready to Start Planning Your Dream Wedding?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of couples using Wilma to create their perfect day.
            </p>
            <a 
              href="https://budget.wilma-wedding.com" 
              className="wedding-button inline-block"
            >
              Get Started with Budget Calculator
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
