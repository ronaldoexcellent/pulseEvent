import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { label: "Total Users", value: "1,240", change: "+12% this week", color: "from-[#5a1fb5] to-[#7c3aed]", icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" },
  { label: "Total Events Created", value: "84", change: "+4% this week", color: "from-[#f2378f] to-[#ff60b6]", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" },
  { label: "Total Donations Pool", value: "₦4.2M", change: "+28% tokens", color: "from-[#5a1fb5] to-[#f2378f]", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5H4.5V21m-1.5 0h18" },
  { label: "Active Projects", value: "31", change: "Stable velocity", color: "from-gray-900 to-gray-700", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
  { label: "Pending Approvals", value: "6", change: "Requires action", color: "from-amber-500 to-orange-600", icon: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function AdminOverviewPage() {
  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase font-['Space_mono',monospace]">
            Overview
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Real-time infrastructure health metrics and operation state updates.
          </p>
        </div>
        <div className="text-xs font-bold text-gray-400 bg-white border border-gray-200 px-4 py-2 rounded-xl self-start md:self-auto shadow-sm">
          System Pulse: <span className="text-emerald-500 animate-pulse">● Operational</span>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
      >
        {metrics.map((metric, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-40 group relative overflow-hidden transition-shadow hover:shadow-md"
          >
            {/* Minimal Subtle Color Strip Accent */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${metric.color}`} />
            
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block max-w-[80%]">
                {metric.label}
              </span>
              <div className="text-gray-400 group-hover:text-gray-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} />
                </svg>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-3xl font-black text-gray-900 tracking-tight font-['Space_mono',monospace]">
                {metric.value}
              </span>
              <span className="text-[11px] font-bold text-gray-400 block mt-1">
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Workspace Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Log Component */}
        <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2378f]"></span>
              Live Platform Engine Audit Log
            </h2>
            <button className="text-xs font-bold text-[#5a1fb5] hover:underline">
              View Analytics
            </button>
          </div>
          
          {/* High Fidelity Feed Timeline */}
          <div className="space-y-4 flex-1">
            {[
              { title: "New Charity Event Node Deployed", desc: "User @obi_v3 initialized 'Lagos Tech Meet' ticketing verification keys.", time: "4m ago", status: "Success" },
              { title: "Escrow Target Block Achieved", desc: "Campaign 'Clean Water Initiative' collected ₦1,200,000 threshold requirement.", time: "12m ago", status: "Complete" },
              { title: "Disbursement Vault Execution Flag", desc: "Anti-fraud monitoring triggered micro-velocity validation scan for Tx_9482.", time: "1h ago", status: "Audit Passed" }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#f7f7fa]/50 border border-transparent hover:border-gray-100 transition-all">
                <div className="w-2 h-2 rounded-full bg-[#5a1fb5] mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-gray-400 block">{activity.time}</span>
                  <span className="text-[9px] font-black tracking-wider uppercase text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Sub-Section Card Panel */}
        <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">
              Escrow Core Liquidity
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-[#f7f7fa] rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Locked Value</span>
                <span className="text-2xl font-black text-gray-900 font-['Space_mono',monospace] mt-1 block">₦18,450,000</span>
              </div>
              <div className="p-4 bg-[#f7f7fa] rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Net Revenue Fee Reserve</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] to-[#f2378f] font-['Space_mono',monospace] mt-1 block">₦1,104,200</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 mt-6">
            <button className="w-full py-3 bg-[#5a1fb5] hover:bg-[#4a1996] text-white text-xs font-bold rounded-xl transition-colors tracking-widest uppercase">
              Trigger Core Ledger Audit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}