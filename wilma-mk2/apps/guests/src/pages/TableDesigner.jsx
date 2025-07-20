import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Plus, Save } from 'lucide-react';
const TableDesigner = () => {
    return (<div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl p-6 shadow-elegant border border-pearl-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold gradient-text mb-2">
              Tisch Designer
            </h1>
            <p className="text-pearl-600">
              Erstelle einzigartige Tische für deine Hochzeit
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-secondary">
              <Save className="w-4 h-4 mr-2"/>
              Speichern
            </button>
            <button className="btn-primary">
              <Plus className="w-4 h-4 mr-2"/>
              Neuer Tisch
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-xl p-6 shadow-elegant border border-pearl-100">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Palette className="w-16 h-16 text-pearl-300 mx-auto mb-4"/>
            <h3 className="text-lg font-semibold text-pearl-700 mb-2">
              Tisch Designer wird entwickelt
            </h3>
            <p className="text-pearl-500">
              Der benutzerdefinierte Tisch-Editor wird bald verfügbar sein
            </p>
          </div>
        </div>
      </motion.div>
    </div>);
};
export default TableDesigner;
