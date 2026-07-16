import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import MadsagLogo from './MadsagLogo';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService: string;
  preselectedPlan?: string;
}

interface LeadFormData {
  FullName: string;
  Email: string;
  Mobile_number: string;
  Inquiry_subject: string;
  url: string;
  Message: string;
}

const SERVICES_LIST = [
  { value: 'Website Development', label: '🌐 Website Development' },
  { value: 'Performance Marketing', label: '📈 Performance Marketing' },
  { value: 'E-commerce / Shopify', label: '🛒 E-commerce / Shopify' },
  { value: 'Landing Page', label: '🚀 Landing Page Funnel' },
  { value: 'SEO Dominance', label: '🔍 SEO Dominance' },
  { value: 'Other', label: '💬 Other / Not Sure' },
];

const BUDGET_LIST = [
  { value: '₹25k – ₹75k', label: '₹25k – ₹75k' },
  { value: '₹75k – ₹2L', label: '₹75k – ₹2L' },
  { value: '₹2L – ₹5L', label: '₹2L – ₹5L' },
  { value: '₹5L+', label: '₹5L+ (Enterprise)' },
];

const STORAGE_KEY = 'madsag_lead_draft';

const normalizeService = (raw: string): string => {
  if (!raw) return '';
  const lower = raw.toLowerCase().replace(/-/g, ' ');
  if (lower.includes('website') || lower.includes('web')) return 'Website Development';
  if (lower.includes('marketing') || lower.includes('performance')) return 'Performance Marketing';
  if (lower.includes('ecommerce') || lower.includes('shopify') || lower.includes('e commerce')) return 'E-commerce / Shopify';
  if (lower.includes('landing')) return 'Landing Page';
  if (lower.includes('seo')) return 'SEO Dominance';
  return '';
};

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService, preselectedPlan }) => {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState('');
  const [formData, setFormData] = useState<LeadFormData>({
    FullName: '',
    Email: '',
    Mobile_number: '',
    Inquiry_subject: '',
    url: '',
    Message: '',
  });
  const [status, setStatus] = useState<{ loading: boolean; error: string | null; success: boolean }>({
    loading: false,
    error: null,
    success: false,
  });

  // Load draft & preselect service
  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setStatus({ loading: false, error: null, success: false });

    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...parsed }));
        if (parsed.budget) setBudget(parsed.budget);
      } catch (_) {}
    }

    const normalized = normalizeService(preselectedService);
    if (normalized) {
      setFormData(prev => ({ ...prev, Inquiry_subject: normalized }));
    }
  }, [isOpen, preselectedService]);

  // Auto-save draft
  useEffect(() => {
    if (isOpen && !status.success) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...formData, budget }));
    }
  }, [formData, budget, isOpen, status.success]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buildMessage = () => {
    let msg = formData.Message || '';
    if (budget) msg = `Budget: ${budget}\n\n${msg}`;
    if (preselectedPlan) msg = `Plan Interest: ${preselectedPlan}\n${msg}`;
    return msg.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      await apiService.submitLead({
        FullName: formData.FullName.trim(),
        Email: formData.Email.trim(),
        Mobile_number: formData.Mobile_number.replace(/\D/g, ''),
        Inquiry_subject: formData.Inquiry_subject,
        url: formData.url?.trim() || '',
        Message: buildMessage(),
      } as any);

      setStatus({ loading: false, error: null, success: true });
      localStorage.removeItem(STORAGE_KEY);

      setTimeout(() => {
        onClose();
        setFormData({ FullName: '', Email: '', Mobile_number: '', Inquiry_subject: '', url: '', Message: '' });
        setBudget('');
        setStep(1);
        setStatus({ loading: false, error: null, success: false });
      }, 3500);
    } catch (err: any) {
      setStatus({ loading: false, error: err.message || 'Something went wrong. Please try again.', success: false });
    }
  };

  const canProceedStep1 = formData.Inquiry_subject.length > 0;
  const canProceedStep2 = formData.FullName.trim().length > 1 && formData.Mobile_number.replace(/\D/g, '').length >= 10;
  const canSubmit = canProceedStep2 && formData.Email.trim().includes('@');

  const inputCls = "w-full bg-white/5 border border-white/10 hover:border-amber-500/30 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-xl font-medium outline-none transition-all duration-200";
  const labelCls = "block text-[10px] font-black uppercase tracking-[0.25em] text-amber-400/80 mb-1.5";

  return (
    <div className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={status.loading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-2xl mx-auto bg-[#080810] border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-modal-enter">
        {/* Amber top accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <MadsagLogo className="h-20 w-auto opacity-100" />
          {!status.loading && !status.success && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-8">
          {status.success ? (
            /* ── SUCCESS STATE ── */
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
                <i className="fa-solid fa-check text-2xl text-amber-500" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Thank You! 🎉</h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                We've received your request. Our team will contact you within <span className="text-amber-400 font-bold">24 hours</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                        step > s
                          ? 'bg-amber-500 text-black'
                          : step === s
                          ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                          : 'bg-white/5 border border-white/10 text-gray-600'
                      }`}
                    >
                      {step > s ? <i className="fa-solid fa-check text-[8px]" /> : s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-[1px] w-8 transition-all ${step > s ? 'bg-amber-500' : 'bg-white/10'}`} />}
                  </div>
                ))}
                <span className="ml-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  {step === 1 ? 'Service' : step === 2 ? 'Contact' : 'Details'}
                </span>
              </div>

              {/* ── STEP 1: Service & Budget ── */}
              {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">What do you need?</h3>
                    <p className="text-gray-500 text-lg">Pick a service to get started</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {SERVICES_LIST.map((svc) => (
                      <button
                        key={svc.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, Inquiry_subject: svc.value }))}
                        className={`p-3 rounded-xl border text-left text-xl font-bold transition-all duration-200 ${
                          formData.Inquiry_subject === svc.value
                            ? 'border-amber-500 bg-amber-500/10 text-white'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {svc.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-2">
                    <label className={labelCls}>Budget Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      {BUDGET_LIST.map((b) => (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => setBudget(b.value)}
                          className={`px-3 py-2.5 rounded-xl border text-xl font-bold transition-all duration-200 ${
                            budget === b.value
                              ? 'border-amber-500 bg-amber-500/10 text-white'
                              : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                    className="w-full mt-2 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Next <i className="fa-solid fa-arrow-right" />
                  </button>
                </div>
              )}

              {/* ── STEP 2: Contact Info ── */}
              {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Your Details</h3>
                    <p className="text-gray-500 text-xs">We'll reach out to you directly</p>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="FullName">Full Name *</label>
                    <input
                      id="FullName"
                      name="FullName"
                      type="text"
                      value={formData.FullName}
                      onChange={handleChange}
                      required
                      autoFocus
                      className={inputCls}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="Mobile_number">WhatsApp / Phone *</label>
                    <input
                      id="Mobile_number"
                      name="Mobile_number"
                      type="tel"
                      value={formData.Mobile_number}
                      onChange={handleChange}
                      required
                      className={inputCls}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="Email">Email Address *</label>
                    <input
                      id="Email"
                      name="Email"
                      type="email"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                      className={inputCls}
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3.5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-arrow-left" /> Back
                    </button>
                    <button
                      type="button"
                      disabled={!canProceedStep2}
                      onClick={() => setStep(3)}
                      className="flex-[2] py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      Next <i className="fa-solid fa-arrow-right" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Message & Submit ── */}
              {step === 3 && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Tell us more</h3>
                    <p className="text-gray-500 text-xs">Optional — but helps us respond faster</p>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="url">Your Website (if any)</label>
                    <input
                      id="url"
                      name="url"
                      type="text"
                      value={formData.url}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="https://yoursite.com"
                    />
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="Message">Project Brief</label>
                    <textarea
                      id="Message"
                      name="Message"
                      value={formData.Message}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputCls} resize-none`}
                      placeholder="Describe what you're looking to build or achieve..."
                    />
                  </div>

                  {/* Summary chip */}
                  <div className="flex flex-wrap gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/5">
                    <span className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-[10px] font-bold">{formData.Inquiry_subject}</span>
                    {budget && <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-[10px] font-bold">{budget}</span>}
                    {formData.FullName && <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-[10px] font-bold">{formData.FullName}</span>}
                  </div>

                  {status.error && (
                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-2">
                      <i className="fa-solid fa-triangle-exclamation text-red-400 mt-0.5 text-xs" />
                      <p className="text-red-400 text-xs font-medium">{status.error}</p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={status.loading}
                      className="flex-1 py-3.5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      <i className="fa-solid fa-arrow-left" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={status.loading || !canSubmit}
                      className="flex-[2] py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                      {status.loading ? (
                        <>
                          <i className="fa-solid fa-circle-notch animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-paper-plane" /> Submit Request
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-gray-600 text-[9px] font-medium">
                    🔒 Your data is secure. No spam, ever.
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;