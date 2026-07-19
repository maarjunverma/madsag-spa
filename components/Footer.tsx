
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, SLOGAN, SOCIAL_LINKS, WHATSAPP_PHONE } from '../constants';
import { GlobalData } from '../types';
import MadsagLogo from './MadsagLogo';

interface FooterProps {
  globalData: GlobalData | null;
  onGetQuote: () => void;
}

const FOOTER_LINKS = {
  Services: [
    { label: 'SEO & Organic Growth',    href: '#services-grid'       },
    { label: 'Google Ads & PPC',         href: '#performance-marketing'},
    { label: 'Landing Page Design',      href: '#landing-page'        },
    { label: 'Shopify Development',      href: '#shopify-development'  },
    { label: 'WordPress Development',    href: '/services/wordpress', isRoute: true },
    { label: 'Web Architecture',         href: '#website-design'      },
  ],
  Company: [
    { label: 'About MADSAG',   href: '/about',     isRoute: true },
    { label: 'Our Work',       href: '#portfolio'               },
    { label: 'Our Process',    href: '#process'                 },
    { label: 'Journal / Blog', href: '#blog'                    },
    { label: 'FAQ',            href: '#faq'                     },
  ],
};

const SOCIALS = [
  { href: SOCIAL_LINKS.linkedIn,  icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn'  },
  { href: SOCIAL_LINKS.instagram, icon: 'fa-brands fa-instagram',   label: 'Instagram' },
  { href: SOCIAL_LINKS.twitter,   icon: 'fa-brands fa-x-twitter',   label: 'Twitter/X' },
  { href: SOCIAL_LINKS.youtube,   icon: 'fa-brands fa-youtube',     label: 'YouTube'   },
  { href: `https://wa.me/${WHATSAPP_PHONE}`, icon: 'fa-brands fa-whatsapp', label: 'WhatsApp' },
];

const CERTIFICATIONS = [
  { icon: 'fa-brands fa-google',    label: 'Google Partner',   color: '#4285F4' },
  { icon: 'fa-brands fa-meta',      label: 'Meta Partner',     color: '#0082FB' },
  { icon: 'fa-brands fa-shopify',   label: 'Shopify Expert',   color: '#96BF48' },
  { icon: 'fa-brands fa-wordpress', label: 'WP Expert',        color: '#21759B' },
];

const Footer: React.FC<FooterProps> = ({ globalData, onGetQuote }) => {
  const year = new Date().getFullYear();
  const email = globalData?.contactEmail || 'madsagofficial@gmail.com';
  const phone = globalData?.contactPhone || '+91 93104 86071';

  return (
    <footer className="relative bg-[#02040b] overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* ── Top glow accent ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-amber-500/20 blur-sm" />
      <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[500px] h-[120px] bg-amber-500/[0.04] blur-[60px] rounded-full pointer-events-none" />

      {/* ── CTA Banner ── */}
      <div className="border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-3">Ready to Dominate?</p>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
              Let's build something<br className="hidden md:block" /> that actually <span className="text-gold">converts.</span>
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              id="footer-cta-btn"
              onClick={onGetQuote}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:shadow-[0_0_24px_rgba(251,191,36,0.35)] active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              Get Free Quote
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-whatsapp-btn"
              className="px-8 py-3.5 bg-white/[0.04] border border-white/[0.08] hover:border-green-500/30 hover:text-green-400 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/[0.05]">

        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1 space-y-6">
          <div
            className="cursor-pointer inline-block"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="link"
            aria-label="Back to top"
          >
            {globalData?.logoUrl ? (
              <img src={globalData.logoUrl} alt={globalData.siteName || BRAND_NAME} className="h-9 w-auto" />
            ) : (
              <MadsagLogo className="h-9 w-auto" />
            )}
          </div>

          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            {globalData?.footerText ||
              'We engineer digital systems that command attention, convert at scale, and compound your market dominance.'}
          </p>

          {/* Contact details */}
          <div className="space-y-2.5">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2.5 text-gray-500 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-envelope text-[10px] text-amber-500/60" />
              </span>
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g,'')}`}
              className="flex items-center gap-2.5 text-gray-500 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-phone text-[10px] text-amber-500/60" />
              </span>
              {phone}
            </a>
          </div>

          {/* Social icons */}
          <div className="flex gap-2 flex-wrap">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-gray-500 hover:text-amber-400 hover:border-amber-500/25 hover:bg-amber-500/[0.07] transition-all duration-200"
              >
                <i className={`${s.icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

        {/* Services column */}
        <div className="space-y-5">
          <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-3 h-px bg-amber-500" />
            Services
          </h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.Services.map((link) => (
              <li key={link.label}>
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-amber-400 transition-colors text-sm font-medium flex items-center gap-1.5 group"
                  >
                    <i className="fa-solid fa-chevron-right text-[8px] text-amber-500/30 group-hover:text-amber-500 transition-colors" />
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-amber-400 transition-colors text-sm font-medium flex items-center gap-1.5 group"
                  >
                    <i className="fa-solid fa-chevron-right text-[8px] text-amber-500/30 group-hover:text-amber-500 transition-colors" />
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div className="space-y-5">
          <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-3 h-px bg-amber-500" />
            Company
          </h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.Company.map((link) => (
              <li key={link.label}>
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-amber-400 transition-colors text-sm font-medium flex items-center gap-1.5 group"
                  >
                    <i className="fa-solid fa-chevron-right text-[8px] text-amber-500/30 group-hover:text-amber-500 transition-colors" />
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-amber-400 transition-colors text-sm font-medium flex items-center gap-1.5 group"
                  >
                    <i className="fa-solid fa-chevron-right text-[8px] text-amber-500/30 group-hover:text-amber-500 transition-colors" />
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications / Partners column */}
        <div className="space-y-5">
          <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-3 h-px bg-amber-500" />
            Partners
          </h4>
          <div className="grid grid-cols-2 gap-2.5">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.025] hover:border-white/[0.12] transition-all"
              >
                <i className={`${c.icon} text-sm`} style={{ color: c.color }} />
                <span className="text-[10px] font-bold text-gray-500 leading-tight">{c.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-white/[0.05] grid grid-cols-2 gap-4">
            {[
              { val: '150+', lbl: 'Projects'   },
              { val: '4.8×', lbl: 'Avg ROAS'   },
              { val: '98',   lbl: 'SEO Score'  },
              { val: '<0.8s',lbl: 'Load Time'  },
            ].map((s) => (
              <div key={s.lbl} className="text-center">
                <div className="text-lg font-black text-gold">{s.val}</div>
                <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">
          © {year} {globalData?.siteName || BRAND_NAME}. All rights reserved.
        </p>

        <p className="text-[10px] font-black text-amber-500/25 uppercase tracking-[0.3em]">
          {SLOGAN}
        </p>

        <div className="flex gap-4 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
          <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</a>
          <span>·</span>
          <a href="/terms" className="hover:text-gray-400 transition-colors">Terms</a>
          <span>·</span>
          <a href="/sitemap.xml" className="hover:text-gray-400 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
