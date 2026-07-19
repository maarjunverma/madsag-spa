import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../constants';

interface WordPressPageProps {
  onGetQuote: () => void;
}

const WORDPRESS_FEATURES = [
  {
    icon: 'fa-solid fa-paintbrush',
    title: 'Bespoke Theme Development',
    description: 'No generic templates. We hand-code custom WordPress themes with pixel-perfect design, fast load times, and full mobile optimisation.'
  },
  {
    icon: 'fa-brands fa-woocommerce',
    title: 'WooCommerce Stores',
    description: 'Full-featured e-commerce on WordPress. Product management, payment gateways, cart optimisation, and custom checkout flows.'
  },
  {
    icon: 'fa-solid fa-plug',
    title: 'Plugin Development',
    description: 'Custom WordPress plugins tailored to your exact business logic — no bloat, no security vulnerabilities from third-party plugins.'
  },
  {
    icon: 'fa-solid fa-gauge-high',
    title: 'WordPress Speed Optimisation',
    description: 'Audit and overhaul existing WordPress sites — Core Web Vitals improvement, image optimisation, caching, and CDN setup.'
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Security Hardening',
    description: 'Protect your WordPress site with malware scanning, login protection, SSL enforcement, and regular security audits.'
  },
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'WordPress SEO Setup',
    description: 'Technical SEO on WordPress — schema markup, XML sitemaps, canonical URLs, Yoast/RankMath configuration, and page speed tuning.'
  }
];

const WORDPRESS_PACKAGES = [
  {
    name: 'Starter Build',
    price: '₹29,999',
    usd: '$349',
    description: 'A fast, professional WordPress site for small businesses ready to go online.',
    features: ['Up to 5 Pages', 'Custom Theme Design', 'Mobile Optimised', 'Basic SEO Setup', 'Contact Form', '7-Day Support'],
    deliveryTime: '10 Days',
    popular: false
  },
  {
    name: 'Growth Engine',
    price: '₹64,999',
    usd: '$779',
    description: 'Full-featured WordPress site with WooCommerce, advanced SEO, and performance tuning.',
    features: ['Up to 15 Pages', 'WooCommerce Integration', 'Advanced SEO Setup', 'Custom Plugin Dev', 'Speed Optimisation', 'Google Analytics 4', '30-Day Support'],
    deliveryTime: '21 Days',
    popular: true
  },
  {
    name: 'Enterprise CMS',
    price: 'Custom',
    usd: 'Custom',
    description: 'Headless WordPress with Next.js frontend, multi-language, and enterprise-grade security.',
    features: ['Unlimited Pages', 'Headless WordPress (REST/GraphQL)', 'Multi-language', 'Custom Workflow', 'Priority Support', 'Dedicated Project Manager'],
    deliveryTime: '45+ Days',
    popular: false
  }
];

const FAQS = [
  {
    q: 'Do you use pre-built WordPress themes?',
    a: 'Never. We build bespoke themes from scratch. Off-the-shelf themes like Divi or Elementor introduce massive code bloat that hurts page speed and SEO. Our custom builds are lean, fast, and unique to your brand.'
  },
  {
    q: 'Can you migrate my site to WordPress?',
    a: 'Yes. We handle migrations from Wix, Squarespace, Joomla, Webflow, and other platforms — including a full SEO redirect map to ensure zero ranking loss.'
  },
  {
    q: 'Will my WordPress site be SEO-ready?',
    a: 'Every WordPress site we build includes technical SEO: schema markup, XML sitemap, proper heading structure, compressed images, and Google Search Console integration.'
  },
  {
    q: 'Can I edit the site myself after launch?',
    a: 'Absolutely. We train you on the WordPress admin panel and build intuitive Gutenberg block layouts so you can update content, add pages, and manage blog posts without needing a developer.'
  }
];

