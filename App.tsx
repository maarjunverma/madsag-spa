
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import FAQSection from './components/FAQSection';
import BlogSection from './components/BlogSection';
import CTASection from './components/CTASection';
import WhatsAppButton from './components/WhatsAppButton';
import TechStack from './components/TechStack';
import TrustBadges from './components/TrustBadges';
import QuoteModal from './components/QuoteModal';
import PortfolioModal from './components/PortfolioModal';
import BlogModal from './components/BlogModal';
import ServiceDetailView from './components/ServiceDetailView';
import ServicesGrid from './components/ServicesGrid';
import AboutPage from './components/AboutPage';
import WordPressPage from './components/WordPressPage';
import ServicePage from './components/ServicePage';
import AdminApp from './admin/AdminApp';
import { SERVICE_PAGE_DATA } from './data/servicePageData';
import { SERVICES } from './constants';
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
      <Route path="/services/landing-page" element={<ServiceRoute slug="landing-page" />} />
      <Route path="/services/advertisements" element={<ServiceRoute slug="advertisements" />} />
      <Route path="/services/chatbots" element={<ServiceRoute slug="chatbots" />} />
      <Route path="/services/social-media" element={<ServiceRoute slug="social-media" />} />
      <Route path="/services/website-dev" element={<ServiceRoute slug="website-dev" />} />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
};

// ── Generic Service Route wrapper ──────────────────────────────────────────
const ServiceRoute: React.FC<{ slug: string }> = ({ slug }) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const pageData = SERVICE_PAGE_DATA[slug];

  useEffect(() => {
    const fetchGlobal = async () => {
      const data = await apiService.getGlobalData();
      if (data) setGlobalData(data);
    };
    fetchGlobal();
  }, []);

  const openQuote = () => { setIsQuoteModalOpen(true); document.body.style.overflow = 'hidden'; };
  const closeQuote = () => { setIsQuoteModalOpen(false); document.body.style.overflow = 'auto'; };

  if (!pageData) return null;

  return (
    <div className="relative bg-[#030712]">
      <Navbar onGetQuote={openQuote} activeSectionId={null} globalData={globalData} />
      <ServicePage data={pageData} onGetQuote={openQuote} />
      <Footer globalData={globalData} onGetQuote={openQuote} />
      <WhatsAppButton activeSection={null} />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuote} preselectedService="" preselectedPlan="" />
    </div>
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

    // ── Cross-page anchor navigation ───────────────────────────────
    // When Navbar navigates from a service/about page to '/' with a
    // target section stored in sessionStorage, scroll to it on mount.
    const scrollTarget = sessionStorage.getItem('scrollTo');
    if (scrollTarget) {
      sessionStorage.removeItem('scrollTo');
      // Give the page one frame to paint before scrolling
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      });
    }
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
        <TrustBadges />

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

      <Footer globalData={globalData} onGetQuote={() => openQuoteModal()} />


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
