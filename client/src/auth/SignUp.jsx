// import { useState } from 'react';
// import axios from 'axios';
// import { toast, Toaster } from 'react-hot-toast'; 
// import { motion } from 'framer-motion';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

// // 1. Define Validation Rules
// const validationRules = {
//   firstname: { required: true, minLength: 2, message: "First name must be at least 2 characters." },
//   lastname: { required: true, minLength: 2, message: "Last name must be at least 2 characters." },
//   username: { required: true, pattern: /^[a-zA-Z0-9_]+$/, message: "Letters, numbers, and underscores only." },
//   email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email." },
//   password: { required: true, minLength: 8, message: "Password must be at least 8 characters." }
// };

// // 2. Validation Logic Function
// function validateForm(formData, rules) {
//   const errors = {};

//   for (const field in rules) {
//     const value = formData[field] ? formData[field].trim() : "";
//     const rule = rules[field];

//     if (rule.required && !value) {
//       errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
//       continue;
//     }
//     if (rule.minLength && value.length < rule.minLength) {
//       errors[field] = rule.message;
//       continue;
//     }
//     if (rule.pattern && !rule.pattern.test(value)) {
//       errors[field] = rule.message;
//       continue;
//     }
//   }

//   // Special check for confirm password
//   if (formData.password !== formData.confirmPassword) {
//     errors.confirmPassword = "Passwords do not match.";
//   }

//   return errors;
// }

// export default function SignUp() {
//   const initialFormState = { 
//     firstname: '', 
//     lastname: '', 
//     username: '',
//     email: '', 
//     password: '',
//     confirmPassword: ''
//   };
  
//   const [formData, setFormData] = useState(initialFormState);
//   const [formErrors, setFormErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
    
//     if (formErrors[name]) {
//       setFormErrors((prev) => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleRegistrationSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     // Run Validation
//     const errors = validateForm(formData, validationRules);

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       toast.error('Please fix the errors in the form.');
//       setIsLoading(false);
//       return;
//     }

//     const loadtoast = toast.loading('Creating account...');

//     try {
//       const response = await axios.post('http://localhost:5000/api/signup', {
//         firstname: formData.firstname,
//         lastname: formData.lastname,
//         username: formData.username.toLowerCase().trim(),
//         email: formData.email,
//         password: formData.password
//       });

//       toast.dismiss(loadtoast);
//       setIsLoading(false);

//       if (response.status === 201) {
//         const successMsg = response.data.message || 'Check email for OTP!';
//         setMessage(successMsg);
//         toast.success(successMsg, { duration: 6000 });
//         setFormData(initialFormState);
//         setFormErrors({});
//         navigate('/verify-email');
//       }

//     } catch (error) {
//       toast.dismiss(loadtoast);
//       setIsLoading(false);

//       if (error.response && error.response.data) {
//         setMessage(error.response.data.message || 'Signup failed.');
//         toast.error(error.response.data.message || 'Signup failed.');
//       } else {
//         setMessage('Cannot connect to server.');
//         toast.error('Cannot connect to server.');
//       }
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     const token = credentialResponse.credential;
//     const loadtoast = toast.loading('Processing Google sign in...');

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/google', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadtoast);
      
//       if (response.ok) {
//         setMessage('Google authentication successful!');
//         toast.success('Google login successful!');
        
//         // Google auth is auto-verified, so we save the token
//         localStorage.setItem('token', data.token);
        
//         window.location.href = '/dashboard';
//       } else {
//         setMessage(data.message || 'Google Auth Failed.');
//         toast.error(data.message || 'Google Auth Failed.');
//       }
//     } catch (error) {
//       toast.dismiss(loadtoast);
//       console.error('Error during backend authentication:', error);
//       setMessage('Server synchronization failed.');
//       toast.error('Server synchronization failed.');
//     }
//   };

//   const getInputClasses = (fieldName) => {
//     const baseClasses = "w-full bg-pulse-bg-light border text-sm font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 disabled:opacity-60";
//     return formErrors[fieldName] 
//       ? `${baseClasses} border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/10` 
//       : `${baseClasses} border-gray-200 text-pulse-text-dark focus:border-pulse-purple-primary focus:ring-pulse-purple-primary/10`;
//   };

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <div className="min-h-[calc(100vh-73px)] w-full bg-pulse-bg-light flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
//         <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-pulse-purple-secondary/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-pulse-pink-primary/5 rounded-full blur-3xl pointer-events-none" />

//         <Toaster />

//         <motion.div
//           initial={{ opacity: 0, y: 30, scale: 0.98 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//           className="w-full max-w-xl bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xl relative z-10"
//         >
//           <div className="text-center mb-7">
//             <div className="flex-col tracking-tight inline-block shrink-0">
//               <a href="/" className=" flex items-center gap-0.5">
//                 <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" />
//               </a>
//             </div>
//             <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">
//               Register an account
//             </h2>
//             <p className="text-xs font-medium text-pulse-text-dark/50 mt-1">
//               Build verified event ticket tiers or deploy social crowdfund vaults.
//             </p>
//           </div>

//           <div className="flex justify-center">
//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={() => toast.error('Google Sign In Failed')}
//               useOneTap
//               shape="rectangular"
//               theme="outline"
//             />
//           </div>

//           <div className="flex items-center my-6">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="px-3 text-[10px] font-black uppercase tracking-widest text-pulse-text-dark/30">Or Registration Form</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>

