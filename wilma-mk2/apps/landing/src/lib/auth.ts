import { createClient } from './supabase';
import type { AuthResponse, RegistrationForm, LoginForm } from '../../types/auth';

export class AuthService {
  private static supabase = createClient();

  static async signUp(data: RegistrationForm): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            wedding_date: data.wedding_date,
            partner_name: data.partner_name,
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return { user: authData.user };
    } catch (error) {
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }

  static async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return { user: data.user };
    } catch (error) {
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }

  static async signOut(): Promise<{ error?: { message: string } }> {
    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) {
        return { error: { message: error.message } };
      }

      return {};
    } catch (error) {
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }

  static async resetPassword(email: string): Promise<{ error?: { message: string } }> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return {};
    } catch (error) {
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }

  static async updatePassword(newPassword: string): Promise<{ error?: { message: string } }> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return {};
    } catch (error) {
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();
      
      if (error) {
        return { user: null, error: { message: error.message } };
      }

      return { user, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }

  static async getSession() {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession();
      
      if (error) {
        return { session: null, error: { message: error.message } };
      }

      return { session, error: null };
    } catch (error) {
      return { 
        session: null, 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }

  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  static async signInWithProvider(provider: 'google' | 'facebook') {
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return { data };
    } catch (error) {
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }

  static async updateProfile(updates: {
    full_name?: string;
    avatar_url?: string;
    wedding_date?: string;
    partner_name?: string;
  }) {
    try {
      const { error } = await this.supabase.auth.updateUser({
        data: updates,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return {};
    } catch (error) {
      return { 
        error: { 
          message: error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten' 
        } 
      };
    }
  }
}

// Utility functions for client-side auth state management
export const getSupabaseClient = () => AuthService['supabase'];

export const isAuthenticated = async (): Promise<boolean> => {
  const { user } = await AuthService.getCurrentUser();
  return !!user;
};

export const requireAuth = async () => {
  const { user, error } = await AuthService.getCurrentUser();
  
  if (error || !user) {
    throw new Error('Authentication required');
  }
  
  return user;
};
