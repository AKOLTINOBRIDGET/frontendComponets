// src/components/ErrorMessage.jsx
import { FaExclamationTriangle } from 'react-icons/fa';

/**
 * Inline error display, e.g. for failed data fetches within a page.
 *
 * @param {Object} props
 * @param {string} [props.title='Something went wrong']
 * @param {string} [props.message]
 * @param {Function} [props.onRetry]
 * @param {string} [props.retryLabel='Try Again']
 * @param {string} [props.className='']
 */
export const ErrorMessage = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="mb-4" style={{ color: 'var(--color-error)' }}>
        <FaExclamationTriangle size={48} />
      </div>
      <h3 className="text-xl mb-2" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="mb-6 max-w-md" style={{ color: 'var(--color-text-muted)' }}>
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;