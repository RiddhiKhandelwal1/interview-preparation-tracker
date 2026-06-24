import Spinner from './Spinner';

const Button = ({ children, variant = 'primary', size = 'md', loading = false, disabled = false, type = 'button', className = '', onClick, ...props }) => {
  const base = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 shadow-sm shadow-indigo-500/20 hover:shadow-indigo-500/30',
    secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600',
    danger: 'bg-red-600/10 text-red-400 hover:bg-red-600/20 border border-red-500/20',
    ghost: 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60',
    success: 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm shadow-emerald-500/20',
  };
  const sizes = { xs: 'h-7 px-2.5 text-xs', sm: 'h-8 px-3 text-xs', md: 'h-9 px-4 text-sm', lg: 'h-11 px-6 text-sm' };

  return (
    <button type={type} disabled={disabled || loading} onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {loading ? <Spinner size="sm" /> : null}
      {children}
    </button>
  );
};

export default Button;
