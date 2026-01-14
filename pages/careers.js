import { useState } from 'react';
import Head from 'next/head';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: 'Head of Marketing',
      department: 'Marketing',
      location: 'Remote (Tampa Bay preferred)',
      type: 'Full-Time',
      description: 'Lead OnTonight\'s go-to-market strategy and brand positioning as we revolutionize hospitality professional infrastructure.',
      responsibilities: [
        'Develop and execute comprehensive marketing strategy across digital, grassroots, and venue partnerships',
        'Build and manage marketing team as we scale from pilot to national launch',
        'Create compelling brand narratives that resonate with hospitality professionals, patrons, and venues',
        'Drive user acquisition through targeted campaigns, content marketing, and community building',
        'Establish OnTonight as the authoritative voice in hospitality career infrastructure',
        'Manage marketing budget and ROI across all channels'
      ],
      qualifications: [
        '7+ years marketing experience, preferably in B2B SaaS or marketplace platforms',
        'Proven track record launching and scaling products from 0 to 100K+ users',
        'Deep understanding of hospitality industry culture and pain points strongly preferred',
        'Experience with both digital marketing and grassroots/field marketing',
        'Data-driven mindset with strong analytical skills',
        'Exceptional storytelling and brand-building abilities'
      ],
      salary: '$120K-$160K + equity',
      applyLink: '#waitlist'
    },
    {
      id: 2,
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-Time',
      description: 'Build the professional infrastructure that hospitality deserves. Work on real-time systems, complex assessments, and features that impact millions of careers.',
      responsibilities: [
        'Architect and build scalable features across our Next.js/React frontend and Firebase/PostgreSQL backend',
        'Develop and optimize our proprietary DAPA assessment system and matching algorithms',
        'Implement real-time features for OnTonight status, notifications, and messaging',
        'Collaborate with founder/CEO on product direction and technical strategy',
        'Establish engineering best practices, code quality standards, and CI/CD pipelines',
        'Mentor junior engineers as team grows'
      ],
      qualifications: [
        '5+ years full-stack development experience',
        'Expert-level proficiency in React, Next.js, and modern JavaScript/TypeScript',
        'Strong experience with Firebase (Firestore, Auth, Storage) and PostgreSQL',
        'Experience building real-time, high-traffic applications',
        'Passion for clean code, testing, and maintainable architecture',
        'Bonus: Experience with assessment systems, matching algorithms, or marketplace platforms'
      ],
      salary: '$130K-$180K + equity',
      applyLink: '#waitlist'
    },
    {
      id: 3,
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'Remote (Tampa Bay preferred)',
      type: 'Full-Time',
      description: 'Be the voice of OnTonight users—hospitality professionals, patrons, and venue owners. Help them succeed while gathering insights that shape our product.',
      responsibilities: [
        'Provide exceptional support to OnPros, Patrons, and Venues across all channels',
        'Develop onboarding programs and resources that drive engagement and retention',
        'Build relationships with pilot venue partners and gather product feedback',
        'Create help documentation, FAQs, and video tutorials',
        'Identify trends in user questions and pain points to inform product roadmap',
        'Manage community engagement and moderate user-generated content'
      ],
      qualifications: [
        '3+ years customer success, support, or community management experience',
        'Hospitality industry background strongly preferred (bartender, server, sommelier, venue manager)',
        'Exceptional communication skills—written, verbal, and video',
        'Empathetic, patient, and genuinely excited to help people succeed',
        'Comfortable with ambiguity and building processes from scratch',
        'Technical aptitude to learn our platform deeply and troubleshoot issues'
      ],
      salary: '$60K-$85K + equity',
      applyLink: '#waitlist'
    },
    {
      id: 4,
      title: 'Venue Partnerships Lead',
      department: 'Business Development',
      location: 'Tampa Bay (field-based)',
      type: 'Full-Time',
      description: 'Build relationships with premier hospitality venues across Tampa Bay, Miami, Nashville, and beyond. You\'ll be the face of OnTonight in the field.',
      responsibilities: [
        'Recruit and onboard high-quality venues in target markets (Tampa Bay, Miami, Nashville)',
        'Build relationships with venue owners, GMs, and beverage directors',
        'Conduct in-venue demos and training sessions for staff',
        'Gather venue feedback to inform product development and partnership programs',
        'Represent OnTonight at industry events, conferences, and trade shows',
        'Develop scalable venue acquisition strategies and sales materials'
      ],
      qualifications: [
        '5+ years in hospitality—preferably in venue management, beverage director, or sales rep roles',
        'Existing network of venue contacts in Tampa Bay or other target markets',
        'Proven ability to build trust and close deals with venue decision-makers',
        'Comfortable with public speaking and in-person presentations',
        'Self-starter who thrives in ambiguous, high-ownership environments',
        'Deep understanding of venue operations, staffing challenges, and P&L dynamics'
      ],
      salary: '$70K-$100K + commission + equity',
      applyLink: '#waitlist'
    },
    {
      id: 5,
      title: 'Product Designer (UI/UX)',
      department: 'Product',
      location: 'Remote',
      type: 'Full-Time',
      description: 'Design the professional infrastructure for an entire industry. Create interfaces that feel premium, intuitive, and distinctly hospitality-focused.',
      responsibilities: [
        'Own end-to-end design for OnPro, Patron, and Venue experiences',
        'Conduct user research with bartenders, servers, sommeliers, and venue managers',
        'Design and prototype new features from concept to high-fidelity mocks',
        'Establish and maintain design system that scales across web and mobile',
        'Collaborate closely with engineering to ensure pixel-perfect implementation',
        'Run usability testing and iterate based on user feedback'
      ],
      qualifications: [
        '4+ years product design experience, preferably in B2B SaaS or marketplaces',
        'Portfolio demonstrating strong UI/UX design for web and mobile applications',
        'Proficiency in Figma (our design tool of choice)',
        'Understanding of frontend constraints and ability to work closely with engineers',
        'Experience designing for diverse user personas with different needs',
        'Bonus: Hospitality industry knowledge or experience designing assessment/certification systems'
      ],
      salary: '$100K-$140K + equity',
      applyLink: '#waitlist'
    },
    {
      id: 6,
      title: 'Chief of Staff',
      department: 'Executive',
      location: 'Remote (Tampa Bay preferred)',
      type: 'Full-Time',
      description: 'Work directly with the founder/CEO to execute on strategic initiatives, investor relations, and operational excellence as we scale.',
      responsibilities: [
        'Manage investor communications, fundraising processes, and board meeting preparation',
        'Drive strategic initiatives across product, go-to-market, and operations',
        'Build operating rhythms, OKRs, and cross-functional alignment systems',
        'Own special projects including market expansion planning, partnership negotiations, and M&A diligence',
        'Represent CEO in internal and external meetings as needed',
        'Prepare investor updates, pitch decks, and strategic planning materials'
      ],
      qualifications: [
        '5+ years in strategy consulting, investment banking, venture capital, or Chief of Staff roles',
        'MBA or equivalent experience strongly preferred',
        'Exceptional strategic thinking, problem-solving, and analytical skills',
        'Experience with fundraising processes and investor relations',
        'Ability to context-switch rapidly across wildly different projects',
        'Startup experience and comfort with ambiguity essential'
      ],
      salary: '$110K-$150K + significant equity',
      applyLink: '#waitlist'
    }
  ];

  return (
    <>
      <Head>
        <title>Careers | OnTonight - Build the Future of Hospitality</title>
        <meta name="description" content="Join OnTonight in building professional infrastructure for the hospitality industry. Open positions in Engineering, Marketing, Support, and more." />
      </Head>

      <div className="careers-page">
        <header className="careers-header">
          <a href="/" className="back-link">← Back to OnTonight</a>
          <h1>Join the Movement</h1>
          <p className="header-lead">We're building the professional infrastructure that hospitality deserves. If you believe talented servers, bartenders, and sommeliers should own their careers—not reset them every 18 months—join us.</p>
        </header>

        <section className="why-join">
          <h2>Why Join OnTonight</h2>
          <div className="why-grid">
            <div className="why-card">
              <h3>🎯 Mission-Driven</h3>
              <p>We're solving a $66.8B problem that impacts millions of hospitality professionals. Your work directly restores dignity to an entire industry.</p>
            </div>
            <div className="why-card">
              <h3>🚀 Early Stage Impact</h3>
              <p>Join during the Tampa Bay pilot and shape the product, culture, and strategy as we scale nationally.</p>
            </div>
            <div className="why-card">
              <h3>💎 Significant Equity</h3>
              <p>We offer competitive equity packages. Early team members build meaningful ownership in a potential unicorn.</p>
            </div>
            <div className="why-card">
              <h3>🧠 Learn & Grow</h3>
              <p>Work directly with experienced founder (27 years hospitality + tech background). Fast learning curve, high autonomy.</p>
            </div>
          </div>
        </section>

        <section className="open-positions">
          <h2>Open Positions</h2>
          <div className="jobs-grid">
            {jobs.map(job => (
              <div key={job.id} className="job-card" onClick={() => setSelectedJob(job)}>
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className="job-department">{job.department}</span>
                </div>
                <div className="job-meta">
                  <span>📍 {job.location}</span>
                  <span>⏰ {job.type}</span>
                  <span>💰 {job.salary}</span>
                </div>
                <p className="job-description">{job.description}</p>
                <button className="btn-view">View Details →</button>
              </div>
            ))}
          </div>
        </section>

        {selectedJob && (
          <div className="job-modal" onClick={() => setSelectedJob(null)}>
            <div className="job-modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedJob(null)}>✕</button>
              <div className="modal-header">
                <h2>{selectedJob.title}</h2>
                <div className="modal-meta">
                  <span>{selectedJob.department}</span>
                  <span>{selectedJob.location}</span>
                  <span>{selectedJob.type}</span>
                </div>
                <p className="modal-salary">{selectedJob.salary}</p>
              </div>
              
              <div className="modal-body">
                <p className="modal-description">{selectedJob.description}</p>
                
                <div className="modal-section">
                  <h3>Responsibilities</h3>
                  <ul>
                    {selectedJob.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                
                <div className="modal-section">
                  <h3>Qualifications</h3>
                  <ul>
                    {selectedJob.qualifications.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                
                <a href={selectedJob.applyLink} className="btn-apply">Apply Now</a>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .careers-page {
            min-height: 100vh;
            background: #0d1117;
            color: #f8fafc;
            font-family: 'Urbanist', -apple-system, system-ui, sans-serif;
            padding: 40px 24px;
          }
          
          .careers-header {
            max-width: 900px;
            margin: 0 auto 80px;
            text-align: center;
          }
          
          .back-link {
            display: inline-block;
            color: #d4a373;
            text-decoration: none;
            margin-bottom: 32px;
            font-size: 14px;
            transition: opacity 0.2s;
          }
          
          .back-link:hover {
            opacity: 0.7;
          }
          
          .careers-header h1 {
            font-size: 56px;
            font-weight: 600;
            letter-spacing: -0.025em;
            margin-bottom: 24px;
          }
          
          .header-lead {
            font-size: 20px;
            line-height: 1.7;
            color: rgba(248,250,252,0.75);
            max-width: 700px;
            margin: 0 auto;
          }
          
          .why-join {
            max-width: 1200px;
            margin: 0 auto 100px;
          }
          
          .why-join h2 {
            text-align: center;
            font-size: 40px;
            margin-bottom: 48px;
          }
          
          .why-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 24px;
          }
          
          .why-card {
            background: rgba(212,163,115,0.03);
            border: 1px solid rgba(212,163,115,0.15);
            padding: 32px;
            border-radius: 8px;
            transition: all 0.3s;
          }
          
          .why-card:hover {
            border-color: rgba(212,163,115,0.3);
            transform: translateY(-4px);
          }
          
          .why-card h3 {
            font-size: 20px;
            margin-bottom: 12px;
          }
          
          .why-card p {
            font-size: 15px;
            line-height: 1.6;
            color: rgba(248,250,252,0.7);
          }
          
          .open-positions {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .open-positions h2 {
            text-align: center;
            font-size: 40px;
            margin-bottom: 48px;
          }
          
          .jobs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 24px;
          }
          
          .job-card {
            background: rgba(212,163,115,0.03);
            border: 1px solid rgba(212,163,115,0.15);
            padding: 32px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
          }
          
          .job-card:hover {
            border-color: rgba(212,163,115,0.3);
            transform: translateY(-4px);
          }
          
          .job-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 16px;
          }
          
          .job-header h3 {
            font-size: 22px;
            margin: 0;
          }
          
          .job-department {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.1em;
            color: #d4a373;
            text-transform: uppercase;
            padding: 4px 12px;
            background: rgba(212,163,115,0.1);
            border-radius: 4px;
          }
          
          .job-meta {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 16px;
            font-size: 14px;
            color: rgba(248,250,252,0.6);
          }
          
          .job-description {
            font-size: 15px;
            line-height: 1.6;
            color: rgba(248,250,252,0.75);
            margin-bottom: 20px;
          }
          
          .btn-view {
            background: transparent;
            border: 1px solid rgba(212,163,115,0.3);
            color: #d4a373;
            padding: 10px 24px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            border-radius: 6px;
            font-family: inherit;
            transition: all 0.2s;
          }
          
          .btn-view:hover {
            background: rgba(212,163,115,0.1);
            border-color: #d4a373;
          }
          
          .job-modal {
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
          }
          
          .job-modal-content {
            background: #161b22;
            border: 1px solid rgba(212,163,115,0.2);
            border-radius: 12px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
          }
          
          .modal-close {
            position: absolute;
            top: 24px;
            right: 24px;
            background: transparent;
            border: none;
            color: #f8fafc;
            font-size: 28px;
            cursor: pointer;
            padding: 8px;
            line-height: 1;
            transition: color 0.2s;
          }
          
          .modal-close:hover {
            color: #d4a373;
          }
          
          .modal-header {
            padding: 48px 48px 32px;
            border-bottom: 1px solid rgba(212,163,115,0.15);
          }
          
          .modal-header h2 {
            font-size: 32px;
            margin-bottom: 16px;
          }
          
          .modal-meta {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            font-size: 14px;
            color: rgba(248,250,252,0.6);
            margin-bottom: 12px;
          }
          
          .modal-meta span {
            padding: 4px 12px;
            background: rgba(212,163,115,0.08);
            border-radius: 4px;
          }
          
          .modal-salary {
            font-size: 18px;
            color: #d4a373;
            font-weight: 600;
          }
          
          .modal-body {
            padding: 32px 48px 48px;
          }
          
          .modal-description {
            font-size: 17px;
            line-height: 1.7;
            color: rgba(248,250,252,0.8);
            margin-bottom: 32px;
          }
          
          .modal-section {
            margin-bottom: 32px;
          }
          
          .modal-section h3 {
            font-size: 20px;
            color: #d4a373;
            margin-bottom: 16px;
          }
          
          .modal-section ul {
            list-style: none;
            padding: 0;
          }
          
          .modal-section li {
            font-size: 15px;
            line-height: 1.7;
            color: rgba(248,250,252,0.75);
            padding-left: 24px;
            position: relative;
            margin-bottom: 12px;
          }
          
          .modal-section li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: #d4a373;
          }
          
          .btn-apply {
            display: inline-block;
            background: #d4a373;
            color: #0d1117;
            padding: 14px 32px;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 6px;
            transition: all 0.2s;
          }
          
          .btn-apply:hover {
            background: #c4936b;
            transform: translateY(-2px);
          }
          
          @media (max-width: 768px) {
            .careers-header h1 { font-size: 36px; }
            .why-grid { grid-template-columns: 1fr; }
            .jobs-grid { grid-template-columns: 1fr; }
            .modal-header, .modal-body { padding: 24px; }
          }
        `}</style>
      </div>
    </>
  );
}
