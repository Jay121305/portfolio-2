import React, { useState, useEffect, useRef, useCallback } from 'react';
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


// Reusable Animated Section Component with smoother transitions
const AnimatedSection: React.FC<{ id: string; children: React.ReactNode, className?: string }> = ({ id, children, className = 'py-12 md:py-16' }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.05 });
    const sectionRef = ref as React.RefObject<HTMLDivElement>;

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 ${className} transition-all duration-700 ease-out transform ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
            {children}
        </section>
    );
};

// Section Title Component - Tighter spacing
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-8 md:mb-10">
        <span className="text-beige-accent">{children.toString().charAt(0)}</span>{children.toString().substring(1)}
    </h2>
);

// Navigation Component
const Navbar: React.FC<{ activeSection: string | null; onLinkClick: (view: string) => void; }> = ({ activeSection, onLinkClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, view: string) => {
        e.preventDefault();
        onLinkClick(view);
        setIsOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-bg/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
            <nav className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex justify-center items-center relative">
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => handleLinkClick(e, link.href.substring(1))}
                            className={`text-slate-300 hover:text-beige-accent transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-beige-accent after:transition-all after:duration-300 ${activeSection === link.href.substring(1) ? 'text-beige-accent after:w-full' : 'hover:after:w-full'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
                <button className="lg:hidden text-slate-300 absolute right-6 top-1/2 -translate-y-1/2" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                </button>
            </nav>
            {/* Mobile Menu */}
            <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-dark-bg/95 backdrop-blur-lg`}>
                <div className="flex flex-col items-center space-y-6 py-8">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => handleLinkClick(e, link.href.substring(1))} 
                            className={`text-xl ${activeSection === link.href.substring(1) ? 'text-beige-accent' : 'text-slate-300'} hover:text-beige-accent transition-colors duration-300`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};


// Hero Section Component - Redesigned with stats
const Hero: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center px-4 md:px-6 relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-dark-bg z-0">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-beige-accent/5 rounded-full filter blur-3xl animate-pulse opacity-20"></div>
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-beige-accent/5 rounded-full filter blur-3xl animate-pulse opacity-20 animation-delay-4000"></div>
        </div>
        <div className="z-10 max-w-5xl mx-auto w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-100 leading-tight">
                Hi, I'm <span className="text-beige-accent">Jay Gautam</span>
            </h1>
            <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                Building Intelligent Systems That Think, Adapt, and Deliver.
            </p>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
                Computer Engineering student at VIT Pune — blending AI, Machine Learning, and Design to craft smarter systems.
            </p>
            
            {/* Stats Section */}
            <div className="mt-8 md:mt-10 flex flex-wrap justify-center items-center gap-6 md:gap-8">
                <div className="text-center px-4">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-beige-accent">12+</div>
                    <div className="text-xs sm:text-sm md:text-base text-slate-400 mt-1">Projects</div>
                </div>
                <div className="w-px h-10 md:h-12 bg-slate-700"></div>
                <div className="text-center px-4">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-beige-accent">1</div>
                    <div className="text-xs sm:text-sm md:text-base text-slate-400 mt-1">Publication</div>
                </div>
            </div>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
                <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate('projects'); }} className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg font-medium text-dark-bg bg-beige-accent rounded-lg transition-all duration-300 hover:shadow-glow-md hover:scale-105">
                    View Projects
                </a>
                <a href="/resume.pdf" download="Jay-Gautam-Resume.pdf" className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg font-medium text-beige-accent bg-transparent border-2 border-beige-accent/50 rounded-lg hover:border-beige-accent transition-all duration-300 hover:scale-105">
                    Download Resume
                </a>
            </div>
            <div className="mt-6 md:mt-8 flex justify-center gap-3">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-beige-accent hover:border-beige-accent/50 transition-all duration-300 hover:scale-110"><LinkedInIcon className="w-5 h-5 md:w-6 md:h-6" /></a>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-beige-accent hover:border-beige-accent/50 transition-all duration-300 hover:scale-110"><GitHubIcon className="w-5 h-5 md:w-6 md:h-6" /></a>
            </div>
        </div>
    </section>
);

