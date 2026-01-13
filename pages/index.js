// pages/index.js - OnTonight Landing Page (Mission-Focused Redesign)
import { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', userType: '', city: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <meta name="description" content="Build your career. Take your customers with you. OnTonight is where regulars are made." />
      </Head>

      <div className="page">
        {/* HERO */}
        <section className="hero">
          <div className="hero-glow"></div>
          <div className="container">
            <h1>Your Night. Your People.</h1>
            <p className="tagline">Where Regulars Are Made.</p>
            <p className="subtitle">
              Hospitality professionals build portable careers.<br />
              Customers follow the people they love.<br />
              Venues attract and retain verified talent.
            </p>
            
            <div className="ctas">
              <a href="#waitlist" className="cta cta-onpro">
                <div className="cta-shimmer"></div>
                <div className="cta-content">
                  <div className="cta-label">ONPRO</div>
                  <strong>Build Career</strong>
                  <div className="cta-sparkle">✨</div>
                </div>
              </a>
              <a href="#waitlist" className="cta cta-patron">
                <div className="cta-shimmer"></div>
                <div className="cta-content">
                  <div className="cta-label">PATRON</div>
                  <strong>Find People</strong>
                  <div className="cta-sparkle">✨</div>
                </div>
              </a>
              <a href="#waitlist" className="cta cta-venue">
                <div className="cta-shimmer"></div>
                <div className="cta-content">
                  <div className="cta-label">VENUE</div>
                  <strong>Grow Team</strong>
                  <div className="cta-sparkle">✨</div>
                </div>
              </a>
            </div>
            
            <div className="promo">🎉 First 2,000 signups get their FIRST YEAR FREE 🎉</div>
          </div>
        </section>

        {/* MISSION */}
        <section className="mission">
          <div className="container">
            <h2>Elevating Hospitality. Building Careers. Creating Connections.</h2>
            <div className="mission-content">
              <p className="mission-lead">
                The hospitality industry loses $66.8 billion annually to turnover. When talented professionals change venues, they lose everything they've built—their customer relationships, their reputation, their momentum.
              </p>
              <p className="mission-text">
                <strong>We're changing that.</strong>
              </p>
              <p className="mission-text">
                OnTonight is building the professional infrastructure the hospitality industry deserves. We believe bartenders, servers, and sommeliers should have the same career portability as lawyers, engineers, and executives. We believe customers should be able to follow the people who make their nights special. We believe venues should compete on culture and opportunity, not just wages.
              </p>
              <p className="mission-text">
                This isn't just an app. It's a movement to professionalize hospitality, to honor the skill and artistry of the people who create unforgettable experiences, and to build a future where talent is recognized, relationships are portable, and regulars are made—not lost.
              </p>
              <p className="mission-cta">
                <strong>Join us in raising the bar for an entire industry.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="problem">
          <div className="container">
            <h2>The Crisis</h2>
            <div className="stats">
              <div className="stat">
                <div className="stat-num">73%</div>
                <div className="stat-label">Annual Turnover Rate</div>
                <div className="stat-source">National Restaurant Association, 2024</div>
                <p>When hospitality workers change venues, they lose their customer relationships. Every. Single. Time.</p>
              </div>
              <div className="stat">
                <div className="stat-num">$5,864</div>
                <div className="stat-label">Cost Per New Hire</div>
                <div className="stat-source">Cornell University</div>
                <p>Recruiting, training, and productivity loss. Multiply by 73% turnover. The math is devastating.</p>
              </div>
              <div className="stat">
                <div className="stat-num">"Where?"</div>
                <div className="stat-label">Customer Experience</div>
                <div className="stat-source">Industry Survey, 2024</div>
                <p>Your favorite bartender left. No forwarding address. No way to follow. The connection is gone.</p>
              </div>
            </div>
            <p className="solution">OnTonight solves this for everyone.</p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how">
          <div className="container">
            <h2>One Platform. Three Solutions.</h2>
            <div className="benefits">
              <div className="benefit benefit-celebration">
                <div className="benefit-confetti">
                  <span className="confetti">🎊</span>
                  <span className="confetti">✨</span>
                  <span className="confetti">🌟</span>
                </div>
                <div className="benefit-screenshot">
                  <div className="screenshot-frame">
                    <div className="screenshot-placeholder onpro-screen">
                      <div className="screen-header">
                        <div className="screen-avatar"></div>
                        <div className="screen-text">
                          <div className="line"></div>
                          <div className="line short"></div>
                        </div>
                      </div>
                      <div className="screen-badge">VERIFIED</div>
                      <div className="screen-stats">
                        <div className="stat-bar"></div>
                        <div className="stat-bar"></div>
                        <div className="stat-bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="benefit-label">FOR ONPROS</div>
                <h4>Your Career, Portable</h4>
                <ul>
                  <li>Professional profile that follows you</li>
                  <li>Skills verified through DAPA</li>
                  <li>Customers follow YOU, not venues</li>
                  <li>Build reputation once, keep forever</li>
                </ul>
                <div className="price price-free">
                  <div className="price-badge">ALWAYS FREE</div>
                  <strong>Free Account</strong>
                  <p>Basic profile · 1 DAPA assessment · Unlimited followers</p>
                  <div className="price-premium">
                    <small>Premium $10/month: Unlimited assessments, analytics, priority placement</small>
                  </div>
                </div>
                <a href="#waitlist" className="btn btn-primary">Join Waitlist</a>
              </div>
              
              <div className="benefit benefit-celebration">
                <div className="benefit-confetti">
                  <span className="confetti">🎊</span>
                  <span className="confetti">✨</span>
                  <span className="confetti">🌟</span>
                </div>
                <div className="benefit-screenshot">
                  <div className="screenshot-frame">
                    <div className="screenshot-placeholder patron-screen">
                      <div className="screen-search"></div>
                      <div className="screen-cards">
                        <div className="card-item"></div>
                        <div className="card-item"></div>
                        <div className="card-item"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="benefit-label">FOR PATRONS</div>
                <h4>Find Your People</h4>
                <ul>
                  <li>Follow favorite bartenders & servers</li>
                  <li>See who's working tonight</li>
                  <li>Never lose touch when they move</li>
                  <li>Discover verified professionals</li>
                </ul>
                <div className="price">
                  <strong>FREE</strong>
                  <p>Follow OnPros · See schedules · Basic genome</p>
                  <div className="price-premium">
                    <small>Premium $5/month: Full OnScene Genome, advanced matching</small>
                  </div>
                </div>
                <a href="#waitlist" className="btn btn-primary">Join Waitlist</a>
              </div>
              
              <div className="benefit benefit-celebration">
                <div className="benefit-confetti">
                  <span className="confetti">🎊</span>
                  <span className="confetti">✨</span>
                  <span className="confetti">🌟</span>
                </div>
                <div className="benefit-screenshot">
                  <div className="screenshot-frame">
                    <div className="screenshot-placeholder venue-screen">
                      <div className="screen-chart">
                        <div className="chart-bar" style={{height: '60%'}}></div>
                        <div className="chart-bar" style={{height: '80%'}}></div>
                        <div className="chart-bar" style={{height: '45%'}}></div>
                        <div className="chart-bar" style={{height: '90%'}}></div>
                      </div>
                      <div className="screen-metrics">
                        <div className="metric"></div>
                        <div className="metric"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="benefit-label">FOR VENUES</div>
                <h4>Attract & Retain Talent</h4>
                <ul>
                  <li>Recruit DAPA-verified professionals</li>
                  <li>Showcase your team to customers</li>
                  <li>Reduce costly turnover</li>
                  <li>Analytics: Which staff drive traffic?</li>
                </ul>
                <div className="price">
                  <strong>From $50</strong><span>/month</span>
                  <p>Staff showcase · Recruiting · Analytics</p>
                  <div className="price-premium">
                    <small>3-month FREE trial · No credit card required</small>
                  </div>
                </div>
                <a href="#waitlist" className="btn btn-primary">Join Waitlist</a>
              </div>
            </div>
          </div>
        </section>

        {/* DAPA */}
        <section className="dapa">
          <div className="container">
            <h2>Skills Verified. Not Self-Reported.</h2>
            <p className="sub">The DAPA assessment tests real hospitality knowledge across 6 professional dimensions.</p>
            <div className="axes">
              <div className="axis">
                <div className="axis-icon">T</div>
                <strong>Technical</strong>
                <p>Knowledge & Procedures</p>
              </div>
              <div className="axis">
                <div className="axis-icon">E</div>
                <strong>Ethical</strong>
                <p>Integrity & Compliance</p>
              </div>
              <div className="axis">
                <div className="axis-icon">EQ</div>
                <strong>Emotional</strong>
                <p>Empathy & Relationships</p>
              </div>
              <div className="axis">
                <div className="axis-icon">V</div>
                <strong>Velocity</strong>
                <p>Speed & Crisis Management</p>
              </div>
              <div className="axis">
                <div className="axis-icon">C</div>
                <strong>Commercial</strong>
                <p>Sales & Revenue</p>
              </div>
              <div className="axis">
                <div className="axis-icon">L</div>
                <strong>Leadership</strong>
                <p>Team Dynamics</p>
              </div>
            </div>
            <p className="info">1,600+ questions · 9 categories · Industry-verified</p>
          </div>
        </section>

        {/* GENOME */}
        <section className="genome">
          <div className="container">
            <h2>Discover Your Hospitality Personality</h2>
            <p className="sub">45 questions reveal your OnScene Genome™ from 12 unique archetypes.</p>
            <div className="archetypes">
              <div className="archetype">🌐 The Connector</div>
              <div className="archetype">🏠 The Regular</div>
              <div className="archetype">🗺️ The Adventurer</div>
              <div className="archetype">🎉 The Host</div>
              <div className="archetype">🍷 The Connoisseur</div>
              <div className="archetype">🔍 The Explorer</div>
              <div className="archetype">🎊 The Celebrator</div>
              <div className="archetype">😌 The Relaxer</div>
              <div className="archetype">💪 The Supporter</div>
              <div className="archetype">🧐 The Critic</div>
              <div className="archetype">📖 The Storyteller</div>
              <div className="archetype">📚 The Student</div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials">
          <div className="container">
            <h2>The Cost of Constant Turnover</h2>
            <p className="sub">Real voices from the hospitality industry</p>
            <div className="quotes">
              <div className="quote">
                <p>"We spend $60,000 a year just replacing bartenders. By the time they're really good, they leave. And when they go, their regulars stop coming."</p>
                <cite>Anonymous GM · Cornell Hospitality Quarterly 2023</cite>
              </div>
              <div className="quote">
                <p>"I've changed venues three times in five years. Every time, I lose my entire customer base and start over. There has to be a better way."</p>
                <cite>Survey Response · National Bartenders Association 2024</cite>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNUP */}
        <section className="signup" id="waitlist">
          <div className="container">
            {!submitted ? (
              <>
                <h2>Join the Movement</h2>
                <p>Be first to know when OnTonight launches in your city.</p>
                <p className="early-access-note">🎉 First 2,000 signups get their FIRST YEAR FREE 🎉</p>
                
                <form onSubmit={handleSubmit}>
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
                  
                  <div className="age-disclaimer">
                    By signing up, you confirm that you are at least 18 years of age and agree to receive email communications from OnTonight.
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                    {loading ? 'Joining Waitlist...' : 'Get Early Access'}
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <h2>🎉 You're on the list! 🎉</h2>
                <p>Check your email for next steps.</p>
                <p className="success-note">First 2,000 signups get their first year FREE!</p>
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer>
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
                  <a href="mailto:AdminJoy@On-Tonight.com">Contact</a>
                  <a href="/privacy">Privacy Policy</a>
                  <a href="/terms">Terms & Conditions</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 OnTonight LLC. All rights reserved.</p>
              <p className="footer-age">You must be 18 or older to use OnTonight.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .page { 
          background: #0a0f14; 
          color: #f8fafc; 
          font-family: 'Urbanist', -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: -0.01em;
        }
        
        .container { 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 24px; 
        }
        
        h1 { 
          font-size: 72px; 
          font-weight: 700; 
          line-height: 1; 
          margin-bottom: 24px; 
          background: linear-gradient(135deg, #fff 0%, #d4a373 100%); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.03em;
        }
        
        h2 { 
          font-size: 48px; 
          font-weight: 700; 
          text-align: center; 
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        
        section { 
          padding: 120px 24px; 
        }
        
        /* HERO */
        .hero { 
          text-align: center; 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          background: linear-gradient(180deg, #0a0f14 0%, #0d1420 50%, #0a0f14 100%);
          padding: 80px 24px;
          position: relative;
          overflow: hidden;
        }
        
        .hero-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212,163,115,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .tagline { 
          font-size: 24px; 
          color: #d4a373; 
          font-weight: 600; 
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        
        .subtitle { 
          font-size: 18px; 
          color: rgba(255,255,255,0.7); 
          margin-bottom: 64px;
          line-height: 1.6;
          font-weight: 400;
        }
        
        .ctas { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 16px; 
          max-width: 900px; 
          margin: 0 auto 48px; 
        }
        
        .cta { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.08); 
          padding: 32px 24px; 
          text-decoration: none; 
          color: inherit; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .cta-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212,163,115,0.2), transparent);
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        
        .cta:hover { 
          background: rgba(255,255,255,0.04); 
          border-color: rgba(212,163,115,0.4);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(212,163,115,0.2);
        }
        
        .cta-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
        }
        
        .cta strong { 
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        
        .cta-sparkle {
          font-size: 20px;
          animation: sparkle 2s infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        .promo { 
          background: linear-gradient(135deg, rgba(212,163,115,0.15) 0%, rgba(212,163,115,0.05) 100%); 
          border: 1px solid rgba(212,163,115,0.3); 
          padding: 16px 32px; 
          display: inline-block; 
          color: #d4a373; 
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 16px rgba(212,163,115,0.2);
        }
        
        /* MISSION */
        .mission {
          background: #0d1420;
        }
        
        .mission-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        
        .mission-lead {
          font-size: 24px;
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          margin-bottom: 32px;
          font-weight: 500;
        }
        
        .mission-text {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.7);
          margin-bottom: 24px;
        }
        
        .mission-text strong {
          color: #d4a373;
          font-weight: 700;
        }
        
        .mission-cta {
          font-size: 20px;
          color: #d4a373;
          font-weight: 700;
          margin-top: 48px;
        }
        
        /* PROBLEM */
        .problem { 
          background: #0a0f14; 
        }
        
        .stats { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 24px; 
          margin-bottom: 64px; 
        }
        
        .stat { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.08); 
          padding: 48px 32px; 
          text-align: center; 
        }
        
        .stat-num { 
          font-size: 56px; 
          font-weight: 700; 
          color: #d4a373; 
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        
        .stat-label { 
          font-size: 16px; 
          font-weight: 600; 
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }
        
        .stat-source { 
          font-size: 11px; 
          color: rgba(255,255,255,0.4); 
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .stat p { 
          font-size: 14px; 
          color: rgba(255,255,255,0.6); 
          line-height: 1.5;
        }
        
        .solution { 
          text-align: center; 
          font-size: 24px; 
          font-weight: 600; 
          color: #d4a373;
          letter-spacing: -0.01em;
        }
        
        /* HOW IT WORKS */
        .how { 
          background: #0d1420; 
        }
        
        .sub { 
          text-align: center; 
          color: rgba(255,255,255,0.6); 
          margin-bottom: 64px;
          font-size: 16px;
          font-weight: 400;
        }
        
        .benefits { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 24px; 
        }
        
        .benefit { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.08); 
          padding: 32px; 
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        
        .benefit-celebration {
          border-color: rgba(212,163,115,0.2);
        }
        
        .benefit-confetti {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .confetti {
          position: absolute;
          font-size: 24px;
          animation: float 4s infinite ease-in-out;
          opacity: 0.6;
        }
        
        .confetti:nth-child(1) {
          left: 10%;
          top: -20px;
          animation-delay: 0s;
        }
        
        .confetti:nth-child(2) {
          right: 10%;
          top: -20px;
          animation-delay: 1s;
        }
        
        .confetti:nth-child(3) {
          left: 50%;
          top: -20px;
          animation-delay: 2s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(400px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .benefit-screenshot {
          margin: -32px -32px 32px -32px;
          background: linear-gradient(180deg, rgba(212,163,115,0.05) 0%, transparent 100%);
          padding: 32px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        
        .screenshot-frame {
          background: #0a0f14;
          border: 1px solid rgba(255,255,255,0.1);
          aspect-ratio: 9/16;
          overflow: hidden;
          position: relative;
        }
        
        .screenshot-placeholder {
          width: 100%;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        /* OnPro Screen */
        .onpro-screen .screen-header {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .screen-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          border-radius: 50%;
        }
        
        .screen-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .line {
          height: 12px;
          background: rgba(255,255,255,0.15);
          border-radius: 2px;
        }
        
        .line.short {
          width: 60%;
        }
        
        .screen-badge {
          background: rgba(61,220,108,0.15);
          color: #3ddc6c;
          padding: 6px 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          width: fit-content;
          border: 1px solid rgba(61,220,108,0.3);
        }
        
        .screen-stats {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
        }
        
        .stat-bar {
          height: 24px;
          background: linear-gradient(90deg, rgba(212,163,115,0.3) 0%, transparent 100%);
          border: 1px solid rgba(212,163,115,0.2);
        }
        
        /* Patron Screen */
        .patron-screen .screen-search {
          height: 40px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 16px;
        }
        
        .screen-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .card-item {
          height: 60px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        /* Venue Screen */
        .venue-screen .screen-chart {
          display: flex;
          gap: 12px;
          align-items: flex-end;
          height: 120px;
          margin-bottom: 16px;
        }
        
        .chart-bar {
          flex: 1;
          background: linear-gradient(180deg, #d4a373 0%, rgba(212,163,115,0.3) 100%);
          border: 1px solid rgba(212,163,115,0.3);
        }
        
        .screen-metrics {
          display: flex;
          gap: 12px;
        }
        
        .metric {
          flex: 1;
          height: 48px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        .benefit-label { 
          font-size: 11px; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          color: rgba(255,255,255,0.5); 
          margin-bottom: 12px;
          font-weight: 700;
        }
        
        .benefit h4 { 
          font-size: 24px; 
          margin-bottom: 24px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        
        .benefit ul { 
          list-style: none; 
          margin-bottom: 32px;
          flex: 1;
        }
        
        .benefit li { 
          font-size: 14px; 
          line-height: 1.8; 
          color: rgba(255,255,255,0.7);
          padding-left: 20px;
          position: relative;
        }
        
        .benefit li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 4px;
          height: 4px;
          background: #d4a373;
        }
        
        .price { 
          border: 1px solid rgba(212,163,115,0.15);
          padding: 20px; 
          margin-bottom: 24px;
          text-align: center;
          background: rgba(212,163,115,0.03);
        }
        
        .price-free {
          background: linear-gradient(135deg, rgba(61,220,108,0.1) 0%, rgba(212,163,115,0.05) 100%);
          border-color: rgba(61,220,108,0.3);
        }
        
        .price-badge {
          display: inline-block;
          background: #3ddc6c;
          color: #0a0f14;
          padding: 4px 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }
        
        .price strong { 
          font-size: 32px; 
          color: #d4a373;
          font-weight: 700;
          letter-spacing: -0.02em;
          display: block;
          margin-bottom: 8px;
        }
        
        .price span {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          font-weight: 400;
        }
        
        .price p {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 12px;
        }
        
        .price-premium {
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        
        .price-premium small {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          line-height: 1.4;
        }
        
        .btn { 
          display: inline-block; 
          padding: 14px 32px; 
          font-weight: 600; 
          text-decoration: none; 
          border: none; 
          cursor: pointer; 
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 14px;
          letter-spacing: 0.01em;
          text-align: center;
          width: 100%;
        }
        
        .btn-primary { 
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%); 
          color: #0a0f14;
          border: 1px solid transparent;
        }
        
        .btn-primary:hover { 
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(212,163,115,0.4);
        }
        
        .btn-large {
          padding: 18px 48px;
          font-size: 16px;
        }
        
        /* DAPA */
        .dapa { 
          background: #0a0f14; 
        }
        
        .axes { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 20px; 
          margin-bottom: 48px; 
        }
        
        .axis { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.08); 
          padding: 32px 24px; 
          text-align: center;
          transition: all 0.2s;
        }
        
        .axis:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(212,163,115,0.2);
        }
        
        .axis-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, rgba(212,163,115,0.2) 0%, rgba(212,163,115,0.05) 100%);
          border: 1px solid rgba(212,163,115,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: #d4a373;
          letter-spacing: -0.01em;
        }
        
        .axis strong { 
          display: block; 
          font-size: 16px; 
          margin-bottom: 8px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        
        .axis p { 
          font-size: 13px; 
          color: rgba(255,255,255,0.5);
          line-height: 1.4;
        }
        
        .info { 
          text-align: center; 
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }
        
        /* GENOME */
        .genome { 
          background: #0d1420; 
        }
        
        .archetypes { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: 12px; 
        }
        
        .archetype { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.08); 
          padding: 20px 16px; 
          text-align: center; 
          font-size: 13px; 
          font-weight: 600;
          transition: all 0.2s;
          letter-spacing: -0.01em;
        }
        
        .archetype:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(212,163,115,0.2);
          color: #d4a373;
          transform: scale(1.05);
        }
        
        /* TESTIMONIALS */
        .testimonials { 
          background: #0a0f14; 
        }
        
        .quotes { 
          display: grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap: 24px; 
        }
        
        .quote { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 2px solid #d4a373;
          padding: 32px; 
        }
        
        .quote p { 
          font-size: 16px; 
          font-style: italic; 
          line-height: 1.6; 
          margin-bottom: 20px;
          color: rgba(255,255,255,0.8);
        }
        
        cite { 
          font-size: 12px; 
          color: rgba(255,255,255,0.5); 
          font-style: normal;
          letter-spacing: 0.02em;
        }
        
        /* SIGNUP */
        .signup { 
          background: #0d1420; 
          text-align: center; 
        }
        
        .signup p { 
          color: rgba(255,255,255,0.6); 
          margin-bottom: 24px;
          font-size: 16px;
        }
        
        .early-access-note {
          color: #d4a373;
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 48px;
        }
        
        form { 
          max-width: 600px; 
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
          padding: 16px; 
          background: rgba(255,255,255,0.03); 
          border: 1px solid rgba(255,255,255,0.1); 
          color: #fff; 
          font-family: inherit; 
          font-size: 14px;
          transition: all 0.2s;
        }
        
        input:focus, select:focus { 
          outline: none; 
          border-color: #d4a373;
          background: rgba(255,255,255,0.05);
        }
        
        .age-disclaimer {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin: 24px 0;
          line-height: 1.6;
        }
        
        .success-message {
          max-width: 600px;
          margin: 0 auto;
          padding: 64px 32px;
          background: linear-gradient(135deg, rgba(61,220,108,0.1) 0%, rgba(212,163,115,0.05) 100%);
          border: 1px solid rgba(61,220,108,0.2);
        }
        
        .success-message h2 {
          color: #3ddc6c;
        }
        
        .success-note {
          color: #d4a373;
          font-weight: 600;
        }
        
        /* FOOTER */
        footer { 
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
          margin-bottom: 8px; 
          color: #d4a373;
          font-size: 18px;
          font-weight: 700;
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
          margin-bottom: 16px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
          font-weight: 700;
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
          color: rgba(255,255,255,0.4); 
          font-size: 13px;
          margin-bottom: 8px;
        }
        
        .footer-age {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          h1 { font-size: 40px; }
          h2 { font-size: 32px; }
          section { padding: 80px 20px; }
          .ctas, .stats, .benefits, .quotes { grid-template-columns: 1fr; }
          .archetypes { grid-template-columns: repeat(2, 1fr); }
          .axes { grid-template-columns: repeat(2, 1fr); }
          .form-row { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; gap: 32px; }
          .footer-links { flex-direction: column; gap: 32px; }
        }
      `}</style>
    </>
  );
}
