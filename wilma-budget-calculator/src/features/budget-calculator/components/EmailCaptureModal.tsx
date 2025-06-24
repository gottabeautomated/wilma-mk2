import React, { useState } from 'react';
import type { EmailCaptureModalProps } from '../types/budget.types';

export const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({
  isOpen,
  onSubmit,
  onSkip,
  formData
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (error) {
      console.error('Failed to capture email:', error);
      setError('Failed to save your email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 z-50">
      <div className="bg-white rounded-t-xl sm:rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif text-gray-800">
              Your Budget Results Are Ready!
            </h2>
            <p className="text-gray-600">
              Enter your email to view your personalized wedding budget breakdown
            </p>
          </div>
          
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
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={`px-3 py-2 border border-gray-300 rounded-md w-full ${error ? 'border-red-300' : ''}`}
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
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex-1 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'View My Budget Results'}
                </button>
                
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  onClick={onSkip}
                  disabled={isSubmitting}
                >
                  Skip for Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