// About Section Component - More compact
const About = () => (
    <AnimatedSection id="about" className="py-10 md:py-14">
        <SectionTitle>About Me</SectionTitle>
        <div className="max-w-4xl mx-auto">
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                I'm a Computer Engineering student passionate about transforming ideas into intelligent, scalable solutions. From AI-driven applications to crowd-sensing systems, I love blending logic, data, and creativity to make tech feel human.
            </p>
            <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {aboutHighlights.map((highlight, index) => (
                    <div key={index} className="flex flex-col items-center p-3 md:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-beige-accent/30 transition-all duration-300 hover:shadow-glow-sm">
                        <span className="text-3xl md:text-4xl">{highlight.icon}</span>
                        <p className="mt-2 md:mt-3 text-center text-sm md:text-base text-slate-300">{highlight.text}</p>
                    </div>
                ))}
            </div>
            <p className="mt-8 md:mt-10 text-lg md:text-xl text-beige-accent font-light italic text-center">
                "Turning complex systems into seamless experiences — one project at a time."
            </p>
        </div>
    </AnimatedSection>
);

// Education Section Component - Tighter spacing
const Education = () => (
    <AnimatedSection id="education" className="py-10 md:py-14">
        <SectionTitle>Education</SectionTitle>
        <div className="max-w-4xl mx-auto space-y-6">
            {educationData.map((item, index) => (
                <div key={index} className="relative pl-6 md:pl-8 border-l-2 border-beige-accent/30 hover:border-beige-accent/50 transition-colors duration-300">
                    <div className="absolute -left-[9px] md:-left-[11px] top-1 w-4 h-4 md:w-5 md:h-5 bg-dark-bg border-2 border-beige-accent rounded-full"></div>
                    <p className="text-xs md:text-sm text-beige-accent/80 mb-1">{item.year}</p>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-100">{item.institution}</h3>
                    <p className="mt-1 text-sm md:text-base text-slate-300">{item.degree}</p>
                    <p className="mt-1 text-sm md:text-base text-slate-400 italic">Focus: {item.focus}</p>
                </div>
            ))}
        </div>
    </AnimatedSection>
);


// Skills Section Component - Grid layout with better spacing
const Skills = () => (
    <AnimatedSection id="skills" className="py-10 md:py-14">
        <SectionTitle>Skills & Technologies</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skillsData.map((category) => (
                <div key={category.title} className="p-4 md:p-5 bg-white/5 rounded-xl border border-white/10 hover:border-beige-accent/50 hover:shadow-glow-sm transition-all duration-300">
                    <h3 className="text-lg md:text-xl font-semibold text-beige-accent mb-3 md:mb-4">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map(skill => (
                            <span key={skill} className="px-2.5 py-1 text-xs md:text-sm bg-beige-accent/10 text-beige-accent rounded-full border border-beige-accent/30 hover:bg-beige-accent/20 transition-colors duration-200">{skill}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </AnimatedSection>
);

// Project Card Component - Enhanced with better hover effects
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="group relative flex flex-col bg-white/5 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-md hover:border-beige-accent/50">
        <img src={project.image} alt={project.title} className="w-full h-44 md:h-48 object-cover" />
        <div className="p-4 md:p-5 flex flex-col flex-grow">
            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-beige-accent transition-colors">
                <h3 className="text-lg md:text-xl font-semibold text-slate-100 mb-2 capitalize group-hover:text-beige-accent transition-colors">{project.title.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
            </a>
            <p className="text-sm md:text-base text-slate-400 mb-3 md:mb-4 flex-grow leading-relaxed">
                {project.longDescription}
            </p>
            <div className="flex justify-between items-center mt-auto gap-2">
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs bg-dark-bg text-beige-accent rounded-md border border-beige-accent/50 capitalize">{tag.replace(/-/g, ' ')}</span>
                    ))}
                    {project.tags.length > 3 && <span className="px-2 py-0.5 text-xs text-slate-500">+{project.tags.length - 3}</span>}
                </div>
                <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-beige-accent transition-transform duration-300 hover:scale-110 flex-shrink-0">
                    <GitHubIcon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
            </div>
        </div>
    </div>
);

// Projects Section Component - Tighter spacing
const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <AnimatedSection id="projects" className="py-10 md:py-14">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
            ))}
        </div>
    </AnimatedSection>
);

// Experience Section Component - Compact timeline
const Experience = () => (
    <AnimatedSection id="experience" className="py-10 md:py-14">
        <SectionTitle>Experience & Involvement</SectionTitle>
        <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">
            {experienceData.map((item, index) => (
                <div key={index} className="relative pl-6 md:pl-8 border-l-2 border-beige-accent/30 hover:border-beige-accent/50 transition-colors duration-300">
                    <div className="absolute -left-[9px] md:-left-[11px] top-1 w-4 h-4 md:w-5 md:h-5 bg-dark-bg border-2 border-beige-accent rounded-full"></div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-100">{item.role} <span className="text-beige-accent font-light">- {item.context}</span></h3>
                    <p className="mt-1 text-sm md:text-base text-slate-400">{item.description}</p>
                </div>
            ))}
        </div>
    </AnimatedSection>
);

