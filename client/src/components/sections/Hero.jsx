import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

// Mock data for the carousel including ratings
const featuredEvents = [
  {
    id: 1,
    title: "Global Tech Fest 2026",
    organizer: "PulseNetwork",
    rating: 4.9,
    emoji: "🕺",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progressText: "VIP Tickets",
    progressValue: 85,
    price: "₦15,000",
    statusIcon: "✅",
    statusText: "Payment Verified"
  },
  {
    id: 2,
    title: "Lagos Food Festival",
    organizer: "ChopLife Crew",
    rating: 4.8,
    emoji: "🍲",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progressText: "Early Bird",
    progressValue: 95,
    price: "₦5,000",
    statusIcon: "🎟️",
    statusText: "Ticket Issued"
  },
  {
    id: 3,
    title: "Afrobeat Live Showcase",
    organizer: "Vibe Studios",
    rating: 4.7,
    emoji: "🎸",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progressText: "General Access",
    progressValue: 60,
    price: "₦25,000",
    statusIcon: "🔥",
    statusText: "Trending Now"
  },
  {
    id: 4,
    title: "The Forever Love Wedding",
    organizer: "Tunde & Chioma",
    rating: 5.0,
    emoji: "💍",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progressText: "Wedding Registry Goal",
    progressValue: 75,
    price: "Contribute",
    statusIcon: "💝",
    statusText: "Gift Received"
  }
];

// Helper component to literally type out the text, 
// which physically expands the span width and pushes the cursor.
const TypewriterText = ({ word }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    let currentLength = 0;
    setText("");
    const typeInterval = setInterval(() => {
      currentLength++;
      setText(word.slice(0, currentLength));
      if (currentLength >= word.length) {
        clearInterval(typeInterval);
      }
    }, 120); // Speed of the typing effect

    return () => clearInterval(typeInterval);
  }, [word]);

  return <>{text}</>;
};

