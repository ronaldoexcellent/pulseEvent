import React from 'react';
import { motion } from 'framer-motion';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Overview</h1>
        <p className="text-gray-500 font-medium mt-1">Welcome back. Here is the current platform status.</p>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Metric Card 1 */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32"
        >
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Users</span>
          <span className="text-4xl font-black text-gray-900">0</span>
        </motion.div>
        
        {/* Metric Card 2 */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32"
        >
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Events Created</span>
          <span className="text-4xl font-black text-gray-900">0</span>
        </motion.div>

        {/* Metric Card 3 */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32"
        >
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Donations Created</span>
          <span className="text-4xl font-black text-gray-900">0</span>
        </motion.div>

        {/* Metric Card 4 */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32"
        >
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Projects</span>
          <span className="text-4xl font-black text-gray-900">0</span>
        </motion.div>
        
        {/* Metric Card 5 */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32"
        >
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Approvals</span>
          <span className="text-4xl font-black text-gray-900">0</span>
        </motion.div>
      </div>

      {/* Main Workspace Area */}
      <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm min-h-[400px]">
        <h2 className="text-xs font-black text-[#5a1fb5] uppercase tracking-widest flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#f2378f]"></span>
          Recent Activity Log
        </h2>
        
        {/* Empty State / Loading State Placeholder */}
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-100 rounded-2xl bg-[#f7f7fa]/50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-300 mb-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <p className="text-sm font-bold text-gray-400">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}