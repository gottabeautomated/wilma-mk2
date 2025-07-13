import React, { useState } from 'react';
import { BudgetForm } from './BudgetForm';
import { LoadingAnimation } from './LoadingAnimation';
import { BudgetResults } from './BudgetResults';
import { EmailCaptureModal } from './EmailCaptureModal';
import { generateBudgetBreakdown } from '../utils/budgetCalculations';
import type { BudgetFormData, BudgetBreakdown } from '../types/budget.types';

// Default values for the form
const defaultFormData: BudgetFormData = {
  guestCount: 100,
  location: '',
  weddingDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
  style: 'classic',
  budgetRange: 25000,
  priorities: [],
  partnerNames: ['', '']
};

export const BudgetCalculatorPage: React.FC = () => {
  // State management
  const [formData, setFormData] = useState<BudgetFormData>(defaultFormData);
  const [result, setResult] = useState<BudgetBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Handle step navigation
  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4) as 1 | 2 | 3 | 4);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1) as 1 | 2 | 3 | 4);
  };

  // Handle form submission
  const handleFormSubmit = (data: BudgetFormData) => {
    setFormData(data);
    setIsCalculating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Generate budget breakdown
        const budgetBreakdown = generateBudgetBreakdown(data);
        
        setResult(budgetBreakdown);
        setIsCalculating(false);
        setShowEmailCapture(true);
      } catch (error) {
        console.error('Error calculating budget:', error);
        setIsCalculating(false);
        alert('Error calculating budget. Please try again later.');
      }
    }, 3000); // 3-second delay for a realistic "calculation" experience
  };

  // Handle email capture submit
  const handleEmailSubmit = async (email: string): Promise<void> => {
    try {
      // In the standalone app, we'll just simulate this
      console.log('Email captured:', email);
      console.log('Form data:', formData);
      
      // In a real app, this would save to a database
      
      alert(`Thank you! In a full application, your budget plan would be sent to ${email}`);
      
      setShowEmailCapture(false);
      setShowResults(true);
    } catch (error) {
      console.error('Error processing email:', error);
      alert('Error processing email. Please try again later.');
    }
  };

  // Handle email capture skip
  const handleEmailSkip = () => {
    setShowEmailCapture(false);
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-4">
          Wedding Budget Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Plan your perfect day with confidence. Our AI-powered budget calculator provides personalized recommendations based on your priorities and preferences.
        </p>
      </div>

      {!isCalculating && !showResults && (
        <BudgetForm
          onSubmit={handleFormSubmit}
          initialData={formData}
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
        />
      )}

      {isCalculating && (
        <LoadingAnimation />
      )}

      {showResults && result && (
        <BudgetResults
          formData={formData}
          result={result}
        />
      )}

      <EmailCaptureModal
        isOpen={showEmailCapture}
        onSubmit={handleEmailSubmit}
        onSkip={handleEmailSkip}
        formData={formData}
      />
    </div>
  );
};
