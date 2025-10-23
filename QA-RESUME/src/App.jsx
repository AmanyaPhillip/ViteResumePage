import React from 'react';

const resume = {
  name: 'PHILLIP ASIIMWE',
  title: 'Senior Quality Assurance Associate',
  location: 'Ottawa, Ontario',
  email: 'amanyaphillip@outlook.com',
  phone: '(613) 890-9830',
  linkedin: 'https://linkedin.com/in/phillip-amanya',
  summary:
    'Detail-oriented QA Automation Engineer with 3+ years designing, developing, and executing comprehensive test plans for complex enterprise web and mobile applications. Skilled in UI, API, and ETL testing using Playwright, Selenium, Postman and SQL. Adept at collaborating with cross-functional Agile teams to enhance automation coverage, improve test efficiency, and deliver robust, high-quality products.',
  skills: [
    'Playwright', 'Selenium', 'Postman', 'REST API Testing', 'Appium', 'Java', 'Python', 'JavaScript', 'SQL', 'Cucumber', 'Azure DevOps', 'GitLab CI/CD', 'Jira'
  ],
  experience: [
    {
      role: 'Software QA Associate (remote)',
      company: 'Infosys Limited',
      location: 'Ottawa, Ontario',
      date: 'Jun 2022 — May 2025',
      bullets: [
        'Designed and maintained end-to-end automated test suites across web, API and data layers using Selenium, Playwright and Postman.',
        'Authored complex SQL queries and executed database testing across relational and data-warehouse environments.',
        'Automated ETL and backend validation workflows with traceability for audit readiness.',
        'Collaborated with Agile and DevOps teams to define QA strategy, test data governance and automation integration models.',
        'Led defect triage and root cause analysis using Jira and Azure Test Plans.',
        'Orchestrated automation of 200+ smoke and regression test cases, reducing manual testing overhead by 30%.'
      ]
    },
    {
      role: 'Teaching Assistant',
      company: 'Carleton University',
      location: 'Ottawa, Ontario',
      date: 'Sept 2017 — Apr 2021',
      bullets: [
        'Evaluated, tested and debugged student code across Windows, Linux and macOS environments.',
        'Designed automated grading and validation frameworks using Python and shell scripting integrated with CI/CD pipelines.',
        'Provided constructive feedback to improve code quality and performance.'
      ]
    }
  ],
  education: ['BSc Computer Science (With Distinction) — Carleton University — Feb 2021']
};

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-8 print:p-0">
      <div className="max-w-3xl mx-auto">
        <header className="mb-4">
          <h1 className="text-2xl font-bold leading-tight">{resume.name}</h1>
          <p className="mt-1 text-sm">{resume.title} • {resume.location}</p>
          <p className="mt-1 text-sm">{resume.email} • {resume.phone} • <a href={resume.linkedin}>{resume.linkedin.replace('https://','')}</a></p>
        </header>

        <section className="mb-4">
          <h2 className="text-sm font-semibold">Professional Summary</h2>
          <p className="mt-2 text-sm leading-relaxed">{resume.summary}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-sm font-semibold">Skills</h2>
          <p className="mt-2 text-sm">{resume.skills.join(', ')}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-sm font-semibold">Experience</h2>
          <div className="mt-2 space-y-4">
            {resume.experience.map((job, idx) => (
              <article key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold">{job.role}</h3>
                    <p className="text-xs opacity-80">{job.company} — {job.location}</p>
                  </div>
                  <div className="text-xs opacity-70">{job.date}</div>
                </div>
                <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                  {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="text-sm font-semibold">Education</h2>
          <ul className="mt-2 list-disc list-inside text-sm">
            {resume.education.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </section>

        <footer className="mt-8 text-xs opacity-80">Updated: Oct 23, 2025</footer>
      </div>
    </div>
  );
}