// import { Feature } from "framer-motion"
import Navbar from "../components/Navbar"
import Hero from "../main/components/sections/Hero"
import ProductModules from "../main/components/sections/ProductModule"
import MetricsDashboard from "../main/components/sections/MetricsDashboard"
import ConversionZone from "../main/components/sections/ConversionZone"
import Footer from "../components/Footer"


const LandingPage = ({ isLoggedIn }) => {
  return (
    <main>
      <Navbar />
      <Hero />
       {/* Desktop Profile Display */}
        {/* <div className="flex items-center justify-between gap-2 px-1 mb-2">
          <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-gray-100 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pulse-purple-primary to-pulse-pink-primary text-white flex items-center justify-center font-black text-sm shrink-0 group-hover:shadow-md group-hover:scale-105 transition-all">
              JD
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-gray-900 truncate group-hover:text-pulse-purple-primary transition-colors">Jane Doe</span>
              <span className="text-[10px] font-medium text-gray-500 truncate uppercase tracking-wider">Event Organizer</span>
            </div>
          </Link> */}

          {/* Desktop Notification Button */}
          {/* <Link
            to="/notification"
            className="relative p-2.5 text-gray-400 hover:text-pulse-purple-primary hover:bg-pulse-purple-primary/10 rounded-xl transition-all border border-transparent hover:border-gray-100 bg-white shrink-0"
            title="Notifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            {hasNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-pulse-pink-primary rounded-full"></span>
            )}
          </Link>
        </div> */}
      <ProductModules/>
      <MetricsDashboard/>
      <ConversionZone/>
      <Footer/>
    </main>
  )
}

export default LandingPage