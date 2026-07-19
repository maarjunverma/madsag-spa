
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
import MadsagLogo from './components/MadsagLogo';
import ServicesGrid from './components/ServicesGrid';
import AboutPage from './components/AboutPage';
import WordPressPage from './components/WordPressPage';
import AdminApp from './admin/AdminApp';
import { SERVICES, BRAND_NAME, SLOGAN } from './constants';
import { ServiceType, PortfolioItem, BlogPost, Service, GlobalData } from './types';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { apiService } from './services/api';
import { useScrollReveal } from './hooks/useScrollReveal';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/about" element={<AboutRoute />} />
      <Route path="/services/wordpress" element={<WordPressRoute />} />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
};

const AboutRoute: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);

  useEffect(() => {
    const fetchGlobal = async () => {
      const data = await apiService.getGlobalData();
      if (data) setGlobalData(data);
    };
    fetchGlobal();
    window.scrollTo(0, 0);
  }, []);

  const openQuote = () => {
    setIsQuoteModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeQuote = () => {
    setIsQuoteModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="relative bg-[#030712]">
      <Navbar onGetQuote={openQuote} activeSectionId={null} globalData={globalData} />
      <AboutPage onGetQuote={openQuote} />
      <WhatsAppButton activeSection={null} />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuote} preselectedService="" preselectedPlan="" />
    </div>
  );
};

const WordPressRoute: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);

  useEffect(() => {
    const fetchGlobal = async () => {
      const data = await apiService.getGlobalData();
      if (data) setGlobalData(data);
    };
    fetchGlobal();
  }, []);

  const openQuote = () => {
    setIsQuoteModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeQuote = () => {
    setIsQuoteModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="relative bg-[#030712]">
      <Navbar onGetQuote={openQuote} activeSectionId={null} globalData={globalData} />
      <WordPressPage onGetQuote={openQuote} />
      <WhatsAppButton activeSection={null} />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuote} preselectedService="Website Design" preselectedPlan="" />
    </div>
  );
};

const PublicSite: React.FC = () => {
  useScrollReveal();  // powers scroll-triggered reveal animations site-wide

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

        {/* ── Core Services Grid (Adstika-style accordion cards) ── */}
        <ServicesGrid onGetQuote={(serviceName) => openQuoteModal(serviceName as any)} />
        
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

      <footer className="py-20 px-6 border-t border-amber-500/10 bg-[#05050e] relative overflow-hidden">
        {/* Subtle amber glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-amber-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 relative z-10">
          <div className="space-y-4 flex flex-col items-center md:items-start">
            {globalData?.logoUrl ? (
              <img src={globalData.logoUrl} alt={globalData.siteName || BRAND_NAME} className="h-10 w-auto" />
            ) : (
              <MadsagLogo className="h-9 w-auto" />
            )}
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em]">{SLOGAN}</p>
            {globalData?.footerText && (
               <p className="text-gray-500 text-xs font-medium max-w-sm">{globalData.footerText}</p>
            )}
            {globalData?.contactEmail && (
              <a href={`mailto:${globalData.contactEmail}`} className="text-gray-400 hover:text-amber-400 text-xs font-medium transition-colors">
                <i className="fa-solid fa-envelope mr-2 text-amber-500/50" />{globalData.contactEmail}
              </a>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-12 w-full md:w-auto">
             <div className="space-y-4">
               <h4 className="text-white font-black text-xs uppercase tracking-widest text-center md:text-left">Navigation</h4>
               <ul className="space-y-2.5 text-sm text-gray-500 font-bold text-center md:text-left">
                 <li><a href="#hero" className="hover:text-amber-400 transition-colors">Home</a></li>
                 <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Portfolio</a></li>
                 <li><a href="#process" className="hover:text-amber-400 transition-colors">Strategy</a></li>
                 <li><a href="#blog" className="hover:text-amber-400 transition-colors">Journal</a></li>
                 <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
               </ul>
             </div>
             <div className="space-y-4">
               <h4 className="text-white font-black text-xs uppercase tracking-widest text-center md:text-left">Connect</h4>
               <div className="flex gap-3 justify-center md:justify-start">
                 <a href="https://linkedin.com/company/madsag" target="_blank" rel="noopener" className="w-9 h-9 bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/10 rounded-xl flex items-center justify-center transition-all text-gray-400 hover:text-amber-400"><i className="fa-brands fa-linkedin-in text-sm"></i></a>
                 <a href="https://instagram.com/madsag.agency" target="_blank" rel="noopener" className="w-9 h-9 bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/10 rounded-xl flex items-center justify-center transition-all text-gray-400 hover:text-amber-400"><i className="fa-brands fa-instagram text-sm"></i></a>
                 <a href="https://wa.me/919896336357" target="_blank" rel="noopener" className="w-9 h-9 bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/10 rounded-xl flex items-center justify-center transition-all text-gray-400 hover:text-amber-400"><i className="fa-brands fa-whatsapp text-sm"></i></a>
               </div>
             </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} {globalData?.siteName || BRAND_NAME}. All rights reserved.</p>
          <p className="text-amber-500/30">Engineering Market Dominance</p>
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
