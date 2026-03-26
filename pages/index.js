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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [expandedPlatform, setExpandedPlatform] = useState(null);
  const [expandedVision, setExpandedVision] = useState(null);
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [showInstallPrompt] = useState(false);
  const [failedImages, setFailedImages] = useState({});
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

  const handleImageError = (imagePath) => {
    setFailedImages(prev => ({ ...prev, [imagePath]: true }));
  };

  // ============================================================================
  // SCREENSHOT COMPONENT
  // ============================================================================
  const ScreenshotImage = ({ src, alt, onClick }) => {
    if (failedImages[src]) {
      return (
        <div className="screenshot-placeholder" onClick={onClick}>
          <span>{alt}</span>
        </div>
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        onError={() => handleImageError(src)}
        style={{ cursor: 'zoom-in', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}
      />
    );
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
              LIVE NOW · TAMPA BAY
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
                    <div className="platform-screenshots onpro-screenshots">
                      <ScreenshotImage src="/screenshots/onpro-profile-status.jpg" alt="OnPro Profile" onClick={() => setLightboxImage('/screenshots/onpro-profile-status.jpg')} />
                      <ScreenshotImage src="/screenshots/onpro-skills-catagories.jpg" alt="Skills Categories" onClick={() => setLightboxImage('/screenshots/onpro-skills-catagories.jpg')} />
                      <ScreenshotImage src="/screenshots/onpro-assessment-dashboard.jpg" alt="Assessment Dashboard" onClick={() => setLightboxImage('/screenshots/onpro-assessment-dashboard.jpg')} />
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
                    <div className="platform-screenshots">
                      <ScreenshotImage src="/screenshots/patron-genome-result.jpg" alt="Genome Results" onClick={() => setLightboxImage('/screenshots/patron-genome-result.jpg')} />
                      <ScreenshotImage src="/screenshots/patron-my-spots.jpg" alt="My Spots" onClick={() => setLightboxImage('/screenshots/patron-my-spots.jpg')} />
                      <ScreenshotImage src="/screenshots/patron-mypeople.jpg" alt="My People" onClick={() => setLightboxImage('/screenshots/patron-mypeople.jpg')} />
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
                    <div className="platform-screenshots venue-screenshots">
                      <ScreenshotImage src="/screenshots/venue-analytics-dashboard.jpg" alt="Venue Analytics Dashboard" onClick={() => setLightboxImage('/screenshots/venue-analytics-dashboard.jpg')} />
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
                <p className="footer-location">🌴 Tampa Bay, FL · Expanding 2025</p>
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
        .platform-content-grid { display: grid; grid-template-columns: 1fr auto; gap: 40px; padding: 0 28px 32px; }
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

        /* SCREENSHOTS */
        .platform-screenshots { display: flex; flex-direction: column; gap: 10px; width: 130px; flex-shrink: 0; }
        .platform-screenshots img { width: 100%; border-radius: 10px; cursor: zoom-in; }
        .onpro-screenshots, .venue-screenshots { width: 130px; }
        .screenshot-placeholder {
          width: 130px; height: 100px; background: rgba(255,255,255,0.03);
          border: 1px dashed rgba(255,255,255,0.1); border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; color: rgba(248,250,252,0.3); cursor: pointer;
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

        /* LIGHTBOX */
        .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 9999; cursor: pointer; padding: 32px; }
        .lightbox img { max-width: 100%; max-height: 90vh; border-radius: 10px; }
        .lightbox-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 32px; cursor: pointer; }

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
          .platform-screenshots { flex-direction: row; width: 100%; justify-content: center; gap: 10px; }
          .platform-screenshots img { width: 90px; }
          .screenshot-placeholder { width: 90px; }
          .platform-content-grid { grid-template-columns: 1fr; }
          .onpro-screenshots, .venue-screenshots { width: 100%; flex-direction: row; justify-content: center; }
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
          .platform-content-grid { padding: 0 16px 24px; }
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
