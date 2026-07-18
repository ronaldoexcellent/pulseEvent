import { motion } from 'framer-motion';

export default function RouteLoader() {
  return (
    // This div is designed to fill its container, NOT the full screen
    <div className="w-full h-full min-h-100 flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-pulse-purple-primary border-r-pulse-pink-primary"
      />
    </div>
  );
}