import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../context/AuthContext'
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  Button, 
  Input, 
  Label 
} from '@wilma/shared-ui'

// Define the form schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginProps {
  onSuccess?: () => void
  onSignUpClick?: () => void
  redirectPath?: string
}

export function Login({ onSuccess, onSignUpClick, redirectPath = '/' }: LoginProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setErrorMessage(null)
    
    try {
      const { error } = await signIn(data.email, data.password)
      
      if (error) {
        setErrorMessage(error.message)
      } else {
        if (onSuccess) {
          onSuccess()
        } else if (typeof window !== 'undefined') {
          window.location.href = redirectPath
        }
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="wedding-card">
        <CardHeader>
          <CardTitle className="text-2xl font-wedding-serif text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm">
                {errorMessage}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-wedding-rose hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full wedding-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSignUpClick}
              className="text-wedding-rose hover:underline"
            >
              Sign up
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
