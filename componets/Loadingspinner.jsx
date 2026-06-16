// src/components/LoadingSpinner.jsx

const SIZES = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const DOT_SIZES = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2.5 h-2.5',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
};

/**
 * Reusable loading spinner & placeholders.
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {string} [props.label]                 - optional text below spinner
 * @param {boolean} [props.fullScreen=false]      - centers spinner in viewport
 * @param {string} [props.color]                 - override color
 * @param {'spinner'|'skeleton'|'pulse'|'dots'} [props.variant='spinner'] - loading style variant
 * @param {string} [props.width='100%']          - width for skeleton variant
 * @param {string} [props.height='16px']         - height for skeleton variant
 * @param {string} [props.radius='var(--radius-xs)'] - border-radius for skeleton
 */
const LoadingSpinner = ({
  size = 'md',
  label,
  fullScreen = false,
  color,
  variant = 'spinner',
  width = '100%',
  height = '16px',
  radius = 'var(--radius-xs)',
}) => {
  const customColor = color || 'var(--color-gold)';

  const renderContent = () => {
    switch (variant) {
      case 'skeleton':
        return (
          <div
            className="skeleton"
            style={{
              width,
              height,
              borderRadius: radius,
            }}
          />
        );

      case 'pulse':
        return (
          <div
            className="animate-pulse"
            style={{
              width,
              height,
              borderRadius: radius,
              backgroundColor: 'var(--color-border)',
            }}
          />
        );

      case 'dots':
        return (
          <div className="flex items-center justify-center gap-1.5 py-4">
            <span
              className={`${DOT_SIZES[size] || DOT_SIZES.md} rounded-full animate-bounce`}
              style={{ backgroundColor: customColor, animationDelay: '0ms' }}
            />
            <span
              className={`${DOT_SIZES[size] || DOT_SIZES.md} rounded-full animate-bounce`}
              style={{ backgroundColor: customColor, animationDelay: '150ms' }}
            />
            <span
              className={`${DOT_SIZES[size] || DOT_SIZES.md} rounded-full animate-bounce`}
              style={{ backgroundColor: customColor, animationDelay: '300ms' }}
            />
          </div>
        );

      case 'spinner':
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-3">
            <div
              className={`${SIZES[size] || SIZES.md} rounded-full animate-spin-gradient`}
              style={{
                border: '2px solid var(--color-border)',
                borderTopColor: customColor,
              }}
            />
            {label && (
              <p className="text-xs font-semibold tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                {label}
              </p>
            )}
          </div>
        );
    }
  };

  if (fullScreen && variant !== 'skeleton') {
    return (
      <div
        className="min-h-screen flex items-center justify-center w-full"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        {renderContent()}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-4 w-full">{renderContent()}</div>;
};

export default LoadingSpinner;