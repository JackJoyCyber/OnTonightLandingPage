// pages/index.js - OnTonight Landing Page PLATINUM EDITION
// "Your Night. Your People. Where Regulars Are Made."
// Emotional Hook → Instant Conversion → Deep Content (Progressive Disclosure)

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
  
  // Navigation state
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedIdentity, setSelectedIdentity] = useState(null);
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const [platformTab, setPlatformTab] = useState('onpro');
  const [lightboxImage, setLightboxImage] = useState(null);
  
  // PWA install
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  
  // Refs
  const formRef = useRef(null);
  const deepContentRef = useRef(null);

  // Scroll tracking for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > window.innerHeight * 0.7);
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

  // Scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Scroll to deep content
  const scrollToDeepContent = () => {
    deepContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Email step 1 handler
  const handleEmailStep1 = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setFormData({ ...formData, email });
      setShowFullForm(true);
    }
  };

  // Full form submit
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

  // ALL ARCHETYPES (preserved from production)
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

  // Identity card data
  const identityCards = {
    onpro: {
      emoji: '🍸',
      title: 'I\'m a Hospitality Professional',
      subtitle: 'Bartender, Server, Sommelier, Chef, DJ...',
      benefits: [
        'Own your professional identity',
        'Take your regulars with you',
        'Get DAPA-certified',
        'Build portable career equity'
      ],
      cta: 'Create OnPro Profile',
      color: 'rgba(34, 197, 94, 1)'
    },
    patron: {
      emoji: '🥂',
      title: 'I\'m a Guest',
      subtitle: 'I follow great hospitality people',
      benefits: [
        'Never lose your favorite bartender',
        'Get notified when they work',
        'Discover your OnScene Genome',
        'Build regular status anywhere'
      ],
      cta: 'Join as Patron',
      color: 'rgba(139, 92, 246, 1)'
    },
    venue: {
      emoji: '🏢',
      title: 'I Own/Manage a Venue',
      subtitle: 'Restaurant, Bar, Hotel, Club...',
      benefits: [
        'Recruit verified talent',
        'Reduce turnover costs',
        'Showcase your team',
        'Track staff-driven traffic'
      ],
      cta: 'Partner With Us',
      color: 'rgba(59, 130, 246, 1)'
    }
  };

  return (
    <>
      <Head>
        <title>OnTonight - Where Regulars Are Made | Hospitality Professional Platform</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry. Live now in Tampa Bay." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="page">
        {/* ============================================ */}
        {/* STICKY NAV BAR - Appears on scroll */}
        {/* ============================================ */}
        <nav className={`sticky-nav ${showStickyBar ? 'visible' : ''}`}>
          <div className="sticky-nav-content">
            <div className="sticky-logo">OnTonight</div>
            <div className="sticky-venues">LIVE NOW · Tampa Bay</div>
            <button onClick={scrollToForm} className="sticky-cta">Join Free →</button>
          </div>
        </nav>

        {/* ============================================ */}
        {/* LAYER 1: THE HOOK (0-3 seconds) */}
        {/* ============================================ */}
        <section className="hero-hook">
          <div className="hero-glow"></div>
          <div className="hero-grain"></div>
          
          <div className="hook-content">
            <div className="hook-badge">LIVE NOW · TAMPA BAY</div>
            
            <h1 className="hook-title">
              <span className="title-line">Your Night.</span>
              <span className="title-line">Your People.</span>
            </h1>
            
            <p className="hook-tagline">WHERE REGULARS ARE MADE</p>
            
            <div className="scroll-indicator">
              <span>↓</span>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* LAYER 2: EMOTIONAL CONNECTION (3-8 seconds) */}
        {/* ============================================ */}
        <section className="emotional-hook">
          <div className="emotional-content">
            <p className="emotional-line fade-in">
              You know that bartender who remembers your name?
            </p>
            <p className="emotional-line fade-in delay-1">
              The one who starts making your drink when you walk in?
            </p>
            <p className="emotional-line fade-in delay-2 emphasis">
              They remember you too.
            </p>
            <p className="emotional-line fade-in delay-3">
              That connection shouldn't have an expiration date.
            </p>
            <p className="emotional-resolution fade-in delay-4">
              Now it doesn't.
            </p>
          </div>
        </section>

        {/* ============================================ */}
        {/* LAYER 3: INSTANT ACTION (8-15 seconds) */}
        {/* ============================================ */}
        <section className="instant-action" ref={formRef}>
          <div className="action-container">
            <h2 className="action-title">Join the Movement</h2>
            <p className="action-subtitle">First 2,000 members get their first year FREE</p>
            
            {!submitted ? (
              <div className="signup-card">
                {!showFullForm ? (
                  // STEP 1: Email only
                  <form onSubmit={handleEmailStep1} className="email-step">
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
                  // STEP 2: Full form
                  <form onSubmit={handleSubmit} className="full-form">
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
                        <option value="onpro">OnPro (Bartender, Server, etc.)</option>
                        <option value="patron">Patron (Guest)</option>
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
                    <p className="form-disclaimer">
                      By submitting, you confirm you are 18+ and agree to receive email communications from OnTonight.
                    </p>
                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? 'Joining...' : 'Complete Signup'}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="success-card">
                <div className="success-icon">🎉</div>
                <h3>Welcome to the Movement</h3>
                <p>Check your email for next steps. Your first year is FREE.</p>
              </div>
            )}
            
            <p className="action-note">No credit card required · Cancel anytime</p>
          </div>
        </section>

        {/* ============================================ */}
        {/* LAYER 4: IDENTITY CARDS (15-30 seconds) */}
        {/* ============================================ */}
        <section className="identity-section">
          <div className="container">
            <h2 className="identity-title">Which Are You?</h2>
            <p className="identity-subtitle">OnTonight serves everyone in the hospitality ecosystem</p>
            
            <div className="identity-cards">
              {Object.entries(identityCards).map(([key, card]) => (
                <div 
                  key={key}
                  className={`identity-card ${selectedIdentity === key ? 'expanded' : ''}`}
                  onClick={() => setSelectedIdentity(selectedIdentity === key ? null : key)}
                  style={{ '--card-color': card.color }}
                >
                  <div className="card-header">
                    <span className="card-emoji">{card.emoji}</span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-subtitle">{card.subtitle}</p>
                  </div>
                  
                  {selectedIdentity === key && (
                    <div className="card-expanded">
                      <ul className="card-benefits">
                        {card.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                      <button 
                        onClick={(e) => { e.stopPropagation(); scrollToForm(); }}
                        className="card-cta"
                      >
                        {card.cta}
                      </button>
                    </div>
                  )}
                  
                  <span className="card-expand-hint">
                    {selectedIdentity === key ? '−' : '+'}
                  </span>
                </div>
              ))}
            </div>
            
            <button onClick={scrollToDeepContent} className="learn-more-btn">
              Learn More About The Platform ↓
            </button>
          </div>
        </section>

        {/* ============================================ */}
        {/* LAYER 5: HOW IT WORKS - Quick Overview */}
        {/* ============================================ */}
        <section className="how-section">
          <div className="container">
            <h2>How OnTonight Works</h2>
            <p className="section-subtitle">Professional infrastructure for hospitality—finally.</p>
            
            <div className="how-grid">
              <div className="how-item">
                <div className="how-number">1</div>
                <h4>Create Your Identity</h4>
                <p>OnPros build verified professional profiles. Patrons discover their OnScene Genome. Venues showcase their teams.</p>
              </div>
              <div className="how-item">
                <div className="how-number">2</div>
                <h4>Connect & Follow</h4>
                <p>Patrons follow their favorite bartenders, servers, and sommeliers. Get notified when they're working.</p>
              </div>
              <div className="how-item">
                <div className="how-number">3</div>
                <h4>Build Relationships</h4>
                <p>Check-ins build regular status. OnPros maintain customer relationships across venues. Everyone wins.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* LAYER 6: DEEP CONTENT - Accordions */}
        {/* ============================================ */}
        <section className="deep-content" ref={deepContentRef}>
          <div className="container">
            <h2 className="deep-title">Explore The Platform</h2>
            <p className="deep-subtitle">Everything you need to know about OnTonight</p>
            
            {/* ACCORDION: THE PROBLEM */}
            <div className={`accordion ${expandedSection === 'problem' ? 'expanded' : ''}`}>
              <button 
                className="accordion-header"
                onClick={() => setExpandedSection(expandedSection === 'problem' ? null : 'problem')}
              >
                <span className="accordion-icon">📉</span>
                <span className="accordion-title">The $66.8B Industry Crisis</span>
                <span className="accordion-arrow">{expandedSection === 'problem' ? '−' : '+'}</span>
              </button>
              
              {expandedSection === 'problem' && (
                <div className="accordion-content">
                  {/* VALUE PROPS */}
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
                  
                  {/* CRISIS QUOTES */}
                  <h3 style={{marginTop: '60px', marginBottom: '32px'}}>What Industry Leaders Are Saying</h3>
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
                      <p>"Losing a single employee can cost hospitality businesses more than $5,000 in recruiting, hiring, training and lost productivity."</p>
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
              )}
            </div>

            {/* ACCORDION: PLATFORM */}
            <div className={`accordion ${expandedSection === 'platform' ? 'expanded' : ''}`}>
              <button 
                className="accordion-header"
                onClick={() => setExpandedSection(expandedSection === 'platform' ? null : 'platform')}
              >
                <span className="accordion-icon">🚀</span>
                <span className="accordion-title">Platform Features</span>
                <span className="accordion-arrow">{expandedSection === 'platform' ? '−' : '+'}</span>
              </button>
              
              {expandedSection === 'platform' && (
                <div className="accordion-content">
                  {/* PLATFORM SUB-TABS */}
                  <div className="platform-tabs">
                    <button 
                      className={`platform-tab ${platformTab === 'onpro' ? 'active' : ''}`}
                      onClick={() => setPlatformTab('onpro')}
                    >
                      For OnPros
                    </button>
                    <button 
                      className={`platform-tab ${platformTab === 'patron' ? 'active' : ''}`}
                      onClick={() => setPlatformTab('patron')}
                    >
                      For Patrons
                    </button>
                    <button 
                      className={`platform-tab ${platformTab === 'venue' ? 'active' : ''}`}
                      onClick={() => setPlatformTab('venue')}
                    >
                      For Venues
                    </button>
                    <button 
                      className={`platform-tab ${platformTab === 'science' ? 'active' : ''}`}
                      onClick={() => setPlatformTab('science')}
                    >
                      The Science
                    </button>
                  </div>
                  
                  {/* ONPRO FEATURE */}
                  {platformTab === 'onpro' && (
                    <div className="platform-content">
                      <div className="feature">
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
                              <p>DAPA assessment proves your expertise across 6 dimensions: Technical, Ethical, Emotional Intelligence, Velocity, Commercial, and Leadership.</p>
                            </div>
                            <div className="detail-section">
                              <h4>📊 Professional Genome</h4>
                              <p>Comprehensive personality profile that goes beyond skills. Share with venues to showcase your complete professional identity.</p>
                            </div>
                            <div className="detail-section">
                              <h4>👥 Portable Customer Base</h4>
                              <p>Your regulars follow you. Check-in tracking and relationship management prove your value to any venue.</p>
                            </div>
                            <div className="detail-section">
                              <h4>📈 Career Analytics</h4>
                              <p>Track your professional growth. See your check-in trends, regular retention, and earning potential over time.</p>
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
                      
                      {/* DAPA SKILLS ASSESSMENT */}
                      <div className="dapa-section">
                        <h3>DAPA Professional Assessment</h3>
                        <p className="section-subtitle">The industry's only comprehensive skills verification system. 1,600+ questions across 6 professional dimensions.</p>
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
                      
                      {/* ONPRO ARCHETYPES */}
                      <div className="archetypes-section">
                        <h3>Professional Archetypes</h3>
                        <p className="section-subtitle">12 professional personality profiles discovered through DAPA assessment.</p>
                        <p className="click-instruction">Click any archetype to learn more →</p>
                        <div className="genome-grid">
                          {Object.entries(archetypes).filter(([key, arch]) => arch.type === 'onpro').map(([key, arch]) => (
                            <button
                              key={key}
                              className={`genome-item ${selectedArchetype === key ? 'active' : ''} ${arch.type}`}
                              onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}
                            >
                              <span className="genome-emoji">{arch.emoji}</span>
                              <span className="genome-name">{arch.name}</span>
                            </button>
                          ))}
                        </div>
                        {selectedArchetype && archetypes[selectedArchetype]?.type === 'onpro' && (
                          <div className="genome-detail">
                            <div className="genome-detail-header">
                              <span className="genome-detail-emoji">{archetypes[selectedArchetype].emoji}</span>
                              <h3>{archetypes[selectedArchetype].name}</h3>
                            </div>
                            <p>{archetypes[selectedArchetype].desc}</p>
                            <button onClick={() => setSelectedArchetype(null)} className="btn-close">Close</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PATRON FEATURE */}
                  {platformTab === 'patron' && (
                    <div className="platform-content">
                      <div className="feature feature-reverse">
                        <div className="feature-screenshots four-shots">
                          <img src="/screenshots/patron-genome-result.jpg" alt="Patron OnScene Genome Result" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-genome-result.jpg')} />
                          <img src="/screenshots/patron-profile.jpg" alt="Patron Profile" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-profile.jpg')} />
                          <img src="/screenshots/patron-mypeople.jpg" alt="Patron MyPeople Status" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-mypeople.jpg')} />
                          <img src="/screenshots/patron-my-spots.jpg" alt="Patron MySpots Tracking" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-my-spots.jpg')} />
                        </div>
                        <div className="feature-info">
                          <div className="feature-tag">FOR CUSTOMERS</div>
                          <h3>Patron: Find Your People</h3>
                          <p className="feature-lead">Follow your favorite hospitality professionals. See who's working tonight. Never lose touch when they change venues.</p>
                          <div className="feature-details">
                            <div className="detail-section">
                              <h4>🔔 Real-Time OnTonight Status</h4>
                              <p>See which of your regular OnPros are working right now. Get notifications when they clock in.</p>
                            </div>
                            <div className="detail-section">
                              <h4>🧬 OnScene Genome</h4>
                              <p>Discover your hospitality personality across 10 dimensions. Get matched with OnPros and venues that fit your style.</p>
                            </div>
                            <div className="detail-section">
                              <h4>⭐ Check-Ins & Regulars</h4>
                              <p>Track your favorite spots. Build regular status with OnPros. Unlock VIP treatment.</p>
                            </div>
                            <div className="detail-section">
                              <h4>🎯 Smart Venue Matching</h4>
                              <p>Get personalized venue recommendations based on your genome and the OnPros you follow.</p>
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
                                <li>Basic check-ins</li>
                              </ul>
                            </div>
                            <div className="price-tier premium">
                              <div className="tier-badge">PREMIUM</div>
                              <div className="tier-name">Patron Plus <span>$5/month</span></div>
                              <ul>
                                <li>Everything in Basic</li>
                                <li>OnScene Genome assessment</li>
                                <li>Push notifications</li>
                                <li>Advanced venue matching</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* PATRON ARCHETYPES */}
                      <div className="archetypes-section">
                        <h3>OnScene Genome Archetypes</h3>
                        <p className="section-subtitle">12 social profiles that define your hospitality personality.</p>
                        <p className="click-instruction">Click any archetype to learn more →</p>
                        <div className="genome-grid">
                          {Object.entries(archetypes).filter(([key, arch]) => arch.type === 'patron').map(([key, arch]) => (
                            <button
                              key={key}
                              className={`genome-item ${selectedArchetype === key ? 'active' : ''} ${arch.type}`}
                              onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}
                            >
                              <span className="genome-emoji">{arch.emoji}</span>
                              <span className="genome-name">{arch.name}</span>
                            </button>
                          ))}
                        </div>
                        {selectedArchetype && archetypes[selectedArchetype]?.type === 'patron' && (
                          <div className="genome-detail">
                            <div className="genome-detail-header">
                              <span className="genome-detail-emoji">{archetypes[selectedArchetype].emoji}</span>
                              <h3>{archetypes[selectedArchetype].name}</h3>
                            </div>
                            <p>{archetypes[selectedArchetype].desc}</p>
                            <button onClick={() => setSelectedArchetype(null)} className="btn-close">Close</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* VENUE FEATURE */}
                  {platformTab === 'venue' && (
                    <div className="platform-content">
                      <div className="feature">
                        <div className="feature-screenshots single-shot">
                          <img src="/screenshots/venue-analytics-dashboard.jpg" alt="Venue Analytics Dashboard" className="screenshot large" onClick={() => setLightboxImage('/screenshots/venue-analytics-dashboard.jpg')} />
                        </div>
                        <div className="feature-info">
                          <div className="feature-tag">FOR VENUES</div>
                          <h3>Venue: Retain Talent</h3>
                          <p className="feature-lead">Recruit DAPA-verified professionals. Showcase your team. Reduce turnover costs. Track staff impact.</p>
                          <div className="feature-details">
                            <div className="detail-section">
                              <h4>🎯 Recruit Verified Talent</h4>
                              <p>Search for DAPA-verified OnPros by skill level, specialty, and availability.</p>
                            </div>
                            <div className="detail-section">
                              <h4>👥 Team Showcase</h4>
                              <p>Feature your verified OnPros on your venue profile. Attract patrons who follow your staff.</p>
                            </div>
                            <div className="detail-section">
                              <h4>📊 Staff Analytics</h4>
                              <p>Track check-ins by staff member. See which OnPros bring the most regulars.</p>
                            </div>
                            <div className="detail-section">
                              <h4>🔄 Reduce Turnover</h4>
                              <p>Compete on culture, not just wages. Create a destination venue where talent wants to stay.</p>
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
                      
                      {/* VENUE BENEFITS */}
                      <div className="venue-benefits">
                        <h3>Why Venues Partner With OnTonight</h3>
                        <div className="venue-benefits-grid">
                          <div className="venue-benefit">
                            <h4>🎯 Recruit With Confidence</h4>
                            <p>Access a pool of DAPA-certified professionals with verified skills across 6 dimensions.</p>
                          </div>
                          <div className="venue-benefit">
                            <h4>📊 Understand Your Team</h4>
                            <p>Real-time analytics show which staff members drive customer traffic and maintain regulars.</p>
                          </div>
                          <div className="venue-benefit">
                            <h4>🌟 Attract Better Customers</h4>
                            <p>Patrons follow OnPros. Your verified talent becomes a customer acquisition engine.</p>
                          </div>
                          <div className="venue-benefit">
                            <h4>💼 Compete on Culture</h4>
                            <p>Showcase your team's expertise. Win talent wars by proving you develop careers.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* THE SCIENCE */}
                  {platformTab === 'science' && (
                    <div className="platform-content">
                      {/* DAPA DEEP DIVE */}
                      <div className="science-block dapa-block">
                        <div className="science-header">
                          <h3>DAPA: Professional Certification</h3>
                          <span className="science-badge onpro">For OnPros</span>
                        </div>
                        <p className="science-lead">DAPA (Dynamic Adaptive Proficiency Assessment) is the hospitality industry's first comprehensive professional certification system. Unlike traditional skills tests, DAPA measures both technical competence and moral judgment across six critical dimensions.</p>
                        
                        <div className="science-features">
                          <div className="science-feature">
                            <h4>📐 Adaptive Algorithm</h4>
                            <p>Questions adjust in real-time based on your answers. High performers face increasingly complex scenarios.</p>
                          </div>
                          <div className="science-feature">
                            <h4>⚖️ Moral Gradient Scoring</h4>
                            <p>Every question has multiple "correct" answers—but they're not equal. We measure how you think, not just what you know.</p>
                          </div>
                          <div className="science-feature">
                            <h4>🎯 Six-Axis Measurement</h4>
                            <p>Technical, Ethical, Emotional, Velocity, Commercial, and Leadership. A complete professional genome.</p>
                          </div>
                          <div className="science-feature">
                            <h4>🔬 Continuous Validation</h4>
                            <p>1,600+ questions validated against real-world performance data. The system learns and improves.</p>
                          </div>
                        </div>
                        
                        <div className="dapa-grid">
                          <div className="dapa-item"><div className="dapa-icon technical">🎯</div><h4>Technical</h4><p>Knowledge, procedures</p></div>
                          <div className="dapa-item"><div className="dapa-icon ethical">⚖️</div><h4>Ethical</h4><p>Integrity, judgment</p></div>
                          <div className="dapa-item"><div className="dapa-icon emotional">💚</div><h4>Emotional</h4><p>Empathy, boundaries</p></div>
                          <div className="dapa-item"><div className="dapa-icon velocity">⚡</div><h4>Velocity</h4><p>Speed, pressure</p></div>
                          <div className="dapa-item"><div className="dapa-icon commercial">💰</div><h4>Commercial</h4><p>Sales, revenue</p></div>
                          <div className="dapa-item"><div className="dapa-icon leadership">👑</div><h4>Leadership</h4><p>Team, mentoring</p></div>
                        </div>
                      </div>
                      
                      {/* ONSCENE GENOME DEEP DIVE */}
                      <div className="science-block genome-block">
                        <div className="science-header">
                          <h3>OnScene Genome: Social Identity</h3>
                          <span className="science-badge patron">For Patrons</span>
                        </div>
                        <p className="science-lead">OnScene Genome maps your hospitality personality across 10 behavioral dimensions. It's not about demographics—it's about how you experience and create social moments.</p>
                        
                        <div className="science-features">
                          <div className="science-feature">
                            <h4>🧬 45 Behavioral Questions</h4>
                            <p>Not "What do you like?" but "How do you behave?" We map decision-making patterns.</p>
                          </div>
                          <div className="science-feature">
                            <h4>📊 10 Social Dimensions</h4>
                            <p>Adventure vs. Familiarity. Solo vs. Social. Discerning vs. Exploratory. Ten behavioral spectrums.</p>
                          </div>
                          <div className="science-feature">
                            <h4>🎯 Archetype Matching</h4>
                            <p>12 distinct social archetypes with unique venue preferences and OnPro compatibility patterns.</p>
                          </div>
                          <div className="science-feature">
                            <h4>🔄 Pattern Recognition</h4>
                            <p>As you use OnTonight, check-ins and interactions refine your profile. Your genome evolves.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* WHY BOTH MATTER */}
                      <div className="science-block combined-block">
                        <h3>Two Systems, One Platform</h3>
                        <div className="combined-grid">
                          <div className="combined-item">
                            <h4 style={{color: 'rgba(34,197,94,1)'}}>DAPA (OnPro)</h4>
                            <p>Measures professional capability and work style. Verifies skills. Creates portable professional identity.</p>
                          </div>
                          <div className="combined-item">
                            <h4 style={{color: 'rgba(139,92,246,1)'}}>OnScene Genome (Patron)</h4>
                            <p>Measures social behavior and hospitality preferences. Matches people to experiences.</p>
                          </div>
                        </div>
                        <p className="combined-conclusion">Together, they create a complete hospitality identity ecosystem. Everyone benefits from accurate, actionable identity data.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ACCORDION: THE VISION */}
            <div className={`accordion ${expandedSection === 'vision' ? 'expanded' : ''}`}>
              <button 
                className="accordion-header"
                onClick={() => setExpandedSection(expandedSection === 'vision' ? null : 'vision')}
              >
                <span className="accordion-icon">💡</span>
                <span className="accordion-title">The Vision & Founder Story</span>
                <span className="accordion-arrow">{expandedSection === 'vision' ? '−' : '+'}</span>
              </button>
              
              {expandedSection === 'vision' && (
                <div className="accordion-content">
                  <div className="vision-content">
                    {/* FOUNDER INTRODUCTION */}
                    <div className="founder-intro">
                      <div className="founder-photo-placeholder">
                        <span style={{fontSize: '48px'}}>👤</span>
                        <p style={{marginTop: '12px', fontSize: '13px', color: 'rgba(212,163,115,0.7)'}}>Photo Coming Soon</p>
                      </div>
                      <div className="founder-text">
                        <h2>Hi, I'm Jack Joy, Founder of OnTonight.</h2>
                        <p className="founder-tagline">27 years behind bars. One mission: end professional erasure in hospitality.</p>
                      </div>
                    </div>

                    <div className="vision-section">
                      <h3>27 Years Behind the Bar</h3>
                      <p>Twenty-seven years in hospitality. Not watching from an office—<em>living it</em>. Behind the stick where ice never stops flowing and the POS screen glows like a beacon through double shifts. Managing venues where every night is opening night. Training hundreds of professionals who became masters of their craft.</p>
                      <p>I know what it means to be <em>good</em> at this work. The muscle memory that lets you build a perfect Manhattan in 37 seconds while defusing an argument two seats down. The emotional intelligence to spot a proposal about to happen or a breakup already unfolding.</p>
                      <p className="vision-emphasis">And I've watched the best people I ever trained walk out the door—starting over from zero every time. Their regulars scattered. Their reputation reset. Their professional equity evaporated.</p>
                      <p>The industry calls this "turnover." I call it what it is: <strong>systematic professional erasure</strong>.</p>
                    </div>

                    <div className="vision-section">
                      <h3>The Pattern You Can't Unsee</h3>
                      <p>Once you see it, you can't look away. Every industry has professional infrastructure except hospitality.</p>
                      <p>Lawyers switch firms, but their bar membership follows them. Software engineers change companies—their GitHub stays with them. Real estate agents move brokerages and take their client databases.</p>
                      <p className="vision-highlight">But a bartender changes venues and loses everything. Every. Single. Time.</p>
                      <p>This isn't the nature of the industry. This is the <em>absence</em> of professional infrastructure. And absence isn't destiny—it's a problem waiting for a solution.</p>
                    </div>

                    <div className="vision-section">
                      <h3>What OnTonight Actually Is</h3>
                      <p className="vision-highlight">OnTonight is professional infrastructure—the kind that every other industry already has, finally built for hospitality.</p>
                      <ul className="vision-list">
                        <li><strong>For professionals:</strong> Your skills are verified through DAPA. Your identity is portable. Your customer relationships belong to YOU.</li>
                        <li><strong>For customers:</strong> Your favorite bartender changes jobs? You get notified. The relationship doesn't end when the employment ends.</li>
                        <li><strong>For venues:</strong> Recruit verified talent—not résumés and promises. Compete on culture instead of wages alone.</li>
                      </ul>
                      <p>This is professional dignity in software form. This is the infrastructure that should have existed decades ago.</p>
                    </div>

                    <div className="vision-cta">
                      <h3>Join the Movement</h3>
                      <p>We're live now in Tampa Bay, expanding to Miami, Nashville, Austin, and major hospitality markets nationwide.</p>
                      <p className="cta-emphasis">We're not just building software. We're building the future of hospitality careers.</p>
                      <button onClick={scrollToForm} className="btn-primary">Join the Waitlist</button>
                      <p className="cta-note">First 2,000 signups get their first year free.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACCORDION: MISSION */}
            <div className={`accordion ${expandedSection === 'mission' ? 'expanded' : ''}`}>
              <button 
                className="accordion-header"
                onClick={() => setExpandedSection(expandedSection === 'mission' ? null : 'mission')}
              >
                <span className="accordion-icon">🎯</span>
                <span className="accordion-title">Our Mission</span>
                <span className="accordion-arrow">{expandedSection === 'mission' ? '−' : '+'}</span>
              </button>
              
              {expandedSection === 'mission' && (
                <div className="accordion-content">
                  <div className="mission-content">
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
          </div>
        </section>

        {/* ============================================ */}
        {/* LAYER 7: FINAL CTA */}
        {/* ============================================ */}
        <section className="final-cta">
          <div className="container">
            <h2>Ready to Join?</h2>
            <p>First 2,000 members get their first year FREE. Be part of the Tampa launch.</p>
            <button onClick={scrollToForm} className="btn-primary large">
              Join the Movement →
            </button>
            
            {showInstallPrompt && (
              <button onClick={handleInstall} className="btn-install">
                📱 Add to Home Screen
              </button>
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
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For OnPros</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For Patrons</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>For Venues</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setExpandedSection('platform'); scrollToDeepContent(); }}>DAPA Assessment</a>
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

        {/* LIGHTBOX MODAL */}
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
        /* ============================================ */
        /* BASE STYLES */
        /* ============================================ */
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
        
        h1 { font-size: 56px; font-weight: 600; line-height: 1.1; letter-spacing: -0.025em; color: #f8fafc; }
        h2 { font-size: 40px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 16px; color: #f8fafc; }
        h3 { font-size: 28px; font-weight: 600; letter-spacing: -0.015em; margin-bottom: 16px; color: #f8fafc; }
        h4 { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; margin-bottom: 8px; color: #f8fafc; }
        h5 { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(248,250,252,0.4); margin-bottom: 14px; }
        p { font-size: 16px; line-height: 1.7; color: rgba(248,250,252,0.75); margin-bottom: 16px; }
        
        .section-subtitle {
          font-size: 18px;
          color: rgba(248,250,252,0.6);
          text-align: center;
          margin-bottom: 48px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .click-instruction {
          font-size: 14px;
          color: #d4a373;
          text-align: center;
          margin-bottom: 32px;
          font-weight: 500;
        }

        /* ============================================ */
        /* STICKY NAV BAR */
        /* ============================================ */
        .sticky-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(13,17,23,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,163,115,0.15);
          z-index: 1000;
          transform: translateY(-100%);
          transition: transform 0.3s ease;
        }
        
        .sticky-nav.visible {
          transform: translateY(0);
        }
        
        .sticky-nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .sticky-logo {
          font-size: 20px;
          font-weight: 600;
          color: #d4a373;
        }
        
        .sticky-venues {
          font-size: 12px;
          color: rgba(248,250,252,0.5);
          letter-spacing: 0.05em;
        }
        
        .sticky-cta {
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 4px;
          font-family: inherit;
          transition: all 0.2s;
        }
        
        .sticky-cta:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        /* ============================================ */
        /* LAYER 1: HERO HOOK */
        /* ============================================ */
        .hero-hook {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #000;
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
        
        .hero-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
        }
        
        .hook-content {
          text-align: center;
          z-index: 1;
        }
        
        .hook-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.25);
          padding: 10px 24px;
          margin-bottom: 48px;
          border-radius: 4px;
          background: rgba(212,163,115,0.03);
        }
        
        .hook-title {
          font-size: 72px;
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        
        .title-line {
          display: block;
        }
        
        .hook-tagline {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #d4a373;
          margin-bottom: 80px;
        }
        
        .scroll-indicator {
          animation: bounce 2s infinite;
        }
        
        .scroll-indicator span {
          font-size: 32px;
          color: rgba(212,163,115,0.5);
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        /* ============================================ */
        /* LAYER 2: EMOTIONAL HOOK */
        /* ============================================ */
        .emotional-hook {
          padding: 120px 24px;
          background: linear-gradient(180deg, #000 0%, #0d1117 100%);
        }
        
        .emotional-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .emotional-line {
          font-size: 24px;
          color: rgba(248,250,252,0.7);
          margin-bottom: 32px;
          line-height: 1.6;
        }
        
        .emotional-line.emphasis {
          color: #f8fafc;
          font-weight: 500;
          font-size: 28px;
        }
        
        .emotional-resolution {
          font-size: 36px;
          font-weight: 600;
          color: #d4a373;
          margin-top: 48px;
        }
        
        .fade-in { animation: fadeIn 0.8s ease forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.3s; }
        .delay-2 { animation-delay: 0.6s; }
        .delay-3 { animation-delay: 0.9s; }
        .delay-4 { animation-delay: 1.2s; }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }

        /* ============================================ */
        /* LAYER 3: INSTANT ACTION */
        /* ============================================ */
        .instant-action {
          padding: 100px 24px;
          background: #0d1117;
        }
        
        .action-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        
        .action-title {
          margin-bottom: 12px;
        }
        
        .action-subtitle {
          font-size: 18px;
          color: #d4a373;
          margin-bottom: 48px;
        }
        
        .signup-card {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          padding: 48px;
          border-radius: 12px;
        }
        
        .email-step {
          display: flex;
          gap: 12px;
        }
        
        .email-input {
          flex: 1;
          padding: 18px 20px;
          background: rgba(212,163,115,0.04);
          border: 1px solid rgba(212,163,115,0.2);
          color: #f8fafc;
          font-family: inherit;
          font-size: 16px;
          border-radius: 6px;
          transition: all 0.2s;
        }
        
        .email-input:focus {
          outline: none;
          border-color: #d4a373;
        }
        
        .email-btn {
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 18px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          white-space: nowrap;
          transition: all 0.2s;
        }
        
        .email-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        
        .full-form {
          text-align: left;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .form-grid input,
        .form-grid select {
          width: 100%;
          padding: 16px 18px;
          background: rgba(212,163,115,0.04);
          border: 1px solid rgba(212,163,115,0.15);
          color: #f8fafc;
          font-family: inherit;
          font-size: 15px;
          border-radius: 6px;
          transition: all 0.2s;
        }
        
        .form-grid input:focus,
        .form-grid select:focus {
          outline: none;
          border-color: #d4a373;
        }
        
        .form-disclaimer {
          font-size: 12px;
          color: rgba(248,250,252,0.5);
          margin-bottom: 24px;
          text-align: center;
        }
        
        .submit-btn {
          width: 100%;
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 18px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          transition: all 0.2s;
        }
        
        .submit-btn:hover {
          opacity: 0.9;
        }
        
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .success-card {
          padding: 48px;
          background: rgba(34,197,94,0.05);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 12px;
        }
        
        .success-icon {
          font-size: 56px;
          margin-bottom: 20px;
        }
        
        .success-card h3 {
          color: #22c55e;
          margin-bottom: 12px;
        }
        
        .action-note {
          font-size: 14px;
          color: rgba(248,250,252,0.4);
          margin-top: 24px;
        }

        /* ============================================ */
        /* LAYER 4: IDENTITY CARDS */
        /* ============================================ */
        .identity-section {
          padding: 100px 24px;
          background: #161b22;
          border-top: 1px solid rgba(212,163,115,0.1);
        }
        
        .identity-title {
          text-align: center;
          margin-bottom: 12px;
        }
        
        .identity-subtitle {
          text-align: center;
          color: rgba(248,250,252,0.6);
          margin-bottom: 56px;
        }
        
        .identity-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 56px;
        }
        
        .identity-card {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.12);
          padding: 40px 32px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }
        
        .identity-card:hover {
          border-color: var(--card-color, rgba(212,163,115,0.4));
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        }
        
        .identity-card.expanded {
          border-color: var(--card-color, #d4a373);
          background: rgba(212,163,115,0.06);
        }
        
        .card-header {
          text-align: center;
        }
        
        .card-emoji {
          font-size: 48px;
          display: block;
          margin-bottom: 20px;
        }
        
        .card-title {
          font-size: 20px;
          margin-bottom: 8px;
        }
        
        .card-subtitle {
          font-size: 14px;
          color: rgba(248,250,252,0.5);
        }
        
        .card-expanded {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid rgba(212,163,115,0.15);
        }
        
        .card-benefits {
          list-style: none;
          text-align: left;
          margin-bottom: 24px;
        }
        
        .card-benefits li {
          font-size: 14px;
          color: rgba(248,250,252,0.75);
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
        }
        
        .card-benefits li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--card-color, #d4a373);
        }
        
        .card-cta {
          width: 100%;
          background: var(--card-color, #d4a373);
          color: #0d1117;
          border: none;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          transition: all 0.2s;
        }
        
        .card-cta:hover {
          opacity: 0.9;
        }
        
        .card-expand-hint {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 24px;
          color: rgba(248,250,252,0.3);
        }
        
        .learn-more-btn {
          display: block;
          margin: 0 auto;
          background: transparent;
          color: rgba(248,250,252,0.5);
          border: 1px solid rgba(248,250,252,0.15);
          padding: 16px 32px;
          font-size: 15px;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          transition: all 0.2s;
        }
        
        .learn-more-btn:hover {
          color: #d4a373;
          border-color: rgba(212,163,115,0.4);
        }

        /* ============================================ */
        /* LAYER 5: HOW IT WORKS */
        /* ============================================ */
        .how-section {
          padding: 100px 24px;
          background: #0d1117;
          text-align: center;
        }
        
        .how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          margin-top: 56px;
        }
        
        .how-item {
          text-align: center;
        }
        
        .how-number {
          width: 56px;
          height: 56px;
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 600;
          color: #d4a373;
          margin: 0 auto 24px;
        }
        
        .how-item h4 {
          margin-bottom: 12px;
        }
        
        .how-item p {
          font-size: 15px;
          color: rgba(248,250,252,0.65);
        }

        /* ============================================ */
        /* LAYER 6: DEEP CONTENT - ACCORDIONS */
        /* ============================================ */
        .deep-content {
          padding: 100px 24px;
          background: #161b22;
          border-top: 1px solid rgba(212,163,115,0.1);
        }
        
        .deep-title {
          text-align: center;
          margin-bottom: 12px;
        }
        
        .deep-subtitle {
          text-align: center;
          color: rgba(248,250,252,0.6);
          margin-bottom: 56px;
        }
        
        .accordion {
          background: rgba(212,163,115,0.02);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .accordion.expanded {
          border-color: rgba(212,163,115,0.25);
        }
        
        .accordion-header {
          width: 100%;
          background: transparent;
          border: none;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }
        
        .accordion-icon {
          font-size: 24px;
        }
        
        .accordion-title {
          flex: 1;
          font-size: 18px;
          font-weight: 600;
          color: #f8fafc;
        }
        
        .accordion-arrow {
          font-size: 24px;
          color: #d4a373;
        }
        
        .accordion-content {
          padding: 0 32px 32px;
        }

        /* ============================================ */
        /* VALUE PROPS (in accordion) */
        /* ============================================ */
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        
        .value-item {
          text-align: center;
          padding: 32px 24px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 8px;
        }
        
        .value-icon { font-size: 40px; margin-bottom: 16px; }
        .value-number { font-size: 40px; font-weight: 600; color: #d4a373; margin-bottom: 8px; }
        .value-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(248,250,252,0.4); margin-bottom: 16px; }
        .value-item p { font-size: 14px; color: rgba(248,250,252,0.65); }

        /* ============================================ */
        /* QUOTES (in accordion) */
        /* ============================================ */
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .quote {
          border-left: 3px solid rgba(212,163,115,0.3);
          padding: 24px;
          background: rgba(212,163,115,0.02);
          border-radius: 4px;
        }
        
        .quote p {
          font-size: 14px;
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

        /* ============================================ */
        /* PLATFORM TABS (in accordion) */
        /* ============================================ */
        .platform-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        
        .platform-tab {
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
        
        .platform-tab:hover {
          background: rgba(212,163,115,0.1);
          color: #f8fafc;
        }
        
        .platform-tab.active {
          background: rgba(212,163,115,0.15);
          border-color: #d4a373;
          color: #d4a373;
        }
        
        .platform-content {
          margin-top: 32px;
        }

        /* ============================================ */
        /* FEATURES (in platform tabs) */
        /* ============================================ */
        .feature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
          margin-bottom: 56px;
        }
        
        .feature-reverse {
          direction: rtl;
        }
        
        .feature-reverse > * {
          direction: ltr;
        }
        
        .feature-screenshots {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
        }
        
        .feature-screenshots.four-shots {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .feature-screenshots.single-shot {
          grid-template-columns: 1fr;
        }
        
        .screenshot {
          width: 100%;
          height: auto;
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .screenshot:hover {
          transform: scale(1.02);
          border-color: rgba(212,163,115,0.4);
        }
        
        .feature-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          margin-bottom: 12px;
        }
        
        .feature-lead {
          font-size: 16px;
          color: rgba(248,250,252,0.75);
          margin-bottom: 32px;
        }
        
        .feature-details { margin-bottom: 32px; }
        .detail-section { margin-bottom: 20px; }
        .detail-section h4 { font-size: 14px; margin-bottom: 6px; }
        .detail-section p { font-size: 14px; color: rgba(248,250,252,0.6); margin-bottom: 0; }
        
        .feature-price {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .price-tier {
          padding: 24px;
          background: rgba(212,163,115,0.03);
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
        .tier-name span { font-size: 13px; color: rgba(248,250,252,0.5); font-weight: 500; }
        
        .price-tier ul { list-style: none; }
        .price-tier li { font-size: 13px; line-height: 1.8; color: rgba(248,250,252,0.65); padding-left: 18px; position: relative; }
        .price-tier li::before { content: '✓'; position: absolute; left: 0; color: #d4a373; }

        /* ============================================ */
        /* DAPA SECTION (in platform tabs) */
        /* ============================================ */
        .dapa-section {
          margin-top: 56px;
          padding-top: 56px;
          border-top: 1px solid rgba(212,163,115,0.1);
          text-align: center;
        }
        
        .dapa-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          margin-top: 40px;
        }
        
        .dapa-item {
          padding: 28px 16px;
          border: 1px solid rgba(212,163,115,0.1);
          background: rgba(212,163,115,0.02);
          border-radius: 8px;
          transition: all 0.3s;
        }
        
        .dapa-item:hover {
          border-color: rgba(212,163,115,0.3);
          transform: translateY(-2px);
        }
        
        .dapa-icon {
          width: 48px;
          height: 48px;
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.2);
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          border-radius: 8px;
        }
        
        .dapa-item h4 { font-size: 13px; margin-bottom: 6px; }
        .dapa-item p { font-size: 12px; color: rgba(248,250,252,0.5); margin-bottom: 0; }

        /* ============================================ */
        /* GENOME GRID (archetypes) */
        /* ============================================ */
        .archetypes-section {
          margin-top: 56px;
          padding-top: 56px;
          border-top: 1px solid rgba(212,163,115,0.1);
          text-align: center;
        }
        
        .genome-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        
        .genome-item {
          background: rgba(212,163,115,0.02);
          border: 1px solid rgba(212,163,115,0.1);
          padding: 20px 12px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          border-radius: 8px;
        }
        
        .genome-item.patron { border-color: rgba(139,92,246,0.15); }
        .genome-item.onpro { border-color: rgba(34,197,94,0.15); }
        
        .genome-item:hover, .genome-item.active {
          transform: translateY(-3px);
        }
        
        .genome-item.patron:hover, .genome-item.patron.active {
          border-color: rgba(139,92,246,0.4);
          background: rgba(139,92,246,0.05);
        }
        
        .genome-item.onpro:hover, .genome-item.onpro.active {
          border-color: rgba(34,197,94,0.4);
          background: rgba(34,197,94,0.05);
        }
        
        .genome-emoji { font-size: 28px; }
        .genome-name { font-size: 11px; color: rgba(248,250,252,0.7); text-align: center; }
        
        .genome-detail {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          padding: 40px;
          border-radius: 12px;
          text-align: center;
        }
        
        .genome-detail-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .genome-detail-emoji { font-size: 40px; }
        .genome-detail h3 { font-size: 24px; margin-bottom: 0; }
        .genome-detail p { margin-bottom: 24px; }
        
        .btn-close {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.4);
          padding: 10px 24px;
          font-size: 13px;
          cursor: pointer;
          font-family: inherit;
          border-radius: 6px;
          transition: all 0.2s;
        }
        
        .btn-close:hover {
          background: rgba(212,163,115,0.08);
        }

        /* ============================================ */
        /* VENUE BENEFITS */
        /* ============================================ */
        .venue-benefits {
          margin-top: 56px;
          padding-top: 56px;
          border-top: 1px solid rgba(212,163,115,0.1);
        }
        
        .venue-benefits h3 {
          text-align: center;
          margin-bottom: 40px;
        }
        
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
        }
        
        .venue-benefit h4 { margin-bottom: 12px; }
        .venue-benefit p { font-size: 14px; color: rgba(248,250,252,0.65); margin-bottom: 0; }

        /* ============================================ */
        /* SCIENCE BLOCKS */
        /* ============================================ */
        .science-block {
          padding: 40px;
          border-radius: 12px;
          margin-bottom: 32px;
        }
        
        .dapa-block {
          background: rgba(34,197,94,0.03);
          border: 1px solid rgba(34,197,94,0.15);
        }
        
        .genome-block {
          background: rgba(139,92,246,0.03);
          border: 1px solid rgba(139,92,246,0.15);
        }
        
        .combined-block {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          text-align: center;
        }
        
        .science-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .science-header h3 { margin-bottom: 0; }
        
        .science-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 6px 14px;
          border-radius: 4px;
        }
        
        .science-badge.onpro {
          background: rgba(34,197,94,0.15);
          color: #22c55e;
        }
        
        .science-badge.patron {
          background: rgba(139,92,246,0.15);
          color: #8b5cf6;
        }
        
        .science-lead {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(248,250,252,0.75);
          margin-bottom: 32px;
        }
        
        .science-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .science-feature h4 { margin-bottom: 8px; color: #d4a373; }
        .science-feature p { font-size: 14px; color: rgba(248,250,252,0.65); margin-bottom: 0; }
        
        .combined-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin: 32px 0;
          text-align: left;
        }
        
        .combined-item h4 { margin-bottom: 12px; }
        .combined-item p { font-size: 15px; color: rgba(248,250,252,0.7); }
        
        .combined-conclusion {
          font-size: 16px;
          color: rgba(248,250,252,0.8);
          max-width: 800px;
          margin: 0 auto;
        }

        /* ============================================ */
        /* VISION CONTENT (in accordion) */
        /* ============================================ */
        .vision-content {
          max-width: 850px;
          margin: 0 auto;
        }
        
        .founder-intro {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-bottom: 56px;
          padding: 32px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 12px;
        }
        
        .founder-photo-placeholder {
          width: 120px;
          height: 120px;
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .founder-text h2 { font-size: 24px; margin-bottom: 8px; }
        .founder-tagline { font-size: 16px; color: #d4a373; font-weight: 500; margin-bottom: 0; }
        
        .vision-section { margin-bottom: 48px; }
        .vision-section h3 { color: #d4a373; margin-bottom: 20px; }
        .vision-section p { font-size: 16px; line-height: 1.8; }
        
        .vision-emphasis {
          color: #f8fafc;
          font-weight: 500;
          font-size: 18px;
          padding-left: 20px;
          border-left: 3px solid #d4a373;
          margin: 24px 0;
        }
        
        .vision-highlight {
          color: #d4a373;
          font-weight: 600;
          padding: 24px;
          border-left: 3px solid #d4a373;
          background: rgba(212,163,115,0.05);
          border-radius: 4px;
          margin: 24px 0;
        }
        
        .vision-list { list-style: none; margin: 24px 0; }
        .vision-list li { font-size: 15px; line-height: 1.8; color: rgba(248,250,252,0.8); padding-left: 24px; position: relative; margin-bottom: 16px; }
        .vision-list li::before { content: '→'; position: absolute; left: 0; color: #d4a373; }
        .vision-list li strong { color: #f8fafc; }
        
        .vision-cta {
          text-align: center;
          padding: 48px;
          border: 1px solid rgba(212,163,115,0.2);
          background: rgba(212,163,115,0.03);
          border-radius: 12px;
          margin-top: 48px;
        }
        
        .vision-cta h3 { margin-bottom: 16px; }
        .cta-emphasis { color: #d4a373; font-weight: 600; margin: 24px 0; }
        .cta-note { font-size: 14px; color: rgba(248,250,252,0.5); margin-top: 16px; }

        /* ============================================ */
        /* MISSION CONTENT (in accordion) */
        /* ============================================ */
        .mission-content { max-width: 900px; margin: 0 auto; }
        
        .mission-statement {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(248,250,252,0.85);
          text-align: center;
          margin-bottom: 48px;
        }
        
        .mission-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        
        .pillar {
          padding: 28px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 8px;
          text-align: center;
        }
        
        .pillar h4 { color: #d4a373; margin-bottom: 12px; }
        .pillar p { font-size: 14px; color: rgba(248,250,252,0.65); margin-bottom: 0; }

        /* ============================================ */
        /* LAYER 7: FINAL CTA */
        /* ============================================ */
        .final-cta {
          padding: 100px 24px;
          background: #0d1117;
          text-align: center;
          border-top: 1px solid rgba(212,163,115,0.1);
        }
        
        .final-cta h2 { margin-bottom: 16px; }
        .final-cta p { font-size: 18px; color: rgba(248,250,252,0.7); margin-bottom: 40px; }
        
        .btn-primary {
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 18px 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          transition: all 0.2s;
        }
        
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,163,115,0.2);
        }
        
        .btn-primary.large {
          padding: 20px 48px;
          font-size: 18px;
        }
        
        .btn-install {
          display: block;
          margin: 24px auto 0;
          background: transparent;
          color: rgba(248,250,252,0.4);
          border: 1px solid rgba(248,250,252,0.1);
          padding: 12px 28px;
          font-size: 13px;
          cursor: pointer;
          font-family: inherit;
          border-radius: 4px;
          transition: all 0.2s;
        }
        
        .btn-install:hover {
          border-color: rgba(248,250,252,0.2);
          color: rgba(248,250,252,0.6);
        }

        /* ============================================ */
        /* FOOTER */
        /* ============================================ */
        .footer {
          background: #161b22;
          border-top: 1px solid rgba(212,163,115,0.1);
          padding: 80px 24px 40px;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 48px;
        }
        
        .footer-logo { font-size: 20px; font-weight: 600; color: #d4a373; margin-bottom: 12px; }
        .footer-tagline { font-size: 13px; color: rgba(248,250,252,0.5); margin-bottom: 8px; }
        .footer-location { font-size: 12px; color: rgba(248,250,252,0.4); }
        
        .footer-links { display: flex; gap: 80px; }
        .footer-col a { display: block; font-size: 14px; color: rgba(248,250,252,0.55); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
        .footer-col a:hover { color: #d4a373; }
        
        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(212,163,115,0.1);
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(248,250,252,0.35);
        }

        /* ============================================ */
        /* LIGHTBOX */
        /* ============================================ */
        .lightbox {
          position: fixed;
          inset: 0;
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
        }
        
        .lightbox-image {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
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
          padding: 8px;
        }
        
        .lightbox-close:hover { color: #d4a373; }

        /* ============================================ */
        /* RESPONSIVE */
        /* ============================================ */
        @media (max-width: 1024px) {
          .feature { grid-template-columns: 1fr; gap: 32px; }
          .feature-reverse { direction: ltr; }
          .dapa-grid, .genome-grid { grid-template-columns: repeat(3, 1fr); }
        }
        
        @media (max-width: 768px) {
          .hook-title { font-size: 48px; }
          .hook-tagline { font-size: 14px; letter-spacing: 0.15em; }
          
          .emotional-line { font-size: 20px; }
          .emotional-line.emphasis { font-size: 22px; }
          .emotional-resolution { font-size: 28px; }
          
          .email-step { flex-direction: column; }
          .form-grid { grid-template-columns: 1fr; }
          
          .identity-cards { grid-template-columns: 1fr; }
          .how-grid { grid-template-columns: 1fr; gap: 32px; }
          
          .value-grid, .quotes-grid { grid-template-columns: 1fr; }
          .dapa-grid, .genome-grid { grid-template-columns: repeat(2, 1fr); }
          .feature-price { grid-template-columns: 1fr; }
          .venue-benefits-grid { grid-template-columns: 1fr; }
          .science-features { grid-template-columns: 1fr; }
          .combined-grid { grid-template-columns: 1fr; }
          .mission-pillars { grid-template-columns: 1fr; }
          
          .founder-intro { flex-direction: column; text-align: center; }
          
          .footer-content { flex-direction: column; gap: 40px; }
          .footer-links { flex-direction: column; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
          
          .sticky-venues { display: none; }
        }
      `}</style>
    </>
  );
}
