import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { itemsMockDatabase } from '../data/exploreData';

// Simulated routing param extraction hooks. In a live Next.js / React Router environment:
// const { type, id } = useParams(); // type = 'events' | 'donations'
export default function DetailHub({ routeType = 'events', routeId = 'lagos-tech-fest-2026' }) {
  const [ticketCount, setTicketCount] = useState(1);
  const [donationOffer, setDonationOffer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Instantly extract the precise target log object from the central dataset
  const itemData = useMemo(() => {
    const cluster = itemsMockDatabase[routeType] || [];
    return cluster.find(entry => entry.id === routeId);
  }, [routeType, routeId]);

  // Fallback UI block if query ID lookup fails
  if (!itemData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pulse-bg-light">
        <p className="text-sm font-black text-pulse-text-dark/40">⚠️ Error: Target Data Log Missing.</p>
      </div>
    );
  }

  // Live transactional arithmetic formulas
  const isEvent = routeType === 'events';
  const pricePerUnit = isEvent ? itemData.basePrice : Number(donationOffer || 0);
  const subtotal = isEvent ? pricePerUnit * ticketCount : pricePerUnit;
  const platformFee = Math.round(subtotal * 0.025);
  const grandTotal = subtotal + platformFee;

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    if (!isEvent && pricePerUnit <= 0) return alert('Enter a valid contribution target allocation.');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-pulse-bg-light text-pulse-text-dark py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <a href="/browse" className="text-xs font-black uppercase tracking-wider text-pulse-purple-primary hover:underline">
            ← Return to Discovery Grid
          </a>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* --- Left Cluster Layout: Global Visual Assets & Overview --- */}
              <div className="lg:col-span-7 space-y-6">
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-sm">
                  <img src={itemData.image} alt={itemData.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-pulse-purple-primary">
                    {itemData.badge}
                  </div>
                </div>

                <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-pulse-purple-primary bg-pulse-purple-primary/10 px-3 py-1 rounded-md">
                    {isEvent ? itemData.category : 'Crowdfund Vault'}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-pulse-text-dark">{itemData.title}</h1>
                  <p className="text-sm font-medium text-pulse-text-dark/60 leading-relaxed">{itemData.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-sm font-semibold">
                    <div className="flex items-start gap-2">
                      <span>📍</span>
                      <div>
                        <div className="text-[11px] font-black uppercase text-pulse-text-dark/40">Location Hub</div>
                        <div className="text-pulse-text-dark">{isEvent ? itemData.venue : itemData.location}</div>
                      </div>
                    </div>
                    {isEvent && (
                      <div className="flex items-start gap-2">
                        <span>📅</span>
                        <div>
                          <div className="text-[11px] font-black uppercase text-pulse-text-dark/40">Timeline Schedule</div>
                          <div className="text-pulse-text-dark">{itemData.date} - <span className="text-xs font-normal">{itemData.time}</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* --- Right Cluster Layout: Context-Aware Checkout Terminal --- */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 sticky top-6">
                  <div>
                    <h2 className="text-lg font-black tracking-tight">{isEvent ? 'Secure Ticket Gate Allocation' : 'Escrow Crowdfund Interface'}</h2>
                    <p className="text-xs font-semibold text-pulse-text-dark/50">{isEvent ? 'Define parameters for live entry tokens.' : 'Input direct support funding variables.'}</p>
                  </div>

                  {isEvent ? (
                    /* Ticket Sub-Interface Render */
                    <div className="flex items-center justify-between p-4 bg-pulse-bg-light border border-gray-100 rounded-2xl">
                      <div>
                        <div className="text-sm font-black text-pulse-text-dark">Standard Access Pass</div>
                        <div className="text-xs font-bold text-pulse-purple-primary">{itemData.currency}{itemData.basePrice.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-3 bg-white border border-gray-200 p-1 rounded-xl">
                        <button type="button" onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-8 h-8 font-black cursor-pointer">-</button>
                        <span className="w-6 text-center text-sm font-black">{ticketCount}</span>
                        <button type="button" onClick={() => setTicketCount(Math.min(5, ticketCount + 1))} className="w-8 h-8 font-black cursor-pointer">+</button>
                      </div>
                    </div>
                  ) : (
                    /* Donation Campaign Progress & Input Sub-Interface Render */
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-pulse-text-dark/60">
                          <span>Raised: <b>{itemData.currency}{itemData.raised.toLocaleString()}</b></span>
                          <span>Target: {itemData.currency}{itemData.target.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-1.5 bg-pulse-bg-light rounded-full overflow-hidden border border-gray-100">
                          <div className="h-full bg-pulse-gradient" style={{ width: `${itemData.percentage}%` }} />
                        </div>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-sm font-bold text-pulse-text-dark/40">{itemData.currency}</span>
                        <input
                          type="number"
                          placeholder="Input custom funding amount..."
                          value={donationOffer}
                          onChange={(e) => setDonationOffer(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-sm font-medium p-3.5 pl-10 rounded-xl focus:outline-none focus:border-pulse-purple-primary"
                        />
                      </div>
                    </div>
                  )}

                  {/* Transaction Calculation Summary Block */}
                  <div className="space-y-2 pt-2 text-xs font-semibold text-pulse-text-dark/70">
                    <div className="flex justify-between">
                      <span>Operational Subtotal</span>
                      <span>{itemData.currency}{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Escrow Clearing Fee (2.5%)</span>
                      <span>{itemData.currency}{platformFee.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-gray-100 my-1" />
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black text-pulse-text-dark/80">Total Commitment</span>
                      <span className="text-xl font-black text-transparent bg-clip-text bg-pulse-gradient">{itemData.currency}{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitTransaction}>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={isLoading} className="w-full py-4 bg-pulse-gradient text-white font-black text-sm rounded-2xl shadow-lg cursor-pointer">
                      {isLoading ? 'Synchronizing Secure Nodes...' : isEvent ? 'Verify Pass Order ⚡' : 'Deploy Escrow Support Capital 💝'}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- Success Feedback State Panel --- */
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl">✅</div>
              <h2 className="text-xl font-black text-pulse-text-dark">{isEvent ? 'Access Pass Minted' : 'Contribution Transferred'}</h2>
              <div className="bg-pulse-bg-light border border-gray-100 rounded-2xl p-4 text-left text-xs space-y-1">
                <div className="font-black">{itemData.title}</div>
                <div className="text-pulse-text-dark/60">{isEvent ? `Total Seats Logged: ${ticketCount}` : 'Status: Escrow Allocation Committed'}</div>
                <div className="font-bold text-pulse-purple-primary mt-1">Settled sum: {itemData.currency}{grandTotal.toLocaleString()}</div>
              </div>
              <a href="/browse" className="w-full py-3 bg-pulse-text-dark text-white font-black text-xs rounded-xl block">Return to Cluster Grid</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}