//           <form onSubmit={handleRegistrationSubmit} className="space-y-4" noValidate>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstname"
//                   disabled={isLoading}
//                   value={formData.firstname}
//                   onChange={handleInputChange}
//                   placeholder="John"
//                   className={getInputClasses("firstname")}
//                 />
//                 {formErrors.firstname && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.firstname}</p>}
//               </div>
//               <div>
//                 <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="lastname"
//                   disabled={isLoading}
//                   value={formData.lastname}
//                   onChange={handleInputChange}
//                   placeholder="Doe"
//                   className={getInputClasses("lastname")}
//                 />
//                 {formErrors.lastname && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.lastname}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   disabled={isLoading}
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   placeholder="john_doe"
//                   className={getInputClasses("username")}
//                 />
//                 {formErrors.username && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.username}</p>}
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 disabled={isLoading}
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="hello@example.com"
//                 className={getInputClasses("email")}
//               />
//               {formErrors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.email}</p>}
//             </div>

//             <div>
//               <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                 Create password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   disabled={isLoading}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="••••••••••••"
//                   className={`${getInputClasses("password")} pr-12`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pulse-purple-primary transition-colors focus:outline-none"
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {formErrors.password && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.password}</p>}
//             </div>

//             <div>
//               <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   disabled={isLoading}
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   placeholder="••••••••••••"
//                   className={`${getInputClasses("confirmPassword")} pr-12`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pulse-purple-primary transition-colors focus:outline-none"
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {formErrors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 font-semibold">{formErrors.confirmPassword}</p>}
//             </div>

//             {message && <p className={`text-center mb-4 text-xs ${err ? 'text-red-500' : 'text-green-500'}`}><strong>{message}</strong></p>}

//             <div className="pt-2">
//               <motion.button
//                 whileHover={!isLoading ? { scale: 1.01 } : {}}
//                 whileTap={!isLoading ? { scale: 0.99 } : {}}
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3.5 bg-pulse-gradient hover:bg-pulse-gradient-hover text-white font-black text-sm rounded-xl shadow-lg shadow-pulse-purple-primary/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     <span>Provisioning Account Node...</span>
//                   </>
//                 ) : (
//                   <>
//                     Register<span className="hidden -ml-1 md:inline">An Account</span>
//                   </>
//                 )}
//               </motion.button>
//             </div>
//           </form>

//           <div className="text-center mt-6 pt-5 border-t border-gray-100 text-xs font-semibold text-pulse-text-dark/60">
//             <span>Already registered for an account? </span>
//             <a href="/signin" className="text-pulse-purple-primary font-black hover:underline">
//               Sign In
//             </a>
//           </div>
//         </motion.div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }




import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

// ==========================================
// 1. Validation Rules & Logic
// ==========================================
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

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ firstname: '', lastname: '', username: '', email: '', password: '', confirmPassword: '' });
  const [formErrors, setFormErrors] = useState({});
  const [otpInput, setOtpInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Helper for UI class management
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

  // ==========================================
  // HANDLER: Step 1 (Registration)
  // ==========================================
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

    const loadtoast = toast.loading('Creating account...');

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username.toLowerCase().trim(),
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true // Ensures session initialization can pass cookies if needed
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

  // ==========================================
  // HANDLER: Step 2 (Verification)
  // ==========================================
  // ... inside your handleSubmit functions
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        email: formData.email, // <--- Just pass the email
        otp: otpInput
      }, {
        withCredentials: true // CRITICAL: Allows the browser to accept and save the HttpOnly cookie
      });
      
      // Handle success
      toast.success(response.data.message);
      
      // OPTIONAL: If you maintain a user state in an AuthContext, update it here:
      // setUser(response.data.user); 
      
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || 'Verification failed.';
      setMessage(msg); // Displays to user
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // HANDLER: Google Auth
  // ==========================================
  const handleGoogleSuccess = async (credentialResponse) => {
    // const loadtoast = toast.loading('Processing...');
    // try {
    //   const response = await axios.post('http://localhost:5000/api/auth/google', {
    //     token: credentialResponse.credential
    //   });
    //   localStorage.setItem('token', response.data.token);
    //   window.location.href = '/dashboard';
    // } catch (error) {
    //   toast.dismiss(loadtoast);
    //   toast.error('Google Auth Failed.');
    // }

    const token = credentialResponse.credential;
    const loadtoast = toast.loading('Processing Google sign in...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      toast.dismiss(loadtoast);
      
      if (response.ok) {
        setMessage('Google authentication successful!');
        toast.success('Google login successful!');
        setErr(false);
        
        // Google auth is auto-verified, so we save the token
        localStorage.setItem('token', data.token);
        
        // OPTIONAL: Redirect the user to your dashboard here
        // window.location.href = '/dashboard';
      } else {
        setMessage(data.message || 'Google Auth Failed.');
        toast.error(data.message || 'Google Auth Failed.');
        setErr(true);
      }
    } catch (error) {
      toast.dismiss(loadtoast);
      console.error('Error during backend authentication:', error);
      setMessage('Server synchronization failed.');
      toast.error('Server synchronization failed.');
      setErr(true);
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
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error('Google Sign In Failed')} useOneTap shape="rectangular" theme="outline" />
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
                  <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-pulse-gradient hover:bg-pulse-gradient-hover text-white font-black text-sm rounded-xl shadow-lg shadow-pulse-purple-primary/20">
                    {isLoading ? 'Processing...' : 'Register'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <form onSubmit={handleVerifySubmit} className="space-y-6">
                  <input type="text" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="000000" className="w-full text-center text-3xl tracking-[0.5em] font-black py-6 bg-pulse-bg-light border border-gray-200 rounded-xl" maxLength={6} required />
                  <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-pulse-gradient hover:bg-pulse-gradient-hover text-white font-black text-sm rounded-xl shadow-lg">
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