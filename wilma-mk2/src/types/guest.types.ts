// Erweiterte Guest-Interface für CSV-Export-Features
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
  plusOneRsvp?: 'pending' | 'confirmed' | 'declined' | 'maybe'
  hasPlusOne: boolean
  dietaryRestrictions?: string
  specialRequirements?: string
  accommodationNeeded?: boolean
  tableAssignment?: string
  seatAssignment?: number
  invitationSent?: boolean
  invitationSentAt?: string
  thankYouSent?: boolean
  notes?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

// Filter-Interface für Gäste-Suche (erweitert)
export interface GuestFilters {
  search?: string
  side?: 'bride' | 'groom' | 'both' | 'all'
  rsvpStatus?: 'pending' | 'confirmed' | 'declined' | 'maybe' | 'all'
  plusOne?: 'yes' | 'no' | 'all'
  tableAssigned?: 'yes' | 'no' | 'all'
  dietary?: 'yes' | 'no' | 'all'
  invitationSent?: 'yes' | 'no' | 'all'
}

// Sort-Interface für Gäste-Sortierung
export interface GuestSort {
  field: keyof Guest
  direction: 'asc' | 'desc'
}

// Statistiken-Interface (erweitert)
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
  invitationsSent: number
}

// Export-Konfiguration-Interface
export interface ExportConfig {
  format: 'csv' | 'excel' | 'pdf'
  includeFields: string[]
  filters: {
    rsvpStatus: string[]
    side: string[]
    tableAssigned: 'all' | 'assigned' | 'unassigned'
    plusOneAllowed: 'all' | 'allowed' | 'not_allowed'
    invitationSent: 'all' | 'sent' | 'not_sent'
  }
  groupBy: 'none' | 'side' | 'table' | 'rsvp_status'
  sortBy: 'name' | 'rsvp_date' | 'table' | 'side'
}

// Verfügbare Felder für Export
export interface ExportField {
  key: string
  label: string
  category: 'basic' | 'contact' | 'rsvp' | 'plus_one' | 'special' | 'seating' | 'communication' | 'other'
}

// Export-Preset-Interface
export interface ExportPreset {
  name: string
  description: string
  fields: string[]
}

// Mapping zwischen neuen und alten Guest-Typen
export function mapLegacyGuest(legacyGuest: any): Guest {
  return {
    id: legacyGuest.id,
    firstName: legacyGuest.first_name,
    lastName: legacyGuest.last_name,
    email: legacyGuest.email,
    phone: legacyGuest.phone,
    relationship: legacyGuest.relationship_to_couple,
    side: 'both', // Default, da im Legacy-Schema nicht vorhanden
    rsvpStatus: legacyGuest.rsvp_status,
    plusOneAllowed: legacyGuest.plus_one || false,
    hasPlusOne: false, // Default
    dietaryRestrictions: legacyGuest.dietary_restrictions?.join('; ') || '',
    tableAssignment: legacyGuest.table_assignment_id,
    seatAssignment: legacyGuest.seat_number,
    notes: legacyGuest.notes,
    createdAt: legacyGuest.created_at,
    updatedAt: legacyGuest.updated_at
  }
}

// Mapping von neuen zu Legacy-Guest-Typen
export function mapToLegacyGuest(guest: Guest): any {
  return {
    id: guest.id,
    first_name: guest.firstName,
    last_name: guest.lastName,
    email: guest.email,
    phone: guest.phone,
    relationship_to_couple: guest.relationship,
    rsvp_status: guest.rsvpStatus,
    plus_one: guest.plusOneAllowed,
    dietary_restrictions: guest.dietaryRestrictions ? guest.dietaryRestrictions.split(';').map(d => d.trim()) : [],
    table_assignment_id: guest.tableAssignment,
    seat_number: guest.seatAssignment,
    notes: guest.notes,
    created_at: guest.createdAt,
    updated_at: guest.updatedAt,
    wedding_id: 'current' // Wird vom System gesetzt
  }
} 