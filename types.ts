
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

/**
 * STRAPI SCHEMA MAPPING - STRICT ALIGNMENT
 * Updated based on the provided Strapi screenshot to match API IDs exactly.
 */
export interface QuoteFormData {
  FullName: string;   // Matches "FullName" in image
  email: string;      // Matches "email" in image
  phone: string;      // Matches "phone" in image (Note: Strapi Number type requires numeric string or number)
  projectType: string; // Matches "projectType" in image
  budget: string;      // Matches "budget" in image
  description: string; // Matches "description" in image
  url?: string;        // Matches "url" in image
}
