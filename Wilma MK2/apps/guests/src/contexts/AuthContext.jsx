import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [currentWedding, setCurrentWedding] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user || null);
            if (session?.user) {
                loadCurrentWedding(session.user.id);
            }
            setLoading(false);
        });
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user || null);
            if (session?.user) {
                loadCurrentWedding(session.user.id);
            }
            else {
                setCurrentWedding(null);
            }
            setLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);
    const loadCurrentWedding = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('weddings')
                .select('*')
                .eq('user_id', userId)
                .single();
            if (!error && data) {
                setCurrentWedding(data);
            }
        }
        catch (error) {
            console.error('Error loading wedding:', error);
        }
    };
    const signIn = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };
    const signUp = async (email, password, userData) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData,
            },
        });
        return { error };
    };
    const signOut = async () => {
        await supabase.auth.signOut();
    };
    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return { error };
    };
    const value = {
        user,
        session,
        currentWedding,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-royal"></div>
      </div>);
    }
    if (!user) {
        return (<div className="min-h-screen flex items-center justify-center bg-softrose">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-royal mb-4">Anmeldung erforderlich</h1>
          <p className="text-accent">Bitte melden Sie sich an, um fortzufahren.</p>
        </div>
      </div>);
    }
    return <>{children}</>;
};
