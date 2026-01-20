// pages/index.js - OnTonight Landing Page PLATINUM EDITION
// ENHANCED with emotional hook flow - ALL original content preserved
// Structure: Hook → Capture → Identity → Accordion Deep Content

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  // Original state
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', userType: '', city: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [platformTab, setPlatformTab] = useState('onpro');

  // NEW: PLATINUM state
  const [email, setEmail] = useState('');
  const [showFullForm, setShowFullForm] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [expandedIdentity, setExpandedIdentity] = useState(null);
  
  // Refs
  const formRef = useRef(null);
  const deepContentRef = useRef(null);
  const emotionalRef = useRef(null);

  // Sticky nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // PWA install prompt
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToDeepContent = () => {
    deepContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEmotional = () => {
    emotionalRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Step 1: Email only
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setFormData({ ...formData, email });
      setShowFullForm(true);
    }
  };

  // Step 2: Full form (original logic)
  const handleFullSubmit = async (e) => {
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

  // ALL 24 ARCHETYPES (preserved exactly)
  const archetypes = {
    // PATRON ARCHETYPES
    connector: { emoji: '🌐', name: 'The Connector', desc: 'You thrive on building relationships and creating networks. Every interaction is an opportunity to connect people, ideas, and experiences.', type: 'patron' },
    regular: { emoji: '🏠', name: 'The Regular', desc: 'Loyalty and consistency define you. You value deep, lasting relationships with your favorite places and people.', type: 'patron' },
    adventurer: { emoji: '🗺️', name: 'The Adventurer', desc: 'Always seeking the next great experience. You explore new venues, try new drinks, and chase novelty.', type: 'patron' },
    host: { emoji: '🎉', name: 'The Host', desc: 'You bring people together. Every outing is an event, and you are the one making it happen.', type: 'patron' },
    connoisseur: { emoji: '🍷', name: 'The Connoisseur', desc: 'Quality over quantity. You appreciate craft, expertise, and the finer details that others miss.', type: 'patron' },
    explorer: { emoji: '🔍', name: 'The Explorer', desc: 'Curious and discerning, you seek hidden gems and authentic experiences off the beaten path.', type: 'patron' },
    celebrator: { emoji: '🎊', name: 'The Celebrator', desc: 'Life is full of moments worth celebrating, and you make sure every one counts.', type: 'patron' },
    relaxer: { emoji: '😌', name: 'The Relaxer', desc: 'Your nights out are about unwinding, decompressing, and finding peace in good company.', type: 'patron' },
    supporter: { emoji: '💪', name: 'The Supporter', desc: 'You champion the people and places you believe in, becoming their biggest advocate.', type: 'patron' },
    critic: { emoji: '🧐', name: 'The Critic', desc: 'Your high standards push the industry forward. You know what excellence looks like.', type: 'patron' },
    storyteller: { emoji: '📖', name: 'The Storyteller', desc: 'Every night out becomes a story. You remember the details and share the experiences.', type: 'patron' },
    student: { emoji: '📚', name: 'The Student', desc: 'Always learning, always asking questions. You want to understand the craft behind the experience.', type: 'patron' },
    
    // ONPRO ARCHETYPES
    craftsman: { emoji: '🎨', name: 'The Craftsman', desc: 'Precision and technique define your service. Every drink, every plate is executed to perfection. You take pride in the fundamentals.', type: 'onpro' },
    closer: { emoji: '💼', name: 'The Closer', desc: 'You read the room and know exactly when to suggest that perfect pairing or upsell. Sales is an art, and you are the artist.', type: 'onpro' },
    mentor: { emoji: '🎓', name: 'The Mentor', desc: 'You build people, not just drinks. Training the next generation and sharing knowledge is your calling.', type: 'onpro' },
    hustler: { emoji: '⚡', name: 'The Hustler', desc: 'Speed and efficiency are your superpowers. You thrive in the rush, never missing a beat even when slammed.', type: 'onpro' },
    therapist: { emoji: '🫂', name: 'The Therapist', desc: 'People open up to you. You create safe space, remember stories, and genuinely care about your regulars lives.', type: 'onpro' },
    showman: { emoji: '🎭', name: 'The Showman', desc: 'Every shift is a performance. You entertain, engage, and create memorable experiences that guests talk about for days.', type: 'onpro' },
    professional: { emoji: '👔', name: 'The Professional', desc: 'Consistency, reliability, excellence. You show up on time, execute flawlessly, and maintain standards no matter what.', type: 'onpro' },
    innovator: { emoji: '🔬', name: 'The Innovator', desc: 'You push boundaries and create new classics. Always experimenting, always evolving the craft forward.', type: 'onpro' },
    guardian: { emoji: '🛡️', name: 'The Guardian', desc: 'Safety and ethics are non-negotiable. You protect guests, support your team, and uphold industry integrity.', type: 'onpro' },
    diplomat: { emoji: '🤝', name: 'The Diplomat', desc: 'Conflict resolution and team harmony are your strengths. You navigate difficult situations with grace and keep the crew cohesive.', type: 'onpro' },
    entrepreneur: { emoji: '🚀', name: 'The Entrepreneur', desc: 'You think like an owner. Understanding P&L, maximizing revenue, and building sustainable success drives you.', type: 'onpro' },
    caregiver: { emoji: '❤️', name: 'The Caregiver', desc: 'Hospitality in its truest form. You anticipate needs, create comfort, and make everyone feel welcomed and valued.', type: 'onpro' }
  };

  // Identity cards data
  const identityCards = [
    {
      id: 'onpro',
      emoji: '🍸',
      title: "I'm a Hospitality Professional",
      subtitle: 'Bartender, Server, Sommelier, Chef, DJ...',
      color: '#22c55e',
      benefits: [
        'Own your professional identity—portable across venues',
        'Take your regulars with you when you move',
        'Get DAPA-certified and prove your expertise',
        'Build career equity that compounds over time'
      ]
    },
    {
      id: 'patron',
      emoji: '🥂',
      title: "I'm a Guest",
      subtitle: 'I follow great hospitality people',
      color: '#8b5cf6',
      benefits: [
        'Never lose your favorite bartender again',
        'Get notified when your people are working',
        'Discover your OnScene Genome personality',
        'Build regular status at any venue'
      ]
    },
    {
      id: 'venue',
      emoji: '🏢',
      title: 'I Own/Manage a Venue',
      subtitle: 'Restaurant, Bar, Hotel, Club...',
      color: '#3b82f6',
      benefits: [
        'Recruit verified, DAPA-certified talent',
        'Reduce turnover and training costs',
        'Showcase your team to attract customers',
        'Track staff-driven traffic and loyalty'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>OnTonight - Where Regulars Are Made | Hospitality Professional Platform</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry. Live now in Tampa Bay. Expanding to Miami, Nashville & beyond." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="page">
        {/* ============================================
            FIXED JOIN BUTTON (Always visible top-right)
        ============================================ */}
        <button className="fixed-join-btn" onClick={scrollToForm}>
          Join the Movement
        </button>

        {/* ============================================
            NEW: STICKY NAV (appears on scroll)
        ============================================ */}
        <nav className={`sticky-nav ${showStickyNav ? 'visible' : ''}`}>
          <div className="sticky-inner">
            <span className="sticky-logo">OnTonight</span>
            <span className="sticky-venues">TAMPA PILOT · Haiku · Ulele · Beacon</span>
          </div>
        </nav>

        {/* ============================================
            NEW: SECTION 1 - HERO HOOK (0-5 seconds)
            Pure emotion, no stats, no buttons
        ============================================ */}
        <section className="hero-hook">
          <div className="hero-glow"></div>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              LIVE NOW · TAMPA BAY
            </div>
            
            <h1 className="hero-title">
              <span>Your Night.</span>
              <span>Your People.</span>
            </h1>
            
            <p className="hero-tagline">WHERE REGULARS ARE MADE</p>
            
            <div className="scroll-hint" onClick={scrollToEmotional}>
              <span className="scroll-arrow">↓</span>
            </div>
          </div>
        </section>

        {/* ============================================
            NEW: SECTION 2 - EMOTIONAL HOOK (5-12 sec)
            The bartender story - tight, clean, platinum
        ============================================ */}
        <section className="emotional" ref={emotionalRef}>
          <div className="emotional-inner">
            <p className="emo-line">You know that bartender who remembers your name?</p>
            <p className="emo-line">The one who starts making your drink when you walk in?</p>
            <p className="emo-line highlight">They remember you too.</p>
            <p className="emo-line">That connection shouldn't have an expiration date.</p>
            <p className="emo-resolution">Now it doesn't.</p>
            <div className="scroll-hint-small" onClick={scrollToForm}>
              <span>↓</span>
            </div>
          </div>
        </section>

        {/* ============================================
            NEW: SECTION 3 - SIGNUP (12-15 sec)
            2-step email capture - glassmorphism card
        ============================================ */}
        <section className="signup-section" ref={formRef}>
          <div className="signup-container">
            <h2>Join the Movement</h2>
            <p className="signup-subtitle">First 2,000 members get their first year FREE</p>
            
            {!submitted ? (
              <div className="signup-card">
                {!showFullForm ? (
                  <form onSubmit={handleEmailSubmit} className="email-form">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="email-input"
                    />
                    <button type="submit" className="email-btn">Get Early Access →</button>
                  </form>
                ) : (
                  <form onSubmit={handleFullSubmit} className="full-form">
                    <div className="form-grid">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <select
                        required
                        value={formData.userType}
                        onChange={(e) => setFormData({...formData, userType: e.target.value})}
                      >
                        <option value="">I am a...</option>
                        <option value="onpro">OnPro (Bartender, Server, etc.)</option>
                        <option value="patron">Patron (Guest)</option>
                        <option value="venue">Venue Owner/Manager</option>
                      </select>
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    <p className="form-legal">By submitting, you confirm you are 18+ and agree to receive updates from OnTonight.</p>
                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? 'Joining...' : 'Complete Signup'}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="success-card">
                <span className="success-icon">🎉</span>
                <h3>Welcome to the Movement</h3>
                <p>Check your email for next steps. Your first year is FREE.</p>
              </div>
            )}
            
            <p className="signup-note">No credit card required · Cancel anytime</p>
          </div>
        </section>

        {/* ============================================
            NEW: SECTION 4 - IDENTITY CARDS (15-30 sec)
            Click-to-expand cards for each user type
        ============================================ */}
        <section className="identity-section">
          <div className="container">
            <h2>Which Are You?</h2>
            <p className="section-subtitle">OnTonight serves everyone in the hospitality ecosystem</p>
            
            <div className="identity-grid">
              {identityCards.map((card) => (
                <div
                  key={card.id}
                  className={`identity-card ${expandedIdentity === card.id ? 'expanded' : ''}`}
                  style={{'--card-color': card.color}}
                  onClick={() => setExpandedIdentity(expandedIdentity === card.id ? null : card.id)}
                >
                  <div className="card-header">
                    <span className="card-emoji">{card.emoji}</span>
                    <h3>{card.title}</h3>
                    <p>{card.subtitle}</p>
                    <span className="card-toggle">{expandedIdentity === card.id ? '−' : '+'}</span>
                  </div>
                  
                  {expandedIdentity === card.id && (
                    <div className="card-body">
                      <ul>
                        {card.benefits.map((b, i) => (
                          <li key={i}><span>→</span> {b}</li>
                        ))}
                      </ul>
                      <button onClick={(e) => { e.stopPropagation(); scrollToForm(); }} className="card-cta">
                        Join Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button onClick={scrollToDeepContent} className="explore-more">
              Learn More About the Platform ↓
            </button>
          </div>
        </section>

        {/* ============================================
            SECTION 5: ACCORDION DEEP CONTENT
            All original content preserved in accordions
        ============================================ */}
        <section className="deep-section" ref={deepContentRef}>
          <div className="container">
            <h2>Explore OnTonight</h2>
            <p className="section-subtitle">Everything you need to know</p>

            {/* ==========================================
                ACCORDION 1: THE PROBLEM ($66.8B Crisis)
                Original: Home tab content
            ========================================== */}
            <div className={`accordion ${expandedAccordion === 'problem' ? 'open' : ''}`}>
              <button className="accordion-header" onClick={() => setExpandedAccordion(expandedAccordion === 'problem' ? null : 'problem')}>
                <span className="acc-icon">📉</span>
                <span className="acc-title">The $66.8B Industry Crisis</span>
                <span className="acc-toggle">{expandedAccordion === 'problem' ? '−' : '+'}</span>
              </button>
              
              {expandedAccordion === 'problem' && (
                <div className="accordion-body">
                  {/* VALUE PROPS - Original */}
                  <h3 className="acc-section-title">What's Your Career Worth?</h3>
                  <p className="acc-section-subtitle">The hidden cost of hospitality turnover—and how OnTonight fixes it.</p>
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

                  {/* CRISIS QUOTES - Original */}
                  <h3 className="acc-section-title" style={{marginTop: '60px'}}>What Industry Leaders Are Saying</h3>
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

                  {/* MISSION - Original */}
                  <div className="mission-block">
                    <h3>Our Mission</h3>
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
              )}
            </div>

            {/* ==========================================
                ACCORDION 2: PLATFORM FEATURES
                Original: Platform tab with sub-tabs
            ========================================== */}
            <div className={`accordion ${expandedAccordion === 'platform' ? 'open' : ''}`}>
              <button className="accordion-header" onClick={() => setExpandedAccordion(expandedAccordion === 'platform' ? null : 'platform')}>
                <span className="acc-icon">🚀</span>
                <span className="acc-title">Platform Features</span>
                <span className="acc-toggle">{expandedAccordion === 'platform' ? '−' : '+'}</span>
              </button>
              
              {expandedAccordion === 'platform' && (
                <div className="accordion-body">
                  <h3 className="acc-section-title">Professional Infrastructure</h3>
                  <p className="acc-section-subtitle">One platform. Three solutions. Complete ecosystem.</p>
                  
                  {/* Platform Sub-Tabs */}
                  <div className="platform-tabs">
                    <button className={platformTab === 'onpro' ? 'active' : ''} onClick={() => setPlatformTab('onpro')}>For OnPros</button>
                    <button className={platformTab === 'patron' ? 'active' : ''} onClick={() => setPlatformTab('patron')}>For Patrons</button>
                    <button className={platformTab === 'venue' ? 'active' : ''} onClick={() => setPlatformTab('venue')}>For Venues</button>
                    <button className={platformTab === 'science' ? 'active' : ''} onClick={() => setPlatformTab('science')}>The Science</button>
                  </div>

                  {/* ONPRO TAB CONTENT */}
                  {platformTab === 'onpro' && (
                    <div className="platform-content">
                      <div className="feature-block">
                        <div className="feature-screenshots">
                          <img src="/screenshots/onpro-assessment-dashboard.jpg" alt="OnPro DAPA Assessment Dashboard" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-assessment-dashboard.jpg')} />
                          <img src="/screenshots/onpro-skills-catagories.jpg" alt="OnPro Skills Categories" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-skills-catagories.jpg')} />
                          <img src="/screenshots/onpro-profile-status.jpg" alt="OnPro Profile Status" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-profile-status.jpg')} />
                        </div>
                        <div className="feature-info">
                          <div className="feature-tag">FOR PROFESSIONALS</div>
                          <h3>OnPro: Portable Career</h3>
                          <p className="feature-lead">Your professional identity follows you from venue to venue. Skills verified through our proprietary DAPA system. Customers follow YOU, not the venue.</p>
                          <div className="feature-details">
                            <div className="detail-section">
                              <h4>🎯 Verified Professional Identity</h4>
                              <p>DAPA assessment proves your expertise across 6 dimensions: Technical, Ethical, Emotional Intelligence, Velocity, Commercial, and Leadership. Industry-recognized certification.</p>
                            </div>
                            <div className="detail-section">
                              <h4>📊 Professional Genome</h4>
                              <p>Comprehensive personality profile that goes beyond skills. Understand your strengths, growth areas, and career trajectory. Share with venues to showcase your complete professional identity.</p>
                            </div>
                            <div className="detail-section">
                              <h4>👥 Portable Customer Base</h4>
                              <p>Your regulars follow you. Check-in tracking, relationship management, and analytics prove your value to any venue. Your customer relationships belong to YOU.</p>
                            </div>
                            <div className="detail-section">
                              <h4>📈 Career Analytics</h4>
                              <p>Track your professional growth. See your check-in trends, regular customer retention, skill progression, and earning potential over time.</p>
                            </div>
                          </div>
                          <div className="feature-price">
                            <div className="price-tier free">
                              <div className="tier-badge">ALWAYS FREE</div>
                              <div className="tier-name">OnPro Basic</div>
                              <ul>
                                <li>Complete DAPA assessment</li>
                                <li>Professional profile</li>
                                <li>OnTonight status</li>
                                <li>Basic analytics</li>
                              </ul>
                            </div>
                            <div className="price-tier premium">
                              <div className="tier-badge">PREMIUM</div>
                              <div className="tier-name">OnPro Pro <span>$10/month</span></div>
                              <ul>
                                <li>Everything in Basic</li>
                                <li>Advanced analytics</li>
                                <li>Priority placement</li>
                                <li>Custom branding</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* DAPA Section */}
                      <div className="dapa-section">
                        <h3>DAPA Professional Assessment</h3>
                        <p>The industry's only comprehensive skills verification system. 1,600+ questions across 6 professional dimensions.</p>
                        <div className="dapa-grid">
                          <div className="dapa-item">
                            <div className="dapa-icon technical">🎯</div>
                            <h4>Technical</h4>
                            <p>Knowledge, procedures, problem-solving</p>
                          </div>
                          <div className="dapa-item">
                            <div className="dapa-icon ethical">⚖️</div>
                            <h4>Ethical</h4>
                            <p>Integrity, compliance, judgment</p>
                          </div>
                          <div className="dapa-item">
                            <div className="dapa-icon emotional">💚</div>
                            <h4>Emotional</h4>
                            <p>Empathy, relationships, boundaries</p>
                          </div>
                          <div className="dapa-item">
                            <div className="dapa-icon velocity">⚡</div>
                            <h4>Velocity</h4>
                            <p>Speed, pressure, crisis management</p>
                          </div>
                          <div className="dapa-item">
                            <div className="dapa-icon commercial">💰</div>
                            <h4>Commercial</h4>
                            <p>Sales, upselling, revenue awareness</p>
                          </div>
                          <div className="dapa-item">
                            <div className="dapa-icon leadership">👑</div>
                            <h4>Leadership</h4>
                            <p>Team dynamics, mentoring, initiative</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* OnPro Archetypes */}
                      <div className="archetype-section">
                        <h3>Professional Archetypes</h3>
                        <p>12 professional personality profiles discovered through DAPA assessment.</p>
                        <p className="click-instruction">Click any archetype to learn more →</p>
                        <div className="genome-grid">
                          {Object.entries(archetypes).filter(([key, arch]) => arch.type === 'onpro').map(([key, arch]) => (
                            <button
                              key={key}
                              className={`genome-item ${selectedArchetype === key ? 'active' : ''} onpro`}
                              onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}
                            >
                              <span className="genome-emoji">{arch.emoji}</span>
                              <span className="genome-name">{arch.name}</span>
                            </button>
                          ))}
                        </div>
                        {selectedArchetype && archetypes[selectedArchetype]?.type === 'onpro' && (
                          <div className="genome-detail onpro">
                            <div className="genome-detail-header">
                              <span className="genome-detail-emoji">{archetypes[selectedArchetype].emoji}</span>
                              <h4>{archetypes[selectedArchetype].name}</h4>
                            </div>
                            <p>{archetypes[selectedArchetype].desc}</p>
                            <button onClick={() => setSelectedArchetype(null)} className="btn-close">Close</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PATRON TAB CONTENT */}
                  {platformTab === 'patron' && (
                    <div className="platform-content">
                      <div className="feature-block reverse">
                        <div className="feature-screenshots four-shots">
                          <img src="/screenshots/patron-genome-result.jpg" alt="Patron OnScene Genome Result" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-genome-result.jpg')} />
                          <img src="/screenshots/patron-profile.jpg" alt="Patron Profile" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-profile.jpg')} />
                          <img src="/screenshots/patron-mypeople.jpg" alt="Patron MyPeople Status" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-mypeople.jpg')} />
                          <img src="/screenshots/patron-my-spots.jpg" alt="Patron MySpots Tracking" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-my-spots.jpg')} />
                        </div>
                        <div className="feature-info">
                          <div className="feature-tag patron">FOR CUSTOMERS</div>
                          <h3>Patron: Find Your People</h3>
                          <p className="feature-lead">Follow your favorite hospitality professionals. See who's working tonight. Never lose touch when they change venues. Discover new verified talent.</p>
                          <div className="feature-details">
                            <div className="detail-section">
                              <h4>🔔 Real-Time OnTonight Status</h4>
                              <p>See which of your regular OnPros are working right now. Get notifications when they clock in. Plan your night around your people, not just places.</p>
                            </div>
                            <div className="detail-section">
                              <h4>🧬 OnScene Genome</h4>
                              <p>Discover your hospitality personality across 10 dimensions. Are you a Connoisseur? An Adventurer? A Regular? Get matched with OnPros and venues that fit your style.</p>
                            </div>
                            <div className="detail-section">
                              <h4>⭐ Check-Ins & Regulars</h4>
                              <p>Track your favorite spots. Build regular status with OnPros. Unlock VIP treatment by becoming a verified regular at your favorite venues.</p>
                            </div>
                            <div className="detail-section">
                              <h4>🎯 Smart Venue Matching</h4>
                              <p>Get personalized venue recommendations based on your genome, preferences, and the OnPros you follow. Discover hidden gems that match your vibe.</p>
                            </div>
                          </div>
                          <div className="feature-price">
                            <div className="price-tier free">
                              <div className="tier-badge">FREE FOREVER</div>
                              <div className="tier-name">Patron Basic</div>
                              <ul>
                                <li>Follow unlimited OnPros</li>
                                <li>See real-time OnTonight status</li>
                                <li>Search venues & professionals</li>
                                <li>Track your visit history</li>
                                <li>Basic check-ins</li>
                              </ul>
                            </div>
                            <div className="price-tier premium">
                              <div className="tier-badge">PREMIUM</div>
                              <div className="tier-name">Patron Plus <span>$5/month</span></div>
                              <ul>
                                <li>Everything in Basic</li>
                                <li>OnScene Genome assessment</li>
                                <li>Push notifications when OnPros go live</li>
                                <li>Advanced venue matching</li>
                                <li>Exclusive events & experiences</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Patron Archetypes */}
                      <div className="archetype-section">
                        <h3>OnScene Genome Archetypes</h3>
                        <p>12 social profiles that define your hospitality personality. Discover yours through the OnScene Genome assessment.</p>
                        <p className="click-instruction">Click any archetype to learn more →</p>
                        <div className="genome-grid">
                          {Object.entries(archetypes).filter(([key, arch]) => arch.type === 'patron').map(([key, arch]) => (
                            <button
                              key={key}
                              className={`genome-item ${selectedArchetype === key ? 'active' : ''} patron`}
                              onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}
                            >
                              <span className="genome-emoji">{arch.emoji}</span>
                              <span className="genome-name">{arch.name}</span>
                            </button>
                          ))}
                        </div>
                        {selectedArchetype && archetypes[selectedArchetype]?.type === 'patron' && (
                          <div className="genome-detail patron">
                            <div className="genome-detail-header">
                              <span className="genome-detail-emoji">{archetypes[selectedArchetype].emoji}</span>
                              <h4>{archetypes[selectedArchetype].name}</h4>
                            </div>
                            <p>{archetypes[selectedArchetype].desc}</p>
                            <button onClick={() => setSelectedArchetype(null)} className="btn-close">Close</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* VENUE TAB CONTENT */}
                  {platformTab === 'venue' && (
                    <div className="platform-content">
                      <div className="feature-block">
                        <div className="feature-screenshots single-shot">
                          <img src="/screenshots/venue-analytics-dashboard.jpg" alt="Venue Analytics Dashboard" className="screenshot large" onClick={() => setLightboxImage('/screenshots/venue-analytics-dashboard.jpg')} />
                        </div>
                        <div className="feature-info">
                          <div className="feature-tag venue">FOR VENUES</div>
                          <h3>Venue: Retain Talent</h3>
                          <p className="feature-lead">Recruit DAPA-verified professionals. Showcase your team to attract customers. Reduce turnover costs. Track the impact of individual staff members.</p>
                          <div className="feature-details">
                            <div className="detail-section">
                              <h4>🎯 Recruit Verified Talent</h4>
                              <p>Search for DAPA-verified OnPros by skill level, specialty, and availability. See their complete professional profiles, skill scores, and customer reviews before you hire.</p>
                            </div>
                            <div className="detail-section">
                              <h4>👥 Team Showcase</h4>
                              <p>Feature your verified OnPros on your venue profile. Show potential customers the caliber of your team. Attract patrons who follow your staff members.</p>
                            </div>
                            <div className="detail-section">
                              <h4>📊 Staff Analytics</h4>
                              <p>Track check-ins by staff member. See which OnPros bring the most regulars. Measure the ROI of individual team members with data-driven insights.</p>
                            </div>
                            <div className="detail-section">
                              <h4>🔄 Reduce Turnover</h4>
                              <p>Compete on culture, not just wages. Show your team investment through DAPA certification. Create a destination venue where talent wants to stay.</p>
                            </div>
                          </div>
                          <div className="feature-price">
                            <div className="price-tier trial">
                              <div className="tier-badge">3-MONTH FREE TRIAL</div>
                              <div className="tier-name">Venue Starter</div>
                              <ul>
                                <li>Complete venue profile</li>
                                <li>Team member verification</li>
                                <li>Basic analytics</li>
                                <li>Customer check-ins</li>
                              </ul>
                            </div>
                            <div className="price-tier premium">
                              <div className="tier-badge">PROFESSIONAL</div>
                              <div className="tier-name">Venue Pro <span>From $50/month</span></div>
                              <ul>
                                <li>Everything in Starter</li>
                                <li>Advanced analytics</li>
                                <li>Staff recruitment tools</li>
                                <li>Premium placement</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Venue Benefits Grid */}
                      <div className="venue-benefits">
                        <h3>Why Venues Partner With OnTonight</h3>
                        <div className="venue-benefits-grid">
                          <div className="venue-benefit">
                            <h4>🎯 Recruit With Confidence</h4>
                            <p>Stop guessing on résumés. Access a pool of DAPA-certified professionals with verified skills across 6 dimensions. See technical mastery, ethical judgment, and leadership capacity before the interview.</p>
                          </div>
                          <div className="venue-benefit">
                            <h4>📊 Understand Your Team</h4>
                            <p>Real-time analytics show which staff members drive customer traffic, maintain regulars, and generate return visits. Make staffing decisions based on data, not gut feeling.</p>
                          </div>
                          <div className="venue-benefit">
                            <h4>🌟 Attract Better Customers</h4>
                            <p>Patrons follow OnPros, not just venues. When customers can track their favorite bartenders and servers, your verified talent becomes a customer acquisition engine.</p>
                          </div>
                          <div className="venue-benefit">
                            <h4>💼 Compete on Culture</h4>
                            <p>Showcase your team's expertise and work environment. Win talent wars by proving your venue develops careers, not just fills shifts.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Analytics Preview */}
                      <div className="analytics-preview">
                        <h4>Venue Analytics Dashboard</h4>
                        <p>Track the metrics that matter. See which OnPros drive the most customer visits, who maintains the highest regular retention rates, and where your team excels across DAPA dimensions.</p>
                        <div className="analytics-list">
                          <div className="analytics-item">
                            <span className="analytics-icon">📈</span>
                            <div>
                              <strong>Staff Performance Metrics</strong>
                              <p>DAPA scores, customer ratings, and skill progression over time</p>
                            </div>
                          </div>
                          <div className="analytics-item">
                            <span className="analytics-icon">👥</span>
                            <div>
                              <strong>Customer Attribution</strong>
                              <p>See which OnPros bring customers back and drive new traffic</p>
                            </div>
                          </div>
                          <div className="analytics-item">
                            <span className="analytics-icon">🔄</span>
                            <div>
                              <strong>Retention Insights</strong>
                              <p>Early warning indicators for flight risk and engagement trends</p>
                            </div>
                          </div>
                          <div className="analytics-item">
                            <span className="analytics-icon">⚡</span>
                            <div>
                              <strong>Peak Performance Hours</strong>
                              <p>Optimize scheduling based on when each staff member performs best</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCIENCE TAB CONTENT */}
                  {platformTab === 'science' && (
                    <div className="platform-content">
                      <h3 className="science-title">The Science Behind Identity</h3>
                      <p className="science-subtitle">Two assessment systems. One goal: accurate, actionable identity profiles for everyone in hospitality.</p>
                      
                      {/* DAPA Deep Dive */}
                      <div className="science-block dapa">
                        <div className="science-header">
                          <h4>DAPA: Professional Certification</h4>
                          <span className="science-badge onpro">For OnPros</span>
                        </div>
                        <p>DAPA (Dynamic Adaptive Proficiency Assessment) is the hospitality industry's first comprehensive professional certification system. Unlike traditional skills tests, DAPA measures both technical competence and moral judgment across six critical dimensions.</p>
                        
                        <div className="science-features">
                          <div>
                            <h5>📐 Adaptive Algorithm</h5>
                            <p>Questions adjust in real-time based on your answers. High performers face increasingly complex scenarios, while the system identifies knowledge gaps and probes deeper. Tests terminate early when confidence thresholds are met—some professionals answer 30 questions, others need 200+.</p>
                          </div>
                          <div>
                            <h5>⚖️ Moral Gradient Scoring</h5>
                            <p>Every question has multiple "correct" answers—but they're not equal. We measure not just what you know, but how you think. Choosing the legal answer scores differently than choosing the ethical answer. Your moral sophistication becomes part of your professional profile.</p>
                          </div>
                          <div>
                            <h5>🎯 Six-Axis Measurement</h5>
                            <p>Technical mastery is just one dimension. We also measure Ethical judgment, Emotional intelligence, Velocity under pressure, Commercial awareness, and Leadership capacity. The result: a complete professional genome, not just a test score.</p>
                          </div>
                          <div>
                            <h5>🔬 Continuous Validation</h5>
                            <p>1,600+ questions across 9 hospitality categories, each validated against real-world performance data. Questions that don't predict success are removed. The system learns and improves with every assessment.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* OnScene Genome Deep Dive */}
                      <div className="science-block genome">
                        <div className="science-header">
                          <h4>OnScene Genome: Social Identity</h4>
                          <span className="science-badge patron">For Patrons</span>
                        </div>
                        <p>OnScene Genome maps your hospitality personality across 10 behavioral dimensions. It's not about demographics or preferences—it's about how you experience and create social moments.</p>
                        
                        <div className="science-features">
                          <div>
                            <h5>🧬 45 Behavioral Questions</h5>
                            <p>Not "What do you like?" but "How do you behave?" Questions measure decision-making patterns, social preferences, risk tolerance, and relationship dynamics. We're mapping behavior, not opinion.</p>
                          </div>
                          <div>
                            <h5>📊 10 Social Dimensions</h5>
                            <p>Adventure vs. Familiarity. Solo vs. Social. Discerning vs. Exploratory. Quality vs. Experience. We measure where you fall on ten behavioral spectrums that predict hospitality preferences.</p>
                          </div>
                          <div>
                            <h5>🎯 Archetype Matching</h5>
                            <p>Your responses map to one of 12 distinct social archetypes. Each archetype has unique venue preferences, OnPro compatibility patterns, and social behaviors. The system matches you to experiences that fit your actual personality.</p>
                          </div>
                          <div>
                            <h5>🔄 Pattern Recognition</h5>
                            <p>As you use OnTonight, the system learns. Check-ins, favorites, and interaction patterns refine your profile. Your genome evolves as your preferences do.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Why Both Matter */}
                      <div className="science-block both">
                        <h4>Two Systems, One Platform</h4>
                        <div className="two-systems">
                          <div>
                            <h5 style={{color: '#22c55e'}}>DAPA (OnPro)</h5>
                            <p>Measures professional capability and work style. Verifies skills. Creates portable professional identity. Helps venues hire better and OnPros prove their worth.</p>
                          </div>
                          <div>
                            <h5 style={{color: '#8b5cf6'}}>OnScene Genome (Patron)</h5>
                            <p>Measures social behavior and hospitality preferences. Matches people to experiences. Creates personalized recommendations. Helps Patrons find their people and places.</p>
                          </div>
                        </div>
                        <p className="science-summary">Together, they create a complete hospitality identity ecosystem. OnPros prove their professional value. Patrons discover authentic experiences. Venues showcase verified talent. Everyone benefits from accurate, actionable identity data.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ==========================================
                ACCORDION 3: THE VISION (Founder Story)
                Original: Founder tab - full content
            ========================================== */}
            <div className={`accordion ${expandedAccordion === 'vision' ? 'open' : ''}`}>
              <button className="accordion-header" onClick={() => setExpandedAccordion(expandedAccordion === 'vision' ? null : 'vision')}>
                <span className="acc-icon">💡</span>
                <span className="acc-title">The Vision & Founder Story</span>
                <span className="acc-toggle">{expandedAccordion === 'vision' ? '−' : '+'}</span>
              </button>
              
              {expandedAccordion === 'vision' && (
                <div className="accordion-body">
                  <p className="vision-lead">This is about an industry that deserves infrastructure. And the people who make it real.</p>

                  {/* Founder Introduction */}
                  <div className="founder-intro">
                    <div className="founder-photo-placeholder">
                      <span style={{fontSize: '48px'}}>👤</span>
                      <p style={{marginTop: '12px', fontSize: '13px', color: 'rgba(212,163,115,0.7)'}}>Photo Coming Soon</p>
                    </div>
                    <div className="founder-text">
                      <h3>Hi, I'm Jack Joy, Founder of OnTonight.</h3>
                      <p className="founder-tagline">27 years behind bars. One mission: end professional erasure in hospitality.</p>
                    </div>
                  </div>

                  {/* Section 1: The Personal Story */}
                  <div className="vision-section">
                    <h4>27 Years Behind the Bar</h4>
                    <p>Twenty-seven years in hospitality. Not watching from an office—<em>living it</em>. Behind the stick where ice never stops flowing and the POS screen glows like a beacon through double shifts. Managing venues where every night is opening night. Training hundreds of professionals who became masters of their craft. But before all that—building drinks with my hands, reading regulars like sheet music, learning that hospitality isn't a job, it's a language.</p>
                    <p>I've made drinks until my hands cramped and my mind could freestyle recipes in my sleep. I've worked stations where you pour four cocktails simultaneously while maintaining three separate conversations, each guest believing they have your full attention—because in that moment, they do. I've closed at 4 AM under neon signs that hum like prayers and opened at 10 AM with coffee that tastes like hope and feels like punishment.</p>
                    <p>I know what it means to be <em>good</em> at this work. The muscle memory that lets you build a perfect Manhattan in 37 seconds while defusing an argument two seats down. The emotional intelligence to spot a proposal about to happen or a breakup already unfolding. The technical precision of a 200-drink rush hour where every ticket is perfect and every guest feels seen.</p>
                    <p>And I've watched the best people I ever trained—the ones who could do all of this—walk out the door because they found something better.</p>
                    <p className="vision-emphasis">Every single time, they started over from zero. Their regulars scattered to the wind. Their reputation reset to nothing. Their professional equity evaporated like smoke from an extinguished candle.</p>
                    <p>I watched bartenders who could make 200 cocktails an hour—muscle memory and chemistry and conversation all at once—lose everything when they changed venues. Sommeliers with encyclopedic knowledge who could taste terroir in a blind pour, starting over as if they'd never held a corkscrew.</p>
                    <p>The industry calls this "turnover." I call it what it is: <strong>systematic professional erasure</strong>.</p>
                  </div>

                  {/* Section 2: The Infrastructure Gap */}
                  <div className="vision-section">
                    <h4>The Pattern You Can't Unsee</h4>
                    <p>Once you see it, you can't look away. Every industry has professional infrastructure except hospitality.</p>
                    <p>Lawyers switch firms, but their bar membership follows them like a shadow. Software engineers change companies like seasons—their GitHub stays with them, permanent proof of skill. Real estate agents move brokerages and take their client databases with them, relationships preserved.</p>
                    <p className="vision-emphasis">But a bartender changes venues and loses everything. Every. Single. Time.</p>
                    <p>The regular who tipped $50 every Friday? Can't find you. The customer relationships built over years of remembered birthdays and preferred glassware? Belong to your former employer, filed under "goodwill" on a balance sheet. The professional reputation you spent a decade building, one perfect Manhattan at a time? Starts at zero.</p>
                    <p className="vision-highlight">This isn't the nature of the industry. This is the <em>absence</em> of professional infrastructure. And absence isn't destiny—it's a problem waiting for a solution.</p>
                  </div>

                  {/* Section 3: Why I Could Build This */}
                  <div className="vision-section">
                    <h4>Why I Could Build This</h4>
                    <p>After 27 years in hospitality, I transitioned into cybersecurity and software development—a world of systems and logic, of problems that yield to analysis, of building things that scale beyond human limitation.</p>
                    <p>Standing at the intersection of these two worlds, I realized: I understand both sides of this problem.</p>
                    <p>I understand the bartender making 200 drinks an hour during Saturday rush, tracking six tabs in their head while maintaining conversation with regulars, reading the room, defusing tension, creating atmosphere—all simultaneously, all while making it look effortless. I've <em>been</em> that bartender. I understand the sommelier who pairs wine with personality, not just food, who can read a guest's night in the way they hold the glass.</p>
                    <p className="vision-statement">Deep hospitality experience plus technical execution—that combination is rare. It's exactly what this problem needed.</p>
                  </div>

                  {/* Section 4: What OnTonight Is */}
                  <div className="vision-section">
                    <h4>What OnTonight Actually Is</h4>
                    <p className="vision-highlight">OnTonight is professional infrastructure—the kind that every other industry already has, the kind that hospitality professionals have deserved for decades, finally built.</p>
                    <ul className="vision-list">
                      <li><strong>For professionals:</strong> Your skills are verified through DAPA, a proprietary 6-axis assessment system. Your professional identity is portable—it follows you, grows with you, compounds over time. Your customer relationships belong to you, not your employer. When you change venues, you bring your value with you—provable, measurable, portable.</li>
                      <li><strong>For customers:</strong> Your favorite bartender changes jobs? You get notified. Your server moves to a new restaurant? You can follow them there. The relationship doesn't end when the employment ends. The magic stays with the person who created it.</li>
                      <li><strong>For venues:</strong> Recruit verified talent—not résumés and promises, but proven skill and measurable expertise. Compete on culture instead of wages alone. Turn retention into a competitive advantage.</li>
                    </ul>
                    <p>This is professional dignity in software form. This is career equity for people who serve. This is the infrastructure that should have existed decades ago.</p>
                  </div>

                  {/* Section 5: The Future */}
                  <div className="vision-section">
                    <h4>The Future We're Building</h4>
                    <p>Imagine hospitality where professionals own their careers. Where a talented bartender can leave a toxic workplace without losing their livelihood, where principle doesn't cost rent, where better opportunities don't mean starting over from scratch.</p>
                    <p>Where small venues compete with corporate chains by showcasing culture and verified talent instead of just matching wages. Where a young professional entering hospitality sees a real career path—one where their skills compound over time instead of resetting to zero every 18 months.</p>
                    <p className="vision-emphasis">That's not fantasy. That's infrastructure. That's what happens when you build the foundation that should have always existed.</p>
                    <p>We're live now in Tampa Bay, working with premier hospitality venues across the region. From here, we're expanding to Miami, Nashville, Austin, and major hospitality markets nationwide—wherever great service happens, wherever professionals deserve infrastructure.</p>
                    <p>This isn't about fixing turnover statistics. This is about restoring professional dignity to an entire industry, one profile at a time, one verified skill at a time, one preserved relationship at a time.</p>
                  </div>

                  {/* CTA */}
                  <div className="vision-cta-block">
                    <h4>Join the Movement</h4>
                    <p>This isn't a product launch. This is a correction—the professional infrastructure that should have existed all along, finally built, finally real, finally here.</p>
                    <p>If you've ever watched a talented professional start over from scratch and felt the waste of it—you've seen the problem. If you've ever lost touch with someone who made your nights special—you've felt the gap.</p>
                    <p className="cta-emphasis">We're not just building software. We're building the future of hospitality careers. We're ending professional erasure. We're making dignity portable.</p>
                    <button onClick={scrollToForm} className="btn-primary">Join the Waitlist</button>
                    <p className="cta-note">First 2,000 signups get their first year free. Be part of the infrastructure. Be part of the change.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================
            FINAL CTA SECTION
        ============================================ */}
        <section className="final-cta">
          <div className="container">
            <h2>Ready to Join?</h2>
            <p>First 2,000 members get their first year FREE</p>
            <button onClick={scrollToForm} className="btn-primary large">Join the Movement →</button>
            {showInstallPrompt && (
              <button onClick={handleInstall} className="install-btn">📱 Add to Home Screen</button>
            )}
          </div>
        </section>

        {/* ============================================
            FOOTER (Original)
        ============================================ */}
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
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For OnPros</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For Patrons</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For Venues</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>DAPA Assessment</a>
                </div>
                <div className="footer-col">
                  <h5>Company</h5>
                  <a href="https://app.on-tonight.com/privacy">Privacy Policy</a>
                  <a href="https://app.on-tonight.com/terms">Terms of Service</a>
                  <a href="/contact">Contact Us</a>
                  <a href="/careers">Careers</a>
                </div>
                <div className="footer-col">
                  <h5>Connect</h5>
                  <a href="/support">Support</a>
                  <a href="/media">Media Inquiries</a>
                  <a href="/partner">Partner With Us</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 OnTonight LLC. All rights reserved.</p>
              <p>18+ only · Professional platform for hospitality industry</p>
            </div>
          </div>
        </footer>

        {/* ============================================
            LIGHTBOX (Original)
        ============================================ */}
        {lightboxImage && (
          <div className="lightbox" onClick={() => setLightboxImage(null)}>
            <div className="lightbox-content">
              <button className="lightbox-close" onClick={() => setLightboxImage(null)}>✕</button>
              <img src={lightboxImage} alt="Screenshot enlarged" className="lightbox-image" />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* =============================================
           BASE STYLES - VIEWPORT LOCKED
        ============================================= */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        .page { 
          background: #0d1117;
          color: #f8fafc;
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: -0.015em;
          font-weight: 400;
          min-height: 100vh;
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        .container { 
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }
        
        h1 { 
          font-size: 56px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
          color: #f8fafc;
        }
        
        h2 { 
          font-size: 40px;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          color: #f8fafc;
          text-align: center;
        }
        
        h3 {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.015em;
          margin-bottom: 16px;
          color: #f8fafc;
        }
        
        h4 {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 12px;
          color: #f8fafc;
        }
        
        h5 {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(248,250,252,0.4);
          margin-bottom: 14px;
        }
        
        p {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(248,250,252,0.75);
          margin-bottom: 16px;
        }
        
        section {
          padding: 80px 24px;
          width: 100%;
          max-width: 100vw;
        }
        
        .section-subtitle {
          font-size: 18px;
          color: rgba(248,250,252,0.6);
          text-align: center;
          margin-bottom: 48px;
        }

        /* =============================================
           FIXED JOIN BUTTON (Always visible)
        ============================================= */
        .fixed-join-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1001;
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transition: all 0.2s;
        }
        .fixed-join-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(212,163,115,0.4);
        }

        /* =============================================
           STICKY NAV (simplified)
        ============================================= */
        .sticky-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(13,17,23,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,163,115,0.15);
          transform: translateY(-100%);
          transition: transform 0.3s ease;
        }
        .sticky-nav.visible { transform: translateY(0); }
        .sticky-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sticky-logo {
          font-size: 20px;
          font-weight: 600;
          color: #d4a373;
        }
        .sticky-venues {
          font-size: 12px;
          color: rgba(248,250,252,0.4);
          letter-spacing: 0.05em;
        }

        /* =============================================
           HERO HOOK (Full screen, pure emotion)
        ============================================= */
        .hero-hook {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          text-align: center;
          padding: 24px;
        }
        .hero-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212,163,115,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 1;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.3);
          padding: 10px 20px;
          border-radius: 100px;
          margin-bottom: 48px;
          background: rgba(212,163,115,0.03);
        }
        .badge-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .hero-title {
          font-size: clamp(48px, 10vw, 80px);
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .hero-title span { display: block; }
        .hero-tagline {
          font-size: clamp(14px, 3vw, 20px);
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #d4a373;
          margin-bottom: 60px;
        }
        .scroll-hint {
          animation: bounce 2s infinite;
          cursor: pointer;
          padding: 20px;
        }
        .scroll-arrow {
          font-size: 32px;
          color: rgba(212,163,115,0.6);
          transition: color 0.2s;
        }
        .scroll-hint:hover .scroll-arrow {
          color: #d4a373;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        /* =============================================
           EMOTIONAL HOOK - TIGHT & PLATINUM
        ============================================= */
        .emotional {
          padding: 60px 24px;
          background: linear-gradient(180deg, #0d1117 0%, #161b22 100%);
          min-height: auto;
        }
        .emotional-inner {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        .emo-line {
          font-size: clamp(16px, 3.5vw, 22px);
          font-weight: 300;
          color: rgba(248,250,252,0.6);
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .emo-line.highlight {
          color: #f8fafc;
          font-weight: 500;
          font-size: clamp(18px, 4vw, 26px);
          margin: 20px 0;
        }
        .emo-resolution {
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 600;
          color: #d4a373;
          margin-top: 28px;
          margin-bottom: 32px;
        }
        .scroll-hint-small {
          cursor: pointer;
          padding: 12px;
          animation: bounce 2s infinite;
        }
        .scroll-hint-small span {
          font-size: 24px;
          color: rgba(212,163,115,0.5);
        }
        .scroll-hint-small:hover span {
          color: #d4a373;
        }

        /* =============================================
           SIGNUP SECTION (2-step form)
        ============================================= */
        .signup-section {
          padding: 60px 24px;
          background: #161b22;
          border-top: 1px solid rgba(212,163,115,0.1);
          border-bottom: 1px solid rgba(212,163,115,0.1);
        }
        .signup-container {
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
        }
        .signup-subtitle {
          color: #d4a373;
          margin-bottom: 32px;
        }
        .signup-card {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          backdrop-filter: blur(20px);
          padding: 40px;
          border-radius: 12px;
        }
        .email-form {
          display: flex;
          gap: 12px;
        }
        .email-input {
          flex: 1;
          padding: 16px 20px;
          background: rgba(13,17,23,0.8);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 6px;
          color: #f8fafc;
          font-size: 16px;
          font-family: inherit;
        }
        .email-input:focus {
          outline: none;
          border-color: #d4a373;
        }
        .email-btn {
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 16px 28px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          white-space: nowrap;
          transition: all 0.2s;
          font-family: inherit;
        }
        .email-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(212,163,115,0.3);
        }
        .full-form { text-align: left; }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-grid input, .form-grid select {
          width: 100%;
          padding: 14px 16px;
          background: rgba(13,17,23,0.8);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 6px;
          color: #f8fafc;
          font-size: 15px;
          font-family: inherit;
        }
        .form-grid input:focus, .form-grid select:focus {
          outline: none;
          border-color: #d4a373;
        }
        .form-legal {
          font-size: 12px;
          color: rgba(248,250,252,0.5);
          text-align: center;
          margin-bottom: 16px;
        }
        .submit-btn {
          width: 100%;
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .success-card {
          padding: 40px;
          background: rgba(34,197,94,0.05);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 12px;
        }
        .success-icon { font-size: 48px; margin-bottom: 16px; }
        .success-card h3 { color: #22c55e; margin-bottom: 8px; text-align: center; }
        .signup-note {
          font-size: 14px;
          color: rgba(248,250,252,0.4);
          margin-top: 20px;
        }

        /* =============================================
           IDENTITY CARDS
        ============================================= */
        .identity-section {
          padding: 60px 24px;
          background: #0d1117;
        }
        .identity-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }
        .identity-card {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.12);
          border-radius: 12px;
          padding: 32px 24px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .identity-card:hover {
          transform: translateY(-6px);
          border-color: var(--card-color);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        }
        .identity-card.expanded {
          border-color: var(--card-color);
          background: rgba(212,163,115,0.06);
        }
        .card-header { text-align: center; position: relative; }
        .card-emoji { font-size: 48px; display: block; margin-bottom: 16px; }
        .card-header h3 { font-size: 18px; margin-bottom: 8px; text-align: center; }
        .card-header p { font-size: 14px; color: rgba(248,250,252,0.5); text-align: center; }
        .card-toggle {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 24px;
          color: rgba(248,250,252,0.3);
        }
        .card-body {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .card-body ul { list-style: none; margin-bottom: 20px; }
        .card-body li {
          font-size: 14px;
          color: rgba(248,250,252,0.75);
          padding: 8px 0;
          display: flex;
          gap: 8px;
        }
        .card-body li span { color: var(--card-color); }
        .card-cta {
          width: 100%;
          background: var(--card-color);
          color: #0d1117;
          border: none;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
        }
        .explore-more {
          display: block;
          margin: 0 auto;
          background: transparent;
          color: rgba(248,250,252,0.5);
          border: 1px solid rgba(248,250,252,0.15);
          padding: 14px 28px;
          font-size: 14px;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .explore-more:hover {
          color: #d4a373;
          border-color: rgba(212,163,115,0.4);
        }

        /* =============================================
           ACCORDION STYLES - CONTAINED SCROLL
        ============================================= */
        .deep-section {
          padding: 80px 24px;
          background: #161b22;
        }
        .accordion {
          background: rgba(13,17,23,0.5);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        .accordion.open { border-color: rgba(212,163,115,0.25); }
        .accordion-header {
          width: 100%;
          background: transparent;
          border: none;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }
        .acc-icon { font-size: 24px; }
        .acc-title { flex: 1; font-size: 16px; font-weight: 600; color: #f8fafc; }
        .acc-toggle { font-size: 24px; color: #d4a373; }
        .accordion-body { 
          max-height: 60vh;
          overflow-y: auto;
          padding: 0 24px 24px;
          scrollbar-width: thin;
          scrollbar-color: rgba(212,163,115,0.3) transparent;
        }
        .accordion-body::-webkit-scrollbar {
          width: 6px;
        }
        .accordion-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .accordion-body::-webkit-scrollbar-thumb {
          background: rgba(212,163,115,0.3);
          border-radius: 3px;
        }
        .accordion-body::-webkit-scrollbar-thumb:hover {
          background: rgba(212,163,115,0.5);
        }
        .acc-section-title {
          font-size: 22px;
          text-align: center;
          margin-bottom: 12px;
        }
        .acc-section-subtitle {
          font-size: 15px;
          color: rgba(248,250,252,0.6);
          text-align: center;
          margin-bottom: 32px;
        }

        /* =============================================
           VALUE GRID (Original)
        ============================================= */
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .value-item {
          text-align: center;
          padding: 32px 24px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 8px;
          transition: all 0.3s;
        }
        .value-item:hover {
          transform: translateY(-4px);
          border-color: rgba(212,163,115,0.3);
        }
        .value-icon { font-size: 40px; margin-bottom: 16px; }
        .value-number {
          font-size: 40px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 8px;
        }
        .value-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(248,250,252,0.4);
          margin-bottom: 16px;
        }
        .value-item p { font-size: 14px; margin-bottom: 0; }

        /* =============================================
           QUOTES GRID (Original)
        ============================================= */
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .quote {
          border-left: 3px solid rgba(212,163,115,0.3);
          padding: 24px;
          background: rgba(212,163,115,0.02);
          border-radius: 0 8px 8px 0;
          transition: all 0.3s;
        }
        .quote:hover {
          border-left-color: #d4a373;
          background: rgba(212,163,115,0.05);
        }
        .quote p {
          font-size: 14px;
          font-style: italic;
          margin-bottom: 16px;
        }
        .quote cite {
          font-size: 12px;
          color: #d4a373;
          font-style: normal;
        }

        /* =============================================
           MISSION BLOCK (Original)
        ============================================= */
        .mission-block {
          margin-top: 60px;
          padding: 48px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 12px;
          text-align: center;
        }
        .mission-block h3 { margin-bottom: 20px; }
        .mission-statement {
          font-size: 18px;
          color: rgba(248,250,252,0.85);
          max-width: 800px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }
        .mission-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .pillar {
          padding: 28px;
          background: rgba(13,17,23,0.5);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 8px;
        }
        .pillar h4 { color: #d4a373; margin-bottom: 12px; }
        .pillar p { font-size: 14px; margin-bottom: 0; }

        /* =============================================
           PLATFORM TABS & CONTENT (Original)
        ============================================= */
        .platform-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .platform-tabs button {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          color: rgba(248,250,252,0.7);
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          transition: all 0.2s;
        }
        .platform-tabs button:hover {
          background: rgba(212,163,115,0.1);
          border-color: rgba(212,163,115,0.4);
        }
        .platform-tabs button.active {
          background: rgba(212,163,115,0.15);
          border-color: #d4a373;
          color: #d4a373;
        }
        .platform-content { margin-top: 40px; }

        /* =============================================
           FEATURE BLOCKS (Original)
        ============================================= */
        .feature-block {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          margin-bottom: 60px;
          align-items: start;
        }
        .feature-block.reverse { direction: rtl; }
        .feature-block.reverse > * { direction: ltr; }
        .feature-screenshots {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .feature-screenshots.four-shots { grid-template-columns: repeat(2, 1fr); }
        .feature-screenshots.single-shot { grid-template-columns: 1fr; }
        .screenshot {
          width: 100%;
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .screenshot:hover {
          transform: scale(1.03);
          border-color: rgba(212,163,115,0.4);
        }
        .feature-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #22c55e;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .feature-tag.patron { color: #8b5cf6; }
        .feature-tag.venue { color: #3b82f6; }
        .feature-info h3 { font-size: 28px; margin-bottom: 12px; }
        .feature-lead { font-size: 16px; margin-bottom: 28px; }
        .detail-section { margin-bottom: 20px; }
        .detail-section h4 { font-size: 15px; margin-bottom: 6px; }
        .detail-section p { font-size: 14px; margin-bottom: 0; }
        .feature-price {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 32px;
        }
        .price-tier {
          padding: 24px;
          background: rgba(13,17,23,0.5);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 8px;
        }
        .tier-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 5px 10px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 12px;
        }
        .price-tier.free .tier-badge { background: rgba(34,197,94,0.15); color: #22c55e; }
        .price-tier.trial .tier-badge { background: rgba(59,130,246,0.15); color: #3b82f6; }
        .price-tier.premium .tier-badge { background: rgba(212,163,115,0.15); color: #d4a373; }
        .tier-name { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
        .tier-name span { font-size: 13px; color: rgba(248,250,252,0.5); font-weight: 400; }
        .price-tier ul { list-style: none; }
        .price-tier li {
          font-size: 13px;
          line-height: 2;
          color: rgba(248,250,252,0.7);
          padding-left: 20px;
          position: relative;
        }
        .price-tier li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #d4a373;
        }

        /* =============================================
           DAPA SECTION (Original)
        ============================================= */
        .dapa-section {
          margin-top: 60px;
          padding: 48px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
          text-align: center;
        }
        .dapa-section h3 { margin-bottom: 12px; }
        .dapa-section > p { margin-bottom: 32px; }
        .dapa-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        .dapa-item {
          padding: 24px 16px;
          border: 1px solid rgba(212,163,115,0.12);
          background: rgba(13,17,23,0.5);
          border-radius: 8px;
          transition: all 0.3s;
        }
        .dapa-item:hover {
          transform: translateY(-4px);
          border-color: rgba(212,163,115,0.3);
        }
        .dapa-icon {
          width: 48px;
          height: 48px;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          background: rgba(212,163,115,0.1);
          border-radius: 8px;
        }
        .dapa-item h4 { font-size: 14px; margin-bottom: 6px; }
        .dapa-item p { font-size: 12px; margin-bottom: 0; }

        /* =============================================
           ARCHETYPE SECTION (Original)
        ============================================= */
        .archetype-section {
          margin-top: 60px;
          text-align: center;
        }
        .archetype-section h3 { margin-bottom: 12px; }
        .archetype-section > p { margin-bottom: 16px; }
        .click-instruction {
          font-size: 14px;
          color: #d4a373;
          margin-bottom: 32px;
        }
        .genome-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .genome-item {
          background: rgba(34,197,94,0.03);
          border: 1px solid rgba(34,197,94,0.15);
          padding: 20px 12px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .genome-item.patron {
          background: rgba(139,92,246,0.03);
          border-color: rgba(139,92,246,0.15);
        }
        .genome-item:hover, .genome-item.active {
          transform: translateY(-4px);
        }
        .genome-item.onpro:hover, .genome-item.onpro.active {
          border-color: rgba(34,197,94,0.4);
          background: rgba(34,197,94,0.08);
        }
        .genome-item.patron:hover, .genome-item.patron.active {
          border-color: rgba(139,92,246,0.4);
          background: rgba(139,92,246,0.08);
        }
        .genome-emoji { font-size: 28px; }
        .genome-name { font-size: 11px; color: rgba(248,250,252,0.7); }
        .genome-detail {
          background: rgba(34,197,94,0.05);
          border: 1px solid rgba(34,197,94,0.2);
          padding: 32px;
          border-radius: 12px;
          text-align: center;
        }
        .genome-detail.patron {
          background: rgba(139,92,246,0.05);
          border-color: rgba(139,92,246,0.2);
        }
        .genome-detail-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .genome-detail-emoji { font-size: 40px; }
        .genome-detail h4 { font-size: 24px; margin-bottom: 0; }
        .genome-detail p { margin-bottom: 20px; }
        .btn-close {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.4);
          padding: 10px 24px;
          font-size: 14px;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          transition: all 0.2s;
        }
        .btn-close:hover {
          background: rgba(212,163,115,0.08);
          border-color: #d4a373;
        }

        /* =============================================
           VENUE BENEFITS & ANALYTICS (Original)
        ============================================= */
        .venue-benefits { margin-top: 60px; text-align: center; }
        .venue-benefits h3 { margin-bottom: 32px; }
        .venue-benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .venue-benefit {
          padding: 28px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 8px;
          text-align: left;
        }
        .venue-benefit h4 { font-size: 16px; margin-bottom: 12px; }
        .venue-benefit p { font-size: 14px; margin-bottom: 0; }
        .analytics-preview {
          margin-top: 40px;
          padding: 32px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 12px;
        }
        .analytics-preview h4 { color: #d4a373; margin-bottom: 12px; }
        .analytics-preview > p { margin-bottom: 24px; }
        .analytics-list { display: grid; gap: 16px; }
        .analytics-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .analytics-icon { font-size: 24px; }
        .analytics-item strong { display: block; margin-bottom: 4px; }
        .analytics-item p { font-size: 14px; margin-bottom: 0; }

        /* =============================================
           SCIENCE BLOCKS (Original)
        ============================================= */
        .science-title {
          font-size: 32px;
          text-align: center;
          margin-bottom: 16px;
        }
        .science-subtitle {
          font-size: 18px;
          color: rgba(248,250,252,0.6);
          text-align: center;
          max-width: 700px;
          margin: 0 auto 48px;
        }
        .science-block {
          padding: 40px;
          border-radius: 12px;
          margin-bottom: 32px;
        }
        .science-block.dapa {
          background: rgba(34,197,94,0.03);
          border: 1px solid rgba(34,197,94,0.15);
        }
        .science-block.genome {
          background: rgba(139,92,246,0.03);
          border: 1px solid rgba(139,92,246,0.15);
        }
        .science-block.both {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
        }
        .science-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .science-header h4 { font-size: 24px; margin-bottom: 0; }
        .science-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          border-radius: 4px;
        }
        .science-badge.onpro { background: rgba(34,197,94,0.15); color: #22c55e; }
        .science-badge.patron { background: rgba(139,92,246,0.15); color: #8b5cf6; }
        .science-block > p { margin-bottom: 28px; }
        .science-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .science-features h5 { font-size: 15px; color: #d4a373; margin-bottom: 8px; text-transform: none; letter-spacing: 0; }
        .science-features p { font-size: 14px; margin-bottom: 0; }
        .two-systems {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 24px;
        }
        .two-systems h5 { font-size: 18px; margin-bottom: 12px; text-transform: none; letter-spacing: 0; }
        .two-systems p { font-size: 15px; }
        .science-summary {
          text-align: center;
          font-size: 16px;
          max-width: 800px;
          margin: 0 auto;
        }

        /* =============================================
           VISION SECTION (Original)
        ============================================= */
        .vision-lead {
          font-size: 22px;
          color: #d4a373;
          text-align: center;
          font-style: italic;
          margin-bottom: 48px;
        }
        .founder-intro {
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 32px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
          margin-bottom: 48px;
        }
        .founder-photo-placeholder {
          width: 100px;
          height: 100px;
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .founder-text h3 { margin-bottom: 8px; }
        .founder-tagline {
          font-size: 16px;
          color: #d4a373;
          font-weight: 500;
          margin-bottom: 0;
        }
        .vision-section { margin-bottom: 40px; }
        .vision-section h4 {
          font-size: 24px;
          color: #d4a373;
          margin-bottom: 20px;
        }
        .vision-section p { font-size: 17px; line-height: 1.8; }
        .vision-emphasis {
          font-size: 18px;
          font-weight: 500;
          color: #f8fafc;
          padding-left: 20px;
          border-left: 3px solid #d4a373;
          margin: 24px 0;
        }
        .vision-highlight {
          font-size: 17px;
          font-weight: 500;
          color: #d4a373;
          padding: 24px;
          background: rgba(212,163,115,0.05);
          border-left: 3px solid #d4a373;
          border-radius: 0 8px 8px 0;
          margin: 24px 0;
        }
        .vision-statement {
          font-size: 20px;
          color: #d4a373;
          font-weight: 600;
          text-align: center;
          margin: 24px 0;
        }
        .vision-list {
          list-style: none;
          margin: 24px 0;
        }
        .vision-list li {
          font-size: 16px;
          line-height: 1.8;
          padding-left: 24px;
          position: relative;
          margin-bottom: 16px;
        }
        .vision-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #d4a373;
        }
        .vision-list li strong { color: #f8fafc; }
        .vision-cta-block {
          text-align: center;
          padding: 48px;
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 12px;
          margin-top: 48px;
        }
        .vision-cta-block h4 { font-size: 28px; margin-bottom: 16px; }
        .cta-emphasis {
          font-size: 18px;
          color: #d4a373;
          font-weight: 600;
          margin: 24px 0;
        }
        .cta-note {
          font-size: 14px;
          color: rgba(248,250,252,0.5);
          margin-top: 16px;
        }

        /* =============================================
           FINAL CTA
        ============================================= */
        .final-cta {
          padding: 60px 24px 100px;
          background: linear-gradient(180deg, #161b22 0%, #0d1117 100%);
          text-align: center;
        }
        .final-cta p { font-size: 18px; margin-bottom: 32px; }
        .btn-primary {
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 18px 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 4px;
          font-family: inherit;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,163,115,0.2);
        }
        .btn-primary.large { padding: 20px 48px; font-size: 18px; }
        .install-btn {
          display: block;
          margin: 24px auto 0;
          background: transparent;
          color: rgba(248,250,252,0.4);
          border: 1px solid rgba(248,250,252,0.1);
          padding: 12px 24px;
          font-size: 14px;
          cursor: pointer;
          border-radius: 4px;
          font-family: inherit;
        }

        /* =============================================
           FOOTER (Original)
        ============================================= */
        .footer {
          background: #0d1117;
          border-top: 1px solid rgba(212,163,115,0.1);
          padding: 80px 24px 40px;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 50px;
        }
        .footer-logo {
          font-size: 20px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 12px;
        }
        .footer-tagline {
          font-size: 13px;
          color: rgba(248,250,252,0.5);
          margin-bottom: 8px;
        }
        .footer-location {
          font-size: 12px;
          color: rgba(248,250,252,0.4);
        }
        .footer-links {
          display: flex;
          gap: 80px;
        }
        .footer-col a {
          display: block;
          font-size: 14px;
          color: rgba(248,250,252,0.55);
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: #d4a373; }
        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid rgba(212,163,115,0.1);
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(248,250,252,0.35);
        }

        /* =============================================
           LIGHTBOX (Original)
        ============================================= */
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10,15,20,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          cursor: pointer;
        }
        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          cursor: default;
        }
        .lightbox-image {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 8px;
          border: 1px solid rgba(212,163,115,0.3);
        }
        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: transparent;
          border: none;
          color: #f8fafc;
          font-size: 32px;
          cursor: pointer;
        }

        /* =============================================
           RESPONSIVE
        ============================================= */
        @media (max-width: 1024px) {
          .feature-block { grid-template-columns: 1fr; }
          .feature-block.reverse { direction: ltr; }
          .dapa-grid, .genome-grid { grid-template-columns: repeat(3, 1fr); }
          .science-features, .two-systems { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          section { padding: 60px 20px; }
          .fixed-join-btn {
            top: auto;
            bottom: 20px;
            right: 20px;
            padding: 14px 20px;
            font-size: 13px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.4);
          }
          .sticky-venues { display: none; }
          .identity-grid { grid-template-columns: 1fr; }
          .value-grid, .quotes-grid, .mission-pillars, .venue-benefits-grid { grid-template-columns: 1fr; }
          .dapa-grid, .genome-grid { grid-template-columns: repeat(2, 1fr); }
          .email-form { flex-direction: column; }
          .form-grid { grid-template-columns: 1fr; }
          .feature-price { grid-template-columns: 1fr; }
          .founder-intro { flex-direction: column; text-align: center; }
          .footer-content { flex-direction: column; gap: 40px; }
          .footer-links { flex-direction: column; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
          .accordion-body { max-height: 50vh; }
          .emotional { padding: 48px 20px; }
          .emo-line { margin-bottom: 10px; }
          .emo-resolution { margin-top: 20px; margin-bottom: 24px; }
        }
        @media (max-width: 480px) {
          .fixed-join-btn {
            left: 20px;
            right: 20px;
            text-align: center;
          }
          .dapa-grid, .genome-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .genome-item { padding: 16px 8px; }
          .genome-emoji { font-size: 24px; }
          .genome-name { font-size: 10px; }
        }
      `}</style>
    </>
  );
}
