
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'website-development',
    budget: '1000-5000',
    description: '',
    url: ''
  });

  const [status, setStatus] = useState({ loading: false, error: null as string | null, success: false });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        projectType: preselectedService ? preselectedService.toLowerCase().replace(/\s+/g, '-') : 'website-development'
      }));
    }
  }, [isOpen, preselectedService]);

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

    // CRITICAL: Mapped to the EXACT Strapi API IDs from the provided screenshot
    const strapiPayload: QuoteFormData = {
      FullName: formData.name,       // Maps frontend 'name' to Strapi 'FullName'
      email: formData.email,         // Maps to Strapi 'email'
      phone: formData.phone,         // Maps to Strapi 'phone'
      projectType: formData.projectType, // Maps to Strapi 'projectType'
      budget: formData.budget,       // Maps to Strapi 'budget'
      description: formData.description, // Maps to Strapi 'description'
      url: formData.url              // Maps to Strapi 'url'
    };

    try {
      await apiService.submitLead(strapiPayload);
      setStatus({ loading: false, error: null, success: true });
      
      setTimeout(() => {
        setStatus(s => ({ ...s, success: false }));
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'website-development',
          budget: '1000-5000',
          description: '',
          url: ''
        });
      }, 3000);
    } catch (error: any) {
      console.error("API Transmission Failed:", error);
      setStatus({ loading: false, error: error.message || "Failed to send request.", success: false });
    }
  };

  const labelStyle = "block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2";
  const inputStyle = "w-full bg-[#1e1e2e]/60 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500/50 transition-all text-white placeholder-gray-700 shadow-inner appearance-none";

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-0 md:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={status.loading ? undefined : onClose}
      ></div>
      
      <div className="relative bg-[#0d0d16] w-full max-w-4xl min-h-screen md:min-h-0 md:rounded-[3rem] shadow-2xl border border-white/5 animate-in fade-in zoom-in duration-500 overflow-hidden">
        
        {!status.loading && !status.success && (
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-gray-600 hover:text-white transition-colors z-30"
          >
            <i className="fa-solid fa-xmark text-3xl"></i>
          </button>
        )}

        <div className="p-8 md:p-16">
          {status.success ? (
            <div className="text-center py-24 animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20 shadow-2xl shadow-amber-500/10">
                <i className="fa-solid fa-check text-5xl"></i>
              </div>
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Transmission Successful</h2>
              <p className="text-gray-500 font-medium">Strategic brief received. Deployment logic initiated.</p>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center">
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-amber-500 mb-3">Project Initiation</h2>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">REQUEST A <span className="text-gold">QUOTE</span></h3>
                <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full opacity-50"></div>
                <p className="text-gray-500 mt-6 font-medium text-sm">Please fill this form and we will revert shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col md:flex-row gap-10">
                  
                  <div className="hidden md:flex flex-col w-[15%] relative items-center justify-start pt-14 border-r border-white/5 pr-8">
                    <p className="absolute rotate-90 top-[40%] left-[-50px] text-gray-800 text-2xl font-black uppercase tracking-[0.5em] whitespace-nowrap origin-center select-none">
                      Follow Strategy
                    </p>

                    <div className="flex flex-col gap-6 mt-24">
                      {[
                        { icon: 'fa-brands fa-facebook-f', color: 'hover:text-blue-500' },
                        { icon: 'fa-brands fa-instagram', color: 'hover:text-pink-500' },
                        { icon: 'fa-brands fa-youtube', color: 'hover:text-red-500' },
                        { icon: 'fa-brands fa-linkedin-in', color: 'hover:text-blue-400' },
                        { icon: 'fa-brands fa-pinterest-p', color: 'hover:text-red-600' }
                      ].map((social, i) => (
                        <span key={i} className={`w-11 h-11 glass rounded-2xl flex items-center justify-center text-gray-600 border-white/5 cursor-pointer transition-all ${social.color} hover:border-white/20 hover:scale-110`}>
                          <i className={social.icon + ' text-lg'}></i>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="name">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={status.loading}
                          className={inputStyle}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={status.loading}
                          className={inputStyle}
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          disabled={status.loading}
                          className={inputStyle}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-1 relative">
                        <label className={labelStyle} htmlFor="project-type">Project Type</label>
                        <div className="relative">
                          <select
                            id="project-type"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            required
                            disabled={status.loading}
                            className={inputStyle}
                          >
                            <option value="website-development">Website Development</option>
                            <option value="ecommerce-development">E-commerce Development</option>
                            <option value="seo">SEO Services</option>
                            <option value="app-development">App Development</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-amber-500/50 pointer-events-none text-[10px]"></i>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1 relative">
                        <label className={labelStyle} htmlFor="budget">Estimated Budget</label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                            disabled={status.loading}
                            className={inputStyle}
                          >
                            <option value="1000-5000">1000 - 5000 USD</option>
                            <option value="5000-10000">5000 - 10,000 USD</option>
                            <option value="10000-20000">10,000 - 20,000 USD</option>
                            <option value="above-20000">Above 20,000 USD</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-amber-500/50 pointer-events-none text-[10px]"></i>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle}>Website URL (Optional)</label>
                        <input
                          type="text"
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
                      <label className={labelStyle} htmlFor="description">Project Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        disabled={status.loading}
                        className={`${inputStyle} min-h-[120px] resize-none`}
                        placeholder="Briefly describe your project requirements"
                      ></textarea>
                    </div>

                    {status.error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-start gap-3 animate-in slide-in-from-top-2">
                        <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                        <div>
                          <p className="mb-1">Transmission Error</p>
                          <p className="normal-case text-gray-500 font-medium">{status.error}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-8 flex flex-col items-center md:items-start">
                      <button 
                        type="submit" 
                        disabled={status.loading}
                        className="w-full md:w-auto px-16 py-5 bg-gradient-to-r from-amber-600 to-yellow-800 hover:from-amber-500 hover:to-yellow-700 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] group"
                      >
                        {status.loading ? (
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
