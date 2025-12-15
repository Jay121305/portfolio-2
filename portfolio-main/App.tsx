import React, { useState, useEffect, useRef } from 'react';
import { useScrollSpy, useIntersectionObserver } from './hooks';
import type { Project, EducationItem } from './types';
import { 
  navLinks, 
  socialLinks,
  skillsData,
  aboutHighlights,
  heroStats,
  educationData,
  experienceData,
  achievementsData,
  certificationsData,
  publicationsData,
  researchInterestsData,
  projectsData,
  LinkedInIcon, 
  GitHubIcon,
  ArrowRightIcon
} from './constants';

// Loading Screen Component
const LoadingScreen: React.FC<{ onLoadComplete: () => void }> = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onLoadComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onLoadComplete]);

    return (
        <div className="fixed inset-0 z-[9999] bg-dark-bg flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="text-5xl font-serif font-bold text-beige-accent animate-pulse">
                    JG
                </div>
                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-beige-accent transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-slate-400 text-sm">{progress}%</div>
            </div>
        </div>
    );
};

// Cursor Trail Component
const CursorTrail: React.FC = () => {
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let idCounter = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const newParticle = { x: mouseX, y: mouseY, id: idCounter++ };
            setTrail(prev => [...prev.slice(-8), newParticle]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {trail.map((particle, index) => (
                <div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-beige-accent rounded-full"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        opacity: (index + 1) / trail.length * 0.5,
                        transform: `scale(${(index + 1) / trail.length})`,
                        transition: 'opacity 0.5s, transform 0.5s'
                    }}
                />
            ))}
        </div>
    );
};

// Theme Toggle Component
const ThemeToggle: React.FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => (
    <button
        onClick={onToggle}
        className="fixed top-6 right-6 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-slate-300 hover:text-beige-accent transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
    >
        {isDark ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
        ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
        )}
    </button>
);

