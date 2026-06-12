// src/components/Toast.jsx
import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ICONS = {
  success: <FaCheckCircle style={{ color: 'var(--color-success)' }} />,
  error: <FaExclamationCircle style={{ color: 'var(--color-error)' }} />,
  warning: <FaExclamationCircle style={{ color: 'var(--color-warning)' }} />,
  info: <FaInfoCircle style={{ color: 'var(--color-info)' }} />,
};

const BORDER_COLORS = {
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
};

const Toast = ({ toast, onClose }) => {
  const { id, message, type, duration } = toast;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-lg backdrop-blur-sm shadow-lg animate-slideIn w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[300px] sm:max-w-md"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: `1px solid ${BORDER_COLORS[type] || BORDER_COLORS.info}`,
      }}
    >
      <div className="flex-shrink-0 text-xl mt-0.5">{ICONS[type] || ICONS.info}</div>
      <div className="flex-1">
        <p className="text-sm" style={{ color: 'var(--color-text)' }}>{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 transition-colors"
        style={{ color: 'var(--color-text-muted)' }}
        aria-label="Dismiss"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div
      className="fixed top-4 right-4 left-4 sm:left-auto flex flex-col gap-2 items-end"
      style={{ zIndex: 'var(--z-toast)' }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastContainer;