
import React, { useState, useEffect } from 'react';
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
import { ServiceType, PortfolioItem, BlogPost, Service, GlobalData } from './types';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { apiService } from './services/api';

const App: React.FC = () => {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | ''>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  const [activeDetailService, setActiveDetailService] = useState<Service | null>(null);

  // Fetch Global Configuration
  useEffect(() => {
    const fetchGlobal = async () => {
      const data = await apiService.getGlobalData();
      if (data) {
        setGlobalData(data);
        // Update Document Title & SEO
        document.title = data.seo.metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', data.seo.metaDescription);
        
        if (data.faviconUrl) {
          let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = data.faviconUrl;
        }
      }
    };
    fetchGlobal();
  }, []);

  const activeSectionId = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px'
  });

  const openQuoteModal = (service: ServiceType | '' = '', plan: string = '') => {
    setSelectedServiceType(service);
    setSelectedPlan(plan);
    setIsQuoteModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    if (!activeDetailService && !isPortfolioOpen && !isBlogModalOpen) {
      document.body.style.overflow = 'auto';
    }
  };

  const openPortfolio = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
    setIsPortfolioOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePortfolio = () => {
    setIsPortfolioOpen(false);
    if (!activeDetailService && !isQuoteModalOpen && !isBlogModalOpen) {
      document.body.style.overflow = 'auto';
    }
  };

  const openBlog = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setIsBlogModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBlog = () => {
    setIsBlogModalOpen(false);
    if (!activeDetailService && !isQuoteModalOpen && !isPortfolioOpen) {
      document.body.style.overflow = 'auto';
    }
  };

  const openServiceDetails = (service: Service) => {
    setActiveDetailService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceDetails = () => {
    setActiveDetailService(null);
    if (!isQuoteModalOpen && !isPortfolioOpen && !isBlogModalOpen) {
      document.body.style.overflow = 'auto';
    }
  };

  const isAnyModalOpen = isPortfolioOpen || isQuoteModalOpen || isBlogModalOpen || !!activeDetailService;

  return (
    <div className={`relative bg-[#030712] transition-all duration-700 ${isAnyModalOpen ? 'h-screen overflow-hidden px-1' : ''}`}>
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/5 blur-[150px] rounded-full"></div>
      </div>

      <Navbar 
        onGetQuote={() => openQuoteModal()} 
        activeSectionId={activeSectionId} 
        globalData={globalData}
      />
      
      <main className="relative z-10">
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

      <footer className="py-20 px-6 border-t border-white/5 glass relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 relative z-10">
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              {globalData?.logoUrl ? (
                <img src={globalData.logoUrl} alt={globalData.siteName} className="h-10 w-auto" />
              ) : (
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white">M</div>
              )}
              <span className="font-black text-3xl tracking-tighter uppercase text-white leading-none">
                {globalData?.siteName || BRAND_NAME}
              </span>
            </div>
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em]">{SLOGAN}</p>
            {globalData?.footerText && (
               <p className="text-gray-500 text-xs font-medium max-w-sm">{globalData.footerText}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-12 w-full md:w-auto">
             <div className="space-y-4">
               <h4 className="text-white font-black text-xs uppercase tracking-widest text-center md:text-left">Navigation</h4>
               <ul className="space-y-2 text-sm text-gray-500 font-bold text-center md:text-left">
                 <li><a href="#hero" className="hover:text-amber-400 transition-colors">Home</a></li>
                 <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Portfolio</a></li>
                 <li><a href="#process" className="hover:text-amber-400 transition-colors">Strategy</a></li>
                 <li><a href="#blog" className="hover:text-amber-400 transition-colors">Journal</a></li>
               </ul>
             </div>
             <div className="space-y-4">
               <h4 className="text-white font-black text-xs uppercase tracking-widest text-center md:text-left">Social</h4>
               <div className="flex gap-4 justify-center md:justify-start">
                 <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-white"><i className="fa-brands fa-linkedin-in text-lg"></i></a>
                 <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-white"><i className="fa-brands fa-instagram text-lg"></i></a>
               </div>
             </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} {globalData?.siteName || BRAND_NAME} STRATEGY GROUP.</p>
          <p>Global Digital Infrastructure v1.1</p>
        </div>
      </footer>

      <WhatsAppButton activeSection={activeSectionId} />
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={closeQuoteModal} 
        preselectedService={selectedServiceType}
        preselectedPlan={selectedPlan}
      />

      <PortfolioModal 
        isOpen={isPortfolioOpen}
        item={selectedPortfolioItem}
        onClose={closePortfolio}
      />

      <BlogModal 
        isOpen={isBlogModalOpen}
        post={selectedBlogPost}
        onClose={closeBlog}
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
