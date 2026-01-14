import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Partner() {
  const [formData, setFormData] = useState({
    venueName: '',
    contactName: '',
    email: '',
    phone: '',
    venueType: 'Bar',
    location: '',
    staffCount: '',
    revenueRange: '',
    challenges: [],
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Partnership inquiry received! We\'ll contact you within 24 hours to discuss your custom solution.' });
        setFormData({ 
          venueName: '', contactName: '', email: '', phone: '', venueType: 'Bar', 
          location: '', staffCount: '', revenueRange: '', challenges: [], message: '' 
        });
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      challenges: checked 
        ? [...prev.challenges, value]
        : prev.challenges.filter(c => c !== value)
    }));
  };

  return (
    <>
      <Head>
        <title>Partner With Us | OnTonight</title>
        <meta name="description" content="Venue partnerships with OnTonight. Recruit verified talent, reduce turnover, and showcase your team. Custom pricing for hospitality venues." />
      </Head>

      <div className="partner-page">
        <header className="header">
          <Link href="/" className="logo">OnTonight</Link>
        </header>

        <section className="partner-hero">
          <div className="container">
            <h1>Partner With OnTonight</h1>
            <p className="hero-subtitle">Stop losing talent to turnover. Recruit verified professionals. Compete on culture, not just wages.</p>
          </div>
        </section>

        <section className="partner-form-section">
          <div className="container">
            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="partner-form">
                <div className="form-section-title">Venue Information</div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Venue Name *</label>
                    <input
                      type="text"
                      name="venueName"
                      value={formData.venueName}
                      onChange={handleChange}
                      required
                      placeholder="Your venue name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Name *</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="form-row">
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
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Venue Type</label>
                    <select
                      name="venueType"
                      value={formData.venueType}
                      onChange={handleChange}
                    >
                      <option value="Bar">Bar</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Lounge">Lounge/Club</option>
                      <option value="Nightclub">Nightclub</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Brewery">Brewery/Distillery</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Staff Count</label>
                    <select
                      name="staffCount"
                      value={formData.staffCount}
                      onChange={handleChange}
                    >
                      <option value="">Select range</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-25">11-25 employees</option>
                      <option value="26-50">26-50 employees</option>
                      <option value="51-100">51-100 employees</option>
                      <option value="100+">100+ employees</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Annual Revenue Range</label>
                    <select
                      name="revenueRange"
                      value={formData.revenueRange}
                      onChange={handleChange}
                    >
                      <option value="">Select range</option>
                      <option value="Under $500K">Under $500K</option>
                      <option value="$500K-$1M">$500K-$1M</option>
                      <option value="$1M-$3M">$1M-$3M</option>
                      <option value="$3M-$5M">$3M-$5M</option>
                      <option value="$5M+">$5M+</option>
                    </select>
                  </div>
                </div>

                <div className="form-section-title" style={{marginTop: '32px'}}>Your Challenges</div>
                <div className="form-group">
                  <label>What are your biggest staffing challenges? (Select all that apply)</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" value="High Turnover" onChange={handleCheckboxChange} />
                      <span>High Turnover Rates</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" value="Recruiting" onChange={handleCheckboxChange} />
                      <span>Recruiting Qualified Staff</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" value="Retention" onChange={handleCheckboxChange} />
                      <span>Retention & Engagement</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" value="Training" onChange={handleCheckboxChange} />
                      <span>Training & Development</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" value="Analytics" onChange={handleCheckboxChange} />
                      <span>Staff Performance Analytics</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" value="Culture" onChange={handleCheckboxChange} />
                      <span>Building Strong Culture</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Tell us about your venue *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="What makes your venue unique? What are you looking for in a partnership?"
                  />
                </div>

                {status.message && (
                  <div className={`status-message ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Request Partnership Info'}
                </button>
              </form>

              <div className="partner-info">
                <div className="info-card highlight">
                  <h3>🎯 3-Month Free Trial</h3>
                  <p>Experience the platform risk-free. See the impact on retention and recruitment before committing.</p>
                </div>

                <div className="info-card">
                  <h3>💰 Custom Pricing</h3>
                  <p><strong>Starting at $50/month</strong></p>
                  <p className="info-detail">Pricing scales with venue size and features. Volume discounts for multi-location operators.</p>
                </div>

                <div className="info-card">
                  <h3>📊 What You Get</h3>
                  <ul>
                    <li>Complete venue profile</li>
                    <li>Team member verification</li>
                    <li>Staff analytics dashboard</li>
                    <li>Customer check-in tracking</li>
                    <li>Recruitment tools</li>
                    <li>DAPA-verified talent pool</li>
                  </ul>
                </div>

                <div className="info-card">
                  <h3>🚀 Implementation</h3>
                  <p><strong>1-2 week setup</strong></p>
                  <ul>
                    <li>Week 1: Profile creation & training</li>
                    <li>Week 2: Team onboarding</li>
                    <li>Ongoing: Support & analytics</li>
                  </ul>
                </div>

                <div className="info-card">
                  <h3>📞 Contact</h3>
                  <p>partner@on-tonight.com</p>
                  <p className="info-detail">Schedule a demo within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="partner-benefits">
          <div className="container">
            <h2>Why Venues Choose OnTonight</h2>
            <p className="section-subtitle">Professional infrastructure that reduces turnover and attracts better talent</p>
            
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h4>Recruit With Confidence</h4>
                <p>Access DAPA-certified professionals with verified skills. See technical mastery, ethical judgment, and leadership capacity before the interview.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <h4>Data-Driven Decisions</h4>
                <p>Track which staff members drive customer traffic and maintain regulars. Make staffing decisions based on performance data.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h4>Reduce Turnover Costs</h4>
                <p>Average cost to replace one hospitality worker: $5,864. OnTonight helps you retain talent and reduce this recurring expense.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🌟</div>
                <h4>Attract Better Customers</h4>
                <p>Patrons follow OnPros, not just venues. Your verified talent becomes a customer acquisition engine.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🏆</div>
                <h4>Compete on Culture</h4>
                <p>Showcase your team's expertise and work environment. Win talent wars by proving you develop careers.</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">📈</div>
                <h4>Measurable ROI</h4>
                <p>Track retention improvements, hiring efficiency, and staff performance. See the financial impact of professional development.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <h2>Tampa Pilot Venues</h2>
            <p className="section-subtitle">Leading hospitality venues already partnering with OnTonight</p>
            
            <div className="venues-grid">
              <div className="venue-card">
                <h4>Haiku Tampa</h4>
                <p>Japanese-inspired cocktail lounge</p>
              </div>
              <div className="venue-card">
                <h4>Ulele</h4>
                <p>Native-inspired waterfront dining</p>
              </div>
              <div className="venue-card">
                <h4>Beacon Rooftop Bar</h4>
                <p>Premier rooftop experience</p>
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
                <Link href="/media">Media</Link>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 OnTonight LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .partner-page {
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

        .partner-hero {
          padding: 100px 24px 60px;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, rgba(212, 163, 115, 0.1) 0%, transparent 50%);
        }

        .partner-hero h1 {
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

        .partner-form-section {
          padding: 60px 24px 120px;
        }

        .form-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .partner-form {
          background: rgba(26, 26, 46, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 115, 0.2);
          border-radius: 12px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .form-section-title {
          font-size: 18px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(212, 163, 115, 0.2);
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

        .checkbox-group {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 12px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(10, 10, 15, 0.4);
          border: 1px solid rgba(212, 163, 115, 0.15);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .checkbox-label:hover {
          background: rgba(212, 163, 115, 0.05);
          border-color: rgba(212, 163, 115, 0.3);
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          margin: 0;
          cursor: pointer;
        }

        .checkbox-label span {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.8);
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

        .partner-info {
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

        .info-card.highlight {
          background: rgba(34, 197, 94, 0.05);
          border-color: rgba(34, 197, 94, 0.3);
        }

        .info-card h3 {
          font-size: 18px;
          margin-bottom: 12px;
          color: #d4a373;
        }

        .info-card.highlight h3 {
          color: #22c55e;
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
          content: "✓";
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

        .partner-benefits {
          padding: 100px 24px;
          background: rgba(26, 26, 46, 0.3);
          border-top: 1px solid rgba(212, 163, 115, 0.1);
        }

        .partner-benefits h2 {
          text-align: center;
          margin-bottom: 16px;
        }

        .section-subtitle {
          text-align: center;
          font-size: 18px;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 60px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .benefit-card {
          background: rgba(26, 26, 46, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 115, 0.2);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 163, 115, 0.4);
          box-shadow: 0 12px 32px rgba(212, 163, 115, 0.15);
        }

        .benefit-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .benefit-card h4 {
          font-size: 20px;
          color: #d4a373;
          margin-bottom: 12px;
        }

        .benefit-card p {
          font-size: 15px;
          color: rgba(248, 250, 252, 0.7);
          line-height: 1.6;
        }

        .testimonials {
          padding: 100px 24px;
        }

        .testimonials h2 {
          text-align: center;
          margin-bottom: 16px;
        }

        .venues-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        .venue-card {
          background: rgba(26, 26, 46, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 163, 115, 0.2);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
        }

        .venue-card h4 {
          font-size: 18px;
          color: #d4a373;
          margin-bottom: 8px;
        }

        .venue-card p {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.7);
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

          .partner-hero h1 {
            font-size: 40px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .checkbox-group {
            grid-template-columns: 1fr;
          }

          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .venues-grid {
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

          .partner-hero {
            padding: 80px 24px 40px;
          }

          .partner-hero h1 {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .partner-form {
            padding: 32px 24px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
