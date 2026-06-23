import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_USERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Organizer', status: 'Active', joined: 'May 12, 2026' },
  { id: 2, name: 'Sarah Williams', email: 'sarah.w@example.com', role: 'User', status: 'Active', joined: 'May 18, 2026' },
  { id: 3, name: 'Michael Chen', email: 'm.chen@example.com', role: 'Admin', status: 'Active', joined: 'Jan 10, 2026' },
  { id: 4, name: 'Emma Davis', email: 'emma.d@example.com', role: 'User', status: 'Suspended', joined: 'Apr 02, 2026' },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Calculated Metrics
  const metrics = [
    { label: 'Total Members', value: MOCK_USERS.length, color: 'text-gray-900' },
    { label: 'Active Nodes', value: MOCK_USERS.filter(u => u.status === 'Active').length, color: 'text-emerald-600' },
    { label: 'Admin Access', value: MOCK_USERS.filter(u => u.role === 'Admin').length, color: 'text-[#5a1fb5]' },
    { label: 'Suspended', value: MOCK_USERS.filter(u => u.status === 'Suspended').length, color: 'text-rose-600' },
  ];

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase font-['Space_mono',monospace]">User Management</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Audit permissions, orchestrate system identities, and monitor node states.</p>
        </div>
        
        <button className="bg-[#5a1fb5] hover:bg-[#4a1895] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 self-start sm:self-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Provision User
        </button>
      </div>

      {/* Overview Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Control Strip Module */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search by name, identity strings..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-gray-100 text-xs font-bold outline-none transition-all placeholder-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full lg:w-auto lg:ml-auto">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-full lg:w-auto bg-gray-50 text-gray-700 border border-transparent text-xs font-black uppercase tracking-wider rounded-xl py-2.5 px-4 outline-none cursor-pointer hover:bg-gray-100 focus:bg-white focus:border-gray-200 transition-all">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Organizer</option>
            <option>User</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full lg:w-auto bg-gray-50 text-gray-700 border border-transparent text-xs font-black uppercase tracking-wider rounded-xl py-2.5 px-4 outline-none cursor-pointer hover:bg-gray-100 focus:bg-white focus:border-gray-200 transition-all">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Ident member parameters</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Access Framework</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Network Node status</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Temporal Register Date</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.15 }}
                      key={user.id} 
                      className="hover:bg-gray-50/40 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 flex items-center justify-center font-black text-xs shrink-0 tracking-tighter">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900 tracking-tight">{user.name}</p>
                            <p className="text-xs font-bold text-gray-400 mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6"><span className={`inline-block text-xs font-black tracking-wide uppercase ${user.role === 'Admin' ? 'text-[#5a1fb5]' : 'text-gray-700'}`}>{user.role}</span></td>
                      <td className="py-4 px-6"><span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>{user.status}</span></td>
                      <td className="py-4 px-6 text-xs font-bold text-gray-500 font-['Space_mono',monospace]">{user.joined}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className="p-2 text-gray-400 hover:text-[#5a1fb5] rounded-lg hover:bg-[#5a1fb5]/5 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg></button>
                          <button className="p-2 text-gray-400 hover:text-[#f2378f] rounded-lg hover:bg-[#f2378f]/5 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><td colSpan={5} className="py-12 text-center text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/10">No matching identity structures found</td></motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs font-bold text-gray-400">Showing {filteredUsers.length} of {MOCK_USERS.length} registered units</span>
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-300 cursor-not-allowed border border-transparent" disabled>Prev</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-black bg-white border border-gray-200 text-[#5a1fb5] shadow-sm">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-100 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}