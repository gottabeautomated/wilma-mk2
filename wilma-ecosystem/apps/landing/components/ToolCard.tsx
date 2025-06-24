'use client';

import { Button } from '@wilma/shared-ui';
import { WeddingTool } from '@wilma/shared-utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import {
  CalendarIcon,
  Calculator,
  Users,
  MapPin,
  Heart,
  ExternalLink,
  LockIcon
} from 'lucide-react';

interface ToolCardProps {
  tool: WeddingTool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar':
        return <CalendarIcon className="h-10 w-10 text-wedding-rose" />;
      case 'Calculator':
        return <Calculator className="h-10 w-10 text-wedding-rose" />;
      case 'Users':
        return <Users className="h-10 w-10 text-wedding-rose" />;
      case 'MapPin':
        return <MapPin className="h-10 w-10 text-wedding-rose" />;
      case 'Heart':
        return <Heart className="h-10 w-10 text-wedding-rose" />;
      default:
        return <Heart className="h-10 w-10 text-wedding-rose" />;
    }
  };

  const isActive = tool.status === 'active';
  
  // Stagger animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1 
      }
    }
  };

  return (
    <motion.div 
      className="h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <div className={`wedding-card h-full flex flex-col ${!isActive ? 'opacity-70' : ''}`}>
        <div className="p-6">
          <div className="mb-4">
            {getIcon(tool.icon)}
          </div>
          <h3 className="text-xl font-bold mb-2 font-wedding-serif">{tool.name}</h3>
          <p className="text-gray-600 mb-4">{tool.description}</p>
          
          {isActive ? (
            <Link href={tool.url} passHref>
              <Button className="wedding-button w-full">
                Open Tool <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button className="w-full bg-gray-200 text-gray-600 rounded-full px-6 py-2.5 font-medium" disabled>
              Coming Soon <LockIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
