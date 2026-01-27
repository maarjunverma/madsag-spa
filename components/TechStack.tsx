
import React from 'react';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section id="tech-stack" className="py-24 px-6 bg-gray-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Mastering the <span className="text-blue-500">Tech Stack</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We leverage the industry's most powerful and reliable technologies to ensure your project is fast, secure, and scalable.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {TECH_STACK.map((tech) => (
            <div 
              key={tech.name} 
              className="glass p-8 rounded-3xl border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-2 group flex flex-col items-center justify-center text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 transition-all group-hover:bg-white/10 ${tech.color}`}>
                <i className={`${tech.icon} text-3xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{tech.name}</h3>
            </div>
          ))}
        </div>

        <div className="mt-20 glass p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Custom Solutions for Unique Challenges</h3>
              <p className="text-gray-400 leading-relaxed">
                Whether it's a high-performance e-commerce engine or a scalable enterprise SaaS, 
                our team selects the optimal framework to match your business requirements and budget.
              </p>
            </div>
            <div className="flex -space-x-4">
              {['fa-solid fa-bolt', 'fa-solid fa-shield-halved', 'fa-solid fa-chart-simple'].map((icon, i) => (
                <div key={i} className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center border-4 border-[#030712] text-white">
                  <i className={icon}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
