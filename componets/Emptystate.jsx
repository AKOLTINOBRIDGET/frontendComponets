// src/components/EmptyState.jsx
import { motion } from 'framer-motion';

/**
 * Generic empty-state placeholder, e.g. for empty lists/tables.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.title='No items found']
 * @param {string} [props.message]
 * @param {string} [props.actionLabel]
 * @param {Function} [props.onAction]
 * @param {string} [props.secondaryActionLabel]
 * @param {Function} [props.onSecondaryAction]
 * @param {string} [props.className='']
 */
const EmptyState = ({
  icon,
  title = 'No items found',
  message,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col items-center justify-center py-20 px-6 text-center overflow-hidden rounded-2xl border ${className}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Premium Decorative Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full border-4 border-dashed border-[var(--color-gold)] animate-spin-gradient" style={{ animationDuration: '60s' }} />
        <div className="absolute w-[250px] h-[250px] rounded-full border border-double border-[var(--color-gold)]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md">
        {icon && (
          <div
            className="mb-5 p-4 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-gold)',
            }}
          >
            {icon}
          </div>
        )}
        
        <h3
          className="text-xl font-bold mb-2.5 tracking-tight"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>
        
        {message && (
          <p className="text-sm font-medium mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {message}
          </p>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
          {actionLabel && onAction && (
            <button onClick={onAction} className="btn-primary btn-md w-full sm:w-auto shadow-md">
              {actionLabel}
            </button>
          )}
          
          {secondaryActionLabel && onSecondaryAction && (
            <button onClick={onSecondaryAction} className="btn-ghost btn-md w-full sm:w-auto">
              {secondaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;