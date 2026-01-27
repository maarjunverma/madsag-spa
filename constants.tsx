
import { Service, ServiceType, ProcessStep, BlogPost, PortfolioItem, FAQItem, ServicePackage } from './types';

export const AGENCY_OWNER = "MADSAG Team";
export const WHATSAPP_PHONE = "919876543210"; 
export const BRAND_NAME = "MADSAG";
export const SLOGAN = "ENGINEERING MARKET DOMINANCE";

export const STRAPI_URL = "http://localhost:1337"; 

// Added SYSTEM_ARCH_DOCS to resolve the missing export error in ArchitectureDocs.tsx
export const SYSTEM_ARCH_DOCS = `
[MADSAG CORE ARCHITECTURE BRIEF]
--------------------------------
FRAMEWORK: React 18+ High-Performance Build
STYLING: Tailwind CSS (Precision Utility Engine)
API INTERFACE: RESTful Protocol via Strapi CMS
ASSET DELIVERY: Optimized CDN Edge Computing
PERFORMANCE TARGET: <0.8s LCP (Largest Contentful Paint)

[DIRECTORY LOGIC]
/components  -> Atomic UI elements and molecular sections
/hooks       -> Intersection observers and business logic
/services    -> External API communication (Strapi)
/types       -> Strict TypeScript domain definitions
/constants   -> Global strategic configurations
`;

export const SOCIAL_LINKS = {
  linkedIn: 'https://linkedin.com/company/madsag',
  instagram: 'https://instagram.com/madsag.agency',
  twitter: 'https://twitter.com/madsag',
  behance: 'https://behance.net/madsag',
  youtube: 'https://youtube.com/@madsag'
};

const GENERIC_PACKAGES: ServicePackage[] = [
  {
    name: "Alpha Deployment",
    price: "$1,499",
    description: "Essential structural build focusing on core conversion metrics and rapid market entry.",
    features: ["Standard Architecture", "SEO Foundation", "Mobile Optimized", "7-Day Support"],
    deliveryTime: "10 Days",
    revisions: "2 Iterations"
  },
  {
    name: "Sigma Architecture",
    price: "$3,499",
    description: "High-performance optimization and bespoke design logic for established brands.",
    features: ["Custom UI/UX Engine", "Advanced SEO Tech", "CMS Integration", "Meta CAPI Setup", "Performance Audit"],
    deliveryTime: "21 Days",
    revisions: "Unlimited",
    recommended: true
  },
  {
    name: "Omega Ecosystem",
    price: "Custom",
    description: "Enterprise-level engineering with predictive scaling and global infrastructure.",
    features: ["Headless Next.js", "Global Edge CDN", "Custom Webhooks", "Dedicated Strategist", "24/7 Priority Channel"],
    deliveryTime: "45 Days",
    revisions: "Strategic Partnership"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'General',
    question: "What makes MADSAG different from a traditional digital agency?",
    answer: "We are an engineering-first group. While typical agencies focus purely on aesthetics, we treat your digital presence as high-performance architecture. We prioritize sub-second load times, psychological conversion triggers, and deep data attribution."
  },
  {
    category: ServiceType.WEBSITE_DESIGN,
    question: "Do you use templates like Elementor or Divi?",
    answer: "Never. We build bespoke Next.js and React environments. Off-the-shelf builders introduce bloat that kills page speed and SEO. Our architecture is hand-coded for maximum performance."
  },
  {
    category: ServiceType.WEBSITE_DESIGN,
    question: "Will my site be SEO-optimized out of the box?",
    answer: "Absolutely. We follow a 'Technical SEO First' protocol. This includes semantic HTML5, automated image compression, schema markup, and ensuring we hit 95+ scores on Google PageSpeed Insights."
  },
  {
    category: ServiceType.PERFORMANCE_MARKETING,
    question: "What is the minimum ad budget you work with?",
    answer: "For our Performance unit to effectively run creative testing, we typically recommend a minimum starting budget of $2,500/month."
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'lux-estate',
    title: 'Luxury Estate Portal',
    client: 'Manhattan Group',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    fullPageImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    description: 'A premium real estate platform featuring immersive virtual tours and bespoke property management tools.',
    challenge: 'The client needed to showcase high-value properties with extreme detail without sacrificing page speed.',
    solution: 'Built with Next.js and optimized CDN delivery for high-res assets.',
    result: '45% increase in qualified international leads.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'],
    tags: ['Next.js', 'Real Estate', 'Luxury']
  },
  {
    id: 'alpha-fit',
    title: 'D2C Performance Brand',
    client: 'Alpha Athletics',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    description: 'Scalable Shopify ecosystem for a high-growth activewear brand.',
    challenge: 'Legacy tech stack was crashing during high-volume drops.',
    solution: 'Full migration to Shopify OS 2.0 with custom Liquid engines.',
    result: '8.4x ROAS achieved during Q4 peak season.',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200'],
    tags: ['Shopify', 'E-commerce', 'Scaling']
  }
];

