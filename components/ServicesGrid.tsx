import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  badge?: string;
}

interface ServicesGridProps {
  onGetQuote: (service: string) => void;
}

const CORE_SERVICES: ServiceCardData[] = [
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Laser-focused, high-conversion funnels engineered to turn traffic into revenue at record speed.',
    badge: 'Most Popular',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
      </svg>
    ),
    features: [
      'Conversion-First Architecture',
      'Psychological Copywriting',
      'A/B Variant Testing',
      'Sub-800ms Load Time',
      'Mobile-Optimized Layout',
      'CRM / Lead Integration',
      'WhatsApp & Chatbot Connect',
      'Heat-Map Analytics Setup',
      'Google Tag Manager Integration',
      'Post-Launch CRO Audit',
    ],
  },
  {
    id: 'advertisements',
    title: 'Advertisement',
    description: 'ROI-focused ad campaigns across all major platforms. We don\'t just run ads — we engineer growth.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 11 18-5v12L3 13v-2z"/>
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
      </svg>
    ),
    features: [
      'Google Ads (Search, Display, YouTube)',
      'Meta Ads (Facebook & Instagram)',
      'LinkedIn Ads',
      'Retargeting & Funnel Setup',
      'Meta CAPI Server-Side Tracking',
      'Pixel & GA4 Tracking Setup',
      'Creative Scaling & Testing',
      'Budget Optimization Strategy',
      'Conversion Rate Optimization',
      'Weekly Performance Reports',
    ],
  },
  {
    id: 'chatbots',
    title: 'Chatbot Dev',
    description: 'AI-powered chatbots that qualify leads 24/7, automate support, and close deals while you sleep.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
    features: [
      'WhatsApp AI Chatbot',
      'Website Live Chat Bot',
      'Instagram DM Automation',
      'Lead Qualification Flows',
      'Appointment Booking Bot',
      'FAQ Auto-Response System',
      'CRM Integration (HubSpot / Zoho)',
      'Multi-Language Support',
      'Escalation to Human Agent',
      'Analytics & Conversation Reports',
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    description: 'Strategic social presence engineered to grow followers, build authority, and drive real business results.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    features: [
      'Social Media Strategy Planning',
      'Monthly Content Calendar',
      'Post & Reel Designing',
      'Short-Form Video Editing',
      'Caption & Hashtag Optimization',
      'Influencer Collaborations',
      'Community Management',
      'Profile & Bio Optimization',
      'Engagement Growth Campaigns',
      'Monthly Analytics Reports',
    ],
  },
  {
    id: 'website-dev',
    title: 'Website Development',
    description: 'High-performance websites built as digital flagships — fast, beautiful, and engineered to convert.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    features: [
      'Business Website Development',
      'Custom React / Next.js Build',
      'E-commerce & Shopify Setup',
      'WordPress / Headless CMS',
      'UI/UX Design from Scratch',
      'Website Speed Optimization',
      'SEO-First Architecture',
      'Payment Gateway Integration',
      'Hosting & Domain Setup',
      'Ongoing Maintenance & Support',
    ],
  },
];

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className={`transition-transform duration-400 ${open ? 'rotate-180' : 'rotate-0'}`}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const ServiceCard: React.FC<{ service: ServiceCardData; onGetQuote: (s: string) => void }> = ({ service, onGetQuote }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-400 overflow-hidden group ${
        open
          ? 'border-amber-500/40 bg-[#0c0c14] shadow-[0_0_40px_rgba(245,158,11,0.08)]'
          : 'border-white/[0.08] bg-[#09090f] hover:border-white/20 hover:bg-[#0c0c14]'
      }`}
    >
      {/* Top accent line — shows on open */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 transition-opacity duration-400 ${open ? 'opacity-100' : 'opacity-0'}`} />

      {/* Badge */}
      {service.badge && (
        <div className="absolute top-4 right-4 px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-amber-400 text-[9px] font-black uppercase tracking-widest">
          {service.badge}
        </div>
      )}

      {/* Card Header (always visible) */}
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          {/* Icon box */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            open
              ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400'
              : 'bg-white/5 border border-white/10 text-gray-300 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 group-hover:text-amber-400'
          }`}>
            {service.icon}
          </div>

          {/* Title + description */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-base md:text-lg font-black uppercase tracking-tight leading-snug mb-1 transition-colors duration-200 ${
              open ? 'text-white' : 'text-gray-100 group-hover:text-white'
            }`}>
              {service.title}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <div className={`flex-shrink-0 mt-1 transition-colors duration-200 ${open ? 'text-amber-400' : 'text-gray-600 group-hover:text-amber-500/60'}`}>
          <ChevronIcon open={open} />
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-0">
          {/* Divider */}
          <div className="h-px bg-white/5 mb-5 ml-16" />

          {/* Features checklist */}
          <div className="ml-16 space-y-2.5 mb-6">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-400 font-medium">
                <span className="text-amber-500 mt-0.5">
                  <CheckIcon />
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="ml-16 flex flex-wrap gap-3">
            <button
              onClick={() => onGetQuote(service.title)}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] uppercase tracking-[0.25em] rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              Get Free Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <Link
              to={`/services/${service.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-amber-500/30 bg-white/[0.03] hover:bg-white/[0.07] text-gray-400 hover:text-amber-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all duration-200"
            >
              View Details
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ onGetQuote }) => {
  return (
    <section id="services-grid" className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-400 text-[9px] font-black tracking-[0.35em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Core Services
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4 leading-tight">
            What We <span className="text-gold">Build</span> For You
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            End-to-end digital solutions designed to scale your brand profitably. Click any service to explore what's included.
          </p>
        </div>

        {/* Cards grid — 2 columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {CORE_SERVICES.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} onGetQuote={onGetQuote} />
          ))}
          {/* Last card full-width */}
          <div className="md:col-span-2">
            <ServiceCard service={CORE_SERVICES[4]} onGetQuote={onGetQuote} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-xs font-medium mb-4 uppercase tracking-widest">Not sure which service fits your goal?</p>
          <button
            onClick={() => onGetQuote('')}
            className="inline-flex items-center gap-3 px-8 py-4 border border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 font-black text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all duration-200"
          >
            <i className="fa-solid fa-paper-plane" />
            Talk to a Strategist
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
