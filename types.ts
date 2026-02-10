
export enum ServiceType {
  WEBSITE_DESIGN = 'Website Design',
  PERFORMANCE_MARKETING = 'Performance Marketing',
  LANDING_PAGE = 'Landing Page Development',
  SHOPIFY = 'Shopify E-commerce Development'
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | ServiceType;
}

export interface ServicePackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  deliveryTime: string;
  revisions: string;
  recommended?: boolean;
}

export interface RoadmapItem {
  phase: string;
  objective: string;
  status: 'Complete' | 'In Progress' | 'Planned';
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  thumbnail: string;
  fullPageImage?: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  images: string[];
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export interface Service {
  id: string;
  name: ServiceType;
  description: string;
  fullDescription: string;
  icon: string;
  features: string[];
  gradient: string;
  roadmap: RoadmapItem[];
  stats: { label: string; value: string }[];
  portfolio?: PortfolioItem[];
  packages?: ServicePackage[];
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface QuoteFormData {
  fullname: string;   
  email: string;      
  phone: string;      
  projectType: string; 
  budget: string;      
  description: string; 
  url?: string;
  // Dynamic fields
  targetAudience?: string;
  marketingGoals?: string;
  productCount?: string;
  targetKeywords?: string;
}

/**
 * GLOBAL CONFIGURATION INTERFACES
 */
export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  shareImage?: string;
}

export interface GlobalData {
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  seo: SEOConfig;
  footerText?: string;
  contactEmail?: string;
  contactPhone?: string;
}
