import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import this hook



export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate(); // Initialize the router navigator

  

const handleLogin = (e) => {
  e.preventDefault();
  
  // MOCK VALIDATION: 
  // Replace this block later with your actual Backend API response
  if (credentials.username === 'admin' && credentials.password === '1234') {
    
    // Save state so ProtectedRoute allows access
    localStorage.setItem('isAdminAuthenticated', 'true');
    
    // Redirect to the overview page
    navigate('/admin'); 
  } else {
    alert('Invalid credentials');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7fa] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Admin Access</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Prototype Interface</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username</label>
            <input 
              type="text" 
              required
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#5a1fb5]/20 outline-none transition-all font-bold text-sm"
              placeholder="e.g. admin"
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#5a1fb5]/20 outline-none transition-all font-bold text-sm"
              placeholder="••••••••"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          {status === 'error' && (
            <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest text-center mt-2 animate-pulse">
              Invalid credentials provided
            </p>
          )}

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#5a1fb5] hover:bg-[#4a1895] text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors mt-4"
          >
            {status === 'loading' ? 'Verifying...' : 'Initialize Access'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}