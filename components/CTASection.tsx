
import React from 'react';
import { AGENCY_OWNER, WHATSAPP_PHONE, BRAND_NAME } from '../constants';

const CTASection: React.FC = () => {
  const defaultMsg = encodeURIComponent(`Hi ${AGENCY_OWNER}, I'm interested in working with your agency.`);
  
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.95] uppercase text-white tracking-tighter">
            READY TO SCALE <br/> 
            <span className="text-gold">WITHOUT LIMITS?</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            Stop gambling with your digital growth. Partner with {BRAND_NAME} to build an asset that actually converts and scales predictably.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${defaultMsg}`}
              className="bg-gradient-to-r from-amber-600 to-yellow-800 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              Start Conversation
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-12 py-5 glass border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-all flex items-center justify-center"
            >
              Back to Top
            </button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all text-white">
             <i className="fa-brands fa-stripe text-5xl"></i>
             <i className="fa-brands fa-shopify text-5xl"></i>
             <i className="fa-brands fa-google text-5xl"></i>
             <i className="fa-brands fa-meta text-5xl"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
