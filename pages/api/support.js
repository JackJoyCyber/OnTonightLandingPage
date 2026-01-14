// /pages/api/support.js
// Copy this entire file to /pages/api/support.js on GitHub

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, category, priority, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Generate ticket number
  const ticketNumber = `ONT-${Date.now().toString().slice(-8)}`;

  // Priority color coding
  const priorityColors = {
    'High': '#ef4444',
    'Medium': '#f59e0b',
    'Low': '#22c55e'
  };
  const priorityColor = priorityColors[priority] || '#94a3b8';

  try {
    // Auto-response to user
    const userEmail = {
      to: email,
      from: 'support@on-tonight.com',
      replyTo: 'jackjoy@on-tonight.com',
      subject: `Support Ticket Created: ${ticketNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); padding: 40px 32px; text-align: center; border-bottom: 3px solid #d4a373;">
              <h1 style="margin: 0; color: #d4a373; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">OnTonight Support</h1>
              <p style="margin: 8px 0 0 0; color: rgba(248, 250, 252, 0.7); font-size: 14px;">We're here to help</p>
            </div>

            <!-- Content -->
            <div style="padding: 48px 32px;">
              <div style="background: #f0fdf4; border: 2px solid #86efac; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 32px;">
                <h2 style="margin: 0 0 8px 0; color: #166534; font-size: 18px;">✓ Support Ticket Created</h2>
                <p style="margin: 0; color: #166534; font-size: 24px; font-weight: 700; font-family: 'Courier New', monospace;">${ticketNumber}</p>
              </div>

              <h3 style="margin: 0 0 16px 0; color: #0a0a0f; font-size: 20px; font-weight: 600;">Hi ${name},</h3>
              
              <p style="margin: 0 0 16px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                We've received your support request and our team is on it!
              </p>

              <!-- Ticket Details -->
              <div style="background: #f8fafc; border-left: 4px solid #d4a373; padding: 20px; margin: 24px 0; border-radius: 4px;">
                <h4 style="margin: 0 0 16px 0; color: #0a0a0f; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Ticket Details</h4>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;"><strong>Ticket #:</strong></td>
                    <td style="padding: 8px 0; color: #0a0a0f; font-size: 14px; font-family: 'Courier New', monospace;">${ticketNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Subject:</strong></td>
                    <td style="padding: 8px 0; color: #0a0a0f; font-size: 14px;">${subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Category:</strong></td>
                    <td style="padding: 8px 0; color: #0a0a0f; font-size: 14px;">${category || 'General'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Priority:</strong></td>
                    <td style="padding: 8px 0;"><span style="display: inline-block; padding: 4px 12px; background: ${priorityColor}; color: white; border-radius: 4px; font-size: 12px; font-weight: 600;">${priority || 'Medium'}</span></td>
                  </tr>
                </table>
              </div>

              <!-- Response Time -->
              <div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 20px; margin: 24px 0; border-radius: 6px;">
                <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 16px; font-weight: 600;">📅 Expected Response Time</h4>
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  ${priority === 'High' ? 'Within 4 hours during business hours' : priority === 'Medium' ? 'Within 24 hours' : 'Within 48 hours'}
                </p>
              </div>

              <p style="margin: 24px 0 0 0; color: #475569; font-size: 14px; line-height: 1.6;">
                We'll respond to <strong>${email}</strong>. Please check your spam folder if you don't see our response.
              </p>

              <p style="margin: 16px 0 0 0; color: #475569; font-size: 14px; line-height: 1.6;">
                <strong>Keep this ticket number for reference:</strong> ${ticketNumber}
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px;">
                <strong>OnTonight Support Team</strong><br>
                support@on-tonight.com
              </p>
              <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 13px;">
                Tampa, Florida · Building hospitality infrastructure
              </p>
              <p style="margin: 20px 0 0 0; color: #94a3b8; font-size: 12px;">
                © 2026 OnTonight LLC. All rights reserved.
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    };

    // Admin notification
    const adminEmail = {
      to: ['support@on-tonight.com', 'admin@on-tonight.com'],
      from: 'support@on-tonight.com',
      replyTo: email,
      subject: `[${priority || 'MEDIUM'}] Support Ticket ${ticketNumber}: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Courier New', monospace; background: #f8fafc; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border: 2px solid ${priorityColor}; border-radius: 8px; overflow: hidden; }
            .header { background: ${priorityColor}; color: white; padding: 24px; text-align: center; }
            .content { padding: 32px; }
            .field { margin-bottom: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid ${priorityColor}; }
            .label { font-weight: bold; color: #0a0a0f; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .value { color: #475569; font-size: 15px; line-height: 1.6; }
            .message-box { background: #fff; border: 1px solid #e2e8f0; padding: 20px; margin-top: 8px; border-radius: 4px; white-space: pre-wrap; }
            .priority-badge { display: inline-block; padding: 8px 16px; background: ${priorityColor}; color: white; border-radius: 4px; font-weight: bold; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🆘 New Support Ticket</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px; font-weight: bold;">${ticketNumber}</p>
            </div>
            <div class="content">
              
              <div style="text-align: center; margin-bottom: 24px;">
                <span class="priority-badge">${priority || 'MEDIUM'} PRIORITY</span>
              </div>

              <div class="field">
                <div class="label">Ticket Number</div>
                <div class="value" style="font-family: 'Courier New', monospace; font-size: 18px; font-weight: bold;">${ticketNumber}</div>
              </div>

              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: ${priorityColor};">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">Subject</div>
                <div class="value"><strong>${subject}</strong></div>
              </div>

              <div class="field">
                <div class="label">Category</div>
                <div class="value">${category || 'General'}</div>
              </div>

              <div class="field">
                <div class="label">Priority</div>
                <div class="value">${priority || 'Medium'}</div>
              </div>

              <div class="field">
                <div class="label">Issue Description</div>
                <div class="message-box">${message}</div>
              </div>

              <div class="field">
                <div class="label">Timestamp</div>
                <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</div>
              </div>

              <div style="margin-top: 32px; padding: 20px; background: ${priority === 'High' ? '#fee2e2' : priority === 'Medium' ? '#fef3c7' : '#f0fdf4'}; border: 1px solid ${priorityColor}; border-radius: 6px; text-align: center;">
                <p style="margin: 0; color: ${priority === 'High' ? '#991b1b' : priority === 'Medium' ? '#92400e' : '#166534'}; font-size: 14px;">
                  <strong>Response Required:</strong> ${priority === 'High' ? 'Within 4 hours' : priority === 'Medium' ? 'Within 24 hours' : 'Within 48 hours'}
                </p>
              </div>

            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send both emails
    await sgMail.send(userEmail);
    await sgMail.send(adminEmail);

    res.status(200).json({ 
      success: true, 
      message: 'Support ticket created successfully',
      ticketNumber 
    });

  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error('SendGrid Response:', error.response.body);
    }
    res.status(500).json({ error: 'Failed to create support ticket' });
  }
}
