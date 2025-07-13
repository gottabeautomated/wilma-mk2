import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Download, Filter } from 'lucide-react'

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-elegant border border-pearl-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold gradient-text mb-2">
              Analytics & Insights
            </h1>
            <p className="text-pearl-600">
              Daten und Statistiken zu deiner Hochzeitsplanung
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="btn-primary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-elegant border border-pearl-100"
      >
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-pearl-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-pearl-700 mb-2">
              Analytics wird entwickelt
            </h3>
            <p className="text-pearl-500">
              Detaillierte Statistiken werden bald verfügbar sein
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics 