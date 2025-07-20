import React, { useState } from 'react';
import SeatingChartComponent from '../components/seating/SeatingChart';
import GuestAssignmentModal from '../components/seating/GuestAssignmentModal';
const SeatingChartPage = () => {
    const [assignmentModal, setAssignmentModal] = useState({
        isOpen: false,
        table: null,
        seatNumber: 0
    });
    // Mock wedding ID - in a real app this would come from context/params
    const weddingId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
    const handleSeatClick = (table, seatNumber, currentGuestId) => {
        setAssignmentModal({
            isOpen: true,
            table,
            seatNumber,
            currentGuestId
        });
    };
    const handleAssignGuest = (guestId, tableId, seatNumber) => {
        console.log('Assigning guest:', guestId, 'to table:', tableId, 'seat:', seatNumber);
        // In a real app, this would update the database
    };
    const handleRemoveGuest = (guestId) => {
        console.log('Removing guest:', guestId);
        // In a real app, this would update the database
    };
    return (<div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-graphite mb-2">
          Sitzplan
        </h1>
        <p className="text-accent">
          Ziehen Sie die Tische an ihre gewünschte Position und klicken Sie auf Plätze, um Gäste zuzuweisen.
        </p>
      </div>
      
      <SeatingChartComponent weddingId={weddingId}/>

      {/* Guest Assignment Modal */}
      {assignmentModal.table && (<GuestAssignmentModal isOpen={assignmentModal.isOpen} onClose={() => setAssignmentModal({ isOpen: false, table: null, seatNumber: 0 })} table={assignmentModal.table} seatNumber={assignmentModal.seatNumber} guests={[]} // Will be passed from SeatingChart
         currentGuestId={assignmentModal.currentGuestId} onAssignGuest={handleAssignGuest} onRemoveGuest={handleRemoveGuest}/>)}
    </div>);
};
export default SeatingChartPage;
