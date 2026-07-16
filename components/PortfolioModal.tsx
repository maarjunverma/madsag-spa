
import React, { useState, useRef, useEffect } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

/** Collapsible accordion panel */
const AccordionPanel: React.FC<{
  icon: string;
  iconColor: string;
  label: string;
  content: string;
  defaultOpen?: boolean;
}> = ({ icon, iconColor, label, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>(defaultOpen ? 'auto' : '0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className="border border-white/[0.06] rounded-2xl overflow-hidden transition-colors duration-300 hover:border-amber-500/20 bg-white/[0.02]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <div className="flex items-center gap-3">
          <i className={`${icon} ${iconColor} text-sm`}></i>
          <span className="text-white font-black uppercase text-[10px] tracking-[0.2em]">{label}</span>
        </div>
        <i className={`fa-solid fa-chevron-down text-gray-500 text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-400 ease-in-out"
      >
        <div ref={contentRef} className="px-6 pb-6">
          <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">{content}</p>
        </div>
      </div>
    </div>
  );
};

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, isOpen, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !item) return null;

  const previewSrc = item.fullPageImage || item.images[0] || item.thumbnail;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-backdrop-fade"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative glass w-full h-full max-w-6xl md:max-h-[95vh] overflow-y-auto md:rounded-[2.5rem] shadow-2xl border-white/5 animate-modal-enter">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 z-20 w-11 h-11 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="p-6 md:p-12 lg:p-16">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-black text-amber-500 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>

          {/* Title & Client */}
          <p className="text-amber-500 font-black text-[10px] uppercase tracking-widest mb-2">{item.client}</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tighter uppercase leading-[0.95]">{item.title}</h1>

          {/* Live URL */}
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-xs font-medium transition-colors mb-8"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              {item.liveUrl}
            </a>
          )}

          {/* ── Two-column layout: Preview + Details ── */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Left: Scrollable full-page preview in browser frame */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a14] shadow-2xl sticky top-4">
                {/* Browser bar */}
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

                {/* Scrollable preview */}
                <div
                  ref={scrollContainerRef}
                  className="h-[500px] md:h-[600px] overflow-y-auto no-scrollbar"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  <img
                    src={previewSrc}
                    alt={`${item.title} full page design`}
                    className="w-full h-auto object-cover object-top"
                  />
                </div>

                {/* Scroll hint */}
                <div className="flex items-center justify-center gap-2 py-2.5 bg-[#111119] border-t border-white/[0.06] text-gray-600 text-[9px] font-black uppercase tracking-widest">
                  <i className="fa-solid fa-computer-mouse text-[10px]"></i>
                  Scroll to explore design
                </div>
              </div>
            </div>

            {/* Right: Project details with collapsible sections */}
            <div className="order-1 lg:order-2 space-y-4">
              {/* Project Overview */}
              <div className="mb-6">
                <h2 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-diagram-project text-amber-500 text-xs"></i>
                  Project Overview
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>

              {/* Collapsible Accordion Sections — stacked vertically */}
              <AccordionPanel
                icon="fa-solid fa-bullseye"
                iconColor="text-red-500"
                label="The Conflict"
                content={item.challenge}
                defaultOpen={true}
              />

              <AccordionPanel
                icon="fa-solid fa-microchip"
                iconColor="text-amber-500"
                label="Engineered Solution"
                content={item.solution}
              />

              <AccordionPanel
                icon="fa-solid fa-chart-line"
                iconColor="text-green-500"
                label="Measurable ROI"
                content={item.result}
              />

              {/* Stats row if liveUrl exists */}
              {item.liveUrl && (
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-[1.02] transition-all shadow-2xl shadow-amber-500/20"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    Visit Live Site
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Bottom close button */}
          <div className="flex justify-center pt-12 mt-8 border-t border-white/5">
            <button
              onClick={onClose}
              className="px-12 py-4 border border-white/10 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
