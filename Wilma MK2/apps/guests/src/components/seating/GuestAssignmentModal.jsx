import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, User, UserPlus, Crown } from 'lucide-react';
const GuestAssignmentModal = ({ isOpen, onClose, table, seatNumber, guests, currentGuestId, onAssignGuest, onRemoveGuest }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGuestId, setSelectedGuestId] = useState(currentGuestId || null);
    // Filter available guests (not assigned to any seat)
    const availableGuests = guests.filter(guest => !guest.table_assignment_id || guest.id === currentGuestId);
    // Filter guests based on search term
    const filteredGuests = availableGuests.filter(guest => `${guest.first_name} ${guest.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.relationship_to_couple.toLowerCase().includes(searchTerm.toLowerCase()));
    // Current guest (if any)
    const currentGuest = currentGuestId ? guests.find(g => g.id === currentGuestId) : null;
    useEffect(() => {
        if (isOpen) {
            setSelectedGuestId(currentGuestId || null);
            setSearchTerm('');
        }
    }, [isOpen, currentGuestId]);
    const handleAssign = () => {
        if (selectedGuestId) {
            onAssignGuest(selectedGuestId, table.id, seatNumber);
            onClose();
        }
    };
    const handleRemove = () => {
        if (currentGuestId) {
            onRemoveGuest(currentGuestId);
            onClose();
        }
    };
    if (!isOpen)
        return null;
    return (<AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-elegant-lg shadow-royal-xl max-w-md w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="border-b border-undertone p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-graphite">
                  Platz {seatNumber} - {table.name}
                </h2>
                <p className="text-sm text-accent mt-1">
                  Gast für diesen Platz auswählen
                </p>
              </div>
              
              <button onClick={onClose} className="p-2 text-accent hover:text-graphite hover:bg-softrose rounded-elegant transition-colors">
                <X className="w-5 h-5"/>
              </button>
            </div>
          </div>
          
          {/* Current Guest */}
          {currentGuest && (<div className="border-b border-undertone p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    {currentGuest.photo_url ? (<img src={currentGuest.photo_url} alt={`${currentGuest.first_name} ${currentGuest.last_name}`} className="w-full h-full rounded-full object-cover"/>) : (<span className="text-white font-medium">
                        {currentGuest.first_name.charAt(0)}{currentGuest.last_name.charAt(0)}
                      </span>)}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-graphite">
                      {currentGuest.first_name} {currentGuest.last_name}
                    </h3>
                    <p className="text-sm text-accent">
                      {currentGuest.relationship_to_couple}
                    </p>
                  </div>
                </div>
                
                <button onClick={handleRemove} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-elegant transition-colors">
                  Entfernen
                </button>
              </div>
            </div>)}
          
          {/* Search */}
          <div className="p-6 border-b border-undertone">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-4 h-4"/>
              <input type="text" placeholder="Gast suchen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal focus:border-transparent"/>
            </div>
          </div>
          
          {/* Guest List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredGuests.length === 0 ? (<div className="p-6 text-center text-accent">
                <User className="w-8 h-8 mx-auto mb-2 opacity-50"/>
                <p>Keine verfügbaren Gäste gefunden</p>
              </div>) : (<div className="p-2">
                {filteredGuests.map(guest => (<motion.div key={guest.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 m-2 rounded-elegant border cursor-pointer transition-all ${selectedGuestId === guest.id
                    ? 'bg-royal text-white border-royal'
                    : 'bg-white hover:bg-softrose border-undertone'}`} onClick={() => setSelectedGuestId(guest.id)}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedGuestId === guest.id ? 'bg-white bg-opacity-20' : 'bg-accent'}`}>
                        {guest.photo_url ? (<img src={guest.photo_url} alt={`${guest.first_name} ${guest.last_name}`} className="w-full h-full rounded-full object-cover"/>) : (<span className={`font-medium ${selectedGuestId === guest.id ? 'text-white' : 'text-white'}`}>
                            {guest.first_name.charAt(0)}{guest.last_name.charAt(0)}
                          </span>)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {guest.first_name} {guest.last_name}
                          </h3>
                          {guest.relationship_to_couple === 'Braut' || guest.relationship_to_couple === 'Bräutigam' && (<Crown className="w-4 h-4 text-gold"/>)}
                        </div>
                        
                        <p className={`text-sm ${selectedGuestId === guest.id ? 'text-white text-opacity-80' : 'text-accent'}`}>
                          {guest.relationship_to_couple}
                        </p>
                        
                        {guest.plus_one && (<div className="flex items-center gap-1 mt-1">
                            <UserPlus className="w-3 h-3"/>
                            <span className={`text-xs ${selectedGuestId === guest.id ? 'text-white text-opacity-80' : 'text-accent'}`}>
                              +1 erlaubt
                            </span>
                          </div>)}
                      </div>
                    </div>
                  </motion.div>))}
              </div>)}
          </div>
          
          {/* Actions */}
          <div className="border-t border-undertone p-6">
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 border border-undertone text-accent hover:bg-softrose rounded-elegant transition-colors">
                Abbrechen
              </button>
              
              <button onClick={handleAssign} disabled={!selectedGuestId} className="px-4 py-2 bg-royal hover:bg-royal-dark text-white rounded-elegant transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Zuweisen
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);
};
export default GuestAssignmentModal;
