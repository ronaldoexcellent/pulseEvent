import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pool of random notifications to simulate live social proof popping up
const MOCK_LIVE_DONATIONS_POOL = [
  { name: 'Adebayo Alex U.', amount: 50000, location: 'Lagos' },
  { name: 'Anonymous', amount: 15000, location: 'Abuja' },
  { name: 'Chidi K.', amount: 5000, location: 'Enugu' },
  { name: 'Anonymous', amount: 100000, location: 'Port Harcourt' },
  { name: 'Funmi O.', amount: 20000, location: 'Ibadan' },
  { name: 'Anonymous', amount: 3500, location: 'Kaduna' }
];

export default function LiveDonationNotification({ currency = '₦' }) {
  const [liveNotification, setLiveNotification] = useState(null);

  useEffect(() => {
    let index = 0;
    
    const triggerNextNotification = () => {
      const liveItem = MOCK_LIVE_DONATIONS_POOL[index];
      setLiveNotification({
        id: `live-${Date.now()}`,
        ...liveItem
      });

      index = (index + 1) % MOCK_LIVE_DONATIONS_POOL.length;
    };

    // Trigger initial notification after 3 seconds
    const initialTimeout = setTimeout(triggerNextNotification, 3000);

    // Setup persistent interval loop every 8 seconds (3s display + 5s quiet window)
    const persistentInterval = setInterval(() => {
      setLiveNotification(null);
      setTimeout(triggerNextNotification, 1000);
    }, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(persistentInterval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence mode="wait">
        {liveNotification && (
          <motion.div
            key={liveNotification.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-2xl p-4 shadow-2xl pointer-events-auto flex items-center gap-3.5"
          >
            <div className="w-10 h-10 bg-pulse-gradient rounded-xl flex items-center justify-center text-lg shadow-sm shrink-0">
              💝
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-gray-900 truncate">
                {liveNotification.name === 'Anonymous' ? 'An anonymous benefactor' : liveNotification.name}
              </p>
              <p className="text-[11px] font-medium text-gray-500/90 mt-0.5">
                Donated <span className="font-bold text-pulse-purple-primary">{currency}{liveNotification.amount.toLocaleString()}</span> from {liveNotification.location}
              </p>
            </div>
            <button 
              onClick={() => setLiveNotification(null)}
              className="text-gray-400 hover:text-gray-600 text-sm font-bold px-1"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}