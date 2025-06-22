export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      budget_calculations: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          input_data: Json
          total_budget: number | null
          category_breakdown: Json | null
          ai_recommendations: Json | null
          regional_factors: Json | null
          confidence_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          input_data: Json
          total_budget?: number | null
          category_breakdown?: Json | null
          ai_recommendations?: Json | null
          regional_factors?: Json | null
          confidence_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          input_data?: Json
          total_budget?: number | null
          category_breakdown?: Json | null
          ai_recommendations?: Json | null
          regional_factors?: Json | null
          confidence_score?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_calculations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      
      email_captures: {
        Row: {
          id: string
          email: string
          source: string
          capture_data: Json | null
          consent_marketing: boolean
          converted_to_signup: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          source: string
          capture_data?: Json | null
          consent_marketing?: boolean
          converted_to_signup?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          source?: string
          capture_data?: Json | null
          consent_marketing?: boolean
          converted_to_signup?: boolean
          created_at?: string
        }
        Relationships: []
      }
      
      tool_sessions: {
        Row: {
          id: string
          user_id: string | null
          tool_name: string
          session_data: Json | null
          started_at: string
          completed_at: string | null
          completion_percentage: number | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          tool_name: string
          session_data?: Json | null
          started_at?: string
          completed_at?: string | null
          completion_percentage?: number | null
        }
        Update: {
          id?: string
          user_id?: string | null
          tool_name?: string
          session_data?: Json | null
          started_at?: string
          completed_at?: string | null
          completion_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_sessions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      
      weddings: {
        Row: {
          id: string
          user_id: string
          name: string
          date: string | null
          location: string | null
          budget: number | null
          guest_count: number | null
          details: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          date?: string | null
          location?: string | null
          budget?: number | null
          guest_count?: number | null
          details?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          date?: string | null
          location?: string | null
          budget?: number | null
          guest_count?: number | null
          details?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "weddings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      
      guests: {
        Row: {
          id: string
          wedding_id: string
          name: string
          email: string | null
          phone: string | null
          rsvp_status: string | null
          party_size: number | null
          dietary_restrictions: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          name: string
          email?: string | null
          phone?: string | null
          rsvp_status?: string | null
          party_size?: number | null
          dietary_restrictions?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          rsvp_status?: string | null
          party_size?: number | null
          dietary_restrictions?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guests_wedding_id_fkey"
            columns: ["wedding_id"]
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          }
        ]
      }
      
      budget_items: {
        Row: {
          id: string
          wedding_id: string
          category: string
          name: string
          estimated_cost: number | null
          actual_cost: number | null
          paid: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          category: string
          name: string
          estimated_cost?: number | null
          actual_cost?: number | null
          paid?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          category?: string
          name?: string
          estimated_cost?: number | null
          actual_cost?: number | null
          paid?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_items_wedding_id_fkey"
            columns: ["wedding_id"]
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    
    Views: {
      [_ in never]: never
    }
    
    Functions: {
      [_ in never]: never
    }
    
    Enums: {
      [_ in never]: never
    }
    
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
