import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Media() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    outlet: '',
    role: 'Journalist',
    inquiryType: 'Interview',
    deadline: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Media inquiry received! We\'ll respond within 24 hours.' });
        setFormData({ name: '', email: '', outlet: '', role: 'Journalist', inquiryType: 'Interview', deadline: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to submit inquiry. Please try again.' });
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
        <title>Media Inquiries | OnTonight</title>
        <meta name="description" content="Press and media inquiries for OnTonight. Connect with our team for interviews, press releases, and media partnerships." />
      </Head>

      <div className="media-page">
        <header className="header">
          <Link href="/" className="logo">OnTonight</Link>
        </header>

        <section className="media-hero">
          <div className="container">
            <h1>Media & Press</h1>
            <p className="hero-subtitle">Building the future of hospitality careers. Connect with our team for interviews, features, and press materials.</p>
          </div>
        </section>

        <section className="media-form-section">
          <div className="container">
            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="media-form">
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
                    <label>Outlet/Publication *</label>
                    <input
                      type="text"
                      name="outlet"
                      value={formData.outlet}
                      onChange={handleChange}
                      required
                      placeholder="e.g., TechCrunch, Forbes, Local News"
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="Journalist">Journalist</option>
                      <option value="Blogger">Blogger</option>
                      <option value="Podcaster">Podcaster</option>
                      <option value="TV/Video">TV/Video Producer</option>
                      <option value="Influencer">Influencer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Inquiry Type</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="Interview">Interview Request</option>
                      <option value="Press Release">Press Release Request</option>
                      <option value="Feature">Feature Story</option>
                      <option value="Partnership">Media Partnership</option>
                      <option value="Event">Event Coverage</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Deadline (if applicable)</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      placeholder="Publication deadline"
                    />
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
                    placeholder="Tell us about your story angle, questions, or media inquiry..."
                  />
                </div>

                {status.message && (
                  <div className={`status-message ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Submit Media Inquiry'}
                </button>
              </form>

              <div className="media-info">
                <div className="info-card">
                  <h3>📧 Press Contact</h3>
                  <p>media@on-tonight.com</p>
                  <p className="info-detail">24-hour response for media inquiries</p>
                </div>

                <div className="info-card">
                  <h3>📊 Quick Facts</h3>
                  <ul>
                    <li><strong>15.6M</strong> hospitality workers in the US</li>
                    <li><strong>$66.8B</strong> annual turnover crisis</li>
                    <li><strong>73%</strong> annual turnover rate</li>
                    <li><strong>Tampa pilot</strong> expanding to Miami, Nashville</li>
                  </ul>
                </div>

                <div className="info-card">
                  <h3>🎯 Story Angles</h3>
                  <ul>
                    <li>Hospitality industry innovation</li>
                    <li>Solving the $66.8B turnover crisis</li>
                    <li>Professional infrastructure for service workers</li>
                    <li>Future of work in hospitality</li>
                    <li>Tampa tech ecosystem growth</li>
                  </ul>
                </div>

                <div className="info-card">
                  <h3>📸 Press Kit</h3>
                  <p>High-resolution logos, screenshots, founder bio, and press releases available upon request.</p>
                </div>

                <div className="info-card">
                  <h3>🎤 Available for Interview</h3>
                  <p><strong>Jack Joy, Founder & CEO</strong><br/>27 years hospitality experience + software engineering. Expert in industry turnover, professional development, and hospitality technology.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="press-highlights">
          <div className="container">
            <h2>OnTonight in the News</h2>
            <p className="section-subtitle">Building the professional infrastructure hospitality deserves</p>
            
            <div className="highlights-grid">
              <div className="highlight-card">
                <div className="highlight-icon">🚀</div>
                <h4>Tampa Launch</h4>
                <p>OnTonight launches in Tampa Bay with three premier hospitality venues, bringing portable careers to hospitality professionals.</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">💡</div>
                <h4>Industry Innovation</h4>
                <p>First comprehensive professional certification system (DAPA) for hospitality workers across 6 professional dimensions.</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">📈</div>
                <h4>Market Opportunity</h4>
                <p>Addressing $66.8B annual turnover crisis affecting 15.6 million workers across the hospitality industry.</p>
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
                <Link href="/support">Support</Link>
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
        .media-page {
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

        .media-hero {
          padding: 100px 24px 60px;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, rgba(212, 163, 115, 0.1) 0%, transparent 50%);
        }

        .media-hero h1 {
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
          max-width: 700px;
          margin: 0 auto;
        }

        .media-form-section {
          padding: 60px 24px 120px;
        }

        .form-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .media-form {
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

        .media-info {
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

        .info-card strong {
          color: #f8fafc;
        }

        .info-detail {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.6);
          margin-top: 4px;
        }

        .press-highlights {
          padding: 100px 24px;
          background: rgba(26, 26, 46, 0.3);
          border-top: 1px solid rgba(212, 163, 115, 0.1);
        }

        .press-highlights h2 {
          text-align: center;
          margin-bottom: 16px;
        }

        .section-subtitle {
          text-align: center;
          font-size: 18px;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 60px;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .highlight-card {
          background: rgba(26, 26, 46, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 115, 0.2);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .highlight-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 163, 115, 0.4);
          box-shadow: 0 12px 32px rgba(212, 163, 115, 0.15);
        }

        .highlight-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .highlight-card h4 {
          font-size: 20px;
          color: #d4a373;
          margin-bottom: 12px;
        }

        .highlight-card p {
          font-size: 15px;
          color: rgba(248, 250, 252, 0.7);
          line-height: 1.6;
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

          .media-hero h1 {
            font-size: 40px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .highlights-grid {
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

          .media-hero {
            padding: 80px 24px 40px;
          }

          .media-hero h1 {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .media-form {
            padding: 32px 24px;
          }
        }
      `}</style>
    </>
  );
}
