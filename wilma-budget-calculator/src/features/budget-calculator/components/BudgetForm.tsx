import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={`flex flex-col items-center ${currentStep >= step ? 'text-indigo-600' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                currentStep === step ? 'bg-indigo-600 text-white' : 
                currentStep > step ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {step}
              </div>
              <span className="text-xs hidden sm:block">
                {step === 1 ? 'Basics' : 
                 step === 2 ? 'Details' : 
                 step === 3 ? 'Style' : 'Priorities'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 bg-gray-200 rounded">
          <div 
            className="h-full bg-indigo-600 rounded transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 33.3}%` }}
          ></div>
        </div>
      </div>
      
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
                <input
                  {...register('partnerNames.0')}
                  placeholder="Partner 1 Name"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.partnerNames?.[0] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Partner 2 Name
                </label>
                <input
                  {...register('partnerNames.1')}
                  placeholder="Partner 2 Name"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.partnerNames?.[1] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Wedding Date
                </label>
                <Controller
                  control={control}
                  name="weddingDate"
                  render={({ field }) => (
                    <input
                      type="date"
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      value={field.value ? field.value.toISOString().split('T')[0] : ''}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.weddingDate ? 'border-red-500' : 'border-gray-300'
                      }`}
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
                  render={({ field }) => (
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      value={field.value}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.guestCount ? 'border-red-500' : 'border-gray-300'
                      }`}
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
                <input
                  {...register('location')}
                  placeholder="City, State or Region"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                  render={({ field }) => (
                    <input
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
                render={({ field }) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weddingStyles.map((style) => (
                      <div
                        key={style.value}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          field.value === style.value
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
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
                    className={`flex items-center space-x-3 rounded-md border p-3 shadow-sm ${
                      watchedPriorities.includes(category.id)
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200"
                    }`}
                  >
                    <Controller
                      control={control}
                      name="priorities"
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value.includes(category.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
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
                          className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
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
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
            onClick={onPrevStep}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          
          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleNext}
            disabled={currentStep === 4 && watchedPriorities.length === 0}
          >
            {currentStep < 4 ? 'Next' : 'Calculate Budget'}
          </button>
        </div>
      </form>
    </div>
  );
};
