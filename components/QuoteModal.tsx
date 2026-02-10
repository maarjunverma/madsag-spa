import React, { useState, useEffect } from 'react';
import { QuoteFormData } from '../types';
import { apiService } from '../services/api';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService: string;
  preselectedPlan?: string;
}

const STORAGE_KEY = 'madsag_quote_form_draft';

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService, preselectedPlan }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullname: '',
    email: '',
    phone: '',
    projectType: 'website-development',
    budget: '1000-5000',
    description: '',
    url: '',
    targetAudience: '',
    marketingGoals: '',
    productCount: '',
    targetKeywords: ''
  });

  const [status, setStatus] = useState({ loading: false, error: null as string | null, success: false });

  useEffect(() => {
    if (isOpen) {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          setFormData(prev => ({
            ...prev,
            ...parsedDraft,
            projectType: preselectedService 
              ? preselectedService.toLowerCase().replace(/\s+/g, '-') 
              : (parsedDraft.projectType || 'website-development')
          }));
        } catch (e) {
          console.error("Failed to parse form draft", e);
        }
      } else if (preselectedService) {
        const normalizedType = preselectedService.toLowerCase().replace(/\s+/g, '-');
        setFormData(prev => ({ ...prev, projectType: normalizedType }));
      }
    }
  }, [isOpen, preselectedService]);

  useEffect(() => {
    if (isOpen && !status.success) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isOpen, status.success]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      await apiService.submitLead(formData);
      setStatus({ loading: false, error: null, success: true });
      localStorage.removeItem(STORAGE_KEY);
      
      setTimeout(() => {
        setStatus(s => ({ ...s, success: false }));
        onClose();
        setFormData({
          fullname: '',
          email: '',
          phone: '',
          projectType: 'website-development',
          budget: '1000-5000',
          description: '',
          url: '',
          targetAudience: '',
          marketingGoals: '',
          productCount: '',
          targetKeywords: ''
        });
      }, 3500);
    } catch (error: any) {
      setStatus({ loading: false, error: error.message || "Failed to send request.", success: false });
    }
  };

  const labelStyle = "block text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-amber-500/80 mb-2 ml-1";
  const inputStyle = "w-full input-glow rounded-xl md:rounded-2xl px-4 md:px-6 py-3.5 md:py-5 focus:outline-none text-white placeholder-gray-700 appearance-none text-sm md:text-base";

  const renderDynamicFields = () => {
    const type = formData.projectType;
    if (type === 'website-development' || type === 'landing-page') {
      return (
        <div className="space-y-1 animate-in slide-in-from-top-4 duration-500">
          <label className={labelStyle} htmlFor="targetAudience">Target Audience</label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="e.g. Luxury homeowners, tech startups..."
          />
        </div>
      );
    }
    if (type === 'performance-marketing') {
      return (
        <div className="space-y-1 animate-in slide-in-from-top-4 duration-500">
          <label className={labelStyle} htmlFor="marketingGoals">Marketing Goals</label>
          <input
            type="text"
            id="marketingGoals"
            name="marketingGoals"
            value={formData.marketingGoals}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="e.g. 3x ROAS, brand awareness..."
          />
        </div>
      );
    }
    if (type === 'ecommerce-development' || type === 'shopify-development') {
      return (
        <div className="space-y-1 animate-in slide-in-from-top-4 duration-500">
          <label className={labelStyle} htmlFor="productCount">SKU Count</label>
          <input
            type="text"
            id="productCount"
            name="productCount"
            value={formData.productCount}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="e.g. 1-50, 500+..."
          />
        </div>
      );
    }
    if (type === 'seo') {
      return (
        <div className="space-y-1 animate-in slide-in-from-top-4 duration-500">
          <label className={labelStyle} htmlFor="targetKeywords">Target Keywords</label>
          <input
            type="text"
            id="targetKeywords"
            name="targetKeywords"
            value={formData.targetKeywords}
            onChange={handleChange}
            required
            className={inputStyle}
            placeholder="Primary focus keywords..."
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick={status.loading ? undefined : onClose}
      ></div>
      
      <div className="relative bg-[#08080c] w-full max-w-4xl mx-auto my-auto rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-500 overflow-hidden">
        
        {!status.loading && !status.success && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-10 md:right-10 text-gray-500 hover:text-white transition-all hover:rotate-90 z-30"
          >
            <i className="fa-solid fa-xmark text-xl md:text-3xl"></i>
          </button>
        )}

        <div className="p-5 sm:p-8 md:p-16 lg:p-20 overflow-y-auto max-h-[90vh]">
          {status.success ? (
            <div className="text-center py-12 md:py-32 animate-in zoom-in duration-700">
              <div className="w-16 h-16 md:w-28 md:h-28 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20 shadow-2xl">
                <i className="fa-solid fa-check text-3xl md:text-6xl"></i>
              </div>
              <h2 className="text-2xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-white">THANK <span className="text-gold">YOU</span></h2>
              <p className="text-gray-500 font-medium px-4 max-w-md mx-auto leading-relaxed text-sm md:text-base">Strategic brief received. Deployment coordinators will initiate contact within 24 standard business hours.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 md:mb-12 text-center md:text-left">
                <div className="inline-block px-3 py-1 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-500 text-[8px] md:text-[9px] font-black tracking-[0.4em] uppercase mb-4">
                  Strategic Briefing
                </div>
                <h3 className="text-2xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">REQUEST A <span className="text-gold">QUOTE</span></h3>
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                  
                  <div className="hidden lg:flex flex-col w-[10%] relative items-center justify-start pt-4">
                    <div className="flex flex-col gap-6">
                      {['fa-linkedin-in', 'fa-instagram', 'fa-youtube', 'fa-x-twitter'].map((icon, i) => (
                        <span key={i} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-600 border-white/10 cursor-pointer transition-all hover:text-amber-500 hover:border-amber-500/30">
                          <i className={`fa-brands ${icon} text-base`}></i>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 space-y-5 md:space-y-8">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="fullname">Principal Name</label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname" 
                          value={formData.fullname}
                          onChange={handleChange}
                          required
                          disabled={status.loading}
                          className={inputStyle}
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="email">Email Interface</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={status.loading}
                          className={inputStyle}
                          placeholder="Email Address"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="phone">Direct Line</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          disabled={status.loading}
                          className={inputStyle}
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="space-y-1 relative">
                        <label className={labelStyle} htmlFor="projectType">Sector</label>
                        <div className="relative">
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            required
                            disabled={status.loading}
                            className={`${inputStyle} pr-10`}
                          >
                            <option value="website-development">Website Development</option>
                            <option value="performance-marketing">Performance Marketing</option>
                            <option value="ecommerce-development">E-commerce</option>
                            <option value="shopify-development">Shopify Specialist</option>
                            <option value="landing-page">High-Conv Funnel</option>
                            <option value="seo">SEO Dominance</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-amber-500/50 pointer-events-none text-[10px]"></i>
                        </div>
                      </div>
                    </div>

                    {renderDynamicFields()}

                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-1 relative">
                        <label className={labelStyle} htmlFor="budget">Investment Cap</label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                            disabled={status.loading}
                            className={`${inputStyle} pr-10`}
                          >
                            <option value="1000-5000">1k - 5k USD</option>
                            <option value="5000-10000">5k - 10k USD</option>
                            <option value="10000-20000">10k - 20k USD</option>
                            <option value="above-20000">20k+ USD</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-amber-500/50 pointer-events-none text-[10px]"></i>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="url">Source URL</label>
                        <input
                          type="text"
                          id="url"
                          name="url"
                          value={formData.url}
                          onChange={handleChange}
                          disabled={status.loading}
                          className={inputStyle}
                          placeholder="https://yoursite.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className={labelStyle} htmlFor="description">Strategic Requirements</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        required
                        disabled={status.loading}
                        className={`${inputStyle} min-h-[100px] md:min-h-[150px] resize-none leading-relaxed`}
                        placeholder="Briefly describe project objectives..."
                      ></textarea>
                    </div>

                    {status.error && (
                      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-start gap-3">
                        <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
                        <p className="normal-case text-gray-500 font-medium">{status.error}</p>
                      </div>
                    )}

                    <div className="pt-4 md:pt-8">
                      <button 
                        type="submit" 
                        disabled={status.loading}
                        className="w-full md:w-auto px-8 md:px-20 py-4 md:py-6 bg-[#0a0a0a] border border-white/20 hover:border-amber-500/40 hover:bg-black disabled:opacity-50 text-white font-black rounded-xl md:rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.4em] group relative"
                      >
                        {status.loading ? (
                          <span className="flex items-center gap-4">
                            <i className="fa-solid fa-circle-notch animate-spin text-amber-500"></i>
                            <span className="relative z-10">Processing...</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-4">
                            <i className="fa-solid fa-bolt-lightning text-amber-500"></i> 
                            <span className="relative z-10">INITIATE DEPLOYMENT</span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;