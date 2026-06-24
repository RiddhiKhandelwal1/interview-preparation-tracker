import { forwardRef } from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'h-3.5 w-3.5', md: 'h-5 w-5', lg: 'h-8 w-8', xl: 'h-12 w-12' };
  return (
    <svg className={`animate-spin ${sizes[size]} ${className}`} viewBox="0 0 24 24" fill="none" role="status" aria-label="Loading">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.15" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

export const FullPageSpinner = () => (
  <div className="flex min-h-screen items-center justify-center" style={{ background: '#09090b' }}>
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
        <Spinner size="xl" className="relative text-indigo-500" />
      </div>
      <p className="text-sm text-zinc-500 font-medium tracking-wide">Loading...</p>
    </div>
  </div>
);

export const Skeleton = ({ className = '', ...props }) => (
  <div className={`skeleton rounded-lg ${className}`} {...props} />
);

export default Spinner;
