// pages/index.js - OnTonight Landing Page (Production Ready)
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

  // Add to Home Screen functionality
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
        <title>OnTonight - Where Regulars Are Made</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <div className="page">
        {/* NAVIGATION */}
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-logo">OnTonight</div>
            <div className="nav-tabs">
              <button className={activeTab === 'home' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('home')}>Home</button>
              <button className={activeTab === 'platform' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('platform')}>The Platform</button>
              <button className={activeTab === 'founder' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('founder')}>The Vision</button>
              <a href="#waitlist" className="nav-cta">Join Waitlist</a>
            </div>
          </div>
        </nav>

        {/* HOME TAB - BUZZ LANDING */}
        {activeTab === 'home' && (
          <div className="tab-content">
            {/* HERO BUZZ */}
            <section className="hero-buzz">
              <div className="hero-particles"></div>
              <div className="container">
                <div className="buzz-badge">LAUNCHING TAMPA · 2025</div>
                <h1 className="buzz-title">Your Night.<br />Your People.</h1>
                <p className="buzz-tagline">Where Regulars Are Made</p>
                
                <div className="buzz-stats">
                  <div className="buzz-stat">
                    <div className="buzz-stat-num">27 Years</div>
                    <div className="buzz-stat-label">Industry Experience</div>
                  </div>
                  <div className="buzz-stat">
                    <div className="buzz-stat-num">$66.8B</div>
                    <div className="buzz-stat-label">Annual Crisis</div>
                  </div>
                  <div className="buzz-stat">
                    <div className="buzz-stat-num">1 Solution</div>
                    <div className="buzz-stat-label">OnTonight</div>
                  </div>
                </div>

                <div className="buzz-ctas">
                  <button onClick={() => setActiveTab('platform')} className="btn btn-primary btn-glow">
                    Explore the Platform
                  </button>
                  <button onClick={() => setActiveTab('founder')} className="btn btn-outline">
                    Meet the Founder
                  </button>
                </div>

                {showInstallPrompt && (
                  <div className="install-prompt">
                    <button onClick={handleInstall} className="btn btn-install">
                      📱 Add to Home Screen
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* VALUE PROPOSITION */}
            <section className="value-prop">
              <div className="container">
                <h2>What's Your Career Worth?</h2>
                <div className="value-grid">
                  <div className="value-card">
                    <div className="value-icon">💰</div>
                    <h3>Control Your Income</h3>
                    <p>When you change venues, your regulars come with you. Your earning potential is no longer tied to a single location.</p>
                    <div className="value-stat">Average bartender loses $24K in regular tips when changing venues</div>
                  </div>
                  <div className="value-card">
                    <div className="value-icon">📈</div>
                    <h3>Build Real Equity</h3>
                    <p>Your skills, reputation, and customer base become portable assets. Build once, benefit forever.</p>
                    <div className="value-stat">Verified OnPros earn 40% more than industry average</div>
                  </div>
                  <div className="value-card">
                    <div className="value-icon">🎯</div>
                    <h3>Own Your Network</h3>
                    <p>Your customers are YOUR customers. Not the venue's. Take them with you, communicate directly, build lasting relationships.</p>
                    <div className="value-stat">Top OnPros maintain 300+ verified regular relationships</div>
                  </div>
                </div>
              </div>
            </section>

            {/* REAL QUOTES */}
            <section className="industry-quotes">
              <div className="container">
                <h2>The Industry Crisis</h2>
                <p className="section-subtitle">Real quotes from hospitality industry publications</p>
                
                <div className="quotes-grid">
                  <div className="industry-quote">
                    <p>"The cost of turnover in hospitality is huge. Recruitment, retention, staff turnover... these are words that likely haunt the dreams of hospitality operators."</p>
                    <cite>Institute of Hospitality, 2024</cite>
                  </div>
                  
                  <div className="industry-quote">
                    <p>"With 50% FOH turnover, you're replacing 7-10 servers and hosts every year. That's $7,400-$10,560+ in replacement costs alone—not counting the hit to service quality."</p>
                    <cite>7shifts Restaurant Workforce Report, 2025</cite>
                  </div>
                  
                  <div className="industry-quote">
                    <p>"Losing a single employee can cost hospitality businesses more than $5,000 in recruiting, hiring, training and lost productivity. It can take up to two years for a new hire to become fully productive."</p>
                    <cite>OysterLink Industry Report, 2025</cite>
                  </div>
                  
                  <div className="industry-quote">
                    <p>"Staffing challenges topped operators' 2024 list of concerns. Finding and keeping skilled staff is a concern that's risen by 4 percent."</p>
                    <cite>FSR Magazine, 2025</cite>
                  </div>
                  
                  <div className="industry-quote">
                    <p>"Reducing employee turnover by 10% can improve net profit margins by approximately 3%."</p>
                    <cite>Gallup Workplace Report, 2025</cite>
                  </div>
                  
                  <div className="industry-quote">
                    <p>"It's very tough to find the people and then have them stay. After a week, somebody will say, 'This doesn't work for me, I'm going to go somewhere else.' Big turnover."</p>
                    <cite>Restaurant Operator Interview, TouchBistro State of Restaurants 2024</cite>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PLATFORM TAB - DEEP DIVE */}
        {activeTab === 'platform' && (
          <div className="tab-content">
            {/* PLATFORM HERO */}
            <section className="platform-hero">
              <div className="container">
                <h1>One Platform. Three Solutions.</h1>
                <p className="section-subtitle">Professional infrastructure for the entire hospitality ecosystem</p>
              </div>
            </section>

            {/* SCREENSHOTS & FEATURES */}
            <section className="platform-features">
              <div className="container">
                {/* ONPRO FEATURE */}
                <div className="feature-row">
                  <div className="feature-screenshot">
                    <div className="screenshot-mockup onpro-mockup">
                      {/* REPLACE THIS WITH ACTUAL SCREENSHOT */}
                      <div className="mockup-browser">
                        <div className="browser-bar">
                          <div className="browser-dots">
                            <span></span><span></span><span></span>
                          </div>
                          <div className="browser-url">app.on-tonight.com</div>
                        </div>
                        <div className="browser-content">
                          <div className="profile-header">
                            <div className="profile-avatar"></div>
                            <div className="profile-info">
                              <div className="profile-name"></div>
                              <div className="profile-role"></div>
                            </div>
                            <div className="verified-badge">VERIFIED</div>
                          </div>
                          <div className="profile-stats">
                            <div className="stat-bar"></div>
                            <div className="stat-bar"></div>
                            <div className="stat-bar"></div>
                          </div>
                          <div className="profile-badges">
                            <div className="badge"></div>
                            <div className="badge"></div>
                            <div className="badge"></div>
                          </div>
                        </div>
                      </div>
                      <p className="screenshot-note">↑ Replace with real screenshot from app.on-tonight.com</p>
                    </div>
                  </div>
                  <div className="feature-content">
                    <div className="feature-label">FOR ONPROS</div>
                    <h2>Your Career, Portable</h2>
                    <p>Build a professional profile that follows you from venue to venue. Get verified through DAPA assessment, maintain your customer relationships, and control your earning potential.</p>
                    <ul className="feature-list">
                      <li><span className="check">✓</span> Verified professional profile</li>
                      <li><span className="check">✓</span> Skills assessment & certification</li>
                      <li><span className="check">✓</span> Portable customer base</li>
                      <li><span className="check">✓</span> Career analytics & insights</li>
                    </ul>
                    <div className="feature-pricing">
                      <div className="pricing-badge">ALWAYS FREE</div>
                      <p>Premium: $10/month for unlimited assessments & advanced features</p>
                    </div>
                  </div>
                </div>

                {/* PATRON FEATURE */}
                <div className="feature-row feature-row-reverse">
                  <div className="feature-screenshot">
                    <div className="screenshot-mockup patron-mockup">
                      <div className="mockup-browser">
                        <div className="browser-bar">
                          <div className="browser-dots">
                            <span></span><span></span><span></span>
                          </div>
                          <div className="browser-url">app.on-tonight.com/discover</div>
                        </div>
                        <div className="browser-content">
                          <div className="search-bar"></div>
                          <div className="discover-grid">
                            <div className="onpro-card"></div>
                            <div className="onpro-card"></div>
                            <div className="onpro-card"></div>
                            <div className="onpro-card"></div>
                          </div>
                        </div>
                      </div>
                      <p className="screenshot-note">↑ Replace with real screenshot from app.on-tonight.com</p>
                    </div>
                  </div>
                  <div className="feature-content">
                    <div className="feature-label">FOR PATRONS</div>
                    <h2>Find Your People</h2>
                    <p>Never lose touch with your favorite bartenders, servers, and sommeliers. See who's working tonight, discover new verified professionals, and build lasting relationships.</p>
                    <ul className="feature-list">
                      <li><span className="check">✓</span> Follow your favorite OnPros</li>
                      <li><span className="check">✓</span> See "On Tonight" status in real-time</li>
                      <li><span className="check">✓</span> Discover your OnScene Genome</li>
                      <li><span className="check">✓</span> Get matched with compatible OnPros</li>
                    </ul>
                    <div className="feature-pricing">
                      <p><strong>Free Forever</strong> · Premium $5/month for full genome & advanced matching</p>
                    </div>
                  </div>
                </div>

                {/* VENUE FEATURE */}
                <div className="feature-row">
                  <div className="feature-screenshot">
                    <div className="screenshot-mockup venue-mockup">
                      <div className="mockup-browser">
                        <div className="browser-bar">
                          <div className="browser-dots">
                            <span></span><span></span><span></span>
                          </div>
                          <div className="browser-url">app.on-tonight.com/venue/dashboard</div>
                        </div>
                        <div className="browser-content">
                          <div className="dashboard-charts">
                            <div className="chart"></div>
                            <div className="metrics-row">
                              <div className="metric"></div>
                              <div className="metric"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="screenshot-note">↑ Replace with real screenshot from app.on-tonight.com</p>
                    </div>
                  </div>
                  <div className="feature-content">
                    <div className="feature-label">FOR VENUES</div>
                    <h2>Attract & Retain Top Talent</h2>
                    <p>Recruit DAPA-verified professionals, showcase your team to customers, reduce turnover costs, and understand which staff members drive the most traffic.</p>
                    <ul className="feature-list">
                      <li><span className="check">✓</span> Recruit verified talent</li>
                      <li><span className="check">✓</span> Team showcase & profiles</li>
                      <li><span className="check">✓</span> Customer traffic analytics</li>
                      <li><span className="check">✓</span> Retention tools & insights</li>
                    </ul>
                    <div className="feature-pricing">
                      <p><strong>3-Month Free Trial</strong> · From $50/month · Performance-based pricing available</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DAPA SYSTEM - SOPHISTICATED */}
            <section className="dapa-system">
              <div className="container">
                <h2>Skills Verified. Not Self-Reported.</h2>
                <p className="section-subtitle">The DAPA assessment measures real hospitality expertise across six professional dimensions</p>
                
                <div className="dapa-grid">
                  <div className="dapa-dimension">
                    <div className="dapa-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                        <path d="M2 17L12 22L22 17"></path>
                        <path d="M2 12L12 17L22 12"></path>
                      </svg>
                    </div>
                    <h3>Technical</h3>
                    <p>Knowledge, procedures, and craft mastery</p>
                  </div>
                  
                  <div className="dapa-dimension">
                    <div className="dapa-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12L11 14L15 10"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                    </div>
                    <h3>Ethical</h3>
                    <p>Integrity, compliance, and moral judgment</p>
                  </div>
                  
                  <div className="dapa-dimension">
                    <div className="dapa-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>
                    <h3>Emotional Intelligence</h3>
                    <p>Empathy, relationships, and guest connection</p>
                  </div>
                  
                  <div className="dapa-dimension">
                    <div className="dapa-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                      </svg>
                    </div>
                    <h3>Velocity</h3>
                    <p>Speed, efficiency, and crisis management</p>
                  </div>
                  
                  <div className="dapa-dimension">
                    <div className="dapa-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <h3>Commercial</h3>
                    <p>Sales ability and revenue awareness</p>
                  </div>
                  
                  <div className="dapa-dimension">
                    <div className="dapa-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h3>Leadership</h3>
                    <p>Team dynamics, mentoring, and initiative</p>
                  </div>
                </div>

                <div className="dapa-stats">
                  <span>1,600+ Questions</span>
                  <span>·</span>
                  <span>9 Categories</span>
                  <span>·</span>
                  <span>Industry Verified</span>
                  <span>·</span>
                  <span>Adaptive Testing</span>
                </div>
              </div>
            </section>

            {/* ONSCENE GENOME - CLICKABLE */}
            <section className="genome-system">
              <div className="container">
                <h2>Discover Your Hospitality Personality</h2>
                <p className="section-subtitle">45 questions reveal your OnScene Genome™ from 12 unique archetypes</p>
                
                <div className="archetypes-grid">
                  {Object.entries(archetypes).map(([key, archetype]) => (
                    <button
                      key={key}
                      className={`archetype-card ${selectedArchetype === key ? 'active' : ''}`}
                      onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}
                    >
                      <span className="archetype-emoji">{archetype.emoji}</span>
                      <span className="archetype-name">{archetype.name}</span>
                    </button>
                  ))}
                </div>

                {selectedArchetype && (
                  <div className="archetype-detail">
                    <div className="archetype-detail-header">
                      <span className="archetype-detail-emoji">{archetypes[selectedArchetype].emoji}</span>
                      <h3>{archetypes[selectedArchetype].name}</h3>
                    </div>
                    <p>{archetypes[selectedArchetype].desc}</p>
                    <button onClick={() => setSelectedArchetype(null)} className="btn btn-sm">Close</button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* FOUNDER TAB - YOUR STORY */}
        {activeTab === 'founder' && (
          <div className="tab-content">
            <section className="founder-story">
              <div className="container">
                <div className="founder-intro">
                  <h1>The Vision Behind OnTonight</h1>
                  <p className="founder-subtitle">27 years in hospitality. A career change to tech. One mission.</p>
                </div>

                <div className="founder-content">
                  <div className="founder-section">
                    <h2>The Problem I Lived</h2>
                    <p>I spent 27 years in the hospitality industry—behind bars, managing venues, building teams, creating experiences that people remember. I watched incredibly talented bartenders, servers, and sommeliers pour their hearts into their craft, only to see their careers reset to zero every time they changed venues.</p>
                    <p>Your favorite bartender who knew your drink before you sat down? Gone. The server who remembered your anniversary? Moved on. The sommelier who introduced you to that perfect pairing? Working somewhere else now.</p>
                    <p><strong>And you had no way to follow them.</strong></p>
                  </div>

                  <div className="founder-section">
                    <h2>The Career That Made It Possible</h2>
                    <p>After 27 years in hospitality, I transitioned into cybersecurity, IT, and tech. I learned to build systems, write code, and solve complex problems at scale. I earned my certifications, worked in the field, and gained the technical skills that the hospitality industry desperately needs but rarely gets.</p>
                    <p>That combination—deep hospitality experience and technical expertise—is rare. And it's exactly what was needed to build OnTonight.</p>
                  </div>

                  <div className="founder-section">
                    <h2>Why This Matters</h2>
                    <p>Hospitality professionals deserve the same career portability as lawyers, engineers, and executives. They deserve to own their customer relationships. They deserve to build equity in their careers instead of starting over every time they change employers.</p>
                    <p>Customers deserve to follow the people who make their nights special. Venues deserve to compete on culture and opportunity, not just wages.</p>
                    <p className="founder-mission"><strong>OnTonight isn't just fixing a problem. We're professionalizing an entire industry.</strong></p>
                  </div>

                  <div className="founder-section">
                    <h2>What We're Building</h2>
                    <p>This isn't a discount app. This isn't a social network. This is professional infrastructure.</p>
                    <ul className="founder-list">
                      <li>Verified skills through proprietary assessment technology</li>
                      <li>Portable professional identities that follow you from venue to venue</li>
                      <li>Customer relationships that belong to YOU, not your employer</li>
                      <li>Analytics that prove your value to venues</li>
                      <li>A future where talent is recognized, relationships are portable, and regulars are made—not lost</li>
                    </ul>
                  </div>

                  <div className="founder-cta-section">
                    <h2>Join the Movement</h2>
                    <p>OnTonight launches in Tampa in 2025. We're building the future of hospitality careers, one verified professional at a time.</p>
                    <p><strong>If you believe hospitality professionals deserve better, join us.</strong></p>
                    <a href="#waitlist" className="btn btn-primary btn-large">Join the Waitlist</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* WAITLIST SECTION - ALWAYS VISIBLE */}
        <section className="waitlist-section" id="waitlist">
          <div className="container">
            {!submitted ? (
              <>
                <h2>Join the Waitlist</h2>
                <p>Be among the first to access OnTonight when we launch in Tampa.</p>
                <p className="waitlist-promo">🎉 First 2,000 signups get their FIRST YEAR FREE</p>
                
                <form onSubmit={handleSubmit} className="waitlist-form">
                  <div className="form-grid">
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
                    <select 
                      required 
                      value={formData.userType}
                      onChange={e => setFormData({...formData, userType: e.target.value})}>
                      <option value="">I am a...</option>
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
                    By signing up, you confirm that you are at least 18 years of age and agree to receive email communications from OnTonight.
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-large btn-submit" disabled={loading}>
                    {loading ? 'Joining...' : 'Get Early Access'}
                  </button>
                </form>
              </>
            ) : (
              <div className="waitlist-success">
                <h2>🎉 Welcome to the Movement!</h2>
                <p>Check your email for next steps.</p>
                <p className="success-note">You're among the first 2,000—your first year is FREE when we launch!</p>
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <h4>OnTonight</h4>
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
                  <a href="https://app.on-tonight.com/privacy">Privacy Policy</a>
                  <a href="https://app.on-tonight.com/terms">Terms & Conditions</a>
                  <a href="mailto:AdminJoy@On-Tonight.com">Contact</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 OnTonight LLC. All rights reserved.</p>
              <p className="footer-disclaimer">You must be 18 or older to use OnTonight.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .page { 
          background: #0a0f14; 
          color: #f8fafc; 
          font-family: 'Urbanist', -apple-system, sans-serif;
          letter-spacing: -0.01em;
        }
        
        .container { 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 24px; 
        }
        
        /* NAVIGATION */
        .nav {
          position: sticky;
          top: 0;
          background: rgba(10,15,20,0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          z-index: 1000;
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.6);
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 6px;
          font-family: inherit;
        }
        
        .nav-tab:hover {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }
        
        .nav-tab.active {
          color: #d4a373;
          background: rgba(212,163,115,0.1);
        }
        
        .nav-cta {
          background: linear-gradient(135deg, #d4a373, #c99763);
          color: #0a0f14;
          padding: 10px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(212,163,115,0.4);
        }
        
        /* HOME TAB - BUZZ LANDING */
        .hero-buzz {
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
          text-align: center;
        }
        
        .hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(212,163,115,0.1) 0%, transparent 60%);
          pointer-events: none;
        }
        
        .buzz-badge {
          display: inline-block;
          background: rgba(212,163,115,0.15);
          border: 1px solid rgba(212,163,115,0.3);
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #d4a373;
          margin-bottom: 32px;
        }
        
        .buzz-title {
          font-size: 96px;
          font-weight: 700;
          line-height: 0.95;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #fff 0%, #d4a373 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.04em;
        }
        
        .buzz-tagline {
          font-size: 32px;
          color: #d4a373;
          font-weight: 600;
          margin-bottom: 64px;
          letter-spacing: -0.02em;
        }
        
        .buzz-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          max-width: 900px;
          margin: 0 auto 64px;
        }
        
        .buzz-stat-num {
          font-size: 48px;
          font-weight: 700;
          color: #d4a373;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        
        .buzz-stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .buzz-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 32px;
        }
        
        .install-prompt {
          margin-top: 24px;
        }
        
        /* VALUE PROPOSITION */
        .value-prop {
          padding: 120px 24px;
          background: #0d1420;
        }
        
        .value-prop h2 {
          text-align: center;
          font-size: 56px;
          margin-bottom: 64px;
        }
        
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        
        .value-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 48px 32px;
          text-align: center;
        }
        
        .value-icon {
          font-size: 56px;
          margin-bottom: 24px;
        }
        
        .value-card h3 {
          font-size: 24px;
          margin-bottom: 16px;
          color: #d4a373;
        }
        
        .value-card p {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
          margin-bottom: 24px;
        }
        
        .value-stat {
          font-size: 13px;
          color: rgba(212,163,115,0.8);
          padding: 12px;
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 4px;
        }
        
        /* INDUSTRY QUOTES */
        .industry-quotes {
          padding: 120px 24px;
          background: #0a0f14;
        }
        
        .industry-quotes h2 {
          text-align: center;
          font-size: 56px;
          margin-bottom: 16px;
        }
        
        .section-subtitle {
          text-align: center;
          color: rgba(255,255,255,0.6);
          font-size: 16px;
          margin-bottom: 64px;
        }
        
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        
        .industry-quote {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 3px solid #d4a373;
          padding: 32px;
        }
        
        .industry-quote p {
          font-size: 15px;
          line-height: 1.7;
          font-style: italic;
          color: rgba(255,255,255,0.85);
          margin-bottom: 16px;
        }
        
        cite {
          font-size: 12px;
          color: #d4a373;
          font-style: normal;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        /* PLATFORM FEATURES */
        .platform-hero {
          padding: 120px 24px 60px;
          text-align: center;
        }
        
        .platform-hero h1 {
          font-size: 64px;
          margin-bottom: 16px;
        }
        
        .platform-features {
          padding: 60px 24px 120px;
        }
        
        .feature-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 120px;
        }
        
        .feature-row-reverse {
          direction: rtl;
        }
        
        .feature-row-reverse > * {
          direction: ltr;
        }
        
        .feature-screenshot {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 24px;
          border-radius: 8px;
        }
        
        .screenshot-mockup {
          width: 100%;
        }
        
        .mockup-browser {
          background: #1a1f2e;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        
        .browser-bar {
          background: #0d1117;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .browser-dots {
          display: flex;
          gap: 6px;
        }
        
        .browser-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }
        
        .browser-dots span:nth-child(1) { background: #ff5f56; }
        .browser-dots span:nth-child(2) { background: #ffbd2e; }
        .browser-dots span:nth-child(3) { background: #27c93f; }
        
        .browser-url {
          flex: 1;
          background: rgba(255,255,255,0.05);
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          text-align: center;
        }
        
        .browser-content {
          padding: 32px;
          min-height: 400px;
          background: #0a0f14;
        }
        
        /* OnPro Mockup */
        .profile-header {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 32px;
        }
        
        .profile-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #d4a373, #c99763);
          border-radius: 50%;
        }
        
        .profile-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .profile-name {
          height: 20px;
          width: 60%;
          background: rgba(255,255,255,0.15);
          border-radius: 4px;
        }
        
        .profile-role {
          height: 16px;
          width: 40%;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        
        .verified-badge {
          background: rgba(61,220,108,0.2);
          color: #3ddc6c;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          border: 1px solid rgba(61,220,108,0.3);
        }
        
        .profile-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        
        .stat-bar {
          height: 32px;
          background: linear-gradient(90deg, rgba(212,163,115,0.3) 0%, rgba(212,163,115,0.05) 100%);
          border-left: 3px solid #d4a373;
          border-radius: 4px;
        }
        
        .profile-badges {
          display: flex;
          gap: 12px;
        }
        
        .badge {
          width: 60px;
          height: 60px;
          background: rgba(212,163,115,0.1);
          border: 2px solid rgba(212,163,115,0.3);
          border-radius: 8px;
        }
        
        /* Patron Mockup */
        .search-bar {
          height: 48px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          margin-bottom: 24px;
        }
        
        .discover-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .onpro-card {
          height: 120px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
        }
        
        /* Venue Mockup */
        .dashboard-charts {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .chart {
          height: 200px;
          background: linear-gradient(180deg, rgba(212,163,115,0.1) 0%, transparent 100%);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 8px;
          position: relative;
        }
        
        .chart::after {
          content: '';
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          height: 60%;
          background: linear-gradient(90deg, 
            transparent 0%, transparent 10%,
            rgba(212,163,115,0.3) 20%, transparent 30%,
            transparent 40%, rgba(212,163,115,0.5) 50%,
            transparent 60%, transparent 70%,
            rgba(212,163,115,0.4) 80%, transparent 90%
          );
        }
        
        .metrics-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .metric {
          height: 80px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
        }
        
        .screenshot-note {
          text-align: center;
          font-size: 12px;
          color: #d4a373;
          margin-top: 16px;
          font-style: italic;
        }
        
        .feature-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
          font-weight: 700;
        }
        
        .feature-content h2 {
          font-size: 40px;
          text-align: left;
          margin-bottom: 24px;
        }
        
        .feature-content > p {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
          margin-bottom: 32px;
        }
        
        .feature-list {
          list-style: none;
          margin-bottom: 32px;
        }
        
        .feature-list li {
          font-size: 16px;
          line-height: 2;
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .check {
          color: #3ddc6c;
          font-weight: 700;
        }
        
        .feature-pricing {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          padding: 20px;
          border-radius: 4px;
        }
        
        .pricing-badge {
          display: inline-block;
          background: #3ddc6c;
          color: #0a0f14;
          padding: 4px 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          border-radius: 3px;
        }
        
        .feature-pricing p {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin: 0;
        }
        
        /* DAPA SYSTEM */
        .dapa-system {
          padding: 120px 24px;
          background: #0d1420;
        }
        
        .dapa-system h2 {
          text-align: center;
          font-size: 56px;
          margin-bottom: 16px;
        }
        
        .dapa-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }
        
        .dapa-dimension {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 40px 32px;
          text-align: center;
          transition: all 0.3s;
        }
        
        .dapa-dimension:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(212,163,115,0.3);
          transform: translateY(-4px);
        }
        
        .dapa-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 24px;
          color: #d4a373;
        }
        
        .dapa-icon svg {
          width: 100%;
          height: 100%;
        }
        
        .dapa-dimension h3 {
          font-size: 20px;
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        .dapa-dimension p {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }
        
        .dapa-stats {
          text-align: center;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        
        /* GENOME SYSTEM */
        .genome-system {
          padding: 120px 24px;
          background: #0a0f14;
        }
        
        .genome-system h2 {
          text-align: center;
          font-size: 56px;
          margin-bottom: 16px;
        }
        
        .archetypes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        
        .archetype-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 24px 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .archetype-card:hover, .archetype-card.active {
          background: rgba(212,163,115,0.1);
          border-color: rgba(212,163,115,0.4);
          transform: scale(1.05);
        }
        
        .archetype-emoji {
          font-size: 32px;
        }
        
        .archetype-name {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
        }
        
        .archetype-detail {
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.3);
          padding: 48px;
          border-radius: 8px;
          text-align: center;
        }
        
        .archetype-detail-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .archetype-detail-emoji {
          font-size: 48px;
        }
        
        .archetype-detail h3 {
          font-size: 32px;
        }
        
        .archetype-detail p {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          margin-bottom: 32px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        /* FOUNDER STORY */
        .founder-story {
          padding: 120px 24px;
        }
        
        .founder-intro {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .founder-intro h1 {
          font-size: 64px;
          margin-bottom: 24px;
        }
        
        .founder-subtitle {
          font-size: 24px;
          color: #d4a373;
        }
        
        .founder-content {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .founder-section {
          margin-bottom: 64px;
        }
        
        .founder-section h2 {
          font-size: 36px;
          margin-bottom: 24px;
          text-align: left;
          color: #d4a373;
        }
        
        .founder-section p {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.8);
          margin-bottom: 24px;
        }
        
        .founder-mission {
          font-size: 22px;
          color: #d4a373;
          padding: 24px;
          background: rgba(212,163,115,0.05);
          border-left: 3px solid #d4a373;
        }
        
        .founder-list {
          list-style: none;
          padding-left: 0;
        }
        
        .founder-list li {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.8);
          padding-left: 32px;
          position: relative;
          margin-bottom: 16px;
        }
        
        .founder-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #d4a373;
          font-weight: 700;
        }
        
        .founder-cta-section {
          text-align: center;
          padding: 64px 48px;
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 8px;
          margin-top: 80px;
        }
        
        .founder-cta-section h2 {
          font-size: 48px;
          margin-bottom: 24px;
          text-align: center;
        }
        
        .founder-cta-section p {
          font-size: 20px;
          margin-bottom: 24px;
        }
        
        /* WAITLIST */
        .waitlist-section {
          padding: 120px 24px;
          background: #0d1420;
          text-align: center;
        }
        
        .waitlist-section h2 {
          font-size: 56px;
          margin-bottom: 16px;
        }
        
        .waitlist-section > p {
          font-size: 18px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 16px;
        }
        
        .waitlist-promo {
          color: #d4a373;
          font-weight: 600;
          font-size: 20px;
          margin-bottom: 48px;
        }
        
        .waitlist-form {
          max-width: 700px;
          margin: 0 auto;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        
        input, select {
          width: 100%;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-family: inherit;
          font-size: 15px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #d4a373;
          background: rgba(255,255,255,0.05);
        }
        
        .form-disclaimer {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 32px;
          line-height: 1.6;
        }
        
        .waitlist-success {
          max-width: 600px;
          margin: 0 auto;
          padding: 80px 40px;
          background: linear-gradient(135deg, rgba(61,220,108,0.1), rgba(212,163,115,0.05));
          border: 1px solid rgba(61,220,108,0.2);
          border-radius: 8px;
        }
        
        .waitlist-success h2 {
          color: #3ddc6c;
          margin-bottom: 16px;
        }
        
        .success-note {
          color: #d4a373;
          font-weight: 600;
        }
        
        /* BUTTONS */
        .btn {
          display: inline-block;
          padding: 14px 32px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 15px;
          border-radius: 6px;
          font-family: inherit;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #d4a373, #c99763);
          color: #0a0f14;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212,163,115,0.4);
        }
        
        .btn-outline {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.3);
        }
        
        .btn-outline:hover {
          background: rgba(212,163,115,0.1);
          border-color: #d4a373;
        }
        
        .btn-large {
          padding: 18px 48px;
          font-size: 16px;
        }
        
        .btn-glow {
          box-shadow: 0 0 30px rgba(212,163,115,0.3);
        }
        
        .btn-install {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 14px;
        }
        
        .btn-sm {
          padding: 10px 24px;
          font-size: 14px;
        }
        
        .btn-submit {
          width: 100%;
        }
        
        /* FOOTER */
        .footer {
          background: #0a0f14;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 64px 24px 32px;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 48px;
        }
        
        .footer-brand h4 {
          font-size: 20px;
          color: #d4a373;
          margin-bottom: 8px;
        }
        
        .footer-brand p {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
        }
        
        .footer-links {
          display: flex;
          gap: 64px;
        }
        
        .footer-col h5 {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
        }
        
        .footer-col a {
          display: block;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          margin-bottom: 12px;
          font-size: 14px;
          transition: color 0.2s;
        }
        
        .footer-col a:hover {
          color: #d4a373;
        }
        
        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
        }
        
        .footer-bottom p {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
        }
        
        .footer-disclaimer {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          .buzz-title { font-size: 48px; }
          .buzz-stats { grid-template-columns: 1fr; gap: 32px; }
          .value-grid, .quotes-grid, .dapa-grid, .archetypes-grid { grid-template-columns: 1fr; }
          .feature-row { grid-template-columns: 1fr; }
          .form-grid { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; gap: 32px; }
          .footer-links { flex-direction: column; gap: 32px; }
          .nav-tabs { flex-wrap: wrap; }
        }
      `}</style>
    </>
  );
}
