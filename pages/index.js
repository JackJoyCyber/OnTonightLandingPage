// pages/index.js
// ============================================================================
// ONTONIGHT LANDING PAGE - PLATINUM ULTIMATE EDITION
// ============================================================================
// V3 Content + MAGIC Animations + Founder Story + Professional Polish
// "Your Night. Your People. Where Regulars Are Made."
// ============================================================================

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  // ============================================================================
  // STATE
  // ============================================================================
  const [activeTab, setActiveTab] = useState('home');
  const [platformTab, setPlatformTab] = useState('onpro');
  const [formData, setFormData] = useState({ name: '', email: '', userType: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);

  // ============================================================================
  // TYPEWRITER EFFECT
  // ============================================================================
  const taglines = [
    "Your Night. Your People.",
    "Where Regulars Are Made.",
    "Portable Careers for Hospitality.",
    "Follow Your Favorite Bartender.",
    "Professional Identity That Travels."
  ];
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTagline = taglines[taglineIndex];
    const typeSpeed = isDeleting ? 30 : 80;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && charIndex === currentTagline.length) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      setTypedText(currentTagline.substring(0, charIndex + (isDeleting ? -1 : 1)));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, taglineIndex]);

  // ============================================================================
  // SCROLL PROGRESS
  // ============================================================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================================================
  // PWA INSTALL
  // ============================================================================
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
    if (outcome === 'accepted') setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  // ============================================================================
  // ARCHETYPES DATA
  // ============================================================================
  const patronArchetypes = [
    { emoji: '👑', name: 'The Regular', desc: 'Loyalty is your currency. You build real relationships with your favorite bartenders and servers.' },
    { emoji: '🦋', name: 'The Social Butterfly', desc: 'Every night is a new adventure. You know someone everywhere you go.' },
    { emoji: '🎉', name: 'The Celebrator', desc: 'Life is full of moments worth celebrating, and you make sure every one counts.' },
    { emoji: '😌', name: 'The Relaxer', desc: 'Your nights out are about unwinding and finding peace in good company.' },
    { emoji: '💪', name: 'The Supporter', desc: 'You champion the people and places you believe in, becoming their biggest advocate.' },
    { emoji: '🧐', name: 'The Critic', desc: 'Your high standards push the industry forward. You know what excellence looks like.' },
    { emoji: '📖', name: 'The Storyteller', desc: 'Every night out becomes a story. You remember the details and share the experiences.' },
    { emoji: '📚', name: 'The Student', desc: 'Always learning, always asking questions. You want to understand the craft.' }
  ];

  const onproArchetypes = [
    { emoji: '🎨', name: 'The Craftsman', desc: 'Precision and technique define your service. Every drink, every plate is executed to perfection.' },
    { emoji: '💼', name: 'The Closer', desc: 'You read the room and know exactly when to suggest that perfect pairing or upsell.' },
    { emoji: '🎓', name: 'The Mentor', desc: 'You build people, not just drinks. Training the next generation is your calling.' },
    { emoji: '⚡', name: 'The Hustler', desc: 'Speed and efficiency are your superpowers. You thrive in the rush.' },
    { emoji: '🫂', name: 'The Therapist', desc: 'People open up to you. You create safe space and genuinely care about regulars.' },
    { emoji: '🎭', name: 'The Showman', desc: 'Every shift is a performance. You entertain and create memorable experiences.' },
    { emoji: '👔', name: 'The Professional', desc: 'Consistency, reliability, excellence. You show up and execute flawlessly.' },
    { emoji: '🔬', name: 'The Innovator', desc: 'You push boundaries and create new classics. Always experimenting.' },
    { emoji: '🛡️', name: 'The Guardian', desc: 'Safety and ethics are non-negotiable. You protect guests and uphold integrity.' },
    { emoji: '🤝', name: 'The Diplomat', desc: 'Conflict resolution and team harmony are your strengths.' },
    { emoji: '🚀', name: 'The Entrepreneur', desc: 'You think like an owner. Understanding P&L and building success drives you.' },
    { emoji: '❤️', name: 'The Caregiver', desc: 'Hospitality in its truest form. You anticipate needs and create comfort.' }
  ];

  // ============================================================================
  // FORM SUBMIT
  // ============================================================================
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
      else alert('Error submitting. Please try again.');
    } catch (err) {
      alert('Error submitting. Please try again.');
    }
    setLoading(false);
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <>
      <Head>
        <title>OnTonight - Professional Identity Platform for Hospitality</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry. Live now in Tampa Bay." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* SCROLL PROGRESS BAR */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* FLOATING PARTICLES */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }} />
        ))}
      </div>

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

        {/* ================================================================== */}
        {/* HOME TAB - THE PROBLEM */}
        {/* ================================================================== */}
        {activeTab === 'home' && (
          <div className="tab-content">
            {/* HERO */}
            <section className="hero" ref={heroRef}>
              <div className="hero-glow" />
              <div className="hero-glow-2" />
              <div className="container">
                <div className="hero-badge animate-fade-in">
                  <span className="badge-dot" /> LIVE NOW · TAMPA BAY PILOT
                </div>
                
                <h1 className="hero-title animate-slide-up">
                  <span className="typewriter">{typedText}</span>
                  <span className="cursor">|</span>
                </h1>
                
                <p className="hero-subtitle animate-slide-up delay-1">
                  The professional identity platform for hospitality.<br />
                  Where bartenders and servers own their careers.
                </p>

                <div className="hero-stats animate-slide-up delay-2">
                  <div className="stat">
                    <span className="stat-number">27</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat">
                    <span className="stat-number">$66.8B</span>
                    <span className="stat-label">Industry Crisis</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat">
                    <span className="stat-number">1</span>
                    <span className="stat-label">Solution</span>
                  </div>
                </div>

                <div className="hero-ctas animate-slide-up delay-3">
                  <button onClick={() => setActiveTab('platform')} className="btn-primary">
                    Explore Platform
                  </button>
                  <button onClick={() => setActiveTab('founder')} className="btn-secondary">
                    The Vision
                  </button>
                </div>

                {showInstallPrompt && (
                  <button onClick={handleInstall} className="btn-install animate-fade-in">
                    📱 Add to Home Screen
                  </button>
                )}
              </div>

              <div className="scroll-indicator">
                <span>Scroll to explore</span>
                <div className="scroll-arrow">↓</div>
              </div>
            </section>

            {/* VALUE PROPS - THE CRISIS */}
            <section className="value">
              <div className="container">
                <h2 className="section-title">The $66.8 Billion Problem</h2>
                <p className="section-subtitle">Every year, hospitality loses more than money. It loses people, relationships, and institutional knowledge.</p>
                
                <div className="value-grid">
                  <div className="value-item glass-card">
                    <div className="value-icon">💰</div>
                    <div className="value-number">$24K</div>
                    <div className="value-label">Lost Per Venue Change</div>
                    <p>Average bartender loses $24,000 in regular tips when changing venues. Your regulars can't follow you.</p>
                  </div>
                  <div className="value-item glass-card">
                    <div className="value-icon">🔄</div>
                    <div className="value-number">73%</div>
                    <div className="value-label">Annual Turnover</div>
                    <p>The hospitality industry has the highest turnover of any sector. Every departure erases years of relationship building.</p>
                  </div>
                  <div className="value-item glass-card">
                    <div className="value-icon">📉</div>
                    <div className="value-number">Zero</div>
                    <div className="value-label">Career Infrastructure</div>
                    <p>Lawyers have bar licenses. Doctors have credentials. Hospitality professionals start from scratch every move.</p>
                  </div>
                  <div className="value-item glass-card">
                    <div className="value-icon">💔</div>
                    <div className="value-number">15.6M</div>
                    <div className="value-label">Workers Affected</div>
                    <p>Over 15 million hospitality professionals in the US alone face this reality. Bartenders. Servers. Sommeliers. All of them.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* INDUSTRY QUOTES */}
            <section className="quotes">
              <div className="container">
                <h2 className="section-title">What The Industry Says</h2>
                <div className="quotes-grid">
                  <blockquote className="quote-card glass-card">
                    <p>"Employee turnover in the hospitality industry costs businesses approximately $5,864 per hourly employee."</p>
                    <cite>— Cornell University School of Hotel Administration</cite>
                  </blockquote>
                  <blockquote className="quote-card glass-card">
                    <p>"The restaurant industry's turnover rate reached 73% in 2023, the highest of any private sector industry."</p>
                    <cite>— National Restaurant Association</cite>
                  </blockquote>
                  <blockquote className="quote-card glass-card">
                    <p>"Personal connections account for 60-80% of repeat business at bars and restaurants."</p>
                    <cite>— Hospitality Technology Research</cite>
                  </blockquote>
                </div>
              </div>
            </section>

            {/* MISSION */}
            <section className="mission">
              <div className="container">
                <h2 className="section-title">Our Mission</h2>
                <p className="mission-statement">
                  End systematic professional erasure in hospitality. Give bartenders and servers the career infrastructure they deserve.
                </p>
                <div className="mission-pillars">
                  <div className="pillar glass-card">
                    <h4>Portable Identity</h4>
                    <p>Your professional profile follows you. Skills verified. Reputation preserved. Relationships maintained.</p>
                  </div>
                  <div className="pillar glass-card">
                    <h4>Customer Connections</h4>
                    <p>Regulars can follow their favorite bartenders and servers across venues. The relationship survives the job change.</p>
                  </div>
                  <div className="pillar glass-card">
                    <h4>Venue Excellence</h4>
                    <p>Venues recruit verified talent, not just resumes. Compete on culture instead of wages alone.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================================================================== */}
        {/* PLATFORM TAB */}
        {/* ================================================================== */}
        {activeTab === 'platform' && (
          <div className="tab-content">
            <section className="platform-intro">
              <div className="container">
                <h1 className="section-title">The Platform</h1>
                <p className="platform-lead">Three solutions. One complete ecosystem for hospitality.</p>

                <div className="platform-tabs">
                  <button className={`platform-tab ${platformTab === 'onpro' ? 'active' : ''}`} onClick={() => setPlatformTab('onpro')}>
                    For OnPros
                  </button>
                  <button className={`platform-tab ${platformTab === 'patron' ? 'active' : ''}`} onClick={() => setPlatformTab('patron')}>
                    For Patrons
                  </button>
                  <button className={`platform-tab ${platformTab === 'venue' ? 'active' : ''}`} onClick={() => setPlatformTab('venue')}>
                    For Venues
                  </button>
                  <button className={`platform-tab ${platformTab === 'science' ? 'active' : ''}`} onClick={() => setPlatformTab('science')}>
                    The Science
                  </button>
                </div>
              </div>
            </section>

            <section className="features">
              <div className="container">
                {/* ONPRO FEATURES */}
                {platformTab === 'onpro' && (
                  <div className="feature-block animate-fade-in">
                    <div className="feature-info">
                      <div className="feature-tag onpro">FOR PROFESSIONALS</div>
                      <h3>OnPro: Your Portable Career</h3>
                      <p className="feature-lead">Your professional identity follows you from venue to venue. Skills verified through our proprietary DAPA system. Customers follow YOU, not the venue.</p>
                      
                      <div className="feature-details">
                        <div className="detail-section">
                          <h4>🎯 Verified Professional Identity</h4>
                          <p>DAPA assessment proves your expertise across 6 dimensions: Technical, Ethical, Emotional Intelligence, Velocity, Commercial, and Leadership. 600+ questions. No shortcuts.</p>
                        </div>
                        <div className="detail-section">
                          <h4>📊 Skills That Travel</h4>
                          <p>When you change venues, your verified skills come with you. No more starting over. No more proving yourself from scratch.</p>
                        </div>
                        <div className="detail-section">
                          <h4>👥 Customer Relationships</h4>
                          <p>Your regulars follow YOU. When you move, they get notified. The relationship doesn't end with the employment.</p>
                        </div>
                        <div className="detail-section">
                          <h4>🏆 Professional Genome</h4>
                          <p>Discover your archetype. Are you The Craftsman? The Hustler? The Therapist? Your genome reveals your professional DNA.</p>
                        </div>
                      </div>

                      <div className="feature-price">
                        <div className="price-tier free">
                          <span className="tier-badge">FREE TIER</span>
                          <div className="tier-name">OnPro Basic</div>
                          <ul>
                            <li>Professional profile</li>
                            <li>Schedule sharing</li>
                            <li>2 skill assessments</li>
                            <li>Customer connections</li>
                          </ul>
                        </div>
                        <div className="price-tier premium">
                          <span className="tier-badge">COMING SOON</span>
                          <div className="tier-name">OnPro Premium <span>$9.99/mo</span></div>
                          <ul>
                            <li>Unlimited assessments</li>
                            <li>Advanced analytics</li>
                            <li>Priority matching</li>
                            <li>Verified badge boost</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="feature-screenshots">
                      <div className="screenshot-wrapper">
                        <img src="/screenshots/onpro-profile-status.jpg" alt="OnPro Profile" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-profile-status.jpg')} />
                        <span className="screenshot-label">Professional Profile</span>
                      </div>
                      <div className="screenshot-wrapper">
                        <img src="/screenshots/onpro-skills-catagories.jpg" alt="Skills Assessment" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-skills-catagories.jpg')} />
                        <span className="screenshot-label">Skills Assessment</span>
                      </div>
                      <div className="screenshot-wrapper">
                        <img src="/screenshots/onpro-assessment-dashboard.jpg" alt="DAPA Dashboard" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-assessment-dashboard.jpg')} />
                        <span className="screenshot-label">DAPA Dashboard</span>
                      </div>
                    </div>

                    {/* ONPRO ARCHETYPES */}
                    <div className="archetypes-section">
                      <h4>OnPro Archetypes</h4>
                      <p className="archetypes-intro">Discover your professional DNA. Which one are you?</p>
                      <div className="archetypes-grid">
                        {onproArchetypes.map((arch, i) => (
                          <div key={i} className="archetype-card glass-card">
                            <span className="archetype-emoji">{arch.emoji}</span>
                            <h5>{arch.name}</h5>
                            <p>{arch.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* PATRON FEATURES */}
                {platformTab === 'patron' && (
                  <div className="feature-block animate-fade-in">
                    <div className="feature-info">
                      <div className="feature-tag patron">FOR CUSTOMERS</div>
                      <h3>Patron: Follow Your People</h3>
                      <p className="feature-lead">Never lose your favorite bartender or server again. When they move, you'll know. The relationship survives the job change.</p>
                      
                      <div className="feature-details">
                        <div className="detail-section">
                          <h4>🔔 Follow Your Favorites</h4>
                          <p>Get notified when your favorite bartender or server is working. Never show up to find they're off again.</p>
                        </div>
                        <div className="detail-section">
                          <h4>🗺️ Track Across Venues</h4>
                          <p>When they change jobs, you get notified of their new location. The magic follows the person, not the place.</p>
                        </div>
                        <div className="detail-section">
                          <h4>🧬 OnScene Genome</h4>
                          <p>45 questions across 10 dimensions reveal your hospitality personality. Get matched to experiences that fit YOU.</p>
                        </div>
                        <div className="detail-section">
                          <h4>✨ Personalized Discovery</h4>
                          <p>Find new spots that match your vibe. Your genome guides recommendations to places you'll actually love.</p>
                        </div>
                      </div>

                      <div className="feature-price">
                        <div className="price-tier free">
                          <span className="tier-badge">ALWAYS FREE</span>
                          <div className="tier-name">Patron</div>
                          <ul>
                            <li>Follow unlimited OnPros</li>
                            <li>Real-time notifications</li>
                            <li>OnScene Genome assessment</li>
                            <li>Venue discovery</li>
                            <li>Check-in badges</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="feature-screenshots">
                      <div className="screenshot-wrapper">
                        <img src="/screenshots/patron-explore.jpg" alt="Explore OnPros" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-explore.jpg')} />
                        <span className="screenshot-label">Explore OnPros</span>
                      </div>
                      <div className="screenshot-wrapper">
                        <img src="/screenshots/patron-genome.jpg" alt="OnScene Genome" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-genome.jpg')} />
                        <span className="screenshot-label">Your Genome</span>
                      </div>
                      <div className="screenshot-wrapper">
                        <img src="/screenshots/patron-messaging.jpg" alt="Direct Messaging" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-messaging.jpg')} />
                        <span className="screenshot-label">Stay Connected</span>
                      </div>
                    </div>

                    {/* PATRON ARCHETYPES */}
                    <div className="archetypes-section">
                      <h4>Patron Archetypes</h4>
                      <p className="archetypes-intro">How do you experience hospitality? Which one are you?</p>
                      <div className="archetypes-grid patron-grid">
                        {patronArchetypes.map((arch, i) => (
                          <div key={i} className="archetype-card glass-card">
                            <span className="archetype-emoji">{arch.emoji}</span>
                            <h5>{arch.name}</h5>
                            <p>{arch.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* VENUE FEATURES */}
                {platformTab === 'venue' && (
                  <div className="feature-block animate-fade-in">
                    <div className="feature-info">
                      <div className="feature-tag venue">FOR VENUES</div>
                      <h3>Venue Portal: Recruit Verified Talent</h3>
                      <p className="feature-lead">Stop hiring blind. Recruit verified professionals with proven skills. Compete on culture, not just wages.</p>
                      
                      <div className="feature-details">
                        <div className="detail-section">
                          <h4>✅ Verified Staff</h4>
                          <p>See DAPA scores before you hire. Know exactly what level of expertise you're getting. No more surprises.</p>
                        </div>
                        <div className="detail-section">
                          <h4>🌟 Featured Professionals</h4>
                          <p>Showcase your best talent. Let their reputation drive traffic to your venue. Turn retention into a competitive advantage.</p>
                        </div>
                        <div className="detail-section">
                          <h4>📈 Analytics Dashboard</h4>
                          <p>Track which OnPros drive repeat visits. Understand your customer relationships at a deeper level.</p>
                        </div>
                        <div className="detail-section">
                          <h4>🎯 Culture Matching</h4>
                          <p>Find staff whose professional genome aligns with your venue's vibe. Better culture fit means longer tenure.</p>
                        </div>
                      </div>

                      <div className="feature-price">
                        <div className="price-tier trial">
                          <span className="tier-badge">PILOT PROGRAM</span>
                          <div className="tier-name">Venue Basic</div>
                          <ul>
                            <li>Staff verification</li>
                            <li>Featured OnPro profiles</li>
                            <li>Basic analytics</li>
                            <li>Dedicated onboarding</li>
                          </ul>
                        </div>
                        <div className="price-tier premium">
                          <span className="tier-badge">ENTERPRISE</span>
                          <div className="tier-name">Venue Pro <span>Custom pricing</span></div>
                          <ul>
                            <li>Multi-location support</li>
                            <li>Advanced analytics</li>
                            <li>Recruitment pipeline</li>
                            <li>Priority support</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="feature-screenshots single-shot">
                      <div className="screenshot-wrapper large">
                        <img src="/screenshots/venue-portal.jpg" alt="Venue Portal Dashboard" className="screenshot" onClick={() => setLightboxImage('/screenshots/venue-portal.jpg')} />
                        <span className="screenshot-label">Venue Management Portal</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* THE SCIENCE */}
                {platformTab === 'science' && (
                  <div className="feature-block science-block animate-fade-in">
                    <div className="feature-info full-width">
                      <div className="feature-tag science">THE TECHNOLOGY</div>
                      <h3>Two Proprietary Assessment Systems</h3>
                      <p className="feature-lead">Built from 27 years of hospitality experience. Over $300,000 in intellectual property value.</p>
                      
                      <div className="science-grid">
                        <div className="science-card glass-card">
                          <h4 style={{color: '#22c55e'}}>DAPA System (OnPro)</h4>
                          <p className="science-subtitle">Dynamic Adaptive Proficiency Assessment</p>
                          <ul className="science-list">
                            <li><strong>600+ questions</strong> across 9 categories</li>
                            <li><strong>6-axis genome:</strong> Technical, Ethical, Emotional Intelligence, Velocity, Commercial, Leadership</li>
                            <li><strong>Adaptive difficulty</strong> that responds to performance</li>
                            <li><strong>Moral gradient scoring</strong> for nuanced assessment</li>
                            <li><strong>Anti-gaming protection</strong> with scenario-based questions</li>
                          </ul>
                          <p className="science-detail">Verifies skills. Creates portable professional identity. Helps venues hire better and OnPros prove their worth.</p>
                        </div>

                        <div className="science-card glass-card">
                          <h4 style={{color: '#8b5cf6'}}>OnScene Genome (Patron)</h4>
                          <p className="science-subtitle">Hospitality Personality Assessment</p>
                          <ul className="science-list">
                            <li><strong>45 questions</strong> across 10 dimensions</li>
                            <li><strong>12 unique archetypes</strong> from Regular to Student</li>
                            <li><strong>Visual preference testing</strong> for subconscious insights</li>
                            <li><strong>Scenario responses</strong> for behavioral mapping</li>
                            <li><strong>Value alignment</strong> for authentic matching</li>
                          </ul>
                          <p className="science-detail">Measures social behavior and hospitality preferences. Matches people to experiences. Creates personalized recommendations.</p>
                        </div>
                      </div>

                      <p className="science-conclusion">Together, they create a complete hospitality identity ecosystem. OnPros prove their professional value. Patrons discover authentic experiences. Venues showcase verified talent. Everyone benefits from accurate, actionable identity data.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ================================================================== */}
        {/* FOUNDER TAB - THE VISION */}
        {/* ================================================================== */}
        {activeTab === 'founder' && (
          <div className="tab-content">
            <section className="founder-hero">
              <div className="container">
                <div className="founder-intro animate-fade-in">
                  <div className="founder-photo">
                    <div className="photo-placeholder">
                      <span>👤</span>
                      <p>Photo Coming Soon</p>
                    </div>
                  </div>
                  <div className="founder-text">
                    <h1>Hi, I'm Jack Joy, Founder of OnTonight.</h1>
                    <p className="founder-tagline">27 years behind bars. One mission: end professional erasure in hospitality.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="vision-content">
              <div className="container">
                <div className="vision-section animate-fade-in">
                  <h3>27 Years Behind the Bar</h3>
                  <p>Twenty-seven years in hospitality. Not watching from an office—<em>living it</em>. Behind the stick where ice never stops flowing and the POS screen glows like a beacon through double shifts. Managing venues where every night is opening night. Training hundreds of professionals who became masters of their craft.</p>
                  <p>I've made drinks until my hands cramped. I've worked stations where you pour four cocktails simultaneously while maintaining three separate conversations, each guest believing they have your full attention—because in that moment, they do. I've closed at 4 AM under neon signs that hum like prayers and opened at 10 AM with coffee that tastes like hope.</p>
                  <p>I know what it means to be <em>good</em> at this work. The muscle memory that lets you build a perfect Manhattan in 37 seconds while defusing an argument two seats down. The emotional intelligence to spot a proposal about to happen or a breakup already unfolding.</p>
                  <p className="vision-emphasis">And I've watched the best people I ever trained walk out the door. Every single time, they started over from zero. Their regulars scattered. Their reputation reset. Their professional equity evaporated.</p>
                  <p>The industry calls this "turnover." I call it what it is: <strong>systematic professional erasure</strong>.</p>
                </div>

                <div className="vision-section animate-fade-in">
                  <h3>The Pattern You Can't Unsee</h3>
                  <p>Once you see it, you can't look away. Every industry has professional infrastructure except hospitality.</p>
                  <p>Lawyers switch firms, but their bar membership follows them. Software engineers change companies—their GitHub stays with them. Real estate agents move brokerages and take their client databases.</p>
                  <p className="vision-emphasis">But a bartender changes venues and loses everything. Every. Single. Time.</p>
                  <p>The regular who tipped $50 every Friday? Can't find you. The customer relationships built over years? Belong to your former employer. The professional reputation you spent a decade building? Starts at zero.</p>
                  <p className="vision-highlight">This isn't the nature of the industry. This is the <em>absence</em> of professional infrastructure. And absence isn't destiny—it's a problem waiting for a solution.</p>
                </div>

                <div className="vision-section animate-fade-in">
                  <h3>Why I Could Build This</h3>
                  <p>After 27 years in hospitality, I transitioned into cybersecurity and software development. Standing at the intersection of these two worlds, I realized: I understand both sides of this problem.</p>
                  <p>I understand the bartender making 200 drinks an hour during Saturday rush, tracking six tabs in their head while maintaining conversation with regulars. I've <em>been</em> that bartender. I understand the sommelier who pairs wine with personality, not just food.</p>
                  <p className="vision-statement">Deep hospitality experience plus technical execution—that combination is rare. It's exactly what this problem needed.</p>
                </div>

                <div className="vision-section animate-fade-in">
                  <h3>What OnTonight Actually Is</h3>
                  <p className="vision-highlight">OnTonight is professional infrastructure—the kind that every other industry already has, finally built for hospitality.</p>
                  <ul className="vision-list">
                    <li><strong>For professionals:</strong> Your skills are verified through DAPA. Your professional identity is portable—it follows you, grows with you. Your customer relationships belong to you. When you change venues, you bring your value with you.</li>
                    <li><strong>For customers:</strong> Your favorite bartender changes jobs? You get notified. Your server moves? You can follow them. The relationship doesn't end when the employment ends.</li>
                    <li><strong>For venues:</strong> Recruit verified talent—not résumés and promises, but proven skill. Compete on culture instead of wages alone. Turn retention into a competitive advantage.</li>
                  </ul>
                  <p>This is professional dignity in software form. This is career equity for people who serve.</p>
                </div>

                <div className="vision-section animate-fade-in">
                  <h3>The Future We're Building</h3>
                  <p>Imagine hospitality where professionals own their careers. Where a talented bartender can leave a toxic workplace without losing their livelihood. Where better opportunities don't mean starting over from scratch.</p>
                  <p>Where small venues compete with corporate chains by showcasing culture and verified talent. Where a young professional entering hospitality sees a real career path—one where skills compound over time.</p>
                  <p className="vision-emphasis">That's not fantasy. That's infrastructure. That's what happens when you build the foundation that should have always existed.</p>
                  <p>We're live now in Tampa Bay. From here, we're expanding to Miami, Nashville, Austin, and major hospitality markets nationwide.</p>
                </div>

                <div className="vision-cta animate-fade-in">
                  <h3>Join the Movement</h3>
                  <p>This isn't a product launch. This is a correction—the professional infrastructure that should have existed all along.</p>
                  <p className="cta-emphasis">We're not just building software. We're building the future of hospitality careers. We're ending professional erasure. We're making dignity portable.</p>
                  <a href="#waitlist" className="btn-primary">Join the Waitlist</a>
                  <p className="cta-note">First 2,000 signups get their first year free.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================================================================== */}
        {/* WAITLIST SECTION */}
        {/* ================================================================== */}
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
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <select
                      required
                      value={formData.userType}
                      onChange={e => setFormData({ ...formData, userType: e.target.value })}
                    >
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
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
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
              <div className="waitlist-success animate-fade-in">
                <div className="success-icon">🎉</div>
                <h2>Welcome to the Movement</h2>
                <p>You're among the first 2,000. Check your email for next steps and your exclusive access code.</p>
                <a href="https://app.on-tonight.com" className="btn-primary">
                  Launch the App →
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================== */}
        {/* FOOTER */}
        {/* ================================================================== */}
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-logo">OnTonight</div>
                <p>Your Night. Your People. Where Regulars Are Made.</p>
                <p className="footer-tagline">Professional identity platform for hospitality.</p>
              </div>
              <div className="footer-links">
                <h4>Platform</h4>
                <a href="https://app.on-tonight.com">Launch App</a>
                <a href="/careers">Careers</a>
                <a href="/partner">Partner With Us</a>
                <a href="/media">Press & Media</a>
              </div>
              <div className="footer-links">
                <h4>Legal</h4>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/contact">Contact Us</a>
              </div>
              <div className="footer-links">
                <h4>Connect</h4>
                <a href="mailto:hello@on-tonight.com">hello@on-tonight.com</a>
                <p>Tampa Bay, Florida</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 OnTonight LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* ================================================================== */}
        {/* LIGHTBOX */}
        {/* ================================================================== */}
        {lightboxImage && (
          <div className="lightbox" onClick={() => setLightboxImage(null)}>
            <div className="lightbox-content">
              <img src={lightboxImage} alt="Screenshot" />
              <button className="lightbox-close">×</button>
            </div>
          </div>
        )}
      </div>

      {/* ================================================================== */}
      {/* STYLES */}
      {/* ================================================================== */}
      <style jsx>{`
        /* ============================================
           GLOBAL & RESET
           ============================================ */
        .page {
          min-height: 100vh;
          background: #0d1117;
          color: #f8fafc;
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ============================================
           SCROLL PROGRESS BAR
           ============================================ */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #d4a373, #c99763);
          z-index: 9999;
          transition: width 0.1s ease;
        }

        /* ============================================
           FLOATING PARTICLES
           ============================================ */
        .particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(212, 163, 115, 0.3);
          border-radius: 50%;
          animation: float-up linear infinite;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }

        /* ============================================
           ANIMATIONS
           ============================================ */
        .animate-fade-in {
          animation: fadeIn 0.6s ease forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease forwards;
        }

        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ============================================
           GLASS CARD
           ============================================ */
        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 163, 115, 0.2);
          transform: translateY(-4px);
        }

        /* ============================================
           NAVIGATION
           ============================================ */
        .nav {
          position: sticky;
          top: 0;
          background: rgba(13, 17, 23, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 163, 115, 0.1);
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
          color: rgba(248, 250, 252, 0.5);
          padding: 10px 18px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          border-radius: 6px;
        }

        .nav-tab:hover {
          color: rgba(248, 250, 252, 0.9);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-tab.active {
          color: #d4a373;
          background: rgba(212, 163, 115, 0.1);
        }

        .nav-cta {
          background: #d4a373;
          color: #0d1117;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          margin-left: 16px;
          border-radius: 6px;
        }

        .nav-cta:hover {
          background: #c99763;
          transform: translateY(-2px);
        }

        /* ============================================
           HERO
           ============================================ */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          text-align: center;
          padding: 120px 24px 80px;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -300px;
          left: 50%;
          transform: translateX(-50%);
          width: 1200px;
          height: 1200px;
          background: radial-gradient(circle, rgba(212, 163, 115, 0.15) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-glow-2 {
          position: absolute;
          bottom: -400px;
          right: -200px;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .hero .container {
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          border: 1px solid rgba(212, 163, 115, 0.3);
          padding: 12px 24px;
          margin-bottom: 48px;
          border-radius: 50px;
          background: rgba(212, 163, 115, 0.05);
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
          50% { opacity: 0.5; }
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 80px);
          font-weight: 800;
          margin: 0 0 24px;
          color: #f8fafc;
          line-height: 1.1;
          letter-spacing: -0.03em;
          min-height: 1.2em;
        }

        .typewriter {
          display: inline;
        }

        .cursor {
          display: inline-block;
          color: #d4a373;
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .hero-subtitle {
          font-size: clamp(18px, 3vw, 24px);
          color: rgba(248, 250, 252, 0.7);
          margin-bottom: 48px;
          font-weight: 400;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          justify-content: center;
          align-items: center;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          color: #d4a373;
          font-weight: 700;
          font-size: clamp(28px, 4vw, 36px);
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          margin-top: 4px;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0d1117;
          border: none;
          padding: 18px 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
          border-radius: 8px;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(212, 163, 115, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212, 163, 115, 0.4);
          padding: 18px 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
          border-radius: 8px;
        }

        .btn-secondary:hover {
          border-color: #d4a373;
          background: rgba(212, 163, 115, 0.1);
        }

        .btn-install {
          margin-top: 32px;
          background: transparent;
          color: rgba(248, 250, 252, 0.5);
          border: 1px solid rgba(248, 250, 252, 0.15);
          padding: 12px 28px;
          font-size: 14px;
          cursor: pointer;
          font-family: inherit;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .btn-install:hover {
          border-color: rgba(248, 250, 252, 0.3);
          color: rgba(248, 250, 252, 0.8);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(248, 250, 252, 0.4);
          font-size: 12px;
          animation: bounce 2s infinite;
        }

        .scroll-arrow {
          font-size: 20px;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }

        /* ============================================
           SECTION STYLES
           ============================================ */
        .section-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          text-align: center;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 18px;
          color: rgba(248, 250, 252, 0.6);
          text-align: center;
          max-width: 700px;
          margin: 0 auto 60px;
          line-height: 1.7;
        }

        /* ============================================
           VALUE SECTION
           ============================================ */
        .value {
          padding: 120px 24px;
          background: linear-gradient(180deg, #0d1117 0%, #161b22 100%);
        }

        .value-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .value-item {
          padding: 32px;
          text-align: center;
        }

        .value-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .value-number {
          font-size: 48px;
          font-weight: 800;
          color: #d4a373;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .value-label {
          font-size: 16px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 16px;
        }

        .value-item p {
          font-size: 15px;
          color: rgba(248, 250, 252, 0.6);
          line-height: 1.7;
          margin: 0;
        }

        /* ============================================
           QUOTES SECTION
           ============================================ */
        .quotes {
          padding: 100px 24px;
          background: #0d1117;
        }

        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .quote-card {
          padding: 32px;
          margin: 0;
        }

        .quote-card p {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.85);
          margin: 0 0 20px;
          font-style: italic;
        }

        .quote-card cite {
          font-size: 14px;
          color: #d4a373;
          font-style: normal;
        }

        /* ============================================
           MISSION SECTION
           ============================================ */
        .mission {
          padding: 120px 24px;
          background: linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
        }

        .mission-statement {
          font-size: clamp(20px, 3vw, 26px);
          text-align: center;
          color: rgba(248, 250, 252, 0.85);
          max-width: 900px;
          margin: 0 auto 60px;
          line-height: 1.7;
        }

        .mission-pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .pillar {
          padding: 32px;
        }

        .pillar h4 {
          color: #d4a373;
          font-size: 20px;
          margin: 0 0 16px;
        }

        .pillar p {
          font-size: 15px;
          color: rgba(248, 250, 252, 0.7);
          line-height: 1.7;
          margin: 0;
        }

        /* ============================================
           PLATFORM SECTION
           ============================================ */
        .platform-intro {
          text-align: center;
          padding: 120px 24px 60px;
        }

        .platform-lead {
          font-size: 20px;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 48px;
        }

        .platform-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .platform-tab {
          background: rgba(212, 163, 115, 0.05);
          border: 1px solid rgba(212, 163, 115, 0.2);
          color: rgba(248, 250, 252, 0.7);
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          font-family: inherit;
          transition: all 0.3s;
        }

        .platform-tab:hover {
          background: rgba(212, 163, 115, 0.1);
          border-color: rgba(212, 163, 115, 0.4);
          color: #f8fafc;
        }

        .platform-tab.active {
          background: rgba(212, 163, 115, 0.15);
          border-color: #d4a373;
          color: #d4a373;
        }

        /* ============================================
           FEATURES SECTION
           ============================================ */
        .features {
          padding: 60px 24px 120px;
        }

        .feature-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .feature-block.science-block {
          grid-template-columns: 1fr;
        }

        .feature-info.full-width {
          max-width: 100%;
        }

        .feature-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          padding: 6px 14px;
          border-radius: 4px;
          margin-bottom: 16px;
        }

        .feature-tag.onpro {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .feature-tag.patron {
          background: rgba(139, 92, 246, 0.15);
          color: #8b5cf6;
        }

        .feature-tag.venue {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
        }

        .feature-tag.science {
          background: rgba(212, 163, 115, 0.15);
          color: #d4a373;
        }

        .feature-info h3 {
          font-size: 32px;
          margin: 0 0 16px;
          font-weight: 700;
        }

        .feature-lead {
          font-size: 17px;
          color: rgba(248, 250, 252, 0.7);
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .feature-details {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-section h4 {
          font-size: 16px;
          margin: 0 0 8px;
          color: #f8fafc;
        }

        .detail-section p {
          font-size: 15px;
          color: rgba(248, 250, 252, 0.6);
          line-height: 1.6;
          margin: 0;
        }

        .feature-price {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 40px;
        }

        .price-tier {
          padding: 28px;
          background: rgba(13, 17, 23, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }

        .tier-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 16px;
        }

        .price-tier.free .tier-badge {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .price-tier.trial .tier-badge {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
        }

        .price-tier.premium .tier-badge {
          background: rgba(212, 163, 115, 0.15);
          color: #d4a373;
        }

        .tier-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .tier-name span {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          font-weight: 400;
        }

        .price-tier ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .price-tier li {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.7);
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
        }

        .price-tier li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #22c55e;
        }

        /* ============================================
           SCREENSHOTS
           ============================================ */
        .feature-screenshots {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .feature-screenshots.single-shot {
          grid-template-columns: 1fr;
        }

        .screenshot-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .screenshot-wrapper.large {
          max-width: 500px;
          margin: 0 auto;
        }

        .screenshot {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s;
        }

        .screenshot:hover {
          transform: scale(1.03);
          border-color: rgba(212, 163, 115, 0.4);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .screenshot-label {
          font-size: 12px;
          color: rgba(248, 250, 252, 0.5);
          text-align: center;
        }

        /* ============================================
           ARCHETYPES
           ============================================ */
        .archetypes-section {
          grid-column: 1 / -1;
          margin-top: 60px;
          padding-top: 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .archetypes-section h4 {
          font-size: 24px;
          text-align: center;
          margin-bottom: 8px;
        }

        .archetypes-intro {
          text-align: center;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 32px;
        }

        .archetypes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .patron-grid {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        }

        .archetype-card {
          padding: 24px;
          text-align: center;
        }

        .archetype-emoji {
          font-size: 36px;
          display: block;
          margin-bottom: 12px;
        }

        .archetype-card h5 {
          font-size: 16px;
          margin: 0 0 8px;
          color: #d4a373;
        }

        .archetype-card p {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.6);
          line-height: 1.6;
          margin: 0;
        }

        /* ============================================
           SCIENCE SECTION
           ============================================ */
        .science-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-top: 40px;
        }

        .science-card {
          padding: 32px;
        }

        .science-card h4 {
          font-size: 22px;
          margin: 0 0 8px;
        }

        .science-subtitle {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          margin-bottom: 24px;
        }

        .science-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
        }

        .science-list li {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.75);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .science-detail {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.6);
          line-height: 1.7;
        }

        .science-conclusion {
          text-align: center;
          font-size: 16px;
          color: rgba(248, 250, 252, 0.8);
          line-height: 1.8;
          max-width: 900px;
          margin: 48px auto 0;
        }

        /* ============================================
           FOUNDER / VISION SECTION
           ============================================ */
        .founder-hero {
          padding: 120px 24px 60px;
          text-align: center;
        }

        .founder-intro {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .founder-photo {
          width: 200px;
          height: 200px;
        }

        .photo-placeholder {
          width: 100%;
          height: 100%;
          background: rgba(212, 163, 115, 0.1);
          border: 2px dashed rgba(212, 163, 115, 0.3);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .photo-placeholder span {
          font-size: 64px;
          opacity: 0.5;
        }

        .photo-placeholder p {
          font-size: 12px;
          color: rgba(212, 163, 115, 0.7);
          margin-top: 8px;
        }

        .founder-text h1 {
          font-size: clamp(28px, 4vw, 40px);
          margin: 0 0 16px;
          font-weight: 700;
        }

        .founder-tagline {
          font-size: 20px;
          color: #d4a373;
          margin: 0;
        }

        .vision-content {
          padding: 60px 24px 120px;
        }

        .vision-content .container {
          max-width: 800px;
        }

        .vision-section {
          margin-bottom: 60px;
        }

        .vision-section h3 {
          font-size: 28px;
          color: #d4a373;
          margin-bottom: 24px;
        }

        .vision-section p {
          font-size: 17px;
          line-height: 1.8;
          color: rgba(248, 250, 252, 0.8);
          margin-bottom: 20px;
        }

        .vision-section em {
          color: #f8fafc;
        }

        .vision-emphasis {
          font-size: 18px !important;
          color: rgba(248, 250, 252, 0.9) !important;
          background: rgba(212, 163, 115, 0.08);
          padding: 20px 24px;
          border-left: 3px solid #d4a373;
          margin: 28px 0;
        }

        .vision-highlight {
          color: #d4a373 !important;
        }

        .vision-statement {
          font-size: 18px !important;
          font-style: italic;
          text-align: center;
          color: rgba(248, 250, 252, 0.9) !important;
          margin: 32px 0;
        }

        .vision-list {
          list-style: none;
          padding: 0;
          margin: 24px 0;
        }

        .vision-list li {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(248, 250, 252, 0.8);
          margin-bottom: 20px;
          padding-left: 20px;
          position: relative;
        }

        .vision-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #d4a373;
        }

        .vision-cta {
          text-align: center;
          padding: 60px 40px;
          background: rgba(212, 163, 115, 0.05);
          border: 1px solid rgba(212, 163, 115, 0.15);
          border-radius: 16px;
          margin-top: 80px;
        }

        .vision-cta h3 {
          font-size: 32px;
          margin-bottom: 20px;
        }

        .vision-cta p {
          max-width: 600px;
          margin: 0 auto 24px;
        }

        .cta-emphasis {
          font-size: 18px !important;
          color: #d4a373 !important;
          font-weight: 500;
        }

        .cta-note {
          font-size: 14px !important;
          color: rgba(248, 250, 252, 0.5) !important;
          margin-top: 16px !important;
        }

        /* ============================================
           WAITLIST SECTION
           ============================================ */
        .waitlist {
          padding: 120px 24px;
          background: linear-gradient(180deg, #0d1117 0%, #161b22 100%);
          text-align: center;
        }

        .waitlist h2 {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .waitlist-subtitle {
          font-size: 18px;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 48px;
        }

        .waitlist-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .waitlist-form input,
        .waitlist-form select {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #f8fafc;
          font-size: 16px;
          font-family: inherit;
          transition: all 0.2s;
        }

        .waitlist-form input::placeholder {
          color: rgba(248, 250, 252, 0.4);
        }

        .waitlist-form input:focus,
        .waitlist-form select:focus {
          outline: none;
          border-color: #d4a373;
          background: rgba(212, 163, 115, 0.05);
        }

        .waitlist-form select {
          cursor: pointer;
        }

        .form-disclaimer {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.4);
          margin: 20px 0;
          line-height: 1.6;
        }

        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0d1117;
          border: none;
          padding: 18px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          font-family: inherit;
          transition: all 0.3s;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(212, 163, 115, 0.3);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .waitlist-success {
          padding: 40px;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }

        .waitlist-success h2 {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .waitlist-success p {
          font-size: 17px;
          color: rgba(248, 250, 252, 0.7);
          margin-bottom: 32px;
        }

        /* ============================================
           FOOTER
           ============================================ */
        .footer {
          padding: 80px 24px 40px;
          background: #0a0c0f;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-logo {
          font-size: 24px;
          font-weight: 700;
          color: #d4a373;
          margin-bottom: 16px;
        }

        .footer-brand p {
          font-size: 15px;
          color: rgba(248, 250, 252, 0.6);
          line-height: 1.7;
          margin: 0 0 8px;
        }

        .footer-tagline {
          font-size: 13px !important;
          color: rgba(248, 250, 252, 0.4) !important;
        }

        .footer-links h4 {
          font-size: 14px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .footer-links a,
        .footer-links p {
          display: block;
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          text-decoration: none;
          margin-bottom: 12px;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #d4a373;
        }

        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          text-align: center;
        }

        .footer-bottom p {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.4);
          margin: 0;
        }

        /* ============================================
           LIGHTBOX
           ============================================ */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
        }

        .lightbox-content img {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 12px;
        }

        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 32px;
          cursor: pointer;
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 1024px) {
          .feature-block {
            grid-template-columns: 1fr;
          }

          .feature-screenshots {
            order: -1;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .science-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .nav-tabs {
            display: none;
          }

          .hero-stats {
            gap: 24px;
          }

          .stat-divider {
            display: none;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .feature-price {
            grid-template-columns: 1fr;
          }

          .feature-screenshots {
            grid-template-columns: 1fr 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .archetypes-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .feature-screenshots {
            grid-template-columns: 1fr;
          }

          .hero {
            padding: 100px 20px 60px;
          }

          .hero-badge {
            font-size: 10px;
            padding: 10px 16px;
          }

          .scroll-indicator {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
