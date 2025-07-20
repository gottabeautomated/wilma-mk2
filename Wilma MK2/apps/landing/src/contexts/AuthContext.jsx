import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getSession = async () => {
            setLoading(true);
            const { data } = await supabase.auth.getSession();
            if (data?.session?.user) {
                setUser(data.session.user);
                await loadProfile(data.session.user.id);
            }
            else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        };
        getSession();
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session.user);
                await loadProfile(session.user.id);
            }
            else {
                setUser(null);
                setProfile(null);
            }
        });
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);
    const loadProfile = useCallback(async (userId) => {
        const { data } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", userId)
            .single();
        if (data)
            setProfile(data);
        else
            setProfile(null);
    }, []);
    const signUp = async (data) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                emailRedirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
            },
        });
        if (error)
            setError(mapAuthError(error.message));
        setLoading(false);
    };
    const signIn = async (email, password) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
            setError(mapAuthError(error.message));
        setLoading(false);
    };
    const signOut = async () => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signOut();
        if (error)
            setError(mapAuthError(error.message));
        setLoading(false);
    };
    const updateProfile = async (data) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase
            .from("user_profiles")
            .update(data)
            .eq("id", user?.id);
        if (error)
            setError(mapAuthError(error.message));
        else
            await loadProfile(user.id);
        setLoading(false);
    };
    const resetPassword = async (email) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
        });
        if (error)
            setError(mapAuthError(error.message));
        setLoading(false);
    };
    return (<AuthContext.Provider value={{
            user,
            profile,
            loading,
            signUp,
            signIn,
            signOut,
            updateProfile,
            resetPassword,
            error,
        }}>
      {children}
    </AuthContext.Provider>);
};
function mapAuthError(msg) {
    const messages = {
        "Invalid login credentials": "E-Mail oder Passwort ist ungültig.",
        "User already registered": "Diese E-Mail ist bereits registriert.",
        "Email not confirmed": "Bitte bestätige deine E-Mail-Adresse.",
        "Password should be at least 6 characters": "Das Passwort muss mindestens 6 Zeichen lang sein.",
    };
    return messages[msg] || "Unbekannter Fehler. Bitte versuche es erneut.";
}
export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuthContext muss im AuthProvider verwendet werden");
    return ctx;
}
