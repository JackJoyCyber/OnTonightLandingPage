// pages/index.js - OnTonight Landing Page (Professional Redesign)
import { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', userType: '', city: '', role: ''
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
          <div className="container">
            <h1>Your Night. Your People.<br />Your Business.</h1>
            <p className="tagline">Where Regulars Are Made.</p>
            <p className="subtitle">
              Hospitality professionals build portable careers.<br />
              Customers follow the people they love.<br />
              Venues attract and retain top talent.
            </p>
            
            <div className="ctas">
              <a href="https://app.on-tonight.com/?type=onpro" className="cta cta-onpro">
                <div className="cta-label">ONPRO</div>
                <strong>Build Career</strong>
              </a>
              <a href="https://app.on-tonight.com/?type=patron" className="cta cta-patron">
                <div className="cta-label">PATRON</div>
                <strong>Find People</strong>
              </a>
              <a href="https://app.on-tonight.com/?type=venue" className="cta cta-venue">
                <div className="cta-label">VENUE</div>
                <strong>Grow Team</strong>
              </a>
            </div>
            
            <div className="promo">First 2,000 signups get their FIRST YEAR FREE</div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="problem">
          <div className="container">
            <h2>The Hospitality Industry's $66.8B Turnover Crisis</h2>
            <div className="stats">
              <div className="stat">
                <div className="stat-num">73%</div>
                <div className="stat-label">Annual Turnover Rate</div>
                <div className="stat-source">National Restaurant Association, 2024</div>
                <p>When hospitality workers change venues, they lose their customer relationships.</p>
              </div>
              <div className="stat">
                <div className="stat-num">$5,864</div>
                <div className="stat-label">Cost Per New Hire</div>
                <div className="stat-source">Cornell University</div>
                <p>Recruiting, training, and productivity loss. Multiply by 73% turnover.</p>
              </div>
              <div className="stat">
                <div className="stat-num">"Where?"</div>
                <div className="stat-label">Customer Experience</div>
                <div className="stat-source">Industry Survey, 2024</div>
                <p>Your favorite bartender left. No way to follow. Connection gone.</p>
              </div>
            </div>
            <p className="solution">OnTonight solves this for everyone.</p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how">
          <div className="container">
            <h2>One Platform. Three Benefits.</h2>
            <div className="benefits">
              <div className="benefit">
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
                <div className="price">
                  <strong>$10</strong><span>/month</span>
                  <small>First month FREE</small>
                </div>
                <a href="https://app.on-tonight.com/?type=onpro" className="btn btn-primary">Get Started</a>
              </div>
              
              <div className="benefit">
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
                  <li>Never lose touch</li>
                  <li>Discover verified professionals</li>
                </ul>
                <div className="price">
                  <strong>FREE</strong>
                  <small>Premium: $5/month</small>
                </div>
                <a href="https://app.on-tonight.com/?type=patron" className="btn btn-primary">Discover OnPros</a>
              </div>
              
              <div className="benefit">
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
                  <li>Showcase your team</li>
                  <li>Reduce turnover</li>
                  <li>Track staff impact</li>
                </ul>
                <div className="price">
                  <strong>$50</strong><span>/month</span>
                  <small>3-month FREE trial</small>
                </div>
                <a href="https://app.on-tonight.com/?type=venue" className="btn btn-primary">Try Free</a>
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
              <div className="archetype">The Connector</div>
              <div className="archetype">The Regular</div>
              <div className="archetype">The Adventurer</div>
              <div className="archetype">The Host</div>
              <div className="archetype">The Connoisseur</div>
              <div className="archetype">The Explorer</div>
              <div className="archetype">The Celebrator</div>
              <div className="archetype">The Relaxer</div>
              <div className="archetype">The Supporter</div>
              <div className="archetype">The Critic</div>
              <div className="archetype">The Storyteller</div>
              <div className="archetype">The Student</div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials">
          <div className="container">
            <h2>The Cost of Constant Turnover</h2>
            <p className="sub">Real quotes from hospitality professionals</p>
            <div className="quotes">
              <div className="quote">
                <p>"We spend $60,000 a year just replacing bartenders. By the time they're really good, they leave."</p>
                <cite>Anonymous GM · Cornell Hospitality Quarterly 2023</cite>
              </div>
              <div className="quote">
                <p>"I've changed venues three times in five years. Every time, I lose my entire customer base."</p>
                <cite>Survey Response · National Bartenders Association 2024</cite>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="pricing">
          <div className="container">
            <h2>Transparent Pricing</h2>
            <p className="pricing-promo">First 2,000 signups get their FIRST YEAR FREE</p>
            <div className="plans">
              <div className="plan">
                <div className="plan-header">
                  <h3>OnPro</h3>
                </div>
                <div className="plan-tiers">
                  <div className="tier">
                    <strong>Free</strong>
                    <p>Basic profile · 1 assessment</p>
                  </div>
                  <div className="tier tier-featured">
                    <strong>$10/mo</strong>
                    <p>Unlimited assessments · Analytics · Priority</p>
                  </div>
                </div>
                <a href="https://app.on-tonight.com/?type=onpro" className="btn btn-outline">Start Free</a>
              </div>
              <div className="plan">
                <div className="plan-header">
                  <h3>Patron</h3>
                </div>
                <div className="plan-tiers">
                  <div className="tier">
                    <strong>Free</strong>
                    <p>Follow OnPros · See schedules</p>
                  </div>
                  <div className="tier">
                    <strong>$5/mo</strong>
                    <p>Full genome · Advanced matching</p>
                  </div>
                </div>
                <a href="https://app.on-tonight.com/?type=patron" className="btn btn-outline">Join Free</a>
              </div>
              <div className="plan">
                <div className="plan-header">
                  <h3>Venue</h3>
                </div>
                <div className="plan-tiers">
                  <div className="tier">
                    <strong>$50/mo</strong>
                    <p>Up to 10 staff · Analytics</p>
                  </div>
                  <div className="tier tier-featured">
                    <strong>$100/mo</strong>
                    <p>Up to 25 staff · Recruiting · Priority</p>
                  </div>
                </div>
                <a href="https://app.on-tonight.com/?type=venue" className="btn btn-outline">Try Free (3 months)</a>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNUP */}
        {!submitted ? (
          <section className="signup">
            <div className="container">
              <h2>Join the Waitlist</h2>
              <p>Be first to know when OnTonight launches in your city.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input type="text" placeholder="Name" required value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input type="email" placeholder="Email" required value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-row">
                  <select required value={formData.userType}
                    onChange={e => setFormData({...formData, userType: e.target.value})}>
                    <option value="">I am a...</option>
                    <option value="onpro">OnPro (Hospitality Professional)</option>
                    <option value="patron">Patron (Customer)</option>
                    <option value="venue">Venue Owner/Manager</option>
                  </select>
                  <input type="text" placeholder="City" value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                  {loading ? 'Submitting...' : 'Get Early Access'}
                </button>
              </form>
            </div>
          </section>
        ) : (
          <section className="signup">
            <div className="container">
              <div className="success-message">
                <h2>You're on the list!</h2>
                <p>Check your email for next steps. First 2,000 get first year FREE!</p>
              </div>
            </div>
          </section>
        )}

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
                  <a href="https://app.on-tonight.com/?type=onpro">For OnPros</a>
                  <a href="https://app.on-tonight.com/?type=patron">For Patrons</a>
                  <a href="https://app.on-tonight.com/?type=venue">For Venues</a>
                </div>
                <div className="footer-col">
                  <h5>Company</h5>
                  <a href="mailto:AdminJoy@On-Tonight.com">Contact</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 OnTonight LLC. All rights reserved.</p>
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
          text-align: center; 
          text-decoration: none; 
          color: inherit; 
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex; 
          flex-direction: column; 
          gap: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4a373, transparent);
          transform: translateX(-100%);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .cta:hover::before {
          transform: translateX(100%);
        }
        
        .cta:hover { 
          background: rgba(255,255,255,0.04); 
          border-color: rgba(212,163,115,0.3);
          transform: translateY(-2px);
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
        
        .promo { 
          background: rgba(212,163,115,0.08); 
          border: 1px solid rgba(212,163,115,0.2); 
          padding: 16px 32px; 
          display: inline-block; 
          color: #d4a373; 
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -0.01em;
        }
        
        /* PROBLEM */
        .problem { 
          background: #0d1420; 
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
          background: #0a0f14; 
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
          background: rgba(212,163,115,0.05); 
          border: 1px solid rgba(212,163,115,0.15);
          padding: 16px; 
          margin-bottom: 24px;
          text-align: center;
        }
        
        .price strong { 
          font-size: 32px; 
          color: #d4a373;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .price span {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          font-weight: 400;
        }
        
        .price small {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
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
        }
        
        .btn-primary { 
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%); 
          color: #0a0f14;
          border: 1px solid transparent;
        }
        
        .btn-primary:hover { 
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(212,163,115,0.3);
        }
        
        .btn-outline {
          background: transparent;
          color: #d4a373;
          border: 1px solid rgba(212,163,115,0.3);
        }
        
        .btn-outline:hover {
          background: rgba(212,163,115,0.1);
          border-color: #d4a373;
        }
        
        .btn-large {
          padding: 18px 48px;
          font-size: 16px;
        }
        
        /* DAPA */
        .dapa { 
          background: #0d1420; 
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
          background: #0a0f14; 
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
        }
        
        /* TESTIMONIALS */
        .testimonials { 
          background: #0d1420; 
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
        
        /* PRICING */
        .pricing { 
          background: #0a0f14; 
        }
        
        .pricing-promo { 
          text-align: center; 
          margin-bottom: 64px;
          font-size: 16px;
          font-weight: 600;
          color: #d4a373;
        }
        
        .plans { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 24px; 
        }
        
        .plan { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.08); 
          padding: 32px; 
          display: flex;
          flex-direction: column;
        }
        
        .plan-header h3 { 
          font-size: 12px; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          color: rgba(255,255,255,0.5); 
          margin-bottom: 32px;
          font-weight: 700;
        }
        
        .plan-tiers {
          flex: 1;
          margin-bottom: 32px;
        }
        
        .tier { 
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 20px; 
          margin-bottom: 12px; 
        }
        
        .tier-featured {
          background: rgba(212,163,115,0.05);
          border-color: rgba(212,163,115,0.2);
        }
        
        .tier strong { 
          font-size: 20px; 
          display: block; 
          margin-bottom: 8px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        
        .tier p { 
          font-size: 13px; 
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }
        
        /* SIGNUP */
        .signup { 
          background: #0d1420; 
          text-align: center; 
        }
        
        .signup p { 
          color: rgba(255,255,255,0.6); 
          margin-bottom: 48px;
          font-size: 16px;
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
        
        .success-message {
          max-width: 600px;
          margin: 0 auto;
          padding: 64px 32px;
          background: rgba(61,220,108,0.05);
          border: 1px solid rgba(61,220,108,0.2);
        }
        
        .success-message h2 {
          color: #3ddc6c;
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
        }
        
        .footer-bottom p { 
          text-align: center; 
          color: rgba(255,255,255,0.4); 
          font-size: 13px; 
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          h1 { font-size: 40px; }
          h2 { font-size: 32px; }
          section { padding: 80px 20px; }
          .ctas, .stats, .benefits, .quotes, .plans { grid-template-columns: 1fr; }
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
