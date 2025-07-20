import React, { useEffect, useState } from 'react';
export const Toast = ({ message, type, duration = 4000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);
    const getToastStyles = () => {
        const baseStyles = "fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 z-50 max-w-md";
        switch (type) {
            case 'success':
                return `${baseStyles} bg-green-500 text-white`;
            case 'error':
                return `${baseStyles} bg-red-500 text-white`;
            case 'warning':
                return `${baseStyles} bg-yellow-500 text-white`;
            default:
                return `${baseStyles} bg-blue-500 text-white`;
        }
    };
    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✗';
            case 'warning':
                return '⚠';
            default:
                return 'ℹ';
        }
    };
    return (<div className={`${getToastStyles()} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{getIcon()}</span>
        <span className="flex-1">{message}</span>
        <button onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }} className="text-white hover:text-gray-200 text-xl leading-none">
          ×
        </button>
      </div>
    </div>);
};
// Toast Manager Hook
export const useToast = () => {
    const [toasts, setToasts] = useState([]);
    const addToast = (toast) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { ...toast, id, onClose: () => removeToast(id) }]);
    };
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };
    const success = (message, duration) => {
        addToast({ message, type: 'success', duration });
    };
    const error = (message, duration) => {
        addToast({ message, type: 'error', duration });
    };
    const warning = (message, duration) => {
        addToast({ message, type: 'warning', duration });
    };
    const info = (message, duration) => {
        addToast({ message, type: 'info', duration });
    };
    const ToastContainer = () => (<>
      {toasts.map(toast => (<Toast key={toast.id} message={toast.message} type={toast.type} duration={toast.duration} onClose={toast.onClose}/>))}
    </>);
    return {
        success,
        error,
        warning,
        info,
        ToastContainer
    };
};
