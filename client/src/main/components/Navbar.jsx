import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Menu, 
    X, 
    Home, 
    PartyPopper, 
    Calendar, 
    PlusCircle, 
    Eye, 
    Search, 
    Bell, 
    Settings, 
    LogOut,
    ChevronDown,
    ScanQrCode,
    HandHeart
} from 'lucide-react';
import Header from './Header';

export default function Navbar({ user, handleLogout, isLoggingOut, setIsNavigating }) {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    // State for the tablet center popup
    const [subMenu, setSubMenu] = useState(false);
    
    // Add some distinct colors per index for the popup
    const iconColors = ['text-[#5a1fb5]', 'text-[#f2378f]', 'text-blue-500'];
    const [colors, passColors] = useState('');

    // Helper for the Notification Red Dot
    const NotificationDot = () => (
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full z-10" />
    );
    
    // State for the desktop/mobile View accordion dropdown
    const [viewDropdown, setViewDropdown] = useState(false);

    // Grouped the sub-items inside the "View" object
    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/create', label: 'Create', icon: PlusCircle },
        { path: '/search', label: 'Search', icon: Search },
        { 
            label: 'View', 
            icon: Eye, 
            isDropdown: true,
            subLinks: [
                { path: '/myevents', label: 'My Events', icon: PartyPopper },
                { path: '/mybookings', label: 'My Bookings', icon: Calendar },
                { path: '/mydonations', label: 'My Donations', icon: HandHeart },
                { path: '/notifications', label: 'Notifications', icon: Bell, isNotification: true }
            ]
        },
        { path: '/scan', label: 'Scan', icon: ScanQrCode },
        { path: '/settings', label: 'Settings', icon: Settings }
    ];

    return (
        <>
            {/* Desktop View - Sticky Sidebar */}
            <nav className="hidden lg:flex sticky top-0 left-0 transition-all duration-500 ease-in-out rounded-3xl px-2 w-72 h-screen backdrop-blur-2xl border-r border-gray-200/60 flex-col justify-between py-8 z-50">
                <div className="flex flex-col w-full h-full justify-between">
                    <div className="flex flex-col shrink-0 w-full px-4 mb-8">
                        <a href="/" className="flex items-center gap-0.5">
                            <img src="/pulse-event-logo.png" width={120} height={120} alt="PulseEvent Logo" className="object-contain" />
                        </a>
                    </div>

                    <div className="flex flex-col w-full gap-2 px-4 flex-1 justify-start overflow-y-auto no-scrollbar">
                        {navLinks.map((link) => {
                            // Render Dropdown Accordion for "View"
                            if (link.isDropdown) {
                                const isChildActive = link.subLinks.some(sub => location.pathname === sub.path);
                                
                                return (
                                    <div key={link.label} className="flex flex-col w-full z-10">
                                        <button
                                            onClick={() => setViewDropdown(!viewDropdown)}
                                            className={`
                                                relative flex items-center justify-between w-full px-4 py-3.5 rounded-2xl transition-colors duration-300 cursor-pointer ${isChildActive ? 'text-pulse-purple-primary' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'}
                                            `}
                                        >
                                            <div className="flex flex-row items-center justify-start gap-3">
                                                <span className="flex items-center justify-center">
                                                    <link.icon size={20} />
                                                </span>
                                                <span className={`text-xs tracking-wide transition-all duration-300 ${isChildActive ? 'font-black' : 'font-bold'}`}>
                                                    {link.label}
                                                </span>
                                            </div>
                                            <motion.div animate={{ rotate: viewDropdown ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                <ChevronDown size={16} />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence>
                                            {viewDropdown && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden flex flex-col gap-1 pl-4 mt-1"
                                                >
                                                    {link.subLinks.map(sub => {
                                                        const isSubActive = location.pathname === sub.path;
                                                        return (
                                                            <Link
                                                                key={sub.path}
                                                                to={sub.path}
                                                                className={`
                                                                    flex flex-row items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300
                                                                    ${isSubActive ? 'text-pulse-pink-primary bg-pink-50/50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'}
                                                                `}
                                                            >
                                                                <div className="relative">
                                                                    <sub.icon size={16} />
                                                                    {sub.isNotification && <NotificationDot />}
                                                                </div>
                                                                <span className={`text-xs ${isSubActive ? 'font-black' : 'font-medium'}`}>{sub.label}</span>
                                                            </Link>
                                                        )
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            // Render Standard Desktop Links
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    title={link.label}
                                    onClick={() => {
                                        if (location.pathname === link.path) {
                                            if (typeof setIsNavigating === 'function') return;
                                        } else {
                                            if (typeof setIsNavigating === 'function') setIsNavigating(true);
                                        }
                                    }}
                                    className={`
                                        relative flex items-center justify-start w-full px-4 py-3.5 rounded-2xl transition-colors duration-300 z-10 ${isActive ? 'text-pulse-purple-primary' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicatorDesktop"
                                            className="absolute inset-0 bg-white shadow-sm border border-gray-100/80 rounded-2xl -z-10"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    <div className="flex flex-row items-center justify-start gap-3 w-full">
                                        <span className={`transition-transform duration-300 flex items-center justify-center ${isActive ? 'scale-110' : 'scale-100'}`}>
                                            <link.icon size={20} />
                                        </span>
                                        <span className={`text-xs tracking-wide transition-all duration-300 text-left whitespace-nowrap truncate w-auto ${isActive ? 'font-black' : 'font-bold'}`}>
                                            {link.label}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-3 w-full px-4 pt-6 border-t border-gray-200/60 mt-auto shrink-0">
                        <button
                            onClick={handleLogout}
                            className="group flex items-center gap-3 w-full px-4 py-3.5 bg-gray-900 hover:bg-pulse-purple-primary text-white font-black rounded-2xl transition-all shadow-md shadow-gray-900/10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                        >
                            <LogOut className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span> {isLoggingOut ? 'Logging out...' : 'Log Out'} </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Tablet View - Fixed Bottom Nav */}
            <div className="hidden md:flex lg:hidden fixed bottom-0 left-0 w-full flex-row justify-around items-center px-2 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 h-16 pb-safe">
                {/* Bouncing Overlay Options Card mapped dynamically from subLinks */}
                <AnimatePresence>
                    {subMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 24, x: '-50%' }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, scale: 0.8, y: 24, x: '-50%' }}
                            transition={{ type: "spring", stiffness: 420, damping: 26 }}
                            className="absolute bottom-20 left-1/2 bg-white border border-gray-200/70 p-2 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.16)] w-48 flex flex-col gap-1 z-50"
                        >
                            {/* Retrieve the subLinks dynamically from the "View" object */}
                            {navLinks.find(link => link.isDropdown)?.subLinks.map((sub, i) => {
                                return (
                                    <Link
                                        key={sub.path}
                                        to={sub.path}
                                        onClick={() => setSubMenu(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 active:bg-gray-100 transition-colors"
                                    >
                                        <span className={`${iconColors[i % iconColors.length]} relative shrink-0`}>
                                            <sub.icon size={18} />
                                            {sub.isNotification && <NotificationDot />}
                                        </span>
                                        <span className="text-xs font-bold tracking-wide">{sub.label}</span>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tablet Main Tab Icons */}
                {navLinks.map((link) => {
                    if (link.isDropdown) {
                        return (
                            <button
                                key="tablet-view-toggle"
                                onClick={() => setSubMenu(!subMenu)}
                                className="relative flex items-center justify-center w-14 h-14 bg-linear-to-tr from-pulse-purple-primary to-pulse-pink-primary text-white rounded-full shadow-lg shadow-purple-500/30 -translate-y-8 cursor-pointer border-4 border-white focus:outline-none transition-transform active:scale-95 shrink-0 z-50"
                                title="View Options"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={subMenu ? 'close' : 'view'}
                                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {subMenu ? <X size={26} /> : <Eye size={26} />}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        );
                    }

                    // Standard Tablet Tabs
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            title={link.label}
                            className={`
                                relative flex flex-col items-center justify-center p-1.5 sm:p-2 flex-1 min-w-0 z-10
                                ${isActive ? 'text-pulse-purple-primary' : 'text-gray-500 hover:text-gray-800'}
                            `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNavIndicatorTablet"
                                    className="absolute inset-0 bg-gray-50 rounded-2xl -z-10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className={`transition-transform duration-300 flex items-center justify-center ${isActive ? 'scale-110' : 'scale-100'}`}>
                                <link.icon size={22} />
                            </span>
                            <span className={`text-[8.5px] sm:text-[9px] tracking-wide transition-all duration-300 text-center whitespace-nowrap mt-1 truncate w-full ${isActive ? 'font-black' : 'font-medium'}`}>
                                {link.label}
                            </span>
                        </Link>
                    );
                })}

                {/* Fixed Standalone Logout Button */}
                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="relative flex flex-col items-center justify-center p-1.5 sm:p-2 flex-1 min-w-0 z-10 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                    <span className="transition-transform duration-300 flex items-center justify-center scale-100">
                        <LogOut size={22} />
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] tracking-wide transition-all duration-300 text-center whitespace-nowrap mt-1 truncate w-full font-medium">
                        Logout
                    </span>
                </button>
            </div>

            {/* Mobile View - Top Header & Right Sidenav */}
            <div className="flex w-full md:hidden bg-pulse-bg-light">
                <Header setShowMenu={setShowMenu} />

                <AnimatePresence>
                    {showMenu && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowMenu(false)}
                                className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm"
                            />

                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                                className="fixed top-0 right-0 z-50 flex flex-col w-11/12 h-full max-w-sm bg-white shadow-2xl"
                            >
                                <div className="p-6 bg-linear-to-br from-pulse-purple-primary via-pulse-purple-secondary to-pulse-gradient-blend">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white border-2 rounded-full bg-pulse-pink-primary border-pulse-pink-accent">
                                            {(user?.firstname || "?").charAt(0)}{(user?.lastname || "?").charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{user.firstname} {user.lastname}</p>
                                            <p className="text-sm text-gray-200">@{user.username}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* PROPERLY ALIGNED CLOSE BUTTON */}
                                <div className="flex justify-end px-6 pt-2 pb-2 bg-white text-purple-800">
                                    <button 
                                        onClick={() => setShowMenu(false)} 
                                        className="flex items-center gap-1 transition-colors cursor-pointer hover:text-purple-600"
                                    >
                                        <X size={15} />
                                        <h2 className="text-xs font-bold tracking-wide uppercase mt-0.5">Close</h2>
                                    </button>
                                </div>

                                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto bg-white">
                                    {navLinks.map((link) => {
                                        if (link.isDropdown) {
                                            // Optional: Check if any sublink is active to highlight the parent dropdown button
                                            const isParentActive = link.subLinks.some(sub => location.pathname === sub.path);

                                            return (
                                                <div key={link.label} className="flex flex-col">
                                                    <button
                                                        onClick={() => setViewDropdown(!viewDropdown)}
                                                        className={`flex items-center justify-between w-full px-4 py-3 transition-all cursor-pointer rounded-xl group ${
                                                            isParentActive 
                                                                ? 'bg-pulse-bg-light text-pulse-purple-primary' 
                                                                : 'text-gray-800 hover:bg-pulse-bg-light hover:text-pulse-purple-primary'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <link.icon 
                                                                size={20} 
                                                                className={`transition-colors ${
                                                                    isParentActive 
                                                                        ? 'text-pulse-pink-primary' 
                                                                        : 'text-gray-400 group-hover:text-pulse-pink-primary'
                                                                }`} 
                                                            />
                                                            <span className="font-medium">{link.label}</span>
                                                        </div>
                                                        <motion.div animate={{ rotate: viewDropdown ? 180 : 0 }}>
                                                            <ChevronDown size={18} className={isParentActive ? 'text-pulse-pink-primary' : 'text-gray-400'} />
                                                        </motion.div>
                                                    </button>
                                                    
                                                    <AnimatePresence>
                                                        {viewDropdown && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="flex flex-col gap-1 pr-4 mt-1 overflow-hidden pl-12"
                                                            >
                                                                {link.subLinks.map(sub => {
                                                                    const isSubActive = location.pathname === sub.path;
                                                                    
                                                                    return (
                                                                        <Link
                                                                            key={sub.path}
                                                                            to={sub.path}
                                                                            onClick={() => setShowMenu(false)}
                                                                            className={`flex items-center gap-3 py-2.5 text-sm font-medium transition-colors ${
                                                                                isSubActive 
                                                                                    ? 'text-pulse-purple-primary' 
                                                                                    : 'text-gray-500 hover:text-pulse-purple-primary'
                                                                            }`}
                                                                        >
                                                                            <div className="relative">
                                                                                <sub.icon 
                                                                                    size={18} 
                                                                                    className={isSubActive ? 'text-pulse-pink-primary' : 'text-gray-400'} 
                                                                                />
                                                                                {sub.isNotification && <NotificationDot />}
                                                                            </div>
                                                                            <span>{sub.label}</span>
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )
                                        }

                                        const isActive = location.pathname === link.path;

                                        return (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                onClick={() => setShowMenu(false)}
                                                className={`flex items-center gap-4 px-4 py-3 transition-all rounded-xl group ${
                                                    isActive 
                                                        ? 'bg-pulse-bg-light text-pulse-purple-primary' 
                                                        : 'text-gray-800 hover:bg-pulse-bg-light hover:text-pulse-purple-primary'
                                                }`}
                                            >
                                                <link.icon 
                                                    size={20} 
                                                    className={`transition-colors ${
                                                        isActive 
                                                            ? 'text-pulse-pink-primary' 
                                                            : 'text-gray-400 group-hover:text-pulse-pink-primary'
                                                    }`} 
                                                />
                                                <span className="font-medium">{link.label}</span>
                                            </Link>
                                        )
                                    })}
                                </nav>

                                <div className="p-6 border-t border-gray-100 bg-pulse-bg-light">
                                    <button onClick={handleLogout} className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all shadow-md cursor-pointer rounded-xl bg-linear-to-r from-purple-800 to-purple-900 shadow-pink-500/25 hover:shadow-lg hover:-translate-y-0.5">
                                        <LogOut size={18} />
                                        <span>{isLoggingOut ? 'Logging Out...' : 'Log Out'}</span>
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}