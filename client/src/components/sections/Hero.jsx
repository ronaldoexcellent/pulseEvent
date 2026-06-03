import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const rotatingWords = ["Event", "Campaign", "Moment", "Gathering"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-pulse-bg-light flex items-center justify-center overflow-hidden pt-10 lg:pt-0">
      
      {/* --- Animated Background Elements --- */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-pulse-purple-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-72 h-72 bg-pulse-pink-primary/10 rounded-full blur-3xl" 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className="absolute top-40 right-1/4 w-32 h-32 bg-pulse-purple-secondary/20 rounded-full blur-2xl" 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* --- Left Column: Copy & CTAs --- */}
        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-pulse-text-dark tracking-tight leading-[1.1] mb-6">
            Feel the Pulse <br className="hidden lg:block" />
            of Every <br className="block lg:hidden" />
            <span className="text-transparent bg-clip-text bg-pulse-gradient inline-flex flex-col h-[1.2em] overflow-hidden align-bottom relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="block"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-md sm:text-xl text-pulse-text-dark/70 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium">
            Replace "send me your account number" with professional, secure links. The premier pan-African platform for ticketed events and social donation campaigns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <motion.a 
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/create-event" 
              className="w-full sm:w-auto px-8 py-4 bg-pulse-gradient text-white font-bold rounded-xl shadow-lg shadow-pulse-purple-primary/30 transition-shadow hover:shadow-pulse-purple-primary/50 text-center"
            >
              Create an Event
            </motion.a>
            <motion.a 
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/explore" 
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-pulse-text-dark/10 hover:border-pulse-purple-primary text-pulse-text-dark font-bold rounded-xl shadow-sm text-center transition-colors hover:bg-pulse-bg-light"
            >
              Explore Campaigns
            </motion.a>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-10 pt-8 border-t border-gray-200 flex items-center justify-center lg:justify-start gap-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-black text-pulse-purple-primary">10k+</p>
              <p className="text-sm font-semibold text-pulse-text-dark/60">Tickets Sold</p>
            </motion.div>
            <div className="w-px h-10 bg-gray-300"></div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-black text-pulse-pink-primary">₦50M+</p>
              <p className="text-sm font-semibold text-pulse-text-dark/60">Funds Raised</p>
            </motion.div>
            <div className="w-px h-10 bg-gray-300"></div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-black text-pulse-purple-secondary">99%</p>
              <p className="text-sm font-semibold text-pulse-text-dark/60">Secure Scans</p>
            </motion.div>
          </div>
        </motion.div>

        {/* --- Right Column: Visual Mockup / Interactive Element --- */}
        <motion.div 
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          
          {/* Main Mockup Card */}
          <motion.div 
            className="relative bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 z-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            initial={{ rotate: -2 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            
            {/* Header of Mockup */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-pulse-gradient p-[2px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">🕺</span>
                </div>
              </div>
              <div>
                <h3 className="font-black text-pulse-text-dark leading-tight">Lagos Tech Fest 2026</h3>
                <p className="text-sm text-pulse-text-dark/60 font-medium">By PulseNetwork</p>
              </div>
            </div>

            {/* Faux Image/QR Area */}
            <div className="w-full aspect-[4/3] bg-pulse-bg-light rounded-xl mb-6 relative overflow-hidden group flex items-center justify-center border border-gray-100">
               <div className="absolute inset-0 bg-pulse-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
               <motion.div 
                 className="w-32 h-32 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center p-2 relative z-10"
                 whileHover={{ scale: 1.05, rotate: 2 }}
               >
                 <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 opacity-80">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`bg-pulse-purple-primary ${i % 3 === 0 || i % 5 === 0 ? 'opacity-20' : 'opacity-100'} rounded-sm`} />
                    ))}
                 </div>
               </motion.div>
            </div>

            {/* Faux Progress/Ticket Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-pulse-text-dark">
                <span>VIP Tickets</span>
                <span className="text-pulse-purple-primary">85% Sold</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-pulse-gradient rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 py-3 bg-pulse-text-dark hover:bg-black text-white font-bold rounded-xl transition-colors text-sm"
            >
              Get Ticket • ₦15,000
            </motion.button>
          </motion.div>

          {/* Secondary Floating Card */}
          <motion.div 
            className="absolute -bottom-10 -right-6 lg:-right-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-30"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            initial={{ rotate: 6 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <p className="text-sm font-black text-pulse-text-dark">Payment Verified</p>
                <p className="text-xs font-semibold text-pulse-purple-primary">Just now</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}