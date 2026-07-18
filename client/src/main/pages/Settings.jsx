import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Settings() {
  const [formData, setFormData] = useState({
    fullName: 'Barr. Adebayo Alex.U.',
    email: 'adebayo.alex@example.com',
    bankName: '',
    accountName: '',
    accountNumber: '',
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-pulse-gradient tracking-tighter">Settings</h1>
          <p className="text-gray-500 font-medium mt-2">Manage your platform identity and financial payout preferences.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Profile Section */}
          <section className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm space-y-6">
            <h2 className="text-xs font-black text-[#5a1fb5] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2378f]"></span>
              User Profile
            </h2>

            {/* Profile Picture Upload Layout */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100/80">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#5a1fb5] to-[#f2378f] text-white flex items-center justify-center font-black text-2xl shadow-sm overflow-hidden shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  'AA'
                )}
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <label className="cursor-pointer px-4 py-2.5 bg-gray-900 hover:bg-[#5a1fb5] text-white text-xs font-black rounded-xl transition-all shadow-md shadow-gray-950/5 select-none">
                  Upload Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </label>
                <p className="text-[10px] text-gray-400 font-medium">JPG, PNG or GIF formats supported.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold"
                />
              </div>
            </div>
          </section>

          {/* Banking Section */}
          <section className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
            <h2 className="text-xs font-black text-[#5a1fb5] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff4fa3]"></span>
              Financial Payouts
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Bank Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Zenith Bank"
                  value={formData.bankName}
                  onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Account Name</label>
                <input 
                  type="text" 
                  placeholder="Full Account Name"
                  value={formData.accountName}
                  onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Account Number</label>
                <input 
                  type="number" 
                  placeholder="0000000000"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold"
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
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#5a1fb5] to-[#7b2bc9] text-white font-black rounded-2xl hover:shadow-[0_8px_20px_rgba(90,31,181,0.3)] transition-all"
            >
              {saving ? 'Saving...' : 'Save Configuration'}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}