import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { 
    Search, Calendar, MapPin, User, Ticket, Heart, ArrowLeft, 
    Info, Share2, Globe, ExternalLink, QrCode, X, CheckCircle, 
    XCircle, Loader2, Download, Image as ImageIcon 
} from 'lucide-react';

export default function Explore() {
    const [searchCode, setSearchCode] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);

    // --- STATES FOR MODALS ---
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [ticketStep, setTicketStep] = useState(1); 
    const [selectedTickets, setSelectedTickets] = useState({});
    const [orderSummary, setOrderSummary] = useState(null); 

    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');
    const [donationStatus, setDonationStatus] = useState('idle');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [donationReceiptDetails, setDonationReceiptDetails] = useState(null);

    // Ref for the receipt to enable image download
    const receiptRef = useRef(null);

    const [events] = useState([
        { 
            id: 1, 
            title: 'Tech Innovators Summit', 
            creator: 'jane_doe', 
            creatorRole: 'Tech Lead at InnovateX',
            date: 'Aug 15, 2026',
            time: '09:00 AM - 05:00 PM', 
            location: 'Landmark Centre, Water Corporation Drive, Victoria Island, Lagos, Nigeria', 
            type: 'Physical', 
            hasTickets: true, 
            hasDonations: false,
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80',
            description: 'Join the brightest minds in tech for a full day of keynotes, networking, and hands-on workshops. We will be exploring the future of artificial intelligence, web3, and scalable cloud infrastructure. Lunch and exclusive swag are included with your VIP ticket.',
            ticketTypes: [
                { id: 't1', name: 'General Admission', price: 0, available: 150 },
                { id: 't2', name: 'VIP Pass (Inc. Lunch & Swag)', price: 150, available: 50 }
            ]
        },
        { 
            id: 2, 
            title: 'Open Source Code Jam', 
            creator: 'dev_sam', 
            creatorRole: 'Open Source Maintainer',
            date: 'Sep 02, 2026', 
            time: '10:00 AM - 08:00 PM',
            location: 'Online via Zoom', 
            type: 'Virtual', 
            link: 'https://zoom.us/join', 
            hasTickets: true, 
            hasDonations: true,
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&q=80',
            description: 'A community-driven hackathon focused on contributing to vital open-source projects. Whether you are a beginner looking for your first PR or a veteran maintainer, join us to build, learn, and collaborate. Donations go directly to funding servers for our community projects.',
            ticketTypes: [
                { id: 't3', name: 'Virtual Participant', price: 0, available: 500 }
            ]
        }
    ]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for ticket code:", searchCode);
    };

    const handleTicketQuantityChange = (id, delta) => {
        setSelectedTickets(prev => {
            const current = prev[id] || 0;
            const next = Math.max(0, current + delta);
            return { ...prev, [id]: next };
        });
    };

    const handleCheckout = () => {
        const items = [];
        let total = 0;
        let totalQty = 0;

        selectedEvent.ticketTypes.forEach(ticket => {
            const qty = selectedTickets[ticket.id] || 0;
            if (qty > 0) {
                const subtotal = qty * ticket.price;
                total += subtotal;
                totalQty += qty;
                items.push({ ...ticket, qty, subtotal });
            }
        });

        if (totalQty > 0) {
            setOrderSummary({
                items,
                total,
                orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
                purchaseDate: new Date().toLocaleString()
            });
            setTicketStep(2); 
        } else {
            alert('Please select at least one ticket.');
        }
    };

    const closeTicketModal = () => {
        setIsTicketModalOpen(false);
        setTimeout(() => {
            setTicketStep(1);
            setSelectedTickets({});
            setOrderSummary(null);
        }, 300);
    };

    // --- IMAGE DOWNLOAD LOGIC ---
    const handleDownloadImage = async () => {
        if (!receiptRef.current) return;
        
        try {
            const dataUrl = await toPng(receiptRef.current, { 
                cacheBust: true, 
                pixelRatio: 3,
                backgroundColor: '#ffffff'
            });
            
            const link = document.createElement('a');
            link.download = `${selectedEvent?.title.replace(/\s+/g, '_')}_Ticket.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image', err);
            alert('Something went wrong while downloading the ticket.');
        }
    };

    const handleDonateSubmit = (e) => {
        e.preventDefault();
        if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) return;
        
        setDonationStatus('processing');
        setTimeout(() => {
            // Simulated payment gateway response (70% success rate for testing)
            const isSuccess = Math.random() > 0.3; 
            if (isSuccess) {
                setDonationReceiptDetails({
                    id: 'DON-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                    amount: donationAmount,
                    date: new Date().toLocaleString(),
                    anonymous: isAnonymous
                });
                setDonationStatus('success');
            } else {
                setDonationStatus('fail');
            }
        }, 2000);
    };

    const closeDonationModal = () => {
        setIsDonationModalOpen(false);
        setTimeout(() => {
            setDonationStatus('idle');
            setDonationAmount('');
            setIsAnonymous(false);
            setDonationReceiptDetails(null);
        }, 300);
    };

    if (selectedEvent) {
        return (
            <div className="relative min-h-screen py-4 sm:py-8 bg-pulse-bg-light print:bg-white print:py-0 print:min-h-0">
                {/* Print styles to prevent second blank page */}
                <style>
                    {`
                    @media print {
                        @page { margin: 1cm; size: auto; }
                        body { -webkit-print-color-adjust: exact; }
                    }
                    `}
                </style>
                
                <div className="max-w-5xl px-4 mx-auto print:hidden">
                    {/* Back Navigation */}
                    <button 
                        onClick={() => setSelectedEvent(null)}
                        className="flex items-center gap-2 mb-4 font-medium text-gray-600 transition-colors sm:mb-6 hover:text-purple-700 w-fit"
                    >
                        <ArrowLeft size={20} /> Back to Explore
                    </button>

                    {/* Hero Image */}
                    <div className="w-full mb-6 overflow-hidden bg-gray-200 shadow-md sm:mb-8 h-48 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl">
                        <img 
                            src={selectedEvent.image} 
                            alt={selectedEvent.title} 
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
                        <div className="space-y-6 sm:space-y-8 lg:col-span-2">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 text-xs font-bold tracking-wider text-purple-700 uppercase bg-purple-100 rounded-full">
                                        {selectedEvent.type} Event
                                    </span>
                                </div>
                                <h1 className="mb-4 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                                    {selectedEvent.title}
                                </h1>
                            </div>

                            <div className="p-4 bg-white shadow-sm sm:p-6 rounded-2xl">
                                <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800 sm:text-xl">
                                    <Info className="text-purple-600" size={24} /> About This Event
                                </h2>
                                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                                    {selectedEvent.description}
                                </p>
                            </div>
                            
                            <div className="p-4 bg-white shadow-sm sm:p-6 rounded-2xl">
                                <h2 className="mb-4 text-base font-bold text-gray-800 sm:text-lg">Hosted By</h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-full sm:w-12 sm:h-12 sm:text-xl bg-linear-to-br from-purple-600 to-pink-500">
                                        {selectedEvent.creator.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">@{selectedEvent.creator}</p>
                                        <p className="text-xs text-gray-500 sm:text-sm">{selectedEvent.creatorRole}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="sticky p-4 bg-white border border-gray-100 shadow-lg sm:p-6 top-6 rounded-2xl">
                                <div className="pb-6 mb-6 space-y-4 border-b border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 sm:text-base">{selectedEvent.date}</p>
                                            <p className="text-xs text-gray-500 sm:text-sm">Starts at {selectedEvent.time}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
                                            {selectedEvent.type === 'Virtual' ? <Globe size={20} /> : <MapPin size={20} />}
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm font-semibold leading-snug text-gray-900 sm:text-base">{selectedEvent.location}</p>
                                            
                                            {selectedEvent.type === 'Virtual' ? (
                                                <a 
                                                    href={selectedEvent.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 transition-colors sm:text-sm hover:text-pink-500 hover:underline"
                                                >
                                                    Join Meeting Link <ExternalLink size={14} />
                                                </a>
                                            ) : (
                                                <p className="text-xs text-gray-500 sm:text-sm">In-Person Event</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {selectedEvent.hasTickets && (
                                        <button 
                                            onClick={() => setIsTicketModalOpen(true)}
                                            className="flex items-center justify-center w-full gap-2 py-3 text-sm font-bold text-white transition-all shadow-md sm:py-3.5 sm:text-base rounded-xl bg-linear-to-r from-purple-600 to-purple-800 hover:shadow-lg hover:-translate-y-0.5"
                                        >
                                            <Ticket size={20} /> Get Tickets
                                        </button>
                                    )}
                                    {selectedEvent.hasDonations && (
                                        <button 
                                            onClick={() => setIsDonationModalOpen(true)}
                                            className="flex items-center justify-center w-full gap-2 py-3 text-sm font-bold transition-all border-2 sm:py-3.5 sm:text-base rounded-xl border-pink-500 text-pink-500 hover:bg-pink-50"
                                        >
                                            <Heart size={20} /> Support & Donate
                                        </button>
                                    )}
                                    
                                    <button className="flex items-center justify-center w-full gap-2 py-2.5 mt-4 text-xs font-semibold text-gray-600 transition-colors bg-gray-100 sm:py-3 sm:text-sm rounded-xl hover:bg-gray-200">
                                        <Share2 size={18} /> Share Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- TICKET MODAL OVERLAY --- */}
                {isTicketModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm sm:p-4 print:static print:bg-transparent print:p-0 print:block print:h-auto">
                        
                        <div className="flex flex-col w-[95%] sm:w-full max-w-md p-4 bg-white shadow-2xl sm:p-6 rounded-2xl max-h-[90vh] print:max-h-none print:shadow-none print:p-0 print:block print:max-w-none">
                            
                            <div className="flex items-center justify-between mb-4 shrink-0 sm:mb-6 print:hidden">
                                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {ticketStep === 1 ? 'Select Tickets' : 'Your Receipt'}
                                </h3>
                                <button onClick={closeTicketModal} className="text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="overflow-y-auto pr-1 sm:pr-2 pb-1 print:overflow-visible print:pr-0">
                                {ticketStep === 1 ? (
                                    <div className="space-y-3 sm:space-y-4 print:hidden">
                                        {selectedEvent.ticketTypes?.map((ticket) => (
                                            <div key={ticket.id} className="flex flex-col justify-between gap-3 p-3 border border-gray-100 sm:flex-row sm:items-center sm:gap-0 sm:p-4 rounded-xl bg-gray-50">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 sm:text-base">{ticket.name}</p>
                                                    <p className="text-xs font-medium text-purple-600 sm:text-sm">
                                                        {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3 self-end sm:self-auto">
                                                    <button 
                                                        onClick={() => handleTicketQuantityChange(ticket.id, -1)}
                                                        className="flex items-center justify-center w-8 h-8 text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-4 text-sm font-semibold text-center sm:text-base">{selectedTickets[ticket.id] || 0}</span>
                                                    <button 
                                                        onClick={() => handleTicketQuantityChange(ticket.id, 1)}
                                                        className="flex items-center justify-center w-8 h-8 text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button 
                                            onClick={handleCheckout}
                                            className="w-full py-3 mt-2 text-sm font-bold text-white transition-colors bg-purple-600 sm:mt-4 sm:text-base rounded-xl hover:bg-purple-700"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div 
                                            id="ticket-receipt" 
                                            ref={receiptRef}
                                            className="relative overflow-hidden bg-white border border-gray-200 shadow-md rounded-2xl print:border-gray-300 print:shadow-none break-inside-avoid print:m-0"
                                            style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }} 
                                        >
                                            {/* Header Section (White Background) */}
                                            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-white rounded-t-2xl">
                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                    <img src="./pulse-event-logo.png" alt="Pulse Event Logo" className="h-5 object-contain sm:h-6" />
                                                </div>
                                                {/* Gradient Text for "Official" */}
                                                <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r from-purple-700 to-pink-500 px-2 py-1 rounded-md border border-pink-100 bg-pink-50/50 shadow-xs">
                                                    Official
                                                </span>
                                            </div>

                                            {/* Perforated Divider */}
                                            <div className="relative z-10 flex items-center justify-between px-0">
                                                <div className="w-4 h-4 bg-gray-100 border-r border-gray-200 sm:w-5 sm:h-5 rounded-r-full -ml-[1px] shadow-inner"></div>
                                                <div className="flex-1 mx-2 border-t-[2px] border-gray-200 border-dashed"></div>
                                                <div className="w-4 h-4 bg-gray-100 border-l border-gray-200 sm:w-5 sm:h-5 rounded-l-full -mr-[1px] shadow-inner"></div>
                                            </div>

                                            {/* Main Body Section */}
                                            <div className="relative p-4 sm:p-6">
                                                {/* Background Watermark */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                                    <img src="./pulse-event-icon.png" alt="" className="w-48 h-48 object-contain sm:w-60 sm:h-60" />
                                                </div>

                                                <div className="relative z-10 pb-4 text-center border-b border-gray-100 sm:pb-5">
                                                    {/* Event Title with Gradient Background */}
                                                    <div className="inline-block px-5 py-2.5 mb-3 bg-linear-to-r from-purple-700 to-pink-500 rounded-xl shadow-md">
                                                        <h4 className="text-lg font-black leading-tight text-white sm:text-xl md:text-2xl">{selectedEvent.title}</h4>
                                                    </div>
                                                    
                                                    <p className="text-xs font-bold text-gray-800 sm:text-sm mt-1">{selectedEvent.date}</p>
                                                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{selectedEvent.time}</p>
                                                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5 truncate px-2 sm:px-4">{selectedEvent.location}</p>
                                                </div>

                                                <div className="relative z-10 py-4 border-b border-gray-100 sm:py-5">
                                                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                                                        <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-bold tracking-wider">Order Items</p>
                                                        <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-bold tracking-wider">Amount</p>
                                                    </div>
                                                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                                        {orderSummary?.items.map((item, idx) => (
                                                            <div key={idx} className="flex justify-between text-xs sm:text-sm">
                                                                <span className="font-medium text-gray-800">{item.qty}x {item.name}</span>
                                                                <span className="font-semibold text-gray-900">
                                                                    {item.subtotal === 0 ? 'Free' : `$${item.subtotal}`}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center justify-between pt-2 mt-2 border-t sm:pt-3 sm:mt-3 border-gray-50">
                                                        <span className="text-xs font-bold tracking-wide text-gray-600 uppercase sm:text-sm">Total Paid</span>
                                                        <span className="text-lg font-black text-transparent sm:text-xl bg-clip-text bg-linear-to-r from-purple-700 to-pink-500">
                                                            {orderSummary?.total === 0 ? 'Free' : `$${orderSummary?.total}`}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="relative z-10 flex items-center justify-between pt-4 sm:pt-5">
                                                    <div className="flex flex-col">
                                                        <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-0.5 sm:mb-1">Order ID</p>
                                                        <p className="text-xs font-bold text-gray-900 sm:text-sm mb-1.5 sm:mb-2">{orderSummary?.orderId}</p>
                                                        
                                                        <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-0.5 sm:mb-1">Purchased</p>
                                                        <p className="text-[9px] font-medium text-gray-600 sm:text-[10px]">{orderSummary?.purchaseDate}</p>
                                                        
                                                        {/* Footer Icon and Powered By text */}
                                                        <div className="mt-3 sm:mt-4 flex items-center gap-1.5 opacity-90">
                                                            <img src="./pulse-event-icon.png" alt="Icon" className="w-3 h-3 object-contain sm:w-3.5 sm:h-3.5" />
                                                            <span className="text-[9px] sm:text-[10px] font-bold text-gray-600">Powered by Pulse Event</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="p-1.5 sm:p-2 bg-white border border-gray-100 rounded-lg sm:rounded-xl shadow-xs">
                                                        <QrCode size={60} className="text-gray-900 sm:w-[80px] sm:h-[80px]" strokeWidth={1.5} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-2 sm:gap-3 sm:mt-6 print:hidden">
                                            <button 
                                                onClick={() => window.print()}
                                                className="flex items-center justify-center gap-2 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                                            >
                                                <Download size={16} /> Save PDF
                                            </button>
                                            <button 
                                                onClick={handleDownloadImage}
                                                className="flex items-center justify-center gap-2 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white transition-colors bg-purple-600 rounded-xl hover:bg-purple-700"
                                            >
                                                <ImageIcon size={16} /> Save Image
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- DONATION MODAL OVERLAY --- */}
                {isDonationModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm sm:p-4 print:hidden">
                        <div className="w-[95%] sm:w-full max-w-md p-4 sm:p-6 bg-white shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
                            
                            {/* Header (Hidden when viewing receipt) */}
                            {donationStatus !== 'receipt' && (
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">Support the Event</h3>
                                    <button onClick={closeDonationModal} className="text-gray-400 hover:text-gray-600">
                                        <X size={24} />
                                    </button>
                                </div>
                            )}

                            {donationStatus === 'idle' && (
                                <form onSubmit={handleDonateSubmit} className="space-y-4 sm:space-y-6">
                                    <div>
                                        <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">Donation Amount ($)</label>
                                        <input 
                                            type="number"
                                            value={donationAmount}
                                            onChange={(e) => setDonationAmount(e.target.value)}
                                            placeholder="Enter amount..."
                                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    
                                    {/* Anonymous Toggle */}
                                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50">
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Donate Anonymously</p>
                                            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Your name will be hidden from public supporters</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsAnonymous(!isAnonymous)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAnonymous ? 'bg-pink-500' : 'bg-gray-300'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>

                                    <button 
                                        type="submit"
                                        className="flex items-center justify-center w-full gap-2 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-white transition-colors bg-pink-500 rounded-xl hover:bg-pink-600"
                                    >
                                        Donate Now
                                    </button>
                                </form>
                            )}

                            {donationStatus === 'processing' && (
                                <div className="flex flex-col items-center justify-center py-6 space-y-4 sm:py-8">
                                    <Loader2 className="w-10 h-10 text-pink-500 sm:w-12 sm:h-12 animate-spin" />
                                    <p className="text-sm font-medium text-gray-600 sm:text-base">Processing payment...</p>
                                </div>
                            )}

                            {donationStatus === 'success' && (
                                <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center sm:py-8 sm:space-y-4">
                                    <CheckCircle className="w-12 h-12 text-green-500 sm:w-16 sm:h-16" />
                                    <h4 className="text-lg font-bold text-gray-900 sm:text-xl">Thank you!</h4>
                                    <p className="text-sm text-gray-600 sm:text-base">Your donation of ${donationAmount} was successful.</p>
                                    <button 
                                        onClick={() => setDonationStatus('receipt')}
                                        className="px-5 py-2.5 mt-3 text-sm font-semibold text-white transition-colors bg-pink-500 rounded-xl sm:mt-4 sm:text-base hover:bg-pink-600 w-full shadow-md"
                                    >
                                        View Receipt
                                    </button>
                                </div>
                            )}

                            {donationStatus === 'receipt' && (
                                <div className="animate-in fade-in zoom-in-95 duration-300">
                                    {/* Donation Receipt Format with Pulse Event Branding */}
                                    <div className="relative overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
                                        
                                        {/* Header Section */}
                                        <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 bg-white rounded-t-2xl">
                                            <div className="flex items-center gap-2">
                                                <img src="./pulse-event-logo.png" alt="Pulse Event Logo" className="h-4 object-contain sm:h-5" />
                                                <span className="font-bold text-gray-800 text-sm border-l border-gray-200 pl-2 ml-1">Donation Receipt</span>
                                            </div>
                                            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase text-pink-500 bg-pink-50 px-2 py-1 rounded-md border border-pink-100">
                                                Success
                                            </span>
                                        </div>

                                        {/* Perforated Divider */}
                                        <div className="relative z-10 flex items-center justify-between px-0">
                                            <div className="w-4 h-4 bg-gray-100 border-r border-gray-200 sm:w-5 sm:h-5 rounded-r-full -ml-[1px] shadow-inner"></div>
                                            <div className="flex-1 mx-2 border-t-[2px] border-gray-200 border-dashed"></div>
                                            <div className="w-4 h-4 bg-gray-100 border-l border-gray-200 sm:w-5 sm:h-5 rounded-l-full -mr-[1px] shadow-inner"></div>
                                        </div>

                                        {/* Main Body Section */}
                                        <div className="relative p-5 sm:p-6 text-center">
                                            
                                            {/* Background Watermark */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                                <img src="./pulse-event-icon.png" alt="" className="w-40 h-40 object-contain sm:w-48 sm:h-48" />
                                            </div>

                                            <div className="relative z-10">
                                                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Amount Donated</p>
                                                <h4 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 mb-6">
                                                    ${donationReceiptDetails?.amount}
                                                </h4>

                                                <div className="space-y-3.5 sm:space-y-4 text-left border-t border-gray-100 pt-5">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <span className="text-xs sm:text-sm font-medium text-gray-500">Event</span>
                                                        <span className="text-xs sm:text-sm font-bold text-gray-900 text-right">{selectedEvent.title}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm font-medium text-gray-500">Donor</span>
                                                        <span className="text-xs sm:text-sm font-bold text-gray-900">
                                                            {donationReceiptDetails?.anonymous ? 'Anonymous Donor' : 'Ronaldo E. Stephen'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm font-medium text-gray-500">Date</span>
                                                        <span className="text-xs sm:text-sm font-bold text-gray-900">{donationReceiptDetails?.date.split(',')[0]}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm font-medium text-gray-500">Receipt ID</span>
                                                        <span className="text-xs sm:text-sm font-bold text-gray-900">{donationReceiptDetails?.id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Footer with branding */}
                                        <div className="bg-gray-50 px-4 py-3 sm:py-4 flex flex-col items-center justify-center border-t border-gray-100">
                                            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-2">
                                                Thank you for your generous support!
                                            </p>
                                            <div className="flex items-center gap-1.5 opacity-90">
                                                <img src="./pulse-event-icon.png" alt="Icon" className="w-3 h-3 object-contain sm:w-3.5 sm:h-3.5" />
                                                <span className="text-[9px] sm:text-[10px] font-bold text-gray-600">Powered by Pulse Event</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={closeDonationModal}
                                        className="w-full py-3 mt-4 sm:mt-5 text-sm font-bold text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}

                            {donationStatus === 'fail' && (
                                <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center sm:py-8 sm:space-y-4">
                                    <XCircle className="w-12 h-12 text-red-500 sm:w-16 sm:h-16" />
                                    <h4 className="text-lg font-bold text-gray-900 sm:text-xl">Payment Failed</h4>
                                    <p className="text-sm text-gray-600 sm:text-base">There was an issue processing your card. Please try again.</p>
                                    <button 
                                        onClick={() => setDonationStatus('idle')}
                                        className="px-5 py-2 mt-3 text-sm font-semibold text-white transition-colors bg-pink-500 rounded-lg sm:mt-4 sm:text-base hover:bg-pink-600"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-pulse-bg-light">
            <div className="p-6 mb-6 text-white sm:p-8 sm:mb-8 shadow-xl rounded-2xl bg-linear-to-br from-purple-600 via-purple-700 to-purple-900">
                <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Discover Events</h1>
                <p className="mb-5 text-sm sm:mb-6 sm:text-base text-purple-200">Find public events or enter a ticket code to access private gatherings.</p>
                
                <form onSubmit={handleSearch} className="flex flex-col max-w-lg gap-3 sm:flex-row">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute text-gray-400 left-3 top-3" size={20} />
                        <input 
                            type="text" 
                            placeholder="Paste ticket code here..." 
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                            className="w-full py-3 pl-10 pr-4 text-sm border-none outline-none sm:text-base text-gray-800 bg-white rounded-xl focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <button type="submit" className="w-full px-6 py-3 text-sm font-semibold text-white transition-all shadow-md sm:w-auto sm:text-base cursor-pointer rounded-xl bg-pink-500 hover:bg-pink-600 hover:-translate-y-0.5">
                        Find Event
                    </button>
                </form>
            </div>

            <h2 className="mb-4 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">Trending Public Events</h2>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                    <div 
                        key={event.id} 
                        onClick={() => setSelectedEvent(event)}
                        className="flex flex-col overflow-hidden transition-all bg-white shadow-sm cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1 ring-1 ring-transparent hover:ring-purple-200 group"
                    >
                        <div className="relative h-40 overflow-hidden bg-gray-200 sm:h-48">
                            <img 
                                src={event.image} 
                                alt={event.title} 
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute px-2 py-1 text-[10px] sm:text-xs font-bold tracking-wider text-white uppercase rounded-md bg-black/50 backdrop-blur-md top-3 right-3">
                                {event.type}
                            </div>
                        </div> 
                        
                        <div className="flex flex-col flex-1 p-4 sm:p-5">
                            <div className="flex items-center gap-1 mb-2 text-xs text-gray-500 sm:mb-3 sm:text-sm">
                                <User size={14} className="text-purple-600" /> 
                                <span className="font-medium">@{event.creator}</span>
                            </div>
                            
                            <h3 className="mb-3 text-lg font-bold text-gray-900 transition-colors sm:mb-4 sm:text-xl line-clamp-2 group-hover:text-purple-600">
                                {event.title}
                            </h3>
                            
                            <div className="mb-4 space-y-1.5 sm:mb-6 sm:space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                                    <Calendar size={16} className="text-pink-500" /> {event.date}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600 truncate sm:text-sm">
                                    <MapPin size={16} className="text-pink-500 min-w-[16px]" /> 
                                    <span className="truncate">
                                        {event.type === 'Physical' ? event.location.split(',')[0] : event.location}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-3 mt-auto border-t border-gray-100 sm:pt-4">
                                {event.hasTickets && (
                                    <span className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-purple-600 bg-purple-50 rounded-lg">
                                        <Ticket size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Tickets
                                    </span>
                                )}
                                {event.hasDonations && (
                                    <span className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-pink-500 bg-pink-50 rounded-lg">
                                        <Heart size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Donations
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}