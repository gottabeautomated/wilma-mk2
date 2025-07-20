// Validiert CSV-Daten und wandelt sie in Guest-Objekte um
export function validateGuestData(csvRow) {
    const errors = [];
    const warnings = [];
    // Pflichtfelder prüfen
    if (!csvRow.firstName?.trim()) {
        errors.push('Vorname ist erforderlich');
    }
    if (!csvRow.lastName?.trim()) {
        errors.push('Nachname ist erforderlich');
    }
    // E-Mail-Validierung
    if (csvRow.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(csvRow.email)) {
            errors.push('Ungültige E-Mail-Adresse');
        }
    }
    else {
        warnings.push('E-Mail-Adresse fehlt');
    }
    // Telefonnummer-Validierung
    if (csvRow.phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,20}$/;
        if (!phoneRegex.test(csvRow.phone)) {
            warnings.push('Telefonnummer könnte ungültig sein');
        }
    }
    // Seiten-Validierung
    const validSides = ['bride', 'groom', 'both'];
    if (csvRow.side && !validSides.includes(csvRow.side)) {
        errors.push('Seite muss "bride", "groom" oder "both" sein');
    }
    // RSVP-Status-Validierung
    const validRsvpStatuses = ['pending', 'confirmed', 'declined', 'maybe'];
    if (csvRow.rsvpStatus && !validRsvpStatuses.includes(csvRow.rsvpStatus)) {
        errors.push('RSVP-Status muss "pending", "confirmed", "declined" oder "maybe" sein');
    }
    // Plus-One-Validierung
    if (csvRow.plusOneAllowed) {
        const plusOneValue = csvRow.plusOneAllowed.toString().toLowerCase();
        if (!['true', 'false', '1', '0', 'ja', 'nein'].includes(plusOneValue)) {
            errors.push('Plus-One-Erlaubnis muss "true", "false", "ja" oder "nein" sein');
        }
    }
    // Wenn es keine Fehler gibt, erstelle Guest-Objekt
    if (errors.length === 0) {
        const guest = {
            id: crypto.randomUUID(),
            firstName: csvRow.firstName?.trim(),
            lastName: csvRow.lastName?.trim(),
            email: csvRow.email?.trim() || undefined,
            phone: csvRow.phone?.trim() || undefined,
            address: csvRow.address?.trim() || undefined,
            relationship: csvRow.relationship?.trim() || undefined,
            side: csvRow.side || 'both',
            rsvpStatus: csvRow.rsvpStatus || 'pending',
            plusOneAllowed: parseBooleanValue(csvRow.plusOneAllowed),
            plusOneName: csvRow.plusOneName?.trim() || undefined,
            plusOneRsvpStatus: csvRow.plusOneRsvpStatus || 'pending',
            dietaryRestrictions: csvRow.dietaryRestrictions?.trim() || undefined,
            specialRequirements: csvRow.specialRequirements?.trim() || undefined,
            notes: csvRow.notes?.trim() || undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            invited: false,
            checkedIn: false,
            tableId: undefined,
            seatNumber: undefined,
            accommodationNeeded: false,
            transportNeeded: false,
            hasPlusOne: false,
            avatar: undefined
        };
        return { guest, errors, warnings };
    }
    return { errors, warnings };
}
// Hilfsfunktion für Boolean-Parsing
function parseBooleanValue(value) {
    if (value === undefined || value === null || value === '') {
        return false;
    }
    const stringValue = value.toString().toLowerCase().trim();
    return ['true', '1', 'ja', 'yes'].includes(stringValue);
}
// Generiert eine CSV-Vorlage mit Beispieldaten
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
        'plusOneRsvpStatus',
        'dietaryRestrictions',
        'specialRequirements',
        'notes'
    ];
    const csvContent = [
        // Header-Zeile
        headers.join(','),
        // Beispieldaten
        ...sampleData.map(row => headers.map(header => {
            const value = row[header] || '';
            // Escape-Zeichen für CSV-Kompatibilität
            return value.toString().includes(',') ? `"${value}"` : value;
        }).join(','))
    ].join('\n');
    return csvContent;
}
// Hilfsfunktion für CSV-Export existierender Gäste (erweitert)
export function exportGuestsToCSV(guests, includeFields, fileName) {
    // Feld-Mapping für das neue erweiterte Guest-Interface
    const fieldMap = {
        firstName: (guest) => guest.firstName,
        lastName: (guest) => guest.lastName || '',
        email: (guest) => guest.email || '',
        phone: (guest) => guest.phone || '',
        address: (guest) => guest.address || '',
        relationship: (guest) => guest.relationship || '',
        side: (guest) => guest.side === 'bride' ? 'Braut' : guest.side === 'groom' ? 'Bräutigam' : 'Beide',
        rsvpStatus: (guest) => guest.rsvpStatus === 'confirmed' ? 'Zugesagt' :
            guest.rsvpStatus === 'declined' ? 'Abgesagt' :
                guest.rsvpStatus === 'pending' ? 'Ausstehend' : 'Vielleicht',
        rsvpDate: (guest) => guest.rsvpDate || '',
        plusOneAllowed: (guest) => guest.plusOneAllowed ? 'Ja' : 'Nein',
        plusOneName: (guest) => guest.plusOneName || '',
        plusOneRsvp: (guest) => (guest.plusOneRsvp || guest.plusOneRsvpStatus) === 'confirmed' ? 'Zugesagt' :
            (guest.plusOneRsvp || guest.plusOneRsvpStatus) === 'declined' ? 'Abgesagt' :
                (guest.plusOneRsvp || guest.plusOneRsvpStatus) === 'pending' ? 'Ausstehend' : '',
        dietaryRestrictions: (guest) => guest.dietaryRestrictions || '',
        specialRequirements: (guest) => guest.specialRequirements || '',
        accommodationNeeded: (guest) => guest.accommodationNeeded ? 'Ja' : 'Nein',
        tableAssignment: (guest) => guest.tableAssignment || guest.tableId || '',
        seatAssignment: (guest) => (guest.seatAssignment || guest.seatNumber)?.toString() || '',
        invitationSent: (guest) => (guest.invitationSent ?? guest.invited) ? 'Ja' : 'Nein',
        invitationSentAt: (guest) => guest.invitationSentAt || '',
        thankYouSent: (guest) => guest.thankYouSent ? 'Ja' : 'Nein',
        notes: (guest) => guest.notes || ''
    };
    // Verwende alle verfügbaren Felder wenn nicht spezifiziert
    const fieldsToInclude = includeFields || Object.keys(fieldMap);
    // Deutsche Header-Labels
    const headerLabels = {
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail',
        phone: 'Telefon',
        relationship: 'Beziehung',
        side: 'Seite',
        rsvpStatus: 'RSVP Status',
        rsvpDate: 'RSVP Datum',
        plusOneAllowed: 'Plus One erlaubt',
        plusOneName: 'Plus One Name',
        plusOneRsvp: 'Plus One RSVP',
        dietaryRestrictions: 'Diätwünsche',
        specialRequirements: 'Besondere Anforderungen',
        accommodationNeeded: 'Unterkunft benötigt',
        tableAssignment: 'Tisch-Zuweisung',
        seatAssignment: 'Sitzplatz',
        invitationSent: 'Einladung versendet',
        invitationSentAt: 'Einladung versendet am',
        thankYouSent: 'Dankeschön versendet',
        notes: 'Notizen'
    };
    const headers = fieldsToInclude.map(field => headerLabels[field] || field);
    const csvContent = [
        // Header-Zeile
        headers.join(','),
        // Gästedaten
        ...guests.map(guest => fieldsToInclude.map(field => {
            const getValue = fieldMap[field];
            const value = getValue ? getValue(guest) : '';
            // Escape-Zeichen für CSV-Kompatibilität
            return value.toString().includes(',') ? `"${value}"` : value;
        }).join(','))
    ].join('\n');
    // Download-Funktionalität
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName || `Wilma_Gaesteliste_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}
// Neue Funktion für druckbare Listen (PDF-ähnlich)
export function generatePrintableList(guests, includeFields, fileName) {
    // HTML-Template für druckbare Liste erstellen
    const fieldLabels = {
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail',
        phone: 'Telefon',
        relationship: 'Beziehung',
        rsvpStatus: 'RSVP Status',
        dietaryRestrictions: 'Diätwünsche',
        tableAssignment: 'Tisch',
        notes: 'Notizen'
    };
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Wilma Gäste-Liste</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #6B46C1; text-align: center; }
        .stats { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .guest { border-bottom: 1px solid #e5e7eb; padding: 10px 0; }
        .guest-name { font-weight: bold; font-size: 1.1em; color: #374151; }
        .guest-details { margin-top: 5px; }
        .field { display: inline-block; margin-right: 20px; margin-bottom: 5px; }
        .field-label { font-weight: bold; color: #6b7280; }
        .rsvp-confirmed { color: #059669; }
        .rsvp-declined { color: #dc2626; }
        .rsvp-pending { color: #d97706; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>🌸 Wilma Gäste-Liste</h1>
             <div class="stats">
         <strong>Gesamt:</strong> ${guests.length} Gäste | 
         <strong>Zugesagt:</strong> ${guests.filter(g => g.rsvpStatus === 'confirmed').length} | 
         <strong>Abgesagt:</strong> ${guests.filter(g => g.rsvpStatus === 'declined').length} | 
         <strong>Ausstehend:</strong> ${guests.filter(g => g.rsvpStatus === 'pending').length}
       </div>
       ${guests.map(guest => `
         <div class="guest">
           <div class="guest-name">${guest.firstName} ${guest.lastName || ''}</div>
           <div class="guest-details">
             ${includeFields.map(field => {
        let value = '';
        let label = fieldLabels[field] || field;
        switch (field) {
            case 'firstName':
                value = guest.firstName;
                break;
            case 'lastName':
                value = guest.lastName || '';
                break;
            case 'email':
                value = guest.email || '';
                break;
            case 'phone':
                value = guest.phone || '';
                break;
            case 'relationship':
                value = guest.relationship || '';
                break;
            case 'rsvpStatus':
                value = guest.rsvpStatus === 'confirmed' ? 'Zugesagt' :
                    guest.rsvpStatus === 'declined' ? 'Abgesagt' :
                        guest.rsvpStatus === 'pending' ? 'Ausstehend' : 'Vielleicht';
                break;
            case 'dietaryRestrictions':
                value = guest.dietaryRestrictions || '';
                break;
            case 'tableAssignment':
                value = guest.tableAssignment || guest.tableId || '';
                break;
            case 'notes':
                value = guest.notes || '';
                break;
            default: value = '';
        }
        return value ? `<div class="field"><span class="field-label">${label}:</span> ${value}</div>` : '';
    }).filter(Boolean).join('')}
           </div>
         </div>
       `).join('')}
      <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 0.9em;">
        Erstellt am ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}
      </div>
    </body>
    </html>
  `;
    // Öffne in neuem Fenster zum Drucken
    const newWindow = window.open('', '_blank');
    if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        newWindow.focus();
        // Automatisch Druckdialog öffnen
        setTimeout(() => newWindow.print(), 500);
    }
}
