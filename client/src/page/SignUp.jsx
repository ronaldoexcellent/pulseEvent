import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [err, setErr] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRegistrationSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (formData.password !== formData.confirmpassword) {
//       setMessage('Passwords do not match.');
//       toast.error('Passwords do not match.');
//       setErr(true);
//       setTimeout(() => setIsLoading(false), 1500);
//       return;
//     }

//     else {
//       const loadtoast = toast.loading('Creating account...');
//       setTimeout(() => {
//         setIsLoading(false);
//         toast.dismiss(loadtoast);
//       }, 1500);

//       try {
//         // Axios POST request
//         const response = await axios.post('http://localhost:5000/api/signup', {
//           firstname: formData.firstname,
//           lastname: formData.lastname,
//           username: formData.username.toLowerCase().trim(),
//           email: formData.email,
//           password: formData.password
//         });

//         // Axios puts the server's response inside a 'data' object
//         if (response.status === 201) {
//           setMessage('Signup successful!');
//           toast.success('Signup successful!');
//           setErr(false);
//           setFormData(initialFormState);
//         }

//       } catch (err) {
//         // Axios catches 400 and 500 errors automatically in the 'catch' block
//         if (err.response && err.response.data) {
//           setMessage(err.response.data.message || 'Signup failed.');
//           toast.error(err.response.data.message || 'Signup failed.');
//           setErr(true);
//         } else {
//           setMessage('Cannot connect to server.');
//           toast.error(err.response.data.message || 'Signup failed.');
//           setErr(true);
//         }
//       }
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     // credentialResponse.credential contains the secure JWT token
//     const token = credentialResponse.credential;

//     try {
//       // Send this token to your Express backend
//       const response = await fetch('http://localhost:5000/api/auth/google', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token }),
//       });

//       const data = await response.json();
      
//       if (response.ok) {
//         console.log('User authenticated successfully:', data);
//         // Save your own app's JWT to localStorage, redirect user, etc.
//       }
//     } catch (error) {
//       console.error('Error during backend authentication:', error);
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
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
//               <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" />
//             </a>
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
//               onError={() => {
//                 console.log('Google Sign In Failed');
//               }}
//               useOneTap // Optional: Prompts user automatically if they are signed into Chrome
//               shape="rectangular"
//               theme="outline"
//             />
//           </div>

//           <div className="flex items-center my-6">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="px-3 text-[10px] font-black uppercase tracking-widest text-pulse-text-dark/30">Or Registration Form</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>

//           <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstname"
//                   required
//                   disabled={isLoading}
//                   value={formData.firstname}
//                   onChange={handleInputChange}
//                   placeholder="John"
//                   className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="lastname"
//                   required
//                   disabled={isLoading}
//                   value={formData.lastname}
//                   onChange={handleInputChange}
//                   placeholder="Doe"
//                   className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
//                 />
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
//                   required
//                   disabled={isLoading}
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   placeholder="john_doe"
//                   className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 disabled={isLoading}
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="hello@example.com"
//                 className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                 Create password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   required
//                   disabled={isLoading}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="••••••••••••"
//                   className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60 pr-12"
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
//             </div>

//             <div>
//               <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="confirmpassword"
//                   required
//                   disabled={isLoading}
//                   value={formData.confirmpassword}
//                   onChange={handleInputChange}
//                   placeholder="••••••••••••"
//                   className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60 pr-12"
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
//             </div>

//             {message && <p className={`text-center mb-7 ${err ? 'text-red-500' : 'text-green-500'}`}><strong>{message}</strong></p>}

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

export default function SignUp() {
  const initialFormState = { 
    firstname: '', 
    lastname: '', 
    username: '',
    email: '', 
    password: '',
    confirmPassword: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Fixed casing matching the state structure definition
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      toast.error('Passwords do not match.');
      setErr(true);
      setTimeout(() => setIsLoading(false), 1500);
      return;
    }

    const loadtoast = toast.loading('Creating account...');

    try {
      // Axios POST request to native signup endpoint
      const response = await axios.post('http://localhost:5000/api/signup', {
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username.toLowerCase().trim(),
        email: formData.email,
        password: formData.password
      });

      toast.dismiss(loadtoast);
      setIsLoading(false);

      if (response.status === 201) {
        setMessage('Signup successful!');
        toast.success('Signup successful!');
        setErr(false);
        setFormData(initialFormState);
        
        // Store your app's system authentication token
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
      }

    } catch (error) {
      toast.dismiss(loadtoast);
      setIsLoading(false);
      setErr(true);

      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Signup failed.');
        toast.error(error.response.data.message || 'Signup failed.');
      } else {
        setMessage('Cannot connect to server.');
        toast.error('Cannot connect to server.');
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const loadtoast = toast.loading('Processing Google sign in...');
    console.log(credentialResponse.credential);

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
        
        // Save your app's standard JWT to localStorage
        localStorage.setItem('token', data.token);
        console.log('User authenticated successfully:', data);
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                toast.error('Google Sign In Failed');
                console.log('Google Sign In Failed');
              }}
              useOneTap
              shape="rectangular"
              theme="outline"
            />
          </div>

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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  disabled={isLoading}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pulse-purple-primary transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  disabled={isLoading}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pulse-purple-primary transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {message && <p className={`text-center mb-4 text-xs ${err ? 'text-red-500' : 'text-green-500'}`}><strong>{message}</strong></p>}

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
    </GoogleOAuthProvider>
  );
}