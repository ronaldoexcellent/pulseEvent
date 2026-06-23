import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for demonstration
const initialTickets = [
  {
    id: 'TKT-001',
    user: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    avatar: 'S',
    subject: 'Cannot access my purchased ticket',
    status: 'Open',
    date: '2 hours ago',
    messages: [
      { id: 1, sender: 'user', text: 'Hello, I bought a ticket for the Neon Nights event, but it is not showing up in my dashboard. Please help!', time: '10:30 AM' }
    ]
  },
  {
    id: 'TKT-002',
    user: 'Michael Okoye',
    email: 'mike.okoye@example.com',
    avatar: 'M',
    subject: 'Refund request for canceled campaign',
    status: 'Pending',
    date: '5 hours ago',
    messages: [
      { id: 1, sender: 'user', text: 'The charity run campaign was canceled. How do I get my donation refunded?', time: '08:15 AM' },
      { id: 2, sender: 'admin', text: 'Hi Michael, all funds for canceled campaigns are automatically reversed. You should see it in your account within 3-5 business days.', time: '09:00 AM' },
      { id: 3, sender: 'user', text: 'Okay, thank you for the update.', time: '09:45 AM' }
    ]
  },
  {
    id: 'TKT-003',
    user: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    avatar: 'E',
    subject: 'Question about venue capacity',
    status: 'Closed',
    date: '1 day ago',
    messages: [
      { id: 1, sender: 'user', text: 'Can I increase the capacity of my event after publishing?', time: 'Yesterday' },
      { id: 2, sender: 'admin', text: 'Yes, Elena! You can edit your event details and increase the ticket limit at any time from your organizer dashboard.', time: 'Yesterday' }
    ]
  }
];

const mockFeedback = [
  { id: 1, user: 'David Kim', rating: 5, comment: 'The new scanning feature is incredibly fast. Saved us a lot of time at the door.', date: 'June 15, 2026' },
  { id: 2, user: 'Aisha Bello', rating: 4, comment: 'Great platform, but I wish there were more options for customizing the event page colors.', date: 'June 12, 2026' },
  { id: 3, user: 'James Carter', rating: 3, comment: 'Payout took a bit longer than expected this time around.', date: 'June 10, 2026' },
];

export default function SupportFeedback() {
  const [activeTab, setActiveTab] = useState('support');
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState(initialTickets[0].id);
  const [replyText, setReplyText] = useState('');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    setTickets(currentTickets => 
      currentTickets.map(ticket => {
        if (ticket.id === selectedTicketId) {
          return {
            ...ticket,
            status: 'Pending', // Automatically update status on reply
            messages: [
              ...ticket.messages,
              { 
                id: Date.now(), 
                sender: 'admin', 
                text: replyText, 
                time: 'Just now' 
              }
            ]
          };
        }
        return ticket;
      })
    );
    setReplyText('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-red-100 text-red-600';
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      case 'Closed': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header & Tabs */}
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-['Space_mono',monospace] font-bold text-gray-900 mb-6 tracking-tight">
          Support & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] to-[#f2378f]">Feedback</span>
        </h1>
        
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('support')}
            className={`px-6 py-3 font-bold text-sm transition-all relative ${
              activeTab === 'support' ? 'text-[#5a1fb5]' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Support Tickets
            {activeTab === 'support' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5a1fb5]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-6 py-3 font-bold text-sm transition-all relative ${
              activeTab === 'feedback' ? 'text-[#5a1fb5]' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            User Feedback
            {activeTab === 'feedback' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5a1fb5]" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
        <AnimatePresence mode="wait">
          
          {/* ================= SUPPORT TAB ================= */}
          {activeTab === 'support' && (
            <motion.div 
              key="support"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex h-full"
            >
              {/* Ticket List Sidebar */}
              <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
                <div className="p-4 border-b border-gray-100">
                  <input 
                    type="text" 
                    placeholder="Search tickets..." 
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5a1fb5] focus:ring-1 focus:ring-[#5a1fb5] transition-all"
                  />
                </div>
                <div className="flex-1 overflow-y-auto">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`w-full text-left p-4 border-b border-gray-100 transition-colors hover:bg-white ${
                        selectedTicketId === ticket.id ? 'bg-white border-l-4 border-l-[#5a1fb5]' : 'border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-gray-900">{ticket.user}</span>
                        <span className="text-xs text-gray-500">{ticket.date}</span>
                      </div>
                      <div className="text-xs font-semibold text-gray-800 mb-2 truncate">{ticket.subject}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 truncate pr-4">{ticket.messages[ticket.messages.length - 1].text}</span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat / Reply Area */}
              {selectedTicket ? (
                <div className="flex-1 flex flex-col bg-white">
                  {/* Chat Header */}
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5a1fb5] to-[#f2378f] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        {selectedTicket.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{selectedTicket.user}</h3>
                        <p className="text-sm text-gray-500">{selectedTicket.email} • {selectedTicket.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                        Close Ticket
                      </button>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f7f7fa]/50">
                    <div className="text-center">
                      <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200">
                        Subject: {selectedTicket.subject}
                      </span>
                    </div>
                    {selectedTicket.messages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-end gap-2 max-w-[80%]">
                          {msg.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-xs font-bold text-gray-600">
                              {selectedTicket.avatar}
                            </div>
                          )}
                          <div 
                            className={`p-4 rounded-2xl text-sm ${
                              msg.sender === 'admin' 
                                ? 'bg-[#5a1fb5] text-white rounded-br-none' 
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                            }`}
                          >
                            {msg.text}
                          </div>
                          {msg.sender === 'admin' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5a1fb5] to-[#f2378f] shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                              A
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 mt-1 mx-10">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                    <div className="flex gap-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        className="flex-1 resize-none h-12 min-h-[48px] max-h-[120px] p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5a1fb5] focus:ring-1 focus:ring-[#5a1fb5] transition-all"
                        rows="1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendReply();
                          }
                        }}
                      />
                      <button 
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="px-6 py-2 bg-[#5a1fb5] hover:bg-[#4a1996] text-white font-bold text-sm rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        Send
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 ml-1">
                      Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Enter</kbd> to send, <kbd className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Shift + Enter</kbd> for new line.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 bg-[#f7f7fa]/50">
                  Select a ticket to view the conversation
                </div>
              )}
            </motion.div>
          )}

          {/* ================= FEEDBACK TAB ================= */}
          {activeTab === 'feedback' && (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 h-full overflow-y-auto bg-[#f7f7fa]/30"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFeedback.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-bold text-gray-900">{item.user}</div>
                      <div className="flex text-[#f2378f]">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < item.rating ? "currentColor" : "none"} stroke={i < item.rating ? "none" : "currentColor"} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.115-1.071.8l-5.004-2.909a.563.563 0 00-.56 0l-5.004 2.909c-.54.315-1.219-.179-1.071-.8l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">"{item.comment}"</p>
                    <div className="text-xs text-gray-400">{item.date}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}