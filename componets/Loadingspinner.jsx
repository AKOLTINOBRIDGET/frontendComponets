// src/components/LoadingSpinner.jsx

const SIZES = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]',
  xl: 'w-16 h-16 border-4',
};

/**
 * Reusable loading spinner.
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {string} [props.label]            - optional text below spinner
 * @param {boolean} [props.fullScreen=false] - centers spinner in full viewport
 * @param {string} [props.color]            - override spinner color (defaults to --color-primary)
 */
const LoadingSpinner = ({ size = 'md', label, fullScreen = false, color }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${SIZES[size] || SIZES.md} rounded-full animate-spin-custom`}
        style={{
          borderColor: 'var(--color-border)',
          borderTopColor: color || 'var(--color-primary)',
        }}
      />
      {label && (
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-8">{spinner}</div>;
};

export default LoadingSpinner;