// 3D Floating Elements Component
const FloatingElements: React.FC = () => {
    const shapes = [
        { size: 120, top: '10%', left: '15%', delay: '0s', duration: '20s', rotateX: 45, rotateY: 45 },
        { size: 80, top: '60%', left: '80%', delay: '2s', duration: '25s', rotateX: 60, rotateY: 30 },
        { size: 100, top: '30%', left: '85%', delay: '4s', duration: '22s', rotateX: 30, rotateY: 60 },
        { size: 90, top: '75%', left: '10%', delay: '1s', duration: '23s', rotateX: 50, rotateY: 50 },
        { size: 70, top: '20%', left: '50%', delay: '3s', duration: '21s', rotateX: 40, rotateY: 70 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
            {shapes.map((shape, idx) => (
                <div
                    key={idx}
                    className="absolute animate-float"
                    style={{
                        top: shape.top,
                        left: shape.left,
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        animationDelay: shape.delay,
                        animationDuration: shape.duration,
                    }}
                >
                    <div
                        className="w-full h-full"
                        style={{
                            transform: `rotateX(${shape.rotateX}deg) rotateY(${shape.rotateY}deg)`,
                            transformStyle: 'preserve-3d',
                            perspective: '1000px',
                        }}
                    >
                        <div className="w-full h-full border-2 border-beige-accent/30 rounded-lg"
                            style={{
                                transform: 'translateZ(20px)',
                                boxShadow: '0 0 40px rgba(220, 199, 161, 0.3)',
                            }}
                        />
                        <div className="absolute inset-0 border-2 border-beige-accent/20 rounded-lg"
                            style={{
                                transform: 'translateZ(-20px)',
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

// Animated Section Component with glassmorphism
const AnimatedSection: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ id, children, className = '' }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
    const sectionRef = ref as React.RefObject<HTMLDivElement>;

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`py-12 md:py-16 transition-all duration-700 ease-out transform ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
        >
            {children}
        </section>
    );
};

// Section Title Component
const SectionTitle: React.FC<{ children: React.ReactNode; isDark?: boolean }> = ({ children, isDark = true }) => (
    <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-10 ${isDark ? 'text-slate-100 dark:text-slate-100 light-theme:text-slate-900' : 'text-slate-900'}`}>
        <span className="text-beige-accent">{children.toString().charAt(0)}</span>{children.toString().substring(1)}
    </h2>
);

// Sidebar Component
const Sidebar: React.FC<{ activeSection: string | null; onLinkClick: (view: string) => void; isOpen: boolean; setIsOpen: (open: boolean) => void; isDark?: boolean }> = ({ activeSection, onLinkClick, isOpen, setIsOpen, isDark = true }) => {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, view: string) => {
        e.preventDefault();
        onLinkClick(view);
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden fixed top-6 left-6 z-50 p-3 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                    isDark 
                        ? 'bg-white/10 border-white/20 text-slate-300 hover:text-beige-accent' 
                        : 'bg-slate-900/10 border-slate-900/20 text-slate-700 hover:text-beige-accent'
                }`}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen w-72 z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className={`h-full p-8 flex flex-col backdrop-blur-2xl border-r ${
                    isDark 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-slate-900/5 border-slate-900/10'
                }`}>
                    {/* Profile Section */}
                    <div className="mb-12">
                        <h1 className={`text-3xl font-serif font-bold mb-2 ${isDark ? 'text-slate-100 dark:text-slate-100 light-theme:text-slate-900' : 'text-slate-900'}`}>
                            Jay <span className="text-beige-accent">Gautam</span>
                        </h1>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            AI Developer & Innovator
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href.substring(1))}
                                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    activeSection === link.href.substring(1)
                                        ? 'bg-beige-accent/20 text-beige-accent border border-beige-accent/30'
                                        : `${isDark ? 'text-slate-300' : 'text-slate-700'} hover:text-beige-accent ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-900/5'} border border-transparent`
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-900/10'}`}>
                        <div className="flex gap-3">
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                               className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-beige-accent hover:border-beige-accent/50 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                                <LinkedInIcon className="w-5 h-5" />
                            </a>
                            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" 
                               className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-beige-accent hover:border-beige-accent/50 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                                <GitHubIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

// Hero Section
const Hero: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full animate-fade-in-up">
            <div className={`backdrop-blur-xl border rounded-2xl p-8 md:p-12 shadow-2xl hover:shadow-[0_0_50px_rgba(220,199,161,0.3)] transition-all duration-500 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'
            }`}>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 animate-slide-in-left ${
                    isDark ? 'text-slate-100 dark:text-slate-100 light-theme:text-slate-900' : 'text-slate-900'
                }`}>
                    Building Intelligent Systems That <span className="text-beige-accent animate-glow inline-block">Think, Adapt, and Deliver.</span>
                </h1>
                <p className={`text-lg mb-8 leading-relaxed animate-slide-in-right ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                }`} style={{animationDelay: '0.2s', opacity: 0, animation: 'slideInFromRight 0.8s ease-out 0.2s forwards'}}>
                    Computer Engineering student at VIT Pune — blending AI, Machine Learning, and Design to craft smarter systems.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className={`backdrop-blur-xl border rounded-xl p-6 hover:border-beige-accent/30 hover:scale-110 hover:rotate-2 transition-all duration-500 animate-scale-in ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'
                    }`} style={{animationDelay: '0.4s'}}>
                        <div className="text-4xl font-bold text-beige-accent mb-2">12+</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Projects Completed</div>
                    </div>
                    <div className={`backdrop-blur-xl border rounded-xl p-6 hover:border-beige-accent/30 hover:scale-110 hover:-rotate-2 transition-all duration-500 animate-scale-in ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'
                    }`} style={{animationDelay: '0.5s'}}>
                        <div className="text-4xl font-bold text-beige-accent mb-2">1</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Publication</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{animationDelay: '0.6s', opacity: 0, animation: 'fadeInUp 0.6s ease-out 0.6s forwards'}}>
                    <a href="#projects" 
                       className="px-6 py-3 bg-beige-accent text-dark-bg font-medium rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                        View Projects
                    </a>
                    <a href="/JayGautam_VIT_Pune.pdf" download="JayGautam_VIT_Pune.pdf"
                       className={`px-6 py-3 backdrop-blur-xl border font-medium rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                           isDark 
                               ? 'bg-white/5 border-white/20 text-beige-accent hover:border-beige-accent/50 hover:bg-beige-accent/10' 
                               : 'bg-slate-900/5 border-slate-900/20 text-beige-accent hover:border-beige-accent/50 hover:bg-beige-accent/10'
                       }`}>
                        Download Resume
                    </a>
                </div>
            </div>
        </div>
    </section>
);

// About Section
const About: React.FC = () => (
    <AnimatedSection id="about">
        <div className="max-w-6xl mx-auto px-6">
            <SectionTitle>About Me</SectionTitle>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                    I'm a Computer Engineering student passionate about transforming ideas into intelligent, scalable solutions. From AI-driven applications to crowd-sensing systems, I love blending logic, data, and creativity to make tech feel human.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {aboutHighlights.map((highlight, index) => (
                        <div key={index} className="text-center p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-beige-accent/30 hover:scale-105 transition-all duration-300">
                            <div className="text-3xl mb-2">{highlight.icon}</div>
                            <div className="text-sm text-slate-300">{highlight.text}</div>
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-xl text-beige-accent font-light italic text-center">
                    "Turning complex systems into seamless experiences — one project at a time."
                </p>
            </div>
        </div>
    </AnimatedSection>
);

// Education Section
const Education: React.FC = () => (
    <AnimatedSection id="education">
        <div className="max-w-6xl mx-auto px-6">
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-6">
                {educationData.map((item, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-beige-accent/20 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div className="flex-1">
                                <div className="text-sm text-beige-accent mb-2">{item.year}</div>
                                <h3 className="text-xl font-semibold text-slate-100 dark:text-slate-100 light-theme:text-slate-900 mb-1">{item.institution}</h3>
                                <p className="text-slate-300 mb-2">{item.degree}</p>
                                <p className="text-sm text-slate-400 italic">Focus: {item.focus}</p>
                            </div>
                        </div>
                        {item.skills && item.skills.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <h4 className="text-sm font-semibold text-beige-accent mb-3">Key Learnings & Skills</h4>
                                <ul className="space-y-2">
                                    {item.skills.map((skill, skillIndex) => (
                                        <li key={skillIndex} className="flex items-start text-sm text-slate-300">
                                            <span className="text-beige-accent mr-2 mt-0.5">•</span>
                                            <span>{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Skills Section
// Interactive Skills Section with Progress Bars
const Skills: React.FC = () => {
    const skillLevels: { [key: string]: number } = {
        'Python': 85, 'Java': 78, 'JavaScript': 82, 'C++': 71,
        'TensorFlow': 80, 'PyTorch': 76, 'Scikit-learn': 83, 'OpenCV': 68,
        'React': 84, 'Node.js': 74, 'MongoDB': 69, 'Firebase': 77,
        'AWS': 72, 'Azure': 65, 'Docker': 75, 'Kubernetes': 63,
        'Arduino': 79, 'Raspberry Pi': 81, 'ESP32': 73, 'IoT Protocols': 73,
        'Git': 85, 'Linux': 78, 'REST APIs': 82, 'CI/CD': 67,
        'LLMs': 78, 'OCR': 82, 'RAG': 75, 'Regression': 71, 'NLP': 80, 'Text Summarization': 77,
        'Firestore': 74, 'SQL': 79, 'Google Cloud': 68,
        'GitHub': 85, 'Canva': 72, 'VS Code': 83, 'Cursor': 76, 'Colab': 81,
        'Matplotlib': 79, 'Chart.js': 73, 'Dashboards': 66
    };

    return (
        <AnimatedSection id="skills">
            <div className="max-w-6xl mx-auto px-6">
                <SectionTitle>Skills & Technologies</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.map((category, catIndex) => (
                        <div key={category.title} 
                             className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-beige-accent/30 transition-all duration-500"
                             style={{animation: `fadeInUp 0.6s ease-out ${catIndex * 0.1}s forwards`, opacity: 0}}>
                            <h3 className="text-lg font-semibold text-beige-accent mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-beige-accent rounded-full animate-pulse"></span>
                                {category.title}
                            </h3>
                            <div className="space-y-4">
                                {category.skills.map((skill, index) => {
                                    const level = skillLevels[skill] || 70;
                                    return (
                                        <div key={skill} className="group">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-slate-300 group-hover:text-beige-accent transition-colors">{skill}</span>
                                                <span className="text-xs text-slate-500">{level}%</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-beige-accent/50 to-beige-accent rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_rgba(220,199,161,0.5)]"
                                                    style={{
                                                        width: `${level}%`,
                                                        animation: `slideInFromLeft 1s ease-out ${index * 0.1}s forwards`,
                                                        transformOrigin: 'left'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

// Project Card
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-beige-accent/30 hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
        <div className="h-48 overflow-hidden bg-gradient-to-br from-beige-accent/10 to-transparent">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-slate-100 dark:text-slate-100 light-theme:text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                {project.title.replace(/-/g, ' ').replace(/_/g, ' ')}
            </h3>
            <p className="text-slate-400 mb-4 flex-grow text-sm leading-relaxed line-clamp-3">
                {project.longDescription}
            </p>
            <div className="space-y-3 mt-auto">
                <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-xs bg-beige-accent/10 text-beige-accent rounded-md border border-beige-accent/30 whitespace-nowrap">
                            {tag.replace(/-/g, ' ')}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="px-2.5 py-1 text-xs text-slate-500 flex items-center">
                            +{project.tags.length - 3} more
                        </span>
                    )}
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <a 
                        href={project.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-beige-accent hover:text-beige-accent/80 transition-colors flex items-center gap-1.5"
                    >
                        <GitHubIcon className="w-4 h-4" />
                        View Repository
                    </a>
                    <ArrowRightIcon className="w-4 h-4 text-slate-600" />
                </div>
            </div>
        </div>
    </div>
);

// Projects Section
const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <AnimatedSection id="projects">
        <div className="max-w-6xl mx-auto px-6">
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
            <div className="mt-10 text-center">
                <a 
                    href="https://github.com/Jay121305" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-beige-accent text-dark-bg font-medium rounded-lg hover:shadow-glow-md transition-all duration-300 hover:scale-105"
                >
                    View More Projects on GitHub
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
            </div>
        </div>
    </AnimatedSection>
);

// Experience Section
const Experience: React.FC = () => (
    <AnimatedSection id="experience">
        <div className="max-w-6xl mx-auto px-6">
            <SectionTitle>Experience & Involvement</SectionTitle>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
                {experienceData.map((item, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-beige-accent/30 hover:border-beige-accent/50 transition-colors duration-300">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 bg-beige-accent rounded-full border-4 border-dark-bg"></div>
                        <h3 className="text-lg font-semibold text-slate-100 dark:text-slate-100 light-theme:text-slate-900">
                            {item.role} <span className="text-beige-accent font-light">- {item.context}</span>
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Interactive Journey Timeline
const JourneyTimeline: React.FC = () => {
    const timelineEvents = [
        { year: '2023-2027', title: 'VIT Pune', category: 'Education', desc: 'Computer Engineering', color: 'beige' },
        { year: '2025', title: 'Data Science Intern', category: 'Experience', desc: 'Zidio Development', color: 'purple' },
        { year: '2025', title: 'AWS Certified', category: 'Certification', desc: 'Cloud Technology Consultant', color: 'blue' },
        { year: '2024', title: 'IEEE Publication', category: 'Achievement', desc: 'IoT Waste Fire Mapping', color: 'green' },
        { year: '2023', title: 'ML Intern', category: 'Experience', desc: 'InternForte', color: 'purple' },
        { year: '2011-2023', title: 'Mount St. Patrick School', category: 'Education', desc: 'High School', color: 'beige' },
    ];

    return (
        <AnimatedSection id="timeline">
            <div className="max-w-6xl mx-auto px-6">
                <SectionTitle>My Journey</SectionTitle>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-beige-accent via-beige-accent/50 to-transparent"></div>
                    
                    {/* Timeline events */}
                    <div className="space-y-12">
                        {timelineEvents.map((event, index) => (
                            <div 
                                key={index} 
                                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                                style={{animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`, opacity: 0}}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-beige-accent/30 hover:scale-105 transition-all duration-300 inline-block">
                                        <div className="text-sm text-beige-accent font-semibold mb-1">{event.year}</div>
                                        <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light-theme:text-slate-900 mb-1">{event.title}</h3>
                                        <div className="text-sm text-slate-400 mb-2">{event.category}</div>
                                        <p className="text-sm text-slate-300">{event.desc}</p>
                                    </div>
                                </div>
                                
                                {/* Center dot */}
                                <div className="relative z-10">
                                    <div className="w-6 h-6 bg-beige-accent rounded-full border-4 border-dark-bg shadow-[0_0_20px_rgba(220,199,161,0.6)] animate-pulse"></div>
                                </div>
                                
                                {/* Empty space for alternating layout */}
                                <div className="flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

