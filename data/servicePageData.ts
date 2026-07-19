// ── Service Detail Page Data ────────────────────────────────────────────────
// Rich, conversion-focused content for each service page

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  description: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  delivery: string;
  popular?: boolean;
  cta: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceMetric {
  value: string;
  label: string;
  sublabel?: string;
}

export interface ServicePageData {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  badge: string;
  badgeIcon: string;
  badgeColor: string;
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  description: string;
  metrics: ServiceMetric[];
  features: ServiceFeature[];
  steps: ServiceStep[];
  packages: ServicePackage[];
  faqs: ServiceFAQ[];
  resultHeadline: string;
  resultProof: string;
}

export const SERVICE_PAGE_DATA: Record<string, ServicePageData> = {

  'landing-page': {
    slug: 'landing-page',
    seoTitle: 'Landing Page Design Agency India | High-Converting Landing Pages — MADSAG',
    seoDescription: 'MADSAG builds high-converting landing pages engineered with direct-response psychology. Sub-800ms load times, A/B tested, and CRO-optimised. Get a free quote today.',
    badge: 'Most Popular Service',
    badgeIcon: 'fa-solid fa-rocket',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
    headline: 'LANDING PAGES THAT',
    headlineHighlight: 'ACTUALLY CONVERT',
    subheadline: 'We don\'t build pretty pages. We build revenue machines.',
    description: 'Every element on your landing page is a conversion lever. Our direct-response engineers design, write, and deploy pages built on one obsession: turning your ad spend into booked calls, leads, and sales — at the lowest cost per acquisition possible.',
    metrics: [
      { value: '+35%', label: 'Avg Conv Rate Lift',  sublabel: 'vs. client\'s previous page' },
      { value: '<0.8s', label: 'Page Load Target',   sublabel: 'Largest Contentful Paint'   },
      { value: '72%',   label: 'Interaction Rate',   sublabel: 'above industry avg of 40%'  },
      { value: '10/10', label: 'Copy Clarity Score', sublabel: 'Verified via user testing'  },
    ],
    features: [
      {
        icon: 'fa-solid fa-brain',
        title: 'Psychological Copywriting',
        description: 'Our direct-response copywriters craft every headline, bullet, and CTA using proven persuasion frameworks — AIDA, PAS, and fear-of-loss — to eliminate hesitation and drive action.',
      },
      {
        icon: 'fa-solid fa-bolt',
        title: 'Sub-800ms Load Speed',
        description: 'Every millisecond counts. We target <800ms LCP on all our pages via aggressive asset compression, edge delivery, and zero bloated JS — giving your ads the highest possible Quality Score.',
      },
      {
        icon: 'fa-solid fa-flask',
        title: 'A/B Variant Testing',
        description: 'We ship your page with 2–3 headline and CTA variants from day one. Our testing protocol isolates the highest-performing combination within 500 sessions.',
      },
      {
        icon: 'fa-solid fa-mobile-screen',
        title: 'Mobile-First Architecture',
        description: 'Over 78% of ad clicks land on mobile. Our pages are designed mobile-first, tested on 15+ device sizes, and optimised for thumb-friendly interaction.',
      },
      {
        icon: 'fa-solid fa-fire-flame-curved',
        title: 'Heat-Map & Click Analytics',
        description: 'We integrate Hotjar or Microsoft Clarity on every build so you can see exactly where users engage, where they drop off, and what needs optimising post-launch.',
      },
      {
        icon: 'fa-solid fa-plug',
        title: 'Full CRM & Ad Integration',
        description: 'Native connection to your CRM (HubSpot, Zoho, GoHighLevel), WhatsApp API, Google Tag Manager, Meta Pixel, and GA4 — so every lead is tracked, captured, and followed up automatically.',
      },
    ],
    steps: [
      { number: '01', title: 'Brief & Audience Mapping',  description: 'We map your customer avatar — pain points, desires, objections — and align the page strategy to the specific ad or traffic source driving clicks.' },
      { number: '02', title: 'Copy & Wireframe',          description: 'Our copywriter delivers the full page copy first. The wireframe is then built around the words, not the other way around.' },
      { number: '03', title: 'Design & Dev',              description: 'Pixel-perfect visual design + hand-coded React or Next.js build. No page builders. No Elementor. No Webflow bloat.' },
      { number: '04', title: 'Tracking & QA',             description: 'Complete tracking stack: GA4, GTM, Meta Pixel, CAPI, and A/B test variants. Tested across 20+ device/browser combos.' },
      { number: '05', title: 'Launch & Optimise',         description: 'Page goes live. We monitor performance for 14 days post-launch and make data-driven CRO adjustments at no extra cost.' },
    ],
    packages: [
      {
        name: 'Sprint Page',
        price: '₹12,999',
        priceNote: '≈ $155 USD',
        description: 'Single, sharp landing page for one product or lead generation campaign.',
        features: ['1 Landing Page', 'Direct-Response Copy', 'Mobile Optimised', 'Basic Tracking Setup', 'Contact / WhatsApp Form', '7-Day Support'],
        delivery: '5 Business Days',
        cta: 'Start Sprint',
      },
      {
        name: 'Conversion Engine',
        price: '₹28,999',
        priceNote: '≈ $349 USD',
        description: 'Full-funnel landing page with A/B testing, heat-map setup, and tracking stack.',
        features: ['1 Landing Page + 2 A/B Variants', 'Professional Copywriting', 'A/B Test Setup', 'GTM + GA4 + Meta Pixel', 'Heat-Map Integration (Hotjar)', 'WhatsApp + CRM Integration', 'CRO Audit at Day 14', '30-Day Support'],
        delivery: '10 Business Days',
        popular: true,
        cta: 'Get Conversion Engine',
      },
      {
        name: 'Funnel System',
        price: 'Custom',
        priceNote: 'Full funnel scoping',
        description: 'Multi-step funnel with thank-you page, upsell page, email sequences, and full automation.',
        features: ['Multi-Page Funnel (3–5 Pages)', 'Upsell & Thank-You Pages', 'Email Automation Setup', 'CRM Full Integration', 'CAPI Server-Side Tracking', 'Monthly CRO Reporting', 'Dedicated Strategist'],
        delivery: '18–25 Business Days',
        cta: 'Scope My Funnel',
      },
    ],
    faqs: [
      { q: 'Do you write the copy or do I provide it?', a: 'We write everything. Our direct-response copywriters research your market, competitors, and customer avatars before writing a single word. You approve before we build.' },
      { q: 'Can you build the page if I already have a design?', a: 'Yes. If you have a Figma design or reference, we develop it to spec. Our dev fee starts at ₹8,999 for pure development work.' },
      { q: 'How fast will my page load?', a: 'Our target is <800ms LCP. We achieve this via hand-coded React, compressed WebP images, deferred non-critical scripts, and CDN delivery. We share a PageSpeed screenshot before handover.' },
      { q: 'Do you connect the page to my Facebook Ads?', a: 'Yes. We set up Meta Pixel, server-side CAPI, GA4, and Google Ads conversion tracking. All events are verified in Events Manager before launch.' },
      { q: 'What happens if my conversion rate is still low after launch?', a: 'Our Conversion Engine package includes a 14-day CRO audit at no extra cost. We analyse heatmaps, session recordings, and form drop-off data, then deliver specific fix recommendations.' },
    ],
    resultHeadline: '+35% Average Conversion Rate Lift',
    resultProof: 'Across 30+ landing page projects in 2023–24, our clients saw an average 35% improvement in conversion rate compared to their previous pages — with some e-commerce clients hitting 2.1× their previous rate within 30 days of launch.',
  },

  'advertisements': {
    slug: 'advertisements',
    seoTitle: 'Google Ads & Meta Ads Management Agency India | Performance Marketing — MADSAG',
    seoDescription: 'MADSAG runs ROI-first Google Ads, Meta Ads, and LinkedIn campaigns. Average 4.8× ROAS. Server-side CAPI tracking. Data-driven creative testing. Book a free audit.',
    badge: 'Data-Driven Ads',
    badgeIcon: 'fa-brands fa-google',
    badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    headline: 'ADS THAT PAY FOR',
    headlineHighlight: 'THEMSELVES',
    subheadline: 'Profitable campaigns, not just impressions.',
    description: 'Most agencies optimise for clicks. We optimise for revenue. Our performance marketing unit runs high-frequency creative testing, server-side tracking, and algorithmic scaling protocols to maximise your return on every rupee spent.',
    metrics: [
      { value: '4.8×',  label: 'Average ROAS',      sublabel: 'Across all active clients'   },
      { value: '99%',   label: 'CAPI Accuracy',     sublabel: 'Server-side event match'     },
      { value: '<4 Days', label: 'Creative Refresh', sublabel: 'Avg ad fatigue cycle'        },
      { value: '₹2,500', label: 'Min Ad Budget',    sublabel: 'to exit learning phase fast' },
    ],
    features: [
      {
        icon: 'fa-brands fa-google',
        title: 'Google Ads (Search, Display, YouTube)',
        description: 'Keyword research, ad copy testing, bid strategy optimisation, and negative keyword management — all calibrated to your CPA target and not just a generic "budget spend" KPI.',
      },
      {
        icon: 'fa-brands fa-meta',
        title: 'Meta Ads (Facebook & Instagram)',
        description: 'Audience architecture, creative testing at high frequency, lookalike modelling, and retargeting funnels — engineered to beat post-iOS attribution challenges.',
      },
      {
        icon: 'fa-solid fa-server',
        title: 'Server-Side CAPI Tracking',
        description: 'We deploy the Meta Conversions API server-side for every client. By sending first-party data directly from your server, we restore 99%+ attribution accuracy lost to iOS 14.5+ restrictions.',
      },
      {
        icon: 'fa-solid fa-image',
        title: 'High-Frequency Creative Testing',
        description: 'We refresh ad creatives every 3–5 days to beat fatigue. Static images, short-form videos, carousels — all tracked and ranked by CPC, CTR, and conversion rate.',
      },
      {
        icon: 'fa-solid fa-magnifying-glass-chart',
        title: 'Deep Data Attribution',
        description: 'Multi-touch attribution modelling, blended ROAS reporting, and LTV-based bidding — so you know exactly which campaign drives the most profitable customers.',
      },
      {
        icon: 'fa-solid fa-chart-line',
        title: 'Algorithmic Scaling Protocols',
        description: 'Once a creative set hits our threshold metrics (CPR, ROAS, frequency), we implement structured scaling: horizontal (new audiences) + vertical (budget scaling) — without breaking the algorithm.',
      },
    ],
    steps: [
      { number: '01', title: 'Account Audit',          description: 'Full audit of your existing ad accounts, pixel setup, audience structure, and creative history. We identify what\'s burning money and fix it first.' },
      { number: '02', title: 'Strategy & Architecture', description: 'We map your funnel — TOF (awareness), MOF (consideration), BOF (conversion) — and assign the right platform, objective, and creative format to each stage.' },
      { number: '03', title: 'Creative Production',    description: 'Ad copy, static creatives, and short-form video scripts. We create a minimum of 6–9 creative variants per campaign launch to ensure statistically valid testing.' },
      { number: '04', title: 'Launch & Track',         description: 'Pixel, CAPI, GA4, and GTM all verified before launch. We confirm event match quality ≥ 7.0 in Meta Events Manager before spending a rupee.' },
      { number: '05', title: 'Optimise & Scale',       description: 'Weekly reporting with clear ROAS, CPA, CTR, and frequency data. We kill losers fast, scale winners harder, and keep your cost per acquisition on a downward trajectory.' },
    ],
    packages: [
      {
        name: 'Growth Catalyst',
        price: '₹14,999/mo',
        priceNote: '+ ad spend (min ₹15,000/mo)',
        description: 'Single-channel domination — ideal for brands starting their paid ads journey.',
        features: ['1 Platform (Google OR Meta)', 'Account Setup & Tracking', 'Up to 3 Campaigns', 'Monthly Creative Refresh', 'Weekly Report', 'CAPI Basic Setup'],
        delivery: 'Launch in 7 Days',
        cta: 'Start Growth',
      },
      {
        name: 'Alpha Scale',
        price: '₹29,999/mo',
        priceNote: '+ ad spend (min ₹30,000/mo)',
        description: 'Aggressive multi-platform strategy for brands ready to capture market share.',
        features: ['Google + Meta Ads', 'Server-Side CAPI Full Setup', 'High-Frequency Creative Testing', 'Audience Architecture & Retargeting', 'Deep Attribution Reporting', 'Weekly Strategist Call', 'CRO Recommendations'],
        delivery: 'Launch in 10 Days',
        popular: true,
        cta: 'Get Alpha Scale',
      },
      {
        name: 'Omega Dominance',
        price: 'Custom',
        priceNote: 'All platforms + AI modelling',
        description: 'Full omnichannel mastery — Google, Meta, LinkedIn, YouTube — with predictive LTV modelling.',
        features: ['All Active Platforms', 'Custom Creative Studio Access', 'Predictive LTV Bidding', 'LinkedIn B2B Ads', 'YouTube Pre-Roll Campaigns', 'Market Intelligence Reports', 'Dedicated Account Director', 'Daily Monitoring'],
        delivery: 'Ongoing Partnership',
        cta: 'Build My Dominance',
      },
    ],
    faqs: [
      { q: 'What is the minimum monthly ad budget you recommend?', a: 'We recommend a minimum ad spend of ₹15,000/month for single-channel campaigns. This allows the platform algorithm to exit the "learning phase" quickly and start delivering optimised results.' },
      { q: 'How do you handle iOS 14.5 tracking issues?', a: 'We deploy the Meta Conversions API (CAPI) server-side for every client. This sends first-party conversion data directly from your server to Meta, bypassing browser limitations and restoring attribution accuracy to 99%+.' },
      { q: 'How long before I see results?', a: 'Most clients see initial data within the first 7–14 days. Meaningful ROAS improvement typically shows within 30–45 days as we exit the learning phase and start scaling winning creatives.' },
      { q: 'Do you also design the ad creatives?', a: 'Yes. Our Alpha Scale and Omega packages include creative production — static images, short-form video scripts, and carousel copy. We follow a high-frequency refresh schedule (every 3–5 days) to prevent ad fatigue.' },
      { q: 'Can you take over my existing ad accounts?', a: 'Yes, and we prefer it. Having access to historical data helps us audit faster and identify what\'s wasting budget. We do a full account audit before making any changes.' },
    ],
    resultHeadline: '4.8× Average ROAS Across All Active Clients',
    resultProof: 'Our top-performing e-commerce client hit 8.4× ROAS during Q4 peak season. Across all active ad management clients in 2023–24, we maintained an average blended ROAS of 4.8× — with zero accounts running at a loss for more than 2 consecutive weeks.',
  },

  'chatbots': {
    slug: 'chatbots',
    seoTitle: 'AI Chatbot Development Agency India | WhatsApp & Website Chatbots — MADSAG',
    seoDescription: 'MADSAG builds AI-powered chatbots for WhatsApp, website, and Instagram DMs. Qualify leads 24/7, automate bookings, and close deals while you sleep. Get a free demo.',
    badge: 'AI-Powered',
    badgeIcon: 'fa-solid fa-robot',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/5',
    headline: 'YOUR BEST SALESPERSON',
    headlineHighlight: 'NEVER SLEEPS',
    subheadline: 'AI chatbots that qualify, nurture, and convert 24/7.',
    description: 'While your competitors are replying to leads manually at 9am, your AI bot has already qualified them, answered their objections, booked the meeting, and sent the follow-up — all before you\'ve had your morning chai.',
    metrics: [
      { value: '24/7',  label: 'Lead Qualification', sublabel: 'No human hours wasted' },
      { value: '<3s',   label: 'First Response Time', sublabel: 'vs. avg 7hr manual reply' },
      { value: '60%',   label: 'Lead Qualification Rate', sublabel: 'Avg from WhatsApp bots' },
      { value: '3×',    label: 'Booking Rate Lift', sublabel: 'vs. manual follow-up' },
    ],
    features: [
      {
        icon: 'fa-brands fa-whatsapp',
        title: 'WhatsApp AI Chatbot',
        description: 'Connected via the official WhatsApp Business API. Qualifies leads with smart conversation flows, sends catalogues, books appointments, and escalates hot leads to your sales team in real time.',
      },
      {
        icon: 'fa-solid fa-comment-dots',
        title: 'Website Live Chat Bot',
        description: 'Instant engagement the moment a visitor lands. Captures name, number, and requirement within 60 seconds — before they bounce. Integrates with your CRM automatically.',
      },
      {
        icon: 'fa-brands fa-instagram',
        title: 'Instagram DM Automation',
        description: 'Auto-reply to story mentions, DM keyword triggers, and comment responses. Turn your Instagram engagement into a lead generation machine without touching your phone.',
      },
      {
        icon: 'fa-solid fa-calendar-check',
        title: 'Appointment Booking Automation',
        description: 'Full calendar integration (Google Calendar, Calendly) so leads can self-book consultations, demos, and appointments 24/7 — without your team lifting a finger.',
      },
      {
        icon: 'fa-solid fa-filter',
        title: 'Intelligent Lead Qualification',
        description: 'Custom qualification flows based on budget, timeline, and project type. Only hot, qualified leads get escalated to your team — cold leads get nurtured automatically.',
      },
      {
        icon: 'fa-solid fa-database',
        title: 'CRM Integration (HubSpot, Zoho, GHL)',
        description: 'Every conversation, lead detail, and qualification score is pushed to your CRM in real time. No manual data entry. No leads falling through the cracks.',
      },
    ],
    steps: [
      { number: '01', title: 'Conversation Mapping',   description: 'We map every customer journey — inquiry → qualification → booking — and design conversation flows that mirror your best human salesperson.' },
      { number: '02', title: 'Platform Setup',          description: 'WhatsApp Business API approval, Meta app setup, or website chat widget deployment. We handle all the technical configuration and compliance.' },
      { number: '03', title: 'Flow Development',        description: 'Custom conversation flows built with conditional logic, keyword triggers, and AI-powered NLP responses for questions outside the flow.' },
      { number: '04', title: 'CRM & Calendar Connect',  description: 'Integration with your CRM, calendar, and notification system. Your team gets an instant alert when a hot lead is qualified and ready to talk.' },
      { number: '05', title: 'Test & Launch',           description: 'Full QA testing across 30+ conversation scenarios. We stress-test edge cases, misunderstood messages, and escalation triggers before going live.' },
    ],
    packages: [
      {
        name: 'Starter Bot',
        price: '₹18,999',
        priceNote: 'One-time setup',
        description: 'A single-channel chatbot to start qualifying leads automatically.',
        features: ['1 Channel (WhatsApp OR Website)', 'Up to 10 Conversation Flows', 'Basic Lead Capture', 'Email Notification on Lead', 'FAQ Auto-Response', '14-Day Support'],
        delivery: '7 Business Days',
        cta: 'Build My Bot',
      },
      {
        name: 'Lead Machine',
        price: '₹38,999',
        priceNote: 'One-time setup',
        description: 'Multi-channel bot with CRM integration, booking system, and qualification scoring.',
        features: ['WhatsApp + Website Chat', 'Unlimited Conversation Flows', 'Appointment Booking System', 'CRM Integration (HubSpot / Zoho)', 'Lead Qualification Scoring', 'Hot Lead Instant Alerts', 'Instagram DM Automation', '30-Day Support'],
        delivery: '14 Business Days',
        popular: true,
        cta: 'Get Lead Machine',
      },
      {
        name: 'AI Ecosystem',
        price: 'Custom',
        priceNote: 'Full AI stack',
        description: 'Full AI sales ecosystem — chatbot, voice bot, email automation, and predictive follow-up.',
        features: ['All Channels (WhatsApp, Web, Instagram, SMS)', 'AI NLP for Free-Text Responses', 'Voice Bot Integration', 'Multi-Language Support', 'Custom CRM Build', 'Predictive Follow-Up Sequences', 'Analytics Dashboard', 'Ongoing Optimisation'],
        delivery: '25+ Business Days',
        cta: 'Build My AI Stack',
      },
    ],
    faqs: [
      { q: 'Do I need the official WhatsApp Business API?', a: 'Yes, for a production WhatsApp chatbot, the official API is required. We handle the full application and approval process. Setup typically takes 3–5 business days for approval.' },
      { q: 'Can the bot handle questions it wasn\'t programmed for?', a: 'Yes. Our advanced bots include an AI NLP fallback layer that handles unexpected questions gracefully and escalates to a human agent when the bot reaches its confidence threshold.' },
      { q: 'Does it work for my industry?', a: 'We\'ve deployed bots across real estate, education, e-commerce, healthcare, coaching, and B2B SaaS. The flow logic is 100% customised to your industry\'s specific lead qualification criteria.' },
      { q: 'What CRMs do you integrate with?', a: 'We natively integrate with HubSpot, Zoho CRM, GoHighLevel, Salesforce, Pipedrive, and Notion. For custom CRMs, we build a webhook-based integration.' },
      { q: 'How do I monitor the bot\'s performance?', a: 'Every deployment includes a conversation analytics dashboard showing total conversations, qualification rate, drop-off points, and conversion events. You get a monthly performance report.' },
    ],
    resultHeadline: '3× Booking Rate. Zero Extra Headcount.',
    resultProof: 'A coaching business client went from 12 manual enquiries per day (average 4hr response time) to 47 bot-qualified leads per day with <3 second first response — without adding a single sales team member. Booking rate increased 3.1× in the first 60 days.',
  },

  'social-media': {
    slug: 'social-media',
    seoTitle: 'Social Media Marketing Agency India | Instagram & LinkedIn Growth — MADSAG',
    seoDescription: 'MADSAG manages social media for brands that want real growth — strategic content, Reels, community management, and influencer partnerships. Book a free strategy call.',
    badge: 'Organic Growth',
    badgeIcon: 'fa-brands fa-instagram',
    badgeColor: 'text-pink-400 border-pink-500/30 bg-pink-500/5',
    headline: 'BUILD AN AUDIENCE THAT',
    headlineHighlight: 'BUYS FROM YOU',
    subheadline: 'Social media that drives revenue, not just vanity metrics.',
    description: 'Followers don\'t pay your bills — customers do. Our social media system combines strategic content planning, high-retention Reels, and community engagement to build a brand that your audience trusts, talks about, and buys from.',
    metrics: [
      { value: '3.2×',  label: 'Avg Reach Growth',    sublabel: 'Month 1 to Month 3'       },
      { value: '8.4%',  label: 'Avg Engagement Rate', sublabel: 'vs. industry avg of 1.2%' },
      { value: '30',    label: 'Posts Per Month',      sublabel: 'Reels, carousels, stories' },
      { value: '100%',  label: 'On-Brand Guarantee',  sublabel: 'Full approval before post' },
    ],
    features: [
      {
        icon: 'fa-solid fa-calendar-days',
        title: 'Strategic Content Calendar',
        description: 'A 30-day content calendar built on your brand\'s positioning, seasonal hooks, and platform algorithm data. No last-minute scramble. Every post has a purpose.',
      },
      {
        icon: 'fa-solid fa-film',
        title: 'Reel & Short-Form Video Production',
        description: 'Hook-driven scripts, professional editing, text overlays, and trending audio selection — all calibrated to the Reels algorithm for maximum organic reach.',
      },
      {
        icon: 'fa-solid fa-palette',
        title: 'On-Brand Visual Design',
        description: 'Every post, carousel, and story is designed inside a strict brand system — your fonts, colours, and visual language — so your feed looks cohesive and premium.',
      },
      {
        icon: 'fa-solid fa-hashtag',
        title: 'Hashtag & Caption Strategy',
        description: 'Research-backed hashtag clusters, keyword-rich captions, and first-comment engagement hooks that push your content to the Explore page and your ideal followers.',
      },
      {
        icon: 'fa-solid fa-people-arrows',
        title: 'Community Management',
        description: 'We respond to comments, DMs, and story replies within business hours — keeping your audience engaged and converting conversations into leads.',
      },
      {
        icon: 'fa-solid fa-handshake',
        title: 'Influencer Collaboration Management',
        description: 'We identify, negotiate, and brief micro and mid-tier influencers in your niche for organic brand awareness campaigns — with full performance tracking.',
      },
    ],
    steps: [
      { number: '01', title: 'Brand Audit & Strategy',  description: 'We audit your current profiles, competitors, and target audience. We identify content gaps, tone-of-voice misalignment, and quick wins within the first week.' },
      { number: '02', title: 'Content System Setup',    description: 'Brand kit finalisation, content pillar definition (education / entertainment / conversion), and platform-specific formatting guidelines.' },
      { number: '03', title: 'Calendar & Production',   description: 'Monthly content calendar delivered by the 25th of each month. Includes scripts, captions, designs, and scheduled posting times for each platform.' },
      { number: '04', title: 'Publish & Engage',        description: 'We publish at optimal times using platform analytics data and actively manage your community — comments, DMs, and story interactions.' },
      { number: '05', title: 'Monthly Reporting',       description: 'Full analytics report: reach, impressions, follower growth, engagement rate, top-performing posts, and strategy adjustments for the following month.' },
    ],
    packages: [
      {
        name: 'Presence',
        price: '₹9,999/mo',
        priceNote: 'Per platform',
        description: 'Consistent, on-brand social presence for one platform.',
        features: ['1 Platform (Instagram OR LinkedIn)', '12 Posts Per Month', 'Caption & Hashtag Optimisation', 'Basic Canva-Based Design', 'Monthly Report'],
        delivery: 'Onboard in 5 Days',
        cta: 'Build Presence',
      },
      {
        name: 'Authority',
        price: '₹22,999/mo',
        priceNote: '2–3 platforms',
        description: 'Multi-platform authority building with Reels, community management, and growth strategy.',
        features: ['Instagram + LinkedIn + Facebook', '30 Posts / Month (Mix of Reels, Carousels, Stories)', 'Professional Video Editing', 'Community Management (Mon–Sat)', 'Hashtag Research & Strategy', 'Monthly Performance Report', 'Influencer Shortlist (1/month)'],
        delivery: 'Onboard in 7 Days',
        popular: true,
        cta: 'Build Authority',
      },
      {
        name: 'Dominance',
        price: 'Custom',
        priceNote: 'Full social ecosystem',
        description: 'Complete social ecosystem management with influencer campaigns and paid amplification.',
        features: ['All Platforms', '60+ Content Pieces/Month', 'Dedicated Content Creator', 'Influencer Campaign Management', 'Paid Social Boosting', 'YouTube Shorts', 'Weekly Strategy Calls', 'Real-Time Analytics Dashboard'],
        delivery: 'Custom Onboarding',
        cta: 'Build Dominance',
      },
    ],
    faqs: [
      { q: 'Do I need to provide content or photos?', a: 'For best results, a monthly content shoot (2–3 hours) gives us authentic brand visuals. If that\'s not possible, we design high-quality graphics using your brand kit and stock visuals. Some clients provide a monthly "raw content dump" which we edit and produce.' },
      { q: 'How do you measure social media success?', a: 'We track reach, impressions, follower growth rate, engagement rate, website clicks from social, DM inquiries, and attributed leads. Vanity metrics like raw follower count are secondary to actual engagement and business impact.' },
      { q: 'Do you post on my behalf or send me for approval first?', a: 'Your full monthly content calendar is submitted for approval by the 25th of the previous month. You review, request changes, and approve before anything goes live. Nothing posts without your green light.' },
      { q: 'How long before I see growth?', a: 'Most accounts see meaningful engagement improvement within 30–45 days. Significant follower growth (1,000–3,000 new followers) typically starts by Month 2, assuming consistent posting and community engagement.' },
      { q: 'Do you run paid promotions / boosts as well?', a: 'Our Dominance package includes paid social boosting. For Presence and Authority, we can add a paid boost strategy as an add-on. We always separate organic and paid results in reporting.' },
    ],
    resultHeadline: '3.2× Avg Reach Growth in 90 Days',
    resultProof: 'A D2C skincare brand went from 2,100 Instagram followers with 0.4% engagement to 8,700 followers with 7.8% engagement in 90 days — purely through organic content strategy and Reels optimisation. DM inquiries increased from 8/month to 94/month.',
  },

  'website-dev': {
    slug: 'website-dev',
    seoTitle: 'Website Development Agency India | Custom React, Next.js & WordPress — MADSAG',
    seoDescription: 'MADSAG builds custom websites on React, Next.js, and WordPress. No templates. Sub-second load times, 95+ PageSpeed, and conversion-first architecture. Get a free quote.',
    badge: 'Engineering-First',
    badgeIcon: 'fa-solid fa-code',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
    headline: 'WEBSITES BUILT LIKE',
    headlineHighlight: 'INFRASTRUCTURE',
    subheadline: 'Not a brochure. A high-performance business asset.',
    description: 'Most agencies build websites that look good in screenshots. We build websites that perform under traffic, rank on Google, load in under a second, and systematically convert visitors into leads. Every architectural decision is made with your business outcome in mind.',
    metrics: [
      { value: '<0.8s', label: 'Page Load Time',     sublabel: 'Largest Contentful Paint'  },
      { value: '98/100', label: 'PageSpeed Score',   sublabel: 'Google Core Web Vitals'    },
      { value: '100%',   label: 'Custom Build',      sublabel: 'Zero templates used'       },
      { value: '0',      label: 'Elementor / Divi',  sublabel: 'We never use page builders' },
    ],
    features: [
      {
        icon: 'fa-solid fa-compass-drafting',
        title: 'Bespoke UI/UX Design',
        description: 'We start with zero — no templates, no drag-and-drop. Custom Figma designs built around your brand identity, conversion goals, and user psychology. Every page is a deliberate decision.',
      },
      {
        icon: 'fa-solid fa-gauge-high',
        title: 'Sub-Second Performance',
        description: 'Hand-coded React and Next.js with ISR, aggressive image optimisation (WebP/AVIF), CDN delivery, and Core Web Vitals scores above 95 — giving you an SEO advantage from day one.',
      },
      {
        icon: 'fa-solid fa-magnifying-glass',
        title: 'Technical SEO Architecture',
        description: 'Schema markup, semantic HTML5, XML sitemap, canonical URLs, proper heading hierarchy, compressed assets, and a 95+ PageSpeed score — baked in, not bolted on.',
      },
      {
        icon: 'fa-solid fa-mobile-screen',
        title: 'Mobile-First, Every Time',
        description: 'Designed mobile-first across 20+ device breakpoints. Tested on real devices, not just browser DevTools. Your mobile experience is never an afterthought.',
      },
      {
        icon: 'fa-brands fa-wordpress',
        title: 'CMS Integration (WordPress / Strapi)',
        description: 'Give your team the power to update content without touching code. We build intuitive Gutenberg block editors, custom post types, and headless CMS setups for total control.',
      },
      {
        icon: 'fa-solid fa-shield-halved',
        title: 'Security & Performance Hardening',
        description: 'SSL, HTTPS enforcement, CORS configuration, rate limiting, input sanitisation, and regular dependency audits. Your website is an asset — we protect it accordingly.',
      },
    ],
    steps: [
      { number: '01', title: 'Discovery & Scoping',   description: 'Business goals, target audience, competitor analysis, sitemap planning, and technical requirements document. Nothing gets built without a signed-off brief.' },
      { number: '02', title: 'UI/UX Design',           description: 'Full Figma prototype — mobile and desktop — with all interactions mapped. You approve the design before we write a single line of code.' },
      { number: '03', title: 'Development',            description: 'Hand-coded in React / Next.js / WordPress. No page builders. Modular component architecture, TypeScript, and clean git history throughout.' },
      { number: '04', title: 'SEO & Tracking Setup',  description: 'Technical SEO implementation, GA4, GTM, Meta Pixel, schema markup, PageSpeed optimisation, and Google Search Console submission.' },
      { number: '05', title: 'Launch & Handover',      description: 'Hosting setup (Vercel / AWS / Hostinger), domain configuration, DNS, email setup, and a full handover session so you can manage your site with confidence.' },
    ],
    packages: [
      {
        name: 'Business Site',
        price: '₹24,999',
        priceNote: '≈ $299 USD',
        description: 'A fast, professional business website with full SEO setup — ideal for service businesses and consultants.',
        features: ['Up to 7 Pages', 'Custom UI/UX Design (Figma)', 'Mobile-First Build', 'Technical SEO Setup', 'Contact Form + WhatsApp', 'GA4 + GTM Setup', 'Hosting Setup Assistance', '14-Day Support'],
        delivery: '14 Business Days',
        cta: 'Start Business Site',
      },
      {
        name: 'Growth Platform',
        price: '₹54,999',
        priceNote: '≈ $659 USD',
        description: 'A full-featured website with CMS, advanced SEO, performance tuning, and conversion tracking.',
        features: ['Up to 20 Pages', 'Custom React / Next.js Build', 'WordPress / Strapi CMS Integration', 'Advanced Technical SEO', 'Blog & Dynamic Content', 'E-commerce Basic (Up to 50 Products)', 'Full Tracking Stack (GA4, Meta Pixel, CAPI)', 'Core Web Vitals ≥ 95 Guarantee', '30-Day Support'],
        delivery: '25 Business Days',
        popular: true,
        cta: 'Build Growth Platform',
      },
      {
        name: 'Enterprise Build',
        price: 'Custom',
        priceNote: 'Scoped to requirements',
        description: 'Headless Next.js + Strapi, global CDN, custom integrations, and enterprise-grade architecture.',
        features: ['Unlimited Pages', 'Headless Architecture (Next.js + Strapi / Sanity)', 'Global Edge CDN', 'Custom APIs & Webhooks', 'Multi-Language', 'Advanced Security Hardening', 'Load Testing & Monitoring', 'Dedicated Project Manager', '90-Day Support'],
        delivery: '45–90 Business Days',
        cta: 'Scope Enterprise Build',
      },
    ],
    faqs: [
      { q: 'Do you use WordPress or custom code?', a: 'Both — depending on your needs. If you need easy content management, we build custom WordPress with hand-coded themes (no Elementor/Divi). For performance-critical sites, we use Next.js or React with a headless CMS. We recommend the right stack for your requirements, not the one that\'s easiest for us.' },
      { q: 'How fast will my website actually load?', a: 'Our standard target is <800ms LCP (Largest Contentful Paint). We achieve this through hand-coded builds, WebP image delivery, deferred scripts, and CDN setup. Every project is delivered with a Google PageSpeed screenshot confirming ≥ 90 before handover.' },
      { q: 'Will I be able to update the website myself?', a: 'Yes. We build intuitive CMS setups (WordPress Gutenberg or Strapi) and provide a training session at handover. Our clients update their own blogs, team pages, and pricing without touching code.' },
      { q: 'Do you handle hosting?', a: 'Yes. We set up hosting on your preferred provider (Vercel, AWS, Hostinger, Cloudflare) and configure domains, DNS, SSL, and email. We recommend the right hosting tier for your traffic and budget.' },
      { q: 'What happens after launch?', a: 'All packages include a post-launch support window (14–90 days). After that, we offer monthly maintenance retainers covering security updates, plugin management, performance monitoring, and minor content updates.' },
    ],
    resultHeadline: 'Core Web Vitals: 42 → 98/100 — Real Client Result',
    resultProof: 'PrimeSpace Realty came to us with a legacy WordPress site scoring 42/100 on Core Web Vitals and 4.5s average load times. We rebuilt it on Next.js with Strapi CMS. Result: 98/100 Core Web Vitals, 0.8s average load, 140% increase in time-on-site, and 48% more qualified lead submissions.',
  },
};
