import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from "../../../context/ThemeProvider";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();

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
    <div className="p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-pulse-gradient tracking-tighter">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Manage your platform identity and financial payout preferences.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Appearance Section */}
          <section className="bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm transition-colors duration-300">
            <h2 className="text-xs font-black text-[#5a1fb5] dark:text-[#a77bfa] uppercase tracking-widest flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5a1fb5]"></span>
              Appearance
            </h2>
            
            <div className="flex items-center justify-between p-4 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-2xl transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-[#5a1fb5] dark:text-[#a77bfa]">
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Dark Mode</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Adjust the appearance of your account</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleDarkMode}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${darkMode ? 'bg-[#5a1fb5]' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </section>

          {/* Profile Section */}
          <section className="bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm space-y-6 transition-colors duration-300">
            <h2 className="text-xs font-black text-[#5a1fb5] dark:text-[#a77bfa] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2378f]"></span>
              User Profile
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100/80 dark:border-gray-800">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#5a1fb5] to-[#f2378f] text-white flex items-center justify-center font-black text-2xl shadow-sm overflow-hidden shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  'AA'
                )}
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <label className="cursor-pointer px-4 py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-[#5a1fb5] text-white text-xs font-black rounded-xl transition-all shadow-md select-none">
                  Upload Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
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
                  className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] transition-all font-bold"
                />
              </div>
            </div>
          </section>

          {/* Banking Section */}
          <section className="bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm transition-colors duration-300">
            <h2 className="text-xs font-black text-[#5a1fb5] dark:text-[#a77bfa] uppercase tracking-widest mb-6 flex items-center gap-2">
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
                  className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Account Name</label>
                <input 
                  type="text" 
                  placeholder="Full Account Name"
                  value={formData.accountName}
                  onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Account Number</label>
                <input 
                  type="number" 
                  placeholder="0000000000"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] transition-all font-bold"
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