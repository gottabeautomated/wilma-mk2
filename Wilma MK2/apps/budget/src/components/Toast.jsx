import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ElegantIcon from './ElegantIcon';
const Toast = ({ message, type = 'success', isVisible, onClose, duration = 4000 }) => {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);
    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50 border-green-200',
                    text: 'text-green-800',
                    icon: 'sparkles',
                    iconColor: 'text-green-600'
                };
            case 'error':
                return {
                    bg: 'bg-red-50 border-red-200',
                    text: 'text-red-800',
                    icon: 'heart',
                    iconColor: 'text-red-600'
                };
            case 'info':
                return {
                    bg: 'bg-blue-50 border-blue-200',
                    text: 'text-blue-800',
                    icon: 'sparkles',
                    iconColor: 'text-blue-600'
                };
            default:
                return {
                    bg: 'bg-green-50 border-green-200',
                    text: 'text-green-800',
                    icon: 'sparkles',
                    iconColor: 'text-green-600'
                };
        }
    };
    const styles = getToastStyles();
    return (<AnimatePresence>
      {isVisible && (<motion.div initial={{ opacity: 0, y: -100, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -100, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed top-4 right-4 z-50 max-w-sm w-full">
          <div className={`${styles.bg} border-2 rounded-2xl p-4 shadow-xl backdrop-blur-sm`}>
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${styles.iconColor}`}>
                <ElegantIcon name={styles.icon} size={20}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${styles.text} leading-relaxed`}>
                  {message}
                </p>
              </div>
              <button onClick={onClose} className={`flex-shrink-0 ${styles.text} hover:opacity-70 transition-opacity`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            
            {/* Progress bar for auto-dismiss */}
            {duration > 0 && (<motion.div initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: duration / 1000, ease: "linear" }} className={`mt-3 h-1 ${styles.iconColor.replace('text-', 'bg-')} rounded-full opacity-30`}/>)}
          </div>
        </motion.div>)}
    </AnimatePresence>);
};
export default Toast;
