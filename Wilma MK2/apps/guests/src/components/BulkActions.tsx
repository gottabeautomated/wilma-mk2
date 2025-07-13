import { useState } from 'react'
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Mail,
  Trash2,
  MoreHorizontal,
  UserPlus,
  X,
  Download,
  Settings,
  CalendarCheck,
  Heart,
  MapPin,
} from 'lucide-react'
import { Guest } from '../types/guest'

interface BulkActionsProps {
  selectedCount: number
  onBulkUpdate: (updates: Partial<Guest>) => void
  onClearSelection: () => void
}

export function BulkActions({
  selectedCount,
  onBulkUpdate,
  onClearSelection,
}: BulkActionsProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [selectedDiet, setSelectedDiet] = useState('')
  const [pendingAction, setPendingAction] = useState<{
    type: string
    data: Partial<Guest>
    description: string
  } | null>(null)

  const handleBulkAction = (type: string, data: Partial<Guest>, description: string) => {
    setPendingAction({ type, data, description })
    setIsConfirmDialogOpen(true)
  }

  const confirmBulkAction = () => {
    if (pendingAction) {
      onBulkUpdate(pendingAction.data)
      setIsConfirmDialogOpen(false)
      setPendingAction(null)
      onClearSelection()
    }
  }

  const handleTableAssignment = () => {
    if (selectedTable) {
      handleBulkAction(
        'assign-table',
        { table_assignment_id: selectedTable },
        `Alle ausgewählten Gäste zu Tisch ${selectedTable} zuweisen`
      )
      setSelectedTable('')
    }
  }

  const handleDietAssignment = () => {
    if (selectedDiet) {
      handleBulkAction(
        'add-diet',
        { dietary_restrictions: [selectedDiet] },
        `Diätwunsch "${selectedDiet}" zu allen ausgewählten Gästen hinzufügen`
      )
      setSelectedDiet('')
    }
  }

  const quickActions = [
    {
      label: 'RSVP: Zugesagt',
      icon: CheckCircle,
      color: 'text-moss',
      action: () => handleBulkAction(
        'rsvp-confirmed',
        { rsvp_status: 'confirmed' },
        'RSVP Status aller ausgewählten Gäste auf "Zugesagt" setzen'
      ),
    },
    {
      label: 'RSVP: Abgesagt',
      icon: XCircle,
      color: 'text-red-600',
      action: () => handleBulkAction(
        'rsvp-declined',
        { rsvp_status: 'declined' },
        'RSVP Status aller ausgewählten Gäste auf "Abgesagt" setzen'
      ),
    },
    {
      label: 'RSVP: Ausstehend',
      icon: Clock,
      color: 'text-gold',
      action: () => handleBulkAction(
        'rsvp-pending',
        { rsvp_status: 'pending' },
        'RSVP Status aller ausgewählten Gäste auf "Ausstehend" setzen'
      ),
    },
    {
      label: 'Plus One erlauben',
      icon: UserPlus,
      color: 'text-royal',
      action: () => handleBulkAction(
        'allow-plus-one',
        { plus_one: true },
        'Plus One für alle ausgewählten Gäste erlauben'
      ),
    },
  ]

  return (
    <>
      <div className="bg-royal/5 border border-royal/20 rounded-elegant-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-elegant text-sm font-medium bg-royal/10 text-royal">
              {selectedCount} Gäste ausgewählt
            </span>
            <button
              onClick={onClearSelection}
              className="p-1 hover:bg-royal/10 rounded-elegant transition-colors"
            >
              <X className="h-4 w-4 text-royal" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Quick Actions */}
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-undertone text-accent rounded-elegant hover:bg-softrose transition-colors text-sm"
                >
                  <Icon className={`h-4 w-4 ${action.color}`} />
                  <span className="hidden sm:inline">{action.label}</span>
                </button>
              )
            })}

            {/* More Actions Dropdown */}
            <div className="relative">
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-undertone text-accent rounded-elegant hover:bg-softrose transition-colors text-sm">
                <MoreHorizontal className="h-4 w-4" />
                Mehr Aktionen
              </button>
            </div>

            {/* Advanced Settings */}
            <div className="relative">
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-undertone text-accent rounded-elegant hover:bg-softrose transition-colors text-sm">
                <Settings className="h-4 w-4" />
                Erweitert
              </button>
            </div>
          </div>
        </div>

        {/* Quick Settings Row */}
        <div className="mt-4 flex flex-wrap gap-4 pt-4 border-t border-royal/20">
          {/* Table Assignment */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-accent font-medium">Tisch:</span>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="px-3 py-1 border border-undertone rounded-elegant text-sm focus:outline-none focus:ring-2 focus:ring-royal/20"
            >
              <option value="">Tisch auswählen</option>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={`table-${i + 1}`}>
                  Tisch {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={handleTableAssignment}
              disabled={!selectedTable}
              className="px-3 py-1 bg-royal text-white rounded-elegant hover:bg-royal/90 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Zuweisen
            </button>
          </div>

          {/* Diet Assignment */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-accent font-medium">Diät:</span>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="px-3 py-1 border border-undertone rounded-elegant text-sm focus:outline-none focus:ring-2 focus:ring-royal/20"
            >
              <option value="">Diätwunsch auswählen</option>
              <option value="Vegetarisch">Vegetarisch</option>
              <option value="Vegan">Vegan</option>
              <option value="Glutenfrei">Glutenfrei</option>
              <option value="Laktosefrei">Laktosefrei</option>
              <option value="Nussallergie">Nussallergie</option>
              <option value="Halal">Halal</option>
              <option value="Kosher">Kosher</option>
            </select>
            <button
              onClick={handleDietAssignment}
              disabled={!selectedDiet}
              className="px-3 py-1 bg-royal text-white rounded-elegant hover:bg-royal/90 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Hinzufügen
            </button>
          </div>

          {/* Additional Quick Actions */}
          <div className="flex items-center gap-2">
                         <button
               onClick={() => handleBulkAction(
                 'add-note',
                 { notes: 'Einladung versendet' },
                 'Notiz "Einladung versendet" zu allen ausgewählten Gästen hinzufügen'
               )}
               className="inline-flex items-center gap-1 px-3 py-1 bg-moss text-white rounded-elegant hover:bg-moss/90 transition-colors text-sm"
             >
               <Mail className="h-3 w-3" />
               Einladung ✓
             </button>
            <button
              onClick={() => handleBulkAction(
                'disable-plus-one',
                { plus_one: false },
                'Plus One für alle ausgewählten Gäste deaktivieren'
              )}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-elegant hover:bg-gray-600 transition-colors text-sm"
            >
              <UserPlus className="h-3 w-3" />
              Plus One ✗
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {isConfirmDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-elegant-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-serif font-bold text-graphite mb-2">
              Aktion bestätigen
            </h3>
            <div className="text-accent mb-4">
              <p>{pendingAction?.description}</p>
              <div className="mt-2 p-3 bg-royal/5 rounded-elegant">
                <strong>Betroffen: {selectedCount} Gäste</strong>
              </div>
              <p className="text-sm text-red-600 mt-2">
                Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsConfirmDialogOpen(false)}
                className="px-4 py-2 border border-undertone text-accent rounded-elegant hover:bg-softrose transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={confirmBulkAction}
                className="px-4 py-2 bg-royal text-white rounded-elegant hover:bg-royal/90 transition-colors"
              >
                Bestätigen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 