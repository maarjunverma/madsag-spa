
import React, { useState, useEffect } from 'react';
import { ServiceType, QuoteFormData } from '../types';
import { apiService } from '../services/api';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService: ServiceType | '';
  preselectedPlan?: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService, preselectedPlan }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    mobileNumber: '',
    whatsappApproval: true,
    service: preselectedService,
    projectDescription: '',
    websiteUrl: '',
    budget: '',
    timeline: '',
    dailyBudget: '',
    adsExperience: 'never',
    entityType: 'business',
    isNewBusiness: 'no',
    projectPurpose: '',
    selectedPlan: preselectedPlan || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      service: preselectedService,
      selectedPlan: preselectedPlan || ''
    }));
  }, [preselectedService, preselectedPlan]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await apiService.submitLead(formData);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Internal connection error. Please try WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPerformanceMarketing = formData.service === ServiceType.PERFORMANCE_MARKETING;
  const isWebOrShopify = formData.service === ServiceType.WEBSITE_DESIGN || formData.service === ServiceType.SHOPIFY || formData.service === ServiceType.LANDING_PAGE;

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={isSubmitting ? undefined : onClose}
      ></div>
      
      <div className="relative glass w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border-white/10 animate-in fade-in zoom-in duration-300 no-scrollbar">
        {!isSubmitting && !isSuccess && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        )}

        <div className={`p-8 md:p-12 transition-all duration-300 ${isSubmitting ? 'opacity-60 grayscale-[0.5]' : 'opacity-100'}`}>
          {isSuccess ? (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/20 border border-amber-500/30">
                <i className="fa-solid fa-check text-4xl"></i>
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Brief Logged</h2>
              <p className="text-gray-400">Strategic analysts have received your data and will respond via the primary channel shortly.</p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-black mb-2 tracking-tight uppercase">Strategic Briefing</h2>
                <p className="text-gray-400 text-sm font-medium">Define your objectives for technical analysis.</p>
                {formData.selectedPlan && (
                  <div className="mt-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg inline-flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase text-amber-500 tracking-widest">Configuration:</span>
                    <span className="text-xs font-bold text-white uppercase">{formData.selectedPlan}</span>
                  </div>
                )}
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-top-2">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Full Name</label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-white placeholder-gray-600"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Mobile / WhatsApp</label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-white placeholder-gray-600"
                      placeholder="+1 (555) 000-0000"
                      value={formData.mobileNumber}
                      onChange={e => setFormData({...formData, mobileNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Email Address</label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-white placeholder-gray-600"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inquiry Modality</label>
                  <div className="relative">
                    <select 
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all appearance-none text-white"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value as ServiceType})}
                    >
                      <option value="" disabled>Select Core Modality</option>
                      {Object.values(ServiceType).map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs"></i>
                  </div>
                </div>

                {/* Conditional Fields: Web/Shopify/Landing Page */}
                {isWebOrShopify && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Current Website URL (Optional)</label>
                    <input 
                      disabled={isSubmitting}
                      type="url"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-white placeholder-gray-600"
                      placeholder="https://yourbrand.com"
                      value={formData.websiteUrl}
                      onChange={e => setFormData({...formData, websiteUrl: e.target.value})}
                    />
                  </div>
                )}

                {/* Conditional Fields: Performance Marketing */}
                {isPerformanceMarketing && (
                  <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Estimated Daily Ad Spend</label>
                      <input 
                        disabled={isSubmitting}
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-white placeholder-gray-600"
                        placeholder="e.g. $100 - $500"
                        value={formData.dailyBudget}
                        onChange={e => setFormData({...formData, dailyBudget: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Prior Ads Experience</label>
                      <select 
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-white"
                        value={formData.adsExperience}
                        onChange={e => setFormData({...formData, adsExperience: e.target.value as any})}
                      >
                        <option value="never">Never Run Ads</option>
                        <option value="previously_run">Previously Scaled</option>
                        <option value="fresh">Fresh Project</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Project Mission Brief</label>
                  <textarea 
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all resize-none text-white placeholder-gray-600"
                    placeholder="Describe your current bottleneck and desired outcome..."
                    value={formData.projectDescription}
                    onChange={e => setFormData({...formData, projectDescription: e.target.value})}
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                  <input 
                    type="checkbox" 
                    id="wa-approval"
                    className="w-4 h-4 rounded border-amber-500 text-amber-500 focus:ring-amber-500 bg-black"
                    checked={formData.whatsappApproval}
                    onChange={e => setFormData({...formData, whatsappApproval: e.target.checked})}
                  />
                  <label htmlFor="wa-approval" className="text-[10px] font-bold text-gray-400 leading-tight">
                    Authorize communication via secure encrypted WhatsApp channels.
                  </label>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-800 hover:from-amber-500 hover:to-yellow-700 disabled:opacity-50 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                      Encrypting & Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane"></i>
                      Initiate Deployment
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
