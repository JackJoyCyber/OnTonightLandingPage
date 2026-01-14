import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'Technical',
    priority: 'Medium',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Support ticket created! We\'ll respond within 24 hours.' });
        setFormData({ name: '', email: '', subject: '', category: 'Technical', priority: 'Medium', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to create ticket. Please try again.' });
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
        <title>Support | OnTonight</title>
        <meta name="description" content="Get help with OnTonight. Submit a support ticket and our team will assist you within 24 hours." />
      </Head>

      <div className="support-page">
        <header className="header">
          <Link href="/" className="logo">OnTonight</Link>
        </header>

        <section className="support-hero">
          <div className="container">
            <h1>How Can We Help?</h1>
            <p className="hero-subtitle">Submit a support ticket and our team will get back to you within 24 hours.</p>
          </div>
        </section>

        <section className="support-form-section">
          <div className="container">
            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="support-form">
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

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="Technical">Technical Issue</option>
                      <option value="Account">Account Management</option>
                      <option value="Billing">Billing</option>
                      <option value="Feature">Feature Request</option>
                      <option value="Bug">Bug Report</option>
                      <option value="General">General Question</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="Low">Low - General Question</option>
                      <option value="Medium">Medium - Issue Affecting Use</option>
                      <option value="High">High - Urgent Issue</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Describe Your Issue *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="8"
                    placeholder="Please provide as much detail as possible about your issue..."
                  />
                </div>

                {status.message && (
                  <div className={`status-message ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Creating Ticket...' : 'Submit Support Ticket'}
                </button>
              </form>

              <div className="support-info">
                <div className="info-card">
                  <h3>📧 Email Support</h3>
                  <p><a href="mailto:support@on-tonight.com">support@on-tonight.com</a></p>
                  <p className="info-detail">24-hour response time</p>
                </div>
                
                <div className="info-card">
                  <h3>📚 Documentation</h3>
                  <p>Check our <a href="/">knowledge base</a> for quick answers to common questions.</p>
                </div>
                
                <div className="info-card">
                  <h3>⏱️ Response Times</h3>
                  <ul>
                    <li><strong>High Priority:</strong> Within 4 hours</li>
                    <li><strong>Medium Priority:</strong> Within 24 hours</li>
                    <li><strong>Low Priority:</strong> Within 48 hours</li>
                  </ul>
                </div>
                
                <div className="info-card">
                  <h3>💡 Quick Tips</h3>
                  <ul>
                    <li>Include screenshots when possible</li>
                    <li>Describe steps to reproduce issues</li>
                    <li>Mention your browser/device</li>
                    <li>Provide account email if applicable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                <Link href="/contact">Contact</Link>
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
        .support-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          color: #f8fafc;
        }

        .header {
          padding: 24px 48px;
          display: flex;
          align-items: center;
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

        .support-hero {
          padding: 100px 24px 60px;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, rgba(212, 163, 115, 0.1) 0%, transparent 50%);
        }

        .support-hero h1 {
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

        .support-form-section {
          padding: 60px 24px 120px;
        }

        .form-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .support-form {
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
          min-height: 180px;
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

        .support-info {
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

        .info-card p, .info-card ul {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.8);
          line-height: 1.6;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
          margin: 8px 0 0 0;
        }

        .info-card li {
          margin-bottom: 8px;
          padding-left: 16px;
          position: relative;
        }

        .info-card li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #d4a373;
        }

        .info-detail {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.6);
          margin-top: 4px;
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

          .support-hero h1 {
            font-size: 40px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .footer-content {
            flex-direction: column;
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .header {
            padding: 20px 24px;
          }

          .support-hero {
            padding: 80px 24px 40px;
          }

          .support-hero h1 {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .support-form {
            padding: 32px 24px;
          }
        }
      `}</style>
    </>
  );
}
