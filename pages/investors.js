// pages/investors.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Investors() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    firm: '',
    investorType: '',
    checkSize: '',
    focus: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const response = await fetch('/api/investors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Your inquiry has been received. We\'ll be in touch within 48 hours.' });
        setFormData({ name: '', email: '', phone: '', firm: '', investorType: '', checkSize: '', focus: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to submit. Please try again.' });
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
        <title>Investor Relations | OnTonight</title>
        <meta name="description" content="OnTonight is raising a $2.5M seed round. We're building the professional infrastructure hospitality has needed for a century. Connect with our founding team." />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="investors-page">

        <header className="header">
          <Link href="/" className="logo">OnTonight</Link>
        </header>

        <section className="investors-hero">
          <div className="container">
            <div className="eyebrow">INVESTOR RELATIONS</div>
            <h1>Built for the Long Game</h1>
            <p className="hero-subtitle">
              OnTonight is the first professional identity platform built for the $66.8B hospitality industry.
              We're raising a seed round to scale what we've built in Tampa Bay to every major market in America.
            </p>
          </div>
        </section>

        <section className="metrics-section">
          <div className="container">
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">$2.5M</div>
                <div className="metric-label">Seed Round</div>
                <div className="metric-sub">Currently Raising</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">15.6M</div>
                <div className="metric-label">Addressable Workers</div>
                <div className="metric-sub">U.S. Hospitality Professionals</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">73%</div>
                <div className="metric-label">Annual Turnover</div>
                <div className="metric-sub">Highest of Any U.S. Industry</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">$66.8B</div>
                <div className="metric-label">Market Problem</div>
                <div className="metric-sub">Annual Turnover Cost</div>
              </div>
            </div>
          </div>
        </section>

        <section className="why-section">
          <div className="container">
            <div className="why-grid">
              <div className="why-content">
                <div className="section-eyebrow">WHY ONTONIGHT</div>
                <h2>The Infrastructure That Never Existed</h2>
                <p>Every professional industry has career infrastructure. Lawyers have bar licenses. Engineers have GitHub. Doctors have credentials. Hospitality professionals — with decades of mastery and thousands of loyal customer relationships — have nothing that travels with them when they change venues.</p>
                <p>OnTonight is the correction. A portable professional identity, verified skills platform, and loyalty network — all in one. Built by a 27-year hospitality veteran who lived the problem firsthand.</p>
                <div className="why-bullets">
                  <div className="why-bullet">
                    <span className="bullet-icon">✓</span>
                    <span>Live platform — deployed and operational in Tampa Bay</span>
                  </div>
                  <div className="why-bullet">
                    <span className="bullet-icon">✓</span>
                    <span>Proprietary DAPA assessment system — 600+ questions, 6-axis genome</span>
                  </div>
                  <div className="why-bullet">
                    <span className="bullet-icon">✓</span>
                    <span>Three revenue streams: OnPro subscriptions, Patron subscriptions, Venue licensing</span>
                  </div>
                  <div className="why-bullet">
                    <span className="bullet-icon">✓</span>
                    <span>Delaware LLC · Trademarks filed: OnTonight™ OnPros™</span>
                  </div>
                  <div className="why-bullet">
                    <span className="bullet-icon">✓</span>
                    <span>Expansion roadmap: Tampa → Miami → Nashville → National</span>
                  </div>
                </div>
              </div>
              <div className="why-sidebar">
                <div className="sidebar-card">
                  <div className="sidebar-card-label">FOUNDER</div>
                  <div className="sidebar-card-name">Jack H. Joy Jr.</div>
                  <div className="sidebar-card-title">CEO & Founder</div>
                  <p>27 years of hospitality experience. Built the platform he needed but could never find. Software engineer, operator, and industry advocate.</p>
                </div>
                <div className="sidebar-card highlight">
                  <div className="sidebar-card-label">SEED ROUND</div>
                  <div className="sidebar-card-name">$2.5M</div>
                  <div className="sidebar-card-title">Pre-money target: $7.5–10M</div>
                  <p>Delaware C-Corp conversion planned prior to close. Stripe revenue infrastructure in place. Pilot markets active.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="investors-form-section">
          <div className="container">
            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="investors-form">
                <div className="form-section-title">Investor Inquiry</div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                  </div>
                  <div className="form-group">
                    <label>Firm / Organization</label>
                    <input type="text" name="firm" value={formData.firm} onChange={handleChange} placeholder="Fund or firm name (if applicable)" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Investor Type *</label>
                    <select name="investorType" value={formData.investorType} onChange={handleChange} required>
                      <option value="">Select type...</option>
                      <option value="Angel">Angel Investor</option>
                      <option value="Venture Capital">Venture Capital</option>
                      <option value="Family Office">Family Office</option>
                      <option value="Strategic">Strategic / Corporate</option>
                      <option value="Hospitality Operator">Hospitality Operator</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Typical Check Size</label>
                    <select name="checkSize" value={formData.checkSize} onChange={handleChange}>
                      <option value="">Select range...</option>
                      <option value="Under $50K">Under $50K</option>
                      <option value="$50K–$250K">$50K – $250K</option>
                      <option value="$250K–$500K">$250K – $500K</option>
                      <option value="$500K–$1M">$500K – $1M</option>
                      <option value="$1M+">$1M+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Investment Focus</label>
                  <input type="text" name="focus" value={formData.focus} onChange={handleChange} placeholder="e.g. Consumer tech, Hospitality, Future of Work, SaaS..." />
                </div>

                <div className="form-group">
                  <label>Tell Us About Your Interest *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="6" placeholder="What draws you to OnTonight? Any specific questions about the business, technology, or market opportunity?" />
                </div>

                {status.message && (
                  <div className={`status-message ${status.type}`}>{status.message}</div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Submit Inquiry →'}
                </button>
              </form>

              <div className="investors-info">
                <div className="info-card">
                  <h3>📧 Direct Contact</h3>
                  <p><a href="mailto:AdminJoy@On-Tonight.com">AdminJoy@On-Tonight.com</a></p>
                  <p className="info-detail">Responses within 48 hours</p>
                </div>
                <div className="info-card">
                  <h3>🏢 Incorporated</h3>
                  <p>OnTonight LLC<br />Delaware · Foreign registered in Florida</p>
                </div>
                <div className="info-card highlight">
                  <h3>📊 Round Details</h3>
                  <ul>
                    <li>Raising: $2.5M Seed</li>
                    <li>Pre-money: $7.5–10M target</li>
                    <li>Structure: SAFE or priced round</li>
                    <li>C-Corp conversion pre-close</li>
                    <li>Revenue infrastructure: Stripe</li>
                  </ul>
                </div>
                <div className="info-card">
                  <h3>🌴 Current Markets</h3>
                  <p>Live: Tampa Bay, FL<br />Next: Miami · Nashville<br />Roadmap: National expansion</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="footer-logo">OnTonight</div>
                <p className="footer-tagline">Your Night. Your People. Where Regulars Are Made.</p>
              </div>
              <div className="footer-links">
                <Link href="/">Home</Link>
                <Link href="/partner">Venue Partners</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/media">Media</Link>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} OnTonight LLC · Delaware LLC · OnTonight™ and OnPros™ are registered trademarks.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .investors-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #0c1620 100%);
          color: #f8fafc;
          font-family: 'Urbanist', -apple-system, sans-serif;
        }
        .header {
          padding: 24px 48px; display: flex; align-items: center;
          background: rgba(10, 10, 15, 0.9); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 163, 115, 0.15);
          position: sticky; top: 0; z-index: 100;
        }
        .logo {
          font-size: 26px; font-weight: 600; color: #d4a373; text-decoration: none;
          letter-spacing: -0.02em;
        }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
          color: #d4a373; text-transform: uppercase; margin-bottom: 16px;
        }
        .investors-hero {
          padding: 100px 24px 80px; text-align: center;
          background: radial-gradient(circle at 50% 0%, rgba(212, 163, 115, 0.08) 0%, transparent 60%);
        }
        .investors-hero h1 {
          font-size: clamp(36px, 6vw, 60px); font-weight: 700; margin: 0 0 24px;
          letter-spacing: -0.02em;
        }
        .hero-subtitle {
          font-size: 17px; color: rgba(248, 250, 252, 0.65); max-width: 680px;
          margin: 0 auto; line-height: 1.7; font-weight: 300;
        }
        .metrics-section { padding: 60px 24px; background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .metric-card { text-align: center; padding: 28px 16px; }
        .metric-value { font-size: clamp(28px, 4vw, 42px); font-weight: 700; color: #e8c49a; margin-bottom: 8px; }
        .metric-label { font-size: 13px; font-weight: 600; color: rgba(248,250,252,0.8); margin-bottom: 4px; }
        .metric-sub { font-size: 11px; color: rgba(248,250,252,0.35); font-weight: 300; text-transform: uppercase; letter-spacing: 0.06em; }
        .why-section { padding: 80px 24px; }
        .why-grid { display: grid; grid-template-columns: 1fr 340px; gap: 60px; align-items: start; }
        .section-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #d4a373; text-transform: uppercase; margin-bottom: 12px; }
        .why-content h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 600; margin: 0 0 20px; }
        .why-content p { font-size: 15px; line-height: 1.8; color: rgba(248,250,252,0.7); font-weight: 300; margin-bottom: 16px; }
        .why-bullets { margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
        .why-bullet { display: flex; gap: 12px; align-items: flex-start; }
        .bullet-icon { color: #22c55e; font-size: 14px; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
        .why-bullet span:last-child { font-size: 14px; color: rgba(248,250,252,0.75); line-height: 1.5; font-weight: 300; }
        .why-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .sidebar-card {
          padding: 24px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
        }
        .sidebar-card.highlight { background: rgba(212,163,115,0.05); border-color: rgba(212,163,115,0.25); }
        .sidebar-card-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #d4a373; margin-bottom: 8px; }
        .sidebar-card-name { font-size: 22px; font-weight: 700; color: #f8fafc; margin-bottom: 4px; }
        .sidebar-card-title { font-size: 13px; color: rgba(248,250,252,0.5); margin-bottom: 12px; font-weight: 300; }
        .sidebar-card p { font-size: 13px; line-height: 1.6; color: rgba(248,250,252,0.6); font-weight: 300; margin: 0; }
        .investors-form-section { padding: 80px 24px; background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.05); }
        .form-wrapper { display: grid; grid-template-columns: 2fr 1fr; gap: 60px; }
        .investors-form {
          background: rgba(12, 18, 28, 0.8); backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 115, 0.2); border-radius: 14px; padding: 48px;
        }
        .form-section-title { font-size: 18px; font-weight: 600; color: #d4a373; margin-bottom: 28px; padding-bottom: 14px; border-bottom: 1px solid rgba(212, 163, 115, 0.2); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: #d4a373; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%; padding: 14px 16px;
          background: rgba(10, 12, 20, 0.7); border: 1px solid rgba(212, 163, 115, 0.2);
          border-radius: 8px; color: #f8fafc; font-size: 14px; font-family: inherit;
          font-weight: 300; transition: all 0.2s; -webkit-appearance: none;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { color: rgba(248,250,252,0.3); }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #d4a373; background: rgba(212,163,115,0.04); }
        .form-group textarea { resize: vertical; min-height: 140px; }
        .status-message { padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; font-weight: 400; }
        .status-message.success { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; }
        .status-message.error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; }
        .submit-btn {
          width: 100%; padding: 16px 32px;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0a0a0f; font-size: 15px; font-weight: 700;
          border: none; border-radius: 8px; cursor: pointer;
          transition: all 0.3s; font-family: inherit; letter-spacing: 0.02em;
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(212,163,115,0.25); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .investors-info { display: flex; flex-direction: column; gap: 16px; }
        .info-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(212,163,115,0.15); border-radius: 12px; padding: 22px; }
        .info-card.highlight { background: rgba(212,163,115,0.04); border-color: rgba(212,163,115,0.3); }
        .info-card h3 { font-size: 15px; font-weight: 600; color: #d4a373; margin: 0 0 10px; }
        .info-card p { font-size: 13px; color: rgba(248,250,252,0.7); line-height: 1.6; font-weight: 300; margin: 0; }
        .info-card a { color: #d4a373; text-decoration: none; }
        .info-card a:hover { text-decoration: underline; }
        .info-detail { font-size: 11px; color: rgba(248,250,252,0.35); margin-top: 4px; font-weight: 300; }
        .info-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .info-card li { font-size: 13px; color: rgba(248,250,252,0.7); padding-left: 16px; position: relative; font-weight: 300; }
        .info-card li::before { content: '✓'; position: absolute; left: 0; color: #22c55e; font-size: 11px; }
        .footer { padding: 48px 24px 28px; background: #080f18; border-top: 1px solid rgba(232,196,154,0.1); }
        .footer-content { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 20px; }
        .footer-logo { font-size: 18px; font-weight: 600; color: #e8c49a; margin-bottom: 6px; }
        .footer-tagline { font-size: 12px; color: rgba(248,250,252,0.35); font-weight: 300; }
        .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
        .footer-links a { font-size: 13px; color: rgba(248,250,252,0.45); text-decoration: none; font-weight: 300; }
        .footer-links a:hover { color: #d4a373; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
        .footer-bottom p { font-size: 11px; color: rgba(248,250,252,0.25); font-weight: 300; }
        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: 1fr; }
          .why-sidebar { flex-direction: row; flex-wrap: wrap; }
          .sidebar-card { flex: 1; min-width: 200px; }
          .form-wrapper { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .header { padding: 16px 20px; }
          .investors-hero { padding: 80px 16px 60px; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .form-row { grid-template-columns: 1fr; }
          .investors-form { padding: 28px 20px; }
          .footer-content { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
