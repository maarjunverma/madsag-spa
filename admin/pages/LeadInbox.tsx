
import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/adminApi';
import { StrapiLead } from '../../types';

interface LeadInboxProps {
  token: string;
}

const LeadInbox: React.FC<LeadInboxProps> = ({ token }) => {
  const [leads, setLeads] = useState<StrapiLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    adminApi.getLeads(token).then(data => {
      setLeads(data);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [token]);

  const filtered = leads.filter(l =>
    l.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.Inquiry_subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (iso: string) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white font-black text-2xl mb-0.5">Lead Inbox</h1>
          <p className="text-gray-500 text-sm font-medium">{leads.length} total leads received</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Read Only</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, email or subject..."
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

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-12 text-center">
            <i className="fa-solid fa-spinner fa-spin text-amber-500 text-2xl mb-3" />
            <p className="text-gray-500 text-sm font-medium">Loading leads...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-12 text-center">
            <i className="fa-solid fa-inbox text-gray-700 text-3xl mb-3" />
            <p className="text-gray-500 text-sm font-medium">
              {searchTerm ? 'No leads match your search.' : 'No leads yet. They will appear here once received.'}
            </p>
          </div>
        ) : (
          filtered.map(lead => (
            <div
              key={lead.id}
              className="bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl overflow-hidden transition-all"
            >
              {/* Lead header row */}
              <button
                className="w-full flex items-center gap-4 p-5 text-left"
                onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-yellow-600/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 font-black text-sm">
                    {lead.FullName?.[0]?.toUpperCase() || '?'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-white font-bold text-sm">{lead.FullName}</p>
                    <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                      {lead.Inquiry_subject}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-0.5 flex-wrap">
                    <span className="text-gray-500 text-xs font-medium">{lead.Email}</span>
                    <span className="text-gray-600 text-xs font-medium">{lead.Mobile_number}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-gray-600 text-[10px] font-medium">{formatDate(lead.createdAt)}</p>
                </div>

                <i className={`fa-solid fa-chevron-down text-gray-600 text-xs transition-transform flex-shrink-0 ${expanded === lead.id ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded details */}
              {expanded === lead.id && (
                <div className="border-t border-white/[0.06] px-5 pb-5 pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: 'Email', value: lead.Email, icon: 'fa-envelope', href: `mailto:${lead.Email}` },
                      { label: 'Phone', value: lead.Mobile_number, icon: 'fa-phone', href: `tel:${lead.Mobile_number}` },
                      { label: 'Website', value: lead.url || '—', icon: 'fa-globe', href: lead.url },
                    ].map(({ label, value, icon, href }) => (
                      <div key={label} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5">
                        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
                        {href && value !== '—' ? (
                          <a href={href} target="_blank" rel="noopener" className="text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors flex items-center gap-1.5">
                            <i className={`fa-solid ${icon} text-[10px]`} /> {value}
                          </a>
                        ) : (
                          <p className="text-gray-400 text-xs font-bold flex items-center gap-1.5">
                            <i className={`fa-solid ${icon} text-[10px] text-gray-600`} /> {value}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-2">Message</p>
                    <p className="text-gray-300 text-sm font-medium leading-relaxed whitespace-pre-wrap">{lead.Message}</p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`mailto:${lead.Email}?subject=Re: ${lead.Inquiry_subject} — MADSAG`}
                      className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all"
                    >
                      <i className="fa-solid fa-reply" /> Reply via Email
                    </a>
                    {lead.Mobile_number && (
                      <a
                        href={`https://wa.me/${lead.Mobile_number.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all"
                      >
                        <i className="fa-brands fa-whatsapp" /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadInbox;
