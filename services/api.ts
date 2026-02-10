
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * 
 * Optimized for the provided Strapi schema:
 * Attributes: FullName, email, phone (Number), projectType, budget, url, description
 */
export const apiService = {
  /**
   * Submits a lead to the Strapi 'Leads' collection.
   * Path: /api/leads
   */
  submitLead: async (formData: QuoteFormData) => {
    // Normalize Base URL
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    const endpoint = `${baseUrl}/api/leads`;
    
    // Process phone: The Strapi image shows it as a 'Number' type (123 icon).
    // We must strip non-numeric characters so it doesn't cause a 500 error.
    const numericPhone = formData.phone.replace(/\D/g, '');

    // Payload keys MUST match the API IDs in the Strapi screenshot exactly.
    const payload = {
      data: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: numericPhone ? parseInt(numericPhone, 10) : 0, 
        projectType: formData.projectType.trim(),
        budget: formData.budget.trim(),
        description: formData.description.trim(),
        url: formData.url?.trim() || ""
      }
    };

    try {
      console.log('--- API TRANSMISSION START ---');
      console.log('Target Endpoint:', endpoint);
      console.log('Schema Mapping (Image Sync):', payload.data);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Transmission Successful:', result);
        return result;
      }

      // Handle server-side validation or internal errors
      let errorMessage = `Server responded with ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('Detailed Backend Error:', errorData);
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (e) {
        console.error('Non-JSON error response.');
      }

      if (response.status === 500) {
        throw new Error("INTERNAL_SERVER_ERROR (500): Check field names (FullName, projectType, etc.) and ensure 'phone' is receiving a valid number.");
      }

      throw new Error(errorMessage);

    } catch (error: any) {
      console.error('--- API TRANSMISSION FAILED ---');
      console.error(error);
      throw error;
    }
  }
};
