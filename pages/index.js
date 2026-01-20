// pages/index.js - OnTonight PLATINUM ULTIMATE EDITION
// Full V3 content (~2,100 lines) + MAGIC animations (~400 lines)
// = ~2,500+ lines of production-ready landing page
// Bartender + Server spotlight throughout

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [activeTab, setActiveTab] = useState('home');
  const [platformTab, setPlatformTab] = useState('onpro');
  const [formData, setFormData] = useState({ name: '', email: '', userType: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  
  // MAGIC Animation State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showTagline, setShowTagline] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroPhase, setHeroPhase] = useState(0);
  
  const formRef = useRef(null);

  // ============================================
  // TYPEWRITER EFFECT
  // ============================================
  const fullTitle = "Your Night. Your People.";
  
  useEffect(() => {
    setIsLoaded(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullTitle.length) {
        setTypedText(fullTitle.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setShowTagline(true);
          setHeroPhase(1);
        }, 400);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);
  
  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // ============================================
  // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ============================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id || entry.target.dataset.section;
            setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab, platformTab]);
  
  // ============================================
  // PWA INSTALL PROMPT
  // ============================================
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
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShowInstallPrompt(false);
      setDeferredPrompt(null);
    }
  };
  
  // ============================================
  // FORM HANDLERS
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const scrollToWaitlist = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ============================================
  // FULL ARCHETYPE DATA - All 24 (12 OnPro + 12 Patron)
  // ============================================
  const archetypes = {
    // PATRON ARCHETYPES (12)
    connector: { emoji: '🔗', name: 'The Connector', desc: 'You thrive on introducing people. Every night out is an opportunity to build bridges between strangers who should know each other.', type: 'patron' },
    explorer: { emoji: '🧭', name: 'The Explorer', desc: 'New venues, hidden gems, undiscovered talent—you are always seeking the next great experience that others have missed.', type: 'patron' },
    loyalist: { emoji: '🏠', name: 'The Loyalist', desc: 'When you find your spot and your people, you commit. Regular status is not just a badge—it is your social identity.', type: 'patron' },
    celebrator: { emoji: '🎊', name: 'The Celebrator', desc: 'Life is full of moments worth celebrating, and you make sure every one counts. Birthdays, promotions, random Tuesdays.', type: 'patron' },
    relaxer: { emoji: '😌', name: 'The Relaxer', desc: 'Your nights out are about unwinding, decompressing, and finding peace in good company and great service.', type: 'patron' },
    supporter: { emoji: '💪', name: 'The Supporter', desc: 'You champion the people and places you believe in, becoming their biggest advocate and repeat customer.', type: 'patron' },
    critic: { emoji: '🧐', name: 'The Critic', desc: 'Your high standards push the industry forward. You know what excellence looks like and you are not afraid to say so.', type: 'patron' },
    storyteller: { emoji: '📖', name: 'The Storyteller', desc: 'Every night out becomes a story. You remember the details and share the experiences with vivid passion.', type: 'patron' },
    student: { emoji: '📚', name: 'The Student', desc: 'Always learning, always asking questions. You want to understand the craft behind the experience.', type: 'patron' },
    socialite: { emoji: '✨', name: 'The Socialite', desc: 'You know everyone and everyone knows you. Your presence elevates any venue you choose to grace.', type: 'patron' },
    connoisseur: { emoji: '🍷', name: 'The Connoisseur', desc: 'Quality over quantity, always. You appreciate the finer details that others miss.', type: 'patron' },
    nightowl: { emoji: '🦉', name: 'The Night Owl', desc: 'The night is young when others are leaving. You come alive in the late hours.', type: 'patron' },
    
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
    diplomat: { emoji: '🤝', name: 'The Diplomat', desc: 'Conflict resolution and team harmony are your strengths. You navigate difficult situations with grace.', type: 'onpro' },
    veteran: { emoji: '🎖️', name: 'The Veteran', desc: 'Decades of wisdom in every interaction. You have seen it all and handle everything with measured grace.', type: 'onpro' },
    rising: { emoji: '🌟', name: 'The Rising Star', desc: 'Ambition meets talent. You are learning fast, pushing limits, and building toward something bigger.', type: 'onpro' },
  };
  
  // ============================================
  // INDUSTRY QUOTES - Real voices
  // ============================================
  const industryQuotes = [
    { quote: "I spent 8 years building a following at one restaurant. When I left, I had to rebuild from scratch. My regulars had no way to find me.", cite: "— Senior Bartender, 12 years experience" },
    { quote: "Every time I change jobs, I lose everything. My reputation, my regulars, my schedule preferences. It's like the industry has amnesia.", cite: "— Lead Server, Fine Dining" },
    { quote: "I've trained hundreds of excellent bartenders and servers. Watched them leave because we couldn't prove their value to new employers.", cite: "— Hospitality Director, 20 years" },
    { quote: "The turnover crisis isn't about pay. It's about professional infrastructure. These workers have no portable career.", cite: "— Industry Consultant" },
    { quote: "My best server left for a corporate chain. Six months later she was back—they couldn't see her real value without proof.", cite: "— Restaurant Owner, Tampa" },
    { quote: "We lose $40K every time we have to replace a trained bartender. The hidden costs are devastating.", cite: "— Bar Manager, Nashville" },
  ];

  // ============================================
  // RENDER - START
  // ============================================
  return (
    <>
      <Head>
        <title>OnTonight — Where Regulars Are Made</title>
        <meta name="description" content="Professional identity platform for hospitality. Your Night. Your People. Where Regulars Are Made." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      
      {/* SCROLL PROGRESS BAR */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      
      {/* NAVIGATION */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">OnTonight</div>
          <div className="nav-tabs">
            <button className={activeTab === 'home' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('home')}>The Problem</button>
            <button className={activeTab === 'platform' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('platform')}>Platform</button>
            <button className={activeTab === 'founder' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('founder')}>The Solution</button>
            <a href="#waitlist" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollToWaitlist(); }}>Join Waitlist</a>
          </div>
        </div>
      </nav>

      {/* ============================================
          HOME TAB - Problem + Emotional Hook
      ============================================ */}
      {activeTab === 'home' && (
        <div className="tab-content">
          {/* HERO - TYPEWRITER ANIMATION */}
          <section className="hero">
            <div className="hero-glow" />
            <div className="hero-particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="particle" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 20}s`
                }} />
              ))}
            </div>
            
            <div className="container">
              <div className={`hero-badge ${isLoaded ? 'visible' : ''}`}>LIVE NOW · TAMPA PILOT · JOIN THE MOVEMENT</div>
              
              <h1 className="hero-title">
                <span className="typed-text">{typedText}</span>
                <span className="cursor">|</span>
              </h1>
              
              <p className={`hero-subtitle ${showTagline ? 'visible' : ''}`}>Where Regulars Are Made</p>
              
              <div className={`hero-stats ${heroPhase >= 1 ? 'visible' : ''}`}>
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
              
              <div className={`hero-ctas ${heroPhase >= 1 ? 'visible' : ''}`}>
                <button onClick={() => setActiveTab('platform')} className="btn-primary btn-glow">Explore Platform</button>
                <button onClick={() => setActiveTab('founder')} className="btn-secondary">The Vision</button>
              </div>
              
              {showInstallPrompt && (
                <button onClick={handleInstall} className="btn-install">📱 Add to Home Screen</button>
              )}
              
              <div className={`scroll-indicator ${heroPhase >= 1 ? 'visible' : ''}`}>
                <span>Scroll to discover</span>
                <div className="scroll-arrow">↓</div>
              </div>
            </div>
          </section>

          {/* VALUE PROPS - STAGGERED ANIMATION */}
          <section className="value" id="value" data-animate>
            <div className="container">
              <h2 className={visibleSections.value ? 'visible' : ''}>What's Your Career Worth?</h2>
              <p className={`section-subtitle ${visibleSections.value ? 'visible d1' : ''}`}>The hidden cost of hospitality turnover—and how OnTonight fixes it.</p>
              
              <div className="value-grid">
                <div className={`value-item ${visibleSections.value ? 'visible d1' : ''}`}>
                  <div className="value-icon">💰</div>
                  <div className="value-number">$24K</div>
                  <div className="value-label">Lost in Tips Per Venue Change</div>
                  <p>Average bartender or server loses $24,000 in regular tips when changing venues. Your regulars can't follow you.</p>
                </div>
                <div className={`value-item ${visibleSections.value ? 'visible d2' : ''}`}>
                  <div className="value-icon">🔄</div>
                  <div className="value-number">73%</div>
                  <div className="value-label">Annual Turnover Rate</div>
                  <p>The hospitality industry accepts this as "normal." It's not normal—it's the absence of professional infrastructure.</p>
                </div>
                <div className={`value-item ${visibleSections.value ? 'visible d3' : ''}`}>
                  <div className="value-icon">📈</div>
                  <div className="value-number">$66.8B</div>
                  <div className="value-label">Annual Industry Cost</div>
                  <p>The turnover crisis costs the industry billions. OnTonight turns retention into competitive advantage.</p>
                </div>
              </div>
            </div>
          </section>

          {/* QUOTES - Industry Voices */}
          <section className="quotes" id="quotes" data-animate>
            <div className="container">
              <h2 className={visibleSections.quotes ? 'visible' : ''}>Voices from the Industry</h2>
              <p className={`section-subtitle ${visibleSections.quotes ? 'visible d1' : ''}`}>Real stories from bartenders, servers, and hospitality professionals.</p>
              <div className="quotes-grid">
                {industryQuotes.map((q, index) => (
                  <div key={index} className={`quote ${visibleSections.quotes ? `visible d${index + 1}` : ''}`}>
                    <p>"{q.quote}"</p>
                    <cite>{q.cite}</cite>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MISSION */}
          <section className="mission" id="mission" data-animate>
            <div className="container">
              <div className="mission-content">
                <h2 className={visibleSections.mission ? 'visible' : ''}>The Mission</h2>
                <p className={`mission-statement ${visibleSections.mission ? 'visible d1' : ''}`}>
                  OnTonight exists to end professional erasure in hospitality. We believe that bartenders and servers deserve the same career infrastructure that every other profession has: portable credentials, verified skills, and customer relationships that follow them wherever they go.
                </p>
                <div className="mission-pillars">
                  <div className={`pillar ${visibleSections.mission ? 'visible d2' : ''}`}>
                    <h4>For OnPros</h4>
                    <p>Portable professional identity. Skills verified through DAPA. Customers follow you, not the venue. Your value compounds over time.</p>
                  </div>
                  <div className={`pillar ${visibleSections.mission ? 'visible d3' : ''}`}>
                    <h4>For Patrons</h4>
                    <p>Never lose your favorite bartender or server again. Follow the people, not the places. Build real relationships.</p>
                  </div>
                  <div className={`pillar ${visibleSections.mission ? 'visible d4' : ''}`}>
                    <h4>For Venues</h4>
                    <p>Recruit DAPA-verified talent. Showcase your team. Turn retention into competitive advantage. Reduce turnover costs.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WAITLIST */}
          <section className="waitlist" id="waitlist" data-animate ref={formRef}>
            <div className="container">
              <div className={`waitlist-card ${visibleSections.waitlist ? 'visible' : ''}`}>
                {!submitted ? (
                  <>
                    <h2>Join the Movement</h2>
                    <p className="waitlist-subtitle">Be first to know when OnTonight launches in your city. The first 2,000 get free premium access.</p>
                    <form onSubmit={handleSubmit} className="waitlist-form">
                      <div className="form-row">
                        <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
                        <input type="email" placeholder="Email address" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
                      </div>
                      <div className="form-row">
                        <select value={formData.userType} onChange={(e) => setFormData(prev => ({ ...prev, userType: e.target.value }))} required>
                          <option value="">I am a...</option>
                          <option value="bartender">Bartender</option>
                          <option value="server">Server</option>
                          <option value="manager">Manager</option>
                          <option value="patron">Regular Customer</option>
                          <option value="venue">Venue Owner</option>
                          <option value="investor">Investor</option>
                        </select>
                        <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))} />
                      </div>
                      <p className="form-disclaimer">By signing up, you agree to our Privacy Policy and Terms of Service. We will never spam you or share your information.</p>
                      <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Submitting...' : 'Get Early Access'}</button>
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
            </div>
          </section>
        </div>
      )}

      {/* ============================================
          PLATFORM TAB - Full Feature Showcase
      ============================================ */}
      {activeTab === 'platform' && (
        <div className="tab-content">
          {/* PLATFORM INTRO */}
          <section className="platform-intro" id="platform-intro" data-animate>
            <div className="container">
              <h1 className={visibleSections['platform-intro'] ? 'visible' : ''}>The Platform</h1>
              <p className={`platform-lead ${visibleSections['platform-intro'] ? 'visible d1' : ''}`}>Three solutions. Complete ecosystem.</p>
              
              <div className="platform-tabs">
                <button className={`platform-tab ${platformTab === 'onpro' ? 'active' : ''}`} onClick={() => setPlatformTab('onpro')}>For OnPros</button>
                <button className={`platform-tab ${platformTab === 'patron' ? 'active' : ''}`} onClick={() => setPlatformTab('patron')}>For Patrons</button>
                <button className={`platform-tab ${platformTab === 'venue' ? 'active' : ''}`} onClick={() => setPlatformTab('venue')}>For Venues</button>
                <button className={`platform-tab ${platformTab === 'science' ? 'active' : ''}`} onClick={() => setPlatformTab('science')}>The Science</button>
              </div>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="features" id="features" data-animate>
            <div className="container">
              
              {/* ===== ONPRO TAB ===== */}
              {platformTab === 'onpro' && (
                <>
                  <div className={`feature ${visibleSections.features ? 'visible' : ''}`}>
                    <div className="feature-screenshots">
                      <img src="/screenshots/onpro-assessment-dashboard.jpg" alt="OnPro DAPA Assessment Dashboard" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-assessment-dashboard.jpg')} />
                      <img src="/screenshots/onpro-skills-catagories.jpg" alt="OnPro Skills Categories" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-skills-catagories.jpg')} />
                      <img src="/screenshots/onpro-profile-status.jpg" alt="OnPro Profile Status" className="screenshot" onClick={() => setLightboxImage('/screenshots/onpro-profile-status.jpg')} />
                    </div>
                    <div className="feature-info">
                      <div className="feature-tag">FOR BARTENDERS & SERVERS</div>
                      <h3>OnPro: Portable Career</h3>
                      <p className="feature-lead">Your professional identity follows you from venue to venue. Skills verified through our proprietary DAPA system. Customers follow YOU, not the venue.</p>
                      <div className="feature-details">
                        <div className="detail-section">
                          <h4>🎯 Verified Professional Identity</h4>
                          <p>DAPA assessment proves your expertise across 6 dimensions: Technical, Ethical, Emotional Intelligence, Velocity, Commercial, and Leadership. No more starting from zero.</p>
                        </div>
                        <div className="detail-section">
                          <h4>👥 Customer Relationships That Follow You</h4>
                          <p>When you change venues, your regulars get notified. The relationships you built belong to you—not your former employer.</p>
                        </div>
                        <div className="detail-section">
                          <h4>📊 Professional Analytics</h4>
                          <p>Track your following, check-ins, and professional growth over time. Build a verifiable track record that proves your value.</p>
                        </div>
                        <div className="detail-section">
                          <h4>🔔 "OnTonight" Status</h4>
                          <p>Let your regulars know when you're working. One tap to broadcast your shift to everyone who follows you.</p>
                        </div>
                      </div>
                      <div className="feature-price">
                        <div className="price-tier free">
                          <div className="tier-badge">FREE FOREVER</div>
                          <div className="tier-name">OnPro Basic</div>
                          <ul>
                            <li>Professional profile</li>
                            <li>DAPA assessment</li>
                            <li>Customer connections</li>
                            <li>OnTonight status</li>
                            <li>Basic analytics</li>
                          </ul>
                        </div>
                        <div className="price-tier premium">
                          <div className="tier-badge">PREMIUM</div>
                          <div className="tier-name">OnPro Plus <span>$9/month</span></div>
                          <ul>
                            <li>Everything in Basic</li>
                            <li>Advanced genome analytics</li>
                            <li>Priority in venue searches</li>
                            <li>Enhanced profile features</li>
                            <li>Export career data</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* ONPRO ARCHETYPES */}
                  <section className="genome" id="onpro-archetypes" data-animate>
                    <div className="container">
                      <h2 className={visibleSections['onpro-archetypes'] ? 'visible' : ''}>OnPro Archetypes</h2>
                      <p className={`section-subtitle ${visibleSections['onpro-archetypes'] ? 'visible d1' : ''}`}>12 professional personality profiles discovered through DAPA assessment.</p>
                      <p className="click-instruction">Click any archetype to learn more →</p>
                      <div className="genome-grid">
                        {Object.entries(archetypes).filter(([_, arch]) => arch.type === 'onpro').map(([key, arch], index) => (
                          <button key={key} className={`genome-item onpro ${selectedArchetype === key ? 'active' : ''} ${visibleSections['onpro-archetypes'] ? `visible d${index + 2}` : ''}`} onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}>
                            <span className="genome-emoji">{arch.emoji}</span>
                            <span className="genome-name">{arch.name}</span>
                          </button>
                        ))}
                      </div>
                      {selectedArchetype && archetypes[selectedArchetype]?.type === 'onpro' && (
                        <div className="genome-detail onpro">
                          <div className="genome-detail-header">
                            <span className="genome-detail-emoji">{archetypes[selectedArchetype].emoji}</span>
                            <h3>{archetypes[selectedArchetype].name}</h3>
                          </div>
                          <p>{archetypes[selectedArchetype].desc}</p>
                          <button onClick={() => setSelectedArchetype(null)} className="btn-close">Close</button>
                        </div>
                      )}
                    </div>
                  </section>
                </>
              )}
              
              {/* ===== PATRON TAB ===== */}
              {platformTab === 'patron' && (
                <>
                  <div className={`feature feature-reverse ${visibleSections.features ? 'visible' : ''}`}>
                    <div className="feature-screenshots four-shots">
                      <img src="/screenshots/patron-genome-result.jpg" alt="Patron OnScene Genome Result" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-genome-result.jpg')} />
                      <img src="/screenshots/patron-profile.jpg" alt="Patron Profile" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-profile.jpg')} />
                      <img src="/screenshots/patron-mypeople.jpg" alt="Patron MyPeople Status" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-mypeople.jpg')} />
                      <img src="/screenshots/patron-my-spots.jpg" alt="Patron MySpots Tracking" className="screenshot" onClick={() => setLightboxImage('/screenshots/patron-my-spots.jpg')} />
                    </div>
                    <div className="feature-info">
                      <div className="feature-tag patron">FOR CUSTOMERS</div>
                      <h3>Patron: Find Your People</h3>
                      <p className="feature-lead">Follow your favorite bartenders and servers. See who's working tonight. Never lose touch when they change venues. Discover new verified talent.</p>
                      <div className="feature-details">
                        <div className="detail-section">
                          <h4>🔔 Real-Time OnTonight Status</h4>
                          <p>See which of your regular bartenders and servers are working right now. Get notifications when they clock in.</p>
                        </div>
                        <div className="detail-section">
                          <h4>📍 Follow People, Not Places</h4>
                          <p>Your favorite server changes restaurants? You get notified. The relationship persists across venue changes.</p>
                        </div>
                        <div className="detail-section">
                          <h4>⭐ Check-In History & Regular Status</h4>
                          <p>Track your visits. Build regular status with OnPros. Unlock VIP treatment by becoming a verified regular.</p>
                        </div>
                        <div className="detail-section">
                          <h4>🎯 Smart Venue Matching</h4>
                          <p>Get personalized venue recommendations based on your OnScene Genome, preferences, and the OnPros you follow.</p>
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
                            <li>Push notifications</li>
                            <li>Advanced venue matching</li>
                            <li>Exclusive events</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* PATRON ARCHETYPES */}
                  <section className="genome" id="patron-archetypes" data-animate>
                    <div className="container">
                      <h2 className={visibleSections['patron-archetypes'] ? 'visible' : ''}>OnScene Genome Archetypes</h2>
                      <p className={`section-subtitle ${visibleSections['patron-archetypes'] ? 'visible d1' : ''}`}>12 social profiles that define your hospitality personality.</p>
                      <p className="click-instruction">Click any archetype to learn more →</p>
                      <div className="genome-grid">
                        {Object.entries(archetypes).filter(([_, arch]) => arch.type === 'patron').map(([key, arch], index) => (
                          <button key={key} className={`genome-item patron ${selectedArchetype === key ? 'active' : ''} ${visibleSections['patron-archetypes'] ? `visible d${index + 2}` : ''}`} onClick={() => setSelectedArchetype(selectedArchetype === key ? null : key)}>
                            <span className="genome-emoji">{arch.emoji}</span>
                            <span className="genome-name">{arch.name}</span>
                          </button>
                        ))}
                      </div>
                      {selectedArchetype && archetypes[selectedArchetype]?.type === 'patron' && (
                        <div className="genome-detail patron">
                          <div className="genome-detail-header">
                            <span className="genome-detail-emoji">{archetypes[selectedArchetype].emoji}</span>
                            <h3>{archetypes[selectedArchetype].name}</h3>
                          </div>
                          <p>{archetypes[selectedArchetype].desc}</p>
                          <button onClick={() => setSelectedArchetype(null)} className="btn-close">Close</button>
                        </div>
                      )}
                    </div>
                  </section>
                </>
              )}
              
              {/* ===== VENUE TAB ===== */}
              {platformTab === 'venue' && (
                <>
                  <div className={`feature ${visibleSections.features ? 'visible' : ''}`}>
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
                          <p>Search for DAPA-verified OnPros by skill level, specialty, and availability. No more hiring based on resumes and promises.</p>
                        </div>
                        <div className="detail-section">
                          <h4>📊 Staff Impact Analytics</h4>
                          <p>See which staff members drive check-ins and customer loyalty. Make data-driven scheduling and staffing decisions.</p>
                        </div>
                        <div className="detail-section">
                          <h4>🏆 Showcase Your Team</h4>
                          <p>Feature your verified OnPros on your venue profile. Attract customers who follow specific bartenders and servers.</p>
                        </div>
                        <div className="detail-section">
                          <h4>💰 Reduce Turnover Costs</h4>
                          <p>Give your team a platform where their career value compounds. Become the venue where professionals want to stay.</p>
                        </div>
                      </div>
                      <div className="venue-benefits">
                        <h4>Why Venues Choose OnTonight</h4>
                        <div className="benefits-grid">
                          <div className="benefit"><h5>Verified Hiring</h5><p>Hire from DAPA-verified professionals with proven track records.</p></div>
                          <div className="benefit"><h5>Staff Showcase</h5><p>Feature your team—customers follow great staff.</p></div>
                          <div className="benefit"><h5>Retention Advantage</h5><p>Staff stay when their career grows with your venue.</p></div>
                          <div className="benefit"><h5>Data-Driven Ops</h5><p>Track which staff drive loyalty and revenue.</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* ===== SCIENCE TAB ===== */}
              {platformTab === 'science' && (
                <>
                  <div className={`science-intro ${visibleSections.features ? 'visible' : ''}`}>
                    <h2>The Science Behind OnTonight</h2>
                    <p className="section-subtitle">Two proprietary assessment systems. Complete hospitality identity.</p>
                    <div className="science-comparison">
                      <div className="science-col onpro">
                        <h4>DAPA (OnPro)</h4>
                        <p>Dynamic Adaptive Proficiency Assessment. 1,600+ questions across 6 professional dimensions. Verifies skills. Creates portable professional identity. Helps venues hire better and OnPros prove their worth.</p>
                      </div>
                      <div className="science-col patron">
                        <h4>OnScene Genome (Patron)</h4>
                        <p>Measures social behavior and hospitality preferences. Matches people to experiences. Creates personalized recommendations. Helps Patrons find their people and places.</p>
                      </div>
                    </div>
                    <p className="science-summary">Together, they create a complete hospitality identity ecosystem. OnPros prove their professional value. Patrons discover authentic experiences. Venues showcase verified talent.</p>
                  </div>
                  
                  {/* DAPA DIMENSIONS */}
                  <section className="dapa" id="dapa-dimensions" data-animate>
                    <div className="container">
                      <h3 className={visibleSections['dapa-dimensions'] ? 'visible' : ''}>DAPA: 6 Professional Dimensions</h3>
                      <p className={`section-subtitle ${visibleSections['dapa-dimensions'] ? 'visible d1' : ''}`}>1,600+ questions measuring what really matters in hospitality.</p>
                      <div className="dapa-grid">
                        <div className={`dapa-item ${visibleSections['dapa-dimensions'] ? 'visible d1' : ''}`}><div className="dapa-icon technical">🎯</div><h4>Technical</h4><p>Knowledge, procedures, problem-solving, craft mastery</p></div>
                        <div className={`dapa-item ${visibleSections['dapa-dimensions'] ? 'visible d2' : ''}`}><div className="dapa-icon ethical">⚖️</div><h4>Ethical</h4><p>Integrity, compliance, judgment, moral decision-making</p></div>
                        <div className={`dapa-item ${visibleSections['dapa-dimensions'] ? 'visible d3' : ''}`}><div className="dapa-icon emotional">💚</div><h4>Emotional</h4><p>Empathy, guest relationships, boundaries, self-regulation</p></div>
                        <div className={`dapa-item ${visibleSections['dapa-dimensions'] ? 'visible d4' : ''}`}><div className="dapa-icon velocity">⚡</div><h4>Velocity</h4><p>Speed, pressure performance, crisis management, efficiency</p></div>
                        <div className={`dapa-item ${visibleSections['dapa-dimensions'] ? 'visible d5' : ''}`}><div className="dapa-icon commercial">💰</div><h4>Commercial</h4><p>Sales awareness, upselling, revenue thinking, business impact</p></div>
                        <div className={`dapa-item ${visibleSections['dapa-dimensions'] ? 'visible d6' : ''}`}><div className="dapa-icon leadership">👑</div><h4>Leadership</h4><p>Team dynamics, conflict resolution, mentoring, initiative</p></div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </section>

          {/* BOTTOM CTA */}
          <section className="bottom-cta" id="bottom-cta" data-animate>
            <div className="container">
              <h2 className={visibleSections['bottom-cta'] ? 'visible' : ''}>Ready to Own Your Career?</h2>
              <p className={visibleSections['bottom-cta'] ? 'visible d1' : ''}>Join thousands of hospitality professionals taking control of their professional future.</p>
              <button onClick={scrollToWaitlist} className={`btn-primary btn-glow ${visibleSections['bottom-cta'] ? 'visible d2' : ''}`}>Join Waitlist</button>
            </div>
          </section>
        </div>
      )}

      {/* ============================================
          FOUNDER TAB - CINEMATIC 1,050 WORD STORY
      ============================================ */}
      {activeTab === 'founder' && (
        <div className="tab-content">
          <section className="vision" id="founder" data-animate>
            <div className="container">
              <h1 className={visibleSections.founder ? 'visible' : ''}>The Vision</h1>
              <p className={`vision-lead ${visibleSections.founder ? 'visible d1' : ''}`}>This is about an industry that deserves infrastructure. And the people who make it real.</p>

              <div className="vision-content">
                {/* FOUNDER INTRODUCTION */}
                <div className={`founder-intro ${visibleSections.founder ? 'visible d2' : ''}`}>
                  <div className="founder-photo-placeholder">
                    <div className="photo-placeholder-box">
                      <span style={{fontSize: '48px'}}>👤</span>
                      <p style={{marginTop: '12px', fontSize: '13px', color: 'rgba(212,163,115,0.7)'}}>Photo Coming Soon</p>
                    </div>
                  </div>
                  <div className="founder-text">
                    <h2>Hi, I'm Jack Joy, Founder of OnTonight.</h2>
                    <p className="founder-tagline">27 years behind bars. One mission: end professional erasure in hospitality.</p>
                  </div>
                </div>

                {/* SECTION 1: THE PERSONAL STORY */}
                <div className={`vision-section ${visibleSections.founder ? 'visible d3' : ''}`}>
                  <h3>27 Years Behind the Bar</h3>
                  <p>Twenty-seven years in hospitality. Not watching from an office—<em>living it</em>. Behind the stick where ice never stops flowing and the POS screen glows like a beacon through double shifts. Managing venues where every night is opening night. Training hundreds of bartenders and servers who became masters of their craft. But before all that—building drinks with my hands, reading regulars like sheet music, learning that hospitality isn't a job, it's a language.</p>
                  <p>I've made drinks until my hands cramped and my mind could freestyle recipes in my sleep. I've worked stations where you pour four cocktails simultaneously while maintaining three separate conversations, each guest believing they have your full attention—because in that moment, they do. I've closed at 4 AM under neon signs that hum like prayers and opened at 10 AM with coffee that tastes like hope and feels like punishment.</p>
                  <p>I know what it means to be <em>good</em> at this work. The muscle memory that lets you build a perfect Manhattan in 37 seconds while defusing an argument two seats down. The emotional intelligence to spot a proposal about to happen or a breakup already unfolding. The technical precision of a 200-drink rush hour where every ticket is perfect and every guest feels seen.</p>
                  <p>And I've watched the best bartenders and servers I ever trained—the ones who could do all of this—walk out the door because they found something better.</p>
                  <p className="vision-emphasis">Every single time, they started over from zero. Their regulars scattered to the wind. Their reputation reset to nothing. Their professional equity evaporated like smoke from an extinguished candle.</p>
                  <p>I watched bartenders who could make 200 cocktails an hour—muscle memory and chemistry and conversation all at once—lose everything when they changed venues. Servers with encyclopedic knowledge of wine, starting over as if they'd never held a corkscrew.</p>
                  <p>The industry calls this "turnover." I call it what it is: <strong>systematic professional erasure</strong>.</p>
                </div>

                {/* SECTION 2: THE INFRASTRUCTURE GAP */}
                <div className={`vision-section ${visibleSections.founder ? 'visible d4' : ''}`}>
                  <h3>The Pattern You Can't Unsee</h3>
                  <p>Once you see it, you can't look away. Every industry has professional infrastructure except hospitality.</p>
                  <p>Lawyers switch firms, but their bar membership follows them like a shadow. Software engineers change companies like seasons—their GitHub stays with them, permanent proof of skill. Real estate agents move brokerages and take their client databases with them, relationships preserved.</p>
                  <p className="vision-emphasis">But a bartender or server changes venues and loses everything. Every. Single. Time.</p>
                  <p>The regular who tipped $50 every Friday? Can't find you. The customer relationships built over years of remembered birthdays and preferred glassware? Belong to your former employer, filed under "goodwill" on a balance sheet. The professional reputation you spent a decade building, one perfect Manhattan at a time? Starts at zero.</p>
                  <p className="vision-highlight">This isn't the nature of the industry. This is the <em>absence</em> of professional infrastructure. And absence isn't destiny—it's a problem waiting for a solution.</p>
                </div>

                {/* SECTION 3: WHY I COULD BUILD THIS */}
                <div className={`vision-section ${visibleSections.founder ? 'visible d5' : ''}`}>
                  <h3>Why I Could Build This</h3>
                  <p>After 27 years in hospitality, I transitioned into cybersecurity and software development—a world of systems and logic, of problems that yield to analysis, of building things that scale beyond human limitation.</p>
                  <p>Standing at the intersection of these two worlds, I realized: I understand both sides of this problem.</p>
                  <p>I understand the bartender making 200 drinks an hour during Saturday rush, tracking six tabs in their head while maintaining conversation with regulars, reading the room, defusing tension, creating atmosphere—all simultaneously, all while making it look effortless. I've <em>been</em> that bartender. I understand the server who remembers every regular's preferences without notes.</p>
                  <p className="vision-statement">Deep hospitality experience plus technical execution—that combination is rare. And it's exactly what this problem needs.</p>
                </div>

                {/* SECTION 4: WHAT ONTONIGHT ACTUALLY IS */}
                <div className={`vision-section ${visibleSections.founder ? 'visible d6' : ''}`}>
                  <h3>What OnTonight Actually Is</h3>
                  <p className="vision-block">OnTonight is professional infrastructure—the kind every other industry has. The kind hospitality professionals have deserved for decades.</p>
                  <ul className="vision-list">
                    <li><strong>For bartenders & servers:</strong> Your skills verified through DAPA. Your professional identity portable. Your customer relationships belong to YOU. When you change venues, your value comes with you.</li>
                    <li><strong>For customers:</strong> Your favorite bartender changes jobs? You get notified. Your server moves to a new restaurant? Follow them there. The magic stays with the person who created it.</li>
                    <li><strong>For venues:</strong> Recruit verified talent—not résumés and promises. Compete on culture. Turn retention into competitive advantage.</li>
                  </ul>
                </div>

                {/* SECTION 5: THE FUTURE */}
                <div className={`vision-section ${visibleSections.founder ? 'visible d7' : ''}`}>
                  <h3>The Future We're Building</h3>
                  <p>Imagine hospitality where professionals own their careers. Where changing jobs doesn't mean starting over. Where small venues compete with corporate chains by showcasing culture and verified talent.</p>
                  <p>Where a young bartender or server entering hospitality sees a real career path—skills that compound, relationships that persist, equity that grows.</p>
                  <p className="vision-cta">That's not fantasy. That's infrastructure. That's OnTonight.</p>
                </div>

                {/* SIGNATURE */}
                <div className={`founder-signature ${visibleSections.founder ? 'visible d8' : ''}`}>
                  <div className="signature-line" />
                  <p className="signature-name">Jack Joy</p>
                  <p className="signature-title">Founder, OnTonight</p>
                  <p className="signature-tagline">27 years in hospitality. Building what should have always existed.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightboxImage} alt="Screenshot" className="lightbox-image" />
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>×</button>
          </div>
        </div>
      )}

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
                <a href="#waitlist" onClick={(e) => { e.preventDefault(); setActiveTab('home'); setTimeout(scrollToWaitlist, 100); }}>For OnPros</a>
                <a href="#waitlist" onClick={(e) => { e.preventDefault(); setActiveTab('home'); setTimeout(scrollToWaitlist, 100); }}>For Patrons</a>
                <a href="#waitlist" onClick={(e) => { e.preventDefault(); setActiveTab('home'); setTimeout(scrollToWaitlist, 100); }}>For Venues</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('platform'); setPlatformTab('science'); }}>DAPA Assessment</a>
              </div>
              <div className="footer-col">
                <h5>Company</h5>
                <a href="https://app.on-tonight.com/privacy">Privacy Policy</a>
                <a href="https://app.on-tonight.com/terms">Terms of Service</a>
                <a href="mailto:AdminJoy@On-Tonight.com">Contact Us</a>
                <a href="/media">Media Inquiries</a>
              </div>
              <div className="footer-col">
                <h5>Connect</h5>
                <a href="/support">Support</a>
                <a href="/partner">Partner With Us</a>
                <a href="mailto:invest@on-tonight.com">Investors</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 OnTonight LLC. All rights reserved.</p>
            <p>Built with 27 years of hospitality experience.</p>
          </div>
        </div>
      </footer>

      {/* ============================================
          STYLES - PLATINUM ULTIMATE CSS
      ============================================ */}
      <style jsx global>{`
        /* RESET & VARIABLES */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --bg-dark: #0d1117;
          --bg-darker: #0a0f14;
          --bg-card: #161b22;
          --gold: #d4a373;
          --gold-dim: rgba(212, 163, 115, 0.1);
          --gold-bright: #e5b896;
          --light: #f8fafc;
          --text-400: rgba(248, 250, 252, 0.6);
          --text-300: rgba(248, 250, 252, 0.4);
          --onpro-green: #22c55e;
          --patron-purple: #8b5cf6;
          --venue-blue: #3b82f6;
        }
        
        html { scroll-behavior: smooth; }
        
        body {
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg-dark);
          color: var(--light);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
        
        /* SCROLL PROGRESS */
        .scroll-progress {
          position: fixed; top: 0; left: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-bright));
          z-index: 9999; transition: width 0.1s;
        }
        
        /* NAV */
        .nav {
          position: sticky; top: 0;
          background: rgba(13, 17, 23, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 163, 115, 0.1);
          z-index: 1000;
        }
        .nav-container { max-width: 1200px; margin: 0 auto; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
        .nav-logo { font-size: 22px; font-weight: 700; color: var(--gold); letter-spacing: -0.02em; }
        .nav-tabs { display: flex; gap: 8px; align-items: center; }
        .nav-tab { background: transparent; border: none; color: var(--text-400); padding: 10px 18px; font-size: 15px; font-weight: 500; cursor: pointer; transition: color 0.2s; font-family: inherit; }
        .nav-tab:hover { color: var(--light); }
        .nav-tab.active { color: var(--gold); }
        .nav-cta { background: var(--gold); color: var(--bg-dark); padding: 12px 28px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 4px; margin-left: 16px; transition: all 0.2s; }
        .nav-cta:hover { background: var(--gold-bright); transform: translateY(-1px); }
        
        /* HERO */
        .hero { min-height: 90vh; display: flex; align-items: center; position: relative; text-align: center; padding: 140px 24px 100px; overflow: hidden; }
        .hero-glow { position: fixed; top: -200px; left: 50%; transform: translateX(-50%); width: 1000px; height: 1000px; background: radial-gradient(circle, rgba(212, 163, 115, 0.12) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        
        /* PARTICLES */
        .hero-particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .particle { position: absolute; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; opacity: 0.3; animation: float-up linear infinite; }
        @keyframes float-up {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        
        .hero-badge { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: var(--gold); border: 1px solid rgba(212, 163, 115, 0.25); padding: 10px 20px; margin-bottom: 48px; border-radius: 4px; background: rgba(212, 163, 115, 0.03); opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .hero-badge.visible { opacity: 1; transform: translateY(0); }
        
        .hero-title { font-size: clamp(48px, 8vw, 80px); font-weight: 800; margin-bottom: 20px; letter-spacing: -0.02em; line-height: 1.1; }
        .typed-text { display: inline; }
        .cursor { display: inline-block; color: var(--gold); animation: blink 1s infinite; margin-left: 2px; }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        
        .hero-subtitle { font-size: clamp(20px, 3vw, 28px); color: var(--text-400); margin-bottom: 48px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease 0.2s; }
        .hero-subtitle.visible { opacity: 1; transform: translateY(0); }
        
        .hero-stats { display: flex; justify-content: center; align-items: center; gap: 40px; margin-bottom: 48px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .hero-stats.visible { opacity: 1; transform: translateY(0); }
        .stat { text-align: center; }
        .stat-number { display: block; font-size: 36px; font-weight: 800; color: var(--gold); letter-spacing: -0.02em; }
        .stat-label { font-size: 12px; color: var(--text-400); text-transform: uppercase; letter-spacing: 0.1em; }
        .stat-divider { width: 1px; height: 40px; background: rgba(212, 163, 115, 0.2); }
        
        .hero-ctas { display: flex; justify-content: center; gap: 16px; margin-bottom: 32px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease 0.1s; }
        .hero-ctas.visible { opacity: 1; transform: translateY(0); }
        
        /* BUTTONS */
        .btn-primary { background: var(--gold); color: var(--bg-dark); border: none; padding: 16px 32px; font-size: 16px; font-weight: 600; border-radius: 4px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-primary:hover { background: var(--gold-bright); transform: translateY(-2px); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-glow { box-shadow: 0 0 30px rgba(212, 163, 115, 0.3); }
        .btn-glow:hover { box-shadow: 0 0 40px rgba(212, 163, 115, 0.5); }
        .btn-secondary { background: transparent; color: var(--light); border: 1px solid rgba(248, 250, 252, 0.2); padding: 16px 32px; font-size: 16px; font-weight: 500; border-radius: 4px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-secondary:hover { background: rgba(248, 250, 252, 0.05); border-color: rgba(248, 250, 252, 0.4); }
        .btn-install { background: rgba(212, 163, 115, 0.1); border: 1px solid rgba(212, 163, 115, 0.3); color: var(--gold); padding: 12px 24px; font-size: 14px; font-weight: 500; border-radius: 8px; cursor: pointer; font-family: inherit; margin-top: 24px; }
        .btn-close { background: transparent; color: var(--gold); border: 1px solid rgba(212, 163, 115, 0.4); padding: 10px 24px; font-size: 14px; cursor: pointer; border-radius: 6px; font-family: inherit; transition: all 0.2s; margin-top: 16px; }
        .btn-close:hover { background: rgba(212, 163, 115, 0.1); }
        .btn-submit { width: 100%; background: var(--gold); color: var(--bg-dark); border: none; padding: 20px; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; border-radius: 6px; }
        .btn-submit:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212, 163, 115, 0.2); }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        
        /* SCROLL INDICATOR */
        .scroll-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); text-align: center; opacity: 0; transition: opacity 0.6s ease 0.5s; }
        .scroll-indicator.visible { opacity: 1; }
        .scroll-indicator span { font-size: 12px; color: var(--text-400); text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 8px; }
        .scroll-arrow { font-size: 20px; color: var(--gold); animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        
        /* SECTIONS */
        section { padding: 120px 24px; }
        section h2 { font-size: clamp(32px, 5vw, 48px); font-weight: 700; text-align: center; margin-bottom: 16px; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        section h2.visible { opacity: 1; transform: translateY(0); }
        .section-subtitle { font-size: 18px; color: var(--text-400); text-align: center; max-width: 600px; margin: 0 auto 60px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .section-subtitle.visible { opacity: 1; transform: translateY(0); }
        
        /* ANIMATION DELAYS */
        .visible.d1 { transition-delay: 0.1s; }
        .visible.d2 { transition-delay: 0.2s; }
        .visible.d3 { transition-delay: 0.3s; }
        .visible.d4 { transition-delay: 0.4s; }
        .visible.d5 { transition-delay: 0.5s; }
        .visible.d6 { transition-delay: 0.6s; }
        .visible.d7 { transition-delay: 0.7s; }
        .visible.d8 { transition-delay: 0.8s; }
        .visible.d9 { transition-delay: 0.9s; }
        .visible.d10 { transition-delay: 1.0s; }
        .visible.d11 { transition-delay: 1.1s; }
        .visible.d12 { transition-delay: 1.2s; }
        .visible.d13 { transition-delay: 1.3s; }
        .visible.d14 { transition-delay: 1.4s; }
        
        /* VALUE SECTION */
        .value { background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-darker) 100%); }
        .value-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 60px; }
        .value-item { text-align: center; padding: 40px 32px; background: rgba(212, 163, 115, 0.03); border: 1px solid rgba(212, 163, 115, 0.1); border-radius: 8px; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .value-item.visible { opacity: 1; transform: translateY(0); }
        .value-item:hover { transform: translateY(-4px); border-color: rgba(212, 163, 115, 0.3); box-shadow: 0 12px 32px rgba(212, 163, 115, 0.1); }
        .value-icon { font-size: 48px; margin-bottom: 20px; }
        .value-number { font-size: 48px; font-weight: 700; color: var(--gold); margin-bottom: 12px; letter-spacing: -0.02em; }
        .value-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-300); margin-bottom: 20px; }
        .value-item p { font-size: 15px; color: var(--text-400); line-height: 1.6; }
        
        /* QUOTES SECTION */
        .quotes { background: var(--bg-dark); }
        .quotes-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 60px; }
        .quote { border-left: 3px solid rgba(212, 163, 115, 0.3); padding: 32px; background: rgba(212, 163, 115, 0.02); border-radius: 4px; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .quote.visible { opacity: 1; transform: translateY(0); }
        .quote:hover { border-left-color: var(--gold); background: rgba(212, 163, 115, 0.05); transform: translateX(4px); }
        .quote p { font-size: 15px; line-height: 1.7; font-style: italic; color: rgba(248, 250, 252, 0.75); margin-bottom: 20px; }
        cite { font-size: 12px; color: var(--gold); font-style: normal; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; }
        
        /* MISSION SECTION */
        .mission { background: linear-gradient(180deg, var(--bg-card) 0%, var(--bg-dark) 100%); border-top: 1px solid rgba(212, 163, 115, 0.1); }
        .mission-content { max-width: 900px; margin: 0 auto; text-align: center; }
        .mission-statement { font-size: 20px; line-height: 1.7; color: rgba(248, 250, 252, 0.85); margin-bottom: 60px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .mission-statement.visible { opacity: 1; transform: translateY(0); }
        .mission-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 40px; }
        .pillar { padding: 32px; background: rgba(212, 163, 115, 0.03); border: 1px solid rgba(212, 163, 115, 0.1); border-radius: 8px; text-align: left; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .pillar.visible { opacity: 1; transform: translateY(0); }
        .pillar h4 { color: var(--gold); margin-bottom: 12px; font-size: 18px; }
        .pillar p { font-size: 15px; color: var(--text-400); line-height: 1.6; }
        
        /* WAITLIST */
        .waitlist { background: var(--bg-dark); padding: 120px 24px; }
        .waitlist-card { max-width: 700px; margin: 0 auto; padding: 56px; background: rgba(212, 163, 115, 0.03); border: 1px solid rgba(212, 163, 115, 0.15); border-radius: 12px; text-align: center; backdrop-filter: blur(20px); opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .waitlist-card.visible { opacity: 1; transform: translateY(0); }
        .waitlist-card h2 { font-size: 32px; margin-bottom: 12px; opacity: 1; transform: none; }
        .waitlist-subtitle { color: var(--text-400); margin-bottom: 40px; font-size: 16px; }
        .waitlist-form { max-width: 100%; }
        .form-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 16px; }
        input, select { width: 100%; padding: 18px 20px; background: rgba(212, 163, 115, 0.04); border: 1px solid rgba(212, 163, 115, 0.12); color: var(--light); font-family: inherit; font-size: 15px; transition: all 0.2s; border-radius: 6px; }
        input:focus, select:focus { outline: none; border-color: var(--gold); background: rgba(212, 163, 115, 0.06); }
        input::placeholder { color: var(--text-300); }
        select { cursor: pointer; }
        select option { background: var(--bg-dark); color: var(--light); }
        .form-disclaimer { font-size: 12px; color: var(--text-300); margin: 28px 0; line-height: 1.6; }
        .waitlist-success { padding: 60px 40px; }
        .success-icon { font-size: 64px; margin-bottom: 24px; }
        .waitlist-success h2 { color: var(--onpro-green); margin-bottom: 20px; }
        .waitlist-success p { margin-bottom: 12px; }
        .success-note { color: var(--gold); font-weight: 600; font-size: 18px; margin-top: 24px; }
        
        /* PLATFORM */
        .platform-intro { text-align: center; padding: 120px 24px 80px; }
        .platform-intro h1 { font-size: clamp(40px, 6vw, 64px); font-weight: 800; margin-bottom: 16px; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .platform-intro h1.visible { opacity: 1; transform: translateY(0); }
        .platform-lead { font-size: 20px; color: var(--text-400); margin-bottom: 48px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .platform-lead.visible { opacity: 1; transform: translateY(0); }
        .platform-tabs { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 56px; }
        .platform-tab { background: rgba(212, 163, 115, 0.05); border: 1px solid rgba(212, 163, 115, 0.2); color: var(--text-400); padding: 12px 28px; font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 6px; font-family: inherit; transition: all 0.2s; }
        .platform-tab:hover { background: rgba(212, 163, 115, 0.1); border-color: rgba(212, 163, 115, 0.4); color: var(--light); }
        .platform-tab.active { background: rgba(212, 163, 115, 0.15); border-color: var(--gold); color: var(--gold); }
        
        /* FEATURES */
        .features { padding: 60px 24px 120px; }
        .feature { margin-bottom: 100px; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .feature.visible { opacity: 1; transform: translateY(0); }
        .feature-info { margin-bottom: 32px; }
        .feature-screenshots { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 24px; }
        .feature-screenshots.four-shots { grid-template-columns: repeat(2, 1fr); }
        .feature-screenshots.single-shot { grid-template-columns: 1fr; max-width: 500px; }
        .screenshot { width: 100%; height: auto; display: block; border: 1px solid rgba(212, 163, 115, 0.15); border-radius: 6px; transition: all 0.3s; cursor: pointer; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); }
        .screenshot.large { max-width: 100%; }
        .screenshot:hover { transform: scale(1.02); border-color: rgba(212, 163, 115, 0.4); box-shadow: 0 6px 16px rgba(212, 163, 115, 0.15); z-index: 10; }
        .feature-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: var(--onpro-green); margin-bottom: 16px; text-transform: uppercase; }
        .feature-tag.patron { color: var(--patron-purple); }
        .feature-tag.venue { color: var(--venue-blue); }
        .feature-info h3 { font-size: 32px; font-weight: 700; margin-bottom: 16px; }
        .feature-lead { font-size: 18px; color: var(--text-400); margin-bottom: 40px; line-height: 1.6; }
        .feature-details { margin-bottom: 40px; }
        .detail-section { margin-bottom: 28px; }
        .detail-section h4 { font-size: 16px; color: var(--light); margin-bottom: 8px; }
        .detail-section p { font-size: 14px; color: var(--text-400); line-height: 1.6; }
        
        /* PRICING TIERS */
        .feature-price { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 40px; }
        .price-tier { padding: 28px; background: rgba(212, 163, 115, 0.03); border: 1px solid rgba(212, 163, 115, 0.1); border-radius: 8px; }
        .price-tier.premium { border-color: var(--gold); background: rgba(212, 163, 115, 0.06); }
        .tier-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--gold); margin-bottom: 8px; }
        .tier-name { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        .tier-name span { font-size: 14px; color: var(--text-400); font-weight: 400; }
        .price-tier ul { list-style: none; padding: 0; }
        .price-tier li { font-size: 13px; color: var(--text-400); padding: 8px 0; border-bottom: 1px solid rgba(212, 163, 115, 0.08); }
        .price-tier li:last-child { border-bottom: none; }
        
        /* VENUE BENEFITS */
        .venue-benefits { margin-top: 40px; }
        .venue-benefits h4 { font-size: 20px; text-align: center; margin-bottom: 24px; color: var(--light); }
        .benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .benefit { padding: 24px; background: rgba(59, 130, 246, 0.03); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 8px; }
        .benefit h5 { font-size: 15px; margin-bottom: 8px; color: var(--light); }
        .benefit p { font-size: 13px; color: var(--text-400); line-height: 1.5; }
        
        /* DESKTOP FEATURE LAYOUT */
        @media (min-width: 1024px) {
          .feature { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-bottom: 160px; }
          .feature-reverse { direction: rtl; }
          .feature-reverse > * { direction: ltr; }
          .feature-info { margin-bottom: 0; }
          .feature-screenshots { position: sticky; top: 100px; margin-top: 0; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
          .feature-screenshots.four-shots { grid-template-columns: repeat(2, 1fr); }
          .feature-screenshots.single-shot { grid-template-columns: 1fr; max-width: 100%; }
        }
: center; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .dapa-item.visible { opacity: 1; transform: translateY(0); }
        .dapa-item:hover { border-color: rgba(212, 163, 115, 0.3); background: rgba(212, 163, 115, 0.06); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(212, 163, 115, 0.1); }
        .dapa-icon { width: 56px; height: 56px; background: linear-gradient(135deg, rgba(212, 163, 115, 0.2), rgba(212, 163, 115, 0.1)); border: 1px solid rgba(212, 163, 115, 0.3); font-size: 28px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; border-radius: 8px; }
        .dapa-icon.technical { border-color: rgba(239, 68, 68, 0.3); }
        .dapa-icon.ethical { border-color: rgba(34, 197, 94, 0.3); }
        .dapa-icon.emotional { border-color: rgba(236, 72, 153, 0.3); }
        .dapa-icon.velocity { border-color: rgba(245, 158, 11, 0.3); }
        .dapa-icon.commercial { border-color: rgba(34, 197, 94, 0.3); }
        .dapa-icon.leadership { border-color: rgba(139, 92, 246, 0.3); }
        .dapa-item h4 { font-size: 14px; color: rgba(248, 250, 252, 0.8); margin-bottom: 8px; }
        .dapa-item p { font-size: 13px; color: var(--text-400); line-height: 1.5; }
        
        /* BOTTOM CTA */
        .bottom-cta { background: var(--bg-dark); text-align: center; padding: 120px 24px; border-top: 1px solid rgba(212, 163, 115, 0.1); }
        .bottom-cta h2 { margin-bottom: 16px; }
        .bottom-cta p { color: var(--text-400); margin-bottom: 32px; font-size: 18px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .bottom-cta p.visible { opacity: 1; transform: translateY(0); }
        .bottom-cta .btn-primary { opacity: 0; transform: translateY(20px); transition: all 0.6s ease, background 0.2s; }
        .bottom-cta .btn-primary.visible { opacity: 1; transform: translateY(0); }
        
        /* VISION / FOUNDER SECTION */
        .vision { padding: 120px 24px; background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-card) 50%, var(--bg-dark) 100%); }
        .vision h1 { font-size: clamp(40px, 6vw, 64px); font-weight: 800; text-align: center; margin-bottom: 16px; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .vision h1.visible { opacity: 1; transform: translateY(0); }
        .vision-lead { font-size: 20px; color: var(--text-400); text-align: center; max-width: 700px; margin: 0 auto 80px; opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
        .vision-lead.visible { opacity: 1; transform: translateY(0); }
        .vision-content { max-width: 800px; margin: 0 auto; }
        
        /* FOUNDER INTRO */
        .founder-intro { display: flex; gap: 40px; align-items: center; margin-bottom: 60px; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .founder-intro.visible { opacity: 1; transform: translateY(0); }
        .founder-photo-placeholder { flex-shrink: 0; }
        .photo-placeholder-box { width: 180px; height: 180px; background: rgba(212, 163, 115, 0.05); border: 1px solid rgba(212, 163, 115, 0.2); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .founder-text h2 { font-size: 28px; margin-bottom: 12px; }
        .founder-tagline { font-size: 18px; color: var(--gold); font-style: italic; }
        
        /* VISION SECTIONS */
        .vision-section { margin-bottom: 48px; padding: 40px; background: rgba(212, 163, 115, 0.02); border: 1px solid rgba(212, 163, 115, 0.1); border-radius: 12px; opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .vision-section.visible { opacity: 1; transform: translateY(0); }
        .vision-section h3 { font-size: 24px; color: var(--gold); margin-bottom: 24px; }
        .vision-section p { font-size: 17px; color: var(--text-400); line-height: 1.8; margin-bottom: 16px; }
        .vision-section p:last-child { margin-bottom: 0; }
        .vision-section em { font-style: italic; color: var(--light); }
        .vision-section strong { color: var(--gold); font-weight: 600; }
        .vision-emphasis { font-size: 19px; color: var(--gold); font-weight: 500; padding: 20px 0; border-top: 1px solid rgba(212, 163, 115, 0.1); border-bottom: 1px solid rgba(212, 163, 115, 0.1); margin: 24px 0; }
        .vision-highlight { background: rgba(212, 163, 115, 0.1); padding: 20px 24px; border-left: 3px solid var(--gold); margin: 24px 0; font-size: 18px; color: var(--light); }
        .vision-statement { font-size: 18px; color: var(--light); font-weight: 500; text-align: center; margin-top: 24px; }
        .vision-block { background: rgba(212, 163, 115, 0.1); border-left: 3px solid var(--gold); padding: 24px; margin-bottom: 24px; font-size: 18px; color: var(--light); }
        .vision-list { list-style: none; padding: 0; margin: 0; }
        .vision-list li { padding: 20px 0; border-bottom: 1px solid rgba(212, 163, 115, 0.1); font-size: 16px; line-height: 1.7; color: var(--text-400); }
        .vision-list li:last-child { border-bottom: none; }
        .vision-list strong { color: var(--gold); display: block; margin-bottom: 8px; font-size: 17px; }
        .vision-cta { font-size: 22px; color: var(--light); font-weight: 600; text-align: center; margin-top: 32px; }
        
        /* FOUNDER SIGNATURE */
        .founder-signature { text-align: center; margin-top: 80px; padding-top: 40px; border-top: 1px solid rgba(212, 163, 115, 0.2); opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .founder-signature.visible { opacity: 1; transform: translateY(0); }
        .signature-line { width: 80px; height: 2px; background: var(--gold); margin: 0 auto 24px; }
        .signature-name { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
        .signature-title { font-size: 16px; color: var(--gold); margin-bottom: 12px; }
        .signature-tagline { font-size: 14px; color: var(--text-400); font-style: italic; }
        
        /* LIGHTBOX */
        .lightbox { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 15, 20, 0.95); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 20px; cursor: pointer; }
        .lightbox-content { position: relative; max-width: 90%; max-height: 90%; cursor: default; }
        .lightbox-image { max-width: 100%; max-height: 90vh; width: auto; height: auto; border-radius: 8px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); border: 1px solid rgba(212, 163, 115, 0.3); }
        .lightbox-close { position: absolute; top: -40px; right: 0; background: transparent; border: none; color: var(--light); font-size: 32px; cursor: pointer; padding: 8px; line-height: 1; transition: color 0.2s; }
        .lightbox-close:hover { color: var(--gold); }
        
        /* FOOTER */
        .footer { background: var(--bg-darker); border-top: 1px solid rgba(212, 163, 115, 0.1); padding: 80px 24px 40px; }
        .footer-content { display: flex; justify-content: space-between; margin-bottom: 50px; }
        .footer-logo { font-size: 20px; font-weight: 600; color: var(--gold); margin-bottom: 12px; }
        .footer-tagline { font-size: 13px; color: var(--text-400); margin-bottom: 8px; }
        .footer-location { font-size: 12px; color: var(--text-300); }
        .footer-links { display: flex; gap: 80px; }
        .footer-col h5 { font-size: 12px; font-weight: 600; color: var(--light); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
        .footer-col a { display: block; font-size: 14px; color: var(--text-400); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
        .footer-col a:hover { color: var(--gold); }
        .footer-bottom { padding-top: 40px; border-top: 1px solid rgba(212, 163, 115, 0.1); display: flex; justify-content: space-between; font-size: 12px; color: var(--text-300); }
        
        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .value-grid { grid-template-columns: 1fr; }
          .quotes-grid { grid-template-columns: 1fr; }
          .mission-pillars { grid-template-columns: 1fr; }
          .genome-grid { grid-template-columns: repeat(4, 1fr); }
          .dapa-grid { grid-template-columns: repeat(3, 1fr); }
          .science-comparison { grid-template-columns: 1fr; }
          .feature-price { grid-template-columns: 1fr; }
          .benefits-grid { grid-template-columns: 1fr; }
          .founder-intro { flex-direction: column; text-align: center; }
        }
        
        @media (max-width: 768px) {
          .nav-tabs { display: none; }
          .hero-stats { flex-direction: column; gap: 24px; }
          .stat-divider { width: 60px; height: 1px; }
          .hero-ctas { flex-direction: column; gap: 12px; }
          .genome-grid { grid-template-columns: repeat(3, 1fr); }
          .dapa-grid { grid-template-columns: repeat(2, 1fr); }
          .form-row { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; gap: 40px; }
          .footer-links { flex-direction: column; gap: 40px; }
          .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
          section { padding: 80px 20px; }
          .vision-section { padding: 28px; }
        }
        
        @media (max-width: 480px) {
          .genome-grid { grid-template-columns: repeat(2, 1fr); }
          .dapa-grid { grid-template-columns: 1fr; }
          .platform-tabs { flex-direction: column; }
          .platform-tab { width: 100%; }
          .hero-title { font-size: 36px; }
          .stat-number { font-size: 28px; }
          .waitlist-card { padding: 32px 24px; }
        }
      `}</style>
    </>
  );
}
