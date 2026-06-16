// src/context/ToastContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from './Toast';

const ToastContext = createContext();

let idCounter = 0;
const MAX_TOASTS = 5;

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * Wrap your app in <ToastProvider> once at the root.
 * Then call useToast() anywhere to show toasts:
 *
 *   const { showToast } = useToast();
 *   showToast('Saved successfully', 'success', 4000, 'Success Title');
 *   showToast('Something went wrong', 'error', 5000);
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000, title) => {
    const id = ++idCounter;
    
    setToasts((prev) => {
      // Limit maximum active toasts displayed
      const newToasts = [...prev, { id, message, type, duration, title }];
      if (newToasts.length > MAX_TOASTS) {
        return newToasts.slice(newToasts.length - MAX_TOASTS);
      }
      return newToasts;
    });

    return id;
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    showToast,
    success: (msg, duration, title) => showToast(msg, 'success', duration, title),
    error: (msg, duration, title) => showToast(msg, 'error', duration, title),
    warning: (msg, duration, title) => showToast(msg, 'warning', duration, title),
    info: (msg, duration, title) => showToast(msg, 'info', duration, title),
    dismissAll,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};