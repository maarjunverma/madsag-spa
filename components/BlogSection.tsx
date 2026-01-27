
import React from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onReadBlog: (post: BlogPost) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onReadBlog }) => {
  return (
    <section id="blog" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">Strategic Intelligence</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              THE MADSAG <span className="text-gold">JOURNAL</span>
            </h3>
            <p className="text-gray-400 mt-6 text-lg">
              Technical post-mortems and growth strategies from the front lines of digital engineering.
            </p>
          </div>
          <button className="px-8 py-3 glass rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all border-white/5">
            View All Insights
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id} 
              className="group cursor-pointer flex flex-col h-full"
              onClick={() => onReadBlog(post)}
            >
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 glass border-white/5">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">
                  <span>{post.date}</span>
                  <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                  <span>{post.readTime}</span>
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors leading-tight">
                  {post.title}
                </h4>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                  Read Analysis <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
