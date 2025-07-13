import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session, User, AuthError } from '@supabase/supabase-js'
import { supabase, parseUserData, type UserData } from '../lib/supabase'
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@wilma/shared-ui'

// Define the context shape
interface AuthContextType {
  user: UserData | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  sendPasswordResetEmail: (email: string) => Promise<{ error: AuthError | null }>
  setSession: (session: Session | null) => void
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Define the provider props
interface AuthProviderProps {
  children: React.ReactNode
  redirectTo?: string
}

// Create the provider component
export function AuthProvider({ children, redirectTo = '/login' }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get the current session
    const fetchSession = async () => {
      setIsLoading(true)
      
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session ? parseUserData(session.user) : null)
      
      setIsLoading(false)
    }

    fetchSession()

    // Set up session change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession)
      setUser(newSession ? parseUserData(newSession.user) : null)
      setIsLoading(false)
    })

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Define sign in function
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  // Define sign up function
  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { error }
  }

  // Define sign out function
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  // Define password reset function
  const sendPasswordResetEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    return { error }
  }

  // Create the context value
  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    setSession,
  }

  // Render the provider
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Loading Account...</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-8 h-8 border-4 border-wedding-rose border-t-transparent rounded-full animate-spin"></div>
            </CardContent>
          </Card>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