export default function Hero() {
  const rotatingWords = ["Event", "Campaign", "Moment", "Gathering"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate simulation mounting/loading phase
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(loadTimer);
  }, []);

  // Auto-rotate words
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(wordInterval);
  }, []);

  // Auto-rotate event cards every 5 seconds
  useEffect(() => {
    if (isLoading) return;
    const cardInterval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(cardInterval);
  }, [currentCardIndex, isLoading]);

  const activeEvent = featuredEvents[currentCardIndex];

  return (
    <section className="relative w-full min-h-[90vh] bg-pulse-bg-light flex items-center justify-center overflow-hidden pt-10 lg:pt-0">
      
      {/* --- Animated Background Elements --- */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-pulse-purple-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-72 h-72 bg-pulse-pink-primary/10 rounded-full blur-3xl" 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className="absolute top-40 right-1/4 w-32 h-32 bg-pulse-purple-secondary/20 rounded-full blur-2xl" 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* --- Left Column: Copy & CTAs --- */}
        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-6xl font-['Space_mono',monospace] font-extrabold text-pulse-text-dark tracking-tight leading-[1.1] mb-6">
            Feel the Pulse <br className="hidden lg:block" />
            of Every <br className="block lg:hidden" />
            <span className="inline-flex items-center -mb-2 h-[1.2em] align-bottom relative overflow-visible">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  exit={{ opacity: 0, filter: "blur(4px)", y: -5 }} 
                  transition={{ exit: { duration: 0.2 } }}
                  className="block whitespace-nowrap text-transparent bg-clip-text bg-pulse-gradient font-mono italic font-bold tracking-normal"
                >
                  <TypewriterText word={rotatingWords[currentWordIndex]} />
                </motion.span>
              </AnimatePresence>
              
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[4px] sm:w-[6px] h-[0.9em] bg-pulse-gradient ml-2"
                style={{ backgroundImage: 'linear-gradient(to bottom, #5a1fb5, #f2378f)' }}
              />
            </span>
          </h1>

          <p className="text-md sm:text-xl text-pulse-text-dark/70 mb-8 max-w-2xl mx-auto lg:mx-0 lg:text-[13px]">
            Replace "send me your account number" with professional, secure links. The premier pan-African platform for ticketed events and social donation campaigns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <motion.a 
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/create-event" 
              className="w-full sm:w-auto px-8 py-4 bg-pulse-gradient text-white font-bold rounded-xl shadow-lg shadow-pulse-purple-primary/30 transition-shadow hover:shadow-pulse-purple-primary/50 text-center"
            >
              Create an Event
            </motion.a>
            <motion.a 
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/explore" 
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-pulse-text-dark/10 hover:border-pulse-purple-primary text-pulse-text-dark font-bold rounded-xl shadow-sm text-center transition-colors hover:bg-pulse-bg-light"
            >
              Explore Campaigns
            </motion.a>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-10 pt-8 border-t border-gray-200 flex items-center justify-center lg:justify-start gap-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-black text-pulse-purple-primary">10k+</p>
              <p className="text-sm font-semibold text-pulse-text-dark/60">Tickets Sold</p>
            </motion.div>
            <div className="w-px h-10 bg-gray-300"></div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-black text-pulse-pink-primary">₦50M+</p>
              <p className="text-sm font-semibold text-pulse-text-dark/60">Funds Raised</p>
            </motion.div>
            <div className="w-px h-10 bg-gray-300"></div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-black text-pulse-purple-secondary">99%</p>
              <p className="text-sm font-semibold text-pulse-text-dark/60">Secure Scans</p>
            </motion.div>
          </div>
        </motion.div>

        {/* --- Right Column: Interactive Carousel Mockup --- */}
        <motion.div 
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          
          <motion.div 
            className="relative bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 z-20"
            animate={isLoading ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            initial={{ rotate: -2 }}
            whileHover={isLoading ? {} : { rotate: 0, scale: 1.02 }}
          >
            {isLoading ? (
              /* Card Mockup Skeleton Content */
              <div className="space-y-6 animate-pulse">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                    <div className="space-y-2 w-1/2">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="h-6 w-12 bg-gray-200 rounded-xl shrink-0" />
                </div>
                <div className="w-full h-48 bg-gray-200 rounded-xl" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/6" />
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full" />
                </div>
                <div className="w-full h-11 bg-gray-200 rounded-xl mt-6" />
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEvent.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Header of Mockup */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-12 h-12 rounded-full bg-pulse-gradient p-[2px] shrink-0">
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold">{activeEvent.emoji}</span>
                          </div>
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-black text-pulse-text-dark leading-tight truncate">{activeEvent.title}</h3>
                          <p className="text-sm text-pulse-text-dark/60 font-medium truncate">By {activeEvent.organizer}</p>
                        </div>
                      </div>

                      {/* Star Rating Overlay */}
                      <div className="flex items-center gap-1 bg-pulse-bg-light px-2.5 py-1 rounded-xl border border-gray-100 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        <span className="text-xs font-black text-pulse-text-dark">{activeEvent.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Image Area */}
                    <div className="w-full h-48 bg-pulse-bg-light rounded-xl mb-6 relative overflow-hidden group flex items-center justify-center border border-gray-100">
                       <div className="absolute inset-0 bg-pulse-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-0" />
                       <div className="w-full h-full relative z-10">
                        <img 
                          src={activeEvent.image} 
                          className='w-full h-full object-cover' 
                          alt={activeEvent.title} 
                        />
                       </div>
                    </div>

                    {/* Progress/Ticket Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold text-pulse-text-dark">
                        <span>{activeEvent.progressText}</span>
                        <span className="text-pulse-purple-primary">{activeEvent.progressValue}% Sold</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-pulse-gradient rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${activeEvent.progressValue}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-6 py-3 bg-pulse-text-dark hover:bg-black text-white font-bold rounded-xl transition-colors text-sm"
                    >
                      {activeEvent.price.includes('₦') ? `Get Ticket • ${activeEvent.price}` : activeEvent.price}
                    </motion.button>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {featuredEvents.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentCardIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentCardIndex ? 'w-4 bg-pulse-purple-primary' : 'w-1.5 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Secondary Floating Card (Updates with Carousel) */}
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div 
                key={`status-${activeEvent.id}`}
                className="absolute -bottom-10 -right-6 lg:-right-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-30"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                initial={{ rotate: 6, opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: 6 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeEvent.statusIcon}</span>
                  <div>
                    <p className="text-sm font-black text-pulse-text-dark whitespace-nowrap">{activeEvent.statusText}</p>
                    <p className="text-xs font-semibold text-pulse-purple-primary">Just now</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}