
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { adminApi } from '../../services/adminApi';
import { BlogPost } from '../../types';

interface BlogEditorProps {
  token: string;
}

const EMPTY_POST = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  category: 'Strategy',
  readTime: '5 min read',
};

const CATEGORIES = ['Strategy', 'Design', 'Marketing', 'Development', 'Case Study', 'Opinion', 'General'];

const BlogEditor: React.FC<BlogEditorProps> = ({ token }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState(EMPTY_POST);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    adminApi.getBlogs(token).then(posts => {
      const post = posts.find(p => String(p.strapiId) === id);
      if (post) {
        setForm({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          category: post.category,
          readTime: post.readTime,
        });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id, token]);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (isEdit) {
        await adminApi.updateBlog(token, Number(id), form);
      } else {
        await adminApi.createBlog(token, form);
      }
      setSaved(true);
      setTimeout(() => navigate('/admin/blogs'), 800);
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
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <button onClick={() => navigate('/admin/blogs')} className="text-gray-500 hover:text-white transition-colors">
          <i className="fa-solid fa-arrow-left text-lg" />
        </button>
        <div>
          <h1 className="text-white font-black text-2xl">{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h1>
          <p className="text-gray-500 text-sm font-medium">{isEdit ? `Editing post #${id}` : 'Write and publish a new article'}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-2 text-green-400 text-sm font-bold">
              <i className="fa-solid fa-circle-check" /> Saved!
            </span>
          )}
          <button
            form="blog-form"
            type="submit"
            id="save-blog-btn"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-black font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
          >
            {saving ? <><i className="fa-solid fa-spinner fa-spin" /> Saving...</> : <><i className="fa-solid fa-floppy-disk" /> {isEdit ? 'Update' : 'Publish'}</>}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm font-medium flex items-center gap-3">
          <i className="fa-solid fa-circle-exclamation" /> {error}
        </div>
      )}

      <form id="blog-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-black uppercase tracking-widest">Title *</label>
            <input
              required
              type="text"
              id="blog-title"
              placeholder="Enter a compelling title..."
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 text-white text-lg font-bold placeholder-gray-700 focus:outline-none focus:border-amber-500/40 transition-all"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-black uppercase tracking-widest">Excerpt *</label>
            <textarea
              required
              id="blog-excerpt"
              placeholder="Short summary displayed on the blog listing page..."
              value={form.excerpt}
              onChange={e => handleChange('excerpt', e.target.value)}
              rows={2}
              className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 text-white text-sm font-medium placeholder-gray-700 focus:outline-none focus:border-amber-500/40 transition-all resize-none"
            />
          </div>

          {/* Content — write / preview toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-gray-400 text-xs font-black uppercase tracking-widest">Content *</label>
              <div className="flex bg-white/[0.03] border border-white/[0.07] rounded-lg p-1 gap-1">
                {(['write', 'preview'] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${
                      activeTab === tab
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'text-gray-600 hover:text-gray-400'
                    }`}
                  >
                    {tab === 'write' ? <><i className="fa-solid fa-pen mr-1.5" />Write</> : <><i className="fa-solid fa-eye mr-1.5" />Preview</>}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'write' ? (
              <textarea
                required
                id="blog-content"
                placeholder={`Write in Markdown...\n\n# Heading 1\n## Heading 2\n\n**bold**, *italic*, [link](url)\n\n- List item\n- Another item`}
                value={form.content}
                onChange={e => handleChange('content', e.target.value)}
                rows={20}
                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 text-white text-sm font-mono placeholder-gray-700 focus:outline-none focus:border-amber-500/40 transition-all resize-y leading-relaxed"
              />
            ) : (
              <div className="min-h-[420px] bg-white/[0.02] border border-white/[0.07] rounded-xl p-6 prose prose-invert prose-amber max-w-none text-sm leading-relaxed overflow-auto">
                {form.content ? (
                  <ReactMarkdown>{form.content}</ReactMarkdown>
                ) : (
                  <p className="text-gray-700 italic">Nothing to preview yet. Start writing to see a preview.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right — Meta */}
        <div className="space-y-5">
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 space-y-5">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-white/[0.06] pb-3">Post Settings</p>

            {/* Author */}
            <div className="space-y-2">
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest">Author *</label>
              <input
                required
                type="text"
                id="blog-author"
                placeholder="e.g. MADSAG Team"
                value={form.author}
                onChange={e => handleChange('author', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-white text-sm font-medium placeholder-gray-700 focus:outline-none focus:border-amber-500/40 transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest">Category *</label>
              <select
                id="blog-category"
                value={form.category}
                onChange={e => handleChange('category', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-amber-500/40 transition-all appearance-none cursor-pointer"
              >
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#07090f]">{c}</option>)}
              </select>
            </div>

            {/* Read Time */}
            <div className="space-y-2">
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest">Read Time</label>
              <input
                type="text"
                id="blog-readtime"
                placeholder="e.g. 5 min read"
                value={form.readTime}
                onChange={e => handleChange('readTime', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-white text-sm font-medium placeholder-gray-700 focus:outline-none focus:border-amber-500/40 transition-all"
              />
            </div>

            {/* Word count */}
            <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05]">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-600">Words</span>
                <span className="text-gray-400">{form.content.split(/\s+/).filter(Boolean).length}</span>
              </div>
              <div className="flex justify-between text-xs font-medium mt-1">
                <span className="text-gray-600">Characters</span>
                <span className="text-gray-400">{form.content.length}</span>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4">
            <p className="text-amber-500/70 text-xs font-medium leading-relaxed">
              <i className="fa-solid fa-lightbulb text-amber-400 mr-2" />
              Content supports full <strong className="text-amber-400">Markdown</strong>: headings, bold, links, lists, code blocks and more.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
