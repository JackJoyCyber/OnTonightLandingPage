// pages/api/waitlist.js
// ============================================================================
// WAITLIST & SIGNUP API - WITH ASSESSMENT ACCESS CODE
// ============================================================================
// Creates Firebase account, sends welcome email WITH access code
// ============================================================================

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

// ============================================================================
// ACCESS CODE FOR NEW SIGNUPS
// ============================================================================
const SIGNUP_ACCESS_CODE = 'ONTONIGHT2026';
const SIGNUP_CREDITS = 2;

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
      if (createError.code === 'auth/email-already-exists') {
        firebaseUser = await admin.auth().getUserByEmail(email.toLowerCase().trim());
        console.log(`ℹ️ Account already exists for ${email}, using existing account`);
      } else {
        throw createError;
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
      accountStatus: 'active',
    };

    // For venues, add additional fields
    if (normalizedUserType === 'venue') {
      userDoc.requiresPersonalOnboarding = true;
      userDoc.onboardingScheduled = false;
    }

    await admin.firestore()
      .collection('users')
      .doc(firebaseUser.uid)
      .set(userDoc, { merge: true });

    console.log(`✅ Created/updated Firestore profile for ${email}`);

    // STEP 3: Generate password reset link
    let passwordSetupLink = null;
    try {
      passwordSetupLink = await admin.auth().generatePasswordResetLink(
        email.toLowerCase().trim(),
        { url: 'https://app.on-tonight.com' }
      );
      console.log(`✅ Generated password setup link for ${email}`);
    } catch (linkError) {
      console.error('⚠️ Failed to generate password link:', linkError);
    }

    // STEP 4: Send appropriate welcome email based on user type
    try {
      if (normalizedUserType === 'venue') {
        await sendVenueWelcomeEmail(email, name);
        await sendVenueNotificationToAdmin(name, email, city, req.body);
      } else {
        // OnPro/Patron: Include access code in welcome email
        await sendUserWelcomeEmail(email, name, normalizedUserType, passwordSetupLink, wasCreated);
        await sendUserNotificationToAdmin(name, email, normalizedUserType, city);
      }
      console.log(`✅ Sent welcome emails for ${email}`);
    } catch (emailError) {
      console.error('⚠️ Failed to send emails:', emailError);
    }

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
    return res.status(500).json({
      error: 'Failed to complete signup. Please try again or go directly to app.on-tonight.com',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

// ============================================================================
// EMAIL HELPERS
// ============================================================================

async function sendUserWelcomeEmail(email, name, userType, setupLink, isNew) {
  const userTypeLabel = userType === 'onpro' ? 'OnPro' : 'Patron';
  const nextSteps = userType === 'onpro' 
    ? 'Take the DAPA Skills Assessment to verify your expertise and build your professional genome.'
    : 'Complete your profile and discover the best hospitality professionals in your area.';

  const msg = {
    to: email,
    from: {
      email: 'waitlist@on-tonight.com',
      name: 'OnTonight'
    },
    replyTo: 'jackjoy@on-tonight.com',
    subject: isNew ? '🎉 Welcome to OnTonight + Your Access Code!' : '👋 Welcome back to OnTonight!',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8fafc;">
        <div style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); padding: 40px 32px; text-align: center;">
            <h1 style="color: #d4a373; font-size: 36px; margin: 0;">OnTonight</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 10px 0 0;">Your Night. Your People. Where Regulars Are Made.</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 32px;">
            <h2 style="color: #1a1a1a; margin: 0 0 16px;">Welcome${isNew ? ' to the Movement' : ' Back'}, ${name}!</h2>
            
            <p style="color: #475569; margin: 0 0 24px;">${isNew ? "You're one of the first to join OnTonight — your first year is FREE! 🎉" : "Great to see you again!"}</p>

            <!-- ACCESS CODE BOX -->
            <div style="background: linear-gradient(135deg, #d4a373 0%, #c49362 100%); border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
              <p style="color: rgba(0,0,0,0.6); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Your Exclusive Access Code</p>
              <p style="color: #0a0a0f; font-size: 28px; font-weight: 800; letter-spacing: 3px; margin: 0; font-family: monospace;">${SIGNUP_ACCESS_CODE}</p>
              <p style="color: rgba(0,0,0,0.6); font-size: 13px; margin: 12px 0 0;">Unlocks ${SIGNUP_CREDITS} Skills Assessments</p>
            </div>

            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 12px;">🎯 How to Use Your Code:</h3>
              <ol style="color: #475569; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Log in at <a href="https://app.on-tonight.com" style="color: #d4a373;">app.on-tonight.com</a></li>
                <li style="margin-bottom: 8px;">Go to Skills Assessment</li>
                <li style="margin-bottom: 8px;">Enter your access code: <strong>${SIGNUP_ACCESS_CODE}</strong></li>
                <li>Choose 2 categories to unlock and prove your expertise!</li>
              </ol>
            </div>

            ${setupLink ? `
            <div style="text-align: center; margin: 32px 0;">
              <a href="${setupLink}" style="display: inline-block; background: linear-gradient(135deg, #d4a373 0%, #c49362 100%); color: #0a0a0f; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 700; font-size: 16px;">Set Your Password →</a>
            </div>
            ` : ''}

            <p style="color: #475569; margin: 24px 0 0; font-size: 14px;">
              <strong>What's Next?</strong><br>
              ${nextSteps}
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 13px; margin: 0;">
              Questions? Reply to this email or reach out at <a href="mailto:support@on-tonight.com" style="color: #d4a373;">support@on-tonight.com</a>
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 16px 0 0;">
              OnTonight | Tampa, FL | <a href="https://on-tonight.com" style="color: #94a3b8;">on-tonight.com</a>
            </p>
          </div>

        </div>
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
        <p><strong>Access Code Sent:</strong> ${SIGNUP_ACCESS_CODE}</p>
        <p><strong>Source:</strong> Landing Page Waitlist</p>
      </div>
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
    subject: '🏢 Welcome to OnTonight - Partnership Inquiry Received',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #d4a373; font-size: 36px; margin: 0;">OnTonight</h1>
          <p style="color: #666; margin: 10px 0;">Your Night. Your People. Where Regulars Are Made.</p>
        </div>

        <h2 style="color: #1a1a1a;">Thank you for your interest, ${name}!</h2>
        
        <p>We're excited to learn more about your venue and how OnTonight can help you connect with the best hospitality talent.</p>

        <div style="background: #fff3cd; border-left: 4px solid #d4a373; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; color: #856404;"><strong>What happens next?</strong></p>
          <p style="margin: 8px 0 0; color: #856404;">A member of our partnerships team will reach out within 24-48 hours to schedule a personalized demo and discuss how OnTonight can benefit your venue.</p>
        </div>

        <p style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e0e0e0; color: #666; font-size: 13px;">
          OnTonight | Venue Partnerships<br>
          <a href="mailto:partner@on-tonight.com" style="color: #d4a373;">partner@on-tonight.com</a>
        </p>
      </body>
      </html>
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
