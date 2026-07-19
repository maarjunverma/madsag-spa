
import React, { useState } from 'react';
import { TECH_STACK } from '../constants';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Databases', 'Platforms'] as const;
type Category = typeof CATEGORIES[number];

const CATEGORY_META: Record<string, { icon: string; desc: string; color: string }> = {
  Frontend: { icon: 'fa-solid fa-display',       desc: 'UI & Client-Side',    color: 'text-cyan-400'    },
  Backend:  { icon: 'fa-solid fa-server',         desc: 'APIs & Logic',        color: 'text-green-400'   },
  Databases:{ icon: 'fa-solid fa-database',       desc: 'Storage & Cache',     color: 'text-amber-400'   },
  Platforms:{ icon: 'fa-solid fa-cloud',          desc: 'Deploy & Infra',      color: 'text-purple-400'  },
};

const TechStack: React.FC = () => {
  const [active, setActive] = useState<Category>('All');

  const filtered = active === 'All'
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.category === active);

  return (
    <section id="tech-stack" className="py-28 px-6 relative overflow-hidden bg-[#030712]">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-amber-500 font-black text-[11px] uppercase tracking-[0.35em] mb-4">Our Arsenal</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
            The <span className="text-gold">Tech Stack</span> We Master
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            From pixel-perfect frontends to fault-tolerant databases — we command the full spectrum of modern web engineering.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? TECH_STACK.length : TECH_STACK.filter(t => t.category === cat).length;
            const isActive = active === cat;
            return (
              <button
                key={cat}
                id={`tech-tab-${cat.toLowerCase()}`}
                onClick={() => setActive(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-[0_0_24px_rgba(251,191,36,0.3)]'
                    : 'bg-white/[0.04] border border-white/8 text-gray-400 hover:border-amber-500/20 hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                {cat !== 'All' && (
                  <i className={`${CATEGORY_META[cat].icon} text-[10px] ${isActive ? 'text-black' : CATEGORY_META[cat].color}`} />
                )}
                {cat}
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${isActive ? 'bg-black/20 text-black' : 'bg-white/8 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category description strip */}
        {active !== 'All' && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/8 text-gray-500 text-[11px] font-bold tracking-widest uppercase">
              <i className={`${CATEGORY_META[active].icon} ${CATEGORY_META[active].color} text-xs`} />
              {CATEGORY_META[active].desc}
            </div>
          </div>
        )}

        {/* Tech Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4">
          {filtered.map((tech) => (
            <div
              key={tech.name}
              className="group relative flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-amber-500/25 hover:bg-white/[0.05] hover:-translate-y-1.5 transition-all duration-300 cursor-default"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-amber-500/[0.06] to-transparent pointer-events-none" />

              <div className={`text-2xl md:text-3xl mb-3 transition-all duration-300 group-hover:scale-110 ${tech.color}`}>
                <i className={tech.icon} />
              </div>
              <span className="text-[10px] md:text-[11px] font-black text-gray-400 group-hover:text-white transition-colors text-center leading-tight tracking-wide uppercase">
                {tech.name}
              </span>
              <span className="text-[8px] text-gray-700 font-bold uppercase tracking-widest mt-1 group-hover:text-gray-500 transition-colors">
                {tech.category}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom capability bar */}
        <div className="mt-16 p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-white font-black text-xl mb-2 tracking-tight">
              Need a <span className="text-gold">custom stack?</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              We don't force a stack on your project. Our engineers evaluate your requirements and select the optimal combination for performance, cost, and scalability.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {[
              { icon: 'fa-solid fa-bolt',             label: 'Performance-First' },
              { icon: 'fa-solid fa-shield-halved',    label: 'Security-Ready'    },
              { icon: 'fa-solid fa-arrows-up-down',   label: 'Fully Scalable'   },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.05] text-[10px] font-black uppercase tracking-widest text-gray-400">
                <i className={`${b.icon} text-amber-500 text-xs`} />
                {b.label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;
