import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Curated pool of high-contrast event presets
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
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
  'https://images.unsplash.com/photo-1516280440502-a279af0df462?w=800&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  'https://images.unsplash.com/photo-1485872299829-c673f5194813?w=800&q=80',
  'https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=800&q=80',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80',
  'https://images.unsplash.com/photo-1510511459013-568ebba6df21?w=800&q=80',
  'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80',
  'https://images.unsplash.com/photo-1504609774044-122e2aa77fc3?w=800&q=80',
  'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&q=80',
  'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&q=80',
  'https://images.unsplash.com/photo-1588513904949-a292d35e1656?w=800&q=80',
  'https://images.unsplash.com/photo-1561489401-fc2876ced162?w=800&q=80',
  'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&q=80',
  'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=800&q=80',
  'https://images.unsplash.com/photo-1574360662629-9e80e1593003?w=800&q=80'
];

export default function CreateTicket() {
  const [viewState, setViewState] = useState('editor');
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [hasVipTier, setHasVipTier] = useState(false);
  const [hasPresidentialTier, setHasPresidentialTier] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    introduction: '',
    location: '',
    category: '',
    image: PRESET_GALLERY[0],
    description: '',
    venue: '',
    currency: '₦',
    duration: '6 Months',
    date: '',
    time: '',
    slotsLeft: '',
    regularPrice: '',
    vipPrice: '',
    presidentialPrice: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToCheckout = (e) => {
    e.preventDefault();
    if (formData.duration === '60 Days') setSelectedPlan('60days');
    else if (formData.duration === '6 Months') setSelectedPlan('6months');
    else if (formData.duration === 'Eternity') setSelectedPlan('eternity');
    
    setViewState('checkout');
  };

  const handleFinalPayment = () => {
    if (!selectedPlan) return;
    setIsLoading(true);

    const generatedId = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const completePayload = {
      id: generatedId || `ticket-${Date.now()}`,
      ...formData,
      tiers: {
        regular: Number(formData.regularPrice),
        vip: hasVipTier && formData.vipPrice ? Number(formData.vipPrice) : null,
        presidential: hasPresidentialTier && formData.presidentialPrice ? Number(formData.presidentialPrice) : null
      },
      listingPlan: selectedPlan,
      status: 'active'
    };

    setTimeout(() => {
      console.log('Successfully dispatched payload to globalPlatformDatabase.events:', completePayload);
      setIsLoading(false);
      setViewState('success');
    }, 2000);
  };

  const handleResetWorkspace = () => {
    setViewState('editor');
    setSelectedPlan(null);
    setHasVipTier(false);
    setHasPresidentialTier(false);
    setFormData({
      title: '', organizer: '', introduction: '', location: '', category: '', 
      image: PRESET_GALLERY[0], description: '', venue: '', currency: '₦', 
      duration: '6 Months', date: '', time: '', slotsLeft: '',
      regularPrice: '', vipPrice: '', presidentialPrice: ''
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 px-4 py-1.5 rounded-full inline-block mb-2">
              PULSE Event Architecture
            </span>
            <h1 className="text-3xl font-black tracking-tight">Deploy Ticket Rig</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Initialize live entry tokens, premium covers, specific pricing tiers, and inventory allocations.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewState === 'editor' && (
            <motion.form
              key="editor"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleProceedToCheckout}
              className="bg-white border border-gray-200/80 rounded-[2rem] p-6 sm:p-10 shadow-sm space-y-8"
            >
              
              <div className="space-y-6">
                <h2 className="text-lg font-black tracking-tight border-b border-gray-100 pb-3">
                  1. Core Identity Architecture
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Event Pass Title</label>
                    <input required type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Neo-Minimalist Summit" className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Host / Organizer</label>
                    <input required type="text" name="organizer" value={formData.organizer} onChange={handleInputChange} placeholder="e.g. Stelynk Labs" className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Event Introduction</label>
                    <textarea required name="introduction" value={formData.introduction} onChange={handleInputChange} placeholder="Provide a brief overview of the event..." rows={3} className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"></textarea>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-lg font-black tracking-tight">2. Premium Cover Pool</h2>
                    <p className="text-xs text-gray-500 font-medium mt-1">Select from our expanded curated high-contrast event presets.</p>
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    {PRESET_GALLERY.length} Loaded
                  </span>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[220px] overflow-y-auto p-1 pr-2 custom-scrollbar">
                  {PRESET_GALLERY.map((url, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setFormData(prev => ({ ...prev, image: url }))}
                      className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${formData.image === url ? 'border-indigo-600 scale-[0.96] shadow-md' : 'border-transparent hover:border-gray-300 opacity-80 hover:opacity-100'}`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      {formData.image === url && (
                        <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs shadow-sm">✓</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-3">
                  <div>
                    <h2 className="text-lg font-black tracking-tight">3. Tiered Entry Allocations</h2>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Toggle tier configurations and setup structural entry pricing.</p>
                  </div>
                  
                  <div className="relative w-36 shrink-0">
                    <label className="text-[9px] font-black uppercase tracking-wider text-gray-400 block mb-1">Corridor Currency</label>
                    <div 
                      className="bg-gray-900 text-white text-xs font-black px-4 py-3 rounded-xl cursor-pointer flex justify-between items-center"
                      onClick={() => { setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen); setIsDurationDropdownOpen(false); }}
                    >
                      <span>Active: {formData.currency}</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <AnimatePresence>
                      {isCurrencyDropdownOpen && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute right-0 z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                          {['₦', 'KSh', 'GH₵', '$'].map(curr => (
                            <div key={curr} onClick={() => { setFormData(prev => ({...prev, currency: curr})); setIsCurrencyDropdownOpen(false); }} className="px-4 py-2.5 text-xs font-bold text-gray-900 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0">
                              ({curr}) Corridor
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50/60 p-5 rounded-2xl border border-gray-200/60 relative space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black tracking-wider text-gray-900 uppercase">Regular Pass</span>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">Required</span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium mt-1 leading-normal">Standard transactional entry pass clearance metrics for general public gates.</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-gray-400">{formData.currency}</span>
                      <input required type="number" name="regularPrice" value={formData.regularPrice} onChange={handleInputChange} placeholder="5000" className="w-full bg-white border border-gray-200 focus:border-indigo-500 text-sm font-bold pl-9 pr-4 py-3 rounded-xl focus:outline-none transition-all" />
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border transition-all relative space-y-4 flex flex-col justify-between ${hasVipTier ? 'bg-white border-gray-900 shadow-sm' : 'bg-gray-50/20 border-dashed border-gray-200 opacity-60'}`}>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black tracking-wider text-gray-900 uppercase">VIP Pass</span>
                        <input type="checkbox" checked={hasVipTier} onChange={(e) => { setHasVipTier(e.target.checked); if(!e.target.checked) setFormData(p => ({...p, vipPrice: ''})); }} className="w-4 h-4 accent-gray-900 cursor-pointer rounded" />
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium mt-1 leading-normal">Elevated perimeter parameters, priority reservation queues, or specialized backstages.</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-gray-400">{formData.currency}</span>
                      <input disabled={!hasVipTier} required={hasVipTier} type="number" name="vipPrice" value={formData.vipPrice} onChange={handleInputChange} placeholder={hasVipTier ? "25000" : "Disabled"} className="w-full bg-white border border-gray-200 focus:border-indigo-500 text-sm font-bold pl-9 pr-4 py-3 rounded-xl focus:outline-none disabled:bg-gray-100/60 disabled:cursor-not-allowed transition-all" />
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border transition-all relative space-y-4 flex flex-col justify-between ${hasPresidentialTier ? 'bg-white border-gray-900 shadow-sm' : 'bg-gray-50/20 border-dashed border-gray-200 opacity-60'}`}>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black tracking-wider text-gray-900 uppercase">Presidential</span>
                        <input type="checkbox" checked={hasPresidentialTier} onChange={(e) => { setHasPresidentialTier(e.target.checked); if(!e.target.checked) setFormData(p => ({...p, presidentialPrice: ''})); }} className="w-4 h-4 accent-gray-900 cursor-pointer rounded" />
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium mt-1 leading-normal">Premium signature routing privileges, direct executive alignments, or lounge loops.</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-gray-400">{formData.currency}</span>
                      <input disabled={!hasPresidentialTier} required={hasPresidentialTier} type="number" name="presidentialPrice" value={formData.presidentialPrice} onChange={handleInputChange} placeholder={hasPresidentialTier ? "150000" : "Disabled"} className="w-full bg-white border border-gray-200 focus:border-indigo-500 text-sm font-bold pl-9 pr-4 py-3 rounded-xl focus:outline-none disabled:bg-gray-100/60 disabled:cursor-not-allowed transition-all" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-6">
                <h2 className="text-lg font-black tracking-tight border-b border-gray-100 pb-3">
                  4. Gate Metrics & Scheduling
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Physical Venue Address</label>
                    <input required type="text" name="venue" value={formData.venue} onChange={handleInputChange} placeholder="e.g. Eko Convention Centre, Lagos" className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Event Date (Auto-Deletes +24Hrs)</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Event Time</label>
                    <input required type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  </div>

                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Grid Listing Duration</label>
                    <div 
                      className="w-full bg-gray-50 border border-transparent hover:border-gray-200 text-sm font-semibold p-3.5 rounded-xl cursor-pointer flex justify-between items-center transition-all"
                      onClick={() => { setIsDurationDropdownOpen(!isDurationDropdownOpen); setIsCurrencyDropdownOpen(false); }}
                    >
                      <span>{formData.duration}</span>
                      <svg className={`w-4 h-4 transition-transform ${isDurationDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <AnimatePresence>
                      {isDurationDropdownOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                          {['60 Days', '6 Months', 'Eternity'].map(dur => (
                            <div key={dur} onClick={() => { setFormData(prev => ({...prev, duration: dur})); setIsDurationDropdownOpen(false); }} className="px-4 py-3 text-sm font-semibold hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                              {dur}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Total Pass Allocation Size</label>
                    <input required type="number" name="slotsLeft" value={formData.slotsLeft} onChange={handleInputChange} placeholder="150" className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-4 bg-gray-900 hover:bg-black text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all tracking-wide flex justify-center items-center gap-2">
                  <span>Proceed to Activation Setup</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </motion.form>
          )}

          {viewState === 'checkout' && (
            <motion.div key="checkout" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-white border border-gray-200/80 rounded-[2rem] p-6 sm:p-10 shadow-sm space-y-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-xl mb-4">💎</div>
                <h2 className="text-2xl font-black">Platform Listing Authorization</h2>
                <p className="text-sm text-gray-500 font-medium">Verify your selection duration loop for "{formData.title || 'Your Event'}".</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div onClick={() => setSelectedPlan('60days')} className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${selectedPlan === '60days' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-300'}`}>
                  <div className="text-[10px] font-black uppercase text-gray-500 tracking-wider mb-2">Short Cycle</div>
                  <div className="text-2xl font-black text-gray-900 mb-1">{formData.currency}4,500</div>
                  <div className="text-xs font-semibold text-gray-500 mb-4">Active for 60 Days</div>
                  <ul className="text-xs space-y-2 text-gray-600 font-medium">
                    <li>✓ Local Grid Visibility</li>
                    <li>✓ Standard Indexing</li>
                  </ul>
                  {selectedPlan === '60days' && <div className="absolute top-4 right-4 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
                </div>

                <div onClick={() => setSelectedPlan('6months')} className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${selectedPlan === '6months' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-300'}`}>
                  <div className="text-[10px] font-black uppercase text-indigo-600 tracking-wider mb-2">Premium Cycle</div>
                  <div className="text-2xl font-black text-gray-900 mb-1">{formData.currency}15,999</div>
                  <div className="text-xs font-semibold text-gray-500 mb-4">Active for 6 Months</div>
                  <ul className="text-xs space-y-2 text-gray-600 font-medium">
                    <li>✓ Core Grid Visibility</li>
                    <li>✓ Premium Analytics</li>
                    <li>✓ Extended Reach</li>
                  </ul>
                  {selectedPlan === '6months' && <div className="absolute top-4 right-4 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
                </div>

                <div onClick={() => setSelectedPlan('eternity')} className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${selectedPlan === 'eternity' ? 'border-indigo-600 shadow-md bg-indigo-50/20' : 'border-gray-100 hover:border-gray-300'}`}>
                  <div className="absolute -top-3 left-4 bg-indigo-600 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Recommended</div>
                  <div className="text-[10px] font-black uppercase text-indigo-600 tracking-wider mb-2">Premium Eternity</div>
                  <div className="text-2xl font-black text-gray-900 mb-1">{formData.currency}34,877</div>
                  <div className="text-xs font-semibold text-gray-500 mb-4">Lifetime Pipeline Access</div>
                  <ul className="text-xs space-y-2 text-gray-600 font-medium">
                    <li>✓ Infinite Grid Retention</li>
                    <li>✓ Priority Node Indexing</li>
                    <li>✓ Deep Data Metrics</li>
                  </ul>
                  {selectedPlan === 'eternity' && <div className="absolute top-4 right-4 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button onClick={() => setViewState('editor')} className="px-6 py-4 bg-gray-50 text-gray-900 font-black text-sm rounded-xl hover:bg-gray-100 transition-colors">
                  ← Back
                </button>
                <button 
                  onClick={handleFinalPayment}
                  disabled={!selectedPlan || isLoading}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg transition-all tracking-wide"
                >
                  {isLoading ? 'Verifying Gateway...' : 'Settle Fee & Publish Listing'}
                </button>
              </div>
            </motion.div>
          )}

          {viewState === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto bg-white border border-gray-200/80 rounded-[2rem] p-8 shadow-xl text-center space-y-6">
              <div className="relative w-full h-40 mx-auto bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <img src={formData.image} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
              
              <div>
                <h2 className="text-xl font-black text-gray-900">Event Matrix Active</h2>
                <p className="text-xs font-medium text-gray-500 mt-2 leading-relaxed">
                  Clearance granted. Your dynamic multi-tier structural entry pipeline loop is currently active.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Live Title</span>
                  <span className="font-bold text-gray-900 truncate max-w-[200px]">{formData.title}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Regular Pass</span>
                  <span className="font-bold text-gray-900">{formData.currency}{Number(formData.regularPrice || 0).toLocaleString()}</span>
                </div>
                {hasVipTier && formData.vipPrice && (
                  <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">VIP Pass</span>
                    <span className="font-bold text-indigo-600">{formData.currency}{Number(formData.vipPrice).toLocaleString()}</span>
                  </div>
                )}
                {hasPresidentialTier && formData.presidentialPrice && (
                  <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">Presidential Pass</span>
                    <span className="font-bold text-amber-600">{formData.currency}{Number(formData.presidentialPrice).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Scheduled Date</span>
                  <span className="font-bold text-gray-900">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Allocation Size</span>
                  <span className="font-bold text-gray-900">{formData.slotsLeft} Passes</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handleResetWorkspace} className="flex-1 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100 text-xs font-black rounded-xl transition-all cursor-pointer">
                  Deploy Another
                </button>
                <a href="#grid" className="flex-1 py-3.5 bg-gray-900 hover:bg-black text-white text-xs font-black rounded-xl text-center flex items-center justify-center transition-all shadow-md">
                  View Live Grid
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}