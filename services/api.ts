
import { STRAPI_URL } from '../constants';
import { QuoteFormData, GlobalData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 */
export const apiService = {
  /**
   * Fetches global site configuration from Strapi.
   * Path: /api/global?populate=*
   */
  getGlobalData: async (): Promise<GlobalData | null> => {
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    const endpoint = `${baseUrl}/api/global?populate=deep`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch global config');
      
      const { data } = await response.json();
      if (!data) return null;

      const attrs = data.attributes;
      return {
        siteName: attrs.siteName || "MADSAG",
        siteDescription: attrs.siteDescription || "",
        logoUrl: attrs.logo?.data?.attributes?.url ? `${baseUrl}${attrs.logo.data.attributes.url}` : undefined,
        faviconUrl: attrs.favicon?.data?.attributes?.url ? `${baseUrl}${attrs.favicon.data.attributes.url}` : undefined,
        footerText: attrs.footerText || "",
        contactEmail: attrs.contactEmail || "",
        contactPhone: attrs.contactPhone || "",
        seo: {
          metaTitle: attrs.seo?.metaTitle || attrs.siteName,
          metaDescription: attrs.seo?.metaDescription || attrs.siteDescription,
          keywords: attrs.seo?.keywords,
          shareImage: attrs.seo?.shareImage?.data?.attributes?.url ? `${baseUrl}${attrs.seo.shareImage.data.attributes.url}` : undefined
        }
      };
    } catch (error) {
      console.error('Global Config Fetch Error:', error);
      return null;
    }
  },

  /**
   * Submits a lead to the Strapi 'Leads' collection.
   */
  submitLead: async (formData: QuoteFormData) => {
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    const endpoint = `${baseUrl}/api/leads`;
    
    const numericPhoneString = formData.phone.replace(/\D/g, '');

    // Combine dynamic fields into description if Strapi schema doesn't have explicit fields
    // or send them directly if preferred. Here we send them directly assuming schema updates.
    const payload = {
      data: {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        phone: numericPhoneString,
        projectType: formData.projectType.trim(),
        budget: formData.budget.trim(),
        description: formData.description.trim(),
        url: formData.url?.trim() || "",
        // Service specific fields
        targetAudience: formData.targetAudience?.trim(),
        marketingGoals: formData.marketingGoals?.trim(),
        productCount: formData.productCount?.trim(),
        targetKeywords: formData.targetKeywords?.trim()
      }
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) return result;
      
      let errorMessage = `Status ${response.status}`;
      if (result?.error?.message) errorMessage = result.error.message;
      throw new Error(errorMessage);
    } catch (error: any) {
      console.error('API Transmission Failed:', error);
      throw error;
    }
  }
};
