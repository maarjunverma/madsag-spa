
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
  
  // Internal state matching the user's snippet logic
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: preselectedService || 'Website Design',
    budget: '1000-5000',
    description: '',
    url: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync preselected service from App/ServiceDetailView
  useEffect(() => {
    if (isOpen && preselectedService) {
      setFormData(prev => ({ 
        ...prev, 
        projectType: preselectedService 
      }));
    }
  }, [isOpen, preselectedService]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description.trim().length < 15) {
      setErrorMsg('Description must be at least 15 characters.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    // Map internal state to the established Strapi Lead schema
    const strapiPayload: QuoteFormData = {
      FullName: formData.name,
      Email: formData.email,
      Mobile_number: formData.phone,
      // Combine Project Type & Budget for the single 'Inquiry_subject' field
      Inquiry_subject: `${formData.projectType} (${formData.budget} USD)`,
      Message: formData.description,
      url: formData.url
    };

    try {
      await apiService.submitLead(strapiPayload);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'Website Design',
          budget: '1000-5000',
          description: '',
          url: ''
        });
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Transmission failed. Ensure your API is reachable.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle = "block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2";
  const inputStyle = "w-full bg-[#1e1e2e]/40 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white placeholder-gray-700 shadow-inner appearance-none";

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-0 md:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={isSubmitting ? undefined : onClose}
      ></div>
      
      <div className="relative bg-[#0d0d16] w-full max-w-4xl min-h-screen md:min-h-0 md:rounded-[3rem] shadow-2xl border border-white/5 animate-in fade-in zoom-in duration-500 overflow-hidden">
        {!isSubmitting && !isSuccess && (
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-gray-600 hover:text-white transition-colors z-30"
          >
            <i className="fa-solid fa-xmark text-3xl"></i>
          </button>
        )}

        <div className="p-8 md:p-16">
          {isSuccess ? (
            <div className="text-center py-24 animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20 shadow-2xl shadow-amber-500/10">
                <i className="fa-solid fa-check text-5xl"></i>
              </div>
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Transmission Successful</h2>
              <p className="text-gray-500 font-medium">Your strategy brief has been logged. Our lead engineer will contact you shortly.</p>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center">
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-amber-500 mb-3">Project Initiation</h2>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">DEPLOY YOUR <span className="text-gold">BRIEF</span></h3>
                <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full opacity-50"></div>
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col md:flex-row gap-12">
                  
                  {/* Sidebar - Social Rail (20%) */}
                  <div className="hidden md:flex flex-col w-[15%] relative items-center justify-start pt-10 border-r border-white/5">
                    <p className="absolute rotate-90 top-[45%] left-[-40px] text-gray-700 text-lg font-black uppercase tracking-[0.5em] whitespace-nowrap origin-center">
                      Follow Strategy
                    </p>

                    <div className="flex flex-col gap-5 mt-20">
                      {[
                        { icon: 'fa-brands fa-instagram', color: 'hover:text-pink-500' },
                        { icon: 'fa-brands fa-linkedin-in', color: 'hover:text-blue-500' },
                        { icon: 'fa-brands fa-x-twitter', color: 'hover:text-white' },
                        { icon: 'fa-brands fa-youtube', color: 'hover:text-red-500' }
                      ].map((social, i) => (
                        <span key={i} className={`w-12 h-12 glass rounded-2xl flex items-center justify-center text-gray-600 border-white/5 cursor-pointer transition-all ${social.color} hover:border-white/20 hover:scale-110`}>
                          <i className={social.icon + ' text-xl'}></i>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Form Container (85%) */}
                  <div className="flex-1 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className={labelStyle}>Your Name</label>
                        <input 
                          required
                          name="name"
                          disabled={isSubmitting}
                          type="text"
                          className={inputStyle}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle}>Email Address</label>
                        <input 
                          required
                          name="email"
                          disabled={isSubmitting}
                          type="email"
                          className={inputStyle}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@agency.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className={labelStyle}>Phone Number</label>
                        <input 
                          required
                          name="phone"
                          disabled={isSubmitting}
                          type="tel"
                          className={inputStyle}
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                        />
                      </div>
                      <div className="space-y-1 relative">
                        <label className={labelStyle}>Project Type</label>
                        <div className="relative">
                          <select 
                            name="projectType"
                            required
                            disabled={isSubmitting}
                            className={inputStyle}
                            value={formData.projectType}
                            onChange={handleChange}
                          >
                            <option value="Website Design">Website Design</option>
                            <option value="Performance Marketing">Performance Marketing</option>
                            <option value="Landing Page Development">Landing Page Development</option>
                            <option value="Shopify E-commerce">Shopify Development</option>
                            <option value="App Development">App Development</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-amber-500/50 pointer-events-none text-xs"></i>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1 relative">
                        <label className={labelStyle}>Estimated Budget</label>
                        <div className="relative">
                          <select 
                            name="budget"
                            required
                            disabled={isSubmitting}
                            className={inputStyle}
                            value={formData.budget}
                            onChange={handleChange}
                          >
                            <option value="1000-5000">1,000 - 5,000 USD</option>
                            <option value="5000-10000">5,000 - 10,000 USD</option>
                            <option value="10000-20000">10,000 - 20,000 USD</option>
                            <option value="above-20000">Above 20,000 USD</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-amber-500/50 pointer-events-none text-xs"></i>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle}>Website URL (Optional)</label>
                        <input 
                          name="url"
                          disabled={isSubmitting}
                          type="text"
                          className={inputStyle}
                          value={formData.url}
                          onChange={handleChange}
                          placeholder="https://yoursite.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className={labelStyle}>Project Description</label>
                      <textarea 
                        required
                        name="description"
                        disabled={isSubmitting}
                        rows={4}
                        className={`${inputStyle} min-h-[120px] resize-none`}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Briefly describe your project requirements and ROI objectives..."
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-4 animate-in slide-in-from-top-2">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        {errorMsg}
                      </div>
                    )}

                    <div className="pt-8 text-center md:text-left">
                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full md:w-auto px-16 py-5 bg-gradient-to-r from-amber-600 to-yellow-800 hover:from-amber-500 hover:to-yellow-700 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] group"
                      >
                        {isSubmitting ? (
                          <><i className="fa-solid fa-circle-notch animate-spin"></i> Processing...</>
                        ) : (
                          <><i className="fa-solid fa-bolt group-hover:scale-125 transition-transform"></i> Submit Briefing</>
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
