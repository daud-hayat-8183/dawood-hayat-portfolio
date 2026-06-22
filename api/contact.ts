import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'daudhayat51@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

// Define the validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(80),
  email: z.string().email('Invalid email address').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  projectType: z.string().max(50).optional(),
  budgetRange: z.string().max(50).optional(),
  botcheck: z.string().max(0, 'Bot detected').optional(),
});

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. Server-side Validation
    const data = contactSchema.parse(req.body);

    // 2. Honeypot check (Spam Protection)
    if (data.botcheck && data.botcheck.length > 0) {
      console.warn('Bot detected via honeypot');
      return res.status(400).json({ error: 'Invalid submission' });
    }

    // 3. Prepare Email Content
    const emailHtml = `
      <h2>New Portfolio Inquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Project Type:</strong> ${data.projectType || 'N/A'}</p>
      <p><strong>Budget Range:</strong> ${data.budgetRange || 'N/A'}</p>
      <hr />
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, '<br />')}</p>
    `;

    // 4. Send Email via Resend
    const { data: resendData, error } = await resend.emails.send({
      from: \`Portfolio Contact <\${FROM_EMAIL}>\`,
      to: [TO_EMAIL],
      subject: \`New Inquiry from \${data.name} — Portfolio\`,
      html: emailHtml,
      reply_to: data.email,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }

    // 5. Success Response
    return res.status(200).json({ success: true, id: resendData?.id });

  } catch (error) {
    console.error('Contact Form Error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input. Please check your details and try again.' });
    }
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
}
