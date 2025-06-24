import { Card } from './card';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';
import { cn } from './utils';

interface WeddingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  status: 'active' | 'coming-soon';
  className?: string;
}

export function WeddingCard({ 
  title, 
  description, 
  icon, 
  href, 
  status,
  className 
}: WeddingCardProps) {
  const handleClick = () => {
    if (status === 'active') {
      window.open(href, '_blank');
    }
  };

  return (
    <Card className={cn(
      "wedding-card h-full hover:shadow-xl transition-all duration-300 cursor-pointer",
      status === 'coming-soon' && "opacity-75 cursor-not-allowed",
      className
    )}>
      <div className="p-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-wedding-rose to-wedding-mauve flex items-center justify-center mb-4 text-white">
          {icon}
        </div>
        <h3 className="font-wedding-serif text-2xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {description}
        </p>
        
        <Button 
          onClick={handleClick}
          disabled={status === 'coming-soon'}
          className="w-full wedding-button group"
        >
          {status === 'active' ? 'Try Tool for Free' : 'Coming Soon'}
          {status === 'active' && (
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </div>
    </Card>
  );
}
