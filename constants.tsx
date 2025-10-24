import React from 'react';
import type { Project, SkillCategory, Experience, NavLink, EducationItem } from './types';

export const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
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
        html_url: 'https://github.com/Jay121305/AI-Powered-Multilingual-Review-Analysis-Summarization-System'
    },
    {
        title: 'Hybrid-Image-Text-Encryption-using-Genetic-Algorithm-',
        description: '',
        longDescription: 'A novel security solution that uses a genetic algorithm for hybrid encryption, securely embedding text within images to ensure data confidentiality and integrity.',
        tags: ['cryptography', 'genetic-algorithm', 'image-encryption', 'python', 'security', 'steganography'],
        image: '/hybrid-encryption.png',
        html_url: 'https://github.com/Jay121305/Hybrid-Image-Text-Encryption-using-Genetic-Algorithm-'
    },
    {
        title: 'Migrant-Health-Management',
        description: '',
        longDescription: 'A comprehensive health management platform designed for migrants, utilizing OCR for document processing and AI to provide accessible and unified healthcare support.',
        tags: ['react', 'vite', 'nodejs', 'mongodb', 'ocr', 'ai'],
        image: '/assets/migrant-health.png',
        html_url: 'https://github.com/Jay121305/Migrant-Health-Management'
    }
];

export const skillsData: SkillCategory[] = [
    { title: 'Programming', skills: ['Python', 'Java', 'JavaScript', 'C++'] },
    { title: 'Web Development', skills: ['React', 'Node.js', 'Express.js', 'Tailwind', 'Firebase'] },
    { title: 'AI/ML', skills: ['LLMs', 'OCR', 'RAG', 'Regression', 'NLP', 'Text Summarization'] },
    { title: 'Databases & Cloud', skills: ['MongoDB', 'Firestore', 'SQL', 'AWS', 'Google Cloud'] },
    { title: 'Tools', skills: ['GitHub', 'Canva', 'VS Code', 'Cursor', 'Colab'] },
    { title: 'Visualization', skills: ['Matplotlib', 'Chart.js', 'Dashboards'] },
];

export const aboutHighlights = [
    { icon: '💡', text: 'AI / ML Developer' },
    { icon: '☁️', text: 'Cloud & Web Tech Enthusiast' },
    { icon: '🧩', text: 'Innovator & Builder' },
    { icon: '🎯', text: 'Goal-driven and detail-oriented' }
];

export const heroStats = [
    { number: '12+', label: 'Projects' },
    { number: '1', label: 'Publication' },
];

export const educationData: EducationItem[] = [
    {
        year: '2023–2027',
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
        year: '2011–2023',
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
    { role: 'Intern', context: 'Zidio Development', description: 'Worked on backend optimization and UI design improvements.' },
    { role: 'Social Media Head', context: 'College Club', description: 'Led digital strategy and improved engagement for campus events.' },
    { role: 'Hackathon Lead', context: 'TermSheet Validation using AI', description: 'Led a 5-member team to build an AI-powered document validation system using OCR and LLMs.' },
    { role: 'Hackathon Participant', context: 'Smart India Hackathon 2024 & 2025', description: 'Developed solutions for national-level problem statements in a competitive, team-based environment.'},
    { role: 'Hackathon Participant', context: 'Bajaj HackRx 2025, EY Techathon 6.0, Adobe Hackathon', description: 'Engaged in multiple industry-led hackathons, tackling real-world business challenges.' },
    { role: 'Hackathon Participant', context: 'Startup Hackathon 2.0', description: 'Collaborated in a fast-paced setting to conceptualize and prototype an innovative startup idea.' },
];

export const achievementsData: string[] = [
    'Finalist in AI-based Document Validation Hackathon',
    '10+ projects across AI, IoT, and System Design',
    'Recognized for innovation and creative system integration',
    'Designed & deployed multiple applications independently',
];

export const certificationsData = [
    {
        name: 'AWS Cloud Technology Consultant',
        provider: 'Amazon Web Services',
        url: '/certificates/Coursera final.pdf',
        isMajor: true
    },
    {
        name: 'Machine Learning',
        provider: 'InternForte',
        url: '/certificates/Machine_Learning-Jay_Gautam.pdf',
        isMajor: true
    }
];

export const publicationsData = [
    {
        title: 'IoT Enabled Waste Fire Pollution Mapping',
        venue: 'IEEE Xplore',
        year: '2024',
        url: 'https://ieeexplore.ieee.org/document/10763240'
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