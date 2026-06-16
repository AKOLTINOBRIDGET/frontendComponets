// src/components/Toast.jsx
import { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ICONS = {
  success: <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-success)' }} />,
  error: <AlertCircle className="w-5 h-5" style={{ color: 'var(--color-error)' }} />,
  warning: <AlertTriangle className="w-5 h-5" style={{ color: 'var(--color-warning)' }} />,
  info: <Info className="w-5 h-5" style={{ color: 'var(--color-info)' }} />,
};

const BORDER_COLORS = {
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
};

const Toast = ({ toast, onClose }) => {
  const { id, message, type = 'info', duration = 4000, title } = toast;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration <= 0) return;
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPercentage = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPercentage);
      
      if (elapsed >= duration) {
        clearInterval(interval);
        onClose(id);
      }
    }, 16); // ~60fps updates

    return () => clearInterval(interval);
  }, [id, duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="relative flex items-start gap-3.5 p-4 rounded-xl shadow-xl border overflow-hidden w-[calc(100vw-2rem)] sm:w-[360px]"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: BORDER_COLORS[type] || 'var(--color-border)',
      }}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">{ICONS[type]}</div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>
            {title}
          </h4>
        )}
        <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {message}
        </p>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 rounded-full hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors"
        style={{ color: 'var(--color-text-muted)' }}
        aria-label="Dismiss toast notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress countdown bar */}
      {duration > 0 && (
        <div
          className="absolute bottom-0 left-0 h-1 transition-all duration-75"
          style={{
            width: `${progress}%`,
            backgroundColor: BORDER_COLORS[type] || 'var(--color-gold)',
            opacity: 0.7,
          }}
        />
      )}
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div
      className="fixed bottom-5 right-5 left-5 sm:left-auto flex flex-col gap-3.5 items-end pointer-events-none"
      style={{ zIndex: 'var(--z-toast)' }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;