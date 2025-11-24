import { useEffect, useState, useMemo } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certs", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const TITLES = ["Data Engineer", "Data Analyst", "Business Analyst"];

/* 🧊 Skill tabs + data */
const SKILL_TABS = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "etl", label: "ETL / Big Data" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "tools", label: "Developer Tools & BI" },
];

const PROJECTS = [
  {
    id: "mailmatrix",
    title: "MailMatrix – Serverless Bulk Email System",
    role: "Backend / Data Engineer",
    summary:
      "Serverless bulk email automation system with CSV-based personalization and monitoring.",
    tags: ["AWS Lambda", "S3", "SES", "EventBridge", "RDS", "SNS", "IAM", "CloudWatch"],
    bullets: [
      "Built a fully serverless workflow for bulk, personalized email sends from CSV uploads.",
      "Implemented monitoring and alerting for failures, retries, and anomalies."
    ],
    detailsBullets: [
      "Designed an ingestion flow where users upload CSV files to S3; Lambda validates, enriches, and queues email jobs.",
      "Used SES for high-volume transactional sends with per-template configuration and throttling.",
      "Configured CloudWatch metrics, logs, and alarms for bounce/complaint rates and Lambda errors.",
      "Hardened security with IAM roles, parameterized secrets, and least-privilege policies."
    ],
    github: "https://github.com/bobadesanjana/MailMatrix"
  },
  {
    id: "timetracker",
    title: "Employee TimeTracker – Secure Timesheet App",
    role: "Full-stack Developer",
    summary:
      "Python Flask-based timesheet application with secure authentication and cloud-native storage.",
    tags: ["Python Flask", "AWS Cognito", "Aurora RDS", "CloudFront", "CloudWatch", "CloudTrail", "KMS"],
    bullets: [
      "Implemented secure registration, login, and role-based access using AWS Cognito.",
      "Built daily/weekly timesheet entry backed by Aurora RDS and served via CloudFront."
    ],
    detailsBullets: [
      "Designed normalized Aurora schema for employees, projects, and timesheet entries with audit fields.",
      "Integrated AWS Cognito for sign-up / sign-in and JWT-based session validation in Flask.",
      "Added CloudWatch + CloudTrail for request tracing and security auditing.",
      "Encrypted sensitive data with KMS and enforced HTTPS via CloudFront distribution."
    ],
    github: "https://github.com/bobadesanjana/Employee-TimeTracker"
  }
];


const EXPERIENCES = [
  {
    id: "cdf",
    company: "Community Dreams Foundation",
    title: "Data Engineer",
    location: "Austin, TX",
    type: "Fulltime",
    dates: "Sep 2025 – Present",
    logo: asset("/logos/cdf.jpeg"), // put this in /public/logos/
    bullets: [
      "Engineered end to end ETL and ELT pipelines to ingest, clean, and process hospital data (ICU beds, admissions, emergency elective splits), scaling to 100k+ daily records across multiple hospitals.",
      "Created a unified hospital metrics dataset by integrating ICU, admissions, and calendar data, improved feature completeness and data consistency by 40% and troubleshooted upstream and downstream impacts.",
      "Automated feature generation including rolling averages, percent changes, seasonality indicators, and occupancy rates using Python, Pandas, and PySpark."
    ],
    tags: [
      "Databricks",
      "Delta Live Tables",
      "PySpark",
      "Python",
      "Unity Catalog",
      "Azure ADLS",
      "REST APIs"
    ]
  },
  {
    id: "deloitte",
    company: "Deloitte",
    title: "Data Engineer & Analyst",
    location: "Remote",
    type: "Fulltime",
    dates: "Oct 2023 – Apr 2024",
    logo: asset("/logos/deloitte.jpg"),
    bullets: [
      "Built and maintained ETL and ELT pipelines on ADF, Databricks, SQL, Scala, and PySpark to process 50M+ records for banking analytics.",
      "Optimized queries and partitioning to improve performance by ~20%.",
      "Delivered Power BI dashboards across 8+ KPIs and proactively fixed data quality issues via validation and RCA."
    ],
    tags: ["Azure", "Databricks", "ADF", "SQL", "Scala", "PySpark", "Power BI"]
  },
  {
    id: "molina",
    company: "Cognizant",
    title: "Data Engineer",
    location: "Remote",
    type: "Fulltime",
    dates: "Jun 2021 – Oct 2023",
    logo: asset("/logos/cognizant.svg"),
    bullets: [
      "Engineered large scale healthcare pipelines on Azure Databricks and Spark for 5M+ members and 500M+ records with HIPAA compliance.",
      "Migrated ELT from on prem Cloudera to Azure (Databricks, Synapse, ADLS, ADF, Unity Catalog) with ~45% runtime reduction.",
      "Cut manual vendor tasks by 80% with SFTP automation and file tracking."
    ],
    tags: [
      "Azure",
      "Databricks",
      "ADLS",
      "ADF",
      "Synapse",
      "Unity Catalog",
      "Healthcare"
    ]
  },
  {
    id: "cogintern",
    company: "Cognizant",
    title: "Data Engineering Intern",
    location: "Remote",
    type: "Internship",
    dates: "Jan 2021 – Jun 2021",
    logo: asset("/logos/cognizant.svg"),
    bullets: [
      "Worked with ADF, Synapse, Blob Storage, SQL Server, and SSIS/SSRS to support reporting and analytics.",
      "Built SSIS ETL pipelines and reports used by business stakeholders.",
      "Led a Timesheet Management project using Python Flask + MySQL."
    ],
    tags: ["Azure", "ADF", "Synapse", "SQL Server", "SSIS", "Flask", "MySQL"]
  }
];



