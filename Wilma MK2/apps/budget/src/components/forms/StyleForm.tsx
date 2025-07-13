import React from 'react'
import { motion } from 'framer-motion'
import { StyleData } from '../../types/budget'
import ElegantIcon from '../ElegantIcon'
import ImageSelector from '../ImageSelector'

interface StyleFormProps {
  data: Partial<StyleData>
  errors: Partial<Record<keyof StyleData, string>>
  onChange: (data: Partial<StyleData>) => void
}

const StyleForm: React.FC<StyleFormProps> = ({ data, errors, onChange }) => {
  const updateField = (field: keyof StyleData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // Wedding Styles with your images
  const weddingStyles = [
    { 
      id: 'elegant', 
      name: 'Elegant', 
      description: 'Klassisch, zeitlos, sophisticated',
      imagePath: '/images/wedding-styles/elegant.png',
      icon: 'castle'
    },
    { 
      id: 'rustic', 
      name: 'Rustikal', 
      description: 'Natürlich, gemütlich, ländlich',
      imagePath: '/images/wedding-styles/rustic.png',
      icon: 'flower'
    },
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Clean, minimalistisch, zeitgemäß',
      imagePath: '/images/wedding-styles/modern.png',
      icon: 'sparkles'
    },
    { 
      id: 'vintage', 
      name: 'Vintage', 
      description: 'Nostalgisch, romantisch, retro',
      imagePath: '/images/wedding-styles/vintage.png',
      icon: 'camera'
    },
    { 
      id: 'boho', 
      name: 'Boho', 
      description: 'Frei, kreativ, natürlich',
      imagePath: '/images/wedding-styles/boho.png',
      icon: 'heart'
    }
  ]

  // Color Schemes with your images
  const colorSchemes = [
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Zeitlose Eleganz in sanften Tönen',
      imagePath: '/images/color-schemes/elegant.png',
      icon: 'castle'
    },
    {
      id: 'natural',
      name: 'Natürlich',
      description: 'Erdige und grüne Naturtöne',
      imagePath: '/images/color-schemes/natural.png',
      icon: 'flower'
    },
    {
      id: 'romantic',
      name: 'Romantisch',
      description: 'Zarte Rosa- und Pastelltöne',
      imagePath: '/images/color-schemes/romantic.png',
      icon: 'heart'
    },
    {
      id: 'royal',
      name: 'Royal',
      description: 'Königliche Blau- und Goldtöne',
      imagePath: '/images/color-schemes/royal.png',
      icon: 'rings'
    },
    {
      id: 'vintage',
      name: 'Vintage',
      description: 'Nostalgische Farben vergangener Zeiten',
      imagePath: '/images/color-schemes/vintage.png',
      icon: 'camera'
    },
    {
      id: 'warm',
      name: 'Warm',
      description: 'Warme Orange- und Rottöne',
      imagePath: '/images/color-schemes/warm.png',
      icon: 'sparkles'
    }
  ]

  const seasons = [
    { id: 'spring', name: 'Frühling', icon: 'flower', description: 'März - Mai', colors: ['#10B981', '#34D399'] },
    { id: 'summer', name: 'Sommer', icon: 'sparkles', description: 'Juni - August', colors: ['#F59E0B', '#FCD34D'] },
    { id: 'autumn', name: 'Herbst', icon: 'gift', description: 'September - November', colors: ['#DC2626', '#F97316'] },
    { id: 'winter', name: 'Winter', icon: 'heart', description: 'Dezember - Februar', colors: ['#3B82F6', '#8B5CF6'] }
  ]

  const timesOfDay = [
    { id: 'morning', name: 'Morgen', icon: 'sparkles', description: '6:00 - 12:00' },
    { id: 'afternoon', name: 'Nachmittag', icon: 'flower', description: '12:00 - 18:00' },
    { id: 'evening', name: 'Abend', icon: 'castle', description: '18:00 - 22:00' },
    { id: 'night', name: 'Nacht', icon: 'heart', description: '22:00 - 6:00' }
  ]

  const formalityLevels = [
    { id: 'casual', name: 'Leger', icon: 'flower', description: 'Entspannt und ungezwungen' },
    { id: 'semi_formal', name: 'Semi-Formal', icon: 'heart', description: 'Elegant aber nicht steif' },
    { id: 'formal', name: 'Formal', icon: 'rings', description: 'Klassisch elegant' },
    { id: 'black_tie', name: 'Black Tie', icon: 'castle', description: 'Höchste Eleganz' }
  ]

  const culturalTraditions = [
    { id: 'austrian', name: 'Österreichische Traditionen', icon: 'castle' },
    { id: 'catholic', name: 'Katholische Zeremonie', icon: 'heart' },
    { id: 'protestant', name: 'Evangelische Zeremonie', icon: 'flower' },
    { id: 'civil', name: 'Freie Trauung', icon: 'rings' },
    { id: 'international', name: 'Internationale Traditionen', icon: 'sparkles' },
    { id: 'regional', name: 'Regionale Bräuche', icon: 'gift' },
    { id: 'none', name: 'Keine besonderen Traditionen', icon: 'calendar' }
  ]

  const specialRequirements = [
    { id: 'vegetarian', name: 'Vegetarisches/Veganes Catering', icon: 'flower' },
    { id: 'gluten_free', name: 'Glutenfreie Optionen', icon: 'heart' },
    { id: 'accessible', name: 'Barrierefreier Zugang', icon: 'castle' },
    { id: 'childcare', name: 'Kinderbetreuung', icon: 'gift' },
    { id: 'accommodation', name: 'Übernachtungsmöglichkeiten', icon: 'sparkles' },
    { id: 'pets', name: 'Haustiere erlaubt', icon: 'heart' },
    { id: 'smoking', name: 'Raucherbereich', icon: 'flower' },
    { id: 'streaming', name: 'Live-Streaming für Ferngeäste', icon: 'camera' }
  ]

  const toggleArrayField = (field: keyof StyleData, value: string) => {
    const currentArray = (data[field] as string[]) || []
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateField(field, newArray)
  }

  // Handle color scheme selection - store the ID instead of colors array
  const selectColorScheme = (schemeId: string) => {
    updateField('colorScheme', [schemeId]) // Store as array with single ID for compatibility
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-12"
    >
      {/* Elegant Header */}
      <div className="text-center">
        <motion.div
          className="mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, -2, 2, 0] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <ElegantIcon name="sparkles" className="text-accent mx-auto" size={64} />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-graphite mb-4">
          Stil & Vision
        </h2>
        <div className="elegant-divider"></div>
        <p className="text-accent font-light text-lg max-w-2xl mx-auto">
          Wie soll Ihre Traumhochzeit aussehen und sich anfühlen?
        </p>
      </div>

      <div className="space-y-12">
        {/* Wedding Style Section with Images */}
        <ImageSelector
          options={weddingStyles}
          selectedValue={data.weddingStyle}
          onSelect={(value) => updateField('weddingStyle', value)}
          title="Hochzeitsstil"
          subtitle="Wählen Sie den Stil, der am besten zu Ihrer Traumhochzeit passt"
          icon="castle"
          gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          imageClassName="aspect-[4/3]"
        />

        {errors.weddingStyle && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm text-center font-medium"
          >
            {errors.weddingStyle}
          </motion.p>
        )}

        {/* Color Scheme Section with Images */}
        <ImageSelector
          options={colorSchemes}
          selectedValue={data.colorScheme?.[0]} // Get first item from array
          onSelect={selectColorScheme}
          title="Farbpalette"
          subtitle="Welche Farben sollen Ihre Hochzeit prägen?"
          icon="sparkles"
          gridCols="grid-cols-2 md:grid-cols-3"
          imageClassName="aspect-[3/2]"
        />

        {/* Season and Time Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Season */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="section-elegant"
          >
            <div className="text-center mb-6">
              <ElegantIcon name="flower" className="text-accent mx-auto mb-2" size={24} />
              <h3 className="text-xl font-serif font-semibold text-graphite">
                Jahreszeit
              </h3>
              <div className="elegant-divider"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {seasons.map((season, index) => (
                <motion.button
                  key={season.id}
                  onClick={() => updateField('season', season.id)}
                  className={`card-elegant text-center transition-all duration-300 ${
                    data.season === season.id
                      ? 'border-2 border-accent bg-primary-100 shadow-golden'
                      : 'hover:border-accent/50 hover:bg-primary-50'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ElegantIcon 
                    name={season.icon} 
                    className={`mx-auto mb-2 ${
                      data.season === season.id ? 'text-accent' : 'text-accent/60'
                    }`} 
                    size={20} 
                  />
                  <div className="font-serif font-semibold text-graphite text-sm">
                    {season.name}
                  </div>
                  <div className="text-xs text-accent/70 font-medium">
                    {season.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Time of Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="section-elegant"
          >
            <div className="text-center mb-6">
              <ElegantIcon name="calendar" className="text-accent mx-auto mb-2" size={24} />
              <h3 className="text-xl font-serif font-semibold text-graphite">
                Tageszeit
              </h3>
              <div className="elegant-divider"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {timesOfDay.map((time, index) => (
                <motion.button
                  key={time.id}
                  onClick={() => updateField('timeOfDay', time.id)}
                  className={`card-elegant text-center transition-all duration-300 ${
                    data.timeOfDay === time.id
                      ? 'border-2 border-accent bg-primary-100 shadow-golden'
                      : 'hover:border-accent/50 hover:bg-primary-50'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ElegantIcon 
                    name={time.icon} 
                    className={`mx-auto mb-2 ${
                      data.timeOfDay === time.id ? 'text-accent' : 'text-accent/60'
                    }`} 
                    size={20} 
                  />
                  <div className="font-serif font-semibold text-graphite text-sm">
                    {time.name}
                  </div>
                  <div className="text-xs text-accent/70 font-medium">
                    {time.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Formality Level Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="section-elegant"
        >
          <div className="text-center mb-6">
            <ElegantIcon name="rings" className="text-accent mx-auto mb-2" size={24} />
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Formalitätsgrad
            </h3>
            <div className="elegant-divider"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formalityLevels.map((level, index) => (
              <motion.button
                key={level.id}
                onClick={() => updateField('formalityLevel', level.id)}
                className={`card-elegant text-center transition-all duration-300 ${
                  data.formalityLevel === level.id
                    ? 'border-2 border-accent bg-primary-100 shadow-golden'
                    : 'hover:border-accent/50 hover:bg-primary-50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ElegantIcon 
                  name={level.icon} 
                  className={`mx-auto mb-3 ${
                    data.formalityLevel === level.id ? 'text-accent' : 'text-accent/60'
                  }`} 
                  size={24} 
                />
                <h4 className="font-serif font-semibold text-graphite mb-2">
                  {level.name}
                </h4>
                <p className="text-xs text-accent/70 font-light leading-relaxed">
                  {level.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cultural Traditions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="section-elegant"
        >
          <div className="text-center mb-6">
            <ElegantIcon name="heart" className="text-accent mx-auto mb-2" size={24} />
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Kulturelle Traditionen
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Mehrfachauswahl möglich
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {culturalTraditions.map((tradition, index) => (
              <motion.button
                key={tradition.id}
                onClick={() => toggleArrayField('culturalTraditions', tradition.id)}
                className={`card-elegant text-center transition-all duration-300 ${
                  data.culturalTraditions?.includes(tradition.id)
                    ? 'border-2 border-accent bg-primary-100 shadow-golden'
                    : 'hover:border-accent/50 hover:bg-primary-50'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ElegantIcon 
                  name={tradition.icon} 
                  className={`mx-auto mb-2 ${
                    data.culturalTraditions?.includes(tradition.id) ? 'text-accent' : 'text-accent/60'
                  }`} 
                  size={16} 
                />
                <span className="font-medium text-graphite text-xs leading-tight">
                  {tradition.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Special Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="section-elegant"
        >
          <div className="text-center mb-6">
            <ElegantIcon name="gift" className="text-accent mx-auto mb-2" size={24} />
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Besondere Anforderungen
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Mehrfachauswahl möglich
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {specialRequirements.map((requirement, index) => (
              <motion.button
                key={requirement.id}
                onClick={() => toggleArrayField('specialRequirements', requirement.id)}
                className={`card-elegant text-center transition-all duration-300 ${
                  data.specialRequirements?.includes(requirement.id)
                    ? 'border-2 border-accent bg-primary-100 shadow-golden'
                    : 'hover:border-accent/50 hover:bg-primary-50'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ElegantIcon 
                  name={requirement.icon} 
                  className={`mx-auto mb-2 ${
                    data.specialRequirements?.includes(requirement.id) ? 'text-accent' : 'text-accent/60'
                  }`} 
                  size={16} 
                />
                <span className="font-medium text-graphite text-xs leading-tight">
                  {requirement.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default StyleForm 