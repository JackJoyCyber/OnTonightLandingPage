// pages/index.js
// ============================================================================
// ONTONIGHT LANDING PAGE — V4 EMOTIONAL REBUILD
// ============================================================================
// WHAT CHANGED FROM V3:
// - Hero: Recognition-first copy. Tagline permanent. Typewriter beneath it.
//   New phrases. Direct emotional hit before any feature explanation.
// - Added: "The Human Cost" section — raw industry reality with sourced quotes
// - Transformation section: Before/After table — no feature list, just the shift
// - Platform section: Copy rewritten. Less product-speak, more life impact.
//   Pricing updated: 30-day free trial framing, no "waitlist" language.
// - Vision/Founder: Jack's actual words. Photo placeholder ready to swap.
//   Third vision item rewritten around his quote.
// - CTA: "Claim Your Profile Free" → app.on-tonight.com/signup directly.
//   Waitlist form retained for venues/investors only.
// - Investor block: Subtle credibility callout. partner@on-tonight.com routing.
// - All existing infrastructure preserved: Firebase, SendGrid, API routes.
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
  const [activeMockup, setActiveMockup] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [expandedPlatform, setExpandedPlatform] = useState(null);
  const [expandedVision, setExpandedVision] = useState(null);
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [showInstallPrompt] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counterValues, setCounterValues] = useState({ turnover: 0, workers: 0, cost: 0 });

  const accordionRefs = useRef({});
  const statsRef = useRef(null);

  // ============================================================================
  // TYPEWRITER — Updated phrases, ends on Jack's line
  // ============================================================================
  const descriptors = [
    "Stop resetting. Start building.",
    "Your craft deserves a career.",
    "Your reputation travels with you now.",
    "Built by someone who lived the gap.",
    "Your regulars deserve to find you.",
    "The career platform hospitality never had.",
    "Verified skills. Portable reputation.",
    "Me, You, and our people. Together."
  ];
  const [descriptorIndex, setDescriptorIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [typewriterActive, setTypewriterActive] = useState(false);

  // Delay typewriter start to match hero reveal sequence (3.0s fade-in + 0.9s duration)
  useEffect(() => {
    const timer = setTimeout(() => setTypewriterActive(true), 3600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!typewriterActive) return;
    const current = descriptors[descriptorIndex];
    const typeSpeed = isDeleting ? 25 : 60;
    const pauseTime = isDeleting ? 300 : 2800;

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
  }, [charIndex, isDeleting, descriptorIndex, typewriterActive]);

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================================================
  // INTERSECTION OBSERVER — Scroll animations
  // ============================================================================
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
    const timeout = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    }, 100);
    return () => { clearTimeout(timeout); observer.disconnect(); };
  }, []);

  // ============================================================================
  // ANIMATED COUNTERS — Stats section
  // ============================================================================
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
          const duration = 2000;
          const steps = 60;
          const targets = { turnover: 73, workers: 156, cost: 668 };
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounterValues({
              turnover: Math.round(targets.turnover * ease),
              workers: Math.round(targets.workers * ease),
              cost: Math.round(targets.cost * ease)
            });
            if (step >= steps) clearInterval(interval);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  // ============================================================================
  // ACCORDION HANDLERS — Scroll lock preserved
  // ============================================================================
  const handlePlatformAccordion = (key) => {
    const scrollY = window.scrollY;
    setExpandedPlatform(expandedPlatform === key ? null : key);
    setTimeout(() => window.scrollTo(0, scrollY), 0);
    setTimeout(() => window.scrollTo(0, scrollY), 10);
    setTimeout(() => window.scrollTo(0, scrollY), 50);
  };

  const handleVisionAccordion = (key) => {
    const scrollY = window.scrollY;
    setExpandedVision(expandedVision === key ? null : key);
    setTimeout(() => window.scrollTo(0, scrollY), 0);
    setTimeout(() => window.scrollTo(0, scrollY), 10);
    setTimeout(() => window.scrollTo(0, scrollY), 50);
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

// PWA install prompt intentionally disabled on landing page —
  // install prompt belongs on app.on-tonight.com, not the marketing site
  
  // ============================================================================
  // FORM
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
      else alert('Something went wrong. Please try again.');
    } catch (err) {
      alert('Error submitting. Please try again.');
    }
    setLoading(false);
  };

  // ============================================================================
  // DATA
  // ============================================================================

  const problemCards = [
    {
      id: 'invisible',
      icon: '👻',
      stat: 'Invisible',
      label: 'Between Jobs',
      desc: 'The moment you leave a venue, your professional identity disappears. No record of your regulars. No proof of your skill. No way for your customers to find you. You start over — again.'
    },
    {
      id: 'turnover',
      icon: '🔄',
      stat: '73%',
      label: 'Annual Turnover',
      desc: 'The hospitality industry has the highest voluntary quit rate of any sector in America. Not because people don\'t love the work. Because the work doesn\'t love them back. Until now.'
    },
    {
      id: 'zero',
      icon: '📉',
      stat: 'Zero',
      label: 'Career Infrastructure',
      desc: 'Lawyers have bar licenses. Engineers have GitHub. Doctors have credentials. Hospitality professionals — with decades of mastery — have nothing that travels with them. OnTonight changes that.'
    },
    {
      id: 'cost',
      icon: '💔',
      stat: '$24K',
      label: 'Lost Per Move',
      desc: 'The average hospitality professional loses $24,000 in annual tip income when changing venues. Their regulars can\'t find them. Years of relationship-building, erased overnight.'
    }
  ];

  const industryQuotes = [
    {
      text: "The restaurant industry's turnover rate reached 73% — the highest of any private sector industry. Personal connections with staff account for 60–80% of repeat visits.",
      source: "National Restaurant Association, 2023"
    },
    {
      text: "Employee turnover in hospitality costs operators approximately $5,864 per hourly employee. The hidden cost isn't the hiring — it's the relationships that walk out the door.",
      source: "Cornell University School of Hotel Administration"
    },
    {
      text: "Hospitality workers consistently rank 'lack of career progression' and 'loss of professional identity' as primary reasons for leaving the industry entirely.",
      source: "Bureau of Labor Statistics, JOLTS Report"
    }
  ];

  const transformationRows = [
    { before: 'Change jobs. Lose everything.', after: 'Change jobs. Bring it all with you.' },
    { before: 'Regulars can\'t find you when you move.', after: 'Regulars follow you anywhere.' },
    { before: 'Skills assumed, never proven.', after: 'Skills verified, always visible.' },
    { before: 'Start over at every new venue.', after: 'Career compounds with every shift.' },
    { before: 'Professional identity belongs to the venue.', after: 'Professional identity belongs to you.' },
  ];

  const onproFeatures = [
    { icon: '🎯', title: 'Portable Professional Identity', desc: 'Your profile, your skills, your regulars — they travel with you. When you change venues, your career doesn\'t reset.' },
    { icon: '🏆', title: 'DAPA Skill Verification', desc: '600+ questions across 9 categories. Six-axis genome: Technical, Ethical, Emotional, Velocity, Commercial, Leadership. Proof that travels with you always.' },
    { icon: '👥', title: 'Your Regulars Follow You', desc: 'When you move, your regulars get notified. The relationship doesn\'t end with the employment. It lives on OnTonight.' },
    { icon: '🧬', title: 'Your Professional DNA', desc: 'Discover your archetype. Are you The Craftsman? The Therapist? The Closer? Your genome reveals what makes you unforgettable.' }
  ];

  const patronFeatures = [
    { icon: '🔔', title: 'Never Lose Them Again', desc: 'Follow your favorite OnPros. Get notified when they\'re working. Get notified when they move. The magic follows the person, not the place.' },
    { icon: '🗺️', title: 'Their New Location, Instantly', desc: 'Your bartender changed venues? You\'ll know before you show up to an empty stool. Real-time location updates when they move.' },
    { icon: '⭐', title: 'Become a Recognized Regular', desc: 'Build your hospitality reputation. Check in, earn badges, get recognized. The industry finally sees the people who keep it alive.' },
    { icon: '🧬', title: 'Your OnScene Genome', desc: '45 questions. 10 dimensions. 20 archetypes. Discover how you experience hospitality — and find the venues and OnPros that match.' }
  ];

  const venueFeatures = [
    { icon: '✅', title: 'Hire Verified, Not Hoped', desc: 'See DAPA scores before you hire. Know exactly the skill level walking through your door. No more expensive surprises in the first week.' },
    { icon: '🌟', title: 'Turn Talent Into Traffic', desc: 'Showcase your verified OnPros. Their regulars become your guests. Their reputation drives your revenue. Retention becomes competitive advantage.' },
    { icon: '📈', title: 'Data You Actually Need', desc: 'Which professionals drive repeat visits? Which shifts build regulars fastest? Understand your business at the relationship level — not just the revenue level.' },
    { icon: '🎯', title: 'Culture Fit, Not Just Skill Fit', desc: 'Match staff by professional genome, not just resume. Better culture alignment means longer tenure, lower turnover, and guests who feel it.' }
  ];

  const visionSections = [
    {
      id: 'story',
      title: 'Almost 30 Years Behind the Bar',
      content: `Almost 30 years in hospitality. Not watching from an office — living it. Behind the stick where ice never stops and the POS glows through double shifts.

I've made drinks until my hands cramped. I've worked stations where you pour four cocktails simultaneously while holding three separate conversations — each guest believing they have your full attention. Because in that moment, they do.

I know what mastery in this work looks like. The muscle memory. The emotional intelligence required. The technical precision of a 200-drink rush. The relationship you build with someone who becomes a regular, then a friend.

And I've watched the best people I've ever trained walk out the door. Every single time — they started over from zero.

This platform is what this industry has been missing. I spent years building a career that, after each transition, had to be almost fully rebuilt. OnTonight gives us power over our income, and a way to prove our knowledge, worth, and abilities.`
    },
    {
      id: 'pattern',
      title: 'The Infrastructure That Never Existed',
      content: `Once you see the gap, you can't stop seeing it.

Lawyers switch firms. Their bar license travels with them. Software engineers change companies. Their GitHub stays intact. Real estate agents move brokerages. Their client relationships go with them.

Hospitality professionals — with decades of mastery, thousands of loyal relationships, verified expertise across disciplines — change venues and lose everything. Every single time.

This isn't the nature of the industry. This is the absence of professional infrastructure. The absence of something that should have been built decades ago.

OnTonight isn't a product launch. It's a correction. The career architecture that 15.6 million hospitality workers in America alone have needed for a century.`
    },
    {
      id: 'future',
      title: '"Me, You, and Our People. Together."',
      content: `This isn't something the industry needs. This is the core heartbeat of what the industry is.

Hospitality has always run on relationships. The regular who knows your name. The bartender who starts your drink when they see you walk in. The server who remembers your allergy. The sommelier who knows you before you know yourself.

We've been building those relationships for decades without any way to preserve them. Without any infrastructure to carry them forward.

OnTonight is that infrastructure. We're live now in Tampa Bay. Miami and Nashville are next. From there — every major hospitality market in America.

We're not just building software. We're building the future of hospitality careers. And we're building it for you.`
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
    { emoji: '🌟', name: 'The Enthusiast', desc: 'Your energy is contagious.' }
  ];

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <>
      <Head>
        <title>OnTonight — Your Night. Your People. Where Regulars Are Made.</title>
        <meta name="description" content="The professional identity platform for hospitality. Build portable careers, follow your people, verify your skills. Live now in Tampa Bay." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4a373" />
        <meta property="og:title" content="OnTonight — Where Regulars Are Made" />
        <meta property="og:description" content="The career platform hospitality never had. Your skills travel with you. Your regulars follow you. Your career finally compounds." />
        <meta property="og:image" content="https://on-tonight.com/og-image.jpg" />
        <meta property="og:url" content="https://on-tonight.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* PARTICLES */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${(i * 8.3) + Math.sin(i) * 5}%`,
            animationDelay: `${i * 1.8}s`,
            animationDuration: `${22 + (i % 5) * 4}s`
          }} />
        ))}
      </div>

      <div className="page">

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* NAV */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-live-badge">
              <span className="badge-dot" />
              LIVE NOW · TAMPA BAY · 2026
            </div>
            <div className="nav-links">
              <a href="#problem">The Problem</a>
              <a href="#platform">Platform</a>
              <a href="#vision">Our Story</a>
              <a href="https://app.on-tonight.com" className="nav-cta">Claim Your Profile</a>
            </div>
          </div>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* HERO — Reveal sequence: brand → tagline → epigraph → typewriter → cards → CTA */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-glow-2" />

          <div className="container">

            {/* 1. BRAND — enters first, alone, dominates */}
            <div className="hero-brand-badge hero-reveal-1">OnTonight</div>

            {/* 2. PERMANENT TAGLINE — fades up beneath the brand */}
            <h1 className="hero-tagline hero-reveal-2">
              <span className="tagline-line">Your Night. Your People.</span>
              <span className="tagline-line-2">Where Regulars Are Made.</span>
            </h1>

            {/* 3. EPIGRAPH — the emotional pull quote, dim and italic above */}
            <div className="hero-epigraph hero-reveal-3">
              <span className="epigraph-line">"You've given years to this industry.</span>
              <span className="epigraph-line">Every move, you start over.</span>
              <span className="epigraph-line accent">That ends now."</span>
            </div>

            {/* 4. TYPEWRITER — starts after epigraph settles */}
            <div className="hero-descriptor hero-reveal-4">
              <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </div>

            {/* 5. WHO ARE YOU CARDS — drift up last */}
            <div className="who-are-you hero-reveal-5">
              <p className="who-label">I am a...</p>
              <div className="who-options">

                <div className={`who-card ${selectedUserType === 'onpro' ? 'expanded' : ''}`}>
                  <button className="who-card-header" onClick={() => setSelectedUserType(selectedUserType === 'onpro' ? null : 'onpro')}>
                    <span className="who-icon">🍸</span>
                    <div className="who-title">
                      <strong>Hospitality Pro</strong>
                      <span className="term-badge">OnPro</span>
                    </div>
                    <span className="who-toggle">{selectedUserType === 'onpro' ? '−' : '+'}</span>
                  </button>
                  <div className="who-card-content">
                    <p>Build a career that follows you. Verify your skills. Keep your regulars. <em>Finally own your professional identity.</em></p>
                    <button className="who-cta" onClick={() => handleUserTypeSelect('onpro')}>Claim Your Profile Free →</button>
                  </div>
                </div>

                <div className={`who-card ${selectedUserType === 'patron' ? 'expanded' : ''}`}>
                  <button className="who-card-header" onClick={() => setSelectedUserType(selectedUserType === 'patron' ? null : 'patron')}>
                    <span className="who-icon">🥂</span>
                    <div className="who-title">
                      <strong>Hospitality Patron</strong>
                    </div>
                    <span className="who-toggle">{selectedUserType === 'patron' ? '−' : '+'}</span>
                  </button>
                  <div className="who-card-content">
                    <p>Never lose your favorite bartender, server, or sommelier again. Follow the person — not the place.</p>
                    <button className="who-cta" onClick={() => handleUserTypeSelect('patron')}>Find Your People →</button>
                  </div>
                </div>

                <div className={`who-card ${selectedUserType === 'venue' ? 'expanded' : ''}`}>
                  <button className="who-card-header" onClick={() => setSelectedUserType(selectedUserType === 'venue' ? null : 'venue')}>
                    <span className="who-icon">🏢</span>
                    <div className="who-title">
                      <strong>Venue Owner</strong>
                    </div>
                    <span className="who-toggle">{selectedUserType === 'venue' ? '−' : '+'}</span>
                  </button>
                  <div className="who-card-content">
                    <p>Recruit verified talent. See DAPA scores before you hire. Turn your best people into a competitive advantage.</p>
                    <button className="who-cta" onClick={() => handleUserTypeSelect('venue')}>Partner With Us →</button>
                  </div>
                </div>

              </div>
            </div>

            {/* 6. PRIMARY CTA — final element, maximum weight */}
            <div className="hero-cta-block hero-reveal-5">
              <a href="https://app.on-tonight.com" className="btn-hero-primary">
                Claim Your Profile — It's Free
              </a>
              <p className="hero-cta-sub">30-day free trial · Cancel anytime · Live in Tampa Bay</p>
            </div>
          </div>

          <div className="scroll-hint">
            <span>↓</span>
            <span>The Problem</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* THE HUMAN COST — Emotional gut punch section */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-human-cost">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['human-header'] ? 'visible' : ''}`} id="human-header">
              <div className="section-eyebrow">THE REALITY</div>
              <h2>This Industry Has Been Running on Broken Infrastructure</h2>
              <p>Every year, millions of hospitality professionals lose what took years to build — because nothing was designed to protect it.</p>
            </div>

            <div className="industry-quotes">
              {industryQuotes.map((quote, i) => (
                <blockquote
                  key={i}
                  id={`quote-${i}`}
                  className={`industry-quote animate-on-scroll ${visibleSections[`quote-${i}`] ? 'visible' : ''}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="quote-mark">"</div>
                  <p>{quote.text}</p>
                  <cite>— {quote.source}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* THE PROBLEM — Stats + cards */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="problem" className="section-problem">
          <div className="container">

            <div className={`section-header animate-on-scroll ${visibleSections['problem-header'] ? 'visible' : ''}`} id="problem-header">
              <div className="section-eyebrow">THE NUMBERS</div>
              <h2>The $66.8 Billion Problem</h2>
              <p>Every year, hospitality loses more than money. It loses people, relationships, and institutional knowledge.</p>
            </div>

            {/* Animated stat counters */}
            <div className="stats-counter-row" ref={statsRef}>
              <div className="stat-counter-item">
                <div className="stat-counter-value gold">{counterValues.turnover}%</div>
                <div className="stat-counter-label">Annual Turnover</div>
                <div className="stat-counter-sub">Highest of any U.S. industry</div>
              </div>
              <div className="stat-counter-divider" />
              <div className="stat-counter-item">
                <div className="stat-counter-value">{(counterValues.workers / 10).toFixed(1)}M</div>
                <div className="stat-counter-label">Workers Affected</div>
                <div className="stat-counter-sub">In the U.S. alone</div>
              </div>
              <div className="stat-counter-divider" />
              <div className="stat-counter-item">
                <div className="stat-counter-value">${(counterValues.cost / 10).toFixed(1)}B</div>
                <div className="stat-counter-label">Lost Annually</div>
                <div className="stat-counter-sub">In turnover costs</div>
              </div>
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
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TRANSFORMATION — Before/After */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-transformation">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['transform-header'] ? 'visible' : ''}`} id="transform-header">
              <div className="section-eyebrow">THE SHIFT</div>
              <h2>What Changes When You're on OnTonight</h2>
              <p>Not features. Not functions. The actual experience of having a career in hospitality.</p>
            </div>

            <div className={`transformation-table animate-on-scroll ${visibleSections['transform-table'] ? 'visible' : ''}`} id="transform-table">
              <div className="transform-header-row">
                <div className="transform-col before-col">
                  <span className="transform-label-before">❌ Before OnTonight</span>
                </div>
                <div className="transform-col after-col">
                  <span className="transform-label-after">✓ With OnTonight</span>
                </div>
              </div>
              {transformationRows.map((row, i) => (
                <div key={i} className="transform-row" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="transform-col before-col">
                    <span>{row.before}</span>
                  </div>
                  <div className="transform-divider">→</div>
                  <div className="transform-col after-col">
                    <span>{row.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* PLATFORM */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="platform" className="section-platform">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['platform-header'] ? 'visible' : ''}`} id="platform-header">
              <div className="section-eyebrow">THE PLATFORM</div>
              <h2>Built for Every Person in the Room</h2>
              <p>Three solutions. One complete ecosystem. The first professional infrastructure hospitality has ever had.</p>
            </div>

            <div className="platform-accordion">

              {/* ONPRO */}
              <div ref={(el) => accordionRefs.current['onpro'] = el} className={`accordion-item ${expandedPlatform === 'onpro' ? 'expanded' : ''}`}>
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
                      <p className="platform-lead">Your professional identity follows you from venue to venue. Skills verified. Reputation preserved. Customers follow <em>you</em>.</p>
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
                          <span className="price-badge">FREE FOREVER</span>
                          <h4>OnPro Basic</h4>
                          <ul>
                            <li>Professional profile</li>
                            <li>Schedule sharing</li>
                            <li>2 skill assessments</li>
                            <li>Customer connections</li>
                          </ul>
                        </div>
                        <div className="price-card premium">
                          <span className="price-badge">$9.99/mo — 30 DAYS FREE</span>
                          <h4>OnPro Pro</h4>
                          <ul>
                            <li>Unlimited assessments</li>
                            <li>Direct messaging</li>
                            <li>Private event gig board</li>
                            <li>Advanced analytics</li>
                            <li>Verified badge priority</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="mockup-row">

                      {/* Phone 1: Assessment Dashboard */}
                        <div className="mock-phone" style={{cursor:'pointer'}} onClick={() => setActiveMockup('onpro-1')}>
                        <div className="mock-sb"><span className="mock-st">7:48 PM</span><div className="mock-si">●●● WiFi ■</div></div>
                        <div className="mock-nr"><div className="mock-nc"></div></div>
                        <div className="mock-scr">
                          <div className="mock-con">
                            <div className="mock-ptitle">Assessment Dashboard</div>
                            <div className="mock-psub">YOUR PROFESSIONAL ANALYTICS</div>
                            <div className="mock-card">
                              <div className="mock-ctitle">🧬 Overall Genome Profile</div>
                              <div className="mock-arch-row"><span className="mock-tier">PROFESSIONAL</span><span className="mock-aname">The Craftsman</span></div>
                              <svg width="100%" height="90" viewBox="0 0 110 90" style={{display:'block',margin:'2px 0 5px'}}>
                                <polygon points="55,6 86,24 86,58 55,76 24,58 24,24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                                <polygon points="55,18 74,30 74,52 55,64 36,52 36,30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                                <polygon points="55,30 63,36 63,46 55,52 47,46 47,36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                                <line x1="55" y1="6" x2="55" y2="76" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                                <line x1="86" y1="24" x2="24" y2="58" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                                <line x1="86" y1="58" x2="24" y2="24" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                                <polygon points="55,12 81,32 77,57 55,64 22,55 20,29" fill="rgba(212,163,115,0.16)" stroke="#d4a373" strokeWidth="1.5"/>
                                <circle cx="55" cy="12" r="2.5" fill="#3b82f6"/><circle cx="81" cy="32" r="2.5" fill="#a78bfa"/>
                                <circle cx="77" cy="57" r="2.5" fill="#ec4899"/><circle cx="55" cy="64" r="2.5" fill="#f59e0b"/>
                                <circle cx="22" cy="55" r="2.5" fill="#22c55e"/><circle cx="20" cy="29" r="2.5" fill="#f97316"/>
                                <text x="55" y="40" textAnchor="middle" fontFamily="Urbanist,sans-serif" fontSize="12" fontWeight="800" fill="white">72</text>
                                <text x="55" y="50" textAnchor="middle" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.35)">Overall</text>
                                <text x="55" y="3.5" textAnchor="middle" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Technical</text>
                                <text x="95" y="27" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Ethical</text>
                                <text x="95" y="62" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Emotional</text>
                                <text x="55" y="87" textAnchor="middle" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Velocity</text>
                                <text x="14" y="62" textAnchor="end" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Comm.</text>
                                <text x="14" y="27" textAnchor="end" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Leader</text>
                              </svg>
                              <div className="mock-br"><span className="mock-bl">🎯 Technical</span><div className="mock-bt"><div className="mock-bf" style={{width:'78%',background:'#3b82f6'}}></div></div><span className="mock-bv" style={{color:'#60a5fa'}}>78</span></div>
                              <div className="mock-br"><span className="mock-bl">💎 Ethical</span><div className="mock-bt"><div className="mock-bf" style={{width:'84%',background:'#a78bfa'}}></div></div><span className="mock-bv" style={{color:'#a78bfa'}}>84</span></div>
                              <div className="mock-br"><span className="mock-bl">❤️ Emotional</span><div className="mock-bt"><div className="mock-bf" style={{width:'71%',background:'#ec4899'}}></div></div><span className="mock-bv" style={{color:'#ec4899'}}>71</span></div>
                              <div className="mock-br"><span className="mock-bl">⚡ Velocity</span><div className="mock-bt"><div className="mock-bf" style={{width:'65%',background:'#f59e0b'}}></div></div><span className="mock-bv" style={{color:'#f59e0b'}}>65</span></div>
                              <div className="mock-br"><span className="mock-bl">💰 Commercial</span><div className="mock-bt"><div className="mock-bf" style={{width:'62%',background:'#22c55e'}}></div></div><span className="mock-bv" style={{color:'#22c55e'}}>62</span></div>
                              <div className="mock-br"><span className="mock-bl">👑 Leadership</span><div className="mock-bt"><div className="mock-bf" style={{width:'74%',background:'#f97316'}}></div></div><span className="mock-bv" style={{color:'#f97316'}}>74</span></div>
                              <div className="mock-anal">
                                <div className="mock-anal-title">✨ Genome Analysis</div>
                                <div className="mock-anal-sub">The Craftsman · Professional</div>
                                <div className="mock-anal-sub">Strongest: Ethical. Focus: Velocity.</div>
                                <div className="mock-anal-link">View Full Report →</div>
                              </div>
                            </div>
                          </div>
                          <div className="mock-nav">
                            <span className="mock-ni">Home</span><span className="mock-ni mock-act">Explore</span><span className="mock-ni">Check-Ins</span><span className="mock-ni">MyRegulars</span><span className="mock-ni">Profile</span>
                          </div>
                        </div>
                        <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
                      </div>

                      {/* Phone 2: Skills Assessment */}
                        <div className="mock-phone mock-offset-2" style={{cursor:'pointer'}} onClick={() => setActiveMockup('onpro-2')}>
                        <div className="mock-sb"><span className="mock-st">8:14 PM</span><div className="mock-si">●●● WiFi ■</div></div>
                        <div className="mock-nr"><div className="mock-nc"></div></div>
                        <div className="mock-scr">
                          <div className="mock-con">
                            <div className="mock-ptitle">Skills Assessment</div>
                            <div className="mock-psub">DAPA PROFESSIONAL EVALUATION</div>
                            <div style={{textAlign:'center',fontSize:'10px',fontWeight:800,color:'#fff',fontFamily:'Urbanist,sans-serif'}}>Prove Your Expertise</div>
                            <div style={{textAlign:'center',fontSize:'6.5px',color:'rgba(255,255,255,0.4)',fontFamily:'Urbanist,sans-serif',lineHeight:1.5}}>Complete adaptive assessments<br/>across 9 hospitality domains.</div>
                            <div className="mock-srow">
                              <div className="mock-sc"><strong>23</strong><span>Completed</span></div>
                              <div className="mock-sc"><strong>9/9</strong><span>Categories</span></div>
                              <div className="mock-sc"><strong>81%</strong><span>Average</span></div>
                              <div className="mock-sc"><strong style={{color:'#a78bfa'}}>Pro</strong><span>Tier</span></div>
                            </div>
                            <div className="mock-choose">Choose Your Assessment</div>
                            <div className="mock-sr mock-hi"><span className="mock-si2">🍸</span><div className="mock-sin"><span className="mock-sn">Mixology</span><span className="mock-ss">Cocktails, spirits & bar craft</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#f59e0b'}}>93%</span><span className="mock-stier" style={{color:'#f59e0b'}}>LEGENDARY</span></div></div>
                            <div className="mock-sr mock-hi"><span className="mock-si2">✨</span><div className="mock-sin"><span className="mock-sn">Customer Service</span><span className="mock-ss">Guest relations & hospitality</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#f59e0b'}}>96%</span><span className="mock-stier" style={{color:'#f59e0b'}}>LEGENDARY</span></div></div>
                            <div className="mock-sr mock-hi"><span className="mock-si2">💻</span><div className="mock-sin"><span className="mock-sn">POS & Technology</span><span className="mock-ss">Point-of-sale & tech systems</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#a78bfa'}}>91%</span><span className="mock-stier" style={{color:'#a78bfa'}}>MASTER</span></div></div>
                            <div className="mock-sr"><span className="mock-si2">🍷</span><div className="mock-sin"><span className="mock-sn">Food & Wine</span><span className="mock-ss">Culinary & wine pairing</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#22c55e'}}>82%</span><span className="mock-stier" style={{color:'#22c55e'}}>PROFESSIONAL</span></div></div>
                            <div className="mock-sr"><span className="mock-si2">🤝</span><div className="mock-sin"><span className="mock-sn">Teamwork</span><span className="mock-ss">Collaboration & leadership</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#60a5fa'}}>74%</span><span className="mock-stier" style={{color:'#60a5fa'}}>SKILLED</span></div></div>
                          </div>
                          <div className="mock-nav">
                            <span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">Check-Ins</span><span className="mock-ni">MyRegulars</span><span className="mock-ni mock-act">Profile</span>
                          </div>
                        </div>
                        <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
                      </div>

                      {/* Phone 3: Reviews / Shoutouts */}
                        <div className="mock-phone mock-offset-3" style={{cursor:'pointer'}} onClick={() => setActiveMockup('onpro-3')}>
                        <div className="mock-sb"><span className="mock-st">9:02 PM</span><div className="mock-si">●●● WiFi ■</div></div>
                        <div className="mock-nr"><div className="mock-nc"></div></div>
                        <div className="mock-scr">
                          <div className="mock-opill"><span>ONPRO</span></div>
                          <div className="mock-tc">
                            <div className="mock-tr"><span style={{fontSize:'14px'}}>🎸</span><div className="mock-tt"><span className="mock-ttt">You're OnTonight!</span><span className="mock-tts">🤚 Manually set to ON</span></div><div className="mock-tp"></div></div>
                            <div className="mock-treset">↻ Reset to Schedule</div>
                            <div style={{fontSize:'6px',color:'rgba(255,255,255,0.3)',textAlign:'center',fontFamily:'Urbanist,sans-serif',marginTop:'2px'}}>💡 Tip: Toggle manually to override your schedule.</div>
                          </div>
                          <div className="mock-ptabs"><span className="mock-ptab">About</span><span className="mock-ptab">Photos (2)</span><span className="mock-ptab">Clips</span><span className="mock-ptab mock-act">Reviews</span><span className="mock-ptab">Manage</span></div>
                          <div className="mock-rlbl">AWAITING YOUR REVIEW</div>
                          <div className="mock-rempty">No shoutouts waiting for review.</div>
                          <div className="mock-rpub">PUBLISHED</div>
                          <div className="mock-sho"><div className="mock-shh"><div className="mock-sha">S</div><div><div className="mock-shn">Sarah M.</div><div className="mock-shr">Regular</div></div></div><span className="mock-sht">Expert Knowledge</span><div className="mock-shq">"He is just truly amazing!"</div></div>
                          <div className="mock-sho"><div className="mock-shh"><div className="mock-sha">J</div><div><div className="mock-shn">James T.</div><div className="mock-shr">Regular</div></div></div><span className="mock-sht">Awesome Service</span><div className="mock-shq">"Best bartender in Tampa."</div></div>
                          <div className="mock-sho"><div className="mock-shh"><div className="mock-sha">M</div><div><div className="mock-shn">Maya R.</div><div className="mock-shr">Regular</div></div></div><span className="mock-sht">Great Personality</span><div className="mock-shq">"Always makes my night."</div></div>
                          <div className="mock-nav">
                            <span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">Check-Ins</span><span className="mock-ni">MyRegulars</span><span className="mock-ni mock-act">Profile</span>
                          </div>
                        </div>
                        <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
                      </div>

                      {/* Phone 4: MyRegulars */}
                        <div className="mock-phone mock-offset-4" style={{cursor:'pointer'}} onClick={() => setActiveMockup('onpro-4')}>
                        <div className="mock-sb"><span className="mock-st">9:44 PM</span><div className="mock-si">●●● WiFi ■</div></div>
                        <div className="mock-nr"><div className="mock-nc"></div></div>
                        <div className="mock-scr">
                          <div className="mock-reg-header">
                            <div className="mock-reg-left"><span style={{fontSize:'18px'}}>⭐</span><div><span className="mock-reg-title">Your Regulars</span><div className="mock-reg-sub">47 people who keep coming back</div></div></div>
                            <div className="mock-reg-btn">Select</div>
                          </div>
                          <div className="mock-reg-lbl">🏆 Top Fans</div>
                          <div className="mock-reg-cards">
                            <div className="mock-reg-card"><span style={{fontSize:'14px'}}>🥇</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#60a5fa,#3b82f6)'}}>S</div><div className="mock-reg-info"><span className="mock-reg-name">Sarah M.</span><div className="mock-reg-visits">14 visits</div></div><span className="mock-reg-badge mock-gold">Gold</span></div>
                            <div className="mock-reg-card"><span style={{fontSize:'14px'}}>🥈</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#a78bfa,#8b5cf6)'}}>J</div><div className="mock-reg-info"><span className="mock-reg-name">James T.</span><div className="mock-reg-visits">11 visits</div></div><span className="mock-reg-badge mock-silver">Silver</span></div>
                            <div className="mock-reg-card"><span style={{fontSize:'14px'}}>🥉</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)'}}>M</div><div className="mock-reg-info"><span className="mock-reg-name">Maya R.</span><div className="mock-reg-visits">9 visits</div></div><span className="mock-reg-badge mock-bronze">Bronze</span></div>
                            <div className="mock-reg-card"><span style={{fontSize:'12px',opacity:0.4}}>★</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#f59e0b,#d97706)'}}>D</div><div className="mock-reg-info"><span className="mock-reg-name">David K.</span><div className="mock-reg-visits">7 visits</div></div><span className="mock-reg-badge mock-gold">Gold</span></div>
                            <div className="mock-reg-card"><span style={{fontSize:'12px',opacity:0.4}}>★</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#ec4899,#be185d)'}}>L</div><div className="mock-reg-info"><span className="mock-reg-name">Lauren B.</span><div className="mock-reg-visits">6 visits</div></div><span className="mock-reg-badge mock-silver">Silver</span></div>
                          </div>
                          <div className="mock-reg-more">+42 more regulars</div>
                          <div className="mock-nav">
                            <span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">Check-Ins</span><span className="mock-ni mock-act">MyRegulars</span><span className="mock-ni">Profile</span>
                          </div>
                        </div>
                        <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
                      </div>

                    </div>
                  </div>
                  <div className="archetypes-section">
                    <h4>OnPro Archetypes</h4>
                    <p>Discover your professional DNA. Which one are you?</p>
                    <div className="archetypes-grid">
                      {onproArchetypes.map((a, i) => (
                        <div key={i} className="archetype-chip">
                          <span>{a.emoji}</span>
                          <div><strong>{a.name}</strong><small>{a.desc}</small></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="accordion-cta">
                    <a href="https://app.on-tonight.com" className="btn-accordion-cta">Claim Your Profile Free →</a>
                  </div>
                </div>
              </div>

              {/* PATRON */}
              <div ref={(el) => accordionRefs.current['patron'] = el} className={`accordion-item ${expandedPlatform === 'patron' ? 'expanded' : ''}`}>
                <button className="accordion-header" onClick={() => handlePlatformAccordion('patron')}>
                  <div className="accordion-title">
                    <span className="accordion-icon">🎩</span>
                    <div>
                      <h3>For Patrons</h3>
                      <p>Guests who value the relationship, not just the drink</p>
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
                          <span className="price-badge">FREE FOREVER</span>
                          <h4>Patron Basic</h4>
                          <ul>
                            <li>Follow unlimited OnPros</li>
                            <li>Real-time notifications</li>
                            <li>Venue discovery</li>
                            <li>Check-in badges</li>
                          </ul>
                        </div>
                        <div className="price-card premium">
                          <span className="price-badge">$4.99/mo — 30 DAYS FREE</span>
                          <h4>Patron Insider</h4>
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
                    <div className="mockup-row">

                      {/* Phone 5: Explore */}
                        <div className="mock-phone" style={{cursor:'pointer'}} onClick={() => setActiveMockup('patron-1')}>
                        <div className="mock-sb"><span className="mock-st">8:37 PM</span><div className="mock-si">●●● WiFi ■</div></div>
                        <div className="mock-nr"><div className="mock-nc"></div></div>
                        <div className="mock-scr">
                          <div className="mock-eh"><div className="mock-esb">🔍 Search name, role, venue, bio...</div><div className="mock-eav">S</div></div>
                          <div className="mock-etabs">
                            <div className="mock-etab mock-etab-act"><div className="mock-od"></div> OnTonight (3)</div>
                            <div className="mock-etab">OnPros (7)</div>
                            <div className="mock-etab">Venues (3)</div>
                            <div className="mock-etab">🗺️ Scene</div>
                          </div>
                          <div className="mock-eslbl">Following (3)</div>
                          <div className="mock-ecards">
                            <div className="mock-ec"><div className="mock-eca" style={{background:'linear-gradient(135deg,#d4a373,#c99763)'}}>A<div className="mock-ering"></div></div><div className="mock-eci"><div className="mock-ecn">Ari Mendez ✦</div><div className="mock-ecr">Bartender</div><div className="mock-ecv">📍 Tampa Venue</div><div className="mock-onb"><div className="mock-od"></div> ON TONIGHT 🤚</div><div className="mock-ect">🕐 5:00 PM – 11:00 PM</div></div><div className="mock-hrt">🤍</div></div>
                            <div className="mock-ec"><div className="mock-eca" style={{background:'linear-gradient(135deg,#60a5fa,#3b82f6)'}}>M<div className="mock-ering"></div></div><div className="mock-eci"><div className="mock-ecn">Melanie R. ✦</div><div className="mock-ecr">Bartender</div><div className="mock-ecv">📍 Rooftop Bar</div><div className="mock-onb"><div className="mock-od"></div> ON TONIGHT 🤚</div><div className="mock-ect">🕐 6:00 PM – 12:00 AM</div></div><div className="mock-hrt">🤍</div></div>
                            <div className="mock-ec"><div className="mock-eca" style={{background:'linear-gradient(135deg,#a78bfa,#8b5cf6)'}}>S<div className="mock-ering"></div></div><div className="mock-eci"><div className="mock-ecn">Stephan K.</div><div className="mock-ecr">Bartender</div><div className="mock-ecv">📍 Tampa Restaurant</div><div className="mock-onb"><div className="mock-od"></div> ON TONIGHT 🤚</div></div><div className="mock-hrt">🤍</div></div>
                          </div>
                          <div className="mock-nav">
                            <span className="mock-ni">Home</span><span className="mock-ni mock-act">Explore</span><span className="mock-ni">MySpots</span><span className="mock-ni">MyPros</span><span className="mock-ni">Profile</span>
                          </div>
                        </div>
                        <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
                      </div>

                      {/* Phone 6: Patron Home */}
                        <div className="mock-phone mock-offset-2" style={{cursor:'pointer'}} onClick={() => setActiveMockup('patron-2')}>
                        <div className="mock-sb"><span className="mock-st">9:51 PM</span><div className="mock-si">●●● WiFi ■</div></div>
                        <div className="mock-nr"><div className="mock-nc"></div></div>
                        <div className="mock-scr">
                          <div className="mock-phw">
                            <div className="mock-phlogo">OnTonight</div>
                            <div className="mock-phtag">Your Night. Your People.<br/>Where Regulars Are Made.</div>
                            <div className="mock-phwel">Welcome back, Sarah!</div>
                            <div className="mock-phbtn">Explore OnTonight</div>
                            <div className="mock-phcard">
                              <div className="mock-phci"><div style={{fontSize:'19px'}}>🍷</div><div><span className="mock-phct">The Connoisseur</span><div className="mock-phcv">🧬 Genome Verified</div></div></div>
                              <div className="mock-phsl">Quality over everything, always</div>
                              <div className="mock-phbtns"><div className="mock-phbp">View Results</div><div className="mock-phbs">Retake</div></div>
                            </div>
                          </div>
                          <div className="mock-nav">
                            <span className="mock-ni mock-act">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">MySpots</span><span className="mock-ni">MyPros</span><span className="mock-ni">Profile</span>
                          </div>
                        </div>
                        <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
                      </div>

                      {/* Phone 7: Patron Genome */}
                        <div className="mock-phone mock-offset-3" style={{cursor:'pointer'}} onClick={() => setActiveMockup('patron-3')}>
                        <div className="mock-sb"><span className="mock-st">10:23 PM</span><div className="mock-si">●●● WiFi ■</div></div>
                        <div className="mock-nr"><div className="mock-nc"></div></div>
                        <div className="mock-scr">
                          <div className="mock-con">
                            <div className="mock-gar"><div style={{fontSize:'20px'}}>🍷</div><div><div className="mock-gn">THE CONNOISSEUR</div><div className="mock-gtag">Quality over everything, always</div></div></div>
                            <div className="mock-gver">🧬 Genome Verified</div>
                            <div className="mock-gdesc">You can taste the terroir. Craft matters, story matters, technique matters. You appreciate mastery and won't settle for less.</div>
                            <div className="mock-gtabs"><div className="mock-gtab mock-act">Overview</div><div className="mock-gtab">Your DNA</div><div className="mock-gtab">Venues</div></div>
                            <div className="mock-gvc">
                              <div className="mock-glbl">Your Perfect Venues</div>
                              <div className="mock-gvl">
                                <div className="mock-gvi">Wine bars</div>
                                <div className="mock-gvi">Craft cocktail lounges</div>
                                <div className="mock-gvi">Omakase</div>
                                <div className="mock-gvi">Michelin-starred</div>
                                <div className="mock-gvi">Third-wave coffee</div>
                              </div>
                            </div>
                            <div className="mock-gsc"><div className="mock-glbl">Your Strength</div><div className="mock-gsv">Discerning taste elevates every experience</div></div>
                          </div>
                          <div className="mock-nav">
                            <span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">MySpots</span><span className="mock-ni">MyPros</span><span className="mock-ni mock-act">Profile</span>
                          </div>
                        </div>
                        <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
                      </div>

                    </div>
                  </div>
                  <div className="archetypes-section patron">
                    <h4>Patron Archetypes</h4>
                    <p>How do you experience hospitality?</p>
                    <div className="archetypes-grid patron-grid">
                      {patronArchetypes.map((a, i) => (
                        <div key={i} className="archetype-chip">
                          <span>{a.emoji}</span>
                          <div><strong>{a.name}</strong><small>{a.desc}</small></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="accordion-cta">
                    <a href="https://app.on-tonight.com" className="btn-accordion-cta">Find Your People →</a>
                  </div>
                </div>
              </div>

              {/* VENUE */}
              <div ref={(el) => accordionRefs.current['venue'] = el} className={`accordion-item ${expandedPlatform === 'venue' ? 'expanded' : ''}`}>
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
                            <li>Advanced analytics dashboard</li>
                            <li>Recruitment pipeline</li>
                            <li>Priority support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="mockup-row">

                      {/* Phone 8: Venue Analytics */}
                        <div className="mock-phone" style={{cursor:'pointer'}} onClick={() => setActiveMockup('venue-1')}>
                        <div className="mock-sb"><span className="mock-st">11:07 PM</span><div className="mock-si">●●● WiFi ■</div></div>
                        <div className="mock-nr"><div className="mock-nc"></div></div>
                        <div className="mock-scr">
                          <div className="mock-vh"><div className="mock-vlogo">🏮</div><div className="mock-vhi"><div className="mock-vhn">Venue Dashboard</div><div className="mock-vhs">Tamps Venue</div></div><div className="mock-vact"><div className="mock-vad"></div> Active</div></div>
                          <div className="mock-vtabs"><div className="mock-vtab">Overview</div><div className="mock-vtab mock-act">Analytics</div><div className="mock-vtab">Profile</div></div>
                          <div className="mock-vper"><div className="mock-vpb">7 Days</div><div className="mock-vpb mock-act">30 Days</div><div className="mock-vpb">90 Days</div><div className="mock-vpb">All Time</div></div>
                          <div className="mock-vstats">
                            <div className="mock-vs"><div style={{fontSize:'13px'}}>✅</div><div className="mock-vsi"><div className="mock-vsn">284</div><div className="mock-vsl">Total Check-Ins</div><div className="mock-vss">9.5 avg/day</div></div><div className="mock-vst">+18%</div></div>
                            <div className="mock-vs"><div style={{fontSize:'13px'}}>👥</div><div className="mock-vsi"><div className="mock-vsn">147</div><div className="mock-vsl">Unique Patrons</div><div className="mock-vss">38 new this month</div></div><div className="mock-vst">+12%</div></div>
                            <div className="mock-vs mock-vs-grn"><div style={{fontSize:'13px'}}>⭐</div><div className="mock-vsi"><div className="mock-vsn" style={{color:'#3ddc6c'}}>63</div><div className="mock-vsl">Total Regulars</div><div className="mock-vss">+8 new this month</div></div><div className="mock-vst">+14%</div></div>
                            <div className="mock-vs"><div style={{fontSize:'13px'}}>🧬</div><div className="mock-vsi"><div className="mock-vsn">8</div><div className="mock-vsl">Verified OnPros</div><div className="mock-vss">Avg DAPA: 81%</div></div></div>
                          </div>
                          <div className="mock-nav">
                            <span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">Staff</span><span className="mock-ni mock-act">Analytics</span><span className="mock-ni">Profile</span>
                          </div>
                        </div>
                        <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
                      </div>

                    </div>
                  </div>
                  <div className="accordion-cta">
                    <a href="/partner" className="btn-accordion-cta secondary">Partner With Us →</a>
                  </div>
                </div>
              </div>

              {/* THE SCIENCE */}
              <div ref={(el) => accordionRefs.current['science'] = el} className={`accordion-item science ${expandedPlatform === 'science' ? 'expanded' : ''}`}>
                <button className="accordion-header" onClick={() => handlePlatformAccordion('science')}>
                  <div className="accordion-title">
                    <span className="accordion-icon">🧬</span>
                    <div>
                      <h3>The Science</h3>
                      <p>Proprietary assessment technology built from the ground up</p>
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
                        <li><strong>600+</strong> questions across 9 professional categories</li>
                        <li><strong>6-Axis Genome:</strong> Technical · Ethical · Emotional · Velocity · Commercial · Leadership</li>
                        <li><strong>Adaptive difficulty</strong> that responds in real time to performance</li>
                        <li><strong>Moral gradient scoring</strong> for nuanced ethical assessment</li>
                        <li><strong>Anti-gaming protection</strong> via scenario-based questioning</li>
                      </ul>
                      <p className="science-value">The most comprehensive hospitality skills assessment ever built.</p>
                    </div>
                    <div className="science-card genome">
                      <h4>OnScene Genome™</h4>
                      <p className="science-subtitle">Hospitality Personality Assessment</p>
                      <ul>
                        <li><strong>45</strong> questions across 10 personality dimensions</li>
                        <li><strong>20 unique archetypes</strong> for both pros and patrons</li>
                        <li><strong>Visual preference testing</strong> for subconscious insight</li>
                        <li><strong>Scenario-based responses</strong> for behavioral mapping</li>
                        <li><strong>Value alignment scoring</strong> for authentic matching</li>
                      </ul>
                      <p className="science-value">Personality-driven connections and intelligent recommendations.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* FOUNDER'S VISION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="vision" className="section-vision">
          <div className="container">
            <div className={`section-header animate-on-scroll ${visibleSections['vision-header'] ? 'visible' : ''}`} id="vision-header">
              <div className="founder-intro">
                <div className="founder-photo">
                  {/* Photo placeholder — swap src when available */}
                  <span>👤</span>
                </div>
                <div className="founder-text">
                  <h2>Jack H. Joy Jr.</h2>
                  <p>Founder & CEO · OnTonight</p>
                  <p className="founder-years">27 Years in Hospitality</p>
                </div>
              </div>
              <p className="founder-tagline">Built by someone who lived the gap. Built for everyone still in it.</p>
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

            {/* Investor callout — subtle, present */}
            <div className={`investor-block animate-on-scroll ${visibleSections['investor-block'] ? 'visible' : ''}`} id="investor-block">
              <div className="investor-inner">
                <div className="investor-left">
                  <div className="investor-label">FOR INVESTORS & PARTNERS</div>
                  <p>OnTonight is actively growing. We're building the professional infrastructure that hospitality has needed for a century — and we're looking for partners who see what we see.</p>
                </div>
                <a href="/investors" className="btn-investor">Get in Touch →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* PRIMARY CTA — The close */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="waitlist" className="section-waitlist">
          <div className="container">
            <div className={`waitlist-content animate-on-scroll ${visibleSections['waitlist-content'] ? 'visible' : ''}`} id="waitlist-content">
              {!submitted ? (
                <>
                  <div className="waitlist-eyebrow">JOIN THE MOVEMENT</div>
                  <h2>Your Career Starts Here.</h2>
                  <p className="waitlist-subtitle">
                    The app is live. Your profile is waiting. Your regulars want to find you.
                  </p>

                  <div className="cta-primary-block">
                    <a href="https://app.on-tonight.com" className="btn-cta-large">
                      Claim Your Profile Free →
                    </a>
                    <p className="cta-sub-text">30 days free · No credit card · Live in Tampa Bay</p>
                  </div>

                  <div className="waitlist-divider">
                    <span>or get notified about expansion to your city</span>
                  </div>

                  <form onSubmit={handleSubmit} className="waitlist-form">
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <select
                        value={formData.userType}
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                        required
                      >
                        <option value="">I am a...</option>
                        <option value="onpro">Hospitality Professional (OnPro)</option>
                        <option value="patron">Patron / Guest</option>
                        <option value="venue">Venue Owner / Operator</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Your City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <p className="form-disclaimer">No spam. No selling your data. Just an update when we're in your city.</p>
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? 'Submitting...' : 'Notify Me When You\'re Here →'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="waitlist-success">
                  <div className="success-icon">🎉</div>
                  <h2>Welcome to the Movement</h2>
                  <p>You're in. We'll be in touch when OnTonight hits your city. In the meantime — if you're in Tampa Bay, you can start right now.</p>
                  <a href="https://app.on-tonight.com" className="btn-primary">Claim Your Profile Now →</a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* FOOTER */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-logo">OnTonight</div>
                <p className="footer-tagline-text">Your Night. Your People.<br />Where Regulars Are Made.</p>
                <p className="footer-location">🌴 Tampa Bay, FL · Expanding 2026</p>
              </div>
              <div className="footer-links">
                <h4>Company</h4>
                <a href="/support">Support</a>
                <a href="/careers">Careers</a>
                <a href="/contact">Contact</a>
              </div>
              <div className="footer-links">
                <h4>Legal</h4>
                <a href="https://app.on-tonight.com/#/privacy">Privacy Policy</a>
                <a href="https://app.on-tonight.com/#/terms">Terms of Service</a>
              </div>
              <div className="footer-links">
                <h4>Connect</h4>
                <a href="/media">Press & Media</a>
                <a href="/partner">Partner With Us</a>
                <a href="https://app.on-tonight.com" className="footer-app-link">Launch App →</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} OnTonight LLC · Delaware LLC · OnTonight™ and OnPros™ are registered trademarks.</p>
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

{/* MOCKUP LIGHTBOX */}
  {activeMockup && (
    <div className="mockup-lightbox" onClick={() => setActiveMockup(null)}>
      <button className="mockup-lightbox-close" onClick={(e) => { e.stopPropagation(); setActiveMockup(null); }}>×</button>
      <div className="mockup-lightbox-hint">Tap anywhere to close</div>
      <div className="mock-phone mockup-lightbox-phone" onClick={(e) => e.stopPropagation()}>
        {activeMockup === 'onpro-1' && <>
          <div className="mock-sb"><span className="mock-st">7:48 PM</span><div className="mock-si">●●● WiFi ■</div></div>
          <div className="mock-nr"><div className="mock-nc"></div></div>
          <div className="mock-scr">
            <div className="mock-con">
              <div className="mock-ptitle">Assessment Dashboard</div>
              <div className="mock-psub">YOUR PROFESSIONAL ANALYTICS</div>
              <div className="mock-card">
                <div className="mock-ctitle">🧬 Overall Genome Profile</div>
                <div className="mock-arch-row"><span className="mock-tier">PROFESSIONAL</span><span className="mock-aname">The Craftsman</span></div>
                <svg width="100%" height="90" viewBox="0 0 110 90" style={{display:'block',margin:'2px 0 5px'}}>
                  <polygon points="55,6 86,24 86,58 55,76 24,58 24,24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <polygon points="55,18 74,30 74,52 55,64 36,52 36,30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <polygon points="55,30 63,36 63,46 55,52 47,46 47,36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <line x1="55" y1="6" x2="55" y2="76" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                  <line x1="86" y1="24" x2="24" y2="58" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                  <line x1="86" y1="58" x2="24" y2="24" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                  <polygon points="55,12 81,32 77,57 55,64 22,55 20,29" fill="rgba(212,163,115,0.16)" stroke="#d4a373" strokeWidth="1.5"/>
                  <circle cx="55" cy="12" r="2.5" fill="#3b82f6"/><circle cx="81" cy="32" r="2.5" fill="#a78bfa"/>
                  <circle cx="77" cy="57" r="2.5" fill="#ec4899"/><circle cx="55" cy="64" r="2.5" fill="#f59e0b"/>
                  <circle cx="22" cy="55" r="2.5" fill="#22c55e"/><circle cx="20" cy="29" r="2.5" fill="#f97316"/>
                  <text x="55" y="40" textAnchor="middle" fontFamily="Urbanist,sans-serif" fontSize="12" fontWeight="800" fill="white">72</text>
                  <text x="55" y="50" textAnchor="middle" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.35)">Overall</text>
                  <text x="55" y="3.5" textAnchor="middle" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Technical</text>
                  <text x="95" y="27" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Ethical</text>
                  <text x="95" y="62" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Emotional</text>
                  <text x="55" y="87" textAnchor="middle" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Velocity</text>
                  <text x="14" y="62" textAnchor="end" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Comm.</text>
                  <text x="14" y="27" textAnchor="end" fontFamily="Urbanist,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.4)">Leader</text>
                </svg>
                <div className="mock-br"><span className="mock-bl">🎯 Technical</span><div className="mock-bt"><div className="mock-bf" style={{width:'78%',background:'#3b82f6'}}></div></div><span className="mock-bv" style={{color:'#60a5fa'}}>78</span></div>
                <div className="mock-br"><span className="mock-bl">💎 Ethical</span><div className="mock-bt"><div className="mock-bf" style={{width:'84%',background:'#a78bfa'}}></div></div><span className="mock-bv" style={{color:'#a78bfa'}}>84</span></div>
                <div className="mock-br"><span className="mock-bl">❤️ Emotional</span><div className="mock-bt"><div className="mock-bf" style={{width:'71%',background:'#ec4899'}}></div></div><span className="mock-bv" style={{color:'#ec4899'}}>71</span></div>
                <div className="mock-br"><span className="mock-bl">⚡ Velocity</span><div className="mock-bt"><div className="mock-bf" style={{width:'65%',background:'#f59e0b'}}></div></div><span className="mock-bv" style={{color:'#f59e0b'}}>65</span></div>
                <div className="mock-br"><span className="mock-bl">💰 Commercial</span><div className="mock-bt"><div className="mock-bf" style={{width:'62%',background:'#22c55e'}}></div></div><span className="mock-bv" style={{color:'#22c55e'}}>62</span></div>
                <div className="mock-br"><span className="mock-bl">👑 Leadership</span><div className="mock-bt"><div className="mock-bf" style={{width:'74%',background:'#f97316'}}></div></div><span className="mock-bv" style={{color:'#f97316'}}>74</span></div>
                <div className="mock-anal">
                  <div className="mock-anal-title">✨ Genome Analysis</div>
                  <div className="mock-anal-sub">The Craftsman · Professional</div>
                  <div className="mock-anal-sub">Strongest: Ethical. Focus: Velocity.</div>
                  <div className="mock-anal-link">View Full Report →</div>
                </div>
              </div>
            </div>
            <div className="mock-nav"><span className="mock-ni">Home</span><span className="mock-ni mock-act">Explore</span><span className="mock-ni">Check-Ins</span><span className="mock-ni">MyRegulars</span><span className="mock-ni">Profile</span></div>
          </div>
          <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
        </>}
        {activeMockup === 'onpro-2' && <>
          <div className="mock-sb"><span className="mock-st">8:14 PM</span><div className="mock-si">●●● WiFi ■</div></div>
          <div className="mock-nr"><div className="mock-nc"></div></div>
          <div className="mock-scr">
            <div className="mock-con">
              <div className="mock-ptitle">Skills Assessment</div>
              <div className="mock-psub">DAPA PROFESSIONAL EVALUATION</div>
              <div style={{textAlign:'center',fontSize:'10px',fontWeight:800,color:'#fff',fontFamily:'Urbanist,sans-serif'}}>Prove Your Expertise</div>
              <div style={{textAlign:'center',fontSize:'6.5px',color:'rgba(255,255,255,0.4)',fontFamily:'Urbanist,sans-serif',lineHeight:1.5}}>Complete adaptive assessments<br/>across 9 hospitality domains.</div>
              <div className="mock-srow">
                <div className="mock-sc"><strong>23</strong><span>Completed</span></div>
                <div className="mock-sc"><strong>9/9</strong><span>Categories</span></div>
                <div className="mock-sc"><strong>81%</strong><span>Average</span></div>
                <div className="mock-sc"><strong style={{color:'#a78bfa'}}>Pro</strong><span>Tier</span></div>
              </div>
              <div className="mock-choose">Choose Your Assessment</div>
              <div className="mock-sr mock-hi"><span className="mock-si2">🍸</span><div className="mock-sin"><span className="mock-sn">Mixology</span><span className="mock-ss">Cocktails, spirits & bar craft</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#f59e0b'}}>93%</span><span className="mock-stier" style={{color:'#f59e0b'}}>LEGENDARY</span></div></div>
              <div className="mock-sr mock-hi"><span className="mock-si2">✨</span><div className="mock-sin"><span className="mock-sn">Customer Service</span><span className="mock-ss">Guest relations & hospitality</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#f59e0b'}}>96%</span><span className="mock-stier" style={{color:'#f59e0b'}}>LEGENDARY</span></div></div>
              <div className="mock-sr mock-hi"><span className="mock-si2">💻</span><div className="mock-sin"><span className="mock-sn">POS & Technology</span><span className="mock-ss">Point-of-sale & tech systems</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#a78bfa'}}>91%</span><span className="mock-stier" style={{color:'#a78bfa'}}>MASTER</span></div></div>
              <div className="mock-sr"><span className="mock-si2">🍷</span><div className="mock-sin"><span className="mock-sn">Food & Wine</span><span className="mock-ss">Culinary & wine pairing</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#22c55e'}}>82%</span><span className="mock-stier" style={{color:'#22c55e'}}>PROFESSIONAL</span></div></div>
              <div className="mock-sr"><span className="mock-si2">🤝</span><div className="mock-sin"><span className="mock-sn">Teamwork</span><span className="mock-ss">Collaboration & leadership</span></div><div className="mock-ssc"><span className="mock-spct" style={{color:'#60a5fa'}}>74%</span><span className="mock-stier" style={{color:'#60a5fa'}}>SKILLED</span></div></div>
            </div>
            <div className="mock-nav"><span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">Check-Ins</span><span className="mock-ni">MyRegulars</span><span className="mock-ni mock-act">Profile</span></div>
          </div>
          <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
        </>}
        {activeMockup === 'onpro-3' && <>
          <div className="mock-sb"><span className="mock-st">9:02 PM</span><div className="mock-si">●●● WiFi ■</div></div>
          <div className="mock-nr"><div className="mock-nc"></div></div>
          <div className="mock-scr">
            <div className="mock-opill"><span>ONPRO</span></div>
            <div className="mock-tc">
              <div className="mock-tr"><span style={{fontSize:'14px'}}>🎸</span><div className="mock-tt"><span className="mock-ttt">You're OnTonight!</span><span className="mock-tts">🤚 Manually set to ON</span></div><div className="mock-tp"></div></div>
              <div className="mock-treset">↻ Reset to Schedule</div>
              <div style={{fontSize:'6px',color:'rgba(255,255,255,0.3)',textAlign:'center',fontFamily:'Urbanist,sans-serif',marginTop:'2px'}}>💡 Tip: Toggle manually to override your schedule.</div>
            </div>
            <div className="mock-ptabs"><span className="mock-ptab">About</span><span className="mock-ptab">Photos (2)</span><span className="mock-ptab">Clips</span><span className="mock-ptab mock-act">Reviews</span><span className="mock-ptab">Manage</span></div>
            <div className="mock-rlbl">AWAITING YOUR REVIEW</div>
            <div className="mock-rempty">No shoutouts waiting for review.</div>
            <div className="mock-rpub">PUBLISHED</div>
            <div className="mock-sho"><div className="mock-shh"><div className="mock-sha">S</div><div><div className="mock-shn">Sarah M.</div><div className="mock-shr">Regular</div></div></div><span className="mock-sht">Expert Knowledge</span><div className="mock-shq">"He is just truly amazing!"</div></div>
            <div className="mock-sho"><div className="mock-shh"><div className="mock-sha">J</div><div><div className="mock-shn">James T.</div><div className="mock-shr">Regular</div></div></div><span className="mock-sht">Awesome Service</span><div className="mock-shq">"Best bartender in Tampa."</div></div>
            <div className="mock-sho"><div className="mock-shh"><div className="mock-sha">M</div><div><div className="mock-shn">Maya R.</div><div className="mock-shr">Regular</div></div></div><span className="mock-sht">Great Personality</span><div className="mock-shq">"Always makes my night."</div></div>
            <div className="mock-nav"><span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">Check-Ins</span><span className="mock-ni">MyRegulars</span><span className="mock-ni mock-act">Profile</span></div>
          </div>
          <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
        </>}
        {activeMockup === 'onpro-4' && <>
          <div className="mock-sb"><span className="mock-st">9:44 PM</span><div className="mock-si">●●● WiFi ■</div></div>
          <div className="mock-nr"><div className="mock-nc"></div></div>
          <div className="mock-scr">
            <div className="mock-reg-header">
              <div className="mock-reg-left"><span style={{fontSize:'18px'}}>⭐</span><div><span className="mock-reg-title">Your Regulars</span><div className="mock-reg-sub">47 people who keep coming back</div></div></div>
              <div className="mock-reg-btn">Select</div>
            </div>
            <div className="mock-reg-lbl">🏆 Top Fans</div>
            <div className="mock-reg-cards">
              <div className="mock-reg-card"><span style={{fontSize:'14px'}}>🥇</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#60a5fa,#3b82f6)'}}>S</div><div className="mock-reg-info"><span className="mock-reg-name">Sarah M.</span><div className="mock-reg-visits">14 visits</div></div><span className="mock-reg-badge mock-gold">Gold</span></div>
              <div className="mock-reg-card"><span style={{fontSize:'14px'}}>🥈</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#a78bfa,#8b5cf6)'}}>J</div><div className="mock-reg-info"><span className="mock-reg-name">James T.</span><div className="mock-reg-visits">11 visits</div></div><span className="mock-reg-badge mock-silver">Silver</span></div>
              <div className="mock-reg-card"><span style={{fontSize:'14px'}}>🥉</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)'}}>M</div><div className="mock-reg-info"><span className="mock-reg-name">Maya R.</span><div className="mock-reg-visits">9 visits</div></div><span className="mock-reg-badge mock-bronze">Bronze</span></div>
              <div className="mock-reg-card"><span style={{fontSize:'12px',opacity:0.4}}>★</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#f59e0b,#d97706)'}}>D</div><div className="mock-reg-info"><span className="mock-reg-name">David K.</span><div className="mock-reg-visits">7 visits</div></div><span className="mock-reg-badge mock-gold">Gold</span></div>
              <div className="mock-reg-card"><span style={{fontSize:'12px',opacity:0.4}}>★</span><div className="mock-reg-av" style={{background:'linear-gradient(135deg,#ec4899,#be185d)'}}>L</div><div className="mock-reg-info"><span className="mock-reg-name">Lauren B.</span><div className="mock-reg-visits">6 visits</div></div><span className="mock-reg-badge mock-silver">Silver</span></div>
            </div>
            <div className="mock-reg-more">+42 more regulars</div>
            <div className="mock-nav"><span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">Check-Ins</span><span className="mock-ni mock-act">MyRegulars</span><span className="mock-ni">Profile</span></div>
          </div>
          <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
        </>}
        {activeMockup === 'patron-1' && <>
          <div className="mock-sb"><span className="mock-st">8:37 PM</span><div className="mock-si">●●● WiFi ■</div></div>
          <div className="mock-nr"><div className="mock-nc"></div></div>
          <div className="mock-scr">
            <div className="mock-eh"><div className="mock-esb">🔍 Search name, role, venue, bio...</div><div className="mock-eav">S</div></div>
            <div className="mock-etabs">
              <div className="mock-etab mock-etab-act"><div className="mock-od"></div> OnTonight (3)</div>
              <div className="mock-etab">OnPros (7)</div>
              <div className="mock-etab">Venues (3)</div>
              <div className="mock-etab">🗺️ Scene</div>
            </div>
            <div className="mock-eslbl">Following (3)</div>
            <div className="mock-ecards">
              <div className="mock-ec"><div className="mock-eca" style={{background:'linear-gradient(135deg,#d4a373,#c99763)'}}>A<div className="mock-ering"></div></div><div className="mock-eci"><div className="mock-ecn">Ari Mendez ✦</div><div className="mock-ecr">Bartender</div><div className="mock-ecv">📍 Tampa Venue</div><div className="mock-onb"><div className="mock-od"></div> ON TONIGHT 🤚</div><div className="mock-ect">🕐 5:00 PM – 11:00 PM</div></div><div className="mock-hrt">🤍</div></div>
              <div className="mock-ec"><div className="mock-eca" style={{background:'linear-gradient(135deg,#60a5fa,#3b82f6)'}}>M<div className="mock-ering"></div></div><div className="mock-eci"><div className="mock-ecn">Melanie R. ✦</div><div className="mock-ecr">Bartender</div><div className="mock-ecv">📍 Rooftop Bar</div><div className="mock-onb"><div className="mock-od"></div> ON TONIGHT 🤚</div><div className="mock-ect">🕐 6:00 PM – 12:00 AM</div></div><div className="mock-hrt">🤍</div></div>
              <div className="mock-ec"><div className="mock-eca" style={{background:'linear-gradient(135deg,#a78bfa,#8b5cf6)'}}>S<div className="mock-ering"></div></div><div className="mock-eci"><div className="mock-ecn">Stephan K.</div><div className="mock-ecr">Bartender</div><div className="mock-ecv">📍 Tampa Bar</div><div className="mock-onb"><div className="mock-od"></div> ON TONIGHT 🤚</div></div><div className="mock-hrt">🤍</div></div>
            </div>
            <div className="mock-nav"><span className="mock-ni">Home</span><span className="mock-ni mock-act">Explore</span><span className="mock-ni">MySpots</span><span className="mock-ni">MyPros</span><span className="mock-ni">Profile</span></div>
          </div>
          <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
        </>}
        {activeMockup === 'patron-2' && <>
          <div className="mock-sb"><span className="mock-st">9:51 PM</span><div className="mock-si">●●● WiFi ■</div></div>
          <div className="mock-nr"><div className="mock-nc"></div></div>
          <div className="mock-scr">
            <div className="mock-phw">
              <div className="mock-phlogo">OnTonight</div>
              <div className="mock-phtag">Your Night. Your People.<br/>Where Regulars Are Made.</div>
              <div className="mock-phwel">Welcome back, Sarah!</div>
              <div className="mock-phbtn">Explore OnTonight</div>
              <div className="mock-phcard">
                <div className="mock-phci"><div style={{fontSize:'19px'}}>🍷</div><div><span className="mock-phct">The Connoisseur</span><div className="mock-phcv">🧬 Genome Verified</div></div></div>
                <div className="mock-phsl">Quality over everything, always</div>
                <div className="mock-phbtns"><div className="mock-phbp">View Results</div><div className="mock-phbs">Retake</div></div>
              </div>
            </div>
            <div className="mock-nav"><span className="mock-ni mock-act">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">MySpots</span><span className="mock-ni">MyPros</span><span className="mock-ni">Profile</span></div>
          </div>
          <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
        </>}
        {activeMockup === 'patron-3' && <>
          <div className="mock-sb"><span className="mock-st">10:23 PM</span><div className="mock-si">●●● WiFi ■</div></div>
          <div className="mock-nr"><div className="mock-nc"></div></div>
          <div className="mock-scr">
            <div className="mock-con">
              <div className="mock-gar"><div style={{fontSize:'20px'}}>🍷</div><div><div className="mock-gn">THE CONNOISSEUR</div><div className="mock-gtag">Quality over everything, always</div></div></div>
              <div className="mock-gver">🧬 Genome Verified</div>
              <div className="mock-gdesc">You can taste the terroir. Craft matters, story matters, technique matters. You appreciate mastery and won't settle for less.</div>
              <div className="mock-gtabs"><div className="mock-gtab mock-act">Overview</div><div className="mock-gtab">Your DNA</div><div className="mock-gtab">Venues</div></div>
              <div className="mock-gvc">
                <div className="mock-glbl">Your Perfect Venues</div>
                <div className="mock-gvl">
                  <div className="mock-gvi">Wine bars</div>
                  <div className="mock-gvi">Craft cocktail lounges</div>
                  <div className="mock-gvi">Omakase</div>
                  <div className="mock-gvi">Michelin-starred</div>
                  <div className="mock-gvi">Third-wave coffee</div>
                </div>
              </div>
              <div className="mock-gsc"><div className="mock-glbl">Your Strength</div><div className="mock-gsv">Discerning taste elevates every experience</div></div>
            </div>
            <div className="mock-nav"><span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">MySpots</span><span className="mock-ni">MyPros</span><span className="mock-ni mock-act">Profile</span></div>
          </div>
          <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
        </>}
        {activeMockup === 'venue-1' && <>
          <div className="mock-sb"><span className="mock-st">11:07 PM</span><div className="mock-si">●●● WiFi ■</div></div>
          <div className="mock-nr"><div className="mock-nc"></div></div>
          <div className="mock-scr">
            <div className="mock-vh"><div className="mock-vlogo">🏮</div><div className="mock-vhi"><div className="mock-vhn">Venue Dashboard</div><div className="mock-vhs">Tampa Venue</div></div><div className="mock-vact"><div className="mock-vad"></div> Active</div></div>
            <div className="mock-vtabs"><div className="mock-vtab">Overview</div><div className="mock-vtab mock-act">Analytics</div><div className="mock-vtab">Profile</div></div>
            <div className="mock-vper"><div className="mock-vpb">7 Days</div><div className="mock-vpb mock-act">30 Days</div><div className="mock-vpb">90 Days</div><div className="mock-vpb">All Time</div></div>
            <div className="mock-vstats">
              <div className="mock-vs"><div style={{fontSize:'13px'}}>✅</div><div className="mock-vsi"><div className="mock-vsn">284</div><div className="mock-vsl">Total Check-Ins</div><div className="mock-vss">9.5 avg/day</div></div><div className="mock-vst">+18%</div></div>
              <div className="mock-vs"><div style={{fontSize:'13px'}}>👥</div><div className="mock-vsi"><div className="mock-vsn">147</div><div className="mock-vsl">Unique Patrons</div><div className="mock-vss">38 new this month</div></div><div className="mock-vst">+12%</div></div>
              <div className="mock-vs mock-vs-grn"><div style={{fontSize:'13px'}}>⭐</div><div className="mock-vsi"><div className="mock-vsn" style={{color:'#3ddc6c'}}>63</div><div className="mock-vsl">Total Regulars</div><div className="mock-vss">+8 new this month</div></div><div className="mock-vst">+14%</div></div>
              <div className="mock-vs"><div style={{fontSize:'13px'}}>🧬</div><div className="mock-vsi"><div className="mock-vsn">8</div><div className="mock-vsl">Verified OnPros</div><div className="mock-vss">Avg DAPA: 81%</div></div></div>
            </div>
            <div className="mock-nav"><span className="mock-ni">Home</span><span className="mock-ni">Explore</span><span className="mock-ni">Staff</span><span className="mock-ni mock-act">Analytics</span><span className="mock-ni">Profile</span></div>
          </div>
          <div className="mock-hb"><div className="mock-hbl"></div><div className="mock-hbc"></div><div className="mock-hbt"></div></div>
        </>}
      </div>
    </div>
  )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* STYLES */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <style jsx>{`
        :global(html), :global(body) { overflow-x: hidden; max-width: 100vw; }
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .page {
          font-family: 'Urbanist', -apple-system, sans-serif;
          background: #0a121b;
          color: #f8fafc;
          min-height: 100vh;
          overflow-x: hidden;
          max-width: 100vw;
        }

        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        /* SCROLL PROGRESS */
        .scroll-progress {
          position: fixed; top: 0; left: 0; height: 3px;
          background: linear-gradient(90deg, #d4a373, #e0b68a);
          z-index: 9999; transition: width 0.05s linear;
        }

        /* PARTICLES */
        .particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .particle {
          position: absolute; width: 2px; height: 2px;
          background: rgba(232, 196, 154, 0.4); border-radius: 50%;
          animation: float-particle linear infinite;
        }
        @keyframes float-particle {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.6; } 90% { opacity: 0.6; }
          100% { transform: translateY(-20vh) scale(1); opacity: 0; }
        }

        /* ANIMATIONS */
        .animate-on-scroll {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .animate-on-scroll.visible { opacity: 1; transform: translateY(0); }

        /* ── HERO REVEAL SEQUENCE ───────────────────────────────────────────
           Premium staggered entrance. Brand materializes first with pure
           opacity — no movement, no jump. Everything else follows with
           generous breathing room. Total sequence ~4.2s. Unhurried.
        ──────────────────────────────────────────────────────────────────── */

        /* Brand: pure opacity only — no translateY, no jump */
        @keyframes brandAppear {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Tagline + typewriter: very subtle lift, 10px max */
        @keyframes heroLift {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Epigraph: opacity + imperceptible scale breathe */
        @keyframes epigraphIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Cards + CTA: gentle rise, unhurried */
        @keyframes heroRise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* 1 — Brand: pure fade, 1.2s, silence before it appears */
        .hero-reveal-1 {
          opacity: 0;
          animation: brandAppear 1.2s ease 0.2s forwards;
        }

        /* 2 — Tagline: subtle lift after brand fully settles */
        .hero-reveal-2 {
          opacity: 0;
          animation: heroLift 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.4s forwards;
        }

        /* 3 — Epigraph: breathes in softly after tagline is read */
        .hero-reveal-3 {
          opacity: 0;
          animation: epigraphIn 1.2s ease 2.2s forwards;
        }

        /* 4 — Typewriter: fades in once page has settled */
        .hero-reveal-4 {
          opacity: 0;
          animation: heroLift 0.9s ease 3.0s forwards;
        }

        /* 5 — Cards + CTA: final act, generous delay, drifts up together */
        .hero-reveal-5 {
          opacity: 0;
          animation: heroRise 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) 3.4s forwards;
        }

        /* SECTION EYEBROW */
        .section-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
          color: #d4a373; text-transform: uppercase; margin-bottom: 12px;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          background: rgba(10, 18, 27, 0.96); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(232, 196, 154, 0.1); z-index: 1000;
        }
        .nav-container {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 24px; max-width: 1100px; margin: 0 auto;
        }
        .nav-live-badge {
          display: flex; align-items: center; gap: 10px; font-size: 12px;
          font-weight: 500; letter-spacing: 0.1em; color: #d4a373;
        }
        .badge-dot {
          width: 8px; height: 8px; background: #22c55e; border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.9); } }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-links a { color: rgba(248, 250, 252, 0.6); text-decoration: none; font-size: 14px; font-weight: 400; transition: color 0.2s; }
        .nav-links a:hover { color: #f8fafc; }
        .nav-cta { background: #d4a373 !important; color: #0c1520 !important; padding: 10px 24px !important; border-radius: 6px; font-weight: 600 !important; }

        /* HERO */
        .hero {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          text-align: center; position: relative; padding: 120px 24px 80px;
        }
        .hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(232, 196, 154, 0.07) 0%, transparent 50%);
          pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute; bottom: -200px; right: -100px; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 50%);
          pointer-events: none;
        }
        .hero .container { position: relative; z-index: 1; }

        /* HERO BRAND — enters first, dominates */
        .hero-brand-badge {
          font-size: clamp(60px, 12vw, 100px); font-weight: 500;
          color: #e8c49a; margin-bottom: 12px; letter-spacing: -0.03em;
          line-height: 1;
        }

        /* EPIGRAPH — emotional pull quote, subordinate to brand */
        .hero-epigraph {
          display: flex; flex-direction: column; gap: 2px;
          margin: 24px 0 20px;
        }
        .epigraph-line {
          display: block; font-size: clamp(13px, 1.8vw, 16px);
          font-weight: 300; font-style: italic;
          color: rgba(248, 250, 252, 0.38); line-height: 1.7;
          letter-spacing: 0.01em;
        }
        .epigraph-line.accent {
          color: rgba(232, 196, 154, 0.55); font-weight: 400;
        }

        /* TAGLINE */
        .hero-tagline { margin: 0 0 0; }
        .tagline-line {
          display: block; font-size: clamp(18px, 3vw, 26px);
          font-weight: 300; color: rgba(248, 250, 252, 0.85); line-height: 1.45;
        }
        .tagline-line-2 {
          display: block; font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 300; color: rgba(248, 250, 252, 0.6); line-height: 1.45;
        }

        /* TYPEWRITER */
        .hero-descriptor {
          font-size: clamp(13px, 1.8vw, 16px); font-weight: 300;
          color: rgba(248, 250, 252, 0.45); margin-bottom: 36px; min-height: 24px;
          font-style: italic;
        }
        .typed-text { color: rgba(212, 163, 115, 0.8); }
        .cursor { animation: blink 1s step-end infinite; color: #d4a373; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* WHO ARE YOU CARDS */
        .who-are-you { margin-bottom: 40px; }
        .who-label { font-size: 12px; font-weight: 500; color: rgba(248,250,252,0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; }
        .who-options { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .who-card {
          width: 200px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
          background: rgba(255,255,255,0.02); overflow: hidden;
          transition: border-color 0.3s ease; text-align: left;
        }
        .who-card.expanded { border-color: rgba(212,163,115,0.3); background: rgba(212,163,115,0.03); }
        .who-card-header {
          width: 100%; display: flex; align-items: center; gap: 10px;
          padding: 14px 16px; background: none; border: none; cursor: pointer;
          color: #f8fafc; -webkit-tap-highlight-color: transparent;
        }
        .who-icon { font-size: 22px; flex-shrink: 0; }
        .who-title { flex: 1; text-align: left; }
        .who-title strong { display: block; font-size: 13px; font-weight: 600; color: #f8fafc; }
        .term-badge { font-size: 10px; color: #d4a373; font-weight: 500; }
        .who-toggle { color: #d4a373; font-size: 18px; font-weight: 300; }
        .who-card-content {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
          padding: 0 16px;
        }
        .who-card.expanded .who-card-content { max-height: 200px; padding: 0 16px 12px; }
        .who-card-content p { font-size: 12px; line-height: 1.6; color: rgba(248,250,252,0.6); font-weight: 300; margin-bottom: 10px; }
        .who-cta {
          display: block; width: calc(100% - 32px); margin: 0 16px 12px;
          padding: 9px; background: rgba(212,163,115,0.15);
          border: 1px solid rgba(212,163,115,0.3); border-radius: 6px;
          color: #d4a373; font-size: 12px; font-weight: 600; cursor: pointer;
          transition: all 0.2s; text-align: center;
        }
        .who-cta:hover { background: rgba(212,163,115,0.25); }

        /* HERO CTA */
        .hero-cta-block { margin-top: 8px; }
        .btn-hero-primary {
          display: inline-block; padding: 16px 40px;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0c1520; font-size: 16px; font-weight: 700;
          border-radius: 8px; text-decoration: none; border: none; cursor: pointer;
          transition: all 0.3s ease; letter-spacing: 0.01em;
        }
        .btn-hero-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(212,163,115,0.3); }
        .hero-cta-sub { margin-top: 12px; font-size: 12px; color: rgba(248,250,252,0.35); font-weight: 300; }

        /* SCROLL HINT */
        .scroll-hint {
          position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: rgba(248,250,252,0.3); font-size: 11px; font-weight: 300;
          animation: bounce 2s infinite; z-index: 10;
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* SECTION HEADERS */
        .section-header { text-align: center; margin-bottom: 50px; }
        .section-header h2 { font-size: clamp(26px, 4vw, 38px); font-weight: 600; margin: 0 0 14px; }
        .section-header p { font-size: 15px; font-weight: 300; color: rgba(248,250,252,0.6); max-width: 600px; margin: 0 auto; line-height: 1.7; }

        /* HUMAN COST SECTION */
        .section-human-cost {
          padding: 80px 0; background: linear-gradient(180deg, #0a121b 0%, #0c1620 100%);
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .industry-quotes { display: flex; flex-direction: column; gap: 20px; max-width: 800px; margin: 0 auto; }
        .industry-quote {
          padding: 28px 32px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06); border-left: 3px solid #d4a373;
          border-radius: 0 12px 12px 0; position: relative;
        }
        .quote-mark { font-size: 48px; color: rgba(212,163,115,0.2); line-height: 1; margin-bottom: 8px; font-family: Georgia, serif; }
        .industry-quote p { font-size: 15px; line-height: 1.8; color: rgba(248,250,252,0.8); font-weight: 300; font-style: italic; margin-bottom: 12px; }
        .industry-quote cite { font-size: 12px; color: rgba(212,163,115,0.7); font-style: normal; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; }

        /* PROBLEM SECTION */
        .section-problem { padding: 80px 0; background: #0a121b; }

        /* STAT COUNTERS */
        .stats-counter-row {
          display: flex; align-items: center; justify-content: center;
          gap: 0; margin-bottom: 60px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 32px; flex-wrap: wrap;
        }
        .stat-counter-item { text-align: center; padding: 0 40px; flex: 1; min-width: 140px; }
        .stat-counter-value { font-size: clamp(36px, 6vw, 56px); font-weight: 700; color: #f8fafc; margin-bottom: 6px; }
        .stat-counter-value.gold { color: #e8c49a; }
        .stat-counter-label { font-size: 13px; font-weight: 600; color: rgba(248,250,252,0.7); margin-bottom: 4px; }
        .stat-counter-sub { font-size: 11px; font-weight: 300; color: rgba(248,250,252,0.35); text-transform: uppercase; letter-spacing: 0.06em; }
        .stat-counter-divider { width: 1px; height: 60px; background: rgba(255,255,255,0.08); flex-shrink: 0; }

        /* PROBLEM CARDS */
        .problem-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .problem-card {
          padding: 24px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07); border-radius: 14px;
          cursor: pointer; transition: all 0.3s ease; position: relative;
        }
        .problem-card:hover { border-color: rgba(212,163,115,0.25); background: rgba(212,163,115,0.03); transform: translateY(-2px); }
        .problem-card.expanded { border-color: rgba(212,163,115,0.3); background: rgba(212,163,115,0.04); }
        .card-icon { font-size: 28px; margin-bottom: 12px; }
        .card-stat { font-size: clamp(24px, 4vw, 32px); font-weight: 700; color: #e8c49a; margin-bottom: 6px; }
        .card-label { font-size: 13px; font-weight: 600; color: rgba(248,250,252,0.8); margin-bottom: 12px; }
        .card-expand-icon { position: absolute; top: 20px; right: 20px; color: rgba(212,163,115,0.5); font-size: 20px; }
        .card-expanded-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .problem-card.expanded .card-expanded-content { max-height: 200px; }
        .card-expanded-content p { font-size: 13px; line-height: 1.7; color: rgba(248,250,252,0.65); font-weight: 300; padding-top: 8px; }

        /* TRANSFORMATION SECTION */
        .section-transformation { padding: 80px 0; background: linear-gradient(180deg, #0a121b 0%, #0c1a28 100%); }
        .transformation-table {
          max-width: 800px; margin: 0 auto;
          border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden;
        }
        .transform-header-row {
          display: grid; grid-template-columns: 1fr 1fr;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .transform-col { padding: 16px 24px; }
        .before-col { border-right: 1px solid rgba(255,255,255,0.07); }
        .transform-label-before { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(248,250,252,0.35); }
        .transform-label-after { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #22c55e; }
        .transform-row {
          display: grid; grid-template-columns: 1fr auto 1fr;
          border-bottom: 1px solid rgba(255,255,255,0.05); align-items: center;
          transition: background 0.2s;
        }
        .transform-row:last-child { border-bottom: none; }
        .transform-row:hover { background: rgba(255,255,255,0.02); }
        .transform-row .transform-col.before-col span { font-size: 13px; line-height: 1.6; color: rgba(248,250,252,0.4); font-weight: 300; }
        .transform-row .transform-col.after-col span { font-size: 13px; line-height: 1.6; color: rgba(248,250,252,0.85); font-weight: 400; }
        .transform-divider { padding: 0 16px; color: rgba(212,163,115,0.4); font-size: 16px; }

        /* PLATFORM SECTION */
        .section-platform { padding: 80px 0; background: #0a121b; }
        .platform-accordion { display: flex; flex-direction: column; gap: 12px; }
        .accordion-item {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; transition: border-color 0.3s ease;
        }
        .accordion-item.expanded { border-color: rgba(212,163,115,0.25); }
        .accordion-header {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 22px 28px; background: none; border: none; cursor: pointer;
          text-align: left; -webkit-tap-highlight-color: transparent;
          transition: background 0.2s;
        }
        .accordion-header:hover { background: rgba(255,255,255,0.02); }
        .accordion-title { display: flex; align-items: center; gap: 16px; }
        .accordion-icon { font-size: 28px; flex-shrink: 0; }
        .accordion-title h3 { font-size: 18px; font-weight: 600; color: #f8fafc; margin: 0 0 4px; }
        .accordion-title p { font-size: 13px; color: rgba(248,250,252,0.45); margin: 0; font-weight: 300; }
        .accordion-toggle { width: 32px; height: 32px; background: rgba(255,255,255,0.06); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #d4a373; font-size: 20px; flex-shrink: 0; }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.5s ease; }
        .accordion-item.expanded .accordion-content { max-height: 2000px; }
        .platform-content-grid { display: flex; flex-direction: column; gap: 32px; padding: 0 28px 32px; }
        .platform-lead { font-size: 15px; line-height: 1.7; color: rgba(248,250,252,0.75); margin: 0 0 28px; font-weight: 300; }
        .features-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px; }
        .feature-item { display: flex; gap: 14px; }
        .feature-icon { font-size: 24px; flex-shrink: 0; }
        .feature-item h4 { font-size: 14px; font-weight: 600; color: #f8fafc; margin: 0 0 4px; }
        .feature-item p { font-size: 13px; line-height: 1.6; color: rgba(248,250,252,0.55); margin: 0; font-weight: 300; }

        /* PRICING */
        .pricing-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .price-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; }
        .price-card.premium { background: rgba(212,163,115,0.05); border-color: rgba(212,163,115,0.2); }
        .price-badge { display: inline-block; font-size: 10px; font-weight: 600; color: #d4a373; background: rgba(212,163,115,0.15); padding: 4px 10px; border-radius: 4px; margin-bottom: 10px; }
        .price-card h4 { font-size: 15px; font-weight: 600; color: #f8fafc; margin: 0 0 12px; }
        .price-card ul { list-style: none; padding: 0; margin: 0; }
        .price-card li { font-size: 12px; color: rgba(248,250,252,0.65); padding: 5px 0 5px 18px; position: relative; font-weight: 300; }
        .price-card li::before { content: '✓'; position: absolute; left: 0; color: #22c55e; font-size: 11px; }

        /* PHONE MOCKUPS */
        .mockup-row { display: flex; gap: 16px; align-items: flex-start; flex-shrink: 0; flex-wrap: wrap; }
        .mock-phone { width: 210px; height: 410px; border-radius: 32px; background: #090a0c; border: 1.5px solid rgba(255,255,255,0.14); overflow: hidden; flex-shrink: 0; display: flex; flex-direction: column; box-shadow: 0 24px 48px rgba(0,0,0,0.6); }
        .mock-offset-2 { margin-top: 36px; }
        .mock-offset-3 { margin-top: 18px; }
        .mock-offset-4 { margin-top: 26px; }
        .mock-sb { background: #090a0c; padding: 8px 14px 0; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
        .mock-st { font-size: 9px; font-weight: 700; color: #fff; font-family: 'Urbanist', sans-serif; }
        .mock-si { font-size: 7px; color: rgba(255,255,255,0.5); }
        .mock-nr { background: #090a0c; display: flex; justify-content: center; padding-bottom: 2px; flex-shrink: 0; }
        .mock-nc { width: 60px; height: 14px; background: #090a0c; border-radius: 0 0 12px 12px; border: 1px solid rgba(255,255,255,0.07); border-top: none; }
        .mock-scr { flex: 1; overflow: hidden; min-height: 0; display: flex; flex-direction: column; }
        .mock-nav { background: rgba(9,10,12,0.95); border-top: 1px solid rgba(255,255,255,0.08); display: grid; grid-template-columns: repeat(5,1fr); height: 40px; flex-shrink: 0; align-items: center; margin-top: auto; }
        .mock-ni { color: #8a949c; font-size: 6.5px; font-weight: 500; font-family: 'Urbanist', sans-serif; text-align: center; padding: 0; letter-spacing: 0.02em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .mock-ni.mock-act { color: #d4a373; }
        .mock-hb { background: #090a0c; height: 20px; display: flex; align-items: center; justify-content: center; gap: 18px; flex-shrink: 0; }
        .mock-hbl { width: 28px; height: 0; border: 1.5px solid rgba(255,255,255,0.2); border-radius: 1px; }
        .mock-hbc { width: 14px; height: 14px; border: 1.5px solid rgba(255,255,255,0.2); border-radius: 50%; }
        .mock-hbt { width: 0; height: 0; border-top: 7px solid transparent; border-bottom: 7px solid transparent; border-left: 10px solid rgba(255,255,255,0.2); }
        .mock-con { flex: 1; overflow: hidden; min-height: 0; padding: 9px 10px; display: flex; flex-direction: column; gap: 6px; }
        .mock-ptitle { text-align: center; font-size: 10.5px; font-weight: 800; color: #fff; font-family: 'Urbanist', sans-serif; }
        .mock-psub { text-align: center; font-size: 6.5px; color: #d4a373; font-weight: 600; letter-spacing: 0.07em; font-family: 'Urbanist', sans-serif; }
        .mock-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 8px; }
        .mock-ctitle { font-size: 7.5px; font-weight: 700; color: #fff; font-family: 'Urbanist', sans-serif; margin-bottom: 4px; }
        .mock-arch-row { display: flex; align-items: center; gap: 5px; margin-bottom: 5px; }
        .mock-tier { font-size: 6.5px; font-weight: 700; color: #d4a373; background: rgba(212,163,115,0.15); padding: 2px 5px; border-radius: 3px; font-family: 'Urbanist', sans-serif; }
        .mock-aname { font-size: 10px; font-weight: 800; color: #fff; font-family: 'Urbanist', sans-serif; }
        .mock-br { display: flex; align-items: center; gap: 4px; margin-bottom: 2.5px; }
        .mock-bl { font-size: 6px; color: rgba(255,255,255,0.5); width: 46px; flex-shrink: 0; font-family: 'Urbanist', sans-serif; }
        .mock-bt { flex: 1; height: 3px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
        .mock-bf { height: 100%; border-radius: 2px; }
        .mock-bv { font-size: 6px; font-weight: 700; width: 14px; text-align: right; font-family: 'Urbanist', sans-serif; }
        .mock-anal { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 6px 7px; margin-top: 5px; }
        .mock-anal-title { font-size: 7px; font-weight: 700; color: #fff; font-family: 'Urbanist', sans-serif; margin-bottom: 2px; }
        .mock-anal-sub { font-size: 6px; color: rgba(255,255,255,0.4); font-family: 'Urbanist', sans-serif; margin-bottom: 1px; line-height: 1.5; }
        .mock-anal-link { font-size: 6.5px; color: #d4a373; font-weight: 600; font-family: 'Urbanist', sans-serif; margin-top: 3px; }
        .mock-srow { display: grid; grid-template-columns: repeat(4,1fr); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 7px; padding: 6px 3px; }
        .mock-sc { text-align: center; }
        .mock-sc strong { font-size: 9px; font-weight: 800; color: #fff; display: block; font-family: 'Urbanist', sans-serif; }
        .mock-sc span { font-size: 5px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.04em; font-family: 'Urbanist', sans-serif; }
        .mock-choose { font-size: 6.5px; font-weight: 600; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.07em; font-family: 'Urbanist', sans-serif; }
        .mock-sr { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 6px; padding: 5px 7px; display: flex; align-items: center; gap: 5px; }
        .mock-sr.mock-hi { background: rgba(212,163,115,0.05); border-color: rgba(212,163,115,0.18); }
        .mock-si2 { font-size: 13px; flex-shrink: 0; }
        .mock-sin { flex: 1; min-width: 0; }
        .mock-sn { font-size: 7px; font-weight: 700; color: #fff; display: block; font-family: 'Urbanist', sans-serif; }
        .mock-ss { font-size: 5.5px; color: rgba(255,255,255,0.3); font-family: 'Urbanist', sans-serif; }
        .mock-ssc { text-align: right; }
        .mock-spct { font-size: 9px; font-weight: 800; display: block; font-family: 'Urbanist', sans-serif; }
        .mock-stier { font-size: 5px; font-weight: 700; letter-spacing: 0.05em; font-family: 'Urbanist', sans-serif; }
        .mock-opill { text-align: center; padding: 5px 0 3px; flex-shrink: 0; }
        .mock-opill span { font-size: 7px; font-weight: 700; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 2px 10px; color: rgba(255,255,255,0.55); letter-spacing: 0.05em; font-family: 'Urbanist', sans-serif; }
        .mock-tc { margin: 0 10px 5px; background: rgba(61,220,108,0.07); border: 1px solid rgba(61,220,108,0.22); border-radius: 8px; padding: 7px 10px; flex-shrink: 0; }
        .mock-tr { display: flex; align-items: center; gap: 5px; margin-bottom: 3px; }
        .mock-tt { flex: 1; }
        .mock-ttt { font-size: 8px; font-weight: 800; color: #fff; display: block; font-family: 'Urbanist', sans-serif; }
        .mock-tts { font-size: 6px; color: rgba(255,255,255,0.45); font-family: 'Urbanist', sans-serif; }
        .mock-tp { width: 28px; height: 15px; background: #3ddc6c; border-radius: 8px; position: relative; flex-shrink: 0; }
        .mock-tp::after { content: ''; position: absolute; top: 2.5px; right: 2.5px; width: 10px; height: 10px; background: #fff; border-radius: 50%; }
        .mock-treset { font-size: 6.5px; color: rgba(255,255,255,0.4); text-align: center; font-family: 'Urbanist', sans-serif; }
        .mock-ptabs { display: flex; padding: 5px 10px 0; gap: 9px; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; }
        .mock-ptab { font-size: 7px; font-weight: 500; color: rgba(255,255,255,0.3); padding-bottom: 5px; font-family: 'Urbanist', sans-serif; white-space: nowrap; }
        .mock-ptab.mock-act { color: #d4a373; border-bottom: 1.5px solid #d4a373; font-weight: 700; }
        .mock-rlbl { font-size: 6.5px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.07em; padding: 4px 10px 2px; font-family: 'Urbanist', sans-serif; flex-shrink: 0; }
        .mock-rempty { font-size: 6.5px; color: rgba(255,255,255,0.2); padding: 0 10px 4px; font-family: 'Urbanist', sans-serif; font-style: italic; flex-shrink: 0; }
        .mock-rpub { font-size: 6.5px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.07em; padding: 3px 10px; border-top: 1px solid rgba(255,255,255,0.05); font-family: 'Urbanist', sans-serif; flex-shrink: 0; }
        .mock-sho { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 7px; margin: 0 10px 4px; padding: 6px 8px; flex-shrink: 0; }
        .mock-shh { display: flex; align-items: center; gap: 6px; margin-bottom: 3px; }
        .mock-sha { width: 22px; height: 22px; border-radius: 6px; background: rgba(212,163,115,0.18); border: 1px solid rgba(212,163,115,0.28); display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; color: #d4a373; flex-shrink: 0; font-family: 'Urbanist', sans-serif; }
        .mock-shn { font-size: 7.5px; font-weight: 700; color: #fff; font-family: 'Urbanist', sans-serif; }
        .mock-shr { font-size: 6px; color: rgba(255,255,255,0.35); font-family: 'Urbanist', sans-serif; }
        .mock-sht { display: inline-block; font-size: 6px; font-weight: 600; color: #d4a373; background: rgba(212,163,115,0.1); border: 1px solid rgba(212,163,115,0.18); border-radius: 3px; padding: 2px 5px; margin-bottom: 2px; font-family: 'Urbanist', sans-serif; }
        .mock-shq { font-size: 7px; color: rgba(255,255,255,0.65); font-style: italic; font-family: 'Urbanist', sans-serif; }
        .mock-reg-header { margin: 8px 10px 6px; background: linear-gradient(135deg,rgba(245,158,11,0.1),rgba(217,119,6,0.1)); border: 1.5px solid rgba(245,158,11,0.28); border-radius: 10px; padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        .mock-reg-left { display: flex; align-items: center; gap: 7px; }
        .mock-reg-title { font-size: 9px; font-weight: 800; color: #fff; display: block; font-family: 'Urbanist', sans-serif; }
        .mock-reg-sub { font-size: 6px; color: rgba(255,255,255,0.45); font-family: 'Urbanist', sans-serif; margin-top: 1px; }
        .mock-reg-btn { font-size: 6.5px; font-weight: 700; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 5px; padding: 4px 8px; color: rgba(255,255,255,0.6); font-family: 'Urbanist', sans-serif; }
        .mock-reg-lbl { font-size: 6.5px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.07em; padding: 2px 10px 5px; font-family: 'Urbanist', sans-serif; flex-shrink: 0; }
        .mock-reg-cards { padding: 0 10px; display: flex; flex-direction: column; gap: 5px; flex: 1; overflow: hidden; }
        .mock-reg-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 7px 9px; display: flex; align-items: center; gap: 8px; }
        .mock-reg-av { width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #090a0c; font-family: 'Urbanist', sans-serif; }
        .mock-reg-info { flex: 1; min-width: 0; }
        .mock-reg-name { font-size: 8px; font-weight: 700; color: #fff; display: block; font-family: 'Urbanist', sans-serif; }
        .mock-reg-visits { font-size: 6px; color: rgba(255,255,255,0.4); font-family: 'Urbanist', sans-serif; }
        .mock-reg-badge { font-size: 6px; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-family: 'Urbanist', sans-serif; }
        .mock-gold { background: rgba(245,158,11,0.15); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25); }
        .mock-silver { background: rgba(148,163,184,0.15); color: #94a3b8; border: 1px solid rgba(148,163,184,0.25); }
        .mock-bronze { background: rgba(180,120,80,0.15); color: #b47850; border: 1px solid rgba(180,120,80,0.25); }
        .mock-reg-more { font-size: 6.5px; color: rgba(255,255,255,0.3); text-align: center; padding: 4px 0; font-family: 'Urbanist', sans-serif; flex-shrink: 0; }
        .mock-eh { display: flex; align-items: center; gap: 6px; padding: 7px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
        .mock-esb { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09); border-radius: 8px; padding: 6px 9px; font-size: 7px; color: rgba(255,255,255,0.35); font-family: 'Urbanist', sans-serif; }
        .mock-eav { width: 28px; height: 28px; border-radius: 8px; background: rgba(212,163,115,0.18); border: 1.5px solid rgba(212,163,115,0.4); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #d4a373; font-family: 'Urbanist', sans-serif; flex-shrink: 0; }
        .mock-etabs { display: flex; padding: 5px 10px; gap: 4px; border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
        .mock-etab { font-size: 6.5px; font-weight: 600; padding: 3px 7px; border-radius: 12px; background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.4); border: 1px solid rgba(255,255,255,0.07); font-family: 'Urbanist', sans-serif; white-space: nowrap; }
        .mock-etab-act { background: rgba(61,220,108,0.1); color: #3ddc6c; border-color: rgba(61,220,108,0.25); display: flex; align-items: center; gap: 3px; }
        .mock-od { width: 5px; height: 5px; background: #3ddc6c; border-radius: 50%; flex-shrink: 0; }
        .mock-eslbl { font-size: 7px; font-weight: 600; color: rgba(255,255,255,0.35); padding: 5px 10px 3px; font-family: 'Urbanist', sans-serif; flex-shrink: 0; }
        .mock-ecards { padding: 0 10px; display: flex; flex-direction: column; gap: 5px; flex: 1; overflow: hidden; }
        .mock-ec { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 9px; padding: 7px 8px; display: flex; align-items: center; gap: 7px; }
        .mock-eca { width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; color: #090a0c; position: relative; font-family: 'Urbanist', sans-serif; }
        .mock-ering { position: absolute; inset: 0; border-radius: 10px; border: 2px solid #3ddc6c; }
        .mock-eci { flex: 1; min-width: 0; }
        .mock-ecn { font-size: 8px; font-weight: 700; color: #fff; font-family: 'Urbanist', sans-serif; margin-bottom: 1px; }
        .mock-ecr { font-size: 6.5px; color: #d4a373; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; font-family: 'Urbanist', sans-serif; }
        .mock-ecv { font-size: 6px; color: rgba(255,255,255,0.35); font-family: 'Urbanist', sans-serif; margin-bottom: 3px; }
        .mock-onb { display: inline-flex; align-items: center; gap: 3px; background: rgba(61,220,108,0.1); border: 1px solid rgba(61,220,108,0.22); border-radius: 4px; padding: 2px 5px; font-size: 6px; font-weight: 700; color: #3ddc6c; font-family: 'Urbanist', sans-serif; }
        .mock-ect { font-size: 5.5px; color: rgba(255,255,255,0.25); font-family: 'Urbanist', sans-serif; margin-top: 2px; }
        .mock-hrt { width: 26px; height: 26px; background: rgba(212,163,115,0.1); border: 1px solid rgba(212,163,115,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
        .mock-phw { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 14px 10px; }
        .mock-phlogo { font-size: 24px; font-weight: 300; color: #e8c49a; margin-bottom: 4px; letter-spacing: -0.02em; font-family: 'Urbanist', sans-serif; }
        .mock-phtag { font-size: 7px; color: rgba(255,255,255,0.4); text-align: center; line-height: 1.6; font-weight: 300; font-family: 'Urbanist', sans-serif; }
        .mock-phwel { font-size: 7.5px; color: rgba(255,255,255,0.3); margin: 7px 0 11px; font-family: 'Urbanist', sans-serif; }
        .mock-phbtn { width: 100%; background: #d4a373; border-radius: 8px; padding: 9px; text-align: center; font-size: 8px; font-weight: 700; color: #090a0c; margin-bottom: 8px; font-family: 'Urbanist', sans-serif; }
        .mock-phcard { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 9px; }
        .mock-phci { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .mock-phct { font-size: 9px; font-weight: 700; color: #fff; display: block; font-family: 'Urbanist', sans-serif; }
        .mock-phcv { display: flex; align-items: center; gap: 3px; font-size: 6.5px; color: #d4a373; font-family: 'Urbanist', sans-serif; }
        .mock-phsl { font-size: 6.5px; color: rgba(255,255,255,0.4); font-style: italic; margin-bottom: 8px; font-family: 'Urbanist', sans-serif; }
        .mock-phbtns { display: flex; gap: 5px; }
        .mock-phbp { flex: 1; background: #d4a373; border-radius: 6px; padding: 7px; text-align: center; font-size: 7px; font-weight: 700; color: #090a0c; font-family: 'Urbanist', sans-serif; }
        .mock-phbs { flex: 0 0 auto; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 7px 12px; font-size: 7px; font-weight: 600; color: rgba(255,255,255,0.5); font-family: 'Urbanist', sans-serif; }
        .mock-gar { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
        .mock-gn { font-size: 10px; font-weight: 800; color: #fff; font-family: 'Urbanist', sans-serif; }
        .mock-gtag { font-size: 6.5px; color: #d4a373; font-style: italic; font-family: 'Urbanist', sans-serif; }
        .mock-gver { display: inline-flex; align-items: center; gap: 3px; background: rgba(212,163,115,0.1); border: 1px solid rgba(212,163,115,0.18); border-radius: 5px; padding: 3px 8px; margin-bottom: 6px; font-size: 6.5px; font-weight: 600; color: #d4a373; font-family: 'Urbanist', sans-serif; }
        .mock-gdesc { font-size: 6.5px; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 7px; font-family: 'Urbanist', sans-serif; }
        .mock-gtabs { display: flex; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 7px; overflow: hidden; margin-bottom: 6px; }
        .mock-gtab { flex: 1; text-align: center; padding: 5px 3px; font-size: 7px; font-weight: 500; color: rgba(255,255,255,0.3); font-family: 'Urbanist', sans-serif; }
        .mock-gtab.mock-act { background: rgba(255,255,255,0.06); color: #fff; font-weight: 700; }
        .mock-gvc { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 7px; padding: 7px; margin-bottom: 5px; }
        .mock-glbl { font-size: 6px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 3px; font-family: 'Urbanist', sans-serif; }
        .mock-gvl { display: flex; flex-direction: column; gap: 3px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 3px; }
        .mock-gvi { font-size: 7px; color: rgba(255,255,255,0.6); border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 2px; font-family: 'Urbanist', sans-serif; }
        .mock-gsc { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 7px; padding: 7px; }
        .mock-gsv { font-size: 7px; color: #d4a373; font-weight: 600; font-family: 'Urbanist', sans-serif; }
        .mock-vh { display: flex; align-items: center; gap: 7px; padding: 7px 10px; border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
        .mock-vlogo { width: 27px; height: 27px; border-radius: 6px; background: linear-gradient(135deg,#d4a373,#c99763); display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
        .mock-vhi { flex: 1; min-width: 0; }
        .mock-vhn { font-size: 8.5px; font-weight: 700; color: #fff; font-family: 'Urbanist', sans-serif; }
        .mock-vhs { font-size: 6px; color: rgba(255,255,255,0.3); font-family: 'Urbanist', sans-serif; }
        .mock-vact { font-size: 6px; font-weight: 700; padding: 2px 6px; border-radius: 3px; background: rgba(61,220,108,0.1); color: #3ddc6c; border: 1px solid rgba(61,220,108,0.2); display: flex; align-items: center; gap: 3px; font-family: 'Urbanist', sans-serif; }
        .mock-vad { width: 5px; height: 5px; background: #3ddc6c; border-radius: 50%; }
        .mock-vtabs { display: flex; padding: 5px 10px; gap: 3px; border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
        .mock-vtab { font-size: 6.5px; font-weight: 600; padding: 3px 8px; border-radius: 4px; background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.35); border: 1px solid rgba(255,255,255,0.07); font-family: 'Urbanist', sans-serif; }
        .mock-vtab.mock-act { background: rgba(212,163,115,0.15); color: #d4a373; border-color: rgba(212,163,115,0.28); }
        .mock-vper { display: flex; gap: 3px; padding: 5px 10px 4px; flex-shrink: 0; }
        .mock-vpb { padding: 3px 6px; border-radius: 3px; font-size: 6px; font-weight: 600; background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.3); font-family: 'Urbanist', sans-serif; }
        .mock-vpb.mock-act { background: #d4a373; color: #090a0c; }
        .mock-vstats { padding: 0 10px; display: flex; flex-direction: column; gap: 5px; flex: 1; overflow: hidden; }
        .mock-vs { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 7px; padding: 6px 9px; display: flex; align-items: center; gap: 7px; }
        .mock-vs-grn { background: rgba(61,220,108,0.04); border-color: rgba(61,220,108,0.14); }
        .mock-vsi { flex: 1; }
        .mock-vsn { font-size: 14px; font-weight: 800; color: #fff; line-height: 1; font-family: 'Urbanist', sans-serif; }
        .mock-vsl { font-size: 6px; color: rgba(255,255,255,0.35); font-family: 'Urbanist', sans-serif; }
        .mock-vss { font-size: 5.5px; color: rgba(255,255,255,0.2); font-family: 'Urbanist', sans-serif; }
        .mock-vst { font-size: 6.5px; font-weight: 700; padding: 2px 5px; border-radius: 3px; background: rgba(61,220,108,0.1); color: #3ddc6c; font-family: 'Urbanist', sans-serif; }
        @media (max-width: 900px) {
          .mockup-row { justify-content: center; }
          .mock-phone { width: 170px; height: 330px; }
          .mock-offset-2, .mock-offset-3, .mock-offset-4 { margin-top: 0; }
        }
        @media (max-width: 600px) {
          .mockup-row { gap: 10px; }
          .mock-phone { width: 140px; height: 280px; }
        }

        /* ARCHETYPES */
        .archetypes-section { padding: 0 28px 24px; }
        .archetypes-section h4 { font-size: 14px; font-weight: 600; color: #f8fafc; margin: 0 0 6px; }
        .archetypes-section p { font-size: 12px; color: rgba(248,250,252,0.45); margin: 0 0 16px; font-weight: 300; }
        .archetypes-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .patron-grid { grid-template-columns: repeat(4, 1fr); }
        .archetype-chip { display: flex; align-items: flex-start; gap: 8px; padding: 10px 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; }
        .archetype-chip span { font-size: 18px; flex-shrink: 0; }
        .archetype-chip strong { display: block; font-size: 11px; font-weight: 600; color: #f8fafc; margin-bottom: 2px; }
        .archetype-chip small { font-size: 10px; color: rgba(248,250,252,0.4); font-weight: 300; line-height: 1.4; }

        /* ACCORDION CTA */
        .accordion-cta { padding: 0 28px 28px; }
        .btn-accordion-cta {
          display: inline-block; padding: 12px 28px;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0c1520; font-size: 14px; font-weight: 700;
          border-radius: 8px; text-decoration: none; border: none; cursor: pointer;
          transition: all 0.3s;
        }
        .btn-accordion-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(212,163,115,0.25); }
        .btn-accordion-cta.secondary {
          background: transparent; border: 1px solid rgba(212,163,115,0.4);
          color: #d4a373;
        }
        .btn-accordion-cta.secondary:hover { background: rgba(212,163,115,0.1); }

        /* SCIENCE */
        .science-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 0 28px 28px; }
        .science-card { padding: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; }
        .science-card.dapa { border-color: rgba(212,163,115,0.2); }
        .science-card.genome { border-color: rgba(139,92,246,0.2); }
        .science-card h4 { font-size: 16px; font-weight: 700; color: #f8fafc; margin: 0 0 4px; }
        .science-subtitle { font-size: 12px; color: rgba(248,250,252,0.45); font-weight: 300; margin-bottom: 16px; }
        .science-card ul { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
        .science-card li { font-size: 13px; color: rgba(248,250,252,0.7); padding-left: 16px; position: relative; font-weight: 300; line-height: 1.5; }
        .science-card li::before { content: '·'; position: absolute; left: 0; color: #d4a373; font-size: 16px; line-height: 1.2; }
        .science-value { font-size: 13px; font-style: italic; color: #d4a373; font-weight: 400; }

        /* VISION */
        .section-vision { padding: 80px 0; background: linear-gradient(180deg, #0c1620 0%, #0a121b 100%); }
        .founder-intro { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px; }
        .founder-photo {
          width: 72px; height: 72px; border-radius: 50%; overflow: hidden;
          background: linear-gradient(135deg, rgba(212,163,115,0.2), rgba(212,163,115,0.05));
          border: 2px solid rgba(212,163,115,0.3);
          display: flex; align-items: center; justify-content: center; font-size: 32px;
          flex-shrink: 0;
        }
        .founder-photo img { width: 100%; height: 100%; object-fit: cover; }
        .founder-text h2 { font-size: 22px; font-weight: 600; color: #f8fafc; margin: 0 0 4px; }
        .founder-text p { font-size: 13px; color: rgba(248,250,252,0.5); font-weight: 300; }
        .founder-years { color: #d4a373 !important; font-weight: 500 !important; }
        .founder-tagline { font-size: 16px; color: rgba(248,250,252,0.6); text-align: center; margin: 0 0 40px; max-width: 600px; margin-left: auto; margin-right: auto; font-weight: 300; font-style: italic; }

        .vision-accordion { display: flex; flex-direction: column; gap: 10px; }
        .vision-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden; transition: all 0.3s ease; }
        .vision-item.expanded { background: rgba(212,163,115,0.02); border-color: rgba(212,163,115,0.2); }
        .vision-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; background: none; border: none; cursor: pointer; text-align: left; -webkit-tap-highlight-color: transparent; }
        .vision-header h3 { font-size: 15px; font-weight: 500; color: #f8fafc; margin: 0; }
        .vision-toggle { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border-radius: 50%; color: #d4a373; font-size: 18px; flex-shrink: 0; }
        .vision-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .vision-item.expanded .vision-content { max-height: 1200px; }
        .vision-content p { font-size: 14px; line-height: 1.9; color: rgba(248,250,252,0.75); margin: 0 0 16px; padding: 0 24px; font-weight: 300; }
        .vision-content p:last-child { padding-bottom: 24px; }

        /* INVESTOR BLOCK */
        .investor-block { margin-top: 48px; }
        .investor-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; padding: 28px 32px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; flex-wrap: wrap;
        }
        .investor-left { flex: 1; min-width: 200px; }
        .investor-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #d4a373; margin-bottom: 8px; }
        .investor-left p { font-size: 14px; line-height: 1.6; color: rgba(248,250,252,0.6); font-weight: 300; }
        .btn-investor {
          display: inline-block; padding: 12px 28px; white-space: nowrap;
          background: transparent; border: 1px solid rgba(212,163,115,0.4);
          border-radius: 8px; color: #d4a373; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.2s; flex-shrink: 0;
        }
        .btn-investor:hover { background: rgba(212,163,115,0.1); border-color: rgba(212,163,115,0.6); }

        /* WAITLIST / CTA */
        .section-waitlist { padding: 100px 0; background: linear-gradient(180deg, #0a121b 0%, #0c1620 100%); }
        .waitlist-content { max-width: 580px; margin: 0 auto; text-align: center; }
        .waitlist-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #d4a373; text-transform: uppercase; margin-bottom: 12px; }
        .waitlist-content h2 { font-size: 34px; font-weight: 700; margin: 0 0 16px; }
        .waitlist-subtitle { font-size: 16px; color: rgba(248,250,252,0.6); margin-bottom: 32px; font-weight: 300; line-height: 1.6; }

        .cta-primary-block { margin-bottom: 32px; }
        .btn-cta-large {
          display: inline-block; padding: 18px 48px;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0c1520; font-size: 17px; font-weight: 700;
          border-radius: 10px; text-decoration: none;
          transition: all 0.3s; letter-spacing: 0.01em;
        }
        .btn-cta-large:hover { transform: translateY(-3px); box-shadow: 0 20px 50px rgba(212,163,115,0.3); }
        .cta-sub-text { margin-top: 12px; font-size: 12px; color: rgba(248,250,252,0.35); font-weight: 300; }

        .waitlist-divider { display: flex; align-items: center; gap: 16px; margin: 0 0 28px; }
        .waitlist-divider::before, .waitlist-divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .waitlist-divider span { font-size: 12px; color: rgba(248,250,252,0.3); white-space: nowrap; font-weight: 300; }

        .waitlist-form { text-align: left; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .waitlist-form input, .waitlist-form select {
          width: 100%; padding: 14px 18px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: #f8fafc; font-size: 14px; font-family: inherit;
          font-weight: 300; transition: all 0.2s; -webkit-appearance: none;
        }
        .waitlist-form input::placeholder { color: rgba(248,250,252,0.35); }
        .waitlist-form input:focus, .waitlist-form select:focus { outline: none; border-color: #d4a373; background: rgba(212,163,115,0.05); }
        .form-disclaimer { font-size: 11px; color: rgba(248,250,252,0.35); text-align: center; margin: 14px 0; font-weight: 300; }
        .btn-submit {
          width: 100%; background: rgba(255,255,255,0.06); color: rgba(248,250,252,0.7);
          border: 1px solid rgba(255,255,255,0.12); padding: 14px; font-size: 14px;
          font-weight: 500; border-radius: 8px; cursor: pointer; transition: all 0.3s;
          font-family: inherit;
        }
        .btn-submit:hover { background: rgba(255,255,255,0.1); color: #f8fafc; }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .waitlist-success { padding: 40px 0; }
        .success-icon { font-size: 52px; margin-bottom: 20px; }
        .waitlist-success h2 { font-size: 28px; font-weight: 700; margin: 0 0 16px; }
        .waitlist-success p { font-size: 15px; color: rgba(248,250,252,0.65); margin-bottom: 28px; font-weight: 300; line-height: 1.7; }
        .btn-primary {
          display: inline-block; padding: 14px 36px;
          background: linear-gradient(135deg, #d4a373 0%, #c99763 100%);
          color: #0c1520; font-size: 15px; font-weight: 700;
          border: none; border-radius: 8px; cursor: pointer; text-decoration: none;
        }

        /* FOOTER */
        .footer { padding: 60px 24px 32px; background: #080f18; border-top: 1px solid rgba(232,196,154,0.1); }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .footer-logo { font-size: 20px; font-weight: 500; color: #e8c49a; margin-bottom: 10px; }
        .footer-tagline-text { font-size: 12px; color: rgba(248,250,252,0.4); line-height: 1.6; font-weight: 300; }
        .footer-location { font-size: 11px; color: rgba(248,250,252,0.3); margin-top: 8px; font-weight: 300; }
        .footer-links h4 { font-size: 10px; font-weight: 500; color: rgba(248,250,252,0.6); text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 14px; }
        .footer-links a, .footer-links p { display: block; font-size: 13px; color: rgba(248,250,252,0.45); text-decoration: none; margin-bottom: 8px; font-weight: 300; }
        .footer-links a:hover { color: #d4a373; }
        .footer-app-link { color: #d4a373 !important; font-weight: 500 !important; margin-top: 8px !important; }
        .footer-bottom { padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; }
        .footer-bottom p { font-size: 11px; color: rgba(248,250,252,0.3); margin: 0; font-weight: 300; }

        /* LIGHTBOX /
.lightbox {
position: fixed; inset: 0; background: rgba(0,0,0,0.95);
display: flex; align-items: center; justify-content: center;
z-index: 9999; cursor: pointer; padding: 16px;
}
.lightbox img {
max-width: 100%; max-height: 88vh;
border-radius: 12px; pointer-events: none;
}
.lightbox-close {
position: absolute; top: 16px; right: 16px;
width: 44px; height: 44px;
display: flex; align-items: center; justify-content: center;
background: rgba(255,255,255,0.12); border: none;
border-radius: 50%; color: white; font-size: 22px;
cursor: pointer; -webkit-tap-highlight-color: transparent;
}
/ MOCKUP LIGHTBOX */
.mockup-lightbox {
position: fixed; inset: 0; background: rgba(0,0,0,0.92);
display: flex; flex-direction: column; align-items: center;
justify-content: center; z-index: 9999; cursor: pointer;
padding: 16px; backdrop-filter: blur(8px);
animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.mockup-lightbox-close {
position: fixed; top: 16px; right: 16px;
width: 48px; height: 48px;
display: flex; align-items: center; justify-content: center;
background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.15);
border-radius: 50%; color: white; font-size: 24px;
cursor: pointer; z-index: 10001; transition: background 0.2s;
-webkit-tap-highlight-color: transparent;
}
.mockup-lightbox-close:hover { background: rgba(255,255,255,0.22); }
.mockup-lightbox-hint {
position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
font-size: 12px; color: rgba(255,255,255,0.3); letter-spacing: 0.08em;
font-weight: 300; pointer-events: none;
}
.mockup-lightbox-phone {
width: 375px !important;
height: 812px !important;
border-radius: 44px !important;
cursor: default;
box-shadow: 0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1) !important;
animation: phoneIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
overflow-y: auto !important;
}
@keyframes phoneIn {
from { opacity: 0; transform: scale(0.88) translateY(20px); }
to   { opacity: 1; transform: scale(1) translateY(0); }
}
@media (max-height: 900px) {
.mockup-lightbox-phone {
width: 320px !important;
height: 693px !important;
border-radius: 38px !important;
}
}
@media (max-height: 750px) {
.mockup-lightbox-phone {
width: 280px !important;
height: 607px !important;
border-radius: 32px !important;
}
}
@media (max-width: 400px) {
.mockup-lightbox-phone {
width: calc(100vw - 32px) !important;
height: calc((100vw - 32px) * 2.165) !important;
border-radius: 32px !important;
}
}
        /* RESPONSIVE */
        @media (max-width: 900px) {
          .who-options { flex-wrap: wrap; justify-content: center; }
          .who-card { width: calc(50% - 5px); }
          .problem-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-counter-row { gap: 16px; }
          .stat-counter-divider { display: none; }
          .stat-counter-item { padding: 16px; }
          .science-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .archetypes-grid { grid-template-columns: repeat(3, 1fr); }
          .patron-grid { grid-template-columns: repeat(3, 1fr); }
          .platform-content-grid { grid-template-columns: 1fr; }
          .platform-screenshots {
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
            gap: 10px;
          }
          .platform-screenshots .screenshot-wrap {
            width: calc(33% - 8px);
            min-width: 90px;
            max-width: 140px;
            aspect-ratio: 9/16;
          }
          .screenshot-tap-hint { display: block; }
          .onpro-screenshots, .venue-screenshots {
            width: 100%;
            flex-direction: row;
          }
          .transform-header-row { grid-template-columns: 1fr 1fr; }
          .transform-row { grid-template-columns: 1fr auto 1fr; }
        }

        @media (max-width: 600px) {
          .nav-links a:not(.nav-cta) { display: none; }
          .nav-container { padding: 12px 16px; }
          .nav-cta { padding: 8px 16px !important; font-size: 12px !important; }
          .hero { padding: 90px 16px 60px; }
          .hero-brand-badge { font-size: clamp(52px, 16vw, 72px); }
          .hero-epigraph { margin: 18px 0 16px; }
          .who-card { width: 100%; max-width: 320px; }
          .problem-grid { grid-template-columns: 1fr; }
          .stats-counter-row { padding: 20px 16px; }
          .stat-counter-item { padding: 8px; }
          .form-row { grid-template-columns: 1fr; }
          .pricing-row { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
          .archetypes-grid { grid-template-columns: repeat(2, 1fr); }
          .patron-grid { grid-template-columns: repeat(2, 1fr); }
          .container { padding: 0 16px; }
          .section-human-cost, .section-problem, .section-transformation, .section-platform, .section-vision, .section-waitlist { padding: 60px 0; }
          .accordion-header { padding: 18px 16px; }
          .platform-screenshots .screenshot-wrap {
            width: calc(50% - 6px);
            min-width: 100px;
            max-width: 180px;
            aspect-ratio: 9/16;
          }
          .screenshot-tap-hint { display: block; font-size: 11px; }
          .archetypes-section { padding: 0 16px 20px; }
          .science-grid { padding: 0 16px 20px; }
          .founder-intro { flex-direction: column; gap: 12px; }
          .founder-text { text-align: center; }
          .investor-inner { flex-direction: column; text-align: center; }
          .transform-header-row { display: none; }
          .transform-row { grid-template-columns: 1fr; padding: 4px 0; }
          .before-col { display: none; }
          .transform-divider { display: none; }
          .transform-row .transform-col.after-col { padding: 14px 20px; }
          .waitlist-content h2 { font-size: 26px; }
          .btn-cta-large { padding: 16px 32px; font-size: 15px; }
          .accordion-cta { padding: 0 16px 20px; }
        }

        @media (max-width: 380px) {
          .archetypes-grid, .patron-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
