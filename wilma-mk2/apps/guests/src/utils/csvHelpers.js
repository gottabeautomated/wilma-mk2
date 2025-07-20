import Papa from 'papaparse';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
// Field mappings for different languages/formats
export const FIELD_MAPPINGS = {
    // German field names
    'vorname': 'firstName',
    'nachname': 'lastName',
    'name': 'lastName',
    'email': 'email',
    'telefon': 'phone',
    'handy': 'phone',
    'adresse': 'address',
    'beziehung': 'relationship_to_couple',
    'seite': 'side',
    'rsvp': 'rsvpStatus',
    'rsvp_status': 'rsvpStatus',
    'plus_one': 'plusOneAllowed',
    'plusone': 'plusOneAllowed',
    'plus_one_erlaubt': 'plusOneAllowed',
    'plus_one_name': 'plusOneName',
    'diät': 'dietaryRestrictions',
    'diaet': 'dietaryRestrictions',
    'diätwünsche': 'dietaryRestrictions',
    'ernährung': 'dietaryRestrictions',
    'besondere_anforderungen': 'specialRequirements',
    'anforderungen': 'specialRequirements',
    'notizen': 'notes',
    'bemerkungen': 'notes',
    'tisch': 'tableAssignmentId',
    'tisch_nummer': 'tableAssignmentId',
    'tischnummer': 'tableAssignmentId',
    'sitzplatz': 'seatNumber',
    'sitznummer': 'seatNumber',
    // English variations
    'first_name': 'firstName',
    'last_name': 'lastName',
    'lastname': 'lastName',
    'firstname': 'firstName',
    'phone_number': 'phone',
    'mobile': 'phone',
    'relationship': 'relationship_to_couple',
    'plus_one_allowed': 'plusOneAllowed',
    'dietary_restrictions': 'dietaryRestrictions',
    'diet': 'dietaryRestrictions',
    'special_requirements': 'specialRequirements',
    'table': 'tableAssignmentId',
    'table_number': 'tableAssignmentId',
    'seat': 'seatNumber',
    'seat_number': 'seatNumber'
};
// Validation rules
export const VALIDATION_RULES = {
    firstName: {
        required: true,
        minLength: 1,
        maxLength: 50
    },
    lastName: {
        required: false,
        maxLength: 50
    },
    email: {
        required: false,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        required: false,
        pattern: /^[\+]?[\d\s\-\(\)]+$/
    },
    side: {
        required: true,
        enum: ['bride', 'groom', 'both']
    },
    rsvpStatus: {
        required: false,
        enum: ['pending', 'confirmed', 'declined', 'maybe'],
        default: 'pending'
    },
    plusOneAllowed: {
        required: false,
        type: 'boolean',
        default: false
    },
    tableAssignment: {
        required: false,
        type: 'number',
        min: 1,
        max: 100
    }
};
// Normalize field names
export function normalizeFieldName(fieldName) {
    const normalized = fieldName.toLowerCase().trim().replace(/[^a-zäöüß]/g, '_');
    return FIELD_MAPPINGS[normalized] || fieldName;
}
// Normalize headers from CSV
export function normalizeHeaders(headers) {
    return headers.map(normalizeFieldName);
}
// Convert string values to appropriate types
export function convertValue(value, fieldName) {
    if (value === null || value === undefined || value === '') {
        return undefined;
    }
    const rule = VALIDATION_RULES[fieldName];
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
        case 'email':
        case 'phone':
        case 'address':
        case 'relationship':
        case 'notes':
        case 'specialRequirements':
        case 'plusOneName':
            return String(value).trim();
        case 'side':
            const sideValue = String(value).toLowerCase().trim();
            if (sideValue.includes('braut') || sideValue === 'bride')
                return 'bride';
            if (sideValue.includes('bräutigam') || sideValue === 'groom')
                return 'groom';
            if (sideValue.includes('beide') || sideValue === 'both')
                return 'both';
            return 'both'; // default
        case 'rsvpStatus':
            const rsvpValue = String(value).toLowerCase().trim();
            if (rsvpValue.includes('zugesagt') || rsvpValue === 'confirmed' || rsvpValue === 'ja')
                return 'confirmed';
            if (rsvpValue.includes('abgesagt') || rsvpValue === 'declined' || rsvpValue === 'nein')
                return 'declined';
            if (rsvpValue.includes('vielleicht') || rsvpValue === 'maybe')
                return 'maybe';
            return 'pending'; // default
        case 'plusOneAllowed':
        case 'accommodationNeeded':
        case 'invitationSent':
        case 'thankYouSent':
            const boolValue = String(value).toLowerCase().trim();
            return boolValue === 'true' || boolValue === 'ja' || boolValue === 'yes' || boolValue === '1';
        case 'tableAssignment':
            const numValue = parseInt(String(value));
            return isNaN(numValue) ? undefined : numValue;
        case 'dietaryRestrictions':
            if (typeof value === 'string') {
                return value.split(',').map(s => s.trim()).filter(s => s.length > 0);
            }
            return [];
        case 'rsvpDate':
        case 'invitationSentAt':
            try {
                return new Date(value);
            }
            catch {
                return undefined;
            }
        default:
            return value;
    }
}
// Validate a single guest record
export function validateGuestData(data) {
    const errors = [];
    const warnings = [];
    // Normalize the data object
    const normalizedData = {};
    Object.keys(data).forEach(key => {
        const normalizedKey = normalizeFieldName(key);
        normalizedData[normalizedKey] = convertValue(data[key], normalizedKey);
    });
    // Required field validation
    if (!normalizedData.firstName || String(normalizedData.firstName).trim().length === 0) {
        errors.push('Vorname ist erforderlich');
        return { errors, warnings };
    }
    // Email validation
    if (normalizedData.email && !VALIDATION_RULES.email.pattern?.test(normalizedData.email)) {
        errors.push('Ungültige E-Mail-Adresse');
    }
    // Phone validation
    if (normalizedData.phone && !VALIDATION_RULES.phone.pattern?.test(normalizedData.phone)) {
        warnings.push('Telefonnummer hat ungewöhnliches Format');
    }
    // Side validation
    if (normalizedData.side && !VALIDATION_RULES.side.enum?.includes(normalizedData.side)) {
        errors.push('Ungültige Seiten-Angabe (muss "bride", "groom" oder "both" sein)');
    }
    // RSVP validation
    if (normalizedData.rsvpStatus && !VALIDATION_RULES.rsvpStatus.enum?.includes(normalizedData.rsvpStatus)) {
        errors.push('Ungültiger RSVP-Status');
    }
    // Table assignment validation
    if (normalizedData.tableAssignment) {
        const tableNum = parseInt(normalizedData.tableAssignment);
        if (isNaN(tableNum) || tableNum < 1 || tableNum > 100) {
            errors.push('Tisch-Nummer muss zwischen 1 und 100 liegen');
        }
    }
    // Plus One validation
    if (normalizedData.plusOneAllowed && normalizedData.plusOneName && !normalizedData.plusOneName.trim()) {
        warnings.push('Plus One erlaubt, aber kein Name angegeben');
    }
    // Data quality warnings
    if (!normalizedData.email && !normalizedData.phone) {
        warnings.push('Weder E-Mail noch Telefon angegeben');
    }
    if (!normalizedData.lastName) {
        warnings.push('Kein Nachname angegeben');
    }
    if (errors.length > 0) {
        return { errors, warnings };
    }
    // Create guest object - mapping to correct Guest interface
    const guest = {
        id: crypto.randomUUID(),
        wedding_id: '', // Will be set later
        first_name: normalizedData.firstName,
        last_name: normalizedData.lastName || '',
        email: normalizedData.email,
        phone: normalizedData.phone,
        address: normalizedData.address,
        relationship: normalizedData.relationship || '',
        side: normalizedData.side || 'both',
        rsvp_status: normalizedData.rsvpStatus || 'pending',
        rsvp_date: normalizedData.rsvpDate,
        plus_one: normalizedData.plusOneAllowed || false,
        plus_one_name: normalizedData.plusOneName,
        plus_one_rsvp: normalizedData.plusOneRsvp || 'pending',
        dietary_restrictions: normalizedData.dietaryRestrictions || [],
        special_requirements: normalizedData.specialRequirements,
        accommodation_needed: normalizedData.accommodationNeeded || false,
        table_assignment: normalizedData.tableAssignment,
        seat_assignment: normalizedData.seatAssignment,
        invitation_sent: normalizedData.invitationSent || false,
        invitation_sent_at: normalizedData.invitationSentAt,
        thank_you_sent: normalizedData.thankYouSent || false,
        notes: normalizedData.notes,
        created_at: new Date().toISOString()
    };
    return { guest, errors, warnings };
}
// Generate CSV template with sample data
export function generateCSVTemplate(sampleData) {
    const headers = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'address',
        'relationship',
        'side',
        'rsvpStatus',
        'plusOneAllowed',
        'plusOneName',
        'dietaryRestrictions',
        'specialRequirements',
        'accommodationNeeded',
        'notes'
    ];
    const defaultSampleData = [
        {
            firstName: 'Anna',
            lastName: 'Müller',
            email: 'anna.mueller@email.com',
            phone: '+43 123 456789',
            address: 'Musterstraße 1, 1010 Wien, Österreich',
            relationship: 'Beste Freundin',
            side: 'bride',
            rsvpStatus: 'pending',
            plusOneAllowed: 'true',
            plusOneName: '',
            dietaryRestrictions: 'Vegetarisch',
            specialRequirements: '',
            accommodationNeeded: 'false',
            notes: 'Kommt mit dem Auto'
        },
        {
            firstName: 'Max',
            lastName: 'Schmidt',
            email: 'max.schmidt@email.com',
            phone: '+43 987 654321',
            address: 'Beispielgasse 5, 8010 Graz, Österreich',
            relationship: 'Cousin',
            side: 'groom',
            rsvpStatus: 'confirmed',
            plusOneAllowed: 'false',
            plusOneName: '',
            dietaryRestrictions: '',
            specialRequirements: 'Rollstuhlzugang',
            accommodationNeeded: 'true',
            notes: ''
        }
    ];
    const data = sampleData || defaultSampleData;
    return Papa.unparse({
        fields: headers,
        data: data
    }, {
        delimiter: ',',
        header: true,
        skipEmptyLines: true
    });
}
// Export guests to CSV
export function exportGuestsToCSV(guests, includeFields, fileName) {
    // Transform guests to export format
    const exportData = guests.map(guest => {
        const row = {};
        includeFields.forEach(field => {
            switch (field) {
                case 'firstName':
                    row[field] = guest.first_name || '';
                    break;
                case 'lastName':
                    row[field] = guest.last_name || '';
                    break;
                case 'email':
                case 'phone':
                case 'notes':
                    row[field] = guest[field] || '';
                    break;
                case 'relationship':
                    row[field] = guest.relationship || '';
                    break;
                case 'rsvpStatus':
                    row[field] = guest.rsvp_status === 'confirmed' ? 'Zugesagt' :
                        guest.rsvp_status === 'declined' ? 'Abgesagt' :
                            guest.rsvp_status === 'maybe' ? 'Vielleicht' : 'Ausstehend';
                    break;
                case 'plusOneAllowed':
                    row[field] = guest.plus_one ? 'Ja' : 'Nein';
                    break;
                case 'dietaryRestrictions':
                    row[field] = Array.isArray(guest.dietary_restrictions)
                        ? guest.dietary_restrictions.join(', ')
                        : '';
                    break;
                case 'tableAssignment':
                    row[field] = guest.table_assignment || '';
                    break;
                case 'seatAssignment':
                    row[field] = guest.seat_assignment || '';
                    break;
                default:
                    row[field] = guest[field] || '';
            }
        });
        return row;
    });
    // Generate CSV
    const csv = Papa.unparse(exportData, {
        delimiter: ',',
        header: true,
        skipEmptyLines: true
    });
    // Download CSV
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.csv`;
    link.click();
}
// Generate printable list (PDF-like format)
export function generatePrintableList(guests, includeFields, fileName) {
    // Create HTML content for printing
    const now = format(new Date(), 'dd.MM.yyyy HH:mm', { locale: de });
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Gäste-Liste - ${fileName}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 20px;
          font-size: 12px;
          line-height: 1.4;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
        }
        .header h1 {
          margin: 0;
          color: #333;
          font-size: 24px;
        }
        .header p {
          margin: 5px 0;
          color: #666;
        }
        .stats {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;
          background: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
        }
        .stat {
          text-align: center;
        }
        .stat .number {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        .stat .label {
          font-size: 11px;
          color: #666;
          text-transform: uppercase;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
          vertical-align: top;
        }
        th {
          background-color: #f8f9fa;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 500;
        }
        .badge-confirmed { background: #d4edda; color: #155724; }
        .badge-declined { background: #f8d7da; color: #721c24; }
        .badge-pending { background: #fff3cd; color: #856404; }
        .badge-maybe { background: #e2e3e5; color: #383d41; }
        .badge-bride { background: #fdf2f8; color: #be185d; }
        .badge-groom { background: #eff6ff; color: #1d4ed8; }
        .badge-both { background: #f3e8ff; color: #7c3aed; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Wilma Hochzeits-Gäste-Liste</h1>
        <p>Erstellt am: ${now}</p>
        <p>Anzahl Gäste: ${guests.length}</p>
      </div>
  `;
    // Add statistics
    const stats = {
        total: guests.length,
        confirmed: guests.filter(g => g.rsvp_status === 'confirmed').length,
        declined: guests.filter(g => g.rsvp_status === 'declined').length,
        pending: guests.filter(g => g.rsvp_status === 'pending').length,
        withPlusOne: guests.filter(g => g.plus_one).length
    };
    html += `
    <div class="stats">
      <div class="stat">
        <div class="number">${stats.total}</div>
        <div class="label">Gesamt</div>
      </div>
      <div class="stat">
        <div class="number">${stats.confirmed}</div>
        <div class="label">Zugesagt</div>
      </div>
      <div class="stat">
        <div class="number">${stats.declined}</div>
        <div class="label">Abgesagt</div>
      </div>
      <div class="stat">
        <div class="number">${stats.pending}</div>
        <div class="label">Ausstehend</div>
      </div>
      <div class="stat">
        <div class="number">${stats.withPlusOne}</div>
        <div class="label">Plus Ones</div>
      </div>
    </div>
  `;
    // Add table
    html += '<table><thead><tr>';
    const fieldLabels = {
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail',
        phone: 'Telefon',
        relationship: 'Beziehung',
        side: 'Seite',
        rsvpStatus: 'RSVP',
        plusOneAllowed: 'Plus One',
        plusOneName: 'Plus One Name',
        dietaryRestrictions: 'Diätwünsche',
        tableAssignment: 'Tisch',
        notes: 'Notizen'
    };
    includeFields.forEach(field => {
        html += `<th>${fieldLabels[field] || field}</th>`;
    });
    html += '</tr></thead><tbody>';
    guests.forEach(guest => {
        html += '<tr>';
        includeFields.forEach(field => {
            let value = '';
            let cssClass = '';
            switch (field) {
                case 'firstName':
                    value = guest.first_name || '';
                    break;
                case 'lastName':
                    value = guest.last_name || '';
                    break;
                case 'relationship':
                    value = guest.relationship || '';
                    break;
                case 'rsvpStatus':
                    value = guest.rsvp_status === 'confirmed' ? 'Zugesagt' :
                        guest.rsvp_status === 'declined' ? 'Abgesagt' :
                            guest.rsvp_status === 'maybe' ? 'Vielleicht' : 'Ausstehend';
                    cssClass = `badge badge-${guest.rsvp_status}`;
                    break;
                case 'plusOneAllowed':
                    value = guest.plus_one ? 'Ja' : 'Nein';
                    break;
                case 'dietaryRestrictions':
                    value = Array.isArray(guest.dietary_restrictions)
                        ? guest.dietary_restrictions.join(', ')
                        : '';
                    break;
                case 'tableAssignment':
                    value = guest.table_assignment || '';
                    break;
                default:
                    value = guest[field] || '';
            }
            html += `<td${cssClass ? ` class="${cssClass}"` : ''}>${value}</td>`;
        });
        html += '</tr>';
    });
    html += `
      </tbody>
    </table>
    </body>
    </html>
  `;
    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }
}
