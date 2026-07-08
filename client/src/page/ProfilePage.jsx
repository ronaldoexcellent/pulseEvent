import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock Data
  const [user] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Event Organizer & Creator',
    joinDate: 'March 2026',
  });

  const [transactions] = useState([
    { id: 'TXN-001', type: 'Ticket Sale', event: 'Tech Hub Africa', amount: 150.00, date: 'Today, 2:30 PM', status: 'Completed' },
    { id: 'TXN-002', type: 'Withdrawal', event: 'Bank Transfer', amount: -500.00, date: 'May 20, 2026', status: 'Completed' },
    { id: 'TXN-003', type: 'Donation', event: 'Medical Relief Fund', amount: 25.00, date: 'May 18, 2026', status: 'Completed' },
    { id: 'TXN-004', type: 'Ticket Sale', event: 'Code Bootcamp', amount: 100.00, date: 'May 15, 2026', status: 'Completed' },
  ]);

  // Simulate initial fetch loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7fa] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-950 tracking-tighter">
            User <span className="text-transparent bg-clip-text bg-pulse-gradient">Profile</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-2">
            Manage your personal information, wallet, and recent activities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm"
            >
              {isLoading ? (
                <div className="animate-pulse flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                  <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2" />
                  <div className="h-5 bg-gray-200 rounded-md w-1/2 mb-4" />
                  <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-1 mt-2" />
                  <div className="h-3 bg-gray-200 rounded-md w-1/3" />
                  <div className="w-full h-10 bg-gray-100 rounded-xl mt-8 pt-6" />
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#5a1fb5] to-[#f2378f] text-white flex items-center justify-center font-black text-3xl mb-4 shadow-lg shadow-[#5a1fb5]/20">
                      JD
                    </div>
                    <h2 className="text-xl font-black text-gray-950 tracking-tight">{user.name}</h2>
                    <p className="text-xs font-bold text-[#5a1fb5] uppercase tracking-widest mt-1 bg-[#5a1fb5]/10 px-3 py-1 rounded-lg">
                      {user.role}
                    </p>
                    <p className="text-sm text-gray-500 font-medium mt-4">{user.email}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">Joined {user.joinDate}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex justify-center items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                </>
              )}
            </motion.div>

            {/* Wallet / Balance Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gray-950 p-8 rounded-[32px] shadow-xl shadow-gray-950/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-[#f2378f]/20 blur-2xl" />
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-[#5a1fb5]/20 blur-2xl" />

              <div className="relative z-10">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-3 bg-gray-800 rounded w-1/3" />
                      <div className="w-6 h-6 rounded-full bg-gray-800" />
                    </div>
                    <div className="h-10 bg-gray-800 rounded-md w-3/4 mb-3" />
                    <div className="h-3 bg-gray-800 rounded w-1/2 mb-8" />
                    <div className="w-full h-12 bg-gray-800 rounded-xl" />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Available Balance</h3>
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                      </svg>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-1">
                      ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </h2>
                    <p className="text-gray-400 text-xs font-medium mb-8">
                      Total Lifetime Earnings: ${user.totalEarned.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>

                    <button className="w-full py-4 bg-white text-gray-950 hover:bg-gray-100 rounded-xl text-sm font-black uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Withdraw Funds
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Transactions & Support */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-xl font-black text-gray-950 tracking-tight">Recent Activity</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">Your latest transaction history.</p>
                </div>
                {!isLoading && (
                  <button className="text-xs font-bold text-[#5a1fb5] uppercase tracking-widest hover:text-[#f2378f] transition-colors">
                    View All
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {isLoading ? (
                  // Array template loop for individual transaction row skeletons
                  [1, 2, 3, 4].map((index) => (
                    <div key={index} className="animate-pulse flex items-center justify-between p-4 border border-transparent">
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                        <div className="w-1/2 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="w-16 space-y-2 flex flex-col items-end">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))
                ) : (
                  transactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${txn.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {txn.amount > 0 ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm font-bold text-gray-950">{txn.event}</p>
                          <p className="text-xs font-medium text-gray-500">{txn.type} • {txn.date}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`text-sm font-black ${txn.amount > 0 ? 'text-green-600' : 'text-gray-950'}`}>
                          {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount).toFixed(2)}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{txn.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
            
            {/* Support Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {isLoading ? (
                // Bottom link item skeletons
                [1, 2].map((index) => (
                  <div key={index} className="animate-pulse flex items-center gap-5 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm">
                    <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0" />
                    <div className="w-full space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <Link 
                    to="/support" 
                    className="flex items-center gap-5 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md hover:border-[#5a1fb5]/30 transition-all group text-left"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#5a1fb5]/10 text-[#5a1fb5] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.43 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-black text-gray-950">Contact Support</h4>
                      <p className="text-xs text-gray-500 font-medium mt-1">Need help? Get in touch with our team.</p>
                    </div>
                  </Link>

                  <Link 
                    to="/feedback" 
                    className="flex items-center gap-5 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md hover:border-[#f2378f]/30 transition-all group text-left"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#f2378f]/10 text-[#f2378f] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-black text-gray-950">Leave Feedback</h4>
                      <p className="text-xs text-gray-500 font-medium mt-1">Help us improve your experience.</p>
                    </div>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}