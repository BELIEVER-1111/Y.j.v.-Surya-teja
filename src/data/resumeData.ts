/**
 * RESUME SOURCE OF TRUTH
 * Strictly contains verified facts from Y. J. V. Surya Teja's resume.
 * No fabricated experience, projects, or statistics.
 */

export interface EducationItem {
  id: string;
  degree: string;
  discipline: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  scoreType: 'percentage' | 'cgpa';
  highlights: string[];
}

export interface InternshipItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  duration: string;
  description: string;
  keyDomains: string[];
  type: 'internship' | 'training';
}

export interface SkillGroup {
  category: 'Technical' | 'AI & Digital' | 'Communication' | 'Professional';
  description: string;
  skills: {
    name: string;
    description: string;
  }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  credentialNote: string;
  verified: boolean;
}

export const RESUME_DATA = {
  personal: {
    fullName: "Y. J. V. SURYA TEJA",
    preferredName: "Surya Teja",
    title: "Electronics & Communication Engineering",
    subtitles: ["Embedded Systems", "AI & AI Agents", "Problem Solver"],
    tagline: "An Electronics & Communication Engineering fresher who connects hardware, software, AI and practical problem solving.",
    location: "Bhimavaram, Andhra Pradesh, India",
    phone: "+91 9390029917",
    email: "yelubandisuryateja@gmail.com",
    linkedin: "https://www.linkedin.com/in/surya-yelubandi",
    linkedinPlaceholder: "https://www.linkedin.com/in/surya-yelubandi",
    githubPlaceholder: "https://github.com/surya-teja-ece",
    status: "Fresher · Open for Opportunities",
  },

  careerObjective:
    "Dynamic and self-motivated Electronics and Communication Engineering fresher, aiming to leverage technical engineering fundamentals, analytical problem solving, and strategic execution in embedded systems, programming, and AI-driven applications while solving complex market and engineering challenges.",

  coreStrengths: [
    {
      title: "Simplifying Complex Concepts",
      description: "Deconstructing intricate hardware, circuits, and logic into digestible, structured knowledge.",
    },
    {
      title: "Technical-to-Commercial Translation",
      description: "Connecting technical specifications and engineering capabilities with practical business and market value.",
    },
    {
      title: "Technical Documentation",
      description: "Clear, methodical documentation of system architectures, workflows, and programming logic.",
    },
    {
      title: "PPT & Graph Design",
      description: "Visual communication of data, engineering workflows, and system architectures through structured graphics.",
    },
    {
      title: "Communication & Mentoring",
      description: "Engaging verbal and written clarity; guiding peers and collaborating seamlessly across diverse teams.",
    },
    {
      title: "Solution Design & Problem Management",
      description: "Disciplined engineering mindset focused on root-cause analysis, modular breakdowns, and systematic debugging.",
    },
  ],

  education: [
    {
      id: "btech",
      degree: "B.Tech",
      discipline: "Electronics and Communication Engineering",
      institution: "DNR College of Engineering and Technology",
      location: "Bhimavaram (BVRM)",
      duration: "2024 – 2027",
      score: "65.38%",
      scoreType: "percentage",
      highlights: [
        "Core focus on Analog & Digital Communication, Microcontrollers, and Signal Processing.",
        "Bridging academic circuit theory with embedded software development.",
      ],
    },
    {
      id: "diploma",
      degree: "Diploma",
      discipline: "Electronics and Communication Engineering",
      institution: "Smt B Seetha Polytechnic",
      location: "Bhimavaram",
      duration: "2021 – 2024",
      score: "76%",
      scoreType: "percentage",
      highlights: [
        "Solid grounding in electronic circuits, digital electronics, instrumentation, and microcontroller interfacing.",
        "Completed 6-month hands-on industrial internship in embedded system design.",
      ],
    },
    {
      id: "ssc",
      degree: "SSC (Secondary School Certificate)",
      discipline: "General Sciences & Mathematics",
      institution: "PRZPHS Adavikolanu",
      location: "Adavikolanu",
      duration: "2023 – 2024",
      score: "8.6 CGPA",
      scoreType: "cgpa",
      highlights: [
        "Strong foundation in mathematics, analytical reasoning, and physics.",
      ],
    },
  ] as EducationItem[],

  internships: [
    {
      id: "internship-01",
      role: "Embedded System Design with Microcontroller & Programming",
      organization: "Protective Technologies",
      location: "Vijayawada, India",
      period: "11/2023 – 05/2024",
      duration: "6 Months",
      type: "internship",
      description:
        "Successfully completed a six-month diploma internship at Protective Technology Ltd., Vijayawada, working in the Design & Development Department and receiving rigorous training in Embedded Systems Designing with Micro-Controller & Programming.",
      keyDomains: [
        "Microcontroller",
        "Embedded Systems",
        "Programming",
        "Design & Development",
      ],
    },
    {
      id: "internship-02",
      role: "Data Structures & Algorithms using Java",
      organization: "CSC India (APSCHE)",
      location: "Virtual / Vijayawada",
      period: "May – June 2026",
      duration: "2 Months",
      type: "internship",
      description:
        "Successfully completed a 2-month internship in Data Structures and Algorithms using Java, gaining hands-on expertise in implementing core data structures and optimizing algorithmic solutions.",
      keyDomains: [
        "Java",
        "Data Structures",
        "Algorithms",
        "Problem Solving",
      ],
    },
  ] as InternshipItem[],

  hardwareToSoftwareBridge: [
    {
      stage: "01. Embedded Systems",
      detail: "Hardware architectures, peripherals, bus protocols & power constraints",
      category: "Hardware Domain",
    },
    {
      stage: "02. Microcontrollers",
      detail: "Registers, GPIO pins, timers, interrupts & firmware execution loops",
      category: "Hardware-Software Interface",
    },
    {
      stage: "03. Programming",
      detail: "Low-level & high-level logic implementation in C/C++, Python & Java",
      category: "Implementation Core",
    },
    {
      stage: "04. Data Structures",
      detail: "Arrays, lists, stacks, queues & trees for memory-efficient resource management",
      category: "Software Architecture",
    },
    {
      stage: "05. Algorithms",
      detail: "Time & space complexity optimization, search, traversal & automated decision logic",
      category: "Algorithmic Precision",
    },
  ],

  skillGroups: [
    {
      category: "Technical",
      description: "Hardware interfacing, system design and core engineering programming.",
      skills: [
        { name: "Embedded Systems", description: "Design, architecture, and interfacing of embedded hardware units." },
        { name: "Microcontrollers", description: "Firmware programming, registers, GPIO, timers, and peripheral control." },
        { name: "Programming", description: "Translating engineering logic into structured code across C, Python, and Java." },
        { name: "Data Structures & Algorithms", description: "Core data organization, algorithmic efficiency, and memory management." },
        { name: "Hardware & Systems", description: "Circuit debugging, semiconductor fundamentals, and system integration." },
        { name: "Computer Networks", description: "Network protocols, OSI model, IP addressing, and packet routing." },
      ],
    },
    {
      category: "AI & Digital",
      description: "Modern intelligent automation, autonomous agents, and analytical investigation.",
      skills: [
        { name: "AI", description: "Machine learning foundations, predictive models, and computational intelligence." },
        { name: "AI Agents", description: "Task-oriented automated workflows, agentic tool orchestration, and LLM prompting." },
        { name: "Research", description: "Systematic literature review, technical documentation inquiry, and benchmark comparison." },
        { name: "Problem Solving", description: "Analytical deconstruction of bottlenecks and structured debugging." },
      ],
    },
    {
      category: "Communication",
      description: "Clarity in technical translation, mentoring, and visual data delivery.",
      skills: [
        { name: "Communication", description: "Concise technical articulation for both engineering teams and non-technical stakeholders." },
        { name: "Mentoring", description: "Guiding fellow students and team members through complex engineering concepts." },
        { name: "Technical Documentation", description: "Drafting clear specifications, circuit documentation, and code explanations." },
        { name: "Technical-to-Commercial Translation", description: "Synthesizing product features into commercial benefits and user outcomes." },
        { name: "PPT & Graph Design", description: "Designing high-clarity data presentations, system diagrams, and architectural charts." },
      ],
    },
    {
      category: "Professional",
      description: "Workplace execution, collaboration, and adaptive engineering mindset.",
      skills: [
        { name: "Adaptability", description: "Rapid assimilation of new toolchains, frameworks, and engineering standards." },
        { name: "Teamwork", description: "Collaborative execution in multidisciplinary group projects and industrial labs." },
        { name: "Time Management", description: "Disciplined scheduling, milestone adherence, and target-driven delivery." },
      ],
    },
  ] as SkillGroup[],

  thinkingProcess: {
    title: "FROM COMPLEXITY TO CLARITY",
    subtitle: "A systematic 7-stage engineering methodology to solve unfamiliar challenges with rigor.",
    steps: [
      { step: "01", name: "Complex Problem", description: "Receive real-world friction, system constraints, or hardware-software mismatch." },
      { step: "02", name: "Understand", description: "Analyze requirements, signal limits, user context, and ground-truth specs." },
      { step: "03", name: "Break It Down", description: "Isolate into atomic modules: power, inputs/outputs, memory, algorithmic logic." },
      { step: "04", name: "Design a Solution", description: "Map out architecture, circuit schematics, and pseudo-code before writing code." },
      { step: "05", name: "Build", description: "Iterative implementation with clean syntax, modular drivers, and standard protocols." },
      { step: "06", name: "Test", description: "Validate under edge cases, hardware loop testing, timing constraints, and stress." },
      { step: "07", name: "Improve", description: "Refactor for runtime efficiency, thermal/power headroom, and clean maintainability." },
    ],
    examples: [
      {
        number: "01",
        label: "Technical → Simple",
        heading: "Demystifying Deep Tech for Real Humans",
        summary:
          "Engineering isn't about speaking in obscure acronyms. One of my core strengths is taking complex circuit behaviors, bus communication protocols, or algorithmic logic, and translating them into clear, visual, and intuitive explanations that peers, clients, and cross-functional teams immediately grasp.",
        pillars: [
          "Eliminating unnecessary jargon",
          "Visual system diagramming",
          "Relatable real-world analogies",
        ],
      },
      {
        number: "02",
        label: "Technical → Commercial",
        heading: "Engineering With Market Relevance",
        summary:
          "Technology exists to solve real problems and deliver tangible value. I am deeply interested in bridging the gap between low-level technical capability (embedded hardware, code efficiency, AI automation) and real-world commercial viability — understanding what makes a product cost-effective, scalable, and market-ready.",
        pillars: [
          "Target-driven execution",
          "Cost and resource awareness",
          "Strategic negotiation & alignment",
        ],
      },
    ],
  },

  certifications: [
    {
      id: "cert-01",
      title: "Computer Network and Internet Protocol",
      issuer: "NPTEL",
      credentialNote: "Verified Course on Network Protocols, OSI Architecture, TCP/IP, and Routing Fundamentals.",
      verified: true,
    },
    {
      id: "cert-02",
      title: "Data Structure and Algorithms Using Java",
      issuer: "CSC India (APSCHE)",
      credentialNote: "Government-supported intensive training in foundational data structures, algorithmic complexity, and Java implementation.",
      verified: true,
    },
    {
      id: "cert-03",
      title: "Programming Fundamentals Using Python",
      issuer: "Infosys | Springboard",
      credentialNote: "Hands-on foundation in computational thinking, procedural programming, data structures, and Python scripting.",
      verified: true,
    },
  ] as CertificationItem[],
};
