// pages/index.js
// ============================================================================
// ONTONIGHT LANDING PAGE - POLISHED + FIXED EDITION
// ============================================================================
// "Your Night. Your People. Where Regulars Are Made."
// Stop resetting. Start building.
// ============================================================================
// FIXES APPLIED:
// A) Accordion scroll jump - proper scroll-to-header after expansion
// B) Screenshot fallbacks - styled placeholders when images fail
// C) Mobile polish - viewport lock, overflow protection, touch improvements
// ============================================================================

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  // ============================================================================
  // STATE
  // ============================================================================
  const [formData, setFormData] = useState({ name: '', email: '', userType: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  
  // User type selection
  const [selectedUserType, setSelectedUserType] = useState(null);
  
  // Expandable sections state - ALL CLOSED by default
  const [expandedPlatform, setExpandedPlatform] = useState(null);
  const [expandedVision, setExpandedVision] = useState(null);
  const [expandedProblem, setExpandedProblem] = useState(null);

  // Refs for accordion items
  const accordionRefs = useRef({});

  // Screenshot load tracking
  const [failedImages, setFailedImages] = useState({});

  // PWA
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // ============================================================================
  // TYPEWRITER - "Stop resetting. Start building." + others
  // ============================================================================
  const descriptors = [
    "Stop resetting. Start building.",
    "Follow your favorite hospitality pro anywhere.",
    "Verified skills. Portable careers.",
    "The career platform for hospitality.",
    "Your reputation travels with you."
  ];
  const [descriptorIndex, setDescriptorIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = descriptors[descriptorIndex];
    const typeSpeed = isDeleting ? 25 : 60;
    const pauseTime = isDeleting ? 300 : 2500;

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setDescriptorIndex((prev) => (prev + 1) % descriptors.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      setTypedText(current.substring(0, charIndex + (isDeleting ? -1 : 1)));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, descriptorIndex]);

  // ============================================================================
  // SCROLL PROGRESS & INTERSECTION OBSERVER
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ============================================================================
  // FIX A: ACCORDION HANDLER - Scroll to header after expansion
  // ============================================================================
  const handlePlatformAccordion = (key) => {
    const isClosing = expandedPlatform === key;
    
    if (isClosing) {
      setExpandedPlatform(null);
    } else {
      setExpandedPlatform(key);
      
      // After state updates and DOM renders, scroll to the opened accordion header
      setTimeout(() => {
        const accordionEl = accordionRefs.current[key];
        if (accordionEl) {
          const navHeight = 70;
          const headerEl = accordionEl.querySelector('.accordion-header');
          if (headerEl) {
            const rect = headerEl.getBoundingClientRect();
            const absoluteTop = window.scrollY + rect.top - navHeight - 20;
            window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
          }
        }
      }, 50);
    }
  };

  const handleVisionAccordion = (key) => {
    const isClosing = expandedVision === key;
    
    if (isClosing) {
      setExpandedVision(null);
    } else {
      setExpandedVision(key);
      
      setTimeout(() => {
        const accordionEl = accordionRefs.current[`vision-${key}`];
        if (accordionEl) {
          const navHeight = 70;
          const headerEl = accordionEl.querySelector('.vision-header');
          if (headerEl) {
            const rect = headerEl.getBoundingClientRect();
            const absoluteTop = window.scrollY + rect.top - navHeight - 20;
            window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
          }
        }
      }, 50);
    }
  };

  // ============================================================================
  // USER TYPE SELECTION
  // ============================================================================
  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
    setExpandedPlatform(type);
    
    setTimeout(() => {
      const element = document.getElementById('platform');
      if (element) {
        const navHeight = 70;
        const elementTop = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: elementTop, behavior: 'smooth' });
      }
    }, 100);
  };

  // ============================================================================
  // FIX B: IMAGE ERROR HANDLER
  // ============================================================================
  const handleImageError = (imagePath) => {
    setFailedImages(prev => ({ ...prev, [imagePath]: true }));
  };

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
    await deferredPrompt.userChoice;
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

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
  // DATA
  // ============================================================================
  const problemCards = [
    { id: 'money', icon: '💰', stat: '$24K', label: 'Lost Per Venue Change', desc: 'Average hospitality professional loses $24,000 in regular tips when changing venues. Your regulars can\'t follow you. Years of relationship building—gone.' },
    { id: 'turnover', icon: '🔄', stat: '73%', label: 'Annual Turnover', desc: 'The hospitality industry has the highest turnover of any sector. Every departure erases years of relationship building and institutional knowledge.' },
    { id: 'zero', icon: '📉', stat: 'Zero', label: 'Career Infrastructure', desc: 'Lawyers have bar licenses. Doctors have credentials. Engineers have GitHub. Hospitality professionals start from scratch every single move.' },
    { id: 'workers', icon: '💔', stat: '15.6M', label: 'Workers Affected', desc: 'Over 15 million hospitality professionals in the US alone face this reality. Bartenders. Servers. Sommeliers. Baristas. Chefs. All of them.' }
  ];

  const industryQuotes = [
    { text: "Employee turnover in the hospitality industry costs businesses approximately $5,864 per hourly employee.", source: "Cornell University School of Hotel Administration" },
    { text: "The restaurant industry's turnover rate reached 73% in 2023, the highest of any private sector industry.", source: "National Restaurant Association" },
    { text: "Personal connections account for 60-80% of repeat business at bars and restaurants.", source: "Hospitality Technology Research" }
  ];

  const onproFeatures = [
    { icon: '🎯', title: 'Verified Professional Identity', desc: 'DAPA assessment proves your expertise across 6 dimensions: Technical, Ethical, Emotional Intelligence, Velocity, Commercial, and Leadership.' },
    { icon: '📊', title: 'Skills That Travel', desc: 'When you change venues, your verified skills come with you. No more starting over. No more proving yourself from scratch.' },
    { icon: '👥', title: 'Customer Relationships', desc: 'Your regulars follow YOU. When you move, they get notified. The relationship doesn\'t end with the employment.' },
    { icon: '🏆', title: 'Professional Genome', desc: 'Discover your archetype. Are you The Craftsman? The Hustler? The Therapist? Your genome reveals your professional DNA.' }
  ];

  const patronFeatures = [
    { icon: '🔔', title: 'Follow Your Favorites', desc: 'Get notified when your favorite hospitality pro is working. Never show up to find they\'re off again.' },
    { icon: '🗺️', title: 'Track Across Venues', desc: 'When they change jobs, you get notified of their new location. The magic follows the person, not the place.' },
    { icon: '⭐', title: 'Discover New Spots', desc: 'Find venues based on the professionals who work there. Quality service, guaranteed.' },
    { icon: '🎫', title: 'Check-In & Earn Badges', desc: 'Build your hospitality reputation. Become a recognized regular at your favorite spots.' }
  ];

  const venueFeatures = [
    { icon: '✅', title: 'Verified Staff', desc: 'See DAPA scores before you hire. Know exactly what level of expertise you\'re getting. No more surprises.' },
    { icon: '🌟', title: 'Featured Professionals', desc: 'Showcase your best talent. Let their reputation drive traffic to your venue. Turn retention into competitive advantage.' },
    { icon: '📈', title: 'Analytics Dashboard', desc: 'Track which professionals drive repeat visits. Understand your customer relationships at a deeper level.' },
    { icon: '🎯', title: 'Culture Matching', desc: 'Find staff whose professional genome aligns with your venue\'s vibe. Better culture fit means longer tenure.' }
  ];

  const visionSections = [
    { 
      id: 'story', 
      title: 'Almost 30 Years Behind the Bar',
      content: `Almost 30 years in hospitality. Not watching from an office—living it. Behind the stick where ice never stops flowing and the POS screen glows like a beacon through double shifts.

I've made drinks until my hands cramped. I've worked stations where you pour four cocktails simultaneously while maintaining three separate conversations, each guest believing they have your full attention—because in that moment, they do.

I know what it means to be good at this work. The muscle memory. The emotional intelligence. The technical precision of a 200-drink rush hour.

And I've watched the best people I ever trained walk out the door. Every single time, they started over from zero.`
    },
    {
      id: 'pattern',
      title: 'The Pattern You Can\'t Unsee',
      content: `Once you see it, you can't look away. Every industry has professional infrastructure except hospitality.

Lawyers switch firms, but their bar membership follows them. Software engineers change companies—their GitHub stays with them. Real estate agents move brokerages and take their client databases.

But a hospitality professional changes venues and loses everything. Every. Single. Time.

The regular who tipped $50 every Friday? Can't find you. The professional reputation you spent a decade building? Starts at zero.

This isn't the nature of the industry. This is the absence of professional infrastructure.`
    },
    {
      id: 'future',
      title: 'The Future We\'re Building',
      content: `Imagine hospitality where professionals own their careers. Where a talented bartender can leave a toxic workplace without losing their livelihood. Where better opportunities don't mean starting over from scratch.

We're live now in Tampa Bay. From here, we're expanding to Miami, Nashville, Austin, and major hospitality markets nationwide.

This isn't a product launch. This is a correction—the professional infrastructure that should have existed all along.

We're not just building software. We're building the future of hospitality careers.`
    }
  ];

  const onproArchetypes = [
    { emoji: '🎨', name: 'The Craftsman', desc: 'Precision and technique define your service.' },
    { emoji: '💼', name: 'The Closer', desc: 'You read the room and know when to upsell.' },
    { emoji: '🎓', name: 'The Mentor', desc: 'Training the next generation is your calling.' },
    { emoji: '⚡', name: 'The Hustler', desc: 'Speed and efficiency are your superpowers.' },
    { emoji: '🫂', name: 'The Therapist', desc: 'People open up to you. You create safe space.' },
    { emoji: '🎭', name: 'The Showman', desc: 'Every shift is a performance.' },
    { emoji: '👔', name: 'The Professional', desc: 'Consistency, reliability, excellence.' },
    { emoji: '🔬', name: 'The Innovator', desc: 'You push boundaries and create new classics.' },
    { emoji: '🛡️', name: 'The Guardian', desc: 'Safety and ethics are non-negotiable.' },
    { emoji: '🤝', name: 'The Diplomat', desc: 'Conflict resolution is your strength.' },
    { emoji: '🚀', name: 'The Entrepreneur', desc: 'You think like an owner.' },
    { emoji: '❤️', name: 'The Caregiver', desc: 'Hospitality in its truest form.' }
  ];

  const patronArchetypes = [
    { emoji: '👑', name: 'The Regular', desc: 'Loyalty is your currency.' },
    { emoji: '🦋', name: 'The Social Butterfly', desc: 'You know someone everywhere.' },
    { emoji: '🎉', name: 'The Celebrator', desc: 'Every moment is worth celebrating.' },
    { emoji: '😌', name: 'The Relaxer', desc: 'Unwinding is an art form.' },
    { emoji: '💪', name: 'The Supporter', desc: 'You champion your favorites.' },
    { emoji: '🧐', name: 'The Critic', desc: 'High standards push excellence.' },
    { emoji: '📖', name: 'The Storyteller', desc: 'Every night becomes a story.' },
    { emoji: '📚', name: 'The Student', desc: 'Always learning the craft.' }
  ];

  // ============================================================================
  // FIX B: Screenshot component with fallback
  // ============================================================================
  const ScreenshotImage = ({ src, alt, onClick }) => {
    if (failedImages[src]) {
      return (
        <div className="screenshot-placeholder" onClick={onClick}>
          <span className="placeholder-icon">📱</span>
          <span className="placeholder-text">{alt}</span>
        </div>
      );
    }
    
    return (
      <img 
        src={src} 
        alt={alt} 
        onClick={onClick}
        onError={() => handleImageError(src)}
        loading="lazy"
      />
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <>
      <Head>
        <title>OnTonight - Your Night. Your People. Where Regulars Are Made.</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry. Live now in Tampa Bay." />
        {/* FIX C: Viewport with zoom prevention for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* PARTICLES */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${20 + Math.random() * 15}s`
          }} />
        ))}
      </div>

      <div className="page">
        {/* ================================================================== */}
        {/* NAVIGATION */}
        {/* ================================================================== */}
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-logo">OnTonight</div>
            <div className="nav-links">
              <a href="#what">What It Is</a>
              <a href="#platform">Platform</a>
              <a href="#vision">Vision</a>
              <a href="#waitlist" className="nav-cta">Join Waitlist</a>
            </div>
          </div>
        </nav>

        {/* ================================================================== */}
        {/* HERO */}
        {/* ================================================================== */}
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-glow-2" />
          
          <div className="container">
            <div className="hero-badge">
              <span className="badge-dot" />
              LIVE NOW · TAMPA BAY
            </div>

            {/* STATIC TAGLINE */}
            <h1 className="hero-tagline">
              <span className="tagline-line">Your Night. Your People.</span>
              <span className="tagline-emphasis">Where Regulars Are Made.</span>
            </h1>

            {/* SECONDARY TYPEWRITER */}
            <div className="hero-descriptor">
              <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </div>

            {/* WHO ARE YOU */}
            <div className="who-are-you">
              <p className="who-label">I am a...</p>
              <div className="who-options">
                <button 
                  className={`who-btn ${selectedUserType === 'onpro' ? 'selected' : ''}`}
                  onClick={() => handleUserTypeSelect('onpro')}
                >
                  <span className="who-icon">🍸</span>
                  <div className="who-text">
                    <strong>Hospitality Pro</strong>
                    <small>Bartender, Server, Sommelier, Chef</small>
                  </div>
                </button>
                <button 
                  className={`who-btn ${selectedUserType === 'patron' ? 'selected' : ''}`}
                  onClick={() => handleUserTypeSelect('patron')}
                >
                  <span className="who-icon">❤️</span>
                  <div className="who-text">
                    <strong>Customer</strong>
                    <small>I value great service</small>
                  </div>
                </button>
                <button 
                  className={`who-btn ${selectedUserType === 'venue' ? 'selected' : ''}`}
                  onClick={() => handleUserTypeSelect('venue')}
                >
                  <span className="who-icon">🏢</span>
                  <div className="who-text">
                    <strong>Venue Owner</strong>
                    <small>Bar, Restaurant, Hotel</small>
                  </div>
                </button>
              </div>
            </div>

            {showInstallPrompt && (
              <button className="btn-install" onClick={handleInstall}>
                📱 Install App
              </button>
            )}

            <div className="scroll-hint">
              <span>↓</span>
              <span>Explore</span>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* WHAT IS ONTONIGHT */}
        {/* ================================================================== */}
        <section id="what" className="section-what">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['what-header'] ? 'visible' : ''}`} id="what-header">
              <h2>What Is OnTonight?</h2>
              <p className="what-subtitle">Career infrastructure for hospitality—finally.</p>
            </div>

            <div className="what-grid">
              <div className={`what-card animate-on-scroll ${visibleSections['what-pro'] ? 'visible' : ''}`} id="what-pro">
                <div className="what-icon">🍸</div>
                <h3>For Hospitality Pros</h3>
                <p>Your professional identity follows you. Skills verified. Reputation preserved. Customers follow <em>you</em>, not your venue.</p>
              </div>
              <div className={`what-card animate-on-scroll ${visibleSections['what-patron'] ? 'visible' : ''}`} id="what-patron">
                <div className="what-icon">❤️</div>
                <h3>For Customers</h3>
                <p>Never lose your favorite bartender again. When they move venues, you'll know. The relationship <em>survives</em> the job change.</p>
              </div>
              <div className={`what-card animate-on-scroll ${visibleSections['what-venue'] ? 'visible' : ''}`} id="what-venue">
                <div className="what-icon">🏢</div>
                <h3>For Venues</h3>
                <p>Recruit verified talent with proven skills. See DAPA scores before you hire. <em>Compete on culture</em>, not just wages.</p>
              </div>
            </div>

            <div className={`what-summary animate-on-scroll ${visibleSections['what-summary'] ? 'visible' : ''}`} id="what-summary">
              <p><strong>OnTonight</strong> is career infrastructure for hospitality professionals. Think of it as LinkedIn for bartenders, servers, sommeliers, and chefs—except built specifically for how this industry actually works.</p>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* THE PROBLEM */}
        {/* ================================================================== */}
        <section id="problem" className="section-problem">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['problem-header'] ? 'visible' : ''}`} id="problem-header">
              <h2>The $66.8 Billion Problem</h2>
              <p>Every year, hospitality loses more than money. It loses people, relationships, and institutional knowledge.</p>
            </div>

            <div className="problem-grid">
              {problemCards.map((card, i) => (
                <div
                  key={card.id}
                  id={`problem-card-${i}`}
                  className={`problem-card animate-on-scroll ${visibleSections[`problem-card-${i}`] ? 'visible' : ''} ${expandedProblem === card.id ? 'expanded' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => setExpandedProblem(expandedProblem === card.id ? null : card.id)}
                >
                  <div className="card-icon">{card.icon}</div>
                  <div className="card-stat">{card.stat}</div>
                  <div className="card-label">{card.label}</div>
                  <div className="card-expand-icon">{expandedProblem === card.id ? '−' : '+'}</div>
                  
                  <div className="card-expanded-content">
                    <p>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* INDUSTRY QUOTES */}
            <div className={`quotes-section animate-on-scroll ${visibleSections['quotes'] ? 'visible' : ''}`} id="quotes">
              <h3>What The Industry Says</h3>
              <div className="quotes-grid">
                {industryQuotes.map((quote, i) => (
                  <blockquote key={i} className="quote-card">
                    <p>"{quote.text}"</p>
                    <cite>— {quote.source}</cite>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* PLATFORM - DETAILED ACCORDION */}
        {/* ================================================================== */}
        <section id="platform" className="section-platform">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['platform-header'] ? 'visible' : ''}`} id="platform-header">
              <h2>The Platform</h2>
              <p>Three solutions. One complete ecosystem for hospitality.</p>
            </div>

            <div className="platform-accordion">
              {/* ONPRO - 🍸 */}
              <div 
                ref={(el) => accordionRefs.current['onpro'] = el}
                className={`accordion-item ${expandedPlatform === 'onpro' ? 'expanded' : ''}`}
              >
                <button className="accordion-header" onClick={() => handlePlatformAccordion('onpro')}>
                  <div className="accordion-title">
                    <span className="accordion-icon">🍸</span>
                    <div>
                      <h3>For OnPros</h3>
                      <p>Bartenders, Servers, Sommeliers, Chefs, Baristas</p>
                    </div>
                  </div>
                  <span className="accordion-toggle">{expandedPlatform === 'onpro' ? '−' : '+'}</span>
                </button>
                
                <div className="accordion-content">
                  <div className="platform-content-grid">
                    <div className="platform-features">
                      <p className="platform-lead">Your professional identity follows you from venue to venue. Skills verified. Reputation preserved. Customers follow YOU.</p>
                      
                      <div className="features-list">
                        {onproFeatures.map((f, i) => (
                          <div key={i} className="feature-item">
                            <span className="feature-icon">{f.icon}</span>
                            <div>
                              <h4>{f.title}</h4>
                              <p>{f.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pricing-row">
                        <div className="price-card free">
                          <span className="price-badge">FREE</span>
                          <h4>OnPro Basic</h4>
                          <ul>
                            <li>Professional profile</li>
                            <li>Schedule sharing</li>
                            <li>2 skill assessments</li>
                            <li>Customer connections</li>
                          </ul>
                        </div>
                        <div className="price-card premium">
                          <span className="price-badge">$9.99/mo</span>
                          <h4>OnPro Premium</h4>
                          <ul>
                            <li>Unlimited assessments</li>
                            <li>Direct messaging</li>
                            <li>Private event gig board</li>
                            <li>Advanced analytics</li>
                            <li>Verified badge boost</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="platform-screenshots">
                      <ScreenshotImage 
                        src="/screenshots/onpro-profile-status.jpg" 
                        alt="OnPro Profile" 
                        onClick={() => setLightboxImage('/screenshots/onpro-profile-status.jpg')} 
                      />
                      <ScreenshotImage 
                        src="/screenshots/onpro-skills-catagories.jpg" 
                        alt="Skills Categories" 
                        onClick={() => setLightboxImage('/screenshots/onpro-skills-catagories.jpg')} 
                      />
                      <ScreenshotImage 
                        src="/screenshots/onpro-assessment-dashboard.jpg" 
                        alt="Assessment Dashboard" 
                        onClick={() => setLightboxImage('/screenshots/onpro-assessment-dashboard.jpg')} 
                      />
                    </div>
                  </div>

                  <div className="archetypes-section">
                    <h4>OnPro Archetypes</h4>
                    <p>Discover your professional DNA. Which one are you?</p>
                    <div className="archetypes-grid">
                      {onproArchetypes.map((a, i) => (
                        <div key={i} className="archetype-chip">
                          <span>{a.emoji}</span>
                          <div>
                            <strong>{a.name}</strong>
                            <small>{a.desc}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* PATRON - ❤️ */}
              <div 
                ref={(el) => accordionRefs.current['patron'] = el}
                className={`accordion-item ${expandedPlatform === 'patron' ? 'expanded' : ''}`}
              >
                <button className="accordion-header" onClick={() => handlePlatformAccordion('patron')}>
                  <div className="accordion-title">
                    <span className="accordion-icon">❤️</span>
                    <div>
                      <h3>For Patrons</h3>
                      <p>Customers who value relationships</p>
                    </div>
                  </div>
                  <span className="accordion-toggle">{expandedPlatform === 'patron' ? '−' : '+'}</span>
                </button>
                
                <div className="accordion-content">
                  <div className="platform-content-grid">
                    <div className="platform-features">
                      <p className="platform-lead">Never lose your favorite hospitality pro again. When they move, you'll know. The relationship survives the job change.</p>
                      
                      <div className="features-list">
                        {patronFeatures.map((f, i) => (
                          <div key={i} className="feature-item">
                            <span className="feature-icon">{f.icon}</span>
                            <div>
                              <h4>{f.title}</h4>
                              <p>{f.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pricing-row">
                        <div className="price-card free">
                          <span className="price-badge">FREE</span>
                          <h4>Patron Basic</h4>
                          <ul>
                            <li>Follow unlimited OnPros</li>
                            <li>Real-time notifications</li>
                            <li>Venue discovery</li>
                            <li>Check-in badges</li>
                          </ul>
                        </div>
                        <div className="price-card premium">
                          <span className="price-badge">$4.99/mo</span>
                          <h4>Patron Premium</h4>
                          <ul>
                            <li>OnScene Genome assessment</li>
                            <li>Direct messaging to OnPros</li>
                            <li>Private event requests</li>
                            <li>Personalized recommendations</li>
                            <li>Priority reservations</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="platform-screenshots">
                      <ScreenshotImage 
                        src="/screenshots/patron-explore.jpg" 
                        alt="Explore OnPros" 
                        onClick={() => setLightboxImage('/screenshots/patron-explore.jpg')} 
                      />
                      <ScreenshotImage 
                        src="/screenshots/patron-genome.jpg" 
                        alt="OnScene Genome" 
                        onClick={() => setLightboxImage('/screenshots/patron-genome.jpg')} 
                      />
                      <ScreenshotImage 
                        src="/screenshots/patron-messaging.jpg" 
                        alt="Messaging" 
                        onClick={() => setLightboxImage('/screenshots/patron-messaging.jpg')} 
                      />
                    </div>
                  </div>

                  <div className="archetypes-section patron">
                    <h4>Patron Archetypes</h4>
                    <p>How do you experience hospitality?</p>
                    <div className="archetypes-grid patron-grid">
                      {patronArchetypes.map((a, i) => (
                        <div key={i} className="archetype-chip">
                          <span>{a.emoji}</span>
                          <div>
                            <strong>{a.name}</strong>
                            <small>{a.desc}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* VENUE - 🏢 */}
              <div 
                ref={(el) => accordionRefs.current['venue'] = el}
                className={`accordion-item ${expandedPlatform === 'venue' ? 'expanded' : ''}`}
              >
                <button className="accordion-header" onClick={() => handlePlatformAccordion('venue')}>
                  <div className="accordion-title">
                    <span className="accordion-icon">🏢</span>
                    <div>
                      <h3>For Venues</h3>
                      <p>Bars, Restaurants, Hotels, Clubs</p>
                    </div>
                  </div>
                  <span className="accordion-toggle">{expandedPlatform === 'venue' ? '−' : '+'}</span>
                </button>
                
                <div className="accordion-content">
                  <div className="platform-content-grid">
                    <div className="platform-features">
                      <p className="platform-lead">Stop hiring blind. Recruit verified professionals with proven skills. Compete on culture, not just wages.</p>
                      
                      <div className="features-list">
                        {venueFeatures.map((f, i) => (
                          <div key={i} className="feature-item">
                            <span className="feature-icon">{f.icon}</span>
                            <div>
                              <h4>{f.title}</h4>
                              <p>{f.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pricing-row">
                        <div className="price-card trial">
                          <span className="price-badge">FREE TO START</span>
                          <h4>Venue Basic</h4>
                          <ul>
                            <li>Staff verification</li>
                            <li>Featured OnPro profiles</li>
                            <li>Basic analytics</li>
                            <li>Dedicated onboarding</li>
                          </ul>
                        </div>
                        <div className="price-card premium">
                          <span className="price-badge">CUSTOM PRICING</span>
                          <h4>Venue Enterprise</h4>
                          <ul>
                            <li>Multi-location support</li>
                            <li>Advanced analytics</li>
                            <li>Recruitment pipeline</li>
                            <li>Priority support</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="platform-screenshots single">
                      <ScreenshotImage 
                        src="/screenshots/venue-portal.jpg" 
                        alt="Venue Portal" 
                        onClick={() => setLightboxImage('/screenshots/venue-portal.jpg')} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* THE SCIENCE - 🧬 */}
              <div 
                ref={(el) => accordionRefs.current['science'] = el}
                className={`accordion-item science ${expandedPlatform === 'science' ? 'expanded' : ''}`}
              >
                <button className="accordion-header" onClick={() => handlePlatformAccordion('science')}>
                  <div className="accordion-title">
                    <span className="accordion-icon">🧬</span>
                    <div>
                      <h3>The Science</h3>
                      <p>Proprietary assessment technology</p>
                    </div>
                  </div>
                  <span className="accordion-toggle">{expandedPlatform === 'science' ? '−' : '+'}</span>
                </button>
                
                <div className="accordion-content">
                  <div className="science-grid">
                    <div className="science-card dapa">
                      <h4>DAPA System</h4>
                      <p className="science-subtitle">Dynamic Adaptive Proficiency Assessment</p>
                      <ul>
                        <li><strong>600+</strong> questions across 9 categories</li>
                        <li><strong>6-axis genome:</strong> Technical, Ethical, EQ, Velocity, Commercial, Leadership</li>
                        <li><strong>Adaptive difficulty</strong> that responds to performance</li>
                        <li><strong>Moral gradient scoring</strong> for nuanced assessment</li>
                        <li><strong>Anti-gaming protection</strong> with scenario-based questions</li>
                      </ul>
                      <p className="science-value">The most comprehensive hospitality skills assessment ever built</p>
                    </div>

                    <div className="science-card genome">
                      <h4>OnScene Genome</h4>
                      <p className="science-subtitle">Hospitality Personality Assessment</p>
                      <ul>
                        <li><strong>45</strong> questions across 10 dimensions</li>
                        <li><strong>20 unique archetypes</strong> for pros and patrons</li>
                        <li><strong>Visual preference testing</strong> for subconscious insights</li>
                        <li><strong>Scenario responses</strong> for behavioral mapping</li>
                        <li><strong>Value alignment</strong> for authentic matching</li>
                      </ul>
                      <p className="science-value">Personality-driven connections and recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* FOUNDER'S VISION */}
        {/* ================================================================== */}
        <section id="vision" className="section-vision">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['vision-header'] ? 'visible' : ''}`} id="vision-header">
              <div className="founder-intro">
                <div className="founder-photo">
                  <span>👤</span>
                </div>
                <div className="founder-text">
                  <h2>Hi, I'm Jack Joy</h2>
                  <p>Founder of OnTonight</p>
                </div>
              </div>
              <p className="founder-tagline">Almost 30 years behind bars. One mission: build the career infrastructure hospitality deserves.</p>
            </div>

            <div className="vision-accordion">
              {visionSections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => accordionRefs.current[`vision-${section.id}`] = el}
                  className={`vision-item animate-on-scroll ${visibleSections[`vision-${section.id}`] ? 'visible' : ''} ${expandedVision === section.id ? 'expanded' : ''}`}
                  id={`vision-${section.id}`}
                >
                  <button className="vision-header" onClick={() => handleVisionAccordion(section.id)}>
                    <h3>{section.title}</h3>
                    <span className="vision-toggle">{expandedVision === section.id ? '−' : '+'}</span>
                  </button>
                  <div className="vision-content">
                    {section.content.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* WAITLIST */}
        {/* ================================================================== */}
        <section id="waitlist" className="section-waitlist">
          <div className="container">
            <div className={`waitlist-content animate-on-scroll ${visibleSections['waitlist-content'] ? 'visible' : ''}`} id="waitlist-content">
              {!submitted ? (
                <>
                  <h2>Join the Movement</h2>
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
                        <option value="onpro">OnPro (Bartender, Server, Sommelier, Chef)</option>
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

                    <p className="form-disclaimer">
                      By submitting, you confirm you are 18+ and agree to receive email communications from OnTonight.
                    </p>

                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? 'Submitting...' : 'Get Early Access →'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="waitlist-success">
                  <div className="success-icon">🎉</div>
                  <h2>Welcome to the Movement</h2>
                  <p>You're among the first 2,000. Check your email for next steps and your exclusive access code.</p>
                  <a href="https://app.on-tonight.com" className="btn-primary">Launch the App →</a>
                </div>
              )}
            </div>
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
                <p className="footer-tagline-text">Your Night. Your People.<br />Where Regulars Are Made.</p>
              </div>
              <div className="footer-links">
                <h4>Platform</h4>
                <a href="#what">What It Is</a>
                <a href="#platform">Features</a>
                <a href="#vision">Our Story</a>
              </div>
              <div className="footer-links">
                <h4>Company</h4>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
              </div>
              <div className="footer-links">
                <h4>Connect</h4>
                <p>Tampa, FL</p>
                <a href="mailto:hello@on-tonight.com">hello@on-tonight.com</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} OnTonight LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close">×</button>
          <img src={lightboxImage} alt="Screenshot" />
        </div>
      )}

      {/* ================================================================== */}
      {/* STYLES */}
      {/* ================================================================== */}
      <style jsx>{`
        /* ============================================= */
        /* FIX C: MOBILE - Prevent horizontal scroll */
        /* ============================================= */
        :global(html), :global(body) {
          overflow-x: hidden;
          max-width: 100vw;
        }

        /* ============================================= */
        /* BASE STYLES */
        /* ============================================= */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page {
          font-family: 'Urbanist', -apple-system, sans-serif;
          background: #0a0d12;
          color: #f8fafc;
          min-height: 100vh;
          overflow-x: hidden;
          max-width: 100vw;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* SCROLL PROGRESS */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #d4a373, #e0b68a);
          z-index: 9999;
          transition: width 0.05s linear;
        }

        /* PARTICLES */
        .particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(212, 163, 115, 0.4);
          border-radius: 50%;
          animation: float-particle linear infinite;
        }

        @keyframes float-particle {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-20vh) scale(1); opacity: 0; }
        }

        /* ANIMATIONS */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(10, 13, 18, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 1000;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .nav-logo {
          font-size: 22px;
          font-weight: 700;
          color: #d4a373;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-links a {
          color: rgba(248, 250, 252, 0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: #f8fafc; }

        .nav-cta {
          background: #d4a373 !important;
          color: #0a0d12 !important;
          padding: 10px 24px !important;
          border-radius: 6px;
          font-weight: 600 !important;
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          padding: 100px 24px 60px;
        }

        .hero-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(212, 163, 115, 0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-glow-2 {
          position: absolute;
          bottom: -300px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero .container { position: relative; z-index: 1; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          border: 1px solid rgba(212, 163, 115, 0.3);
          padding: 10px 20px;
          border-radius: 50px;
          background: rgba(212, 163, 115, 0.05);
          margin-bottom: 32px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.9); }
        }

        .hero-tagline { margin: 0 0 20px; }

        .tagline-line {
          display: block;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 700;
          color: #f8fafc;
          line-height: 1.2;
        }

        .tagline-emphasis {
          display: block;
          font-size: clamp(32px, 6vw, 60px);
          font-weight: 800;
          background: linear-gradient(135deg, #d4a373 0%, #e8c9a0 50%, #d4a373 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          margin-top: 4px;
        }

        .hero-descriptor {
          height: 28px;
          font-size: 17px;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 36px;
        }

        .cursor {
          color: #d4a373;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* WHO ARE YOU */
        .who-are-you { margin-bottom: 24px; }

        .who-label {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.5);
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .who-options {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .who-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }

        .who-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(212, 163, 115, 0.3);
          transform: translateY(-2px);
        }

        .who-btn:active {
          transform: translateY(0);
        }

        .who-btn.selected {
          background: rgba(212, 163, 115, 0.1);
          border-color: #d4a373;
        }

        .who-icon { font-size: 26px; }

        .who-text { display: flex; flex-direction: column; }

        .who-text strong {
          font-size: 14px;
          color: #f8fafc;
          font-weight: 600;
        }

        .who-text small {
          font-size: 11px;
          color: rgba(248, 250, 252, 0.5);
          margin-top: 2px;
        }

        .btn-install {
          margin-top: 16px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(248, 250, 252, 0.5);
          padding: 10px 20px;
          font-size: 13px;
          border-radius: 6px;
          cursor: pointer;
        }

        .scroll-hint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(248, 250, 252, 0.3);
          font-size: 11px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* SECTION HEADERS */
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 700;
          margin: 0 0 14px;
        }

        .section-header p {
          font-size: 16px;
          color: rgba(248, 250, 252, 0.6);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* WHAT IS ONTONIGHT */
        .section-what {
          padding: 100px 0 80px;
          background: linear-gradient(180deg, #0a0d12 0%, #0e1117 100%);
        }

        .what-subtitle {
          font-size: 18px !important;
          color: #d4a373 !important;
        }

        .what-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .what-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .what-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 163, 115, 0.2);
          transform: translateY(-4px);
        }

        .what-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .what-card h3 {
          font-size: 18px;
          margin: 0 0 12px;
          color: #d4a373;
        }

        .what-card p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.7);
          margin: 0;
        }

        .what-card em {
          color: #f8fafc;
          font-style: italic;
        }

        .what-summary {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          padding: 28px 32px;
          background: rgba(212, 163, 115, 0.05);
          border: 1px solid rgba(212, 163, 115, 0.15);
          border-radius: 12px;
        }

        .what-summary p {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.85);
          margin: 0;
        }

        .what-summary strong {
          color: #d4a373;
        }

        /* PROBLEM SECTION */
        .section-problem {
          padding: 100px 0;
          background: #0e1117;
        }

        .problem-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 60px;
        }

        .problem-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 28px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .problem-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 163, 115, 0.2);
        }

        .problem-card.expanded {
          background: rgba(212, 163, 115, 0.05);
          border-color: rgba(212, 163, 115, 0.3);
        }

        .card-icon { font-size: 32px; margin-bottom: 14px; }
        .card-stat { font-size: 32px; font-weight: 800; color: #d4a373; margin-bottom: 6px; }
        .card-label { font-size: 13px; color: rgba(248, 250, 252, 0.6); }

        .card-expand-icon {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
        }

        .card-expanded-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
        }

        .problem-card.expanded .card-expanded-content {
          max-height: 200px;
          padding-top: 16px;
        }

        .card-expanded-content p {
          font-size: 13px;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.7);
          margin: 0;
          text-align: left;
        }

        /* QUOTES */
        .quotes-section { text-align: center; }

        .quotes-section h3 {
          font-size: 14px;
          font-weight: 600;
          color: rgba(248, 250, 252, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 28px;
        }

        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .quote-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 24px;
          text-align: left;
        }

        .quote-card p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.8);
          margin: 0 0 14px;
          font-style: italic;
        }

        .quote-card cite {
          font-size: 12px;
          color: rgba(248, 250, 252, 0.5);
          font-style: normal;
        }

        /* PLATFORM SECTION */
        .section-platform {
          padding: 100px 0;
          background: linear-gradient(180deg, #0e1117 0%, #0a0d12 100%);
        }

        .platform-accordion {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .accordion-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accordion-item.expanded {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(212, 163, 115, 0.2);
        }

        .accordion-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 28px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }

        .accordion-title {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .accordion-icon { font-size: 32px; }

        .accordion-title h3 {
          font-size: 20px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
        }

        .accordion-title p {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.5);
          margin: 4px 0 0;
        }

        .accordion-toggle {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          color: #d4a373;
          font-size: 22px;
          flex-shrink: 0;
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }

        .accordion-item.expanded .accordion-content {
          max-height: 2000px;
        }

        .platform-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 0 28px 32px;
        }

        .platform-lead {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.8);
          margin: 0 0 28px;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .feature-item {
          display: flex;
          gap: 14px;
        }

        .feature-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .feature-item h4 {
          font-size: 15px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0 0 4px;
        }

        .feature-item p {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(248, 250, 252, 0.6);
          margin: 0;
        }

        /* PRICING */
        .pricing-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .price-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 20px;
        }

        .price-card.premium {
          background: rgba(212, 163, 115, 0.05);
          border-color: rgba(212, 163, 115, 0.2);
        }

        .price-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: #d4a373;
          background: rgba(212, 163, 115, 0.15);
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .price-card h4 {
          font-size: 16px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0 0 12px;
        }

        .price-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .price-card li {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.7);
          padding: 5px 0;
          padding-left: 18px;
          position: relative;
        }

        .price-card li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #22c55e;
          font-size: 11px;
        }

        /* FIX B: SCREENSHOTS & PLACEHOLDERS */
        .platform-screenshots {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          align-content: start;
        }

        .platform-screenshots.single {
          grid-template-columns: 1fr;
        }

        .platform-screenshots img,
        .screenshot-placeholder {
          width: 100%;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.3s ease;
          aspect-ratio: 9/16;
          object-fit: cover;
        }

        .platform-screenshots img:hover,
        .screenshot-placeholder:hover {
          transform: scale(1.02);
        }

        .screenshot-placeholder {
          background: linear-gradient(145deg, rgba(212, 163, 115, 0.1), rgba(212, 163, 115, 0.05));
          border: 1px dashed rgba(212, 163, 115, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .placeholder-icon {
          font-size: 48px;
          opacity: 0.6;
        }

        .placeholder-text {
          font-size: 12px;
          color: rgba(248, 250, 252, 0.5);
          text-align: center;
          padding: 0 12px;
        }

        /* ARCHETYPES */
        .archetypes-section {
          padding: 0 28px 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: 20px;
          padding-top: 28px;
        }

        .archetypes-section h4 {
          font-size: 18px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 6px;
        }

        .archetypes-section > p {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          margin: 0 0 20px;
        }

        .archetypes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .patron-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .archetype-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          padding: 12px 14px;
        }

        .archetype-chip span:first-child { font-size: 22px; }

        .archetype-chip strong {
          display: block;
          font-size: 13px;
          color: #f8fafc;
        }

        .archetype-chip small {
          display: block;
          font-size: 11px;
          color: rgba(248, 250, 252, 0.5);
          margin-top: 2px;
        }

        /* SCIENCE */
        .science-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 28px 28px;
        }

        .science-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 28px;
        }

        .science-card.dapa { border-color: rgba(212, 163, 115, 0.2); }
        .science-card.genome { border-color: rgba(139, 92, 246, 0.2); }

        .science-card h4 {
          font-size: 20px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 6px;
        }

        .science-subtitle {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.5);
          margin: 0 0 20px;
        }

        .science-card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
        }

        .science-card li {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.75);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .science-card li:last-child { border: none; }

        .science-card li strong { color: #d4a373; }

        .science-value {
          font-size: 13px;
          font-style: italic;
          color: rgba(248, 250, 252, 0.5);
          margin: 0;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* VISION */
        .section-vision {
          padding: 100px 0;
          background: #0a0d12;
        }

        .founder-intro {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 16px;
        }

        .founder-photo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(212, 163, 115, 0.2), rgba(212, 163, 115, 0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
        }

        .founder-text h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        .founder-text p {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          margin: 4px 0 0;
        }

        .founder-tagline {
          font-size: 17px;
          color: rgba(248, 250, 252, 0.7);
          text-align: center;
          margin: 0 0 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .vision-accordion {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .vision-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .vision-item.expanded {
          background: rgba(212, 163, 115, 0.02);
          border-color: rgba(212, 163, 115, 0.2);
        }

        .vision-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 22px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }

        .vision-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0;
        }

        .vision-toggle {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          color: #d4a373;
          font-size: 18px;
        }

        .vision-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }

        .vision-item.expanded .vision-content {
          max-height: 800px;
        }

        .vision-content p {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(248, 250, 252, 0.8);
          margin: 0 0 16px;
          padding: 0 22px;
        }

        .vision-content p:last-child { padding-bottom: 22px; }

        /* WAITLIST */
        .section-waitlist {
          padding: 100px 0;
          background: linear-gradient(180deg, #0e1117 0%, #0a0d12 100%);
        }

        .waitlist-content {
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
        }

        .waitlist-content h2 { font-size: 32px; margin: 0 0 12px; }

        .waitlist-subtitle {
          font-size: 16px;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 32px;
        }

        .waitlist-form { text-align: left; }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .waitlist-form input,
        .waitlist-form select {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #f8fafc;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s;
          -webkit-appearance: none;
        }

        .waitlist-form input::placeholder { color: rgba(248, 250, 252, 0.4); }

        .waitlist-form input:focus,
        .waitlist-form select:focus {
          outline: none;
          border-color: #d4a373;
          background: rgba(212, 163, 115, 0.05);
        }

        .form-disclaimer {
          font-size: 11px;
          color: rgba(248, 250, 252, 0.4);
          text-align: center;
          margin: 18px 0;
        }

        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, #d4a373, #c99763);
          color: #0a0d12;
          border: none;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          -webkit-tap-highlight-color: transparent;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 163, 115, 0.25);
        }

        .btn-submit:active {
          transform: translateY(0);
        }

        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .waitlist-success { padding: 32px 0; }

        .success-icon { font-size: 48px; margin-bottom: 16px; }

        .waitlist-success p {
          font-size: 15px;
          color: rgba(248, 250, 252, 0.7);
          margin-bottom: 24px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #d4a373, #c99763);
          color: #0a0d12;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }

        /* FOOTER */
        .footer {
          padding: 60px 24px 32px;
          background: #080a0e;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-logo {
          font-size: 20px;
          font-weight: 700;
          color: #d4a373;
          margin-bottom: 10px;
        }

        .footer-tagline-text {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.5);
          line-height: 1.5;
        }

        .footer-links h4 {
          font-size: 11px;
          font-weight: 600;
          color: rgba(248, 250, 252, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 14px;
        }

        .footer-links a,
        .footer-links p {
          display: block;
          font-size: 13px;
          color: rgba(248, 250, 252, 0.5);
          text-decoration: none;
          margin-bottom: 8px;
        }

        .footer-links a:hover { color: #d4a373; }

        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .footer-bottom p {
          font-size: 12px;
          color: rgba(248, 250, 252, 0.4);
          margin: 0;
        }

        /* LIGHTBOX */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
          padding: 32px;
        }

        .lightbox img {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 10px;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: white;
          font-size: 32px;
          cursor: pointer;
        }

        /* ============================================= */
        /* FIX C: RESPONSIVE - IMPROVED MOBILE */
        /* ============================================= */
        @media (max-width: 900px) {
          .what-grid { grid-template-columns: 1fr; }
          .problem-grid { grid-template-columns: repeat(2, 1fr); }
          .quotes-grid { grid-template-columns: 1fr; }
          .platform-content-grid { grid-template-columns: 1fr; }
          .platform-screenshots { order: -1; grid-template-columns: repeat(3, 1fr); }
          .science-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          .nav-links a:not(.nav-cta) { display: none; }
          .nav-container { padding: 12px 16px; }
          .nav-cta { padding: 8px 16px !important; font-size: 13px !important; }
          
          .hero { padding: 80px 16px 40px; }
          .who-options { flex-direction: column; align-items: center; }
          .who-btn { width: 100%; max-width: 280px; }
          
          .problem-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .pricing-row { grid-template-columns: 1fr; }
          .platform-screenshots { grid-template-columns: 1fr; }
          .archetypes-grid { grid-template-columns: repeat(2, 1fr); }
          .patron-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
          
          .container { padding: 0 16px; }
          .section-what, .section-problem, .section-platform, .section-vision, .section-waitlist {
            padding: 60px 0;
          }
          
          .accordion-header { padding: 18px 16px; }
          .platform-content-grid { padding: 0 16px 24px; }
          .archetypes-section { padding: 0 16px 20px; }
          .science-grid { padding: 0 16px 20px; }
          
          .founder-intro { flex-direction: column; gap: 12px; }
          .founder-photo { width: 64px; height: 64px; font-size: 28px; }
          .founder-text { text-align: center; }
          .founder-text h2 { font-size: 24px; }
        }

        @media (max-width: 380px) {
          .archetypes-grid, .patron-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