const TwoColumnSection: React.FC<{ id: string; title: string; items: string[] }> = ({ id, title, items }) => (
    <AnimatedSection id={id} className="py-10 md:py-14">
        <SectionTitle>{title}</SectionTitle>
        <div className="max-w-4xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-3 md:gap-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start hover:translate-x-1 transition-transform duration-200">
                        <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 text-beige-accent mr-2 md:mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm md:text-base text-slate-300">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </AnimatedSection>
);

// Contact Section Component
const Contact = () => {
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
        const isSuccess = Math.random() > 0.2; 

        if (isSuccess) {
            setFormStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 5000);
        } else {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };
    
    return (
        <AnimatedSection id="contact">
            <SectionTitle>Get In Touch</SectionTitle>
            <div className="max-w-2xl mx-auto text-center">
                <p className="text-2xl text-beige-accent mb-8">Let’s build something amazing together 🚀</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <input 
                          type="text" 
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 p-4 rounded-lg border border-white/10 focus:border-beige-accent focus:ring-1 focus:ring-beige-accent outline-none transition-all" />
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Your Email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 p-4 rounded-lg border border-white/10 focus:border-beige-accent focus:ring-1 focus:ring-beige-accent outline-none transition-all" />
                    </div>
                    <textarea 
                      name="message"
                      placeholder="Your Message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 p-4 rounded-lg border border-white/10 focus:border-beige-accent focus:ring-1 focus:ring-beige-accent outline-none transition-all"></textarea>
                    <button 
                      type="submit" 
                      disabled={formStatus === 'sending'}
                      className="group relative inline-flex items-center justify-center px-10 py-3 text-lg font-medium text-beige-accent bg-transparent border-2 border-beige-accent rounded-lg overflow-hidden transition-all duration-300 hover:text-dark-bg disabled:opacity-50 disabled:cursor-not-allowed">
                        <span className="absolute left-0 top-0 w-full h-0 bg-beige-accent transition-all duration-300 group-hover:h-full group-disabled:h-0"></span>
                        <span className="relative">{formStatus === 'sending' ? 'Sending...' : 'Send Message'}</span>
                    </button>
                    <div className="h-6 mt-4">
                        {formStatus === 'success' && <p className="text-green-400">Message sent successfully! I'll get back to you soon.</p>}
                        {formStatus === 'error' && <p className="text-red-400">Something went wrong. Please try again later.</p>}
                    </div>
                </form>
                 <div className="mt-12 flex flex-col items-center space-y-6">
                    <a href="mailto:jaygaautam@gmail.com" className="text-slate-300 hover:text-beige-accent transition-colors duration-300 border-b border-transparent hover:border-beige-accent pb-1">jaygaautam@gmail.com</a>
                    <div className="flex justify-center space-x-6">
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-beige-accent transition-transform duration-300 hover:scale-110"><LinkedInIcon className="w-8 h-8" /></a>
                        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-beige-accent transition-transform duration-300 hover:scale-110"><GitHubIcon className="w-8 h-8" /></a>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    )
};

// Footer Component - Compact
const Footer = () => (
    <footer className="py-6 md:py-8 border-t border-white/10 text-center text-slate-500 px-4">
        <p className="text-sm md:text-base">&copy; 2025 Jay Gautam. All Rights Reserved.</p>
    </footer>
);

// Main App Component with smooth page transitions
function App() {
    const [currentView, setCurrentView] = useState('home');
    const [isTransitioning, setIsTransitioning] = useState(false);

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
            }, 150);
        } else if (targetElement && currentView === 'home') {
             targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentView(view);
                window.scrollTo(0, 0);
                setIsTransitioning(false);
            }, 150);
        }
    };

    const HomeView = () => (
        <>
            <Hero onNavigate={handleNavClick} />
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

    const pageComponentMap: { [key: string]: React.ReactNode } = {
        'about': <About />,
        'education': <Education />,
        'skills': <Skills />,
        'projects': <Projects projects={projectsData} />,
        'experience': <Experience />,
        'contact': <Contact />,
    };

    const renderCurrentView = () => {
        if (currentView === 'home') {
            return <HomeView />;
        }
        return pageComponentMap[currentView] || <HomeView />;
    };
    
    return (
        <div className="bg-dark-bg font-sans text-slate-300 selection:bg-beige-accent selection:text-dark-bg">
            <Navbar activeSection={activeLink} onLinkClick={handleNavClick} />
            <main className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {renderCurrentView()}
            </main>
            <Footer />
        </div>
    );
}

export default App;