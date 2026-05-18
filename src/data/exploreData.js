export const itemsMockDatabase = {
  // All user-created ticketed events fall into this array module
  events: [
    {
      id: 'lagos-tech-fest-2026',
      title: 'Lagos Tech Fest 2026',
      organizer: 'Techuncode Node',
      location: 'Lagos, Nigeria 🇳🇬',
      venue: 'Eko Convention Centre, Victoria Island',
      basePrice: 25000,
      currency: '₦',
      date: 'June 18, 2026',
      time: '09:00 AM WAT',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      badge: 'Selling Fast',
      slotsLeft: 14,
      description: 'Join thousands of developers, founders, and tech enthusiasts at the premiere tech summit of the year. Experience deep dives into the future of decentralization and multi-party escrow web platforms.'
    },
    {
      id: 'afrobeats-summer-wave',
      title: 'Afrobeats Summer Wave',
      organizer: 'Eko Hotel Grounds',
      location: 'Lagos, Nigeria 🇳🇬',
      venue: 'Eko Luxury Gardens, Victoria Island',
      basePrice: 40000,
      currency: '₦',
      date: 'July 02, 2026',
      time: '06:00 PM WAT',
      category: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      badge: 'Popular',
      slotsLeft: 42,
      description: 'Immerse yourself in the rhythm of the continent at the headline outdoor festival of the summer cycle. Experience a curated lineup of premium artists and sound engineering arrays.'
    },
    {
      id: 'nairobi-design-week',
      title: 'Nairobi Design Week',
      organizer: 'Nairobi Arts Collective',
      location: 'Nairobi, Kenya 🇰🇪',
      venue: 'The Alchemist Space, Parklands',
      basePrice: 3500,
      currency: 'KSh ',
      date: 'August 14, 2026',
      time: '10:00 AM EAT',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?w=800&auto=format&fit=crop&q=80',
      badge: 'Verified',
      slotsLeft: 9,
      description: 'Unlocking spatial, digital, and material production insights across East African creative systems. Network with spatial engineers, UI/UX researchers, and structural artisans.'
    },
    {
      id: 'accra-food-wine-festival',
      title: 'Accra Food & Wine Festival',
      organizer: 'Ghana Tourism Hub',
      location: 'Accra, Ghana 🇬🇭',
      venue: 'Polo Club Grounds, Airport Residential Area',
      basePrice: 300,
      currency: 'GH₵ ',
      date: 'September 22, 2026',
      time: '12:00 PM GMT',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
      badge: 'New',
      slotsLeft: 25,
      description: 'A celebration of culinary craftsmanship across West Africa. Bringing together award-winning master chefs, generational traditional kitchens, and artisanal product specialists.'
    }
  ],

  // All user-created crowdfunding/donation campaigns fall into this array module
  donations: [
    {
      id: 'tech-equipment-lagos-schools',
      title: 'Tech Equipment for Lagos Schools',
      organizer: 'EduTech Foundation',
      location: 'Lagos, Nigeria 🇳🇬',
      raised: 4200000,
      target: 10000000,
      currency: '₦',
      percentage: 42,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
      badge: 'Critical Trust',
      description: 'Funding computer laboratories and internet infrastructure nodes for public secondary schools to cultivate full-stack capabilities in early ecosystems.'
    },
    {
      id: 'clean-water-nairobi',
      title: 'Clean Water Project',
      organizer: 'Nairobi EcoWatch',
      location: 'Nairobi, Kenya 🇰🇪',
      raised: 850000,
      target: 1200000,
      currency: 'KSh ',
      percentage: 70,
      image: 'https://images.unsplash.com/photo-1541815651353-0aeb018513ef?w=800&auto=format&fit=crop&q=80',
      badge: 'Verified Cause',
      description: 'Deploying direct physical filtering networks and solar pump units across rural community hubs experiencing water supply disruptions.'
    },
    {
      id: 'artisan-hub-relief-fund',
      title: 'Artisan Hub Relief Fund',
      organizer: 'Stelynk Network',
      location: 'Accra, Ghana 🇬🇭',
      raised: 45000,
      target: 50000,
      currency: 'GH₵ ',
      percentage: 90,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
      badge: 'Near Target',
      description: 'Providing structural emergency financial cushions and localized tools workspace micro-grants for registered verified artisans.'
    }
  ]
};
export const operationalRegions = ['All', 'Nigeria', 'Kenya', 'Ghana'];