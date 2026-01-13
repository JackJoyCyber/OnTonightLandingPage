// pages/index.js - OnTonight Landing Page (Premium Platinum Edition)
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
              <div className="hero-grid"></div>
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
                    <div className="screenshot-frame">
                      <div className="frame-chrome">
                        <div className="chrome-dots"></div>
                        <div className="chrome-url">app.on-tonight.com</div>
                      </div>
                      <div className="frame-content">
                        <div className="mock-profile">
                          <div className="mock-avatar"></div>
                          <div className="mock-text">
                            <div className="mock-line"></div>
                            <div className="mock-line short"></div>
                          </div>
                          <div className="mock-badge">VERIFIED</div>
                        </div>
                        <div className="mock-bars">
                          <div className="mock-bar"></div>
                          <div className="mock-bar"></div>
                          <div className="mock-bar"></div>
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
                      <li>Skills certification</li>
                      <li>Portable customer base</li>
                      <li>Career analytics</li>
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
                    <div className="screenshot-frame">
                      <div className="frame-chrome">
                        <div className="chrome-dots"></div>
                        <div className="chrome-url">app.on-tonight.com/discover</div>
                      </div>
                      <div className="frame-content">
                        <div className="mock-search"></div>
                        <div className="mock-cards">
                          <div className="mock-card"></div>
                          <div className="mock-card"></div>
                          <div className="mock-card"></div>
                          <div className="mock-card"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-info">
                    <div className="feature-tag">PATRON</div>
                    <h3>Find Your People</h3>
                    <p>Follow favorite professionals. See who's working tonight. Never lose touch. Discover verified talent.</p>
                    <ul>
                      <li>Follow OnPros</li>
                      <li>Real-time status</li>
                      <li>OnScene Genome</li>
                      <li>Smart matching</li>
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
                    <div className="screenshot-frame">
                      <div className="frame-chrome">
                        <div className="chrome-dots"></div>
                        <div className="chrome-url">app.on-tonight.com/venue</div>
                      </div>
                      <div className="frame-content">
                        <div className="mock-chart"></div>
                        <div className="mock-metrics">
                          <div className="mock-metric"></div>
                          <div className="mock-metric"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-info">
                    <div className="feature-tag">VENUE</div>
                    <h3>Retain Talent</h3>
                    <p>Recruit verified professionals. Showcase your team. Reduce turnover costs. Track staff impact.</p>
                    <ul>
                      <li>Recruit verified talent</li>
                      <li>Team showcase</li>
                      <li>Traffic analytics</li>
                      <li>Retention tools</li>
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                      <path d="M2 17L12 22L22 17"></path>
                      <path d="M2 12L12 17L22 12"></path>
                    </svg>
                    <h4>Technical</h4>
                  </div>
                  <div className="dapa-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 12L11 14L15 10"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <h4>Ethical</h4>
                  </div>
                  <div className="dapa-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <h4>Emotional</h4>
                  </div>
                  <div className="dapa-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                    <h4>Velocity</h4>
                  </div>
                  <div className="dapa-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <h4>Commercial</h4>
                  </div>
                  <div className="dapa-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
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
          background: #000;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: -0.02em;
          font-weight: 400;
        }
        
        .container { 
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        h1 { 
          font-size: 56px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.03em;
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
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        
        h4 {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        
        p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
        }
        
        section {
          padding: 80px 20px;
        }
        
        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          z-index: 1000;
        }
        
        .nav-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-logo {
          font-size: 18px;
          font-weight: 600;
          color: #d4a373;
          letter-spacing: -0.02em;
        }
        
        .nav-tabs {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        
        .nav-tab {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
          font-family: inherit;
        }
        
        .nav-tab:hover {
          color: rgba(255,255,255,0.9);
        }
        
        .nav-tab.active {
          color: #d4a373;
        }
        
        .nav-cta {
          background: #d4a373;
          color: #000;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
          margin-left: 8px;
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
          padding: 100px 20px 80px;
        }
        
        .hero-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.3;
        }
        
        .hero-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 6px 14px;
          margin-bottom: 40px;
        }
        
        .hero h1 {
          font-size: 72px;
          margin-bottom: 12px;
          color: #fff;
        }
        
        .hero-subtitle {
          font-size: 18px;
          color: #d4a373;
          margin-bottom: 60px;
          font-weight: 500;
        }
        
        .hero-stats {
          display: flex;
          gap: 60px;
          justify-content: center;
          margin-bottom: 50px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }
        
        .hero-stats span {
          color: #d4a373;
          font-weight: 600;
          font-size: 20px;
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
          color: #000;
          border: none;
          padding: 14px 32px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
          font-family: inherit;
        }
        
        .btn-primary:hover {
          opacity: 0.9;
        }
        
        .btn-secondary {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.3);
          padding: 14px 32px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        
        .btn-secondary:hover {
          border-color: #d4a373;
        }
        
        .btn-install {
          margin-top: 20px;
          background: transparent;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 10px 24px;
          font-size: 12px;
          cursor: pointer;
          font-family: inherit;
        }
        
        /* VALUE */
        .value {
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
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
        }
        
        .value-number {
          font-size: 36px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        
        .value-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 16px;
        }
        
        .value-item p {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
        }
        
        /* QUOTES */
        .quotes {
          background: #000;
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
          padding: 24px;
          background: rgba(255,255,255,0.01);
        }
        
        .quote p {
          font-size: 14px;
          line-height: 1.6;
          font-style: italic;
          color: rgba(255,255,255,0.7);
          margin-bottom: 16px;
        }
        
        cite {
          font-size: 11px;
          color: #d4a373;
          font-style: normal;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        /* PLATFORM */
        .platform-intro {
          text-align: center;
          padding: 100px 20px 60px;
        }
        
        .platform-intro h1 {
          margin-bottom: 12px;
        }
        
        .platform-intro p {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
        }
        
        /* FEATURES */
        .features {
          padding: 40px 20px 80px;
        }
        
        .feature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 100px;
        }
        
        .feature-reverse {
          direction: rtl;
        }
        
        .feature-reverse > * {
          direction: ltr;
        }
        
        .feature-visual {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 20px;
        }
        
        .screenshot-frame {
          background: #0a0a0a;
          overflow: hidden;
        }
        
        .frame-chrome {
          background: rgba(255,255,255,0.03);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        
        .chrome-dots {
          width: 40px;
          height: 8px;
          background: rgba(255,255,255,0.1);
        }
        
        .chrome-url {
          flex: 1;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-align: center;
        }
        
        .frame-content {
          padding: 30px;
          min-height: 350px;
        }
        
        .mock-profile {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .mock-avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #d4a373, #c99763);
        }
        
        .mock-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .mock-line {
          height: 10px;
          background: rgba(255,255,255,0.06);
        }
        
        .mock-line.short {
          width: 50%;
        }
        
        .mock-badge {
          background: rgba(61,220,108,0.1);
          color: #3ddc6c;
          padding: 6px 12px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          border: 1px solid rgba(61,220,108,0.2);
        }
        
        .mock-bars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .mock-bar {
          height: 24px;
          background: linear-gradient(90deg, rgba(212,163,115,0.2) 0%, transparent 100%);
          border-left: 2px solid #d4a373;
        }
        
        .mock-search {
          height: 36px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 20px;
        }
        
        .mock-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .mock-card {
          height: 100px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
        }
        
        .mock-chart {
          height: 180px;
          background: linear-gradient(180deg, rgba(212,163,115,0.05) 0%, transparent 100%);
          border: 1px solid rgba(212,163,115,0.1);
          margin-bottom: 20px;
        }
        
        .mock-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .mock-metric {
          height: 60px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
        }
        
        .feature-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
        }
        
        .feature-info h3 {
          margin-bottom: 16px;
        }
        
        .feature-info > p {
          margin-bottom: 24px;
        }
        
        .feature-info ul {
          list-style: none;
          margin-bottom: 24px;
        }
        
        .feature-info li {
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          padding-left: 16px;
          position: relative;
        }
        
        .feature-info li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #d4a373;
        }
        
        .feature-price {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 16px;
        }
        
        .feature-price strong {
          font-size: 16px;
          color: #d4a373;
          display: block;
          margin-bottom: 4px;
        }
        
        .feature-price span {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }
        
        /* DAPA */
        .dapa {
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
        }
        
        .dapa h2 {
          margin-bottom: 12px;
        }
        
        .dapa-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
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
          padding: 24px 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.01);
          transition: all 0.2s;
        }
        
        .dapa-item:hover {
          border-color: rgba(212,163,115,0.3);
          background: rgba(255,255,255,0.02);
        }
        
        .dapa-item svg {
          width: 28px;
          height: 28px;
          color: #d4a373;
          margin-bottom: 12px;
        }
        
        .dapa-item h4 {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }
        
        /* GENOME */
        .genome {
          background: #000;
          text-align: center;
        }
        
        .genome h2 {
          margin-bottom: 12px;
        }
        
        .genome-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 60px;
        }
        
        .genome-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 40px;
        }
        
        .genome-item {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 20px 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .genome-item:hover, .genome-item.active {
          background: rgba(212,163,115,0.05);
          border-color: rgba(212,163,115,0.3);
        }
        
        .genome-emoji {
          font-size: 24px;
        }
        
        .genome-name {
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }
        
        .genome-detail {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          padding: 40px;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .genome-detail-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .genome-detail-header span {
          font-size: 36px;
        }
        
        .genome-detail h3 {
          font-size: 24px;
        }
        
        .genome-detail p {
          margin-bottom: 24px;
          text-align: center;
        }
        
        .btn-close {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.3);
          padding: 8px 24px;
          font-size: 12px;
          cursor: pointer;
          font-family: inherit;
        }
        
        /* VISION */
        .vision {
          padding: 100px 20px;
        }
        
        .vision h1 {
          text-align: center;
          margin-bottom: 12px;
        }
        
        .vision-lead {
          text-align: center;
          font-size: 16px;
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
          padding: 16px;
          border-left: 2px solid #d4a373;
          background: rgba(212,163,115,0.05);
        }
        
        .vision-list {
          list-style: none;
        }
        
        .vision-list li {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.7);
          padding-left: 20px;
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
          padding: 50px 40px;
          border: 1px solid rgba(212,163,115,0.2);
          background: rgba(212,163,115,0.02);
          margin-top: 60px;
        }
        
        .vision-cta h3 {
          margin-bottom: 16px;
        }
        
        .vision-cta p {
          margin-bottom: 24px;
        }
        
        /* WAITLIST */
        .waitlist {
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
        }
        
        .waitlist h2 {
          margin-bottom: 12px;
        }
        
        .waitlist-subtitle {
          font-size: 14px;
          color: #d4a373;
          margin-bottom: 50px;
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
          padding: 14px 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #d4a373;
          background: rgba(255,255,255,0.03);
        }
        
        .form-disclaimer {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin: 20px 0;
          line-height: 1.5;
        }
        
        .btn-submit {
          width: 100%;
          background: #d4a373;
          color: #000;
          border: none;
          padding: 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.2s;
        }
        
        .btn-submit:hover {
          opacity: 0.9;
        }
        
        .waitlist-success {
          padding: 80px 40px;
          border: 1px solid rgba(61,220,108,0.2);
          background: rgba(61,220,108,0.03);
        }
        
        .waitlist-success h2 {
          color: #3ddc6c;
        }
        
        /* FOOTER */
        .footer {
          background: #000;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 60px 20px 30px;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        
        .footer-logo {
          font-size: 16px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 8px;
        }
        
        .footer-brand p {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }
        
        .footer-links {
          display: flex;
          gap: 60px;
        }
        
        .footer-col h5 {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
          font-weight: 500;
        }
        
        .footer-col a {
          display: block;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        
        .footer-col a:hover {
          color: #d4a373;
        }
        
        .footer-bottom {
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          h1 { font-size: 40px; }
          .hero h1 { font-size: 48px; }
          .hero-stats { flex-direction: column; gap: 24px; }
          .value-grid, .quotes-grid, .dapa-grid, .genome-grid { grid-template-columns: 1fr; }
          .feature { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; gap: 30px; }
          .footer-links { flex-direction: column; gap: 30px; }
        }
      `}</style>
    </>
  );
}
