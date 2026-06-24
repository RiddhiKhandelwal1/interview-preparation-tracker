const Card = ({ children, className = '', hover = false, padding = true, ...props }) => (
  <div className={`rounded-xl border border-zinc-800/80 bg-zinc-900/50 ${padding ? 'p-5' : ''} ${hover ? 'hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200 cursor-pointer group' : ''} ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
