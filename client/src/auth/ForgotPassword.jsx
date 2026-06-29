import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    // Mimicking network verification handshake dispatch latency
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-pulse-bg-light flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Structural ambient blur background nodes */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pulse-purple-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pulse-pink-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xl relative z-10"
      >
        {/* Identity Context Branding Row */}
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-black tracking-tight text-pulse-text-dark inline-block">
            Pulse<span className="text-pulse-purple-primary">Event</span>
          </a>
          
          {!isSubmitted ? (
            <>
              <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">
                Recover Security Access Key
              </h2>
              <p className="text-xs font-medium text-pulse-text-dark/50 mt-1">
                Enter your registered credential email node to receive token recovery links.
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mt-4 text-xl">
                📩
              </div>
              <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">
                Recovery Dispatch Sent
              </h2>
              <p className="text-xs font-medium text-pulse-text-dark/50 mt-1">
                Check your inbound email gateway for temporary access tokens.
              </p>
            </>
          )}
        </div>

        {/* --- Phase Switch View: Input Form vs Success Ledger --- */}
        {!isSubmitted ? (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., security@stelynk.com"
                className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
              />
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={!isLoading ? { scale: 1.01 } : {}}
                whileTap={!isLoading ? { scale: 0.99 } : {}}
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-pulse-gradient hover:bg-pulse-gradient-hover text-white font-black text-sm rounded-xl shadow-lg shadow-pulse-purple-primary/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Dispatching Security Token...</span>
                  </>
                ) : (
                  <span>Send Recovery Protocol Link ⚡</span>
                )}
              </motion.button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 bg-pulse-bg-light border border-gray-100 rounded-2xl p-4 text-center">
            <p className="text-xs font-semibold text-pulse-text-dark/70 leading-relaxed">
              We have transmitted an atomic reset link matching <span className="text-pulse-purple-primary font-bold">{email}</span>. Valid for 15 minutes before token invalidation.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-black text-pulse-purple-primary hover:underline block mx-auto"
            >
              Resend Link Packet
            </button>
          </div>
        )}

        {/* Alternative Action Toggle Footer Anchor */}
        <div className="text-center mt-6 pt-5 border-t border-gray-100 text-xs font-semibold text-pulse-text-dark/60">
          <span>Remember your security phrase? </span>
          <a href="/signin" className="text-pulse-purple-primary font-black hover:underline">
            Authenticate Entry
          </a>
        </div>
      </motion.div>
    </div>
  );
}