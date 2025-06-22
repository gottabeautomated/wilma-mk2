import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signInWithMagicLink: (email: string, redirectTo?: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, options?: any) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true)
      
      try {
        // Check for existing session
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error.message)
          return
        }
        
        if (data?.session) {
          setSession(data.session)
          setUser(data.session.user)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    initializeAuth()
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)
        setIsLoading(false)
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: "Welcome to Wilma MK2",
          })
        }
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully",
          })
        }
      }
    )
    
    return () => {
      // Clean up subscription on unmount
      authListener.subscription.unsubscribe()
    }
  }, [toast])
  
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) {
        return { error: error.message }
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('Sign in error:', error.message)
      return { error: error.message || 'An unexpected error occurred' }
    }
  }
  
  const signInWithMagicLink = async (email: string, redirectTo?: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) {
        return { error: error.message }
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('Magic link error:', error.message)
      return { error: error.message || 'An unexpected error occurred' }
    }
  }
  
  const signUp = async (email: string, password: string, options?: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options,
      })
      
      if (error) {
        return { error: error.message }
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('Sign up error:', error.message)
      return { error: error.message || 'An unexpected error occurred' }
    }
  }
  
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error: any) {
      console.error('Sign out error:', error.message)
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message || 'An unexpected error occurred',
      })
    }
  }
  
  const refreshSession = async () => {
    try {
      const { error } = await supabase.auth.refreshSession()
      
      if (error) {
        console.error('Session refresh error:', error.message)
        toast({
          variant: "destructive",
          title: "Session error",
          description: "There was a problem refreshing your session",
        })
      }
    } catch (error: any) {
      console.error('Session refresh error:', error.message)
    }
  }
  
  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signInWithMagicLink,
    signUp,
    signOut,
    refreshSession,
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  
  return context
}
