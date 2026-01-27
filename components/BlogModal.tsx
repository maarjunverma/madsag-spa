
import React from 'react';
import { BlogPost } from '../types';

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-0 md:p-10">
      <div 
        className="absolute inset-0 bg-black/98 backdrop-blur-2xl animate-backdrop-fade" 
        onClick={onClose}
      ></div>
      
      <div className="relative glass w-full h-full max-w-5xl md:max-h-[90vh] overflow-y-auto md:rounded-[3rem] shadow-2xl border-white/5 animate-modal-enter">
        <button 
          onClick={onClose}
          className="sticky top-6 float-right mr-6 z-20 w-12 h-12 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="px-6 py-12 md:p-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter uppercase leading-[0.95]">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-12 py-6 border-y border-white/5">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-black text-black">M</div>
              <div>
                <p className="text-white font-bold text-sm">{post.author}</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Core Strategy Unit</p>
              </div>
            </div>

            <div className="rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl aspect-[16/9]">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div 
              className="prose prose-invert prose-amber max-w-none 
              prose-h2:text-3xl prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tight prose-h2:mb-6 prose-h2:mt-12
              prose-h3:text-xl prose-h3:font-bold prose-h3:text-amber-500 prose-h3:uppercase prose-h3:tracking-widest prose-h3:mt-8
              prose-p:text-gray-400 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
              prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white prose-blockquote:text-xl
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center text-center">
              <h4 className="text-2xl font-black mb-6 uppercase tracking-tight italic">Ready to engineer your growth?</h4>
              <button 
                onClick={onClose} // Typically would open contact but for demo closing
                className="px-12 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-amber-500/20"
              >
                Discuss This Strategy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
