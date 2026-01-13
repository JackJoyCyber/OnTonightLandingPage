// pages/index.js - OnTonight Landing Page (TRUE C3 NEON EDGE THEME)
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedArchetype, setSelectedArchetype] = useState(null);
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

  const archetypes = {
    connector: { emoji: '🌐', name: 'The Connector', desc: 'You thrive on building relationships and creating networks. Every interaction is an opportunity to connect people, ideas, and experiences.' },
    regular: { emoji: '🏠', name: 'The Regular', desc: 'Loyalty and consistency define you. You value deep, lasting relationships with your favorite places and people.' },
    adventurer: { emoji: '🗺️', name: 'The Adventurer', desc: 'Always seeking the next great experience. You explore new venues, try new drinks, and chase novelty.' },
    host: { emoji: '🎉', name: 'The Host', desc: 'You bring people together. Every outing is an event, and you are the one making it happen.' },
    connoisseur: { emoji: '🍷', name: 'The Connoisseur', desc: 'Quality over quantity. You appreciate craft, expertise, and the finer details that others miss.' },
    explorer: { emoji: '🔍', name: 'The Explorer', desc: 'Curious and discerning, you seek hidden gems and authentic experiences off the beaten path.' },
    celebrator: { emoji: '🎊', name: 'The Celebrator', desc: 'Life is full of moments worth celebrating, and you make sure every one counts.' },
    relaxer: { emoji: '😌', name: 'The Relaxer', desc: 'Your nights out are about unwinding, decompressing, and finding peace in good company.' },
    supporter: { emoji: '💪', name: 'The Supporter', desc: 'You champion the people and places you believe in, becoming their biggest advocate.' },
    critic: { emoji: '🧐', name: 'The Critic', desc: 'Your high standards push the industry forward. You know what excellence looks like.' },
    storyteller: { emoji: '📖', name: 'The Storyteller', desc: 'Every night out becomes a story. You remember the details and share the experiences.' },
    student: { emoji: '📚', name: 'The Student', desc: 'Always learning, always asking questions. You want to understand the craft behind the experience.' }
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
        <title>OnTonight - Professional Identity Platform</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry." />
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
              <button className={activeTab === 'home' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('home')}>Home</button>
              <button className={activeTab === 'platform' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('platform')}>Platform</button>
              <button className={activeTab === 'founder' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('founder')}>Vision</button>
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
                <div className="hero-badge">TAMPA · 2025</div>
                <h1>Your Night.<br />Your People.</h1>
                <p className="hero-subtitle">Where Regulars Are Made</p>
                
                <div className="hero-stats">
                  <div><span>27</span> Years Experience</div>
                  <div><span>$66.8B</span> Crisis</div>
                  <div><span>1</span> Solution</div>
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
                    Add to Home Screen
                  </button>
                )}
              </div>
            </section>

            {/* VALUE */}
            <section className="value">
              <div className="container">
                <h2>What's Your Career Worth?</h2>
                <div className="value-grid">
                  <div className="value-item">
                    <div className="value-number">$24K</div>
                    <div className="value-label">Lost in Tips Per Venue Change</div>
                    <p>Control your income. Your regulars follow you.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-number">40%</div>
                    <div className="value-label">Higher Earnings When Verified</div>
                    <p>Build equity. Your skills have value.</p>
                  </div>
                  <div className="value-item">
                    <div className="value-number">300+</div>
                    <div className="value-label">Regular Relationships Maintained</div>
                    <p>Own your network. Not the venue's.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* QUOTES */}
            <section className="quotes">
              <div className="container">
                <h2>The Industry Crisis</h2>
                <div className="quotes-grid">
                  <div className="quote">
                    <p>"The cost of turnover in hospitality is huge. Recruitment, retention, staff turnover... these are words that likely haunt the dreams of hospitality operators."</p>
                    <cite>Institute of Hospitality, 2024</cite>
                  </div>
                  <div className="quote">
                    <p>"With 50% FOH turnover, you're replacing 7-10 servers and hosts every year. That's $7,400-$10,560+ in replacement costs alone."</p>
                    <cite>7shifts Restaurant Workforce Report, 2025</cite>
                  </div>
                  <div className="quote">
                    <p>"Losing a single employee can cost hospitality businesses more than $5,000 in recruiting, hiring, training and lost productivity."</p>
                    <cite>OysterLink Industry Report, 2025</cite>
                  </div>
                  <div className="quote">
                    <p>"Reducing employee turnover by 10% can improve net profit margins by approximately 3%."</p>
                    <cite>Gallup Workplace Report, 2025</cite>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PLATFORM TAB */}
        {activeTab === 'platform' && (
          <div className="tab-content">
            <section className="platform-intro">
              <div className="container">
                <h1>Professional Infrastructure</h1>
                <p>One platform. Three solutions.</p>
              </div>
            </section>

            <section className="features">
              <div className="container">
                {/* ONPRO */}
                <div className="feature">
                  <div className="feature-visual">
                    <div className="feature-demo">
                      <div className="demo-header">
                        <div className="demo-dots"></div>
                        <span>OnPro Dashboard</span>
                      </div>
                      <div className="demo-content">
                        <div className="demo-profile">
                          <div className="demo-avatar"></div>
                          <div className="demo-info">
                            <div className="demo-name"></div>
                            <div className="demo-badge">✓ VERIFIED</div>
                          </div>
                        </div>
                        <div className="demo-stats">
                          <div className="stat-bar t"></div>
                          <div className="stat-bar e"></div>
                          <div className="stat-bar eq"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-info">
                    <div className="feature-tag">ONPRO</div>
                    <h3>Portable Career</h3>
                    <p>Professional profile that follows you. Skills verified through DAPA. Customers follow YOU, not venues.</p>
                    <ul>
                      <li>Verified professional identity</li>
                      <li>6-axis skills assessment</li>
                      <li>Portable customer base</li>
                      <li>Career analytics & genome</li>
                    </ul>
                    <div className="feature-price">
                      <strong>FREE</strong>
                      <span>Premium $10/mo</span>
                    </div>
                  </div>
                </div>

                {/* PATRON */}
                <div className="feature feature-reverse">
                  <div className="feature-visual">
                    <div className="feature-demo">
                      <div className="demo-header">
                        <div className="demo-dots"></div>
                        <span>Patron Experience</span>
                      </div>
                      <div className="demo-content">
                        <div className="demo-genome">
                          <div className="genome-icon">🍷</div>
                          <div className="genome-label">The Connoisseur</div>
                          <div className="genome-desc">Quality over everything</div>
                        </div>
                        <div className="demo-mypeople">
                          <div className="person-card"></div>
                          <div className="person-card"></div>
                          <div className="person-card"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-info">
                    <div className="feature-tag">PATRON</div>
                    <h3>Find Your People</h3>
                    <p>Follow favorite professionals. See who's working tonight. Never lose touch. Discover verified talent.</p>
                    <ul>
                      <li>Follow OnPros in real-time</li>
                      <li>OnScene Genome personality</li>
                      <li>Track regulars & check-ins</li>
                      <li>Smart venue matching</li>
                    </ul>
                    <div className="feature-price">
                      <strong>FREE</strong>
                      <span>Premium $5/mo</span>
                    </div>
                  </div>
                </div>

                {/* VENUE */}
                <div className="feature">
                  <div className="feature-visual">
                    <div className="feature-demo">
                      <div className="demo-header">
                        <div className="demo-dots"></div>
                        <span>Venue Analytics</span>
                      </div>
                      <div className="demo-content">
                        <div className="demo-chart"></div>
                        <div className="demo-metrics">
                          <div className="metric">
                            <div className="metric-value"></div>
                            <div className="metric-label">Check-Ins</div>
                          </div>
                          <div className="metric">
                            <div className="metric-value"></div>
                            <div className="metric-label">Regulars</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-info">
                    <div className="feature-tag">VENUE</div>
                    <h3>Retain Talent</h3>
                    <p>Recruit verified professionals. Showcase your team. Reduce turnover costs. Track staff impact.</p>
                    <ul>
                      <li>Recruit DAPA-verified talent</li>
                      <li>Team showcase & analytics</li>
                      <li>Check-ins & regulars tracking</li>
                      <li>Customer traffic insights</li>
                    </ul>
                    <div className="feature-price">
                      <strong>3-Month Trial</strong>
                      <span>From $50/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DAPA */}
            <section className="dapa">
              <div className="container">
                <h2>Skills Verified</h2>
                <p className="dapa-subtitle">Six professional dimensions. 1,600+ questions. Industry verified.</p>
                <div className="dapa-grid">
                  <div className="dapa-item">
                    <div className="dapa-icon">T</div>
                    <h4>Technical</h4>
                  </div>
                  <div className="dapa-item">
                    <div className="dapa-icon">E</div>
                    <h4>Ethical</h4>
                  </div>
                  <div className="dapa-item">
                    <div className="dapa-icon">EQ</div>
                    <h4>Emotional</h4>
                  </div>
                  <div className="dapa-item">
                    <div className="dapa-icon">V</div>
                    <h4>Velocity</h4>
                  </div>
                  <div className="dapa-item">
                    <div className="dapa-icon">$</div>
                    <h4>Commercial</h4>
                  </div>
                  <div className="dapa-item">
                    <div className="dapa-icon">L</div>
                    <h4>Leadership</h4>
                  </div>
                </div>
              </div>
            </section>

            {/* GENOME */}
            <section className="genome">
              <div className="container">
                <h2>OnScene Genome</h2>
                <p className="genome-subtitle">45 questions. 12 archetypes. Discover your hospitality personality.</p>
                <div className="genome-grid">
                  {Object.entries(archetypes).map(([key, arch]) => (
                    <button
                      key={key}
                      className={`genome-item ${selectedArchetype === key ? 'active' : ''}`}
                      onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}
                    >
                      <span className="genome-emoji">{arch.emoji}</span>
                      <span className="genome-name">{arch.name}</span>
                    </button>
                  ))}
                </div>
                {selectedArchetype && (
                  <div className="genome-detail">
                    <div className="genome-detail-header">
                      <span>{archetypes[selectedArchetype].emoji}</span>
                      <h3>{archetypes[selectedArchetype].name}</h3>
                    </div>
                    <p>{archetypes[selectedArchetype].desc}</p>
                    <button onClick={() => setSelectedArchetype(null)} className="btn-close">Close</button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* FOUNDER TAB */}
        {activeTab === 'founder' && (
          <div className="tab-content">
            <section className="vision">
              <div className="container">
                <h1>The Vision</h1>
                <p className="vision-lead">27 years in hospitality. A career change to tech. One mission.</p>

                <div className="vision-content">
                  <div className="vision-section">
                    <h3>The Problem I Lived</h3>
                    <p>I spent 27 years in the hospitality industry—behind bars, managing venues, building teams, creating experiences that people remember. I watched incredibly talented bartenders, servers, and sommeliers pour their hearts into their craft, only to see their careers reset to zero every time they changed venues.</p>
                    <p>Your favorite bartender who knew your drink before you sat down? Gone. The server who remembered your anniversary? Moved on. The sommelier who introduced you to that perfect pairing? Working somewhere else now.</p>
                    <p><strong>And you had no way to follow them.</strong></p>
                  </div>

                  <div className="vision-section">
                    <h3>The Career That Made It Possible</h3>
                    <p>After 27 years in hospitality, I transitioned into cybersecurity, IT, and tech. I learned to build systems, write code, and solve complex problems at scale. I earned my certifications, worked in the field, and gained the technical skills that the hospitality industry desperately needs but rarely gets.</p>
                    <p>That combination—deep hospitality experience and technical expertise—is rare. And it is exactly what was needed to build OnTonight.</p>
                  </div>

                  <div className="vision-section">
                    <h3>Why This Matters</h3>
                    <p>Hospitality professionals deserve the same career portability as lawyers, engineers, and executives. They deserve to own their customer relationships. They deserve to build equity in their careers instead of starting over every time they change employers.</p>
                    <p className="vision-highlight">OnTonight is not just fixing a problem. We are professionalizing an entire industry.</p>
                  </div>

                  <div className="vision-section">
                    <h3>What We're Building</h3>
                    <p>This is not a discount app. This is not a social network. This is professional infrastructure.</p>
                    <ul className="vision-list">
                      <li>Verified skills through proprietary assessment technology</li>
                      <li>Portable professional identities that follow you from venue to venue</li>
                      <li>Customer relationships that belong to YOU, not your employer</li>
                      <li>Analytics that prove your value to venues</li>
                      <li>A future where talent is recognized, relationships are portable, and regulars are made—not lost</li>
                    </ul>
                  </div>

                  <div className="vision-cta">
                    <h3>Join the Movement</h3>
                    <p>OnTonight launches in Tampa in 2025. If you believe hospitality professionals deserve better, join us.</p>
                    <a href="#waitlist" className="btn-primary">Join Waitlist</a>
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
                <p className="waitlist-subtitle">First 2,000 signups receive their first year free.</p>
                
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
                      <option value="">Account Type</option>
                      <option value="onpro">OnPro (Hospitality Professional)</option>
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
                    By submitting, you confirm you are 18+ and agree to receive email communications from OnTonight.
                  </div>
                  
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Get Early Access'}
                  </button>
                </form>
              </>
            ) : (
              <div className="waitlist-success">
                <h2>Welcome</h2>
                <p>You are among the first 2,000. Check your email.</p>
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
                <p>Where Regulars Are Made</p>
              </div>
              <div className="footer-links">
                <div className="footer-col">
                  <h5>Product</h5>
                  <a href="#waitlist">For OnPros</a>
                  <a href="#waitlist">For Patrons</a>
                  <a href="#waitlist">For Venues</a>
                </div>
                <div className="footer-col">
                  <h5>Company</h5>
                  <a href="https://app.on-tonight.com/privacy">Privacy</a>
                  <a href="https://app.on-tonight.com/terms">Terms</a>
                  <a href="mailto:AdminJoy@On-Tonight.com">Contact</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 OnTonight LLC</p>
              <p>18+ only</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .page { 
          background: #0a0f14;
          color: #f8fafc;
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: -0.015em;
          font-weight: 400;
        }
        
        .container { 
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        h1 { 
          font-size: 56px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
        }
        
        h2 { 
          font-size: 36px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        
        h3 {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.015em;
          margin-bottom: 16px;
        }
        
        h4 {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        
        p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(248,250,252,0.7);
        }
        
        section {
          padding: 80px 24px;
        }
        
        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          background: rgba(10,15,20,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,163,115,0.1);
          z-index: 1000;
        }
        
        .nav-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-logo {
          font-size: 20px;
          font-weight: 600;
          color: #d4a373;
          letter-spacing: -0.02em;
        }
        
        .nav-tabs {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        
        .nav-tab {
          background: transparent;
          border: none;
          color: rgba(248,250,252,0.5);
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
          font-family: inherit;
        }
        
        .nav-tab:hover {
          color: rgba(248,250,252,0.9);
        }
        
        .nav-tab.active {
          color: #d4a373;
        }
        
        .nav-cta {
          background: #d4a373;
          color: #0a0f14;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
          margin-left: 12px;
          border-radius: 2px;
        }
        
        .nav-cta:hover {
          opacity: 0.9;
        }
        
        /* HERO */
        .hero {
          min-height: 85vh;
          display: flex;
          align-items: center;
          position: relative;
          text-align: center;
          padding: 120px 24px 80px;
        }
        
        .hero-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212,163,115,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .hero-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.2);
          padding: 8px 16px;
          margin-bottom: 48px;
          border-radius: 2px;
        }
        
        .hero h1 {
          font-size: 72px;
          margin-bottom: 16px;
          color: #f8fafc;
        }
        
        .hero-subtitle {
          font-size: 20px;
          color: #d4a373;
          margin-bottom: 60px;
          font-weight: 500;
        }
        
        .hero-stats {
          display: flex;
          gap: 60px;
          justify-content: center;
          margin-bottom: 48px;
          font-size: 13px;
          color: rgba(248,250,252,0.5);
        }
        
        .hero-stats span {
          color: #d4a373;
          font-weight: 600;
          font-size: 22px;
          display: block;
          margin-bottom: 4px;
        }
        
        .hero-ctas {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        
        .btn-primary {
          background: #d4a373;
          color: #0a0f14;
          border: none;
          padding: 16px 36px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          letter-spacing: -0.01em;
          border-radius: 2px;
        }
        
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        .btn-primary:active {
          transform: translateY(0px);
        }
        
        .btn-secondary {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.4);
          padding: 16px 36px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          letter-spacing: -0.01em;
          border-radius: 2px;
        }
        
        .btn-secondary:hover {
          border-color: #d4a373;
          background: rgba(212,163,115,0.05);
        }
        
        .btn-secondary:active {
          transform: translateY(0px);
        }
        
        .btn-install {
          margin-top: 24px;
          background: transparent;
          color: rgba(248,250,252,0.4);
          border: 1px solid rgba(248,250,252,0.1);
          padding: 10px 24px;
          font-size: 12px;
          cursor: pointer;
          font-family: inherit;
          border-radius: 2px;
        }
        
        /* VALUE */
        .value {
          background: #0d1117;
          border-top: 1px solid rgba(212,163,115,0.08);
          border-bottom: 1px solid rgba(212,163,115,0.08);
        }
        
        .value h2 {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        
        .value-item {
          text-align: center;
          padding: 32px;
          background: rgba(212,163,115,0.02);
          border: 1px solid rgba(212,163,115,0.08);
          border-radius: 2px;
        }
        
        .value-number {
          font-size: 40px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        
        .value-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(248,250,252,0.4);
          margin-bottom: 16px;
        }
        
        .value-item p {
          font-size: 14px;
          color: rgba(248,250,252,0.6);
        }
        
        /* QUOTES */
        .quotes {
          background: #0a0f14;
        }
        
        .quotes h2 {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .quote {
          border-left: 2px solid rgba(212,163,115,0.3);
          padding: 28px;
          background: rgba(212,163,115,0.02);
          border-radius: 2px;
        }
        
        .quote p {
          font-size: 14px;
          line-height: 1.65;
          font-style: italic;
          color: rgba(248,250,252,0.7);
          margin-bottom: 16px;
        }
        
        cite {
          font-size: 11px;
          color: #d4a373;
          font-style: normal;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        
        /* PLATFORM */
        .platform-intro {
          text-align: center;
          padding: 100px 24px 60px;
        }
        
        .platform-intro h1 {
          margin-bottom: 12px;
        }
        
        .platform-intro p {
          font-size: 18px;
          color: rgba(248,250,252,0.5);
        }
        
        /* FEATURES WITH ANIMATED DEMOS */
        .features {
          padding: 40px 24px 80px;
        }
        
        .feature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 120px;
        }
        
        .feature-reverse {
          direction: rtl;
        }
        
        .feature-reverse > * {
          direction: ltr;
        }
        
        .feature-demo {
          background: rgba(212,163,115,0.02);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .demo-header {
          background: rgba(212,163,115,0.05);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(212,163,115,0.1);
        }
        
        .demo-dots {
          width: 40px;
          height: 8px;
          background: linear-gradient(90deg, rgba(212,163,115,0.3), rgba(212,163,115,0.2), rgba(212,163,115,0.1));
          border-radius: 4px;
        }
        
        .demo-header span {
          font-size: 12px;
          color: rgba(248,250,252,0.5);
          font-weight: 500;
        }
        
        .demo-content {
          padding: 40px;
          min-height: 350px;
        }
        
        .demo-profile {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 32px;
        }
        
        .demo-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #d4a373, #c99763);
          border-radius: 50%;
        }
        
        .demo-info {
          flex: 1;
        }
        
        .demo-name {
          height: 14px;
          width: 120px;
          background: rgba(248,250,252,0.1);
          margin-bottom: 8px;
          border-radius: 2px;
        }
        
        .demo-badge {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
          padding: 4px 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          border: 1px solid rgba(34, 197, 94, 0.3);
          display: inline-block;
          border-radius: 2px;
        }
        
        .demo-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .stat-bar {
          height: 32px;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }
        
        .stat-bar.t {
          background: linear-gradient(90deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.05) 100%);
          border-left: 3px solid #ef4444;
        }
        
        .stat-bar.e {
          background: linear-gradient(90deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.05) 100%);
          border-left: 3px solid #22c55e;
        }
        
        .stat-bar.eq {
          background: linear-gradient(90deg, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 100%);
          border-left: 3px solid #ec4899;
        }
        
        .demo-genome {
          text-align: center;
          padding: 32px;
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 4px;
          margin-bottom: 24px;
        }
        
        .genome-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .genome-label {
          font-size: 18px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 8px;
        }
        
        .genome-desc {
          font-size: 13px;
          color: rgba(248,250,252,0.5);
          font-style: italic;
        }
        
        .demo-mypeople {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .person-card {
          height: 80px;
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 2px;
        }
        
        .demo-chart {
          height: 180px;
          background: linear-gradient(180deg, rgba(212,163,115,0.08) 0%, rgba(212,163,115,0.02) 100%);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 2px;
          margin-bottom: 20px;
        }
        
        .demo-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .metric {
          padding: 20px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.08);
          border-radius: 2px;
        }
        
        .metric-value {
          height: 24px;
          width: 60px;
          background: rgba(212,163,115,0.2);
          margin-bottom: 12px;
          border-radius: 2px;
        }
        
        .metric-label {
          font-size: 11px;
          color: rgba(248,250,252,0.4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .feature-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          margin-bottom: 16px;
        }
        
        .feature-info h3 {
          margin-bottom: 16px;
        }
        
        .feature-info > p {
          margin-bottom: 28px;
        }
        
        .feature-info ul {
          list-style: none;
          margin-bottom: 28px;
        }
        
        .feature-info li {
          font-size: 14px;
          line-height: 2;
          color: rgba(248,250,252,0.65);
          padding-left: 20px;
          position: relative;
        }
        
        .feature-info li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #d4a373;
        }
        
        .feature-price {
          border-top: 1px solid rgba(212,163,115,0.1);
          padding-top: 20px;
        }
        
        .feature-price strong {
          font-size: 18px;
          color: #d4a373;
          display: block;
          margin-bottom: 6px;
        }
        
        .feature-price span {
          font-size: 13px;
          color: rgba(248,250,252,0.4);
        }
        
        /* DAPA */
        .dapa {
          background: #0d1117;
          border-top: 1px solid rgba(212,163,115,0.08);
          text-align: center;
        }
        
        .dapa h2 {
          margin-bottom: 12px;
        }
        
        .dapa-subtitle {
          font-size: 14px;
          color: rgba(248,250,252,0.4);
          margin-bottom: 60px;
        }
        
        .dapa-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .dapa-item {
          padding: 32px 20px;
          border: 1px solid rgba(212,163,115,0.1);
          background: rgba(212,163,115,0.02);
          transition: all 0.3s;
          border-radius: 2px;
        }
        
        .dapa-item:hover {
          border-color: rgba(212,163,115,0.3);
          background: rgba(212,163,115,0.05);
          transform: translateY(-2px);
        }
        
        .dapa-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, rgba(212,163,115,0.2), rgba(212,163,115,0.1));
          border: 1px solid rgba(212,163,115,0.3);
          color: #d4a373;
          font-size: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          border-radius: 2px;
        }
        
        .dapa-item h4 {
          font-size: 12px;
          color: rgba(248,250,252,0.7);
        }
        
        /* GENOME */
        .genome {
          background: #0a0f14;
          text-align: center;
        }
        
        .genome h2 {
          margin-bottom: 12px;
        }
        
        .genome-subtitle {
          font-size: 14px;
          color: rgba(248,250,252,0.4);
          margin-bottom: 60px;
        }
        
        .genome-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 40px;
        }
        
        .genome-item {
          background: rgba(212,163,115,0.02);
          border: 1px solid rgba(212,163,115,0.1);
          padding: 24px 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          border-radius: 2px;
        }
        
        .genome-item:hover, .genome-item.active {
          background: rgba(212,163,115,0.08);
          border-color: rgba(212,163,115,0.3);
          transform: translateY(-2px);
        }
        
        .genome-emoji {
          font-size: 28px;
        }
        
        .genome-name {
          font-size: 11px;
          color: rgba(248,250,252,0.7);
          font-weight: 500;
        }
        
        .genome-detail {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          padding: 48px;
          max-width: 700px;
          margin: 0 auto;
          border-radius: 4px;
        }
        
        .genome-detail-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 24px;
        }
        
        .genome-detail-header span {
          font-size: 40px;
        }
        
        .genome-detail h3 {
          font-size: 26px;
        }
        
        .genome-detail p {
          margin-bottom: 28px;
          text-align: center;
        }
        
        .btn-close {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.3);
          padding: 10px 28px;
          font-size: 13px;
          cursor: pointer;
          font-family: inherit;
          border-radius: 2px;
        }
        
        /* VISION */
        .vision {
          padding: 100px 24px;
        }
        
        .vision h1 {
          text-align: center;
          margin-bottom: 12px;
        }
        
        .vision-lead {
          text-align: center;
          font-size: 18px;
          color: #d4a373;
          margin-bottom: 80px;
        }
        
        .vision-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .vision-section {
          margin-bottom: 60px;
        }
        
        .vision-section h3 {
          color: #d4a373;
          margin-bottom: 20px;
        }
        
        .vision-section p {
          margin-bottom: 16px;
        }
        
        .vision-highlight {
          color: #d4a373;
          font-weight: 500;
          padding: 20px;
          border-left: 2px solid #d4a373;
          background: rgba(212,163,115,0.05);
        }
        
        .vision-list {
          list-style: none;
        }
        
        .vision-list li {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(248,250,252,0.7);
          padding-left: 24px;
          position: relative;
          margin-bottom: 12px;
        }
        
        .vision-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #d4a373;
        }
        
        .vision-cta {
          text-align: center;
          padding: 56px 48px;
          border: 1px solid rgba(212,163,115,0.2);
          background: rgba(212,163,115,0.03);
          margin-top: 60px;
          border-radius: 4px;
        }
        
        .vision-cta h3 {
          margin-bottom: 16px;
        }
        
        .vision-cta p {
          margin-bottom: 28px;
        }
        
        /* WAITLIST */
        .waitlist {
          background: #0d1117;
          border-top: 1px solid rgba(212,163,115,0.08);
          text-align: center;
        }
        
        .waitlist h2 {
          margin-bottom: 12px;
        }
        
        .waitlist-subtitle {
          font-size: 15px;
          color: #d4a373;
          margin-bottom: 48px;
        }
        
        .waitlist-form {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }
        
        input, select {
          width: 100%;
          padding: 16px 18px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          color: #f8fafc;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.2s;
          border-radius: 2px;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #d4a373;
          background: rgba(212,163,115,0.05);
        }
        
        .form-disclaimer {
          font-size: 11px;
          color: rgba(248,250,252,0.4);
          margin: 24px 0;
          line-height: 1.5;
        }
        
        .btn-submit {
          width: 100%;
          background: #d4a373;
          color: #0a0f14;
          border: none;
          padding: 18px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
          border-radius: 2px;
        }
        
        .btn-submit:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        .waitlist-success {
          padding: 80px 48px;
          border: 1px solid rgba(34,220,108,0.2);
          background: rgba(34,220,108,0.05);
          border-radius: 4px;
        }
        
        .waitlist-success h2 {
          color: #22c55e;
        }
        
        /* FOOTER */
        .footer {
          background: #0a0f14;
          border-top: 1px solid rgba(212,163,115,0.08);
          padding: 60px 24px 32px;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        
        .footer-logo {
          font-size: 18px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 8px;
        }
        
        .footer-brand p {
          font-size: 12px;
          color: rgba(248,250,252,0.4);
        }
        
        .footer-links {
          display: flex;
          gap: 60px;
        }
        
        .footer-col h5 {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(248,250,252,0.4);
          margin-bottom: 14px;
          font-weight: 500;
        }
        
        .footer-col a {
          display: block;
          font-size: 13px;
          color: rgba(248,250,252,0.5);
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        
        .footer-col a:hover {
          color: #d4a373;
        }
        
        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(212,163,115,0.08);
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(248,250,252,0.3);
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          h1 { font-size: 40px; }
          .hero h1 { font-size: 52px; }
          .hero-stats { flex-direction: column; gap: 24px; }
          .value-grid, .quotes-grid, .dapa-grid, .genome-grid { grid-template-columns: 1fr; }
          .feature { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; gap: 32px; }
          .footer-links { flex-direction: column; gap: 32px; }
        }
      `}</style>
    </>
  );
}
