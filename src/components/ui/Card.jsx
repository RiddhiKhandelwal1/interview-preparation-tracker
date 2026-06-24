/**
 * Card Component
 * 
 * A versatile card with glassmorphism styling.
 * Supports hover effects and optional click handling.
 */

const Card = ({ children, className = '', hover = false, onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm p-6
        ${hover ? 'hover:border-gray-700 hover:bg-gray-900/90 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
