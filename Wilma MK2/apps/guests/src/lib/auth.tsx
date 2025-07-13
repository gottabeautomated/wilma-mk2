import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { testSupabaseConnection } from './testSupabase';
import { Wedding } from '../types/guest';


interface AuthContextType {
  // User & Session
  user: User | null;
  session: Session | null;
  loading: boolean;
  
  // Weddings
  currentWedding: Wedding | null;
  userWeddings: Wedding[];
  
  // Auth Methods
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  
  // Wedding Methods
  selectWedding: (weddingId: string) => Promise<void>;
  createWedding: (weddingData: Partial<Wedding>) => Promise<Wedding>;
  
  // State
  error: string | null;
  
  // New additions
  setCurrentWedding: (wedding: Wedding | null) => void;
  clearError: () => void;
  refreshWeddings: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Environment detection for Vite
const isDevelopment = (import.meta as any).env?.MODE === 'development'

export const WilmaAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currentWedding, setCurrentWedding] = useState<Wedding | null>(null);
  const [userWeddings, setUserWeddings] = useState<Wedding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadUserWeddings(session.user.id);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        setError('Verbindungsfehler zu Supabase - bitte prüfen Sie Ihre Internetverbindung oder wenden Sie sich an den Support.');
      }
      setLoading(false);
    };
    getSession();
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadUserWeddings(session.user.id);
        } else {
          setCurrentWedding(null);
          setUserWeddings([]);
          localStorage.removeItem('currentWeddingId');
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  // Load user's weddings
  const loadUserWeddings = async (userId: string) => {
    try {
      const { data: weddings, error } = await supabase
        .from('weddings')
        .select('*')
        .or(`user_id.eq.${userId},partner_user_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error loading weddings:', error);
        setError('Fehler beim Laden der Hochzeiten');
        return [];
      }
      setUserWeddings(weddings || []);
      const savedWeddingId = localStorage.getItem('currentWeddingId');
      let weddingToSelect = null;
      if (savedWeddingId && weddings) {
        weddingToSelect = weddings.find(w => w.id === savedWeddingId);
      }
      if (!weddingToSelect && weddings && weddings.length > 0) {
        weddingToSelect = weddings[0];
      }
      if (weddingToSelect) {
        setCurrentWedding(weddingToSelect);
        localStorage.setItem('currentWeddingId', weddingToSelect.id);
      }
      return weddings || [];
    } catch (error) {
      console.error('Error loading user weddings:', error);
      setError('Fehler beim Laden der Hochzeiten');
      return [];
    }
  };

  // Auth methods
  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const errorMessage = mapAuthError(error.message);
        setError(errorMessage);
        return { error: errorMessage };
      }
      if (data.user) {
        await loadUserWeddings(data.user.id);
      }
      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Anmeldung fehlgeschlagen - bitte prüfen Sie Ihre Internetverbindung oder wenden Sie sich an den Support.');
      return { error: 'Anmeldung fehlgeschlagen - bitte prüfen Sie Ihre Internetverbindung oder wenden Sie sich an den Support.' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<{ error?: string }> => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        const errorMessage = mapAuthError(error.message);
        setError(errorMessage);
        return { error: errorMessage };
      } else {
        setError('Registrierung erfolgreich! Bitte prüfen Sie Ihre E-Mails.');
        return {};
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Registrierung fehlgeschlagen - bitte prüfen Sie Ihre Internetverbindung oder wenden Sie sich an den Support.');
      return { error: 'Registrierung fehlgeschlagen - bitte prüfen Sie Ihre Internetverbindung oder wenden Sie sich an den Support.' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      const errorMessage = mapAuthError(error.message);
      setError(errorMessage);
      return { error: errorMessage };
    }
    return {};
  };

  const resetPassword = async (email: string) => {
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      const errorMessage = mapAuthError(error.message);
      setError(errorMessage);
      return { error: errorMessage };
    }
    return {};
  };

  // Wedding methods
  const selectWedding = async (weddingId: string) => {
    const wedding = userWeddings.find(w => w.id === weddingId);
    if (wedding) {
      setCurrentWedding(wedding);
      localStorage.setItem('currentWeddingId', weddingId);
    }
  };

  const createWedding = async (weddingData: Partial<Wedding>): Promise<Wedding> => {
    if (!user) {
      throw new Error('Benutzer nicht angemeldet');
    }
    const cleanedData = {
      ...weddingData,
      user_id: user.id,
      guest_count: weddingData.guest_count || 0,
      wedding_date: weddingData.wedding_date || null,
      venue_name: weddingData.venue_name || null,
      venue_address: weddingData.venue_address || null,
      partner_user_id: weddingData.partner_user_id || null,
      budget: weddingData.budget || null,
      style: weddingData.style || null,
      theme_colors: weddingData.theme_colors || null,
      notes: weddingData.notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase
      .from('weddings')
      .insert(cleanedData)
      .select()
      .single();
    if (error) {
      throw new Error(`Fehler beim Erstellen der Hochzeit: ${error.message}`);
    }
    const newWedding = data as Wedding;
    setUserWeddings(prev => [newWedding, ...prev]);
    setCurrentWedding(newWedding);
    localStorage.setItem('currentWeddingId', newWedding.id);
    return newWedding;
  };

  const value = {
    user,
    session,
    currentWedding,
    userWeddings,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    selectWedding,
    createWedding,
    setCurrentWedding,
    clearError: () => setError(null),
    refreshWeddings: async () => {
      if (user) {
        await loadUserWeddings(user.id);
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a WilmaAuthProvider');
  }
  return context;
};

// Error mapping
function mapAuthError(msg: string): string {
  const messages: Record<string, string> = {
    'Invalid login credentials': 'E-Mail oder Passwort ist ungültig.',
    'User already registered': 'Diese E-Mail ist bereits registriert.',
    'Email not confirmed': 'Bitte bestätige deine E-Mail-Adresse.',
    'Password should be at least 6 characters': 'Das Passwort muss mindestens 6 Zeichen lang sein.',
  };
  return messages[msg] || `Unbekannter Fehler: ${msg}`;
}

// Protected Route HOC
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { user, loading } = useAuth();
    
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      );
    }
    
    if (!user) {
      // Redirect to login or show login component
      return <div>Not authenticated</div>;
    }
    
    return <Component {...props} />;
  };
};

 