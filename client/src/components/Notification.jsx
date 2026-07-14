toast.custom((t) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-sm w-full bg-white shadow-xl rounded-2xl p-4 pointer-events-auto flex items-center border border-gray-100`}
  >
    <div className="flex-shrink-0">
      {/* The Gradient Check Background */}
      <div className="h-10 w-10 rounded-full bg-pulse-gradient flex items-center justify-center shadow-lg shadow-pulse-purple-primary/20">
        <span className="text-white font-bold text-lg">✓</span>
      </div>
    </div>
    <div className="ml-4">
      <p className="text-sm font-black text-pulse-text-dark">Success</p>
      <p className="text-xs text-pulse-text-dark/60 font-medium">Password updated securely.</p>
    </div>
  </motion.div>
), { duration: 2000 });