
import React from 'react';
import { BRAND_NAME } from '../constants';

interface HeroProps {
  onGetQuote: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetQuote }) => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-block px-6 py-2 mb-8 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase">
          Digital Excellence Platform
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-[0.9] uppercase text-white">
          TURNING <span className="text-gold">CLICKS</span> <br className="hidden md:block"/> 
          INTO CUSTOMERS.
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
          <span className="text-white font-bold">{BRAND_NAME}</span> is the high-stakes digital agency for brands that refuse to be average. We build the architecture of your future success.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={onGetQuote}
            className="px-12 py-5 bg-gradient-to-r from-amber-600 to-yellow-800 hover:scale-105 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-amber-500/20"
          >
            Initiate Deployment
          </button>
          <a href="#process" className="px-12 py-5 glass border-white/10 hover:bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center">
            Our Strategy
          </a>
        </div>
      </div>
      
      <div className="mt-20 animate-gentle-bounce text-amber-500/30">
        <i className="fa-solid fa-chevron-down text-3xl"></i>
      </div>
    </section>
  );
};

export default Hero;
