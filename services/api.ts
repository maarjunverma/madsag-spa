
import { STRAPI_URL } from '../constants';
import { GlobalData, BlogPost, PortfolioItem } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * Endpoint: https://api.madsag.in
 */

/** Extracts a media URL from a Strapi field, supporting both v4 and v5 response shapes. */
function mediaUrl(field: any, baseUrl: string): string {
  // Strapi v5 flat: { url: "/uploads/..." }
  if (field?.url) return `${baseUrl}${field.url}`;
  // Strapi v4 nested: { data: { attributes: { url: "/uploads/..." } } }
  if (field?.data?.attributes?.url) return `${baseUrl}${field.data.attributes.url}`;
  return '';
}

interface StrapiLeadPayload {
  FullName: string;
  Email: string;
  Mobile_number: string;
  Inquiry_subject: string;
  url?: string;
  Message: string;
}

export const apiService = {
  /**
   * Fetches global site configuration from Strapi.
   * Endpoint: GET /api/global?populate=deep
   */
  getGlobalData: async (): Promise<GlobalData | null> => {
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    const endpoint = `${baseUrl}/api/global?populate[seo][populate]=*&populate[logo][populate]=*&populate[favicon][populate]=*`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch global config');

      const { data } = await response.json();
      if (!data) return null;

      const attrs = data.attributes ?? data;
      return {
        siteName: attrs.siteName || 'MADSAG',
        siteDescription: attrs.siteDescription || '',
        logoUrl: mediaUrl(attrs.logo, baseUrl) || undefined,
        faviconUrl: mediaUrl(attrs.favicon, baseUrl) || undefined,
        footerText: attrs.footerText || '',
        contactEmail: attrs.contactEmail || '',
        contactPhone: attrs.contactPhone || '',
        seo: {
          metaTitle: attrs.seo?.metaTitle || attrs.siteName,
          metaDescription: attrs.seo?.metaDescription || attrs.siteDescription,
          keywords: attrs.seo?.keywords,
          shareImage: mediaUrl(attrs.seo?.shareImage, baseUrl) || undefined,
        },
      };
    } catch (error) {
      console.error('Global Config Fetch Error:', error);
      return null;
    }
  },

  /**
   * Submits a lead to Strapi 'Lead' collection type.
   * Endpoint: POST /api/leads
   *
   * Strapi Schema Fields:
   *   FullName         (String, mandatory)
   *   Mobile_number    (String, mandatory)
   *   Email            (String, mandatory)
   *   Inquiry_subject  (String, mandatory)
   *   url              (String, optional)
   *   Message          (Text, mandatory)
   */
  submitLead: async (leadData: StrapiLeadPayload): Promise<void> => {
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    const endpoint = `${baseUrl}/api/leads`;

    const payload = {
      data: {
        FullName: leadData.FullName,
        Mobile_number: leadData.Mobile_number,
        Email: leadData.Email,
        Inquiry_subject: leadData.Inquiry_subject,
        url: leadData.url || '',
        Message: leadData.Message,
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage =
        result?.error?.details?.errors?.[0]?.message ||
        result?.error?.message ||
        `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return result;
  },
  /**
   * Fetches published blog posts from Strapi.
   * Endpoint: GET /api/blog-posts
   */
  getBlogPosts: async (): Promise<BlogPost[]> => {
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    try {
      const response = await fetch(`${baseUrl}/api/blog-posts?sort=createdAt:desc&populate=*`);
      if (!response.ok) return [];
      const { data } = await response.json();
      if (!data) return [];
      return data.map((item: any) => {
        const a = item.attributes ?? item;
        return {
          id: String(item.id),
          strapiId: item.id,
          title: a.title ?? '',
          excerpt: a.excerpt ?? '',
          content: a.content ?? '',
          author: a.author ?? '',
          date: a.publishedAt
            ? new Date(a.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            : new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          category: a.category ?? 'General',
          image: mediaUrl(a.image, baseUrl),
          readTime: a.readTime ?? '5 min read',
        } as BlogPost;
      });
    } catch {
      return [];
    }
  },

  /**
   * Fetches published portfolio items from Strapi.
   * Endpoint: GET /api/portfolio-items
   */
  getPortfolioItems: async (): Promise<PortfolioItem[]> => {
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    try {
      const response = await fetch(`${baseUrl}/api/portfolio-items?sort=createdAt:desc&populate=*`);
      if (!response.ok) return [];
      const { data } = await response.json();
      if (!data) return [];
      return data.map((item: any) => {
        const a = item.attributes ?? item;
        const tags = Array.isArray(a.tags)
          ? a.tags
          : typeof a.tags === 'string'
          ? a.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : [];
        return {
          id: String(item.id),
          strapiId: item.id,
          title: a.title ?? '',
          client: a.client ?? '',
          thumbnail: mediaUrl(a.thumbnail, baseUrl),
          description: a.description ?? '',
          challenge: a.challenge ?? '',
          solution: a.solution ?? '',
          result: a.result ?? '',
          images: (Array.isArray(a.images?.data) ? a.images.data : Array.isArray(a.images) ? a.images : []).map(
            (img: any) => mediaUrl(img, baseUrl)
          ).filter(Boolean),
          tags,
          liveUrl: a.liveUrl ?? '',
        } as PortfolioItem;
      });
    } catch {
      return [];
    }
  },
};