const SKILLS = {
  languages: [
    { name: "Python", icon: "python.svg" },
    { name: "SQL", icon: "sql.png" },
    { name: "Scala", icon: "scala.png" },
    { name: "PySpark", icon: "pyspark.png" },
    { name: "Spark", icon: "spark.png" },
    { name: "Linux", icon: "linux.png" },
    { name: "NoSQL", icon: "nosql.png" },
    { name: "JavaScript", icon: "javascript.png" },
  ],
  etl: [
    { name: "Databricks", icon: "databricks.png" },
    { name: "Hadoop (HDFS, YARN)", icon: "hadoop.png" },
    { name: "Hive/HiveQL", icon: "hive.png" },
    { name: "Sqoop", icon: "sqoop.svg" },
    { name: "Kafka", icon: "kafka.png" },
    { name: "Airflow", icon: "airflow.png" },
  ],
  cloud: [
    { name: "Microsoft Azure", icon: "azure.png" },
    { name: "AWS", icon: "aws.png" },
    { name: "GCP", icon: "gcp.svg" },
  ],
  tools: [
    { name: "Git", icon: "git.svg" },
    { name: "Power BI", icon: "powerbi.svg" },
    { name: "Tableau", icon: "tableau.png" },
    { name: "VS Code", icon: "vscode.png" },
    { name: "Jupyter", icon: "jupyter.svg" },
    { name: "Postman", icon: "postman.png" },
  ],
};

/* ❄️ Snow background */
function SnowField() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 80 }).map(() => ({
        delay: Math.random() * 20,
        duration: 18 + Math.random() * 14,
        left: Math.random() * 100,
        size: 8 + Math.random() * 16,
      })),
    []
  );

  return (
    <div className="snowfield">
      {flakes.map((flake, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            fontSize: `${flake.size}px`,
          }}
        >
          ✻
        </span>
      ))}
    </div>
  );
}

