
import React from 'react';
import { SYSTEM_ARCH_DOCS } from '../constants';

const ArchitectureDocs: React.FC = () => {
  return (
    <section id="docs" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="glass p-8 md:p-12 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <i className="fa-solid fa-code text-blue-400 text-2xl"></i>
            <h2 className="text-3xl font-bold">Technical Documentation</h2>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <pre className="bg-black/50 p-6 rounded-xl overflow-x-auto text-sm md:text-base text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">
              {SYSTEM_ARCH_DOCS}
            </pre>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-blue-400 font-bold mb-4 uppercase tracking-wider text-xs">React Folder Structure</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><i className="fa-regular fa-folder mr-2"></i> components/ (UI Atoms & Molecules)</li>
                <li><i className="fa-regular fa-folder mr-2"></i> hooks/ (Business Logic & Observation)</li>
                <li><i className="fa-regular fa-folder mr-2"></i> services/ (API Interaction - Strapi)</li>
                <li><i className="fa-regular fa-file mr-2"></i> types.ts (Domain Models)</li>
                <li><i className="fa-regular fa-file mr-2"></i> constants.tsx (Global Configs)</li>
              </ul>
            </div>
            <div>
               <h3 className="text-blue-400 font-bold mb-4 uppercase tracking-wider text-xs">Tech Stack Overview</h3>
               <div className="flex flex-wrap gap-3">
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs">React 18+</span>
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs">Strapi CMS</span>
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs">MySQL 8</span>
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs">Tailwind CSS</span>
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs">Framer Motion Logic</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDocs;
