import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/admin', icon: 'M3 3v18h18' },
    { name: 'User Management', path: '/admin/users', icon: 'M12 14c4 0 7 2 7 6H5c0-4 3-6 7-6z M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
    { name: 'Content & Events', path: '/admin/content', icon: 'M19 4H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 12H7v-2h5v2zm4-4H7v-2h9v2z' },
    { name: 'Financials', path: '/admin/financials', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  ];

  return (
    <div className="flex h-screen bg-[#f7f7fa] overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? '280px' : '0px',
          x: isSidebarOpen ? 0 : -280
        }}
        className="fixed lg:static inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-100 shadow-sm whitespace-nowrap overflow-hidden transition-all duration-300"
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
          <span className="text-xl font-black text-gray-900 uppercase tracking-tighter">
            Admin Panel
          </span>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            // Determine if the current route matches the nav item
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && location.pathname.startsWith(item.path));

            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-[#5a1fb5]/10 text-[#5a1fb5]' 
                    : 'text-gray-500 hover:bg-[#5a1fb5]/5 hover:text-[#5a1fb5]'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={2} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#5a1fb5]' : 'text-gray-400 group-hover:text-[#5a1fb5]'
                  }`}
                >
                  <path d={item.icon} />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Action / Logout */}
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 rounded-xl hover:bg-red-50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </button>
            <span className="text-sm font-black text-gray-400 uppercase tracking-widest hidden sm:block">
              Admin Workspace
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-400 hover:text-[#5a1fb5] transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f2378f] rounded-full border-2 border-white"></span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
            
            {/* Quick Admin Profile */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5a1fb5] to-[#f2378f] text-white flex items-center justify-center font-black text-sm shadow-sm cursor-pointer hover:shadow-md transition-all">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          {/* React Router's Outlet handles nested route components, falling back to explicitly passed children */}
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}