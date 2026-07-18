
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../constants';
import { GlobalData } from '../types';
import MadsagLogo from './MadsagLogo';

interface NavbarProps {
  onGetQuote: () => void;
  activeSectionId: string | null;
  globalData: GlobalData | null;
}

const Navbar: React.FC<NavbarProps> = ({ onGetQuote, activeSectionId, globalData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'services-grid', label: 'Services' },
    { id: 'portfolio', label: 'Work' },
    { id: 'faq', label: 'FAQ' },
    { id: 'process', label: 'About' },
    { id: 'blog', label: 'Journal' },
  ];

  const isActive = (id: string) => activeSectionId === id;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[140] transition-all duration-500 px-4 md:px-8 py-3 flex justify-between items-center ${
          scrolled
            ? 'bg-[#030712]/95 backdrop-blur-2xl border-b border-amber-500/10 shadow-[0_4px_30px_rgba(245,158,11,0.05)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {globalData?.logoUrl ? (
            <img
              src={globalData.logoUrl}
              alt={globalData.siteName || BRAND_NAME}
              className="h-10 w-auto group-hover:scale-105 transition-transform"
            />
          ) : (
            <MadsagLogo className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative py-2 transition-all font-bold uppercase text-[15px] tracking-[0.2em] hover:text-amber-400 ${
                isActive(link.id) ? 'text-amber-500' : 'text-gray-400'
              }`}
            >
              {link.label}
              {isActive(link.id) && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-500 rounded-full animate-in fade-in slide-in-from-left-2 duration-300" />
              )}
            </a>
          ))}
          <Link
            to="/about"
            className="relative py-2 transition-all font-bold uppercase text-[15px] tracking-[0.2em] text-gray-400 hover:text-amber-400"
          >
            About Us
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onGetQuote}
            id="navbar-cta-btn"
            className="hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-xl text-[15px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            <i className="fa-solid fa-paper-plane text-lg" />
            Get Quote
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 glass rounded-lg border-white/10"
            aria-label="Toggle Menu"
          >
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[135] bg-[#030712]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
          <MadsagLogo className="h-12 w-auto mb-4" />
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-black uppercase tracking-[0.2em] transition-all ${
                isActive(link.id) ? 'text-amber-500' : 'text-white hover:text-amber-400'
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-black uppercase tracking-[0.2em] text-white hover:text-amber-400 transition-all"
          >
            About Us
          </Link>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onGetQuote();
            }}
            className="mt-4 bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all"
          >
            Get Free Quote
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
