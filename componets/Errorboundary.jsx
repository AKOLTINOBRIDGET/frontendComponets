// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import { AlertOctagon, RefreshCw, Home, ChevronRight } from 'lucide-react';

/**
 * Catches rendering errors in its child tree and shows a fallback UI.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.title='Oops! Something went wrong']
 * @param {string} [props.message]
 * @param {string} [props.homePath='/']
 * @param {React.ReactNode} [props.fallback] - fully custom fallback UI
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, timestamp: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
    });
  }

  render() {
    const { hasError, error, errorInfo, timestamp } = this.state;
    const { children, title = 'Oops! Something went wrong', message, fallback, homePath = '/' } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return (
        <div
          className="min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div
            className="max-w-xl w-full p-8 rounded-2xl border shadow-xl relative overflow-hidden"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* Premium Decorative Gradient Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)] opacity-[0.03] rounded-full blur-2xl" />

            <div className="text-center">
              <div
                className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-6"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: 'var(--color-error)',
                }}
              >
                <AlertOctagon className="w-8 h-8" />
              </div>
              
              <h1
                className="text-2xl font-extrabold mb-3 tracking-tight"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </h1>
              
              <p className="mb-8 text-sm font-medium leading-relaxed max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                {message || "An unexpected rendering error occurred. Please try reloading or navigating back to the home page."}
              </p>

              {/* Dev Mode Debug Details Accordion */}
              {error && (
                <details
                  className="text-left rounded-xl mb-8 border transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <summary
                    className="cursor-pointer font-bold text-xs p-3.5 flex items-center justify-between select-none"
                    style={{ color: 'var(--color-error)' }}
                  >
                    <span>Developer Debug Information</span>
                    <ChevronRight className="w-4 h-4 transform transition-transform duration-200 details-icon" />
                  </summary>
                  
                  <div
                    className="p-4 border-t text-xs font-mono overflow-auto max-h-60 space-y-2"
                    style={{
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {timestamp && (
                      <p className="text-[10px] text-gray-500 font-semibold mb-1">
                        Timestamp: {timestamp}
                      </p>
                    )}
                    <p className="font-bold text-red-400">{error.toString()}</p>
                    {errorInfo?.componentStack && (
                      <pre className="whitespace-pre-wrap mt-2 leading-relaxed text-[11px]">
                        {errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary btn-md w-full sm:w-auto shadow-md"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-gradient" style={{ animationDuration: '3s' }} />
                  Reload Page
                </button>
                
                <a
                  href={homePath}
                  className="btn-ghost btn-md w-full sm:w-auto border"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;