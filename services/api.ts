
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * 
 * Optimized for Strapi v4/v5 compatibility.
 * Ensures strict field mapping to the backend schema.
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
    
    // Construct the payload. Strapi requires the 'data' wrapper.
    const payload = {
      data: {
        FullName: formData.FullName.trim(),
        Mobile_number: formData.Mobile_number.trim(),
        Email: formData.Email.trim(),
        Inquiry_subject: formData.Inquiry_subject.trim(),
        Message: formData.Message.trim(),
        url: formData.url.trim() || ""
      }
    };

    try {
      console.log('--- API TRANSMISSION START ---');
      console.log('Endpoint:', endpoint);
      console.log('Payload:', payload);
      
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

      // Diagnose failures
      let errorMessage = `Server responded with ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('Detailed Server Error:', errorData);
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (e) {
        console.error('Non-JSON error response received.');
      }

      if (response.status === 500) {
        throw new Error("INTERNAL_SERVER_ERROR (500): Check Strapi logs. Likely a field validation failure or missing required column.");
      }

      if (response.status === 405) {
        throw new Error("METHOD_NOT_ALLOWED (405): The endpoint URL is likely incorrect. Check for trailing slashes or doubled paths.");
      }

      throw new Error(errorMessage);

    } catch (error: any) {
      console.error('--- API TRANSMISSION FAILED ---');
      console.error(error);
      throw error;
    }
  }
};
