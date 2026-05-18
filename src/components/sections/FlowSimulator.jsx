import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlowSimulator() {
  const [selectedWorkflow, setSelectedWorkflow] = useState('ticket'); 
  const [simState, setSimState] = useState('idle'); 

  const runSimulationWorkflow = () => {
    if (simState === 'processing') return;
    setSimState('processing');
    setTimeout(() => {
      setSimState('settled');
    }, 2500);
  };

  const resetSimulationWorkflow = () => {
    setSimState('idle');
  };

  // Shared viewport viewport configuration config to prevent animations from re-triggering repeatedly
  const scrollViewportSettings = { once: true, margin: "-100px" };

  return (
    <section className="py-24 bg-pulse-bg-light text-pulse-text-dark relative overflow-hidden border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header Section (Fades and moves up on scroll) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewportSettings}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-pulse-purple-primary uppercase bg-pulse-purple-primary/10 px-4 py-1.5 rounded-full">
            Instant Settlements Engine
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4 mb-4 text-pulse-text-dark">
            Zero Friction. <span className="text-transparent bg-clip-text bg-pulse-gradient">Total Visibility.</span>
          </h2>
          <p className="text-lg text-pulse-text-dark/60 font-medium">
            Interact with our transactional routing simulator to observe how localized collection funds slice dynamically into your verified reserves.
          </p>
        </motion.div>

        {/* --- Interactive Playground Matrix Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Control Board Panel (Slides in from the left) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewportSettings}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-sm">
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/50 mb-3">
                Select Routing Architecture
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled={simState === 'processing'}
                  onClick={() => { setSelectedWorkflow('ticket'); resetSimulationWorkflow(); }}
                  className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${selectedWorkflow === 'ticket' ? 'bg-pulse-text-dark text-white shadow-md' : 'bg-pulse-bg-light text-pulse-text-dark/70 hover:bg-gray-200/50'}`}
                >
                  Ticket Purchase Flow
                </button>
                <button
                  disabled={simState === 'processing'}
                  onClick={() => { setSelectedWorkflow('donation'); resetSimulationWorkflow(); }}
                  className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${selectedWorkflow === 'donation' ? 'bg-pulse-text-dark text-white shadow-md' : 'bg-pulse-bg-light text-pulse-text-dark/70 hover:bg-gray-200/50'}`}
                >
                  Social Donation Routing
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="font-black text-lg tracking-tight text-pulse-text-dark">
                {selectedWorkflow === 'ticket' ? 'Ticket Sales Ledger Specifications' : 'Crowdfund Donation Split Rules'}
              </h4>
              <p className="text-sm font-medium text-pulse-text-dark/60 leading-relaxed">
                {selectedWorkflow === 'ticket' 
                  ? 'A customer checks out via local mobile money infrastructure. The baseline balance routes straight to your host vault reserve instantly, mapping secure platform execution charges separately.'
                  : 'Donation payloads land securely in verification status channels. Milestone distribution configurations automatically trigger alerts across global live notification modules.'}
              </p>

              <div className="pt-2">
                {simState === 'idle' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={runSimulationWorkflow}
                    className="w-full py-4 bg-pulse-gradient text-white font-bold text-sm rounded-xl shadow-lg shadow-pulse-purple-primary/20"
                  >
                    Execute Payload Simulation
                  </motion.button>
                )}
                {simState === 'processing' && (
                  <div className="w-full py-4 bg-gray-100 text-pulse-text-dark/40 font-bold text-sm rounded-xl text-center border border-dashed border-gray-300 flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-pulse-purple-primary" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Routing Atomic Transaction Ledger...
                  </div>
                )}
                {simState === 'settled' && (
                  <motion.button
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    onClick={resetSimulationWorkflow}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                  >
                    Reset Visualizer State 🔄
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Live Simulation Sandbox Screen View (Slides up and in from the right) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewportSettings}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-8 shadow-inner min-h-[460px] flex flex-col justify-between relative overflow-hidden"
          >
            
            {/* Top Wire Origin Row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="p-4 bg-pulse-bg-light border border-gray-200 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">💳</span>
                <div>
                  <p className="text-xs font-black text-pulse-text-dark/50 uppercase tracking-wide">Inbound Origin Channel</p>
                  <p className="text-sm font-black text-pulse-text-dark">
                    {selectedWorkflow === 'ticket' ? 'Customer Visa Entry' : 'Donor Mobile Money Account'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-pulse-text-dark/40 uppercase block tracking-wider">Payload Weight</span>
                <span className="text-2xl font-black text-pulse-purple-primary">
                  {selectedWorkflow === 'ticket' ? '₦15,000.00' : '₦25,000.00'}
                </span>
              </div>
            </div>

            {/* Central Transmission Tunnel Graphic */}
            <div className="my-8 relative h-16 border-y border-dashed border-gray-200 flex items-center justify-center">
              <AnimatePresence>
                {simState === 'processing' && (
                  <motion.div
                    initial={{ left: '0%', opacity: 0 }}
                    animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
                    className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pulse-gradient flex items-center justify-center shadow-lg shadow-pulse-pink-primary/40 z-20"
                  >
                    <span className="text-white text-xs font-bold">⚡</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="text-xs font-bold text-pulse-text-dark/30 tracking-widest uppercase relative z-0">
                {simState === 'idle' ? 'STANDBY PIPELINE IDLE' : simState === 'processing' ? 'TRANSMITTING DIGITAL RESERVES' : 'DISTRIBUTION COMPLETE'}
              </span>
            </div>

            {/* Bottom Target Destination Split Blocks */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              
              {/* Box A: Host Core Wallet */}
              <motion.div 
                animate={{ 
                  borderColor: simState === 'settled' ? '#5a1fb5' : '#e5e7eb',
                  backgroundColor: simState === 'settled' ? '#f7f7fa' : '#ffffff'
                }}
                className="p-5 border-2 rounded-2xl transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏦</span>
                  <span className="text-xs font-black text-pulse-text-dark/60 uppercase tracking-wider">Your Balance Vault</span>
                </div>
                <div className="text-xl font-black text-pulse-text-dark">
                  {simState === 'settled' 
                    ? (selectedWorkflow === 'ticket' ? '₦14,400.00' : '₦23,875.00')
                    : '₦0.00'
                  }
                </div>
                <p className="text-[10px] font-bold text-pulse-text-dark/40 mt-1">
                  {selectedWorkflow === 'ticket' ? '96% Core Ticket Yield Net' : '95.5% Direct Campaign Settlement'}
                </p>
              </motion.div>

              {/* Box B: Escrow Platform Execution Fee */}
              <motion.div 
                animate={{ 
                  borderColor: simState === 'settled' ? '#f2378f' : '#e5e7eb',
                  backgroundColor: simState === 'settled' ? '#f7f7fa' : '#ffffff'
                }}
                className="p-5 border-2 rounded-2xl transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🛡️</span>
                  <span className="text-xs font-black text-pulse-text-dark/60 uppercase tracking-wider">Platform Protection</span>
                </div>
                <div className="text-xl font-black text-pulse-text-dark">
                  {simState === 'settled' 
                    ? (selectedWorkflow === 'ticket' ? '₦600.00' : '₦1,125.00')
                    : '₦0.00'
                  }
                </div>
                <p className="text-[10px] font-bold text-pulse-text-dark/40 mt-1">
                  {selectedWorkflow === 'ticket' ? '4% Fixed Gateway Access Fee' : '4.5% Operations Custody Charge'}
                </p>
              </motion.div>

            </div>

            {/* Absolute Watermark Verification Stamp */}
            <AnimatePresence>
              {simState === 'settled' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 m-auto w-56 h-16 bg-emerald-100 border-2 border-emerald-500 rounded-xl flex items-center justify-center pointer-events-none z-30 shadow-xl shadow-emerald-900/10"
                >
                  <span className="text-emerald-700 text-sm font-black tracking-widest uppercase">
                    🔒 ATOMIC SETTLEMENT SUCCESS
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>

      </div>
    </section>
  );
}