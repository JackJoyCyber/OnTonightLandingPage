// pages/index.js - OnTonight Landing Page
// UPDATED VISION SECTION: 1,050 words with expanded bartending experience
// "Hi, I'm Jack Joy, Founder of OnTonight."

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
              <button className={activeTab === 'founder' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('founder')}>The Vision</button>
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

        {/* PLATFORM TAB - Keep your existing Platform content here */}
        {activeTab === 'platform' && (
          <div className="tab-content">
            <section className="platform-intro">
              <div className="container">
                <h1>Professional Infrastructure</h1>
                <p className="platform-lead">One platform. Three solutions. Complete ecosystem.</p>
                {/* Your existing Platform tab content */}
              </div>
            </section>
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
                  <a href="/contact">Contact</a>
                  <a href="/careers">Careers</a>
                </div>
                <div className="footer-col">
                  <h5>Connect</h5>
                  <a href="/support">Support</a>
                  <a href="/media">Media</a>
                  <a href="/partner">Partner</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 OnTonight LLC. All rights reserved.</p>
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
        
        /* NAV */
        .nav {
          background: rgba(13,17,23,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(212,163,115,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
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
          background: none;
          border: none;
          color: rgba(248,250,252,0.7);
          padding: 8px 16px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          font-family: inherit;
        }
        
        .nav-tab:hover {
          background: rgba(212,163,115,0.08);
          color: #f8fafc;
        }
        
        .nav-tab.active {
          background: rgba(212,163,115,0.15);
          color: #d4a373;
        }
        
        .nav-cta {
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0a0a0f;
          padding: 8px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-left: 16px;
          transition: transform 0.2s;
        }
        
        .nav-cta:hover {
          transform: translateY(-1px);
        }
        
        /* HERO */
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          text-align: center;
          padding: 120px 24px 80px;
        }
        
        .hero-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(212,163,115,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .hero-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.2);
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          color: #d4a373;
          margin-bottom: 32px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .hero h1 {
          font-size: 80px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #d4a373 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: 28px;
          color: #d4a373;
          font-weight: 600;
          margin-bottom: 64px;
        }
        
        .hero-stats {
          display: flex;
          gap: 80px;
          justify-content: center;
          margin-bottom: 48px;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-number {
          display: block;
          font-size: 48px;
          font-weight: 800;
          color: #d4a373;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 14px;
          color: rgba(248,250,252,0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .hero-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 32px;
        }
        
        .btn-primary, .btn-secondary {
          padding: 16px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-family: inherit;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0a0a0f;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(212,163,115,0.3);
        }
        
        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(212,163,115,0.3);
          color: #d4a373;
        }
        
        .btn-secondary:hover {
          background: rgba(212,163,115,0.08);
        }
        
        .btn-install {
          background: rgba(212,163,115,0.1);
          border: 1px solid rgba(212,163,115,0.2);
          color: #d4a373;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 16px;
        }
        
        /* VALUE SECTION */
        .value {
          padding: 120px 24px;
          background: #161b22;
        }
        
        .value h2 {
          text-align: center;
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .section-subtitle {
          text-align: center;
          font-size: 18px;
          color: rgba(248,250,252,0.7);
          margin-bottom: 64px;
        }
        
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .value-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 40px 32px;
          text-align: center;
        }
        
        .value-icon {
          font-size: 48px;
          margin-bottom: 24px;
        }
        
        .value-number {
          font-size: 56px;
          font-weight: 800;
          color: #d4a373;
          margin-bottom: 16px;
        }
        
        .value-label {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .value-item p {
          font-size: 15px;
          color: rgba(248,250,252,0.7);
          line-height: 1.6;
        }
        
        /* QUOTES SECTION */
        .quotes {
          padding: 120px 24px;
          background: #0d1117;
        }
        
        .quotes h2 {
          text-align: center;
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .quotes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .quote {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px;
        }
        
        .quote p {
          font-size: 16px;
          font-style: italic;
          line-height: 1.7;
          margin-bottom: 24px;
          color: rgba(248,250,252,0.85);
        }
        
        cite {
          font-size: 14px;
          color: rgba(212,163,115,0.8);
          font-style: normal;
          font-weight: 500;
        }
        
        /* MISSION SECTION */
        .mission {
          padding: 120px 24px;
          background: #161b22;
        }
        
        .mission-content {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        
        .mission h2 {
          font-size: 48px;
          margin-bottom: 32px;
        }
        
        .mission-statement {
          font-size: 20px;
          line-height: 1.7;
          color: rgba(248,250,252,0.85);
          margin-bottom: 64px;
        }
        
        .mission-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        
        .pillar {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 32px;
        }
        
        .pillar h4 {
          font-size: 20px;
          color: #d4a373;
          margin-bottom: 16px;
        }
        
        .pillar p {
          font-size: 15px;
          color: rgba(248,250,252,0.7);
          line-height: 1.6;
        }
        
        /* VISION SECTION - NEW STYLES */
        .vision {
          padding: 120px 24px;
          min-height: 80vh;
        }
        
        .vision h1 {
          text-align: center;
          font-size: 56px;
          margin-bottom: 16px;
        }
        
        .vision-lead {
          text-align: center;
          font-size: 20px;
          color: rgba(248,250,252,0.7);
          margin-bottom: 80px;
        }
        
        .vision-content {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .founder-intro {
          display: flex;
          gap: 48px;
          align-items: center;
          margin-bottom: 80px;
          padding: 48px;
          background: rgba(212,163,115,0.03);
          border: 1px solid rgba(212,163,115,0.15);
          border-radius: 12px;
        }
        
        .founder-photo-placeholder {
          flex-shrink: 0;
        }
        
        .photo-placeholder-box {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 2px solid #d4a373;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(212,163,115,0.05);
          color: rgba(212,163,115,0.6);
        }
        
        .founder-text h2 {
          font-size: 32px;
          color: #d4a373;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        
        .founder-tagline {
          font-size: 20px;
          color: rgba(248,250,252,0.8);
          font-style: italic;
          line-height: 1.5;
        }
        
        .vision-section {
          margin-bottom: 72px;
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
          color: rgba(248,250,252,0.85);
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
          padding: 120px 24px;
        }
        
        .waitlist h2 {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .waitlist-subtitle {
          font-size: 18px;
          color: #d4a373;
          margin-bottom: 48px;
        }
        
        .waitlist-form {
          max-width: 700px;
          margin: 0 auto;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }
        
        input, select {
          padding: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #f8fafc;
          font-size: 15px;
          font-family: inherit;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #d4a373;
        }
        
        .form-disclaimer {
          font-size: 13px;
          color: rgba(248,250,252,0.6);
          margin-bottom: 24px;
        }
        
        .btn-submit {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0a0a0f;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s;
          font-family: inherit;
        }
        
        .btn-submit:hover {
          transform: translateY(-2px);
        }
        
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .waitlist-success {
          padding: 80px 40px;
        }
        
        .success-icon {
          font-size: 72px;
          margin-bottom: 32px;
        }
        
        .waitlist-success h2 {
          margin-bottom: 24px;
        }
        
        .waitlist-success p {
          font-size: 18px;
          color: rgba(248,250,252,0.8);
          margin-bottom: 16px;
        }
        
        .success-note {
          color: #d4a373;
          font-weight: 600;
        }
        
        /* FOOTER */
        .footer {
          background: #0d1117;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 80px 24px 40px;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 48px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .footer-brand .footer-logo {
          font-size: 24px;
          font-weight: 700;
          color: #d4a373;
          margin-bottom: 12px;
        }
        
        .footer-tagline {
          font-size: 14px;
          color: rgba(248,250,252,0.7);
          margin-bottom: 8px;
        }
        
        .footer-location {
          font-size: 13px;
          color: rgba(248,250,252,0.5);
        }
        
        .footer-links {
          display: flex;
          gap: 64px;
        }
        
        .footer-col h5 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #d4a373;
          margin-bottom: 16px;
        }
        
        .footer-col a {
          display: block;
          color: rgba(248,250,252,0.7);
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 12px;
          transition: color 0.2s;
        }
        
        .footer-col a:hover {
          color: #d4a373;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.08);
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-bottom p {
          font-size: 14px;
          color: rgba(248,250,252,0.5);
          margin-bottom: 8px;
        }
        
        /* LIGHTBOX */
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
        
        /* MOBILE RESPONSIVE */
        @media (max-width: 768px) {
          .nav-tabs {
            display: none;
          }
          
          .hero h1 {
            font-size: 48px;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 32px;
          }
          
          .hero-ctas {
            flex-direction: column;
          }
          
          .value-grid,
          .quotes-grid,
          .mission-pillars {
            grid-template-columns: 1fr;
          }
          
          .founder-intro {
            flex-direction: column;
            text-align: center;
            padding: 32px 24px;
            gap: 32px;
          }
          
          .founder-text h2 {
            font-size: 24px;
          }
          
          .founder-tagline {
            font-size: 18px;
          }
          
          .photo-placeholder-box {
            width: 150px;
            height: 150px;
          }
          
          .vision-section h3 {
            font-size: 28px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 40px;
          }
          
          .footer-links {
            flex-direction: column;
            gap: 32px;
          }
        }
      `}</style>
    </>
  );
}
