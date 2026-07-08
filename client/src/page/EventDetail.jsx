import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { itemsMockDatabase } from '../data/exploreData';

// High-contrast cover presets for the donation branch
const PRESET_GALLERY = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  'https://images.unsplash.com/photo-1533174000222-edfe3bac9334?w=800&q=80',
  'https://images.unsplash.com/photo-1520092362635-728b6d3cc32b?w=800&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80'
];

export default function DetailHub({ routeType = 'events', routeId = 'lagos-tech-fest-2026' }) {
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketTier, setTicketTier] = useState('regular'); // 'regular' | 'vip' | 'presidential'
  const [donationOffer, setDonationOffer] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Share Layout States
  const [showDesktopShare, setShowDesktopShare] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Consolidated form fields handling identities and covers
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    introduction: '',
    image: PRESET_GALLERY[0]
  });

  // Extract precise target log object from database
  const itemData = useMemo(() => {
    const cluster = itemsMockDatabase[routeType] || [];
    return cluster.find(entry => entry.id === routeId);
  }, [routeType, routeId]);

  if (!itemData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pulse-bg-light">
        <p className="text-sm font-black text-pulse-text-dark/40">⚠️ Error: Target Data Log Missing.</p>
      </div>
    );
  }

  const isEvent = routeType === 'events';

  // Context-aware tiered ticket calculations (fallbacks assigned if fields missing from DB item)
  const tierPrices = useMemo(() => {
    const base = itemData.basePrice || 0;
    return {
      regular: base,
      vip: itemData.vipPrice || base * 3,
      presidential: itemData.presidentialPrice || base * 10
    };
  }, [itemData]);

  const pricePerUnit = isEvent ? tierPrices[ticketTier] : Number(donationOffer || 0);
  const subtotal = isEvent ? pricePerUnit * ticketCount : pricePerUnit;
  const platformFee = Math.round(subtotal * 0.063);
  const grandTotal = subtotal + platformFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    if (!isEvent && pricePerUnit <= 0) return alert('Enter a valid contribution target allocation.');
    
    setIsLoading(true);

    const payload = {
      donorName: isAnonymous ? 'Anonymous' : formData.name || 'Anonymous Entity',
      donorEmail: formData.email,
      introduction: formData.introduction,
      image: isEvent ? itemData.image : formData.image,
      amount: grandTotal,
      currency: itemData.currency,
      tier: isEvent ? ticketTier : null,
      count: isEvent ? ticketCount : 1,
      timestamp: new Date().toISOString()
    };

    setTimeout(() => {
      console.log('Transaction successfully completed:', payload);
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  // Adaptive Target Environment Sharing Engine
  const handleShareExecution = async () => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobileDevice && navigator.share) {
      try {
        await navigator.share({
          title: itemData.title,
          text: itemData.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Mobile share UI execution dismissed.', error);
      }
    } else {
      // Toggle custom inline desktop view panel state
      setShowDesktopShare(prev => !prev);
      setIsCopied(false);
    }
  };

  const handleClipboardCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-pulse-bg-light text-pulse-text-dark py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <a href="/browse" className="text-xs font-black uppercase tracking-wider text-pulse-purple-primary hover:underline">
            ← Back to Explore
          </a>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="checkout-grid"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* --- Left Cluster Layout: Global Visual Assets & Overview --- */}
              <div className="lg:col-span-7 space-y-6">
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-sm bg-gray-100">
                  <img 
                    src={isEvent ? itemData.image : formData.image} 
                    alt={itemData.title} 
                    className="w-full h-full object-cover transition-all duration-300" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-pulse-purple-primary shadow-sm">
                    {itemData.badge}
                  </div>
                </div>

                <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-pulse-purple-primary bg-pulse-purple-primary/10 px-3 py-1 rounded-md">
                    {isEvent ? itemData.category : 'Crowdfund Vault'}
                  </span>
                  
                  {/* Share Icon implementation wrapper */}
                  <div className="flex justify-between items-start gap-4 relative">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-pulse-text-dark">{itemData.title}</h1>
                    
                    <div className="relative">
                      <button 
                        onClick={handleShareExecution}
                        className={`p-2.5 border rounded-full transition-all shrink-0 ${showDesktopShare ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'}`}
                        title="Share Context Parameters"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                      </button>

                      {/* Desktop Clipboard Distribution Menu Popover */}
                      <AnimatePresence>
                        {showDesktopShare && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50 space-y-2.5 origin-top-right"
                          >
                            <div>
                              <h4 className="text-xs font-black tracking-wide uppercase text-gray-900">Pipeline Node Link</h4>
                              <p className="text-[10px] font-semibold text-gray-400 mt-0.5">Copy this URL to distribute across external systems.</p>
                            </div>
                            <div className="flex gap-1.5 items-center bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                              <input 
                                type="text" 
                                readOnly 
                                value={typeof window !== 'undefined' ? window.location.href : ''} 
                                className="bg-transparent text-[11px] font-semibold px-2 text-gray-500 w-full focus:outline-none select-all"
                              />
                              <button
                                onClick={handleClipboardCopy}
                                className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all shrink-0 ${isCopied ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-white hover:bg-black'}`}
                              >
                                {isCopied ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

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

                {/* Cover Image Selector Block - Rendered ONLY for Crowdfund context */}
                {!isEvent && (
                  <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div>
                      <h2 className="text-sm font-black tracking-wider uppercase text-gray-400">Select Campaign Cover</h2>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">Choose a contextual background metric for your node support reference.</p>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 max-h-[110px] overflow-y-auto p-1 pr-2 custom-scrollbar">
                      {PRESET_GALLERY.map((url, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setFormData(prev => ({ ...prev, image: url }))}
                          className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${formData.image === url ? 'border-pulse-purple-primary scale-[0.96] shadow-sm' : 'border-transparent hover:border-gray-300 opacity-80 hover:opacity-100'}`}
                        >
                          <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                          {formData.image === url && (
                            <div className="absolute inset-0 bg-pulse-purple-primary/20 flex items-center justify-center">
                              <div className="w-4 h-4 bg-pulse-purple-primary text-white rounded-full flex items-center justify-center text-[9px] shadow-sm">✓</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* --- Right Cluster Layout: Context-Aware Checkout Terminal --- */}
              <div className="lg:col-span-5">
                <form onSubmit={handleSubmitTransaction} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 sticky top-6">
                  <div>
                    <h2 className="text-lg font-black tracking-tight">{isEvent ? 'Secure Ticket Gate Allocation' : 'Escrow Crowdfund Interface'}</h2>
                    <p className="text-xs font-semibold text-pulse-text-dark/50">{isEvent ? 'Define parameters for live entry tokens.' : 'Input direct support funding variables.'}</p>
                  </div>

                  {isEvent ? (
                    /* Ticket Sub-Interface Render with Tier Engine */
                    <div className="space-y-4">
                      {/* Tier Matrix Selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Select Access Stratum</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'regular', label: 'Regular' },
                            { id: 'vip', label: 'VIP' },
                            { id: 'presidential', label: 'Presidential' }
                          ].map((tier) => (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => setTicketTier(tier.id)}
                              className={`py-2.5 px-2 rounded-xl text-xs font-black border transition-all ${ticketTier === tier.id ? 'border-pulse-purple-primary bg-pulse-purple-primary/5 text-pulse-purple-primary shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                            >
                              {tier.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dynamic Ticket Price and Quantifier Block */}
                      <div className="flex items-center justify-between p-4 bg-pulse-bg-light border border-gray-100 rounded-2xl">
                        <div>
                          <div className="text-xs font-black uppercase text-gray-400 tracking-wide capitalize">{ticketTier} Allocation</div>
                          <div className="text-sm font-black text-pulse-text-dark mt-0.5">
                            {itemData.currency}{tierPrices[ticketTier].toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
                          <button type="button" onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-8 h-8 font-black cursor-pointer hover:bg-gray-50 rounded-lg transition-all">-</button>
                          <span className="w-6 text-center text-sm font-black">{ticketCount}</span>
                          <button type="button" onClick={() => setTicketCount(Math.min(5, ticketCount + 1))} className="w-8 h-8 font-black cursor-pointer hover:bg-gray-50 rounded-lg transition-all">+</button>
                        </div>
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

                  {/* Personal Identity Form Routing fields */}
                  <div className="space-y-4 pt-2 border-t border-gray-100">
                    <h3 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Identity Credentials</h3>
                    
                    <div className="flex items-center justify-between bg-pulse-bg-light p-3 rounded-xl border border-gray-100">
                      <label className="text-xs font-bold text-gray-600 cursor-pointer select-none" htmlFor="anonymous-toggle">Route dynamically as Anonymous</label>
                      <input 
                        id="anonymous-toggle"
                        type="checkbox" 
                        checked={isAnonymous} 
                        onChange={(e) => setIsAnonymous(e.target.checked)} 
                        className="w-4 h-4 accent-pulse-text-dark cursor-pointer rounded" 
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {!isAnonymous && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Full Name</label>
                            <input required={!isAnonymous} type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Jane Blessing" className="w-full bg-pulse-bg-light border border-transparent focus:border-pulse-purple-primary text-sm font-semibold p-3 rounded-xl focus:outline-none transition-all" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Email Address</label>
                            <input required={!isAnonymous} type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@domain.com" className="w-full bg-pulse-bg-light border border-transparent focus:border-pulse-purple-primary text-sm font-semibold p-3 rounded-xl focus:outline-none transition-all" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Short Introduction</label>
                        <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded">Optional</span>
                      </div>
                      <textarea 
                        name="introduction" 
                        value={formData.introduction} 
                        onChange={handleInputChange} 
                        placeholder={isEvent ? "Leave a note for the organizers..." : "Message to the pipeline project..."}
                        rows={2} 
                        className="w-full bg-pulse-bg-light border border-transparent focus:border-pulse-purple-primary text-sm font-semibold p-3 rounded-xl focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Transaction Calculation Summary Block */}
                  <div className="space-y-2 pt-2 text-xs font-semibold text-pulse-text-dark/70 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span>Operational Subtotal</span>
                      <span>{itemData.currency}{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Escrow Clearing Fee (6.3%)</span>
                      <span>{itemData.currency}{platformFee.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-gray-100 my-1" />
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black text-pulse-text-dark/80">Total Commitment</span>
                      <span className="text-xl font-black text-transparent bg-clip-text bg-pulse-gradient">{itemData.currency}{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading || (!isEvent && grandTotal <= 0)} 
                    className="w-full py-4 bg-pulse-gradient text-white font-black text-sm rounded-2xl shadow-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? 'Synchronizing Secure Nodes...' : isEvent ? `Verify ${ticketTier.toUpperCase()} Order ⚡` : 'Deploy Escrow Support Capital 💝'}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* --- Success Feedback State Panel --- */
            <motion.div 
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="max-w-md mx-auto bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl text-center space-y-6"
            >
              {!isEvent && (
                <div className="w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <img src={formData.image} alt="Selected Cover Preset" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl">✅</div>
              <h2 className="text-xl font-black text-pulse-text-dark">{isEvent ? 'Access Pass Minted' : 'Contribution Transferred'}</h2>
              
              <div className="bg-pulse-bg-light border border-gray-100 rounded-2xl p-4 text-left text-xs space-y-1.5">
                <div className="font-black text-sm text-gray-900">{itemData.title}</div>
                <div className="text-pulse-text-dark/60 font-medium">
                  {isEvent ? (
                    <span>Allocation Matrix: <b className="uppercase text-pulse-purple-primary">{ticketTier}</b> ({ticketCount} Seats logged)</span>
                  ) : (
                    'Status: Escrow Allocation Committed'
                  )}
                </div>
                <div className="text-pulse-text-dark/60 font-medium">
                  Entity: <span className="font-bold">{isAnonymous ? 'Anonymous' : formData.name || 'Anonymous Entity'}</span>
                </div>
                {formData.introduction && (
                  <div className="text-pulse-text-dark/50 italic bg-white p-2 rounded-lg border border-gray-200/60 mt-1">
                    "{formData.introduction}"
                  </div>
                )}
                <div className="font-bold text-pulse-purple-primary text-sm pt-1 border-t border-gray-200/60 mt-2">
                  Settled sum: {itemData.currency}{grandTotal.toLocaleString()}
                </div>
              </div>
              <a href="/browse" className="w-full py-3 bg-pulse-text-dark text-white font-black text-xs rounded-xl block">Return to Cluster Grid</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}