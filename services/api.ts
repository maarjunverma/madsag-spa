
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 */
export const apiService = {
  /**
   * Submits a lead to the Strapi 'Leads' collection.
   * Path: /api/leads
   */
  submitLead: async (formData: QuoteFormData) => {
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    const endpoint = `${baseUrl}/api/leads`;
    
    // Process phone: We strip non-digits but keep it as a STRING.
    // Converting to an Integer (parseInt) causes a 500 error if the phone number 
    // is larger than 2,147,483,647 (max 32-bit int), which most phone numbers are.
    const numericPhoneString = formData.phone.replace(/\D/g, '');

    const payload = {
      data: {
        fullname: formData.fullname.trim(),
        email: formData.email.trim(),
        phone: numericPhoneString, // Sent as string to avoid DB integer overflow
        projectType: formData.projectType.trim(),
        budget: formData.budget.trim(),
        description: formData.description.trim(),
        url: formData.url?.trim() || ""
      }
    };

    try {
      console.log('Sending Payload to Strapi:', payload);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        return result;
      }

      // If we reach here, Strapi returned an error (400, 403, 500)
      console.error('Strapi Response Error:', result);
      
      let errorMessage = `Status ${response.status}`;
      if (result?.error?.message) {
        errorMessage = result.error.message;
      }
      
      throw new Error(errorMessage);

    } catch (error: any) {
      console.error('API Transmission Failed:', error);
      throw error;
    }
  }
};
