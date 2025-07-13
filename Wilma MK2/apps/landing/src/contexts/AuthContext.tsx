import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { UserProfile, RegisterData, UpdateProfileData } from "../types/auth";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (data: RegisterData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        await loadProfile(data.session.user.id);
      } else {
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
      } else {
        setUser(null);
        setProfile(null);
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const loadProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (data) setProfile(data);
    else setProfile(null);
  }, []);

  const signUp = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
      },
    });
    if (error) setError(mapAuthError(error.message));
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(mapAuthError(error.message));
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) setError(mapAuthError(error.message));
    setLoading(false);
  };

  const updateProfile = async (data: UpdateProfileData) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from("user_profiles")
      .update(data)
      .eq("id", user?.id);
    if (error) setError(mapAuthError(error.message));
    else await loadProfile(user!.id);
    setLoading(false);
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
    });
    if (error) setError(mapAuthError(error.message));
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        resetPassword,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function mapAuthError(msg: string): string {
  const messages: Record<string, string> = {
    "Invalid login credentials": "E-Mail oder Passwort ist ungültig.",
    "User already registered": "Diese E-Mail ist bereits registriert.",
    "Email not confirmed": "Bitte bestätige deine E-Mail-Adresse.",
    "Password should be at least 6 characters": "Das Passwort muss mindestens 6 Zeichen lang sein.",
  };
  return messages[msg] || "Unbekannter Fehler. Bitte versuche es erneut.";
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext muss im AuthProvider verwendet werden");
  return ctx;
} 