// Import the Supabase client
import { supabase } from './client';
// Export the Supabase client and types
export { supabase } from './client';
// Database helper functions
export const db = {
    // Wedding helpers
    weddings: {
        async create(data) {
            return supabase.from('weddings').insert(data).select().single();
        },
        async getById(id) {
            return supabase.from('weddings').select('*').eq('id', id).single();
        },
        async getByUserId(userId) {
            return supabase.from('weddings').select('*').eq('user_id', userId);
        },
        async update(id, data) {
            return supabase.from('weddings').update(data).eq('id', id).select().single();
        },
        async delete(id) {
            return supabase.from('weddings').delete().eq('id', id);
        }
    },
    // Budget calculation helpers
    budgetCalculations: {
        async create(data) {
            return supabase.from('budget_calculations').insert(data).select().single();
        },
        async getByUserId(userId) {
            return supabase.from('budget_calculations').select('*').eq('user_id', userId);
        },
        async getBySessionId(sessionId) {
            return supabase.from('budget_calculations').select('*').eq('session_id', sessionId);
        }
    },
    // Guest helpers
    guests: {
        async create(data) {
            return supabase.from('guests').insert(data).select().single();
        },
        async getByWeddingId(weddingId) {
            return supabase.from('guests').select('*').eq('wedding_id', weddingId);
        },
        async update(id, data) {
            return supabase.from('guests').update(data).eq('id', id).select().single();
        },
        async delete(id) {
            return supabase.from('guests').delete().eq('id', id);
        }
    },
    // Timeline helpers
    timelines: {
        async create(data) {
            return supabase.from('timelines').insert(data).select().single();
        },
        async getByWeddingId(weddingId) {
            return supabase.from('timelines').select('*').eq('wedding_id', weddingId);
        },
        async update(id, data) {
            return supabase.from('timelines').update(data).eq('id', id).select().single();
        }
    },
    // Timeline tasks helpers
    timelineTasks: {
        async create(data) {
            return supabase.from('timeline_tasks').insert(data).select().single();
        },
        async getByWeddingId(weddingId) {
            return supabase.from('timeline_tasks').select('*').eq('wedding_id', weddingId);
        },
        async update(id, data) {
            return supabase.from('timeline_tasks').update(data).eq('id', id).select().single();
        },
        async delete(id) {
            return supabase.from('timeline_tasks').delete().eq('id', id);
        }
    },
    // Venue analysis helpers
    venueAnalyses: {
        async create(data) {
            return supabase.from('venue_analyses').insert(data).select().single();
        },
        async getByUserId(userId) {
            return supabase.from('venue_analyses').select('*').eq('user_id', userId);
        }
    },
    // Stress assessment helpers
    stressAssessments: {
        async create(data) {
            return supabase.from('stress_assessments').insert(data).select().single();
        },
        async getByUserId(userId) {
            return supabase.from('stress_assessments').select('*').eq('user_id', userId);
        }
    },
    // Email capture helpers
    emailCaptures: {
        async create(data) {
            return supabase.from('email_captures').insert(data).select().single();
        },
        async getByEmail(email) {
            return supabase.from('email_captures').select('*').eq('email', email);
        }
    },
    // Tool session helpers
    toolSessions: {
        async create(data) {
            return supabase.from('tool_sessions').insert(data).select().single();
        },
        async update(id, data) {
            return supabase.from('tool_sessions').update(data).eq('id', id).select().single();
        }
    }
};
