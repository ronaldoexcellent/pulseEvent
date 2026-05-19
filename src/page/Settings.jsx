import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: 'Adebayo Alex',
    email: 'adebayo.alex@example.com',
    bankName: '',
    accountName: '',
    accountNumber: '',
  });

  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API request
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="p-6 md:p-12 max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-950 uppercase tracking-tighter">Settings</h1>
        <p className="text-gray-500 font-medium mt-2">Manage your platform identity and financial payout preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Profile Section */}
        <section className="bg-white/70 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6">User Profile</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Full Name</label>
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold"
              />
            </div>
          </div>
        </section>

        {/* Banking Section */}
        <section className="bg-white/70 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6">Financial Payouts</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Bank Name</label>
              <input 
                type="text" 
                placeholder="e.g. Zenith Bank"
                value={formData.bankName}
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Account Name</label>
              <input 
                type="text" 
                placeholder="Full Account Name"
                value={formData.accountName}
                onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Account Number</label>
              <input 
                type="number" 
                placeholder="0000000000"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold"
              />
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full md:w-auto px-10 py-4 bg-gray-950 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-600/20"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}