import React, { useState } from 'react';
import type { EmailCaptureModalProps } from '../types/budget.types';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({
  isOpen,
  onSubmit,
  onSkip,
  formData
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(email);
      toast({
        title: 'Email Captured',
        description: 'Thank you! Your budget results are ready.',
      });
    } catch (error) {
      console.error('Failed to capture email:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onSkip();
    toast({
      title: 'Continuing without email',
      description: 'You can always save your results later.',
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => {}}>
      <SheetContent side="bottom" className="sm:max-w-lg sm:mx-auto rounded-t-xl">
        <div className="max-h-[85vh] overflow-y-auto py-6">
          <SheetHeader className="text-center mb-6">
            <SheetTitle className="text-2xl font-serif text-gray-800">
              Your Budget Results Are Ready!
            </SheetTitle>
            <SheetDescription>
              Enter your email to view your personalized wedding budget breakdown
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="font-medium text-blue-800 mb-2">
                Here's what you'll get:
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Complete budget breakdown for your {formData.style} wedding</li>
                <li>• Cost estimates for {formData.guestCount} guests in {formData.location}</li>
                <li>• AI-powered saving recommendations</li>
                <li>• Ability to export and save your budget plan</li>
              </ul>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={error ? 'border-red-300' : ''}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  We'll never share your email with anyone else. You'll receive a copy of your 
                  wedding budget breakdown and occasional wedding planning tips.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'View My Budget Results'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkip}
                  disabled={isSubmitting}
                >
                  Skip for Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
