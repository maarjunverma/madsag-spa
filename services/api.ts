
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * 
 * Handles cross-origin POST requests to the Strapi CMS.
 * Payload is strictly mapped to the Strapi 'Lead' collection schema.
 */
export const apiService = {
  /**
   * Submits a lead to the Strapi 'Leads' collection.
   * Path: /api/leads
   * 
   * @param formData The data from the QuoteModal
   */
  submitLead: async (formData: QuoteFormData) => {
    // Exact endpoint from Strapi route configuration
    const endpoint = `${STRAPI_URL}/api/leads`;
    
    // STRICT KEY MATCHING (Case-Sensitive as per Strapi Content-Type)
    // We EXCLUDE keys not defined in your Strapi Lead schema (e.g., source, submittedAt, whatsappApproval)
    const payload = {
      data: {
        FullName: formData.FullName,
        Mobile_number: formData.Mobile_number,
        Email: formData.Email,
        Inquiry_subject: formData.Inquiry_subject,
        url: formData.url || '',
        Message: formData.Message
      }
    };

    try {
      console.log('Deploying lead to:', endpoint, 'with payload:', payload);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `API Error: ${response.status}`;
        try {
          const errorJson = await response.json();
          // Extract Strapi-specific validation messages
          errorMessage = errorJson?.error?.message || errorMessage;
          if (errorJson?.error?.details?.errors) {
            const details = errorJson.error.details.errors.map((e: any) => e.message).join(', ');
            errorMessage += ` (${details})`;
          }
        } catch (e) {
          // Fallback if response isn't JSON
        }
        
        if (response.status === 403) {
          throw new Error('ACCESS_FORBIDDEN: Please verify that "create" permission is enabled for the Public role in Strapi.');
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Transmission Failure:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('NETWORK_ERROR: Unable to connect to the API server. Check CORS settings or URL.');
      }
      throw error;
    }
  }
};
