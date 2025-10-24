import React, { useState, useEffect } from 'react';
import { useScrollSpy, useIntersectionObserver } from './hooks';
import type { Project, EducationItem } from './types';
import { 
  navLinks, 
  socialLinks,
  skillsData,
  aboutHighlights,
  educationData,
  experienceData,
  achievementsData,
  researchInterestsData,
  publicationsData,
  projectsData,
  LinkedInIcon, 
  GitHubIcon,
  ArrowRightIcon
} from './constants';

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
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-slate-100">
        <span className="text-beige-accent">{children.toString().charAt(0)}</span>{children.toString().substring(1)}
    </h2>
);

// Sidebar Component
const Sidebar: React.FC<{ activeSection: string | null; onLinkClick: (view: string) => void; isOpen: boolean; setIsOpen: (open: boolean) => void }> = ({ activeSection, onLinkClick, isOpen, setIsOpen }) => {
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
                className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-slate-300 hover:text-beige-accent transition-all duration-300 hover:scale-105"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen w-72 z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="h-full p-8 flex flex-col bg-white/5 backdrop-blur-2xl border-r border-white/10">
                    {/* Profile Section */}
                    <div className="mb-12">
                        <h1 className="text-2xl font-serif font-bold text-slate-100 mb-2">
                            Jay <span className="text-beige-accent">Gautam</span>
                        </h1>
                        <p className="text-sm text-slate-400">
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
                                        : 'text-slate-300 hover:text-beige-accent hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <div className="mt-8 pt-6 border-t border-white/10">
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
const Hero: React.FC = () => (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-100 leading-tight mb-6">
                    Building Intelligent Systems That <span className="text-beige-accent">Think, Adapt, and Deliver.</span>
                </h1>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    Computer Engineering student at VIT Pune — blending AI, Machine Learning, and Design to craft smarter systems.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-beige-accent/30 transition-all duration-300">
                        <div className="text-4xl font-bold text-beige-accent mb-2">12+</div>
                        <div className="text-sm text-slate-400">Projects Completed</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-beige-accent/30 transition-all duration-300">
                        <div className="text-4xl font-bold text-beige-accent mb-2">1</div>
                        <div className="text-sm text-slate-400">Publication</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                    <a href="#projects" 
                       className="px-6 py-3 bg-beige-accent text-dark-bg font-medium rounded-lg hover:shadow-glow-md transition-all duration-300 hover:scale-105">
                        View Projects
                    </a>
                    <a href="/resume.pdf" download 
                       className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/20 text-beige-accent font-medium rounded-lg hover:border-beige-accent/50 transition-all duration-300 hover:scale-105">
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
        <div className="max-w-5xl mx-auto px-6">
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
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle>Education</SectionTitle>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                {educationData.map((item, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-beige-accent/30 hover:border-beige-accent/50 transition-colors duration-300">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 bg-beige-accent rounded-full border-4 border-dark-bg"></div>
                        <div className="text-sm text-beige-accent mb-1">{item.year}</div>
                        <h3 className="text-lg font-semibold text-slate-100 mb-1">{item.institution}</h3>
                        <p className="text-slate-300 mb-1">{item.degree}</p>
                        <p className="text-sm text-slate-400 italic">Focus: {item.focus}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Skills Section
const Skills: React.FC = () => (
    <AnimatedSection id="skills">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle>Skills & Technologies</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsData.map((category) => (
                    <div key={category.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-beige-accent/30 hover:scale-105 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-beige-accent mb-4">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 text-sm bg-beige-accent/10 text-beige-accent rounded-full border border-beige-accent/30 hover:bg-beige-accent/20 transition-colors duration-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Project Card
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-beige-accent/30 hover:scale-105 transition-all duration-300 flex flex-col">
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-slate-100 mb-2 capitalize">
                {project.title.replace(/-/g, ' ').replace(/_/g, ' ')}
            </h3>
            <p className="text-slate-400 mb-4 flex-grow text-sm leading-relaxed">
                {project.longDescription}
            </p>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-beige-accent/10 text-beige-accent rounded-md border border-beige-accent/30">
                            {tag.replace(/-/g, ' ')}
                        </span>
                    ))}
                    {project.tags.length > 3 && <span className="text-xs text-slate-500">+{project.tags.length - 3}</span>}
                </div>
                <a href={project.html_url} target="_blank" rel="noopener noreferrer" 
                   className="text-slate-400 hover:text-beige-accent transition-all duration-300 hover:scale-110">
                    <GitHubIcon className="w-5 h-5" />
                </a>
            </div>
        </div>
    </div>
);

// Projects Section
const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <AnimatedSection id="projects">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Experience Section
const Experience: React.FC = () => (
    <AnimatedSection id="experience">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle>Experience & Involvement</SectionTitle>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
                {experienceData.map((item, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-beige-accent/30 hover:border-beige-accent/50 transition-colors duration-300">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 bg-beige-accent rounded-full border-4 border-dark-bg"></div>
                        <h3 className="text-lg font-semibold text-slate-100">
                            {item.role} <span className="text-beige-accent font-light">- {item.context}</span>
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Two Column Section
const TwoColumnSection: React.FC<{ id: string; title: string; items: string[] }> = ({ id, title, items }) => (
    <AnimatedSection id={id}>
        <div className="max-w-5xl mx-auto px-6">
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

// Contact Section
const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    type FormStatus = 'idle' | 'sending' | 'success' | 'error';
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('sending');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
    };

    return (
        <AnimatedSection id="contact">
            <div className="max-w-3xl mx-auto px-6">
                <SectionTitle>Get In Touch</SectionTitle>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                    <p className="text-xl text-beige-accent mb-6 text-center">
                        Let's build something amazing together 🚀
                    </p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:border-beige-accent focus:outline-none transition-all"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:border-beige-accent focus:outline-none transition-all"
                            />
                        </div>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:border-beige-accent focus:outline-none transition-all"
                        />
                        <button
                            type="submit"
                            disabled={formStatus === 'sending'}
                            className="w-full py-3 bg-beige-accent text-dark-bg font-medium rounded-lg hover:shadow-glow-md transition-all duration-300 hover:scale-105 disabled:opacity-50"
                        >
                            {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                        {formStatus === 'success' && (
                            <p className="text-green-400 text-sm text-center">Message sent successfully!</p>
                        )}
                    </form>
                    <div className="mt-6 text-center">
                        <a href="mailto:jaygaautam@gmail.com" className="text-slate-300 hover:text-beige-accent transition-colors">
                            jaygaautam@gmail.com
                        </a>
                    </div>
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
            }, 200);
        } else if (targetElement && currentView === 'home') {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentView(view);
                window.scrollTo(0, 0);
                setIsTransitioning(false);
            }, 200);
        }
    };

    const HomeView = () => (
        <>
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects projects={projectsData} />
            <Experience />
            <TwoColumnSection id="achievements" title="Achievements" items={achievementsData} />
            <TwoColumnSection id="publications" title="Publications" items={publicationsData} />
            <TwoColumnSection id="research" title="Research Interests" items={researchInterestsData} />
            <Contact />
        </>
    );

    return (
        <div className="bg-dark-bg font-sans text-slate-300 selection:bg-beige-accent selection:text-dark-bg min-h-screen">
            <Sidebar 
                activeSection={activeLink} 
                onLinkClick={handleNavClick} 
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
            <main className={`lg:ml-72 transition-all duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {HomeView()}
                <Footer />
            </main>
        </div>
    );
}

export default App;
