
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
    <section id="faq" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">Intelligence Base</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
            SYSTEM <span className="text-gold">FAQS</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Clear, technical answers to the most common inquiries from our global partners.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
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
        <div className="space-y-4">
          {filteredFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`glass rounded-3xl border-white/5 overflow-hidden transition-all duration-500 ${
                  isOpen ? 'border-amber-500/30 ring-1 ring-amber-500/10' : ''
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left group"
                >
                  <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-amber-500' : 'text-white group-hover:text-amber-400'}`}>
                    {item.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center glass border-white/5 transition-transform duration-500 ${isOpen ? 'rotate-180 bg-amber-500/10' : ''}`}>
                    <i className={`fa-solid fa-chevron-down text-sm ${isOpen ? 'text-amber-500' : 'text-gray-500'}`}></i>
                  </div>
                </button>
                
                <div 
                  className={`px-8 transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-gray-400 text-lg leading-relaxed pt-2 border-t border-white/5">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 glass p-8 rounded-[2.5rem] border-white/5 text-center">
           <p className="text-sm font-bold text-gray-400 mb-6">Have a more specific technical requirement not listed here?</p>
           <button 
            onClick={onEnquire}
            className="inline-flex items-center gap-3 text-amber-500 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform"
           >
             Direct Query to Engineering <i className="fa-solid fa-arrow-right"></i>
           </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
