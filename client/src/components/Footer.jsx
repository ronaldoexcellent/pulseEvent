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
    compliance: [
      { label: 'Privacy Protocol', path: '/privacy' },
      { label: 'Terms of Execution', path: '/terms' },
      { label: 'Fraud Prevention', path: '/security' },
    ]
  };

  const socialChannels = [
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] border-t border-white/10 pt-20 pb-12 text-white relative overflow-hidden">
      
      {/* Subtle Background Glow to match Discussions Hub */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-[-20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#A7F3D0]/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Top Link Mapping Grid Grid Matrix --- */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column Profile Summary */}
          <div className="col-span-2 md:col-span-4 flex flex-col space-y-5">
           <div className="flex flex-col shrink-0">
          <a href="/" className=" flex items-center gap-0.5">
           <img src="/pulse-event-logo.png" width={120}  alt="PulseEvent Logo" />
          </a>
          
        </div>
            <p className="text-sm font-medium text-white/50 leading-relaxed max-w-sm">
              The transactional infrastructure engine providing atomic routing mechanics, escrow clearing protections, and secure ticketing systems across local banking corridors.
            </p>
            
            {/* Social Channels Badge Layout Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialChannels.map((network) => (
                <a 
                  key={network.name} 
                  href={network.url}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#A7F3D0] hover:border-[#A7F3D0]/40 hover:bg-[#A7F3D0]/5 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={network.name}
                >
                  {network.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Map Loop Column Links */}
          <div className="col-span-1 md:col-span-2 md:col-start-7 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Engine Suite</h4>
            <ul className="space-y-3">
              {footerLinks.engine.map((link) => (
                <li key={link.path}>
                  <a href={link.path} className="text-sm font-medium text-white/60 hover:text-[#A7F3D0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-10 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Compliance</h4>
            <ul className="space-y-3">
              {footerLinks.compliance.map((link) => (
                <li key={link.path}>
                  <a href={link.path} className="text-sm font-medium text-white/60 hover:text-[#A7F3D0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* --- Bottom Base Legal Copy Bar Section --- */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left text-xs font-medium text-white/40">
            <span>&copy; {currentYear} PulseEvent Platform Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A7F3D0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A7F3D0]"></span>
              </span>
              Regulated Clearing Vault Nodes Active
            </span>
          </div>

          {/* Micro Scroll To Top Action Trigger Button */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToTop}
            className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-[#A7F3D0]/40 hover:text-[#A7F3D0] rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 transition-all cursor-pointer text-white/80"
          >
            <span>Return To Top</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}