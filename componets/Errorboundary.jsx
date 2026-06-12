// src/components/ErrorBoundary.jsx
import { Component } from 'react';

/**
 * Catches rendering errors in its child tree and shows a fallback UI.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.title='Oops! Something went wrong']
 * @param {string} [props.message]
 * @param {React.ReactNode} [props.fallback] - fully custom fallback UI (receives no props)
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, title = 'Oops! Something went wrong', message, fallback } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return (
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <svg
                className="mx-auto h-16 w-16"
                style={{ color: 'var(--color-error)' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1
              className="text-2xl mb-4"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
            >
              {title}
            </h1>
            <p className="mb-8" style={{ color: 'var(--color-text-muted)' }}>
              {message || "We're sorry for the inconvenience. Please try refreshing the page."}
            </p>
            {import.meta.env?.DEV && error && (
              <details
                className="text-left p-4 rounded-lg mb-4 text-left"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: `1px solid color-mix(in srgb, var(--color-error) 30%, transparent)`,
                }}
              >
                <summary className="cursor-pointer mb-2" style={{ color: 'var(--color-error)' }}>
                  Error Details
                </summary>
                <pre className="text-xs overflow-auto" style={{ color: 'var(--color-text-muted)' }}>
                  {error.toString()}
                  {errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button onClick={() => window.location.reload()} className="btn-primary">
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;