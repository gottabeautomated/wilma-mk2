import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { StepIndicator } from '@/components/ui/StepIndicator';
// Select component not used in this file
import { cn } from '@/lib/utils';
import type {
  BudgetFormData,
  BudgetFormProps,
} from '../types/budget.types';
import { budgetFormSchema } from '../types/budget.types';
import { budgetCategories } from '../utils/mockData';

export const BudgetForm: React.FC<BudgetFormProps> = ({
  onSubmit,
  initialData,
  currentStep,
  onNextStep,
  onPrevStep,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });
  
  const watchedPriorities = watch('priorities');
  const budgetRange = watch('budgetRange');
  
  const handleNext = () => {
    if (currentStep < 4) {
      onNextStep();
    } else {
      handleSubmit(onSubmit)();
    }
  };
  
  // Function to format the budget as currency
  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Wedding styles with descriptions
  const weddingStyles = [
    { value: 'modern', label: 'Modern', description: 'Clean, minimalist, contemporary' },
    { value: 'rustic', label: 'Rustic', description: 'Barn, countryside, natural elements' },
    { value: 'classic', label: 'Classic', description: 'Timeless, elegant, traditional' },
    { value: 'boho', label: 'Boho', description: 'Free-spirited, eclectic, whimsical' },
    { value: 'vintage', label: 'Vintage', description: 'Retro, nostalgic, antique-inspired' },
    { value: 'outdoor', label: 'Outdoor', description: 'Nature, garden, beach, woodland' },
  ];
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
      <StepIndicator
        currentStep={currentStep - 1}
        steps={[
          { id: 1, label: 'Basics' },
          { id: 2, label: 'Details' },
          { id: 3, label: 'Style' },
          { id: 4, label: 'Priorities' }
        ]}
        className="mb-8"
      />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6">
              Tell Us About Your Wedding
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Partner 1 Name
                </label>
                <Input
                  {...register('partnerNames.0')}
                  placeholder="Partner 1 Name"
                  className={cn(
                    'w-full',
                    errors.partnerNames?.[0] && 'border-red-500'
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Partner 2 Name
                </label>
                <Input
                  {...register('partnerNames.1')}
                  placeholder="Partner 2 Name"
                  className={cn(
                    'w-full',
                    errors.partnerNames?.[1] && 'border-red-500'
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Wedding Date
                </label>
                <Controller
                  control={control}
                  name="weddingDate"
                  render={({ field }: { field: any }) => (
                    <Input
                      type="date"
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      value={field.value ? field.value.toISOString().split('T')[0] : ''}
                      className={cn(
                        'w-full',
                        errors.weddingDate && 'border-red-500'
                      )}
                    />
                  )}
                />
                {errors.weddingDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.weddingDate.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Guest Count
                </label>
                <Controller
                  control={control}
                  name="guestCount"
                  render={({ field }: { field: any }) => (
                    <Input
                      type="number"
                      min="10"
                      max="1000"
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      value={field.value}
                      className={cn(
                        'w-full',
                        errors.guestCount && 'border-red-500'
                      )}
                    />
                  )}
                />
                {errors.guestCount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.guestCount.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Location and Budget */}
        {currentStep === 2 && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6">
              Location & Budget
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Wedding Location
                </label>
                <Input
                  {...register('location')}
                  placeholder="City, State or Region"
                  className={cn(
                    'w-full',
                    errors.location && 'border-red-500'
                  )}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Budget
                  </label>
                  <span className="text-lg font-medium text-indigo-600">
                    {formatBudget(budgetRange)}
                  </span>
                </div>
                <Controller
                  control={control}
                  name="budgetRange"
                  render={({ field }: { field: any }) => (
                    <Input
                      type="range"
                      min="5000"
                      max="200000"
                      step="1000"
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      value={field.value}
                      className="w-full accent-indigo-600"
                    />
                  )}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$5,000</span>
                  <span>$200,000</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Wedding Style */}
        {currentStep === 3 && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6">
              Wedding Style
            </h2>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your wedding style
              </label>
              
              <Controller
                control={control}
                name="style"
                render={({ field }: { field: any }) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weddingStyles.map((style) => (
                      <div
                        key={style.value}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-colors",
                          field.value === style.value
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-300"
                        )}
                        onClick={() => field.onChange(style.value)}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-800">
                              {style.label}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {style.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-center h-5 w-5">
                            {field.value === style.value && (
                              <div className="h-3 w-3 bg-indigo-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>
        )}
        
        {/* Step 4: Priorities */}
        {currentStep === 4 && (
          <div className="space-y-6 py-4">
            <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6">
              Wedding Priorities
            </h2>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your top priorities (up to 5)
              </label>
              <p className="text-sm text-gray-600 mb-4">
                These will receive higher budget allocations in your personalized plan.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {budgetCategories.map((category) => (
                  <div
                    key={category.id}
                    className={cn(
                      "flex items-center space-x-3 rounded-md border p-3 shadow-sm",
                      watchedPriorities.includes(category.id)
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200"
                    )}
                  >
                    <Controller
                      control={control}
                      name="priorities"
                      render={({ field }: { field: any }) => (
                        <Checkbox
                          checked={field.value.includes(category.id)}
                          onCheckedChange={(checked) => {
                            const currentPriorities = [...field.value];
                            
                            if (checked) {
                              if (currentPriorities.length < 5) {
                                currentPriorities.push(category.id);
                              }
                            } else {
                              const index = currentPriorities.indexOf(category.id);
                              if (index !== -1) {
                                currentPriorities.splice(index, 1);
                              }
                            }
                            
                            field.onChange(currentPriorities);
                          }}
                          disabled={
                            !field.value.includes(category.id) &&
                            field.value.length >= 5
                          }
                        />
                      )}
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{category.name}</h3>
                      <p className="text-xs text-gray-500">
                        {category.description.split(",")[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {errors.priorities && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.priorities.message}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <Button
            type="button"
            onClick={handleNext}
            disabled={currentStep === 4 && watchedPriorities.length === 0}
          >
            {currentStep < 4 ? 'Next' : 'Calculate Budget'}
          </Button>
        </div>
      </form>
    </div>
  );
};
