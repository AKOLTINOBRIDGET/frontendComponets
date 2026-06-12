// src/components/EmptyState.jsx

/**
 * Generic empty-state placeholder, e.g. for empty lists/tables.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.title='No items found']
 * @param {string} [props.message]
 * @param {string} [props.actionLabel]
 * @param {Function} [props.onAction]
 * @param {string} [props.className='']
 */
const EmptyState = ({ icon, title = 'No items found', message, actionLabel, onAction, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      {icon && <div className="mb-4" style={{ color: 'var(--color-text-muted)' }}>{icon}</div>}
      <h3 className="text-xl mb-2" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      {message && (
        <p className="mb-6 max-w-md" style={{ color: 'var(--color-text-muted)' }}>
          {message}
        </p>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;