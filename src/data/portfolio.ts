// ─── SINGLE SOURCE OF TRUTH ───────────────────────────────────────────────────

export const profile = {
  name: "Lasya Sri Yerramsetti",
  shortName: "Lasya",
  tagline: "I build AI products with real-world impact.",
  description:
    "CS sophomore at BVRIT Hyderabad building AI agents, ML systems, and full-stack products that solve real problems. I work across model design, product thinking, and engineering to turn ideas into systems people can actually use. HackOn with Amazon 6.0 Student Builder Challenge winner.",
  email: "lasyasri.yerramsetty@gmail.com",
  phone: "+91 93983 15979",
  location: "Hyderabad, India",
  github: "https://github.com/Lasyasriyerramsetty",
  linkedin: "https://www.linkedin.com/in/lasya-sri-yerramsetti/",
  leetcode: "https://leetcode.com/u/lasyasri_yerramsetti",
  avatar: "https://avatars.githubusercontent.com/u/184822553?v=4",
  resume: "https://drive.google.com/file/d/193Qp_21mlt4PlOFSBNa0qicXUWHypHKx/view?usp=sharing",
};

export const education = [
  {
    institution: "BVRIT Hyderabad College of Engineering for Women",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    gpa: "9.32",
    period: "Aug 2024 – Jun 2028",
    location: "Hyderabad, India",
  },
  {
    institution: "Pragathi Junior College",
    degree: "Higher Secondary Certificate",
    gpa: "9.86",
    period: "Jun 2022 – Jun 2024",
    location: "Hyderabad, India",
  },
  {
    institution: "Castletown High School",
    degree: "Secondary School Certificate",
    gpa: "10.0",
    period: "Sep 2021 – May 2022",
    location: "Hyderabad, India",
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  tier: "S" | "A" | "B";
  year: string;
  category: string;
  color: string;
  accentColor: string;
  problem: string;
  solution: string;
  pipeline: { step: string; label: string }[];
  stack: { label: string; items: string[] }[];
  metrics: { value: string; label: string }[];
  github: string;
  demo?: string;
  skills: string[];
};

export const projects: Project[] = [
  {
    id: "adspark",
    title: "AdSpark",
    tagline: "AI Marketing Campaign Engine",
    tier: "S",
    year: "2026",
    category: "Multi-Agent AI",
    color: "from-amber-500/20 to-orange-600/20",
    accentColor: "#f59e0b",
    problem:
      "Creating a full marketing campaign (tagline, blog, social posts, hero image, voiceover) typically requires a whole team and days of manual work.",
    solution:
      "A multi-agent system that takes a single product brief and generates 6 campaign assets using 4 AI services in parallel. One prompt, complete campaign.",
    pipeline: [
      { step: "01", label: "Product Brief" },
      { step: "02", label: "Multi-Agent Orchestration" },
      { step: "03", label: "LLaMA 3.1 (Copy)" },
      { step: "04", label: "Pollinations.ai (Image/GIF)" },
      { step: "05", label: "gTTS (Voiceover)" },
      { step: "06", label: "AI Critic Loop" },
      { step: "07", label: "Complete Campaign" },
    ],
    stack: [
      { label: "Core", items: ["Python", "Streamlit"] },
      { label: "AI / LLM", items: ["Groq (LLaMA 3.1)", "OpenRouter", "gTTS"] },
      { label: "Image", items: ["Pollinations.ai"] },
      { label: "Output", items: ["LinkedIn", "TikTok", "Facebook adapters"] },
    ],
    metrics: [
      { value: "6", label: "Assets per brief" },
      { value: "4", label: "AI services" },
      { value: "90%", label: "Manual work reduced" },
      { value: "3", label: "Channel adaptations" },
    ],
    github: "https://github.com/Lasyasriyerramsetty/Adspark",
    skills: ["Python", "Streamlit", "Groq", "OpenRouter", "gTTS", "Multi-Agent AI"],
  },
  {
    id: "bhumitra",
    title: "Bhumitra",
    tagline: "AI Landslide Risk Intelligence Platform",
    tier: "S",
    year: "2026",
    category: "AI / GIS / Disaster Prevention",
    color: "from-emerald-500/20 to-teal-600/20",
    accentColor: "#10b981",
    problem:
      "Landslides cause devastating loss of life and property, yet communities lack real-time, localized early warning systems that can predict risk before disaster strikes.",
    solution:
      "A GIS-based AI platform that ingests environmental and geospatial data, runs ML risk models, and delivers early warnings to at-risk communities.",
    pipeline: [
      { step: "01", label: "Geospatial Data Ingestion" },
      { step: "02", label: "Environmental Factors" },
      { step: "03", label: "Feature Engineering" },
      { step: "04", label: "ML Risk Model" },
      { step: "05", label: "GIS Visualization" },
      { step: "06", label: "Early Warning Output" },
    ],
    stack: [
      { label: "Frontend", items: ["JavaScript", "GIS Mapping"] },
      { label: "AI / ML", items: ["Machine Learning", "Risk Prediction"] },
      { label: "Data", items: ["Geospatial Data", "Environmental Sensors"] },
    ],
    metrics: [
      { value: "2026", label: "Year built" },
      { value: "GIS + ML", label: "Core tech" },
    ],
    github: "https://github.com/Lasyasriyerramsetty/Bhumitra",
    skills: ["JavaScript", "Machine Learning", "GIS", "Environmental Data"],
  },
  {
    id: "fraud-sms",
    title: "Fraud SMS Detection",
    tagline: "Real-Time Spam Detection on Android",
    tier: "A",
    year: "2025",
    category: "ML / Android",
    color: "from-rose-500/20 to-red-700/20",
    accentColor: "#f43f5e",
    problem:
      "SMS fraud causes billions in financial loss annually. Existing spam filters are basic and don't adapt to new fraud patterns in real-time.",
    solution:
      "A TF-IDF + Logistic Regression classification model achieving 97%+ accuracy, served via a Flask ML API and integrated directly into an Android app via Retrofit for real-time alerts.",
    pipeline: [
      { step: "01", label: "SMS Input" },
      { step: "02", label: "TF-IDF Vectorization" },
      { step: "03", label: "Logistic Regression" },
      { step: "04", label: "Flask ML API" },
      { step: "05", label: "Retrofit (Android)" },
      { step: "06", label: "Real-Time Alert" },
    ],
    stack: [
      { label: "ML", items: ["Python", "Scikit-learn", "TF-IDF", "Logistic Regression"] },
      { label: "Backend", items: ["Flask", "REST API"] },
      { label: "Mobile", items: ["Kotlin", "Android", "Retrofit"] },
    ],
    metrics: [
      { value: "97%+", label: "Classification accuracy" },
      { value: "Real-time", label: "Alert delivery" },
    ],
    github: "https://github.com/Lasyasriyerramsetty",
    skills: ["Python", "Kotlin", "Flask", "Scikit-learn", "Android", "REST APIs"],
  },
  {
    id: "prompt-dojo",
    title: "Prompt Dojo",
    tagline: "Prompt Engineering Trainer",
    tier: "A",
    year: "2026",
    category: "AI / Education",
    color: "from-violet-500/20 to-purple-700/20",
    accentColor: "#8b5cf6",
    problem:
      "Most developers learn prompt engineering through trial and error with no structured feedback. There's no gamified system that teaches it progressively.",
    solution:
      "A 5-level gamified trainer with an AI examiner that delivers real-time pass/fail feedback across 10 practice domains. A 3-provider LLM fallback chain guarantees uptime.",
    pipeline: [
      { step: "01", label: "User Prompt" },
      { step: "02", label: "5-Level System" },
      { step: "03", label: "AI Examiner" },
      { step: "04", label: "Pass/Fail Feedback" },
      { step: "05", label: "3-Provider Fallback" },
      { step: "06", label: "Skill Progression" },
    ],
    stack: [
      { label: "Core", items: ["Python", "Streamlit"] },
      { label: "AI", items: ["Groq", "OpenRouter", "OpenAI"] },
      { label: "Architecture", items: ["LLM Fallback Chain", "Real-time evaluation"] },
    ],
    metrics: [
      { value: "5", label: "Escalating levels" },
      { value: "10", label: "Practice domains" },
      { value: "3", label: "LLM provider fallback" },
    ],
    github: "https://github.com/Lasyasriyerramsetty",
    skills: ["Python", "Streamlit", "Groq", "OpenRouter", "OpenAI", "LLM Chaining"],
  },
  {
    id: "crewhire",
    title: "CrewHire",
    tagline: "Multi-Agent AI Recruitment Pipeline",
    tier: "A",
    year: "2026",
    category: "Multi-Agent AI",
    color: "from-sky-500/20 to-blue-700/20",
    accentColor: "#0ea5e9",
    problem:
      "Recruiting at scale is slow, inconsistent, and prone to bias. Manual screening misses qualified candidates and can't audit its own decisions.",
    solution:
      "A multi-agent pipeline built with CrewAI that screens, scores, audits, and schedules candidates autonomously, with built-in bias detection, hallucination guards, and prompt-injection safeguards.",
    pipeline: [
      { step: "01", label: "Job Description" },
      { step: "02", label: "Screening Agent" },
      { step: "03", label: "Scoring Agent" },
      { step: "04", label: "Bias Audit Agent" },
      { step: "05", label: "Scheduling Agent" },
      { step: "06", label: "Decision Output" },
    ],
    stack: [
      { label: "Core", items: ["Python", "CrewAI"] },
      { label: "Safety", items: ["Bias Detection", "Hallucination Guards", "Prompt Injection Shield"] },
      { label: "Pipeline", items: ["Multi-Agent Orchestration", "Autonomous Scheduling"] },
    ],
    metrics: [
      { value: "4", label: "Specialized agents" },
      { value: "3", label: "Safety layers" },
    ],
    github: "https://github.com/Lasyasriyerramsetty/CrewHire",
    skills: ["Python", "CrewAI", "Multi-Agent AI", "AI Safety"],
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "Kotlin", "C", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "AI / ML",
    items: ["Machine Learning", "Scikit-learn", "TF-IDF", "NLP", "Multi-Agent AI", "LLM Chaining"],
  },
  {
    category: "Frameworks",
    items: ["Flask", "Streamlit", "REST APIs", "Retrofit", "CrewAI", "Groq", "OpenRouter"],
  },
  {
    category: "Databases",
    items: ["MySQL", "SQLite", "MongoDB"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Linux", "Tableau", "VS Code"],
  },
  {
    category: "CS Fundamentals",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems"],
  },
];

export const skillProjectMap: Record<string, string[]> = {
  // ── Languages
  Python:     ["adspark", "fraud-sms", "prompt-dojo", "crewhire"],
  Kotlin:     ["fraud-sms"],
  JavaScript: ["bhumitra"],
  // ── AI / ML
  "Multi-Agent AI":  ["adspark", "crewhire"],
  "Machine Learning":["fraud-sms", "bhumitra"],
  "Scikit-learn":    ["fraud-sms"],
  "TF-IDF":          ["fraud-sms"],
  NLP:               ["fraud-sms"],
  "LLM Chaining":    ["prompt-dojo"],
  // ── Frameworks
  Flask:       ["fraud-sms"],
  Streamlit:   ["adspark", "prompt-dojo"],
  "REST APIs": ["fraud-sms"],
  Retrofit:    ["fraud-sms"],
  CrewAI:      ["crewhire"],
  Groq:        ["adspark", "prompt-dojo"],
  OpenRouter:  ["adspark", "prompt-dojo"],
  // ── Tools
  GitHub: ["adspark", "bhumitra", "fraud-sms", "prompt-dojo", "crewhire"],
  // ── Other
  Android: ["fraud-sms"],
  GIS:     ["bhumitra"],
};

export const achievements = [
  {
    year: "2026",
    title: "HacKOn with Amazon 6.0",
    description: "Won the AWS Builder Center Student Builder Challenge at HacKOn with Amazon 6.0",
    type: "award",
  },
  {
    year: "2025",
    title: "ICSMET 2025",
    description:
      "Presented AI-powered lithium-ion battery recycling research (Circubatt) at the International Conference on Sustainable Materials and Emerging Technologies",
    type: "publication",
  },
  {
    year: "2025",
    title: "BVRITH R&D Showcase",
    description: "Showcased Circubatt (AI-powered lithium-ion battery recycling research) at the institutional Research & Development Showcase",
    type: "showcase",
  },
  {
    year: "2026",
    title: "Unstop Campus Champion",
    description: "Selected as Unstop Campus Champion for promoting student opportunities and driving campus engagement",
    type: "recognition",
  },
  {
    year: "Ongoing",
    title: "LeetCode",
    description: "Solved 550+ algorithmic problems, strengthening DSA and problem-solving proficiency",
    type: "coding",
  },
  {
    year: "2025",
    title: "AlgoHack 2.0 Volunteer",
    description:
      "Co-organized BVRIT's national-level hackathon with 100+ participants, handling registration, logistics, and session coordination",
    type: "volunteer",
  },
];

export const timeline = [
  { year: "May 2022", event: "Class 10, Perfect GPA 10.0",                         type: "education"   },
  { year: "Jun 2024", event: "Class 12, GPA 9.86",                                 type: "education"   },
  { year: "Aug 2024", event: "Joined BVRIT Hyderabad CSE",                          type: "education"   },
  { year: "Oct 2025", event: "Co-organized AlgoHack 2.0 (100+ participants)",        type: "volunteer"   },
  { year: "2025",     event: "ICSMET 2025 Circubatt Research Presentation",        type: "publication" },
  { year: "2025",     event: "BVRITH R&D Showcase, Circubatt",                      type: "showcase"    },
  { year: "2025",     event: "Fraud SMS Detection (97%+ accuracy)",                  type: "project"     },
  { year: "2026",     event: "HacKOn with Amazon 6.0 Student Builder Challenge Winner", type: "achievement" },
  { year: "2026",     event: "Unstop Campus Champion",                               type: "achievement" },
  { year: "2026",     event: "Bhumitra, AI Landslide Risk Platform",                type: "project"     },
  { year: "2026",     event: "AdSpark, Multi-Agent AI Engine",                      type: "project"     },
  { year: "2026",     event: "CrewHire, AI Recruitment Pipeline",                   type: "project"     },
  { year: "2026",     event: "Prompt Dojo, LLM Trainer",                            type: "project"     },
  { year: "Ongoing",  event: "550+ LeetCode Problems Solved",                        type: "coding"      },
];
