import { Menu } from 'lucide-react';

const Header = ({ title, onMenuToggle }) => (
  <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl px-4 lg:px-6">
    <button onClick={onMenuToggle} className="rounded-md p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 lg:hidden transition-colors cursor-pointer" aria-label="Toggle menu">
      <Menu size={18} />
    </button>
    <h1 className="text-[15px] font-semibold text-zinc-100 tracking-tight">{title}</h1>
  </header>
);

export default Header;
