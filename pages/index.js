// pages/index.js - OnTonight Landing Page (EXACT FILE STRUCTURE MATCH)
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
  const [lightboxImage, setLightboxImage] = useState(null);
  const [platformTab, setPlatformTab] = useState('onpro');

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
        <title>OnTonight - Professional Identity Platform for Hospitality</title>
        <meta name="description" content="Professional identity platform for hospitality. Build portable careers, follow your people, elevate the industry. Live now in Tampa Bay. Expanding to Miami, Nashville & beyond." />
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
              <button className={activeTab === 'home' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('home')}>The Problem</button>
              <button className={activeTab === 'platform' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('platform')}>Platform</button>
              <button className={activeTab === 'founder' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('founder')}>The Solution</button>
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
                <div className="hero-badge">LIVE NOW · JOIN THE MOVEMENT</div>
                <h1>Your Night.<br />Your People.</h1>
                <p className="hero-subtitle">Where Regulars Are Made</p>
                
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-number">27</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">$66.8B</span>
                    <span className="stat-label">Industry Crisis</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">1</span>
                    <span className="stat-label">Solution</span>
                  </div>
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
                    📱 Add to Home Screen
                  </button>
                )}
              </div>
            </section>

            {/* VALUE PROPS */}
            <section className="value">
              <div className="container">
                <h2>What's Your Career Worth?</h2>
                <p className="section-subtitle">The hidden cost of hospitality turnover—and how OnTonight fixes it.</p>
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
              </div>
            </section>

            {/* CRISIS QUOTES */}
            <section className="quotes">
              <div className="container">
                <h2>The $66.8B Industry Crisis</h2>
                <p className="section-subtitle">What industry leaders are saying about hospitality turnover.</p>
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
              </div>
            </section>

            {/* MISSION STATEMENT */}
            <section className="mission">
              <div className="container">
                <div className="mission-content">
                  <h2>Our Mission</h2>
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
            </section>
          </div>
        )}

        {/* PLATFORM TAB */}
        {activeTab === 'platform' && (
          <div className="tab-content">
            <section className="platform-intro">
              <div className="container">
                <h1>Professional Infrastructure</h1>
                <p className="platform-lead">One platform. Three solutions. Complete ecosystem.</p>
                
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
              </div>
            </section>

            <section className="features">
              <div className="container">
                {/* ONPRO FEATURE */}
                {platformTab === 'onpro' && (
                <>
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
                
                {/* DAPA SKILLS ASSESSMENT - FOR ONPROS */}
                <section className="dapa" style={{padding: '80px 24px'}}>
                  <h2>DAPA Professional Assessment</h2>
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
                    
                    {/* ONPRO ARCHETYPES */}
                    <div style={{marginTop: '80px'}}>
                      <h2>Professional Archetypes</h2>
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
                  </section>
                </>
                )}

                {/* PATRON FEATURE */}
                {platformTab === 'patron' && (
                <>
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
                
                {/* PATRON ARCHETYPES */}
                <section className="genome" style={{padding: '80px 24px'}}>
                  <div className="container">
                    <h2>OnScene Genome Archetypes</h2>
                    <p className="section-subtitle">12 social profiles that define your hospitality personality. Discover yours through the OnScene Genome assessment.</p>
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
                </section>
                </>
                )}

                {/* VENUE FEATURE */}
                {platformTab === 'venue' && (
                <>
                <div className="feature">
                  <div className="feature-screenshots single-shot">
                    <img src="/screenshots/venue-analytics-dashboard.jpg" alt="Venue Analytics Dashboard" className="screenshot large" onClick={() => setLightboxImage('/screenshots/venue-analytics-dashboard.jpg')} />
                  </div>
                  <div className="feature-info">
                    <div className="feature-tag">FOR VENUES</div>
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
                
                {/* VENUE BENEFITS SECTION */}
                <div style={{marginTop: '80px'}}>
                  <h2 style={{textAlign: 'center', marginBottom: '48px'}}>Why Venues Partner With OnTonight</h2>
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
                
                {/* ANALYTICS PREVIEW */}
                <div style={{marginTop: '80px', padding: '48px', background: 'rgba(212,163,115,0.03)', borderRadius: '12px', border: '1px solid rgba(212,163,115,0.15)'}}>
                  <h3 style={{marginBottom: '24px', color: '#d4a373'}}>Venue Analytics Dashboard</h3>
                  <p style={{marginBottom: '32px', fontSize: '16px', lineHeight: '1.7', color: 'rgba(248,250,252,0.75)'}}>
                    Track the metrics that matter. See which OnPros drive the most customer visits, who maintains the highest regular retention rates, and where your team excels across DAPA dimensions.
                  </p>
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
                </>
                )}
              </div>
            </section>

            {/* THE SCIENCE TAB */}
            {platformTab === 'science' && (
            <section className="science-section" style={{padding: '100px 24px'}}>
              <div className="container">
                <h2 style={{textAlign: 'center', marginBottom: '24px', fontSize: '48px'}}>The Science Behind Identity</h2>
                <p style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto 100px', fontSize: '20px', color: 'rgba(248,250,252,0.7)', lineHeight: '1.7'}}>
                  Two assessment systems. One goal: accurate, actionable identity profiles for everyone in hospitality.
                </p>
                
                {/* DAPA DEEP DIVE */}
                <div style={{marginTop: '80px', padding: '56px', background: 'rgba(34,197,94,0.03)', borderRadius: '12px', border: '1px solid rgba(34,197,94,0.15)'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px'}}>
                    <h3 style={{fontSize: '36px', margin: 0}}>DAPA: Professional Certification</h3>
                    <span style={{fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '4px', background: 'rgba(34,197,94,0.15)', color: 'rgba(34,197,94,1)', border: '1px solid rgba(34,197,94,0.3)'}}>For OnPros</span>
                  </div>
                  <p style={{fontSize: '17px', lineHeight: '1.8', color: 'rgba(248,250,252,0.75)', marginBottom: '48px'}}>
                    DAPA (Dynamic Adaptive Proficiency Assessment) is the hospitality industry's first comprehensive professional certification system. Unlike traditional skills tests, DAPA measures both technical competence and moral judgment across six critical dimensions.
                  </p>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '60px'}}>
                    <div>
                      <h4 style={{fontSize: '18px', marginBottom: '12px', color: '#d4a373'}}>📐 Adaptive Algorithm</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)'}}>Questions adjust in real-time based on your answers. High performers face increasingly complex scenarios, while the system identifies knowledge gaps and probes deeper. Tests terminate early when confidence thresholds are met—some professionals answer 30 questions, others need 200+.</p>
                    </div>
                    <div>
                      <h4 style={{fontSize: '18px', marginBottom: '12px', color: '#d4a373'}}>⚖️ Moral Gradient Scoring</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)'}}>Every question has multiple "correct" answers—but they're not equal. We measure not just what you know, but how you think. Choosing the legal answer scores differently than choosing the ethical answer. Your moral sophistication becomes part of your professional profile.</p>
                    </div>
                    <div>
                      <h4 style={{fontSize: '18px', marginBottom: '12px', color: '#d4a373'}}>🎯 Six-Axis Measurement</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)'}}>Technical mastery is just one dimension. We also measure Ethical judgment, Emotional intelligence, Velocity under pressure, Commercial awareness, and Leadership capacity. The result: a complete professional genome, not just a test score.</p>
                    </div>
                    <div>
                      <h4 style={{fontSize: '18px', marginBottom: '12px', color: '#d4a373'}}>🔬 Continuous Validation</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)'}}>1,600+ questions across 9 hospitality categories, each validated against real-world performance data. Questions that don't predict success are removed. The system learns and improves with every assessment.</p>
                    </div>
                  </div>
                  
                  {/* 6-AXIS GRID */}
                  <div>
                    <h4 style={{fontSize: '24px', marginBottom: '32px', textAlign: 'center'}}>The Six Professional Dimensions</h4>
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
                  
                  {/* ONPRO ARCHETYPES IN SCIENCE TAB */}
                  <div style={{marginTop: '60px', padding: '48px', background: 'rgba(212,163,115,0.03)', borderRadius: '12px', border: '1px solid rgba(212,163,115,0.15)'}}>
                    <h4 style={{fontSize: '28px', marginBottom: '16px', textAlign: 'center'}}>12 Professional Archetypes</h4>
                    <p style={{textAlign: 'center', fontSize: '16px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)', maxWidth: '800px', margin: '0 auto 32px'}}>
                      Based on your DAPA results, we identify your professional archetype—from The Craftsman (precision and technique) to The Entrepreneur (business-minded execution). These aren't personality types; they're work style profiles derived from measurable performance patterns.
                    </p>
                    <p className="click-instruction">Click any archetype to learn more →</p>
                    <div className="genome-grid" style={{marginTop: '32px'}}>
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
                
                {/* ONSCENE GENOME DEEP DIVE */}
                <div style={{marginTop: '100px', padding: '56px', background: 'rgba(139,92,246,0.03)', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.15)'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px'}}>
                    <h3 style={{fontSize: '36px', margin: 0}}>OnScene Genome: Social Identity</h3>
                    <span style={{fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '4px', background: 'rgba(139,92,246,0.15)', color: 'rgba(139,92,246,1)', border: '1px solid rgba(139,92,246,0.3)'}}>For Patrons</span>
                  </div>
                  <p style={{fontSize: '17px', lineHeight: '1.8', color: 'rgba(248,250,252,0.75)', marginBottom: '48px'}}>
                    OnScene Genome maps your hospitality personality across 10 behavioral dimensions. It's not about demographics or preferences—it's about how you experience and create social moments.
                  </p>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '60px'}}>
                    <div>
                      <h4 style={{fontSize: '18px', marginBottom: '12px', color: '#d4a373'}}>🧬 45 Behavioral Questions</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)'}}>Not "What do you like?" but "How do you behave?" Questions measure decision-making patterns, social preferences, risk tolerance, and relationship dynamics. We're mapping behavior, not opinion.</p>
                    </div>
                    <div>
                      <h4 style={{fontSize: '18px', marginBottom: '12px', color: '#d4a373'}}>📊 10 Social Dimensions</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)'}}>Adventure vs. Familiarity. Solo vs. Social. Discerning vs. Exploratory. Quality vs. Experience. We measure where you fall on ten behavioral spectrums that predict hospitality preferences.</p>
                    </div>
                    <div>
                      <h4 style={{fontSize: '18px', marginBottom: '12px', color: '#d4a373'}}>🎯 Archetype Matching</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)'}}>Your responses map to one of 12 distinct social archetypes. Each archetype has unique venue preferences, OnPro compatibility patterns, and social behaviors. The system matches you to experiences that fit your actual personality.</p>
                    </div>
                    <div>
                      <h4 style={{fontSize: '18px', marginBottom: '12px', color: '#d4a373'}}>🔄 Pattern Recognition</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)'}}>As you use OnTonight, the system learns. Check-ins, favorites, and interaction patterns refine your profile. Your genome evolves as your preferences do.</p>
                    </div>
                  </div>
                  
                  {/* PATRON ARCHETYPES IN SCIENCE TAB */}
                  <div style={{marginTop: '60px', padding: '48px', background: 'rgba(212,163,115,0.03)', borderRadius: '12px', border: '1px solid rgba(212,163,115,0.15)'}}>
                    <h4 style={{fontSize: '28px', marginBottom: '16px', textAlign: 'center'}}>12 Social Archetypes</h4>
                    <p style={{textAlign: 'center', fontSize: '16px', lineHeight: '1.7', color: 'rgba(248,250,252,0.7)', maxWidth: '800px', margin: '0 auto 32px'}}>
                      From The Connector (network builder) to The Connoisseur (quality-focused), each archetype represents a distinct way of experiencing hospitality. Understanding your archetype helps you find venues, OnPros, and experiences that match your natural style.
                    </p>
                    <p className="click-instruction">Click any archetype to learn more →</p>
                    <div className="genome-grid" style={{marginTop: '32px'}}>
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
                
                {/* WHY BOTH MATTER */}
                <div style={{marginTop: '100px', padding: '56px', background: 'rgba(212,163,115,0.05)', borderRadius: '12px', border: '1px solid rgba(212,163,115,0.2)'}}>
                  <h3 style={{textAlign: 'center', marginBottom: '32px', color: '#d4a373', fontSize: '32px'}}>Two Systems, One Platform</h3>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px'}}>
                    <div>
                      <h4 style={{color: 'rgba(34,197,94,1)', marginBottom: '16px', fontSize: '20px'}}>DAPA (OnPro)</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.75)'}}>
                        Measures professional capability and work style. Verifies skills. Creates portable professional identity. Helps venues hire better and OnPros prove their worth.
                      </p>
                    </div>
                    <div>
                      <h4 style={{color: 'rgba(139,92,246,1)', marginBottom: '16px', fontSize: '20px'}}>OnScene Genome (Patron)</h4>
                      <p style={{fontSize: '15px', lineHeight: '1.7', color: 'rgba(248,250,252,0.75)'}}>
                        Measures social behavior and hospitality preferences. Matches people to experiences. Creates personalized recommendations. Helps Patrons find their people and places.
                      </p>
                    </div>
                  </div>
                  <p style={{marginTop: '40px', textAlign: 'center', fontSize: '16px', color: 'rgba(248,250,252,0.8)', lineHeight: '1.8', maxWidth: '900px', margin: '40px auto 0'}}>
                    Together, they create a complete hospitality identity ecosystem. OnPros prove their professional value. Patrons discover authentic experiences. Venues showcase verified talent. Everyone benefits from accurate, actionable identity data.
                  </p>
                </div>
              </div>
            </section>
            )}

            {/* REMOVED STATIC GENOME SECTION - NOW IN TABS */}
          </div>
        )}

      {/* FOUNDER TAB - UPDATED VISION SECTION (1,050 WORDS) */}
        {activeTab === 'founder' && (
          <div className="tab-content">
            <section className="vision">
              <div className="container">
                <h1>The Vision</h1>
                <p className="vision-lead">This is about an industry that deserves infrastructure. And the people who make it real.</p>

                <div className="vision-content">
                  {/* FOUNDER INTRODUCTION */}
                  <div className="founder-intro">
                    <div className="founder-photo-placeholder">
                      {/* TODO: Replace with <img src="/images/jack-photo.jpg" alt="Jack Joy" /> when you have photo */}
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

                  {/* SECTION 1: THE PERSONAL STORY - EXPANDED */}
                  <div className="vision-section">
                    <h3>27 Years Behind the Bar</h3>
                    <p>Twenty-seven years in hospitality. Not watching from an office—<em>living it</em>. Behind the stick where ice never stops flowing and the POS screen glows like a beacon through double shifts. Managing venues where every night is opening night. Training hundreds of professionals who became masters of their craft. But before all that—building drinks with my hands, reading regulars like sheet music, learning that hospitality isn't a job, it's a language.</p>
                    <p>I've made drinks until my hands cramped and my mind could freestyle recipes in my sleep. I've worked stations where you pour four cocktails simultaneously while maintaining three separate conversations, each guest believing they have your full attention—because in that moment, they do. I've closed at 4 AM under neon signs that hum like prayers and opened at 10 AM with coffee that tastes like hope and feels like punishment.</p>
                    <p>I know what it means to be <em>good</em> at this work. The muscle memory that lets you build a perfect Manhattan in 37 seconds while defusing an argument two seats down. The emotional intelligence to spot a proposal about to happen or a breakup already unfolding. The technical precision of a 200-drink rush hour where every ticket is perfect and every guest feels seen.</p>
                    <p>And I've watched the best people I ever trained—the ones who could do all of this—walk out the door because they found something better.</p>
                    <p className="vision-emphasis">Every single time, they started over from zero. Their regulars scattered to the wind. Their reputation reset to nothing. Their professional equity evaporated like smoke from an extinguished candle.</p>
                    <p>I watched bartenders who could make 200 cocktails an hour—muscle memory and chemistry and conversation all at once—lose everything when they changed venues. Sommeliers with encyclopedic knowledge who could taste terroir in a blind pour, starting over as if they'd never held a corkscrew.</p>
                    <p>The industry calls this "turnover." I call it what it is: <strong>systematic professional erasure</strong>.</p>
                  </div>

                  {/* SECTION 2: THE INFRASTRUCTURE GAP */}
                  <div className="vision-section">
                    <h3>The Pattern You Can't Unsee</h3>
                    <p>Once you see it, you can't look away. Every industry has professional infrastructure except hospitality.</p>
                    <p>Lawyers switch firms, but their bar membership follows them like a shadow. Software engineers change companies like seasons—their GitHub stays with them, permanent proof of skill. Real estate agents move brokerages and take their client databases with them, relationships preserved.</p>
                    <p className="vision-emphasis">But a bartender changes venues and loses everything. Every. Single. Time.</p>
                    <p>The regular who tipped $50 every Friday? Can't find you. The customer relationships built over years of remembered birthdays and preferred glassware? Belong to your former employer, filed under "goodwill" on a balance sheet. The professional reputation you spent a decade building, one perfect Manhattan at a time? Starts at zero.</p>
                    <p className="vision-highlight">This isn't the nature of the industry. This is the <em>absence</em> of professional infrastructure. And absence isn't destiny—it's a problem waiting for a solution.</p>
                  </div>

                  {/* SECTION 3: WHY I COULD BUILD THIS */}
                  <div className="vision-section">
                    <h3>Why I Could Build This</h3>
                    <p>After 27 years in hospitality, I transitioned into cybersecurity and software development—a world of systems and logic, of problems that yield to analysis, of building things that scale beyond human limitation.</p>
                    <p>Standing at the intersection of these two worlds, I realized: I understand both sides of this problem.</p>
                    <p>I understand the bartender making 200 drinks an hour during Saturday rush, tracking six tabs in their head while maintaining conversation with regulars, reading the room, defusing tension, creating atmosphere—all simultaneously, all while making it look effortless. I've <em>been</em> that bartender. I understand the sommelier who pairs wine with personality, not just food, who can read a guest's night in the way they hold the glass.</p>
                    <p className="vision-statement">Deep hospitality experience plus technical execution—that combination is rare. It's exactly what this problem needed.</p>
                  </div>

                  {/* SECTION 4: WHAT ONTONIGHT IS */}
                  <div className="vision-section">
                    <h3>What OnTonight Actually Is</h3>
                    <p className="vision-highlight">OnTonight is professional infrastructure—the kind that every other industry already has, the kind that hospitality professionals have deserved for decades, finally built.</p>
                    <ul className="vision-list">
                      <li><strong>For professionals:</strong> Your skills are verified through DAPA, a proprietary 6-axis assessment system. Your professional identity is portable—it follows you, grows with you, compounds over time. Your customer relationships belong to you, not your employer. When you change venues, you bring your value with you—provable, measurable, portable.</li>
                      <li><strong>For customers:</strong> Your favorite bartender changes jobs? You get notified. Your server moves to a new restaurant? You can follow them there. The relationship doesn't end when the employment ends. The magic stays with the person who created it.</li>
                      <li><strong>For venues:</strong> Recruit verified talent—not résumés and promises, but proven skill and measurable expertise. Compete on culture instead of wages alone. Turn retention into a competitive advantage.</li>
                    </ul>
                    <p>This is professional dignity in software form. This is career equity for people who serve. This is the infrastructure that should have existed decades ago.</p>
                  </div>

                  {/* SECTION 5: THE FUTURE */}
                  <div className="vision-section">
                    <h3>The Future We're Building</h3>
                    <p>Imagine hospitality where professionals own their careers. Where a talented bartender can leave a toxic workplace without losing their livelihood, where principle doesn't cost rent, where better opportunities don't mean starting over from scratch.</p>
                    <p>Where small venues compete with corporate chains by showcasing culture and verified talent instead of just matching wages. Where a young professional entering hospitality sees a real career path—one where their skills compound over time instead of resetting to zero every 18 months.</p>
                    <p className="vision-emphasis">That's not fantasy. That's infrastructure. That's what happens when you build the foundation that should have always existed.</p>
                    <p>We're live now in Tampa Bay, working with premier hospitality venues across the region. From here, we're expanding to Miami, Nashville, Austin, and major hospitality markets nationwide—wherever great service happens, wherever professionals deserve infrastructure.</p>
                    <p>This isn't about fixing turnover statistics. This is about restoring professional dignity to an entire industry, one profile at a time, one verified skill at a time, one preserved relationship at a time.</p>
                  </div>

                  {/* CTA */}
                  <div className="vision-cta">
                    <h3>Join the Movement</h3>
                    <p>This isn't a product launch. This is a correction—the professional infrastructure that should have existed all along, finally built, finally real, finally here.</p>
                    <p>If you've ever watched a talented professional start over from scratch and felt the waste of it—you've seen the problem. If you've ever lost touch with someone who made your nights special—you've felt the gap.</p>
                    <p className="cta-emphasis">We're not just building software. We're building the future of hospitality careers. We're ending professional erasure. We're making dignity portable.</p>
                    <a href="#waitlist" className="btn-primary">Join the Waitlist</a>
                    <p className="cta-note">First 2,000 signups get their first year free. Be part of the infrastructure. Be part of the change.</p>
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
                <p className="waitlist-subtitle">First 2,000 signups receive their first year free. Be part of the Tampa launch.</p>
                
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
                      onChange={e => setFormData({...formData, city: e.target.value})} 
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
              <div className="waitlist-success">
                <div className="success-icon">🎉</div>
                <h2>Welcome to the Movement</h2>
                <p>You're among the first 2,000. Check your email for next steps and exclusive launch updates.</p>
                <p className="success-note">Your first year is FREE.</p>
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
                <p className="footer-tagline">Where Regulars Are Made</p>
                <p className="footer-location">Live Now · Tampa Bay → Miami · Nashville · Austin</p>
              </div>
              <div className="footer-links">
  <div className="footer-col">
    <h5>Platform</h5>
    <a href="#waitlist">For OnPros</a>
    <a href="#waitlist">For Patrons</a>
    <a href="#waitlist">For Venues</a>
    <a href="#waitlist">DAPA Assessment</a>
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
        }
        
        h3 {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.015em;
          margin-bottom: 16px;
          color: #f8fafc;
        }
        
        h4 {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
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
          padding: 100px 24px;
        }
        
        .section-subtitle {
          font-size: 18px;
          color: rgba(248,250,252,0.6);
          text-align: center;
          margin-bottom: 16px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .click-instruction {
          font-size: 14px;
          color: #d4a373;
          text-align: center;
          margin-bottom: 48px;
          font-weight: 500;
        }
        
        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          background: rgba(13,17,23,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,163,115,0.1);
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
          font-size: 22px;
          font-weight: 600;
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
          color: rgba(248,250,252,0.5);
          padding: 10px 18px;
          font-size: 15px;
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
          color: #0d1117;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
          margin-left: 16px;
          border-radius: 4px;
        }
        
        .nav-cta:hover {
          opacity: 0.9;
        }
        
        /* HERO */
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          text-align: center;
          padding: 140px 24px 100px;
        }
        
        .hero-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 1000px;
          background: radial-gradient(circle, rgba(212,163,115,0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        
        .hero-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.25);
          padding: 10px 20px;
          margin-bottom: 48px;
          border-radius: 4px;
          background: rgba(212,163,115,0.03);
        }
        
        .hero h1 {
          font-size: 80px;
          margin-bottom: 20px;
          color: #f8fafc;
        }
        
        .hero-subtitle {
          font-size: 24px;
          color: #d4a373;
          margin-bottom: 60px;
          font-weight: 500;
        }
        
        .hero-stats {
          display: flex;
          gap: 80px;
          justify-content: center;
          margin-bottom: 50px;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-number {
          color: #d4a373;
          font-weight: 600;
          font-size: 32px;
          display: block;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        
        .stat-label {
          font-size: 14px;
          color: rgba(248,250,252,0.5);
        }
        
        .hero-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        
        .btn-primary {
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 18px 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          letter-spacing: -0.01em;
          border-radius: 4px;
        }
        
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,163,115,0.2);
        }
        
        .btn-secondary {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.4);
          padding: 18px 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          letter-spacing: -0.01em;
          border-radius: 4px;
        }
        
        .btn-secondary:hover {
          border-color: #d4a373;
          background: rgba(212,163,115,0.08);
        }
        
        .btn-install {
          margin-top: 28px;
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
        
        /* VALUE PROPS */
        .value {
          background: #161b22;
          border-top: 1px solid rgba(212,163,115,0.1);
          border-bottom: 1px solid rgba(212,163,115,0.1);
        }
        
        .value h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 60px;
        }
        
        .value-item {
          text-align: center;
          padding: 40px 32px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 8px;
          transition: all 0.3s;
        }
        
        .value-item:hover {
          transform: translateY(-4px);
          border-color: rgba(212,163,115,0.3);
          box-shadow: 0 12px 32px rgba(212,163,115,0.1);
        }
        
        .value-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        .value-number {
          font-size: 48px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        
        .value-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(248,250,252,0.4);
          margin-bottom: 20px;
        }
        
        .value-item p {
          font-size: 15px;
          color: rgba(248,250,252,0.7);
          line-height: 1.6;
        }
        
        /* QUOTES */
        .quotes {
          background: #0d1117;
        }
        
        .quotes h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 60px;
        }
        
        .quote {
          border-left: 3px solid rgba(212,163,115,0.3);
          padding: 32px;
          background: rgba(212,163,115,0.02);
          border-radius: 4px;
          transition: all 0.3s;
        }
        
        .quote:hover {
          border-left-color: #d4a373;
          background: rgba(212,163,115,0.05);
          transform: translateX(4px);
        }
        
        .quote p {
          font-size: 15px;
          line-height: 1.7;
          font-style: italic;
          color: rgba(248,250,252,0.75);
          margin-bottom: 20px;
        }
        
        cite {
          font-size: 12px;
          color: #d4a373;
          font-style: normal;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
        }
        
        /* MISSION */
        .mission {
          background: linear-gradient(180deg, #161b22 0%, #0d1117 100%);
          border-top: 1px solid rgba(212,163,115,0.1);
        }
        
        .mission-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        
        .mission-statement {
          font-size: 20px;
          line-height: 1.7;
          color: rgba(248,250,252,0.85);
          margin-bottom: 60px;
        }
        
        .mission-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 40px;
        }
        
        .pillar {
          padding: 32px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.1);
          border-radius: 8px;
        }
        
        .pillar h4 {
          color: #d4a373;
          margin-bottom: 12px;
        }
        
        .pillar p {
          font-size: 15px;
          color: rgba(248,250,252,0.7);
        }
        
        /* PLATFORM */
        .platform-intro {
          text-align: center;
          padding: 120px 24px 80px;
        }
        
        .platform-lead {
          font-size: 20px;
          color: rgba(248,250,252,0.6);
          margin-top: 16px;
          margin-bottom: 48px;
        }
        
        .platform-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 56px;
        }
        
        .platform-tab {
          background: rgba(212,163,115,0.05);
          border: 1px solid rgba(212,163,115,0.2);
          color: rgba(248,250,252,0.7);
          padding: 12px 28px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          font-family: inherit;
          transition: all 0.2s;
          letter-spacing: 0.01em;
        }
        
        .platform-tab:hover {
          background: rgba(212,163,115,0.1);
          border-color: rgba(212,163,115,0.4);
          color: #f8fafc;
        }
        
        .platform-tab.active {
          background: rgba(212,163,115,0.15);
          border-color: #d4a373;
          color: #d4a373;
        }
        
        /* FEATURES WITH SCREENSHOTS - MOBILE FIRST */
        .features {
          padding: 60px 24px 120px;
        }
        
        .feature {
          margin-bottom: 100px;
        }
        
        /* MOBILE: Text first, thumbnails below */
        .feature-info {
          margin-bottom: 32px;
        }
        
        /* FLEXIBLE GRID - adapts to screenshot count */
        .feature-screenshots {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-top: 24px;
        }
        
        /* 4 screenshots = 2x2 grid */
        .feature-screenshots.four-shots {
          grid-template-columns: repeat(2, 1fr);
        }
        
        /* 1 screenshot = centered single */
        .feature-screenshots.single-shot {
          grid-template-columns: 1fr;
          max-width: 400px;
        }
        
        .screenshot {
          width: 100%;
          height: auto;
          display: block;
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 6px;
          transition: all 0.3s;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .screenshot.large {
          max-width: 100%;
        }
        
        .screenshot:hover {
          transform: scale(1.02);
          border-color: rgba(212,163,115,0.4);
          box-shadow: 0 6px 16px rgba(212,163,115,0.15);
          z-index: 10;
        }
        
        /* TABLET: Maintain flexibility */
        @media (min-width: 768px) {
          .feature-screenshots {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
          }
          
          .feature-screenshots.four-shots {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .feature-screenshots.single-shot {
            max-width: 500px;
          }
        }
        
        /* DESKTOP: Side-by-side with proper sizing */
        @media (min-width: 1024px) {
          .feature {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: start;
            margin-bottom: 160px;
          }
          
          .feature-reverse {
            direction: rtl;
          }
          
          .feature-reverse > * {
            direction: ltr;
          }
          
          .feature-info {
            margin-bottom: 0;
          }
          
          .feature-screenshots {
            position: sticky;
            top: 100px;
            margin-top: 0;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
          }
          
          /* Force 4 screenshots into 2x2 */
          .feature-screenshots.four-shots {
            grid-template-columns: repeat(2, 1fr);
          }
          
          /* Single screenshot stays single column */
          .feature-screenshots.single-shot {
            grid-template-columns: 1fr;
            max-width: 100%;
          }
        }
        
        .feature-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #d4a373;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        
        .feature-lead {
          font-size: 18px;
          color: rgba(248,250,252,0.75);
          margin-bottom: 40px;
          line-height: 1.6;
        }
        
        .feature-details {
          margin-bottom: 40px;
        }
        
        .detail-section {
          margin-bottom: 28px;
        }
        
        .detail-section h4 {
          font-size: 15px;
          margin-bottom: 8px;
          color: rgba(248,250,252,0.9);
        }
        
        .detail-section p {
          font-size: 15px;
          color: rgba(248,250,252,0.65);
          line-height: 1.6;
        }
        
        .feature-price {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 40px;
        }
        
        .price-tier {
          padding: 28px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 8px;
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
          background: rgba(34,197,94,0.15);
          color: #22c55e;
          border: 1px solid rgba(34,197,94,0.3);
        }
        
        .price-tier.trial .tier-badge {
          background: rgba(59,130,246,0.15);
          color: #3b82f6;
          border: 1px solid rgba(59,130,246,0.3);
        }
        
        .price-tier.premium .tier-badge {
          background: rgba(212,163,115,0.15);
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.3);
        }
        
        .tier-name {
          font-size: 18px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 16px;
        }
        
        .tier-name span {
          font-size: 14px;
          color: rgba(248,250,252,0.5);
          font-weight: 500;
        }
        
        .price-tier ul {
          list-style: none;
        }
        
        .price-tier li {
          font-size: 14px;
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
        
        /* DAPA */
        .dapa {
          background: #161b22;
          border-top: 1px solid rgba(212,163,115,0.1);
          text-align: center;
        }
        
        .dapa-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 60px auto 0;
        }
        
        .dapa-item {
          padding: 36px 24px;
          border: 1px solid rgba(212,163,115,0.12);
          background: rgba(212,163,115,0.03);
          transition: all 0.3s;
          border-radius: 8px;
        }
        
        .dapa-item:hover {
          border-color: rgba(212,163,115,0.3);
          background: rgba(212,163,115,0.06);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(212,163,115,0.1);
        }
        
        .dapa-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(212,163,115,0.2), rgba(212,163,115,0.1));
          border: 1px solid rgba(212,163,115,0.3);
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          border-radius: 8px;
        }
        
        .dapa-icon.technical { border-color: rgba(239,68,68,0.3); }
        .dapa-icon.ethical { border-color: rgba(34,197,94,0.3); }
        .dapa-icon.emotional { border-color: rgba(236,72,153,0.3); }
        .dapa-icon.velocity { border-color: rgba(245,158,11,0.3); }
        .dapa-icon.commercial { border-color: rgba(34,197,94,0.3); }
        .dapa-icon.leadership { border-color: rgba(139,92,246,0.3); }
        
        .dapa-item h4 {
          font-size: 14px;
          color: rgba(248,250,252,0.8);
          margin-bottom: 8px;
        }
        
        .dapa-item p {
          font-size: 13px;
          color: rgba(248,250,252,0.5);
          line-height: 1.5;
        }
        
        /* GENOME */
        .genome {
          background: #0d1117;
          text-align: center;
        }
        
        .genome-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          margin: 60px auto 40px;
          max-width: 1000px;
        }
        
        .genome-item {
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.12);
          padding: 28px 20px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border-radius: 8px;
          position: relative;
        }
        
        /* Different border colors for Patron vs OnPro */
        .genome-item.patron {
          border-color: rgba(139,92,246,0.15);
        }
        
        .genome-item.onpro {
          border-color: rgba(34,197,94,0.15);
        }
        
        .genome-item:hover, .genome-item.active {
          background: rgba(212,163,115,0.08);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(212,163,115,0.1);
        }
        
        .genome-item.patron:hover, .genome-item.patron.active {
          border-color: rgba(139,92,246,0.4);
          background: rgba(139,92,246,0.05);
        }
        
        .genome-item.onpro:hover, .genome-item.onpro.active {
          border-color: rgba(34,197,94,0.4);
          background: rgba(34,197,94,0.05);
        }
        
        .genome-type-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 3px;
          opacity: 0.6;
        }
        
        .genome-item.patron .genome-type-badge {
          background: rgba(139,92,246,0.2);
          color: rgba(139,92,246,1);
        }
        
        .genome-item.onpro .genome-type-badge {
          background: rgba(34,197,94,0.2);
          color: rgba(34,197,94,1);
        }
        
        .genome-emoji {
          font-size: 32px;
        }
        
        .genome-name {
          font-size: 12px;
          color: rgba(248,250,252,0.75);
          font-weight: 500;
        }
        
        .genome-detail {
          background: rgba(212,163,115,0.06);
          border: 1px solid rgba(212,163,115,0.25);
          padding: 56px;
          max-width: 750px;
          margin: 0 auto;
          border-radius: 12px;
        }
        
        .genome-detail-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-bottom: 28px;
        }
        
        .genome-detail-emoji {
          font-size: 48px;
        }
        
        .genome-detail h3 {
          font-size: 30px;
        }
        
        .genome-detail p {
          margin-bottom: 32px;
          text-align: center;
          font-size: 17px;
          line-height: 1.7;
        }
        
        .btn-close {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.4);
          padding: 12px 32px;
          font-size: 14px;
          cursor: pointer;
          font-family: inherit;
          border-radius: 6px;
          transition: all 0.2s;
        }
        
        .btn-close:hover {
          background: rgba(212,163,115,0.08);
          border-color: #d4a373;
        }
        
        /* VISION */
        .vision {
          padding: 120px 24px;
        }
        
        .vision h1 {
          text-align: center;
          margin-bottom: 16px;
        }
        
        .vision-lead {
          text-align: center;
          font-size: 24px;
          color: #d4a373;
          margin-bottom: 100px;
          font-weight: 500;
          font-style: italic;
        }
        
        .vision-content {
          max-width: 850px;
          margin: 0 auto;
        }
        
        .vision-section {
          margin-bottom: 80px;
        }
        
        .vision-section h3 {
          color: #d4a373;
          margin-bottom: 32px;
          font-size: 34px;
        }
        
        .vision-section p {
          margin-bottom: 24px;
          font-size: 18px;
          line-height: 1.8;
        }
        
        .vision-emphasis {
          color: #f8fafc;
          font-weight: 500;
          font-size: 22px;
          line-height: 1.6;
          margin: 32px 0;
          padding-left: 24px;
          border-left: 3px solid #d4a373;
        }
        
        .vision-statement {
          font-size: 24px;
          color: #d4a373;
          font-weight: 600;
          line-height: 1.6;
          margin: 32px 0;
          text-align: center;
        }
        
        .vision-highlight {
          color: #d4a373;
          font-weight: 600;
          padding: 32px;
          border-left: 3px solid #d4a373;
          background: rgba(212,163,115,0.06);
          border-radius: 4px;
          font-size: 20px;
          line-height: 1.7;
          margin: 32px 0;
        }
        
        .vision-list {
          list-style: none;
          margin: 32px 0;
        }
        
        .vision-list li {
          font-size: 17px;
          line-height: 1.9;
          color: rgba(248,250,252,0.8);
          padding-left: 32px;
          position: relative;
          margin-bottom: 24px;
        }
        
        .vision-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #d4a373;
          font-size: 20px;
        }
        
        .vision-list li strong {
          color: #f8fafc;
          font-weight: 600;
        }
        
        .vision-cta {
          text-align: center;
          padding: 72px 56px;
          border: 1px solid rgba(212,163,115,0.3);
          background: rgba(212,163,115,0.05);
          margin-top: 100px;
          border-radius: 12px;
        }
        
        .vision-cta h3 {
          margin-bottom: 24px;
          font-size: 36px;
        }
        
        .vision-cta p {
          margin-bottom: 16px;
          font-size: 18px;
        }
        
        .cta-emphasis {
          color: #d4a373;
          font-weight: 600;
          font-size: 20px;
          margin: 32px 0 40px 0;
        }
        
        .cta-note {
          font-size: 15px;
          color: rgba(248,250,252,0.6);
          margin-top: 24px;
        }
        
        /* WAITLIST */
        .waitlist {
          background: #161b22;
          border-top: 1px solid rgba(212,163,115,0.1);
          text-align: center;
        }
        
        .waitlist h2 {
          margin-bottom: 16px;
        }
        
        .waitlist-subtitle {
          font-size: 17px;
          color: #d4a373;
          margin-bottom: 56px;
        }
        
        .waitlist-form {
          max-width: 650px;
          margin: 0 auto;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }
        
        input, select {
          width: 100%;
          padding: 18px 20px;
          background: rgba(212,163,115,0.04);
          border: 1px solid rgba(212,163,115,0.12);
          color: #f8fafc;
          font-family: inherit;
          font-size: 15px;
          transition: all 0.2s;
          border-radius: 6px;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #d4a373;
          background: rgba(212,163,115,0.06);
        }
        
        .form-disclaimer {
          font-size: 12px;
          color: rgba(248,250,252,0.5);
          margin: 28px 0;
          line-height: 1.6;
        }
        
        .btn-submit {
          width: 100%;
          background: #d4a373;
          color: #0d1117;
          border: none;
          padding: 20px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
          border-radius: 6px;
        }
        
        .btn-submit:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,163,115,0.2);
        }
        
        .waitlist-success {
          padding: 80px 56px;
          border: 1px solid rgba(34,220,108,0.25);
          background: rgba(34,220,108,0.04);
          border-radius: 12px;
          max-width: 650px;
          margin: 0 auto;
        }
        
        .success-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }
        
        .waitlist-success h2 {
          color: #22c55e;
          margin-bottom: 20px;
        }
        
        .waitlist-success p {
          margin-bottom: 12px;
        }
        
        .success-note {
          color: #d4a373;
          font-weight: 600;
          font-size: 18px;
          margin-top: 24px;
        }
        
        /* FOOTER */
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
        
        .footer-col a:hover {
          color: #d4a373;
        }
        
        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid rgba(212,163,115,0.1);
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(248,250,252,0.35);
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          h1 { font-size: 40px; }
          .hero h1 { font-size: 56px; }
          .hero-stats { flex-direction: column; gap: 32px; }
          .value-grid, .quotes-grid, .dapa-grid, .genome-grid, .mission-pillars { grid-template-columns: 1fr; }
          .feature-price { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; gap: 40px; }
          .footer-links { flex-direction: column; gap: 40px; }
          .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
        }
        
        /* LIGHTBOX MODAL */
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
          width: auto;
          height: auto;
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
          line-height: 1;
          transition: color 0.2s;
        }
        
        .lightbox-close:hover {
          color: #d4a373;
        }
      `}</style>
    </>
  );
}
