import React from 'react';
import { motion } from 'framer-motion';
import BudgetSlider from '../BudgetSlider';
import ElegantIcon from '../ElegantIcon';
const DetailsForm = ({ data, errors, onChange }) => {
    const updateField = (field, value) => {
        onChange({ ...data, [field]: value });
    };
    const venueTypes = [
        { id: 'hotel', name: 'Hotel', icon: 'castle', description: 'Elegante Hotelsäle mit Service' },
        { id: 'castle', name: 'Schloss', icon: 'castle', description: 'Märchenhafte Schlosslocations' },
        { id: 'garden', name: 'Garten', icon: 'flower', description: 'Romantische Gartenfeier' },
        { id: 'church', name: 'Kirche', icon: 'heart', description: 'Traditionelle Kirchenhochzeit' },
        { id: 'outdoor', name: 'Outdoor', icon: 'sparkles', description: 'Freie Natur & Landschaft' },
        { id: 'restaurant', name: 'Restaurant', icon: 'gift', description: 'Gemütliche Restaurantfeier' },
        { id: 'other', name: 'Andere', icon: 'calendar', description: 'Individuelle Location' }
    ];
    const budgetFlexibilityOptions = [
        {
            id: 'strict',
            name: 'Strikt',
            description: 'Budget ist fix und darf nicht überschritten werden',
            icon: 'sparkles'
        },
        {
            id: 'somewhat_flexible',
            name: 'Etwas flexibel',
            description: 'Bis zu 10% Überschreitung möglich',
            icon: 'heart'
        },
        {
            id: 'very_flexible',
            name: 'Sehr flexibel',
            description: 'Budget kann bei besonderen Wünschen angepasst werden',
            icon: 'flower'
        }
    ];
    const budgetSources = [
        { id: 'savings', name: 'Ersparnisse', icon: 'sparkles' },
        { id: 'family_contribution', name: 'Familie', icon: 'heart' },
        { id: 'loan', name: 'Kredit', icon: 'castle' },
        { id: 'gifts', name: 'Geschenke', icon: 'gift' }
    ];
    const toggleBudgetSource = (source) => {
        const currentSources = data.budgetSource || [];
        const newSources = currentSources.includes(source)
            ? currentSources.filter(s => s !== source)
            : [...currentSources, source];
        updateField('budgetSource', newSources);
    };
    // Priority options for budget weighting
    const priorityOptions = [
        { id: 'venue', name: 'Location & Miete', icon: 'castle' },
        { id: 'catering', name: 'Catering & Getränke', icon: 'gift' },
        { id: 'photography', name: 'Fotografie & Video', icon: 'camera' },
        { id: 'attire', name: 'Kleidung & Beauty', icon: 'sparkles' },
        { id: 'flowers', name: 'Blumen & Dekoration', icon: 'flower' },
        { id: 'entertainment', name: 'Unterhaltung & Musik', icon: 'music' },
        { id: 'invitations', name: 'Einladungen & Papeterie', icon: 'heart' },
        { id: 'cake', name: 'Torte & Desserts', icon: 'gift' },
        { id: 'transportation', name: 'Transport & Logistik', icon: 'sparkles' },
        { id: 'favors', name: 'Gastgeschenke', icon: 'heart' }
    ];
    const togglePriority = (priorityId) => {
        const currentPriorities = data.topPriorities || [];
        const isSelected = currentPriorities.includes(priorityId);
        if (isSelected) {
            // Remove priority
            const newPriorities = currentPriorities.filter(p => p !== priorityId);
            updateField('topPriorities', newPriorities);
        }
        else if (currentPriorities.length < 5) {
            // Add priority (max 5)
            const newPriorities = [...currentPriorities, priorityId];
            updateField('topPriorities', newPriorities);
        }
    };
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
          <ElegantIcon name="castle" className="text-accent mx-auto" size={64}/>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-graphite mb-4">
          Location & Budget
        </h2>
        <div className="elegant-divider"></div>
        <p className="text-accent font-light text-lg max-w-2xl mx-auto">
          Wo soll Ihre Traumhochzeit stattfinden und wie viel möchten Sie investieren?
        </p>
      </div>

      <div className="space-y-8">
        {/* Elegant Budget Slider Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-elegant">
          <div className="text-center mb-8">
            <ElegantIcon name="sparkles" className="text-accent mx-auto mb-4" size={32}/>
            <h3 className="text-2xl font-serif font-semibold text-graphite mb-2">
              Ihr Hochzeitsbudget
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/80 font-light">
              Bestimmen Sie Ihr Budget für den schönsten Tag Ihres Lebens
            </p>
          </div>
          
          <BudgetSlider min={5000} max={100000} value={data.totalBudget || 25000} onChange={(value) => updateField('totalBudget', value)} showBreakdown={true} priorities={data.topPriorities || []}/>
          
          {errors.totalBudget && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-4 text-center font-medium">
              {errors.totalBudget}
            </motion.p>)}
        </motion.div>

        {/* Elegant Location Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="castle" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Gewünschte Location
            </h3>
            <div className="elegant-divider"></div>
          </div>
          
          <div className="max-w-md mx-auto">
            <input type="text" value={data.weddingLocation || ''} onChange={(e) => updateField('weddingLocation', e.target.value)} placeholder="z.B. Wien, Salzburg, oder spezifische Location" className="w-full px-4 py-3 border-2 border-undertone rounded-elegant focus:border-accent focus:ring-0 focus:outline-none transition-all duration-300 text-graphite placeholder-accent/50 font-light"/>
            {errors.weddingLocation && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-2 text-center font-medium">
                {errors.weddingLocation}
              </motion.p>)}
          </div>
        </motion.div>

        {/* Elegant Venue Type Selection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="sparkles" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Art der Location
            </h3>
            <div className="elegant-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venueTypes.map((venue, index) => (<motion.button key={venue.id} onClick={() => updateField('venueType', venue.id)} className={`card-elegant text-center transition-all duration-300 ${data.venueType === venue.id
                ? 'border-2 border-accent bg-primary-100 shadow-golden'
                : 'hover:border-accent/50 hover:bg-primary-50'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <ElegantIcon name={venue.icon} className={`mx-auto mb-3 ${data.venueType === venue.id ? 'text-accent' : 'text-accent/60'}`} size={32}/>
                <h4 className="font-serif font-semibold text-graphite mb-2">
                  {venue.name}
                </h4>
                <p className="text-sm text-accent/70 font-light leading-relaxed">
                  {venue.description}
                </p>
              </motion.button>))}
          </div>
          
          {errors.venueType && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-4 text-center font-medium">
              {errors.venueType}
            </motion.p>)}
        </motion.div>

        {/* Elegant Budget Flexibility */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="heart" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Budget-Flexibilität
            </h3>
            <div className="elegant-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetFlexibilityOptions.map((option, index) => (<motion.button key={option.id} onClick={() => updateField('budgetFlexibility', option.id)} className={`card-elegant text-center transition-all duration-300 ${data.budgetFlexibility === option.id
                ? 'border-2 border-accent bg-primary-100 shadow-golden'
                : 'hover:border-accent/50 hover:bg-primary-50'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <ElegantIcon name={option.icon} className={`mx-auto mb-3 ${data.budgetFlexibility === option.id ? 'text-accent' : 'text-accent/60'}`} size={28}/>
                <h4 className="font-serif font-semibold text-graphite mb-2">
                  {option.name}
                </h4>
                <p className="text-sm text-accent/70 font-light leading-relaxed">
                  {option.description}
                </p>
              </motion.button>))}
          </div>
          
          {errors.budgetFlexibility && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-4 text-center font-medium">
              {errors.budgetFlexibility}
            </motion.p>)}
        </motion.div>

        {/* Elegant Budget Sources */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="gift" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Budget-Quellen
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Mehrfachauswahl möglich
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {budgetSources.map((source, index) => (<motion.button key={source.id} onClick={() => toggleBudgetSource(source.id)} className={`card-elegant text-center transition-all duration-300 ${data.budgetSource?.includes(source.id)
                ? 'border-2 border-accent bg-primary-100 shadow-golden'
                : 'hover:border-accent/50 hover:bg-primary-50'}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <ElegantIcon name={source.icon} className={`mx-auto mb-2 ${data.budgetSource?.includes(source.id) ? 'text-accent' : 'text-accent/60'}`} size={24}/>
                <span className="font-medium text-graphite text-sm">
                  {source.name}
                </span>
              </motion.button>))}
          </div>
        </motion.div>

        {/* Elegant Priorities Selection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="sparkles" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Ihre wichtigsten Prioritäten
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Wählen Sie bis zu 5 Bereiche, die Ihnen besonders wichtig sind. 
              Diese erhalten mehr Budget-Gewichtung.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {priorityOptions.map((priority, index) => (<motion.button key={priority.id} onClick={() => togglePriority(priority.id)} disabled={!data.topPriorities?.includes(priority.id) && (data.topPriorities?.length || 0) >= 5} className={`card-elegant text-center transition-all duration-300 relative ${data.topPriorities?.includes(priority.id)
                ? 'border-2 border-accent bg-primary-100 shadow-golden'
                : (data.topPriorities?.length || 0) >= 5
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-accent/50 hover:bg-primary-50'}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * index }} whileHover={!data.topPriorities?.includes(priority.id) && (data.topPriorities?.length || 0) < 5
                ? { scale: 1.05, y: -2 }
                : {}} whileTap={{ scale: 0.95 }}>
                <ElegantIcon name={priority.icon} className={`mx-auto mb-2 ${data.topPriorities?.includes(priority.id) ? 'text-accent' : 'text-accent/60'}`} size={24}/>
                <span className="font-medium text-graphite text-xs leading-tight">
                  {priority.name}
                </span>
                {data.topPriorities?.includes(priority.id) && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    ✓
                  </motion.div>)}
              </motion.button>))}
          </div>
          
          <div className="text-center mt-4">
            <p className="text-accent/60 text-sm font-light">
              {data.topPriorities?.length || 0} von 5 Prioritäten ausgewählt
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>);
};
export default DetailsForm;
