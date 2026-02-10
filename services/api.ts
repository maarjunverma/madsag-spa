
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * 
 * Optimized for Strapi v4/v5 compatibility.
 * Ensures strict endpoint targeting and data structure.
 */
export const apiService = {
  /**
   * Submits a lead to the Strapi 'Leads' collection.
   * Path: /api/leads
   */
  submitLead: async (formData: QuoteFormData) => {
    // Ensure URL doesn't double up by stripping any trailing slash from base
    const baseUrl = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;
    const endpoint = `${baseUrl}/api/leads`;
    
    // Construct base data object - MUST MATCH STRAPI SCHEMA CASE SENSITIVE
    const data: Record<string, string> = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      projectType: formData.projectType.trim(),
     description: formData.description.trim()
    };

    // ONLY add 'url' if it actually has a value to prevent validation errors on empty strings
    if (formData.url && formData.url.trim().length > 0) {
      data.url = formData.url.trim();
    }

    const payload = { data };

    try {
      console.log('--- API TRANSMISSION START ---');
      console.log('Target Endpoint:', endpoint);
      console.log('Final Payload:', payload);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Handle successful response
      if (response.ok) {
        const result = await response.json();
        console.log('Transmission Successful:', result);
        return result;
      }

      // Handle Errors (4xx, 5xx)
      let errorMessage = `Server responded with ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('Detailed Server Error:', errorData);
        
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (parseError) {
        console.error('Could not parse error response body');
      }

      if (response.status === 405) {
        throw new Error('METHOD_NOT_ALLOWED (405): The endpoint URL is incorrect or the backend does not allow POST here. Check Strapi routes.');
      }

      if (response.status === 500) {
        throw new Error(`INTERNAL_SERVER_ERROR (500): The backend failed. Verify that all required fields (FullName, Mobile_number, Email, Inquiry_subject, Message) are correctly mapped in Strapi.`);
      }

      throw new Error(errorMessage);

    } catch (error: any) {
      console.error('--- API TRANSMISSION FAILED ---');
      console.error(error);
      throw error;
    }
  }
};
