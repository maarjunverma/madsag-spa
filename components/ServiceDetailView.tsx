
import React from 'react';
import { Service } from '../types';

interface ServiceDetailViewProps {
  service: Service;
  onClose: () => void;
  onEnquire: (planName?: string) => void;
}

const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service, onClose, onEnquire }) => {
  return (
    <div className="fixed inset-0 z-[150] bg-[#020617] overflow-y-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-20 pointer-events-none -z-10`}></div>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-r ${service.gradient} opacity-10 blur-[180px] rounded-full -z-20`}></div>

      {/* Persistent Nav */}
      <div className="sticky top-0 z-50 glass px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center`}>
            <i className={`${service.icon} text-white text-sm md:text-base`}></i>
          </div>
          <span className="font-black text-lg md:text-xl tracking-tighter uppercase whitespace-nowrap">{service.name}</span>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90"
        >
          <i className="fa-solid fa-xmark text-lg md:text-xl"></i>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            <section>
              <h1 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] uppercase tracking-tighter">
                {service.name} <br className="hidden md:block"/> 
                <span className="text-gold">CORE ARCHITECTURE</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl font-medium">
                {service.fullDescription}
              </p>
            </section>

            {/* Service Packages - Tiered Style */}
            {service.packages && (
              <section>
                <div className="mb-10 md:mb-12">
                  <h2 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">Investment Matrix</h2>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">STRATEGIC <span className="text-gold">TIERS</span></h3>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {service.packages.map((pkg, idx) => (
                    <div 
                      key={idx} 
                      className={`relative glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col transition-all duration-500 border-white/5 group hover:border-amber-500/30 ${
                        pkg.recommended ? 'ring-2 ring-amber-500/20 xl:scale-105 bg-white/[0.03]' : ''
                      }`}
                    >
                      {pkg.recommended && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-amber-500 rounded-full text-[9px] font-black uppercase tracking-widest text-black shadow-lg">
                          Recommended
                        </div>
                      )}

                      <div className="mb-6 md:mb-8">
                        <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-2">{pkg.name}</h4>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">{pkg.price}</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed font-medium">{pkg.description}</p>
                      </div>

                      <ul className="space-y-4 mb-8 md:mb-10 flex-grow">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs font-bold text-gray-400">
                            <i className="fa-solid fa-circle-check text-amber-500/50 mt-0.5"></i>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-6 border-t border-white/5 space-y-4">
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-600">
                          <span className="flex items-center gap-2"><i className="fa-solid fa-clock"></i> {pkg.deliveryTime}</span>
                          <span className="flex items-center gap-2"><i className="fa-solid fa-rotate"></i> {pkg.revisions}</span>
                        </div>
                        <button 
                          onClick={() => onEnquire(pkg.name)}
                          className={`w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                            pkg.recommended 
                            ? `bg-gradient-to-r ${service.gradient} text-white shadow-xl shadow-amber-500/20 hover:scale-[1.02]` 
                            : 'glass border-white/10 text-white hover:bg-white/10'
                          }`}
                        >
                          Deploy {pkg.name.split(' ')[0]}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Strategic Roadmap */}
            <section className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl"></div>
              <h2 className="text-xl md:text-2xl font-black mb-10 flex items-center gap-3 uppercase">
                <i className="fa-solid fa-map text-amber-500"></i>
                STRATEGIC <br className="md:hidden" /> ROADMAP
              </h2>
              
              <div className="space-y-8">
                {service.roadmap.map((item, idx) => (
                  <div key={idx} className="flex gap-4 md:gap-6 items-start group">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
                        item.status === 'Complete' ? 'bg-amber-500 border-amber-500' : 
                        item.status === 'In Progress' ? 'border-amber-500 animate-pulse' : 'border-white/20'
                      }`}>
                        {item.status === 'Complete' && <i className="fa-solid fa-check text-[10px] text-black"></i>}
                      </div>
                      {idx < service.roadmap.length - 1 && <div className="w-px h-16 md:h-20 bg-white/10 my-2"></div>}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="text-[10px] md:text-xs font-black uppercase text-amber-500 tracking-widest">{item.phase}</span>
                        <span className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                          item.status === 'Complete' ? 'bg-green-500/20 text-green-500' : 
                          item.status === 'In Progress' ? 'bg-amber-500/20 text-amber-500' : 'bg-white/5 text-gray-500'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base font-bold group-hover:text-white transition-colors">{item.objective}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Metrics */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 lg:top-32 space-y-8">
              <div className="glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-white/5">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-6 md:mb-8">Performance Metrics</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
                  {service.stats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-gray-500 text-[9px] md:text-[10px] uppercase font-black tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 md:mt-12 pt-8 border-t border-white/10">
                  <button 
                    onClick={() => onEnquire()}
                    className={`w-full py-4 md:py-5 bg-gradient-to-r ${service.gradient} text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105`}
                  >
                    Custom Briefing
                  </button>
                </div>
              </div>

              <div className="glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-white/5">
                <p className="text-xs font-bold text-gray-400 leading-relaxed italic">
                  "Our engineering standards for {service.name} are designed for market dominance. Every deployment is audited by our core strategy team."
                </p>
                <div className="mt-6 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-black text-black text-[10px]">M</div>
                   <span className="text-[10px] font-black uppercase tracking-widest">MADSAG UNIT</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetailView;
