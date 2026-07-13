import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AppLoader({ isLoggingOut = false, onComplete }) {
  const [progress, setProgress] = useState(isLoggingOut ? 100 : 0);

  useEffect(() => {
    if (isLoggingOut) {
      setProgress(100); 
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev > 0) return Math.max(0, prev - Math.random() * 25);
          return 0;
        });
      }, 300);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return Math.min(100, prev + Math.random() * 30);
          return 100;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isLoggingOut]);

  useEffect(() => {
    const isFinished = isLoggingOut ? progress === 0 : progress === 100;

    if (isFinished && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [progress, isLoggingOut, onComplete]);

  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (Math.max(0, progress) / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img 
          src="/pulse-event-logo.png" 
          alt="PulseEvent Logo" 
          className="w-32 h-32 object-contain"
        />
      </motion.div>

      {/* Circular Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-28 h-28"
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle - Updated r to 42 and strokeWidth to 8 */}
          <circle 
            cx="50" 
            cy="50" 
            r="42" 
            fill="none" 
            stroke="#e5e7eb" 
            strokeWidth="8" 
          />
          
          {/* Progress circle - Updated r to 42 and strokeWidth to 8 */}
          <motion.circle
            cx="50" 
            cy="50" 
            r="42" 
            fill="none" 
            stroke="url(#gradient)"
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transition={{ strokeDashoffset: { duration: 0.5, ease: "easeOut" } }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5a1fb5" />
              <stop offset="100%" stopColor="#f2378f" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gray-600 font-medium text-center"
      >
        {isLoggingOut ? 'Logging out...' : 'Loading...'}
      </motion.p>
    </div>
  );
}