const WordPressPage: React.FC<WordPressPageProps> = ({ onGetQuote }) => {
  useEffect(() => {
    // Set page-specific SEO
    document.title = 'WordPress Development Agency India | Custom WordPress Websites — MADSAG';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'MADSAG builds custom WordPress websites in India — bespoke themes, WooCommerce, plugin development, headless WordPress, and speed optimisation. No templates. Hand-coded for performance and SEO.');
    }
    // Set canonical
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://madsag.in/services/wordpress';

    window.scrollTo(0, 0);

    // Restore on unmount
    return () => {
      document.title = 'MADSAG | Digital Agency — SEO, Google Ads, Landing Pages & WordPress';
      if (metaDesc) {
        metaDesc.setAttribute('content', 'MADSAG is a performance-first digital agency in India. We specialise in SEO, Google Ads management, high-converting landing page design, and custom WordPress development. Turning clicks into customers since 2022.');
      }
      if (canonical) canonical.href = 'https://madsag.in/';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* ── HERO ── */}
      <section
        id="wp-hero"
        className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center overflow-hidden"
        aria-label="WordPress Development Agency India"
      >
        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest mb-8">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="text-amber-400">WordPress</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-blue-500/30 rounded-full bg-blue-500/5 text-blue-400 text-[13px] font-black tracking-[0.3em] uppercase">
            <i className="fa-brands fa-wordpress text-sm" />
            WordPress Development
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.05] uppercase text-white">
            CUSTOM <span className="text-gold">WORDPRESS</span>
            <br />
            DEVELOPMENT
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed font-medium">
            <strong className="text-white">No templates. No bloat.</strong> We hand-code bespoke WordPress websites engineered for speed, SEO, and conversions — in India and globally.
          </p>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            From custom theme development and WooCommerce stores to headless WordPress with Next.js, we build the WordPress architecture your brand deserves.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              id="wp-hero-cta"
              onClick={onGetQuote}
              className="px-10 py-4 btn-amber rounded-2xl text-[10px] tracking-[0.3em] flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              Get Free Quote
            </button>
            <a
              href="#wp-packages"
              id="wp-view-packages"
              className="px-10 py-4 bg-white/5 border border-white/10 hover:border-blue-500/20 hover:bg-white/[0.08] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"
            >
              <i className="fa-brands fa-wordpress text-blue-500/70 text-xs" />
              View Packages
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '95+', label: 'PageSpeed Score' },
              { value: '10+', label: 'WP Sites Delivered' },
              { value: '0', label: 'Templates Used' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-gold">{s.value}</div>
                <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MADSAG FOR WORDPRESS ── */}
      <section id="wp-why" className="py-24 px-6 bg-[#05050e]" aria-labelledby="wp-why-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-black text-[11px] uppercase tracking-[0.35em] mb-4">Why Choose Us</p>
            <h2 id="wp-why-heading" className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              WordPress Done <span className="text-gold">Right</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Most agencies slap a template on and call it a website. We treat WordPress as an engineering challenge — and the results speak for themselves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORDPRESS_FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:border-amber-500/20 hover:bg-white/[0.04] transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 transition-all">
                  <i className={`${f.icon} text-amber-400 text-sm`} />
                </div>
                <h3 className="text-white font-black text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="wp-packages" className="py-24 px-6" aria-labelledby="wp-packages-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-black text-[11px] uppercase tracking-[0.35em] mb-4">Transparent Pricing</p>
            <h2 id="wp-packages-heading" className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              WordPress <span className="text-gold">Packages</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Fixed-scope packages with no hidden fees. Need something custom? We'll scope it for free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {WORDPRESS_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-6 border transition-all ${
                  pkg.popular
                    ? 'border-amber-500/40 bg-amber-500/[0.04] shadow-[0_0_60px_rgba(251,191,36,0.07)]'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-white font-black text-lg mb-1">{pkg.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{pkg.description}</p>
                  <div className="text-3xl font-black text-gold mb-1">{pkg.price}</div>
                  <div className="text-gray-600 text-xs">{pkg.usd !== pkg.price ? `≈ ${pkg.usd} USD` : ''}</div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <i className="fa-solid fa-check text-amber-500 mt-0.5 text-xs flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-5">
                  <i className="fa-solid fa-clock text-amber-500/40" />
                  Delivery: {pkg.deliveryTime}
                </div>
                <button
                  id={`wp-pkg-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={onGetQuote}
                  className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all ${
                    pkg.popular
                      ? 'btn-amber'
                      : 'bg-white/5 border border-white/10 hover:border-amber-500/20 hover:bg-white/[0.08] text-white'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="wp-faq" className="py-24 px-6 bg-[#05050e]" aria-labelledby="wp-faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 font-black text-[11px] uppercase tracking-[0.35em] mb-4">Questions</p>
            <h2 id="wp-faq-heading" className="text-3xl md:text-4xl font-black tracking-tighter text-white">
              WordPress <span className="text-gold">FAQ</span>
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl"
              >
                <h3 className="text-white font-black text-sm mb-3 flex items-start gap-3">
                  <span className="text-amber-500 flex-shrink-0">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="wp-cta" className="py-24 px-6 text-center" aria-labelledby="wp-cta-heading">
        <div className="max-w-2xl mx-auto">
          <h2 id="wp-cta-heading" className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Ready for a <span className="text-gold">Faster</span> WordPress Site?
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Get a free consultation and project scope from our WordPress engineers. No templates, no fluff — just results.
          </p>
          <button
            id="wp-footer-cta"
            onClick={onGetQuote}
            className="px-14 py-5 btn-amber rounded-2xl text-[10px] tracking-[0.3em] inline-flex items-center gap-3"
          >
            <i className="fa-brands fa-wordpress text-xs" />
            Get Free WordPress Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default WordPressPage;
