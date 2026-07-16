
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MadsagLogo from '../components/MadsagLogo';
import { StrapiUser } from '../types';

interface AdminLayoutProps {
  user: StrapiUser;
  onLogout: () => void;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: 'fa-house', exact: true },
  { to: '/admin/blogs', label: 'Blog Posts', icon: 'fa-newspaper' },
  { to: '/admin/portfolio', label: 'Portfolio', icon: 'fa-briefcase' },
  { to: '/admin/leads', label: 'Lead Inbox', icon: 'fa-inbox' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ user, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#030712] flex">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#07090f] border-r border-white/[0.06] flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <MadsagLogo className="h-7 w-auto" />
            <div>
              <p className="text-white font-black text-xs">MADSAG</p>
              <p className="text-amber-500 font-bold text-[9px] uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group
                 ${isActive
                   ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                   : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'
                 }`
              }
            >
              {({ isActive }) => (
                <>
                  <i className={`fa-solid ${item.icon} w-4 text-center transition-colors ${isActive ? 'text-amber-400' : 'text-gray-600 group-hover:text-gray-400'}`} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] rounded-xl border border-white/[0.06] mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
              <span className="text-black font-black text-xs">
                {user.username?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-xs truncate">{user.username}</p>
              <p className="text-gray-600 text-[10px] truncate">{user.email}</p>
            </div>
          </div>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-white/[0.06] hover:border-red-500/20 text-xs font-bold uppercase tracking-widest transition-all"
          >
            <i className="fa-solid fa-right-from-bracket" /> Sign Out
          </button>
          <a
            href="/"
            target="_blank"
            className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-amber-400 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" /> View Site
          </a>
        </div>
      </aside>

      {/* ── Overlay (mobile) ────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-gray-500 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fa-solid fa-bars text-lg" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-gray-600 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Connected to Strapi
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
