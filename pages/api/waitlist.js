// pages/api/waitlist.js
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, Timestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, userType, city, role } = req.body;

  if (!name || !email || !userType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  if (!['onpro', 'patron', 'venue'].includes(userType)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  try {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const oneHourAgo = Timestamp.fromDate(new Date(Date.now() - 3600000));
    
    const recentSignups = await getDocs(
      query(
        collection(db, 'waitlist'),
        where('ipAddress', '==', clientIp),
        where('createdAt', '>', oneHourAgo)
      )
    );

    if (recentSignups.size >= 5) {
      return res.status(429).json({ error: 'Too many signups' });
    }

    const existing = await getDocs(
      query(collection(db, 'waitlist'), where('email', '==', email.toLowerCase()))
    );

    if (existing.size > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const doc = await addDoc(collection(db, 'waitlist'), {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      userType,
      city: city?.trim() || null,
      role: role || null,
      ipAddress: clientIp,
      signupSource: 'landing-page',
      createdAt: serverTimestamp(),
      emailSent: false,
      convertedToUser: false
    });

    return res.status(200).json({ success: true, waitlistId: doc.id });
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
