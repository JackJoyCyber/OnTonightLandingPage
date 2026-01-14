// pages/api/waitlist.js
import admin from 'firebase-admin';
import sgMail from '@sendgrid/mail';

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, userType, city } = req.body;

  // Validation
  if (!name || !email || !userType) {
    return res.status(400).json({ error: 'Name, email, and user type are required' });
  }

  // Validate user type
  if (!['onpro', 'patron', 'venue'].includes(userType.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  const normalizedUserType = userType.toLowerCase();
  let firebaseUser = null;
  let wasCreated = false;

  try {
    // STEP 1: Create Firebase account (or get existing)
    try {
      // Generate a secure temporary password (user will set their own via email link)
      // Max 20 chars per Firebase policy: Tempxy12ab! = 12 chars
      const tempPassword = `Temp${Math.random().toString(36).slice(-6)}${Date.now().toString(36).slice(-6)}!`;
      
      firebaseUser = await admin.auth().createUser({
        email: email.toLowerCase().trim(),
        password: tempPassword,
        displayName: name,
        emailVerified: false,
      });
      wasCreated = true;
      console.log(`✅ Created Firebase account for ${email}`);
      
    } catch (createError) {
      // If account already exists, that's OK - get the existing user
      if (createError.code === 'auth/email-already-exists') {
        firebaseUser = await admin.auth().getUserByEmail(email.toLowerCase().trim());
        console.log(`ℹ️ Account already exists for ${email}, using existing account`);
      } else {
        throw createError; // Re-throw if it's a different error
      }
    }

    // STEP 2: Create/Update Firestore user document
    const userDoc = {
      email: email.toLowerCase().trim(),
      name: name.trim(),
      displayName: name.trim(),
      userType: normalizedUserType,
      city: city?.trim() || '',
      onboardingComplete: false,
      emailVerified: firebaseUser.emailVerified,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
      source: 'landing_page_waitlist',
      accountStatus: 'active', // Account is ACTIVE immediately, no pending state
    };

    // For venues, add additional fields
    if (normalizedUserType === 'venue') {
      userDoc.requiresPersonalOnboarding = true;
      userDoc.onboardingScheduled = false;
    }

    await admin.firestore()
      .collection('users')
      .doc(firebaseUser.uid)
      .set(userDoc, { merge: true }); // Merge in case profile already exists

    console.log(`✅ Created/updated Firestore profile for ${email}`);

    // STEP 3: Generate password reset link (for user to set their own password)
    let passwordSetupLink = null;
    try {
      passwordSetupLink = await admin.auth().generatePasswordResetLink(
        email.toLowerCase().trim(),
        {
          url: 'https://app.on-tonight.com/login', // Redirect after password setup
        }
      );
      console.log(`✅ Generated password setup link for ${email}`);
    } catch (linkError) {
      console.error('⚠️ Failed to generate password link:', linkError);
      // Non-critical: User can request password reset from login page
    }

    // STEP 4: Send appropriate welcome email based on user type
    try {
      if (normalizedUserType === 'venue') {
        // VENUE: Send info email, notify admin for personal follow-up
        await sendVenueWelcomeEmail(email, name);
        await sendVenueNotificationToAdmin(name, email, city, req.body);
      } else {
        // ONPRO/PATRON: Send full onboarding email with setup link
        await sendUserWelcomeEmail(email, name, normalizedUserType, passwordSetupLink, wasCreated);
        await sendUserNotificationToAdmin(name, email, normalizedUserType, city);
      }
      console.log(`✅ Sent welcome emails for ${email}`);
    } catch (emailError) {
      console.error('⚠️ Failed to send emails:', emailError);
      // Non-critical: User account still works, they can log in directly
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: wasCreated 
        ? 'Account created! Check your email to complete setup.'
        : 'Welcome back! Check your email for login instructions.',
      accountCreated: wasCreated,
      userType: normalizedUserType,
    });

  } catch (error) {
    console.error('❌ Waitlist Error:', error);
    
    // If we created a Firebase user but something else failed, that's OK
    // The user can still log in to app.on-tonight.com
    
    return res.status(500).json({
      error: 'Failed to complete signup. Please try again or go directly to app.on-tonight.com',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

// EMAIL HELPER FUNCTIONS

async function sendUserWelcomeEmail(email, name, userType, setupLink, isNew) {
  const userTypeLabel = userType === 'onpro' ? 'OnPro' : 'Patron';
  const nextSteps = userType === 'onpro' 
    ? 'Take the DAPA assessment to verify your skills and build your professional profile.'
    : 'Complete your OnScene Genome to discover your hospitality personality and get matched with the perfect venues.';

  const msg = {
    to: email,
    from: {
      email: 'waitlist@on-tonight.com',
      name: 'OnTonight'
    },
    replyTo: 'jackjoy@on-tonight.com',
    subject: isNew ? '🎉 Welcome to OnTonight!' : '👋 Welcome back to OnTonight!',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #d4a373; font-size: 36px; margin: 0;">OnTonight</h1>
          <p style="color: #666; margin: 10px 0;">Your Night. Your People. Where Regulars Are Made.</p>
        </div>

        <h2 style="color: #1a1a1a;">Welcome${isNew ? ' to the Movement' : ' Back'}, ${name}!</h2>
        
        <p>${isNew ? "You're one of the first 2,000 signups - your first year is FREE! 🎉" : "Great to see you again!"}</p>

        ${setupLink ? `
        <div style="background: linear-gradient(135deg, #d4a373 0%, #f4d3a3 100%); padding: 24px; border-radius: 8px; text-align: center; margin: 32px 0;">
          <h3 style="margin: 0 0 16px 0; color: #0a0a0f;">Complete Your Setup</h3>
          <a href="${setupLink}" style="display: inline-block; background: #0a0a0f; color: #d4a373; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600;">Set Your Password</a>
          <p style="margin: 16px 0 0 0; font-size: 13px; color: rgba(10,10,15,0.7);">This link expires in 1 hour</p>
        </div>
        ` : ''}

        <h3 style="color: #d4a373;">What Happens Next:</h3>
        <ol style="color: #666; line-height: 1.8;">
          <li><strong>Set your password</strong> using the button above</li>
          <li><strong>Complete your profile</strong> at app.on-tonight.com</li>
          <li><strong>${nextSteps}</strong></li>
          <li><strong>Start connecting</strong> with Tampa's hospitality community</li>
        </ol>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #d4a373; margin: 32px 0;">
          <p style="margin: 0; font-weight: 600; color: #1a1a1a;">Can't wait? Log in now:</p>
          <p style="margin: 8px 0 0 0;"><a href="https://app.on-tonight.com/login" style="color: #d4a373;">app.on-tonight.com</a></p>
          <p style="margin: 8px 0 0 0; font-size: 13px; color: #666;">Use the password setup link above first, or request a password reset</p>
        </div>

        <p style="margin-top: 32px;">Questions? Just reply to this email.</p>
        
        <p style="color: #666;">
          Welcome to the infrastructure,<br>
          <strong>The OnTonight Team</strong>
        </p>

        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e0e0e0; text-align: center;">
          <p style="font-size: 13px; color: #999;">
            OnTonight LLC | Tampa, Florida<br>
            <a href="https://on-tonight.com" style="color: #d4a373;">on-tonight.com</a>
          </p>
        </div>
      </body>
      </html>
    `
  };

  return sgMail.send(msg);
}

async function sendVenueWelcomeEmail(email, name) {
  const msg = {
    to: email,
    from: {
      email: 'partner@on-tonight.com',
      name: 'OnTonight Partnerships'
    },
    replyTo: 'jackjoy@on-tonight.com',
    subject: 'Partnership Inquiry Received - Jack Will Contact You',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #d4a373;">Thanks for Your Interest, ${name}!</h2>
        
        <p>I'm Jack Joy, founder of OnTonight. I personally onboard every venue partner to ensure we're a great fit for your team.</p>

        <h3 style="color: #1a1a1a;">What Happens Next:</h3>
        <ul style="color: #666; line-height: 1.8;">
          <li><strong>Within 24 hours:</strong> I'll reach out to schedule a personalized demo</li>
          <li><strong>30-minute call:</strong> We'll discuss your specific staffing challenges</li>
          <li><strong>Custom setup:</strong> If it's a fit, we'll build your venue profile together</li>
          <li><strong>3-month trial:</strong> Experience OnTonight risk-free</li>
        </ul>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 32px 0;">
          <h4 style="margin: 0 0 12px 0; color: #d4a373;">In The Meantime:</h4>
          <p style="margin: 0;"><a href="https://on-tonight.com" style="color: #d4a373;">Explore the platform</a></p>
          <p style="margin: 8px 0 0 0;"><a href="https://on-tonight.com/#platform" style="color: #d4a373;">See how DAPA works</a></p>
        </div>

        <p style="margin-top: 32px;">
          Looking forward to connecting,<br>
          <strong>Jack Joy</strong><br>
          Founder & CEO, OnTonight<br>
          <a href="mailto:jackjoy@on-tonight.com" style="color: #d4a373;">jackjoy@on-tonight.com</a>
        </p>
      </body>
      </html>
    `
  };

  return sgMail.send(msg);
}

async function sendUserNotificationToAdmin(name, email, userType, city) {
  const msg = {
    to: ['waitlist@on-tonight.com', 'admin@on-tonight.com'],
    from: 'admin@on-tonight.com',
    subject: `🎉 New ${userType.toUpperCase()} Signup: ${name}`,
    html: `
      <div style="font-family: monospace; padding: 20px;">
        <h2>New Waitlist Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${userType.toUpperCase()}</p>
        <p><strong>City:</strong> ${city || 'Not provided'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
        <p><strong>Source:</strong> Landing Page Waitlist</p>
      </div>
    `
  };

  return sgMail.send(msg);
}

async function sendVenueNotificationToAdmin(name, email, city, fullData) {
  const msg = {
    to: ['partner@on-tonight.com', 'admin@on-tonight.com'],
    from: 'admin@on-tonight.com',
    subject: `🏢 VENUE PARTNERSHIP: ${name} - PERSONAL FOLLOW-UP NEEDED`,
    html: `
      <div style="font-family: monospace; padding: 20px; background: #fff3cd; border-left: 4px solid #d4a373;">
        <h2 style="color: #d4a373;">⚠️ Venue Partner - Personal Onboarding Required</h2>
        <p><strong>Contact:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>City:</strong> ${city || 'Not provided'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
        <hr>
        <p style="color: #856404;"><strong>ACTION REQUIRED:</strong> Reach out within 24 hours to schedule demo</p>
        <p><strong>Full Details:</strong></p>
        <pre>${JSON.stringify(fullData, null, 2)}</pre>
      </div>
    `
  };

  return sgMail.send(msg);
}
