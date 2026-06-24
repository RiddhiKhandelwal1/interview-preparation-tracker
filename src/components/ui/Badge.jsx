const Badge = ({ children, variant = 'default', className = '', dot = false }) => {
  const v = {
    default: 'bg-zinc-800 text-zinc-400',
    easy: 'bg-emerald-500/10 text-emerald-400',
    medium: 'bg-amber-500/10 text-amber-400',
    hard: 'bg-red-500/10 text-red-400',
    info: 'bg-blue-500/10 text-blue-400',
    success: 'bg-emerald-500/10 text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-400',
    danger: 'bg-red-500/10 text-red-400',
    purple: 'bg-violet-500/10 text-violet-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase ${v[variant]} ${className}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full bg-current opacity-70`} />}
      {children}
    </span>
  );
};

export default Badge;
