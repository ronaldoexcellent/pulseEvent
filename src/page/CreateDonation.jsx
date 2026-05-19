import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_GALLERY = [
  // Medical & Health (1-8)
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80',
  'https://images.unsplash.com/photo-1504813184591-015578574ef5?w=800&q=80',
  'https://images.unsplash.com/photo-1516613993176-f57ae2b677ef?w=800&q=80',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',

  // Community & Social Impact (9-16)
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
  'https://images.unsplash.com/photo-1469571486040-afb867261533?w=800&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80',
  'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=80',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80',

  // Education & Youth Empowerment (17-24)
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',

  // Disaster Relief & Crisis (25-32)
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80',
  'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&q=80',
  'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80',
  'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=800&q=80',
  'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',

  // Environmental & Infrastructure (33-40)
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80',
  'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80',
  'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
  'https://images.unsplash.com/photo-1562684651-7315247b6c14?w=800&q=80',
  'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&q=80'
];

const DURATION_OPTIONS = [
  { label: '60 Days', priceDisplay: 'FREE', value: '60days', isFree: true },
  { label: '6 Months', priceDisplay: '₦15,999', value: '6months', isFree: false },
  { label: 'Eternity', priceDisplay: '₦34,877', value: 'eternity', isFree: false }
];

const CATEGORY_OPTIONS = [
  'Medical & Health Treatment',
  'Wedding',
  'Church Project',
  'Birthday',
  'Orphanage & Orphan Support',
  'Child Dedication',
  'Education & Scholarship Funds',
  'Disaster & Emergency Relief',
  'Non-Profit & NGO Initiatives',
  'Community Infrastructure',
  'Creative & Tech Innovations',
  'Faith-Based Initiatives',
  'Children & Youth Welfare',
  'Elderly Care & Support',
  'Animal Protection & Rescue',
  'Environmental & Green Projects',
  'Sports & Talent Development',
  'Business Grants & Micro-loans',
  'Arts, Culture & Heritage',
  'Memorial & Funeral Support'

];

