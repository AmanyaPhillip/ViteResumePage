import { useState, useEffect, useCallback, memo } from 'react';
import OrbitalWheel from './components/OrbitalWheel';
import ParticleCanvas from './components/ParticleCanvas';
import ThemeSwitcher from './components/ThemeSwitcher';
import ProjectModal from './components/ProjectModal';
import { useTheme } from './context/ThemeContext';
import './App.css';

// ─── CONTENT ──────────────────────────────────────────────────────────────────

const D = {
  name:         'Phillip Asiimwe',
  brand:        'Technical Organicist',
  titles:       ['AI Enablement Specialist', 'Agentic AI Champion'],
  location:     'Ottawa, Canada',
  availability: 'Open to Remote & Relocation',
  email:        'amanyaphillip@outlook.com',
  phone:        '+1 (613) 890-9830',
  linkedin:     'https://www.linkedin.com/in/phillip-amanya/',
  github:       'https://github.com/AmanyaPhillip',

  summary: 'Full-stack developer with 3+ years of QA engineering experience at Infosys, specializing in Flutter mobile applications and cloud-integrated backends. Expert at distilling complex technical concepts for public audiences, rooted in 3 years as a Carleton University Teaching Assistant and a career as an AI Advocate. I apply a systematic, quality-first approach to AI-augmented development, delivering production-grade software for global clients.',

  skills: [
    { category: 'AI Orchestration', items: ['Claude Code', 'LLM Orchestration', 'Cursor', 'Prompt Engineering', 'AI Studio'] },
    { category: 'Core Software',    items: ['Next.js 15', 'React 19', 'Flutter', 'Node.js', 'Spring Boot', 'TypeScript'] },
    { category: 'Data Systems',     items: ['Supabase', 'Firebase', 'SQL', 'PostgreSQL', 'SQLite'] },
    { category: 'Quality & DevOps', items: ['Selenium', 'Appium', 'Maestro', 'Jest', 'Azure CI/CD', 'Docker'] },
    { category: 'Enablement',       items: ['Public Speaking', 'Technical Writing', 'Mentorship', 'PTAC Method'] },
  ],

  experience: [
    {
      role:     'AI Enablement Specialist',
      company:  'Independent',
      location: 'Remote',
      period:   '2025 – Present',
      points: [
        { label: 'AI Advocacy',      text: 'Delivering public talks on LLM orchestration and agentic AI systems, helping audiences move beyond basic prompts to production-grade AI workflows.' },
        { label: 'AI Literacy',      text: 'Empowering underserved communities with the PTAC method for responsible AI adoption, demystifying AI for youth and emerging practitioners.' },
        { label: 'Consulting',       text: 'Advising organizations on agentic AI integration, LLM tooling strategies, and human-in-the-loop oversight systems.' },
      ],
    },
    {
      role:     'Senior Quality Assurance Associate',
      company:  'Infosys Limited',
      location: 'Remote',
      period:   '2023 – 2025',
      points: [
        { label: 'QA Leadership',       text: 'Chaired weekly synchronization meetings to define high-level test strategies, aligning objectives with critical business goals across cross-functional teams.' },
        { label: 'Mentorship',          text: 'Onboarded and mentored 4+ junior QA engineers, accelerating proficiency in Selenium frameworks and ensuring 100% adherence to client quality standards.' },
        { label: 'CI/CD Integration',   text: 'Integrated automated API regression suites into Azure CI/CD pipelines, improving backend integration quality by 30%.' },
        { label: 'Backend Validation',  text: 'Developed custom SQL scripts to cross-verify API results against database states, exposing critical data synchronization issues before production.' },
        { label: 'Mobile Optimization', text: 'Leveraged Appium and Maestro to streamline mobile testing workflows, reducing mobile-specific UI regressions by 15%.' },
      ],
    },
    {
      role:     'Junior Quality Assurance Associate',
      company:  'Infosys Limited',
      location: 'Remote',
      period:   '2022 – 2023',
      points: [
        { label: 'Test Coverage',      text: 'Expanded overall test coverage by 25% through detailed test case creation and collaboration with Business Analysts to eliminate requirement ambiguity.' },
        { label: 'System Stability',   text: 'Refactored legacy test cases to align with modern microservice architectures, reducing flaky test results by 20%.' },
        { label: 'Defect Management',  text: 'Documented critical data synchronization issues using SQL, preventing intermittent UI failures from reaching production.' },
      ],
    },
    {
      role:     'Undergraduate Teaching Assistant',
      company:  'Carleton University',
      location: 'Ottawa, ON',
      period:   '2018 – 2021',
      points: [
        { label: 'Instruction',       text: 'Facilitated laboratory sessions for 50+ students in foundational Java, Python, and C, ensuring high conceptual retention across algorithms coursework.' },
        { label: 'Technical Guidance', text: 'Conducted one-on-one office hours to distill complex algorithmic concepts into accessible, actionable steps for students.' },
        { label: 'Mentorship',        text: 'Fostered trust-based relationships with students, offering personalized debugging assistance and professional development support.' },
      ],
    },
  ],

  education: {
    degree:      'B.Sc. Computer Science',
    school:      'Carleton University',
    location:    'Ottawa, ON',
    period:      '2016 – 2021',
    distinction: 'With Distinction',
    gpa:         'CGPA 10.7 / 12',
    courses: [
      'Algorithms & Data Structures',
      'Software Engineering',
      'Database Systems',
      'Operating Systems',
      'Computer Networks',
      'Programming Languages',
      'Compiler Design',
      'Computer Architecture',
      'Artificial Intelligence',
      'Parallel Computing',
      'Discrete Mathematics & Logic',
      'Object-Oriented Design',
    ],
  },

  certifications: [
    {
      name:   'IBM Full Stack Software Developer Professional Certificate',
      issuer: 'Coursera',
      year:   '2025',
      link:   'https://coursera.org/share/d152dbab8e9bb0cb4475513980e6754c',
    },
    {
      name:   'Google AI Professional Certificate',
      issuer: 'Coursera',
      year:   '2026',
      link:   'https://coursera.org/verify/professional-cert/81HQPY8E7Z9H',
    },
  ],

  awards: [
    {
      title:       'Delivery Ninja Award',
      year:        '2023',
      issuer:      'Infosys Limited',
      description: 'Recognized for consistently delivering exceptional work ahead of deadlines, demonstrating strong ownership and dedication to quality.',
    },
  ],

  projects: [
    // ── PORTFOLIO: existing projects ──────────────────────────────────────────
    {
      title:       'Asset Rental Management Platform',
      status:      'PORTFOLIO',
      stack:       ['Flutter', 'Next.js 15', 'Supabase', 'Stripe'],
      description: 'Production alternative to Airbnb for rentals in Zimbabwe. Role-based access for guests and cleaners.',
      bullets: [
        'Handles real-world Stripe payments and automated cleaning job dispatch.',
        'Engineered Hive sync queue for reliable performance in low-connectivity zones.',
      ],
    },
    {
      title:       'Claude Code Remote Approval Bridge',
      status:      'PORTFOLIO',
      stack:       ['Node.js', 'Telegram API', 'IPC', 'AI Hooks'],
      description: 'Human-in-the-loop oversight system for AI coding agents — intercepts tool executions for mobile approval.',
      bullets: [
        'Dual-process IPC architecture for zero-latency AI action monitoring.',
        'Enables complete remote control of live AI sessions from any location.',
      ],
    },
    {
      title:       'Outlook Inbox AI Classifier',
      status:      'PORTFOLIO',
      stack:       ['Gemini API', 'MS Graph', 'OpenRouter'],
      description: 'CLI tool for intelligent email classification using multi-model orchestration for cost/accuracy optimization.',
      bullets: [
        'Reduced AI token costs by ~80% through advanced heuristic-first routing.',
        'Robust failover mechanisms across 4 distinct LLM providers.',
      ],
    },
    {
      title:       'Farm Livestock Management App',
      status:      'PORTFOLIO',
      stack:       ['Flutter', 'SQLite'],
      description: '100% offline livestock tracking app for rural Ugandan farming operations.',
      bullets:     [],
    },
    // ── LIVE: spotifyVS — production music compatibility app ────────────────────
    {
      title:       'spotifyVS',
      status:      'LIVE',
      stack:       ['React 19', 'Node.js', 'Firebase', 'Spotify API'],
      description: 'Music taste compatibility web app — compare liked songs, genres, and artists with anyone.',
      personalStatement: `This project started one afternoon while my wife and I were sharing the couch, but existing in two different worlds. I was working on a presentation, she was DJing, and we both had our headphones on. I glanced over, wondering what she was listening to, which quickly evolved into a bigger question: "How compatible is our music taste?"\n\nTo answer that, I used AI Studio to build an application that measures exactly that. While researching, I found that Spotify's API can be quite restrictive regarding the data you can pull. Working within those constraints, I narrowed the scope to liked songs, playlists, and genres.\n\nI created a simple web app where you log in with Spotify to generate a custom link to share with friends or family. When they log in, the app generates a comparison of your liked songs, genres, and similar artists. You can generate links for multiple people, save past comparisons, and even see a dedicated section for songs they liked that you haven't discovered yet—a great way to explore each other's music tastes. If demand grows, I plan to add group comparisons and leaderboards to track who listened the most in a given month.`,
    },
    // ── PORTFOLIO: academic & experimental ────────────────────────────────────
    {
      title:       'LUXO Place Resident App',
      status:      'PORTFOLIO',
      stack:       ['Flutter', 'Provider', 'Calendly'],
      description: 'Unified resident app for a luxury complex — maintenance, access, community, and amenity booking.',
      personalStatement: `I built this app out of personal frustration: every time I went to my building's service page, I had to repeatedly fill in my name, number, and apartment details—information that never changes. I started by automating that process and adding a feature to save a detailed record of each submitted request, rather than just receiving a basic acknowledgment.\n\nFrom there, the project naturally expanded. I wanted my lease handy to easily review terms, and I realized there was a completely separate app just for letting guests and delivery drivers into the building. I created a unified concept to handle access, avoiding the need for multiple disjointed apps.\n\nThe real turning point came when a neighbor mentioned they were moving out because the building felt like it was missing something. I realized this place needed a community. People needed a way to tell a neighbor they left their car lights on in the basement to save them from a dead battery. So, I added community features: a lost-and-found feed, a dog-lovers group, and amenities booking.\n\nBefore I knew it, I had built a comprehensive apartment management app. My ultimate goal is for my building's management to issue it to all residents, so we can have the collective power that comes with a group of individuals living through the same experience.`,
    },
    {
      title:       'Online Banking Web Application',
      status:      'PORTFOLIO',
      stack:       ['Spring Boot 3', 'Spring Security'],
      description: 'Secure portal with layered architecture and role-based access control.',
      github:      'https://github.com/AmanyaPhillip/Portfolio/tree/main/Software%20Development/Java/BankApp',
    },
    {
      title:       'Maze Generator & Pathfinder',
      status:      'PORTFOLIO',
      stack:       ['Java 11', 'Recursive DFS'],
      description: 'Desktop visualizer for procedural maze generation and algorithmic analysis.',
    },
    {
      title:       'Taxi Dispatch Simulation',
      status:      'PORTFOLIO',
      stack:       ['Java 11', 'JavaFX', 'Event-driven'],
      description: 'Real-time simulator managing taxi dispatch with live operational metrics.',
      github:      'https://github.com/AmanyaPhillip/Portfolio/tree/main/Software%20Development/Java/Taxi%20Dispatch%20Simulation/taxidispatcher',
    },
    {
      title:       'Parking Lot Occupancy Detector',
      status:      'PORTFOLIO',
      stack:       ['Python', 'OpenCV', 'NumPy'],
      description: 'CV system using Laplacian edge variance for real-time occupancy detection.',
    },
    // ── INITIATIVE: community & advocacy work ─────────────────────────────────
    {
      title:       'REWIRE The Future',
      status:      'INITIATIVE',
      stack:       ['Public Speaking', 'AI Literacy', 'PTAC Method'],
      description: 'Youth AI literacy initiative — empowering underserved communities to leverage AI responsibly.',
      personalStatement: `I recently had a blast presenting to an underserved youth community about the practical uses—and the flaws—of Artificial Intelligence. My goal was to empower them to leverage AI so they aren't left behind in the rapidly evolving race to improve productivity.\n\nThe biggest barrier to successful adoption right now is simply a lack of clear, proper understanding of what AI is and what it can and cannot do. I wanted to demystify the technology and encourage them to start using it powerfully and responsibly using the PTAC method.`,
    },
  ],

  community: {
    advocacy: [
      'Delivering high-impact public talks on LLM orchestration — helping audiences move beyond basic prompts to complex, high-value AI workflows.',
      '3 years translating high-level CS theory (Algorithms, Data Structures) into accessible student tutorials and production-ready code for 50+ students.',
      'Member of Google Developer Groups Ottawa — volunteer for local tech meetups and community education events.',
    ],
    interests: ['Music Production & AI', 'Nature Walks', 'Basketball', 'Rugby', 'Tennis'],
    leadership: [
      {
        role:      'Assistant Restaurant Manager',
        company:   'Simba Restaurant',
        period:    '2021 – 2022',
        highlight: 'Managed bookkeeping, procurement, staff training, and local marketing campaigns — maintaining 100% food safety compliance.',
      },
      {
        role:      'Assistant Store Front Manager',
        company:   'Shoppers Drug Mart',
        period:    '2020 – 2021',
        highlight: 'Directed daily operations, end-of-day financial reconciliation, inventory control, and frontline staff supervision.',
      },
    ],
  },
};

