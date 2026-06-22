import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'daudhayat51@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

// In-memory rate limiting map (IP -> timestamps array)
// Note: For production on Vercel, Upstash Redis/Vercel KV is highly recommended.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 3;

// Safe HTML escaping function
function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Define the strictly validated schema
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80),
  email: z.string().trim().email('Invalid email address').max(100),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
  projectType: z.string().trim().max(50).optional(),
  budgetRange: z.string().trim().max(50).optional(),
  botcheck: z.string().max(0, 'Bot detected').optional(),
  'cf-turnstile-response': z.string().optional(),
}).strict();

export default async function handler(req: any, res: any) {
  // 1. Method Validation
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Enforce JSON
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ error: 'Invalid content type' });
  }

  try {
    // 2. Origin Validation
    const origin = req.headers.origin;
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
    if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
       return res.status(403).json({ error: 'Origin not allowed' });
    }

    // 3. Rate Limiting (In-memory best effort)
    const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
    const now = Date.now();
    
    if (ip !== 'unknown') {
      let requests = rateLimitMap.get(ip) || [];
      requests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);
      if (requests.length >= RATE_LIMIT_MAX_REQUESTS) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }
      requests.push(now);
      rateLimitMap.set(ip, requests);
    }

    // 4. Strict Schema Parsing
    const data = contactSchema.parse(req.body);

    // 5. Honeypot check (Spam Protection)
    if (data.botcheck && data.botcheck.length > 0) {
      return res.status(400).json({ error: 'Invalid submission' });
    }

    // 6. Turnstile Verification (if configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const turnstileToken = data['cf-turnstile-response'];
      if (!turnstileToken) {
        return res.status(400).json({ error: 'Security verification failed. Please try again.' });
      }

      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const verifyRes = await fetch(verifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: ip !== 'unknown' ? ip : undefined
        })
      });

      const outcome = await verifyRes.json();
      if (!outcome.success) {
        return res.status(400).json({ error: 'Security verification failed. Please try again.' });
      }
    } else {
      console.warn('Turnstile secret key not configured. Proceeding without verification.');
    }

    // 7. HTML Escaping and Email Preparation
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeCompany = escapeHtml(data.company || 'N/A');
    const safeProjectType = escapeHtml(data.projectType || 'N/A');
    const safeBudgetRange = escapeHtml(data.budgetRange || 'N/A');
    const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />');

    const emailHtml = `
      <h2>New Portfolio Inquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Company:</strong> ${safeCompany}</p>
      <p><strong>Project Type:</strong> ${safeProjectType}</p>
      <p><strong>Budget Range:</strong> ${safeBudgetRange}</p>
      <hr />
      <h3>Message:</h3>
      <p>${safeMessage}</p>
    `;

    // 8. Send Email via Resend
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `New Inquiry from ${safeName} — Portfolio`,
      html: emailHtml,
      replyTo: data.email,
    });

    if (error) {
      console.error('Email delivery error occurred.');
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }

    // 9. Success Response
    return res.status(200).json({ success: true });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input. Please check your details and try again.' });
    }
    console.error('Contact endpoint error occurred.');
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
}
