import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that merges multiple class names together,
 * allowing Tailwind classes to properly override each other
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
