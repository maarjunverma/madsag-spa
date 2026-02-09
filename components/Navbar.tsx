
import React, { useState } from 'react';
import { BRAND_NAME } from '../constants';

interface NavbarProps {
  onGetQuote: () => void;
  activeSectionId: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ onGetQuote, activeSectionId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'website-design', label: 'Web' },
    { id: 'performance-marketing', label: 'Growth' },
    { id: 'portfolio', label: 'Work' },
    { id: 'faq', label: 'FAQ' },
    { id: 'process', label: 'About' },
    { id: 'blog', label: 'Journal' },
  ];

  const isActive = (id: string) => activeSectionId === id;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[140] glass px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-700 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl md:text-2xl tracking-tighter uppercase text-white leading-none">
              {BRAND_NAME}
            </span>
            <span className="text-[8px] font-black tracking-[0.4em] text-amber-500 uppercase">Strategy Group</span>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              className={`relative py-2 transition-all font-bold uppercase text-[10px] tracking-[0.2em] hover:text-amber-400 ${
                isActive(link.id) ? 'text-amber-500' : 'text-gray-400'
              }`}
            >
              {link.label}
              {isActive(link.id) && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-500 rounded-full animate-in fade-in slide-in-from-left-2 duration-300"></span>
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onGetQuote}
            className="hidden sm:block bg-gradient-to-r from-amber-600 to-yellow-800 hover:from-amber-500 hover:to-yellow-700 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/10"
          >
            Enquire Now
          </button>
          
          {/* Mobile Toggle */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 glass rounded-lg border-white/10"
            aria-label="Toggle Menu"
          >
            <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[135] glass transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-black uppercase tracking-[0.2em] transition-all ${
                isActive(link.id) ? 'text-amber-500' : 'text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsMenuOpen(false);
              onGetQuote();
            }}
            className="mt-4 bg-gradient-to-r from-amber-600 to-yellow-800 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
