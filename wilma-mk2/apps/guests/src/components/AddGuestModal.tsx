import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  UserPlus,
  CalendarCheck,
  Utensils,
  X,
} from 'lucide-react'
import { Guest } from '../types/guest'

const guestFormSchema = z.object({
  first_name: z.string().min(1, 'Vorname ist erforderlich'),
  last_name: z.string().optional(),
  email: z.string().email('Ungültige E-Mail-Adresse').optional().or(z.literal('')),
  phone: z.string().optional(),
  relationship_to_couple: z.string().optional(),
  rsvp_status: z.enum(['pending', 'confirmed', 'declined', 'maybe']),
  plus_one: z.boolean().optional(),
  dietary_restrictions: z.array(z.string()).optional(),
  notes: z.string().optional(),
  table_assignment_id: z.string().optional().nullable(),
  seat_number: z.string().optional().nullable(),
})

type GuestFormData = z.infer<typeof guestFormSchema>

interface AddGuestModalProps {
  isOpen: boolean
  onClose: () => void
  guest?: Guest | null
  onSave: (guest: Guest) => void
}

const commonDietaryRestrictions = [
  'Vegetarisch',
  'Vegan',
  'Glutenfrei',
  'Laktosefrei',
  'Nussallergie',
  'Meeresfrüchte-Allergie',
  'Halal',
  'Kosher',
  'Diabetes',
  'Andere',
]

const relationshipOptions = [
  'Familie',
  'Eltern',
  'Geschwister',
  'Großeltern',
  'Tante/Onkel',
  'Cousin/Cousine',
  'Freunde',
  'Beste Freunde',
  'Studienfreunde',
  'Arbeitskolleg*in',
  'Nachbar*in',
  'Andere',
]

