import type { Handler, HandlerEvent } from '@netlify/functions';

interface ConsultationPayload {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  visaType: string;
  message?: string;
}

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Pre-flight CORS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  // Health check / Service info via GET
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'ok',
        service: 'NEXUS Global Travel & Visa Solutions Backend',
        office: 'Civic Center, Office No. 56, Main GT Road, Gujranwala',
        timestamp: new Date().toISOString(),
      }),
    };
  }

  // Handle consultation booking via POST
  if (event.httpMethod === 'POST') {
    try {
      const body: ConsultationPayload = JSON.parse(event.body || '{}');
      const { fullName, phone, email, destination, visaType, message } = body;

      // Real-time server-side validation
      if (!fullName || !phone || !email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Missing mandatory fields: full name, phone number, and email are required.',
          }),
        };
      }

      // Generate unique case inquiry reference docket
      const refSuffix = Math.floor(100 + Math.random() * 900);
      const inquiryId = `NX-${Date.now().toString(36).toUpperCase()}-${refSuffix}`;

      const inquiryRecord = {
        inquiryId,
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: String(email).trim(),
        destination: destination || 'General Inquiry',
        visaType: visaType || 'Study / Visit Visa Consultation',
        message: message ? String(message).trim() : '',
        createdAt: new Date().toISOString(),
        office: 'Civic Center, Office No. 56, Main GT Road, Gujranwala',
        status: 'pending_counselor_assignment',
      };

      console.log(`[NEXUS Netlify Function] New Inquiry Docket Registered: ${inquiryId}`, inquiryRecord);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          inquiryId,
          message: 'Your consultation inquiry has been officially registered with NEXUS Global Travel & Visa Solutions.',
          data: inquiryRecord,
        }),
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid consultation request payload.',
          details: errorMessage,
        }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
};
