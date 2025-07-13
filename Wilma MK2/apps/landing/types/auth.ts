import { User } from '@supabase/supabase-js';

export interface AuthError {
  message: string;
}

export interface AuthResponse {
  user?: User | null;
  error?: AuthError;
}

export interface UserProfile extends User {
  full_name?: string;
  avatar_url?: string;
  wedding_date?: string;
  partner_name?: string;
}

export interface RegistrationForm {
  email: string;
  password: string;
  wedding_date?: string;
  partner_name?: string;
}

export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  weddingDate?: string;
  budget?: string;
  preferredContact: 'email' | 'phone';
}

export interface EmailCapture {
  email: string;
  source: string;
  consent_marketing?: boolean;
  capture_data?: Record<string, any>;
}