const NAV_SECTIONS = ['expertise', 'experience', 'projects', 'community', 'contact', 'education'];

// ─── STYLES (shared primitives) ────────────────────────────────────────────────

const S = {
  mono: { fontFamily: 'var(--font-sans)' },
  serif: { fontFamily: 'var(--font-serif)' },
  label: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  sectionHeading: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 700,
    lineHeight: 1.1,
    margin: '1rem 0 2.5rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '5rem 1.5rem',
  },
};

// ─── NAVBAR ────────────────────────────────────────────────────────────────────

function NavBar({ activeSection, onNav, onDownload }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(248,246,241,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '2px solid #1a1a1a',
      height: '64px',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem',
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
        >
          <div style={{ ...S.serif, fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.15 }}>
            P. Asiimwe
          </div>
          <div style={{ ...S.label, fontSize: '0.58rem', color: '#c45c00' }}>
            Technical Organicist
          </div>
        </button>

        {/* Section links */}
        <div className="nav-links" style={{ gap: '1.5rem', alignItems: 'center' }}>
          {NAV_SECTIONS.map(s => (
            <button
              key={s}
              onClick={() => onNav(s)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                ...S.label, fontSize: '0.65rem',
                color: activeSection === s ? '#c45c00' : '#767676',
                borderBottom: activeSection === s ? '2px solid #c45c00' : '2px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onDownload}
          style={{
            background: '#1a1a1a', color: '#f8f6f1', border: 'none',
            padding: '0.5rem 1.25rem',
            ...S.label, fontSize: '0.68rem',
            cursor: 'pointer',
            boxShadow: '3px 3px 0px #c45c00',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '4px 4px 0px #c45c00'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '3px 3px 0px #c45c00'; }}
        >
          Download CV
        </button>
      </div>
    </nav>
  );
}

// ─── SIDE NAV ──────────────────────────────────────────────────────────────────

function SideNav({ activeSection, onNav }) {
  const [hov, setHov] = useState(null);
  return (
    <div className="side-nav">
      {NAV_SECTIONS.map(s => (
        <div key={s} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button
            className={`side-nav-dot${activeSection === s ? ' active' : ''}`}
            onClick={() => onNav(s)}
            onMouseEnter={() => setHov(s)}
            onMouseLeave={() => setHov(null)}
            aria-label={s}
          />
          {hov === s && (
            <span style={{
              position: 'absolute', left: '1.25rem',
              background: '#1a1a1a', color: '#f8f6f1',
              padding: '0.2rem 0.6rem',
              ...S.label, fontSize: '0.6rem',
              whiteSpace: 'nowrap', pointerEvents: 'none',
            }}>
              {s}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────

function HeroSection({ onNav }) {
  return (
    <section
      id="hero"
      className="lattice-bg scroll-section"
      style={{ minHeight: '100vh', paddingTop: '64px', display: 'flex', alignItems: 'center' }}
    >
      <div
        className="hero-grid"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem', width: '100%' }}
      >
        {/* ── Left: Text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="section-label">Technical Organicist</div>

          <h1 style={{ ...S.serif, fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0 }}>
            Phillip
            <br />
            <span style={{ color: '#c45c00' }}>Asiimwe</span>
          </h1>

          {/* Title tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {D.titles.map(t => (
              <span key={t} style={{
                border: '2px solid #1a1a1a',
                padding: '0.25rem 0.75rem',
                ...S.label, fontSize: '0.65rem',
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Location + status */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ ...S.mono, fontSize: '0.82rem', color: '#767676' }}>
              📍 {D.location}
            </span>
            <span style={{
              background: '#1a5c3a', color: '#f8f6f1',
              padding: '0.2rem 0.65rem',
              ...S.label, fontSize: '0.6rem',
            }}>
              {D.availability}
            </span>
          </div>

          {/* Summary */}
          <p style={{ ...S.mono, fontSize: '0.9rem', lineHeight: 1.75, color: '#444', maxWidth: '520px', margin: 0 }}>
            {D.summary}
          </p>

          {/* Contact row */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Email',    href: `mailto:${D.email}` },
              { label: 'Phone',    href: `tel:${D.phone}` },
              { label: 'LinkedIn', href: D.linkedin, external: true },
              { label: 'GitHub',   href: D.github,   external: true },
            ].map(({ label, href, external }) => (
              <a key={label} href={href}
                className="contact-link"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Photo + Wheel ── */}
        <div className="hero-right">
          {/* Orbital Wheel with photo in hub */}
          <OrbitalWheel onSegmentClick={onNav} />

          <p style={{ ...S.label, fontSize: '0.58rem', color: '#767676', textAlign: 'center' }}>
            Click an orbit node to navigate
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERTISE ─────────────────────────────────────────────────────────────────

function ExpertiseSection() {
  return (
    <section id="expertise" className="scroll-section" style={{ background: '#1a1a1a', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label light">Expertise</div>
        <h2 style={{ ...S.sectionHeading, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#f8f6f1' }}>
          Technical Matrix
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {D.skills.map(({ category, items }) => (
            <div
              key={category}
              className="bento-card-dark"
              style={{ padding: '1.5rem' }}
            >
              <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00', marginBottom: '1rem' }}>
                {category}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {items.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}

          {/* AI Governance Callout */}
          <div
            style={{
              background: 'linear-gradient(135deg, #4a2d6b 0%, #6b3d8e 100%)',
              border: '2px solid #00d9ff',
              boxShadow: '6px 6px 0px #00d9ff',
              padding: '2rem',
              gridColumn: 'span auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ ...S.label, fontSize: '0.62rem', color: '#00d9ff' }}>
              Focus Area
            </div>
            <h3 style={{ ...S.serif, fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#f8f6f1' }}>
              AI Governance
            </h3>
            <p style={{ ...S.mono, fontSize: '0.85rem', lineHeight: 1.6, margin: 0, color: '#e8d5f2' }}>
              Exploring responsible AI deployment, agentic systems oversight, and human-in-the-loop frameworks for enterprise adoption.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ────────────────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-section" style={{ background: '#f8f6f1', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label">Experience</div>
        <h2 style={{ ...S.sectionHeading, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Professional Timeline
        </h2>

        <div className="timeline-container">
          <div className="timeline-line" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {D.experience.map((job, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div
                  className="timeline-dot"
                  style={{ background: i === 0 ? '#c45c00' : '#1a1a1a' }}
                />

                <div className="bento-card" style={{ padding: '2rem' }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem',
                  }}>
                    <div>
                      <h3 style={{ ...S.serif, fontSize: '1.35rem', fontWeight: 700, margin: '0 0 0.3rem' }}>
                        {job.role}
                      </h3>
                      <div style={{ ...S.mono, fontSize: '0.85rem', color: '#c45c00', fontWeight: 700 }}>
                        {job.company} · {job.location}
                      </div>
                    </div>
                    <span style={{
                      border: '2px solid #1a1a1a', padding: '0.25rem 0.75rem',
                      ...S.label, fontSize: '0.65rem', whiteSpace: 'nowrap',
                    }}>
                      {job.period}
                    </span>
                  </div>

                  {/* Points */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {job.points.map((p, j) => (
                      <div key={j} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                        <span style={{ color: '#c45c00', fontSize: '0.6rem', marginTop: '0.5rem', flexShrink: 0 }}>▸</span>
                        <p style={{ ...S.mono, fontSize: '0.865rem', lineHeight: 1.7, margin: 0, color: '#333' }}>
                          <strong style={{ fontWeight: 700 }}>{p.label}:</strong> {p.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ─────────────────────────────────────────────────────────────────

function EducationSection() {
  return (
    <section id="education" className="scroll-section" style={{ background: '#f0ede6', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label">Education</div>
        <h2 style={{ ...S.sectionHeading, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Academic Foundation
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {/* Degree card */}
          <div className="bento-card" style={{ padding: '2rem' }}>
            <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00', marginBottom: '0.75rem' }}>
              Degree
            </div>
            <h3 style={{ ...S.serif, fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, margin: '0 0 0.4rem' }}>
              {D.education.degree}
            </h3>
            <div style={{ ...S.mono, fontSize: '0.9rem', color: '#c45c00', fontWeight: 700, marginBottom: '0.3rem' }}>
              {D.education.school}
            </div>
            <div style={{ ...S.mono, fontSize: '0.8rem', color: '#767676', marginBottom: '1rem' }}>
              {D.education.location} · {D.education.period}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span style={{ background: '#1a1a1a', color: '#f8f6f1', padding: '0.2rem 0.65rem', ...S.label, fontSize: '0.6rem' }}>
                {D.education.distinction}
              </span>
              <span style={{ border: '2px solid #1a1a1a', padding: '0.15rem 0.65rem', ...S.label, fontSize: '0.6rem' }}>
                {D.education.gpa}
              </span>
            </div>
            <div style={{ ...S.label, fontSize: '0.6rem', color: '#767676', marginBottom: '0.5rem' }}>
              Key Coursework
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {D.education.courses.map(c => (
                <span key={c} style={{ border: '1.5px solid #ccc', padding: '0.15rem 0.55rem', ...S.label, fontSize: '0.58rem', color: '#444', background: '#fff' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Certifications */}
            {D.certifications.map((cert, i) => (
              <div key={i} className="bento-card" style={{ padding: '1.5rem' }}>
                <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00', marginBottom: '0.5rem' }}>
                  Certificate · {cert.year}
                </div>
                <div style={{ ...S.serif, fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.25rem' }}>
                  {cert.name}
                </div>
                <div style={{ ...S.mono, fontSize: '0.8rem', color: '#767676', marginBottom: cert.link ? '0.75rem' : 0 }}>
                  {cert.issuer}
                </div>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer"
                    style={{ ...S.label, fontSize: '0.65rem', color: '#c45c00', textDecoration: 'none', borderBottom: '2px solid #c45c00', paddingBottom: '1px' }}>
                    View Certificate →
                  </a>
                )}
              </div>
            ))}

            {/* Award */}
            {D.awards.map((award, i) => (
              <div key={i} className="bento-card" style={{ padding: '1.5rem', background: '#1a1a1a', color: '#f8f6f1', borderColor: '#333', boxShadow: '4px 4px 0px #c45c00' }}>
                <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00', marginBottom: '0.5rem' }}>
                  Award · {award.year}
                </div>
                <div style={{ ...S.serif, fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                  {award.title}
                </div>
                <div style={{ ...S.mono, fontSize: '0.78rem', color: '#aaa', marginBottom: '0.65rem' }}>
                  {award.issuer}
                </div>
                <div style={{ ...S.mono, fontSize: '0.8rem', color: '#ccc', lineHeight: 1.65 }}>
                  {award.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECT CARD ──────────────────────────────────────────────────────────────
// Memoised so the grid doesn't re-render cards that haven't changed when the
// modal open/close state updates in the parent ProjectsSection.

const ProjectCard = memo(function ProjectCard({ project, onClick }) {
  const hasStatement = Boolean(project.personalStatement);

  // Badge style varies by status to match the modal's StatusBadge colour scheme
  const badgeStyle = (() => {
    if (project.status === 'LIVE')       return { background: '#1a5c3a', color: '#fff' };
    if (project.status === 'INITIATIVE') return { background: '#4a2d6b', color: '#f8f6f1' };
    // PORTFOLIO — orange outline (not filled, to distinguish from LIVE)
    return { border: '2px solid #1a1a1a', color: '#1a1a1a' };
  })();

  return (
    // project-card-clickable adds cursor:pointer + the ↗ hover indicator (CSS)
    // when the card has a personal statement to show; otherwise it's a plain card.
    <div
      className={`bento-card${hasStatement ? ' project-card-clickable' : ''}`}
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
      onClick={hasStatement ? onClick : undefined}
      role={hasStatement ? 'button' : undefined}
      tabIndex={hasStatement ? 0 : undefined}
      onKeyDown={hasStatement ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      aria-label={hasStatement ? `Open ${project.title} details` : undefined}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <h3 style={{ ...S.serif, fontSize: '1rem', fontWeight: 700, margin: 0, lineHeight: 1.3, flex: 1 }}>
          {project.title}
        </h3>
        <span style={{ ...badgeStyle, padding: '0.15rem 0.55rem', ...S.label, fontSize: '0.58rem', whiteSpace: 'nowrap' }}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p style={{ ...S.mono, fontSize: '0.82rem', lineHeight: 1.65, margin: 0, color: '#444' }}>
        {project.description}
      </p>

      {/* Bullets — shown on cards that don't use a personal statement */}
      {!hasStatement && project.bullets && project.bullets.length > 0 && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {project.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#c45c00', fontSize: '0.6rem', marginTop: '0.35rem', flexShrink: 0 }}>▸</span>
              <span style={{ ...S.mono, fontSize: '0.78rem', lineHeight: 1.55, color: '#555' }}>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* "Read more" hint for cards with a personal statement */}
      {hasStatement && (
        <p style={{ ...S.label, fontSize: '0.58rem', color: '#c45c00', margin: 0 }}>
          Click to read the full story
        </p>
      )}

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.25rem' }}>
        {project.stack.map(s => (
          <span key={s} style={{
            border: '1.5px solid #ccc', padding: '0.15rem 0.55rem',
            ...S.label, fontSize: '0.6rem', color: '#555', fontWeight: 600,
          }}>
            {s}
          </span>
        ))}
      </div>

      {/* GitHub link — only shown on cards without a personal statement (modal handles it otherwise) */}
      {!hasStatement && project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()} // prevent card click when tapping the link
          style={{ ...S.label, fontSize: '0.65rem', color: '#1a1a1a', textDecoration: 'none', borderBottom: '2px solid #1a1a1a', paddingBottom: '1px', alignSelf: 'flex-start' }}
        >
          View on GitHub →
        </a>
      )}
    </div>
  );
});

// ─── PROJECTS ──────────────────────────────────────────────────────────────────

function ProjectsSection() {
  // selectedProject holds the project object (or null). We store the object
  // directly rather than an index so the modal never needs to look up D.projects.
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // useCallback prevents new function references on every render, keeping
  // memoised ProjectCards from re-rendering when unrelated state changes.
  const openModal = useCallback((project) => {
    setSelectedProject(project);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    // Keep selectedProject in state while the modal's close animation plays
    // (the dialog element handles its own visibility via isOpen).
  }, []);

  const live      = D.projects.filter(p => p.status === 'LIVE');
  const portfolio = D.projects.filter(p => p.status === 'PORTFOLIO');
  const initiative = D.projects.filter(p => p.status === 'INITIATIVE');

  // Counts for the subtitle line — derived from data, not hard-coded
  const liveCount = live.length;
  const portfolioCount = portfolio.length;

  return (
    <section id="projects" className="scroll-section lattice-bg" style={{ padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label">Projects</div>
        <h2 style={{ ...S.sectionHeading, fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '0.5rem' }}>
          Production & Portfolio
        </h2>
        <p style={{ ...S.mono, fontSize: '0.85rem', color: '#767676', marginBottom: '3rem' }}>
          {liveCount} live {liveCount === 1 ? 'system' : 'systems'} shipped · {portfolioCount} portfolio {portfolioCount === 1 ? 'project' : 'projects'}
        </p>

        {/* ── LIVE ── */}
        {live.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ background: '#1a5c3a', color: '#fff', padding: '0.15rem 0.55rem', ...S.label, fontSize: '0.58rem' }}>LIVE</span>
              <span style={{ ...S.label, fontSize: '0.65rem', color: '#767676' }}>Production Systems</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.15rem' }}>
              {live.map((p) => (
                <ProjectCard
                  key={p.title}
                  project={p}
                  onClick={() => openModal(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── PORTFOLIO ── */}
        {portfolio.length > 0 && (
          <div style={{ marginBottom: initiative.length > 0 ? '2.5rem' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ border: '2px solid #1a1a1a', padding: '0.1rem 0.55rem', ...S.label, fontSize: '0.58rem' }}>PORTFOLIO</span>
              <span style={{ ...S.label, fontSize: '0.65rem', color: '#767676' }}>Academic & Experimental</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.15rem' }}>
              {portfolio.map((p) => (
                <ProjectCard
                  key={p.title}
                  project={p}
                  onClick={() => openModal(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── INITIATIVE ── */}
        {initiative.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ background: '#4a2d6b', color: '#f8f6f1', padding: '0.15rem 0.55rem', ...S.label, fontSize: '0.58rem' }}>INITIATIVE</span>
              <span style={{ ...S.label, fontSize: '0.65rem', color: '#767676' }}>Community & Advocacy</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.15rem' }}>
              {initiative.map((p) => (
                <ProjectCard
                  key={p.title}
                  project={p}
                  onClick={() => openModal(p)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal is rendered inside the section but uses native <dialog> top-layer,
          so its visual position is unaffected by this DOM placement. */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </section>
  );
}

// ─── COMMUNITY ─────────────────────────────────────────────────────────────────

function CommunitySection() {
  return (
    <section id="community" className="scroll-section" style={{ background: '#1a1a1a', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label light">Community</div>
        <h2 style={{ ...S.sectionHeading, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#f8f6f1' }}>
          Beyond the Terminal
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {/* Advocacy */}
          <div className="bento-card-dark" style={{ padding: '2rem' }}>
            <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00', marginBottom: '1rem' }}>
              Advocacy & Mentorship
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {D.community.advocacy.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#c45c00', fontSize: '0.6rem', marginTop: '0.45rem', flexShrink: 0 }}>▸</span>
                  <span style={{ ...S.mono, fontSize: '0.83rem', lineHeight: 1.65, color: '#ccc' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bento-card-dark" style={{ padding: '2rem' }}>
            <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00', marginBottom: '1rem' }}>
              Interests
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {D.community.interests.map(item => (
                <span key={item} className="skill-tag">{item}</span>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="bento-card-dark" style={{ padding: '2rem' }}>
            <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00', marginBottom: '1rem' }}>
              Leadership Experience
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {D.community.leadership.map((item, i) => (
                <div key={i} style={{ borderLeft: '2px solid #444', paddingLeft: '0.75rem' }}>
                  <div style={{ ...S.serif, fontSize: '0.95rem', fontWeight: 700, color: '#f8f6f1', marginBottom: '0.1rem' }}>
                    {item.role}
                  </div>
                  <div style={{ ...S.mono, fontSize: '0.72rem', color: '#c45c00', fontWeight: 700, marginBottom: '0.3rem' }}>
                    {item.company} · {item.period}
                  </div>
                  <div style={{ ...S.mono, fontSize: '0.8rem', color: '#aaa', lineHeight: 1.6 }}>
                    {item.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────

function ContactSection() {
  const items = [
    { label: 'Email',    href: `mailto:${D.email}`,  display: D.email },
    { label: 'Phone',    href: `tel:${D.phone}`,     display: D.phone },
    { label: 'LinkedIn', href: D.linkedin,            display: 'linkedin.com/in/phillip-amanya', external: true },
    { label: 'GitHub',   href: D.github,              display: 'github.com/AmanyaPhillip',        external: true },
  ];

  return (
    <section id="contact" className="scroll-section" style={{ background: '#f8f6f1', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-label">Contact</div>
        <h2 style={{ ...S.sectionHeading, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05 }}>
          Let's Build<br />
          <span style={{ color: '#c45c00' }}>Something</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {items.map(({ label, href, display, external }) => (
            <a
              key={label}
              href={href}
              className="bento-card"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00' }}>{label}</div>
              <div style={{ ...S.mono, fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', wordBreak: 'break-all' }}>
                {display}
              </div>
              <div style={{ ...S.label, fontSize: '0.62rem', color: '#c45c00', marginTop: 'auto', paddingTop: '0.5rem' }}>
                Connect →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', borderTop: '2px solid #333', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
      <div style={{ ...S.serif, fontSize: '1rem', fontWeight: 700, color: '#f8f6f1', marginBottom: '0.25rem' }}>
        Phillip Asiimwe
      </div>
      <div style={{ ...S.label, fontSize: '0.6rem', color: '#c45c00', marginBottom: '1rem' }}>
        Technical Organicist
      </div>
      <div style={{ ...S.mono, fontSize: '0.72rem', color: '#767676' }}>
        Built with React & Tailwind CSS · Ottawa, Canada · {new Date().getFullYear()}
      </div>
    </footer>
  );
}

// ─── DOWNLOAD MODAL ────────────────────────────────────────────────────────────

function DownloadModal({ onDownload, onClose }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#f8f6f1', border: '3px solid #1a1a1a', boxShadow: '8px 8px 0px #1a1a1a', padding: '2.5rem', maxWidth: '400px', width: '90%' }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ ...S.serif, fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
          Download Resume
        </h3>
        <p style={{ ...S.mono, fontSize: '0.85rem', color: '#767676', margin: '0 0 1.75rem', lineHeight: 1.65 }}>
          Download Phillip's professional resume in PDF format.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={onDownload}
            style={{
              background: '#1a1a1a', color: '#f8f6f1', border: 'none',
              padding: '1rem 1.5rem',
              ...S.label, fontSize: '0.7rem',
              cursor: 'pointer', width: '100%',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: '3px 3px 0px #c45c00',
            }}
          >
            <span>Download PDF</span>
            <span>→</span>
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: '2px solid #ccc',
              padding: '0.75rem 1.5rem',
              ...S.label, fontSize: '0.7rem', color: '#767676',
              cursor: 'pointer', width: '100%',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection]       = useState('hero');
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ['hero', ...NAV_SECTIONS];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: '-64px 0px 0px 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollToSection = useCallback(id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleDownload = useCallback(() => {
    const a = document.createElement('a');
    a.href     = `${import.meta.env.BASE_URL}QA_resume.pdf`;
    a.download = 'Phillip_Asiimwe_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setShowDownloadModal(false);
  }, []);

  return (
    <div className="app-container">
      {/* LEFT PANEL: Fixed hero section with orbital wheel */}
      <div className="panel-left">
        <ParticleCanvas width={600} height={600} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
            Technical Organicist
          </div>

          <h1 style={{ ...S.serif, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em', margin: '0 0 1.5rem' }}>
            Phillip
            <br />
            <span style={{ color: '#c45c00' }}>Asiimwe</span>
          </h1>

          {/* Orbital Wheel */}
          <div style={{ marginBottom: '2rem' }}>
            <OrbitalWheel
              onSegmentClick={scrollToSection}
              profileImage={`${import.meta.env.BASE_URL}profile.jpg`}
            />
          </div>

          <p style={{ ...S.label, fontSize: '0.65rem', color: '#767676', marginBottom: '1.5rem' }}>
            Click an orbit node to navigate
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setShowDownloadModal(true)}
            style={{
              background: '#1a1a1a', color: '#f8f6f1', border: 'none',
              padding: '0.5rem 1.25rem',
              ...S.label, fontSize: '0.68rem',
              cursor: 'pointer',
              boxShadow: '3px 3px 0px #c45c00',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '4px 4px 0px #c45c00'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '3px 3px 0px #c45c00'; }}
          >
            Download CV
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: Scrollable content */}
      <div className="panel-right">
        <main>
          <ExpertiseSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <CommunitySection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Download Modal */}
      {showDownloadModal && (
        <DownloadModal onDownload={handleDownload} onClose={() => setShowDownloadModal(false)} />
      )}
    </div>
  );
}
