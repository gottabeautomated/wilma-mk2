export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      weddings: {
        Row: {
          id: string;
          user_id: string;
          wedding_date: string | null;
          guest_count: number | null;
          budget: number | null;
          location: string | null;
          style: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          wedding_date?: string | null;
          guest_count?: number | null;
          budget?: number | null;
          location?: string | null;
          style?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          wedding_date?: string | null;
          guest_count?: number | null;
          budget?: number | null;
          location?: string | null;
          style?: string | null;
          created_at?: string;
        };
      };
      budget_calculations: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string | null;
          wedding_id: string | null;
          input_data: Json;
          results: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          wedding_id?: string | null;
          input_data: Json;
          results: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          wedding_id?: string | null;
          input_data?: Json;
          results?: Json;
          created_at?: string;
        };
      };
      email_captures: {
        Row: {
          id: string;
          email: string;
          source: string;
          capture_data: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source: string;
          capture_data?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string;
          capture_data?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
