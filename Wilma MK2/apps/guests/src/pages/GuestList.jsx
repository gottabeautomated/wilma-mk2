import React, { useState, useEffect } from 'react';
import { GuestList as GuestListComponent } from '../components/GuestList';
import { seatingAPI } from '../lib/seatingAPI';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AddGuestModal } from '../components/AddGuestModal';
import { CSVExportDialog } from '../components/CSVExportDialog';
import { BulkActions } from '../components/BulkActions';
import { Plus, Download, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
const GuestList = () => {
    const { currentWedding } = useAuth();
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showExportDialog, setShowExportDialog] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState([]);
    const [statistics, setStatistics] = useState({
        total: 0,
        confirmed: 0,
        pending: 0,
        declined: 0,
        plusOnes: 0,
        bridesSide: 0,
        groomsSide: 0,
        bothSides: 0
    });
    useEffect(() => {
        if (currentWedding) {
            loadGuests();
            loadStatistics();
        }
    }, [currentWedding]);
    const loadGuests = async () => {
        if (!currentWedding)
            return;
        try {
            setLoading(true);
            const guestsData = await seatingAPI.getGuestsByWedding(currentWedding.id);
            setGuests(guestsData);
        }
        catch (error) {
            console.error('Error loading guests:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const loadStatistics = async () => {
        if (!currentWedding)
            return;
        try {
            const stats = await seatingAPI.getGuestStatistics(currentWedding.id);
            setStatistics(stats);
        }
        catch (error) {
            console.error('Error loading statistics:', error);
        }
    };
    const handleAddGuest = async (guestData) => {
        if (!currentWedding)
            return;
        try {
            const newGuest = await seatingAPI.createGuest(guestData, currentWedding.id);
            setGuests(prev => [newGuest, ...prev]);
            setShowAddModal(false);
            loadStatistics();
        }
        catch (error) {
            console.error('Error adding guest:', error);
            alert('Fehler beim Hinzufügen des Gastes');
        }
    };
    const handleUpdateGuest = async (guestId, updates) => {
        try {
            const updatedGuest = await seatingAPI.updateGuest(guestId, updates);
            setGuests(prev => prev.map(g => g.id === guestId ? updatedGuest : g));
            loadStatistics();
        }
        catch (error) {
            console.error('Error updating guest:', error);
            alert('Fehler beim Aktualisieren des Gastes');
        }
    };
    const handleDeleteGuest = async (guestId) => {
        try {
            await seatingAPI.deleteGuest(guestId);
            setGuests(prev => prev.filter(g => g.id !== guestId));
            loadStatistics();
        }
        catch (error) {
            console.error('Error deleting guest:', error);
            alert('Fehler beim Löschen des Gastes');
        }
    };
    const handleGuestImport = async (importedGuests) => {
        if (!currentWedding)
            return;
        try {
            const createdGuests = await seatingAPI.createMultipleGuests(importedGuests, currentWedding.id);
            setGuests(prev => [...createdGuests, ...prev]);
            loadStatistics();
            alert(`${createdGuests.length} Gäste erfolgreich importiert!`);
        }
        catch (error) {
            console.error('Error importing guests:', error);
            alert('Fehler beim Importieren der Gäste');
        }
    };
    if (!currentWedding) {
        return (<div className="flex items-center justify-center h-64">
        <p className="text-royal-600">Keine Hochzeit ausgewählt</p>
      </div>);
    }
    if (loading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-600"></div>
      </div>);
    }
    return (<div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-royal-900">
            Gäste-Management
          </h1>
          <p className="text-royal-600 mt-1">
            {currentWedding.venue_name || 'Ihre Hochzeit'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={() => setShowAddModal(true)} className="bg-royal-600 hover:bg-royal-700 text-white">
            <Plus className="h-4 w-4 mr-2"/>
            Gast hinzufügen
          </Button>
          
          <Button onClick={() => setShowExportDialog(true)} className="bg-moss-600 hover:bg-moss-700 text-white">
            <Download className="h-4 w-4 mr-2"/>
            Export
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-royal-600">Gesamt</p>
              <p className="text-2xl font-bold text-royal-900">{statistics.total}</p>
            </div>
            <Users className="h-8 w-8 text-royal-400"/>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-moss-600">Bestätigt</p>
              <p className="text-2xl font-bold text-moss-900">{statistics.confirmed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-moss-400"/>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Ausstehend</p>
              <p className="text-2xl font-bold text-yellow-900">{statistics.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400"/>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Abgelehnt</p>
              <p className="text-2xl font-bold text-red-900">{statistics.declined}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-400"/>
          </div>
        </Card>
      </div>

      {/* Guest List */}
      <GuestListComponent guests={guests} onUpdateGuest={handleUpdateGuest} onDeleteGuest={handleDeleteGuest} onGuestImport={handleGuestImport} selectedGuests={selectedGuests} onSelectionChange={setSelectedGuests}/>

      {/* Bulk Actions */}
      {selectedGuests.length > 0 && (<BulkActions selectedGuests={selectedGuests} onUpdateGuests={async (updates) => {
                for (const guestId of selectedGuests) {
                    await handleUpdateGuest(guestId, updates);
                }
                setSelectedGuests([]);
            }} onDeleteGuests={async () => {
                for (const guestId of selectedGuests) {
                    await handleDeleteGuest(guestId);
                }
                setSelectedGuests([]);
            }}/>)}

      {/* Modals */}
      <AddGuestModal open={showAddModal} onClose={() => setShowAddModal(false)} onAddGuest={handleAddGuest}/>

      <CSVExportDialog open={showExportDialog} onClose={() => setShowExportDialog(false)} guests={guests} weddingName={currentWedding.venue_name || 'Hochzeit'}/>
    </div>);
};
export default GuestList;
