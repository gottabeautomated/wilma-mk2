import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo, useDragControls } from 'framer-motion';
import { Plus, ZoomIn, ZoomOut, RotateCcw, Save, Sparkles, Users, Settings } from 'lucide-react';
import { supabase, seatingAPI } from '../../lib/supabase';
import { 
  Guest, 
  Table, 
  VenueLayout, 
  SeatingChartState,
  Wedding,
  SeatingStats
} from '../../types/guest';
import TableComponent from './TableComponent';
import AddTableModal from './AddTableModal';
import GuestAssignmentModal from './GuestAssignmentModal';

interface SeatingChartProps {
  weddingId: string;
  readonly?: boolean;
}

const SeatingChart: React.FC<SeatingChartProps> = ({ weddingId, readonly = false }) => {
  // State Management
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [venueLayout, setVenueLayout] = useState<VenueLayout | null>(null);
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [seatingStats, setSeatingStats] = useState<SeatingStats | null>(null);
  
  const [chartState, setChartState] = useState<SeatingChartState>({
    selectedTable: null,
    selectedGuest: null,
    draggedTable: null,
    zoom: 1,
    pan: { x: 0, y: 0 },
    showRelationships: false,
    showConflicts: false,
    viewMode: readonly ? 'preview' : 'edit'
  });
  
  const [addTableModal, setAddTableModal] = useState(false);
  const [assignmentModal, setAssignmentModal] = useState<{
    isOpen: boolean;
    table: Table | null;
    seatNumber: number;
    currentGuestId?: string;
  }>({
    isOpen: false,
    table: null,
    seatNumber: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Refs
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  
  // Constants
  const VIEWPORT_WIDTH = 1200;
  const VIEWPORT_HEIGHT = 800;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 3;
  
  // Calculate seating statistics
  const calculateSeatingStats = useCallback(() => {
    const assignedGuests = guests.filter(g => g.table_assignment_id).length;
    const occupiedTables = tables.filter(t => 
      guests.some(g => g.table_assignment_id === t.id)
    ).length;
    
    const stats: SeatingStats = {
      wedding_id: weddingId,
      total_guests: guests.length,
      assigned_guests: assignedGuests,
      unassigned_guests: guests.length - assignedGuests,
      total_tables: tables.length,
      occupied_tables: occupiedTables,
      assignment_percentage: guests.length > 0 ? (assignedGuests / guests.length) * 100 : 0
    };
    
    setSeatingStats(stats);
  }, [guests, tables, weddingId]);
  
  // Data Loading
  const loadSeatingData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Load wedding details
      const { data: weddingData, error: weddingError } = await seatingAPI.getWedding(weddingId);
      if (weddingError) throw weddingError;
      setWedding(weddingData as Wedding);
      
      // Load guests
      const { data: guestsData, error: guestsError } = await seatingAPI.getGuests(weddingId);
      if (guestsError) throw guestsError;
      setGuests(guestsData as Guest[]);
      
      // Load tables
      const { data: tablesData, error: tablesError } = await seatingAPI.getTables(weddingId);
      
      if (tablesError || !tablesData || tablesData.length === 0) {
        // If no tables exist, create default ones
        const defaultTables: Table[] = [
          {
            id: 'table-1',
            wedding_id: weddingId,
            name: 'Tisch 1',
            type: 'round',
            position: { x: 300, y: 200 },
            rotation: 0,
            seats: 8,
            style: { color: '#6B46C1' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 'table-2',
            wedding_id: weddingId,
            name: 'Tisch 2',
            type: 'round',
            position: { x: 600, y: 200 },
            rotation: 0,
            seats: 6,
            style: { color: '#D4AF37' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 'table-3',
            wedding_id: weddingId,
            name: 'Tisch 3',
            type: 'rectangle',
            position: { x: 450, y: 400 },
            rotation: 0,
            seats: 10,
            style: { color: '#6B7F5B' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
        setTables(defaultTables);
      } else {
        setTables(tablesData as Table[]);
      }
      
      // Track analytics
      await seatingAPI.trackSeatingEvent(weddingId, 'seating_chart_loaded', {
        guest_count: guestsData?.length || 0,
        table_count: tablesData?.length || 0
      });
      
    } catch (error) {
      console.error('Error loading seating data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [weddingId]);
  
  // Auto-save functionality
  const saveChanges = useCallback(async () => {
    if (readonly || isSaving) return;
    
    try {
      setIsSaving(true);
      
      // Only save table positions (guest assignments are saved immediately)
      for (const table of tables) {
        await seatingAPI.updateTable(table.id, {
          name: table.name,
          type: table.type,
          position: table.position,
          rotation: table.rotation,
          seats: table.seats,
          style: table.style
        });
      }
      
      setLastSaved(new Date());
      
      // Track analytics
      await seatingAPI.trackSeatingEvent(weddingId, 'seating_chart_saved', {
        table_count: tables.length,
        assigned_guests: guests.filter(g => g.table_assignment_id).length
      });
      
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false);
    }
  }, [tables, guests, weddingId, readonly, isSaving]);
  
  // Real-time subscriptions
  useEffect(() => {
    loadSeatingData();
    
    // Set up real-time subscriptions for collaborative editing
    let unsubscribe: (() => void) | undefined;
    
    const setupRealtime = async () => {
      try {
        unsubscribe = await seatingAPI.subscribeToSeatingChanges(weddingId, (payload) => {
          console.log('Seating data changed:', payload);
          loadSeatingData(); // Reload data when changes occur
        });
      } catch (error) {
        console.warn('Failed to set up realtime subscriptions:', error);
      }
    };
    
    setupRealtime();
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [weddingId, loadSeatingData]);
  
  // Calculate stats when data changes
  useEffect(() => {
    calculateSeatingStats();
  }, [calculateSeatingStats]);
  
  // Track if there are unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<number>(0);
  
  // Auto-save when there are unsaved changes
  useEffect(() => {
    if (!hasUnsavedChanges || readonly || isSaving) return;
    
    const saveTimer = setTimeout(() => {
      const now = Date.now();
      // Only save if enough time has passed since last save to avoid loops
      if (now - lastSaveTime > 5000) { // 5 seconds cooldown
        saveChanges();
        setHasUnsavedChanges(false);
        setLastSaveTime(now);
      }
    }, 3000); // Auto-save after 3 seconds of no changes
    
    return () => clearTimeout(saveTimer);
  }, [hasUnsavedChanges, readonly, isSaving, lastSaveTime, saveChanges]);
  
  // Event Handlers
  const handleTableSelect = (tableId: string) => {
    if (readonly) return;
    setChartState(prev => ({
      ...prev,
      selectedTable: prev.selectedTable === tableId ? null : tableId
    }));
  };
  
  const handleTableDrag = (tableId: string, info: PanInfo) => {
    if (readonly) return;
    
    setTables(prev => prev.map(table => 
      table.id === tableId 
        ? { 
            ...table, 
            position: { 
              x: table.position.x + info.delta.x / chartState.zoom,
              y: table.position.y + info.delta.y / chartState.zoom
            } 
          }
        : table
    ));
    setHasUnsavedChanges(true);
  };
  
  const handleSeatClick = (tableId: string, seatNumber: number) => {
    if (readonly) return;
    
    const table = tables.find(t => t.id === tableId);
    if (!table) return;
    
    const currentGuest = guests.find(g => 
      g.table_assignment_id === tableId && g.seat_number === seatNumber
    );
    
    setAssignmentModal({
      isOpen: true,
      table,
      seatNumber,
      currentGuestId: currentGuest?.id
    });
  };
  
  const handleAssignGuest = async (guestId: string, tableId: string, seatNumber: number) => {
    try {
      // Update guest assignment
      setGuests(prev => prev.map(guest => 
        guest.id === guestId 
          ? { ...guest, table_assignment_id: tableId, seat_number: seatNumber }
          : guest
      ));
      
      // Update in database immediately for guest assignments
      await seatingAPI.assignGuestToSeat(guestId, tableId, seatNumber);
      
      // Track analytics
      await seatingAPI.trackSeatingEvent(weddingId, 'guest_assigned', {
        guest_id: guestId,
        table_id: tableId,
        seat_number: seatNumber
      });
      
    } catch (error) {
      console.error('Error assigning guest:', error);
    }
  };
  
  const handleRemoveGuest = async (guestId: string) => {
    try {
      // Remove assignment locally
      setGuests(prev => prev.map(guest => 
        guest.id === guestId 
          ? { ...guest, table_assignment_id: undefined, seat_number: undefined }
          : guest
      ));
      
      // Update in database immediately for guest removals
      await seatingAPI.removeGuestFromSeat(guestId);
      
      // Track analytics
      await seatingAPI.trackSeatingEvent(weddingId, 'guest_removed', {
        guest_id: guestId
      });
      
    } catch (error) {
      console.error('Error removing guest:', error);
    }
  };
  
  const handleAddTable = async (tableData: Omit<Table, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await seatingAPI.createTable({
        ...tableData,
        id: `table-${Date.now()}`, // Generate unique ID
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      setTables(prev => [...prev, data as Table]);
      
      // Track analytics
      await seatingAPI.trackSeatingEvent(weddingId, 'table_added', {
        table_type: tableData.type,
        table_seats: tableData.seats
      });
      
      // New tables are immediately saved to database, no need to mark as unsaved
      
    } catch (error) {
      console.error('Error adding table:', error);
    }
  };
  
  const handleZoom = (direction: 'in' | 'out') => {
    setChartState(prev => ({
      ...prev,
      zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, 
        prev.zoom + (direction === 'in' ? 0.2 : -0.2)
      ))
    }));
  };
  
  const handleReset = () => {
    setChartState(prev => ({
      ...prev,
      zoom: 1,
      pan: { x: 0, y: 0 },
      selectedTable: null
    }));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-royal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-accent">Sitzplan wird geladen...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-elegant-lg border border-undertone shadow-elegant overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-undertone p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-serif font-bold text-graphite">
              Sitzplan - {wedding?.couple_name || 'Ihre Hochzeit'}
            </h2>
            <div className="flex items-center gap-2 text-sm text-accent">
              <Users className="w-4 h-4" />
              <span>
                {seatingStats?.assigned_guests || 0}/{seatingStats?.total_guests || 0} Gäste • {seatingStats?.total_tables || 0} Tische
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-softrose rounded-elegant border border-undertone">
              <button
                onClick={() => handleZoom('out')}
                className="p-2 hover:bg-champagne transition-colors"
                disabled={chartState.zoom <= MIN_ZOOM}
              >
                <ZoomOut className="w-4 h-4 text-accent" />
              </button>
              <span className="px-3 py-2 text-sm font-medium text-accent border-x border-undertone">
                {Math.round(chartState.zoom * 100)}%
              </span>
              <button
                onClick={() => handleZoom('in')}
                className="p-2 hover:bg-champagne transition-colors"
                disabled={chartState.zoom >= MAX_ZOOM}
              >
                <ZoomIn className="w-4 h-4 text-accent" />
              </button>
            </div>
            
            {/* Action Buttons */}
            {!readonly && (
              <>
                <button
                  onClick={handleReset}
                  className="p-2 bg-softrose hover:bg-champagne rounded-elegant border border-undertone transition-colors"
                  title="Ansicht zurücksetzen"
                >
                  <RotateCcw className="w-4 h-4 text-accent" />
                </button>
                
                <button
                  onClick={saveChanges}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-royal hover:bg-royal-dark text-white rounded-elegant transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Speichert...' : 'Speichern'}
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-dark text-white rounded-elegant transition-colors">
                  <Sparkles className="w-4 h-4" />
                  KI-Optimierung
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-undertone">
          <div className="flex items-center gap-4 text-sm text-accent">
            <span>
              Letzte Speicherung: {lastSaved ? lastSaved.toLocaleTimeString() : 'Noch nicht gespeichert'}
            </span>
            {seatingStats && (
              <span>
                {Math.round(seatingStats.assignment_percentage)}% zugewiesen
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-accent cursor-pointer">
              <input
                type="checkbox"
                checked={chartState.showRelationships}
                onChange={(e) => setChartState(prev => ({ ...prev, showRelationships: e.target.checked }))}
                className="rounded border-undertone text-royal focus:ring-royal"
              />
              Beziehungen anzeigen
            </label>
            
            <label className="flex items-center gap-2 text-sm text-accent cursor-pointer">
              <input
                type="checkbox"
                checked={chartState.showConflicts}
                onChange={(e) => setChartState(prev => ({ ...prev, showConflicts: e.target.checked }))}
                className="rounded border-undertone text-gold focus:ring-gold"
              />
              Konflikte anzeigen
            </label>
          </div>
        </div>
      </div>
      
      {/* SVG Canvas */}
      <div ref={containerRef} className="relative bg-softrose overflow-hidden" style={{ height: '600px' }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E6D4C1" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Zoom and Pan Container */}
          <g transform={`translate(${chartState.pan.x}, ${chartState.pan.y}) scale(${chartState.zoom})`}>
            {/* Render Tables */}
            {tables.map(table => (
              <TableComponent
                key={table.id}
                table={table}
                guests={guests}
                isSelected={chartState.selectedTable === table.id}
                isDragged={chartState.draggedTable === table.id}
                readonly={readonly}
                zoom={chartState.zoom}
                onSelect={handleTableSelect}
                onDrag={handleTableDrag}
                onSeatClick={handleSeatClick}
              />
            ))}
            
            {/* Render Relationships */}
            {chartState.showRelationships && (
              <g className="relationships">
                {/* Relationship lines would be rendered here */}
              </g>
            )}
          </g>
        </svg>
        
        {/* Floating Add Button */}
        {!readonly && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAddTableModal(true)}
            className="absolute bottom-6 right-6 w-14 h-14 bg-royal hover:bg-royal-dark text-white rounded-full shadow-royal-lg flex items-center justify-center transition-colors"
            title="Neuen Tisch hinzufügen"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        )}
      </div>
      
      {/* Add Table Modal */}
      <AddTableModal
        isOpen={addTableModal}
        onClose={() => setAddTableModal(false)}
        onAddTable={handleAddTable}
        weddingId={weddingId}
        existingTables={tables}
      />
      
      {/* Guest Assignment Modal */}
      {assignmentModal.table && (
        <GuestAssignmentModal
          isOpen={assignmentModal.isOpen}
          onClose={() => setAssignmentModal({ isOpen: false, table: null, seatNumber: 0 })}
          table={assignmentModal.table}
          seatNumber={assignmentModal.seatNumber}
          guests={guests}
          currentGuestId={assignmentModal.currentGuestId}
          onAssignGuest={handleAssignGuest}
          onRemoveGuest={handleRemoveGuest}
        />
      )}
    </div>
  );
};

export default SeatingChart; 