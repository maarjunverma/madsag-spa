import React from 'react';
import { AGENCY_OWNER, WHATSAPP_PHONE, BRAND_NAME } from '../constants';

const CTASection: React.FC = () => {
  const defaultMsg = encodeURIComponent(`Hi ${AGENCY_OWNER}, I'm interested in working with your agency.`);
  
  return (
    <section id="contact" className="py-12 md:py-24 px-6">
      <div className="max-w-5xl mx-auto glass p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-center relative overflow-hidden border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600/5 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-7xl font-black mb-8 leading-[1.1] md:leading-[0.95] uppercase text-white tracking-tighter">
            READY TO SCALE <br/> 
            <span className="text-gold">WITHOUT LIMITS?</span>
          </h2>
          
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 font-medium px-4 md:px-0 leading-relaxed">
            Stop gambling with your digital growth. Partner with {BRAND_NAME} to build an asset that actually converts and scales predictably.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center max-w-xs mx-auto sm:max-w-none">
            <a 
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${defaultMsg}`}
              className="bg-[#0a0a0a] border border-white/10 text-white px-10 md:px-14 py-5 md:py-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] hover:scale-105 hover:border-amber-500/50 transition-all shadow-2xl flex items-center justify-center gap-4 group"
            >
              <i className="fa-brands fa-whatsapp text-xl md:text-2xl text-[#25D366] group-hover:scale-110 transition-transform"></i>
              Start Conversation
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-10 md:px-14 py-5 md:py-6 bg-[#161616]/50 glass border-white/5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center group"
            >
              <i className="fa-solid fa-arrow-up-long mr-4 group-hover:-translate-y-1 transition-transform"></i>
              Back to Top
            </button>
          </div>

          <div className="mt-12 md:mt-20 flex flex-wrap justify-center gap-8 md:gap-14 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all text-white">
             <i className="fa-brands fa-stripe text-3xl md:text-5xl"></i>
             <i className="fa-brands fa-shopify text-3xl md:text-5xl"></i>
             <i className="fa-brands fa-google text-3xl md:text-5xl"></i>
             <i className="fa-brands fa-meta text-3xl md:text-5xl"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;