import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code2, StickyNote, Briefcase, FileText, BarChart3, LogOut, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/problems', label: 'Problems', icon: Code2 },
  { path: '/notes', label: 'Notes', icon: StickyNote },
  { path: '/interviews', label: 'Interviews', icon: Briefcase },
  { path: '/resumes', label: 'Resumes', icon: FileText },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
        )}
      </AnimatePresence>

      <aside className={`
        fixed left-0 top-0 z-50 flex h-full flex-col border-r border-zinc-800/80 bg-zinc-950 transition-all duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${collapsed ? 'w-[68px]' : 'w-60'}
      `}>
        {/* Logo */}
        <div className={`flex h-14 items-center border-b border-zinc-800/80 ${collapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs flex-shrink-0">
              IP
            </div>
            {!collapsed && (
              <span className="text-sm font-semibold text-zinc-100 tracking-tight">Interview Prep</span>
            )}
          </div>
          {!collapsed && (
            <button onClick={() => setCollapsed(true)}
              className="hidden lg:flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer">
              <ChevronLeft size={14} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto py-3 ${collapsed ? 'px-2' : 'px-2.5'}`}>
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink key={item.path} to={item.path} onClick={onClose}
                  className={`relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-150
                    ${isActive ? 'text-zinc-100 bg-zinc-800/80' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40'}
                    ${collapsed ? 'justify-center' : ''}
                  `}>
                  {isActive && (
                    <motion.div layoutId="nav-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r-full bg-indigo-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                  )}
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Expand button (collapsed mode) */}
        {collapsed && (
          <div className="px-2 pb-2">
            <button onClick={() => setCollapsed(false)}
              className="flex w-full items-center justify-center rounded-lg py-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40 transition-colors cursor-pointer">
              <ChevronLeft size={14} className="rotate-180" />
            </button>
          </div>
        )}

        {/* User / Logout */}
        <div className={`border-t border-zinc-800/80 ${collapsed ? 'p-2' : 'p-3'}`}>
          {!collapsed ? (
            <>
              <div className="flex items-center gap-2.5 rounded-lg p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-semibold text-white flex-shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-200">{user?.name || 'User'}</p>
                  <p className="truncate text-[11px] text-zinc-500">{user?.email}</p>
                </div>
              </div>
              <button onClick={logout}
                className="mt-1.5 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer">
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </>
          ) : (
            <button onClick={logout} title="Log out"
              className="flex w-full items-center justify-center rounded-lg py-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
