import { Table, Guest, SeatingAnalytics } from '../types/guest';
import { supabase } from './supabase';

// Global state for mock mode
let isUsingMockData = false;
let mockModeChecked = false;

// Mock data
const mockTables: Table[] = [
  {
    id: 'table-1',
    wedding_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Brauteltern',
    type: 'round',
    position: { x: 200, y: 150 },
    rotation: 0,
    seats: 8,
    style: {
      color: '#D4AF37',
      material: 'wood',
      pattern: 'solid'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'table-2',
    wedding_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Bräutigam Familie',
    type: 'round',
    position: { x: 450, y: 150 },
    rotation: 0,
    seats: 8,
    style: {
      color: '#9D7D6A',
      material: 'wood',
      pattern: 'solid'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'table-3',
    wedding_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Freunde',
    type: 'rectangle',
    position: { x: 325, y: 300 },
    rotation: 0,
    seats: 10,
    style: {
      color: '#6B7F5B',
      material: 'wood',
      pattern: 'solid'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

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
    plus_one_name: '',
    plus_one_rsvp: 'pending',
    dietary_restrictions: [],
    special_requirements: '',
    accommodation_needed: false,
    table_assignment_id: undefined,
    seat_number: undefined,
    seating_preferences: '',
    photo_url: '',
    photo_source: '',
    invitation_sent: true,
    invitation_sent_at: '',
    thank_you_sent: false,
    notes: '',
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
    plus_one_rsvp: 'confirmed',
    dietary_restrictions: ['vegetarian'],
    special_requirements: '',
    accommodation_needed: true,
    table_assignment_id: undefined,
    seat_number: undefined,
    seating_preferences: '',
    photo_url: '',
    photo_source: '',
    invitation_sent: true,
    invitation_sent_at: '',
    thank_you_sent: false,
    notes: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Check if Supabase is available
const checkSupabaseAvailability = async (): Promise<boolean> => {
  if (mockModeChecked) return !isUsingMockData;
  
  try {
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .limit(1);
    
    mockModeChecked = true;
    isUsingMockData = !!error;
    
    if (error) {
      console.info('📋 Supabase tables not found. Using mock data for demo.');
      return false;
    } else {
      console.info('✅ Supabase connected successfully!');
      return true;
    }
  } catch (error) {
    mockModeChecked = true;
    isUsingMockData = true;
    console.info('📋 Supabase connection failed. Using mock data for demo.');
    return false;
  }
};

// Wedding-basierte API-Funktionen
export const seatingAPI = {
  // Gäste für eine bestimmte Hochzeit abrufen
  async getGuestsByWedding(weddingId: string): Promise<Guest[]> {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('wedding_id', weddingId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching guests:', error);
      throw new Error(`Fehler beim Laden der Gäste: ${error.message}`);
    }

    return data || [];
  },

  // Gast für eine bestimmte Hochzeit erstellen
  async createGuest(guestData: Partial<Guest>, weddingId: string): Promise<Guest> {
    const { data, error } = await supabase
      .from('guests')
      .insert([{
        ...guestData,
        id: crypto.randomUUID(),
        wedding_id: weddingId,
        table_assignment_id: guestData.table_assignment_id || undefined,
        seat_number: guestData.seat_number || undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating guest:', error);
      throw new Error(`Fehler beim Erstellen des Gastes: ${error.message}`);
    }

    return data;
  },

  // Gast aktualisieren
  async updateGuest(id: string, guestData: Partial<Guest>): Promise<Guest> {
    const { data, error } = await supabase
      .from('guests')
      .update({
        ...guestData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating guest:', error);
      throw new Error(`Fehler beim Aktualisieren des Gastes: ${error.message}`);
    }

    return data;
  },

  // Gast löschen
  async deleteGuest(id: string): Promise<void> {
    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting guest:', error);
      throw new Error(`Fehler beim Löschen des Gastes: ${error.message}`);
    }
  },

  // Mehrere Gäste gleichzeitig erstellen (für CSV-Import)
  async createMultipleGuests(guestsData: Partial<Guest>[], weddingId: string): Promise<Guest[]> {
    const guestsWithIds = guestsData.map(guest => ({
      ...guest,
      id: crypto.randomUUID(),
      wedding_id: weddingId,
      table_assignment_id: guest.table_assignment_id || undefined,
      seat_number: guest.seat_number || undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('guests')
      .insert(guestsWithIds)
      .select();

    if (error) {
      console.error('Error creating multiple guests:', error);
      throw new Error(`Fehler beim Erstellen der Gäste: ${error.message}`);
    }

    return data || [];
  },

  // Gast-Statistiken für eine Hochzeit abrufen
  async getGuestStatistics(weddingId: string) {
    const { data, error } = await supabase
      .from('guests')
      .select('rsvp_status, plus_one, side')
      .eq('wedding_id', weddingId);

    if (error) {
      console.error('Error fetching guest statistics:', error);
      throw new Error(`Fehler beim Laden der Statistiken: ${error.message}`);
    }

    const guests = data || [];
    
    return {
      total: guests.length,
      confirmed: guests.filter(g => g.rsvp_status === 'confirmed').length,
      pending: guests.filter(g => g.rsvp_status === 'pending').length,
      declined: guests.filter(g => g.rsvp_status === 'declined').length,
      plusOnes: guests.filter(g => g.plus_one).length,
      bridesSide: guests.filter(g => g.side === 'bride').length,
      groomsSide: guests.filter(g => g.side === 'groom').length,
      bothSides: guests.filter(g => g.side === 'both').length
    };
  },

  // Hochzeit-Informationen abrufen
  async getWeddingInfo(weddingId: string) {
    const { data, error } = await supabase
      .from('weddings')
      .select('*')
      .eq('id', weddingId)
      .single();

    if (error) {
      console.error('Error fetching wedding info:', error);
      throw new Error(`Fehler beim Laden der Hochzeit-Informationen: ${error.message}`);
    }

    return data;
  },

  // Aktuelle Benutzer-Session prüfen
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }

    return user;
  },

  // Hochzeiten für einen Benutzer abrufen
  async getUserWeddings(userId: string) {
    const { data, error } = await supabase
      .from('weddings')
      .select('*')
      .or(`user_id.eq.${userId},partner_user_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user weddings:', error);
      throw new Error(`Fehler beim Laden der Hochzeiten: ${error.message}`);
    }

    return data || [];
  },

  // Tables
  async getTables(weddingId: string) {
    const isAvailable = await checkSupabaseAvailability();
    
    if (!isAvailable) {
      return { data: mockTables, error: null };
    }
    
    return await supabase
      .from('tables')
      .select('*')
      .eq('wedding_id', weddingId);
  },

  async createTable(tableData: Omit<Table, 'created_at' | 'updated_at'>) {
    if (isUsingMockData) {
      const newTable = {
        ...tableData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockTables.push(newTable);
      return { data: newTable, error: null };
    }
    
    return await supabase
      .from('tables')
      .insert([tableData])
      .select()
      .single();
  },

  async updateTable(tableId: string, updates: Partial<Table>) {
    if (isUsingMockData) {
      const tableIndex = mockTables.findIndex(t => t.id === tableId);
      if (tableIndex >= 0) {
        mockTables[tableIndex] = { ...mockTables[tableIndex], ...updates, updated_at: new Date().toISOString() };
        return { data: mockTables[tableIndex], error: null };
      }
      return { data: null, error: { message: 'Table not found' } };
    }
    
    return await supabase
      .from('tables')
      .update(updates)
      .eq('id', tableId)
      .select()
      .single();
  },

  async deleteTable(tableId: string) {
    if (isUsingMockData) {
      const tableIndex = mockTables.findIndex(t => t.id === tableId);
      if (tableIndex >= 0) {
        mockTables.splice(tableIndex, 1);
        return { data: null, error: null };
      }
      return { data: null, error: { message: 'Table not found' } };
    }
    
    return await supabase
      .from('tables')
      .delete()
      .eq('id', tableId);
  },

  // Analytics
  async trackSeatingEvent(weddingId: string, eventType: string, eventData: any) {
    if (isUsingMockData) {
      console.log(`📊 Analytics (Mock): ${eventType}`, eventData);
      return { data: null, error: null };
    }
    
    return await supabase
      .from('seating_analytics')
      .insert([{
        wedding_id: weddingId,
        event_type: eventType,
        event_data: eventData,
        created_at: new Date().toISOString()
      }]);
  },

  async getSeatingAnalytics(weddingId: string) {
    if (isUsingMockData) {
      return { data: [], error: null };
    }
    
    return await supabase
      .from('seating_analytics')
      .select('*')
      .eq('wedding_id', weddingId)
      .order('created_at', { ascending: false });
  },

  // Real-time subscriptions
  async subscribeToSeatingChanges(weddingId: string, callback: (payload: any) => void) {
    // Temporarily disable Realtime to avoid WebSocket errors
    // TODO: Re-enable when Supabase Realtime is properly configured
    console.info('📡 Realtime temporarily disabled to prevent WebSocket errors');
    return () => {};
    
    /* 
    // Check if Supabase is available before attempting Realtime connection
    const isAvailable = await checkSupabaseAvailability();
    
    if (!isAvailable) {
      // Return a dummy unsubscribe function for mock mode
      console.info('📡 Realtime disabled in mock mode');
      return () => {};
    }
    
    try {
      const subscription = supabase
        .channel('seating-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'tables', filter: `wedding_id=eq.${weddingId}` },
          callback
        )
        .on(
          'postgres_changes', 
          { event: '*', schema: 'public', table: 'guests', filter: `wedding_id=eq.${weddingId}` },
          callback
        )
        .subscribe();

      console.info('📡 Realtime subscriptions activated');
      
      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.warn('📡 Realtime connection failed, continuing without live updates:', error);
      return () => {};
    }
    */
  }
};

// Hilfsfunktionen für die Migration von Mock-Daten zu echten Daten
export const migrationHelpers = {
  // Prüft, ob die Authentifizierung aktiv ist
  async isAuthenticated(): Promise<boolean> {
    const user = await seatingAPI.getCurrentUser();
    return user !== null;
  },

  // Automatische Wedding-ID-Erkennung (fallback für Legacy-Code)
  async getDefaultWeddingId(): Promise<string | null> {
    const user = await seatingAPI.getCurrentUser();
    if (!user) return null;

    const weddings = await seatingAPI.getUserWeddings(user.id);
    return weddings.length > 0 ? weddings[0].id : null;
  }
};

export default seatingAPI; 