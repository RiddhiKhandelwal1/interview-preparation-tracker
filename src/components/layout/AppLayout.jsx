/**
 * AppLayout Component
 * 
 * Main layout wrapper with sidebar and content area.
 * Uses useState for mobile sidebar toggle.
 */

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-200">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
