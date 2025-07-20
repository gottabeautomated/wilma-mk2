export interface Wedding {
  id: string;
  user_id: string;
  partner_user_id?: string;
  wedding_date?: string;
  venue_name?: string;
  venue_address?: string;
  guest_count: number;
  budget?: number;
  style?: 'modern' | 'rustic' | 'classic' | 'boho' | 'vintage' | 'outdoor' | 'industrial';
  theme_colors?: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at: string;
  couple_name?: string;
}

export interface WeddingFormData {
  wedding_date?: string;
  venue_name?: string;
  venue_address?: string;
  guest_count?: number;
  budget?: number;
  style?: Wedding['style'];
  theme_colors?: any;
  notes?: string;
  partner_user_id?: string;
} 