// Two Column Section
// Two Column Section (for Research Interests)
const TwoColumnSection: React.FC<{ id: string; title: string; items: string[] }> = ({ id, title, items }) => (
    <AnimatedSection id={id}>
        <div className="max-w-6xl mx-auto px-6">
            <SectionTitle>{title}</SectionTitle>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-start hover:translate-x-1 transition-transform duration-200">
                            <ArrowRightIcon className="w-5 h-5 text-beige-accent mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </AnimatedSection>
);

// Achievements Section (includes achievements, certifications, and publications)
const Achievements: React.FC = () => {
    const [showAllCertificates, setShowAllCertificates] = useState(false);

    return (
        <AnimatedSection id="achievements">
            <div className="max-w-6xl mx-auto px-6">
                <SectionTitle>Achievements & Recognition</SectionTitle>
                
                {/* Achievements List */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 mb-6">
                    <h3 className="text-lg font-semibold text-beige-accent mb-4">Key Achievements</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {achievementsData.map((item, index) => (
                            <li key={index} className="flex items-start hover:translate-x-1 transition-transform duration-200">
                                <ArrowRightIcon className="w-5 h-5 text-beige-accent mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Publications */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 mb-6">
                    <h3 className="text-lg font-semibold text-beige-accent mb-4">Research Publications</h3>
                    <div className="space-y-4">
                        {publicationsData.map((pub, index) => (
                            <div key={index} className="flex items-start hover:translate-x-1 transition-transform duration-200">
                                <ArrowRightIcon className="w-5 h-5 text-beige-accent mr-3 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-slate-100 dark:text-slate-100 light-theme:text-slate-900 font-medium hover:text-beige-accent transition-colors">
                                        {pub.title}
                                    </a>
                                    <p className="text-sm text-slate-400 mt-1">
                                        Published in <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-beige-accent hover:underline">{pub.venue}</a> • {pub.year}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-beige-accent">Certifications</h3>
                        <button 
                            onClick={() => setShowAllCertificates(!showAllCertificates)}
                            className="text-sm text-beige-accent hover:text-beige-accent/80 transition-colors flex items-center gap-2"
                        >
                            {showAllCertificates ? 'Show Less' : 'View All Certificates'}
                            <svg className={`w-4 h-4 transition-transform duration-300 ${showAllCertificates ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    
                    {/* Major Certifications */}
                    <div className="space-y-3 mb-4">
                        {certificationsData.filter(cert => cert.isMajor).map((cert, index) => (
                            <div key={index} className="flex items-start hover:translate-x-1 transition-transform duration-200">
                                <ArrowRightIcon className="w-5 h-5 text-beige-accent mr-3 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="text-slate-100 dark:text-slate-100 light-theme:text-slate-900 font-medium">
                                        {cert.name} — <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-beige-accent hover:underline">{cert.provider}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* All Certificates Modal/Dropdown */}
                    {showAllCertificates && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <a href="/certificates/Coursera%201.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 1</a>
                                <a href="/certificates/Coursera%202.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 2</a>
                                <a href="/certificates/Coursera%203.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 3</a>
                                <a href="/certificates/Coursera%204.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 4</a>
                                <a href="/certificates/Coursera%205.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 5</a>
                                <a href="/certificates/Coursera%206.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 6</a>
                                <a href="/certificates/Coursera%207.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 7</a>
                                <a href="/certificates/Coursera%208.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 8</a>
                                <a href="/certificates/Coursera%209.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">AWS Fundamentals 9</a>
                                <a href="/certificates/sql_basic%20certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">SQL Basic</a>
                                <a href="/certificates/sql_intermediate%20certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">SQL Intermediate</a>
                                <a href="/certificates/sql_advanced%20certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">SQL Advanced</a>
                                <a href="/certificates/ProdigyInfotech_Internship_Certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">Prodigy Infotech Internship</a>
                                <a href="/certificates/Training%20Certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">Training Certificate</a>
                                <a href="/certificates/N_04_Jay_Gautam_DT_Certificate.png" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-beige-accent transition-colors p-2 bg-white/5 rounded-lg">Digital Technology Certificate</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
};

// Contact Section
const Contact: React.FC = () => {
    return (
        <AnimatedSection id="contact">
            <div className="max-w-3xl mx-auto px-6">
                <SectionTitle>Get In Touch</SectionTitle>
                <div className="text-center space-y-6">
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Let's build something amazing together 🚀
                    </p>
                    <a 
                        href="mailto:jaygaautam@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-beige-accent text-dark-bg font-medium rounded-lg hover:shadow-glow-md transition-all duration-300 hover:scale-105 text-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        Send me an email
                    </a>
                    <p className="text-slate-400 text-sm">
                        jaygaautam@gmail.com
                    </p>
                </div>
            </div>
        </AnimatedSection>
    );
};

// Footer
const Footer: React.FC = () => (
    <footer className="py-8 text-center text-slate-500 border-t border-white/10">
        <p className="text-sm">&copy; 2025 Jay Gautam. All Rights Reserved.</p>
    </footer>
);

// Main App Component
function App() {
    const [currentView, setCurrentView] = useState('home');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isDark, setIsDark] = useState(true);

    const sectionIds = navLinks.map(link => link.href.substring(1)).filter(id => id !== 'home');
    const activeSection = useScrollSpy(currentView === 'home' ? sectionIds : [], { offset: 100 });
    const activeLink = currentView === 'home' ? (activeSection || 'home') : currentView;

    const handleNavClick = (view: string) => {
        const targetElement = document.getElementById(view);
        if (view === 'home') {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsTransitioning(false);
            }, 400);
        } else if (targetElement && currentView === 'home') {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentView(view);
                window.scrollTo(0, 0);
                setIsTransitioning(false);
            }, 400);
        }
    };

    const HomeView = () => (
        <>
            <Hero />
            <About />
            <Education />
            <JourneyTimeline />
            <Skills />
            <Projects projects={projectsData} />
            <Experience />
            <Achievements />
            <TwoColumnSection id="research" title="Research Interests" items={researchInterestsData} />
            <Contact />
        </>
    );

    if (isLoading) {
        return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
    }

    return (
        <div className={`font-sans selection:bg-beige-accent selection:text-dark-bg min-h-screen transition-colors duration-500 ${
            isDark ? 'bg-dark-bg text-slate-300' : 'bg-slate-50 text-slate-900 light-theme'
        }`}>
            <FloatingElements />
            <CursorTrail />
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <Sidebar 
                activeSection={activeLink} 
                onLinkClick={handleNavClick} 
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                isDark={isDark}
            />
            <main className={`lg:ml-72 transition-all duration-700 ease-in-out ${
                isTransitioning 
                    ? 'opacity-0 scale-95 blur-sm' 
                    : 'opacity-100 scale-100 blur-0'
            }`}>
                {HomeView()}
                <Footer />
            </main>
        </div>
    );
}

export default App;
