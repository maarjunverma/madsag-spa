
import React from 'react';
import { PortfolioItem } from '../types';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-10">
      {/* Backdrop with fade animation */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-backdrop-fade" 
        onClick={onClose}
      ></div>
      
      {/* Content Container with custom smooth slide-up animation */}
      <div className="relative glass w-full h-full max-w-6xl md:max-h-[90vh] overflow-y-auto md:rounded-[3rem] shadow-2xl border-white/5 animate-modal-enter">
        <button 
          onClick={onClose}
          className="sticky top-6 float-right mr-6 z-20 w-12 h-12 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="p-8 md:p-16">
          <div className="flex flex-wrap gap-3 mb-6">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">{item.title}</h1>
          <p className="text-amber-500 text-xl font-bold mb-12">Strategic Client: {item.client}</p>

          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 relative aspect-video group">
            <img 
              src={item.images[0] || item.thumbnail} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass p-8 rounded-[2rem] border-white/5 hover:border-amber-500/20 transition-colors">
              <h3 className="text-white font-black mb-4 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                <i className="fa-solid fa-bullseye text-red-500"></i> The Conflict
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.challenge}</p>
            </div>
            <div className="glass p-8 rounded-[2rem] border-white/5 hover:border-amber-500/20 transition-colors">
              <h3 className="text-white font-black mb-4 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                <i className="fa-solid fa-microchip text-amber-500"></i> Engineered Solution
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.solution}</p>
            </div>
            <div className="glass p-8 rounded-[2rem] border-white/5 hover:border-amber-500/20 transition-colors">
              <h3 className="text-white font-black mb-4 uppercase text-[10px] tracking-[0.2em] flex items-center gap-2">
                <i className="fa-solid fa-chart-line text-green-500"></i> Measurable ROI
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.result}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Project Context</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex justify-center pt-8 border-t border-white/5">
            <button 
              onClick={onClose}
              className="px-12 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-amber-500/20"
            >
              Exit Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
