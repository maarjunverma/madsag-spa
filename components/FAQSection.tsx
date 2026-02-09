
import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import { ServiceType } from '../types';

interface FAQSectionProps {
  onEnquire: () => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ onEnquire }) => {
  const categories = ['General', ...Object.values(ServiceType)];
  const [activeCategory, setActiveCategory] = useState<string>('General');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQ_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="faq" className="py-20 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">Intelligence Base</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95] mb-6 md:mb-8">
            SYSTEM <span className="text-gold">FAQS</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Clear, technical answers to the most common inquiries from our global partners.
          </p>
        </div>

        {/* Category Tabs - Swipeable on mobile */}
        <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 mb-10 pb-2 -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                : 'glass text-gray-400 hover:text-white border-white/5'
              }`}
            >
              {cat.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3 md:space-y-4">
          {filteredFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`glass rounded-[1.5rem] md:rounded-3xl border-white/5 overflow-hidden transition-all duration-500 ${
                  isOpen ? 'border-amber-500/30 ring-1 ring-amber-500/10' : ''
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex justify-between items-center text-left group gap-4"
                >
                  <span className={`text-base md:text-xl font-bold transition-colors ${isOpen ? 'text-amber-500' : 'text-white group-hover:text-amber-400'}`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center glass border-white/5 transition-transform duration-500 ${isOpen ? 'rotate-180 bg-amber-500/10' : ''}`}>
                    <i className={`fa-solid fa-chevron-down text-[10px] md:text-sm ${isOpen ? 'text-amber-500' : 'text-gray-500'}`}></i>
                  </div>
                </button>
                
                <div 
                  className={`px-6 md:px-8 transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[500px] pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-gray-400 text-sm md:text-lg leading-relaxed pt-3 border-t border-white/5">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border-white/5 text-center">
           <p className="text-xs md:text-sm font-bold text-gray-400 mb-4 md:mb-6 leading-relaxed">Have a more specific technical requirement not listed here?</p>
           <button 
            onClick={onEnquire}
            className="inline-flex items-center gap-3 text-amber-500 font-black text-[10px] md:text-xs uppercase tracking-widest hover:translate-x-2 transition-transform"
           >
             Direct Query to Engineering <i className="fa-solid fa-arrow-right"></i>
           </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
