import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    type: 'feature',
    rating: 0,
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ type: 'feature', rating: 0, message: '' });
      
      // Reset success message
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-800 uppercase tracking-tighter">Feedback</h1>
          <p className="text-gray-500 font-medium mt-2">Help us improve by sharing your thoughts and experiences.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <section className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm space-y-8">
            
            {/* Feedback Type */}
            <div>
              <h2 className="text-xs font-black text-[#5a1fb5] uppercase tracking-widest flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f2378f]"></span>
                Feedback Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['bug', 'feature', 'general'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
                      formData.type === type
                        ? 'border-[#5a1fb5] bg-[#5a1fb5]/5 text-[#5a1fb5]'
                        : 'border-transparent bg-[#f7f7fa] text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {type === 'bug' ? 'Bug Report' : type === 'feature' ? 'Feature Request' : 'General'}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Rating */}
            <div>
              <h2 className="text-xs font-black text-[#5a1fb5] uppercase tracking-widest flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#ff4fa3]"></span>
                Rate your experience
              </h2>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${
                      formData.rating >= star 
                        ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-400/30' 
                        : 'bg-[#f7f7fa] text-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Details */}
            <div>
              <h2 className="text-xs font-black text-[#5a1fb5] uppercase tracking-widest flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#5a1fb5]"></span>
                Additional Details
              </h2>
              <textarea 
                rows="6"
                placeholder="Tell us what you love, what's broken, or what could be better..."
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-4 bg-[#f7f7fa] border border-gray-200 text-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent transition-all font-bold resize-none"
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
                  Thank you for your feedback!
                </motion.p>
              )}
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={submitting}
              className={`w-full md:w-auto px-10 py-4 font-black rounded-2xl transition-all ${
                submitting 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#5a1fb5] to-[#7b2bc9] text-white hover:shadow-[0_8px_20px_rgba(90,31,181,0.3)]'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}