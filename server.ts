import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface InquiryItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  visaType: string;
  message: string;
  office: string;
  createdAt: string;
  status: string;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON & URL-encoded request body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // In-memory lead storage for active session inquiries
  const consultationInquiries: InquiryItem[] = [];

  // ==========================================
  // BACKEND API ROUTES (Mounted FIRST)
  // ==========================================

  // 1. Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'NEXUS Global Travel & Visa Solutions Backend',
      office: 'Civic Center, Office No. 56, Main GT Road, Gujranwala',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // 2. Submit new consultation booking
  app.post('/api/consultation', (req: Request, res: Response) => {
    try {
      const { fullName, phone, email, destination, visaType, message } = req.body || {};

      // Server-side validation
      if (!fullName || !String(fullName).trim()) {
        return res.status(400).json({
          success: false,
          error: 'Full name is required.',
        });
      }

      if (!phone || !String(phone).trim()) {
        return res.status(400).json({
          success: false,
          error: 'Contact phone / WhatsApp number is required.',
        });
      }

      if (!email || !String(email).trim()) {
        return res.status(400).json({
          success: false,
          error: 'Email address is required.',
        });
      }

      // Generate unique inquiry docket identifier
      const refSuffix = Math.floor(100 + Math.random() * 900);
      const inquiryId = `NX-${Date.now().toString(36).toUpperCase()}-${refSuffix}`;

      const newInquiry: InquiryItem = {
        id: inquiryId,
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: String(email).trim(),
        destination: destination || 'General Inquiry',
        visaType: visaType || 'Study / Visit Visa Consultation',
        message: message ? String(message).trim() : '',
        office: 'Civic Center, Office No. 56, Main GT Road, Gujranwala',
        createdAt: new Date().toISOString(),
        status: 'pending_counselor_assignment',
      };

      consultationInquiries.unshift(newInquiry);
      // Keep up to 200 inquiries in memory
      if (consultationInquiries.length > 200) {
        consultationInquiries.pop();
      }

      console.log(`[NEXUS Server] New Inquiry Docket Registered: ${inquiryId}`, {
        applicant: newInquiry.fullName,
        destination: newInquiry.destination,
        visaType: newInquiry.visaType,
      });

      return res.status(201).json({
        success: true,
        inquiryId,
        message: 'Your consultation inquiry has been officially registered with NEXUS Global Travel & Visa Solutions.',
        data: newInquiry,
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Server error';
      console.error('[NEXUS Server Error]', msg);
      return res.status(500).json({
        success: false,
        error: 'Failed to process consultation submission.',
        details: msg,
      });
    }
  });

  // 3. Retrieve consultation inquiries (administrative view)
  app.get('/api/inquiries', (_req: Request, res: Response) => {
    res.json({
      success: true,
      total: consultationInquiries.length,
      office: 'Civic Center, Office No. 56, Main GT Road, Gujranwala',
      inquiries: consultationInquiries,
    });
  });

  // ==========================================
  // STATIC ASSETS & VITE MIDDLEWARE
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NEXUS Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
