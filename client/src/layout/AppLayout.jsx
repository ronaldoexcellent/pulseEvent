import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Balance State
  const [showBalance, setShowBalance] = useState(false);
  const mockBalance = 4250.75;

  const navLinks = [
    { 
      path: '/browse', 
      label: 'Discover', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      ) 
    },
    { 
      path: '/create-event-ticket', 
      label: 'Deploy Ticket', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ) 
    },
    { 
      path: '/available-tickets', 
      label: 'Available Tickets', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
      ) 
    },
    { 
      path: '/available-donations', 
      label: 'Open Donation', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ) 
    },
    { 
      path: '/scan-ticket', 
      label: 'Scan Ticket', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
        </svg>
      ) 
    },
    { 
      path: '/settings', 
      label: 'Settings', 
      mobileOnly: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.754c-.29.218-.443.576-.408.935.006.063.009.127.009.192 0 .064-.003.128-.009.192-.035.36.118.717.408.935l1.003.754a1.125 1.125 0 0 1 .26 1.43l-1.297 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87a6.512 6.512 0 0 1-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.43l1.003-.754c.29-.218.443-.576.408-.935a6.595 6.595 0 0 1-.009-.384c.035-.36-.118-.717-.408-.935l-1.003-.754a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.644-.869l.214-1.281Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ) 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7fa] text-gray-800 font-sans selection:bg-[#5a1fb5]/30 flex flex-col md:flex-row">
      
      {/* 
        --- Mobile Top Navbar --- 
        Visible only on mobile/tablet. Houses the Logo, Balance, and Profile.
      */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-[72px] bg-white/80 backdrop-blur-xl border-b border-gray-200/60 z-50 flex items-center justify-between px-6">
        <a href="/" className="flex items-center">
          <img src="/pulse-event-logo.png" width={100} height={100} alt="PulseEvent Logo" className="object-contain" />
        </a>
        
        <div className="flex items-center gap-4">
          {/* Mobile Balance Toggle */}
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-2 bg-gray-50 border border-gray-100 hover:bg-gray-100 px-2 py-1.5 rounded-xl transition-colors"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Balance</span>
              <span className="text-sm font-black text-gray-900">
                {showBalance ? `$${mockBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '******'}
              </span>
            </div>
            <div className="text-gray-400">
              {showBalance ? (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              )}
            </div>
          </button>

          {/* Mobile Profile Avatar */}
          <Link to="/profile" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5a1fb5] to-[#f2378f] text-white flex items-center justify-center font-black text-sm shadow-sm hover:opacity-90 transition-opacity shrink-0">
            JD
          </Link>
        </div>
      </header>

      {/* 
        --- Dynamic Navigation Ecosystem --- 
        Mobile: Fixed at the bottom for navigation links.
        Desktop: Fixed on the left side, containing Logo, Links, Balance, and Profile/Settings.
      */}
      <nav className="
        fixed z-50 transition-all duration-500 ease-in-out
        bottom-5 left-4 right-4 h-[72px] bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl flex flex-row items-center justify-between px-1 sm:px-2
        md:bottom-0 md:left-0 md:top-0 md:right-auto md:w-72 md:h-screen md:bg-white/60 md:backdrop-blur-2xl md:border-r md:border-gray-200/60 md:rounded-none md:shadow-none md:flex-col md:justify-between md:px-6 md:py-8
      ">
        
        {/* Top Segment: Brand Terminal (Desktop Only) */}
        <div className="hidden md:flex flex-col shrink-0 w-full mb-8">
          <a href="/" className="flex items-center gap-0.5">
            <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" className="object-contain" />
          </a>
        </div>

        {/* Core Links Routing Grid (Middle on Desktop, Full width on Mobile) */}
        <div className="flex flex-row w-full justify-between items-center md:flex-col md:w-full md:gap-2 md:flex-1 md:justify-start md:overflow-y-auto no-scrollbar">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link 
                key={link.path}
                to={link.path} 
                title={link.label}
                className={`
                  relative flex items-center justify-center md:justify-start md:w-full md:px-4 md:py-3.5 rounded-2xl transition-colors duration-300 z-10
                  p-1.5 sm:p-2 flex-1 min-w-0 md:flex-none ${link.mobileOnly ? 'md:hidden' : 'flex'}
                  ${isActive ? 'text-[#5a1fb5]' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white shadow-sm border border-gray-100/80 rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Column on Mobile (Vertical), Row on Desktop (Horizontal) */}
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 w-full">
                  <span className={`transition-transform duration-300 flex items-center justify-center ${isActive ? 'scale-110' : 'scale-100'}`}>
                    {link.icon}
                  </span>
                  
                  {/* Text is tiny on mobile, normal on desktop */}
                  <span className={`text-[8.5px] sm:text-[9px] md:text-xs tracking-wide transition-all duration-300 text-center md:text-left whitespace-nowrap truncate w-full md:w-auto ${isActive ? 'font-black' : 'font-medium md:font-bold'}`}>
                    {link.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Segment: Profile & Utilities (Desktop Only) */}
        <div className="hidden md:flex flex-col gap-3 w-full pt-6 border-t border-gray-200/60 mt-auto shrink-0">
          
          {/* Desktop Balance Widget */}
          <div className="px-1 mb-2">
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-[20px] transition-all border border-gray-100 shadow-sm hover:shadow-md group"
            >
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Wallet Balance</span>
                <span className="text-xl font-black text-gray-950 tracking-tight">
                  {showBalance ? `$${mockBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '******'}
                </span>
              </div>
              <div className="text-gray-300 group-hover:text-[#5a1fb5] transition-colors p-2 bg-gray-50 group-hover:bg-[#5a1fb5]/10 rounded-xl">
                {showBalance ? (
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                ) : (
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                )}
              </div>
            </button>
          </div>

          {/* Desktop Profile Display (Linked to /profile) */}
          <Link to="/profile" className="flex items-center gap-3 px-2 mb-2 p-2 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5a1fb5] to-[#f2378f] text-white flex items-center justify-center font-black text-sm shrink-0 group-hover:shadow-md group-hover:scale-105 transition-all">
              JD
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-gray-900 truncate group-hover:text-[#5a1fb5] transition-colors">Jane Doe</span>
              <span className="text-[10px] font-medium text-gray-500 truncate uppercase tracking-wider">Event Organizer</span>
            </div>
          </Link>

     

          {/* Exit Button */}
          <button 
            onClick={() => navigate('/signin')}
            className="group flex items-center gap-3 w-full px-4 py-3.5 bg-gray-900 hover:bg-[#5a1fb5] text-white text-xs font-black rounded-2xl transition-all shadow-md shadow-gray-900/10 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            <span>Exit Node</span>
          </button>
        </div>
      </nav>

      {/* 
        --- Main Content Shell --- 
        Padding Top is added for Mobile to account for the top navbar.
        Padding Bottom is added for Mobile to account for the bottom navigation links.
        Margin Left is added for Desktop to account for the side navbar.
      */}
      <main className="flex-1 w-full pt-[72px] pb-28 md:pt-0 md:pb-0 md:ml-72 min-h-screen relative z-0">
        <Outlet />
      </main>
      
    </div>
  );
}