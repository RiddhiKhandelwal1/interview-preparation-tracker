/**
 * Spinner Component
 * 
 * A reusable loading spinner with configurable size.
 * Uses CSS animation for the spinning effect.
 */

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div
      className={`animate-spin rounded-full border-solid border-indigo-500 border-t-transparent ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

/**
 * FullPageSpinner — centers a large spinner in the viewport.
 * Used during initial auth check and page transitions.
 */
export const FullPageSpinner = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-950">
    <div className="flex flex-col items-center gap-4">
      <Spinner size="xl" />
      <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
    </div>
  </div>
);

export default Spinner;
