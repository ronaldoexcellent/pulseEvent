import { useState, useEffect } from 'react';
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
  // const { user, loading } = useAuth();
  
  // FIX: Added optional chaining to prevent crashes, and commented it out 
  // so it doesn't spam your console on every keystroke!
  // console.log(location.state?.from?.pathname);

    // 1. Create a ref to track initialization
  // const isGoogleInitialized = useRef(false);

  // useEffect(() => {
  //   // 2. Only initialize if it hasn't been done yet
  //   if (!isGoogleInitialized.current && window.google) {
  //     window.google.accounts.id.initialize({
  //       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //       callback: handleGoogleSuccess,
  //     });
      
  //     // 3. Mark as initialized
  //     isGoogleInitialized.current = true;
  //   }
  // }, []); // Empty dependency array

  // useEffect(() => {
  //   if (user) setTimeout(() => window.location.replace(from), 100); // Redirect to
  //   // navigate(from, { replace: true });
  // }, [user]);

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
        withCredentials: true // CRITICAL: Allows the browser to accept and save the HttpOnly cookie
      });

      toast.dismiss(loadtoast);
      setIsLoading(false);

      // The try block succeeding means the backend responded with a 2xx status.
      // The browser has now securely stored the token in the background.
      toast.success(response.data.message || 'Login successful!');
      // navigate(from, { replace: true });
      window.location.replace(from); // Use replace to avoid back navigation to the login page
      // Pass the non-sensitive user profile data (id, username, email) to your state handler
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
      // 1. Send the Google credential to your backend
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/google`, {
        token: credentialResponse.credential
      }, {
        withCredentials: true // CRITICAL: Captures the HttpOnly cookie set by the server
      });

      // 2. Remove localStorage references
      // The token is now managed automatically by the browser via the HttpOnly cookie
      
      toast.dismiss(loadtoast);
      toast.success('Google login successful!');
      navigate(from, { replace: true });

      // 3. Update UI state with profile data
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
              shape="rectangular"
              theme="outline"
              // width="100%"
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
              <input
                type="password"
                name="password"
                required
                disabled={isLoading}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium px-4 py-3 rounded-xl focus:outline-none transition-all"
              />
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