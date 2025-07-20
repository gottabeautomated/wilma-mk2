import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Card, CardContent, CardHeader, CardTitle, Separator, Label, Tabs, TabsContent, TabsList, TabsTrigger, } from './ui';
import { Download, FileSpreadsheet, Users, CheckCircle, FileText, } from 'lucide-react';
import { exportGuestsToCSV, generatePrintableList } from '../utils/csvHelpers';
const AVAILABLE_FIELDS = [
    { key: 'firstName', label: 'Vorname', category: 'basic' },
    { key: 'lastName', label: 'Nachname', category: 'basic' },
    { key: 'email', label: 'E-Mail', category: 'contact' },
    { key: 'phone', label: 'Telefon', category: 'contact' },
    { key: 'address', label: 'Adresse', category: 'contact' },
    { key: 'relationship', label: 'Beziehung', category: 'basic' },
    { key: 'side', label: 'Seite', category: 'basic' },
    { key: 'rsvpStatus', label: 'RSVP Status', category: 'rsvp' },
    { key: 'rsvpDate', label: 'RSVP Datum', category: 'rsvp' },
    { key: 'plusOneAllowed', label: 'Plus One erlaubt', category: 'plus_one' },
    { key: 'plusOneName', label: 'Plus One Name', category: 'plus_one' },
    { key: 'plusOneRsvp', label: 'Plus One RSVP', category: 'plus_one' },
    { key: 'dietaryRestrictions', label: 'Diätwünsche', category: 'special' },
    { key: 'specialRequirements', label: 'Besondere Anforderungen', category: 'special' },
    { key: 'accommodationNeeded', label: 'Unterkunft benötigt', category: 'special' },
    { key: 'tableAssignment', label: 'Tisch-Zuweisung', category: 'seating' },
    { key: 'seatAssignment', label: 'Sitzplatz', category: 'seating' },
    { key: 'invitationSent', label: 'Einladung versendet', category: 'communication' },
    { key: 'invitationSentAt', label: 'Einladung versendet am', category: 'communication' },
    { key: 'thankYouSent', label: 'Dankeschön versendet', category: 'communication' },
    { key: 'notes', label: 'Notizen', category: 'other' },
];
const EXPORT_PRESETS = {
    basic: {
        name: 'Basis-Export',
        description: 'Grundlegende Gäste-Informationen',
        fields: ['firstName', 'lastName', 'email', 'phone', 'relationship', 'side', 'rsvpStatus']
    },
    catering: {
        name: 'Catering-Liste',
        description: 'Für Küche und Catering-Service',
        fields: ['firstName', 'lastName', 'rsvpStatus', 'dietaryRestrictions', 'specialRequirements', 'tableAssignment']
    },
    seating: {
        name: 'Sitzplan-Export',
        description: 'Für Sitzplatz-Koordination',
        fields: ['firstName', 'lastName', 'side', 'tableAssignment', 'seatAssignment', 'plusOneAllowed', 'plusOneName']
    },
    communication: {
        name: 'Kommunikations-Liste',
        description: 'Für E-Mails und Nachfassen',
        fields: ['firstName', 'lastName', 'email', 'phone', 'rsvpStatus', 'invitationSent', 'invitationSentAt']
    },
    complete: {
        name: 'Vollständiger Export',
        description: 'Alle verfügbaren Daten',
        fields: AVAILABLE_FIELDS.map(f => f.key)
    }
};
export function CSVExportDialog({ isOpen, onClose, guests }) {
    const [config, setConfig] = useState({
        format: 'csv',
        includeFields: EXPORT_PRESETS.basic.fields,
        filters: {
            rsvpStatus: [],
            side: [],
            tableAssigned: 'all',
            plusOneAllowed: 'all',
            invitationSent: 'all'
        },
        groupBy: 'none',
        sortBy: 'name'
    });
    const [selectedPreset, setSelectedPreset] = useState('basic');
    const [isExporting, setIsExporting] = useState(false);
    // Filter guests based on configuration
    const filteredGuests = useMemo(() => {
        return guests.filter(guest => {
            // RSVP Status filter
            if (config.filters.rsvpStatus.length > 0 && !config.filters.rsvpStatus.includes(guest.rsvp_status)) {
                return false;
            }
            // Side filter
            if (config.filters.side.length > 0 && guest.side && !config.filters.side.includes(guest.side)) {
                return false;
            }
            // Table Assignment filter
            if (config.filters.tableAssigned !== 'all') {
                if (config.filters.tableAssigned === 'assigned' && !guest.table_assignment_id)
                    return false;
                if (config.filters.tableAssigned === 'unassigned' && guest.table_assignment_id)
                    return false;
            }
            // Plus One filter
            if (config.filters.plusOneAllowed !== 'all') {
                if (config.filters.plusOneAllowed === 'allowed' && !guest.plus_one)
                    return false;
                if (config.filters.plusOneAllowed === 'not_allowed' && guest.plus_one)
                    return false;
            }
            // Invitation Sent filter
            if (config.filters.invitationSent !== 'all') {
                if (config.filters.invitationSent === 'sent' && !guest.invitation_sent)
                    return false;
                if (config.filters.invitationSent === 'not_sent' && guest.invitation_sent)
                    return false;
            }
            return true;
        });
    }, [guests, config.filters]);
    const exportStats = useMemo(() => {
        const total = filteredGuests.length;
        const confirmed = filteredGuests.filter(g => g.rsvp_status === 'confirmed').length;
        const withPlusOne = filteredGuests.filter(g => g.plus_one && g.plus_one_rsvp === 'confirmed').length;
        const tablesUsed = new Set(filteredGuests.map(g => g.table_assignment_id).filter(Boolean)).size;
        return { total, confirmed, withPlusOne, tablesUsed };
    }, [filteredGuests]);
    const handlePresetChange = (preset) => {
        setSelectedPreset(preset);
        setConfig(prev => ({
            ...prev,
            includeFields: EXPORT_PRESETS[preset].fields
        }));
    };
    const handleFieldToggle = (fieldKey, checked) => {
        setConfig(prev => ({
            ...prev,
            includeFields: checked
                ? [...prev.includeFields, fieldKey]
                : prev.includeFields.filter(f => f !== fieldKey)
        }));
    };
    const handleFilterChange = (filterType, value) => {
        setConfig(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                [filterType]: value
            }
        }));
    };
    const handleExport = async () => {
        setIsExporting(true);
        try {
            const fileName = `Wilma_Gaesteliste_${format(new Date(), 'yyyy-MM-dd_HH-mm', { locale: de })}`;
            if (config.format === 'csv') {
                exportGuestsToCSV(filteredGuests, config.includeFields, fileName);
            }
            else if (config.format === 'pdf') {
                generatePrintableList(filteredGuests, config.includeFields, fileName);
            }
            // Close dialog after successful export
            setTimeout(() => {
                setIsExporting(false);
                onClose();
            }, 1000);
        }
        catch (error) {
            console.error('Export error:', error);
            setIsExporting(false);
        }
    };
    const fieldsByCategory = useMemo(() => {
        const categories = AVAILABLE_FIELDS.reduce((acc, field) => {
            if (!acc[field.category])
                acc[field.category] = [];
            acc[field.category].push(field);
            return acc;
        }, {});
        return categories;
    }, []);
    const categoryLabels = {
        basic: '👤 Basis-Daten',
        contact: '📞 Kontakt',
        rsvp: '📋 RSVP',
        plus_one: '👥 Plus One',
        special: '🍽️ Besondere Wünsche',
        seating: '🪑 Sitzplatz',
        communication: '📧 Kommunikation',
        other: '📝 Sonstiges'
    };
    return (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5"/>
            Gäste-Liste exportieren
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="preset" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preset">Vorlagen</TabsTrigger>
            <TabsTrigger value="filters">Filter</TabsTrigger>
            <TabsTrigger value="fields">Felder</TabsTrigger>
          </TabsList>

          {/* Preset Selection */}
          <TabsContent value="preset" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(EXPORT_PRESETS).map(([key, preset]) => (<Card key={key} className={`cursor-pointer transition-colors ${selectedPreset === key ? 'ring-2 ring-royal' : ''}`} onClick={() => handlePresetChange(key)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{preset.name}</CardTitle>
                      {selectedPreset === key && (<CheckCircle className="h-5 w-5 text-royal"/>)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {preset.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {preset.fields.slice(0, 3).map(field => {
                const fieldInfo = AVAILABLE_FIELDS.find(f => f.key === field);
                return (<Badge key={field} variant="secondary" className="text-xs">
                            {fieldInfo?.label}
                          </Badge>);
            })}
                      {preset.fields.length > 3 && (<Badge variant="outline" className="text-xs">
                          +{preset.fields.length - 3} weitere
                        </Badge>)}
                    </div>
                  </CardContent>
                </Card>))}
            </div>
          </TabsContent>

          {/* Filter Configuration */}
          <TabsContent value="filters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RSVP Status Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4"/>
                  RSVP Status
                </Label>
                <div className="space-y-2">
                  {['confirmed', 'declined', 'pending', 'maybe'].map(status => (<div key={status} className="flex items-center space-x-2">
                      <Checkbox id={`rsvp-${status}`} checked={config.filters.rsvpStatus.includes(status)} onCheckedChange={(checked) => {
                const newStatuses = checked
                    ? [...config.filters.rsvpStatus, status]
                    : config.filters.rsvpStatus.filter(s => s !== status);
                handleFilterChange('rsvpStatus', newStatuses);
            }}/>
                      <label htmlFor={`rsvp-${status}`} className="text-sm font-medium">
                        {status === 'confirmed' ? 'Zugesagt' :
                status === 'declined' ? 'Abgesagt' :
                    status === 'pending' ? 'Ausstehend' : 'Vielleicht'}
                      </label>
                    </div>))}
                </div>
              </div>

              {/* Side Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4"/>
                  Seite
                </Label>
                <div className="space-y-2">
                  {['bride', 'groom', 'both'].map(side => (<div key={side} className="flex items-center space-x-2">
                      <Checkbox id={`side-${side}`} checked={config.filters.side.includes(side)} onCheckedChange={(checked) => {
                const newSides = checked
                    ? [...config.filters.side, side]
                    : config.filters.side.filter(s => s !== side);
                handleFilterChange('side', newSides);
            }}/>
                      <label htmlFor={`side-${side}`} className="text-sm font-medium">
                        {side === 'bride' ? 'Braut' :
                side === 'groom' ? 'Bräutigam' : 'Beide'}
                      </label>
                    </div>))}
                </div>
              </div>

              {/* Table Assignment Filter */}
              <div className="space-y-3">
                <Label>Tisch-Zuweisung</Label>
                <Select value={config.filters.tableAssigned} onValueChange={(value) => handleFilterChange('tableAssigned', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Gäste</SelectItem>
                    <SelectItem value="assigned">Nur zugewiesene</SelectItem>
                    <SelectItem value="unassigned">Nur nicht zugewiesene</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Plus One Filter */}
              <div className="space-y-3">
                <Label>Plus One</Label>
                <Select value={config.filters.plusOneAllowed} onValueChange={(value) => handleFilterChange('plusOneAllowed', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Gäste</SelectItem>
                    <SelectItem value="allowed">Plus One erlaubt</SelectItem>
                    <SelectItem value="not_allowed">Kein Plus One</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Field Selection */}
          <TabsContent value="fields" className="space-y-4">
            {Object.entries(fieldsByCategory).map(([category, fields]) => (<div key={category} className="space-y-3">
                <h4 className="font-medium text-sm text-gray-600">
                  {categoryLabels[category]}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {fields.map(field => (<div key={field.key} className="flex items-center space-x-2">
                      <Checkbox id={field.key} checked={config.includeFields.includes(field.key)} onCheckedChange={(checked) => handleFieldToggle(field.key, checked)}/>
                      <label htmlFor={field.key} className="text-sm font-medium">
                        {field.label}
                      </label>
                    </div>))}
                </div>
                {category !== 'other' && <Separator />}
              </div>))}
          </TabsContent>
        </Tabs>

        {/* Export Preview */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Export-Vorschau</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{exportStats.total}</p>
                <p className="text-sm text-gray-600">Gäste exportiert</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{exportStats.confirmed}</p>
                <p className="text-sm text-gray-600">Bestätigte Gäste</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{exportStats.withPlusOne}</p>
                <p className="text-sm text-gray-600">Plus Ones</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{exportStats.tablesUsed}</p>
                <p className="text-sm text-gray-600">Tische belegt</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
          <div className="flex gap-2">
            <Select value={config.format} onValueChange={(value) => setConfig(prev => ({ ...prev, format: value }))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4"/>
                    CSV
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4"/>
                    PDF
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} disabled={isExporting || exportStats.total === 0} className="gap-2">
              {isExporting ? (<>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"/>
                  Exportiere...
                </>) : (<>
                  <Download className="h-4 w-4"/>
                  Exportieren ({exportStats.total})
                </>)}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
}
