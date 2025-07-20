// Basis-Guest-Interface
export interface Guest {
  id: string
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  relationship?: string
  side: 'bride' | 'groom' | 'both'
  rsvpStatus: 'pending' | 'confirmed' | 'declined' | 'maybe'
  rsvpDate?: string
  plusOneAllowed: boolean
  plusOneName?: string
  plusOneRsvpStatus?: 'pending' | 'confirmed' | 'declined' | 'maybe'
  plusOneRsvp?: 'pending' | 'confirmed' | 'declined' | 'maybe' // Alias für plusOneRsvpStatus
  hasPlusOne: boolean
  dietaryRestrictions?: string
  specialRequirements?: string
  accommodationNeeded: boolean
  notes?: string
  tableId?: string
  tableAssignment?: string // Alias für tableId
  seatNumber?: number
  seatAssignment?: number // Alias für seatNumber
  invited: boolean
  invitationSent?: boolean // Alias für invited
  invitationSentAt?: string
  thankYouSent?: boolean
  checkedIn: boolean
  transportNeeded: boolean
  avatar?: string
  createdAt: string
  updatedAt: string
}

// Filter-Interface für Gäste-Suche
export interface GuestFilters {
  search?: string
  side?: 'bride' | 'groom' | 'both' | 'all'
  rsvpStatus?: 'pending' | 'confirmed' | 'declined' | 'maybe' | 'all'
  plusOne?: 'yes' | 'no' | 'all'
  tableAssigned?: 'yes' | 'no' | 'all'
  dietary?: 'yes' | 'no' | 'all'
}

// Sort-Interface für Gäste-Sortierung
export interface GuestSort {
  field: keyof Guest
  direction: 'asc' | 'desc'
}

// Statistiken-Interface
export interface GuestStats {
  total: number
  confirmed: number
  declined: number
  pending: number
  maybe: number
  plusOnes: number
  withTable: number
  withDietary: number
  checkedIn: number
}

// Bulk-Aktionen-Interface
export interface BulkAction {
  type: 'rsvp' | 'plusOne' | 'table' | 'dietary' | 'side' | 'invite' | 'accommodation' | 'delete'
  value?: any
  guestIds: string[]
}

// Tisch-Interface
export interface Table {
  id: string
  number: number
  name?: string
  capacity: number
  occupied: number
  guests: Guest[]
  x?: number
  y?: number
}

// Sitzplan-Interface
export interface SeatingChart {
  id: string
  name: string
  tables: Table[]
  guests: Guest[]
  createdAt: string
  updatedAt: string
}

// Form-Daten für Gast-Erstellung/Bearbeitung
export interface GuestFormData {
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  relationship?: string
  side: 'bride' | 'groom' | 'both'
  rsvpStatus: 'pending' | 'confirmed' | 'declined' | 'maybe'
  plusOneAllowed: boolean
  plusOneName?: string
  plusOneRsvpStatus?: 'pending' | 'confirmed' | 'declined' | 'maybe'
  dietaryRestrictions?: string[]
  specialRequirements?: string
  notes?: string
  accommodationNeeded?: boolean
  transportNeeded?: boolean
}

// Export-Typen
export type GuestExportFormat = 'csv' | 'excel' | 'pdf'

export interface ExportOptions {
  format: GuestExportFormat
  fields: (keyof Guest)[]
  filters?: GuestFilters
  includeStatistics?: boolean
}

// API-Response-Typen
export interface GuestResponse {
  success: boolean
  data?: Guest | Guest[]
  error?: string
  message?: string
}

export interface GuestListResponse {
  success: boolean
  data?: {
    guests: Guest[]
    total: number
    stats: GuestStats
  }
  error?: string
  message?: string
} 