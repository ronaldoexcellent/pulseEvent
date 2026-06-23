import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity mock data 
const MOCK_CONTENT = [
  { id: 1, title: 'OwlphaDAO AMA & Workshop', type: 'Event', creator: 'Ossai Jane', status: 'Published', date: 'Jul 05, 2026', engagement: '156 Tickets' },
  { id: 2, title: 'Community Medical Outreach', type: 'Donation', creator: 'Barr. Adebayo Alex.U.', status: 'Active', date: 'Ongoing', engagement: '1,450,000 ₦' },
  { id: 3, title: 'Next.js Dev Masterclass', type: 'Event', creator: 'Michael Chen', status: 'Pending Review', date: 'Jun 20, 2026', engagement: '0 Tickets' },
  { id: 4, title: 'Tech Startups Meetup', type: 'Event', creator: 'Emma Davis', status: 'Draft', date: 'Aug 15, 2026', engagement: '-' },
];

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = ['All', 'Events', 'Donations', 'Pending Review'];

  // Fully functional search and tab filtration logic
  const filteredContent = MOCK_CONTENT.filter((item) => {
    const matchesTab = 
      activeTab === 'All' ||
      (activeTab === 'Events' && item.type === 'Event') ||
      (activeTab === 'Donations' && item.type === 'Donation') ||
      (activeTab === 'Pending Review' && item.status === 'Pending Review');

    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase font-['Space_mono',monospace]">
            Content & Events
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Manage user-generated event architectures, escrow donation pipelines, and content nodes.
          </p>
        </div>
        
        {/* Action Controls */}
        <div className="flex gap-3 shrink-0">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm">
            Export Dataset
          </button>
          <button className="bg-[#5a1fb5] hover:bg-[#4a1895] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Entry
          </button>
        </div>
      </div>

      {/* Control Strip: Interactive Filter Engine */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Animated Tabs Selector */}
        <div className="flex p-1 bg-gray-50 rounded-xl w-full lg:w-auto overflow-x-auto relative z-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 rounded-lg text-xs font-black tracking-wide uppercase whitespace-nowrap transition-colors duration-200 z-10 ${
                  isActive ? 'text-[#5a1fb5]' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10 border border-gray-100"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Realtime Context Search */}
        <div className="relative w-full lg:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search matching entries or nodes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-gray-100 text-xs font-bold outline-none transition-all placeholder-gray-400"
          />
        </div>
      </div>

      {/* Main Table Interface Workspace */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title / Origin Creator</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type Architecture</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Flag</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Temporal Date</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Metrics Engagement</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredContent.length > 0 ? (
                  filteredContent.map((item) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      key={item.id} 
                      className="hover:bg-gray-50/40 transition-colors group"
                    >
                      {/* Title & Creator */}
                      <td className="py-4 px-6">
                        <div className="max-w-xs md:max-w-md">
                          <p className="text-sm font-black text-gray-900 tracking-tight truncate">{item.title}</p>
                          <p className="text-xs font-bold text-gray-400 mt-0.5">by {item.creator}</p>
                        </div>
                      </td>
                      
                      {/* Architecture Type */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'Event' ? 'bg-[#5a1fb5]' : 'bg-[#f2378f]'}`} />
                          <span className="text-xs font-bold text-gray-700">{item.type}</span>
                        </div>
                      </td>
                      
                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          item.status === 'Published' || item.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : item.status === 'Pending Review'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      
                      {/* Temporal Target Date */}
                      <td className="py-4 px-6 text-xs font-bold text-gray-500 font-['Space_mono',monospace]">
                        {item.date}
                      </td>
                      
                      {/* Metric Value */}
                      <td className="py-4 px-6 text-xs font-black text-gray-800 font-['Space_mono',monospace]">
                        {item.engagement}
                      </td>
                      
                      {/* Utility Row Action Layer */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors" title="Audit Verification">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-[#5a1fb5] rounded-lg hover:bg-[#5a1fb5]/5 transition-colors" title="Modify Config">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-[#f2378f] rounded-lg hover:bg-[#f2378f]/5 transition-colors" title="Purge Record">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <td colSpan={6} className="py-12 text-center text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/20">
                      Zero operational nodes found matching query criteria
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Flat Pagination Footer */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs font-bold text-gray-400">
            Showing {filteredContent.length} of {MOCK_CONTENT.length} records active
          </span>
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-300 cursor-not-allowed border border-transparent" disabled>Prev</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-black bg-white border border-gray-200 text-[#5a1fb5] shadow-sm">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">2</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}