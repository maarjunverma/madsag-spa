
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import FAQSection from './components/FAQSection';
import BlogSection from './components/BlogSection';
import CTASection from './components/CTASection';
import WhatsAppButton from './components/WhatsAppButton';
import TechStack from './components/TechStack';
import QuoteModal from './components/QuoteModal';
import PortfolioModal from './components/PortfolioModal';
import BlogModal from './components/BlogModal';
import ServiceDetailView from './components/ServiceDetailView';
import { SERVICES, BRAND_NAME, SLOGAN } from './constants';
import { ServiceType, PortfolioItem, BlogPost, Service } from './types';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | ''>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  const [activeDetailService, setActiveDetailService] = useState<Service | null>(null);

  const activeSectionId = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px'
  });

  const openQuoteModal = (service: ServiceType | '' = '', plan: string = '') => {
    setSelectedServiceType(service);
    setSelectedPlan(plan);
    setIsQuoteModalOpen(true);
  };

  const openPortfolio = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
    setIsPortfolioOpen(true);
  };

  const openBlog = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setIsBlogModalOpen(true);
  };

  const openServiceDetails = (service: Service) => {
    setActiveDetailService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceDetails = () => {
    setActiveDetailService(null);
    document.body.style.overflow = 'auto';
  };

  const isAnyModalOpen = isPortfolioOpen || isQuoteModalOpen || isBlogModalOpen || !!activeDetailService;

  return (
    <div className={`relative overflow-x-hidden ${isAnyModalOpen ? 'h-screen overflow-hidden' : ''}`}>
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/5 blur-[150px] rounded-full"></div>
      </div>

      <Navbar onGetQuote={() => openQuoteModal()} activeSectionId={activeSectionId} />
      
      <main>
        <Hero onGetQuote={() => openQuoteModal()} />
        
        <div id="services-container">
          {SERVICES.map((service) => (
            <ServiceSection 
              key={service.id} 
              service={service} 
              isActive={activeSectionId === service.id}
              onEnquire={() => openQuoteModal(service.name)}
              onViewPortfolio={openPortfolio}
              onViewDetails={openServiceDetails}
            />
          ))}
        </div>

        <PortfolioSection onViewProject={openPortfolio} />
        <ProcessSection />
        <TechStack />
        <FAQSection onEnquire={() => openQuoteModal()} />
        <BlogSection onReadBlog={openBlog} />
        <CTASection />
      </main>

      <footer className="py-20 px-6 border-t border-white/5 glass relative overflow-hidden text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 relative z-10">
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white">M</div>
              <span className="font-black text-3xl tracking-tighter uppercase text-white">{BRAND_NAME}</span>
            </div>
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em]">{SLOGAN}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-12 w-full md:w-auto">
             <div className="space-y-4">
               <h4 className="text-white font-black text-xs uppercase tracking-widest text-center md:text-left">Navigation</h4>
               <ul className="space-y-2 text-sm text-gray-500 font-bold">
                 <li><a href="#hero" className="hover:text-amber-400 transition-colors">Home</a></li>
                 <li><a href="#process" className="hover:text-amber-400 transition-colors">About</a></li>
                 <li><a href="#blog" className="hover:text-amber-400 transition-colors">Journal</a></li>
               </ul>
             </div>
             <div className="space-y-4">
               <h4 className="text-white font-black text-xs uppercase tracking-widest text-center md:text-left">Social</h4>
               <div className="flex gap-4">
                 <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-amber-400 transition-all text-white"><i className="fa-brands fa-linkedin-in text-lg"></i></a>
                 <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-amber-400 transition-all text-white"><i className="fa-brands fa-instagram text-lg"></i></a>
               </div>
             </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME} STRATEGY GROUP.</p>
          <p>Global Digital Infrastructure</p>
        </div>
      </footer>

      <WhatsAppButton activeSection={activeSectionId} />
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        preselectedService={selectedServiceType}
        preselectedPlan={selectedPlan}
      />

      <PortfolioModal 
        isOpen={isPortfolioOpen}
        item={selectedPortfolioItem}
        onClose={() => setIsPortfolioOpen(false)}
      />

      <BlogModal 
        isOpen={isBlogModalOpen}
        post={selectedBlogPost}
        onClose={() => setIsBlogModalOpen(false)}
      />

      {activeDetailService && (
        <ServiceDetailView 
          service={activeDetailService}
          onClose={closeServiceDetails}
          onEnquire={(planName) => {
            closeServiceDetails();
            openQuoteModal(activeDetailService.name, planName);
          }}
        />
      )}
    </div>
  );
};

export default App;
