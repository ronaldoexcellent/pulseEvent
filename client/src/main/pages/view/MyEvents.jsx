import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Share2, Users, Eye, X, Plus, Check, MapPin, Calendar, Link } from 'lucide-react';

const EventCard = ({ event, onAddScanner, onRemoveScanner, onView, onEdit }) => {
    const [scannerInput, setScannerInput] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleBind = () => {
        if (!scannerInput.trim()) return;
        onAddScanner(event.id, scannerInput.trim());
        setScannerInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleBind();
    };

    const handleShare = async () => {
        const mockLink = `https://pulseevent.com/e/${event.id}`;
        try {
            await navigator.clipboard.writeText(mockLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); 
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <div className="p-6 md:p-8 bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md rounded-3xl transition-all">
            <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-start">
                <div>
                    <span className={`inline-block px-3 py-1 mb-3 text-xs font-black tracking-widest uppercase rounded-lg ${
                        event.status === 'Active' 
                        ? 'text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400' 
                        : 'text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                        {event.status}
                    </span>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{event.title}</h2>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID: #{event.id}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button 
                        onClick={() => onView(event)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#5a1fb5] dark:text-[#a77bfa] transition-colors bg-purple-50 dark:bg-purple-900/30 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50"
                    >
                        <Eye size={16} /> View Info
                    </button>
                    <button 
                        onClick={() => onEdit(event)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-blue-700 dark:text-blue-400 transition-colors bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    >
                        <Edit size={16} /> Edit
                    </button>
                    <button 
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 w-28 justify-center"
                    >
                        {isCopied ? (
                            <span className="flex items-center gap-2 text-green-600 dark:text-green-400"><Check size={16} /> Copied</span>
                        ) : (
                            <span className="flex items-center gap-2"><Share2 size={16} /> Share</span>
                        )}
                    </button>
                </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">
                    <Users size={16} className="text-[#f2378f]" /> 
                    Assigned Scanners
                </h3>
                
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                            {event.scanners.length === 0 && (
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                                    No scanners currently assigned.
                                </span>
                            )}
                            {event.scanners.map(scanner => (
                                <div key={scanner} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
                                    @{scanner}
                                    <button 
                                        onClick={() => onRemoveScanner(event.id, scanner)} 
                                        className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                                        aria-label={`Remove scanner ${scanner}`}
                                    >
                                        <X size={14} strokeWidth={2.5} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex gap-2 max-w-md w-full">
                        <input 
                            type="text" 
                            placeholder="Enter scanner username..." 
                            value={scannerInput}
                            onChange={(e) => setScannerInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 px-4 py-2.5 text-sm font-medium bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:outline-none transition-all placeholder-gray-400"
                        />
                        <button 
                            onClick={handleBind}
                            disabled={!scannerInput.trim()}
                            className="px-5 py-2.5 text-sm font-bold text-white transition-all bg-[#5a1fb5] hover:bg-[#481894] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center gap-2"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            Bind
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function MyEvents() {
    const [myEvents, setMyEvents] = useState([
        { 
            id: 101, 
            title: 'Tech Startups Africa 2026', 
            status: 'Active',
            date: 'July 25, 2026',
            location: 'Lagos Expo Center',
            scanners: ['alex_dev', 'sarah_smith'] 
        },
        { 
            id: 102, 
            title: 'Creative Design Workshop', 
            status: 'Draft',
            date: 'August 10, 2026',
            location: 'Online Webinar',
            scanners: [] 
        }
    ]);

    // Modal States
    const [viewingEvent, setViewingEvent] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    
    // New Event Draft State
    const [newEvent, setNewEvent] = useState({ title: '', status: 'Draft', date: '', location: '' });

    const handleAddScanner = (eventId, username) => {
        setMyEvents(events => events.map(ev => {
            if (ev.id === eventId) {
                if (ev.scanners.includes(username)) return ev; 
                return { ...ev, scanners: [...ev.scanners, username] };
            }
            return ev;
        }));
    };

    const handleRemoveScanner = (eventId, scannerName) => {
        setMyEvents(events => events.map(ev => 
            ev.id === eventId ? { ...ev, scanners: ev.scanners.filter(s => s !== scannerName) } : ev
        ));
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setMyEvents(events => events.map(ev => 
            ev.id === editingEvent.id ? editingEvent : ev
        ));
        setEditingEvent(null);
    };

    const handleCreateEvent = (e) => {
        e.preventDefault();
        const createdEvent = {
            ...newEvent,
            id: Math.floor(1000 + Math.random() * 9000), // Generate mock 4-digit ID
            scanners: []
        };
        setMyEvents([createdEvent, ...myEvents]);
        setIsCreating(false);
        setNewEvent({ title: '', status: 'Draft', date: '', location: '' }); // Reset form
    };

    return (
        <div className="min-h-screen p-6 md:p-12 bg-gray-50 dark:bg-[#121216] transition-colors duration-300 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] to-[#f2378f] tracking-tighter">
                            My Hosted Events
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">
                            Manage your Pulse Event listings and assigned ticket scanners.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-white shadow-lg shadow-pink-500/20 rounded-xl bg-gradient-to-r from-[#f2378f] to-[#ff5b9c] hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        Create New Event
                    </button>
                </div>

                <div className="space-y-6">
                    {myEvents.map(event => (
                        <EventCard 
                            key={event.id}
                            event={event}
                            onAddScanner={handleAddScanner}
                            onRemoveScanner={handleRemoveScanner}
                            onView={setViewingEvent}
                            onEdit={setEditingEvent}
                        />
                    ))}
                </div>
            </div>

            {/* VIEW MODAL */}
            <AnimatePresence>
                {viewingEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setViewingEvent(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 z-10"
                        >
                            <button onClick={() => setViewingEvent(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <X size={24} />
                            </button>

                            <div className="mb-6">
                                <span className={`inline-block px-3 py-1 mb-3 text-xs font-black tracking-widest uppercase rounded-lg ${viewingEvent.status === 'Active' ? 'text-green-700 bg-green-100' : 'text-gray-700 bg-gray-100'}`}>
                                    {viewingEvent.status}
                                </span>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">{viewingEvent.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">Event ID: #{viewingEvent.id}</p>
                            </div>

                            <div className="space-y-4 mb-6 bg-[#f7f7fa] dark:bg-[#22222d] p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <Calendar size={18} className="text-[#f2378f]" />
                                    <span className="font-medium">{viewingEvent.date || 'Date TBA'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <MapPin size={18} className="text-[#f2378f]" />
                                    <span className="font-medium">{viewingEvent.location || 'Location TBA'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <Link size={18} className="text-[#f2378f]" />
                                    <span className="font-medium text-sm">pulseevent.com/e/{viewingEvent.id}</span>
                                </div>
                            </div>

                            <button onClick={() => setViewingEvent(null)} className="w-full py-3 bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white font-bold rounded-xl transition-colors">
                                Close
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* EDIT MODAL */}
            <AnimatePresence>
                {editingEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setEditingEvent(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 z-10"
                        >
                            <button onClick={() => setEditingEvent(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <X size={24} />
                            </button>

                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Edit Event</h3>
                            </div>

                            <form onSubmit={handleSaveEdit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
                                    <input 
                                        type="text"
                                        required
                                        value={editingEvent.title}
                                        onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                                        className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:outline-none text-gray-900 dark:text-white font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                                    <input 
                                        type="text"
                                        value={editingEvent.location}
                                        onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                                        className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:outline-none text-gray-900 dark:text-white font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Status</label>
                                    <select 
                                        value={editingEvent.status}
                                        onChange={(e) => setEditingEvent({...editingEvent, status: e.target.value})}
                                        className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:outline-none text-gray-900 dark:text-white font-medium appearance-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setEditingEvent(null)}
                                        className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 py-3 bg-[#5a1fb5] hover:bg-[#481894] text-white font-bold rounded-xl transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* CREATE MODAL */}
            <AnimatePresence>
                {isCreating && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsCreating(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white dark:bg-[#1a1a22] border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 z-10"
                        >
                            <button onClick={() => setIsCreating(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <X size={24} />
                            </button>

                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Create New Event</h3>
                            </div>

                            <form onSubmit={handleCreateEvent} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="E.g., Lagos Tech Summit 2026"
                                        value={newEvent.title}
                                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                        className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:outline-none text-gray-900 dark:text-white font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Date</label>
                                        <input 
                                            type="text"
                                            placeholder="E.g., Oct 12, 2026"
                                            value={newEvent.date}
                                            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                            className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:outline-none text-gray-900 dark:text-white font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Status</label>
                                        <select 
                                            value={newEvent.status}
                                            onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                                            className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:outline-none text-gray-900 dark:text-white font-medium appearance-none"
                                        >
                                            <option value="Draft">Draft</option>
                                            <option value="Active">Active</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                                    <input 
                                        type="text"
                                        placeholder="E.g., Eko Convention Center"
                                        value={newEvent.location}
                                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                        className="w-full px-4 py-3 bg-[#f7f7fa] dark:bg-[#22222d] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:outline-none text-gray-900 dark:text-white font-medium"
                                    />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setIsCreating(false)}
                                        className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 py-3 bg-gradient-to-r from-[#f2378f] to-[#ff5b9c] text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
                                    >
                                        Create Event
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}