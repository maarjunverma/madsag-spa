
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * 
 * Handles cross-origin POST requests to the Strapi CMS.
 * Optimized to strictly match the Strapi collection schema.
 */
export const apiService = {
  /**
   * Submits a lead to the Strapi 'Leads' collection.
   * 
   * @param formData The data mapping from the UI layout
   */
  submitLead: async (formData: QuoteFormData) => {
    const endpoint = `${STRAPI_URL}/api/leads`;
    
    // We remove 'submittedAt' because Strapi generates 'createdAt' automatically.
    // Including undefined keys causes a 400 Bad Request or validation error.
    const payload = {
      data: {
        FullName: formData.FullName,
        Mobile_number: formData.Mobile_number,
        Email: formData.Email,
        Inquiry_subject: formData.Inquiry_subject,
        url: formData.url,
        Message: formData.Message,
        source: typeof window !== 'undefined' ? window.location.hostname : 'madsag.in'
      }
    };

    try {
      console.log('Transmitting lead payload to:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('ACCESS_FORBIDDEN: Please enable "create" permission for the Public Role in Strapi Settings.');
        }
        
        let errorMessage = `Server Error: ${response.status}`;
        try {
          const errorJson = await response.json();
          // If Strapi returns a validation error, it usually contains details about which key is invalid
          errorMessage = errorJson?.error?.message || errorMessage;
          if (errorJson?.error?.details?.errors) {
            const details = errorJson.error.details.errors.map((e: any) => e.message).join(', ');
            errorMessage = `${errorMessage} (${details})`;
          }
          console.error('Strapi Detailed Error:', errorJson);
        } catch (e) {}
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error: any) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('NETWORK_FAILURE: The API server is unreachable or CORS is blocking the request.');
      }
      throw error;
    }
  }
};
