// pages/api/investors.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, firm, investorType, checkSize, focus, message } = req.body;

  if (!name || !email || !investorType || !message) {
    return res.status(400).json({ error: 'Name, email, investor type, and message are required.' });
  }

  try {
    // Auto-response to investor
    const investorEmail = {
      to: email,
      from: {
        email: 'AdminJoy@On-Tonight.com',
        name: 'Jack Joy — OnTonight'
      },
      replyTo: 'AdminJoy@On-Tonight.com',
      subject: 'OnTonight — Investor Inquiry Received',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;font-family:'Urbanist',-apple-system,sans-serif;background:#f8fafc;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;">

            <div style="background:linear-gradient(135deg,#0a121b 0%,#0c1620 100%);padding:40px 32px;text-align:center;border-bottom:3px solid #d4a373;">
              <h1 style="margin:0;color:#d4a373;font-size:30px;font-weight:600;letter-spacing:-0.5px;">OnTonight</h1>
              <p style="margin:8px 0 0;color:rgba(248,250,252,0.6);font-size:13px;font-weight:300;">Your Night. Your People. Where Regulars Are Made.</p>
            </div>

            <div style="padding:48px 32px;">
              <h2 style="margin:0 0 8px;color:#0a121b;font-size:22px;font-weight:600;">Thank you, ${name}.</h2>
              <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">Your inquiry has been received. I'll personally review it and be in touch within 48 hours.</p>

              <div style="background:#f8fafc;border-radius:10px;padding:24px;margin-bottom:28px;border-left:4px solid #d4a373;">
                <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;font-style:italic;">
                  "This platform is what this industry has been missing. I spent years building a career that, after each transition, had to be almost fully rebuilt. OnTonight gives us power over our income, and a way to prove our knowledge, worth, and abilities. This isn't something the industry needs — it is the core heartbeat of what the industry is. Me, You, and our people. Together."
                </p>
                <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">— Jack H. Joy Jr., Founder & CEO</p>
              </div>

              <p style="margin:0 0 8px;color:#475569;font-size:14px;line-height:1.6;">In the meantime, you can explore the live platform at <a href="https://app.on-tonight.com" style="color:#d4a373;">app.on-tonight.com</a>.</p>
              <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;">Questions? Reply directly to this email or reach me at <a href="mailto:AdminJoy@On-Tonight.com" style="color:#d4a373;">AdminJoy@On-Tonight.com</a></p>
            </div>

            <div style="padding:24px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:11px;">OnTonight LLC · Tampa, FL · <a href="https://on-tonight.com" style="color:#94a3b8;">on-tonight.com</a></p>
              <p style="margin:6px 0 0;color:#cbd5e1;font-size:11px;">OnTonight™ and OnPros™ are registered trademarks of OnTonight LLC</p>
            </div>

          </div>
        </body>
        </html>
      `
    };

    // Internal notification to Jack
    const adminEmail = {
      to: 'AdminJoy@On-Tonight.com',
      from: {
        email: 'AdminJoy@On-Tonight.com',
        name: 'OnTonight Investor Portal'
      },
      subject: `💰 New Investor Inquiry: ${name}${firm ? ` — ${firm}` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family:monospace;padding:32px;background:#0a121b;color:#f8fafc;">
          <div style="max-width:640px;margin:0 auto;">
            <h2 style="color:#d4a373;margin:0 0 24px;">New Investor Inquiry</h2>

            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94a3b8;font-size:12px;width:160px;">Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#f8fafc;font-size:14px;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94a3b8;font-size:12px;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#d4a373;font-size:14px;"><a href="mailto:${email}" style="color:#d4a373;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94a3b8;font-size:12px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#f8fafc;font-size:14px;">${phone}</td></tr>` : ''}
              ${firm ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94a3b8;font-size:12px;">Firm</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#f8fafc;font-size:14px;">${firm}</td></tr>` : ''}
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94a3b8;font-size:12px;">Investor Type</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#f8fafc;font-size:14px;">${investorType}</td></tr>
              ${checkSize ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94a3b8;font-size:12px;">Check Size</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#22c55e;font-size:14px;font-weight:bold;">${checkSize}</td></tr>` : ''}
              ${focus ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94a3b8;font-size:12px;">Focus</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#f8fafc;font-size:14px;">${focus}</td></tr>` : ''}
              <tr><td style="padding:10px 0;color:#94a3b8;font-size:12px;">Timestamp</td><td style="padding:10px 0;color:#f8fafc;font-size:14px;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</td></tr>
            </table>

            <div style="margin-top:28px;padding:20px;background:rgba(212,163,115,0.1);border:1px solid rgba(212,163,115,0.3);border-radius:8px;">
              <p style="margin:0 0 6px;color:#d4a373;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
              <p style="margin:0;color:#f8fafc;font-size:14px;line-height:1.7;">${message}</p>
            </div>

            <div style="margin-top:20px;padding:14px 20px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:8px;text-align:center;">
              <p style="margin:0;color:#22c55e;font-size:13px;font-weight:bold;">Reply to: ${email}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await sgMail.send(investorEmail);
    await sgMail.send(adminEmail);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Investor email error:', error);
    if (error.response) console.error('SendGrid:', error.response.body);
    return res.status(500).json({ error: 'Failed to send inquiry. Please email AdminJoy@On-Tonight.com directly.' });
  }
}
