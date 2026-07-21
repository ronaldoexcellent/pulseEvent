import { useState } from 'react';
import { 
  Calendar, MapPin, Globe, Lock, Unlock, 
  Ticket, Plus, Trash2, Heart,
  Settings2, AlignLeft, Target, Check, Image as ImageIcon
} from 'lucide-react';

const PRESET_GALLERY = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  'https://images.unsplash.com/photo-1533174000222-edfe3bac9334?w=800&q=80',
  'https://images.unsplash.com/photo-1520092362635-728b6d3cc32b?w=800&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80'
];

const Create = () => {
  // Basic Info State
  const [privacy, setPrivacy] = useState('public');
  const [eventType, setEventType] = useState('venue');
  
  // Module Toggles
  const [ticketingEnabled, setTicketingEnabled] = useState(false);
  const [donationsEnabled, setDonationsEnabled] = useState(false);
  
  // Ticketing State
  const [tickets, setTickets] = useState([
    { id: 1, name: 'General Admission', price: '25.00', capacity: '100' }
  ]);

  // Donations State
  const [donations, setDonations] = useState([
    { id: 1, title: 'General Support Fund', goal: '5000', description: 'Help us cover the operational costs for this event.' }
  ]);

  // Cover Image State
  const [coverPhoto, setCoverPhoto] = useState(PRESET_GALLERY[0]);

  // Ticket Handlers
  const addTicket = () => setTickets([...tickets, { id: Date.now(), name: '', price: '', capacity: '' }]);
  const removeTicket = (id) => setTickets(tickets.filter(t => t.id !== id));
  const handleTicketChange = (id, field, value) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  // Donation Handlers
  const addDonation = () => setDonations([...donations, { id: Date.now(), title: '', goal: '', description: '' }]);
  const removeDonation = (id) => setDonations(donations.filter(d => d.id !== id));
  const handleDonationChange = (id, field, value) => {
    setDonations(donations.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  return (
    <div className="min-h-screen py-10 bg-pulse-bg-light">
      <div className="max-w-4xl px-4 mx-auto space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pulse-purple-primary to-pulse-gradient-blend">
            Create New Event
          </h1>
          <p className="mt-2 text-gray-600">Set up your event details, ticketing, and donation goals.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Section 1: Basic Information */}
          <div className="p-6 bg-white shadow-sm rounded-2xl md:p-8">
            <h2 className="flex items-center mb-6 text-xl font-bold text-gray-800 gap-2">
              <Calendar className="text-pulse-purple-primary" size={24} />
              Basic Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Event Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Tech Startup Mixer 2026"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pulse-purple-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Event Description */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                  <AlignLeft size={16} className="text-pulse-gradient-blend" />
                  Event Description
                </label>
                <textarea 
                  rows="4"
                  placeholder="Tell attendees what this event is about, what they can expect, and why they should join..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pulse-purple-primary focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Start Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pulse-purple-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">End Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pulse-purple-primary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Event Location Toggle */}
              <div className="pt-2">
                <label className="block mb-3 text-sm font-medium text-gray-700">Location Type</label>
                <div className="flex gap-4 p-1 bg-gray-100 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setEventType('venue')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      eventType === 'venue' ? 'bg-white text-pulse-purple-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <MapPin size={16} /> Venue
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventType('online')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      eventType === 'online' ? 'bg-white text-pulse-purple-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Globe size={16} /> Online Event
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {eventType === 'venue' ? 'Venue Address' : 'Meeting Link / Platform'}
                </label>
                <input 
                  type="text" 
                  placeholder={eventType === 'venue' ? '123 Main St, Lagos, Nigeria' : 'e.g., Zoom link will be sent to attendees'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pulse-purple-primary outline-none transition-all"
                />
              </div>

              {/* RESPONSIVE FULL DISPLAY & GALLERY SECTION */}
              <div className="pt-4 space-y-4">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <ImageIcon size={16} className="text-pulse-purple-primary" />
                  Event Cover Photo
                </label>

                {/* Main Large Display */}
                <div className="relative w-full overflow-hidden shadow-md group aspect-video rounded-2xl bg-gray-100 border border-gray-200">
                  <img 
                    src={coverPhoto} 
                    alt="Main Event Cover Preview" 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay at the bottom for polished look */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase bg-black/40 backdrop-blur-md rounded-full shadow-sm">
                      Cover Preview
                    </span>
                  </div>
                </div>

                {/* Thumbnail Filmstrip Gallery */}
                <div className="p-3 bg-gray-50 border border-gray-100 shadow-inner rounded-xl">
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                    {PRESET_GALLERY.map((url, idx) => {
                      const isActive = coverPhoto === url;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => setCoverPhoto(url)}
                          className={`group relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-out ${
                            isActive 
                              ? 'ring-2 ring-pulse-purple-primary ring-offset-2 scale-[0.98]' 
                              : 'opacity-70 hover:opacity-100 hover:ring-2 hover:ring-pulse-purple-primary/40 hover:ring-offset-1'
                          }`}
                        >
                          <img 
                            src={url} 
                            alt={`Preset ${idx + 1}`} 
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                            loading="lazy" 
                          />
                          
                          {/* Active Overlay Checkmark */}
                          {isActive && (
                            <div className="absolute inset-0 flex items-center justify-center bg-pulse-purple-primary/20 backdrop-blur-[1px] transition-all">
                              <div className="flex items-center justify-center w-6 h-6 text-white rounded-full shadow-md bg-pulse-purple-primary animate-in zoom-in duration-200">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* END FULL DISPLAY & GALLERY SECTION */}

            </div>
          </div>

          {/* Section 2: Privacy & Settings */}
          <div className="p-6 bg-white shadow-sm rounded-2xl md:p-8">
            <h2 className="flex items-center mb-6 text-xl font-bold text-gray-800 gap-2">
              <Settings2 className="text-pulse-purple-secondary" size={24} />
              Privacy & Settings
            </h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setPrivacy('public')}
                className={`p-5 border-2 rounded-xl text-left transition-all ${
                  privacy === 'public' 
                    ? 'border-pulse-purple-primary bg-pulse-purple-primary/5' 
                    : 'border-gray-200 hover:border-pulse-purple-primary/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Unlock size={20} className={privacy === 'public' ? 'text-pulse-purple-primary' : 'text-gray-400'} />
                  <span className={`font-semibold ${privacy === 'public' ? 'text-pulse-purple-primary' : 'text-gray-700'}`}>Public Event</span>
                </div>
                <p className="text-sm text-gray-500">Event is listed publicly. Anyone can find and participate.</p>
              </button>

              <button
                type="button"
                onClick={() => setPrivacy('private')}
                className={`p-5 border-2 rounded-xl text-left transition-all ${
                  privacy === 'private' 
                    ? 'border-pulse-purple-primary bg-pulse-purple-primary/5' 
                    : 'border-gray-200 hover:border-pulse-purple-primary/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Lock size={20} className={privacy === 'private' ? 'text-pulse-purple-primary' : 'text-gray-400'} />
                  <span className={`font-semibold ${privacy === 'private' ? 'text-pulse-purple-primary' : 'text-gray-700'}`}>Private Event</span>
                </div>
                <p className="text-sm text-gray-500">Event is hidden. Only people with a direct link can view and register.</p>
              </button>
            </div>
          </div>

          {/* Section 3: Ticketing */}
          <div className="p-6 bg-white shadow-sm rounded-2xl md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="flex items-center text-xl font-bold text-gray-800 gap-2">
                  <Ticket className="text-pulse-pink-primary" size={24} />
                  Ticketing
                </h2>
                <p className="mt-1 text-sm text-gray-500">Sell tickets or offer free registration.</p>
              </div>
              
              <button 
                type="button"
                onClick={() => setTicketingEnabled(!ticketingEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                  ticketingEnabled ? 'bg-pulse-pink-primary' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  ticketingEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {ticketingEnabled && (
              <div className="pt-4 space-y-4 border-t border-gray-100">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="relative p-5 border border-gray-200 rounded-xl bg-gray-50 group">
                    {tickets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTicket(ticket.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 gap-4 pr-8 md:grid-cols-4">
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Ticket Name</label>
                        <input 
                          type="text"
                          value={ticket.name}
                          onChange={(e) => handleTicketChange(ticket.id, 'name', e.target.value)}
                          placeholder="e.g., VIP, Early Bird"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pulse-pink-primary outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Price</label>
                        <div className="relative flex">
                          <span className="absolute text-gray-500 left-3 top-1/2 -translate-y-1/2">$</span>
                          <input 
                            type="number"
                            value={ticket.price}
                            onChange={(e) => handleTicketChange(ticket.id, 'price', e.target.value)}
                            placeholder="0.00"
                            className="w-full py-2 pl-8 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pulse-pink-primary outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Capacity</label>
                        <input 
                          type="number"
                          value={ticket.capacity}
                          onChange={(e) => handleTicketChange(ticket.id, 'capacity', e.target.value)}
                          placeholder="Unlimited"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pulse-pink-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addTicket}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors rounded-lg text-pulse-pink-primary bg-pulse-pink-primary/10 hover:bg-pulse-pink-primary/20"
                >
                  <Plus size={16} /> Add Ticket Tier
                </button>
              </div>
            )}
          </div>

          {/* Section 4: Donations */}
          <div className="p-6 bg-white shadow-sm rounded-2xl md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="flex items-center text-xl font-bold text-gray-800 gap-2">
                  <Heart className="text-pulse-pink-accent" size={24} />
                  Fundraising & Donations
                </h2>
                <p className="mt-1 text-sm text-gray-500">Open specific donation goals or general support funds.</p>
              </div>
              
              <button 
                type="button"
                onClick={() => setDonationsEnabled(!donationsEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                  donationsEnabled ? 'bg-linear-to-r from-pulse-pink-accent to-pulse-gradient-blend' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  donationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {donationsEnabled && (
              <div className="pt-4 space-y-6 border-t border-gray-100">
                {donations.map((donation) => (
                  <div key={donation.id} className="relative p-5 border-2 rounded-xl bg-gray-50 border-pulse-pink-accent/20 group">
                    {donations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDonation(donation.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    
                    <div className="pr-8 space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                          <label className="block mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Fund / Goal Title</label>
                          <input 
                            type="text"
                            value={donation.title}
                            onChange={(e) => handleDonationChange(donation.id, 'title', e.target.value)}
                            placeholder="e.g., Community Scholarship Fund"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pulse-pink-accent outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="flex items-center gap-1 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                            <Target size={14} className="text-pulse-gradient-blend" /> Target Goal
                          </label>
                          <div className="relative flex">
                            <span className="absolute text-gray-500 left-3 top-1/2 -translate-y-1/2">$</span>
                            <input 
                              type="number"
                              value={donation.goal}
                              onChange={(e) => handleDonationChange(donation.id, 'goal', e.target.value)}
                              placeholder="Optional"
                              className="w-full py-2 pl-8 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pulse-pink-accent outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Purpose of this Fund (Visible to donors)</label>
                        <textarea 
                          rows="2"
                          value={donation.description}
                          onChange={(e) => handleDonationChange(donation.id, 'description', e.target.value)}
                          placeholder="Explain what these donations will be used for..."
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pulse-pink-accent outline-none resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addDonation}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors rounded-lg text-pulse-gradient-blend bg-pulse-gradient-blend/10 hover:bg-pulse-gradient-blend/20"
                >
                  <Plus size={16} /> Add Another Donation Goal
                </button>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              className="px-6 py-3 font-semibold text-gray-600 transition-colors hover:text-gray-900"
            >
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="px-8 py-3 font-bold text-white transition-all shadow-lg rounded-xl bg-linear-to-r from-pulse-purple-primary via-pulse-purple-secondary to-pulse-gradient-blend shadow-[#5a1fb5]/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              Publish Event
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Create;