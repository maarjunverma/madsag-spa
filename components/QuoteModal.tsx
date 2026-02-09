
import React, { useState, useEffect } from 'react';
import { QuoteFormData, ServiceType } from '../types';
import { apiService } from '../services/api';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService: string;
  preselectedPlan?: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService, preselectedPlan }) => {
  const serviceOptions = Object.values(ServiceType);
  
  const [formData, setFormData] = useState<QuoteFormData>({
    FullName: '',
    Mobile_number: '',
    Email: '',
    Inquiry_subject: '',
    url: '',
    Message: '',
    whatsappApproval: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state with preselected props
  useEffect(() => {
    if (isOpen) {
      const subject = preselectedService + (preselectedPlan ? ` - ${preselectedPlan}` : '');
      setFormData(prev => ({ 
        ...prev, 
        Inquiry_subject: subject || serviceOptions[0]
      }));
    }
  }, [isOpen, preselectedService, preselectedPlan]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.Message.length < 15) {
      setErrorMsg('Message must be at least 15 characters long.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await apiService.submitLead(formData);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Reset form
        setFormData({
          FullName: '',
          Mobile_number: '',
          Email: '',
          Inquiry_subject: serviceOptions[0],
          url: '',
          Message: '',
          whatsappApproval: true
        });
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle = "block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2";
  const asteriskStyle = "text-amber-500 ml-1";
  const inputStyle = "w-full bg-[#1e1e2e]/60 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white placeholder-gray-700 shadow-inner";

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={isSubmitting ? undefined : onClose}
      ></div>
      
      <div className="relative bg-[#0d0d16] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl border border-white/5 animate-in fade-in zoom-in duration-500 no-scrollbar">
        {!isSubmitting && !isSuccess && (
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-gray-600 hover:text-white transition-colors z-20"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        )}

        <div className="p-8 md:p-14">
          {isSuccess ? (
            <div className="text-center py-16 animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20 shadow-2xl shadow-amber-500/10">
                <i className="fa-solid fa-check text-5xl"></i>
              </div>
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Transmission Successful</h2>
              <p className="text-gray-500 font-medium">Your data has been logged. An engineering lead will contact you within 12 hours.</p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-amber-500 mb-2">Project Initiation</h2>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">DEPLOY YOUR <span className="text-gold">STRATEGY</span></h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                  {/* Name & Mobile */}
                  <div className="space-y-1">
                    <label className={labelStyle}>FullName<span className={asteriskStyle}>*</span></label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="text"
                      className={inputStyle}
                      value={formData.FullName}
                      onChange={e => setFormData({...formData, FullName: e.target.value})}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Mobile_number<span className={asteriskStyle}>*</span></label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="tel"
                      className={inputStyle}
                      value={formData.Mobile_number}
                      onChange={e => setFormData({...formData, Mobile_number: e.target.value})}
                      placeholder="+91 00000 00000"
                    />
                  </div>

                  {/* Email & Subject */}
                  <div className="space-y-1">
                    <label className={labelStyle}>Email Address<span className={asteriskStyle}>*</span></label>
                    <input 
                      required
                      disabled={isSubmitting}
                      type="email"
                      className={inputStyle}
                      value={formData.Email}
                      onChange={e => setFormData({...formData, Email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-1 relative">
                    <label className={labelStyle}>Inquiry_subject<span className={asteriskStyle}>*</span></label>
                    <div className="relative">
                      <select 
                        required
                        disabled={isSubmitting}
                        className={`${inputStyle} appearance-none cursor-pointer pr-10`}
                        value={serviceOptions.includes(formData.Inquiry_subject as ServiceType) ? formData.Inquiry_subject : ''}
                        onChange={e => setFormData({...formData, Inquiry_subject: e.target.value})}
                      >
                        <option value="" disabled hidden>Select Service Category</option>
                        {serviceOptions.map(option => (
                          <option key={option} value={option} className="bg-[#0d0d16] text-white py-2">{option}</option>
                        ))}
                        <option value="General Strategic Consult" className="bg-[#0d0d16] text-white py-2">General Strategic Consult</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500/50">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                    {/* Display full subject if it includes a plan */}
                    {formData.Inquiry_subject && !serviceOptions.includes(formData.Inquiry_subject as ServiceType) && (
                       <p className="mt-2 text-[10px] text-amber-500 font-bold uppercase tracking-wider italic">Selected: {formData.Inquiry_subject}</p>
                    )}
                  </div>

                  {/* URL & Message */}
                  <div className="space-y-1">
                    <label className={labelStyle}>Website URL (Optional)</label>
                    <input 
                      disabled={isSubmitting}
                      type="text"
                      placeholder="https://yourbrand.com"
                      className={inputStyle}
                      value={formData.url}
                      onChange={e => setFormData({...formData, url: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Detailed Briefing<span className={asteriskStyle}>*</span></label>
                    <textarea 
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className={`${inputStyle} min-h-[140px] resize-none`}
                      value={formData.Message}
                      onChange={e => setFormData({...formData, Message: e.target.value})}
                      placeholder="Describe your objectives, current pain points, and target ROI..."
                    />
                    <div className="flex justify-between items-center mt-2">
                       <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">Min. 15 characters required</p>
                       <p className={`text-[9px] font-bold uppercase ${formData.Message.length >= 15 ? 'text-green-500' : 'text-gray-600'}`}>
                          {formData.Message.length} Characters
                       </p>
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-4 animate-in slide-in-from-top-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    {errorMsg}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setFormData({...formData, whatsappApproval: !formData.whatsappApproval})}>
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${formData.whatsappApproval ? 'bg-amber-500 border-amber-500 shadow-lg shadow-amber-500/20' : 'border-white/10'}`}>
                      {formData.whatsappApproval && <i className="fa-solid fa-check text-[10px] text-black"></i>}
                    </div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] cursor-pointer group-hover:text-gray-300 transition-colors">
                      Opt-in for real-time WhatsApp updates
                    </label>
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full sm:w-auto px-14 py-5 bg-gradient-to-r from-amber-600 to-yellow-800 hover:from-amber-500 hover:to-yellow-700 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.25em] group"
                  >
                    {isSubmitting ? (
                      <><i className="fa-solid fa-circle-notch animate-spin text-lg"></i> Transmitting...</>
                    ) : (
                      <><i className="fa-solid fa-bolt group-hover:scale-125 transition-transform"></i> Deploy Lead</>
                    )}
                  </button>
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
