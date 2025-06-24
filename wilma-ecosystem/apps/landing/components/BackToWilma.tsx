'use client';

import Link from 'next/link';
import { ChevronLeft, Heart } from 'lucide-react';

export function BackToWilma() {
  return (
    <Link 
      href="https://wilma-wedding.com" 
      className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white shadow-md hover:shadow-lg transition-shadow border border-wedding-rose/10"
    >
      <ChevronLeft className="h-4 w-4 text-wedding-rose" />
      <div className="flex items-center">
        <Heart className="h-4 w-4 text-wedding-rose mr-2" />
        <span className="text-sm font-medium text-gray-700">Back to Wilma</span>
      </div>
    </Link>
  );
}
