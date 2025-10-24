import React, { useState } from 'react';

const resume = {
  name: 'PHILLIP ASIIMWE',
  title: 'Senior Quality Assurance Associate',
  tagline: 'Transforming Quality Assurance Through Automation & Innovation',
  location: 'Ottawa, Ontario',
  email: 'amanyaphillip@outlook.com',
  phone: '(613) 890-9830',
  linkedin: 'https://linkedin.com/in/phillip-amanya',
  github: 'https://github.com/AmanyaPhillip',
  summary:
    'Detail-oriented QA Automation Engineer with 3+ years of experience designing, developing, and executing comprehensive test plans for complex enterprise web and mobile applications. Skilled in UI, API, and ETL testing, with strong proficiency in Selenium, Playwright, Postman and SQL. Adept at collaborating with cross-functional Agile teams to enhance automation coverage, improve test efficiency, and deliver robust, high-quality products. Skilled in identifying, documenting, and tracking bugs through project management tools while partnering with developers to reproduce, analyze, and resolve defects. Committed to continuous improvement through constructive feedback, automation best practices, and efficient QA workflows that ensure smooth, high-quality releases.',
  highlights: [
    { text: '3+ Years QA Experience', color: 'text-blue-600' },
    { text: '30% Test Efficiency Gain', color: 'text-emerald-600' },
    { text: '200+ Automated Tests', color: 'text-cyan-600' },
    { text: 'Full-Stack Testing', color: 'text-indigo-600' }
  ],
  technicalSkills: {
    'Automation & Tools': {
      items: ['Playwright', 'Selenium', 'Cypress', 'Postman', 'REST API Testing', 'Appium'],
      color: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    'Languages': {
      items: ['Java', 'Python', 'JavaScript', 'SQL'],
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    'Frameworks & DevOps': {
      items: ['Cucumber', 'Robot Framework', 'Azure DevOps', 'GitLab CI/CD', 'Jira'],
      color: 'bg-cyan-100 text-cyan-800 border-cyan-300'
    },
    'Testing Expertise': {
      items: ['UI Testing', 'Functional', 'Regression', 'Smoke', 'Performance', 'API Testing'],
      color: 'bg-sky-100 text-sky-800 border-sky-300'
    },
    'Databases': {
      items: ['MySQL', 'PostgreSQL', 'Advanced SQL', 'Data Validation'],
      color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    },
    'Methodologies': {
      items: ['Agile / Scrum', 'Shift-Left Testing', 'CI/CD', 'Risk-Based Testing'],
      color: 'bg-teal-100 text-teal-800 border-teal-300'
    }
  },
  experience: [
    {
      role: 'Software QA Associate (remote)',
      company: 'Infosys Limited',
      location: 'Ottawa, Ontario',
      date: 'Jun 2022 — May 2025',
      color: 'border-blue-500',
      bullets: [
        'Drives operational efficiency by designing, developing, and maintaining comprehensive end-to-end automated test suites across web, API, and data layers using Selenium, Playwright, and Postman, ensuring robust coverage of complex business rules and data transformations.',
        'Enhances data quality assurance through extensive SQL validation and database testing across relational and data warehouse environments (RDBMS, Data Lake), authoring complex queries and joins to validate data mappings, data integrity, and transformation logic.',
        'Executes and automates ETL and backend validation workflows to ensure accuracy across multiple ingestion and transformation pipelines, maintaining complete traceability and precise documentation for audit readiness and future QA reference.',
        'Collaborates cross-functionally within Agile and DevOps frameworks to define QA strategies, test data management approaches, and automation integration models that streamline delivery and support continuous quality improvement.',
        'Governed API quality and service reliability by validating endpoint integrity, schema compliance, and business logic consistency through Postman and REST Assured, ensuring system stability across distributed microservice architectures.',
        'Collaborates with cross-functional leadership in Agile and DevOps ecosystems to define enterprise QA strategy, test data governance, and automation integration — aligning QA maturity goals with business transformation initiatives.',
        'Leads defect triage and root cause analysis forums to drive data-informed quality improvements, utilizing Jira and Azure Test Plans for issue tracking, risk visibility, and stakeholder communication across development, product, and release teams.',
        'Orchestrates automation of 200+ smoke and regression test cases, reducing manual testing overhead by more than 30% and accelerating validation cycles to align with agile release timelines.'
      ]
    },
    {
      role: 'Teaching Assistant',
      company: 'Carleton University',
      location: 'Ottawa, Ontario',
      date: 'Sept 2017 — Apr 2021',
      color: 'border-emerald-500',
      bullets: [
        'Supported software engineering and computer science courses by evaluating, testing, and debugging student code submissions across multiple environments (Windows, Linux, macOS).',
        'Provided detailed, constructive feedback to students to improve code quality, adherence to requirements, and performance optimization.',
        'Designed and implemented automated grading and validation frameworks using Python and shell scripting, integrating with CI/CD pipelines to ensure consistent test execution and result reporting.',
        'Applied SQL and RDBMS concepts to validate data integrity, query results, and backend logic in student-built applications.',
        'Served as the first line of technical and customer support, assisting students and project teams in troubleshooting application defects, usability issues, and deployment errors with a focus on user experience and reliability.',
        'Fostered strong, trust-based relationships with students who consistently sought mentorship during office hours, offering personalized technical guidance, debugging assistance, and professional development support.'
      ]
    }
  ],
  education: {
    degree: 'Bachelor of Science: Computer Science with Distinction',
    school: 'Carleton University',
    location: 'Ottawa, Canada',
    date: 'Feb 2021',
    details: 'Gained foundational knowledge in Python, Java, C, C++, Haskell, Prolog, Database Structures and Management, and Algorithm Structures.'
  },
  awards: [
    {
      title: 'Delivery Ninja Award',
      year: '2023',
      description: 'Recognized for consistently delivering exceptional work ahead of deadlines, demonstrating a strong sense of ownership and dedication.',
      color: 'border-blue-500'
    },
    {
      title: 'IBM Full Stack Software Developer Professional Certificate',
      year: 'Aug 2025',
      description: 'Completed comprehensive professional certificate program covering full-stack development, cloud technologies, and modern software engineering practices.',
      color: 'border-cyan-500',
      link: 'https://coursera.org/share/d152dbab8e9bb0cb4475513980e6754c'
    }
  ],
  projects: [
    {
      title: 'Data Structures Library',
      description: 'Developed a comprehensive library of fundamental data structures to optimize algorithmic efficiency and improve runtime performance. Implemented common structures such as linked lists, stacks, queues, trees, and hash maps with focus on performance optimization.',
      technologies: ['Java 17', 'Maven', 'Data Structures', 'Algorithm Optimization'],
      githubLink: 'https://github.com/AmanyaPhillip/Portfolio/tree/main/Software%20Development/Java/DataSturctures/datastructures',
      color: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      title: 'Taxi Dispatch Simulation',
      description: 'Created a GUI-based taxi dispatch simulator demonstrating full-stack workflow and MVC architecture. Designed an interactive user interface for dispatch operations and real-time taxi tracking with efficient matching algorithms.',
      technologies: ['Java 11', 'JavaFX', 'Maven', 'MVC Pattern'],
      githubLink: 'https://github.com/AmanyaPhillip/Portfolio/tree/main/Software%20Development/Java/Taxi%20Dispatch%20Simulation/taxidispatcher',
      color: 'bg-cyan-100 text-cyan-800 border-cyan-300'
    },
    {
      title: 'Local Air Hockey',
      description: 'Built a multiplayer real-time air hockey game with chat functionality and physics simulation. Implemented real-time communication using Socket.IO for multiplayer gameplay and Matter.js for realistic physics.',
      technologies: ['Node.js', 'JavaScript ES6+', 'Socket.IO', 'Matter.js', 'HTML5'],
      githubLink: 'https://github.com/AmanyaPhillip/Portfolio/tree/main/Software%20Development/JavaScript/Local%20Airhocky',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      title: 'BankApp',
      description: 'Developed a secure online banking web application with core banking functionalities. Implemented secure authentication, encrypted password storage, and RESTful APIs for account management and transactions.',
      technologies: ['Java 17', 'Spring Boot', 'MySQL', 'JPA/Hibernate'],
      githubLink: 'https://github.com/AmanyaPhillip/Portfolio/tree/main/Software%20Development/Java/BankApp',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    },
    {
      title: 'Farm Management System',
      description: 'Mobile app to manage crops, monitor farm resources, and provide analytics. Implemented real-time updates for crop tracking and developed interactive dashboards for farm productivity metrics.',
      technologies: ['Dart', 'Flutter', 'Firebase', 'Mobile Development'],
      githubLink: 'https://github.com/AmanyaPhillip/Farm-Management',
      color: 'bg-teal-100 text-teal-800 border-teal-300'
    },
    {
      title: 'Geotab Tracker',
      description: 'Real-time GPS tracking web application for vehicles. Built interactive maps with live location tracking and filtering, ensuring cross-device responsiveness and performance optimization.',
      technologies: ['JavaScript ES6+', 'HTML5', 'Leaflet.js', 'GPS Tracking'],
      githubLink: 'https://github.com/AmanyaPhillip/geotab-tracker',
      color: 'bg-sky-100 text-sky-800 border-sky-300'
    }
  ]
};

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleDownload = () => {
    // Download the actual PDF resume
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}QA_resume.pdf`;
    link.download = 'Phillip_Asiimwe_QA_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadModal(false);
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {resume.name.split(' ')[0]}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs md:text-sm text-slate-600 font-medium">QA Engineer</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {['about', 'skills', 'experience', 'education', 'awards', 'projects'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-all capitalize ${
                    activeSection === section
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowDownloadModal(true)}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-md text-sm"
            >
              <span>📥</span>
              <span className="font-medium hidden sm:inline">Download Resume</span>
              <span className="font-medium sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-12 md:py-20 print:py-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-block px-3 md:px-4 py-1 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium mb-2 md:mb-4">
              ✨ Available for QA Opportunities
            </div>
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
              {resume.name}
            </h1>
            <p className="text-xl md:text-3xl font-light opacity-90">
              {resume.title}
            </p>
            <p className="text-base md:text-xl opacity-80 max-w-2xl mx-auto">
              {resume.tagline}
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 pt-4 md:pt-6">
              <a href={`mailto:${resume.email}`} className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm md:text-base">
                <span>📧</span>
                <span className="hidden sm:inline">{resume.email}</span>
                <span className="sm:hidden">Email</span>
              </a>
              <a href={`tel:${resume.phone}`} className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm md:text-base">
                <span>📱</span>
                <span className="hidden sm:inline">{resume.phone}</span>
                <span className="sm:hidden">Phone</span>
              </a>
              <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm md:text-base">
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <a href={resume.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-sm md:text-base">
                <span>💻</span>
                <span>GitHub</span>
              </a>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-6 md:pt-8 max-w-4xl mx-auto">
              {resume.highlights.map((highlight, idx) => (
                <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 hover:bg-white/30 transition-all transform hover:scale-105">
                  <div className="font-semibold text-sm md:text-base">{highlight.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12 space-y-12 md:space-y-16">
        
        {/* About Section */}
        <section id="about" className="scroll-mt-20">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center">
              <span className="text-3xl md:text-4xl mr-3">👨🏾‍💻</span>
              About Me
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-700">
              {resume.summary}
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center">
            <span className="text-3xl md:text-4xl mr-3">⚙️</span>
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Object.entries(resume.technicalSkills).map(([category, data], idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-2 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <h3 className="font-bold text-slate-900 mb-3 md:mb-4 text-base md:text-lg">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {data.items.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium border-2 ${data.color} transition-all hover:scale-110`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center">
            <span className="text-3xl md:text-4xl mr-3">💼</span>
            Work Experience
          </h2>
          <div className="space-y-6 md:space-y-8">
            {resume.experience.map((job, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 border-l-8 ${job.color} hover:shadow-2xl transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-6 space-y-2 md:space-y-0">
                  <div className="flex items-start space-x-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">{job.role}</h3>
                      <p className="text-base md:text-lg text-slate-700 font-medium">{job.company}</p>
                      <p className="text-sm md:text-base text-slate-600">{job.location}</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="inline-block px-3 md:px-4 py-1 md:py-2 bg-slate-100 text-slate-700 rounded-lg font-medium text-xs md:text-sm">
                      {job.date}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start text-sm md:text-base text-slate-700">
                      <span className="text-blue-600 mr-2 md:mr-3 mt-1 flex-shrink-0">▸</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="scroll-mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center">
            <span className="text-3xl md:text-4xl mr-3">🎓</span>
            Education
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-6 md:p-8 border-2 border-blue-200">
            <div className="flex items-start space-x-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                  {resume.education.degree}
                </h3>
                <p className="text-base md:text-lg text-slate-700 font-medium">{resume.education.school}</p>
                <p className="text-sm md:text-base text-slate-600">{resume.education.location}</p>
                <span className="inline-block mt-3 px-3 md:px-4 py-1 md:py-2 bg-blue-600 text-white rounded-lg font-medium text-sm md:text-base">
                  {resume.education.date}
                </span>
                <p className="text-sm md:text-base text-slate-700 mt-4 leading-relaxed">
                  {resume.education.details}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="scroll-mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center">
            <span className="text-3xl md:text-4xl mr-3">🏆</span>
            Awards & Achievements
          </h2>
          <div className="space-y-4 md:space-y-6">
            {resume.awards.map((award, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 border-l-8 ${award.color} hover:shadow-2xl transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 md:mb-4 space-y-2 md:space-y-0">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                      {award.title}
                    </h3>
                  </div>
                  <span className="inline-block px-3 md:px-4 py-1 md:py-2 bg-slate-100 text-slate-700 rounded-lg font-medium text-xs md:text-sm self-start">
                    {award.year}
                  </span>
                </div>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  {award.description}
                </p>
                {award.link && (
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mt-4 text-sm md:text-base"
                  >
                    <span>🔗</span>
                    <span>View Certificate</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-20 pb-8 md:pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center">
            <span className="text-3xl md:text-4xl mr-3">🚀</span>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {resume.projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-2 border-slate-200 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{project.title}</h3>
                <p className="text-sm md:text-base text-slate-700 mb-3 md:mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium border-2 ${project.color}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
                >
                  <span>💻</span>
                  <span>View on GitHub</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm print:hidden" onClick={() => setShowDownloadModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">Download Resume</h3>
            <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6">
              Download my professional QA resume in PDF format.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 text-sm md:text-base"
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl md:text-2xl">📄</span>
                  <span className="font-medium">Download PDF Resume</span>
                </span>
                <span>→</span>
              </button>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-6 md:py-8 print:hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm md:text-base text-slate-400">
            © 2025 {resume.name}. Built with React & Tailwind CSS.
          </p>
          <p className="text-slate-500 text-xs md:text-sm mt-2">
            Looking for a dedicated QA professional? Let's connect!
          </p>
        </div>
      </footer>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          nav, footer, button {
            display: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}