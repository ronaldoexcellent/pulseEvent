import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { itemsMockDatabase, operationalRegions } from '../data/exploreData';

export default function BrowseEvents() {
  const [activeScope, setActiveScope] = useState('events'); // 'events' | 'donations'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API fetching when scope changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5s simulated load time

    return () => clearTimeout(timer);
  }, [activeScope]);

  const filteredItems = useMemo(() => {
    // Falls back to an empty array securely if the targeted node scope is undefined
    const currentPool = itemsMockDatabase[activeScope] || [];
    return currentPool.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.organizer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || item.location.includes(selectedRegion);
      return matchesSearch && matchesRegion;
    });
  }, [activeScope, searchQuery, selectedRegion]);

  // Skeleton Card Template
  const SkeletonCard = () => (
    <div className="bg-white border border-gray-200/80 rounded-3xl overflow-hidden flex flex-col justify-between h-full">
      <div className="aspect-video w-full bg-gray-200 animate-pulse"></div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mt-3"></div>
        </div>
        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-2 w-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-full h-[42px] bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-pulse-bg-light text-pulse-text-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Discover Live <span className="text-transparent bg-clip-text bg-pulse-gradient">Opportunities.</span>
            </h1>
            <p className="text-sm font-medium text-pulse-text-dark/50 mt-1">
              Secure verified operations across African regional clearing corridors.
            </p>
          </div>

          {/* Scope Segment Switcher */}
          <div className="flex items-center bg-white border border-gray-200 p-1.5 rounded-2xl shadow-xs shrink-0 self-start md:self-auto">
            <button
              onClick={() => { setActiveScope('events'); setSelectedRegion('All'); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${activeScope === 'events' ? 'bg-pulse-text-dark text-white shadow-md' : 'text-pulse-text-dark/60 hover:text-pulse-text-dark'}`}
            >
              🎫 Live Tickets
            </button>
            <button
              onClick={() => { setActiveScope('donations'); setSelectedRegion('All'); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${activeScope === 'donations' ? 'bg-pulse-text-dark text-white shadow-md' : 'text-pulse-text-dark/60 hover:text-pulse-text-dark'}`}
            >
              💝 Donation Causes
            </button>
          </div>
        </div>

        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={`Filter through real-time verified ${activeScope === 'events' ? 'events, locations or organizers...' : 'crowdfunding modules...'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Regional Quick Links */}
          <div className="md:col-span-4 flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {operationalRegions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-3 border text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${selectedRegion === region ? 'border-pulse-purple-primary bg-pulse-purple-primary/5 text-pulse-purple-primary' : 'border-gray-200 bg-white hover:bg-pulse-bg-light text-pulse-text-dark/70'}`}
              >
                {region === 'All' ? '🌍 All Regions' : region}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid Matrix */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Render 6 skeleton cards while loading
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
            ) : (
              // Render actual items once loaded
              filteredItems.map((item) => (
                <motion.a
                  key={item.id}
                  layout
                  href={activeScope === 'events' ? `/explore/events/${item.id}` : `/explore/donations/${item.id}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
                  className="bg-white border border-gray-200/80 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-pulse-purple-primary shadow-xs">
                      {item.badge}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-pulse-text-dark/40 uppercase tracking-wider">
                        <span>{item.organizer}</span>
                        <span className="text-right">{activeScope === 'events' ? item.category : 'Crowdfund'}</span>
                      </div>
                      
                      <div className="text-base font-black text-pulse-text-dark tracking-tight line-clamp-2 leading-snug group-hover:text-pulse-purple-primary transition-colors">
                        {item.title}
                      </div>
                      <p className="text-xs font-semibold text-pulse-text-dark/60 flex items-center gap-1 pt-1">
                        📍 {item.location}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3.5">
                      {activeScope === 'events' ? (
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-pulse-text-dark/40">Pass Price</span>
                            <span className="text-base font-black text-pulse-purple-primary">
                              {item.currency}{item.basePrice?.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-pulse-text-dark/50">🗓️ {item.date}</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-pulse-text-dark/50">
                            <span>Raised: <b className="text-pulse-text-dark font-black">{item.currency}{item.raised?.toLocaleString()}</b></span>
                            <span>Target: {item.currency}{item.target?.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-1.5 bg-pulse-bg-light rounded-full overflow-hidden border border-gray-100">
                            <div 
                              className="h-full bg-pulse-gradient rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="w-full py-2.5 bg-pulse-bg-light group-hover:bg-pulse-text-dark border border-gray-200 group-hover:border-pulse-text-dark rounded-xl text-xs font-black text-center text-pulse-text-dark group-hover:text-white tracking-wide transition-colors">
                        {activeScope === 'events' ? 'View Ticket Options 🎫' : 'View Donation Vault 💝'}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Fallback */}
        {!isLoading && filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white border border-gray-200/60 rounded-3xl space-y-3"
          >
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-black text-pulse-text-dark">No Query Trace Identified</h3>
            <p className="text-sm font-medium text-pulse-text-dark/50 max-w-sm mx-auto">
              We couldn't track logs matching your inputs within this cluster. Try clearing terms or tweaking regional filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
              className="text-xs font-black text-pulse-purple-primary underline pt-1 inline-block"
            >
              Reset Interface Scope
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}