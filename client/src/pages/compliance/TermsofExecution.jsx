import React from 'react';
import { motion } from 'framer-motion';

const executionSections = [
  {
    title: "1. Creator and Organizer Obligations",
    content: "Whether you are listing a ticketed event or launching a donation campaign, you are legally bound to deliver on your stated promises. Event organizers must execute the gathering as advertised (date, venue, and amenities). Campaign creators must utilize all accumulated donations strictly for the specified cause or milestone detailed in the campaign description. PulseEvent acts solely as the transactional infrastructure and disclaims all liability for unfulfilled promises or misappropriated campaign funds."
  },
  {
    title: "2. Ticketing Mechanics and Donation Processing",
    content: "All access tokens, digital tickets, and donation receipts generated through the platform are uniquely encoded and logged. Organizers are responsible for validating entry at physical venues using our checking tools. For donation campaigns, all incoming contributions are tracked in real-time on the public campaign index. PulseEvent is not responsible for localized network dropouts or user error during physical ticket scans or live donation tracking updates."
  },
  {
    title: "3. Payouts, Fees, and Fund Disbursement",
    content: "Revenue collected from ticket sales and donation campaigns is securely processed through our integrated payment gateways. Ticket payouts are typically settled after the successful completion of the event to protect consumers. For donation campaigns, accumulated funds are subject to verification checks and may be disbursed in milestones or upon the campaign reaching specified intervals, minus standard platform operational fees and processing percentages."
  },
  {
    title: "4. Cancellations, Misrepresentation, and Stalled Campaigns",
    content: "If an event is canceled or a donation campaign is found to materially misrepresent its cause, the creator must immediately notify all participants via the PulseEvent dashboard. Canceled events mandate a full refund structure to all ticket holders. Donation campaigns flagged for misrepresentation or fraudulent descriptions will have pending disbursements permanently frozen, and remaining pools will be reversed or handled in accordance with user protection policies."
  },
  {
    title: "5. Operational Liability and Cause Veracity",
    content: "PulseEvent does not physically audit venues or verify the personal backgrounds of campaign creators. Organizers assume full liability for on-site safety, local permits, and event insurance. Campaign creators assume total legal responsibility for the veracity of their cause. By executing a project or fundraiser on PulseEvent, you agree to indemnify the platform against any third-party legal claims, losses, or disputes stemming from your event or campaign."
  },
  {
    title: "6. Anti-Fraud Monitoring and Asset Audits",
    content: "To maintain platform integrity, PulseEvent employs automated and manual security tracking. We reserve the right to suspend any ticket sales or freeze donation wallets that exhibit suspicious velocity, usage patterns, or trigger internal anti-money laundering (AML) protocols. Creators found manipulating campaign metrics or selling fraudulent tickets face immediate termination and reporting to regional regulatory authorities."
  }
];

export default function TermsOfExecution() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-24 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#5a1fb5]/5 blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#f2378f]/5 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-gray-200 pb-10"
        >
          <h1 className="text-4xl md:text-5xl font-['Space_mono',monospace] font-bold text-gray-900 mb-4 tracking-tight">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5a1fb5] to-[#c13ac7]">Execution</span>
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Operational standards, disbursement rules, and liability frameworks for PulseEvent organizers and campaign creators.
          </p>
        </motion.div>

        {/* Sections Content */}
        <div className="space-y-12">
          {executionSections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#5a1fb5] transition-colors duration-300">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Compliance Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 p-6 bg-[#f7f7fa] border border-gray-200 rounded-2xl text-sm text-gray-500 text-center"
        >
          <p>
            By launching an event or starting a donation pool on PulseEvent, you legally certify your compliance with these execution baselines. For disbursement timelines, account status audits, or escrow inquiries, please contact the PulseEvent compliance team.
          </p>
        </motion.div>

      </div>
    </div>
  );
}