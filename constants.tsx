export type Project = {
  title: string;
  label: string;
  description: string;
  detail: string;
  tags: string[];
  image: string;
  github: string;
  liveUrl?: string;
  metric: string;
  tone: 'sun' | 'sky' | 'violet';
  featured?: boolean;
};

export const site = {
  name: 'Jay Gautam',
  email: 'jaygaautam@gmail.com',
  github: 'https://github.com/Jay121305',
  linkedin: 'https://www.linkedin.com/in/jay-gautam/',
  // Swap this one filename whenever the landing-page portrait changes.
  profileImage: 'main.png',
  resumeFile: 'JayGautam_VIT_Pune_DS_DE_DA.pdf',
};

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'Beyond Work', href: '#beyond-work' },
  { label: 'Contact', href: '#contact' },
];

export const featuredProjects: Project[] = [
  {
    title: 'NYC Taxi Medallion Architecture',
    label: 'Lakehouse data engineering',
    description: 'From raw trip records to decision-ready data.',
    detail: 'An end-to-end Databricks lakehouse pipeline that ingests, cleans, enriches, and analyzes NYC Yellow Taxi trips through Bronze, Silver, and Gold Delta tables.',
    tags: ['Databricks', 'PySpark', 'Spark SQL', 'Delta Lake'],
    image: 'multilingual-review.png',
    github: 'https://github.com/Jay121305/NYC-Taxi-Medallion-Architecture',
    metric: '9.4M+ taxi trips · 11 notebooks · 5 Gold tables',
    tone: 'sun',
    featured: true,
  },
  {
    title: 'OpenCredit',
    label: 'Financial data platform',
    description: 'A credit platform with its data integrity built in.',
    detail: 'A production-style FastAPI and PostgreSQL platform with transaction analytics, Isolation Forest anomaly detection, audit ledgers, and role-based access control.',
    tags: ['FastAPI', 'PostgreSQL', 'scikit-learn', 'Analytics'],
    image: 'opencredit.png',
    github: 'https://github.com/Jay121305/OpenCredit',
    liveUrl: 'https://opencredit-api-ivon.onrender.com/',
    metric: '50+ endpoints · 141 passing tests · 85% coverage',
    tone: 'sky',
    featured: true,
  },
  {
    title: 'MindTheGap',
    label: 'Spatial data & civic intelligence',
    description: 'Urban signals, turned into faster action.',
    detail: 'A real-time civic issue platform that collects geo-tagged reports, performs spatial analysis, and prioritizes incoming issues through an end-to-end analytics workflow.',
    tags: ['Node.js', 'MongoDB', 'Flutter', 'Google Maps API'],
    image: 'urban-crowd-sense.png',
    github: 'https://github.com/Jay121305/MindTheGap-Urban_CrowdSense',
    metric: '1,432 reports processed · 27.8% faster issue resolution',
    tone: 'violet',
    featured: true,
  },
];

export const sideQuests: Project[] = [
  {
    title: 'Sahaj',
    label: 'Healthcare platform',
    description: 'Accessible health workflows for rural India.',
    detail: 'A healthcare platform with prescription analysis, multilingual health capsules, consent management, and structured follow-up workflows.',
    tags: ['React', 'Node.js', 'AI'],
    image: 'sahaj.png',
    github: 'https://github.com/Jay121305/Sahaj',
    metric: 'Multilingual rural-health workflows',
    tone: 'violet',
  },
  {
    title: 'Multilingual Review Analysis',
    label: 'Language intelligence',
    description: 'Reviews distilled into useful business signals.',
    detail: 'A multilingual review analysis and summarization system using LLM and retrieval-oriented techniques.',
    tags: ['LLM', 'RAG', 'NLP'],
    image: 'multilingual-review.png',
    github: 'https://github.com/Jay121305/AI-Powered-Multilingual-Review-Analysis-Summarization-System',
    liveUrl: 'https://jay121305.github.io/AI-Powered-Multilingual-Review-Analysis-Summarization-System/',
    metric: 'Multilingual sentiment and summaries',
    tone: 'sun',
  },
  {
    title: 'Image Captioning & Segmentation',
    label: 'Computer vision',
    description: 'Images understood through language and segmentation.',
    detail: 'A computer-vision system for caption generation and image segmentation.',
    tags: ['TensorFlow', 'CNN', 'NLP'],
    image: 'image-captioning.png',
    github: 'https://github.com/Jay121305/AI-Driven-Image-Captioning-and-Segmentation',
    metric: 'Vision + language experiment',
    tone: 'sky',
  },
  {
    title: 'Migrant Health Management',
    label: 'Applied systems',
    description: 'A unified health-support platform for migrant communities.',
    detail: 'A health-management platform using OCR and AI-assisted workflows for accessible documentation and support.',
    tags: ['React', 'MongoDB', 'OCR'],
    image: 'migrant-health.png',
    github: 'https://github.com/Jay121305/Migrant-Health-Management',
    metric: 'OCR-enabled health workflows',
    tone: 'violet',
  },
  {
    title: 'Hybrid Image-Text Encryption',
    label: 'Security exploration',
    description: 'A genetic-algorithm approach to secure image-text handling.',
    detail: 'A security experiment combining genetic algorithms, encryption, and image-text embedding.',
    tags: ['Python', 'Cryptography', 'Genetic Algorithms'],
    image: 'hybrid-encryption.png',
    github: 'https://github.com/Jay121305/Hybrid-Image-Text-Encryption-using-Genetic-Algorithm-',
    liveUrl: 'https://hybrid-image-and-text-encryption-using.onrender.com',
    metric: 'Security systems exploration',
    tone: 'sun',
  },
];

