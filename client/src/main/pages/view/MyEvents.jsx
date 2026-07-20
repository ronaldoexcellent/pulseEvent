import React, { useState } from 'react';
import { Edit, Share2, Users, Eye, X } from 'lucide-react';

export default function MyEvents() {
    const [scannerInput, setScannerInput] = useState('');
    
    // Mock user's events with bound scanners
    const [myEvents, setMyEvents] = useState([
        { 
            id: 101, 
            title: 'React Developer Meetup', 
            status: 'Active',
            scanners: ['alex_dev', 'sarah_smith'] 
        }
    ]);

    const handleAddScanner = (eventId) => {
        if (!scannerInput.trim()) return;
        // Backend logic would verify the username exists first
        setMyEvents(events => events.map(ev => 
            ev.id === eventId ? { ...ev, scanners: [...ev.scanners, scannerInput] } : ev
        ));
        setScannerInput('');
    };

    const handleRemoveScanner = (eventId, scannerName) => {
        setMyEvents(events => events.map(ev => 
            ev.id === eventId ? { ...ev, scanners: ev.scanners.filter(s => s !== scannerName) } : ev
        ));
    };

    return (
        <div className="min-h-screen p-6 bg-pulse-bg-light">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Hosted Events</h1>
                <button className="px-5 py-2.5 font-semibold text-white shadow-md rounded-xl bg-pulse-pink-primary hover:bg-pink-600 transition-all cursor-pointer">
                    + Create New Event
                </button>
            </div>

            <div className="space-y-6">
                {myEvents.map(event => (
                    <div key={event.id} className="p-6 bg-white shadow-sm rounded-2xl">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                            <div>
                                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                    {event.status}
                                </span>
                                <h2 className="text-xl font-bold text-gray-900">{event.title}</h2>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 transition-colors bg-purple-100 cursor-pointer rounded-xl hover:bg-purple-200">
                                    <Eye size={16} /> View Info
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 transition-colors bg-blue-100 cursor-pointer rounded-xl hover:bg-blue-200">
                                    <Edit size={16} /> Edit
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 cursor-pointer rounded-xl hover:bg-gray-200">
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                        </div>

                        {/* Scanner Management Section */}
                        <div className="pt-6 mt-6 border-t border-gray-100">
                            <h3 className="flex items-center gap-2 mb-4 font-semibold text-gray-800">
                                <Users size={18} className="text-pulse-purple-primary" /> 
                                Assigned Scanners (Assistants)
                            </h3>
                            
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2">
                                        {event.scanners.length === 0 && <span className="text-sm text-gray-500">No scanners assigned.</span>}
                                        {event.scanners.map(scanner => (
                                            <div key={scanner} className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 rounded-lg text-gray-700">
                                                @{scanner}
                                                <button onClick={() => handleRemoveScanner(event.id, scanner)} className="text-red-500 cursor-pointer hover:text-red-700">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 max-w-sm w-full">
                                    <input 
                                        type="text" 
                                        placeholder="Enter username to bind..." 
                                        value={scannerInput}
                                        onChange={(e) => setScannerInput(e.target.value)}
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-purple-primary focus:outline-none"
                                    />
                                    <button 
                                        onClick={() => handleAddScanner(event.id)}
                                        className="px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer rounded-lg bg-pulse-purple-primary hover:bg-purple-800"
                                    >
                                        Bind User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}