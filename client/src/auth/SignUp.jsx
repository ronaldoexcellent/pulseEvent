import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import PageLoading from '../components/loaders/pageLoading';

const validationRules = {
  firstname: { required: true, minLength: 2, message: "First name must be at least 2 characters." },
  lastname: { required: true, minLength: 2, message: "Last name must be at least 2 characters." },
  username: { required: true, pattern: /^[a-zA-Z0-9_]+$/, message: "Letters, numbers, and underscores only." },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email." },
  password: { required: true, minLength: 8, message: "Password must be at least 8 characters." }
};

function validateForm(formData, rules) {
  const errors = {};
  for (const field in rules) {
    const value = formData[field] ? formData[field].trim() : "";
    const rule = rules[field];
    if (rule.required && !value) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      continue;
    }
    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = rule.message;
      continue;
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message;
      continue;
    }
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}

export default function SignUp({ onSignUpSuccess }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ firstname: '', lastname: '', username: '', email: '', password: '', confirmPassword: '' });
  const [formErrors, setFormErrors] = useState({});
  const [otpInput, setOtpInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { setUser, user, loading } = useAuth();

  if (loading) {
    return <PageLoading />;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  const getInputClasses = (fieldName) => {
    const baseClasses = "w-full bg-pulse-bg-light border text-sm font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 disabled:opacity-60";
    return formErrors[fieldName] 
      ? `${baseClasses} border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/10` 
      : `${baseClasses} border-gray-200 text-pulse-text-dark focus:border-pulse-purple-primary focus:ring-pulse-purple-primary/10`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const errors = validateForm(formData, validationRules);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the errors in the form.');
      setIsLoading(false);
      return;
    }

    const loadtoast = toast.loading('Sending OTP...');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/signup`, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username.toLowerCase().trim(),
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true
      });
      toast.success(response.data.message || 'Verification code sent!');
      setStep(2); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
      toast.dismiss(loadtoast);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/signup`, {
        email: formData.email, // <--- Just pass the email
        otp: otpInput
      }, {
        withCredentials: true // CRITICAL: Allows the browser to accept and save the HttpOnly cookie
      });
      
      // Handle success
      toast.success(response.data.message);
      
      // OPTIONAL: If you maintain a user state in an AuthContext, update it here:
      // setUser(response.data.user); 
      
      // navigate(from, { replace: true });
      window.location.replace(from);
      if (onSignUpSuccess) onSignUpSuccess(response.data.user);
    } catch (error) {
      const msg = error.response?.data?.message || 'Verification failed.';
      setMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
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
      if (onSignUpSuccess) onSignUpSuccess(response.data.user);
    } catch (error) {
      toast.dismiss(loadtoast);
      toast.error(error.response?.data?.message || 'Google Auth failed.');
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="min-h-[calc(100vh-73px)] w-full bg-pulse-bg-light flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-pulse-purple-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-pulse-pink-primary/5 rounded-full blur-3xl pointer-events-none" />
        <Toaster position="top-center" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xl relative z-10 overflow-hidden"
        >
          <div className="text-center mb-7">
            <a href="/" className="flex items-center gap-0.5 justify-center">
              <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" />
            </a>
            <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">
              {step === 1 ? 'Register an account' : 'Verify Your Email'}
            </h2>
            <p className="text-xs font-medium text-pulse-text-dark/50 mt-1">
              {step === 1 ? 'Build verified event ticket tiers or deploy social crowdfund vaults.' : 'Enter the 6-digit code sent to your email.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex justify-center">
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error('Google Sign In Failed')} shape="circle" theme="outline" />
                  {/* useOneTap - GoogleLogin Attribute */}
                </div>
                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-200" /><span className="px-3 text-[10px] font-black uppercase tracking-widest text-pulse-text-dark/30">Or Registration</span><div className="flex-1 h-px bg-gray-200" />
                </div>
                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input type="text" name="firstname" onChange={handleInputChange} placeholder="First Name" className={getInputClasses("firstname")} />
                      {formErrors.firstname && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.firstname}</p>}
                    </div>
                    <div>
                      <input type="text" name="lastname" onChange={handleInputChange} placeholder="Last Name" className={getInputClasses("lastname")} />
                      {formErrors.lastname && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.lastname}</p>}
                    </div>
                  </div>
                  <div>
                    <input type="text" name="username" onChange={handleInputChange} placeholder="Username" className={getInputClasses("username")} />
                    {formErrors.username && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.username}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" onChange={handleInputChange} placeholder="Email" className={getInputClasses("email")} />
                    {formErrors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.email}</p>}
                  </div>
                  <div>
                    <input type="password" name="password" onChange={handleInputChange} placeholder="Password" className={getInputClasses("password")} />
                    {formErrors.password && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.password}</p>}
                  </div>
                  <div>
                    <input type="password" name="confirmPassword" onChange={handleInputChange} placeholder="Confirm Password" className={getInputClasses("confirmPassword")} />
                    {formErrors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.confirmPassword}</p>}
                  </div>
                  {message && <p className={`text-center mb-4 text-xs ${err ? 'text-red-500' : 'text-green-500'}`}><strong>{message}</strong></p>}
                  <button type="submit" disabled={isLoading} className="cursor-none w-full py-3.5 bg-pulse-gradient hover:bg-pulse-gradient-hover text-white font-black text-sm rounded-xl shadow-lg shadow-pulse-purple-primary/20">
                    {isLoading ? 'Processing...' : 'Register'}
                  </button>
                </form>

                <div className="text-center mt-4 pt-5 border-t border-gray-100 text-xs font-semibold text-pulse-text-dark/60">
                  <span> Already have an account? </span>
                  <a href="/signin" className="text-pulse-purple-primary font-black hover:underline">Sign In</a>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <form onSubmit={handleVerifySubmit} className="space-y-6">
                  <input type="text" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="000000" className="w-full text-center text-3xl tracking-[0.5em] font-black py-6 bg-pulse-bg-light border border-gray-200 rounded-xl" maxLength={6} required />
                  <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-pulse-gradient hover:bg-pulse-gradient-hover text-white font-black text-sm rounded-xl shadow-lg cursor-alias">
                    {isLoading ? 'Verifying...' : 'Complete Account'}
                  </button>
                  <button type="button" onClick={() => setStep(1)} className="w-full text-xs font-semibold text-gray-500 hover:text-pulse-purple-primary">
                    Back to registration
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
}