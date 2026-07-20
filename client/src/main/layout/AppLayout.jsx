import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Calendar, Mail, User, Settings, LogOut } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';
import AppLoader from '../components/loaders/AppLoader';
import RouteLoader from '../components/loaders/RouteLoader';
import Navbar from '../components/Navbar';

export default function AppLayout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, user } = useAuth();
  const [hasShownLoader, setHasShownLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(!hasShownLoader);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  // AppLoader
  useEffect(() => {
    if (!hasShownLoader) {
      setIsLoading(true);
    }
  }, [hasShownLoader]);

  // RouteLoader
  useEffect(() => {
    if (hasShownLoader && !isLoading) {
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasShownLoader, isLoading]);

  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       toast.success(`Welcome, ${user.firstname}!`, {
  //         id: 'welcome-toast' // This forces the library to only show it once
  //       });
  //     }, 1000);
  //   }
  // }, [user]);

  // Notification State

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setTimeout(async () => { 
        setIsLoading(true);
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/logout`, {}, {
          withCredentials: true
        });
      }, 1500);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to logout. Please try again.');
      setIsLoading(false);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Toaster />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 bg-white flex items-center justify-center"
          >
            <AppLoader 
              isLoggingOut={isLoggingOut} 
              onComplete={() => {
                if (isLoggingOut) {
                  setUser(null);
                  setIsLoading(false);
                  setIsLoggingOut(false);
                  // navigate('/signin', { replace: true, state: null });
                   setIsLoggedIn(false);
                  window.location.replace('/signin');
                } else {
                  setIsLoading(false);
                  setHasShownLoader(true);
                  toast.success(`Welcome back, ${user.firstname}!`, { duration: 4000 });
                }
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {hasShownLoader && (
        <div className="min-h-screen bg-pulse-bg-light text-gray-800 font-sans selection:bg-pulse-purple-primary/30 flex flex-col md:flex-row">
          <Navbar user={user} handleLogout={handleLogout} isLoggingOut={isLoggingOut} isNavigating={isNavigating} />

          {/* --- Main Content Shell --- */}
          <main className="flex-1 w-full pt-18 pb-24 md:pt-0 min-h-screen relative z-0">

            {/* Desktop Header */}
            {/* <header className="hidden md:flex justify-end items-center gap-6 pt-6 pb-2 px-8">
              <Link to="/notification" className="relative p-2.5 text-gray-400 hover:text-pulse-purple-primary hover:bg-pulse-purple-primary/10 rounded-xl transition-all border border-gray-100 bg-white" title="Notifications">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                {hasNotifications && <span className="absolute top-2 right-2 w-2 h-2 bg-pulse-pink-primary rounded-full"></span>}
              </Link>

              <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group border border-gray-100 bg-white min-w-35">
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-pulse-purple-primary to-pulse-pink-primary text-white flex items-center justify-center font-black text-[10px] shrink-0">JD</div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-gray-900 truncate">Jane Doe</span>
                </div>
              </Link>
            </header> */}

            {isNavigating ? <RouteLoader /> : <Outlet />}
          </main>
        </div>
      )}
    </>
  );
}