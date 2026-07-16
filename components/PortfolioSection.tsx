
import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioItem } from '../types';
import { apiService } from '../services/api';

interface PortfolioSectionProps {
  onViewProject: (item: PortfolioItem) => void;
}

/**
 * Scrollable website preview card — shows a full-page screenshot
 * that auto-scrolls on hover, giving visitors a "live preview" feel.
 */
const ScrollPreviewCard: React.FC<{
  item: PortfolioItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scroll the preview image on hover
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (isHovering) {
      let scrollPos = 0;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const speed = 0.6; // px per frame
      const tick = () => {
        scrollPos = Math.min(scrollPos + speed, maxScroll);
        el.scrollTop = scrollPos;
        if (scrollPos < maxScroll) {
          animRef.current = requestAnimationFrame(tick);
        }
      };
      animRef.current = requestAnimationFrame(tick);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      // Smooth scroll back to top
      if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHovering]);

  const previewSrc = item.fullPageImage || item.thumbnail;

  return (
    <div
      className="group relative cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Browser-style frame */}
      <div className="rounded-[1.5rem] overflow-hidden border border-white/[0.08] bg-[#0a0a14] shadow-2xl shadow-black/50 transition-all duration-500 group-hover:border-amber-500/30 group-hover:shadow-amber-500/10">
        {/* Browser top bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111119] border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
          </div>
          <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[9px] text-gray-500 font-mono truncate">
            {item.liveUrl || `https://${item.id}.madsag.in`}
          </div>
        </div>

        {/* Scrollable preview window */}
        <div
          ref={scrollRef}
          className="h-[420px] overflow-hidden no-scrollbar relative"
        >
          {previewSrc ? (
            <img
              src={previewSrc}
              alt={`${item.title} — full page preview`}
              className="w-full h-auto object-cover object-top min-h-full"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-500/10 to-yellow-900/20 flex items-center justify-center">
              <i className="fa-solid fa-briefcase text-amber-500/20 text-5xl" />
            </div>
          )}

          {/* Top-left "Live" badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 glass rounded-full border-white/10 z-10">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">Live deployment</span>
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0a14] to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Card info below the preview */}
      <div className="mt-5 px-1">
        <div className="flex gap-2 mb-3">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[8px] font-black text-amber-500 uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-amber-500 font-black text-[10px] uppercase tracking-widest mb-1">{item.client}</p>
        <h4 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-tight mb-2">
          {item.title}
        </h4>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* View project CTA */}
        <div className="mt-4 flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <span>View Case Study</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onViewProject }) => {
  const [items, setItems] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);

  useEffect(() => {
    apiService.getPortfolioItems().then(data => {
      if (data.length > 0) setItems(data);
    }).catch(() => {/* keep static fallback */});
  }, []);

  return (
    <section id="portfolio" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">Strategic Assets</h2>
          <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
            THE <span className="text-gold">WORK</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Engineering dominance across competitive sectors. Explore the blueprints of our most impactful deployments.
          </p>
        </div>

        {/* Portfolio Grid — responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item) => (
            <ScrollPreviewCard
              key={item.id}
              item={item}
              onClick={() => onViewProject(item)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
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
