// pages/index.js
// ============================================================================
// ONTONIGHT LANDING PAGE - REMARKABLE EDITION
// ============================================================================
// Static Tagline + Secondary Typewriter + Expandable Sections + Scroll Magic
// "Your Night. Your People. Where Regulars Are Made."
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
  
  // Expandable sections state
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [expandedPlatform, setExpandedPlatform] = useState('onpro');
  const [expandedVision, setExpandedVision] = useState(null);

  // PWA
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // ============================================================================
  // SECONDARY TYPEWRITER - Descriptive statements (NOT the tagline)
  // ============================================================================
  const descriptors = [
    "Professional identity that travels with you.",
    "Follow your favorite bartender anywhere.",
    "Verified skills. Portable careers.",
    "The LinkedIn for hospitality.",
    "End professional erasure forever."
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

  // Intersection Observer for scroll-triggered animations
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
    { id: 'money', icon: '💰', stat: '$24K', label: 'Lost Per Venue Change', desc: 'Average bartender loses $24,000 in regular tips when changing venues. Your regulars can\'t follow you. Years of relationship building—gone.' },
    { id: 'turnover', icon: '🔄', stat: '73%', label: 'Annual Turnover', desc: 'The hospitality industry has the highest turnover of any sector. Every departure erases years of relationship building and institutional knowledge.' },
    { id: 'zero', icon: '📉', stat: 'Zero', label: 'Career Infrastructure', desc: 'Lawyers have bar licenses. Doctors have credentials. Engineers have GitHub. Hospitality professionals start from scratch every single move.' },
    { id: 'workers', icon: '💔', stat: '15.6M', label: 'Workers Affected', desc: 'Over 15 million hospitality professionals in the US alone face this reality. Bartenders. Servers. Sommeliers. Baristas. All of them.' }
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
    { icon: '🔔', title: 'Follow Your Favorites', desc: 'Get notified when your favorite bartender or server is working. Never show up to find they\'re off again.' },
    { icon: '🗺️', title: 'Track Across Venues', desc: 'When they change jobs, you get notified of their new location. The magic follows the person, not the place.' },
    { icon: '🧬', title: 'OnScene Genome', desc: '45 questions across 10 dimensions reveal your hospitality personality. Get matched to experiences that fit YOU.' },
    { icon: '✨', title: 'Personalized Discovery', desc: 'Find new spots that match your vibe. Your genome guides recommendations to places you\'ll actually love.' }
  ];

  const venueFeatures = [
    { icon: '✅', title: 'Verified Staff', desc: 'See DAPA scores before you hire. Know exactly what level of expertise you\'re getting. No more surprises.' },
    { icon: '🌟', title: 'Featured Professionals', desc: 'Showcase your best talent. Let their reputation drive traffic to your venue. Turn retention into competitive advantage.' },
    { icon: '📈', title: 'Analytics Dashboard', desc: 'Track which OnPros drive repeat visits. Understand your customer relationships at a deeper level.' },
    { icon: '🎯', title: 'Culture Matching', desc: 'Find staff whose professional genome aligns with your venue\'s vibe. Better culture fit means longer tenure.' }
  ];

  const visionSections = [
    { 
      id: 'story', 
      title: '27 Years Behind the Bar',
      content: `Twenty-seven years in hospitality. Not watching from an office—living it. Behind the stick where ice never stops flowing and the POS screen glows like a beacon through double shifts.

I've made drinks until my hands cramped. I've worked stations where you pour four cocktails simultaneously while maintaining three separate conversations, each guest believing they have your full attention—because in that moment, they do.

I know what it means to be good at this work. The muscle memory. The emotional intelligence. The technical precision of a 200-drink rush hour.

And I've watched the best people I ever trained walk out the door. Every single time, they started over from zero.`
    },
    {
      id: 'pattern',
      title: 'The Pattern You Can\'t Unsee',
      content: `Once you see it, you can't look away. Every industry has professional infrastructure except hospitality.

Lawyers switch firms, but their bar membership follows them. Software engineers change companies—their GitHub stays with them. Real estate agents move brokerages and take their client databases.

But a bartender changes venues and loses everything. Every. Single. Time.

The regular who tipped $50 every Friday? Can't find you. The professional reputation you spent a decade building? Starts at zero.

This isn't the nature of the industry. This is the absence of professional infrastructure.`
    },
    {
      id: 'solution',
      title: 'What OnTonight Actually Is',
      content: `OnTonight is professional infrastructure—the kind that every other industry already has, finally built for hospitality.

For professionals: Your skills are verified through DAPA. Your professional identity is portable. Your customer relationships belong to you.

For customers: Your favorite bartender changes jobs? You get notified. The relationship doesn't end when the employment ends.

For venues: Recruit verified talent—not résumés and promises, but proven skill. Compete on culture instead of wages alone.

This is professional dignity in software form. This is career equity for people who serve.`
    },
    {
      id: 'future',
      title: 'The Future We\'re Building',
      content: `Imagine hospitality where professionals own their careers. Where a talented bartender can leave a toxic workplace without losing their livelihood. Where better opportunities don't mean starting over from scratch.

We're live now in Tampa Bay. From here, we're expanding to Miami, Nashville, Austin, and major hospitality markets nationwide.

This isn't a product launch. This is a correction—the professional infrastructure that should have existed all along.

We're not just building software. We're building the future of hospitality careers. We're ending professional erasure. We're making dignity portable.`
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
  // RENDER
  // ============================================================================
  return (
    <>
      <Head>
        <title>OnTonight - Your Night. Your People. Where Regulars Are Made.</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry. Live now in Tampa Bay." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* PARTICLES */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
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
              <a href="#problem">The Problem</a>
              <a href="#platform">Platform</a>
              <a href="#vision">Vision</a>
              <a href="#waitlist" className="nav-cta">Join Waitlist</a>
            </div>
          </div>
        </nav>

        {/* ================================================================== */}
        {/* HERO - STATIC TAGLINE, SECONDARY TYPEWRITER */}
        {/* ================================================================== */}
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-glow-2" />
          
          <div className="container">
            <div className="hero-badge">
              <span className="badge-dot" />
              LIVE NOW · TAMPA BAY PILOT
            </div>

            {/* STATIC TAGLINE - THE STAR */}
            <h1 className="hero-tagline">
              <span className="tagline-line">Your Night. Your People.</span>
              <span className="tagline-emphasis">Where Regulars Are Made.</span>
            </h1>

            {/* SECONDARY TYPEWRITER - Supporting descriptor */}
            <div className="hero-descriptor">
              <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">27</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">$66.8B</span>
                <span className="stat-label">Industry Crisis</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">15.6M</span>
                <span className="stat-label">Workers Affected</span>
              </div>
            </div>

            <div className="hero-ctas">
              <a href="#platform" className="btn-primary">Explore Platform</a>
              <a href="#vision" className="btn-secondary">Read the Vision</a>
            </div>

            {showInstallPrompt && (
              <button onClick={handleInstall} className="btn-install">
                📱 Add to Home Screen
              </button>
            )}
          </div>

          <div className="scroll-hint">
            <span>Scroll to explore</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* THE PROBLEM - EXPANDABLE CARDS */}
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
        {/* PLATFORM - EXPANDABLE TABS */}
        {/* ================================================================== */}
        <section id="platform" className="section-platform">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['platform-header'] ? 'visible' : ''}`} id="platform-header">
              <h2>The Platform</h2>
              <p>Three solutions. One complete ecosystem for hospitality.</p>
            </div>

            {/* PLATFORM ACCORDION */}
            <div className="platform-accordion">
              {/* ONPRO */}
              <div className={`accordion-item ${expandedPlatform === 'onpro' ? 'expanded' : ''}`}>
                <button className="accordion-header" onClick={() => setExpandedPlatform(expandedPlatform === 'onpro' ? null : 'onpro')}>
                  <div className="accordion-title">
                    <span className="accordion-icon">🎯</span>
                    <div>
                      <h3>For OnPros</h3>
                      <p>Bartenders, Servers, Sommeliers, Baristas</p>
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
                            <li>Advanced analytics</li>
                            <li>Priority matching</li>
                            <li>Verified badge boost</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="platform-screenshots">
                      <img src="/screenshots/onpro-profile-status.jpg" alt="OnPro Profile" onClick={() => setLightboxImage('/screenshots/onpro-profile-status.jpg')} />
                      <img src="/screenshots/onpro-skills-catagories.jpg" alt="Skills" onClick={() => setLightboxImage('/screenshots/onpro-skills-catagories.jpg')} />
                      <img src="/screenshots/onpro-assessment-dashboard.jpg" alt="Dashboard" onClick={() => setLightboxImage('/screenshots/onpro-assessment-dashboard.jpg')} />
                    </div>
                  </div>

                  {/* ONPRO ARCHETYPES */}
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

              {/* PATRON */}
              <div className={`accordion-item ${expandedPlatform === 'patron' ? 'expanded' : ''}`}>
                <button className="accordion-header" onClick={() => setExpandedPlatform(expandedPlatform === 'patron' ? null : 'patron')}>
                  <div className="accordion-title">
                    <span className="accordion-icon">💜</span>
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
                      <p className="platform-lead">Never lose your favorite bartender again. When they move, you'll know. The relationship survives the job change.</p>
                      
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

                      <div className="pricing-row single">
                        <div className="price-card free full-width">
                          <span className="price-badge">ALWAYS FREE</span>
                          <h4>Patron</h4>
                          <ul>
                            <li>Follow unlimited OnPros</li>
                            <li>Real-time notifications</li>
                            <li>OnScene Genome assessment</li>
                            <li>Venue discovery & check-ins</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="platform-screenshots">
                      <img src="/screenshots/patron-explore.jpg" alt="Explore" onClick={() => setLightboxImage('/screenshots/patron-explore.jpg')} />
                      <img src="/screenshots/patron-genome.jpg" alt="Genome" onClick={() => setLightboxImage('/screenshots/patron-genome.jpg')} />
                      <img src="/screenshots/patron-messaging.jpg" alt="Messaging" onClick={() => setLightboxImage('/screenshots/patron-messaging.jpg')} />
                    </div>
                  </div>

                  {/* PATRON ARCHETYPES */}
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

              {/* VENUE */}
              <div className={`accordion-item ${expandedPlatform === 'venue' ? 'expanded' : ''}`}>
                <button className="accordion-header" onClick={() => setExpandedPlatform(expandedPlatform === 'venue' ? null : 'venue')}>
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
                          <span className="price-badge">PILOT</span>
                          <h4>Venue Basic</h4>
                          <ul>
                            <li>Staff verification</li>
                            <li>Featured OnPro profiles</li>
                            <li>Basic analytics</li>
                            <li>Dedicated onboarding</li>
                          </ul>
                        </div>
                        <div className="price-card premium">
                          <span className="price-badge">CUSTOM</span>
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
                      <img src="/screenshots/venue-portal.jpg" alt="Venue Portal" onClick={() => setLightboxImage('/screenshots/venue-portal.jpg')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* THE SCIENCE */}
              <div className={`accordion-item science ${expandedPlatform === 'science' ? 'expanded' : ''}`}>
                <button className="accordion-header" onClick={() => setExpandedPlatform(expandedPlatform === 'science' ? null : 'science')}>
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
                      <p className="science-value">$300,000+ in IP value</p>
                    </div>

                    <div className="science-card genome">
                      <h4>OnScene Genome</h4>
                      <p className="science-subtitle">Hospitality Personality Assessment</p>
                      <ul>
                        <li><strong>45</strong> questions across 10 dimensions</li>
                        <li><strong>12 unique archetypes</strong> from Regular to Student</li>
                        <li><strong>Visual preference testing</strong> for subconscious insights</li>
                        <li><strong>Scenario responses</strong> for behavioral mapping</li>
                        <li><strong>Value alignment</strong> for authentic matching</li>
                      </ul>
                      <p className="science-value">Personality-driven recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* VISION - EXPANDABLE STORY */}
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
              <p className="founder-tagline">27 years behind bars. One mission: end professional erasure in hospitality.</p>
            </div>

            <div className="vision-accordion">
              {visionSections.map((section) => (
                <div
                  key={section.id}
                  className={`vision-item animate-on-scroll ${visibleSections[`vision-${section.id}`] ? 'visible' : ''} ${expandedVision === section.id ? 'expanded' : ''}`}
                  id={`vision-${section.id}`}
                >
                  <button className="vision-header" onClick={() => setExpandedVision(expandedVision === section.id ? null : section.id)}>
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
        {/* WAITLIST - STATIC, ALWAYS VISIBLE */}
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
                        <option value="onpro">OnPro (Bartender, Server, Sommelier)</option>
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
                <a href="https://app.on-tonight.com">Launch App</a>
                <a href="/careers">Careers</a>
                <a href="/partner">Partner With Us</a>
              </div>
              <div className="footer-links">
                <h4>Legal</h4>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/contact">Contact</a>
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

        {/* LIGHTBOX */}
        {lightboxImage && (
          <div className="lightbox" onClick={() => setLightboxImage(null)}>
            <img src={lightboxImage} alt="Screenshot" />
            <button className="lightbox-close">×</button>
          </div>
        )}
      </div>

      {/* ================================================================== */}
      {/* STYLES */}
      {/* ================================================================== */}
      <style jsx>{`
        /* ============================================
           BASE
           ============================================ */
        .page {
          min-height: 100vh;
          background: #0a0d12;
          color: #f8fafc;
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ============================================
           SCROLL PROGRESS
           ============================================ */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #d4a373, #e0b68a);
          z-index: 9999;
          transition: width 0.05s linear;
        }

        /* ============================================
           PARTICLES
           ============================================ */
        .particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
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

        /* ============================================
           SCROLL ANIMATIONS
           ============================================ */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ============================================
           NAVIGATION
           ============================================ */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(10, 13, 18, 0.85);
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
          gap: 32px;
        }

        .nav-links a {
          color: rgba(248, 250, 252, 0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: #f8fafc;
        }

        .nav-cta {
          background: #d4a373 !important;
          color: #0a0d12 !important;
          padding: 10px 24px !important;
          border-radius: 6px;
          font-weight: 600 !important;
        }

        .nav-cta:hover {
          background: #c99763 !important;
        }

        /* ============================================
           HERO
           ============================================ */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          padding: 120px 24px 80px;
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

        .hero .container {
          position: relative;
          z-index: 1;
        }

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
          margin-bottom: 40px;
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

        /* STATIC TAGLINE - THE STAR */
        .hero-tagline {
          margin: 0 0 24px;
        }

        .tagline-line {
          display: block;
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 700;
          color: #f8fafc;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .tagline-emphasis {
          display: block;
          font-size: clamp(40px, 7vw, 68px);
          font-weight: 800;
          background: linear-gradient(135deg, #d4a373 0%, #e8c9a0 50%, #d4a373 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-top: 8px;
        }

        /* SECONDARY TYPEWRITER */
        .hero-descriptor {
          height: 32px;
          font-size: 18px;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 48px;
        }

        .typed-text {
          border-right: 2px solid transparent;
        }

        .cursor {
          color: #d4a373;
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #d4a373;
        }

        .stat-label {
          font-size: 13px;
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
          background: linear-gradient(135deg, #d4a373, #c99763);
          color: #0a0d12;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(212, 163, 115, 0.25);
        }

        .btn-secondary {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212, 163, 115, 0.4);
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: rgba(212, 163, 115, 0.1);
          border-color: #d4a373;
        }

        .btn-install {
          margin-top: 24px;
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
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(248, 250, 252, 0.3);
          font-size: 12px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        /* ============================================
           SECTION HEADERS
           ============================================ */
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: clamp(32px, 5vw, 44px);
          font-weight: 700;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .section-header p {
          font-size: 18px;
          color: rgba(248, 250, 252, 0.6);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ============================================
           PROBLEM SECTION
           ============================================ */
        .section-problem {
          padding: 120px 0;
          background: linear-gradient(180deg, #0a0d12 0%, #0f1318 100%);
        }

        .problem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 80px;
        }

        .problem-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .problem-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 163, 115, 0.2);
          transform: translateY(-4px);
        }

        .problem-card.expanded {
          background: rgba(212, 163, 115, 0.05);
          border-color: rgba(212, 163, 115, 0.3);
        }

        .card-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .card-stat {
          font-size: 44px;
          font-weight: 800;
          color: #d4a373;
          margin-bottom: 8px;
        }

        .card-label {
          font-size: 14px;
          font-weight: 600;
          color: rgba(248, 250, 252, 0.8);
        }

        .card-expand-icon {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          color: rgba(248, 250, 252, 0.5);
          font-size: 18px;
        }

        .card-expanded-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, margin-top 0.4s ease, opacity 0.4s ease;
          opacity: 0;
        }

        .problem-card.expanded .card-expanded-content {
          max-height: 200px;
          margin-top: 20px;
          opacity: 1;
        }

        .card-expanded-content p {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.7);
          margin: 0;
          text-align: left;
        }

        /* QUOTES */
        .quotes-section {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .quotes-section h3 {
          font-size: 24px;
          text-align: center;
          margin-bottom: 32px;
          color: rgba(248, 250, 252, 0.9);
        }

        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .quote-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 24px;
          margin: 0;
        }

        .quote-card p {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(248, 250, 252, 0.8);
          font-style: italic;
          margin: 0 0 16px;
        }

        .quote-card cite {
          font-size: 13px;
          color: #d4a373;
          font-style: normal;
        }

        /* ============================================
           PLATFORM SECTION
           ============================================ */
        .section-platform {
          padding: 120px 0;
          background: #0a0d12;
        }

        .platform-accordion {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .accordion-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accordion-item:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .accordion-item.expanded {
          border-color: rgba(212, 163, 115, 0.3);
          background: rgba(212, 163, 115, 0.03);
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
        }

        .accordion-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .accordion-icon {
          font-size: 32px;
        }

        .accordion-title h3 {
          font-size: 20px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0;
        }

        .accordion-title p {
          font-size: 14px;
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
          font-size: 24px;
          transition: all 0.3s;
        }

        .accordion-item.expanded .accordion-toggle {
          background: rgba(212, 163, 115, 0.15);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
          margin-bottom: 28px;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .feature-item {
          display: flex;
          gap: 16px;
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
          font-size: 14px;
          color: rgba(248, 250, 252, 0.6);
          line-height: 1.6;
          margin: 0;
        }

        .pricing-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 32px;
        }

        .pricing-row.single {
          grid-template-columns: 1fr;
        }

        .price-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 20px;
        }

        .price-card.full-width {
          max-width: 300px;
        }

        .price-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .price-card.free .price-badge {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .price-card.trial .price-badge {
          background: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
        }

        .price-card.premium .price-badge {
          background: rgba(212, 163, 115, 0.15);
          color: #d4a373;
        }

        .price-card h4 {
          font-size: 16px;
          margin: 0 0 12px;
          color: #f8fafc;
        }

        .price-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .price-card li {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.7);
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
        }

        .price-card li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #22c55e;
          font-size: 12px;
        }

        .platform-screenshots {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          align-content: start;
        }

        .platform-screenshots.single {
          grid-template-columns: 1fr;
        }

        .platform-screenshots img {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s;
        }

        .platform-screenshots img:hover {
          transform: scale(1.03);
          border-color: rgba(212, 163, 115, 0.4);
        }

        /* ARCHETYPES */
        .archetypes-section {
          padding: 32px 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .archetypes-section h4 {
          font-size: 18px;
          margin: 0 0 8px;
          color: #f8fafc;
        }

        .archetypes-section > p {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          margin: 0 0 20px;
        }

        .archetypes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }

        .patron-grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }

        .archetype-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          transition: all 0.2s;
        }

        .archetype-chip:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(212, 163, 115, 0.2);
        }

        .archetype-chip span {
          font-size: 24px;
        }

        .archetype-chip strong {
          display: block;
          font-size: 13px;
          color: #d4a373;
          margin-bottom: 2px;
        }

        .archetype-chip small {
          display: block;
          font-size: 11px;
          color: rgba(248, 250, 252, 0.5);
          line-height: 1.4;
        }

        /* SCIENCE */
        .science-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 28px 32px;
        }

        .science-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 28px;
        }

        .science-card.dapa {
          border-color: rgba(34, 197, 94, 0.2);
        }

        .science-card.genome {
          border-color: rgba(139, 92, 246, 0.2);
        }

        .science-card h4 {
          font-size: 20px;
          margin: 0 0 4px;
        }

        .science-card.dapa h4 {
          color: #22c55e;
        }

        .science-card.genome h4 {
          color: #8b5cf6;
        }

        .science-subtitle {
          font-size: 13px;
          color: rgba(248, 250, 252, 0.5);
          margin-bottom: 20px;
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

        .science-value {
          font-size: 13px;
          color: #d4a373;
          font-weight: 600;
        }

        /* ============================================
           VISION SECTION
           ============================================ */
        .section-vision {
          padding: 120px 0;
          background: linear-gradient(180deg, #0f1318 0%, #0a0d12 100%);
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
          background: rgba(212, 163, 115, 0.1);
          border: 2px dashed rgba(212, 163, 115, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          opacity: 0.6;
        }

        .founder-text h2 {
          font-size: 28px;
          margin: 0;
        }

        .founder-text p {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          margin: 4px 0 0;
        }

        .founder-tagline {
          font-size: 18px;
          color: #d4a373;
          margin: 0;
        }

        .vision-accordion {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .vision-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .vision-item.expanded {
          background: rgba(212, 163, 115, 0.03);
          border-color: rgba(212, 163, 115, 0.2);
        }

        .vision-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .vision-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0;
        }

        .vision-toggle {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          color: #d4a373;
          font-size: 20px;
        }

        .vision-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }

        .vision-item.expanded .vision-content {
          max-height: 1000px;
        }

        .vision-content p {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(248, 250, 252, 0.8);
          margin: 0 0 20px;
          padding: 0 24px;
        }

        .vision-content p:last-child {
          padding-bottom: 24px;
        }

        /* ============================================
           WAITLIST SECTION
           ============================================ */
        .section-waitlist {
          padding: 120px 0;
          background: linear-gradient(180deg, #0a0d12 0%, #12161c 100%);
        }

        .waitlist-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .waitlist-content h2 {
          font-size: 40px;
          margin: 0 0 16px;
        }

        .waitlist-subtitle {
          font-size: 18px;
          color: rgba(248, 250, 252, 0.6);
          margin-bottom: 40px;
        }

        .waitlist-form {
          text-align: left;
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
          font-size: 15px;
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

        .form-disclaimer {
          font-size: 12px;
          color: rgba(248, 250, 252, 0.4);
          text-align: center;
          margin: 20px 0;
        }

        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, #d4a373, #c99763);
          color: #0a0d12;
          border: none;
          padding: 18px;
          font-size: 17px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(212, 163, 115, 0.25);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .waitlist-success {
          padding: 40px 0;
        }

        .success-icon {
          font-size: 56px;
          margin-bottom: 20px;
        }

        .waitlist-success h2 {
          margin-bottom: 12px;
        }

        .waitlist-success p {
          font-size: 16px;
          color: rgba(248, 250, 252, 0.7);
          margin-bottom: 28px;
        }

        /* ============================================
           FOOTER
           ============================================ */
        .footer {
          padding: 80px 24px 40px;
          background: #080a0e;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .footer-logo {
          font-size: 22px;
          font-weight: 700;
          color: #d4a373;
          margin-bottom: 12px;
        }

        .footer-tagline-text {
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          line-height: 1.6;
        }

        .footer-links h4 {
          font-size: 12px;
          font-weight: 600;
          color: rgba(248, 250, 252, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 16px;
        }

        .footer-links a,
        .footer-links p {
          display: block;
          font-size: 14px;
          color: rgba(248, 250, 252, 0.5);
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #d4a373;
        }

        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
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
          padding: 40px;
        }

        .lightbox img {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 12px;
        }

        .lightbox-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: none;
          color: white;
          font-size: 36px;
          cursor: pointer;
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 900px) {
          .platform-content-grid {
            grid-template-columns: 1fr;
          }

          .platform-screenshots {
            order: -1;
            grid-template-columns: repeat(3, 1fr);
          }

          .science-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .nav-links a:not(.nav-cta) {
            display: none;
          }

          .hero-stats {
            gap: 20px;
          }

          .stat-divider {
            display: none;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .pricing-row {
            grid-template-columns: 1fr;
          }

          .platform-screenshots {
            grid-template-columns: 1fr;
          }

          .archetypes-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </>
  );
}
