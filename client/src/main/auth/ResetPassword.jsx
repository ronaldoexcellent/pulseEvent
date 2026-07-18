import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useSearchParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import PageLoading from '../components/loaders/pageLoading';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Grab the specific token and email out of the URL string
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();
    
  if (loading) {
    return <PageLoading />;
  }

  if (user) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  // If the user lands here without a token, show an error state immediately
  if (!token || !email) {
    return (
      <div className="min-h-[calc(100vh-73px)] w-full flex items-center justify-center bg-pulse-bg-light">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md w-full border border-gray-200/80">
          <h2 className="text-xl font-black text-red-600 mb-2">Invalid Link</h2>
          <p className="text-sm text-pulse-text-dark/60">This password reset link is malformed or missing information. Please request a new one.</p>
          <button onClick={() => navigate('/forgotpwd')} className="mt-6 text-sm font-black text-pulse-purple-primary hover:underline">
            Go back to recovery
          </button>
        </div>
      </div>
    );
  }

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (newPassword.length < 8) {
      setIsError(true);
      setStatus("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setStatus("Passwords do not match.");
      return;
    }

    if (isLoading) return;
    
    setIsLoading(true);
    setStatus('');
    setIsError(false);

    try {
      // This is where we finally trigger your backend logic!
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reset-password`, { 
        email, 
        token, 
        newPassword 
      });
      
      setStatus(res.data.message);
      setIsSuccess(true);
      toast.success('Password updated successfully.');
      
      // Redirect to login after 3 seconds so they can actually sign in
      setTimeout(() => {
        navigate('/signin');
      }, 3000);

    } catch (err) {
      setIsError(true);
      setStatus(err.response?.data?.message || 'Something went wrong. Please try again.');
      toast.error('Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-pulse-bg-light flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <Toaster />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pulse-purple-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pulse-pink-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xl relative z-10"
      >
        <div className="text-center">
          <a href="/" className="text-2xl font-black tracking-tight text-pulse-text-dark inline-block mb-3">
            <img src="/pulse-event-logo.png" alt="PulseEvent Logo" className="w-32" />
          </a>
          
          {!isSuccess ? (
            <>
              <h2 className="text-xl font-black text-pulse-text-dark tracking-tight">Create New Password</h2>
              <p className="text-sm italic font-medium text-pulse-text-dark/50 mt-1 mb-5">
                For security, please enter a strong password.
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mt-2 text-xl">
                ✓
              </div>
              <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">Password Updated</h2>
              <p className="text-sm font-medium text-pulse-text-dark/50 mt-1 mb-5">
                Redirecting you to sign in...
              </p>
            </>
          )}
        </div>

        {!isSuccess && (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <div className="relative">
                <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-pulse-purple-primary transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    // Eye-slash icon (Hide)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // Eye icon (Show)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-pulse-purple-primary transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    // Eye-slash icon (Hide)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // Eye icon (Show)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {status && (
              <p className={`mt-2 text-center text-sm font-medium ${isError ? 'text-red-600' : 'text-emerald-600'}`}>
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
                    <span> Securing Account... </span>
                  </>
                ) : (
                  <span> Update Password </span>
                )}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}