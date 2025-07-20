import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Circle, Square, Minus } from 'lucide-react';
const AddTableModal = ({ isOpen, onClose, onAddTable, weddingId, existingTables }) => {
    const [tableName, setTableName] = useState('');
    const [tableType, setTableType] = useState('round');
    const [seatCount, setSeatCount] = useState(8);
    const [tableColor, setTableColor] = useState('#6B46C1');
    const tableTypes = [
        { value: 'round', label: 'Rund', icon: Circle },
        { value: 'rectangle', label: 'Rechteckig', icon: Square },
        { value: 'oval', label: 'Oval', icon: Circle },
        { value: 'l_shape', label: 'L-Form', icon: Square },
        { value: 'u_shape', label: 'U-Form', icon: Square },
        { value: 'custom', label: 'Benutzerdefiniert', icon: Square }
    ];
    const colorOptions = [
        '#6B46C1', // Royal
        '#D4AF37', // Gold
        '#6B7F5B', // Moss
        '#9D7D6A', // Accent
        '#F97316', // Orange
        '#DC2626', // Red
        '#059669', // Emerald
        '#7C3AED' // Purple
    ];
    const handleSubmit = () => {
        if (!tableName.trim())
            return;
        const newTable = {
            wedding_id: weddingId,
            name: tableName,
            type: tableType,
            position: {
                x: 200 + (existingTables.length * 50), // Offset new tables
                y: 200 + (existingTables.length * 50)
            },
            rotation: 0,
            seats: seatCount,
            style: {
                color: tableColor
            }
        };
        onAddTable(newTable);
        onClose();
        resetForm();
    };
    const resetForm = () => {
        setTableName('');
        setTableType('round');
        setSeatCount(8);
        setTableColor('#6B46C1');
    };
    if (!isOpen)
        return null;
    return (<AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-elegant-lg shadow-royal-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="border-b border-undertone p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-graphite">
                Neuen Tisch hinzufügen
              </h2>
              
              <button onClick={onClose} className="p-2 text-accent hover:text-graphite hover:bg-softrose rounded-elegant transition-colors">
                <X className="w-5 h-5"/>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Table Name */}
            <div>
              <label className="block text-sm font-medium text-graphite mb-2">
                Tischname
              </label>
              <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} placeholder="z.B. Tisch 1, Familientisch, etc." className="w-full px-4 py-2 border border-undertone rounded-elegant focus:outline-none focus:ring-2 focus:ring-royal focus:border-transparent"/>
            </div>

            {/* Table Type */}
            <div>
              <label className="block text-sm font-medium text-graphite mb-2">
                Tischform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {tableTypes.map((type) => {
            const Icon = type.icon;
            return (<button key={type.value} onClick={() => setTableType(type.value)} className={`p-3 rounded-elegant border-2 transition-all ${tableType === type.value
                    ? 'border-royal bg-royal text-white'
                    : 'border-undertone bg-white hover:bg-softrose'}`}>
                      <Icon className="w-5 h-5 mx-auto mb-1"/>
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>);
        })}
              </div>
            </div>

            {/* Seat Count */}
            <div>
              <label className="block text-sm font-medium text-graphite mb-2">
                Anzahl Sitzplätze
              </label>
              <div className="flex items-center gap-3">
                <button onClick={() => setSeatCount(Math.max(2, seatCount - 1))} className="p-2 bg-softrose hover:bg-champagne rounded-elegant border border-undertone transition-colors">
                  <Minus className="w-4 h-4 text-accent"/>
                </button>
                
                <span className="text-xl font-bold text-graphite min-w-[3rem] text-center">
                  {seatCount}
                </span>
                
                <button onClick={() => setSeatCount(Math.min(20, seatCount + 1))} className="p-2 bg-softrose hover:bg-champagne rounded-elegant border border-undertone transition-colors">
                  <Plus className="w-4 h-4 text-accent"/>
                </button>
              </div>
              <p className="text-xs text-accent mt-1">
                2-20 Plätze möglich
              </p>
            </div>

            {/* Table Color */}
            <div>
              <label className="block text-sm font-medium text-graphite mb-2">
                Tischfarbe
              </label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((color) => (<button key={color} onClick={() => setTableColor(color)} className={`w-10 h-10 rounded-elegant border-2 transition-all ${tableColor === color
                ? 'border-graphite scale-110'
                : 'border-undertone hover:scale-105'}`} style={{ backgroundColor: color }}/>))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-softrose p-4 rounded-elegant">
              <h3 className="text-sm font-medium text-graphite mb-2">Vorschau</h3>
              <div className="flex items-center justify-center h-20">
                <div className="relative">
                  {tableType === 'round' ? (<div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: tableColor }}>
                      {tableName || 'Tisch'}
                    </div>) : (<div className="w-20 h-12 rounded-lg border-2 border-white flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: tableColor }}>
                      {tableName || 'Tisch'}
                    </div>)}
                  
                  {/* Seat indicators */}
                  <div className="absolute -top-2 -right-2 bg-graphite text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {seatCount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-undertone p-6">
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 border border-undertone text-accent hover:bg-softrose rounded-elegant transition-colors">
                Abbrechen
              </button>
              
              <button onClick={handleSubmit} disabled={!tableName.trim()} className="px-4 py-2 bg-royal hover:bg-royal-dark text-white rounded-elegant transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Tisch hinzufügen
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);
};
export default AddTableModal;
