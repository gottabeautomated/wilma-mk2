import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ElegantIcon from '../ElegantIcon';
const PrioritiesForm = ({ data, errors, onChange }) => {
    const [newMustHave, setNewMustHave] = useState('');
    const [newNiceToHave, setNewNiceToHave] = useState('');
    const [newDealBreaker, setNewDealBreaker] = useState('');
    const updateField = (field, value) => {
        onChange({ ...data, [field]: value });
    };
    const priorityCategories = [
        { id: 'venueRentals', name: 'Location & Miete', icon: 'castle', description: 'Veranstaltungsort und Raummiete' },
        { id: 'cateringDrinks', name: 'Catering & Getränke', icon: 'gift', description: 'Essen, Getränke und Service' },
        { id: 'photographyVideo', name: 'Fotografie & Video', icon: 'camera', description: 'Professionelle Foto- und Videodokumentation' },
        { id: 'attireBeauty', name: 'Kleidung & Beauty', icon: 'dress', description: 'Brautkleid, Anzug, Frisur und Make-up' },
        { id: 'flowersDecor', name: 'Blumen & Dekoration', icon: 'flower', description: 'Brautstrauß, Tischdeko und Raumschmuck' },
        { id: 'entertainmentMusic', name: 'Musik & Entertainment', icon: 'music', description: 'DJ, Band oder Live-Musik' },
        { id: 'invitationsStationery', name: 'Einladungen & Papeterie', icon: 'calendar', description: 'Save-the-Date, Einladungen, Menükarten' },
        { id: 'cakeDesserts', name: 'Torte & Desserts', icon: 'gift', description: 'Hochzeitstorte und süße Leckereien' },
        { id: 'transportation', name: 'Transport', icon: 'car', description: 'Hochzeitsauto und Gästetransport' },
        { id: 'favorsGifts', name: 'Gastgeschenke', icon: 'gift', description: 'Kleine Aufmerksamkeiten für Ihre Gäste' },
        { id: 'honeymoon', name: 'Flitterwochen', icon: 'sparkles', description: 'Ihre Traumreise nach der Hochzeit' }
    ];
    const inspirationSources = [
        { id: 'pinterest', name: 'Pinterest', icon: 'sparkles', description: 'Visuelle Inspiration und Ideen sammeln' },
        { id: 'instagram', name: 'Instagram', icon: 'camera', description: 'Real-Wedding Posts und Trends' },
        { id: 'magazines', name: 'Magazine', icon: 'calendar', description: 'Hochzeitsmagazine und Zeitschriften' },
        { id: 'friends', name: 'Freunde', icon: 'heart', description: 'Erfahrungen von Freunden und Familie' },
        { id: 'vendors', name: 'Dienstleister', icon: 'castle', description: 'Empfehlungen von Hochzeitsplanern' }
    ];
    const updatePriority = (category, value) => {
        const currentPriorities = data.topPriorities || {};
        updateField('topPriorities', {
            ...currentPriorities,
            [category]: value
        });
    };
    const toggleArrayField = (field, value) => {
        const currentArray = data[field] || [];
        const newArray = currentArray.includes(value)
            ? currentArray.filter(item => item !== value)
            : [...currentArray, value];
        updateField(field, newArray);
    };
    const addToList = (field, value, setter) => {
        if (!value.trim())
            return;
        const currentArray = data[field] || [];
        if (!currentArray.includes(value.trim())) {
            updateField(field, [...currentArray, value.trim()]);
            setter('');
        }
    };
    const removeFromList = (field, value) => {
        const currentArray = data[field] || [];
        updateField(field, currentArray.filter(item => item !== value));
    };
    const getPriorityColor = (value) => {
        if (value >= 8)
            return 'bg-accent';
        if (value >= 6)
            return 'bg-champagne';
        if (value >= 4)
            return 'bg-primary-300';
        if (value >= 2)
            return 'bg-primary-200';
        return 'bg-undertone';
    };
    const getPriorityLabel = (value) => {
        if (value >= 9)
            return 'Absolut wichtig';
        if (value >= 7)
            return 'Sehr wichtig';
        if (value >= 5)
            return 'Wichtig';
        if (value >= 3)
            return 'Mäßig wichtig';
        if (value >= 1)
            return 'Weniger wichtig';
        return 'Unwichtig';
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
          <ElegantIcon name="heart" className="text-accent mx-auto" size={64}/>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-graphite mb-4">
          Prioritäten & Wünsche
        </h2>
        <div className="elegant-divider"></div>
        <p className="text-accent font-light text-lg max-w-2xl mx-auto">
          Was ist Ihnen besonders wichtig? Bewerten Sie die verschiedenen Bereiche von 1-10.
        </p>
      </div>

      <div className="space-y-8">
        {/* Priority Matrix Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-elegant">
          <div className="text-center mb-8">
            <ElegantIcon name="sparkles" className="text-accent mx-auto mb-4" size={32}/>
            <h3 className="text-2xl font-serif font-semibold text-graphite mb-2">
              Prioritäten Matrix
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/80 font-light">
              Bewerten Sie jeden Bereich nach seiner Wichtigkeit für Ihre Traumhochzeit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {priorityCategories.map((category, index) => {
            const currentValue = data.topPriorities?.[category.id] || 5;
            return (<motion.div key={category.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} className="card-elegant hover:shadow-golden transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-elegant bg-primary-100 border border-undertone flex items-center justify-center mr-4 elegant-icon-hover transition-all duration-300">
                      <ElegantIcon name={category.icon} className="text-accent elegant-icon-hover" size={20}/>
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-graphite">{category.name}</h4>
                      <p className="text-sm text-accent/70 font-light">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-accent">Wichtigkeit:</span>
                      <span className={`px-3 py-1 rounded-elegant text-xs font-medium text-white ${getPriorityColor(currentValue)}`}>
                        {getPriorityLabel(currentValue)}
                      </span>
                    </div>
                    
                    {/* Elegant Slider */}
                    <div className="relative">
                      <div className="relative h-3 bg-gradient-to-r from-primary-100 to-undertone rounded-elegant overflow-hidden shadow-inner">
                        <motion.div className={`h-full rounded-elegant ${getPriorityColor(currentValue)}`} style={{ width: `${(currentValue / 10) * 100}%` }} initial={{ width: 0 }} animate={{ width: `${(currentValue / 10) * 100}%` }} transition={{ duration: 0.3 }}/>
                      </div>
                      
                      <input type="range" min="1" max="10" value={currentValue} onChange={(e) => updatePriority(category.id, parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                    </div>
                    
                    <div className="flex justify-between text-xs text-accent/70 font-medium">
                      <span>1</span>
                      <span className="font-semibold text-graphite">{currentValue}/10</span>
                      <span>10</span>
                    </div>
                  </div>
                </motion.div>);
        })}
          </div>
        </motion.div>

        {/* Must-Haves Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="rings" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Must-Haves
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Was darf auf keinen Fall bei Ihrer Hochzeit fehlen?
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <input type="text" value={newMustHave} onChange={(e) => setNewMustHave(e.target.value)} placeholder="z.B. Live-Musik während der Zeremonie" className="flex-1 px-4 py-3 border-2 border-undertone rounded-elegant focus:border-accent focus:ring-0 focus:outline-none transition-all duration-300 text-graphite placeholder-accent/50 font-light" onKeyPress={(e) => e.key === 'Enter' && addToList('mustHaves', newMustHave, setNewMustHave)}/>
            <motion.button onClick={() => addToList('mustHaves', newMustHave, setNewMustHave)} className="px-6 py-3 bg-accent text-white rounded-elegant hover:bg-primary-600 transition-colors font-medium shadow-elegant" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Hinzufügen
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-3">
            {(data.mustHaves || []).map((item, index) => (<motion.span key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} className="inline-flex items-center px-4 py-2 rounded-elegant text-sm bg-primary-100 text-graphite border border-accent/20 shadow-sm">
                <ElegantIcon name="heart" className="text-accent mr-2" size={14}/>
                {item}
                <button onClick={() => removeFromList('mustHaves', item)} className="ml-2 text-accent/60 hover:text-accent transition-colors">
                  <ElegantIcon name="calendar" size={12}/>
                </button>
              </motion.span>))}
          </div>
        </motion.div>

        {/* Nice-to-Haves Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="flower" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Nice-to-Haves
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Was wäre schön zu haben, aber nicht zwingend notwendig?
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <input type="text" value={newNiceToHave} onChange={(e) => setNewNiceToHave(e.target.value)} placeholder="z.B. Feuerwerk zum Abschluss" className="flex-1 px-4 py-3 border-2 border-undertone rounded-elegant focus:border-accent focus:ring-0 focus:outline-none transition-all duration-300 text-graphite placeholder-accent/50 font-light" onKeyPress={(e) => e.key === 'Enter' && addToList('niceToHaves', newNiceToHave, setNewNiceToHave)}/>
            <motion.button onClick={() => addToList('niceToHaves', newNiceToHave, setNewNiceToHave)} className="px-6 py-3 bg-champagne text-graphite rounded-elegant hover:bg-primary-300 transition-colors font-medium shadow-elegant" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Hinzufügen
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-3">
            {(data.niceToHaves || []).map((item, index) => (<motion.span key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} className="inline-flex items-center px-4 py-2 rounded-elegant text-sm bg-champagne/30 text-graphite border border-champagne/40 shadow-sm">
                <ElegantIcon name="flower" className="text-accent mr-2" size={14}/>
                {item}
                <button onClick={() => removeFromList('niceToHaves', item)} className="ml-2 text-accent/60 hover:text-accent transition-colors">
                  <ElegantIcon name="calendar" size={12}/>
                </button>
              </motion.span>))}
          </div>
        </motion.div>

        {/* Deal-Breakers Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="castle" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Deal-Breakers
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Was geht absolut nicht und sollte vermieden werden?
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <input type="text" value={newDealBreaker} onChange={(e) => setNewDealBreaker(e.target.value)} placeholder="z.B. Regen während der Outdoor-Zeremonie" className="flex-1 px-4 py-3 border-2 border-undertone rounded-elegant focus:border-accent focus:ring-0 focus:outline-none transition-all duration-300 text-graphite placeholder-accent/50 font-light" onKeyPress={(e) => e.key === 'Enter' && addToList('dealBreakers', newDealBreaker, setNewDealBreaker)}/>
            <motion.button onClick={() => addToList('dealBreakers', newDealBreaker, setNewDealBreaker)} className="px-6 py-3 bg-red-400 text-white rounded-elegant hover:bg-red-500 transition-colors font-medium shadow-elegant" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Hinzufügen
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-3">
            {(data.dealBreakers || []).map((item, index) => (<motion.span key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} className="inline-flex items-center px-4 py-2 rounded-elegant text-sm bg-red-50 text-red-700 border border-red-200 shadow-sm">
                <ElegantIcon name="castle" className="text-red-500 mr-2" size={14}/>
                {item}
                <button onClick={() => removeFromList('dealBreakers', item)} className="ml-2 text-red-400 hover:text-red-600 transition-colors">
                  <ElegantIcon name="calendar" size={12}/>
                </button>
              </motion.span>))}
          </div>
        </motion.div>

        {/* Inspiration Sources Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="section-elegant">
          <div className="text-center mb-6">
            <ElegantIcon name="sparkles" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Inspirationsquellen
            </h3>
            <div className="elegant-divider"></div>
            <p className="text-accent/70 font-light text-sm mt-2">
              Wo holen Sie sich Inspiration für Ihre Hochzeit?
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {inspirationSources.map((source, index) => (<motion.button key={source.id} onClick={() => toggleArrayField('inspirationSources', source.id)} className={`card-elegant text-center transition-all duration-300 ${data.inspirationSources?.includes(source.id)
                ? 'border-2 border-gold bg-gold-light/10 shadow-gold'
                : 'hover:shadow-gold hover:border-gold/30'}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <ElegantIcon name={source.icon} className={`mx-auto mb-3 ${data.inspirationSources?.includes(source.id)
                ? 'text-gold'
                : 'text-accent/60 hover:text-gold'} transition-colors duration-300`} size={24}/>
                <h4 className="font-serif font-semibold text-graphite mb-2 text-sm">
                  {source.name}
                </h4>
                <p className="text-xs text-accent/70 font-light leading-relaxed">
                  {source.description}
                </p>
              </motion.button>))}
          </div>
        </motion.div>
      </div>
    </motion.div>);
};
export default PrioritiesForm;
