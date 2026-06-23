import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

export default function SignUp() {
  const initialFormState = { 
    firstname: '', 
    lastname: '', 
    username: '',
    email: '', 
    password: '',
    confirmPassword: ''
  };

  // 2. Pass it to your useState hook
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [message, setMessage] = useState('');
  const [err, setErr] = useState(false);

  // Close custom drop list dropdown when clicks clear the operational boundaries
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmpassword) {
      setMessage('Passwords do not match.');
      toast.error('Passwords do not match.');
      setErr(true);
      setTimeout(() => setIsLoading(false), 1500);
      return;
    }

    else {
      const loadtoast = toast.loading('Creating account...');
      setTimeout(() => {
        setIsLoading(false);
        toast.dismiss(loadtoast);
      }, 1500);

      try {
        // Axios POST request
        const response = await axios.post('http://localhost:5000/api/signup', {
          firstname: formData.firstname,
          lastname: formData.lastname,
          username: formData.username.toLowerCase().trim(),
          email: formData.email,
          password: formData.password
        });

        // Axios puts the server's response inside a 'data' object
        if (response.status === 201) {
          setMessage('Signup successful!');
          toast.success('Signup successful!');
          setErr(false);
          setFormData(initialFormState);
        }

      } catch (err) {
        // Axios catches 400 and 500 errors automatically in the 'catch' block
        if (err.response && err.response.data) {
          setMessage(err.response.data.message || 'Signup failed.');
          toast.error(err.response.data.message || 'Signup failed.');
          setErr(true);
        } else {
          setMessage('Cannot connect to server.');
          toast.error(err.response.data.message || 'Signup failed.');
          setErr(true);
        }
      }
    }
  };

  const handleGoogleOAuthTrigger = () => {
    console.log("Redirecting secure pipeline handshake node to Google OAuth 2.0 registration gateway...");
  };

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-pulse-bg-light flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-pulse-purple-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-pulse-pink-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Toaster />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xl relative z-10"
      >
        <div className="text-center mb-7">
          <div className="flex-col tracking-tight inline-block shrink-0">
            <a href="/" className=" flex items-center gap-0.5">
            <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" />
          </a>
          </div>
          <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">
            Register an account
          </h2>
          <p className="text-xs font-medium text-pulse-text-dark/50 mt-1">
            Build verified event ticket tiers or deploy social crowdfund vaults.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleOAuthTrigger}
          className="w-full py-3 px-4 bg-white border border-gray-200 hover:border-gray-300 rounded-xl font-bold text-sm text-pulse-text-dark flex items-center justify-center gap-3 shadow-xs transition-all cursor-pointer group"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.745 1.055 15.018 0 12 0 7.355 0 3.36 2.627 1.377 6.482l3.89 3.283z" />
            <path fill="#4285F4" d="M23.773 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.6c-.286 1.509-1.136 2.786-2.414 3.64l3.755 2.909c2.195-2.027 3.464-5.018 3.464-8.677z" />
            <path fill="#FBBC05" d="M5.266 14.235L1.377 17.52A11.956 11.956 0 010 12c0-2.01.5-3.909 1.377-5.518l3.89 3.283A7.052 7.052 0 004.91 12c0 .79.136 1.545.356 2.235z" />
            <path fill="#34A853" d="M12 24c3.245 0 5.973-1.073 7.964-2.918l-3.755-2.91c-1.045.7-2.382 1.119-4.209 1.119-3.236 0-5.982-2.182-6.964-5.118L1.377 17.41A11.966 11.966 0 0012 24z" />
          </svg>
          <span className="group-hover:text-pulse-purple-primary transition-colors">Sign up with Google</span>
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-[10px] font-black uppercase tracking-widest text-pulse-text-dark/30">Or Registration Form</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleRegistrationSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                required
                disabled={isLoading}
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder="John"
                className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                required
                disabled={isLoading}
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder="Doe"
                className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                disabled={isLoading}
                value={formData.username}
                onChange={handleInputChange}
                placeholder="john_doe"
                className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={isLoading}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="hello@example.com"
              className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
              Create password
            </label>
            <input
              type="password"
              name="password"
              required
              disabled={isLoading}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••••••"
              className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              required
              disabled={isLoading}
              value={formData.confirmpassword}
              onChange={handleInputChange}
              placeholder="••••••••••••"
              className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
            />
          </div>

          {message && <p className={`text-center mb-7 ${err ? 'text-red-500' : 'text-green-500'}`}><strong>{message}</strong></p>}

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
                  <span>Provisioning Account Node...</span>
                </>
              ) : (
                <>
                  Register<span className="hidden -ml-1 md:inline">An Account</span>
                </>
              )}
            </motion.button>
          </div>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-gray-100 text-xs font-semibold text-pulse-text-dark/60">
          <span>Already registered for an account? </span>
          <a href="/signin" className="text-pulse-purple-primary font-black hover:underline">
            Sign In
          </a>
        </div>
      </motion.div>
    </div>
  );
}