export const SERVICES: Service[] = [
  {
    id: 'website-design',
    name: ServiceType.WEBSITE_DESIGN,
    description: 'We don\'t build sites; we architect digital flagships. Our design language balances brutalist efficiency with luxury aesthetics.',
    fullDescription: 'Our Web Architecture unit focuses on high-performance frameworks that deliver sub-second load times while maintaining a level of aesthetic mastery that builds instant trust.',
    icon: 'fa-solid fa-compass-drafting',
    features: ['Bespoke UI/UX Frameworks', 'Sub-Second Page Loads', 'Conversion-First Architecture', 'Retina-Optimized Assets'],
    gradient: 'from-amber-600 to-yellow-800',
    stats: [
      { label: 'Avg. Load Time', value: '< 0.8s' },
      { label: 'Mobile Optimization', value: '100%' },
      { label: 'SEO Score', value: '98/100' }
    ],
    roadmap: [
      { phase: 'Phase 1', objective: 'Implementation of AI-driven personalized UI components.', status: 'Complete' },
      { phase: 'Phase 2', objective: 'Edge computing integration for global sub-50ms latency.', status: 'In Progress' }
    ],
    portfolio: [PORTFOLIO_ITEMS[0]],
    packages: GENERIC_PACKAGES
  },
  {
    id: 'performance-marketing',
    name: ServiceType.PERFORMANCE_MARKETING,
    description: 'Precision-targeted campaigns that dominate search and social. We don\'t just buy ads; we buy growth.',
    fullDescription: 'Performance Marketing at MADSAG is a data-driven engine. We utilize high-frequency creative testing and the Meta Conversions API.',
    icon: 'fa-solid fa-chart-line',
    features: ['Direct ROI Focus', 'Omnichannel Mastery', 'Deep Data Analysis', 'Creative Scaling'],
    gradient: 'from-orange-600 to-red-800',
    stats: [
      { label: 'Avg. ROAS', value: '4.8x' },
      { label: 'CAPI Accuracy', value: '99%' },
      { label: 'Ad Refresh Cycle', value: '4 Days' }
    ],
    roadmap: [
      { phase: 'Phase 1', objective: 'Standard CAPI integration for all Shopify clients.', status: 'Complete' },
      { phase: 'Phase 2', objective: 'Predictive LTV modeling using first-party data.', status: 'In Progress' }
    ],
    packages: [
      {
        name: "Growth Catalyst",
        price: "$1,200/mo",
        description: "Entry-level performance scaling for single-channel dominance.",
        features: ["1 Primary Channel", "Basic Creative Set", "Weekly Optimization", "CAPI Baseline"],
        deliveryTime: "7 Days",
        revisions: "Monthly Audit"
      },
      {
        name: "Alpha Scale",
        price: "$2,800/mo",
        description: "Aggressive multi-channel strategy designed to force market share acquisition.",
        features: ["Meta & Google Integration", "High-Freq Creative Testing", "Deep Data Attribution", "Scaling Protocols"],
        deliveryTime: "10 Days",
        revisions: "Weekly Strategist Call",
        recommended: true
      },
      {
        name: "Omega Dominance",
        price: "Custom",
        description: "Full omnichannel mastery with predictive modeling and custom creative studio access.",
        features: ["All Active Channels", "Custom Content Studio", "Predictive AI Modeling", "Market Intelligence"],
        deliveryTime: "Ongoing",
        revisions: "Daily Monitoring"
      }
    ]
  },
  {
    id: 'landing-page',
    name: ServiceType.LANDING_PAGE,
    description: 'Laser-focused funnels engineered with one mission: converting your traffic into revenue at record speeds.',
    fullDescription: 'Our funnels are built on the principles of direct-response psychology. Every decision is calculated to move the user toward a single objective.',
    icon: 'fa-solid fa-rocket',
    features: ['Psychological Copywriting', 'Sub-Second Loading', 'A/B Variant Testing', 'Clarity Optimization'],
    gradient: 'from-yellow-600 to-amber-800',
    stats: [
      { label: 'Conv. Rate Increase', value: '+35%' },
      { label: 'Copy Clarity', value: '10/10' },
      { label: 'Interaction Rate', value: '72%' }
    ],
    roadmap: [
      { phase: 'Phase 1', objective: 'Psychological heat-map integration.', status: 'Complete' },
      { phase: 'Phase 2', objective: 'Dynamic text replacement based on ad keywords.', status: 'In Progress' }
    ],
    packages: GENERIC_PACKAGES
  },
  {
    id: 'shopify-development',
    name: ServiceType.SHOPIFY,
    description: 'Bespoke Shopify experiences that combine the beauty of a luxury brand with the power of modern e-commerce.',
    fullDescription: 'We specialize in custom Shopify Liquid logic and Hydrogen (Headless) environments.',
    icon: 'fa-brands fa-shopify',
    features: ['Custom Liquid Engines', 'Retention Funnels', 'Ecosystem Integration', 'Inventory Intelligence'],
    gradient: 'from-amber-700 to-yellow-900',
    stats: [
      { label: 'Checkout Optimization', value: '+18%' },
      { label: 'Retention Lift', value: '25%' },
      { label: 'App Bloat Reduction', value: '-60%' }
    ],
    roadmap: [
      { phase: 'Phase 1', objective: 'Hydrogen (Headless) foundation rollout.', status: 'Complete' },
      { phase: 'Phase 2', objective: 'AI-Personalized product recommendation engine.', status: 'In Progress' }
    ],
    portfolio: [PORTFOLIO_ITEMS[1]],
    packages: GENERIC_PACKAGES
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'conversion-psychology',
    title: 'The Psychology of High-Converting Hero Sections',
    excerpt: 'Discover why some headers command attention while others are ignored.',
    category: 'Strategy',
    author: 'MADSAG Insights',
    date: 'Oct 12, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    content: `<h2>The First Impression Engine</h2><p>In the digital landscape, your hero section isn't just a design choice—it's your elevator pitch.</p>`
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: 1, title: 'Discovery', description: 'We audit your current metrics to find hidden leaks.', icon: 'fa-solid fa-magnifying-glass' },
  { id: 2, title: 'Architecture', description: 'Engineering a blueprint that maximizes conversion.', icon: 'fa-solid fa-chess' },
  { id: 3, title: 'Deployment', description: 'Rapid, high-fidelity execution of the strategy.', icon: 'fa-solid fa-code' },
  { id: 4, title: 'Scale', description: 'Monitoring and optimizing performance.', icon: 'fa-solid fa-gauge-high' }
];

export const TECH_STACK = [
  { name: 'Next.js', icon: 'fa-solid fa-n', color: 'text-white' },
  { name: 'React.js', icon: 'fa-brands fa-react', color: 'text-cyan-400' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-500' },
  { name: 'WordPress', icon: 'fa-brands fa-wordpress', color: 'text-blue-500' },
  { name: 'Tailwind', icon: 'fa-solid fa-wind', color: 'text-teal-400' },
  { name: 'Shopify', icon: 'fa-brands fa-shopify', color: 'text-emerald-500' }
];
