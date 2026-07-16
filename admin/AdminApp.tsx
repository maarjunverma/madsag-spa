
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import DashboardHome from './pages/DashboardHome';
import BlogList from './pages/BlogList';
import BlogEditor from './pages/BlogEditor';
import PortfolioList from './pages/PortfolioList';
import PortfolioEditor from './pages/PortfolioEditor';
import LeadInbox from './pages/LeadInbox';

const AdminApp: React.FC = () => {
  const { isAuthenticated, user, token, login, logout } = useAdminAuth();
  const [, forceUpdate] = useState(0);

  if (!isAuthenticated || !user || !token) {
    return (
      <AdminLogin
        onSuccess={() => forceUpdate(n => n + 1)}
      />
    );
  }

  return (
    <AdminLayout user={user} onLogout={logout}>
      <Routes>
        <Route path="/" element={<DashboardHome token={token} />} />
        <Route path="/blogs" element={<BlogList token={token} />} />
        <Route path="/blogs/new" element={<BlogEditor token={token} />} />
        <Route path="/blogs/:id" element={<BlogEditor token={token} />} />
        <Route path="/portfolio" element={<PortfolioList token={token} />} />
        <Route path="/portfolio/new" element={<PortfolioEditor token={token} />} />
        <Route path="/portfolio/:id" element={<PortfolioEditor token={token} />} />
        <Route path="/leads" element={<LeadInbox token={token} />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminApp;
