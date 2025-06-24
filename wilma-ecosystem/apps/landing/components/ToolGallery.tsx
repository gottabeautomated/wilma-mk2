'use client';

import { WEDDING_TOOLS } from '@wilma/shared-utils';
import { ToolCard } from './ToolCard';
import { motion } from 'framer-motion';

export function ToolGallery() {
  return (
    <section id="tools" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-wedding-serif">
            AI-Powered Wedding Planning Tools
          </h2>
          <p className="text-xl text-gray-600">
            Simplify your wedding planning with our specialized tools, designed to make every aspect of your special day perfect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WEDDING_TOOLS.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-wedding-cream rounded-full text-wedding-rose">
            <span className="flex h-2 w-2 rounded-full bg-wedding-rose"></span>
            New tools coming soon
          </div>
        </motion.div>
      </div>
    </section>
  );
}
