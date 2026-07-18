import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // State
  const [balance, setBalance] = useState(4250.75);
  const [cashbackBalance, setCashbackBalance] = useState(1000.00); // 4% calculated from past events

  const [sellingEvents] = useState([
    { id: 1, title: 'Tech Hub Africa', date: 'June 25, 2026', sold: 45, total: 100, price: '$50' },
    { id: 2, title: 'Code Bootcamp', date: 'July 10, 2026', sold: 12, total: 50, price: '$200' },
  ]);

  const [soldEvents] = useState([
    { id: 3, title: 'Music Fest 2026', date: 'May 15, 2026', sold: 500, total: 500, revenue: '$25,000' },
  ]);

  const [donations] = useState([
    { id: 1, title: 'Medical Relief Fund', goal: '$5,000', raised: '$3,250', percent: 65 },
  ]);

  const handleClaimCashback = () => {
    setBalance(prev => prev + cashbackBalance);
    setCashbackBalance(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7fa] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
             <h1 className="text-4xl font-black tracking-tighter">Your <span className="text-transparent bg-clip-text bg-pulse-gradient">Dashboard.</span></h1>
            <p className="text-gray-500 font-medium mt-1">Welcome back, {user.firstname}. Here is your platform overview.</p>
          </div>
          <div className="flex gap-3">
             <Link to="/create-event-ticket" className="px-5 py-3 bg-[#5a1fb5] hover:bg-[#4a1998] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-[#5a1fb5]/20">
               New Event
             </Link>
          </div>
        </div>

        {/* Top Grid: Balance & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-1 bg-gray-950 p-8 rounded-[32px] text-white shadow-xl shadow-gray-950/20 relative overflow-hidden flex flex-col gap-6">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-[#f2378f]/20 blur-2xl" />
            
            {/* Main Balance */}
            <div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Available Balance</h3>
              <h2 className="text-4xl font-black tracking-tighter">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
            </div>

            {/* Cashback Balance */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Pending Cashback</h3>
                  <h2 className="text-[15px] font-black text-gray-600">${cashbackBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                </div>
                <button 
                  onClick={handleClaimCashback}
                  disabled={cashbackBalance === 0}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${cashbackBalance > 0 ? 'bg-pink-600 hover:bg-pink-500 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                >
                  {cashbackBalance > 0 ? 'Claim' : 'Claimed'}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Events</span>
              <span className="text-3xl font-black text-gray-950">2</span>
            </div>
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Donations Goal</span>
              <span className="text-3xl font-black text-green-600">$3,250</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <section>
              <h3 className="text-xl font-black text-gray-950 mb-4 flex items-center gap-2">
                Events Selling
                <span className="px-2 py-0.5 bg-[#5a1fb5]/10 text-[#5a1fb5] rounded-md text-[10px] uppercase font-black">{sellingEvents.length}</span>
              </h3>
              <div className="flex flex-col gap-4">
                {sellingEvents.map(event => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-black text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500 font-medium">{event.date} • {event.price}/ticket</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-[#5a1fb5]">{event.sold} / {event.total} Sold</p>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[#5a1fb5]" style={{ width: `${(event.sold/event.total)*100}%` }} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-black text-gray-950 mb-4">Past Events</h3>
              <div className="flex flex-col gap-4">
                {soldEvents.map(event => (
                  <div key={event.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center opacity-70">
                    <div>
                      <p className="font-bold text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500 font-medium">{event.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-950">{event.revenue}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Total Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="lg:col-span-1">
            <h3 className="text-xl font-black text-gray-950 mb-4">Open Donations</h3>
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6">
              {donations.map(donation => (
                <div key={donation.id} className="group">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-black text-gray-900 leading-tight">{donation.title}</p>
                    <span className="text-[10px] font-black text-[#f2378f] bg-[#f2378f]/10 px-2 py-0.5 rounded-lg">Active</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                    <div className="h-full bg-[#f2378f] rounded-full" style={{ width: `${donation.percent}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>{donation.raised} raised</span>
                    <span>Goal: {donation.goal}</span>
                  </div>
                </div>
              ))}
              <button className="mt-2 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs hover:border-[#5a1fb5] hover:text-[#5a1fb5] transition-colors">
                + Create New Donation
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}