export const capabilityModes = {
  pipeline: {
    eyebrow: '01 / Shape the data',
    title: 'Data engineering that starts with the question.',
    copy: 'I build practical paths from raw records to reliable, queryable datasets - with attention to modelling, data quality, performance, and the people using the result.',
    skills: ['Databricks', 'PySpark', 'Spark SQL', 'Delta Lake', 'ETL pipelines', 'SQL'],
  },
  insight: {
    eyebrow: '02 / Find the signal',
    title: 'Analytics designed to make a decision easier.',
    copy: 'I use statistical analysis, feature engineering, dashboards, and applied machine learning to make large or messy data more legible and actionable.',
    skills: ['Power BI', 'Streamlit', 'scikit-learn', 'Statistical analysis', 'Matplotlib', 'Seaborn'],
  },
  system: {
    eyebrow: '03 / Ship the system',
    title: 'Software foundations that make data work useful.',
    copy: 'When a problem needs more than a notebook, I can take it into a complete product: APIs, databases, user flows, deployment, and tested engineering decisions.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'React', 'Git/GitHub'],
  },
} as const;

export const experience = [
  {
    period: 'Jun 2026 - Present',
    role: 'Intern',
    company: 'eInfochips (An Arrow Company)',
    copy: 'Profiled and optimized complex SQL queries and data-processing workflows; audited relational database architecture for accuracy, normalization, and reporting consistency.',
  },
  {
    period: 'Sep 2025 - May 2026',
    role: 'Technical Lead',
    company: 'VishwaShauryam, VIT Pune',
    copy: 'Led backend and database development for the official club platform, supporting secure registration data workflows for 8+ major events and data-driven campaign analysis.',
  },
];

export const education = {
  school: 'Vishwakarma Institute of Technology, Pune (SPPU)',
  degree: 'B.Tech in Computer Science Engineering',
  period: 'Jul 2023 - Jun 2027',
};

export const timeline = [
  { period: 'Jun 2026 - Present', type: 'Experience', title: 'Intern', organization: 'eInfochips (An Arrow Company)', copy: 'Optimising SQL and data-processing workflows while auditing relational-data structure for accurate reporting.' },
  { period: 'Feb 2026', type: 'Patent granted', title: 'IoT-Enabled Waste Fire Detection & Pollution Mapping', organization: 'Innovation milestone', copy: 'A granted patent for a system addressing waste-fire detection and pollution mapping.', href: 'https://iponline.cipc.co.za/Publications/PublishedJournals/E_Journal_May%202025%20Part%202.pdf' },
  { period: 'Jan 2026', type: 'IEEE publication', title: 'Research paper published', organization: 'IEEE Xplore', copy: 'A second peer-reviewed publication added to my research work.', href: 'https://ieeexplore.ieee.org/document/11362604' },
  { period: 'Sep 2025 - May 2026', type: 'Leadership', title: 'Technical Lead', organization: 'VishwaShauryam, VIT Pune', copy: 'Led backend and database development for a club platform supporting registration workflows and campaign analysis.' },
  { period: 'Oct 2025', type: 'Certification', title: 'AWS Cloud Technology Consultant', organization: 'Amazon Web Services', copy: 'Cloud fundamentals credential supporting my systems and data foundation.', href: 'certificates/Coursera final.pdf' },
  { period: 'Dec 2024', type: 'IEEE publication', title: 'IoT Enabled Waste Fire Pollution Mapping', organization: 'IEEE Xplore', copy: 'Published research connecting IoT sensing with pollution mapping.', href: 'https://ieeexplore.ieee.org/document/10763240' },
  { period: 'Jul 2023 - Jun 2027', type: 'Education', title: 'B.Tech, Computer Science Engineering', organization: 'Vishwakarma Institute of Technology, Pune', copy: 'Building foundations in data, software engineering, and applied systems.' },
];

export const recognition = {
  patent: {
    label: 'Granted patent',
    title: 'IoT-Enabled Waste Fire Detection & Pollution Mapping',
    copy: 'A recognised invention exploring connected sensing for faster waste-fire detection and pollution mapping.',
    href: 'https://iponline.cipc.co.za/Publications/PublishedJournals/E_Journal_May%202025%20Part%202.pdf',
    detail: 'Published journal reference · page 75',
  },
  publications: [
    { title: 'IoT Enabled Waste Fire Pollution Mapping', source: 'IEEE Xplore · Dec 2024', href: 'https://ieeexplore.ieee.org/document/10763240' },
    { title: 'Research publication', source: 'IEEE Xplore · Jan 2026', href: 'https://ieeexplore.ieee.org/document/11362604' },
  ],
  achievements: [
    'Finalist · Smart India Hackathon 2025',
    '10+ projects across AI, IoT, analytics, and systems design',
    'Technical lead · VishwaShauryam, VIT Pune',
  ],
  certificates: [
    { title: 'AWS Cloud Technology Consultant', issuer: 'Amazon Web Services', href: 'certificates/Coursera final.pdf' },
    { title: 'Machine Learning', issuer: 'InternForte', href: 'certificates/Machine_Learning-Jay_Gautam.pdf' },
    { title: 'Health in Pixels Startup Hackathon 2025', issuer: 'Participation certificate', href: 'certificates/Health_in_Pixels_Startup_Hackathon_2025.pdf' },
  ],
};
