export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col items-center justify-center p-4 selection:bg-[#ff4fa3]/20 selection:text-[#f2378f]">
      {/* Container with a subtle shadow and clean layout */}
      <div className="max-w-2xl w-full text-center space-y-8 py-12 px-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl shadow-purple-950/5">
        
        {/* Animated Big 404 Header */}
        <div className="relative inline-block">
          <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] via-[#c13ac7] to-[#ff4fa3] animate-pulse">
            404
          </h1>
          {/* Decorative floating accent blob */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-tr from-[#f2378f] to-[#ff4fa3] rounded-full blur-xl opacity-70 animate-bounce duration-3000" />
          <div className="absolute -bottom-2 -left-6 w-16 h-16 bg-gradient-to-br from-[#5a1fb5] to-[#7b2bc9] rounded-full blur-xl opacity-60" />
        </div>

        {/* Text Content */}
        <div className="space-y-3 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight sm:text-4xl">
            Page Not Found
          </h2>
          <p className="text-gray-600 font-medium">
            The page you're looking for has been moved, deleted, or possibly never existed in this dimension.
          </p>
        </div>

        {/* Interactive Visual Element: Geometric clean shapes */}
        <div className="flex items-center justify-center space-x-2">
          <span className="w-16 h-1.5 rounded-full bg-[#5a1fb5]" />
          <span className="w-4 h-1.5 rounded-full bg-[#c13ac7]" />
          <span className="w-2 h-1.5 rounded-full bg-[#ff4fa3]" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#5a1fb5] via-[#7b2bc9] to-[#c13ac7] text-white font-semibold rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            Go Back Home
          </button>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-800 border-2 border-gray-100 hover:border-[#ff4fa3]/30 font-semibold rounded-xl hover:text-[#f2378f] hover:bg-[#f7f7fa] transition-all duration-200 cursor-pointer"
          >
            Previous Page
          </button>
        </div>
      </div>

      {/* Subtle Background Decorative Lights */}
      <div className="absolute top-1/4 left-1/4 -z-10 w-96 h-96 bg-[#7b2bc9]/10 rounded-full blur-3xl mix-blend-multiply filter pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 w-96 h-96 bg-[#ff4fa3]/10 rounded-full blur-3xl mix-blend-multiply filter pointer-events-none" />
    </div>
  );
}