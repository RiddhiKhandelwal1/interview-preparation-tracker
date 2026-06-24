/**
 * Header Component
 * 
 * Top navigation bar with mobile menu toggle and page title.
 */

const Header = ({ title, onMenuToggle }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden transition-colors cursor-pointer"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      <h1 className="text-lg font-semibold text-white">{title}</h1>
    </header>
  );
};

export default Header;
