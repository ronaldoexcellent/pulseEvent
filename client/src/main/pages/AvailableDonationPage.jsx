import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AvailableDonationsPage() {
  const navigate = useNavigate();

  // Expanded Mock Data with Images and extra details
  const [donations] = useState([
    { 
      id: 'DON-829', 
      title: 'Tech Hub Africa Initiative', 
      description: 'Building a state-of-the-art innovation lab and providing laptops for young aspiring developers in Lagos.',
      goal: 50000, 
      raised: 32500, 
      org: 'Future Builders',
      daysLeft: 12,
      donors: 142,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'DON-114', 
      title: 'Medical Relief Fund', 
      description: 'Supplying emergency medical kits and essential resources to underserved rural clinics.',
      goal: 15000, 
      raised: 12500, 
      org: 'Care Point Network',
      daysLeft: 5,
      donors: 89,
      image: 'https://images.unsplash.com/photo-1584931423298-c576fda54bd2?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: 'DON-492', 
      title: 'Code for Kids Bootcamp', 
      description: 'A 6-week intensive programming fundamentals bootcamp for secondary school students.',
      goal: 8000, 
      raised: 2800, 
      org: 'Devs in Public',
      daysLeft: 21,
      donors: 34,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
    },
  ]);

  return (
    <div className="min-h-screen bg-[#f7f7fa] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-950 tracking-tighter">
              Available <span className="text-transparent bg-clip-text bg-pulse-gradient">Donations</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-2">
              Support active campaigns or launch your own funding node.
            </p>
          </div>

          <button 
            onClick={() => navigate('/create-campaign')}
            className="flex items-center gap-2 px-6 py-4 bg-black hover:bg-[#d12476] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md shadow-[#f2378f]/20 w-full md:w-auto justify-center"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Donation
          </button>
        </div>

        {/* Enhanced Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {donations.map((donation, index) => {
            const progress = (donation.raised / donation.goal) * 100;
            
            return (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all flex flex-col group"
              >
                {/* Image Section */}
                <div className="relative w-full h-56 mb-5 rounded-[24px] overflow-hidden bg-gray-100">
                  <img 
                    src={donation.image} 
                    alt={donation.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-sm">
                    {donation.daysLeft} Days Left
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="px-2 flex flex-col flex-grow">
                  <div className="mb-3">
                    <span className="text-[10px] font-black tracking-widest uppercase text-[#5a1fb5] bg-[#5a1fb5]/10 px-3 py-1.5 rounded-lg">
                      {donation.org}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-950 tracking-tight leading-snug mb-2">
                    {donation.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-2">
                    {donation.description}
                  </p>

                  {/* Metrics & Progress */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="block text-lg font-black text-gray-950">
                          ${donation.raised.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Raised of ${donation.goal.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm font-black text-gray-950">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-5 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-[#5a1fb5] to-[#f2378f] h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>

                    {/* Footer Stats & Button */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <span className="text-xs font-bold">{donation.donors} Donors</span>
                      </div>
                      
                      <button className="flex-1 py-3 bg-gray-950 text-white rounded-xl text-xs font-black hover:bg-gray-800 transition-colors uppercase tracking-wider">
                        Contribute
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}