/**
 * Button Component
 * 
 * Reusable button with multiple variants and sizes.
 * Handles loading state by showing a spinner and disabling interaction.
 */

import Spinner from './Spinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500 shadow-lg shadow-indigo-500/25',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200 focus:ring-gray-600 border border-gray-700',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500 shadow-lg shadow-rose-500/25',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-400 hover:text-gray-200 focus:ring-gray-600',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500 shadow-lg shadow-emerald-500/25',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
};

export default Button;
