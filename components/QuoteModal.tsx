
import React, { useState, useEffect } from 'react';
import { QuoteFormData } from '../types';
import { apiService } from '../services/api';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService: string;
  preselectedPlan?: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService, preselectedPlan }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    FullName: '',
    Mobile_number: '',
    Email: '',
    Inquiry_subject: preselectedService || '',
    url: '',
    Message: '',
    whatsappApproval: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ 
        ...prev, 
        Inquiry_subject: preselectedService + (preselectedPlan ? ` - ${preselectedPlan}` : '')
      }));
    }
  }, [preselectedService, preselectedPlan]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.Message.length < 15) {
      setErrorMsg('Message must be at least 15 characters.');
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
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Transmission failed. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle = "block text-sm font-semibold text-gray-200 mb-2";
  const asteriskStyle = "text-red-500 ml-0.5";
  const inputStyle = "w-full bg-[#1e1e2e]/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-all text-white placeholder-gray-600 shadow-inner";

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={isSubmitting ? undefined : onClose}
      ></div>
      
      <div className="relative bg-[#11111d] w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-xl shadow-2xl border border-white/5 animate-in fade-in zoom-in duration-300 no-scrollbar">
        {!isSubmitting && !isSuccess && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        )}

        <div className="p-8 md:p-12">
          {isSuccess ? (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
                <i className="fa-solid fa-check text-4xl"></i>
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Request Received</h2>
              <p className="text-gray-400">Our engineering team has received your lead data and will initiate contact shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Row 1 */}
                <div className="space-y-1">
                  <label className={labelStyle}>FullName<span className={asteriskStyle}>*</span></label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="text"
                    className={inputStyle}
                    value={formData.FullName}
                    onChange={e => setFormData({...formData, FullName: e.target.value})}
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
                  />
                </div>

                {/* Row 2 */}
                <div className="space-y-1">
                  <label className={labelStyle}>Email<span className={asteriskStyle}>*</span></label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="email"
                    className={inputStyle}
                    value={formData.Email}
                    onChange={e => setFormData({...formData, Email: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Inquiry_subject<span className={asteriskStyle}>*</span></label>
                  <input 
                    required
                    disabled={isSubmitting}
                    type="text"
                    className={inputStyle}
                    value={formData.Inquiry_subject}
                    onChange={e => setFormData({...formData, Inquiry_subject: e.target.value})}
                  />
                </div>

                {/* Row 3 */}
                <div className="space-y-1">
                  <label className={labelStyle}>url</label>
                  <input 
                    disabled={isSubmitting}
                    type="text"
                    className={inputStyle}
                    value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Message<span className={asteriskStyle}>*</span></label>
                  <textarea 
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className={`${inputStyle} min-h-[120px]`}
                    value={formData.Message}
                    onChange={e => setFormData({...formData, Message: e.target.value})}
                  />
                  <p className="text-gray-500 text-[11px] mt-1">min. 15 characters</p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                   <input 
                    type="checkbox" 
                    id="wa-approval"
                    className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-black"
                    checked={formData.whatsappApproval}
                    onChange={e => setFormData({...formData, whatsappApproval: e.target.checked})}
                  />
                  <label htmlFor="wa-approval" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Authorize Secure WhatsApp Communication
                  </label>
                </div>
                
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-amber-600 to-yellow-800 hover:from-amber-500 hover:to-yellow-700 disabled:opacity-50 text-white font-black rounded-lg transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]"
                >
                  {isSubmitting ? (
                    <><i className="fa-solid fa-circle-notch animate-spin"></i> Submitting...</>
                  ) : (
                    <><i className="fa-solid fa-paper-plane"></i> Submit Brief</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
