import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, QrCode, Scan, Heart, Target, Wallet, ArrowRight } from 'lucide-react';

export default function ProductModules() {
  const ticketModuleData = [
    { 
      icon: <Sliders className="w-6 h-6 text-pulse-purple-primary" />, 
      title: "Flexible Ticket Tiers", 
      desc: "Set up Regular, VIP, or Early Bird tickets easily with customized pricing and limited slots.",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop" 
    },
    { 
      icon: <QrCode className="w-6 h-6 text-pulse-purple-primary" />, 
      title: "Instant Digital Passes", 
      desc: "Guests receive a secure QR ticket straight to their email immediately after payment.",
      image: "https://images.unsplash.com/photo-1662383729882-e03ce8e00887?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      icon: <Scan className="w-6 h-6 text-pulse-purple-primary" />, 
      title: "Stress-Free Check-ins", 
      desc: "Scan tickets at the door using any phone to keep queues moving and prevent duplicate entries.",
      image: "https://images.unsplash.com/photo-1703683971476-fada8eab40a6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const donationModuleData = [
    { 
      icon: <Heart className="w-6 h-6 text-pulse-pink-primary" />, 
      title: "Community Support Feed", 
      desc: "Showcase real-time contributions with custom goodwill notes, or let donors stay anonymous.",
      image: "https://images.unsplash.com/photo-1694286066866-4324f80d7906?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      icon: <Target className="w-6 h-6 text-pulse-pink-primary" />, 
      title: "Live Funding Goals", 
      desc: "Keep everyone motivated with visual progress bars that update instantly as donations come in.",
      image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      icon: <Wallet className="w-6 h-6 text-pulse-pink-primary" />, 
      title: "Everyday Local Payments", 
      desc: "Accept hassle-free local bank transfers, debit cards, and mobile wallets automatically.",
      image: "https://images.unsplash.com/photo-1608286022625-bc07f7a21154?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const scrollViewportSettings = { once: true, margin: "-50px" };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-white text-pulse-text-dark relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><defs><pattern id="dotted-pattern" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#dotted-pattern)"/></svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Main Header Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewportSettings}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-pulse-text-dark">
            One Platform. <span className="text-transparent bg-clip-text bg-pulse-gradient">Two Ways to Gather.</span>
          </h2>
          <p className="text-lg text-pulse-text-dark/60 font-medium leading-relaxed">
            From sold-out festivals to community fundraising, Pulse bridges the gap between organizers and attendees with secure, seamless localized payments.
          </p>
        </motion.div>

        {/* --- Ticketed Events Section --- */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewportSettings}
            transition={{ duration: 0.5 }}
            className="mb-10 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-pulse-purple-primary/10 flex items-center justify-center">
              <Sliders className="w-6 h-6 text-pulse-purple-primary" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-pulse-text-dark tracking-tight">Ticketed Events</h3>
              <p className="text-pulse-text-dark/60 font-medium">Tools to manage your crowd and scale your next big experience.</p>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={scrollViewportSettings}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {ticketModuleData.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                className="bg-pulse-bg-light border border-gray-100 p-6 rounded-3xl shadow-lg shadow-gray-50 flex flex-col transition-all duration-300"
              >
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 relative group border border-gray-100 shadow-inner bg-white">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pulse-bg-light/80 to-transparent opacity-60"></div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-black text-pulse-text-dark mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-pulse-text-dark/60 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center text-xs font-bold tracking-wider text-pulse-purple-primary group cursor-pointer hover:text-pulse-purple-secondary transition-colors">
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Divider --- */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-24"></div>

        {/* --- Social Donations Section --- */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewportSettings}
            transition={{ duration: 0.5 }}
            className="mb-10 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-pulse-pink-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-pulse-pink-primary" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-pulse-text-dark tracking-tight">Social Donations</h3>
              <p className="text-pulse-text-dark/60 font-medium">Transparent, socially-driven fundraising for causes that matter.</p>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={scrollViewportSettings}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {donationModuleData.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                className="bg-pulse-bg-light border border-gray-100 p-6 rounded-3xl shadow-lg shadow-gray-50 flex flex-col transition-all duration-300"
              >
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 relative group border border-gray-100 shadow-inner bg-white">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pulse-bg-light/80 to-transparent opacity-60"></div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-black text-pulse-text-dark mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-pulse-text-dark/60 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center text-xs font-bold tracking-wider text-pulse-pink-primary group cursor-pointer hover:text-pulse-pink-secondary transition-colors">
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}