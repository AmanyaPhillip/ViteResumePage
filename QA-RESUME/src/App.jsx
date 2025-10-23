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
    <div className="min-h-screen bg-white text-slate-900 px-8 py-12 print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 border-b-2 border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-slate-900">{resume.name}</h1>
          <p className="mt-2 text-base text-slate-700">{resume.title} • {resume.location}</p>
          <p className="mt-1 text-sm text-slate-600">
            {resume.email} • {resume.phone} • 
            <a href={resume.linkedin} className="text-blue-600 hover:underline ml-1">
              {resume.linkedin.replace('https://','').replace('www.','')}
            </a>
          </p>
        </header>

        {/* Professional Summary */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">{resume.summary}</p>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Skills</h2>
          <p className="text-sm text-slate-700">{resume.skills.join(' • ')}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Experience</h2>
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
          <ul className="space-y-1">
            {resume.education.map((e, i) => (
              <li key={i} className="text-sm text-slate-700 flex">
                <span className="mr-2">•</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 pt-4 border-t border-slate-200 text-xs text-slate-500">
          Updated: Oct 23, 2025
        </footer>
      </div>
    </div>
  );
}