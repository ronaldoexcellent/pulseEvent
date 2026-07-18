import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConversionZone() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      id: "faq-1",
      question: "How do payouts settle into local bank accounts?",
      answer: "Ticket sales margins and verified campaign reserves route directly through local clearing houses via regional partner networks. Payout clearings trigger instantly upon validation checkpoints without mandatory clearing hold delays."
    },
    {
      id: "faq-2",
      question: "What security measures prevent secondary market ticket scalping?",
      answer: "Every issued ticket generates a cryptographic signature QR passport bound strictly to user identity records. Our atomic scanning system dynamically invalidates used tokens in real time, stopping duplicate entry attempts instantly."
    },
    {
      id: "faq-3",
      question: "Are there any hidden platform connection charges?",
      answer: "No. Our pricing rules use flat, explicit structures. Ticket allocations clear at a predictable 4% gateway maintenance charge, while social crowdfund structures balance on a standard 4.5% operations fee."
    }
  ];

  const scrollViewportSettings = { once: true, margin: "-100px" };

  return (
    <section className="py-24 bg-pulse-bg-light text-pulse-text-dark relative overflow-hidden border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- Left Column: Frequently Answered Questions Accordion --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewportSettings}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs font-black tracking-widest text-pulse-purple-primary uppercase bg-pulse-purple-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
                Knowledge Base Ledger
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-pulse-text-dark mb-2">
                Frequently Answered Queries
              </h2>
              <p className="text-sm font-medium text-pulse-text-dark/60">
                Clear technical performance metrics and platform capabilities details.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {faqItems.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs transition-colors duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-pulse-text-dark hover:text-pulse-purple-primary transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <motion.span 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="text-pulse-purple-primary text-xs shrink-0 pl-4"
                      >
                        ▼
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-5 pt-1 text-xs sm:text-sm font-medium text-pulse-text-dark/60 leading-relaxed border-t border-gray-100">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* --- Right Column: Ultimate Conversion Action Anchor Panel --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewportSettings}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 w-full"
          >
            <div className="bg-pulse-text-dark text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-gray-800">
              {/* Dynamic decorative backdrop radial matrix glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pulse-purple-secondary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-pulse-pink-primary/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-black tracking-tight leading-tight">
                  Ready to Activate <br />Your Live Engine?
                </h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">
                  Join verified organizers setting up clean, automated transactional frameworks across Africa. Create accounts instantly with zero upstream configuration fees.
                </p>

                <div className="space-y-3 pt-2">
                  <motion.a
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    href="/create-event-ticket"
                    className="block w-full text-center py-4 bg-pulse-gradient hover:bg-pulse-gradient-hover text-white font-black text-sm rounded-xl shadow-lg shadow-pulse-purple-primary/20 transition-all"
                  >
                    Launch Event Ticket Tiers 🎫
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    href="/create-campaign"
                    className="block w-full text-center py-4 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-sm rounded-xl transition-all"
                  >
                    Deploy Donation Vault 💝
                  </motion.a>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-white/50 uppercase tracking-widest">
                  <span>🔒 Escrow Protected</span>
                  <span>⚡ Setup In Under 3 Mins</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}