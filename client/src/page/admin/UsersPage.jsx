import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for structural layout purposes
const MOCK_USERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Organizer', status: 'Active', joined: 'May 12, 2026' },
  { id: 2, name: 'Sarah Williams', email: 'sarah.w@example.com', role: 'User', status: 'Active', joined: 'May 18, 2026' },
  { id: 3, name: 'Michael Chen', email: 'm.chen@example.com', role: 'Admin', status: 'Active', joined: 'Jan 10, 2026' },
  { id: 4, name: 'Emma Davis', email: 'emma.d@example.com', role: 'User', status: 'Suspended', joined: 'Apr 02, 2026' },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">User Management</h1>
          <p className="text-gray-500 font-medium mt-1">View, edit, and manage platform members.</p>
        </div>
        
        {/* Action Buttons */}
        <button className="bg-[#5a1fb5] hover:bg-[#4a1895] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New User
        </button>
      </div>

      {/* Controls: Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-96">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#5a1fb5]/20 text-sm font-medium outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
          <select className="bg-gray-50 text-gray-600 border-none text-sm font-bold rounded-xl py-3 px-4 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Organizer</option>
            <option>User</option>
          </select>
          <select className="bg-gray-50 text-gray-600 border-none text-sm font-bold rounded-xl py-3 px-4 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
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
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Details</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined Date</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={user.id} 
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#5a1fb5]/10 text-[#5a1fb5] flex items-center justify-center font-black text-sm shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs font-medium text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-bold text-gray-700">{user.role}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.status === 'Active' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500">
                    {user.joined}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#5a1fb5] rounded-lg hover:bg-[#5a1fb5]/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-[#f2378f] rounded-lg hover:bg-[#f2378f]/10 transition-colors">
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
        
        {/* Pagination/Footer Placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs font-bold text-gray-500">Showing 4 of 42 users</span>
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