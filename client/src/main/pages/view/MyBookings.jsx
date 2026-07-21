import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, QrCode, Receipt, X, Download, ExternalLink } from 'lucide-react';

export default function MyBookings() {
    // Upgraded mock data to include financial details for the receipt
    const [bookings] = useState([
        { 
            ticketId: 'TXN-98237', 
            eventTitle: 'Tech Innovators Summit',
            date: 'Aug 15, 2026',
            location: 'Lagos Expo Center',
            tier: 'VIP Pass',
            status: 'Valid',
            amount: 75000,
            currency: 'NGN',
            purchaseDate: 'Jul 21, 2026',
            paymentMethod: 'Paystack'
        },
        { 
            ticketId: 'TXN-98237', 
            eventTitle: 'Tech Innovators Summit',
            date: 'Aug 15, 2026',
            location: 'Lagos Expo Center',
            tier: 'VIP Pass',
            status: 'Valid',
            amount: 75000,
            currency: 'NGN',
            purchaseDate: 'Jul 21, 2026',
            paymentMethod: 'Paystack'
        },
        { 
            ticketId: 'TXN-98237', 
            eventTitle: 'Tech Innovators Summit',
            date: 'Aug 15, 2026',
            location: 'Lagos Expo Center',
            tier: 'VIP Pass',
            status: 'Valid',
            amount: 75000,
            currency: 'NGN',
            purchaseDate: 'Jul 21, 2026',
            paymentMethod: 'Paystack'
        },
        { 
            ticketId: 'TXN-98237', 
            eventTitle: 'Tech Innovators Summit',
            date: 'Aug 15, 2026',
            location: 'Lagos Expo Center',
            tier: 'VIP Pass',
            status: 'Valid',
            amount: 75000,
            currency: 'NGN',
            purchaseDate: 'Jul 21, 2026',
            paymentMethod: 'Paystack'
        },
        { 
            ticketId: 'TXN-98237', 
            eventTitle: 'Tech Innovators Summit',
            date: 'Aug 15, 2026',
            location: 'Lagos Expo Center',
            tier: 'VIP Pass',
            status: 'Valid',
            amount: 75000,
            currency: 'NGN',
            purchaseDate: 'Jul 21, 2026',
            paymentMethod: 'Paystack'
        }
    ]);

    const [selectedReceipt, setSelectedReceipt] = useState(null);

    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency }).format(amount);
    };

    return (
        <div className="min-h-screen p-6 md:p-12 bg-gray-50 dark:bg-[#121216] transition-colors duration-300 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] to-[#f2378f] tracking-tighter">
                        My Bookings
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
                        Manage your upcoming Pulse Event tickets and view transaction receipts.
                    </p>
                </div>

                {/* Tickets Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {bookings.map(booking => (
                        <div key={booking.ticketId} className="flex flex-col sm:flex-row overflow-hidden bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md rounded-3xl transition-all">
                            
                            {/* Event Details (Left Side) */}
                            <div className="flex-1 p-6 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="px-3 py-1 text-xs font-black tracking-widest text-[#5a1fb5] dark:text-[#a77bfa] uppercase bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                                            {booking.tier}
                                        </span>
                                        <span className="text-sm font-bold text-gray-400 dark:text-gray-500">
                                            #{booking.ticketId}
                                        </span>
                                    </div>
                                    
                                    <h2 className="mb-4 text-2xl font-black text-gray-900 dark:text-white leading-tight">
                                        {booking.eventTitle}
                                    </h2>
                                    
                                    <div className="space-y-3 text-sm font-medium text-gray-600 dark:text-gray-400 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-[#f2378f]">
                                                <Calendar size={18} />
                                            </div>
                                            {booking.date}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-[#f2378f]">
                                                <MapPin size={18} />
                                            </div>
                                            {booking.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Receipt Action Button */}
                                <button 
                                    onClick={() => setSelectedReceipt(booking)}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#f7f7fa] dark:bg-[#22222d] hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
                                >
                                    <Receipt size={16} />
                                    View Receipt
                                </button>
                            </div>

                            {/* QR Code Section (Right Side) */}
                            <div className="flex flex-col items-center justify-center p-8 bg-gray-50/50 dark:bg-[#15151b] sm:w-56 shrink-0 relative overflow-hidden">
                                {/* Decorative dashed cutout effect */}
                                <div className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 dark:bg-[#121216] rounded-full border-r border-gray-100 dark:border-gray-800"></div>
                                
                                <div className="flex items-center justify-center w-32 h-32 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
                                    {/* Replace with actual qrcode.react implementation */}
                                    <QrCode size={100} className="text-gray-900" strokeWidth={1.5} />
                                </div>
                                <span className="px-4 py-1.5 text-xs font-black text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 uppercase tracking-widest rounded-lg">
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
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
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Ticket Receipt</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{selectedReceipt.ticketId}</p>
                            </div>

                            <div className="space-y-4 text-sm mb-8 bg-[#f7f7fa] dark:bg-[#22222d] p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Event</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-right max-w-[60%]">{selectedReceipt.eventTitle}</span>
                                </div>
                                <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Ticket Tier</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{selectedReceipt.tier}</span>
                                </div>
                                <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Purchase Date</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{selectedReceipt.purchaseDate}</span>
                                </div>
                                <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Payment Method</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{selectedReceipt.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Total Paid</span>
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