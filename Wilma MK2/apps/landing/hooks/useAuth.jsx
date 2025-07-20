"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/supabase";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };
        getSession();
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);
    const signIn = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };
    const signUp = async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        return { error };
    };
    const signOut = async () => {
        await supabase.auth.signOut();
    };
    const updateProfile = async (data) => {
        if (!user)
            throw new Error("No user logged in");
        const { error } = await supabase.auth.updateUser({ data });
        if (error)
            throw error;
        // Optional: Wedding-Tabelle updaten wie im Originalcode
    };
    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        return { error };
    };
    const value = { user, session, loading, signIn, signUp, signOut, updateProfile, resetPassword };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
