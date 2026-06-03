import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductModules() {
  const [activeTab, setActiveTab] = useState('tickets');

  const ticketModuleData = [
    { icon: "🎫", title: "Multi-Tier Control", desc: "Configure Regular and VIP tiers seamlessly with distinct dynamic limits." },
    { icon: "📱", title: "Encrypted QR Passports", desc: "Every ticket generates an immutable signature asset dispatched directly to emails." },
    { icon: "🛡️", title: "Atomic Verification", desc: "Venues utilize real-time scanners with verification locks to prevent fraud." }
  ];

  const donationModuleData = [
    { icon: "💝", title: "Social Proof Feed", desc: "Live visibility of contributors, custom supportive notes, and name masking options." },
    { icon: "📊", title: "Milestone Metric Trackers", desc: "Real-time indicators update immediately to accelerate organic crowdfunding traction." },
    { icon: "⚡", title: "Localized Gateways", desc: "Deep integrations with direct localized bank corridors, debit cards, and mobile wallets." }
  ];

  // Shared scroll configuration parameters
  const scrollViewportSettings = { once: true, margin: "-100px" };

  // Stagger wrapper configurations for the grid item entries
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-white text-pulse-text-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header Display Section (Fades and moves up on scroll) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewportSettings}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-pulse-text-dark">
            One Platform. <span className="text-transparent bg-clip-text bg-pulse-gradient">Two Engines.</span>
          </h2>
          <p className="text-lg text-pulse-text-dark/60 font-medium">
            Whether selling out arenas or crowdfunding community priorities, eliminate informal cash workflows with tailored tools.
          </p>
        </motion.div>

        {/* --- Tab Switcher Layer (Smooth pop-in on view) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollViewportSettings}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center mb-16"
        >
          <div className="bg-pulse-bg-light p-1.5 rounded-2xl flex items-center border border-gray-200/60 shadow-sm relative">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`relative px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-colors z-10 ${activeTab === 'tickets' ? 'text-white' : 'text-pulse-text-dark/60'}`}
            >
              Ticketed Events
              {activeTab === 'tickets' && (
                <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-pulse-gradient rounded-xl -z-10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`relative px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-colors z-10 ${activeTab === 'donations' ? 'text-white' : 'text-pulse-text-dark/60'}`}
            >
              Social Donations
              {activeTab === 'donations' && (
                <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-pulse-gradient rounded-xl -z-10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
            </button>
          </div>
        </motion.div>

        {/* --- Grid Content Cards Matrix Panel --- */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              exit={{ opacity: 0, y: -15, transition: { duration: 0.25 } }}
              viewport={scrollViewportSettings}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {(activeTab === 'tickets' ? ticketModuleData : donationModuleData).map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
                  className="bg-pulse-bg-light border border-gray-200/40 p-8 rounded-3xl shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-6 border border-gray-100">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-black text-pulse-text-dark mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-pulse-text-dark/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200/50 flex items-center text-xs font-bold tracking-wider text-pulse-purple-primary group cursor-pointer">
                    <span>EXPLORE ARCHITECTURE</span>
                    <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}