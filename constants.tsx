import React from 'react';
import type { Project, SkillCategory, Experience, NavLink, EducationItem, Hackathon, Publication } from './types';

export const navLinks: NavLink[] = [
  { name: 'About', href: '#about', children: [
    { name: 'Education', href: '#education' },
  ]},
  { name: 'Experience', href: '#experience', children: [
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Hackathons', href: '#hackathons' },
  ]},
  { name: 'Beyond Work', href: '#beyond-work' },
  { name: 'Contact', href: '#contact' },
];

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/jay-gautam/',
  github: 'https://github.com/Jay121305',
};

export const projectsData: Project[] = [
    {
        title: 'MindTheGap-Urban_CrowdSense',
        description: '',
        longDescription: 'An innovative urban crowd-sensing application that monitors real-time crowd density using advanced deep learning models and geofencing, providing crucial safety insights.',
        tags: ['deep-learning', 'flutter', 'firebase', 'flask', 'tensorflow', 'google-maps'],
        image: '/urban-crowd-sense.png',
        html_url: 'https://github.com/Jay121305/MindTheGap-Urban_CrowdSense'
    },
    {
        title: 'AI-Driven-Image-Captioning-and-Segmentation',
        description: '',
        longDescription: 'A powerful AI system that generates descriptive captions and performs precise segmentation for images, combining computer vision and natural language processing techniques.',
        tags: ['tensorflow', 'cnn', 'nlp', 'opencv', 'image-captioning', 'segmentation'],
        image: '/image-captioning.png',
        html_url: 'https://github.com/Jay121305/AI-Driven-Image-Captioning-and-Segmentation'
    },
    {
        title: 'AI-Powered-Multilingual-Review-Analysis-Summarization-System',
        description: '',
        longDescription: 'An intelligent system that analyzes and summarizes multilingual product reviews, leveraging large language models to extract sentiment and key insights for businesses.',
        tags: ['llm', 'rag', 'nlp', 'gcp', 'sentiment-analysis', 'summarization'],
        image: '/multilingual-review.png',
        html_url: 'https://github.com/Jay121305/AI-Powered-Multilingual-Review-Analysis-Summarization-System',
        liveUrl: 'https://jay121305.github.io/AI-Powered-Multilingual-Review-Analysis-Summarization-System/'
    },
    {
        title: 'Hybrid-Image-Text-Encryption-using-Genetic-Algorithm-',
        description: '',
        longDescription: 'A novel security solution that uses a genetic algorithm for hybrid encryption, securely embedding text within images to ensure data confidentiality and integrity.',
        tags: ['cryptography', 'genetic-algorithm', 'image-encryption', 'python', 'security', 'steganography'],
        image: '/hybrid-encryption.png',
        html_url: 'https://github.com/Jay121305/Hybrid-Image-Text-Encryption-using-Genetic-Algorithm-',
        liveUrl: 'https://hybrid-image-and-text-encryption-using.onrender.com'
    },
    {
        title: 'Migrant-Health-Management',
        description: '',
        longDescription: 'A comprehensive health management platform designed for migrants, utilizing OCR for document processing and AI to provide accessible and unified healthcare support.',
        tags: ['react', 'vite', 'nodejs', 'mongodb', 'ocr', 'ai'],
        image: '/migrant-health.png',
        html_url: 'https://github.com/Jay121305/Migrant-Health-Management'
    }
];

export const skillsData: SkillCategory[] = [
    { title: 'Languages', skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'SQL'] },
    { title: 'Frameworks & Libraries', skills: ['React', 'Node.js', 'Express.js', 'Next.js', 'Flutter', 'Spring Boot', 'TensorFlow', 'PyTorch'] },
    { title: 'Tools & Technologies', skills: ['Git', 'GitHub', 'AWS', 'MongoDB', 'MySQL', 'REST APIs', 'Linux', 'Android Studio'] },
    { title: 'Core Competencies', skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Machine Learning', 'Deep Learning', 'Full-Stack Development', 'System Design', 'Agile Methodologies'] },
];

export const aboutHighlights = [
    { icon: '💡', text: 'AI / ML Developer' },
    { icon: '☁️', text: 'Cloud & Web Tech Enthusiast' },
    { icon: '🧩', text: 'Innovator & Builder' },
    { icon: '🎯', text: 'Goal-driven and detail-oriented' }
];

export const heroStats = [
    { number: '12+', label: 'Projects' },
    { number: '2', label: 'Publications' },
];

