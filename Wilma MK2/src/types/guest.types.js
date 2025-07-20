// Mapping zwischen neuen und alten Guest-Typen
export function mapLegacyGuest(legacyGuest) {
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
    };
}
// Mapping von neuen zu Legacy-Guest-Typen
export function mapToLegacyGuest(guest) {
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
    };
}
