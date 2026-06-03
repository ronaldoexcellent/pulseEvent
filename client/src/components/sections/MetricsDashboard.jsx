import React from 'react';
import { motion } from 'framer-motion';

export default function MetricsDashboard() {
  const metricCards = [
    {
      value: "₦150M+",
      label: "Total Volume Processed",
      detail: "Securely routed across regional nodes.",
      icon: "📈",
      accent: "from-pulse-purple-primary/20 to-pulse-purple-secondary/5"
    },
    {
      value: "45,000+",
      label: "Tickets Scanned Validated",
      detail: "Zero duplicate access failures recorded.",
      icon: "🎫",
      accent: "from-pulse-pink-primary/20 to-pulse-pink-accent/5"
    },
    {
      value: "1,200+",
      label: "Verified Event Organizers",
      detail: "Trust-mapped via identity confirmation.",
      icon: "🛡️",
      accent: "from-emerald-500/20 to-emerald-500/5"
    },
    {
      value: "99.98%",
      label: "API Gateway Uptime",
      detail: "Atomic transactional execution architecture.",
      icon: "⚡",
      accent: "from-blue-500/20 to-blue-500/5"
    }
  ];

  const scrollViewportSettings = { once: true, margin: "-80px" };

  // Stagger parameters for sequential metric card loading entries
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="py-24 bg-white text-pulse-text-dark relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Section Header Layout Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewportSettings}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="text-xs font-black tracking-widest text-pulse-pink-primary uppercase bg-pulse-pink-primary/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Platform Integrity Ledger
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-pulse-text-dark">
              Engineered for <span className="text-transparent bg-clip-text bg-pulse-gradient">Scale.</span> Trust by Default.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewportSettings}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <p className="text-base sm:text-lg text-pulse-text-dark/60 font-medium leading-relaxed">
              We monitor every atomic settlement, ticketing validation sequence, and donor distribution loop across the continent to maintain absolute transparent uptime logs.
            </p>
          </motion.div>
        </div>

        {/* --- Metrics Dashboard Interactive Cards Stagger Grid --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={scrollViewportSettings}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metricCards.map((card) => (
            <motion.div
              key={card.label}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02, 
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" 
              }}
              className="bg-pulse-bg-light border border-gray-200/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
            >
              {/* Dynamic decorative backdrop gradient mesh overlay on card hover triggers */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`} />

              <div>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-xl mb-6 transition-transform duration-300 group-hover:scale-110">
                  {card.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-pulse-text-dark tracking-tight mb-2">
                  {card.value}
                </h3>
                <p className="text-sm font-bold text-pulse-text-dark/80 tracking-tight mb-1">
                  {card.label}
                </p>
              </div>

              <p className="text-xs font-medium text-pulse-text-dark/50 mt-4 pt-4 border-t border-gray-200/60 leading-normal">
                {card.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Subtle Ecosystem Live Status Ticker Banner --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewportSettings}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-pulse-bg-light border border-gray-200/60 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-pulse-text-dark/70">
              Operational Real-time Node Status: All Systems Operational
            </span>
          </div>
          <a 
            href="/status" 
            className="text-xs font-black uppercase tracking-widest text-pulse-purple-primary hover:text-pulse-purple-secondary transition-colors flex items-center gap-1"
          >
            View Live Logs 📊
          </a>
        </motion.div>

      </div>
    </section>
  );
}