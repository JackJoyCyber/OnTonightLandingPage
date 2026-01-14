import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent! We\'ll respond within 24-48 hours.' });
        setFormData({ name: '', email: '', phone: '', inquiryType: 'General', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Contact Us | OnTonight</title>
        <meta name="description" content="Get in touch with the OnTonight team. We're here to help with questions, feedback, or partnership inquiries." />
      </Head>

      <div className="contact-page">
        {/* Header */}
        <header className="header">
          <Link href="/" className="logo">OnTonight</Link>
        </header>

        {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <h1>Get in Touch</h1>
            <p className="hero-subtitle">Have questions? We're here to help. Reach out and we'll respond within 24-48 hours.</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-section">
          <div className="container">
            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone (optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label>Inquiry Type</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="General">General Question</option>
                      <option value="Investment">Investment Inquiry</option>
                      <option value="Press">Press/Media</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Technical">Technical Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {status.message && (
                  <div className={`status-message ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {/* Contact Info Sidebar */}
              <div className="contact-info">
                <div className="info-card">
                  <h3>📧 Email</h3>
                  <p><a href="mailto:contact@on-tonight.com">contact@on-tonight.com</a></p>
                </div>
                <div className="info-card">
                  <h3>🏢 Location</h3>
                  <p>Tampa, Florida</p>
                </div>
                <div className="info-card">
                  <h3>💼 Partnerships</h3>
                  <p><a href="/partner">Venue Partnerships</a></p>
                </div>
                <div className="info-card">
                  <h3>📰 Media</h3>
                  <p><a href="/media">Media Inquiries</a></p>
                </div>
                <div className="info-card">
                  <h3>🆘 Support</h3>
                  <p><a href="/support">Technical Support</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="logo">OnTonight</div>
                <p className="tagline">Your Night. Your People. Where Regulars Are Made.</p>
              </div>
              <div className="footer-links">
                <Link href="/">Home</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/support">Support</Link>
                <Link href="/media">Media</Link>
                <Link href="/partner">Partner</Link>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 OnTonight LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          color: #f8fafc;
        }

        .header {
          padding: 24px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(10, 10, 15, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(212, 163, 115, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #d4a373 0%, #f4d3a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .contact-hero {
          padding: 100px 24px 60px;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, rgba(212, 163, 115, 0.1) 0%, transparent 50%);
        }

        .contact-hero h1 {
          font-size: 56px;
          font-weight: 700;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #d4a373 0%, #f4d3a3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 20px;
          color: rgba(248, 250, 252, 0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-form-section {
          padding: 60px 24px 120px;
        }

        .form-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-form {
          background: rgba(26, 26, 46, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 115, 0.2);
          border-radius: 12px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          background: rgba(10, 10, 15, 0.6);
          border: 1px solid rgba(212, 163, 115, 0.2);
          border-radius: 6px;
          color: #f8fafc;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #d4a373;
          box-shadow: 0 0 0 3px rgba(212, 163, 115, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .status-message {
          padding: 16px;
          border-radius: 6px;
          margin-bottom: 24px;
          font-size: 15px;
        }

        .status-message.success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }

        .status-message.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .submit-btn {
          width: 100%;
          padding: 16px 32px;
          background: linear-gradient(135deg, #d4a373 0%, #f4d3a3 100%);
          color: #0a0a0f;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 163, 115, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-card {
          background: rgba(26, 26, 46, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 115, 0.2);
          border-radius: 12px;
          padding: 24px;
        }

        .info-card h3 {
          font-size: 18px;
          margin-bottom: 12px;
          color: #d4a373;
        }

        .info-card p {
          font-size: 15px;
          color: rgba(248, 250, 252, 0.8);
          line-height: 1.6;
        }

        .info-card a {
          color: #d4a373;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .info-card a:hover {
          color: #f4d3a3;
        }

        .footer {
          background: rgba(10, 10, 15, 0.8);
          border-top: 1px solid rgba(212, 163, 115, 0.1);
          padding: 60px 24px 24px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 40px;
        }

        .footer-brand .logo {
          font-size: 24px;
          margin-bottom: 12px;
        }

        .tagline {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.6);
          max-width: 300px;
        }

        .footer-links {
          display: flex;
          gap: 32px;
        }

        .footer-links a {
          color: rgba(248, 250, 252, 0.7);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #d4a373;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid rgba(212, 163, 115, 0.1);
        }

        .footer-bottom p {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.5);
        }

        @media (max-width: 968px) {
          .form-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .contact-hero h1 {
            font-size: 40px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .footer-content {
            flex-direction: column;
            gap: 32px;
          }

          .footer-links {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 640px) {
          .header {
            padding: 20px 24px;
          }

          .contact-hero {
            padding: 80px 24px 40px;
          }

          .contact-hero h1 {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .contact-form {
            padding: 32px 24px;
          }
        }
      `}</style>
    </>
  );
}
