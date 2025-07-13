import { createClient } from '@supabase/supabase-js'
import { Table, Guest, Wedding, SeatingStats } from '../types/guest'

// Supabase configuration
const supabaseUrl = 'https://pvywnqmzjdqhvlpwbfwz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eXducW16amRxaHZscHdiZnd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MzEwNjcsImV4cCI6MjA1MTUwNzA2N30.5bKEVVfHCIkQNYdvJGVUkIzMqmTdCBPvayWqzZTIHLI'

// Environment detection for Vite
const isDevelopment = (import.meta as any).env?.MODE === 'development'

// Create single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true
  }
})

console.log(`🔗 ${isDevelopment ? 'Development' : 'Production'} Mode: Using centralized Supabase client`)

// Track if Supabase tables exist
let supabaseTablesExist: boolean | null = null // null = not tested, true = exist, false = don't exist

if (isDevelopment) {
  console.log('🚧 Development Mode: Using mock Supabase API')
} else {
  console.log('🔗 Production Mode: Testing Supabase connection...')
}

// Mock data for development
const mockTables: Table[] = [
  {
    id: 'table-1',
    wedding_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Tisch 1',
    type: 'round',
    position: { x: 300, y: 200 },
    rotation: 0,
    seats: 8,
    style: { color: '#6B46C1' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'table-2',
    wedding_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Tisch 2',
    type: 'round',
    position: { x: 600, y: 200 },
    rotation: 0,
    seats: 6,
    style: { color: '#D4AF37' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const mockGuests: Guest[] = [
  {
    id: 'guest-1',
    wedding_id: 'default-wedding-id',
    first_name: 'Anna',
    last_name: 'Müller',
    email: 'anna.mueller@email.com',
    phone: '+49 151 12345678',
    relationship_to_couple: 'Schwester der Braut',
    side: 'bride',
    rsvp_status: 'confirmed',
    plus_one: false,
    dietary_restrictions: [],
    accommodation_needed: false,
    invitation_sent: true,
    thank_you_sent: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'guest-2',
    wedding_id: 'default-wedding-id',
    first_name: 'Max',
    last_name: 'Schmidt',
    email: 'max.schmidt@email.com',
    phone: '+49 151 87654321',
    relationship_to_couple: 'Bester Freund',
    side: 'groom',
    rsvp_status: 'confirmed',
    plus_one: true,
    plus_one_name: 'Lisa Schmidt',
    dietary_restrictions: ['vegetarian'],
    accommodation_needed: true,
    invitation_sent: true,
    thank_you_sent: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const mockWedding: Wedding = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  user_id: 'user-1',
  partner_user_id: 'user-2',
  couple_name: 'Emma & Max',
  wedding_date: '2024-06-15',
  venue_name: 'Schloss Bellevue',
  venue_address: 'Spreeweg 1, 10557 Berlin',
  guest_count: 120,
  style: 'classic',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// Helper function to check if we should use mock data
const shouldUseMockData = () => {
  return isDevelopment || supabaseTablesExist === false
}

// Mock API for development
const mockAPI = {
  async getTables(wedding_id: string) {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    return { 
      data: mockTables.filter(t => t.wedding_id === wedding_id), 
      error: null 
    }
  },

  async createTable(table: any) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newTable = {
      ...table,
      id: table.id || `table-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    // Check if table with same ID already exists
    const existingIndex = mockTables.findIndex(t => t.id === newTable.id)
    if (existingIndex !== -1) {
      // Update existing table
      mockTables[existingIndex] = newTable
    } else {
      // Add new table
      mockTables.push(newTable)
    }
    return { data: newTable, error: null }
  },

  async updateTable(id: string, updates: any) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = mockTables.findIndex(t => t.id === id)
    if (index !== -1) {
      mockTables[index] = { ...mockTables[index], ...updates, updated_at: new Date().toISOString() }
      return { data: mockTables[index], error: null }
    }
    return { data: null, error: { message: 'Table not found' } }
  },

  async deleteTable(id: string) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = mockTables.findIndex(t => t.id === id)
    if (index !== -1) {
      mockTables.splice(index, 1)
      return { error: null }
    }
    return { error: { message: 'Table not found' } }
  },

  async getGuests(wedding_id: string) {
    await new Promise(resolve => setTimeout(resolve, 400))
    return { 
      data: mockGuests.filter(g => g.wedding_id === wedding_id), 
      error: null 
    }
  },

  async assignGuestToSeat(guest_id: string, table_assignment_id: string, seat_number: number) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const guest = mockGuests.find(g => g.id === guest_id)
    if (guest) {
      guest.table_assignment_id = table_assignment_id
      guest.seat_number = seat_number
      guest.updated_at = new Date().toISOString()
      return { data: guest, error: null }
    }
    return { data: null, error: { message: 'Guest not found' } }
  },

  async removeGuestFromSeat(guest_id: string) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const guest = mockGuests.find(g => g.id === guest_id)
    if (guest) {
      guest.table_assignment_id = undefined
      guest.seat_number = undefined
      guest.updated_at = new Date().toISOString()
      return { data: guest, error: null }
    }
    return { data: null, error: { message: 'Guest not found' } }
  },

  async getWedding(wedding_id: string) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { 
      data: mockWedding.id === wedding_id ? mockWedding : null, 
      error: mockWedding.id === wedding_id ? null : { message: 'Wedding not found' }
    }
  },

  subscribeToSeatingChanges(wedding_id: string, callback: (payload: any) => void) {
    console.log(`📡 Mock subscription for wedding ${wedding_id}`)
    // Mock subscription - return cleanup function
    return () => {
      console.log(`🔌 Mock subscription cleanup for wedding ${wedding_id}`)
    }
  },

  async trackSeatingEvent(wedding_id: string, event_type: string, event_data: any) {
    console.log(`📊 Mock analytics: ${event_type}`, { wedding_id, event_data })
    return { error: null }
  },

  async getSeatingStats(wedding_id: string) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const guests = mockGuests.filter(g => g.wedding_id === wedding_id)
    const tables = mockTables.filter(t => t.wedding_id === wedding_id)
    
    const assignedGuests = guests.filter(g => g.table_assignment_id).length
    const occupiedTables = tables.filter(t => 
      guests.some(g => g.table_assignment_id === t.id)
    ).length

    return {
      data: {
        wedding_id,
        total_guests: guests.length,
        assigned_guests: assignedGuests,
        unassigned_guests: guests.length - assignedGuests,
        total_tables: tables.length,
        occupied_tables: occupiedTables,
        assignment_percentage: guests.length > 0 ? (assignedGuests / guests.length) * 100 : 0
      },
      error: null
    }
  }
}

// Production API with smart fallback
const productionAPI = {
  async getTables(wedding_id: string) {
    if (shouldUseMockData()) {
      return await mockAPI.getTables(wedding_id)
    }

    try {
      const { data, error } = await supabase!
        .from('tables')
        .select('*')
        .eq('wedding_id', wedding_id)
        .order('created_at')
      
      if (error && error.code === 'PGRST116') {
        // Table doesn't exist - switch to mock mode
        if (supabaseTablesExist === null) {
          console.log('📋 Supabase tables not found. Using mock data for demo.')
          supabaseTablesExist = false
        }
        return await mockAPI.getTables(wedding_id)
      }
      
      if (supabaseTablesExist === null) {
        console.log('✅ Supabase connected successfully!')
        supabaseTablesExist = true
      }
      
      return { data, error }
    } catch (error) {
      if (supabaseTablesExist === null) {
        console.log('📋 Supabase connection failed. Using mock data for demo.')
        supabaseTablesExist = false
      }
      return await mockAPI.getTables(wedding_id)
    }
  },

  async createTable(table: any) {
    if (shouldUseMockData()) {
      return await mockAPI.createTable(table)
    }

    try {
      const { data, error } = await supabase!
        .from('tables')
        .insert(table)
        .select()
        .single()
      
      if (error && error.code === 'PGRST116') {
        return await mockAPI.createTable(table)
      }
      
      return { data, error }
    } catch (error) {
      return await mockAPI.createTable(table)
    }
  },

  async updateTable(id: string, updates: any) {
    if (shouldUseMockData()) {
      return await mockAPI.updateTable(id, updates)
    }

    try {
      const { data, error } = await supabase!
        .from('tables')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()
      
      if (error && error.code === 'PGRST116') {
        return await mockAPI.updateTable(id, updates)
      }
      
      return { data, error }
    } catch (error) {
      return await mockAPI.updateTable(id, updates)
    }
  },

  async deleteTable(id: string) {
    if (shouldUseMockData()) {
      return await mockAPI.deleteTable(id)
    }

    try {
      const { error } = await supabase!
        .from('tables')
        .delete()
        .eq('id', id)
      
      return { error }
    } catch (error) {
      return await mockAPI.deleteTable(id)
    }
  },

  async getGuests(wedding_id: string) {
    if (shouldUseMockData()) {
      return await mockAPI.getGuests(wedding_id)
    }

    try {
      const { data, error } = await supabase!
        .from('guests')
        .select('*')
        .eq('wedding_id', wedding_id)
        .order('created_at')
      
      if (error && error.code === 'PGRST116') {
        return await mockAPI.getGuests(wedding_id)
      }
      
      return { data, error }
    } catch (error) {
      return await mockAPI.getGuests(wedding_id)
    }
  },

  async assignGuestToSeat(guest_id: string, table_assignment_id: string, seat_number: number) {
    if (shouldUseMockData()) {
      return await mockAPI.assignGuestToSeat(guest_id, table_assignment_id, seat_number)
    }

    try {
      const { data, error } = await supabase!
        .from('guests')
        .update({
          table_assignment_id,
          seat_number,
          updated_at: new Date().toISOString()
        })
        .eq('id', guest_id)
        .select()
        .single()
      
      if (error && error.code === 'PGRST116') {
        return await mockAPI.assignGuestToSeat(guest_id, table_assignment_id, seat_number)
      }
      
      return { data, error }
    } catch (error) {
      return await mockAPI.assignGuestToSeat(guest_id, table_assignment_id, seat_number)
    }
  },

  async removeGuestFromSeat(guest_id: string) {
    if (shouldUseMockData()) {
      return await mockAPI.removeGuestFromSeat(guest_id)
    }

    try {
      const { data, error } = await supabase!
        .from('guests')
        .update({
          table_assignment_id: null,
          seat_number: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', guest_id)
        .select()
        .single()
      
      if (error && error.code === 'PGRST116') {
        return await mockAPI.removeGuestFromSeat(guest_id)
      }
      
      return { data, error }
    } catch (error) {
      return await mockAPI.removeGuestFromSeat(guest_id)
    }
  },

  async getWedding(wedding_id: string) {
    if (shouldUseMockData()) {
      return await mockAPI.getWedding(wedding_id)
    }

    try {
      const { data, error } = await supabase!
        .from('weddings')
        .select('*')
        .eq('id', wedding_id)
        .single()
      
      if (error && error.code === 'PGRST116') {
        return await mockAPI.getWedding(wedding_id)
      }
      
      return { data, error }
    } catch (error) {
      return await mockAPI.getWedding(wedding_id)
    }
  },

  subscribeToSeatingChanges(wedding_id: string, callback: (payload: any) => void) {
    // Temporarily disable all Realtime subscriptions to prevent WebSocket errors
    console.info('📡 Realtime temporarily disabled for production API to prevent WebSocket errors');
    return () => {};
    
    /* Original code commented out to prevent WebSocket errors:
    if (shouldUseMockData()) {
      return mockAPI.subscribeToSeatingChanges(wedding_id, callback)
    }

    try {
      const tablesChannel = supabase!
        .channel(`seating-tables-${wedding_id}`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'tables',
          filter: `wedding_id=eq.${wedding_id}`
        }, callback)
        .subscribe()

      const guestsChannel = supabase!
        .channel(`seating-guests-${wedding_id}`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'guests',
          filter: `wedding_id=eq.${wedding_id}`
        }, callback)
        .subscribe()

      return () => {
        supabase!.removeChannel(tablesChannel)
        supabase!.removeChannel(guestsChannel)
      }
    } catch (error) {
      return mockAPI.subscribeToSeatingChanges(wedding_id, callback)
    }
    */
  },

  async trackSeatingEvent(wedding_id: string, event_type: string, event_data: any) {
    if (shouldUseMockData()) {
      return await mockAPI.trackSeatingEvent(wedding_id, event_type, event_data)
    }

    try {
      const { error } = await supabase!
        .from('seating_analytics')
        .insert({
          wedding_id,
          event_type,
          event_data,
          user_agent: navigator?.userAgent || 'Unknown',
          created_at: new Date().toISOString()
        })
      
      return { error }
    } catch (error) {
      // Analytics are optional - fail silently
      return { error: null }
    }
  },

  async getSeatingStats(wedding_id: string) {
    if (shouldUseMockData()) {
      return await mockAPI.getSeatingStats(wedding_id)
    }

    try {
      const [guestsResult, tablesResult] = await Promise.all([
        this.getGuests(wedding_id),
        this.getTables(wedding_id)
      ])

      if (guestsResult.error || tablesResult.error) {
        return await mockAPI.getSeatingStats(wedding_id)
      }

      const guests = guestsResult.data || []
      const tables = tablesResult.data || []
      
      const assignedGuests = guests.filter(g => g.table_assignment_id).length
      const occupiedTables = tables.filter(t => 
        guests.some(g => g.table_assignment_id === t.id)
      ).length

      return {
        data: {
          wedding_id,
          total_guests: guests.length,
          assigned_guests: assignedGuests,
          unassigned_guests: guests.length - assignedGuests,
          total_tables: tables.length,
          occupied_tables: occupiedTables,
          assignment_percentage: guests.length > 0 ? (assignedGuests / guests.length) * 100 : 0
        },
        error: null
      }
    } catch (error) {
      return await mockAPI.getSeatingStats(wedding_id)
    }
  }
}

// Export the appropriate API based on environment
export const seatingAPI = isDevelopment ? mockAPI : productionAPI

// Auth helper functions (mock for development)
export const authHelpers = {
  async signUp(email: string, password: string, fullName: string) {
    if (isDevelopment) {
      console.log('🚧 Mock signUp:', { email, fullName })
      return { 
        data: { user: { id: 'mock-user-id', email }, session: null }, 
        error: null 
      }
    }
    
    const { data, error } = await supabase!.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          display_name: fullName
        }
      }
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    if (isDevelopment) {
      console.log('🚧 Mock signIn:', { email })
      return { 
        data: { user: { id: 'mock-user-id', email }, session: null }, 
        error: null 
      }
    }
    
    const { data, error } = await supabase!.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  async signOut() {
    if (isDevelopment) {
      console.log('🚧 Mock signOut')
      return { error: null }
    }
    
    const { error } = await supabase!.auth.signOut()
    return { error }
  },

  getCurrentUser() {
    if (isDevelopment) {
      console.log('🚧 Mock getCurrentUser')
      return Promise.resolve({ 
        data: { user: { id: 'mock-user-id', email: 'demo@example.com' } }, 
        error: null 
      })
    }
    
    return supabase!.auth.getUser()
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    if (isDevelopment) {
      console.log('🚧 Mock onAuthStateChange')
      // Return mock unsubscribe function
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
    
    return supabase!.auth.onAuthStateChange(callback)
  }
}

export default supabase

// Development setup instructions
if (isDevelopment) {
  console.log(`
🚧 DEVELOPMENT MODE AKTIV
  
📝 So richten Sie Supabase ein:
1. Erstellen Sie ein kostenloses Konto auf https://supabase.com
2. Erstellen Sie ein neues Projekt
3. Erstellen Sie eine .env-Datei mit:
   VITE_SUPABASE_URL=https://ihr-projekt.supabase.co
   VITE_SUPABASE_ANON_KEY=ihr-anon-key
4. Starten Sie die App neu

💡 Aktuell werden Mock-Daten verwendet. Alle Änderungen gehen beim Neuladen verloren.
  `)
} 