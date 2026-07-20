import React, { useState } from 'react';
import { Search, Calendar, MapPin, User, Ticket, Heart } from 'lucide-react';

export default function Explore() {
    const [searchCode, setSearchCode] = useState('');

    // Mock data for public events
    const [events] = useState([
        { id: 1, title: 'Tech Innovators Summit', creator: 'jane_doe', date: 'Aug 15, 2026', location: 'Lagos Expo Center', type: 'Physical', hasTickets: true, hasDonations: false },
        { id: 2, title: 'Open Source Code Jam', creator: 'dev_sam', date: 'Sep 02, 2026', location: 'Online', type: 'Virtual', hasTickets: true, hasDonations: true }
    ]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Trigger backend search for specific event code (public or private)
        console.log("Searching for ticket code:", searchCode);
    };

    return (
        <div className="min-h-screen p-6 bg-pulse-bg-light">
            {/* Search Hero */}
            <div className="p-8 mb-8 text-white shadow-xl rounded-2xl bg-linear-to-br from-pulse-purple-primary via-pulse-purple-secondary to-purple-900">
                <h1 className="mb-2 text-3xl font-bold">Discover Events</h1>
                <p className="mb-6 text-purple-200">Find public events or enter a ticket code to access private gatherings.</p>
                
                <form onSubmit={handleSearch} className="flex max-w-lg gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute text-gray-400 left-3 top-3" size={20} />
                        <input 
                            type="text" 
                            placeholder="Paste ticket code here..." 
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                            className="w-full py-3 pl-10 pr-4 text-gray-800 bg-white border-none rounded-xl focus:ring-2 focus:ring-pulse-pink-primary"
                        />
                    </div>
                    <button type="submit" className="px-6 py-3 font-semibold text-white transition-all shadow-md cursor-pointer rounded-xl bg-pulse-pink-primary hover:bg-pink-600 hover:-translate-y-0.5">
                        Find Event
                    </button>
                </form>
            </div>

            {/* Public Events Grid */}
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Trending Public Events</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                    <div key={event.id} className="flex flex-col overflow-hidden transition-shadow bg-white shadow-sm rounded-2xl hover:shadow-lg hover:-translate-y-1">
                        <div className="h-32 bg-gray-200 bg-linear-to-r from-gray-100 to-gray-200" /> {/* Image placeholder */}
                        <div className="flex flex-col flex-1 p-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold tracking-wider text-purple-600 uppercase">{event.type}</span>
                                <span className="flex items-center gap-1 text-sm text-gray-500">
                                    <User size={14} /> @{event.creator}
                                </span>
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-gray-900">{event.title}</h3>
                            
                            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                                <Calendar size={16} className="text-pulse-pink-primary" /> {event.date}
                            </div>
                            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                                <MapPin size={16} className="text-pulse-pink-primary" /> {event.location}
                            </div>

                            <div className="flex gap-2 mt-auto">
                                {event.hasTickets && (
                                    <button className="flex items-center justify-center flex-1 gap-2 py-2 text-sm font-medium text-white transition-colors cursor-pointer rounded-lg bg-pulse-purple-primary hover:bg-purple-800">
                                        <Ticket size={16} /> Buy Ticket
                                    </button>
                                )}
                                {event.hasDonations && (
                                    <button className="flex items-center justify-center flex-1 gap-2 py-2 text-sm font-medium transition-colors border cursor-pointer border-pulse-pink-primary text-pulse-pink-primary rounded-lg hover:bg-pink-50">
                                        <Heart size={16} /> Donate
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}