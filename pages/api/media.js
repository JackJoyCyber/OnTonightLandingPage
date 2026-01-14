// /pages/api/media.js
// Copy this entire file to /pages/api/media.js on GitHub

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, outlet, role, inquiryType, deadline, message } = req.body;

  // Basic validation
  if (!name || !email || !outlet || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Auto-response to user
    const userEmail = {
      to: email,
      from: 'media@on-tonight.com',
      replyTo: 'jackjoy@on-tonight.com',
      subject: 'Media Inquiry Received - OnTonight',
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
              <h1 style="margin: 0; color: #d4a373; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">OnTonight Media</h1>
              <p style="margin: 8px 0 0 0; color: rgba(248, 250, 252, 0.7); font-size: 14px;">Press & Media Relations</p>
            </div>

            <!-- Content -->
            <div style="padding: 48px 32px;">
              <h2 style="margin: 0 0 24px 0; color: #0a0a0f; font-size: 24px; font-weight: 600;">Thank you for your interest, ${name}!</h2>
              
              <p style="margin: 0 0 16px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                We've received your media inquiry and our team will respond within 24 hours.
              </p>

              <!-- Quick Facts -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9; padding: 24px; margin: 32px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 16px 0; color: #0c4a6e; font-size: 18px; font-weight: 600;">📊 Quick Facts About OnTonight</h3>
                <ul style="margin: 0; padding-left: 20px; color: #0c4a6e; font-size: 14px; line-height: 2;">
                  <li><strong>15.6 million</strong> hospitality workers in the US</li>
                  <li><strong>$66.8 billion</strong> annual turnover crisis</li>
                  <li><strong>73%</strong> annual employee turnover rate</li>
                  <li><strong>Tampa pilot</strong> expanding to Miami, Nashville, Austin</li>
                  <li><strong>First</strong> comprehensive professional certification (DAPA) for hospitality</li>
                </ul>
              </div>

              ${deadline ? `
              <div style="background: #fef3c7; border: 2px solid #fbbf24; padding: 20px; margin: 24px 0; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
                  ⏰ We note your deadline: ${deadline}
                </p>
                <p style="margin: 8px 0 0 0; color: #92400e; font-size: 14px;">
                  We'll prioritize this inquiry accordingly.
                </p>
              </div>
              ` : ''}

              <!-- What's Next -->
              <div style="background: #f8fafc; border-left: 4px solid #d4a373; padding: 20px; margin: 32px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 12px 0; color: #0a0a0f; font-size: 16px; font-weight: 600;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 15px; line-height: 1.8;">
                  <li>Our media team will review your inquiry</li>
                  <li>We'll respond to <strong>${email}</strong> within 24 hours</li>
                  <li>Press kit and additional materials available upon request</li>
                  <li>Interview scheduling available with founder Jack Joy</li>
                </ul>
              </div>

              <p style="margin: 32px 0 0 0; color: #475569; font-size: 14px; line-height: 1.6;">
                In the meantime, explore our platform:
              </p>

              <!-- CTA Buttons -->
              <div style="margin: 24px 0;">
                <a href="https://on-tonight.com" style="display: inline-block; background: #d4a373; color: #0a0a0f; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; margin-right: 12px; margin-bottom: 12px;">Visit Website</a>
                <a href="https://on-tonight.com/careers" style="display: inline-block; background: transparent; color: #d4a373; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; border: 2px solid #d4a373; margin-bottom: 12px;">See Careers</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px;">
                <strong>OnTonight Media Relations</strong><br>
                media@on-tonight.com
              </p>
              <p style="margin: 0 0 16px 0; color: #94a3b8; font-size: 13px;">
                Tampa, Florida · Expanding to Miami, Nashville & Beyond
              </p>
              <div style="margin: 20px 0;">
                <a href="https://instagram.com/ontonight" style="color: #d4a373; text-decoration: none; margin: 0 12px; font-size: 13px;">Instagram</a>
                <a href="https://facebook.com/ontonight" style="color: #d4a373; text-decoration: none; margin: 0 12px; font-size: 13px;">Facebook</a>
                <a href="https://linkedin.com/company/ontonight" style="color: #d4a373; text-decoration: none; margin: 0 12px; font-size: 13px;">LinkedIn</a>
              </div>
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
      to: ['media@on-tonight.com', 'admin@on-tonight.com'],
      from: 'media@on-tonight.com',
      replyTo: email,
      subject: `${deadline ? '⏰ DEADLINE: ' : ''}Media Inquiry: ${inquiryType || 'Press'} - ${outlet}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Courier New', monospace; background: #f8fafc; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border: 2px solid #0ea5e9; border-radius: 8px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%); color: white; padding: 24px; text-align: center; }
            .content { padding: 32px; }
            .field { margin-bottom: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid #0ea5e9; }
            .label { font-weight: bold; color: #0a0a0f; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .value { color: #475569; font-size: 15px; line-height: 1.6; }
            .message-box { background: #fff; border: 1px solid #e2e8f0; padding: 20px; margin-top: 8px; border-radius: 4px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">📰 New Media Inquiry</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 13px;">Press & Media Relations</p>
            </div>
            <div class="content">
              
              ${deadline ? `
              <div style="background: #fef3c7; border: 2px solid #fbbf24; padding: 20px; margin-bottom: 24px; border-radius: 6px; text-align: center;">
                <p style="margin: 0; color: #92400e; font-size: 16px; font-weight: bold;">
                  ⏰ DEADLINE: ${deadline}
                </p>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">Outlet / Publication</div>
                <div class="value"><strong>${outlet}</strong></div>
              </div>

              <div class="field">
                <div class="label">Role</div>
                <div class="value">${role || 'Not specified'}</div>
              </div>

              <div class="field">
                <div class="label">Inquiry Type</div>
                <div class="value">${inquiryType || 'General'}</div>
              </div>

              ${deadline ? `
              <div class="field">
                <div class="label">Deadline</div>
                <div class="value" style="color: #dc2626; font-weight: bold;">${deadline}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>

              <div class="field">
                <div class="label">Timestamp</div>
                <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</div>
              </div>

              <div style="margin-top: 32px; padding: 20px; background: #dbeafe; border: 1px solid #60a5fa; border-radius: 6px; text-align: center;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;">
                  <strong>Action Required:</strong> Respond within 24 hours${deadline ? ' (DEADLINE PROVIDED)' : ''}
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

    res.status(200).json({ success: true, message: 'Media inquiry sent successfully' });

  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error('SendGrid Response:', error.response.body);
    }
    res.status(500).json({ error: 'Failed to send media inquiry' });
  }
}