/* ❄️ Simple SnowBot */
function SnowBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey there ❄️ — I’m SnowBot. Ask me about Sanjana’s skills or projects!",
    },
  ]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");

    let reply =
      "Nice! For more details, scroll to the sections above — this is a lightweight demo bot 😊";

    const lower = userText.toLowerCase();
    if (lower.includes("skill")) {
      reply =
        "Sanjana works with Azure, Databricks, Spark, SQL, ADF, Airflow and more. Check the Skills section for the full stack.";
    } else if (lower.includes("project")) {
      reply =
        "You can see her MailMatrix and Employee TimeTracker projects in the Projects section — both built on AWS.";
    } else if (lower.includes("experience")) {
      reply =
        "She’s worked at Deloitte and Cognizant (Molina & banking) as a Data Engineer. Experience section has the details.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 400);
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open SnowBot chat"
      >
        <span className="flake-icon">❄️</span>
      </button>

      {open && (
        <div className="chatbot-window">
          <header className="chatbot-header">
            <span>SnowBot</span>
            <button
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </header>
          <div className="chatbot-messages">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-msg ${
                  m.from === "bot" ? "from-bot" : "from-user"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form className="chatbot-input" onSubmit={handleSend}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [titleIndex, setTitleIndex] = useState(0);
  const [theme, setTheme] = useState("light");
  const [skillTab, setSkillTab] = useState("all");
  const [activeProject, setActiveProject] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  // rotating titles
  useEffect(() => {
    const id = setInterval(
      () => setTitleIndex((prev) => (prev + 1) % TITLES.length),
      2300
    );
    return () => clearInterval(id);
  }, []);

  // intersection observer for nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting && id) setActive("#" + id);
        });
      },
      { threshold: 0.6 }
    );

    document
      .querySelectorAll("section[id]")
      .forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);


    // experience timeline scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("experience");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // how far the section has been scrolled through
      const total = rect.height + windowHeight;
      const scrolled = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));

      setTimelineProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const year = new Date().getFullYear();

  const visibleSkills = useMemo(() => {
    if (skillTab === "all") {
      return [
        ...SKILLS.languages,
        ...SKILLS.etl,
        ...SKILLS.cloud,
        ...SKILLS.tools,
      ];
    }
    return SKILLS[skillTab] || [];
  }, [skillTab]);

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <nav className="nav">
          <div className="brand" onClick={() => scrollToSection("home")}>
            SB
          </div>

          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={navOpen ? "true" : "false"}
            onClick={() => setNavOpen((v) => !v)}
          >
            ☰
          </button>

          <ul className={`nav-links ${navOpen ? "show" : ""}`}>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={active === `#${s.id}` ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <button
                className="theme-toggle"
                type="button"
                onClick={() =>
                  setTheme((t) => (t === "dark" ? "light" : "dark"))
                }
                aria-label="Toggle light / dark mode"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <main>
        <SnowField />
        <section id="home" className="hero">
          {/* snow is fixed now so it will cover whole page as you scroll */}
          <div className="aurora" />

          <div className="hero-inner">
            <div className="hero-text">
              <h1 className="hero-title">Hi, I&apos;m Sanjana Bobade</h1>

              <div className="role-line">
                <div className="role-wheel">
                  <span key={titleIndex} className="role-item">
                    {TITLES[titleIndex]}
                  </span>
                </div>
              </div>

              <p className="hero-sub">
                A passionate data engineer with expertise in Spark, SQL, Python,
                PySpark, Azure and Databricks. Actively looking for data engineer
                and analyst opportunities.
              </p>

              <div className="hero-actions">
                <a
                  href="#projects"
                  className="cta"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                >
                  View my work
                </a>

                {/* Resume button with icon & hover lift */}
                <a
                  className="secondary-btn"
                  href="/Sanjana_Bobade_Resume.pdf"
                  download="Sanjana_Bobade_Resume.pdf"
                >
                  <img
                    src="/icons/download.svg"
                    alt=""
                    className="resume-icon"
                  />
                  <span>Resume</span>
                </a>
              </div>

              {/* Social icons */}
              <div className="hero-links">
                <a
                  href="https://github.com/bobadesanjana"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <img src="/icons/github.svg" alt="GitHub" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sanjanabobade/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <img src="/icons/linkedIn.svg" alt="LinkedIn" />
                </a>
                <a
                  href="mailto:sanjanabobade1298@gmail.com"
                  className="social-icon"
                  aria-label="Email"
                >
                  <img src="/icons/gmail.svg" alt="Email" />
                </a>
                <a
                  href="tel:+18169792509"
                  className="social-icon"
                  aria-label="Call"
                >
                  <img src="/icons/phone.png" alt="Phone" />
                </a>
              </div>
            </div>

            <div className="hero-photo-wrap">
              <img
                src="/sanjana.png"
                alt="Sanjana Bobade"
                className="hero-photo"
              />
            </div>
          </div>
        </section>

        {/* SKILLS – frosted tabs like Achyut */}
        <section id="skills" className="wrap skills-section">
          <div className="skills-shell">
            <header className="skills-header">
              <h2 className="skills-title">Technical Skills</h2>
              <p className="skills-sub">
                Technologies I&apos;ve used across data engineering, cloud, and
                analytics.
              </p>

              <div className="skills-tabs">
                {SKILL_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`skills-tab ${
                      skillTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => setSkillTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </header>

            <div className="skills-grid">
              {visibleSkills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className="skill-pill"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <span className="skill-pill-icon">
                    <img
                      src={`/skills/${skill.icon}`}
                      alt={skill.name}
                      loading="lazy"
                    />
                  </span>
                  <span className="skill-pill-label">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
<section id="projects" className="wrap projects-section">
  <header className="projects-header">
    <h2>Featured Projects</h2>
    <p className="projects-sub">
      Check out some of my recent work.
    </p>
  </header>

  <div className="project-grid">
    {PROJECTS.map((p) => (
      <article
        key={p.id}
        className="project-card"
        onClick={() => setActiveProject(p)}
      >
        <div className="project-card-main">
          <h3 className="project-title">{p.title}</h3>
          {p.role && <p className="project-role">{p.role}</p>}

          <p className="project-summary">{p.summary}</p>

          <div className="pillbox project-tags">
            {p.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>

          <ul className="project-points">
            {p.bullets.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Git icon – only visible on hover */}
        <button
          className="project-card-git"
          aria-label="Open GitHub repository"
          onClick={(e) => {
            e.stopPropagation(); // don't open modal when clicking icon
            window.open(p.github, "_blank", "noreferrer");
          }}
        >
          <img src="/icons/github.svg" alt="" />
        </button>
      </article>
    ))}
  </div>
</section>


                {/* EXPERIENCE – frozen timeline */}
        <section id="experience" className="wrap experience-section">
          <header className="experience-header">
            <h2>Experience</h2>
            <p className="experience-sub">
              A timeline of my growth and contributions in the tech industry
            </p>
          </header>

          <div
            className="exp-timeline"
            style={{ "--timeline-progress": timelineProgress }}
          >
            <div className="exp-line" />

            {EXPERIENCES.map((exp, index) => (
              <article
                key={exp.id}
                className={`exp-item ${index % 2 === 0 ? "left" : "right"}`}
              >
                {/* node on the center line */}
                <div className="exp-node-wrap">
                  <div className="exp-node" />
                </div>

                {/* frosted experience card */}
                <div className="exp-card">
                  <div className="exp-card-header">
                    {exp.logo && (
                      <div className="exp-logo">
                        <img src={`/logos/${exp.logo}`} alt={exp.company} />
                      </div>
                    )}

                    <div className="exp-headings">
                      <h3 className="exp-title">{exp.title}</h3>
                      <p className="exp-company">{exp.company}</p>
                    </div>

                    {exp.type && (
                      <span className="exp-type-pill">{exp.type}</span>
                    )}
                  </div>

                  <div className="exp-meta">
  <span className="exp-meta-item">
    <span className="exp-meta-icon">📅</span>
    <span>{exp.dates}</span>
  </span>

  <span className="exp-meta-item">
    <span className="exp-meta-icon">📍</span>
    <span>{exp.location}</span>
  </span>
</div>


                  <ul className="exp-bullets">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  {exp.tags && (
                    <div className="pillbox exp-tags">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* CERTIFICATIONS */}
        <section id="certs" className="wrap">
          <h2>Certifications</h2>
          <div className="cards">
            <article className="card">
              <h3>Microsoft Azure Data Engineer Associate – DP-203</h3>
            </article>
            <article className="card">
              <h3>Microsoft Azure Fundamentals – AZ-900</h3>
            </article>
            <article className="card">
              <h3>Microsoft Azure Data Fundamentals – DP-900</h3>
            </article>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="wrap contact">
          <h2>Contact</h2>
          <p className="plain">
            Interested in banking, healthcare, or cloud data engineering work?
            Let&apos;s connect.
          </p>
          <p>
            <a href="mailto:sanjanabobade1298@gmail.com">
              sanjanabobade1298@gmail.com
            </a>
            <a href="tel:+18169792509">+1 (816) 979-2509</a>
            <a
              href="https://www.linkedin.com/in/sanjanabobade/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/bobadesanjana"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
        </section>
        {activeProject && (
  <div
    className="project-modal-backdrop"
    onClick={() => setActiveProject(null)}
  >
    <div
      className="project-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="project-modal-close"
        onClick={() => setActiveProject(null)}
        aria-label="Close project details"
      >
        ✕
      </button>

      <h3 className="project-modal-title">{activeProject.title}</h3>
      {activeProject.role && (
        <p className="project-modal-role">{activeProject.role}</p>
      )}

      <div className="pillbox project-modal-tags">
        {activeProject.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>

      <ul className="project-modal-points">
        {activeProject.detailsBullets.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <a
        href={activeProject.github}
        target="_blank"
        rel="noreferrer"
        className="project-modal-gitlink"
      >
        <img src="/icons/github.svg" alt="" />
        <span>View code on GitHub</span>
      </a>
    </div>
  </div>
)}

      </main>

      <footer className="site-footer">
        © {year} Sanjana Bobade • Data Professional ❄️
      </footer>

      <SnowBot />
    </>
  );
}
