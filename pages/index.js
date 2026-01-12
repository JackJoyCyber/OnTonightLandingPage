// pages/index.js - OnTonight Landing Page
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
              <a href="https://app.on-tonight.com/?type=onpro" className="cta">
                <span>🎯</span>
                <strong>I'm a Pro</strong>
                <small>Build Career</small>
              </a>
              <a href="https://app.on-tonight.com/?type=patron" className="cta">
                <span>🌟</span>
                <strong>I'm a Patron</strong>
                <small>Find People</small>
              </a>
              <a href="https://app.on-tonight.com/?type=venue" className="cta">
                <span>🏢</span>
                <strong>I'm a Venue</strong>
                <small>Grow Team</small>
              </a>
            </div>
            
            <div className="promo">🎉 First 2,000 signups get their FIRST YEAR FREE</div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="problem">
          <div className="container">
            <h2>The Hospitality Industry's $66.8B Turnover Crisis</h2>
            <div className="stats">
              <div className="stat">
                <div className="num">73%</div>
                <div className="label">Annual Turnover Rate</div>
                <small>Source: National Restaurant Association, 2024</small>
                <p>When hospitality workers change venues, they lose their customer relationships.</p>
              </div>
              <div className="stat">
                <div className="num">$5,864</div>
                <div className="label">Cost Per New Hire</div>
                <small>Source: Cornell University</small>
                <p>Recruiting, training, and productivity loss. Multiply by 73% turnover.</p>
              </div>
              <div className="stat">
                <div className="num">"Where?"</div>
                <div className="label">Customer Experience</div>
                <small>Industry Survey, 2024</small>
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
                <h3>For OnPros</h3>
                <h4>Your Career, Portable</h4>
                <ul>
                  <li>✅ Professional profile that follows you</li>
                  <li>✅ Skills verified through DAPA</li>
                  <li>✅ Customers follow YOU, not venues</li>
                  <li>✅ Build reputation once, keep forever</li>
                </ul>
                <div className="price"><strong>$10/month</strong> after trial<br /><small>First month FREE</small></div>
                <a href="https://app.on-tonight.com/?type=onpro" className="btn">Build Profile</a>
              </div>
              
              <div className="benefit">
                <h3>For Patrons</h3>
                <h4>Find Your People</h4>
                <ul>
                  <li>✅ Follow favorite bartenders & servers</li>
                  <li>✅ See who's working tonight</li>
                  <li>✅ Never lose touch</li>
                  <li>✅ Discover verified professionals</li>
                </ul>
                <div className="price"><strong>Always FREE</strong><br /><small>Premium: $5/month</small></div>
                <a href="https://app.on-tonight.com/?type=patron" className="btn">Discover OnPros</a>
              </div>
              
              <div className="benefit">
                <h3>For Venues</h3>
                <h4>Attract & Retain Talent</h4>
                <ul>
                  <li>✅ Recruit DAPA-verified professionals</li>
                  <li>✅ Showcase your team</li>
                  <li>✅ Reduce turnover</li>
                  <li>✅ Track staff impact</li>
                </ul>
                <div className="price"><strong>3-month FREE trial</strong><br /><small>From $50/month</small></div>
                <a href="https://app.on-tonight.com/?type=venue" className="btn">Try Free</a>
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
              <div className="axis"><span>🎯</span><strong>Technical</strong><p>Knowledge & Procedures</p></div>
              <div className="axis"><span>💎</span><strong>Ethical</strong><p>Integrity & Compliance</p></div>
              <div className="axis"><span>💗</span><strong>Emotional</strong><p>Empathy & Relationships</p></div>
              <div className="axis"><span>⚡</span><strong>Velocity</strong><p>Speed & Crisis Management</p></div>
              <div className="axis"><span>💰</span><strong>Commercial</strong><p>Sales & Revenue</p></div>
              <div className="axis"><span>👑</span><strong>Leadership</strong><p>Team Dynamics</p></div>
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
              <div>🌐 The Connector</div><div>🏠 The Regular</div><div>🗺️ The Adventurer</div>
              <div>🎉 The Host</div><div>🍷 The Connoisseur</div><div>🔍 The Explorer</div>
              <div>🎊 The Celebrator</div><div>😌 The Relaxer</div><div>💪 The Supporter</div>
              <div>🧐 The Critic</div><div>📖 The Storyteller</div><div>📚 The Student</div>
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
                <cite>Anonymous GM, Cornell Hospitality Quarterly 2023</cite>
              </div>
              <div className="quote">
                <p>"I've changed venues three times in five years. Every time, I lose my entire customer base."</p>
                <cite>Survey Response, National Bartenders Association 2024</cite>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="pricing">
          <div className="container">
            <h2>Transparent Pricing</h2>
            <p className="promo">🎉 First 2,000 signups get their FIRST YEAR FREE</p>
            <div className="plans">
              <div className="plan">
                <h3>OnPro</h3>
                <div className="tiers">
                  <div><strong>Free</strong><p>Basic profile, 1 assessment</p></div>
                  <div><strong>$10/mo</strong><p>Unlimited assessments, analytics</p></div>
                </div>
                <a href="https://app.on-tonight.com/?type=onpro" className="btn">Start Free</a>
              </div>
              <div className="plan">
                <h3>Patron</h3>
                <div className="tiers">
                  <div><strong>Free</strong><p>Follow OnPros, see schedules</p></div>
                  <div><strong>$5/mo</strong><p>Full genome, advanced matching</p></div>
                </div>
                <a href="https://app.on-tonight.com/?type=patron" className="btn">Join Free</a>
              </div>
              <div className="plan">
                <h3>Venue</h3>
                <div className="tiers">
                  <div><strong>$50/mo</strong><p>Up to 10 staff</p></div>
                  <div><strong>$100/mo</strong><p>Up to 25 staff, recruiting</p></div>
                </div>
                <a href="https://app.on-tonight.com/?type=venue" className="btn">Try Free (3 months)</a>
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
                <input type="text" placeholder="Name" required value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" required value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})} />
                <select required value={formData.userType}
                  onChange={e => setFormData({...formData, userType: e.target.value})}>
                  <option value="">I am a...</option>
                  <option value="onpro">OnPro (Hospitality Professional)</option>
                  <option value="patron">Patron (Customer)</option>
                  <option value="venue">Venue Owner/Manager</option>
                </select>
                <input type="text" placeholder="City" value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})} />
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Get Early Access'}
                </button>
              </form>
            </div>
          </section>
        ) : (
          <section className="signup">
            <div className="container">
              <h2>✅ You're on the list!</h2>
              <p>Check your email for next steps. First 2,000 get first year FREE! 🎉</p>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer>
          <div className="container">
            <div className="cols">
              <div>
                <h4>OnTonight</h4>
                <p>Where Regulars Are Made</p>
              </div>
              <div>
                <h4>Product</h4>
                <a href="https://app.on-tonight.com/?type=onpro">For OnPros</a>
                <a href="https://app.on-tonight.com/?type=patron">For Patrons</a>
                <a href="https://app.on-tonight.com/?type=venue">For Venues</a>
              </div>
              <div>
                <h4>Company</h4>
                <a href="mailto:AdminJoy@On-Tonight.com">Contact</a>
              </div>
            </div>
            <p className="copy">© 2025 OnTonight LLC. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { background: #0a0f14; color: #f8fafc; font-family: 'Urbanist', sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        h1 { font-size: 64px; font-weight: 800; line-height: 1.1; margin-bottom: 20px; background: linear-gradient(135deg, #fff 0%, #d4a373 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        h2 { font-size: 48px; font-weight: 800; text-align: center; margin-bottom: 20px; }
        section { padding: 100px 20px; }
        
        .hero { text-align: center; min-height: 100vh; display: flex; align-items: center; background: linear-gradient(180deg, #0a0f14 0%, #0d1420 50%, #0a0f14 100%); }
        .tagline { font-size: 28px; color: #d4a373; font-weight: 600; margin-bottom: 15px; }
        .subtitle { font-size: 18px; color: rgba(255,255,255,0.8); margin-bottom: 60px; }
        .ctas { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 900px; margin: 0 auto 40px; }
        .cta { background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px 20px; text-align: center; text-decoration: none; color: inherit; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; }
        .cta:hover { background: rgba(255,255,255,0.06); border-color: #d4a373; transform: translateY(-4px); }
        .cta span { font-size: 48px; margin-bottom: 16px; }
        .cta strong { font-size: 24px; display: block; margin-bottom: 8px; }
        .cta small { font-size: 16px; color: rgba(255,255,255,0.6); }
        .promo { background: rgba(212,163,115,0.1); border: 1px solid rgba(212,163,115,0.3); border-radius: 12px; padding: 16px 32px; display: inline-block; color: #d4a373; font-weight: 600; }
        
        .problem { background: #0d1420; }
        .problem .sub { text-align: center; color: rgba(255,255,255,0.7); max-width: 700px; margin: 0 auto 60px; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 60px; }
        .stat { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px 30px; text-align: center; }
        .num { font-size: 48px; font-weight: 800; color: #d4a373; margin-bottom: 12px; }
        .label { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .stat small { font-size: 12px; color: rgba(255,255,255,0.5); display: block; margin-bottom: 20px; }
        .stat p { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6; }
        .solution { text-align: center; font-size: 24px; font-weight: 600; color: #d4a373; }
        
        .how { background: #0a0f14; }
        .how .sub { text-align: center; color: rgba(255,255,255,0.7); margin-bottom: 60px; }
        .benefits { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .benefit { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 30px; text-align: center; }
        .benefit h3 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #d4a373; margin-bottom: 12px; }
        .benefit h4 { font-size: 24px; margin-bottom: 20px; }
        .benefit ul { list-style: none; text-align: left; margin-bottom: 24px; }
        .benefit li { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.8); }
        .price { background: rgba(212,163,115,0.1); border-radius: 8px; padding: 16px; margin-bottom: 24px; }
        .price strong { font-size: 20px; color: #d4a373; display: block; margin-bottom: 4px; }
        .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #d4a373 0%, #c99763 100%); color: #0a0f14; font-weight: 600; border-radius: 8px; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s; }
        .btn:hover { transform: translateY(-2px); }
        
        .dapa { background: #0d1420; }
        .dapa .sub { text-align: center; color: rgba(255,255,255,0.7); margin-bottom: 60px; max-width: 700px; margin-left: auto; margin-right: auto; }
        .axes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .axis { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; text-align: center; }
        .axis span { font-size: 32px; display: block; margin-bottom: 12px; }
        .axis strong { display: block; font-size: 16px; margin-bottom: 4px; }
        .axis p { font-size: 14px; color: rgba(255,255,255,0.6); }
        .info { text-align: center; font-size: 18px; }
        
        .genome { background: #0a0f14; }
        .genome .sub { text-align: center; color: rgba(255,255,255,0.7); margin-bottom: 60px; }
        .archetypes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .archetypes div { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; text-align: center; font-size: 14px; font-weight: 600; }
        
        .testimonials { background: #0d1420; }
        .testimonials .sub { text-align: center; color: rgba(255,255,255,0.7); margin-bottom: 60px; }
        .quotes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
        .quote { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 30px; }
        .quote p { font-size: 16px; font-style: italic; line-height: 1.7; margin-bottom: 20px; }
        cite { font-size: 13px; color: rgba(255,255,255,0.6); font-style: normal; }
        
        .pricing { background: #0a0f14; }
        .pricing .promo { display: block; text-align: center; margin-bottom: 60px; }
        .plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .plan { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px 30px; text-align: center; }
        .plan h3 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #d4a373; margin-bottom: 30px; }
        .tiers div { background: rgba(255,255,255,0.03); border-radius: 8px; padding: 20px; margin-bottom: 16px; }
        .tiers strong { font-size: 20px; display: block; margin-bottom: 8px; }
        .tiers p { font-size: 14px; color: rgba(255,255,255,0.7); }
        
        .signup { background: #0d1420; text-align: center; }
        .signup p { color: rgba(255,255,255,0.7); margin-bottom: 40px; }
        form { max-width: 500px; margin: 0 auto; }
        input, select { width: 100%; padding: 14px; margin-bottom: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; font-family: inherit; font-size: 16px; }
        input:focus, select:focus { outline: none; border-color: #d4a373; }
        
        footer { background: #0a0f14; border-top: 1px solid rgba(255,255,255,0.1); padding: 60px 20px 40px; }
        .cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-bottom: 40px; }
        .cols h4 { margin-bottom: 16px; color: #d4a373; }
        .cols a { display: block; color: rgba(255,255,255,0.7); text-decoration: none; margin-bottom: 8px; }
        .cols a:hover { color: #d4a373; }
        .copy { text-align: center; color: rgba(255,255,255,0.5); font-size: 14px; }
        
        @media (max-width: 768px) {
          h1 { font-size: 40px; }
          h2 { font-size: 32px; }
          .ctas, .stats, .benefits, .quotes, .plans, .cols { grid-template-columns: 1fr; }
          .archetypes { grid-template-columns: repeat(2, 1fr); }
          .axes { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </>
  );
}
