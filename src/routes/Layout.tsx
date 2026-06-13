import React, { type ReactNode, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/UI/Sidebar';
import { Menu, Sparkles } from 'lucide-react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const showSidebar = pathname !== '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0d0d0f] transition-colors duration-300">
      {showSidebar && (
        <Sidebar
          className={mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
      <main className="flex-1 min-h-screen overflow-hidden flex flex-col">
        {/* Mobile Header */}
        {showSidebar && (
          <div className="md:hidden h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-white/5 bg-white dark:bg-[#09090b]">
            <div className="flex items-center gap-2 font-bold text-xl tracking-wide bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              LIPSYNC AI
            </div>
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-zinc-500 dark:text-zinc-400">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;