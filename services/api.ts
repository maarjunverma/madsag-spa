
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 */
export const apiService = {
  /**
   * Submits a lead to the Strapi 'Leads' collection.
   */
  submitLead: async (formData: QuoteFormData) => {
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    const endpoint = `${baseUrl}/api/leads`;
    
    // Process phone for Strapi Number field (123 icon)
    const numericPhone = formData.phone.replace(/\D/g, '');

    const payload = {
      data: {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        phone: numericPhone ? parseInt(numericPhone, 10) : 0, 
        projectType: formData.projectType.trim(),
        budget: formData.budget.trim(),
        description: formData.description.trim(),
        url: formData.url?.trim() || ""
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

      if (response.ok) {
        return await response.json();
      }

      let errorMessage = `Server responded with ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (e) {}

      throw new Error(errorMessage);
    } catch (error: any) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
