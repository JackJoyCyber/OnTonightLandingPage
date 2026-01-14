// /pages/api/partner.js
// Copy this entire file to /pages/api/partner.js on GitHub

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    venueName, contactName, email, phone, venueType, location, 
    staffCount, revenueRange, challenges, message 
  } = req.body;

  // Basic validation
  if (!venueName || !contactName || !email || !phone || !location || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Auto-response to user
    const userEmail = {
      to: email,
      from: 'partner@on-tonight.com',
      replyTo: 'jackjoy@on-tonight.com',
      subject: `Partnership Inquiry Received - ${venueName}`,
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
              <h1 style="margin: 0; color: #d4a373; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">OnTonight Partnerships</h1>
              <p style="margin: 8px 0 0 0; color: rgba(248, 250, 252, 0.7); font-size: 14px;">Building the future of hospitality together</p>
            </div>

            <!-- Content -->
            <div style="padding: 48px 32px;">
              <h2 style="margin: 0 0 24px 0; color: #0a0a0f; font-size: 24px; font-weight: 600;">Welcome to OnTonight, ${contactName}!</h2>
              
              <p style="margin: 0 0 16px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                Thank you for your interest in partnering with OnTonight. We're excited to learn more about ${venueName}!
              </p>

              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                Our partnerships team will review your inquiry and reach out within 24 hours to discuss:
              </p>

              <!-- What's Next -->
              <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 24px; margin: 32px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 16px 0; color: #166534; font-size: 18px; font-weight: 600;">Partnership Onboarding Process</h3>
                <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 15px; line-height: 2;">
                  <li><strong>Demo Call:</strong> 30-minute platform walkthrough</li>
                  <li><strong>Custom Pricing:</strong> Tailored to your venue size and needs</li>
                  <li><strong>Setup Timeline:</strong> 1-2 weeks from contract to launch</li>
                  <li><strong>Free Trial:</strong> 3 months risk-free to see the impact</li>
                </ul>
              </div>

              <!-- Benefits Reminder -->
              <div style="background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%); border: 2px solid #fbbf24; padding: 24px; margin: 32px 0; border-radius: 8px;">
                <h3 style="margin: 0 0 16px 0; color: #92400e; font-size: 18px; font-weight: 600;">🎯 What You'll Get</h3>
                <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 14px; line-height: 1.9;">
                  <li>Access to DAPA-certified professional talent pool</li>
                  <li>Staff performance analytics dashboard</li>
                  <li>Customer attribution tracking</li>
                  <li>Reduced turnover through professional development</li>
                  <li>Competitive advantage in recruiting verified talent</li>
                </ul>
              </div>

              <p style="margin: 32px 0 0 0; color: #475569; font-size: 14px; line-height: 1.6;">
                We'll contact you at <strong>${email}</strong> and <strong>${phone}</strong> to schedule your demo.
              </p>

              <!-- CTA Buttons -->
              <div style="margin: 32px 0;">
                <a href="https://on-tonight.com" style="display: inline-block; background: #d4a373; color: #0a0a0f; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; margin-right: 12px; margin-bottom: 12px;">Learn More</a>
                <a href="https://on-tonight.com/careers" style="display: inline-block; background: transparent; color: #d4a373; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; border: 2px solid #d4a373; margin-bottom: 12px;">Join Our Team</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px;">
                <strong>OnTonight Partnerships</strong><br>
                partner@on-tonight.com
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
      to: ['partner@on-tonight.com', 'admin@on-tonight.com'],
      from: 'partner@on-tonight.com',
      replyTo: email,
      subject: `🤝 New Partnership Inquiry: ${venueName} (${location})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Courier New', monospace; background: #f8fafc; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border: 2px solid #22c55e; border-radius: 8px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #166534 0%, #22c55e 100%); color: white; padding: 24px; text-align: center; }
            .content { padding: 32px; }
            .field { margin-bottom: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid #22c55e; }
            .label { font-weight: bold; color: #0a0a0f; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .value { color: #475569; font-size: 15px; line-height: 1.6; }
            .message-box { background: #fff; border: 1px solid #e2e8f0; padding: 20px; margin-top: 8px; border-radius: 4px; white-space: pre-wrap; }
            .highlight { background: #fef3c7; border: 2px solid #fbbf24; padding: 16px; margin: 16px 0; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🤝 New Venue Partnership</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 13px;">Partnership Inquiry</p>
            </div>
            <div class="content">
              
              <div style="background: #fef3c7; border: 2px solid #fbbf24; padding: 20px; margin-bottom: 24px; border-radius: 6px; text-align: center;">
                <h2 style="margin: 0; color: #92400e; font-size: 20px;">${venueName}</h2>
                <p style="margin: 8px 0 0 0; color: #92400e; font-size: 14px;">${location}</p>
              </div>

              <div class="field">
                <div class="label">Venue Name</div>
                <div class="value"><strong>${venueName}</strong></div>
              </div>

              <div class="field">
                <div class="label">Contact Person</div>
                <div class="value">${contactName}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #22c55e;">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${phone}" style="color: #22c55e;">${phone}</a></div>
              </div>

              <div class="field">
                <div class="label">Venue Type</div>
                <div class="value">${venueType || 'Not specified'}</div>
              </div>

              <div class="field">
                <div class="label">Location</div>
                <div class="value">${location}</div>
              </div>

              ${staffCount ? `
              <div class="field">
                <div class="label">Staff Count</div>
                <div class="value">${staffCount}</div>
              </div>
              ` : ''}

              ${revenueRange ? `
              <div class="field">
                <div class="label">Annual Revenue</div>
                <div class="value">${revenueRange}</div>
              </div>
              ` : ''}

              ${challenges && challenges.length > 0 ? `
              <div class="field">
                <div class="label">Current Challenges</div>
                <div class="value">
                  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                    ${challenges.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                </div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Additional Information</div>
                <div class="message-box">${message}</div>
              </div>

              <div class="field">
                <div class="label">Timestamp</div>
                <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</div>
              </div>

              <div style="margin-top: 32px; padding: 20px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; text-align: center;">
                <p style="margin: 0; color: #166534; font-size: 14px;">
                  <strong>Action Required:</strong> Schedule demo call within 24 hours
                </p>
                <p style="margin: 8px 0 0 0; color: #166534; font-size: 13px;">
                  Reply to ${email} or call ${phone}
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

    res.status(200).json({ success: true, message: 'Partnership inquiry sent successfully' });

  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error('SendGrid Response:', error.response.body);
    }
    res.status(500).json({ error: 'Failed to send partnership inquiry' });
  }
}
