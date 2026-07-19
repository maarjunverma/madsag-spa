
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BRAND_NAME } from '../constants';
import { GlobalData } from '../types';
import MadsagLogo from './MadsagLogo';

interface NavbarProps {
  onGetQuote: () => void;
  activeSectionId: string | null;
  globalData: GlobalData | null;
}

const NAV_LINKS = [
  { href: '#services-grid', label: 'Services' },
  { href: '#portfolio',     label: 'Work'     },
  { href: '#process',       label: 'Process'  },
  { href: '#faq',           label: 'FAQ'      },
];

const Navbar: React.FC<NavbarProps> = ({ onGetQuote, activeSectionId, globalData }) => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  // ── Scroll detection ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Body lock while menu open ─────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Close menu on route change ───────────────────────────────────
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // ── Smart anchor navigation ───────────────────────────────────────
  // Works from any page: if already on /, scroll immediately.
  // If on another page, navigate to / then scroll after paint.
  const handleAnchor = useCallback((hash: string, close = false) => {
    if (close) setMenuOpen(false);
    const id = hash.replace('#', '');

    if (location.pathname === '/') {
      // Already on homepage — just scroll
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Go home, then scroll once the page mounts
      navigate('/');
      // Use sessionStorage flag so PublicSite can pick it up on mount
      sessionStorage.setItem('scrollTo', id);
    }
  }, [location.pathname, navigate]);

  const isHome = location.pathname === '/';
  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return isHome && activeSectionId === href.replace('#', '');
    }
    return location.pathname === href;
  };

  return (
    <>
      {/* ── DESKTOP NAV ─────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[140] transition-all duration-500 ${
          scrolled
            ? 'bg-[#030712]/96 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between gap-4">

          {/* Logo — always navigates to home root */}
          <Link
            to="/"
            aria-label="MADSAG — go to home"
            className="flex-shrink-0 flex items-center gap-2.5 group"
          >
            {globalData?.logoUrl ? (
              <img src={globalData.logoUrl} alt={globalData.siteName || BRAND_NAME} className="h-9 w-auto" />
            ) : (
              <MadsagLogo className="h-9 w-auto group-hover:opacity-90 transition-opacity" />
            )}
            <span className="hidden sm:block w-1 h-1 rounded-full bg-amber-500/40" />
            <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.25em] text-amber-500/60">
              Digital Agency
            </span>
          </Link>

          {/* ── Desktop Links — ALWAYS visible ────────────────────── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <button
                  key={href}
                  onClick={() => handleAnchor(href)}
                  className={`relative px-4 py-2 rounded-lg text-[13px] font-black uppercase tracking-[0.18em] transition-all duration-200 ${
                    active
                      ? 'text-amber-400 bg-amber-500/8'
                      : 'text-gray-500 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {active && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />
                  )}
                  {label}
                </button>
              );
            })}

            {/* Static page links */}
            {[
              { to: '/about',             label: 'About'     },
              { to: '/services/wordpress', label: 'WordPress' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-[13px] font-black uppercase tracking-[0.18em] transition-all duration-200 ${
                  location.pathname === to
                    ? 'text-amber-400 bg-amber-500/8'
                    : 'text-gray-500 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right controls ─────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919310486071"
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-whatsapp"
              aria-label="Chat on WhatsApp"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-gray-500 hover:text-green-400 hover:border-green-500/30 transition-all duration-200"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
            </a>

            <button
              id="navbar-cta-btn"
              onClick={onGetQuote}
              className="hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black px-5 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-[0.18em] transition-all duration-200 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] active:scale-95"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              Get Quote
            </button>

            {/* Hamburger */}
            <button
              id="navbar-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200"
            >
              <span className="flex flex-col gap-[5px]">
                <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ─────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[139] lg:hidden transition-all duration-400 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(24px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        <div className="flex flex-col h-full pt-[88px] pb-12 px-8 overflow-y-auto">

          {/* Mobile nav links */}
          <nav className="flex-1 flex flex-col justify-center gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => handleAnchor(href, true)}
                className={`flex items-center justify-between w-full px-4 py-4 rounded-2xl text-2xl font-black uppercase tracking-[0.15em] border border-transparent transition-all duration-200 ${
                  isActive(href)
                    ? 'text-amber-400 bg-amber-500/[0.06] border-amber-500/10'
                    : 'text-white hover:text-amber-400 hover:bg-white/[0.04] hover:border-white/[0.06]'
                }`}
              >
                {label}
                <i className="fa-solid fa-arrow-right text-base text-amber-500/30" />
              </button>
            ))}

            {[
              { to: '/about',             label: 'About'     },
              { to: '/services/wordpress', label: 'WordPress' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-4 rounded-2xl text-2xl font-black uppercase tracking-[0.15em] border border-transparent transition-all duration-200 ${
                  location.pathname === to
                    ? 'text-amber-400 bg-amber-500/[0.06] border-amber-500/10'
                    : 'text-white hover:text-amber-400 hover:bg-white/[0.04] hover:border-white/[0.06]'
                }`}
              >
                {label}
                <i className="fa-solid fa-arrow-right text-base text-amber-500/30" />
              </Link>
            ))}
          </nav>

          {/* Mobile CTA block */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => { setMenuOpen(false); onGetQuote(); }}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all shadow-[0_0_30px_rgba(251,191,36,0.25)] flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              Get Free Quote
            </button>
            <a
              href="https://wa.me/919310486071"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3.5 bg-white/[0.04] border border-white/8 hover:border-green-500/30 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 hover:text-green-400"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              WhatsApp Us
            </a>

            <div className="flex justify-center gap-3 pt-2">
              {[
                { href: 'https://linkedin.com/company/madsag', icon: 'fa-brands fa-linkedin-in' },
                { href: 'https://instagram.com/madsag.agency', icon: 'fa-brands fa-instagram'   },
                { href: 'https://twitter.com/madsag',          icon: 'fa-brands fa-x-twitter'   },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-gray-500 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                >
                  <i className={`${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
