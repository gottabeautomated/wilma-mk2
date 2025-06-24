import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Input, 
  Label 
} from '@wilma/shared-ui'
import { formatCurrency } from '@wilma/shared-utils'
import type { BudgetFormData } from '@wilma/shared-types'
import { Calculator, Users, MapPin, Calendar, DollarSign } from 'lucide-react'

const budgetFormSchema = z.object({
  guestCount: z.number().min(1).max(1000),
  location: z.string().min(2),
  weddingDate: z.date().min(new Date()),
  style: z.enum(['modern', 'rustic', 'classic', 'boho', 'vintage', 'outdoor']),
  budgetRange: z.number().min(1000).max(200000),
  priorities: z.array(z.string()).min(1)
}) satisfies z.ZodType<BudgetFormData>

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void
}

export function BudgetForm({ onSubmit }: BudgetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      guestCount: 100,
      budgetRange: 30000,
      priorities: []
    }
  })

  const watchedBudget = watch('budgetRange')

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-wedding-rose to-wedding-mauve rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI-Powered Budget Calculator
        </h1>
        <p className="text-xl text-gray-600">
          Get personalized budget recommendations based on your wedding details
        </p>
      </motion.div>

      <Card className="wedding-card shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-wedding-serif text-center">
            Tell us about your dream wedding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Guest Count */}
            <div className="space-y-2">
              <Label htmlFor="guestCount" className="flex items-center text-lg font-medium">
                <Users className="w-5 h-5 mr-2 text-wedding-rose" />
                How many guests are you expecting?
              </Label>
              <Input
                id="guestCount"
                type="number"
                placeholder="100"
                className="wedding-input text-lg p-4"
                {...register('guestCount', { valueAsNumber: true })}
              />
              {errors.guestCount && (
                <p className="text-red-500 text-sm">{errors.guestCount.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center text-lg font-medium">
                <MapPin className="w-5 h-5 mr-2 text-wedding-rose" />
                Where are you planning to get married?
              </Label>
              <Input
                id="location"
                placeholder="New York, NY"
                className="wedding-input text-lg p-4"
                {...register('location')}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location.message}</p>
              )}
            </div>

            {/* Wedding Date */}
            <div className="space-y-2">
              <Label htmlFor="weddingDate" className="flex items-center text-lg font-medium">
                <Calendar className="w-5 h-5 mr-2 text-wedding-rose" />
                When is your wedding date?
              </Label>
              <Input
                id="weddingDate"
                type="date"
                className="wedding-input text-lg p-4"
                {...register('weddingDate', { valueAsDate: true })}
              />
              {errors.weddingDate && (
                <p className="text-red-500 text-sm">{errors.weddingDate.message}</p>
              )}
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <Label htmlFor="budgetRange" className="flex items-center text-lg font-medium">
                <DollarSign className="w-5 h-5 mr-2 text-wedding-rose" />
                What's your estimated budget?
              </Label>
              <div className="space-y-3">
                <Input
                  id="budgetRange"
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  className="w-full"
                  {...register('budgetRange', { valueAsNumber: true })}
                />
                <div className="text-center">
                  <span className="text-2xl font-bold text-wedding-rose">
                    {formatCurrency(watchedBudget || 30000)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$5,000</span>
                  <span>$100,000+</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full wedding-button text-lg py-6 font-semibold"
            >
              {isSubmitting ? 'Calculating...' : 'Get My AI Budget Plan'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