export function AddGuestModal({ isOpen, onClose, guest, onSave }: AddGuestModalProps) {
  const [activeTab, setActiveTab] = useState('basic')
  const isEditing = !!guest

  const form = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      relationship_to_couple: '',
      rsvp_status: 'pending',
      plus_one: false,
      dietary_restrictions: [],
      notes: '',
      table_assignment_id: null,
      seat_number: null,
    },
  })

  // Reset form when guest changes
  useEffect(() => {
    if (guest) {
      form.reset({
        first_name: guest.first_name || '',
        last_name: guest.last_name || '',
        email: guest.email || '',
        phone: guest.phone || '',
        relationship_to_couple: guest.relationship || '',
        rsvp_status: guest.rsvp_status || 'pending',
        plus_one: guest.plus_one || false,
        dietary_restrictions: guest.dietary_restrictions || [],
        notes: guest.notes || '',
        table_assignment_id: guest.table_assignment_id || null,
        seat_number: guest.seat_number || null,
      })
    } else {
      form.reset({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        relationship_to_couple: '',
        rsvp_status: 'pending',
        plus_one: false,
        dietary_restrictions: [],
        notes: '',
        table_assignment_id: null,
        seat_number: null,
      })
    }
  }, [guest, form])

  const handleSubmit = (data: GuestFormData) => {
    const newGuest: Guest = {
      id: guest?.id || crypto.randomUUID(),
      wedding_id: guest?.wedding_id || 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      first_name: data.first_name,
      last_name: data.last_name || undefined,
      email: data.email || undefined,
      phone: data.phone || undefined,
      address: undefined,
      relationship: data.relationship_to_couple || undefined,
      side: 'both',
      rsvp_status: data.rsvp_status,
      rsvp_date: undefined,
      plus_one: data.plus_one || false,
      plus_one_name: undefined,
      plus_one_rsvp: undefined,
      dietary_restrictions: data.dietary_restrictions || [],
      special_requirements: undefined,
      accommodation_needed: false,
      table_assignment_id: data.table_assignment_id || null,
      seat_number: data.seat_number || null,
      invitation_sent: false,
      invitation_sent_at: undefined,
      thank_you_sent: false,
      notes: data.notes || undefined,
      created_at: guest?.created_at || new Date().toISOString(),
    }

    onSave(newGuest)
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const handleDietaryRestrictionToggle = (restriction: string, checked: boolean) => {
    const current = form.getValues('dietary_restrictions') || []
    if (checked) {
      form.setValue('dietary_restrictions', [...current, restriction])
    } else {
      form.setValue('dietary_restrictions', current.filter(r => r !== restriction))
    }
  }

  const watchedFirstName = form.watch('first_name')
  const watchedLastName = form.watch('last_name')
  const watchedPlusOne = form.watch('plus_one')
  const watchedDietaryRestrictions = form.watch('dietary_restrictions') || []

  const tabs = [
    { id: 'basic', label: 'Basis', icon: User },
    { id: 'contact', label: 'Kontakt', icon: Mail },
    { id: 'rsvp', label: 'RSVP', icon: CalendarCheck },
    { id: 'preferences', label: 'Präferenzen', icon: Utensils },
  ]

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-elegant-lg shadow-elegant max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="border-b border-undertone p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-royal/10 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-royal">
                {watchedFirstName?.charAt(0) || '?'}{watchedLastName?.charAt(0) || ''}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-graphite">
                {isEditing ? 'Gast bearbeiten' : 'Neuen Gast hinzufügen'}
              </h2>
              <p className="text-sm text-accent">
                {isEditing 
                  ? 'Informationen des Gastes bearbeiten'
                  : 'Informationen für den neuen Gast eingeben'
                }
              </p>
            </div>
            <button
              onClick={handleClose}
              className="ml-auto p-2 hover:bg-softrose rounded-elegant transition-colors"
            >
              <X className="h-5 w-5 text-accent" />
            </button>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6">
          {/* Tabs */}
          <div className="border-b border-undertone mb-6">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-royal text-royal'
                        : 'border-transparent text-accent hover:text-graphite'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {/* Basic Information */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-graphite mb-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Vorname *
                      </div>
                    </label>
                    <input
                      type="text"
                      {...form.register('first_name')}
                      className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                      placeholder="Vorname"
                    />
                    {form.formState.errors.first_name && (
                      <p className="text-red-500 text-xs mt-1">{form.formState.errors.first_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-graphite mb-1">
                      Nachname
                    </label>
                    <input
                      type="text"
                      {...form.register('last_name')}
                      className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                      placeholder="Nachname"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-graphite mb-1">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Beziehung
                      </div>
                    </label>
                    <select
                      {...form.register('relationship_to_couple')}
                      className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                    >
                      <option value="">Beziehung auswählen</option>
                      {relationshipOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-graphite mb-1">
                      RSVP Status
                    </label>
                    <select
                      {...form.register('rsvp_status')}
                      className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                    >
                      <option value="pending">Ausstehend</option>
                      <option value="confirmed">Zugesagt</option>
                      <option value="declined">Abgesagt</option>
                      <option value="maybe">Vielleicht</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-graphite mb-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      E-Mail-Adresse
                    </div>
                  </label>
                  <input
                    type="email"
                    {...form.register('email')}
                    className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                    placeholder="email@beispiel.de"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-graphite mb-1">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Telefonnummer
                    </div>
                  </label>
                  <input
                    type="tel"
                    {...form.register('phone')}
                    className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>
            )}

            {/* RSVP Information */}
            {activeTab === 'rsvp' && (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...form.register('plus_one')}
                      className="rounded border-undertone text-royal focus:ring-royal"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        <span className="text-sm font-medium text-graphite">Plus One erlaubt</span>
                      </div>
                      <p className="text-xs text-accent">
                        Darf dieser Gast eine Begleitung mitbringen?
                      </p>
                    </div>
                  </label>
                </div>

                {watchedPlusOne && (
                  <div className="pl-7 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-graphite mb-1">
                        Name der Begleitung
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                        placeholder="Name der Begleitung"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-graphite mb-3">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4" />
                      Diätwünsche
                    </div>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {commonDietaryRestrictions.map((restriction) => (
                      <label key={restriction} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={watchedDietaryRestrictions.includes(restriction)}
                          onChange={(e) => 
                            handleDietaryRestrictionToggle(restriction, e.target.checked)
                          }
                          className="rounded border-undertone text-royal focus:ring-royal"
                        />
                        <span className="text-sm text-graphite">{restriction}</span>
                      </label>
                    ))}
                  </div>
                  
                  {watchedDietaryRestrictions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {watchedDietaryRestrictions.map((restriction) => (
                        <span key={restriction} className="inline-flex items-center gap-1 px-2 py-1 bg-royal/10 text-royal rounded-elegant text-xs">
                          {restriction}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-red-500"
                            onClick={() => handleDietaryRestrictionToggle(restriction, false)}
                          />
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-graphite mb-1">
                    Notizen
                  </label>
                  <textarea
                    {...form.register('notes')}
                    className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal"
                    placeholder="Zusätzliche Notizen..."
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-undertone mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-undertone text-accent rounded-elegant hover:bg-softrose transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-royal text-white rounded-elegant hover:bg-royal/90 transition-colors"
            >
              {isEditing ? 'Änderungen speichern' : 'Gast hinzufügen'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
} 