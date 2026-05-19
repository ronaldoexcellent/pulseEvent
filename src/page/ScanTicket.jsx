import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScanTicketPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketId = location.state?.ticketId || 'N/A';

  const [status, setStatus] = useState('scanning'); // 'scanning', 'success', 'error'

  // Simulated scan logic: In a real app, this is triggered by the QR library
  useEffect(() => {
    if (status === 'scanning') {
      const timer = setTimeout(() => {
        // Simulate a successful scan after 3 seconds
        setStatus('success');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex flex-col items-center justify-center p-6">
      
      {/* Header Info */}
      <div className="absolute top-8 left-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-white font-bold text-sm">
          ← Back to List
        </button>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Validation Node</h2>
        <p className="text-gray-500 text-sm">Ticket ID: {ticketId}</p>
      </div>

      {/* Scanner Viewfinder */}
      <div className="relative w-full max-w-sm aspect-square bg-gray-900 border-2 border-dashed border-gray-700 rounded-3xl overflow-hidden flex items-center justify-center">
        
        {/* Animated Laser Line */}
        {status === 'scanning' && (
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        )}

        {/* Feedback Overlays */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              </div>
              <h3 className="text-2xl font-black text-green-400">ACCESS GRANTED</h3>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
               <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h3 className="text-2xl font-black text-red-400">INVALID TICKET</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-10 flex gap-4">
        <button 
          onClick={() => setStatus('scanning')}
          className="px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-colors"
        >
          {status === 'scanning' ? 'Scanning...' : 'Scan Another'}
        </button>
      </div>
    </div>
  );
}