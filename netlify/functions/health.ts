import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      status: 'healthy',
      app: 'NEXUS Global Travel & Visa Solutions',
      office: 'Civic Center, Office No. 56, Main GT Road, Gujranwala',
      environment: 'Netlify Serverless Edge/Functions',
      timestamp: new Date().toISOString(),
    }),
  };
};
