import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter, Plus, Mail, Edit, Trash2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Guest {
  id: string
  name: string
  email: string
  phone?: string
  relationship: string
  plusOne: boolean
  rsvpStatus: 'pending' | 'confirmed' | 'declined'
  mealPreference?: string
  notes?: string
}

export function GuestManager() {
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '555-123-4567',
      relationship: 'Friend',
      plusOne: true,
      rsvpStatus: 'confirmed',
      mealPreference: 'Vegetarian',
      notes: 'Allergic to nuts'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      relationship: 'Family',
      plusOne: false,
      rsvpStatus: 'pending'
    },
    {
      id: '3',
      name: 'Michael Williams',
      email: 'michael@example.com',
      phone: '555-987-6543',
      relationship: 'Coworker',
      plusOne: true,
      rsvpStatus: 'declined'
    }
  ])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newGuest, setNewGuest] = useState<Partial<Guest>>({
    name: '',
    email: '',
    phone: '',
    relationship: 'Friend',
    plusOne: false,
    rsvpStatus: 'pending'
  })

  const filteredGuests = guests.filter(guest => {
    // Search filter
    const matchesSearch = 
      guest.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase()) ||
      (guest.phone && guest.phone.includes(search))
    
    // Status filter
    const matchesStatus = 
      filterStatus === 'all' || 
      guest.rsvpStatus === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const guestStats = {
    total: guests.length,
    confirmed: guests.filter(g => g.rsvpStatus === 'confirmed').length,
    declined: guests.filter(g => g.rsvpStatus === 'declined').length,
    pending: guests.filter(g => g.rsvpStatus === 'pending').length,
    plusOnes: guests.filter(g => g.plusOne).length
  }

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (isEditing && selectedGuest) {
      if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked
        setSelectedGuest({ ...selectedGuest, [name]: checked })
      } else {
        setSelectedGuest({ ...selectedGuest, [name]: value })
      }
    } else {
      if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked
        setNewGuest({ ...newGuest, [name]: checked })
      } else {
        setNewGuest({ ...newGuest, [name]: value })
      }
    }
  }

  const addGuest = () => {
    if (newGuest.name && newGuest.email) {
      const guest: Guest = {
        id: Math.random().toString(36).substring(7),
        name: newGuest.name,
        email: newGuest.email,
        phone: newGuest.phone || '',
        relationship: newGuest.relationship || 'Friend',
        plusOne: newGuest.plusOne || false,
        rsvpStatus: newGuest.rsvpStatus as 'pending' | 'confirmed' | 'declined',
        mealPreference: newGuest.mealPreference,
        notes: newGuest.notes
      }
      
      setGuests([...guests, guest])
      setNewGuest({
        name: '',
        email: '',
        phone: '',
        relationship: 'Friend',
        plusOne: false,
        rsvpStatus: 'pending'
      })
    }
  }

  const updateGuest = () => {
    if (selectedGuest) {
      setGuests(guests.map(g => g.id === selectedGuest.id ? selectedGuest : g))
      setSelectedGuest(null)
      setIsEditing(false)
    }
  }

  const deleteGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id))
  }

  const openEditGuest = (guest: Guest) => {
    setSelectedGuest(guest)
    setIsEditing(true)
  }
  
  const sendInvitations = () => {
    alert(`Sending invitations to ${filteredGuests.length} guests...`)
  }

  return (
    <div className="wedding-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-wedding-serif font-bold mb-4">Guest Manager</h1>
          <p className="text-muted-foreground">
            Keep track of all your wedding guests, RSVPs, and special requirements in one place.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Total Guests</p>
            <p className="text-3xl font-bold text-[hsl(var(--wedding-navy))]">{guestStats.total}</p>
          </div>
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">{guestStats.confirmed}</p>
          </div>
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Declined</p>
            <p className="text-3xl font-bold text-red-500">{guestStats.declined}</p>
          </div>
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Pending</p>
            <p className="text-3xl font-bold text-amber-500">{guestStats.pending}</p>
          </div>
          <div className="wedding-card p-4 text-center">
            <p className="text-muted-foreground text-sm">Plus Ones</p>
            <p className="text-3xl font-bold text-[hsl(var(--wedding-rose))]">{guestStats.plusOnes}</p>
          </div>
        </div>
        
        {/* Actions and Filters */}
        <div className="wedding-card mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-[hsl(var(--wedding-rose))] mr-3" />
              <h2 className="text-2xl font-wedding-serif font-semibold">Guest List</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search guests..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10 pr-4 w-full md:w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="declined">Declined</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Add Guest Form */}
          {!isEditing && (
            <div className="mb-6 p-4 border border-[hsl(var(--wedding-blush))] rounded-md bg-[hsl(var(--wedding-blush)/0.1)]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Guest
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name*
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={newGuest.name}
                    onChange={handleGuestChange}
                    placeholder="Guest name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address*
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={newGuest.email}
                    onChange={handleGuestChange}
                    placeholder="guest@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newGuest.phone}
                    onChange={handleGuestChange}
                    placeholder="Optional"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="relationship" className="block text-sm font-medium mb-1">
                    Relationship
                  </label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={newGuest.relationship}
                    onChange={handleGuestChange}
                    className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                  >
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Coworker">Coworker</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="rsvpStatus" className="block text-sm font-medium mb-1">
                    RSVP Status
                  </label>
                  <select
                    id="rsvpStatus"
                    name="rsvpStatus"
                    value={newGuest.rsvpStatus}
                    onChange={handleGuestChange}
                    className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2 mt-7">
                  <input
                    type="checkbox"
                    id="plusOne"
                    name="plusOne"
                    checked={newGuest.plusOne}
                    onChange={handleGuestChange}
                    className="h-4 w-4 text-[hsl(var(--wedding-rose))] focus:ring-[hsl(var(--wedding-rose))]"
                  />
                  <label htmlFor="plusOne" className="text-sm font-medium">
                    Allow Plus One
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="wedding" onClick={addGuest}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Guest
                </Button>
              </div>
            </div>
          )}
          
          {/* Edit Guest Form */}
          {isEditing && selectedGuest && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 border border-[hsl(var(--wedding-gold))] rounded-md bg-[hsl(var(--wedding-cream))]"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Guest
                </h3>
                <button
                  onClick={() => { setIsEditing(false); setSelectedGuest(null); }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                    Full Name*
                  </label>
                  <Input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={selectedGuest.name}
                    onChange={handleGuestChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-email" className="block text-sm font-medium mb-1">
                    Email Address*
                  </label>
                  <Input
                    type="email"
                    id="edit-email"
                    name="email"
                    value={selectedGuest.email}
                    onChange={handleGuestChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="edit-phone"
                    name="phone"
                    value={selectedGuest.phone || ''}
                    onChange={handleGuestChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="edit-relationship" className="block text-sm font-medium mb-1">
                    Relationship
                  </label>
                  <select
                    id="edit-relationship"
                    name="relationship"
                    value={selectedGuest.relationship}
                    onChange={handleGuestChange}
                    className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                  >
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Coworker">Coworker</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="edit-rsvpStatus" className="block text-sm font-medium mb-1">
                    RSVP Status
                  </label>
                  <select
                    id="edit-rsvpStatus"
                    name="rsvpStatus"
                    value={selectedGuest.rsvpStatus}
                    onChange={handleGuestChange}
                    className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="edit-mealPreference" className="block text-sm font-medium mb-1">
                    Meal Preference
                  </label>
                  <Input
                    type="text"
                    id="edit-mealPreference"
                    name="mealPreference"
                    value={selectedGuest.mealPreference || ''}
                    onChange={handleGuestChange}
                    placeholder="E.g., Vegetarian"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="edit-notes" className="block text-sm font-medium mb-1">
                  Notes
                </label>
                <textarea
                  id="edit-notes"
                  name="notes"
                  rows={2}
                  value={selectedGuest.notes || ''}
                  onChange={handleGuestChange}
                  placeholder="Any additional notes"
                  className="w-full border-gray-200 rounded-md focus:ring-[hsl(var(--wedding-rose))] focus:border-[hsl(var(--wedding-rose))]"
                ></textarea>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="edit-plusOne"
                  name="plusOne"
                  checked={selectedGuest.plusOne}
                  onChange={e => setSelectedGuest({ ...selectedGuest, plusOne: e.target.checked })}
                  className="h-4 w-4 text-[hsl(var(--wedding-rose))] focus:ring-[hsl(var(--wedding-rose))]"
                />
                <label htmlFor="edit-plusOne" className="text-sm font-medium">
                  Allow Plus One
                </label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => { setIsEditing(false); setSelectedGuest(null); }}>
                  Cancel
                </Button>
                <Button variant="wedding" onClick={updateGuest}>
                  <Check className="h-4 w-4 mr-1" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Guest List Table */}
          {filteredGuests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No guests found. Add a guest or adjust your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[hsl(var(--wedding-blush)/0.2)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Relationship</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Plus One</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredGuests.map(guest => (
                    <tr key={guest.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">{guest.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">{guest.email}</div>
                        {guest.phone && <div className="text-xs text-muted-foreground">{guest.phone}</div>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm">{guest.relationship}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          guest.rsvpStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                          guest.rsvpStatus === 'declined' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {guest.rsvpStatus.charAt(0).toUpperCase() + guest.rsvpStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {guest.plusOne ? 'Yes' : 'No'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditGuest(guest)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteGuest(guest.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {filteredGuests.length > 0 && (
            <div className="mt-6 text-right">
              <Button variant="wedding" onClick={sendInvitations}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invitations
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
