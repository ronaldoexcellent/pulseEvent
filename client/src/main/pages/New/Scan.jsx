// -- Junction table binding users as scanners to specific events
// CREATE TABLE event_scanners (
//     event_id INT REFERENCES events(id) ON DELETE CASCADE,
//     user_id INT REFERENCES users(id) ON DELETE CASCADE,
//     assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (event_id, user_id) -- Ensures a user is only bound once per event
// );

// -- The tickets table, tracking the scan status and WHO scanned it
// CREATE TABLE tickets (
//     id SERIAL PRIMARY KEY,
//     ticket_code VARCHAR(120) UNIQUE NOT NULL,
//     event_id INT REFERENCES events(id) ON DELETE CASCADE,
//     buyer_id INT REFERENCES users(id),
//     status VARCHAR(20) DEFAULT 'valid', -- 'valid', 'scanned', 'revoked'
    
//     -- Audit trail for the scan
//     scanned_at TIMESTAMP,
//     scanned_by INT REFERENCES users(id) ON DELETE SET NULL 
// );

import React, { useState } from 'react';
import { ScanLine, CheckCircle, XOctagon, WifiOff, RefreshCw, UserCheck, ShieldAlert } from 'lucide-react';

export default function Scan() {
    // States: 'idle', 'scanning', 'approved', 'denied_fake', 'denied_network'
    const [scanState, setScanState] = useState('idle');
    const [scannedData, setScannedData] = useState(null);

    // Simulated scanning function
    const simulateScan = (type) => {
        setScanState('scanning');
        setScannedData(null);

        setTimeout(() => {
            if (type === 'success') {
                setScannedData({
                    attendee: 'Alex Johnson',
                    tier: 'VIP Pass',
                    ticketId: 'TXN-98237'
                });
                setScanState('approved');
            } else if (type === 'fake') {
                setScanState('denied_fake');
            } else if (type === 'network') {
                setScanState('denied_network');
            }
        }, 1500); // 1.5s simulated delay
    };

    const resetScanner = () => {
        setScanState('idle');
        setScannedData(null);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-pulse-bg-light">
            <div className="w-full max-w-md">
                
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Event Scanner</h1>
                    <p className="text-gray-500">Tech Innovators Summit</p>
                </div>

                {/* Main Scanner Viewport */}
                <div className="relative flex flex-col items-center justify-center p-8 mb-6 overflow-hidden bg-white shadow-xl rounded-3xl aspect-square">
                    
                    {scanState === 'idle' && (
                        <div className="flex flex-col items-center text-gray-400 animate-pulse">
                            <ScanLine size={80} strokeWidth={1} className="mb-4" />
                            <p className="font-medium">Ready to scan ticket QR...</p>
                        </div>
                    )}

                    {scanState === 'scanning' && (
                        <div className="flex flex-col items-center text-pulse-purple-primary">
                            <RefreshCw size={64} className="mb-4 animate-spin" />
                            <p className="font-bold tracking-widest uppercase animate-pulse">Verifying...</p>
                        </div>
                    )}

                    {scanState === 'approved' && (
                        <div className="flex flex-col items-center w-full text-center">
                            <div className="flex items-center justify-center w-24 h-24 mb-4 bg-green-100 rounded-full text-green-600">
                                <CheckCircle size={56} />
                            </div>
                            <h2 className="mb-1 text-2xl font-extrabold text-green-600 uppercase">Access Granted</h2>
                            <h3 className="mb-6 font-bold tracking-wider text-green-800 uppercase">Ticket Approved</h3>
                            
                            <div className="w-full p-4 text-left bg-gray-50 rounded-xl">
                                <p className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-500">
                                    <UserCheck size={16} /> {scannedData.attendee}
                                </p>
                                <p className="text-lg font-bold text-gray-900">{scannedData.tier}</p>
                                <p className="text-xs text-gray-400">ID: {scannedData.ticketId}</p>
                            </div>
                        </div>
                    )}

                    {scanState === 'denied_fake' && (
                        <div className="flex flex-col items-center w-full text-center">
                            <div className="flex items-center justify-center w-24 h-24 mb-4 text-red-600 bg-red-100 rounded-full">
                                <XOctagon size={56} />
                            </div>
                            <h2 className="mb-1 text-2xl font-extrabold text-red-600 uppercase">Access Denied</h2>
                            <h3 className="mb-4 font-bold tracking-wider text-red-800 uppercase">Ticket Unapproved</h3>
                            
                            <div className="flex items-start gap-3 p-4 text-left bg-red-50 text-red-700 rounded-xl">
                                <ShieldAlert size={20} className="shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold">Invalid or Fake Ticket</p>
                                    <p className="text-sm opacity-90">This QR code does not match any valid ticket in the system, or has already been used.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {scanState === 'denied_network' && (
                        <div className="flex flex-col items-center w-full text-center">
                            <div className="flex items-center justify-center w-24 h-24 mb-4 text-orange-600 bg-orange-100 rounded-full">
                                <WifiOff size={56} />
                            </div>
                            <h2 className="mb-1 text-2xl font-extrabold text-orange-600 uppercase">Access Denied</h2>
                            <h3 className="mb-4 font-bold tracking-wider text-orange-800 uppercase">Network Failed</h3>
                            
                            <div className="p-4 text-sm font-medium text-left text-orange-700 bg-orange-50 rounded-xl">
                                Could not verify ticket status. Please check your internet connection and try again.
                            </div>
                        </div>
                    )}
                </div>

                {/* Reset Button */}
                {scanState !== 'idle' && scanState !== 'scanning' && (
                    <button 
                        onClick={resetScanner}
                        className="w-full py-4 font-bold text-white transition-all shadow-lg cursor-pointer rounded-xl bg-pulse-purple-primary hover:bg-purple-800 hover:-translate-y-0.5"
                    >
                        Scan Next Ticket
                    </button>
                )}

                {/* Developer Simulation Controls */}
                <div className="p-4 mt-12 border-2 border-dashed border-pulse-pink-accent rounded-xl bg-pink-50/50">
                    <p className="mb-3 text-xs font-bold text-center text-gray-500 uppercase">Dev Simulation Controls</p>
                    <div className="flex gap-2">
                        <button onClick={() => simulateScan('success')} className="flex-1 py-2 text-xs font-bold text-green-700 bg-green-200 cursor-pointer rounded-lg hover:bg-green-300">Valid</button>
                        <button onClick={() => simulateScan('fake')} className="flex-1 py-2 text-xs font-bold text-red-700 bg-red-200 cursor-pointer rounded-lg hover:bg-red-300">Fake</button>
                        <button onClick={() => simulateScan('network')} className="flex-1 py-2 text-xs font-bold text-orange-700 bg-orange-200 cursor-pointer rounded-lg hover:bg-orange-300">Offline</button>
                    </div>
                </div>

            </div>
        </div>
    );
}