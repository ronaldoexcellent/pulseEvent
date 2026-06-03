import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ user = null, onLogout, onSearchSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState('events'); // 'events' | 'campaigns'
  const searchWrapperRef = useRef(null);

  const authLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Create Event', path: '/create-event' },
    { label: 'Create Campaign', path: '/create-campaign' },
  ];

  // Collapse floating utility drop list context if target clicks external boundaries
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchTrigger = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({ query: searchQuery, scope: searchScope });
    }
    setSearchFocused(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Left Identity anchor layout */}
        <div className="flex flex-col shrink-0">
          <a href="/" className=" flex items-center gap-0.5">
           <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" />
          </a>
          
        </div>

        {/* --- Global Central Multi-Scope Search Engine Input Bar --- */}
        <div ref={searchWrapperRef} className="flex-1 max-w-md relative mx-2">
          <form onSubmit={handleSearchTrigger} className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input
              type="text"
              placeholder={`Search ${searchScope === 'events' ? 'tickets & events...' : 'users & donation funds...'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark pl-9 pr-24 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400"
            />

            {/* Scope Badge inside input box layout */}
            <div className="absolute inset-y-1.5 right-1.5 flex items-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-pulse-purple-primary bg-pulse-purple-primary/10 px-2.5 py-1 rounded-lg">
                {searchScope}
              </span>
            </div>
          </form>

          {/* Context Scope Menu Selector Portal Layer */}
          <AnimatePresence>
            {searchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full inset-x-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 z-50 text-left"
              >
                <p className="text-[10px] font-black tracking-widest text-pulse-text-dark/40 uppercase mb-2 px-2">Filter Parameters</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchScope('events')}
                    className={`flex flex-col p-2.5 rounded-xl border text-left transition-all ${searchScope === 'events' ? 'border-pulse-purple-primary bg-pulse-purple-primary/5' : 'border-gray-100 hover:bg-pulse-bg-light'}`}
                  >
                    <span className="text-xs font-bold text-pulse-text-dark flex items-center gap-1">🎫 Buy Tickets</span>
                    <span className="text-[10px] text-pulse-text-dark/50 mt-0.5 font-medium">Search curated live event tiers</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchScope('campaigns')}
                    className={`flex flex-col p-2.5 rounded-xl border text-left transition-all ${searchScope === 'campaigns' ? 'border-pulse-purple-primary bg-pulse-purple-primary/5' : 'border-gray-100 hover:bg-pulse-bg-light'}`}
                  >
                    <span className="text-xs font-bold text-pulse-text-dark flex items-center gap-1">💝 Send Donations</span>
                    <span className="text-[10px] text-pulse-text-dark/50 mt-0.5 font-medium">Find social campaign causes</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Desktop Action Controls Row --- */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <a href="/browse" className="text-sm font-semibold text-pulse-text-dark/80 hover:text-pulse-purple-primary transition-colors">
            Browse
          </a>
          
          {user ? (
            <>
              {authLinks.map((link) => (
                <a key={link.path} href={link.path} className="text-sm font-semibold text-pulse-text-dark/80 hover:text-pulse-purple-primary transition-colors">
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border border-pulse-purple-secondary object-cover shadow-sm"
                />
                <button onClick={onLogout} className="text-sm font-bold text-pulse-text-dark/50 hover:text-pulse-pink-primary transition-colors">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <a href="/signin" className="text-sm font-bold text-pulse-text-dark/80 hover:text-pulse-purple-primary">Sign In</a>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="/signup" className="bg-pulse-gradient text-white text-sm font-bold px-4 py-2 rounded-xl shadow-md shadow-pulse-purple-primary/10">
                Sign Up
              </motion.a>
            </div>
          )}
        </div>

        {/* Mobile Toggle Trigger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-pulse-text-dark p-1 shrink-0">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full p-5 space-y-4 shadow-xl z-50 text-left"
          >
            <a href="/browse" className="block text-base font-bold text-pulse-text-dark/80" onClick={() => setIsOpen(false)}>Browse Events</a>
            {user ? (
              <>
                {authLinks.map((link) => (
                  <a key={link.path} href={link.path} className="block text-base font-bold text-pulse-text-dark/80" onClick={() => setIsOpen(false)}>{link.label}</a>
                ))}
                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                  <span className="text-sm font-bold text-pulse-text-dark">@{user.username}</span>
                  <button onClick={() => { setIsOpen(false); onLogout(); }} className="text-sm font-bold text-pulse-pink-primary bg-pulse-pink-primary/10 px-3 py-1.5 rounded-lg">Logout</button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href="/login" className="w-full text-center text-pulse-text-dark border border-gray-200 font-bold py-3 rounded-xl" onClick={() => setIsOpen(false)}>Sign In</a>
                <a href="/signup" className="w-full text-center bg-pulse-gradient text-white font-bold py-3 rounded-xl" onClick={() => setIsOpen(false)}>Sign Up</a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}