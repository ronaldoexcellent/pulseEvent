import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'User Management', path: '/admin/users', icon: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { name: 'Content & Events', path: '/admin/content', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Financials', path: '/admin/financials', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Support & Feedback', path: '/admin/support', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans antialiased overflow-hidden">
      
      {/* Mobile Sidebar Overlay Canvas */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-gray-950/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation Drawer */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? '280px' : '0px',
          x: isSidebarOpen ? 0 : -280
        }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className="fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-100 shadow-xs whitespace-nowrap overflow-hidden"
      >
        {/* Sidebar Corporate Title Segment */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50 shrink-0">
          <span className="text-lg font-black text-gray-900 uppercase tracking-tighter font-['Space_mono',monospace]">
            Admin Panel
          </span>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Primary Interactive Links Navigation Node */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && location.pathname.startsWith(item.path));

            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 text-xs uppercase tracking-wider font-black rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-[#5a1fb5]/10 text-[#5a1fb5]' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={2.5} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#5a1fb5]' : 'text-gray-400 group-hover:text-gray-900'
                  }`}
                >
                  <path d={item.icon} />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Core Context - Access Termination */}
        <div className="p-4 border-t border-gray-50 shrink-0">
          <button className="flex items-center gap-3.5 w-full px-4 py-3 text-xs uppercase tracking-wider font-black text-rose-600 rounded-xl hover:bg-rose-50/50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Session Exit
          </button>
        </div>
      </motion.aside>

      {/* Main Structural Layout Segment */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Global Toolbar Header Element */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </button>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest hidden sm:block font-['Space_mono',monospace]">
              Control-Matrix Workspace
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Live Infrastructure Notification Alert */}
            <button className="relative p-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all">
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#f2378f] rounded-full ring-2 ring-white"></span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
            
            {/* Identity Profile Badge */}
            <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black text-xs shadow-xs border border-transparent select-none">
              ADM
            </div>
          </div>
        </header>

        {/* Inner Content Component Delivery Frame */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}