
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { STRAPI_URL } from '../../constants';


interface DashboardHomeProps {
  token: string;
}

const StatCard: React.FC<{ icon: string; label: string; value: number | string; color: string; loading: boolean }> = ({ icon, label, value, color, loading }) => (
  <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 overflow-hidden group hover:border-white/[0.12] transition-all duration-300">
    <div className={`absolute top-0 right-0 w-32 h-32 ${color}/5 blur-[60px] rounded-full pointer-events-none`} />
    <div className={`w-12 h-12 rounded-xl ${color}/10 border border-white/[0.06] flex items-center justify-center mb-4`}>
      <i className={`fa-solid ${icon} ${color.replace('bg-', 'text-')} text-lg`} />
    </div>
    {loading ? (
      <div className="h-8 w-16 bg-white/[0.06] rounded-lg animate-pulse mb-1" />
    ) : (
      <p className="text-white font-black text-3xl mb-1">{value}</p>
    )}
    <p className="text-gray-500 text-sm font-bold">{label}</p>
  </div>
);

const QuickAction: React.FC<{ to: string; icon: string; label: string; description: string }> = ({ to, icon, label, description }) => (
  <Link
    to={to}
    className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/20 hover:bg-amber-500/5 rounded-2xl transition-all duration-200 group"
  >
    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
      <i className={`fa-solid ${icon} text-amber-400 text-sm`} />
    </div>
    <div>
      <p className="text-white font-bold text-sm group-hover:text-amber-400 transition-colors">{label}</p>
      <p className="text-gray-600 text-xs font-medium">{description}</p>
    </div>
    <i className="fa-solid fa-chevron-right text-gray-700 text-xs ml-auto group-hover:text-amber-500 transition-colors" />
  </Link>
);

const DashboardHome: React.FC<DashboardHomeProps> = ({ token }) => {
  const [stats, setStats] = useState({ blogs: 0, projects: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats(token).then(s => {
      setStats(s);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-white font-black text-3xl mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm font-medium">Welcome back. Here's an overview of your content.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon="fa-newspaper" label="Blog Posts" value={stats.blogs} color="bg-blue-500" loading={loading} />
        <StatCard icon="fa-briefcase" label="Portfolio Projects" value={stats.projects} color="bg-purple-500" loading={loading} />
        <StatCard icon="fa-inbox" label="Leads Received" value={stats.leads} color="bg-amber-500" loading={loading} />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickAction to="/admin/blogs/new" icon="fa-pen-nib" label="Write New Blog Post" description="Publish an article or update to the journal" />
          <QuickAction to="/admin/portfolio/new" icon="fa-plus" label="Add Portfolio Project" description="Showcase a new client project" />
          <QuickAction to="/admin/blogs" icon="fa-list" label="Manage Blog Posts" description="Edit or delete existing posts" />
          <QuickAction to="/admin/leads" icon="fa-inbox" label="View Lead Inbox" description="See all quote form submissions" />
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-5 flex items-start gap-4">
        <i className="fa-solid fa-circle-info text-amber-400 mt-0.5" />
        <div>
          <p className="text-amber-400 font-bold text-sm mb-1">
            Connected to <code className="font-mono text-xs bg-amber-500/10 px-1.5 py-0.5 rounded">
              {(() => {
                try {
                  return new URL(STRAPI_URL).hostname;
                } catch {
                  return STRAPI_URL.replace(/https?:\/\//, '').split('/')[0];
                }
              })()}
            </code>
          </p>
          <p className="text-amber-500/60 text-xs font-medium leading-relaxed">
            Content you publish here will automatically appear on the live site. Blog posts and portfolio items are served dynamically from Strapi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
