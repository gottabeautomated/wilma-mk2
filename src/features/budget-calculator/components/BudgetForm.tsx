import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Users, 
  MapPin,
  PencilRuler,
  Check,
  Star,
  Heart,
  Clock
} from 'lucide-react';
import type { BudgetFormData, FormStep, WeddingStyle } from '../types/budget.types';
import { coachTips, stylePreviewData } from '../types/budget.types';
import { budgetCategories } from '../utils/mockData';

// Form validation schema
const budgetFormSchema = z.object({
  partnerNames: z.array(z.string()).min(1).max(2),
  relationshipYears: z.number().optional(),
  guestCount: z.number().min(10).max(1000),
  location: z.string().min(2),
  weddingDate: z.date().min(new Date()),
  style: z.enum(['modern', 'rustic', 'classic', 'boho', 'vintage', 'outdoor']),
  budgetRange: z.number().min(5000).max(200000),
  priorities: z.array(z.string()).min(1).max(5)
});

interface BudgetFormProps {
  initialData?: Partial<BudgetFormData>;
  onSubmit: (data: BudgetFormData) => void;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  className?: string;
}

export function BudgetForm({ 
  initialData, 
  onSubmit,
  currentStep,
  onNextStep,
  onPrevStep,
  className = '' 
}: BudgetFormProps) {
  // Default form data
  const defaultData: BudgetFormData = {
    partnerNames: ['', ''],
    relationshipYears: 0,
    guestCount: 100,
    location: '',
    weddingDate: new Date(new Date().setMonth(new Date().getMonth() + 12)), // Default to 1 year from now
    style: 'classic',
    budgetRange: 35000,
    priorities: ['venue', 'catering', 'photography']
  };

  // Form steps
  const steps: FormStep[] = [
    {
      id: 'personalInfo',
      label: 'About You',
      description: 'Names and relationship'
    },
    {
      id: 'basics',
      label: 'Basic Info',
      description: 'Guest count and location'
    },
    {
      id: 'details',
      label: 'Wedding Details',
      description: 'Date and style'
    },
    {
      id: 'budget',
      label: 'Budget & Priorities',
      description: 'Budget range and top priorities'
    }
  ];

  // Form state
  const [formData, setFormData] = useState<BudgetFormData>({
    ...defaultData,
    ...initialData
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Partial<Record<keyof BudgetFormData, string>>>({});
  
  // Wedding styles with descriptions
  const weddingStyles: { id: WeddingStyle; name: string; description: string }[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean lines, minimalist design, contemporary venues'
    },
    {
      id: 'rustic',
      name: 'Rustic',
      description: 'Barn venues, natural elements, relaxed atmosphere'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional venues, elegant decor, timeless elements'
    },
    {
      id: 'boho',
      name: 'Bohemian',
      description: 'Free-spirited, eclectic decor, natural settings'
    },
    {
      id: 'vintage',
      name: 'Vintage',
      description: 'Nostalgic elements, antique touches, romantic feel'
    },
    {
      id: 'outdoor',
      name: 'Outdoor',
      description: 'Garden, beach, or park venues, natural surroundings'
    }
  ];

  // Get all budget categories for priorities
  const priorityCategories = budgetCategories.map((category: { id: string; name: string; description: string }) => ({
    id: category.id,
    name: category.name,
    description: category.description
  }));

  // Update form data
  const updateFormData = (field: keyof BudgetFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Update partner name
  const updatePartnerName = (index: number, value: string) => {
    setFormData(prev => {
      const newPartnerNames = [...prev.partnerNames];
      newPartnerNames[index] = value;
      return {
        ...prev,
        partnerNames: newPartnerNames
      };
    });
    
    // Clear error when field is updated
    if (errors.partnerNames) {
      setErrors(prev => ({
        ...prev,
        partnerNames: undefined
      }));
    }
  };

  // Toggle priority selection
  const togglePriority = (categoryId: string) => {
    setFormData(prev => {
      const currentPriorities = [...prev.priorities];
      
      if (currentPriorities.includes(categoryId)) {
        return {
          ...prev,
          priorities: currentPriorities.filter(id => id !== categoryId)
        };
      } else {
        // Max 5 priorities
        if (currentPriorities.length < 5) {
          return {
            ...prev,
            priorities: [...currentPriorities, categoryId]
          };
        }
      }
      
      return prev;
    });
  };

  // Validate current step
  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof BudgetFormData, string>> = {};
    
    switch (currentStep) {
      case 0: // Personal Info
        if (!formData.partnerNames[0] && !formData.partnerNames[1]) {
          newErrors.partnerNames = 'Please enter at least one name';
        }
        break;
        
      case 1: // Basic Info
        if (!formData.guestCount || formData.guestCount < 10) {
          newErrors.guestCount = 'Please enter at least 10 guests';
        } else if (formData.guestCount > 1000) {
          newErrors.guestCount = 'Maximum 1000 guests';
        }
        
        if (!formData.location || formData.location.length < 2) {
          newErrors.location = 'Please enter a valid location';
        }
        break;
        
      case 2: // Wedding Details
        if (!formData.weddingDate) {
          newErrors.weddingDate = 'Please select a wedding date';
        } else if (formData.weddingDate < new Date()) {
          newErrors.weddingDate = 'Wedding date must be in the future';
        }
        
        if (!formData.style) {
          newErrors.style = 'Please select a wedding style';
        }
        break;
        
      case 3: // Budget & Priorities
        if (!formData.budgetRange || formData.budgetRange < 5000) {
          newErrors.budgetRange = 'Minimum budget is $5,000';
        } else if (formData.budgetRange > 200000) {
          newErrors.budgetRange = 'Maximum budget is $200,000';
        }
        
        if (!formData.priorities || formData.priorities.length === 0) {
          newErrors.priorities = 'Please select at least one priority';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        onNextStep();
      } else {
        // Submit the form on the last step
        handleSubmit();
      }
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      onPrevStep();
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    try {
      // Validate the entire form
      budgetFormSchema.parse(formData);
      onSubmit(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof BudgetFormData, string>> = {};
        
        error.errors.forEach(err => {
          const field = err.path[0] as keyof BudgetFormData;
          fieldErrors[field] = err.message;
        });
        
        setErrors(fieldErrors);
      }
    }
  };

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Get current step ID
  const currentStepId = steps[currentStep]?.id || '';

  // Coach tip component
  const CoachTip = ({ stepId }: { stepId: string }) => {
    const tip = coachTips[stepId];
    if (!tip) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-3 bg-[hsla(var(--wedding-rose)/0.1)] rounded-lg"
      >
        <p className="text-sm text-[hsl(var(--wedding-navy))]">
          {tip}
        </p>
      </motion.div>
    );
  };

  // Style preview component
  const StylePreview = ({ style }: { style: WeddingStyle }) => {
    const preview = stylePreviewData[style];
    if (!preview) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-4 p-4 rounded-lg border border-gray-200"
      >
        <h4 className="font-medium text-[hsl(var(--wedding-navy))] mb-2">
          {style.charAt(0).toUpperCase() + style.slice(1)} Style Preview
        </h4>
        <p className="text-sm text-gray-600 mb-3">{preview.description}</p>
        <div className="flex space-x-2 mb-3">
          {preview.palette.map((color, index) => (
            <div 
              key={index}
              className="w-8 h-8 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  // Animations
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  return (
    <div className={`${className}`}>
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative flex flex-col items-center ${
                index < steps.length - 1 ? 'w-full' : ''
              }`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep 
                    ? 'bg-[hsl(var(--wedding-rose))] text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              <div className="text-xs mt-2 text-center">
                <div className={`font-medium ${
                  index <= currentStep ? 'text-[hsl(var(--wedding-navy))]' : 'text-gray-500'
                }`}>
                  {step.label}
                </div>
                {step.description && (
                  <div className={`${
                    index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </div>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-4 left-1/2 w-full h-0.5 ${
                    index < currentStep ? 'bg-[hsl(var(--wedding-rose))]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Form content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: 'tween', duration: 0.3 }}
            className="min-h-[300px]"
          >
            {currentStep === 0 && (
              <div>
                <h3 className="text-xl font-wedding-serif text-[hsl(var(--wedding-navy))] mb-6">
                  Hello! Who's planning a wedding? 💕
                </h3>
                
                {/* Partner Names */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Names
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.partnerNames[0]}
                        onChange={(e) => updatePartnerName(0, e.target.value)}
                        className={`pl-10 ${errors.partnerNames ? 'border-red-500' : ''}`}
                        placeholder="Partner 1"
                      />
                    </div>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.partnerNames[1]}
                        onChange={(e) => updatePartnerName(1, e.target.value)}
                        className={`pl-10 ${errors.partnerNames ? 'border-red-500' : ''}`}
                        placeholder="Partner 2"
                      />
                    </div>
                  </div>
                  {errors.partnerNames && (
                    <p className="mt-1 text-sm text-red-500">{errors.partnerNames}</p>
                  )}
                </div>
                
                {/* Relationship Years */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How long have you been together? (optional)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={formData.relationshipYears || ''}
                      onChange={(e) => updateFormData('relationshipYears', parseInt(e.target.value) || 0)}
                      className="pl-10"
                      placeholder="Years"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    This helps us better understand your journey together.
                  </p>
                </div>
                
                {/* Coach Tip */}
                <CoachTip stepId={currentStepId} />
              </div>
            )}
            
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-wedding-serif text-[hsl(var(--wedding-navy))] mb-6">
                  {formData.partnerNames.filter(Boolean).length > 0 
                    ? `Now about your wedding, ${formData.partnerNames.filter(Boolean).join(' & ')}!`
                    : "Let's start with the basics"}
                </h3>
                
                {/* Guest Count */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How many guests are you planning to invite?
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      min={10}
                      max={1000}
                      value={formData.guestCount}
                      onChange={(e) => updateFormData('guestCount', parseInt(e.target.value) || '')}
                      className={`pl-10 ${errors.guestCount ? 'border-red-500' : ''}`}
                      placeholder="Number of guests"
                    />
                  </div>
                  {errors.guestCount && (
                    <p className="mt-1 text-sm text-red-500">{errors.guestCount}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Your guest count helps us estimate per-person costs for catering and other items.
                  </p>
                </div>
                
                {/* Location */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Where are you planning to have your wedding?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                      placeholder="City, State (e.g., Seattle, WA)"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Regional pricing varies significantly. Be as specific as possible for accuracy.
                  </p>
                </div>
                
                {/* Coach Tip */}
                <CoachTip stepId={currentStepId} />
              </div>
            )}
            
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-wedding-serif text-[hsl(var(--wedding-navy))] mb-6">
                  Tell us about your wedding
                </h3>
                
                {/* Wedding Date */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    When is your wedding date?
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="date"
                      value={formData.weddingDate.toISOString().split('T')[0]}
                      onChange={(e) => updateFormData('weddingDate', new Date(e.target.value))}
                      className={`pl-10 ${errors.weddingDate ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.weddingDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.weddingDate}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Seasonal pricing may affect your budget. Peak season typically costs more.
                  </p>
                </div>
                
                {/* Wedding Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What's your wedding style?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {weddingStyles.map(style => (
                      <div
                        key={style.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.style === style.id
                            ? 'border-[hsl(var(--wedding-rose))] bg-[hsla(var(--wedding-rose)/0.05)]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => updateFormData('style', style.id)}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{style.name}</span>
                          {formData.style === style.id && (
                            <span className="text-[hsl(var(--wedding-rose))]">
                              <Check className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                      </div>
                    ))}
                  </div>
                  {errors.style && (
                    <p className="mt-1 text-sm text-red-500">{errors.style}</p>
                  )}
                </div>
                
                {/* Style Preview */}
                {formData.style && <StylePreview style={formData.style} />}
                
                {/* Coach Tip */}
                <CoachTip stepId={currentStepId} />
              </div>
            )}
            
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-wedding-serif text-[hsl(var(--wedding-navy))] mb-6">
                  Set your budget and priorities
                </h3>
                
                {/* Budget Range */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What's your total wedding budget?
                  </label>
                  <div>
                    <input
                      type="range"
                      min={5000}
                      max={200000}
                      step={1000}
                      value={formData.budgetRange}
                      onChange={(e) => updateFormData('budgetRange', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">$5,000</span>
                      <span className="text-lg font-medium text-[hsl(var(--wedding-navy))]">
                        {formatCurrency(formData.budgetRange)}
                      </span>
                      <span className="text-xs text-gray-500">$200,000</span>
                    </div>
                  </div>
                  {errors.budgetRange && (
                    <p className="mt-1 text-sm text-red-500">{errors.budgetRange}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Adjust the slider to set your total wedding budget.
                  </p>
                </div>
                
                {/* Priorities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select your top priorities (max 5)
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    We'll allocate more of your budget to these categories.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {priorityCategories.map((category: { id: string; name: string; description: string }) => (
                      <div
                        key={category.id}
                        className={`border rounded-lg p-2 cursor-pointer transition-all ${
                          formData.priorities.includes(category.id)
                            ? 'border-[hsl(var(--wedding-rose))] bg-[hsla(var(--wedding-rose)/0.05)]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => togglePriority(category.id)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{category.name}</span>
                          {formData.priorities.includes(category.id) && (
                            <Star className="w-4 h-4 fill-[hsl(var(--wedding-gold))] text-[hsl(var(--wedding-gold))]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.priorities && (
                    <p className="mt-1 text-sm text-red-500">{errors.priorities}</p>
                  )}
                </div>
                
                {/* Coach Tip */}
                <CoachTip stepId={currentStepId} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          className={currentStep === 0 ? 'invisible' : ''}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={handleNextStep}
          className="bg-[hsl(var(--wedding-rose))] hover:bg-[hsl(var(--wedding-rose-dark))] text-white"
        >
          {currentStep < steps.length - 1 ? (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            'Calculate My Budget'
          )}
        </Button>
      </div>
    </div>
  );
}
