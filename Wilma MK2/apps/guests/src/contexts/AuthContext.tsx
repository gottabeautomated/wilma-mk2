import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthUser extends User {
  first_name?: string
  last_name?: string
  phone?: string
}

interface Wedding {
  id: string
  venue_name: string
  wedding_date: string
  venue_address: string
  user_id: string
}

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  currentWedding: Wedding | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [currentWedding, setCurrentWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user as AuthUser || null)
      if (session?.user) {
        loadCurrentWedding(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user as AuthUser || null)
        if (session?.user) {
          loadCurrentWedding(session.user.id)
        } else {
          setCurrentWedding(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadCurrentWedding = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('weddings')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!error && data) {
        setCurrentWedding(data)
      }
    } catch (error) {
      console.error('Error loading wedding:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, userData?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    return { error }
  }

  const value = {
    user,
    session,
    currentWedding,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-royal"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-softrose">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-royal mb-4">Anmeldung erforderlich</h1>
          <p className="text-accent">Bitte melden Sie sich an, um fortzufahren.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
