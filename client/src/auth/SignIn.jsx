import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import PageLoading from '../components/loaders/pageLoading';

export default function SignIn({ onSignInSuccess }) {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { setUser, user, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  if (loading) {
    return <PageLoading />;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadtoast = toast.loading('Authenticating...');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`, {
        identifier: formData.identifier,
        password: formData.password
      }, {
        withCredentials: true
      });

      toast.dismiss(loadtoast);
      setIsLoading(false);
      toast.success(response.data.message || 'Login successful!');
      // navigate(from, { replace: true });
      window.location.replace(from);
      if (onSignInSuccess) onSignInSuccess(response.data.user);
    } catch (error) {
      toast.dismiss(loadtoast);
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'Login failed.';
      toast.error(errorMessage);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const loadtoast = toast.loading('Connecting to Google...');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/google`, {
        token: credentialResponse.credential
      }, {
        withCredentials: true
      });
      toast.dismiss(loadtoast);
      toast.success('Google login successful!');
      // navigate(from, { replace: true });
      window.location.replace(from);

      if (onSignInSuccess) onSignInSuccess(response.data.user);
      
    } catch (error) {
      toast.dismiss(loadtoast);
      toast.error(error.response?.data?.message || 'Google Auth failed.');
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
          <div className="text-center mb-8">
            <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" className="mx-auto" />
            <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">Welcome To Pulse Event</h2>
            <p className="text-xs font-medium text-pulse-text-dark/50 mt-1">Please log in.</p>
          </div>

          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google Login Failed')}
              shape="circle"
              theme="outline"
              // size="large"
              // text="signin_with"
              // logo_alignment="left"
              // width="250"
            />
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-[10px] font-black uppercase tracking-widest text-pulse-text-dark/30">Or Identity Records</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">Username or Email</label>
              <input
                type="text"
                name="identifier"
                required
                disabled={isLoading}
                value={formData.identifier}
                onChange={handleInputChange}
                className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium px-4 py-3 rounded-xl focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  disabled={isLoading}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium px-4 py-3 pr-12 rounded-xl focus:outline-none transition-all"
                />
                {/* Toggle Button */}
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

            <motion.button
              whileHover={!isLoading ? { scale: 1.01 } : {}}
              type="submit"
              disabled={isLoading}
              className="cursor-none w-full py-3.5 bg-pulse-gradient text-white font-black text-sm rounded-xl shadow-lg disabled:opacity-60"
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </motion.button>
          </form>

          <div className="text-center mt-6 pt-5 border-t border-gray-100 text-xs font-semibold text-pulse-text-dark/60">
            <span>New to pulse-event? </span>
            <a href="/signup" className="text-pulse-purple-primary font-black hover:underline">Register</a>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
}