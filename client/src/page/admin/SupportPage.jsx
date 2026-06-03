import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for incoming support tickets and feedback
const MOCK_TICKETS = [
  { 
    id: 'TKT-1024', 
    name: 'Samuel O.', 
    email: 'samuel.o@example.com',
    type: 'Support', 
    subject: 'Cannot access my purchased tickets', 
    message: 'Hello, I bought 2 tickets for the Next.js Dev Masterclass but I haven\'t received the email confirmation yet. The transaction shows as completed on my end. Can you help me retrieve them?', 
    status: 'Open', 
    date: '10 mins ago',
    initials: 'SO',
    color: 'bg-blue-100 text-blue-700'
  },
  { 
    id: 'TKT-1023', 
    name: 'Barr. Adebayo Alex.U', 
    email: 'adebayo.law@example.com',
    type: 'Feedback', 
    subject: 'Smooth donation process', 
    message: 'Just wanted to leave a quick note that the new donation campaign interface is incredibly seamless. My clients had no issues contributing to the medical outreach.', 
    status: 'Resolved', 
    date: '2 hours ago',
    initials: 'AA',
    color: 'bg-gray-100 text-gray-700'
  },
  { 
    id: 'TKT-1022', 
    name: 'Chidi E.', 
    email: 'chidi.dev@example.com',
    type: 'Bug Report', 
    subject: 'Error on payout request', 
    message: 'When I try to withdraw my funds to my bank account, the button just spins and then throws a timeout error. Please look into this urgently as I need to settle vendors.', 
    status: 'In Progress', 
    date: 'Yesterday',
    initials: 'CE',
    color: 'bg-orange-100 text-orange-700'
  },
];

export default function AdminSupportPage() {
  const [activeTab, setActiveTab] = useState('All Tickets');
  const [activeTicket, setActiveTicket] = useState(MOCK_TICKETS[0]);
  const [replyText, setReplyText] = useState('');

  const tabs = ['All Tickets', 'Open', 'In Progress', 'Resolved'];

  return (
    <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Support & Feedback</h1>
          <p className="text-gray-500 font-medium mt-1">Manage user inquiries, bug reports, and platform feedback.</p>
        </div>
      </div>

      {/* Main Two-Pane Layout */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Pane: Ticket Inbox */}
        <div className="w-full lg:w-1/3 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          
          {/* Inbox Header & Search */}
          <div className="p-4 border-b border-gray-100 space-y-4 shrink-0 bg-gray-50/50">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-[#5a1fb5] shadow-sm border border-gray-200' 
                      : 'text-gray-500 hover:text-gray-900 border border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search tickets..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:border-[#5a1fb5]/30 focus:ring-2 focus:ring-[#5a1fb5]/10 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Ticket List */}
          <div className="overflow-y-auto flex-1">
            {MOCK_TICKETS.map((ticket) => (
              <div 
                key={ticket.id}
                onClick={() => setActiveTicket(ticket)}
                className={`p-4 border-b border-gray-50 cursor-pointer transition-all ${
                  activeTicket?.id === ticket.id 
                    ? 'bg-[#5a1fb5]/5 border-l-4 border-l-[#5a1fb5]' 
                    : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-gray-400">{ticket.id}</span>
                  <span className="text-[10px] font-bold text-gray-400">{ticket.date}</span>
                </div>
                <h3 className="text-sm font-black text-gray-900 truncate pr-4">{ticket.subject}</h3>
                <p className="text-xs font-medium text-gray-500 truncate mt-1">{ticket.name} • {ticket.type}</p>
                
                <div className="mt-3 flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                    ticket.status === 'Open' ? 'bg-orange-100 text-orange-600' : 
                    ticket.status === 'Resolved' ? 'bg-green-100 text-green-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Ticket Detail & Reply */}
        <div className="w-full lg:w-2/3 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          {activeTicket ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTicket.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col h-full"
              >
                {/* Active Ticket Header */}
                <div className="p-6 border-b border-gray-100 shrink-0 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${activeTicket.color}`}>
                      {activeTicket.initials}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-gray-900">{activeTicket.subject}</h2>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">
                        {activeTicket.name} <span className="text-gray-300 mx-1">•</span> {activeTicket.email}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status Toggler */}
                  <select className="bg-gray-50 border-none text-xs font-bold text-gray-600 rounded-lg py-2 px-3 outline-none cursor-pointer hover:bg-gray-100">
                    <option>Mark as Open</option>
                    <option>Mark In Progress</option>
                    <option>Mark as Resolved</option>
                  </select>
                </div>

                {/* Message Thread Area */}
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50/30 space-y-6">
                  {/* Original Message */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-800">{activeTicket.name}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{activeTicket.date}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed">
                      {activeTicket.message}
                    </p>
                  </div>
                </div>

                {/* Reply Editor */}
                <div className="p-6 border-t border-gray-100 shrink-0 bg-white">
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-[#5a1fb5]/30 focus-within:ring-2 focus-within:ring-[#5a1fb5]/10 transition-all overflow-hidden p-1">
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..." 
                      className="w-full h-32 p-3 bg-transparent border-none resize-none outline-none text-sm font-medium text-gray-700"
                    />
                    <div className="flex items-center justify-between p-2 mt-2">
                      <div className="flex gap-2 text-gray-400">
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg></button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg></button>
                      </div>
                      
                      <button className="bg-[#5a1fb5] hover:bg-[#4a1895] text-white px-6 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                        Send Reply
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <p className="font-bold">Select a ticket to view details</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}