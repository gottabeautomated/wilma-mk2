import { z } from 'zod';
import { format, parseISO, isValid } from 'date-fns';
import { de } from 'date-fns/locale';
// Date utilities
export const formatDate = (date, formatString = 'dd.MM.yyyy') => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj))
        return 'Ungültiges Datum';
    return format(dateObj, formatString, { locale: de });
};
export const formatDateTime = (date) => {
    return formatDate(date, 'dd.MM.yyyy HH:mm');
};
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(amount);
};
// Validation schemas
export const weddingSchema = z.object({
    name: z.string().min(1, 'Name ist erforderlich'),
    date: z.string().min(1, 'Datum ist erforderlich'),
    budget: z.number().min(0, 'Budget muss positiv sein'),
});
export const guestSchema = z.object({
    name: z.string().min(1, 'Name ist erforderlich'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    phone: z.string().optional(),
    rsvp_status: z.enum(['pending', 'confirmed', 'declined']),
    dietary_restrictions: z.string().optional(),
    plus_one: z.boolean().optional(),
    plus_one_name: z.string().optional(),
});
export const budgetItemSchema = z.object({
    category: z.string().min(1, 'Kategorie ist erforderlich'),
    name: z.string().min(1, 'Name ist erforderlich'),
    estimated_cost: z.number().min(0, 'Kosten müssen positiv sein'),
    actual_cost: z.number().min(0).optional(),
    paid: z.boolean(),
    due_date: z.string().optional(),
    notes: z.string().optional(),
});
export const venueSchema = z.object({
    name: z.string().min(1, 'Name ist erforderlich'),
    address: z.string().min(1, 'Adresse ist erforderlich'),
    capacity: z.number().min(1, 'Kapazität muss mindestens 1 sein'),
    price_per_guest: z.number().min(0, 'Preis pro Gast muss positiv sein'),
    contact_email: z.string().email('Ungültige E-Mail-Adresse'),
    contact_phone: z.string().min(1, 'Telefonnummer ist erforderlich'),
});
// Utility functions
export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};
export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
export const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
