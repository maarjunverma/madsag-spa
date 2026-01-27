
import React from 'react';
import { Service, PortfolioItem, ServiceType } from '../types';

interface ServiceSectionProps {
  service: Service;
  isActive: boolean;
  onEnquire: () => void;
  onViewPortfolio: (item: PortfolioItem) => void;
  onViewDetails: (service: Service) => void;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ service, isActive, onEnquire, onViewPortfolio, onViewDetails }) => {
  const isLiveViewService = [
    ServiceType.WEBSITE_DESIGN,
    ServiceType.SHOPIFY,
    ServiceType.LANDING_PAGE
  ].includes(service.name);

  return (
    <section 
      id={service.id} 
      className={`min-h-screen flex flex-col justify-center py-24 px-6 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-10'}`}
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
              <i className={`${service.icon} text-3xl text-white`}></i>
            </div>
            <span className="text-[10px] px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full font-black uppercase tracking-widest">Active Engineering</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase text-white">{service.name}</h2>
          
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {service.description}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <i className="fa-solid fa-check text-amber-500"></i>
                <span className="text-gray-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onViewDetails(service)}
              className={`px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest text-white transition-all bg-gradient-to-r ${service.gradient} hover:scale-105 shadow-xl shadow-amber-500/20`}
            >
              Explore Architecture
            </button>
            <button 
              onClick={onEnquire}
              className="px-8 py-4 glass border-white/10 rounded-xl font-black uppercase text-xs tracking-widest text-white hover:bg-white/5 transition-all"
            >
              Start Conversation
            </button>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative group cursor-pointer" onClick={() => onViewDetails(service)}>
          <div className={`absolute -inset-4 bg-gradient-to-r ${service.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`}></div>
          <div className="relative glass rounded-3xl overflow-hidden shadow-2xl aspect-video md:aspect-square flex items-center justify-center border-white/5 group-hover:border-amber-500/30 transition-all">
            <div className="text-center p-8 w-full h-full relative">
               <img src={`https://picsum.photos/seed/${service.id}/1200/1200`} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" alt={service.name} />
               <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-6 border-white/20 group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-maximize text-white text-xl"></i>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-black">Strategic Pipeline Deep Dive</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
