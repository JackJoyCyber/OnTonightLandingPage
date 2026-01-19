// pages/index.js - OnTonight Landing Page PLATINUM v2
// EXACT VISION: Emotional Hook → 2-Step Capture → Identity Cards → Accordion Deep Content
// "Your Night. Your People. Where Regulars Are Made."

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  // Core state
  const [email, setEmail] = useState('');
  const [showFullForm, setShowFullForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', userType: '', city: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Navigation & UI state
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [expandedIdentity, setExpandedIdentity] = useState(null);
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const [platformTab, setPlatformTab] = useState('onpro');
  const [lightboxImage, setLightboxImage] = useState(null);
  
  // PWA
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  
  // Refs
  const formRef = useRef(null);
  const deepContentRef = useRef(null);

  // Scroll tracking for sticky nav
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
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  // Scroll helpers
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToDeepContent = () => {
    deepContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Email step 1
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setFormData({ ...formData, email });
      setShowFullForm(true);
    }
  };

  // Full form submit
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

  // ALL 24 ARCHETYPES
  const archetypes = {
    // PATRON ARCHETYPES (12)
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
    // ONPRO ARCHETYPES (12)
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

  // Identity card data
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
      ],
      cta: 'Create OnPro Profile'
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
      ],
      cta: 'Join as Patron'
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
      ],
      cta: 'Partner With Us'
    }
  ];

  return (
    <>
      <Head>
        <title>OnTonight - Where Regulars Are Made | Hospitality Professional Platform</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry. Live now in Tampa Bay." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="page">
        {/* ========== STICKY NAV (appears on scroll) ========== */}
        <nav className={`sticky-nav ${showStickyNav ? 'visible' : ''}`}>
          <div className="sticky-inner">
            <span className="sticky-logo">OnTonight</span>
            <span className="sticky-venues">TAMPA PILOT: Haiku · Ulele · Beacon</span>
            <button onClick={scrollToForm} className="sticky-cta">Join Free →</button>
          </div>
        </nav>

        {/* ========== SECTION 1: HERO HOOK (0-5 seconds) ========== */}
        <section className="hero">
          <div className="hero-grain"></div>
          <div className="hero-glow"></div>
          
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              LIVE NOW · TAMPA BAY
            </div>
            
            <h1 className="hero-title">
              <span className="title-line">Your Night.</span>
              <span className="title-line">Your People.</span>
            </h1>
            
            <p className="hero-tagline">WHERE REGULARS ARE MADE</p>
            
            <div className="scroll-hint">
              <span className="scroll-arrow">↓</span>
              <span className="scroll-text">Scroll to discover</span>
            </div>
          </div>
        </section>

        {/* ========== SECTION 2: EMOTIONAL CONNECTION (5-12 seconds) ========== */}
        <section className="emotional">
          <div className="emotional-inner">
            <p className="emo-line line-1">You know that bartender who remembers your name?</p>
            <p className="emo-line line-2">The one who starts making your drink when you walk in?</p>
            <p className="emo-line line-3 highlight">They remember you too.</p>
            <p className="emo-line line-4">That connection shouldn't have an expiration date.</p>
            <p className="emo-resolution">Now it doesn't.</p>
          </div>
        </section>

        {/* ========== SECTION 3: SIGNUP CARD (12-15 seconds) ========== */}
        <section className="signup-section" ref={formRef}>
          <div className="signup-container">
            <h2 className="signup-title">Join the Movement</h2>
            <p className="signup-subtitle">First 2,000 members get their first year FREE</p>
            
            {!submitted ? (
              <div className="signup-card">
                {!showFullForm ? (
                  /* STEP 1: Email only */
                  <form onSubmit={handleEmailSubmit} className="email-form">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="email-input"
                    />
                    <button type="submit" className="email-btn">
                      Get Early Access →
                    </button>
                  </form>
                ) : (
                  /* STEP 2: Full details */
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

        {/* ========== SECTION 4: IDENTITY CARDS (15-30 seconds) ========== */}
        <section className="identity-section">
          <div className="container">
            <h2 className="section-heading">Which Are You?</h2>
            <p className="section-subhead">OnTonight serves everyone in the hospitality ecosystem</p>
            
            <div className="identity-grid">
              {identityCards.map((card) => (
                <div
                  key={card.id}
                  className={`identity-card ${expandedIdentity === card.id ? 'expanded' : ''}`}
                  style={{'--card-accent': card.color}}
                  onClick={() => setExpandedIdentity(expandedIdentity === card.id ? null : card.id)}
                >
                  <div className="card-top">
                    <span className="card-emoji">{card.emoji}</span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-subtitle">{card.subtitle}</p>
                    <span className="card-toggle">{expandedIdentity === card.id ? '−' : '+'}</span>
                  </div>
                  
                  {expandedIdentity === card.id && (
                    <div className="card-expanded">
                      <ul className="card-benefits">
                        {card.benefits.map((b, i) => (
                          <li key={i}><span className="benefit-arrow">→</span> {b}</li>
                        ))}
                      </ul>
                      <button
                        className="card-cta"
                        onClick={(e) => { e.stopPropagation(); scrollToForm(); }}
                      >
                        {card.cta}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button onClick={scrollToDeepContent} className="explore-btn">
              Explore the Platform ↓
            </button>
          </div>
        </section>

        {/* ========== SECTION 5: DEEP CONTENT ACCORDIONS ========== */}
        <section className="deep-section" ref={deepContentRef}>
          <div className="container">
            <h2 className="section-heading">Learn More</h2>
            <p className="section-subhead">Everything you need to know about OnTonight</p>
            
            {/* ACCORDION: The Problem */}
            <div className={`accordion ${expandedAccordion === 'problem' ? 'open' : ''}`}>
              <button className="accordion-header" onClick={() => setExpandedAccordion(expandedAccordion === 'problem' ? null : 'problem')}>
                <span className="acc-icon">📉</span>
                <span className="acc-title">The $66.8B Industry Crisis</span>
                <span className="acc-arrow">{expandedAccordion === 'problem' ? '−' : '+'}</span>
              </button>
              {expandedAccordion === 'problem' && (
                <div className="accordion-body">
                  {/* Value Props */}
                  <div className="value-grid">
                    <div className="value-card">
                      <span className="value-emoji">💰</span>
                      <span className="value-number">$24K</span>
                      <span className="value-label">Lost in Tips Per Venue Change</span>
                      <p>Average bartender loses $24,000 in regular tips when changing venues. Your regulars can't follow you. Until now.</p>
                    </div>
                    <div className="value-card">
                      <span className="value-emoji">📈</span>
                      <span className="value-number">40%</span>
                      <span className="value-label">Higher Earnings Potential</span>
                      <p>DAPA-Certified OnPros have potential to earn 40% more than industry average. Verified skills have measurable value.</p>
                    </div>
                    <div className="value-card">
                      <span className="value-emoji">🎯</span>
                      <span className="value-number">300+</span>
                      <span className="value-label">Regular Relationships</span>
                      <p>Top OnPros maintain 300+ verified regular relationships. Own your network, not the venue's.</p>
                    </div>
                  </div>
                  
                  {/* Quotes */}
                  <h4 className="quotes-heading">What Industry Leaders Are Saying</h4>
                  <div className="quotes-grid">
                    <blockquote className="quote-card">
                      <p>"The cost of turnover in hospitality is huge. Recruitment, retention, staff turnover... these are words that likely haunt the dreams of hospitality operators."</p>
                      <cite>— Institute of Hospitality, 2024</cite>
                    </blockquote>
                    <blockquote className="quote-card">
                      <p>"With 50% FOH turnover, you're replacing 7-10 servers and hosts every year. That's $7,400-$10,560+ in replacement costs alone."</p>
                      <cite>— 7shifts Restaurant Workforce Report, 2025</cite>
                    </blockquote>
                    <blockquote className="quote-card">
                      <p>"Losing a single employee can cost hospitality businesses more than $5,000 in recruiting, hiring, training and lost productivity."</p>
                      <cite>— OysterLink Industry Report, 2025</cite>
                    </blockquote>
                    <blockquote className="quote-card">
                      <p>"Reducing employee turnover by 10% can improve net profit margins by approximately 3%."</p>
                      <cite>— Gallup Workplace Report, 2025</cite>
                    </blockquote>
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION: Platform Features */}
            <div className={`accordion ${expandedAccordion === 'platform' ? 'open' : ''}`}>
              <button className="accordion-header" onClick={() => setExpandedAccordion(expandedAccordion === 'platform' ? null : 'platform')}>
                <span className="acc-icon">🚀</span>
                <span className="acc-title">Platform Features</span>
                <span className="acc-arrow">{expandedAccordion === 'platform' ? '−' : '+'}</span>
              </button>
              {expandedAccordion === 'platform' && (
                <div className="accordion-body">
                  {/* Platform Sub-tabs */}
                  <div className="platform-tabs">
                    <button className={`ptab ${platformTab === 'onpro' ? 'active' : ''}`} onClick={() => setPlatformTab('onpro')}>For OnPros</button>
                    <button className={`ptab ${platformTab === 'patron' ? 'active' : ''}`} onClick={() => setPlatformTab('patron')}>For Patrons</button>
                    <button className={`ptab ${platformTab === 'venue' ? 'active' : ''}`} onClick={() => setPlatformTab('venue')}>For Venues</button>
                    <button className={`ptab ${platformTab === 'science' ? 'active' : ''}`} onClick={() => setPlatformTab('science')}>The Science</button>
                  </div>
                  
                  {/* OnPro Content */}
                  {platformTab === 'onpro' && (
                    <div className="platform-content">
                      <div className="feature-block">
                        <div className="feature-screenshots">
                          <img src="/screenshots/onpro-assessment-dashboard.jpg" alt="DAPA Dashboard" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-assessment-dashboard.jpg')} />
                          <img src="/screenshots/onpro-skills-catagories.jpg" alt="Skills Categories" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-skills-catagories.jpg')} />
                          <img src="/screenshots/onpro-profile-status.jpg" alt="Profile Status" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-profile-status.jpg')} />
                        </div>
                        <div className="feature-info">
                          <span className="feature-tag">FOR PROFESSIONALS</span>
                          <h3>OnPro: Portable Career</h3>
                          <p>Your professional identity follows you from venue to venue. Skills verified through DAPA. Customers follow YOU, not the venue.</p>
                          
                          <div className="feature-list">
                            <div className="feature-item">
                              <strong>🎯 Verified Identity</strong>
                              <p>DAPA assessment proves expertise across 6 dimensions: Technical, Ethical, Emotional, Velocity, Commercial, Leadership.</p>
                            </div>
                            <div className="feature-item">
                              <strong>📊 Professional Genome</strong>
                              <p>Comprehensive personality profile that goes beyond skills. Share with venues to showcase your complete identity.</p>
                            </div>
                            <div className="feature-item">
                              <strong>👥 Portable Customer Base</strong>
                              <p>Your regulars follow you. Check-in tracking proves your value to any venue.</p>
                            </div>
                            <div className="feature-item">
                              <strong>📈 Career Analytics</strong>
                              <p>Track professional growth, check-in trends, regular retention, and earning potential over time.</p>
                            </div>
                          </div>
                          
                          <div className="pricing-grid">
                            <div className="price-card free">
                              <span className="price-badge">ALWAYS FREE</span>
                              <h4>OnPro Basic</h4>
                              <ul>
                                <li>Complete DAPA assessment</li>
                                <li>Professional profile</li>
                                <li>OnTonight status</li>
                                <li>Basic analytics</li>
                              </ul>
                            </div>
                            <div className="price-card premium">
                              <span className="price-badge">PREMIUM</span>
                              <h4>OnPro Pro <span>$10/mo</span></h4>
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
                      
                      {/* DAPA Grid */}
                      <div className="dapa-section">
                        <h4>DAPA Professional Assessment</h4>
                        <p>1,600+ questions across 6 professional dimensions</p>
                        <div className="dapa-grid">
                          <div className="dapa-card"><span>🎯</span><strong>Technical</strong><small>Knowledge, procedures</small></div>
                          <div className="dapa-card"><span>⚖️</span><strong>Ethical</strong><small>Integrity, judgment</small></div>
                          <div className="dapa-card"><span>💚</span><strong>Emotional</strong><small>Empathy, boundaries</small></div>
                          <div className="dapa-card"><span>⚡</span><strong>Velocity</strong><small>Speed, pressure</small></div>
                          <div className="dapa-card"><span>💰</span><strong>Commercial</strong><small>Sales, revenue</small></div>
                          <div className="dapa-card"><span>👑</span><strong>Leadership</strong><small>Team, mentoring</small></div>
                        </div>
                      </div>
                      
                      {/* OnPro Archetypes */}
                      <div className="archetype-section">
                        <h4>12 Professional Archetypes</h4>
                        <p>Discovered through DAPA assessment</p>
                        <div className="archetype-grid">
                          {Object.entries(archetypes).filter(([,a]) => a.type === 'onpro').map(([key, arch]) => (
                            <button key={key} className={`archetype-btn ${selectedArchetype === key ? 'active' : ''}`} onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}>
                              <span>{arch.emoji}</span>
                              <small>{arch.name}</small>
                            </button>
                          ))}
                        </div>
                        {selectedArchetype && archetypes[selectedArchetype]?.type === 'onpro' && (
                          <div className="archetype-detail">
                            <span className="arch-emoji">{archetypes[selectedArchetype].emoji}</span>
                            <h5>{archetypes[selectedArchetype].name}</h5>
                            <p>{archetypes[selectedArchetype].desc}</p>
                            <button onClick={() => setSelectedArchetype(null)}>Close</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Patron Content */}
                  {platformTab === 'patron' && (
                    <div className="platform-content">
                      <div className="feature-block reverse">
                        <div className="feature-screenshots grid-2x2">
                          <img src="/screenshots/patron-genome-result.jpg" alt="Genome Result" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-genome-result.jpg')} />
                          <img src="/screenshots/patron-profile.jpg" alt="Patron Profile" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-profile.jpg')} />
                          <img src="/screenshots/patron-mypeople.jpg" alt="My People" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-mypeople.jpg')} />
                          <img src="/screenshots/patron-my-spots.jpg" alt="My Spots" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-my-spots.jpg')} />
                        </div>
                        <div className="feature-info">
                          <span className="feature-tag">FOR CUSTOMERS</span>
                          <h3>Patron: Find Your People</h3>
                          <p>Follow your favorite hospitality professionals. See who's working tonight. Never lose touch when they change venues.</p>
                          
                          <div className="feature-list">
                            <div className="feature-item">
                              <strong>🔔 Real-Time Status</strong>
                              <p>See which OnPros are working right now. Get notified when they clock in.</p>
                            </div>
                            <div className="feature-item">
                              <strong>🧬 OnScene Genome</strong>
                              <p>Discover your hospitality personality. Get matched with OnPros and venues that fit your style.</p>
                            </div>
                            <div className="feature-item">
                              <strong>⭐ Check-Ins & Regulars</strong>
                              <p>Track your favorites. Build regular status. Unlock VIP treatment.</p>
                            </div>
                            <div className="feature-item">
                              <strong>🎯 Smart Matching</strong>
                              <p>Personalized recommendations based on your genome and the OnPros you follow.</p>
                            </div>
                          </div>
                          
                          <div className="pricing-grid">
                            <div className="price-card free">
                              <span className="price-badge">FREE FOREVER</span>
                              <h4>Patron Basic</h4>
                              <ul>
                                <li>Follow unlimited OnPros</li>
                                <li>Real-time status</li>
                                <li>Search venues</li>
                                <li>Basic check-ins</li>
                              </ul>
                            </div>
                            <div className="price-card premium">
                              <span className="price-badge">PREMIUM</span>
                              <h4>Patron Plus <span>$5/mo</span></h4>
                              <ul>
                                <li>Everything in Basic</li>
                                <li>OnScene Genome</li>
                                <li>Push notifications</li>
                                <li>Advanced matching</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Patron Archetypes */}
                      <div className="archetype-section">
                        <h4>12 Social Archetypes</h4>
                        <p>OnScene Genome personality profiles</p>
                        <div className="archetype-grid">
                          {Object.entries(archetypes).filter(([,a]) => a.type === 'patron').map(([key, arch]) => (
                            <button key={key} className={`archetype-btn patron ${selectedArchetype === key ? 'active' : ''}`} onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}>
                              <span>{arch.emoji}</span>
                              <small>{arch.name}</small>
                            </button>
                          ))}
                        </div>
                        {selectedArchetype && archetypes[selectedArchetype]?.type === 'patron' && (
                          <div className="archetype-detail patron">
                            <span className="arch-emoji">{archetypes[selectedArchetype].emoji}</span>
                            <h5>{archetypes[selectedArchetype].name}</h5>
                            <p>{archetypes[selectedArchetype].desc}</p>
                            <button onClick={() => setSelectedArchetype(null)}>Close</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Venue Content */}
                  {platformTab === 'venue' && (
                    <div className="platform-content">
                      <div className="feature-block">
                        <div className="feature-screenshots single">
                          <img src="/screenshots/venue-analytics-dashboard.jpg" alt="Venue Dashboard" className="screenshot large" onClick={() => setLightboxImage('/screenshots/venue-analytics-dashboard.jpg')} />
                        </div>
                        <div className="feature-info">
                          <span className="feature-tag">FOR VENUES</span>
                          <h3>Venue: Retain Talent</h3>
                          <p>Recruit DAPA-verified professionals. Showcase your team. Reduce turnover. Track staff impact.</p>
                          
                          <div className="feature-list">
                            <div className="feature-item">
                              <strong>🎯 Recruit Verified Talent</strong>
                              <p>Search DAPA-verified OnPros by skill, specialty, and availability.</p>
                            </div>
                            <div className="feature-item">
                              <strong>👥 Team Showcase</strong>
                              <p>Feature your OnPros on your profile. Attract patrons who follow your staff.</p>
                            </div>
                            <div className="feature-item">
                              <strong>📊 Staff Analytics</strong>
                              <p>Track check-ins by staff member. See which OnPros bring the most regulars.</p>
                            </div>
                            <div className="feature-item">
                              <strong>🔄 Reduce Turnover</strong>
                              <p>Compete on culture. Create a destination where talent wants to stay.</p>
                            </div>
                          </div>
                          
                          <div className="pricing-grid">
                            <div className="price-card trial">
                              <span className="price-badge">3-MONTH FREE</span>
                              <h4>Venue Starter</h4>
                              <ul>
                                <li>Complete profile</li>
                                <li>Team verification</li>
                                <li>Basic analytics</li>
                                <li>Customer check-ins</li>
                              </ul>
                            </div>
                            <div className="price-card premium">
                              <span className="price-badge">PROFESSIONAL</span>
                              <h4>Venue Pro <span>From $50/mo</span></h4>
                              <ul>
                                <li>Everything in Starter</li>
                                <li>Advanced analytics</li>
                                <li>Recruitment tools</li>
                                <li>Premium placement</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Venue Benefits */}
                      <div className="benefits-grid">
                        <div className="benefit-card">
                          <h5>🎯 Recruit With Confidence</h5>
                          <p>Access DAPA-certified professionals with verified skills across 6 dimensions.</p>
                        </div>
                        <div className="benefit-card">
                          <h5>📊 Understand Your Team</h5>
                          <p>Real-time analytics show which staff drive traffic and maintain regulars.</p>
                        </div>
                        <div className="benefit-card">
                          <h5>🌟 Attract Better Customers</h5>
                          <p>Patrons follow OnPros. Your verified talent becomes a customer acquisition engine.</p>
                        </div>
                        <div className="benefit-card">
                          <h5>💼 Compete on Culture</h5>
                          <p>Showcase expertise. Win talent wars by proving you develop careers.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Science Content */}
                  {platformTab === 'science' && (
                    <div className="platform-content">
                      <div className="science-block dapa">
                        <div className="science-header">
                          <h4>DAPA: Professional Certification</h4>
                          <span className="science-badge onpro">For OnPros</span>
                        </div>
                        <p>DAPA (Dynamic Adaptive Proficiency Assessment) is hospitality's first comprehensive professional certification. Measures technical competence AND moral judgment across 6 dimensions.</p>
                        <div className="science-features">
                          <div><strong>📐 Adaptive Algorithm</strong><p>Questions adjust in real-time. High performers face complex scenarios.</p></div>
                          <div><strong>⚖️ Moral Gradient</strong><p>Multiple "correct" answers scored differently. We measure how you think.</p></div>
                          <div><strong>🎯 Six-Axis</strong><p>Technical, Ethical, Emotional, Velocity, Commercial, Leadership.</p></div>
                          <div><strong>🔬 Validated</strong><p>1,600+ questions validated against real-world performance data.</p></div>
                        </div>
                      </div>
                      
                      <div className="science-block genome">
                        <div className="science-header">
                          <h4>OnScene Genome: Social Identity</h4>
                          <span className="science-badge patron">For Patrons</span>
                        </div>
                        <p>Maps your hospitality personality across 10 behavioral dimensions. Not demographics—how you experience and create social moments.</p>
                        <div className="science-features">
                          <div><strong>🧬 45 Questions</strong><p>"How do you behave?" not "What do you like?" We map decision patterns.</p></div>
                          <div><strong>📊 10 Dimensions</strong><p>Adventure vs. Familiarity. Solo vs. Social. Ten behavioral spectrums.</p></div>
                          <div><strong>🎯 12 Archetypes</strong><p>Distinct profiles with venue preferences and OnPro compatibility.</p></div>
                          <div><strong>🔄 Evolving</strong><p>Check-ins and interactions refine your profile over time.</p></div>
                        </div>
                      </div>
                      
                      <div className="science-combined">
                        <h4>Two Systems, One Platform</h4>
                        <div className="combined-grid">
                          <div><strong style={{color:'#22c55e'}}>DAPA (OnPro)</strong><p>Measures professional capability. Verifies skills. Creates portable identity.</p></div>
                          <div><strong style={{color:'#8b5cf6'}}>OnScene Genome (Patron)</strong><p>Measures social behavior. Matches people to experiences.</p></div>
                        </div>
                        <p className="combined-note">Together, they create a complete hospitality identity ecosystem.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ACCORDION: The Vision */}
            <div className={`accordion ${expandedAccordion === 'vision' ? 'open' : ''}`}>
              <button className="accordion-header" onClick={() => setExpandedAccordion(expandedAccordion === 'vision' ? null : 'vision')}>
                <span className="acc-icon">💡</span>
                <span className="acc-title">The Vision & Founder Story</span>
                <span className="acc-arrow">{expandedAccordion === 'vision' ? '−' : '+'}</span>
              </button>
              {expandedAccordion === 'vision' && (
                <div className="accordion-body">
                  <div className="founder-intro">
                    <div className="founder-photo">
                      <span>👤</span>
                      <small>Photo Coming</small>
                    </div>
                    <div className="founder-text">
                      <h4>Hi, I'm Jack Joy, Founder of OnTonight.</h4>
                      <p className="founder-tagline">27 years behind bars. One mission: end professional erasure in hospitality.</p>
                    </div>
                  </div>
                  
                  <div className="vision-block">
                    <h4>27 Years Behind the Bar</h4>
                    <p>Twenty-seven years in hospitality. Not watching from an office—<em>living it</em>. Behind the stick where ice never stops flowing. Managing venues where every night is opening night. Training hundreds of professionals.</p>
                    <p>I know what it means to be <em>good</em> at this work. The muscle memory that builds a perfect Manhattan in 37 seconds while defusing an argument two seats down. The emotional intelligence to spot a proposal about to happen.</p>
                    <p className="vision-emphasis">And I've watched the best people I ever trained walk out the door—starting over from zero every time. Their regulars scattered. Their reputation reset.</p>
                    <p>The industry calls this "turnover." I call it what it is: <strong>systematic professional erasure</strong>.</p>
                  </div>
                  
                  <div className="vision-block">
                    <h4>The Pattern You Can't Unsee</h4>
                    <p>Every industry has professional infrastructure except hospitality.</p>
                    <p>Lawyers switch firms, but their bar membership follows. Software engineers change companies—their GitHub stays. Real estate agents take their client databases.</p>
                    <p className="vision-highlight">But a bartender changes venues and loses everything. Every. Single. Time.</p>
                    <p>This isn't the nature of the industry. This is the <em>absence</em> of professional infrastructure.</p>
                  </div>
                  
                  <div className="vision-block">
                    <h4>What OnTonight Actually Is</h4>
                    <p className="vision-highlight">Professional infrastructure—the kind every other industry has, finally built for hospitality.</p>
                    <ul className="vision-list">
                      <li><strong>For professionals:</strong> Skills verified through DAPA. Identity portable. Customer relationships belong to YOU.</li>
                      <li><strong>For customers:</strong> Favorite bartender changes jobs? You get notified. The relationship continues.</li>
                      <li><strong>For venues:</strong> Recruit verified talent. Compete on culture instead of wages alone.</li>
                    </ul>
                  </div>
                  
                  <div className="vision-cta-block">
                    <h4>Join the Movement</h4>
                    <p>We're live in Tampa Bay, expanding to Miami, Nashville, Austin.</p>
                    <p className="vision-cta-emphasis">We're not just building software. We're building the future of hospitality careers.</p>
                    <button onClick={scrollToForm} className="vision-cta-btn">Join the Waitlist</button>
                    <small>First 2,000 get their first year free.</small>
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION: Our Mission */}
            <div className={`accordion ${expandedAccordion === 'mission' ? 'open' : ''}`}>
              <button className="accordion-header" onClick={() => setExpandedAccordion(expandedAccordion === 'mission' ? null : 'mission')}>
                <span className="acc-icon">🎯</span>
                <span className="acc-title">Our Mission</span>
                <span className="acc-arrow">{expandedAccordion === 'mission' ? '−' : '+'}</span>
              </button>
              {expandedAccordion === 'mission' && (
                <div className="accordion-body">
                  <p className="mission-statement">OnTonight is building professional infrastructure for hospitality. We're professionalizing an entire industry by giving workers portable careers, customers the ability to follow their people, and venues tools to showcase talent.</p>
                  <div className="mission-pillars">
                    <div className="pillar">
                      <h5>For Professionals</h5>
                      <p>Own your career. Skills, regulars, identity—portable across venues.</p>
                    </div>
                    <div className="pillar">
                      <h5>For Customers</h5>
                      <p>Follow your people. Never lose touch with favorite bartenders again.</p>
                    </div>
                    <div className="pillar">
                      <h5>For Venues</h5>
                      <p>Compete on culture. Attract verified talent. Prove your team's value.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========== SECTION 6: FINAL CTA ========== */}
        <section className="final-cta">
          <div className="container">
            <h2>Ready to Join?</h2>
            <p>First 2,000 members get their first year FREE</p>
            <button onClick={scrollToForm} className="final-btn">Join the Movement →</button>
            {showInstallPrompt && (
              <button onClick={handleInstall} className="install-btn">📱 Add to Home Screen</button>
            )}
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-brand">
                <span className="footer-logo">OnTonight</span>
                <p>Where Regulars Are Made</p>
                <small>Live Now · Tampa Bay → Miami · Nashville · Austin</small>
              </div>
              <div className="footer-links">
                <div className="link-col">
                  <h6>Platform</h6>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For OnPros</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For Patrons</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For Venues</a>
                </div>
                <div className="link-col">
                  <h6>Company</h6>
                  <a href="https://app.on-tonight.com/privacy">Privacy</a>
                  <a href="https://app.on-tonight.com/terms">Terms</a>
                  <a href="/contact">Contact</a>
                </div>
                <div className="link-col">
                  <h6>Connect</h6>
                  <a href="/support">Support</a>
                  <a href="/media">Media</a>
                  <a href="/partner">Partner</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 OnTonight LLC. All rights reserved. 18+ only.</p>
            </div>
          </div>
        </footer>

        {/* ========== LIGHTBOX ========== */}
        {lightboxImage && (
          <div className="lightbox" onClick={() => setLightboxImage(null)}>
            <button className="lightbox-close">✕</button>
            <img src={lightboxImage} alt="Screenshot" />
          </div>
        )}
      </div>

      <style jsx>{`
        /* ===== BASE ===== */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .page {
          background: #000;
          color: #f8fafc;
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ===== STICKY NAV ===== */
        .sticky-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.85);
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
          font-weight: 700;
          color: #d4a373;
        }
        .sticky-venues {
          font-size: 12px;
          color: rgba(248,250,252,0.5);
          letter-spacing: 0.05em;
        }
        .sticky-cta {
          background: #d4a373;
          color: #000;
          border: none;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .sticky-cta:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(212,163,115,0.3); }

        /* ===== HERO ===== */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .hero-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
        }
        .hero-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212,163,115,0.08) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        .hero-content {
          text-align: center;
          z-index: 1;
          padding: 24px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.3);
          padding: 10px 20px;
          border-radius: 100px;
          margin-bottom: 48px;
        }
        .badge-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .hero-title {
          font-size: clamp(48px, 10vw, 80px);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        .title-line { display: block; }
        .hero-tagline {
          font-size: clamp(14px, 3vw, 20px);
          font-weight: 600;
          letter-spacing: 0.25em;
          background: linear-gradient(90deg, #d4a373, #f4d3a3, #d4a373);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          margin-bottom: 80px;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: bounce 2s infinite;
        }
        .scroll-arrow {
          font-size: 28px;
          color: rgba(212,163,115,0.6);
        }
        .scroll-text {
          font-size: 12px;
          color: rgba(248,250,252,0.4);
          letter-spacing: 0.1em;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        /* ===== EMOTIONAL ===== */
        .emotional {
          padding: 120px 24px;
          background: linear-gradient(180deg, #000 0%, #0a0a0f 100%);
        }
        .emotional-inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .emo-line {
          font-size: clamp(18px, 4vw, 26px);
          font-weight: 300;
          color: rgba(248,250,252,0.7);
          line-height: 1.6;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
        }
        .line-1 { animation-delay: 0.2s; }
        .line-2 { animation-delay: 0.5s; }
        .line-3 { animation-delay: 0.8s; }
        .line-4 { animation-delay: 1.1s; }
        .emo-line.highlight {
          color: #f8fafc;
          font-weight: 500;
          font-size: clamp(22px, 5vw, 32px);
        }
        .emo-resolution {
          font-size: clamp(28px, 6vw, 42px);
          font-weight: 700;
          color: #d4a373;
          margin-top: 48px;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 1.4s;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== SIGNUP ===== */
        .signup-section {
          padding: 100px 24px;
          background: #0a0a0f;
        }
        .signup-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .signup-title {
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .signup-subtitle {
          font-size: 18px;
          color: #d4a373;
          margin-bottom: 40px;
        }
        .signup-card {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          backdrop-filter: blur(20px);
          padding: 48px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .email-form {
          display: flex;
          gap: 12px;
        }
        .email-input {
          flex: 1;
          padding: 18px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 8px;
          color: #f8fafc;
          font-size: 16px;
          font-family: inherit;
        }
        .email-input:focus {
          outline: none;
          border-color: #d4a373;
          box-shadow: 0 0 0 3px rgba(212,163,115,0.1);
        }
        .email-btn {
          background: #d4a373;
          color: #000;
          border: none;
          padding: 18px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          white-space: nowrap;
          transition: all 0.2s;
          animation: glow 2s infinite;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(212,163,115,0.3); }
          50% { box-shadow: 0 0 30px rgba(212,163,115,0.5); }
        }
        .email-btn:hover {
          transform: translateY(-2px);
        }
        .full-form { text-align: left; }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        .form-grid input, .form-grid select {
          width: 100%;
          padding: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 8px;
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
          margin-bottom: 20px;
        }
        .submit-btn {
          width: 100%;
          background: #d4a373;
          color: #000;
          border: none;
          padding: 18px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .success-card {
          padding: 48px;
          background: rgba(34,197,94,0.05);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 16px;
        }
        .success-icon { font-size: 56px; margin-bottom: 16px; }
        .success-card h3 { color: #22c55e; margin-bottom: 8px; }
        .signup-note {
          font-size: 14px;
          color: rgba(248,250,252,0.4);
          margin-top: 24px;
        }

        /* ===== IDENTITY CARDS ===== */
        .identity-section {
          padding: 100px 24px;
          background: linear-gradient(180deg, #0a0a0f 0%, #0d1117 100%);
        }
        .section-heading {
          text-align: center;
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .section-subhead {
          text-align: center;
          font-size: 18px;
          color: rgba(248,250,252,0.6);
          margin-bottom: 56px;
        }
        .identity-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }
        .identity-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }
        .identity-card:hover {
          transform: translateY(-8px);
          border-color: var(--card-accent);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .identity-card.expanded {
          border-color: var(--card-accent);
          background: rgba(255,255,255,0.04);
        }
        .card-top { text-align: center; }
        .card-emoji { font-size: 48px; display: block; margin-bottom: 16px; }
        .card-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .card-subtitle { font-size: 14px; color: rgba(248,250,252,0.5); }
        .card-toggle {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 24px;
          color: rgba(248,250,252,0.3);
        }
        .card-expanded {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .card-benefits {
          list-style: none;
          text-align: left;
          margin-bottom: 20px;
        }
        .card-benefits li {
          font-size: 14px;
          color: rgba(248,250,252,0.75);
          padding: 8px 0;
          display: flex;
          gap: 8px;
        }
        .benefit-arrow { color: var(--card-accent); }
        .card-cta {
          width: 100%;
          background: var(--card-accent);
          color: #000;
          border: none;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .card-cta:hover { opacity: 0.9; }
        .explore-btn {
          display: block;
          margin: 0 auto;
          background: transparent;
          color: rgba(248,250,252,0.5);
          border: 1px solid rgba(248,250,252,0.15);
          padding: 16px 32px;
          font-size: 15px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .explore-btn:hover { color: #d4a373; border-color: rgba(212,163,115,0.4); }

        /* ===== DEEP CONTENT / ACCORDIONS ===== */
        .deep-section {
          padding: 100px 24px;
          background: #0d1117;
        }
        .accordion {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        .accordion.open { border-color: rgba(212,163,115,0.25); }
        .accordion-header {
          width: 100%;
          background: transparent;
          border: none;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          text-align: left;
        }
        .acc-icon { font-size: 24px; }
        .acc-title { flex: 1; font-size: 18px; font-weight: 600; color: #f8fafc; }
        .acc-arrow { font-size: 24px; color: #d4a373; }
        .accordion-body {
          padding: 0 24px 24px;
          animation: slideDown 0.3s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Value Grid */
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }
        .value-card {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
          padding: 28px;
          text-align: center;
        }
        .value-emoji { font-size: 40px; display: block; margin-bottom: 12px; }
        .value-number { font-size: 40px; font-weight: 700; color: #d4a373; display: block; }
        .value-label { font-size: 12px; color: rgba(248,250,252,0.5); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 12px; }
        .value-card p { font-size: 14px; color: rgba(248,250,252,0.65); line-height: 1.6; }

        /* Quotes */
        .quotes-heading { font-size: 20px; margin-bottom: 24px; }
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .quote-card {
          border-left: 3px solid rgba(212,163,115,0.3);
          padding: 20px;
          background: rgba(212,163,115,0.02);
          border-radius: 0 8px 8px 0;
        }
        .quote-card p { font-size: 14px; font-style: italic; color: rgba(248,250,252,0.7); line-height: 1.6; margin-bottom: 12px; }
        .quote-card cite { font-size: 12px; color: #d4a373; font-style: normal; }

        /* Platform Tabs */
        .platform-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .ptab {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.15);
          color: rgba(248,250,252,0.7);
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .ptab:hover { background: rgba(212,163,115,0.1); }
        .ptab.active { background: rgba(212,163,115,0.15); border-color: #d4a373; color: #d4a373; }

        /* Feature Block */
        .feature-block {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .feature-block.reverse { direction: rtl; }
        .feature-block.reverse > * { direction: ltr; }
        .feature-screenshots {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .feature-screenshots.grid-2x2 { grid-template-columns: repeat(2, 1fr); }
        .feature-screenshots.single { grid-template-columns: 1fr; }
        .screenshot {
          width: 100%;
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .screenshot:hover { transform: scale(1.03); border-color: rgba(212,163,115,0.4); }
        .screenshot.large { max-width: 500px; }
        .feature-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #d4a373; margin-bottom: 8px; }
        .feature-info h3 { font-size: 28px; margin-bottom: 12px; }
        .feature-info > p { font-size: 16px; color: rgba(248,250,252,0.7); margin-bottom: 24px; }
        .feature-list { margin-bottom: 24px; }
        .feature-item { margin-bottom: 16px; }
        .feature-item strong { font-size: 14px; display: block; margin-bottom: 4px; }
        .feature-item p { font-size: 14px; color: rgba(248,250,252,0.6); line-height: 1.5; }

        /* Pricing */
        .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .price-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 24px;
        }
        .price-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          border-radius: 4px;
          margin-bottom: 12px;
        }
        .price-card.free .price-badge { background: rgba(34,197,94,0.15); color: #22c55e; }
        .price-card.trial .price-badge { background: rgba(59,130,246,0.15); color: #3b82f6; }
        .price-card.premium .price-badge { background: rgba(212,163,115,0.15); color: #d4a373; }
        .price-card h4 { font-size: 18px; margin-bottom: 12px; }
        .price-card h4 span { font-size: 14px; font-weight: 400; color: rgba(248,250,252,0.5); }
        .price-card ul { list-style: none; }
        .price-card li { font-size: 14px; color: rgba(248,250,252,0.65); padding: 6px 0; padding-left: 20px; position: relative; }
        .price-card li::before { content: '✓'; position: absolute; left: 0; color: #d4a373; }

        /* DAPA Section */
        .dapa-section { margin-top: 48px; text-align: center; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.08); }
        .dapa-section h4 { font-size: 24px; margin-bottom: 8px; }
        .dapa-section > p { font-size: 16px; color: rgba(248,250,252,0.6); margin-bottom: 32px; }
        .dapa-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
        .dapa-card {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
          padding: 20px 12px;
          text-align: center;
        }
        .dapa-card span { font-size: 28px; display: block; margin-bottom: 8px; }
        .dapa-card strong { font-size: 13px; display: block; margin-bottom: 4px; }
        .dapa-card small { font-size: 11px; color: rgba(248,250,252,0.5); }

        /* Archetype Section */
        .archetype-section { margin-top: 48px; text-align: center; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.08); }
        .archetype-section h4 { font-size: 24px; margin-bottom: 8px; }
        .archetype-section > p { font-size: 16px; color: rgba(248,250,252,0.6); margin-bottom: 24px; }
        .archetype-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 24px; }
        .archetype-btn {
          background: rgba(34,197,94,0.03);
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 12px;
          padding: 16px 8px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
        }
        .archetype-btn.patron { background: rgba(139,92,246,0.03); border-color: rgba(139,92,246,0.15); }
        .archetype-btn:hover, .archetype-btn.active { transform: translateY(-4px); }
        .archetype-btn:hover, .archetype-btn.active { border-color: rgba(34,197,94,0.4); background: rgba(34,197,94,0.08); }
        .archetype-btn.patron:hover, .archetype-btn.patron.active { border-color: rgba(139,92,246,0.4); background: rgba(139,92,246,0.08); }
        .archetype-btn span { font-size: 28px; display: block; margin-bottom: 6px; }
        .archetype-btn small { font-size: 11px; color: rgba(248,250,252,0.7); }
        .archetype-detail {
          background: rgba(34,197,94,0.05);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
        }
        .archetype-detail.patron { background: rgba(139,92,246,0.05); border-color: rgba(139,92,246,0.2); }
        .arch-emoji { font-size: 48px; display: block; margin-bottom: 12px; }
        .archetype-detail h5 { font-size: 24px; margin-bottom: 12px; }
        .archetype-detail p { font-size: 16px; color: rgba(248,250,252,0.75); margin-bottom: 20px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .archetype-detail button {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(248,250,252,0.7);
          padding: 10px 24px;
          cursor: pointer;
          border-radius: 6px;
        }

        /* Benefits Grid */
        .benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 48px; }
        .benefit-card {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
          padding: 24px;
        }
        .benefit-card h5 { font-size: 16px; margin-bottom: 8px; }
        .benefit-card p { font-size: 14px; color: rgba(248,250,252,0.65); }

        /* Science Blocks */
        .science-block {
          padding: 32px;
          border-radius: 12px;
          margin-bottom: 24px;
        }
        .science-block.dapa { background: rgba(34,197,94,0.03); border: 1px solid rgba(34,197,94,0.15); }
        .science-block.genome { background: rgba(139,92,246,0.03); border: 1px solid rgba(139,92,246,0.15); }
        .science-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
        .science-header h4 { font-size: 24px; }
        .science-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 6px 12px; border-radius: 4px; }
        .science-badge.onpro { background: rgba(34,197,94,0.15); color: #22c55e; }
        .science-badge.patron { background: rgba(139,92,246,0.15); color: #8b5cf6; }
        .science-block > p { font-size: 16px; color: rgba(248,250,252,0.7); margin-bottom: 24px; }
        .science-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .science-features div strong { font-size: 14px; display: block; margin-bottom: 4px; color: #d4a373; }
        .science-features div p { font-size: 14px; color: rgba(248,250,252,0.6); }
        .science-combined {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
        }
        .science-combined h4 { font-size: 24px; margin-bottom: 24px; }
        .combined-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; text-align: left; margin-bottom: 24px; }
        .combined-grid strong { font-size: 16px; display: block; margin-bottom: 8px; }
        .combined-grid p { font-size: 15px; color: rgba(248,250,252,0.7); }
        .combined-note { font-size: 16px; color: rgba(248,250,252,0.8); }

        /* Founder */
        .founder-intro {
          display: flex;
          align-items: center;
          gap: 24px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 48px;
        }
        .founder-photo {
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
        .founder-photo span { font-size: 40px; }
        .founder-photo small { font-size: 10px; color: rgba(212,163,115,0.7); }
        .founder-text h4 { font-size: 22px; margin-bottom: 8px; }
        .founder-tagline { font-size: 16px; color: #d4a373; font-weight: 500; }
        .vision-block { margin-bottom: 40px; }
        .vision-block h4 { font-size: 24px; color: #d4a373; margin-bottom: 16px; }
        .vision-block p { font-size: 16px; color: rgba(248,250,252,0.75); line-height: 1.8; margin-bottom: 16px; }
        .vision-emphasis {
          font-size: 18px;
          font-weight: 500;
          color: #f8fafc;
          padding-left: 20px;
          border-left: 3px solid #d4a373;
          margin: 24px 0;
        }
        .vision-highlight {
          background: rgba(212,163,115,0.05);
          border-left: 3px solid #d4a373;
          padding: 20px;
          font-size: 18px;
          color: #d4a373;
          font-weight: 600;
          margin: 24px 0;
          border-radius: 0 8px 8px 0;
        }
        .vision-list { list-style: none; margin: 20px 0; }
        .vision-list li { font-size: 15px; color: rgba(248,250,252,0.8); padding: 10px 0 10px 24px; position: relative; }
        .vision-list li::before { content: '→'; position: absolute; left: 0; color: #d4a373; }
        .vision-list strong { color: #f8fafc; }
        .vision-cta-block {
          text-align: center;
          padding: 40px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 16px;
          margin-top: 48px;
        }
        .vision-cta-block h4 { font-size: 28px; margin-bottom: 12px; }
        .vision-cta-block p { font-size: 16px; color: rgba(248,250,252,0.7); }
        .vision-cta-emphasis { color: #d4a373; font-weight: 600; margin: 20px 0; }
        .vision-cta-btn {
          background: #d4a373;
          color: #000;
          border: none;
          padding: 16px 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .vision-cta-block small { font-size: 14px; color: rgba(248,250,252,0.5); display: block; }

        /* Mission */
        .mission-statement {
          font-size: 18px;
          color: rgba(248,250,252,0.85);
          text-align: center;
          line-height: 1.8;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .mission-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pillar {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
          padding: 28px;
          text-align: center;
        }
        .pillar h5 { font-size: 16px; color: #d4a373; margin-bottom: 12px; }
        .pillar p { font-size: 14px; color: rgba(248,250,252,0.65); }

        /* ===== FINAL CTA ===== */
        .final-cta {
          padding: 100px 24px;
          background: linear-gradient(180deg, #0d1117 0%, #000 100%);
          text-align: center;
        }
        .final-cta h2 { font-size: 40px; margin-bottom: 12px; }
        .final-cta p { font-size: 18px; color: rgba(248,250,252,0.7); margin-bottom: 32px; }
        .final-btn {
          background: #d4a373;
          color: #000;
          border: none;
          padding: 20px 48px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .final-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(212,163,115,0.3); }
        .install-btn {
          display: block;
          margin: 24px auto 0;
          background: transparent;
          color: rgba(248,250,252,0.4);
          border: 1px solid rgba(248,250,252,0.1);
          padding: 12px 24px;
          cursor: pointer;
          border-radius: 6px;
        }

        /* ===== FOOTER ===== */
        .footer {
          background: #000;
          border-top: 1px solid rgba(212,163,115,0.1);
          padding: 60px 24px 24px;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .footer-logo { font-size: 24px; font-weight: 700; color: #d4a373; }
        .footer-brand p { font-size: 14px; color: rgba(248,250,252,0.6); margin: 8px 0 4px; }
        .footer-brand small { font-size: 12px; color: rgba(248,250,252,0.4); }
        .footer-links { display: flex; gap: 60px; }
        .link-col h6 { font-size: 11px; color: rgba(248,250,252,0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
        .link-col a { display: block; font-size: 14px; color: rgba(248,250,252,0.6); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
        .link-col a:hover { color: #d4a373; }
        .footer-bottom {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-bottom p { font-size: 12px; color: rgba(248,250,252,0.35); }

        /* ===== LIGHTBOX ===== */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          cursor: pointer;
          padding: 24px;
        }
        .lightbox-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 32px;
          cursor: pointer;
        }
        .lightbox img {
          max-width: 90%;
          max-height: 90vh;
          border-radius: 12px;
          border: 1px solid rgba(212,163,115,0.3);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .feature-block { grid-template-columns: 1fr; }
          .feature-block.reverse { direction: ltr; }
          .dapa-grid, .archetype-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .sticky-venues { display: none; }
          .identity-grid { grid-template-columns: 1fr; }
          .value-grid, .quotes-grid, .benefits-grid, .pricing-grid, .mission-pillars { grid-template-columns: 1fr; }
          .dapa-grid, .archetype-grid { grid-template-columns: repeat(2, 1fr); }
          .email-form { flex-direction: column; }
          .form-grid { grid-template-columns: 1fr; }
          .science-features, .combined-grid { grid-template-columns: 1fr; }
          .founder-intro { flex-direction: column; text-align: center; }
          .footer-top { flex-direction: column; gap: 40px; }
          .footer-links { flex-direction: column; gap: 24px; }
        }
      `}</style>
    </>
  );
}
