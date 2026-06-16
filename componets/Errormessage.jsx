// src/components/ErrorMessage.jsx
import { useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, AlertOctagon, RefreshCcw } from 'lucide-react';

const SEVERITIES = {
  warning: {
    icon: <AlertTriangle className="w-10 h-10" />,
    color: 'var(--color-warning)',
    bgColor: 'rgba(234, 179, 8, 0.08)',
    borderColor: 'rgba(234, 179, 8, 0.2)',
  },
  error: {
    icon: <AlertCircle className="w-10 h-10" />,
    color: 'var(--color-error)',
    bgColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  critical: {
    icon: <AlertOctagon className="w-10 h-10 animate-pulse" />,
    color: 'var(--color-error)',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
};

/**
 * Inline error display, e.g. for failed data fetches within a page.
 *
 * @param {Object} props
 * @param {string} [props.title='Something went wrong']
 * @param {string} [props.message]
 * @param {Function} [props.onRetry]
 * @param {string} [props.retryLabel='Try Again']
 * @param {'warning'|'error'|'critical'} [props.severity='error']
 * @param {number} [props.autoRetrySeconds=0] - if greater than 0, triggers onRetry automatically after countdown
 * @param {string} [props.className='']
 */
export const ErrorMessage = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  severity = 'error',
  autoRetrySeconds = 0,
  className = '',
}) => {
  const config = SEVERITIES[severity] || SEVERITIES.error;
  const [countdown, setCountdown] = useState(autoRetrySeconds);

  useEffect(() => {
    if (autoRetrySeconds <= 0 || !onRetry) return;

    setCountdown(autoRetrySeconds);
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onRetry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRetrySeconds, onRetry]);

  return (
    <div
      className={`flex flex-col items-center justify-center py-10 px-6 text-center rounded-xl border max-w-lg mx-auto ${className}`}
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
      }}
      role="alert"
    >
      <div className="mb-4" style={{ color: config.color }}>
        {config.icon}
      </div>
      
      <h3
        className="text-lg font-bold mb-1.5 tracking-tight"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h3>
      
      <p className="mb-6 text-xs font-semibold max-w-md" style={{ color: 'var(--color-text-muted)' }}>
        {message || 'An unexpected error occurred. Please try again.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-navy btn-sm shadow-sm flex items-center gap-2"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          {countdown > 0 ? `${retryLabel} (${countdown}s)` : retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;