
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { PortfolioItem } from '../../types';
import { STRAPI_URL } from '../../constants';


interface PortfolioEditorProps {
  token: string;
}

const EMPTY_ITEM = {
  title: '',
  client: '',
  description: '',
  challenge: '',
  solution: '',
  result: '',
  tagsInput: '',
};

const Field: React.FC<{
  label: string; id: string; required?: boolean;
  value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; hint?: string;
}> = ({ label, id, required, value, onChange, placeholder, rows, hint }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-gray-400 text-xs font-black uppercase tracking-widest">
      {label} {required && <span className="text-amber-500">*</span>}
    </label>
    {rows ? (
      <textarea
        id={id}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 text-white text-sm font-medium placeholder-gray-700 focus:outline-none focus:border-amber-500/40 transition-all resize-y leading-relaxed"
      />
    ) : (
      <input
        id={id}
        type="text"
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 text-white text-sm font-medium placeholder-gray-700 focus:outline-none focus:border-amber-500/40 transition-all"
      />
    )}
    {hint && <p className="text-gray-700 text-[11px] font-medium">{hint}</p>}
  </div>
);

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ token }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState(EMPTY_ITEM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    adminApi.getPortfolioItems(token).then(items => {
      const item = items.find(i => String(i.strapiId) === id);
      if (item) {
        setForm({
          title: item.title,
          client: item.client,
          description: item.description,
          challenge: item.challenge,
          solution: item.solution,
          result: item.result,
          tagsInput: item.tags.join(', '),
        });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id, token]);

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const tags = form.tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const payload: Partial<PortfolioItem> = {
      title: form.title,
      client: form.client,
      description: form.description,
      challenge: form.challenge,
      solution: form.solution,
      result: form.result,
      tags,
    };
    try {
      if (isEdit) {
        await adminApi.updatePortfolioItem(token, Number(id), payload);
      } else {
        await adminApi.createPortfolioItem(token, payload);
      }
      setSaved(true);
      setTimeout(() => navigate('/admin/portfolio'), 800);
    } catch (err: any) {
      setError(err.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <i className="fa-solid fa-spinner fa-spin text-amber-500 text-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <button onClick={() => navigate('/admin/portfolio')} className="text-gray-500 hover:text-white transition-colors">
          <i className="fa-solid fa-arrow-left text-lg" />
        </button>
        <div>
          <h1 className="text-white font-black text-2xl">{isEdit ? 'Edit Project' : 'New Project'}</h1>
          <p className="text-gray-500 text-sm font-medium">{isEdit ? `Editing project #${id}` : 'Add a new portfolio showcase'}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-2 text-green-400 text-sm font-bold">
              <i className="fa-solid fa-circle-check" /> Saved!
            </span>
          )}
          <button
            form="portfolio-form"
            type="submit"
            id="save-project-btn"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-black font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
          >
            {saving ? <><i className="fa-solid fa-spinner fa-spin" /> Saving...</> : <><i className="fa-solid fa-floppy-disk" /> {isEdit ? 'Update' : 'Add Project'}</>}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm font-medium flex items-center gap-3">
          <i className="fa-solid fa-circle-exclamation" /> {error}
        </div>
      )}

      <form id="portfolio-form" onSubmit={handleSave} className="space-y-5">
        {/* Basic Info */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 space-y-5">
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-white/[0.06] pb-3">Basic Info</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field id="proj-title" label="Project Title" required value={form.title} onChange={v => set('title', v)} placeholder="e.g. Brand Identity Overhaul" />
            <Field id="proj-client" label="Client Name" required value={form.client} onChange={v => set('client', v)} placeholder="e.g. Arjun Enterprises" />
          </div>
          <Field id="proj-desc" label="Description" required value={form.description} onChange={v => set('description', v)} placeholder="What the project is about..." rows={3} />
          <Field
            id="proj-tags"
            label="Tags"
            value={form.tagsInput}
            onChange={v => set('tagsInput', v)}
            placeholder="Branding, Web Design, SEO"
            hint="Comma-separated list of tags"
          />
        </div>

        {/* Deep Dive */}
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 space-y-5">
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-white/[0.06] pb-3">Project Deep Dive</p>
          <Field id="proj-challenge" label="Challenge" value={form.challenge} onChange={v => set('challenge', v)} placeholder="What problem was the client facing?" rows={3} />
          <Field id="proj-solution" label="Solution" value={form.solution} onChange={v => set('solution', v)} placeholder="How did MADSAG solve it?" rows={3} />
          <Field id="proj-result" label="Result" value={form.result} onChange={v => set('result', v)} placeholder="Measurable outcomes achieved..." rows={3} />
        </div>

        {/* Image hint */}
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-5">
          <p className="text-amber-500/70 text-xs font-medium leading-relaxed">
            <i className="fa-solid fa-image text-amber-400 mr-2" />
            To attach images, upload them directly in the <strong className="text-amber-400">Strapi Media Library</strong> and link them to this entry via the Strapi admin at <a href={`${STRAPI_URL.endsWith('/') ? STRAPI_URL : STRAPI_URL + '/'}admin`} target="_blank" rel="noopener noreferrer" className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px] text-amber-400 hover:underline">{(() => {
              try {
                return new URL(STRAPI_URL).hostname;
              } catch {
                return STRAPI_URL.replace(/https?:\/\//, '').split('/')[0];
              }
            })()}/admin</a>.
          </p>

        </div>
      </form>
    </div>
  );
};

export default PortfolioEditor;
