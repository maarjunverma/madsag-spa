
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { BlogPost } from '../../types';

interface BlogListProps {
  token: string;
}

const BlogList: React.FC<BlogListProps> = ({ token }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getBlogs(token);
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, [token]);

  const handleDelete = async (post: BlogPost) => {
    if (!post.strapiId) return;
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeletingId(post.strapiId);
    try {
      await adminApi.deleteBlog(token, post.strapiId);
      setPosts(prev => prev.filter(p => p.strapiId !== post.strapiId));
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white font-black text-2xl mb-0.5">Blog Posts</h1>
          <p className="text-gray-500 text-sm font-medium">{posts.length} total posts</p>
        </div>
        <Link
          to="/admin/blogs/new"
          id="new-blog-btn"
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02]"
        >
          <i className="fa-solid fa-plus" /> New Post
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-11 pr-4 py-3 text-white text-sm font-medium placeholder-gray-700 focus:outline-none focus:border-amber-500/30 transition-all"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm font-medium flex items-center gap-3">
          <i className="fa-solid fa-circle-exclamation" /> {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <i className="fa-solid fa-spinner fa-spin text-amber-500 text-2xl mb-3" />
            <p className="text-gray-500 text-sm font-medium">Loading posts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <i className="fa-solid fa-newspaper text-gray-700 text-3xl mb-3" />
            <p className="text-gray-500 text-sm font-medium mb-4">
              {searchTerm ? 'No posts match your search.' : 'No blog posts yet.'}
            </p>
            {!searchTerm && (
              <Link to="/admin/blogs/new" className="text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
                Write your first post →
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-6 py-4 text-left text-gray-600 text-[10px] font-black uppercase tracking-widest">Title</th>
                <th className="px-6 py-4 text-left text-gray-600 text-[10px] font-black uppercase tracking-widest hidden sm:table-cell">Category</th>
                <th className="px-6 py-4 text-left text-gray-600 text-[10px] font-black uppercase tracking-widest hidden md:table-cell">Date</th>
                <th className="px-6 py-4 text-right text-gray-600 text-[10px] font-black uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post, i) => (
                <tr
                  key={post.id}
                  className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors last:border-0`}
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-bold text-sm leading-tight line-clamp-1">{post.title}</p>
                    <p className="text-gray-600 text-xs font-medium mt-0.5 line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs font-medium hidden md:table-cell">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/blogs/${post.strapiId}`}
                        className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] hover:border-amber-500/30 hover:bg-amber-500/10 flex items-center justify-center text-gray-500 hover:text-amber-400 transition-all"
                        title="Edit"
                      >
                        <i className="fa-solid fa-pen text-[11px]" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post)}
                        disabled={deletingId === post.strapiId}
                        className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] hover:border-red-500/30 hover:bg-red-500/10 flex items-center justify-center text-gray-500 hover:text-red-400 transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === post.strapiId
                          ? <i className="fa-solid fa-spinner fa-spin text-[11px]" />
                          : <i className="fa-solid fa-trash text-[11px]" />
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BlogList;
