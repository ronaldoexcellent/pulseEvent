import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AvailableTicketsPage() {
  const navigate = useNavigate();
  
  // This would be fetched from your database: tickets sold by this specific host
  const [tickets, setTickets] = useState([
    { id: '829401', event: 'Tech Summit 2026', address: 'Landmark Centre, Lagos', dateTime: 'May 25, 2026 - 09:00 AM' },
    { id: '193847', event: 'Artisan Expo', address: 'Transcorp Hilton, Abuja', dateTime: 'June 12, 2026 - 10:00 AM' },
  ]);

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-950 uppercase tracking-tighter">
          Host <span className="text-indigo-600">Validation</span>
        </h1>
        <p className="text-gray-500 font-medium mt-2">Manage and scan guest entry for your events.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            className="group bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-6"
          >
            {/* The Host's Action: Trigger Scanner */}
            <button 
              onClick={() => navigate('/ticket-code', { state: { ticketId: ticket.id, eventName: ticket.event } })}
              className="w-20 h-20 flex-shrink-0 bg-indigo-600 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 17h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>

            <div className="flex-1 w-full text-center md:text-left">
              <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase">Ticket ID: {ticket.id}</span>
              <h3 className="text-lg font-black text-gray-950">{ticket.event}</h3>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase">{ticket.address} • {ticket.dateTime}</p>
            </div>

            <button 
              onClick={() => navigate('/ticket-code', { state: { ticketId: ticket.id, eventName: ticket.event } })}
              className="px-6 py-3 bg-gray-950 text-white rounded-xl text-xs font-black hover:bg-gray-800"
            >
              Validate Guest
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}