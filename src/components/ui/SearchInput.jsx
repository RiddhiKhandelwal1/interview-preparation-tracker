import { Search, X } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = 'Search...', className = '' }) => (
  <div className={`relative ${className}`}>
    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full h-9 rounded-lg border border-zinc-800 bg-zinc-900/60 py-2 pl-9 pr-9 text-sm text-zinc-200 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors" />
    {value && (
      <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer" aria-label="Clear">
        <X size={14} />
      </button>
    )}
  </div>
);

export default SearchInput;
