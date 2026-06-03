import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data representing ticket sales, donations, and payouts
const MOCK_TRANSACTIONS = [
  { id: 'TXN-8992A', user: 'Ossai Jane', type: 'Payout', amount: '₦150,000', fee: '₦0', status: 'Completed', date: 'May 24, 2026' },
  { id: 'TXN-8991B', user: 'Samuel O.', type: 'Ticket Purchase', amount: '₦5,000', fee: '₦250', status: 'Completed', date: 'May 24, 2026' },
  { id: 'TXN-8990C', user: 'Barr. Adebayo Alex.U', type: 'Donation', amount: '₦50,000', fee: '₦1,500', status: 'Pending', date: 'May 23, 2026' },
  { id: 'TXN-8989D', user: 'Chidi E.', type: 'Ticket Purchase', amount: '₦15,000', fee: '₦750', status: 'Failed', date: 'May 23, 2026' },
];

export default function AdminFinancialsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Financials</h1>
          <p className="text-gray-500 font-medium mt-1">Monitor platform revenue, donations, and user payouts.</p>
        </div>
        
        {/* Action Buttons */}
        <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Report
        </button>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ y: -2 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-20 h-20"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest relative z-10">Total Processed</span>
          <span className="text-3xl font-black text-gray-900 relative z-10">₦0.00</span>
        </motion.div>
        
        <motion.div whileHover={{ y: -2 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Revenue (Fees)</span>
          <span className="text-3xl font-black text-green-600">₦0.00</span>
        </motion.div>
        
        <motion.div whileHover={{ y: -2 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Payouts</span>
          <span className="text-3xl font-black text-orange-500">₦0.00</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Successful Transactions</span>
          <span className="text-3xl font-black text-gray-900">0</span>
        </motion.div>
      </div>

      {/* Controls: Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search by Transaction ID or User..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#5a1fb5]/20 text-sm font-medium outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
          <select className="bg-gray-50 text-gray-600 border-none text-sm font-bold rounded-xl py-3 px-4 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
            <option>All Types</option>
            <option>Ticket Purchases</option>
            <option>Donations</option>
            <option>Payouts</option>
          </select>
          <select className="bg-gray-50 text-gray-600 border-none text-sm font-bold rounded-xl py-3 px-4 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID & Date</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Details</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount & Fee</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((txn, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={txn.id} 
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-black text-gray-900">{txn.id}</p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{txn.date}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-gray-700">{txn.user}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-bold text-gray-600">{txn.type}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-black text-gray-900">{txn.amount}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Fee: {txn.fee}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      txn.status === 'Completed' 
                        ? 'bg-green-50 text-green-600' 
                        : txn.status === 'Pending'
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#5a1fb5] rounded-lg hover:bg-[#5a1fb5]/10 transition-colors" title="View Receipt">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}