import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-800 uppercase tracking-tighter">Support</h1>
          <p className="text-gray-500 font-medium mt-2">Need help? Send us a message and our team will get back to you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <section className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm space-y-6">
            <h2 className="text-xs font-black text-[#5a1fb5] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2378f]"></span>
              Contact Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Jane Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Subject</label>
              <input 
                type="text" 
                placeholder="How can we help you?"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Message</label>
              <textarea 
                rows="5"
                placeholder="Describe your issue in detail..."
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold resize-none"
              ></textarea>
            </div>
          </section>

          {/* Submit Button & Status Message */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              {success && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-200"
                >
                  Message sent successfully!
                </motion.p>
              )}
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={sending}
              className={`w-full md:w-auto px-10 py-4 font-black rounded-2xl transition-all ${
                sending 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#5a1fb5] to-[#7b2bc9] text-white hover:shadow-[0_8px_20px_rgba(90,31,181,0.3)]'
              }`}
            >
              {sending ? 'Sending...' : 'Send Message'}
            </motion.button>
          </div>
        </form>

        {/* Quick Links / Alternative Contact */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-[#5a1fb5]/10 text-[#5a1fb5] rounded-xl shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">Email Support</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">Prefer to email us directly? Reach out and we'll respond within 24 hours.</p>
              <a href="mailto:support@example.com" className="text-xs font-bold text-[#5a1fb5] hover:underline mt-2 inline-block">support@example.com</a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-[#f2378f]/10 text-[#f2378f] rounded-xl shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">Documentation</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">Check out our guides and FAQs for quick answers to common issues.</p>
              <a href="/docs" className="text-xs font-bold text-[#f2378f] hover:underline mt-2 inline-block">Visit Help Center</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}