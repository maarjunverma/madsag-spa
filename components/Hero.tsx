import React from 'react';
import { BRAND_NAME } from '../constants';
import MadsagLogo from './MadsagLogo';

interface HeroProps {
  onGetQuote: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetQuote }) => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 md:px-6 text-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[70%] left-[20%] w-[300px] h-[300px] bg-orange-600/[0.04] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Brand badge */}
        <div className="reveal stagger-1 inline-flex items-center gap-2 px-4 py-2 mb-8 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-400 text-[15px] font-black tracking-[0.35em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Digital Excellence Platform
        </div>

        <h1 className="reveal stagger-2 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 md:mb-10 tracking-tighter leading-[1.05] md:leading-[0.9] uppercase text-white">
          TURNING <span className="text-gold">CLICKS</span>{' '}
          <br className="hidden md:block" />
          INTO CUSTOMERS.
        </h1>

        <p className="reveal stagger-3 text-gray-400 text-sm md:text-xl max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed font-medium px-2 md:px-0">
          <span className="text-white font-bold">{BRAND_NAME}</span> is the high-stakes digital agency for brands that refuse to be average. We build the architecture of your future success.
        </p>

        <div className="reveal stagger-4 flex flex-col sm:flex-row gap-4 md:gap-5 justify-center w-full max-w-[300px] sm:max-w-none mx-auto">
          <button
            id="hero-cta-btn"
            onClick={onGetQuote}
            className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-5 btn-amber rounded-xl md:rounded-2xl text-[10px] md:text-xs tracking-[0.3em] flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-paper-plane text-xs" />
            Get Free Quote
          </button>
          <a
            href="#process"
            className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-5 bg-white/5 border border-white/10 hover:border-amber-500/20 hover:bg-white/[0.08] text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-chess text-amber-500/70 text-xs" />
            Our Strategy
          </a>
        </div>

        {/* Stats row */}
        <div className="reveal stagger-5 mt-14 md:mt-20 flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { value: '150+', label: 'Projects Delivered' },
            { value: '4.8×', label: 'Avg. ROAS' },
            { value: '<0.8s', label: 'Page Load Time' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gold">{stat.value}</div>
              <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 animate-gentle-bounce text-amber-500/30">
        <i className="fa-solid fa-chevron-down text-2xl md:text-3xl" />
      </div>
    </section>
  );
};

export default Hero;