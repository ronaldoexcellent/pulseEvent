import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignUp({ onSignUpSuccess }) {
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    username: '', 
    nationality: '', 
    email: '', 
    password: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Curated list of African countries for the tailored selection node
  const africanCountries = [
    { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
    { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
    { code: 'CV', name: 'Cabo Verde', flag: '🇨🇻' },
    { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
    { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
    { code: 'TD', name: 'Chad', flag: '🇹🇩' },
    { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
    { code: 'CD', name: 'DR Congo', flag: '🇨🇩' },
    { code: 'CG', name: 'Congo-Brazzaville', flag: '🇨🇬' },
    { code: 'CI', name: 'Côte d’Ivoire', flag: '🇨🇮' },
    { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
    { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
    { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
    { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
    { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
    { code: 'LY', name: 'Libya', flag: '🇱🇾' },
    { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
    { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
    { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
    { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
    { code: 'ST', name: 'São Tomé & Príncipe', flag: '🇸🇹' },
    { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
    { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
    { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { code: 'TG', name: 'Togo', flag: '🇹🇬' },
    { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
    { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' }
  ];

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

  const selectCountry = (countryName) => {
    setFormData((prev) => ({ ...prev, nationality: countryName }));
    setIsDropdownOpen(false);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (isLoading || !formData.nationality) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSignUpSuccess) {
        onSignUpSuccess({ 
          username: formData.username.toLowerCase().trim(), 
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          nationality: formData.nationality
        });
      }
    }, 1500);
  };

  const handleGoogleOAuthTrigger = () => {
    console.log("Redirecting secure pipeline handshake node to Google OAuth 2.0 registration gateway...");
  };

  // Locate current country profile mapping metadata object
  const selectedCountryObj = africanCountries.find(c => c.name === formData.nationality);

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-pulse-bg-light flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-pulse-purple-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-pulse-pink-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xl relative z-10"
      >
        <div className="text-center mb-8">
         <div className="flex flex-col tracking-tight inline-block shrink-0">
          <a href="/" className=" flex items-center gap-0.5">
           <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" />
          </a>
          
        </div>
         {/* <a href="/" className="text-2xl font-black tracking-tight text-pulse-text-dark inline-block">
            Pulse<span className="text-pulse-purple-primary">Event</span>
          </a> */}
          <h2 className="text-xl font-black text-pulse-text-dark tracking-tight mt-3">
            Initialize Your Settlement Node
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
                name="firstName"
                required
                disabled={isLoading}
                value={formData.firstName}
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
                name="lastName"
                required
                disabled={isLoading}
                value={formData.lastName}
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

            {/* --- Custom Styled African Region Selection Dropdown --- */}
            <div ref={dropdownRef} className="relative">
              <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
                Nationality
              </label>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full bg-pulse-bg-light border text-left text-sm font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 flex items-center justify-between transition-all ${isDropdownOpen ? 'border-pulse-purple-primary ring-2 ring-pulse-purple-primary/10' : 'border-gray-200'} ${!formData.nationality ? 'text-gray-400' : 'text-pulse-text-dark'}`}
              >
                <span className="flex items-center gap-2">
                  {selectedCountryObj ? (
                    <>
                      <span className="text-base leading-none">{selectedCountryObj.flag}</span>
                      <span>{selectedCountryObj.name}</span>
                    </>
                  ) : (
                    "Select African Country"
                  )}
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200"
                  >
                    <div className="sticky top-0 bg-white px-4 py-2 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-pulse-text-dark/40">
                      Regional Settlement Corridors
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      {africanCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => selectCountry(country.name)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-colors ${formData.nationality === country.name ? 'bg-pulse-purple-primary/10 text-pulse-purple-primary font-bold' : 'text-pulse-text-dark hover:bg-pulse-bg-light'}`}
                        >
                          <span className="text-base leading-none">{country.flag}</span>
                          <span>{country.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
              placeholder="hello@stelynk.com"
              className="w-full bg-pulse-bg-light border border-gray-200 focus:border-pulse-purple-primary text-sm font-medium text-pulse-text-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pulse-purple-primary/10 transition-all placeholder:text-gray-400 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-pulse-text-dark/60 mb-2">
              Secure Passphrase
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
                <span>Register Platform Credentials ⚡</span>
              )}
            </motion.button>
          </div>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-gray-100 text-xs font-semibold text-pulse-text-dark/60">
          <span>Already registered on the ledger? </span>
          <a href="/signin" className="text-pulse-purple-primary font-black hover:underline">
            Authenticate Access
          </a>
        </div>
      </motion.div>
    </div>
  );
}