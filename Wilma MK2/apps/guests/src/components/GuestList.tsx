import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Download, Upload, Users, Calendar, MapPin, Phone, Mail, Edit2, Trash2, MoreHorizontal, CheckCircle, XCircle, Clock, User, Heart } from 'lucide-react'
import { Guest } from '../types/guest'
import { CSVExportDialog } from './CSVExportDialog'
import { AddGuestModal } from './AddGuestModal'
import { BulkActions } from './BulkActions'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { supabase } from '../lib/supabase'

interface GuestFilters {
  search: string
  rsvpStatus: string[]
  side: string[]
  plusOne: 'all' | 'allowed' | 'not_allowed'
  tableAssigned: 'all' | 'assigned' | 'unassigned'
  invitationSent: 'all' | 'sent' | 'not_sent'
}

interface GuestListProps {
  guests: Guest[]
  filters: GuestFilters
  onFiltersChange: (filters: GuestFilters) => void
  onGuestUpdate: (guest: Guest) => void
  onGuestDelete: (guestId: string) => void
  onBulkUpdate: (guestIds: string[], updates: Partial<Guest>) => void
  onGuestImport: (guests: Guest[]) => void
}

export function GuestList({
  guests,
  filters,
  onFiltersChange,
  onGuestUpdate,
  onGuestDelete,
  onBulkUpdate,
  onGuestImport
}: GuestListProps) {
  const [selectedGuests, setSelectedGuests] = useState<string[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  // Filter guests based on current filters
  const filteredGuests = guests.filter(guest => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const fullName = `${guest.first_name} ${guest.last_name}`.toLowerCase()
      const email = guest.email?.toLowerCase() || ''
      const phone = guest.phone?.toLowerCase() || ''
      
      if (!fullName.includes(searchTerm) && !email.includes(searchTerm) && !phone.includes(searchTerm)) {
        return false
      }
    }

    // RSVP status filter
    if (filters.rsvpStatus.length > 0 && !filters.rsvpStatus.includes(guest.rsvp_status)) {
      return false
    }

    // Side filter
    if (filters.side.length > 0 && guest.side && !filters.side.includes(guest.side)) {
      return false
    }

    // Plus one filter
    if (filters.plusOne === 'allowed' && !guest.plus_one) {
      return false
    }
    if (filters.plusOne === 'not_allowed' && guest.plus_one) {
      return false
    }

    // Table assignment filter
    if (filters.tableAssigned === 'assigned' && !guest.table_assignment) {
      return false
    }
    if (filters.tableAssigned === 'unassigned' && guest.table_assignment) {
      return false
    }

    // Invitation sent filter
    if (filters.invitationSent === 'sent' && !guest.invitation_sent) {
      return false
    }
    if (filters.invitationSent === 'not_sent' && guest.invitation_sent) {
      return false
    }

    return true
  })

  // Handle guest selection
  const handleGuestSelection = (guestId: string, selected: boolean) => {
    if (selected) {
      setSelectedGuests(prev => [...prev, guestId])
    } else {
      setSelectedGuests(prev => prev.filter(id => id !== guestId))
    }
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedGuests(filteredGuests.map(g => g.id))
    } else {
      setSelectedGuests([])
    }
  }

  const handleBulkUpdate = (updates: Partial<Guest>) => {
    onBulkUpdate(selectedGuests, updates)
    setSelectedGuests([])
  }

  const handleGuestEdit = (guest: Guest) => {
    setEditingGuest(guest)
    setIsAddModalOpen(true)
  }

  const handleGuestSave = async (guestData: Partial<Guest>) => {
    try {
      if (editingGuest) {
        // Update existing guest
        const updatedGuest = { ...editingGuest, ...guestData }
        onGuestUpdate(updatedGuest)
      } else {
        // Add new guest
        const newGuest: Guest = {
          id: crypto.randomUUID(),
          wedding_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          first_name: guestData.first_name || '',
          last_name: guestData.last_name || '',
          email: guestData.email,
          phone: guestData.phone,
          address: guestData.address,
          relationship_to_couple: guestData.relationship_to_couple || '',
          side: guestData.side,
          rsvp_status: guestData.rsvp_status || 'pending',
          plus_one: guestData.plus_one || false,
          plus_one_name: guestData.plus_one_name,
          plus_one_rsvp: guestData.plus_one_rsvp,
          dietary_restrictions: guestData.dietary_restrictions || [],
          special_requirements: guestData.special_requirements,
          accommodation_needed: guestData.accommodation_needed || false,
          table_assignment_id: guestData.table_assignment_id || null,
          seat_number: guestData.seat_number || null,
          invitation_sent: guestData.invitation_sent || false,
          thank_you_sent: guestData.thank_you_sent || false,
          notes: guestData.notes,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        onGuestImport([newGuest])
      }
      setIsAddModalOpen(false)
      setEditingGuest(null)
    } catch (error) {
      console.error('Error saving guest:', error)
    }
  }

  const getRSVPStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-moss" />
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'maybe':
        return <Clock className="h-4 w-4 text-gold" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getRSVPStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'bg-moss/10 text-moss border-moss/20',
      declined: 'bg-red-50 text-red-600 border-red-200',
      maybe: 'bg-gold/10 text-gold border-gold/20',
      pending: 'bg-gray-50 text-gray-600 border-gray-200'
    }
    
    const labels = {
      confirmed: 'Zugesagt',
      declined: 'Abgesagt',
      maybe: 'Vielleicht',
      pending: 'Ausstehend'
    }
    
    return (
      <Badge variant="secondary" className={variants[status] || variants.pending}>
        {labels[status] || labels.pending}
      </Badge>
    )
  }

  const getSideIcon = (side: string) => {
    switch (side) {
      case 'bride':
        return <Heart className="h-4 w-4 text-pink-500" />
      case 'groom':
        return <User className="h-4 w-4 text-blue-500" />
      default:
        return <Users className="h-4 w-4 text-gray-400" />
    }
  }

  const stats = {
    total: filteredGuests.length,
    confirmed: filteredGuests.filter(g => g.rsvp_status === 'confirmed').length,
    declined: filteredGuests.filter(g => g.rsvp_status === 'declined').length,
    pending: filteredGuests.filter(g => g.rsvp_status === 'pending').length,
    plusOnes: filteredGuests.filter(g => g.plus_one).length,
    tableAssigned: filteredGuests.filter(g => g.table_assignment).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-accent">Gästeliste</h1>
          <p className="text-undertone mt-1">
            {stats.total} Gäste insgesamt • {stats.confirmed} zugesagt • {stats.pending} ausstehend
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportDialogOpen(true)}
            className="border-undertone"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportieren
          </Button>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            size="sm"
            className="bg-royal hover:bg-royal/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Gast hinzufügen
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-accent">{stats.total}</div>
          <div className="text-sm text-undertone">Gäste insgesamt</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-moss">{stats.confirmed}</div>
          <div className="text-sm text-undertone">Zugesagt</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-gray-500">{stats.pending}</div>
          <div className="text-sm text-undertone">Ausstehend</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-500">{stats.declined}</div>
          <div className="text-sm text-undertone">Abgesagt</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-royal">{stats.plusOnes}</div>
          <div className="text-sm text-undertone">Plus One</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-gold">{stats.tableAssigned}</div>
          <div className="text-sm text-undertone">Tisch zugewiesen</div>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedGuests.length > 0 && (
        <BulkActions
          selectedCount={selectedGuests.length}
          onBulkUpdate={handleBulkUpdate}
          onClearSelection={() => setSelectedGuests([])}
        />
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-undertone" />
              <input
                type="text"
                placeholder="Suche nach Name, E-Mail oder Telefon..."
                value={filters.search}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-undertone rounded-elegant-lg focus:outline-none focus:ring-2 focus:ring-royal/20"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={filters.rsvpStatus[0] || 'all'} onValueChange={(value) => onFiltersChange({ ...filters, rsvpStatus: value === 'all' ? [] : [value] })}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="RSVP Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle RSVP</SelectItem>
                <SelectItem value="confirmed">Zugesagt</SelectItem>
                <SelectItem value="declined">Abgesagt</SelectItem>
                <SelectItem value="maybe">Vielleicht</SelectItem>
                <SelectItem value="pending">Ausstehend</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.side[0] || 'all'} onValueChange={(value) => onFiltersChange({ ...filters, side: value === 'all' ? [] : [value] })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Seite" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Seiten</SelectItem>
                <SelectItem value="bride">Braut</SelectItem>
                <SelectItem value="groom">Bräutigam</SelectItem>
                <SelectItem value="both">Beide</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Guest Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-undertone">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <Label>Alle auswählen</Label>
            </div>
            <div className="text-sm text-undertone">
              {filteredGuests.length} von {guests.length} Gästen
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>RSVP</TableHead>
                <TableHead>Seite</TableHead>
                <TableHead>Tisch</TableHead>
                <TableHead>Plus One</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedGuests.includes(guest.id)}
                      onCheckedChange={(checked) => handleGuestSelection(guest.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{guest.first_name} {guest.last_name}</div>
                    <div className="text-sm text-undertone">{guest.relationship_to_couple}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {guest.email && (
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {guest.email}
                        </div>
                      )}
                      {guest.phone && (
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {guest.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getRSVPStatusIcon(guest.rsvp_status)}
                      {getRSVPStatusBadge(guest.rsvp_status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getSideIcon(guest.side || '')}
                      <span className="capitalize">{guest.side || 'Nicht angegeben'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {guest.table_assignment ? (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Tisch {guest.table_assignment}
                        {guest.seat_number && ` (${guest.seat_number})`}
                      </div>
                    ) : (
                      <span className="text-undertone">Nicht zugewiesen</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {guest.plus_one ? (
                      <Badge variant="secondary" className="bg-royal/10 text-royal">
                        Erlaubt
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                        Nicht erlaubt
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleGuestEdit(guest)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onGuestDelete(guest.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Modals */}
      <AddGuestModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingGuest(null)
        }}
        onSave={handleGuestSave}
        existingGuest={editingGuest}
      />
      
      <CSVExportDialog
        isOpen={isExportDialogOpen}
        onClose={() => setIsExportDialogOpen(false)}
        guests={filteredGuests}
      />
    </div>
  )
} 