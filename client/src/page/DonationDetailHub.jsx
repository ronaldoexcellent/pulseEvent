import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveDonationNotification from '../components/LiveDonationNotification';

// Mock database representing the campaign context
const INITIAL_CAMPAIGN_DATA = {
  id: 'clean-water-delta',
  title: 'Clean Water Pipeline: Niger Delta Node',
  description: 'Deploying decentralized off-grid purification systems to provide thousands of residents with immediate access to potable water infrastructure.',
  badge: 'Active Pipeline',
  category: 'Infrastructure Resilience',
  currency: '₦',
  raised: 4250000,
  target: 10000000,
  percentage: 42.5,
  image: 'https://images.unsplash.com/photo-1540574467063-178a50c2df87?w=800&q=80'
};

// Initialized interactive comment dataset
const INITIAL_COMMENTS = [
  {
    id: 'comm-1',
    name: 'Ossai Jane Blessing',
    amount: 25000,
    message: 'Extremely vital deployment. The modular strategy ensures rapid configuration out in the field.',
    timestamp: '2 hours ago',
    isAnonymous: false,
    replies: [
      { id: 'rep-1', message: 'Thank you Jane, validation metrics are looking great for deployment area A.', timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'comm-2',
    name: 'Anonymous Donor',
    amount: 10000,
    message: 'Routing financial capacity directly to operational modules. Let\'s build public architecture.',
    timestamp: '5 hours ago',
    isAnonymous: true,
    replies: []
  }
];

export default function DonationDetailHub() {
  const [campaign, setCampaign] = useState(INITIAL_CAMPAIGN_DATA);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  
  // Checkout & UI Node State Engine
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [donationOffer, setDonationOffer] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Share Layout States
  const [showDesktopShare, setShowDesktopShare] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Receipt State
  const [transactionId, setTransactionId] = useState('');

  // System view modifier (Simulates platform administration for deleting/replying)
  const [isOwnerView, setIsOwnerView] = useState(true);
  const [replyTargetId, setReplyTargetId] = useState(null);
  const [ownerReplyText, setOwnerReplyText] = useState('');

  const presetAmounts = [2000, 5000, 10000, 25000];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    introduction: ''
  });

  const pricePerUnit = selectedPreset || Number(donationOffer || 0);
  const platformFee = Math.round(pricePerUnit * 0.063); // 6.3% clearing metric allocation
  const grandTotal = pricePerUnit + platformFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresetSelect = (amount) => {
    setSelectedPreset(amount);
    setDonationOffer('');
  };

  const handleCustomAmountChange = (e) => {
    setDonationOffer(e.target.value);
    setSelectedPreset(null);
  };

  // Transaction Handler Execution
  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    if (pricePerUnit <= 0) return alert('Enter a valid contribution target allocation.');
    
    setIsLoading(true);

    const targetName = isAnonymous ? 'Anonymous Donor' : formData.name || 'Anonymous Donor';
    
    const operationalPayload = {
      id: `comm-${Date.now()}`,
      name: targetName,
      amount: pricePerUnit,
      message: formData.introduction || 'Committed funding pipeline successfully.',
      timestamp: 'Just now',
      isAnonymous: isAnonymous,
      replies: []
    };

    setTimeout(() => {
      setCampaign(prev => ({
        ...prev,
        raised: prev.raised + pricePerUnit,
        percentage: Math.min(100, ((prev.raised + pricePerUnit) / prev.target) * 100)
      }));
      setComments(prev => [operationalPayload, ...prev]);
      
      // Generate secure transaction hash for receipt
      setTransactionId(`TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
      
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  // Owner Operations
  const handleDeleteComment = (commentId) => {
    setComments(prev => prev.filter(item => item.id !== commentId));
  };

  const handleAddOwnerReply = (commentId) => {
    if (!ownerReplyText.trim()) return;

    setComments(prev => prev.map(comm => {
      if (comm.id === commentId) {
        return {
          ...comm,
          replies: [
            ...comm.replies,
            {
              id: `rep-${Date.now()}`,
              message: ownerReplyText,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return comm;
    }));

    setOwnerReplyText('');
    setReplyTargetId(null);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', introduction: '' });
    setDonationOffer('');
    setSelectedPreset(null);
    setIsAnonymous(false);
    setIsSuccess(false);
    setTransactionId('');
  };

  // Adaptive Target Environment Sharing Engine
  const handleShareExecution = async () => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobileDevice && navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: campaign.description,
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
    <div className="min-h-screen bg-pulse-bg-light text-pulse-text-dark py-12 px-4 sm:px-6 relative">
      
      {/* Placed standalone real-time social layer component */}
      <LiveDonationNotification currency={campaign.currency} />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Administrative Workspace Controls */}
        <div className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-black tracking-wider uppercase text-gray-400">Sandbox Variable Controls</span>
          </div>
          <button 
            onClick={() => setIsOwnerView(!isOwnerView)} 
            className={`text-xs font-black px-4 py-2 rounded-xl border transition-all ${isOwnerView ? 'bg-gray-900 border-black text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            {isOwnerView ? 'Mode: Campaign Owner View' : 'Mode: Public Donor View'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="donation-grid"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* --- Left Cluster Layout --- */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-sm bg-gray-100">
                  <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-pulse-purple-primary shadow-sm">
                    {campaign.badge}
                  </div>
                </div>

                <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-4 relative">
                  <span className="text-[10px] font-black uppercase tracking-widest text-pulse-purple-primary bg-pulse-purple-primary/10 px-3 py-1 rounded-md">
                    {campaign.category}
                  </span>
                  
                  <div className="flex justify-between items-start gap-4 relative">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-pulse-text-dark">{campaign.title}</h1>
                    
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
                  
                  <p className="text-sm font-medium text-pulse-text-dark/60 leading-relaxed">{campaign.description}</p>
                </div>

                {/* --- Live Interactive Activity & Comments Section --- */}
                <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h2 className="text-sm font-black tracking-wider uppercase text-gray-900">Pipeline Activity Ledger</h2>
                    <p className="text-xs font-semibold text-gray-400 mt-0.5">Real-time data stream of deployment metrics and donor remarks.</p>
                  </div>

                  <div className="space-y-4 divide-y divide-gray-100">
                    {comments.length === 0 ? (
                      <p className="text-xs font-bold text-gray-400 py-4 text-center">No structural comments recorded inside this node cluster.</p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="pt-4 first:pt-0 group space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-gray-900">
                                  {comment.isAnonymous ? 'Anonymous Donor' : comment.name}
                                </span>
                                <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                                  {campaign.currency}{comment.amount.toLocaleString()}
                                </span>
                              </div>
                              <span className="text-[10px] text-gray-400 font-bold block mt-0.5">{comment.timestamp}</span>
                            </div>

                            {isOwnerView && (
                              <button 
                                type="button" 
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-[10px] font-black tracking-wider uppercase text-red-500 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <p className="text-xs font-semibold text-pulse-text-dark/70 leading-relaxed pl-1">
                            {comment.message}
                          </p>

                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="ml-4 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wide">Campaign Owner</span>
                                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                                  <span className="text-[9px] font-bold text-gray-400">{reply.timestamp}</span>
                                </div>
                              </div>
                              <p className="text-xs font-medium text-gray-600 leading-relaxed">
                                {reply.message}
                              </p>
                            </div>
                          ))}

                          {isOwnerView && (
                            <div className="pl-1">
                              {replyTargetId === comment.id ? (
                                <div className="mt-2 space-y-2">
                                  <textarea
                                    value={ownerReplyText}
                                    onChange={(e) => setOwnerReplyText(e.target.value)}
                                    placeholder="Draft official developer/owner response..."
                                    rows={2}
                                    className="w-full text-xs font-semibold p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 resize-none"
                                  />
                                  <div className="flex gap-2 justify-end">
                                    <button 
                                      type="button" 
                                      onClick={() => { setReplyTargetId(null); setOwnerReplyText(''); }} 
                                      className="text-[10px] font-black px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg"
                                    >
                                      Cancel
                                    </button>
                                    <button 
                                      type="button" 
                                      onClick={() => handleAddOwnerReply(comment.id)} 
                                      className="text-[10px] font-black px-3 py-1.5 bg-indigo-600 text-white rounded-lg shadow-sm"
                                    >
                                      Post Verification Reply
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setReplyTargetId(comment.id)}
                                  className="text-[10px] font-black text-pulse-purple-primary hover:underline mt-1 block"
                                >
                                  ↳ Append Response
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* --- Right Cluster Layout: Escrow Checkout Terminal --- */}
              <div className="lg:col-span-5">
                <form onSubmit={handleSubmitTransaction} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 sticky top-6">
                  <div>
                    <h2 className="text-lg font-black tracking-tight">Escrow Capital Gateway</h2>
                    <p className="text-xs font-semibold text-pulse-text-dark/50">Authorize operational assets to active pipeline nodes.</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-pulse-text-dark/60">
                      <span>Raised: <b>{campaign.currency}{campaign.raised.toLocaleString()}</b></span>
                      <span>Target: {campaign.currency}{campaign.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-pulse-bg-light rounded-full overflow-hidden border border-gray-100">
                      <div className="h-full bg-pulse-gradient transition-all duration-500" style={{ width: `${campaign.percentage}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Select Instant Capital Preset</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handlePresetSelect(amount)}
                          className={`py-3 px-2 rounded-xl text-xs font-black border-2 transition-all ${selectedPreset === amount ? 'border-pulse-purple-primary bg-pulse-purple-primary/5 text-pulse-purple-primary shadow-sm' : 'border-gray-100 bg-white text-gray-700 hover:border-gray-200'}`}
                        >
                          {campaign.currency}{amount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Or Input Custom Allocation</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-sm font-bold text-pulse-text-dark/40">{campaign.currency}</span>
                      <input
                        type="number"
                        placeholder="Define customized funding volume..."
                        value={donationOffer}
                        onChange={handleCustomAmountChange}
                        className="w-full bg-pulse-bg-light border border-transparent focus:border-pulse-purple-primary text-sm font-bold p-3.5 pl-10 rounded-xl focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-gray-100">
                    <h3 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Identity Credentials</h3>
                    
                    <div className="flex items-center justify-between bg-pulse-bg-light p-3 rounded-xl border border-gray-100">
                      <label className="text-xs font-bold text-gray-600 cursor-pointer select-none" htmlFor="terminal-anonymous-toggle">Route dynamically as Anonymous</label>
                      <input 
                        id="terminal-anonymous-toggle"
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
                            <input required={!isAnonymous} type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Jane Blessing" className="w-full bg-pulse-bg-light border border-transparent focus:border-pulse-purple-primary text-sm font-semibold p-3.5 rounded-xl focus:outline-none transition-all" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Email Address</label>
                            <input required={!isAnonymous} type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@domain.com" className="w-full bg-pulse-bg-light border border-transparent focus:border-pulse-purple-primary text-sm font-semibold p-3.5 rounded-xl focus:outline-none transition-all" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Introduction & Remarks</label>
                        <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded">Optional</span>
                      </div>
                      <textarea 
                        name="introduction" 
                        value={formData.introduction} 
                        onChange={handleInputChange} 
                        placeholder="State your organization parameters or leave a public note attached to this funding transaction node..." 
                        rows={3} 
                        className="w-full bg-pulse-bg-light border border-transparent focus:border-pulse-purple-primary text-sm font-semibold p-3.5 rounded-xl focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-semibold text-pulse-text-dark/70 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span>Operational Subtotal</span>
                      <span>{campaign.currency}{pricePerUnit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Escrow Clearing Fee (6.3%)</span>
                      <span>{campaign.currency}{platformFee.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-gray-100 my-1" />
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black text-pulse-text-dark/80">Total Commitment</span>
                      <span className="text-xl font-black text-transparent bg-clip-text bg-pulse-gradient">{campaign.currency}{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading || pricePerUnit <= 0} 
                    className="w-full py-4 bg-pulse-gradient text-white font-black text-sm rounded-2xl shadow-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? 'Synchronizing Secure Nodes...' : 'Deploy Escrow Support Capital 💝'}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* --- Success Feedback / Digital Receipt State Panel --- */
            <motion.div 
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="max-w-md mx-auto bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">✅</div>
                <h2 className="text-xl font-black text-pulse-text-dark">Contribution Transferred</h2>
                <p className="text-xs font-semibold text-gray-500 mt-1">Escrow Allocation Committed</p>
              </div>

              {/* Mandatory Screenshot Notification Wrapper */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest">Screenshot Required</h4>
                  <p className="text-[10.5px] font-bold text-amber-700 mt-1 leading-relaxed">
                    Please take a screenshot of this digital ledger receipt now. It serves as your verifiable proof of capital deployment to this network node.
                  </p>
                </div>
              </div>

              {/* Digital Receipt Card Element */}
              <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left text-xs space-y-4 shadow-inner">
                {/* Visual Top Receipt Cutout styling */}
                <div className="absolute -top-3 left-0 right-0 h-3 flex gap-2 overflow-hidden justify-around px-2 opacity-30">
                   {[...Array(15)].map((_, i) => (
                     <div key={i} className="w-3 h-3 bg-white rounded-full translate-y-1.5" />
                   ))}
                </div>

                <div className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Transaction ID</span>
                  <span className="font-black font-mono text-pulse-purple-primary text-sm">{transactionId}</span>
                </div>

                <div className="space-y-2 py-1">
                  <div className="flex justify-between gap-4">
                    <span className="font-bold text-gray-500 shrink-0">Campaign Node</span>
                    <span className="font-black text-gray-900 text-right truncate">{campaign.title}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-bold text-gray-500 shrink-0">Origin Entity</span>
                    <span className="font-black text-gray-900 text-right truncate">{isAnonymous ? 'Anonymous' : formData.name || 'Anonymous Entity'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-bold text-gray-500 shrink-0">Timestamp</span>
                    <span className="font-black text-gray-900 text-right">
                      {new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200/60 pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600 font-bold">
                    <span>Operational Base</span>
                    <span>{campaign.currency}{pricePerUnit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-bold">
                    <span>Network Fee</span>
                    <span>{campaign.currency}{platformFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2 border-t border-gray-200/60 mt-1">
                    <span className="font-black text-gray-900 uppercase tracking-wider text-[10px]">Settled Sum</span>
                    <span className="font-black text-lg text-transparent bg-clip-text bg-pulse-gradient">
                      {campaign.currency}{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={resetForm} 
                className="w-full py-4 bg-gray-900 hover:bg-black text-white font-black text-xs rounded-xl transition-all shadow-md"
              >
                Return to Campaign Stack
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}