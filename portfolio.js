/**
 * DARSHAN'S ARCADE - CENTRAL PORTFOLIO CONFIGURATION
 * Edit your personal information, skills, projects, and links here.
 */

export const portfolio = {
  // Personal Info
  name: "Darshan Kholkar",
  tagline: "Developer. Creator. Problem Solver.",
  primaryRole: "Diploma IT Student",
  roles: [
    "Java Developer",
    "C/C++ Developer",
    "Automation Developer",
    "IT Student",
    "Web Developer"
  ],
  status: "ONLINE",
  playerClass: "SOFTWARE DEVELOPER",
  level: "LEVEL 08",
  location: "Pune, Maharashtra, India",
  phone: "+91 9529618605",
  email: "kholkar.dk23@gmail.com",

  // Social Links
  social: {
    github: "https://github.com/kholkardk23-ui",
    linkedin: "https://www.linkedin.com/in/darshan-kholkar-754513321/",
    instagram: "https://www.instagram.com/dk_artist_2307/",
    email: "mailto:kholkar.dk23@gmail.com"
  },

  // Player Profile / About
  about: {
    heading: "PLAYER PROFILE",
    subheading: "STATUS: ONLINE • PLAYER 1 READY",
    bio: [
      "Hi, I'm Darshan Kholkar, a passionate IT student and developer who enjoys building applications, automation systems, websites, and technology-driven projects.",
      "I am a versatile software developer with a technical focus spanning Java, C, C++, embedded systems (Arduino & ESP8266), web development, and Robotic Process Automation (RPA). By combining programming fundamentals with practical automation and hardware projects, I enjoy solving real-world problems and building useful technology solutions."
    ],
    stats: [
      { label: "ACADEMIC SCORE", value: "88.35%", detail: "2nd Year Diploma IT" },
      { label: "SSC SCORE", value: "92.40%", detail: "Secondary Education" },
      { label: "EXPERIENCE", value: "3RD YEAR", detail: "Diploma in IT @ JSPM" },
      { label: "MISSIONS COMPLETED", value: "10+", detail: "Academic & Personal Projects" }
    ],
    languages: ["Native English", "Marathi", "Hindi"],
    softSkills: ["Team Collaboration", "Problem Solving", "Technical Presentation", "Quick Adaptability"]
  },

  // Technical Skills (Power-Ups)
  skills: [
    {
      id: "java",
      name: "Java",
      category: "Core Programming",
      xp: 850,
      level: "ADVANCED",
      color: "#FACC15", // Arcade Yellow
      icon: "Coffee",
      description: "Object-oriented programming, Core Java, Collections, Multithreading, and GUI application design."
    },
    {
      id: "cpp",
      name: "C / C++",
      category: "Core Programming",
      xp: 800,
      level: "ADVANCED",
      color: "#00F0FF", // Neon Cyan
      icon: "Cpu",
      description: "Data structures, memory management, pointers, and performance-critical algorithms."
    },
    {
      id: "python",
      name: "Python",
      category: "Core Programming",
      xp: 750,
      level: "INTERMEDIATE",
      color: "#3B82F6", // Ghost Blue
      icon: "Terminal",
      description: "Scripting, rapid automation, API consumption, and data manipulation."
    },
    {
      id: "power-automate",
      name: "Power Automate",
      category: "Automation & RPA",
      xp: 920,
      level: "EXPERT",
      color: "#FF2E93", // Neon Pink
      icon: "Bot",
      description: "Robotic process automation, cloud workflows, desktop automation, and scheduled triggers."
    },
    {
      id: "uipath",
      name: "UiPath",
      category: "Automation & RPA",
      xp: 820,
      level: "ADVANCED",
      color: "#F97316", // Ghost Orange
      icon: "Workflow",
      description: "End-to-end robotic process automation bots, screen scraping, and document extraction."
    },
    {
      id: "esp8266-arduino",
      name: "ESP8266 & Arduino",
      category: "IoT & Embedded",
      xp: 880,
      level: "ADVANCED",
      color: "#22C55E", // Neon Green
      icon: "Radio",
      description: "IoT microcontrollers, sensor integration, Wi-Fi telemetry, and microcontroller firmware."
    },
    {
      id: "blynk",
      name: "Blynk IoT",
      category: "IoT & Embedded",
      xp: 840,
      level: "ADVANCED",
      color: "#00E5FF", // Ghost Cyan
      icon: "Smartphone",
      description: "Mobile IoT dashboard interfacing, telemetry visualization, and cloud hardware control."
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Web & Tools",
      xp: 800,
      level: "ADVANCED",
      color: "#EAB308", // Yellow
      icon: "Code2",
      description: "Modern ES6+, asynchronous programming, DOM manipulation, and dynamic interactivity."
    },
    {
      id: "html-css",
      name: "HTML5 & CSS3",
      category: "Web & Tools",
      xp: 880,
      level: "EXPERT",
      color: "#FF5722", // Orange
      icon: "Layout",
      description: "Semantic web layouts, responsive UI, Flexbox, CSS Grid, and custom animations."
    },
    {
      id: "sql-mysql",
      name: "SQL & MySQL",
      category: "Web & Tools",
      xp: 780,
      level: "INTERMEDIATE",
      color: "#00758F", // Teal
      icon: "Database",
      description: "Relational database schema design, indexing, CRUD queries, and relational data modeling."
    },
    {
      id: "git-github",
      name: "Git & GitHub",
      category: "Web & Tools",
      xp: 850,
      level: "ADVANCED",
      color: "#A855F7", // Purple
      icon: "GitBranch",
      description: "Version control, branching workflows, pull requests, repository management, and collaboration."
    }
  ],

  // Skill Categories
  skillCategories: ["All", "Core Programming", "Automation & RPA", "IoT & Embedded", "Web & Tools"],

  // Education (Level Select Progression)
  education: [
    {
      level: "LEVEL 01",
      degree: "SSC (Secondary School Certificate)",
      institution: "State Board of Maharashtra",
      period: "Completed",
      score: "92.40%",
      status: "COMPLETED",
      color: "#22C55E",
      description: "Graduated with Distinction (92.40%). Established a strong foundation in Mathematics, Science, and Analytical Problem Solving."
    },
    {
      level: "LEVEL 02",
      degree: "Diploma in Information Technology",
      institution: "JSPM University",
      period: "Currently in 3rd Year (2023 - Present)",
      score: "88.35% in 2nd Year",
      status: "IN PROGRESS",
      color: "#FACC15",
      description: "Pursuing 3rd Year in Information Technology. Intensive coursework in C, C++, Core Java, Relational Databases, Computer Networks, and Microcontroller Hardware."
    },
    {
      level: "LEVEL 03",
      degree: "Advanced Development & Applied Engineering",
      institution: "Practical Projects & Industry Learning",
      period: "Ongoing",
      score: "XP Level 08",
      status: "ACTIVE QUEST",
      color: "#00F0FF",
      description: "Hands-on implementation of IoT hardware prototypes (ESP8266/Arduino), Robotic Process Automation (Power Automate, UiPath), and Modern Web Development."
    }
  ],

  // Achievements & High Scores
  highScores: [
    { rank: "1ST", player: "DARSHAN", category: "AUTOMATION & RPA", score: 95000, xp: "+950 XP", badge: "GOLD" },
    { rank: "2ND", player: "DARSHAN", category: "WEB DEVELOPMENT", score: 90000, xp: "+900 XP", badge: "SILVER" },
    { rank: "3RD", player: "DARSHAN", category: "IOT & EMBEDDED", score: 88000, xp: "+880 XP", badge: "BRONZE" },
    { rank: "4TH", player: "DARSHAN", category: "JAVA PROGRAMMING", score: 85000, xp: "+850 XP", badge: "BRONZE" },
    { rank: "5TH", player: "DARSHAN", category: "C / C++ SYSTEMS", score: 80000, xp: "+800 XP", badge: "TOP 5" }
  ],

  // Volunteer & Certifications
  certifications: [
    { title: "Volunteer Certificate - C Programming", issuer: "Technical Workshop / Event", year: "2024" },
    { title: "Volunteer Certificate - Java Programming", issuer: "Academic Technical Forum", year: "2024" }
  ]
};
