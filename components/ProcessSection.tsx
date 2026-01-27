
import React from 'react';
import { PROCESS_STEPS } from '../constants';

const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 px-6 relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">The Methodology</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
            ABOUT OUR <span className="text-gold">EXECUTION</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A battle-tested methodology designed to deliver consistent, high-impact results for every high-stakes project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connector line for desktop */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-amber-500/30 to-transparent z-0"></div>
              )}
              
              <div className="relative z-10 glass p-8 rounded-3xl h-full border-white/5 group-hover:border-amber-500/30 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-amber-600/20 rounded-2xl flex items-center justify-center mb-6 text-amber-500 text-2xl font-bold">
                  {step.id}
                </div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-3 text-white uppercase tracking-tight">
                  <i className={`${step.icon} text-amber-500 text-lg`}></i>
                  {step.title}
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
