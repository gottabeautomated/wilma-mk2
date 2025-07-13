import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@wilma/database';
import { User, Session } from '@supabase/supabase-js';

interface Wedding {
  id: string;
  user_id: string;
  partner_user_id: string | null;
  wedding_date: string | null;
  venue_name: string | null;
  venue_address: string | null;
  guest_count: number;
  budget: string | null;
  style: string | null;
  theme_colors: any | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

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
  signUp: (email: string, password: string, userData?: any) => Promise<{ error?: string }>;
  signOut: () => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  
  // Wedding Methods
  selectWedding: (weddingId: string) => Promise<void>;
  createWedding: (weddingData: Partial<Wedding>) => Promise<Wedding>;
  
  // State
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      const { data: { session } } = await supabase.auth.getSession();
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserWeddings(session.user.id);
      }
      
      setLoading(false);
    };
    
    getSession();

    // Listen for auth changes
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
  }, []);

  // Load user's weddings
  const loadUserWeddings = useCallback(async (userId: string) => {
    try {
      const { data: weddings, error } = await supabase
        .from('weddings')
        .select('*')
        .or(`user_id.eq.${userId},partner_user_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading weddings:', error);
        setError('Fehler beim Laden der Hochzeiten');
        return;
      }

      setUserWeddings(weddings || []);
      
      // Auto-select wedding from localStorage or first wedding
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
    } catch (error) {
      console.error('Error loading user weddings:', error);
      setError('Fehler beim Laden der Hochzeiten');
    }
  }, []);

  // Auth methods
  const signIn = async (email: string, password: string) => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      const errorMessage = mapAuthError(error.message);
      setError(errorMessage);
      return { error: errorMessage };
    }
    
    return {};
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: userData }
    });
    
    if (error) {
      const errorMessage = mapAuthError(error.message);
      setError(errorMessage);
      return { error: errorMessage };
    }
    
    return {};
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

    const { data, error } = await supabase
      .from('weddings')
      .insert({
        ...weddingData,
        user_id: user.id,
        guest_count: weddingData.guest_count || 0,
        style: weddingData.style as any, // Type assertion to match DB enum
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
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

  const value: AuthContextType = {
    user,
    session,
    loading,
    currentWedding,
    userWeddings,
    signIn,
    signUp,
    signOut,
    resetPassword,
    selectWedding,
    createWedding,
    error,
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