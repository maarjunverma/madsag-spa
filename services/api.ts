
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * 
 * Handles cross-origin POST requests to the Strapi CMS with the precise 
 * key names requested in the lead data layout.
 */
export const apiService = {
  /**
   * Submits a lead to the Strapi 'Leads' collection.
   * 
   * @param formData The data mapping from the UI layout
   */
  submitLead: async (formData: QuoteFormData) => {
    const endpoint = `${STRAPI_URL}/api/leads`;
    
    const payload = {
      data: {
        FullName: formData.FullName,
        Mobile_number: formData.Mobile_number,
        Email: formData.Email,
        Inquiry_subject: formData.Inquiry_subject,
        url: formData.url,
        Message: formData.Message,
        submittedAt: new Date().toISOString(),
        source: typeof window !== 'undefined' ? window.location.hostname : 'madsag.in'
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

      if (!response.ok) {
        let errorMessage = `Server responded with ${response.status}`;
        try {
          const errorJson = await response.json();
          errorMessage = errorJson?.error?.message || errorMessage;
        } catch (e) {}
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error: any) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network Error: Please check your internet or API CORS settings.');
      }
      throw error;
    }
  }
};