export const educationData: EducationItem[] = [
    {
        year: '2023-2027',
        institution: 'VIT Pune',
        degree: 'B.Tech in Computer Engineering',
        focus: 'AI, ML, and Data Systems',
        skills: [
            'Strengthened fundamentals in data structures, algorithms, and system design.',
            'Gained hands-on experience with AI, ML, and IoT applications through academic projects.',
            'Improved code optimization, debugging, and documentation practices.',
            'Developed strong skills in collaboration, version control, and agile workflows.',
            'Explored UI/UX principles and software scalability for real-world usability.',
            'Learned problem abstraction and structured thinking for efficient system design.',
            'Built adaptability and technical resilience under tight deadlines and dynamic requirements.'
        ]
    },
    {
        year: '2011-2023',
        institution: 'Mount St. Patrick\'s Academy',
        degree: 'High School',
        focus: 'Science & Computer Applications',
        skills: [
            'Built strong analytical reasoning through mathematics and computer science.',
            'Led school sports and tech events, enhancing leadership and teamwork abilities.',
            'Represented school in cricket and athletics, developing discipline and focus.',
            'Cultivated early programming and logical problem-solving skills.',
            'Balanced academics and extracurriculars, fostering a well-rounded mindset.',
            'Learned the value of communication, consistency, and self-motivation.'
        ]
    }
];

export const experienceData: Experience[] = [
    { role: 'Technical Lead', context: 'VishwaShauryam, VIT Pune', period: 'Sep 2025 - May 2026', description: 'Led end-to-end website development (UI/UX, backend, deployment), driving 800+ monthly visitors and boosting event registrations by 35%. Managed tech campaigns and event infra for 8+ events (300+ attendees each), leading a 6-member team with 100% uptime.' },
    { role: 'Intern', context: 'Zidio Development', period: 'Sep 2024 - Oct 2024', description: 'Worked on backend optimization and UI design improvements.' },
    { role: 'Social Media Head', context: 'College Club', period: 'Oct 2023 - Mar 2024', description: 'Led digital strategy and improved engagement for campus events.' },
];

export const hackathonsData: Hackathon[] = [
    { name: 'Smart India Hackathon 2025', achievement: 'Finalist' },
    { name: 'InnerveX', achievement: 'Finalist' },
    { name: 'NEST 2.0', achievement: 'Finalist' },
    { name: 'Bajaj HackRX 6.0', achievement: 'Finalist' },
    { name: 'Hack for Bharat', achievement: 'Finalist' },
    { name: 'Project Morpheus', achievement: 'Finalist' },
];

export const achievementsData: string[] = [
    'Finalist in Smart India Hackathon 2025',
    '10+ projects across AI, IoT, and System Design',
    'Recognized for innovation and creative system integration',
    'Designed & deployed multiple applications independently',
];

export const certificationsData = [
    {
        name: 'AWS Cloud Technology Consultant',
        provider: 'Amazon Web Services',
        url: 'certificates/Coursera final.pdf',
        isMajor: true
    },
    {
        name: 'Machine Learning',
        provider: 'InternForte',
        url: 'certificates/Machine_Learning-Jay_Gautam.pdf',
        isMajor: true
    },
    {
        name: 'Health in Pixels - Startup Hackathon 2025',
        provider: 'Startup Hackathon Cohort 2025',
        url: 'certificates/Health_in_Pixels_Startup_Hackathon_2025.pdf',
        isMajor: false
    },
    {
        name: 'TechFiesta 2026 - DDos_Me_Daddy',
        provider: 'Pune Institute of Computer Technology (PICT)',
        url: 'certificates/TechFiesta_2026_DDos_Me_Daddy.pdf',
        isMajor: false
    },
];

export const publicationsData: Publication[] = [
    {
        title: 'IoT Enabled Waste Fire Pollution Mapping',
        venue: 'IEEE Xplore',
        year: 'December 2024',
        date: 'December 3, 2024',
        url: 'https://ieeexplore.ieee.org/document/10763240'
    },
    {
        title: 'IEEE Conference Publication',
        venue: 'IEEE Xplore',
        year: 'January 2026',
        date: 'January 30, 2026',
        url: 'https://ieeexplore.ieee.org/document/11362604'
    }
];

export const researchInterestsData: string[] = [
    'AI Explainability',
    'Hybrid Model Architectures',
    'Human-AI Interaction',
    'Sustainable Tech Systems',
];

// Icons
export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// FIX: Corrected a typo in the viewBox attribute of the SVG component.
export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);