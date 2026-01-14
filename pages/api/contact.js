import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, inquiryType, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    // Auto-response to user
    const userEmail = {
      to: email,
      from: {
        email: 'contact@on-tonight.com',
        name: 'OnTonight'
      },
      replyTo: 'jackjoy@on-tonight.com',
      subject: 'We received your message',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #d4a373;">Thanks for reaching out, ${name}!</h2>
          <p>We've received your ${inquiryType || 'inquiry'} and will get back to you within 24-48 hours.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #d4a373; margin: 24px 0;">
            <p style="margin: 0;"><strong>Your Message:</strong></p>
            <p style="margin: 8px 0 0 0; color: #666;">${message}</p>
          </div>
          <p>In the meantime, check out our <a href="https://on-tonight.com" style="color: #d4a373;">platform</a> or follow us on <a href="https://instagram.com/ontonight" style="color: #d4a373;">Instagram</a>.</p>
          <p style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e0e0e0; color: #666; font-size: 13px;">
            OnTonight | Your Night. Your People. Where Regulars Are Made.
          </p>
        </body>
        </html>
      `
    };

    // Notification to team
    const teamEmail = {
      to: ['contact@on-tonight.com', 'admin@on-tonight.com'],
      from: {
        email: 'admin@on-tonight.com',
        name: 'OnTonight Contact Form'
      },
      subject: `📬 New Contact: ${name} - ${inquiryType || 'General'}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #d4a373; color: white; padding: 16px; border-radius: 6px 6px 0 0;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="background: #f8f9fa; padding: 24px; border-radius: 0 0 6px 6px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
          </div>
        </div>
      `
    };

    await Promise.all([
      sgMail.send(userEmail),
      sgMail.send(teamEmail)
    ]);

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Contact Form Error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
