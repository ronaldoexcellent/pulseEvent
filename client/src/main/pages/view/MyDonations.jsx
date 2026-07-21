import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, Calendar, DollarSign, Download, ExternalLink, X, Heart } from 'lucide-react';

// Mock data to simulate the PostgreSQL database fetch
const mockDonations = [
  {
    id: 'DON-847291',
    eventName: 'Tech Startups Africa 2026',
    date: '2026-07-15',
    amount: 50000,
    currency: 'NGN',
    status: 'Completed',
    paymentMethod: 'Paystack'
  },
  {
    id: 'DON-392810',
    eventName: 'Lagos Orphanage Support Fund',
    date: '2026-06-22',
    amount: 15000,
    currency: 'NGN',
    status: 'Completed',
    paymentMethod: 'OPay'
  },
  {
    id: 'DON-102938',
    eventName: 'Creative Design Workshop Grant',
    date: '2026-05-10',
    amount: 25000,
    currency: 'NGN',
    status: 'Completed',
    paymentMethod: 'Moniepoint'
  },
];

export default function MyDonations() {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Calculate totals for the summary cards
  const totalDonated = mockDonations.reduce((acc, curr) => acc + curr.amount, 0);
  const campaignsSupported = mockDonations.length;

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] to-[#f2378f] tracking-tighter">
            My Donations
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
            Track your contributions and support across Pulse Event campaigns.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm flex items-center gap-4 transition-colors"
          >
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-[#5a1fb5] dark:text-[#a77bfa]">
              <DollarSign size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Impact</p>
              <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
                {formatCurrency(totalDonated, 'NGN')}
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm flex items-center gap-4 transition-colors"
          >
            <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/50 text-[#f2378f] dark:text-[#f472b6]">
              <Heart size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Campaigns</p>
              <p className="text-2xl font-black text-gray-900 dark:text-gray-100">
                {campaignsSupported} Supported
              </p>
            </div>
          </motion.div>
        </div>

        {/* Donations List */}
        <section className="bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm transition-colors">
          <h2 className="text-xs font-black text-[#5a1fb5] dark:text-[#a77bfa] uppercase tracking-widest flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#5a1fb5]"></span>
            Donation History
          </h2>

          <div className="space-y-4">
            {mockDonations.map((donation) => (
              <div 
                key={donation.id} 
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-2xl transition-colors gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">
                    {donation.eventName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {formatDate(donation.date)}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md font-bold">
                      {donation.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-6">
                  <div className="text-left md:text-right">
                    <p className="font-black text-lg text-gray-900 dark:text-gray-100">
                      {formatCurrency(donation.amount, donation.currency)}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedReceipt(donation)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-gray-800 hover:bg-[#5a1fb5] dark:hover:bg-[#a77bfa] text-white text-xs font-black rounded-xl transition-all shadow-sm"
                  >
                    <Receipt size={16} />
                    Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Receipt Modal Overlay */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReceipt(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-8 z-10"
            >
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-50 dark:bg-purple-950/50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#5a1fb5] dark:text-[#a77bfa]">
                  <Receipt size={32} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Donation Receipt</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{selectedReceipt.id}</p>
              </div>

              <div className="space-y-4 text-sm mb-8 bg-[#f7f7fa] dark:bg-[#22222d] p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Event</span>
                  <span className="font-bold text-gray-900 dark:text-white text-right max-w-[60%]">{selectedReceipt.eventName}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Date</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formatDate(selectedReceipt.date)}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Payment Method</span>
                  <span className="font-bold text-gray-900 dark:text-white">{selectedReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Amount Donated</span>
                  <span className="text-xl font-black text-[#5a1fb5] dark:text-[#a77bfa]">
                    {formatCurrency(selectedReceipt.amount, selectedReceipt.currency)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl transition-colors">
                  <Download size={18} />
                  PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#5a1fb5] to-[#7b2bc9] text-white font-bold rounded-xl hover:shadow-[0_8px_20px_rgba(90,31,181,0.3)] transition-all">
                  <ExternalLink size={18} />
                  Share
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}