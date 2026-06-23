import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Initial Notification Data matching Pulse ecosystem events
const initialNotifications = [
  {
    id: '1',
    type: 'ticket',
    title: 'Ticket Purchased Successfully',
    description: 'Jane Doe bought 2x VIP Tickets for "Lagos Electronic Sound Fest".',
    time: '2 mins ago',
    unread: true,
    amount: '₦150,000.00',
  },
  {
    id: '2',
    type: 'donation',
    title: 'New Anonymous Goodwill Donation',
    description: 'An anonymous donor contributed to the "Clean Water Initiative" vault with a note: "Keep up the amazing work!"',
    time: '45 mins ago',
    unread: true,
    amount: '$250.00',
  },
  {
    id: '3',
    type: 'system',
    title: 'API Node Connection Restored',
    description: 'Docker image synchronization complete. Local webhooks for payment processing are fully functional.',
    time: '2 hours ago',
    unread: false,
  },
  {
    id: '4',
    type: 'donation',
    title: 'Donation Milestone Achieved! 🎉',
    description: 'Your open donation pool "Tech Kits for Kids" has reached 85% of its financial goal.',
    time: '5 hours ago',
    unread: false,
  },
  {
    id: '5',
    type: 'ticket',
    title: 'New Ticket Contract Deployed',
    description: 'Ticket gating verification hash has been successfully registered on the event gateway.',
    time: '1 day ago',
    unread: false,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial network distribution delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Action: Mark single item as read
  const toggleReadStatus = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // Action: Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Action: Clear an item from node list
  const deleteNotification = (id, e) => {
    e.stopPropagation(); // Prevent triggering read status
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Filtering Logic
  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  // Icon Render Helper mapping back to layout profiles
  const renderIcon = (type) => {
    switch (type) {
      case 'ticket':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#5a1fb5]/10 text-[#5a1fb5] flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
            </svg>
          </div>
        );
      case 'donation':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#f2378f]/10 text-[#f2378f] flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
        );
      case 'system':
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.754c-.29.218-.443.576-.408.935.006.063.009.127.009.192 0 .064-.003.128-.009.192-.035.36.118.717.408.935l1.003.754a1.125 1.125 0 0 1 .26 1.43l-1.297 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87a6.512 6.512 0 0 1-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.43l1.003-.754c.29-.218.443-.576.408-.935a6.595 6.595 0 0 1-.009-.384c.035-.36-.118-.717-.408-.935l-1.003-.754a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.644-.869l.214-1.281Z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Header Segment */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notification Terminal</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Monitor real-time ledger distributions, seat allocations, and localized gateway events.
          </p>
        </div>

        {!isLoading && unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="self-start sm:self-auto text-xs font-black text-[#5a1fb5] hover:text-[#f2378f] transition-colors duration-200 py-2 px-4 rounded-xl border border-gray-200/60 bg-white shadow-sm hover:shadow-md"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Segment Filter Menu Pill Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-gray-200/50 backdrop-blur-md rounded-2xl mb-6 overflow-x-auto no-scrollbar max-w-max">
        {['all', 'ticket', 'donation', 'system'].map((filter) => (
          <button
            key={filter}
            disabled={isLoading}
            onClick={() => setActiveFilter(filter)}
            className={`relative px-4 py-2 text-xs font-bold tracking-wide rounded-xl capitalize transition-colors duration-300 z-10 ${
              activeFilter === filter ? 'text-[#5a1fb5]' : 'text-gray-500 hover:text-gray-800'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {!isLoading && activeFilter === filter && (
              <motion.div
                layoutId="activeFilterIndicator"
                className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {filter === 'all' ? `All Nodes (${isLoading ? '...' : notifications.length})` : `${filter}s`}
          </button>
        ))}
      </div>

      {/* Main Core Feed Layout Grid */}
      <div className="bg-white border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[24px] overflow-hidden">
        <motion.div layout className="divide-y divide-gray-100">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              /* Network Pipeline Skeleton Loading State */
              [1, 2, 3, 4].map((index) => (
                <div key={`skeleton-${index}`} className="animate-pulse flex gap-4 p-5 items-start bg-white">
                  {/* Icon Placeholders */}
                  <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                  
                  {/* Text Container Placeholders */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="h-4 bg-gray-200 rounded-md w-1/3" />
                      <div className="h-3 bg-gray-200 rounded-md w-12" />
                    </div>
                    
                    <div className="space-y-2 mt-2">
                      <div className="h-3 bg-gray-200 rounded-md w-3/4" />
                      <div className="h-3 bg-gray-200 rounded-md w-1/2" />
                    </div>

                    {/* Staggered micro badge visualization mapping back to dynamic data row heights */}
                    {index % 2 === 1 && (
                      <div className="h-5 bg-gray-100 rounded-lg w-28 mt-3" />
                    )}
                  </div>
                </div>
              ))
            ) : filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => toggleReadStatus(notification.id)}
                  className={`flex gap-4 p-5 items-start relative transition-all cursor-pointer select-none group hover:bg-gray-50/50 ${
                    notification.unread ? 'bg-gradient-to-r from-[#5a1fb5]/5 via-transparent to-transparent' : ''
                  }`}
                >
                  {/* Status Gating Edge Line for Unread elements */}
                  {notification.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#5a1fb5] to-[#f2378f]" />
                  )}

                  {/* Icon Node wrapper */}
                  {renderIcon(notification.type)}

                  {/* Body Copy Section */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-sm tracking-tight truncate ${notification.unread ? 'font-black text-gray-900' : 'font-bold text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap shrink-0">
                        {notification.time}
                      </span>
                    </div>
                    
                    <p className="text-xs font-medium text-gray-500 leading-relaxed mt-1 pr-4">
                      {notification.description}
                    </p>

                    {/* Meta Value Badges if financial parameters exist */}
                    {notification.amount && (
                      <div className="inline-flex items-center mt-3 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1 text-[11px] font-black text-gray-900 tracking-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                        Processed: {notification.amount}
                      </div>
                    )}
                  </div>

                  {/* Action Terminal Controls */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center self-center shrink-0">
                    <button
                      onClick={(e) => deleteNotification(notification.id, e)}
                      className="p-2 text-gray-400 hover:text-[#f2378f] hover:bg-red-50 rounded-xl transition-all"
                      title="Dismiss notification"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              /* System Empty Terminal Canvas state */
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 px-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100/80 mb-4 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </div>
                <h3 className="text-base font-black text-gray-900 tracking-tight">Terminal Clear</h3>
                <p className="text-xs font-medium text-gray-400 max-w-xs mt-1 leading-relaxed">
                  No active incoming logs detected under this filtering node segment. You are all caught up!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}