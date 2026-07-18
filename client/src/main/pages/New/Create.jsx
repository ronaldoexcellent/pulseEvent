import React, { useState } from 'react';
import { 
  Calendar, MapPin, Globe, Lock, Unlock, 
  Ticket, Plus, Trash2, Heart, Image as ImageIcon,
  Settings2, AlignLeft, Target
} from 'lucide-react';

const EventCreationForm = () => {
  // Basic Info State
  const [privacy, setPrivacy] = useState('public');
  const [eventType, setEventType] = useState('venue');
  
  // Module Toggles
  const [ticketingEnabled, setTicketingEnabled] = useState(true);
  const [donationsEnabled, setDonationsEnabled] = useState(false);
  
  // Ticketing State
  const [tickets, setTickets] = useState([
    { id: 1, name: 'General Admission', price: '25.00', capacity: '100' }
  ]);

  // Donations State
  const [donations, setDonations] = useState([
    { id: 1, title: 'General Support Fund', goal: '5000', description: 'Help us cover the operational costs for this event.' }
  ]);

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
    <div className="min-h-screen py-10 bg-[#f7f7fa]">
      <div className="max-w-4xl px-4 mx-auto space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] to-[#c13ac7]">
            Create New Event
          </h1>
          <p className="mt-2 text-gray-600">Set up your event details, ticketing, and donation goals.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Section 1: Basic Information */}
          <div className="p-6 bg-white shadow-sm rounded-2xl md:p-8">
            <h2 className="flex items-center mb-6 text-xl font-bold text-gray-800 gap-2">
              <Calendar className="text-[#5a1fb5]" size={24} />
              Basic Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Event Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Tech Startup Mixer 2026"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Event Description */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                  <AlignLeft size={16} className="text-[#c13ac7]" />
                  Event Description
                </label>
                <textarea 
                  rows="4"
                  placeholder="Tell attendees what this event is about, what they can expect, and why they should join..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Start Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">End Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] outline-none transition-all"
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
                      eventType === 'venue' ? 'bg-white text-[#5a1fb5] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <MapPin size={16} /> Venue
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventType('online')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      eventType === 'online' ? 'bg-white text-[#5a1fb5] shadow-sm' : 'text-gray-500 hover:text-gray-700'
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5a1fb5] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Event Image</label>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                  <ImageIcon size={32} className="text-gray-400 group-hover:text-[#5a1fb5]" />
                  <p className="mt-2 text-sm text-gray-500">Drag and drop an image, or <span className="font-medium text-[#5a1fb5]">browse</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Privacy & Settings */}
          <div className="p-6 bg-white shadow-sm rounded-2xl md:p-8">
            <h2 className="flex items-center mb-6 text-xl font-bold text-gray-800 gap-2">
              <Settings2 className="text-[#7b2bc9]" size={24} />
              Privacy & Settings
            </h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setPrivacy('public')}
                className={`p-5 border-2 rounded-xl text-left transition-all ${
                  privacy === 'public' 
                    ? 'border-[#5a1fb5] bg-[#5a1fb5]/5' 
                    : 'border-gray-200 hover:border-[#5a1fb5]/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Unlock size={20} className={privacy === 'public' ? 'text-[#5a1fb5]' : 'text-gray-400'} />
                  <span className={`font-semibold ${privacy === 'public' ? 'text-[#5a1fb5]' : 'text-gray-700'}`}>Public Event</span>
                </div>
                <p className="text-sm text-gray-500">Event is listed publicly. Anyone can find and participate.</p>
              </button>

              <button
                type="button"
                onClick={() => setPrivacy('private')}
                className={`p-5 border-2 rounded-xl text-left transition-all ${
                  privacy === 'private' 
                    ? 'border-[#5a1fb5] bg-[#5a1fb5]/5' 
                    : 'border-gray-200 hover:border-[#5a1fb5]/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Lock size={20} className={privacy === 'private' ? 'text-[#5a1fb5]' : 'text-gray-400'} />
                  <span className={`font-semibold ${privacy === 'private' ? 'text-[#5a1fb5]' : 'text-gray-700'}`}>Private Event</span>
                </div>
                <p className="text-sm text-gray-500">Event is hidden. Only people with a direct link can view and register.</p>
              </button>
            </div>
          </div>

          {/* Section 3: Ticketing (Toggleable) */}
          <div className="p-6 bg-white shadow-sm rounded-2xl md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="flex items-center text-xl font-bold text-gray-800 gap-2">
                  <Ticket className="text-[#f2378f]" size={24} />
                  Ticketing
                </h2>
                <p className="mt-1 text-sm text-gray-500">Sell tickets or offer free registration.</p>
              </div>
              
              <button 
                type="button"
                onClick={() => setTicketingEnabled(!ticketingEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                  ticketingEnabled ? 'bg-[#f2378f]' : 'bg-gray-300'
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f2378f] outline-none"
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
                            className="w-full py-2 pl-8 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f2378f] outline-none"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f2378f] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addTicket}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors rounded-lg text-[#f2378f] bg-[#f2378f]/10 hover:bg-[#f2378f]/20"
                >
                  <Plus size={16} /> Add Ticket Tier
                </button>
              </div>
            )}
          </div>

          {/* Section 4: Donations (Toggleable & Expanded) */}
          <div className="p-6 bg-white shadow-sm rounded-2xl md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="flex items-center text-xl font-bold text-gray-800 gap-2">
                  <Heart className="text-[#ff4fa3]" size={24} />
                  Fundraising & Donations
                </h2>
                <p className="mt-1 text-sm text-gray-500">Open specific donation goals or general support funds.</p>
              </div>
              
              <button 
                type="button"
                onClick={() => setDonationsEnabled(!donationsEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                  donationsEnabled ? 'bg-gradient-to-r from-[#ff4fa3] to-[#c13ac7]' : 'bg-gray-300'
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
                  <div key={donation.id} className="relative p-5 border-2 rounded-xl bg-gray-50 border-[#ff4fa3]/20 group">
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
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4fa3] outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="flex items-center gap-1 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                            <Target size={14} className="text-[#c13ac7]" /> Target Goal
                          </label>
                          <div className="relative flex">
                            <span className="absolute text-gray-500 left-3 top-1/2 -translate-y-1/2">$</span>
                            <input 
                              type="number"
                              value={donation.goal}
                              onChange={(e) => handleDonationChange(donation.id, 'goal', e.target.value)}
                              placeholder="Optional"
                              className="w-full py-2 pl-8 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4fa3] outline-none"
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
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff4fa3] outline-none resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addDonation}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors rounded-lg text-[#c13ac7] bg-[#c13ac7]/10 hover:bg-[#c13ac7]/20"
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
              className="px-8 py-3 font-bold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-[#5a1fb5] via-[#7b2bc9] to-[#c13ac7] shadow-[#5a1fb5]/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              Publish Event
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EventCreationForm;