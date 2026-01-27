
import React from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioItem } from '../types';

interface PortfolioSectionProps {
  onViewProject: (item: PortfolioItem) => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onViewProject }) => {
  return (
    <section id="portfolio" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">Strategic Assets</h2>
          <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
            THE <span className="text-gold">WORK</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Engineering dominance across competitive sectors. Explore the blueprints of our most impactful deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex flex-col cursor-pointer"
              onClick={() => onViewProject(item)}
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass border-white/5 transition-all duration-700 group-hover:border-amber-500/30">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-gray-950 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex gap-2 mb-4">
                    {item.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-black text-amber-500 uppercase tracking-widest backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-amber-500 font-black text-[10px] uppercase tracking-widest mb-1">{item.client}</p>
                  <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-tight mb-6">
                    {item.title}
                  </h4>
                  
                  <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                    Inspect Asset
                  </button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 glass rounded-full border-white/10">
                   <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">Live deployment</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em] mb-8">Ready to be our next success story?</p>
          <a href="#contact" className="inline-flex items-center gap-4 px-12 py-5 border border-white/10 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
            Initiate Conversation <i className="fa-solid fa-arrow-right text-amber-500"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
