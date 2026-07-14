import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import PageLoading from '../components/loaders/pageLoading';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();
    
  if (loading) {
    return <PageLoading />;
  }

  if (user) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setStatus('');
    setIsError(false);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/forgot-password`, { email: email.toLowerCase() });
      setStatus(res.data.message);
      setIsSubmitted(true);
    } catch (err) {
      setIsError(true);
      setStatus('Something went wrong. Please try again.');
      toast.error('Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-pulse-bg-light flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <Toaster />
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
        <div className="text-center">
          <a href="/" className="text-2xl font-black tracking-tight text-pulse-text-dark inline-block">
            <img 
              src="/pulse-event-logo.png" 
              alt="PulseEvent Logo" 
              className="w-32"
            />
          </a>
          
          {!isSubmitted ? (
            <>
              <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">
                Recover Your Account
              </h2>
              <p className="text-sm italic font-medium text-pulse-text-dark/50 mt-1 mb-5">
                Enter your registered email address to <br /> receive recovery link.
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mt-5 text-xl">
                📩
              </div>
              <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">
                Recovery Link Sent
              </h2>
              <p className="text-xs font-medium text-pulse-text-dark/50 mt-1">
                Please check your email for the recovery link.
              </p>
            </>
          )}
        </div>

        {/* --- Phase Switch View: Input Form vs Success Ledger --- */}
        {!isSubmitted ? (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                Enter Email Address
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

            {status && (
              <p className={`mt-4 text-center text-sm font-medium ${isError ? 'text-red-600' : 'text-emerald-600'}`}>
                {status}
              </p>
            )}

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
                    <span> Sending Link... </span>
                  </>
                ) : (
                  <span> Send Recovery Link </span>
                )}
              </motion.button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 bg-pulse-bg-light border border-gray-100 rounded-2xl p-4 text-center">
            <p className="text-xs font-semibold text-pulse-text-dark/70 leading-relaxed">
              We sent a reset link to <span className="text-pulse-purple-primary font-bold">{email.toLowerCase()}</span>. Valid for 1 hour.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="cursor-pointer text-xs font-black text-pulse-purple-primary hover:underline block mx-auto"
            >
              Resend Link
            </button>
          </div>
        )}

        {/* Alternative Action Toggle Footer Anchor */}
        <div className="text-center mt-3 pt-2 border-t border-gray-100 text-sm font-semibold text-pulse-text-dark/60">
          <span> Remember your credentials? </span>
          <a href="/signin" className="text-pulse-purple-primary font-black hover:underline">
            Sign In
          </a>
        </div>
      </motion.div>
    </div>
  );
}