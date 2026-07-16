
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { PortfolioItem } from '../../types';

interface PortfolioListProps {
  token: string;
}

const PortfolioList: React.FC<PortfolioListProps> = ({ token }) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getPortfolioItems(token);
      setItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, [token]);

  const handleDelete = async (item: PortfolioItem) => {
    if (!item.strapiId) return;
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setDeletingId(item.strapiId);
    try {
      await adminApi.deletePortfolioItem(token, item.strapiId);
      setItems(prev => prev.filter(i => i.strapiId !== item.strapiId));
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white font-black text-2xl mb-0.5">Portfolio Projects</h1>
          <p className="text-gray-500 text-sm font-medium">{items.length} total projects</p>
        </div>
        <Link
          to="/admin/portfolio/new"
          id="new-project-btn"
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
        >
          <i className="fa-solid fa-plus" /> New Project
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none" />
        <input
          type="text"
          placeholder="Search projects or clients..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-11 pr-4 py-3 text-white text-sm font-medium placeholder-gray-700 focus:outline-none focus:border-amber-500/30 transition-all"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm font-medium flex items-center gap-3">
          <i className="fa-solid fa-circle-exclamation" /> {error}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center">
          <i className="fa-solid fa-spinner fa-spin text-amber-500 text-2xl mb-3" />
          <p className="text-gray-500 text-sm font-medium">Loading projects...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-12 text-center">
          <i className="fa-solid fa-briefcase text-gray-700 text-3xl mb-3" />
          <p className="text-gray-500 text-sm font-medium mb-4">
            {searchTerm ? 'No projects match your search.' : 'No portfolio projects yet.'}
          </p>
          {!searchTerm && (
            <Link to="/admin/portfolio/new" className="text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
              Add your first project →
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-5 transition-all group"
            >
              {/* Thumbnail or placeholder */}
              <div className="w-full h-32 rounded-xl overflow-hidden mb-4 bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <i className="fa-solid fa-image text-gray-700 text-2xl" />
                )}
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs font-medium mt-0.5">{item.client}</p>
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-white/[0.04] text-gray-500 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border border-white/[0.06]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <Link
                    to={`/admin/portfolio/${item.strapiId}`}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] hover:border-amber-500/30 hover:bg-amber-500/10 flex items-center justify-center text-gray-500 hover:text-amber-400 transition-all"
                    title="Edit"
                  >
                    <i className="fa-solid fa-pen text-[11px]" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item.strapiId}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] hover:border-red-500/30 hover:bg-red-500/10 flex items-center justify-center text-gray-500 hover:text-red-400 transition-all disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === item.strapiId
                      ? <i className="fa-solid fa-spinner fa-spin text-[11px]" />
                      : <i className="fa-solid fa-trash text-[11px]" />
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
