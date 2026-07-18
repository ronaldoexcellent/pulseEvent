import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export default function ScanTicketPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Destructure contextual routing parameters parsed from available tickets selection
  const { ticketId, eventName } = location.state || { ticketId: 'N/A', eventName: 'Unknown Ticket Ecosystem' };
  
  // App Interfaces and Verification States
  const [activeMode, setActiveMode] = useState('scan'); // 'scan' | 'confirm'
  const [status, setStatus] = useState('scanning'); 
  const [confirmInput, setConfirmInput] = useState(ticketId !== 'N/A' ? ticketId : '');
  const [isVerifyingManualCode, setIsVerifyingManualCode] = useState(false);

  // Scanner Simulation Engine Effect
  useEffect(() => {
    if (activeMode === 'scan' && status === 'scanning') {
      const timer = setTimeout(() => {
        setStatus('success'); 
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [status, activeMode]);

  // Handle Host Explicit Code Validation Pasting / Submission
  const handleManualVerification = (e) => {
    e.preventDefault();
    if (!confirmInput.trim()) return;

    setIsVerifyingManualCode(true);
    
    // Simulate API authorization handshake sequence
    setTimeout(() => {
      setIsVerifyingManualCode(false);
      setStatus('success');
      setActiveMode('scan'); // Route cleanly back to status terminal context
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] text-gray-800 flex flex-col items-center justify-center p-6 relative select-none">
      
      {/* Return Navigation Anchor */}
      <div className="absolute top-8 left-6">
        <button 
          onClick={() => navigate('/available-tickets')} 
          className="flex items-center gap-2 text-[#5a1fb5] hover:text-[#461491] transition-colors font-black text-xs uppercase tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Hub Terminal
        </button>
      </div>

      {/* Header Metadata Section */}
      <div className="text-center mb-8 max-w-sm px-4">
        <h2 className="text-xs text-[#f2378f] font-black uppercase tracking-widest">{eventName}</h2>
        <h1 className="text-3xl font-black uppercase tracking-tighter mt-1">Validation Node</h1>
        <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mt-2 bg-gray-200/50 px-3 py-1 rounded-full inline-block">
          Target Ref: #{ticketId}
        </p>
      </div>

      {/* Symmetric Core Mode Toggle Switch */}
      <div className="flex bg-gray-200/50 p-1 rounded-2xl mb-10 w-full max-w-sm shadow-inner border border-gray-200/10">
        <button 
          onClick={() => { setActiveMode('scan'); setStatus('scanning'); }} 
          className={`flex-1 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
            activeMode === 'scan' ? 'bg-white shadow-md text-[#5a1fb5]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Scan Matrix
        </button>
        <button 
          onClick={() => setActiveMode('confirm')} 
          className={`flex-1 py-3.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
            activeMode === 'confirm' ? 'bg-white shadow-md text-[#f2378f]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Confirm QR Code
        </button>
      </div>

      {/* MODE RENDERING: SCAN MONITOR & ACCESS FEEDBACK */}
      {activeMode === 'scan' && (
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="relative w-full aspect-square bg-white border border-gray-200/60 rounded-[32px] overflow-hidden flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8">
            
            {status === 'scanning' && (
              <motion.div 
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f2378f] to-transparent shadow-[0_0_12px_#f2378f]"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
            )}

            <AnimatePresence mode="wait">
              {status === 'scanning' && (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="w-14 h-14 border-4 border-t-[#5a1fb5] border-gray-200 rounded-full animate-spin mx-auto mb-4" />
                  <p className="font-black text-xs uppercase tracking-widest text-gray-400">Pulsing Optical Scan Feed...</p>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div key="success" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center px-4">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-200 text-green-500 shadow-sm">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-950 tracking-tight uppercase">Access Cleared</h3>
                  <p className="text-green-600 text-[10px] uppercase font-black tracking-widest mt-1 bg-green-50 px-3 py-1 rounded-full inline-block">
                    Ticket Authenticated
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {status === 'success' && (
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setStatus('scanning')}
              className="mt-8 px-8 py-4 bg-gray-900 text-white font-black rounded-xl hover:bg-[#5a1fb5] transition-all uppercase text-xs tracking-widest shadow-md"
            >
              Reset Scan Field
            </motion.button>
          )}
        </div>
      )}

      {/* MODE RENDERING: COMPREHENSIVE VERIFICATION NODE (MANUAL INPUT + SYSTEM QR) */}
      {activeMode === 'confirm' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center w-full max-w-sm"
        >
          {/* Host Input Control Action Frame */}
          <form onSubmit={handleManualVerification} className="w-full mb-6">
            <label className="block text-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
              Manual Override Reference Entry
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="PASTE OR TYPE TICKET CODE..."
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                disabled={isVerifyingManualCode}
                className="w-full pl-4 pr-32 py-4 bg-white border border-gray-200 text-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#f2378f] focus:border-transparent transition-all font-bold text-sm tracking-wider shadow-sm uppercase placeholder:text-gray-300 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!confirmInput.trim() || isVerifyingManualCode}
                className="absolute right-2 px-4 py-2.5 bg-gray-950 hover:bg-[#f2378f] disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow-sm"
              >
                {isVerifyingManualCode ? 'Verifying...' : 'Verify Reference'}
              </button>
            </div>
          </form>

          {/* Core System Identity QR Generator Node */}
          <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-200/60 flex flex-col items-center justify-center min-h-[290px] w-full">
            {confirmInput.trim() ? (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl shadow-inner">
                  <QRCodeSVG 
                    value={confirmInput} 
                    size={180} 
                    fgColor="#5a1fb5" 
                    bgColor="#ffffff"
                    level="H"
                  />
                </div>
                <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest mt-6 bg-gray-100 px-4 py-1.5 rounded-full border border-gray-200/40">
                  Ready for Scanner Processing
                </p>
              </motion.div>
            ) : (
              <div className="w-[180px] h-[180px] flex flex-col items-center justify-center text-gray-300 font-black text-[10px] uppercase tracking-widest text-center border-2 border-dashed border-gray-200/70 rounded-2xl px-4">
                <svg className="w-8 h-8 mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5z" /></svg>
                Enter target parameters to map matrix
              </div>
            )}
          </div>
        </motion.div>
      )}

    </div>
  );
}