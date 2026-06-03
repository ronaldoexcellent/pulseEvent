import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data reflecting both events and donation campaigns
const MOCK_CONTENT = [
  { id: 1, title: 'OwlphaDAO AMA & Workshop', type: 'Event', creator: 'Ossai Jane', status: 'Published', date: 'Jul 05, 2026', engagement: '156 Tickets' },
  { id: 2, title: 'Community Medical Outreach', type: 'Donation', creator: 'Barr. Adebayo', status: 'Active', date: 'Ongoing', engagement: '₦450k Raised' },
  { id: 3, title: 'Next.js Dev Masterclass', type: 'Event', creator: 'Michael Chen', status: 'Pending Review', date: 'Jun 20, 2026', engagement: '0 Tickets' },
  { id: 4, title: 'Tech Startups Meetup', type: 'Event', creator: 'Emma Davis', status: 'Draft', date: 'Aug 15, 2026', engagement: '-' },
];

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = ['All', 'Events', 'Donations', 'Pending Review'];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Content & Events</h1>
          <p className="text-gray-500 font-medium mt-1">Manage user-generated events, campaigns, and platform content.</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm">
            Export Data
          </button>
          <button className="bg-[#5a1fb5] hover:bg-[#4a1895] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Content
          </button>
        </div>
      </div>

      {/* Controls: Search & Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex p-1 bg-gray-50 rounded-xl w-full xl:w-auto overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-white text-[#5a1fb5] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full xl:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search titles, creators..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#5a1fb5]/20 focus:ring-2 focus:ring-[#5a1fb5]/10 text-sm font-medium outline-none transition-all"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title & Creator</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date / Deadline</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Engagement</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CONTENT.map((item, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.id} 
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.title}</p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">by {item.creator}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.type === 'Event' ? 'bg-[#5a1fb5]' : 'bg-[#f2378f]'}`}></span>
                      <span className="text-sm font-bold text-gray-700">{item.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'Published' || item.status === 'Active'
                        ? 'bg-green-50 text-green-600' 
                        : item.status === 'Pending Review'
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500">
                    {item.date}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-700">
                    {item.engagement}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* View Action */}
                      <button className="p-2 text-gray-400 hover:text-[#5a1fb5] rounded-lg hover:bg-[#5a1fb5]/10 transition-colors" title="View Details">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      {/* Edit Action */}
                      <button className="p-2 text-gray-400 hover:text-[#5a1fb5] rounded-lg hover:bg-[#5a1fb5]/10 transition-colors" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      {/* Delete Action */}
                      <button className="p-2 text-gray-400 hover:text-[#f2378f] rounded-lg hover:bg-[#f2378f]/10 transition-colors" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs font-bold text-gray-500">Showing 4 of 128 items</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md text-xs font-bold text-gray-400 hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md text-xs font-bold bg-white border border-gray-200 text-[#5a1fb5] shadow-sm">1</button>
            <button className="px-3 py-1 rounded-md text-xs font-bold text-gray-500 hover:bg-gray-100">2</button>
            <button className="px-3 py-1 rounded-md text-xs font-bold text-gray-500 hover:bg-gray-100">3</button>
            <button className="px-3 py-1 rounded-md text-xs font-bold text-gray-500 hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}