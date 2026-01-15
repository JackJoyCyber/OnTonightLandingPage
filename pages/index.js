// pages/index.js - OnTonight Landing Page with Updated Vision Section
// This file includes the condensed Vision with Jack's introduction
// Ready to replace your current landing page index.js

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({
    name: '', email: '', userType: '', city: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      alert('Error submitting. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>OnTonight - Professional Identity Platform for Hospitality</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry. Live now in Tampa Bay. Expanding to Miami, Nashville & beyond." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="page">
        {/* NAVIGATION */}
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-logo">OnTonight</div>
            <div className="nav-tabs">
              <button className={activeTab === 'home' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('home')}>The Problem</button>
              <button className={activeTab === 'platform' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('platform')}>Platform</button>
              <button className={activeTab === 'founder' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('founder')}>The Vision</button>
              <a href="#waitlist" className="nav-cta">Join Waitlist</a>
            </div>
          </div>
        </nav>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="tab-content">
            {/* HERO */}
            <section className="hero">
              <div className="hero-glow"></div>
              <div className="container">
                <div className="hero-badge">LIVE NOW · JOIN THE MOVEMENT</div>
                <h1>Your Night.<br />Your People.</h1>
                <p className="hero-subtitle">Where Regulars Are Made</p>
                
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-number">27</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">$66.8B</span>
                    <span className="stat-label">Industry Crisis</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">1</span>
                    <span className="stat-label">Solution</span>
                  </div>
                </div>

                <div className="hero-ctas">
                  <button onClick={() => setActiveTab('platform')} className="btn-primary">
                    Explore Platform
                  </button>
                  <button onClick={() => setActiveTab('founder')} className="btn-secondary">
                    The Vision
                  </button>
                </div>

                {showInstallPrompt && (
                  <button onClick={handleInstall} className="btn-install">
                    📱 Add to Home Screen
                  </button>
                )}
              </div>
            </section>

            {/* VALUE PROPS */}
            <section className="value">
              <div className="container">
                <h2>What's Your Career Worth?</h2>
                <p className="section-subtitle">The hidden cost of hospitality turnover—and how OnTonight fixes it.</p>
                <div className="value-grid">
                  <div className="value-item">
                    <div className="value-icon">💰</div>
                    <div className="value-number">$24K</div>
                    <div className="value-label">Lost in Tips Per Venue Change</div>
                    <p>Average bartender loses $24,000 in regular tips when changing venues. Your regulars can't follow you. Until now.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-icon">📈</div>
                    <div className="value-number">40%</div>
                    <div className="value-label">Potential Higher Earnings When DAPA-Certified</div>
                    <p>DAPA-Certified OnPros have the potential to earn 40% more than industry average. Your verified skills have measurable value.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-icon">🎯</div>
                    <div className="value-number">300+</div>
                    <div className="value-label">Regular Relationships Maintained</div>
                    <p>Top OnPros maintain 300+ verified regular relationships. Own your network, not the venue's.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CRISIS QUOTES */}
            <section className="quotes">
              <div className="container">
                <h2>The $66.8B Industry Crisis</h2>
                <p className="section-subtitle">What industry leaders are saying about hospitality turnover.</p>
                <div className="quotes-grid">
                  <div className="quote">
                    <p>"The cost of turnover in hospitality is huge. Recruitment, retention, staff turnover... these are words that likely haunt the dreams of hospitality operators."</p>
                    <cite>Institute of Hospitality, 2024</cite>
                  </div>
                  <div className="quote">
                    <p>"With 50% FOH turnover, you're replacing 7-10 servers and hosts every year. That's $7,400-$10,560+ in replacement costs alone—not counting the hit to service quality."</p>
                    <cite>7shifts Restaurant Workforce Report, 2025</cite>
                  </div>
                  <div className="quote">
                    <p>"Losing a single employee can cost hospitality businesses more than $5,000 in recruiting, hiring, training and lost productivity. It can take up to two years for a new hire to become fully productive."</p>
                    <cite>OysterLink Industry Report, 2025</cite>
                  </div>
                  <div className="quote">
                    <p>"Reducing employee turnover by 10% can improve net profit margins by approximately 3%."</p>
                    <cite>Gallup Workplace Report, 2025</cite>
                  </div>
                  <div className="quote">
                    <p>"Staffing challenges topped operators' 2024 list of concerns. Finding and keeping skilled staff is a concern that's risen by 4 percent."</p>
                    <cite>FSR Magazine, 2025</cite>
                  </div>
                  <div className="quote">
                    <p>"It's very tough to find the people and then have them stay. After a week, somebody will say, 'This doesn't work for me, I'm going to go somewhere else.' Big turnover."</p>
                    <cite>TouchBistro State of Restaurants, 2024</cite>
                  </div>
                </div>
              </div>
            </section>

            {/* MISSION STATEMENT */}
            <section className="mission">
              <div className="container">
                <div className="mission-content">
                  <h2>Our Mission</h2>
                  <p className="mission-statement">OnTonight is building the professional infrastructure that hospitality deserves. We're not creating another discount app or social network—we're professionalizing an entire industry by giving workers portable careers, customers the ability to follow their people, and venues the tools to showcase their talent.</p>
                  <div className="mission-pillars">
                    <div className="pillar">
                      <h4>For Professionals</h4>
                      <p>Own your career. Your skills, your regulars, your professional identity—portable across venues.</p>
                    </div>
                    <div className="pillar">
                      <h4>For Customers</h4>
                      <p>Follow your people. Never lose touch with favorite bartenders, servers, and sommeliers again.</p>
                    </div>
                    <div className="pillar">
                      <h4>For Venues</h4>
                      <p>Compete on culture. Attract and retain verified talent. Prove your team's value with data.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PLATFORM TAB */}
        {activeTab === 'platform' && (
          <div className="tab-content">
            <section className="platform">
              <div className="container">
                <h1>The Platform</h1>
                <p className="platform-lead">Professional infrastructure built for hospitality careers.</p>

                <div className="platform-overview">
                  <h2>Two Assessment Systems. One Complete Identity.</h2>
                  <div className="assessment-grid">
                    <div className="assessment-card">
                      <h3>DAPA (OnPro)</h3>
                      <h4>Dynamic Adaptive Personality Assessment</h4>
                      <p>Verifies skills. Creates portable professional identity. Helps venues hire better and OnPros prove their worth.</p>
                    </div>
                    <div className="assessment-card">
                      <h3>OnScene Genome (Patron)</h3>
                      <h4>Hospitality Personality Profiling</h4>
                      <p>Measures social behavior and hospitality preferences. Matches people to experiences. Creates personalized recommendations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* FOUNDER TAB - NEW CONDENSED VISION */}
        {activeTab === 'founder' && (
          <div className="tab-content">
            <section className="vision">
              <div className="container">
                <h1>The Vision</h1>
                <p className="vision-lead">This is about an industry that deserves infrastructure. And the people who make it real.</p>

                <div className="vision-content">
                  {/* FOUNDER INTRODUCTION */}
                  <div className="founder-intro">
                    <div className="founder-photo-placeholder">
                      {/* TODO: Replace with <img src="/images/jack-photo.jpg" alt="Jack Joy" /> when you have photo */}
                      <div className="photo-placeholder-box">
                        <span style={{fontSize: '48px'}}>👤</span>
                        <p style={{marginTop: '12px', fontSize: '13px', color: 'rgba(212,163,115,0.7)'}}>Photo Coming Soon</p>
                      </div>
                    </div>
                    <div className="founder-text">
                      <h2>Hi, I'm Jack Joy, founder of OnTonight.</h2>
                      <p className="founder-tagline">27 years behind bars. One mission: end professional erasure in hospitality.</p>
                    </div>
                  </div>

                  {/* THE STORY - CONDENSED */}
                  <div className="vision-section">
                    <h3>Why This Exists</h3>
                    <p>I've spent 27 years in hospitality—managing venues, training hundreds of professionals, watching the best talent I ever developed walk out the door and start over from zero.</p>
                    <p className="vision-emphasis">Their regulars scattered. Their reputation reset. Their professional equity evaporated.</p>
                    <p>Every other profession has infrastructure. Lawyers have bar memberships that follow them. Engineers have GitHub. Real estate agents keep their client databases.</p>
                    <p>But a bartender who can make 200 cocktails an hour changes venues and loses everything. A sommelier with encyclopedic knowledge starts over as if they were fresh out of training.</p>
                    <p className="vision-highlight">This isn't the nature of hospitality. This is the absence of professional infrastructure. And I built OnTonight to fix it.</p>
                  </div>

                  <div className="vision-section">
                    <h3>What I Bring to This</h3>
                    <p>After 27 years in hospitality, I transitioned into cybersecurity and software development. Standing at the intersection of these two worlds, I realized: I understand both sides of this problem.</p>
                    <p>I know what it's like to make 200 drinks an hour during Saturday rush while tracking six tabs in your head and maintaining conversation with regulars. And I know how to build systems that scale beyond human limitation.</p>
                    <p className="vision-statement">Deep hospitality experience plus technical execution—that combination is rare. It's exactly what this problem needed.</p>
                  </div>

                  <div className="vision-section">
                    <h3>What OnTonight Actually Is</h3>
                    <p className="vision-highlight">OnTonight is professional infrastructure—the kind every other industry already has, finally built for hospitality.</p>
                    <ul className="vision-list">
                      <li><strong>For professionals:</strong> DAPA-verified skills that follow you. Customer relationships that belong to you, not your employer. Career equity that compounds over time.</li>
                      <li><strong>For customers:</strong> Follow your favorite bartenders and servers across venues. Never lose touch when they change jobs. The magic stays with the person who created it.</li>
                      <li><strong>For venues:</strong> Recruit verified talent. Compete on culture instead of wages alone. Turn retention into a competitive advantage.</li>
                    </ul>
                    <p>This is professional dignity in software form. This is career equity for people who serve. This is the infrastructure that should have existed decades ago.</p>
                  </div>

                  <div className="vision-section">
                    <h3>The Future We're Building</h3>
                    <p>Hospitality where professionals own their careers. Where leaving a toxic workplace doesn't mean financial devastation. Where better opportunities don't mean starting over.</p>
                    <p>Where small venues compete with corporate chains by showcasing verified talent. Where young professionals see a real career path—one where skills compound instead of resetting every 18 months.</p>
                    <p className="vision-emphasis">That's infrastructure. That's what happens when you build the foundation that should have always existed.</p>
                    <p>We're live now in Tampa Bay. Expanding to Miami, Nashville, Austin, and major hospitality markets nationwide—wherever great service happens, wherever professionals deserve infrastructure.</p>
                  </div>

                  <div className="vision-cta">
                    <h3>Join the Movement</h3>
                    <p>This isn't a product launch. This is a correction—the professional infrastructure that should have existed all along.</p>
                    <p className="cta-emphasis">We're ending professional erasure. We're making dignity portable. We're building the future of hospitality careers.</p>
                    <a href="#waitlist" className="btn-primary">Join the Waitlist</a>
                    <p className="cta-note">First 2,000 signups get their first year free. Be part of the infrastructure.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* WAITLIST */}
        <section className="waitlist" id="waitlist">
          <div className="container">
            {!submitted ? (
              <>
                <h2>Join the Waitlist</h2>
                <p className="waitlist-subtitle">First 2,000 signups receive their first year free. Be part of the Tampa launch.</p>
                
                <form onSubmit={handleSubmit} className="waitlist-form">
                  <div className="form-row">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                  <div className="form-row">
                    <select 
                      required 
                      value={formData.userType}
                      onChange={e => setFormData({...formData, userType: e.target.value})}>
                      <option value="">I am a...</option>
                      <option value="onpro">OnPro (Bartender, Server, Sommelier, etc.)</option>
                      <option value="patron">Patron (Customer)</option>
                      <option value="venue">Venue Owner/Manager</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="City" 
                      required
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})} 
                    />
                  </div>
                  
                  <div className="form-disclaimer">
                    By submitting, you confirm you are 18+ and agree to receive email communications from OnTonight about the platform launch and updates.
                  </div>
                  
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Get Early Access'}
                  </button>
                </form>
              </>
            ) : (
              <div className="waitlist-success">
                <div className="success-icon">🎉</div>
                <h2>Welcome to the Movement</h2>
                <p>You're among the first 2,000. Check your email for next steps and exclusive launch updates.</p>
                <p className="success-note">Your first year is FREE.</p>
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="footer-logo">OnTonight</div>
                <p className="footer-tagline">Where Regulars Are Made</p>
                <p className="footer-location">Live Now · Tampa Bay → Miami · Nashville · Austin</p>
              </div>
              <div className="footer-links">
                <div className="footer-col">
                  <h5>Platform</h5>
                  <a href="#waitlist">For OnPros</a>
                  <a href="#waitlist">For Patrons</a>
                  <a href="#waitlist">For Venues</a>
                  <a href="#waitlist">DAPA Assessment</a>
                </div>
                <div className="footer-col">
                  <h5>Company</h5>
                  <a href="https://app.on-tonight.com/privacy">Privacy Policy</a>
                  <a href="https://app.on-tonight.com/terms">Terms of Service</a>
                  <a href="/contact">Contact</a>
                  <a href="/careers">Careers</a>
                </div>
                <div className="footer-col">
                  <h5>Connect</h5>
                  <a href="/support">Support</a>
                  <a href="/media">Media</a>
                  <a href="/partner">Partner</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 OnTonight LLC. All rights reserved.</p>
              <p>18+ only · Professional platform for hospitality industry</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .page { 
          background: #0d1117;
          color: #f8fafc;
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: -0.015em;
          font-weight: 400;
          min-height: 100vh;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        /* NAV */
        .nav {
          background: rgba(13,17,23,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(212,163,115,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        
        .nav-logo {
          font-size: 24px;
          font-weight: 700;
          color: #d4a373;
          letter-spacing: -0.02em;
        }
        
        .nav-tabs {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .nav-tab {
          background: none;
          border: none;
          color: rgba(248,250,252,0.7);
          padding: 8px 16px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          font-family: inherit;
        }
        
        .nav-tab:hover {
          background: rgba(212,163,115,0.08);
          color: #f8fafc;
        }
        
        .nav-tab.active {
          background: rgba(212,163,115,0.15);
          color: #d4a373;
        }
        
        .nav-cta {
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0a0a0f;
          padding: 8px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-left: 16px;
          transition: transform 0.2s;
        }
        
        .nav-cta:hover {
          transform: translateY(-1px);
        }
        
        /* HERO */
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          text-align: center;
          padding: 120px 24px 80px;
        }
        
        .hero-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(212,163,115,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .container {
          position: relative;
          z-index: 1;
        }
        
        .hero-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 32px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .hero h1 {
          font-size: 80px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #d4a373 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: 28px;
          color: #d4a373;
          font-weight: 600;
          margin-bottom: 64px;
        }
        
        .hero-stats {
          display: flex;
          gap: 80px;
          justify-content: center;
          margin-bottom: 48px;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 48px;
          font-weight: 800;
          color: #d4a373;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 14px;
          color: rgba(248,250,252,0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .hero-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 32px;
        }
        
        .btn-primary, .btn-secondary {
          padding: 16px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-family: inherit;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0a0a0f;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(212,163,115,0.3);
        }
        
        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(212,163,115,0.3);
          color: #d4a373;
        }
        
        .btn-secondary:hover {
          background: rgba(212,163,115,0.08);
        }
        
        .btn-install {
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.2);
          color: #d4a373;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 16px;
        }
        
        /* VALUE SECTION */
        .value {
          padding: 120px 24px;
          background: #161b22;
        }
        
        .value h2 {
          text-align: center;
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .section-subtitle {
          text-align: center;
          font-size: 18px;
          color: rgba(248,250,252,0.7);
          margin-bottom: 64px;
        }
        
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .value-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 40px 32px;
          text-align: center;
        }
        
        .value-icon {
          font-size: 48px;
          margin-bottom: 24px;
        }
        
        .value-number {
          font-size: 56px;
          font-weight: 800;
          color: #d4a373;
          margin-bottom: 16px;
        }
        
        .value-label {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .value-item p {
          font-size: 15px;
          color: rgba(248,250,252,0.7);
          line-height: 1.6;
        }
        
        /* QUOTES SECTION */
        .quotes {
          padding: 120px 24px;
          background: #0d1117;
        }
        
        .quotes h2 {
          text-align: center;
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .quote {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px;
        }
        
        .quote p {
          font-size: 16px;
          font-style: italic;
          line-height: 1.7;
          margin-bottom: 24px;
          color: rgba(248,250,252,0.85);
        }
        
        cite {
          font-size: 14px;
          color: rgba(212,163,115,0.8);
          font-style: normal;
          font-weight: 500;
        }
        
        /* MISSION SECTION */
        .mission {
          padding: 120px 24px;
          background: #161b22;
        }
        
        .mission-content {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        
        .mission h2 {
          font-size: 48px;
          margin-bottom: 32px;
        }
        
        .mission-statement {
          font-size: 20px;
          line-height: 1.7;
          color: rgba(248,250,252,0.85);
          margin-bottom: 64px;
        }
        
        .mission-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        
        .pillar {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 32px;
        }
        
        .pillar h4 {
          font-size: 20px;
          color: #d4a373;
          margin-bottom: 16px;
        }
        
        .pillar p {
          font-size: 15px;
          color: rgba(248,250,252,0.7);
          line-height: 1.6;
        }
        
        /* PLATFORM SECTION */
        .platform {
          padding: 120px 24px;
          min-height: 80vh;
        }
        
        .platform h1 {
          text-align: center;
          font-size: 56px;
          margin-bottom: 16px;
        }
        
        .platform-lead {
          text-align: center;
          font-size: 20px;
          color: rgba(248,250,252,0.7);
          margin-bottom: 80px;
        }
        
        .platform-overview h2 {
          text-align: center;
          font-size: 36px;
          margin-bottom: 48px;
        }
        
        .assessment-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .assessment-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 40px;
        }
        
        .assessment-card h3 {
          color: #d4a373;
          font-size: 24px;
          margin-bottom: 12px;
        }
        
        .assessment-card h4 {
          font-size: 18px;
          margin-bottom: 20px;
        }
        
        .assessment-card p {
          font-size: 15px;
          color: rgba(248,250,252,0.7);
          line-height: 1.7;
        }
        
        /* VISION SECTION - NEW STYLES */
        .vision {
          padding: 120px 24px;
          min-height: 80vh;
        }
        
        .vision h1 {
          text-align: center;
          font-size: 56px;
          margin-bottom: 16px;
        }
        
        .vision-lead {
          text-align: center;
          font-size: 20px;
          color: rgba(248,250,252,0.7);
          margin-bottom: 80px;
        }
        
        .vision-content {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .founder-intro {
          display: flex;
          gap: 48px;
          align-items: center;
          margin-bottom: 80px;
          padding: 48px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 12px;
        }
        
        .founder-photo-placeholder {
          flex-shrink: 0;
        }
        
        .photo-placeholder-box {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 2px solid #d4a373;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(212,163,115,0.05);
          color: rgba(212,163,115,0.6);
        }
        
        .founder-text h2 {
          font-size: 32px;
          color: #d4a373;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        
        .founder-tagline {
          font-size: 20px;
          color: rgba(248,250,252,0.8);
          font-style: italic;
          line-height: 1.5;
        }
        
        .vision-section {
          margin-bottom: 72px;
        }
        
        .vision-section h3 {
          color: #d4a373;
          margin-bottom: 32px;
          font-size: 34px;
        }
        
        .vision-section p {
          margin-bottom: 24px;
          font-size: 18px;
          line-height: 1.8;
          color: rgba(248,250,252,0.85);
        }
        
        .vision-emphasis {
          color: #f8fafc;
          font-weight: 500;
          font-size: 22px;
          line-height: 1.6;
          margin: 32px 0;
          padding-left: 24px;
          border-left: 3px solid #d4a373;
        }
        
        .vision-statement {
          font-size: 24px;
          color: #d4a373;
          font-weight: 600;
          line-height: 1.6;
          margin: 32px 0;
          text-align: center;
        }
        
        .vision-highlight {
          color: #d4a373;
          font-weight: 600;
          padding: 32px;
          border-left: 3px solid #d4a373;
          background: rgba(212,163,115,0.06);
          border-radius: 4px;
          font-size: 20px;
          line-height: 1.7;
          margin: 32px 0;
        }
        
        .vision-list {
          list-style: none;
          margin: 32px 0;
        }
        
        .vision-list li {
          font-size: 17px;
          line-height: 1.9;
          color: rgba(248,250,252,0.8);
          padding-left: 32px;
          position: relative;
          margin-bottom: 24px;
        }
        
        .vision-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #d4a373;
          font-size: 20px;
        }
        
        .vision-list li strong {
          color: #f8fafc;
          font-weight: 600;
        }
        
        .vision-cta {
          text-align: center;
          padding: 72px 56px;
          border: 1px solid rgba(212,163,115,0.3);
          background: rgba(212,163,115,0.05);
          margin-top: 100px;
          border-radius: 12px;
        }
        
        .vision-cta h3 {
          margin-bottom: 24px;
          font-size: 36px;
        }
        
        .vision-cta p {
          margin-bottom: 16px;
          font-size: 18px;
        }
        
        .cta-emphasis {
          color: #d4a373;
          font-weight: 600;
          font-size: 20px;
          margin: 32px 0 40px 0;
        }
        
        .cta-note {
          font-size: 15px;
          color: rgba(248,250,252,0.6);
          margin-top: 24px;
        }
        
        /* WAITLIST */
        .waitlist {
          background: #161b22;
          border-top: 1px solid rgba(212,163,115,0.1);
          text-align: center;
          padding: 120px 24px;
        }
        
        .waitlist h2 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .waitlist-subtitle {
          font-size: 18px;
          color: #d4a373;
          margin-bottom: 48px;
        }
        
        .waitlist-form {
          max-width: 700px;
          margin: 0 auto;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }
        
        input, select {
          padding: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #f8fafc;
          font-size: 15px;
          font-family: inherit;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #d4a373;
        }
        
        .form-disclaimer {
          font-size: 13px;
          color: rgba(248,250,252,0.6);
          margin-bottom: 24px;
        }
        
        .btn-submit {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0a0a0f;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s;
          font-family: inherit;
        }
        
        .btn-submit:hover {
          transform: translateY(-2px);
        }
        
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .waitlist-success {
          padding: 80px 40px;
        }
        
        .success-icon {
          font-size: 72px;
          margin-bottom: 32px;
        }
        
        .waitlist-success h2 {
          margin-bottom: 24px;
        }
        
        .waitlist-success p {
          font-size: 18px;
          color: rgba(248,250,252,0.8);
          margin-bottom: 16px;
        }
        
        .success-note {
          color: #d4a373;
          font-weight: 600;
        }
        
        /* FOOTER */
        .footer {
          background: #0d1117;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 80px 24px 40px;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 48px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .footer-brand .footer-logo {
          font-size: 24px;
          font-weight: 700;
          color: #d4a373;
          margin-bottom: 12px;
        }
        
        .footer-tagline {
          font-size: 14px;
          color: rgba(248,250,252,0.7);
          margin-bottom: 8px;
        }
        
        .footer-location {
          font-size: 13px;
          color: rgba(248,250,252,0.5);
        }
        
        .footer-links {
          display: flex;
          gap: 64px;
        }
        
        .footer-col h5 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #d4a373;
          margin-bottom: 16px;
        }
        
        .footer-col a {
          display: block;
          color: rgba(248,250,252,0.7);
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 12px;
          transition: color 0.2s;
        }
        
        .footer-col a:hover {
          color: #d4a373;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.08);
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-bottom p {
          font-size: 14px;
          color: rgba(248,250,252,0.5);
          margin-bottom: 8px;
        }
        
        /* MOBILE RESPONSIVE */
        @media (max-width: 768px) {
          .nav-tabs {
            display: none;
          }
          
          .hero h1 {
            font-size: 48px;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 32px;
          }
          
          .hero-ctas {
            flex-direction: column;
          }
          
          .value-grid,
          .quotes-grid,
          .mission-pillars,
          .assessment-grid {
            grid-template-columns: 1fr;
          }
          
          .founder-intro {
            flex-direction: column;
            text-align: center;
            padding: 32px 24px;
            gap: 32px;
          }
          
          .founder-text h2 {
            font-size: 24px;
          }
          
          .founder-tagline {
            font-size: 18px;
          }
          
          .photo-placeholder-box {
            width: 150px;
            height: 150px;
          }
          
          .vision-section h3 {
            font-size: 28px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 40px;
          }
          
          .footer-links {
            flex-direction: column;
            gap: 32px;
          }
        }
      `}</style>
    </>
  );
}
