export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      weddings: {
        Row: {
          id: string
          user_id: string
          partner_user_id: string | null
          wedding_date: string | null
          venue_name: string | null
          venue_address: string | null
          guest_count: number
          budget: string | null
          style: Database["public"]["Enums"]["wedding_style"] | null
          theme_colors: Json | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          partner_user_id?: string | null
          wedding_date?: string | null
          venue_name?: string | null
          venue_address?: string | null
          guest_count?: number
          budget?: string | null
          style?: Database["public"]["Enums"]["wedding_style"] | null
          theme_colors?: Json | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          partner_user_id?: string | null
          wedding_date?: string | null
          venue_name?: string | null
          venue_address?: string | null
          guest_count?: number
          budget?: string | null
          style?: Database["public"]["Enums"]["wedding_style"] | null
          theme_colors?: Json | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "weddings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weddings_partner_user_id_fkey"
            columns: ["partner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      budget_calculations: {
        Row: {
          id: string
          wedding_id: string | null
          user_id: string | null
          session_id: string | null
          input_data: Json
          total_budget: string | null
          category_breakdown: Json | null
          ai_recommendations: Json | null
          regional_factors: Json | null
          confidence_score: string | null
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id?: string | null
          user_id?: string | null
          session_id?: string | null
          input_data: Json
          total_budget?: string | null
          category_breakdown?: Json | null
          ai_recommendations?: Json | null
          regional_factors?: Json | null
          confidence_score?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string | null
          user_id?: string | null
          session_id?: string | null
          input_data?: Json
          total_budget?: string | null
          category_breakdown?: Json | null
          ai_recommendations?: Json | null
          regional_factors?: Json | null
          confidence_score?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_calculations_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budget_calculations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      timelines: {
        Row: {
          id: string
          wedding_id: string
          user_id: string
          input_data: Json
          generated_timeline: Json | null
          ai_recommendations: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          user_id: string
          input_data: Json
          generated_timeline?: Json | null
          ai_recommendations?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          user_id?: string
          input_data?: Json
          generated_timeline?: Json | null
          ai_recommendations?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "timelines_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timelines_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      timeline_tasks: {
        Row: {
          id: string
          timeline_id: string
          wedding_id: string
          task_name: string
          description: string | null
          category: string | null
          due_date: string
          estimated_duration: number | null
          priority: Database["public"]["Enums"]["task_priority"]
          dependencies: string[] | null
          is_completed: boolean
          assigned_to: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          timeline_id: string
          wedding_id: string
          task_name: string
          description?: string | null
          category?: string | null
          due_date: string
          estimated_duration?: number | null
          priority?: Database["public"]["Enums"]["task_priority"]
          dependencies?: string[] | null
          is_completed?: boolean
          assigned_to?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          timeline_id?: string
          wedding_id?: string
          task_name?: string
          description?: string | null
          category?: string | null
          due_date?: string
          estimated_duration?: number | null
          priority?: Database["public"]["Enums"]["task_priority"]
          dependencies?: string[] | null
          is_completed?: boolean
          assigned_to?: string | null
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "timeline_tasks_timeline_id_fkey"
            columns: ["timeline_id"]
            isOneToOne: false
            referencedRelation: "timelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeline_tasks_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timeline_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      guests: {
        Row: {
          id: string
          wedding_id: string
          first_name: string
          last_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          relationship: string | null
          side: string | null
          rsvp_status: Database["public"]["Enums"]["rsvp_status"]
          rsvp_date: string | null
          plus_one: boolean
          plus_one_name: string | null
          plus_one_rsvp: Database["public"]["Enums"]["rsvp_status"] | null
          dietary_restrictions: string[] | null
          special_requirements: string | null
          accommodation_needed: boolean
          table_assignment: number | null
          seat_assignment: string | null
          invitation_sent: boolean
          invitation_sent_at: string | null
          thank_you_sent: boolean
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          first_name: string
          last_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          relationship?: string | null
          side?: string | null
          rsvp_status?: Database["public"]["Enums"]["rsvp_status"]
          rsvp_date?: string | null
          plus_one?: boolean
          plus_one_name?: string | null
          plus_one_rsvp?: Database["public"]["Enums"]["rsvp_status"] | null
          dietary_restrictions?: string[] | null
          special_requirements?: string | null
          accommodation_needed?: boolean
          table_assignment?: number | null
          seat_assignment?: string | null
          invitation_sent?: boolean
          invitation_sent_at?: string | null
          thank_you_sent?: boolean
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          first_name?: string
          last_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          relationship?: string | null
          side?: string | null
          rsvp_status?: Database["public"]["Enums"]["rsvp_status"]
          rsvp_date?: string | null
          plus_one?: boolean
          plus_one_name?: string | null
          plus_one_rsvp?: Database["public"]["Enums"]["rsvp_status"] | null
          dietary_restrictions?: string[] | null
          special_requirements?: string | null
          accommodation_needed?: boolean
          table_assignment?: number | null
          seat_assignment?: string | null
          invitation_sent?: boolean
          invitation_sent_at?: string | null
          thank_you_sent?: boolean
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guests_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          }
        ]
      }
      venue_analyses: {
        Row: {
          id: string
          wedding_id: string | null
          user_id: string | null
          session_id: string | null
          venue_name: string | null
          image_urls: string[] | null
          analysis_results: Json | null
          compatibility_score: string | null
          ai_recommendations: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id?: string | null
          user_id?: string | null
          session_id?: string | null
          venue_name?: string | null
          image_urls?: string[] | null
          analysis_results?: Json | null
          compatibility_score?: string | null
          ai_recommendations?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string | null
          user_id?: string | null
          session_id?: string | null
          venue_name?: string | null
          image_urls?: string[] | null
          analysis_results?: Json | null
          compatibility_score?: string | null
          ai_recommendations?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_analyses_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_analyses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      stress_assessments: {
        Row: {
          id: string
          wedding_id: string | null
          user_id: string
          stress_level: number | null
          stress_factors: string[] | null
          mood_rating: number | null
          sleep_quality: number | null
          exercise_frequency: number | null
          support_system_rating: number | null
          planning_enjoyment: number | null
          overwhelm_factors: Json | null
          coping_strategies: string[] | null
          notes: string | null
          ai_recommendations: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id?: string | null
          user_id: string
          stress_level?: number | null
          stress_factors?: string[] | null
          mood_rating?: number | null
          sleep_quality?: number | null
          exercise_frequency?: number | null
          support_system_rating?: number | null
          planning_enjoyment?: number | null
          overwhelm_factors?: Json | null
          coping_strategies?: string[] | null
          notes?: string | null
          ai_recommendations?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string | null
          user_id?: string
          stress_level?: number | null
          stress_factors?: string[] | null
          mood_rating?: number | null
          sleep_quality?: number | null
          exercise_frequency?: number | null
          support_system_rating?: number | null
          planning_enjoyment?: number | null
          overwhelm_factors?: Json | null
          coping_strategies?: string[] | null
          notes?: string | null
          ai_recommendations?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stress_assessments_wedding_id_fkey"
            columns: ["wedding_id"]
            isOneToOne: false
            referencedRelation: "weddings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stress_assessments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          source: string
          capture_data?: Json | null
          consent_marketing?: boolean
          converted_to_signup?: boolean
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          source?: string
          capture_data?: Json | null
          consent_marketing?: boolean
          converted_to_signup?: boolean
          user_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_captures_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tool_sessions: {
        Row: {
          id: string
          user_id: string | null
          session_id: string
          tool_name: string
          session_data: Json | null
          started_at: string
          completed_at: string | null
          completion_percentage: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id: string
          tool_name: string
          session_data?: Json | null
          started_at?: string
          completed_at?: string | null
          completion_percentage?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string
          tool_name?: string
          session_data?: Json | null
          started_at?: string
          completed_at?: string | null
          completion_percentage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      wedding_style: "modern" | "rustic" | "classic" | "boho" | "vintage" | "outdoor" | "industrial"
      rsvp_status: "pending" | "confirmed" | "declined" | "maybe"
      task_priority: "low" | "medium" | "high" | "critical"
      venue_type: "indoor" | "outdoor" | "destination" | "mixed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 