import React from 'react';
import { motion } from 'framer-motion';
import ElegantIcon from '../ElegantIcon';
const BasicsForm = ({ data, errors, onChange }) => {
    const updateField = (field, value) => {
        onChange({ ...data, [field]: value });
    };
    const formatDate = (date) => {
        if (!date)
            return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };
    const relationshipLengths = [
        { value: '1', label: 'Unter 1 Jahr', icon: 'heart' },
        { value: '2', label: '1-2 Jahre', icon: 'heart' },
        { value: '3', label: '2-5 Jahre', icon: 'heart' },
        { value: '5', label: '5+ Jahre', icon: 'rings' }
    ];
    const guestPresets = [
        { count: 30, label: 'Intim', icon: 'heart', description: 'Nur engste Familie & Freunde' },
        { count: 60, label: 'Klein', icon: 'flower', description: 'Familie & enge Freunde' },
        { count: 100, label: 'Mittel', icon: 'sparkles', description: 'Erweiterte Familie & Freunde' },
        { count: 150, label: 'Groß', icon: 'castle', description: 'Große Feier mit vielen Gästen' },
        { count: 250, label: 'Sehr groß', icon: 'gift', description: 'Ausgedehnte Gästeliste' }
    ];
    return (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto space-y-8">
      {/* Elegant Header */}
      <div className="text-center">
        <motion.div className="mb-6" animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -2, 2, 0]
        }} transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }}>
          <ElegantIcon name="rings" className="text-accent mx-auto" size={64}/>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-graphite mb-4">
          Erzählen Sie uns von sich
        </h2>
        <div className="elegant-divider"></div>
        <p className="text-accent font-light text-lg max-w-2xl mx-auto">
          Wir benötigen einige Grunddaten, um Ihnen die bestmöglichen Empfehlungen zu geben
        </p>
      </div>

      <div className="space-y-8">
        {/* Partner Names Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="heart" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Das Brautpaar
            </h3>
            <div className="elegant-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-medium text-accent mb-2">
                Partner 1 Name *
              </label>
              <input type="text" value={data.partner1Name || ''} onChange={(e) => updateField('partner1Name', e.target.value)} placeholder="Ihr Name" data-field="partner1Name" className={`w-full px-4 py-3 border-2 rounded-elegant transition-all duration-300 text-graphite placeholder-accent/50 font-light ${errors.partner1Name
            ? 'border-red-400 focus:border-red-500'
            : 'border-undertone focus:border-accent focus:ring-0 focus:outline-none'}`}/>
              {errors.partner1Name && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-2 font-medium">
                  {errors.partner1Name}
                </motion.p>)}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-accent mb-2">
                Partner 2 Name *
              </label>
              <input type="text" value={data.partner2Name || ''} onChange={(e) => updateField('partner2Name', e.target.value)} placeholder="Name Ihres Partners" data-field="partner2Name" className={`w-full px-4 py-3 border-2 rounded-elegant transition-all duration-300 text-graphite placeholder-accent/50 font-light ${errors.partner2Name
            ? 'border-red-400 focus:border-red-500'
            : 'border-undertone focus:border-accent focus:ring-0 focus:outline-none'}`}/>
              {errors.partner2Name && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-2 font-medium">
                  {errors.partner2Name}
                </motion.p>)}
            </motion.div>
          </div>
        </motion.div>

        {/* Wedding Date Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="calendar" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Ihr Hochzeitsdatum
            </h3>
            <div className="elegant-divider"></div>
          </div>
          
          <div className="max-w-md mx-auto">
            <input type="date" value={data.weddingDate ? formatDate(data.weddingDate) : ''} onChange={(e) => updateField('weddingDate', new Date(e.target.value))} min={new Date().toISOString().split('T')[0]} data-field="weddingDate" className={`w-full px-4 py-3 border-2 rounded-elegant transition-all duration-300 text-graphite font-light ${errors.weddingDate
            ? 'border-red-400 focus:border-red-500'
            : 'border-undertone focus:border-accent focus:ring-0 focus:outline-none'}`}/>
            {errors.weddingDate && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-2 text-center font-medium">
                {errors.weddingDate}
              </motion.p>)}
          </div>
        </motion.div>

        {/* Guest Count Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="section-elegant">
          <div className="text-center mb-8">
            <ElegantIcon name="sparkles" className="text-accent mx-auto mb-4" size={32}/>
            <h3 className="text-2xl font-serif font-semibold text-graphite mb-2">
              Anzahl der Gäste
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/80 font-light">
              Wie viele Gäste möchten Sie zu Ihrer Hochzeit einladen?
            </p>
          </div>
          
          <div className="text-center mb-8">
            <motion.div className="text-5xl md:text-6xl font-serif font-bold text-graphite mb-4" key={data.guestCount} initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
              {data.guestCount || 80} Gäste
            </motion.div>
            
            <motion.div className="inline-flex items-center px-4 py-2 rounded-elegant text-sm font-medium bg-primary-100 text-accent shadow-elegant" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
              <ElegantIcon name="heart" className="mr-2" size={16}/>
              {data.guestCount && data.guestCount <= 50 ? 'Intime Feier' :
            data.guestCount && data.guestCount <= 100 ? 'Klassische Größe' :
                data.guestCount && data.guestCount <= 150 ? 'Große Feier' : 'Sehr große Feier'}
            </motion.div>
          </div>

          {/* Elegant Slider */}
          <div className="relative px-4 mb-8">
            <div className="relative h-4 bg-gradient-to-r from-primary-100 to-undertone rounded-elegant-lg overflow-hidden shadow-inner">
              <motion.div className="h-full bg-gradient-to-r from-champagne via-accent to-primary-500 rounded-elegant-lg" style={{ width: `${((data.guestCount || 80) - 20) / (300 - 20) * 100}%` }} initial={{ width: 0 }} animate={{ width: `${((data.guestCount || 80) - 20) / (300 - 20) * 100}%` }} transition={{ duration: 0.4 }}/>
            </div>

            <input type="range" min="20" max="300" value={data.guestCount || 80} onChange={(e) => updateField('guestCount', parseInt(e.target.value))} data-field="guestCount" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>

            <div className="flex justify-between mt-4 text-sm text-accent/70 font-medium">
              <span>20</span>
              <span>300</span>
            </div>
          </div>

          {/* Guest Count Presets */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {guestPresets.map((preset, index) => (<motion.button key={preset.count} onClick={() => updateField('guestCount', preset.count)} className={`card-elegant text-center transition-all duration-300 ${data.guestCount === preset.count
                ? 'border-2 border-accent bg-primary-100 shadow-golden'
                : 'hover:border-accent/50 hover:bg-primary-50'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <ElegantIcon name={preset.icon} className={`mx-auto mb-2 ${data.guestCount === preset.count ? 'text-accent' : 'text-accent/60'}`} size={20}/>
                <div className="font-serif font-semibold text-graphite text-sm">
                  {preset.count}
                </div>
                <div className="text-xs text-accent/70 font-medium">
                  {preset.label}
                </div>
                <div className="text-xs text-accent/50 mt-1 leading-tight">
                  {preset.description}
                </div>
              </motion.button>))}
          </div>
        </motion.div>

        {/* Contact Information Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="gift" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Kontaktdaten
            </h3>
            <div className="elegant-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-medium text-accent mb-2">
                E-Mail-Adresse *
              </label>
              <input type="email" value={data.email || ''} onChange={(e) => updateField('email', e.target.value)} placeholder="ihre.email@beispiel.at" className={`w-full px-4 py-3 border-2 rounded-elegant transition-all duration-300 text-graphite placeholder-accent/50 font-light ${errors.email
            ? 'border-red-400 focus:border-red-500'
            : 'border-undertone focus:border-accent focus:ring-0 focus:outline-none'}`}/>
              {errors.email && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-2 font-medium">
                  {errors.email}
                </motion.p>)}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-accent mb-2">
                Telefonnummer (optional)
              </label>
              <input type="tel" value={data.phone || ''} onChange={(e) => updateField('phone', e.target.value)} placeholder="+43 123 456 789" className="w-full px-4 py-3 border-2 border-undertone rounded-elegant focus:border-accent focus:ring-0 focus:outline-none transition-all duration-300 text-graphite placeholder-accent/50 font-light"/>
            </motion.div>
          </div>
        </motion.div>

        {/* Relationship Length Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="rings" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Wie lange sind Sie zusammen?
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Dies hilft uns bei personalisierten Empfehlungen
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relationshipLengths.map((option, index) => (<motion.button key={option.value} onClick={() => updateField('relationshipLength', option.value)} className={`card-elegant text-center transition-all duration-300 ${String(data.relationshipLength) === option.value
                ? 'border-2 border-accent bg-primary-100 shadow-golden'
                : 'hover:border-accent/50 hover:bg-primary-50'}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <ElegantIcon name={option.icon} className={`mx-auto mb-2 ${String(data.relationshipLength) === option.value ? 'text-accent' : 'text-accent/60'}`} size={24}/>
                <span className="font-medium text-graphite text-sm">
                  {option.label}
                </span>
              </motion.button>))}
          </div>
        </motion.div>
      </div>
    </motion.div>);
};
export default BasicsForm;