export default function CreateDonation() {
  const fileInputRef = useRef(null);
  
  const [viewState, setViewState] = useState('editor');
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    introduction: '',
    organizerAvatar: null,
    causeDescription: '',
    category: 'Medical & Health Treatment',
    image: PRESET_GALLERY[0],
    targetAmount: '',
    currency: '₦',
    duration: '6 Months',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, organizerAvatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProceedToCheckout = (e) => {
    e.preventDefault();
    const mappedPlan = DURATION_OPTIONS.find(opt => opt.label === formData.duration);
    if (mappedPlan) {
      setSelectedPlan(mappedPlan.value);
    }
    setViewState('checkout');
  };

  const handleFinalPayment = () => {
    if (!selectedPlan) return;
    setIsLoading(true);

    const generatedId = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const completePayload = {
      id: generatedId || `donation-${Date.now()}`,
      ...formData,
      listingPlan: selectedPlan,
      status: 'active'
    };

    setTimeout(() => {
      console.log('Successfully dispatched payload to globalPlatformDatabase.donations:', completePayload);
      setIsLoading(false);
      setViewState('success');
    }, 1500);
  };

  const handleResetWorkspace = () => {
    setViewState('editor');
    setSelectedPlan(null);
    setFormData({
      title: '', organizer: '', organizerAvatar: null, introduction: '', causeDescription: '', 
      category: 'Medical & Health Treatment', image: PRESET_GALLERY[0], targetAmount: '', 
      currency: '₦', duration: '6 Months'
    });
  };

  const currentPlanMeta = DURATION_OPTIONS.find(opt => opt.value === selectedPlan);

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Workspace Layout Header */}
        <div className="pb-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9Z"/>
              <path d="M12 7v10M9 10h6M9 14h6"/>
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-4 py-1.5 rounded-full inline-block mb-2">
              PULSE Donation Architecture
            </span>
            <h1 className="text-3xl font-black tracking-tight">Deploy Donation Node</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Initialize crowdfunding pipelines, verified allocation vaults, and ledger integration parameters.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* --- STEP 1: EDITOR CONFIGURATION --- */}
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
              
              {/* Identity & Core Architecture */}
              <div className="space-y-6">
                <h2 className="text-lg font-black tracking-tight border-b border-gray-100 pb-3">
                  1. Core Identity Architecture
                </h2>

                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-16 h-16 rounded-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors shrink-0 group relative"
                  >
                    {formData.organizerAvatar ? (
                      <img src={formData.organizerAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">📸</span>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleAvatarUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Organizer Local Avatar</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Click to browse local device files (JPEG, PNG).</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Campaign Title</label>
                    <input required type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Medical Fund for Community Care" className="w-full bg-gray-50 border border-transparent focus:border-emerald-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Beneficiary / Organizer</label>
                    <input required type="text" name="organizer" value={formData.organizer} onChange={handleInputChange} placeholder="e.g. Stelynk Foundation" className="w-full bg-gray-50 border border-transparent focus:border-emerald-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" />
                  </div>

                   <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Story Behind Donation</label>
                    <textarea required name="introduction" value={formData.introduction} onChange={handleInputChange} placeholder="Provide a brief overview of the event..." rows={3} className="w-full bg-gray-50 border border-transparent focus:border-indigo-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"></textarea>
                  </div>
                </div>
              </div>

              {/* Enhanced Grid Cover Layout (Exactly 40 Targeted Images) */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-lg font-black tracking-tight">2. Premium Cover Pool</h2>
                    <p className="text-xs text-gray-500 font-medium mt-1">Select from our premium, high-impact background cards.</p>
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    {PRESET_GALLERY.length} Pools
                  </span>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[340px] overflow-y-auto p-1 pr-2 custom-scrollbar">
                  {PRESET_GALLERY.map((url, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setFormData(prev => ({ ...prev, image: url }))}
                      className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${formData.image === url ? 'border-emerald-600 scale-[0.96] shadow-md' : 'border-transparent hover:border-gray-300 opacity-80 hover:opacity-100'}`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      {formData.image === url && (
                        <div className="absolute inset-0 bg-emerald-600/20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs shadow-sm">✓</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Architecture & Vault Metrics */}
              <div className="pt-6 border-t border-gray-100 space-y-6">
                <h2 className="text-lg font-black tracking-tight border-b border-gray-100 pb-3">
                  3. Vault Parameters & Scaling Loops
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Custom Duration Dropdown */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Grid Listing Duration</label>
                    <div 
                      className="w-full bg-gray-50 border border-transparent hover:border-gray-200 text-sm font-semibold p-3.5 rounded-xl cursor-pointer flex justify-between items-center transition-all"
                      onClick={() => { setIsDurationDropdownOpen(!isDurationDropdownOpen); setIsCurrencyDropdownOpen(false); setIsCategoryDropdownOpen(false); }}
                    >
                      {(() => {
                        const matched = DURATION_OPTIONS.find(opt => opt.label === formData.duration);
                        return (
                          <div className="flex items-center gap-2">
                            <span>{formData.duration}</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${matched?.isFree ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                              {matched?.priceDisplay}
                            </span>
                          </div>
                        );
                      })()}
                      <svg className={`w-4 h-4 transition-transform ${isDurationDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <AnimatePresence>
                      {isDurationDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                        >
                          {DURATION_OPTIONS.map(opt => (
                            <div 
                              key={opt.label}
                              onClick={() => { setFormData(prev => ({...prev, duration: opt.label})); setIsDurationDropdownOpen(false); }}
                              className="px-4 py-3 text-sm font-semibold hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 flex justify-between items-center"
                            >
                              <span className="text-gray-900">{opt.label}</span>
                              <span className={`text-[10px] font-black px-2 py-1 rounded-md ${opt.isFree ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                {opt.priceDisplay}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Custom Category Dropdown (Expanded List) */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Category Corridor</label>
                    <div 
                      className="w-full bg-gray-50 border border-transparent hover:border-gray-200 text-sm font-semibold p-3.5 rounded-xl cursor-pointer flex justify-between items-center transition-all"
                      onClick={() => { setIsCategoryDropdownOpen(!isCategoryDropdownOpen); setIsCurrencyDropdownOpen(false); setIsDurationDropdownOpen(false); }}
                    >
                      <span>{formData.category}</span>
                      <svg className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <AnimatePresence>
                      {isCategoryDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
                        >
                          {CATEGORY_OPTIONS.map(cat => (
                            <div 
                              key={cat}
                              onClick={() => { setFormData(prev => ({...prev, category: cat})); setIsCategoryDropdownOpen(false); }}
                              className="px-4 py-3 text-sm font-semibold hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 text-gray-900"
                            >
                              {cat}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Custom Currency Dropdown */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Vault Currency Corridor</label>
                    <div 
                      className="w-full bg-gray-50 border border-transparent hover:border-gray-200 text-sm font-semibold p-3.5 rounded-xl cursor-pointer flex justify-between items-center transition-all"
                      onClick={() => { setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen); setIsDurationDropdownOpen(false); setIsCategoryDropdownOpen(false); }}
                    >
                      <span>{formData.currency}</span>
                      <svg className={`w-4 h-4 transition-transform ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <AnimatePresence>
                      {isCurrencyDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                        >
                          {['₦', 'KSh', 'GH₵', '$'].map(curr => (
                            <div 
                              key={curr}
                              onClick={() => { setFormData(prev => ({...prev, currency: curr})); setIsCurrencyDropdownOpen(false); }}
                              className="px-4 py-3 text-sm font-semibold hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                            >
                              {curr}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Target Capital Requirement</label>
                    <input required type="number" name="targetAmount" value={formData.targetAmount} onChange={handleInputChange} placeholder="5000000" className="w-full bg-gray-50 border border-transparent focus:border-emerald-500 text-sm font-semibold p-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all" />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full py-4 bg-gray-900 hover:bg-black text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all tracking-wide flex justify-center items-center gap-2">
                  <span>Proceed to Activation Setup</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </motion.form>
          )}

          {/* --- STEP 2: CHECKOUT GATEWAY BLOCK --- */}
          {viewState === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white border border-gray-200/80 rounded-[2rem] p-6 sm:p-10 shadow-sm space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 text-gray-900 rounded-full flex items-center justify-center mx-auto text-xl mb-4">🚀</div>
                <h2 className="text-2xl font-black">Platform Listing Authorization</h2>
                <p className="text-sm text-gray-500 font-medium">Verify your selected duration loop for "{formData.title || 'Your Campaign'}".</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 60 Days Tier */}
                <div 
                  onClick={() => setSelectedPlan('60days')}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${selectedPlan === '60days' ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <div className="text-[10px] font-black uppercase text-emerald-600 tracking-wider mb-2">Sandbox Cycle</div>
                  <div className="text-2xl font-black text-emerald-600 mb-1">FREE</div>
                  <div className="text-xs font-semibold text-gray-500 mb-4">Active for 60 Days</div>
                  <ul className="text-xs space-y-2 text-gray-600 font-medium">
                    <li>✓ Local Grid Visibility</li>
                    <li>✓ Standard Indexing</li>
                  </ul>
                  {selectedPlan === '60days' && <div className="absolute top-4 right-4 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
                </div>

                {/* 6 Months Tier */}
                <div 
                  onClick={() => setSelectedPlan('6months')}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${selectedPlan === '6months' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <div className="text-[10px] font-black uppercase text-gray-500 tracking-wider mb-2">Standard Cycle</div>
                  <div className="text-2xl font-black text-gray-900 mb-1">₦15,999</div>
                  <div className="text-xs font-semibold text-gray-500 mb-4">Active for 6 Months</div>
                  <ul className="text-xs space-y-2 text-gray-600 font-medium">
                    <li>✓ Core Grid Visibility</li>
                    <li>✓ Standard Analytics</li>
                    <li>✓ Extended Reach</li>
                  </ul>
                  {selectedPlan === '6months' && <div className="absolute top-4 right-4 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
                </div>

                {/* Eternity Tier */}
                <div 
                  onClick={() => setSelectedPlan('eternity')}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${selectedPlan === 'eternity' ? 'border-emerald-600 shadow-md bg-emerald-50/20' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Recommended</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 tracking-wider mb-2">Eternity Node</div>
                  <div className="text-2xl font-black text-gray-900 mb-1">₦34,877</div>
                  <div className="text-xs font-semibold text-gray-500 mb-4">Lifetime Pipeline Access</div>
                  <ul className="text-xs space-y-2 text-gray-600 font-medium">
                    <li>✓ Infinite Grid Retention</li>
                    <li>✓ Priority Node Indexing</li>
                    <li>✓ Deep Data Metrics</li>
                  </ul>
                  {selectedPlan === 'eternity' && <div className="absolute top-4 right-4 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button onClick={() => setViewState('editor')} className="px-6 py-4 bg-gray-50 text-gray-900 font-black text-sm rounded-xl hover:bg-gray-100 transition-colors">
                  ← Back
                </button>
                <button 
                  onClick={handleFinalPayment}
                  disabled={!selectedPlan || isLoading}
                  className={`flex-1 py-4 font-black text-sm rounded-xl shadow-lg transition-all tracking-wide text-white disabled:bg-gray-300 disabled:cursor-not-allowed ${
                    currentPlanMeta?.isFree ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-900 hover:bg-black'
                  }`}
                >
                  {isLoading ? 'Processing Pipeline Sync...' : currentPlanMeta?.isFree ? 'Publish Free Listing' : 'Settle Fee & Publish Listing'}
                </button>
              </div>
            </motion.div>
          )}

          {/* --- STEP 3: SUCCESS FEEDBACK NODE --- */}
          {viewState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto bg-white border border-gray-200/80 rounded-[2rem] p-8 shadow-xl text-center space-y-6"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <img src={formData.image} alt="Cover" className="w-full h-full object-cover rounded-2xl shadow-sm" />
                {formData.organizerAvatar && (
                  <img src={formData.organizerAvatar} alt="Organizer" className="absolute -bottom-3 -right-3 w-10 h-10 object-cover rounded-full border-2 border-white shadow-md" />
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-black text-gray-900">Donation Vault Active</h2>
                <p className="text-xs font-medium text-gray-500 mt-2 leading-relaxed">
                  Campaign verified. Funding pipelines are now receiving grid allocations.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Live Title</span>
                  <span className="font-bold text-gray-900">{formData.title}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Category Corridor</span>
                  <span className="font-bold text-gray-900">{formData.category}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Target goal</span>
                  <span className="font-bold text-gray-900">{formData.currency}{formData.targetAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Pipeline Tier</span>
                  <span className="font-bold text-emerald-600 uppercase">{selectedPlan}</span>
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