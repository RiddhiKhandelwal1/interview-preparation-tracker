/**
 * Badge Component
 * 
 * Small colored label for tags, difficulty levels, and statuses.
 */

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-800 text-gray-300',
    easy: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    medium: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    hard: 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
    info: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    danger: 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/20',
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
