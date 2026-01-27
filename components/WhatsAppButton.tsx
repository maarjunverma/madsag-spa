
import React, { useEffect, useState } from 'react';
import { BRAND_NAME, WHATSAPP_PHONE } from '../constants';
import { ServiceType } from '../types';

interface WhatsAppButtonProps {
  activeSection: string | null;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ activeSection }) => {
  const [currentService, setCurrentService] = useState<string>('Digital');

  useEffect(() => {
    if (activeSection) {
      const serviceNameMap: Record<string, string> = {
        'website-design': ServiceType.WEBSITE_DESIGN,
        'performance-marketing': ServiceType.PERFORMANCE_MARKETING,
        'landing-page': ServiceType.LANDING_PAGE,
        'shopify-development': ServiceType.SHOPIFY
      };
      
      if (serviceNameMap[activeSection]) {
        setCurrentService(serviceNameMap[activeSection]);
      } else {
        setCurrentService('Digital');
      }
    }
  }, [activeSection]);

  const message = `I want to discuss ${currentService} solutions with the ${BRAND_NAME} team. Please assist.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-amber-500 text-black px-4 py-2 rounded-xl shadow-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap relative">
          Chat with Strategy
          <div className="absolute top-full right-6 w-3 h-3 bg-amber-500 rotate-45 -translate-y-1/2"></div>
        </div>
      </div>

      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 relative"
      >
        <i className="fa-brands fa-whatsapp text-white text-3xl"></i>
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
