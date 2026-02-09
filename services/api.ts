
import { STRAPI_URL } from '../constants';
import { QuoteFormData } from '../types';

/**
 * MADSAG STRATEGIC API SERVICE
 * 
 * Optimized for Strapi v4/v5 compatibility.
 * Handles strict field mapping and deep error diagnostics.
 */
export const apiService = {
  /**
   * Submits a lead to the Strapi 'Leads' collection.
   * Path: /api/leads
   */
  submitLead: async (formData: QuoteFormData) => {
    const endpoint = `${STRAPI_URL}/api/leads`;
    
    // Construct base data object
    const data: Record<string, string> = {
      FullName: formData.FullName.trim(),
      Mobile_number: formData.Mobile_number.trim(),
      Email: formData.Email.trim(),
      Inquiry_subject: formData.Inquiry_subject.trim(),
      Message: formData.Message.trim()
    };

    // ONLY add 'url' if it actually has a value to prevent validation errors on empty strings
    if (formData.url && formData.url.trim().length > 0) {
      data.url = formData.url.trim();
    }

    const payload = { data };

    try {
      console.log('--- API TRANSMISSION START ---');
      console.log('Target:', endpoint);
      console.log('Payload:', payload);
      
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
        console.error('Server Error Detail:', errorData);
        
        // Strapi error format parsing
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
          if (errorData.error.details?.errors) {
            const specifics = errorData.error.details.errors
              .map((e: any) => `${e.path}: ${e.message}`)
              .join(', ');
            errorMessage += ` (${specifics})`;
          }
        }
      } catch (parseError) {
        console.error('Could not parse error response body');
      }

      if (response.status === 500) {
        throw new Error(`INTERNAL_SERVER_ERROR (500): The backend crashed. This usually means a field type mismatch (e.g. sending text to a number field) or a database constraint. Check Strapi logs.`);
      }

      if (response.status === 403) {
        throw new Error('FORBIDDEN (403): Check Public Role permissions for "Lead" create action.');
      }

      throw new Error(errorMessage);

    } catch (error: any) {
      console.error('--- API TRANSMISSION FAILED ---');
      console.error(error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('NETWORK_FAILURE: The API server is unreachable or CORS is blocking the request.');
      }
      throw error;
    }
  }
};
