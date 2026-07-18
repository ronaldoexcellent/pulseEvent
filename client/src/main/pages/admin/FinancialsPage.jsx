import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_TRANSACTIONS = [
  { id: 'TXN-8992A', user: 'Ossai Jane', type: 'Payout', amount: 150000, fee: 0, status: 'Completed', date: 'May 24, 2026' },
  { id: 'TXN-8991B', user: 'Samuel O.', type: 'Ticket Purchase', amount: 5000, fee: 250, status: 'Completed', date: 'May 24, 2026' },
  { id: 'TXN-8990C', user: 'Barr. Adebayo Alex.U', type: 'Donation', amount: 50000, fee: 1500, status: 'Pending', date: 'May 23, 2026' },
  { id: 'TXN-8989D', user: 'Chidi E.', type: 'Ticket Purchase', amount: 15000, fee: 750, status: 'Failed', date: 'May 23, 2026' },
];

export default function AdminFinancialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Compute live metrics from dataset
  const totalProcessed = MOCK_TRANSACTIONS
    .filter(t => t.status === 'Completed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const platformRevenue = MOCK_TRANSACTIONS
    .filter(t => t.status === 'Completed')
    .reduce((acc, curr) => acc + curr.fee, 0);

  const pendingPayouts = MOCK_TRANSACTIONS
    .filter(t => t.status === 'Pending' && t.type === 'Payout')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const successfulCount = MOCK_TRANSACTIONS.filter(t => t.status === 'Completed').length;

  // Multi-tier filtering engine
  const filteredTransactions = MOCK_TRANSACTIONS.filter((txn) => {
    const matchesSearch = 
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      typeFilter === 'All Types' || 
      txn.type === typeFilter;
      
    const matchesStatus = 
      statusFilter === 'All Status' || 
      txn.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Currency Formatter Utility
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase font-['Space_mono',monospace]">Financials</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Monitor platform revenue, escrow asset allocations, and developer payouts.</p>
        </div>
        
        <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 self-start sm:self-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export Ledger
        </button>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1 */}
        <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gray-900" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Gross Volume</span>
          <span className="text-3xl font-black text-gray-900 tracking-tight font-['Space_mono',monospace]">{formatCurrency(totalProcessed)}</span>
        </motion.div>
        
        {/* Card 2 */}
        <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5a1fb5] to-[#7c3aed]" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Revenue Pipeline</span>
          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] to-[#7c3aed] tracking-tight font-['Space_mono',monospace]">{formatCurrency(platformRevenue)}</span>
        </motion.div>
        
        {/* Card 3 */}
        <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-500" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Escrow Hold / Pending Payouts</span>
          <span className="text-3xl font-black text-amber-600 tracking-tight font-['Space_mono',monospace]">{formatCurrency(pendingPayouts)}</span>
        </motion.div>

        {/* Card 4 */}
        <motion.div whileHover={{ y: -3 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#f2378f]" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Successful Settlements</span>
          <span className="text-3xl font-black text-gray-900 tracking-tight font-['Space_mono',monospace]">{successfulCount}</span>
        </motion.div>
      </div>

      {/* Control Strip Section */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Query Input */}
        <div className="relative w-full md:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search by Transaction ID or Identity..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-gray-100 text-xs font-bold outline-none transition-all placeholder-gray-400"
          />
        </div>
        
        {/* Dynamic Select Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-auto bg-gray-50 text-gray-700 border border-transparent text-xs font-black uppercase tracking-wider rounded-xl py-2.5 px-4 outline-none cursor-pointer hover:bg-gray-100 focus:bg-white focus:border-gray-200 transition-all"
          >
            <option>All Types</option>
            <option>Ticket Purchase</option>
            <option>Donation</option>
            <option>Payout</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto bg-gray-50 text-gray-700 border border-transparent text-xs font-black uppercase tracking-wider rounded-xl py-2.5 px-4 outline-none cursor-pointer hover:bg-gray-100 focus:bg-white focus:border-gray-200 transition-all"
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      {/* Ledger Table Matrix Workspace */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Signature / Date</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Origin</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Classification</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Gross Target / Platform Fee</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Network Frame Status</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((txn) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.15 }}
                      key={txn.id} 
                      className="hover:bg-gray-50/40 transition-colors group"
                    >
                      {/* ID & Date */}
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-black text-gray-900 font-['Space_mono',monospace]">{txn.id}</p>
                          <p className="text-xs font-bold text-gray-400 mt-0.5">{txn.date}</p>
                        </div>
                      </td>
                      
                      {/* User Account */}
                      <td className="py-4 px-6 text-xs font-bold text-gray-700">
                        {txn.user}
                      </td>
                      
                      {/* Classification Type */}
                      <td className="py-4 px-6">
                        <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md ${
                          txn.type === 'Payout' ? 'bg-[#5a1fb5]/5 text-[#5a1fb5]' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {txn.type}
                        </span>
                      </td>
                      
                      {/* Amount & Fee */}
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-black text-gray-900 font-['Space_mono',monospace]">{formatCurrency(txn.amount)}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mt-0.5">Fee: {formatCurrency(txn.fee)}</p>
                        </div>
                      </td>
                      
                      {/* Status Node Flag */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          txn.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : txn.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-rose-50 text-rose-700 border border-rose-100'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                      
                      {/* Interactive Audit Action */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors" title="Download Audit Receipt">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <td colSpan={6} className="py-12 text-center text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/10">
                      No matching records found in this financial partition
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}