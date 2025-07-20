import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ElegantIcon from './ElegantIcon';
const BudgetSlider = ({ min, max, value, onChange, showBreakdown = false, currency = '€', step = 500, priorities = [] }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [animatedValue, setAnimatedValue] = useState(value);
    const [isHovering, setIsHovering] = useState(false);
    const sliderRef = useRef(null);
    // Smooth value animation with better easing
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(value);
        }, 50); // Faster response
        return () => clearTimeout(timer);
    }, [value]);
    // Debounced onChange for smoother performance
    const debouncedOnChange = useCallback((newValue) => {
        const timer = setTimeout(() => onChange(newValue), 10);
        return () => clearTimeout(timer);
    }, [onChange]);
    // Handle dragging functionality - Simplified approach
    const handleHandleMouseDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        // Immediately start tracking mouse movement
        const startX = e.clientX;
        const startValue = value;
        const handleMouseMove = (moveEvent) => {
            if (!sliderRef.current)
                return;
            const rect = sliderRef.current.getBoundingClientRect();
            const deltaX = moveEvent.clientX - startX;
            const deltaPercentage = deltaX / rect.width;
            const deltaValue = deltaPercentage * (max - min);
            const newValue = Math.max(min, Math.min(max, startValue + deltaValue));
            const steppedValue = Math.round(newValue / step) * step;
            setAnimatedValue(steppedValue);
            onChange(steppedValue);
        };
        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [value, min, max, step, onChange]);
    const handleTouchStart = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        const startTouch = e.touches[0];
        const startX = startTouch.clientX;
        const startValue = value;
        const handleTouchMove = (moveEvent) => {
            if (!sliderRef.current || moveEvent.touches.length === 0)
                return;
            const rect = sliderRef.current.getBoundingClientRect();
            const deltaX = moveEvent.touches[0].clientX - startX;
            const deltaPercentage = deltaX / rect.width;
            const deltaValue = deltaPercentage * (max - min);
            const newValue = Math.max(min, Math.min(max, startValue + deltaValue));
            const steppedValue = Math.round(newValue / step) * step;
            setAnimatedValue(steppedValue);
            onChange(steppedValue);
        };
        const handleTouchEnd = () => {
            setIsDragging(false);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    }, [value, min, max, step, onChange]);
    // Handle track clicks
    const handleTrackClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            const rect = sliderRef.current?.getBoundingClientRect();
            if (!rect)
                return;
            const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            const newValue = min + (max - min) * percentage;
            const steppedValue = Math.round(newValue / step) * step;
            const finalValue = Math.max(min, Math.min(max, steppedValue));
            setAnimatedValue(finalValue);
            onChange(finalValue);
        }
    }, [min, max, step, onChange]);
    // Calculate percentage for slider position
    const percentage = ((value - min) / (max - min)) * 100;
    // Elegant budget categories
    const getBudgetCategory = (budget) => {
        if (budget < 10000)
            return {
                label: 'Intim & Sparsam',
                color: 'text-accent',
                bg: 'bg-primary-100',
                icon: 'heart'
            };
        if (budget < 20000)
            return {
                label: 'Klassisch',
                color: 'text-champagne',
                bg: 'bg-undertone',
                icon: 'flower'
            };
        if (budget < 35000)
            return {
                label: 'Elegant',
                color: 'text-accent',
                bg: 'bg-primary-200',
                icon: 'sparkles'
            };
        if (budget < 50000)
            return {
                label: 'Luxuriös',
                color: 'text-primary-600',
                bg: 'bg-champagne',
                icon: 'castle'
            };
        return {
            label: 'Exklusiv',
            color: 'text-primary-700',
            bg: 'bg-accent/20',
            icon: 'rings'
        };
    };
    const category = getBudgetCategory(value);
    // Elegant preset values
    const presets = [
        { value: 8000, label: 'Intim', icon: 'heart' },
        { value: 15000, label: 'Klassisch', icon: 'flower' },
        { value: 25000, label: 'Elegant', icon: 'sparkles' },
        { value: 40000, label: 'Luxuriös', icon: 'castle' },
        { value: 60000, label: 'Exklusiv', icon: 'rings' }
    ];
    // Priority-based budget breakdown calculation
    const calculatePriorityBasedBreakdown = () => {
        // Base budget breakdown
        const baseBreakdown = [
            {
                id: 'venue',
                category: 'Location & Catering',
                basePercentage: 45,
                color: 'bg-accent',
                icon: 'castle'
            },
            {
                id: 'photography',
                category: 'Fotografie & Video',
                basePercentage: 12,
                color: 'bg-champagne',
                icon: 'camera'
            },
            {
                id: 'flowers',
                category: 'Dekoration & Blumen',
                basePercentage: 15,
                color: 'bg-primary-300',
                icon: 'flower'
            },
            {
                id: 'attire',
                category: 'Kleidung & Beauty',
                basePercentage: 10,
                color: 'bg-primary-400',
                icon: 'sparkles'
            },
            {
                id: 'entertainment',
                category: 'Musik & Entertainment',
                basePercentage: 8,
                color: 'bg-undertone',
                icon: 'music'
            },
            {
                id: 'other',
                category: 'Sonstiges',
                basePercentage: 10,
                color: 'bg-primary-200',
                icon: 'gift'
            }
        ];
        // If no priorities selected, return base breakdown
        if (priorities.length === 0) {
            return baseBreakdown.map(item => ({
                ...item,
                percentage: item.basePercentage,
                isPriority: false
            }));
        }
        // Calculate priority-weighted breakdown
        const priorityBoost = 5; // 5% boost per priority
        const totalBoost = priorities.length * priorityBoost;
        return baseBreakdown.map(item => {
            const isPriority = priorities.includes(item.id);
            let adjustedPercentage = item.basePercentage;
            if (isPriority) {
                // Boost priority categories
                adjustedPercentage += priorityBoost;
            }
            else {
                // Reduce non-priority categories proportionally
                const reductionPerCategory = totalBoost / (baseBreakdown.length - priorities.length);
                adjustedPercentage = Math.max(5, adjustedPercentage - reductionPerCategory);
            }
            return {
                ...item,
                percentage: Math.round(adjustedPercentage),
                isPriority
            };
        });
    };
    const breakdown = calculatePriorityBasedBreakdown();
    return (<div className="w-full max-w-3xl mx-auto space-y-8 budget-slider" data-field="totalBudget">
      {/* Elegant Value Display */}
      <div className="text-center">
        <motion.div className="text-5xl md:text-6xl font-serif font-bold text-graphite mb-4" key={animatedValue} initial={{ scale: 1.1, opacity: 0, y: -10 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] // Custom easing for smoothness
        }}>
          {currency} {animatedValue.toLocaleString()}
        </motion.div>
        
        <motion.div className={`inline-flex items-center px-4 py-2 rounded-elegant text-sm font-medium ${category.bg} ${category.color} shadow-elegant`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{
            delay: 0.1,
            duration: 0.3,
            ease: "backOut"
        }}>
          <ElegantIcon name={category.icon} className="mr-2" size={16}/>
          {category.label}
        </motion.div>
      </div>

      {/* Elegant Slider Container */}
      <div className="relative px-4" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} ref={sliderRef} onClick={handleTrackClick}>
        {/* Elegant Track */}
        <div className="relative h-4 bg-gradient-to-r from-primary-100 to-undertone rounded-elegant-lg overflow-hidden shadow-inner">
          {/* Progress Fill with Gradient */}
          <motion.div className="h-full bg-gradient-to-r from-champagne via-accent to-primary-500 rounded-elegant-lg relative" style={{ width: `${percentage}%` }} initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
        }}>
            {/* Shimmer effect */}
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" animate={{ x: [-100, 200] }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
        }}/>
          </motion.div>
          
          {/* Elegant Glow Effect */}
          <AnimatePresence>
            {(isDragging || isHovering) && (<motion.div className="absolute inset-0 bg-gradient-to-r from-champagne/40 to-accent/40 rounded-elegant-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}/>)}
          </AnimatePresence>
        </div>

        {/* Invisible Draggable Area for Handle */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-16 h-16 cursor-grab active:cursor-grabbing z-30" style={{
            left: `calc(${percentage}% - 32px)`,
            cursor: isDragging ? 'grabbing' : 'grab'
        }} onMouseDown={handleHandleMouseDown} onTouchStart={handleTouchStart}/>

        {/* Improved Elegant Custom Thumb Handle */}
        <motion.div className={`absolute top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border-4 border-royal rounded-full shadow-royal-lg z-20 flex items-center justify-center select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} style={{
            left: `calc(${percentage}% - 24px)`,
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none'
        }} animate={{
            scale: isDragging ? 1.3 : isHovering ? 1.15 : 1,
            borderColor: isDragging ? 'rgb(107, 70, 193)' : isHovering ? 'rgb(139, 92, 246)' : 'rgb(107, 70, 193)',
            boxShadow: isDragging
                ? '0 0 0 16px rgba(107, 70, 193, 0.15), 0 12px 32px rgba(107, 70, 193, 0.25)'
                : isHovering
                    ? '0 0 0 12px rgba(107, 70, 193, 0.1), 0 8px 20px rgba(107, 70, 193, 0.15)'
                    : '0 4px 12px rgba(107, 70, 193, 0.2)'
        }} transition={{
            duration: 0.2,
            ease: "easeOut"
        }} whileHover={{
            scale: 1.15,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.5 }
        }}>
          {/* Draggable Handle Overlay */}
          <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10" style={{ cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={handleHandleMouseDown} onTouchStart={handleTouchStart}/>

          {/* Inner Handle Design */}
          <motion.div className="w-6 h-6 bg-royal rounded-full flex items-center justify-center" animate={{
            backgroundColor: isDragging ? 'rgb(85, 60, 154)' : 'rgb(107, 70, 193)',
        }}>
            <ElegantIcon name="sparkles" className="text-white" size={14}/>
          </motion.div>
          
          {/* Handle Grip Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col space-y-1">
              <div className="w-1 h-1 bg-royal/30 rounded-full"></div>
              <div className="w-1 h-1 bg-royal/30 rounded-full"></div>
              <div className="w-1 h-1 bg-royal/30 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Handle Value Tooltip */}
        <AnimatePresence>
          {(isDragging || isHovering) && (<motion.div className="absolute -top-16 bg-royal text-white px-3 py-2 rounded-elegant text-sm font-medium shadow-royal-lg z-30" style={{ left: `calc(${percentage}% - 40px)` }} initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.8 }} transition={{ duration: 0.2 }}>
              <div className="text-center">
                <div className="font-bold">{currency} {value.toLocaleString()}</div>
                <div className="text-xs text-royal-light">{category.label}</div>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-royal"></div>
            </motion.div>)}
        </AnimatePresence>

        {/* Elegant Min/Max Labels */}
        <div className="flex justify-between mt-4 text-sm text-accent/70 font-medium">
          <span>{currency} {min.toLocaleString()}</span>
          <span>{currency} {max.toLocaleString()}</span>
        </div>
      </div>

      {/* Elegant Quick Presets */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {presets.map((preset, index) => (<motion.button key={preset.value} onClick={() => onChange(preset.value)} className={`card-elegant text-center transition-all duration-300 ${value === preset.value
                ? 'border-2 border-accent bg-primary-100 shadow-golden'
                : 'hover:border-accent/50 hover:bg-primary-50'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{
                delay: 0.1 * index,
                duration: 0.3
            }} whileHover={{
                scale: 1.02,
                y: -2
            }}>
            <ElegantIcon name={preset.icon} className={`mx-auto mb-2 ${value === preset.value ? 'text-accent' : 'text-accent/60'}`} size={20}/>
            <div className="font-serif font-semibold text-graphite">
              {currency} {preset.value / 1000}k
            </div>
            <div className="text-xs text-accent/70 font-medium mt-1">
              {preset.label}
            </div>
          </motion.button>))}
      </div>

      {/* Elegant Budget Breakdown */}
      {showBreakdown && (<motion.div className="section-elegant" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="text-center mb-6">
            <ElegantIcon name="sparkles" className="text-accent mx-auto mb-2" size={24}/>
            <h3 className="text-xl font-serif font-semibold text-graphite">
              Intelligente Budget-Aufteilung
            </h3>
            <div className="elegant-divider"></div>
          </div>
          
          <div className="space-y-4">
            {breakdown.map((item, index) => {
                const amount = Math.round((value * item.percentage) / 100);
                return (<motion.div key={item.category} className={`flex items-center justify-between p-4 rounded-elegant transition-all duration-300 relative ${item.isPriority
                        ? 'bg-primary-100 border-2 border-accent/30 shadow-golden'
                        : 'bg-white/50 hover:bg-white/80'}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{
                        delay: 0.1 * index,
                        duration: 0.3
                    }} whileHover={{ x: 4 }}>
                  {/* Priority Badge */}
                  {item.isPriority && (<motion.div className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + 0.1 * index }}>
                      ⭐
                    </motion.div>)}
                  
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-elegant ${item.color} flex items-center justify-center shadow-elegant ${item.isPriority ? 'ring-2 ring-accent/30' : ''}`}>
                      <ElegantIcon name={item.icon} className="text-white" size={16}/>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${item.isPriority ? 'text-accent font-semibold' : 'text-graphite'}`}>
                          {item.category}
                        </span>
                        {item.isPriority && (<span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">
                            Priorität
                          </span>)}
                      </div>
                      <div className="text-sm text-accent/70">
                        {item.percentage}% des Budgets
                        {item.isPriority && (<span className="ml-2 text-accent font-medium">
                            (+5% durch Priorität)
                          </span>)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <motion.div className={`font-serif font-semibold text-lg ${item.isPriority ? 'text-accent' : 'text-graphite'}`} key={amount} initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
                      {currency} {amount.toLocaleString()}
                    </motion.div>
                  </div>
                </motion.div>);
            })}
          </div>

          {/* Priority Info */}
          {priorities.length > 0 && (<motion.div className="mt-6 p-4 rounded-elegant bg-accent/10 border border-accent/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="flex items-center space-x-2 text-accent mb-2">
                <ElegantIcon name="sparkles" size={16}/>
                <span className="font-semibold">Ihre Prioritäten berücksichtigt</span>
              </div>
              <p className="text-sm text-accent/80 font-light">
                {priorities.length} Bereiche erhalten jeweils 5% mehr Budget-Anteil basierend auf Ihren Prioritäten.
              </p>
            </motion.div>)}

          {/* Pro Gast Berechnung */}
          <motion.div className="mt-6 p-4 rounded-elegant bg-champagne/20 border border-champagne/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <div className="flex items-center justify-center space-x-2 text-accent">
              <ElegantIcon name="heart" size={16}/>
              <span className="font-medium">
                Circa {currency} {Math.round(value / 50)} pro Gast (bei 50 Gästen)
              </span>
            </div>
          </motion.div>
        </motion.div>)}
    </div>);
};
export default BudgetSlider;
