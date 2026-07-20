import React, { useState } from 'react';
import { Calendar, MapPin, QrCode } from 'lucide-react';

export default function MyBookings() {
    // Mock user's booked tickets
    const [bookings] = useState([
        { 
            ticketId: 'TXN-98237', 
            eventTitle: 'Tech Innovators Summit',
            date: 'Aug 15, 2026',
            location: 'Lagos Expo Center',
            tier: 'VIP Pass',
            status: 'Valid'
        }
    ]);

    return (
        <div className="min-h-screen p-6 bg-pulse-bg-light">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">My Bookings</h1>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {bookings.map(booking => (
                    <div key={booking.ticketId} className="flex flex-col sm:flex-row overflow-hidden bg-white shadow-md rounded-2xl">
                        
                        {/* Event Details */}
                        <div className="flex-1 p-6 border-b sm:border-b-0 sm:border-r border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 text-xs font-bold tracking-wide text-blue-700 uppercase bg-blue-100 rounded-lg">
                                    {booking.tier}
                                </span>
                                <span className="text-sm font-medium text-gray-500">
                                    #{booking.ticketId}
                                </span>
                            </div>
                            
                            <h2 className="mb-4 text-xl font-bold text-gray-900">{booking.eventTitle}</h2>
                            
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-pulse-pink-primary" /> {booking.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-pulse-pink-primary" /> {booking.location}
                                </div>
                            </div>
                        </div>

                        {/* QR Code Section */}
                        <div className="flex flex-col items-center justify-center p-6 bg-linear-to-b from-gray-50 to-white sm:w-48">
                            <div className="flex items-center justify-center w-32 h-32 mb-3 bg-white border-2 border-gray-200 rounded-xl">
                                {/* Replace this icon with an actual QR Code rendering library like 'qrcode.react' */}
                                <QrCode size={80} className="text-gray-800" />
                            </div>
                            <span className="text-sm font-bold text-green-600 uppercase">
                                {booking.status}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}