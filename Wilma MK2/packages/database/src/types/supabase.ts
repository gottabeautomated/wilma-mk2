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
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
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
      }
      weddings: {
        Row: {
          id: string
          user_id: string
          partner_name: string | null
          wedding_date: string | null
          guest_count: number | null
          budget: number | null
          location: string | null
          style: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          partner_name?: string | null
          wedding_date?: string | null
          guest_count?: number | null
          budget?: number | null
          location?: string | null
          style?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          partner_name?: string | null
          wedding_date?: string | null
          guest_count?: number | null
          budget?: number | null
          location?: string | null
          style?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      budget_categories: {
        Row: {
          id: string
          wedding_id: string
          name: string
          amount: number
          percentage: number
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          name: string
          amount: number
          percentage: number
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          name?: string
          amount?: number
          percentage?: number
          created_at?: string
        }
      }
      venues: {
        Row: {
          id: string
          name: string
          location: string
          capacity: number
          price_per_guest: number
          description: string | null
          image_url: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          capacity: number
          price_per_guest: number
          description?: string | null
          image_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          capacity?: number
          price_per_guest?: number
          description?: string | null
          image_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          wedding_id: string
          name: string
          email: string | null
          phone: string | null
          rsvp_status: string | null
          dietary_restrictions: string | null
          plus_one: boolean
          plus_one_name: string | null
          table_number: number | null
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          name: string
          email?: string | null
          phone?: string | null
          rsvp_status?: string | null
          dietary_restrictions?: string | null
          plus_one?: boolean
          plus_one_name?: string | null
          table_number?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          rsvp_status?: string | null
          dietary_restrictions?: string | null
          plus_one?: boolean
          plus_one_name?: string | null
          table_number?: number | null
          created_at?: string
        }
      }
      timeline_events: {
        Row: {
          id: string
          wedding_id: string
          title: string
          description: string | null
          event_date: string
          event_time: string | null
          location: string | null
          category: string
          is_completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          title: string
          description?: string | null
          event_date: string
          event_time?: string | null
          location?: string | null
          category: string
          is_completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          title?: string
          description?: string | null
          event_date?: string
          event_time?: string | null
          location?: string | null
          category?: string
          is_completed?: boolean
          created_at?: string
        }
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
  }
} 