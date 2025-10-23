import React from 'react';

const resume = {
  name: 'PHILLIP ASIIMWE',
  title: 'Senior Quality Assurance Associate',
  location: 'Ottawa, Ontario',
  email: 'amanyaphillip@outlook.com',
  phone: '(613) 890-9830',
  linkedin: 'https://linkedin.com/in/phillip-amanya',
  summary:
    'Detail-oriented QA Automation Engineer with 3+ years of experience designing, developing, and executing comprehensive test plans for complex enterprise web and mobile applications. Skilled in UI, API, and ETL testing, with strong proficiency in Selenium, Playwright, Postman and SQL. Adept at collaborating with cross-functional Agile teams to enhance automation coverage, improve test efficiency, and deliver robust, high-quality products. Skilled in identifying, documenting, and tracking bugs through project management tools while partnering with developers to reproduce, analyze, and resolve defects. Committed to continuous improvement through constructive feedback, automation best practices, and efficient QA workflows that ensure smooth, high-quality releases.',
  technicalSkills: {
    'Automation & Tools': 'Playwright, Selenium, Cypress (intro), Postman, REST API Testing, Appium',
    'Languages': 'Java, Python, JavaScript, SQL',
    'Frameworks & DevOps': 'Cucumber, Robot Framework (intro), Azure DevOps, GitLab CI/CD, Jira',
    'Testing Expertise': 'UI, Functional, Regression, Smoke, Performance, and API Testing',
    'Databases': 'MySQL, PostgreSQL — advanced SQL for data validation',
    'Methodologies': 'Agile / Scrum, Shift-Left Testing, Continuous Integration / Continuous Delivery',
    'Other Skills': 'Defect Tracking, Test Case Design, Validation Protocols, Risk-Based Testing'
  },
  experience: [
    {
      role: 'Software QA Associate (remote)',
      company: 'Infosys Limited',
      location: 'Ottawa, Ontario',
      date: 'Jun 2022 — May 2025',
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
    date: 'Feb 2021'
  }
};

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 px-8 py-12 print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 border-b-2 border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-slate-900 uppercase">{resume.name}</h1>
          <p className="mt-2 text-base text-slate-700 uppercase tracking-wide">{resume.title}</p>
          <p className="mt-1 text-sm text-slate-600">
            {resume.location} • {resume.phone} • {resume.email}
          </p>
          <p className="text-sm text-slate-600">
            <a href={resume.linkedin} className="text-blue-600 hover:underline">
              {resume.linkedin.replace('https://','').replace('www.','')}
            </a>
          </p>
        </header>

        {/* Professional Summary */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">{resume.summary}</p>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Technical Skills</h2>
          <div className="space-y-2">
            {Object.entries(resume.technicalSkills).map(([category, skills], idx) => (
              <div key={idx} className="text-sm">
                <span className="font-semibold text-slate-900">{category}:</span>
                <span className="text-slate-700 ml-2">{skills}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Work History */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Work History</h2>
          <div className="space-y-5">
            {resume.experience.map((job, idx) => (
              <article key={idx} className="border-l-4 border-slate-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{job.role}</h3>
                    <p className="text-sm text-slate-600 font-medium">{job.company} — {job.location}</p>
                  </div>
                  <div className="text-sm text-slate-500 whitespace-nowrap ml-4">{job.date}</div>
                </div>
                <ul className="mt-2 space-y-1">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-slate-700 flex">
                      <span className="mr-2">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Education</h2>
          <div className="text-sm">
            <p className="font-semibold text-slate-900">{resume.education.degree}</p>
            <p className="text-slate-700">{resume.education.school} — {resume.education.location}</p>
            <p className="text-slate-600">{resume.education.date}</p>
          </div>
        </section>

        <footer className="mt-12 pt-4 border-t border-slate-200 text-xs text-slate-500">
          Updated: Oct 23, 2025
        </footer>
      </div>
    </div>
  );
}