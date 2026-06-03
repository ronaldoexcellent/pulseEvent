import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AvailableTicketsPage() {
  const navigate = useNavigate();
  
  // Tab State Management
  const [activeTab, setActiveTab] = useState('sold'); // 'sold' | 'bought'

  // Host View Data: Tickets sold by this user for their events
  const [ticketsSold] = useState([
    { id: '829401', event: 'Tech Summit 2026', address: 'Landmark Centre, Lagos', dateTime: 'May 25, 2026 - 09:00 AM' },
    { id: '193847', event: 'Artisan Expo', address: 'Transcorp Hilton, Abuja', dateTime: 'June 12, 2026 - 10:00 AM' },
  ]);

  // Attendee View Data: Tickets purchased by this user for other events
  const [ticketsBought] = useState([
    { id: '554319', event: 'Web3 Builder Assembly', address: 'Owlpha Lab, Lagos', dateTime: 'July 04, 2026 - 04:00 PM' },
    { id: '302948', event: 'Chiaroscuro Photography Masterclass', address: 'Studio 9, Victoria Island', dateTime: 'August 12, 2026 - 11:00 AM' },
  ]);

  const currentTickets = activeTab === 'sold' ? ticketsSold : ticketsBought;

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen bg-[#f7f7fa]">
      
      {/* Header Info Node */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-950 uppercase tracking-tighter">
          Ticket <span className="text-[#5a1fb5]">Hub</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium mt-2">
          {activeTab === 'sold' 
            ? 'Manage and validate guest entries for your hosted events.' 
            : 'Access entry passes and configuration nodes for your upcoming events.'}
        </p>
      </div>

      {/* Symmetric Tab Control Switch */}
      <div className="flex bg-gray-200/50 p-1 rounded-2xl mb-10 max-w-md shadow-inner border border-gray-200/20">
        <button 
          onClick={() => setActiveTab('sold')} 
          className={`flex-1 py-3 text.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'sold' 
              ? 'bg-white shadow-md text-[#5a1fb5]' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Tickets Sold
        </button>
        <button 
          onClick={() => setActiveTab('bought')} 
          className={`flex-1 py-3 text.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'bought' 
              ? 'bg-white shadow-md text-[#f2378f]' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Tickets Bought
        </button>
      </div>

      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="wait">
          {currentTickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="group bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow"
            >
              {/* Graphic Icon Action Anchor */}
              <button 
                onClick={() => navigate('/ticket-code', { state: { ticketId: ticket.id, eventName: ticket.event } })}
                className={`w-20 h-20 flex-shrink-0 rounded-2xl flex items-center justify-center text-white transition-colors ${
                  activeTab === 'sold' ? 'bg-[#5a1fb5] hover:bg-[#461491]' : 'bg-[#f2378f] hover:bg-[#d12476]'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 17h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </button>

              {/* Meta Parameters Content Block */}
              <div className="flex-1 w-full text-center md:text-left">
                <span className={`text-[10px] font-black tracking-widest uppercase ${
                  activeTab === 'sold' ? 'text-[#5a1fb5]' : 'text-[#f2378f]'
                }`}>
                  Ticket ID: {ticket.id}
                </span>
                <h3 className="text-lg font-black text-gray-950 mt-0.5">{ticket.event}</h3>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">
                  {ticket.address} • {ticket.dateTime}
                </p>
              </div>

              {/* Text Action Trigger Button */}
              <button 
                onClick={() => navigate('/ticket-code', { state: { ticketId: ticket.id, eventName: ticket.event } })}
                className="px-6 py-3 bg-gray-950 text-white rounded-xl text-xs font-black hover:bg-gray-800 transition-colors uppercase tracking-wider w-full md:w-auto"
              >
                {activeTab === 'sold' ? 'Validate Guest' : 'Show Pass'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}