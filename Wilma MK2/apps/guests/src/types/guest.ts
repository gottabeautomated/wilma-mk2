export interface Guest {
  id: string;
  wedding_id: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  relationship_to_couple?: string;
  side?: 'bride' | 'groom' | 'both';
  rsvp_status: 'pending' | 'confirmed' | 'declined' | 'maybe';
  rsvp_date?: string;
  plus_one: boolean;
  plus_one_name?: string;
  plus_one_rsvp?: 'pending' | 'confirmed' | 'declined' | 'maybe';
  dietary_restrictions: string[];
  special_requirements?: string;
  accommodation_needed: boolean;
  table_assignment_id?: string;
  seat_number?: number;
  seating_preferences?: string;
  photo_url?: string;
  photo_source?: string;
  invitation_sent: boolean;
  invitation_sent_at?: string;
  thank_you_sent: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Table {
  id: string;
  wedding_id: string;
  name: string;
  type: TableType;
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  seats: number;
  custom_shape?: string;
  style: {
    color: string;
    material?: 'wood' | 'glass' | 'marble' | 'metal';
    pattern?: 'solid' | 'gradient' | 'floral' | 'geometric' | 'rustic';
  };
  created_at: string;
  updated_at: string;
}

export interface GuestSeat {
  id: string;
  guest_id: string;
  table_id: string;
  seat_number: number;
  assigned_at: string;
  assigned_by?: string;
  guest?: Guest;
  table?: Table;
}

export interface GuestRelationship {
  id: string;
  wedding_id: string;
  guest1_id: string;
  guest2_id: string;
  relationship_type: 'family' | 'friend' | 'colleague' | 'partner' | 'enemy' | 'ex' | 'acquaintance';
  strength: number;
  should_sit_together: boolean;
  notes?: string;
  created_at: string;
  guest1?: Guest;
  guest2?: Guest;
}

export interface VenueLayout {
  id: string;
  wedding_id: string;
  name: string;
  original_sketch_url?: string;
  svg_layout: string;
  real_dimensions: {
    width: number;
    height: number;
  };
  elements: VenueElement[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VenueElement {
  id: string;
  type: 'wall' | 'door' | 'window' | 'stage' | 'bar' | 'restroom' | 'entrance' | 'kitchen' | 'dance_floor';
  position: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  rotation: number;
  style?: {
    color?: string;
    pattern?: string;
    icon?: string;
  };
}

export interface SeatingOptimization {
  id: string;
  wedding_id: string;
  optimization_score: number;
  algorithm_version: string;
  parameters: Record<string, any>;
  result_data: {
    tables: Table[];
    assignments: GuestSeat[];
    improvements: string[];
    conflicts_resolved: number;
    happiness_factors: {
      family_proximity: number;
      friend_groups: number;
      conflict_avoidance: number;
      table_balance: number;
    };
  };
  applied: boolean;
  applied_at?: string;
  created_at: string;
}

export interface TablePreset {
  id: string;
  user_id?: string;
  name: string;
  type: TableType;
  seats: number;
  custom_shape?: string;
  style: Table['style'];
  is_public: boolean;
  usage_count: number;
  created_at: string;
}

export interface GuestPhoto {
  id: string;
  guest_id: string;
  storage_path: string;
  original_filename?: string;
  file_size?: number;
  crop_data?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  processed: boolean;
  created_at: string;
}

export interface SeatingAnalytics {
  id: string;
  wedding_id: string;
  user_id?: string;
  session_id?: string;
  event_type: string;
  event_data: Record<string, any>;
  user_agent?: string;
  created_at: string;
}

export interface SeatingChartState {
  selectedTable: string | null;
  selectedGuest: string | null;
  draggedTable: string | null;
  zoom: number;
  pan: { x: number; y: number };
  showRelationships: boolean;
  showConflicts: boolean;
  viewMode: 'edit' | 'preview';
}

export interface SeatingStats {
  wedding_id: string;
  total_guests: number;
  assigned_guests: number;
  unassigned_guests: number;
  total_tables: number;
  occupied_tables: number;
  assignment_percentage: number;
}

export interface ConflictDetection {
  type: 'relationship' | 'dietary' | 'accessibility' | 'capacity';
  severity: 'low' | 'medium' | 'high';
  description: string;
  affected_guests: string[];
  suggested_resolution?: string;
}

export interface AISeatingParams {
  prioritize_family: boolean;
  separate_conflicts: boolean;
  balance_tables: boolean;
  consider_dietary: boolean;
  accessibility_first: boolean;
  custom_weights?: {
    relationship_strength: number;
    table_balance: number;
    proximity_to_head_table: number;
    dietary_compatibility: number;
  };
}

export interface SeatingAlgorithmResult {
  success: boolean;
  optimization_score: number;
  assignments: Array<{
    guest_id: string;
    table_id: string;
    seat_number: number;
    confidence: number;
  }>;
  improvements: string[];
  conflicts_resolved: ConflictDetection[];
  remaining_conflicts: ConflictDetection[];
  execution_time_ms: number;
}

export interface GuestFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  relationship_to_couple: string;
  plus_one: boolean;
  dietary_restrictions: string[];
  notes: string;
}

export interface TableFormData {
  name: string;
  type: TableType;
  seats: number;
  color: string;
  material?: string;
}

export interface VenueFormData {
  name: string;
  real_width: number;
  real_height: number;
  sketch_file?: File;
}

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

export type TableType = 'round' | 'rectangle' | 'oval' | 'custom' | 'l_shape' | 'u_shape';

export interface GuestStore {
  guests: Guest[];
  tables: Table[];
  relationships: GuestRelationship[];
  venueLayout: VenueLayout | null;
  optimizations: SeatingOptimization[];
  currentWeddingId: string | null;
  isLoading: boolean;
  error: string | null;
  
  fetchGuests: () => Promise<void>;
  addGuest: (guest: Omit<Guest, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateGuest: (id: string, updates: Partial<Guest>) => Promise<void>;
  deleteGuest: (id: string) => Promise<void>;
  
  fetchTables: () => Promise<void>;
  addTable: (table: Omit<Table, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTable: (id: string, updates: Partial<Table>) => Promise<void>;
  deleteTable: (id: string) => Promise<void>;
  
  assignGuestToSeat: (guestId: string, tableId: string, seatNumber: number) => Promise<void>;
  removeGuestFromSeat: (guestId: string) => Promise<void>;
  
  runOptimization: (parameters: AISeatingParams) => Promise<SeatingOptimization>;
  applyOptimization: (optimizationId: string) => Promise<void>;
  
  setCurrentWedding: (weddingId: string) => void;
  clearData: () => void;
}

export interface ApiResponse<T> {
  data: T;
  error: null;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code: string;
    details?: any;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export type DragItem = {
  type: 'table' | 'guest';
  id: string;
  position: {
    x: number;
    y: number;
  };
};

export type Point = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type RelationshipStrength = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type RelationshipType = GuestRelationship['relationship_type'];
export type VenueElementType = VenueElement['type']; 