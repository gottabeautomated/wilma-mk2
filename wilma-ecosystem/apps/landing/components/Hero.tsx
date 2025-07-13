'use client';

import { Button } from '@wilma/shared-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-wedding-cream/30 rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 w-3/4 h-1/2 bg-wedding-rose/5 rounded-tr-[200px]" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-wedding-serif text-gray-900">
              Plan Your Wedding with <span className="text-wedding-rose">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Wilma brings artificial intelligence to wedding planning, with smart tools that help you budget, timeline, and organize your perfect day.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#tools">
                <Button className="wedding-button">
                  Explore Tools
                </Button>
              </Link>
              <Link href="https://budget.wilma-wedding.com">
                <Button className="bg-white border border-wedding-rose text-wedding-rose hover:bg-wedding-rose/5 rounded-full px-6 py-2.5 font-medium transition-colors">
                  Try Budget Calculator
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="text-wedding-rose font-medium">5,000+</span> couples planning with Wilma
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-wedding-rose/20 to-wedding-mauve/20" />
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Happy couple planning their wedding"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
