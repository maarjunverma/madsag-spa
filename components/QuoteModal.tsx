
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
  const isWebsiteDesign = formData.service === ServiceType.WEBSITE_DESIGN;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={isSubmitting ? undefined : onClose}
      ></div>
      
      <div className="relative glass w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border-white/10 animate-in fade-in zoom-in duration-300">
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
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Strategic Lead Logged</h2>
              <p className="text-gray-400">Our analysts will review your requirements and respond shortly via the secure channel.</p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-black mb-2 tracking-tight uppercase">Project Brief</h2>
                <p className="text-gray-400 text-sm">Engineered solutions for your objectives.</p>
                {formData.selectedPlan && (
                  <div className="mt-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg inline-flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase text-amber-500 tracking-widest">Plan:</span>
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
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Full Name</label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all disabled:opacity-50"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Email Address</label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all disabled:opacity-50"
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Mobile Number</label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all disabled:opacity-50"
                      placeholder="+91 00000 00000"
                      value={formData.mobileNumber}
                      onChange={e => setFormData({...formData, mobileNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inquiry Scope</label>
                  <div className="relative">
                    <select 
                      required
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all appearance-none disabled:opacity-50"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value as ServiceType})}
                    >
                      <option value="" disabled className="bg-gray-900 text-gray-400">Select inquiry type</option>
                      {Object.values(ServiceType).map(st => (
                        <option key={st} value={st} className="bg-gray-900">{st}</option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs"></i>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Project Mission & Details</label>
                  <textarea 
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all resize-none disabled:opacity-50"
                    placeholder="Describe your project goals and roadblocks..."
                    value={formData.projectDescription}
                    onChange={e => setFormData({...formData, projectDescription: e.target.value})}
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 disabled:from-amber-800 disabled:to-yellow-900 disabled:cursor-not-allowed text-black font-black py-4 rounded-xl transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 group relative overflow-hidden text-xs uppercase tracking-widest"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin text-lg"></i>
                      <span>Deploying Brief...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
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
