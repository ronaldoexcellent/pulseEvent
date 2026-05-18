import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    engine: [
      { label: 'Ticketing Core', path: '/explore' },
      { label: 'Donation Channels', path: '/donations' },
      { label: 'Escrow Settlements', path: '/escrow-terms' },
      { label: 'Verification Logs', path: '/status' }
    ],
    developer: [
      { label: 'API Documentation', path: '/docs' },
      { label: 'Gateway Architecture', path: '/architecture' },
      { label: 'Open Source Ledger', path: '/open-source' },
      { label: 'System Webhooks', path: '/webhooks' }
    ],
    compliance: [
      { label: 'Privacy Protocol', path: '/privacy' },
      { label: 'Terms of Execution', path: '/terms' },
      { label: 'Fraud Prevention', path: '/security' },
      { label: 'Discussions Hub', path: '/support' }
    ]
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200/80 pt-20 pb-12 text-pulse-text-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Top Link Mapping Grid Grid Matrix --- */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 pb-16 border-b border-gray-200/60">
          
          {/* Brand Column Profile Summary */}
          <div className="col-span-2 md:col-span-4 flex flex-col space-y-4">
            <div>
              <span className="text-xl font-black tracking-tight text-pulse-text-dark">
                Pulse<span className="text-pulse-purple-primary">Event</span>
              </span>
              <p className="text-xs font-black tracking-wider text-pulse-text-dark/40 uppercase -mt-0.5">
                Feel the Pulse of Every Event
              </p>
            </div>
            <p className="text-sm font-medium text-pulse-text-dark/60 leading-relaxed max-w-sm">
              The transactional infrastructure engine providing atomic routing mechanics, escrow clearing protections, and secure ticketing systems across local banking corridors.
            </p>
            
            {/* Social Channels Badge Layout Icons */}
            <div className="flex items-center gap-3 pt-2">
              {['twitter', 'github', 'linkedin', 'instagram'].map((network) => (
                <a 
                  key={network} 
                  href={`https://${network}.com`}
                  className="w-8 h-8 rounded-lg bg-pulse-bg-light border border-gray-200/60 flex items-center justify-center text-xs text-pulse-text-dark/50 hover:text-pulse-purple-primary hover:border-pulse-purple-primary/30 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {network[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Map Loop Column Links */}
          <div className="col-span-1 md:col-span-2 md:col-start-6 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-pulse-text-dark/40">Engine Suite</h4>
            <ul className="space-y-2.5">
              {footerLinks.engine.map((link) => (
                <li key={link.path}>
                  <a href={link.path} className="text-sm font-semibold text-pulse-text-dark/70 hover:text-pulse-purple-primary transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-pulse-text-dark/40">Developers</h4>
            <ul className="space-y-2.5">
              {footerLinks.developer.map((link) => (
                <li key={link.path}>
                  <a href={link.path} className="text-sm font-semibold text-pulse-text-dark/70 hover:text-pulse-purple-primary transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-pulse-text-dark/40">Compliance</h4>
            <ul className="space-y-2.5">
              {footerLinks.compliance.map((link) => (
                <li key={link.path}>
                  <a href={link.path} className="text-sm font-semibold text-pulse-text-dark/70 hover:text-pulse-purple-primary transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* --- Bottom Base Legal Copy Bar Section --- */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left text-xs font-medium text-pulse-text-dark/50">
            <span>&copy; {currentYear} PulseEvent Platform Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
              Regulated Clearing Vault Nodes Active
            </span>
          </div>

          {/* Micro Scroll To Top Action Trigger Button */}
          <motion.button
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToTop}
            className="px-4 py-2 bg-pulse-bg-light border border-gray-200/80 hover:border-gray-300 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Return To Top</span>
            <span className="text-[10px]">▲</span>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}