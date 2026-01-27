
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * 
 * Handles all outgoing requests to the Strapi CMS backend.
 * Strapi requires payloads to be wrapped in a "data" object for collection types.
 */
export const apiService = {
  /**
   * Submits a project brief to the Strapi 'Leads' collection.
   * 
   * @param formData The raw form data from QuoteModal
   * @returns Promise containing the Strapi response
   */
  submitLead: async (formData: QuoteFormData) => {
    try {
      // 1. Prepare the payload as per Strapi v4/v5 specifications
      const payload = {
        data: {
          ...formData,
          // You can add metadata here
          submittedAt: new Date().toISOString(),
          source: 'Website_Main_Modal'
        }
      };

      // 2. Execute the POST request
      const response = await fetch(`${STRAPI_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If you use an API Token (recommended), add it here:
          // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        body: JSON.stringify(payload),
      });

      // 3. Handle potential error codes (4xx, 5xx)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error?.message || 'Strategic deployment failed at API level.');
      }

      return await response.json();
    } catch (error) {
      console.error('API_SUBMISSION_ERROR:', error);
      throw error;
    }
  }
};
