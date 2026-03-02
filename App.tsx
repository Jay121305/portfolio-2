import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  hackathonsData,
  achievementsData,
  certificationsData,
  publicationsData,
  researchInterestsData,
  projectsData,
  LinkedInIcon, 
  GitHubIcon,
  ArrowRightIcon
} from './constants';
import DecryptedText from './components/DecryptedText';
import BlurText from './components/BlurText';
import ScrollFloat from './components/ScrollFloat';
import TargetCursor from './components/TargetCursor';
import TrueFocus from './components/TrueFocus';
import LogoLoop from './components/LogoLoop';

// Loading Screen Component   Lorris minimal style
const LoadingScreen: React.FC<{ onLoadComplete: () => void }> = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onLoadComplete, 400);
                    return 100;
                }
                return prev + 3;
            });
        }, 25);
        return () => clearInterval(interval);
    }, [onLoadComplete]);

    return (
        <div className="fixed inset-0 z-[9999] bg-dark-bg flex items-center justify-center">
            <div className="text-center space-y-8">
                <div className="text-6xl font-display font-bold tracking-tight">
                    <span className="text-green-accent">J</span><span className="text-neutral-200">G</span>
                </div>
                <div className="w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-green-accent transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-neutral-500 text-xs font-mono tracking-widest">{progress}%</div>
            </div>
        </div>
    );
};

// Animated Section Component
const AnimatedSection: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ id, children, className = '' }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
    const sectionRef = ref as React.RefObject<HTMLDivElement>;

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`py-16 md:py-24 transition-all duration-700 ease-out transform ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
        >
            {children}
        </section>
    );
};

// Section Title   Lorris style with roman numeral
const SectionTitle: React.FC<{ children: React.ReactNode; number?: string }> = ({ children, number }) => (
    <div className="flex items-center gap-4 mb-12">
        {number && <span className="text-green-accent text-base font-mono tracking-widest">{number}</span>}
        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-100 uppercase tracking-wide">
            <BlurText
                text={typeof children === 'string' ? children : String(children)}
                delay={80}
                animateBy="words"
                direction="top"
                className="inline-block"
            />
        </h2>
        <div className="flex-1 h-[1px] bg-neutral-800 ml-4"></div>
    </div>
);

// Cursor Halo   follows cursor with a soft green glow
const CursorHalo: React.FC = () => {
    const haloRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const raf = useRef<number>(0);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };
        };
        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.12;
            pos.current.y += (target.current.y - pos.current.y) * 0.12;
            if (haloRef.current) {
                haloRef.current.style.transform = `translate(${pos.current.x - 250}px, ${pos.current.y - 250}px)`;
            }
            raf.current = requestAnimationFrame(animate);
        };
        window.addEventListener('mousemove', handleMove);
        raf.current = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <div
            ref={haloRef}
            className="pointer-events-none fixed top-0 left-0 z-[1] hidden md:block"
            style={{
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, rgba(74,222,128,0.04) 35%, transparent 65%)',
                willChange: 'transform',
            }}
        />
    );
};

// Animated mesh / grid background with floating orbs
const MeshBackground: React.FC = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
        }} />
        {/* Top-right mesh blob */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 animate-mesh-float-1"
             style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)' }} />
        {/* Bottom-left mesh blob */}
        <div className="absolute -bottom-60 -left-60 w-[700px] h-[700px] rounded-full opacity-25 animate-mesh-float-2"
             style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 65%)' }} />
        {/* Center ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20 animate-mesh-float-3"
             style={{ background: 'radial-gradient(ellipse, rgba(74,222,128,0.04) 0%, transparent 60%)' }} />
        {/* Small floating dots */}
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-green-accent/20 rounded-full animate-pulse-slow" />
        <div className="absolute top-[45%] right-[15%] w-1.5 h-1.5 bg-green-accent/15 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] left-[35%] w-1 h-1 bg-green-accent/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[70%] right-[40%] w-0.5 h-0.5 bg-green-accent/25 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[30%] left-[60%] w-1 h-1 bg-green-accent/15 rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
    </div>
);

// Side Decorations   floating geometric shapes and code symbols along sides
const SideDecorations: React.FC = () => (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden hidden lg:block">
        {/* Left vertical line */}
        <div className="absolute left-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-green-accent/[0.07] to-transparent animate-side-line-pulse"></div>
        
        {/* Left floating elements */}
        <div className="absolute left-6 top-[18%] animate-float-up-down" style={{ animationDelay: '0s' }}>
            <div className="w-3 h-3 border border-green-accent/20 rotate-45"></div>
        </div>
        <div className="absolute left-[52px] top-[32%] animate-float-down-up" style={{ animationDelay: '1.5s' }}>
            <div className="w-1.5 h-1.5 bg-green-accent/15 rounded-full"></div>
        </div>
        <div className="absolute left-5 top-[48%] animate-float-up-down" style={{ animationDelay: '3s' }}>
            <div className="w-4 h-4 border border-green-accent/10 rounded-full"></div>
        </div>
        <div className="absolute left-[46px] top-[62%] animate-float-down-up" style={{ animationDelay: '0.5s' }}>
            <span className="text-green-accent/[0.12] text-[10px] font-mono">&lt;/&gt;</span>
        </div>
        <div className="absolute left-7 top-[78%] animate-float-up-down" style={{ animationDelay: '2s' }}>
            <div className="w-2 h-2 border border-green-accent/15 rotate-45"></div>
        </div>
        <div className="absolute left-[50px] top-[90%] animate-float-down-up" style={{ animationDelay: '4s' }}>
            <div className="w-1 h-1 bg-green-accent/20 rounded-full"></div>
        </div>

        {/* Right vertical line */}
        <div className="absolute right-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-green-accent/[0.07] to-transparent animate-side-line-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Right floating elements */}
        <div className="absolute right-6 top-[22%] animate-float-down-up" style={{ animationDelay: '1s' }}>
            <div className="w-3 h-3 border border-green-accent/20 rotate-45"></div>
        </div>
        <div className="absolute right-[52px] top-[38%] animate-float-up-down" style={{ animationDelay: '2.5s' }}>
            <div className="w-1.5 h-1.5 bg-green-accent/15 rounded-full"></div>
        </div>
        <div className="absolute right-5 top-[55%] animate-float-down-up" style={{ animationDelay: '0.8s' }}>
            <div className="w-4 h-4 border border-green-accent/10 rounded-full"></div>
        </div>
        <div className="absolute right-[46px] top-[68%] animate-float-up-down" style={{ animationDelay: '3.5s' }}>
            <span className="text-green-accent/[0.12] text-[10px] font-mono">&#123; &#125;</span>
        </div>
        <div className="absolute right-7 top-[82%] animate-float-down-up" style={{ animationDelay: '1.8s' }}>
            <div className="w-2 h-2 border border-green-accent/15 rotate-45"></div>
        </div>
        <div className="absolute right-[50px] top-[15%] animate-float-up-down" style={{ animationDelay: '4.5s' }}>
            <div className="w-1 h-1 bg-green-accent/20 rounded-full"></div>
        </div>

        {/* Rotating accent shapes */}
        <div className="absolute left-4 top-[5%] animate-spin-slow">
            <div className="w-6 h-6 border border-green-accent/[0.06] rounded-sm"></div>
        </div>
        <div className="absolute right-4 bottom-[5%] animate-spin-slow" style={{ animationDirection: 'reverse' }}>
            <div className="w-6 h-6 border border-green-accent/[0.06] rounded-sm"></div>
        </div>
    </div>
);

// Top Navbar � full width with dropdown sub-sections
const Navbar: React.FC<{ activeSection: string | null; onLinkClick: (view: string) => void }> = ({ activeSection, onLinkClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, view: string) => {
        e.preventDefault();
        onLinkClick(view);
        setMobileOpen(false);
        setOpenDropdown(null);
    };

    const handleDropdownEnter = (name: string) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setOpenDropdown(name);
    };

    const handleDropdownLeave = () => {
        dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
    };

    const isParentActive = (link: typeof navLinks[0]) => {
        if (activeSection === link.href.substring(1)) return true;
        if (link.children) return link.children.some(c => activeSection === c.href.substring(1));
        return false;
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dark-bg/80 backdrop-blur-lg border-b border-neutral-800/50 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
            <div className="w-full px-6 lg:px-10 flex items-center justify-between h-20">
                {/* Logo � acts as Home ("Jay Gautam") */}
                <a href="#home" onClick={(e) => handleClick(e, 'home')} className="flex items-center gap-3 flex-shrink-0 group">
                    <div className="w-9 h-9 rounded-lg bg-green-accent/10 border border-green-accent/30 flex items-center justify-center group-hover:bg-green-accent/20 transition-all duration-300">
                        <span className="text-green-accent font-display font-bold text-sm">JG</span>
                    </div>
                    <span className="text-2xl md:text-3xl font-display font-bold tracking-tight text-neutral-100">
                        JAY <span className="text-green-accent">GAUTAM</span>
                    </span>
                </a>

                {/* Desktop nav � full width with dropdowns */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative"
                            onMouseEnter={() => link.children && handleDropdownEnter(link.name)}
                            onMouseLeave={() => link.children && handleDropdownLeave()}
                        >
                            <a
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href.substring(1))}
                                className={`cursor-target px-3 py-1.5 rounded-md text-[13px] font-medium uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-1 ${
                                    isParentActive(link)
                                        ? 'text-green-accent bg-green-accent/10'
                                        : 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/40'
                                }`}
                            >
                                {link.name}
                                {link.children && (
                                    <svg className={`w-3 h-3 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </a>
                            {link.children && openDropdown === link.name && (
                                <div className="absolute top-full left-0 mt-1 min-w-[180px] bg-dark-bg/95 backdrop-blur-lg border border-neutral-800/50 rounded-lg shadow-lg shadow-black/30 py-1.5 animate-fade-in-up z-50">
                                    {link.children.map((child) => (
                                        <a
                                            key={child.name}
                                            href={child.href}
                                            onClick={(e) => handleClick(e, child.href.substring(1))}
                                            className={`cursor-target block px-4 py-2 text-[12px] font-medium uppercase tracking-wider transition-all duration-300 ${
                                                activeSection === child.href.substring(1)
                                                    ? 'text-green-accent bg-green-accent/10'
                                                    : 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/40'
                                            }`}
                                        >
                                            {child.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Social + mobile toggle */}
                <div className="flex items-center gap-3">
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-target hidden md:flex p-2 text-neutral-400 hover:text-green-accent transition-colors">
                        <LinkedInIcon className="w-5 h-5" />
                    </a>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="cursor-target hidden md:flex p-2 text-neutral-400 hover:text-green-accent transition-colors">
                        <GitHubIcon className="w-5 h-5" />
                    </a>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-neutral-400 hover:text-green-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-dark-bg/95 backdrop-blur-lg border-b border-neutral-800/50 animate-fade-in-up">
                    <nav className="w-full px-6 py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href.substring(1))}
                                    className={`block px-4 py-2.5 rounded-md text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                                        isParentActive(link)
                                            ? 'text-green-accent bg-green-accent/10'
                                            : 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/30'
                                    }`}
                                >
                                    {link.name}
                                </a>
                                {link.children && (
                                    <div className="pl-6">
                                        {link.children.map((child) => (
                                            <a
                                                key={child.name}
                                                href={child.href}
                                                onClick={(e) => handleClick(e, child.href.substring(1))}
                                                className={`block px-4 py-2 rounded-md text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                                                    activeSection === child.href.substring(1)
                                                        ? 'text-green-accent bg-green-accent/10'
                                                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30'
                                                }`}
                                            >
                                                {child.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="flex gap-3 px-4 pt-3 mt-2 border-t border-neutral-800/50">
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-target p-2 text-neutral-400 hover:text-green-accent transition-colors">
                                <LinkedInIcon className="w-5 h-5" />
                            </a>
                            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="cursor-target p-2 text-neutral-400 hover:text-green-accent transition-colors">
                                <GitHubIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

// Hero Section   Lorris bold typography + hero image placeholder
const Hero: React.FC = () => (
    <section id="home" className="min-h-screen flex items-center px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left   text content */}
                <div className="space-y-8 animate-fade-in-up">
                    {/* Logo Loop */}
                    <div className="py-3 border-t border-b border-neutral-800/50">
                        <LogoLoop
                            logos={[
                                { name: 'React' },
                                { name: 'Python' },
                                { name: 'TensorFlow' },
                                { name: 'TypeScript' },
                                { name: 'AWS' },
                                { name: 'Node.js' },
                                { name: 'Flutter' },
                                { name: 'PyTorch' },
                                { name: 'MongoDB' },
                                { name: 'Next.js' },
                            ]}
                            speed={80}
                            direction="left"
                            logoHeight={16}
                            gap={40}
                            hoverSpeed={0}
                            fadeOut={true}
                            fadeOutColor="#0a0a0a"
                        />
                    </div>

                    {/* Main heading */}
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight text-neutral-100 uppercase">
                            <DecryptedText text="Building" animateOn="view" speed={60} maxIterations={15} className="text-neutral-100" />
                        </h1>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight text-neutral-100 uppercase">
                            <DecryptedText text="Intelligent" animateOn="view" speed={60} maxIterations={15} sequential={true} className="text-neutral-100" />
                        </h1>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight uppercase">
                            <DecryptedText text="Systems" animateOn="view" speed={60} maxIterations={15} sequential={true} className="text-green-accent" />
                        </h1>
                    </div>

                    <p className="text-neutral-400 text-lg md:text-xl max-w-xl leading-relaxed">
                        Computer Engineering student at VIT Pune   blending AI, Machine Learning, and Design to craft smarter systems.
                    </p>

                    {/* Stats */}
                    <div className="flex gap-8 pt-4">
                        {heroStats.map((stat, i) => (
                            <div key={i} className="group">
                                <ScrollFloat containerClassName="inline-block" textClassName="text-3xl md:text-4xl font-display font-bold text-green-accent">
                                    {stat.number}
                                </ScrollFloat>
                                <div className="text-sm text-neutral-500 uppercase tracking-widest mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href="#projects" 
                           className="cursor-target px-6 py-3 bg-green-accent text-dark-bg text-sm font-semibold rounded-md hover:shadow-glow-md transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-wider">
                            <TrueFocus sentence="View Projects" blurAmount={3} borderColor="#0a0a0a" glowColor="rgba(10,10,10,0.4)" animationDuration={0.4} pauseBetweenAnimations={1.5} />
                        </a>
                        <a href="/JayGautam_VIT_Pune.pdf" download="JayGautam_VIT_Pune.pdf"
                           className="cursor-target px-6 py-3 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-md hover:border-green-accent hover:text-green-accent transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-wider">
                            <TrueFocus sentence="Download Resume" blurAmount={3} borderColor="#4ade80" glowColor="rgba(74,222,128,0.4)" animationDuration={0.4} pauseBetweenAnimations={1.5} />
                        </a>
                    </div>
                </div>

                {/* Right   hero image */}
                <div className="hidden lg:flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden lorris-card">
                        <img src="/Jay.png" alt="Jay Gautam" className="w-full h-full object-cover" />
                        {/* Decorative corner accents */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-green-accent/30 rounded-tl-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-accent/30 rounded-br-2xl"></div>
                        {/* Subtle gradient overlay at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-bg/60 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// About Section
const About: React.FC = () => (
    <AnimatedSection id="about">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle number="I">About Me</SectionTitle>
            <div className="lorris-card rounded-xl p-6 md:p-8">
                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                    I'm a Computer Engineering student passionate about transforming ideas into intelligent, scalable solutions. From AI-driven applications to crowd-sensing systems, I love blending logic, data, and creativity to make tech feel human.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {aboutHighlights.map((highlight, index) => (
                        <div key={index} className="text-center p-4 rounded-lg bg-neutral-900/50 border border-neutral-800/50 hover:border-green-accent/20 transition-all duration-300">
                            <div className="text-2xl mb-2">{highlight.icon}</div>
                            <div className="text-sm text-neutral-400">{highlight.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </AnimatedSection>
);

// Education Section
const Education: React.FC = () => (
    <AnimatedSection id="education">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle number="II">Education</SectionTitle>
            <div className="space-y-6">
                {educationData.map((item, index) => (
                    <div key={index} className="lorris-card rounded-xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div className="flex-1">
                                <div className="text-sm text-green-accent font-mono tracking-widest mb-2">{item.year}</div>
                                <h3 className="text-xl font-display font-semibold text-neutral-100 mb-1">{item.institution}</h3>
                                <p className="text-neutral-400 text-base mb-1">{item.degree}</p>
                                <p className="text-sm text-neutral-500 italic">Focus: {item.focus}</p>
                            </div>
                        </div>
                        {item.skills && item.skills.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-neutral-800/50">
                                <h4 className="text-sm font-semibold text-green-accent uppercase tracking-widest mb-3">Key Learnings</h4>
                                <ul className="space-y-2">
                                    {item.skills.map((skill, skillIndex) => (
                                        <li key={skillIndex} className="flex items-start text-sm text-neutral-400 leading-relaxed">
                                            <span className="text-green-accent mr-2 mt-0.5 text-[10px]">&#9656;</span>
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

// Skills Section   Clean tag-based layout
const Skills: React.FC = () => (
    <AnimatedSection id="skills">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle number="III">Skills & Technologies</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {skillsData.map((category, catIndex) => (
                    <div key={category.title} 
                         className="lorris-card rounded-xl p-6"
                         style={{animation: `fadeInUp 0.5s ease-out ${catIndex * 0.1}s forwards`, opacity: 0}}>
                        <h3 className="text-sm font-semibold text-green-accent uppercase tracking-widest mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-accent rounded-full"></span>
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1.5 text-sm text-neutral-300 bg-neutral-800/50 border border-neutral-700/50 rounded-md hover:border-green-accent/30 hover:text-green-accent transition-all duration-300">
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

// Project Card   Lorris 3D hover
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTransform(`perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`);
    };

    const handleMouseLeave = () => setTransform('');

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lorris-card rounded-xl overflow-hidden flex flex-col h-full"
            style={{ transform, transition: 'transform 0.3s ease-out' }}
        >
            <div className="h-44 overflow-hidden bg-gradient-to-br from-green-accent/5 to-transparent">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-base font-display font-semibold text-neutral-100 mb-2 line-clamp-2 min-h-[2.5rem]">
                    {project.title.replace(/-/g, ' ').replace(/_/g, ' ')}
                </h3>
                <p className="text-neutral-500 mb-4 flex-grow text-sm leading-relaxed line-clamp-3">
                    {project.longDescription}
                </p>
                <div className="space-y-3 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-green-accent/5 text-green-accent rounded border border-green-accent/20">
                                {tag.replace(/-/g, ' ')}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs text-neutral-600">+{project.tags.length - 3}</span>
                        )}
                    </div>
                    <div className="pt-3 border-t border-neutral-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <a href={project.html_url} target="_blank" rel="noopener noreferrer" 
                               className="cursor-target text-sm text-green-accent hover:text-green-accent/80 transition-colors flex items-center gap-1.5">
                                <GitHubIcon className="w-3.5 h-3.5" />
                                GitHub
                            </a>
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                   className="cursor-target text-sm text-green-accent hover:text-green-accent/80 transition-colors flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    Try this out
                                </a>
                            )}
                        </div>
                        <ArrowRightIcon className="w-3.5 h-3.5 text-neutral-700" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Projects Section
const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <AnimatedSection id="projects">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle number="IV">Featured Projects</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
            <div className="mt-10 text-center">
                <a href="https://github.com/Jay121305" target="_blank" rel="noopener noreferrer"
                   className="cursor-target inline-flex items-center gap-2 px-6 py-3 bg-green-accent text-dark-bg text-sm font-semibold rounded-md hover:shadow-glow-md transition-all duration-300 uppercase tracking-wider">
                    <TrueFocus sentence="More on GitHub" blurAmount={3} borderColor="#0a0a0a" glowColor="rgba(10,10,10,0.4)" animationDuration={0.4} pauseBetweenAnimations={1.5} />
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle number="V">Experience</SectionTitle>
            <div className="lorris-card rounded-xl p-6 md:p-8 space-y-6">
                {experienceData.map((item, index) => (
                    <div key={index} className="relative pl-6 border-l border-neutral-800 hover:border-green-accent/50 transition-colors duration-300">
                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-green-accent rounded-full"></div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                            <h3 className="text-base font-display font-semibold text-neutral-100">
                                {item.role} <span className="text-green-accent font-normal">  {item.context}</span>
                            </h3>
                            {item.period && <span className="text-xs text-neutral-600 font-mono tracking-wider flex-shrink-0">{item.period}</span>}
                        </div>
                        <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

// Hackathons Section
const Hackathons: React.FC = () => (
    <AnimatedSection id="hackathons">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle number="VI">Hackathons</SectionTitle>
            <div className="lorris-card rounded-xl p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hackathonsData.map((hackathon, index) => (
                        <div key={index} className="group p-4 rounded-lg bg-neutral-900/50 border border-neutral-800/50 hover:border-green-accent/30 transition-all duration-300">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-md bg-green-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-accent/20 transition-colors">
                                    <svg className="w-4 h-4 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-base font-display font-medium text-neutral-200 group-hover:text-green-accent transition-colors">{hackathon.name}</h4>
                                    <span className="text-xs text-green-accent/70 font-mono uppercase tracking-wider">{hackathon.achievement}</span>
                                    {hackathon.name === 'InnerveX' && (
                                        <div className="mt-3 rounded-lg overflow-hidden border border-neutral-800/50">
                                            <img src="/innervex.png" alt="InnerveX Hackathon" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    )}
                                    {hackathon.name === 'Bajaj HackRX 6.0' && (
                                        <div className="mt-3 rounded-lg overflow-hidden border border-neutral-800/50">
                                            <img src="/BajajHackRX6.0.png" alt="Bajaj HackRX 6.0" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    )}
                                    {hackathon.name === 'Project Morpheus' && (
                                        <div className="mt-3 rounded-lg overflow-hidden border border-neutral-800/50">
                                            <img src="/morpheus.png" alt="Project Morpheus" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </AnimatedSection>
);

// Journey Timeline   prominent zigzag design
const JourneyTimeline: React.FC = () => {
    const timelineEvents = [
        { year: '2023-2027', title: 'VIT Pune', category: 'Education', desc: 'B.Tech Computer Engineering', icon: '??' },
        { year: 'Jan 2026', title: 'IEEE Publication #2', category: 'Achievement', desc: 'Second research paper published', icon: '??' },
        { year: '2025-2026', title: 'Technical Lead', category: 'Experience', desc: 'VishwaShauryam, VIT Pune', icon: '??' },
        { year: 'Sep�Oct 2024', title: 'Data Science Intern', category: 'Experience', desc: 'Zidio Development', icon: '??' },
        { year: '2025', title: 'AWS Certified', category: 'Certification', desc: 'Cloud Technology Consultant', icon: '??' },
        { year: 'Dec 2024', title: 'IEEE Publication #1', category: 'Achievement', desc: 'IoT Waste Fire Mapping', icon: '??' },
        { year: 'Oct 2023�Mar 2024', title: 'Social Media Head', category: 'Experience', desc: 'College Club', icon: '??' },
        { year: '2011-2023', title: 'Mount St. Patrick School', category: 'Education', desc: 'High School', icon: '??' },
    ]

    const categoryColor: Record<string, string> = {
        Education: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        Achievement: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        Experience: 'bg-green-accent/20 text-green-accent border-green-accent/30',
        Certification: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };

    return (
        <AnimatedSection id="timeline">
            <div className="max-w-5xl mx-auto px-6">
                <SectionTitle number="VII">My Journey</SectionTitle>
                <div className="relative">
                    {/* Central line   glowing */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-[0.5px] top-0 h-full w-[2px]">
                        <div className="w-full h-full bg-gradient-to-b from-green-accent via-green-accent/40 to-transparent"></div>
                    </div>
                    {/* Start cap */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 -top-2 w-4 h-4 rounded-full bg-green-accent shadow-[0_0_20px_rgba(74,222,128,0.5)] z-10"></div>
                    
                    <div className="space-y-0 pt-6">
                        {timelineEvents.map((event, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div 
                                    key={index} 
                                    className="relative flex md:items-center group"
                                    style={{animation: `fadeInUp 0.5s ease-out ${index * 0.12}s forwards`, opacity: 0}}
                                >
                                    {/* Desktop: alternating sides */}
                                    <div className={`hidden md:flex w-full items-center ${isLeft ? '' : 'flex-row-reverse'}`}>
                                        {/* Content card */}
                                        <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                            <div className="lorris-card rounded-xl p-5 group-hover:border-green-accent/40 group-hover:shadow-glow-sm transition-all duration-500 inline-block">
                                                <div className="flex items-center gap-2 mb-2" style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full border font-mono uppercase tracking-widest ${categoryColor[event.category] || ''}`}>
                                                        {event.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-display font-bold text-neutral-100 mb-1">{event.title}</h3>
                                                <p className="text-base text-neutral-400 mb-2">{event.desc}</p>
                                                <div className="text-sm text-green-accent font-mono tracking-wider font-semibold">{event.year}</div>
                                            </div>
                                        </div>
                                        
                                        {/* Center node */}
                                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                                            <div className="w-10 h-10 rounded-full bg-dark-card border-2 border-green-accent/50 flex items-center justify-center group-hover:border-green-accent group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all duration-500">
                                                <span className="text-sm">{event.icon}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Empty spacer */}
                                        <div className="w-[calc(50%-2rem)]"></div>
                                    </div>

                                    {/* Mobile: always left-aligned */}
                                    <div className="flex md:hidden items-start gap-4 pl-14 pb-8">
                                        <div className="absolute left-[18px] z-10">
                                            <div className="w-8 h-8 rounded-full bg-dark-card border-2 border-green-accent/50 flex items-center justify-center">
                                                <span className="text-xs">{event.icon}</span>
                                            </div>
                                        </div>
                                        <div className="lorris-card rounded-xl p-4 flex-1">
                                            <span className={`text-xs px-2 py-0.5 rounded-full border font-mono uppercase tracking-widest ${categoryColor[event.category] || ''}`}>
                                                {event.category}
                                            </span>
                                            <h3 className="text-base font-display font-bold text-neutral-100 mt-2 mb-0.5">{event.title}</h3>
                                            <p className="text-sm text-neutral-400 mb-1">{event.desc}</p>
                                            <div className="text-sm text-green-accent font-mono tracking-wider">{event.year}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* End cap */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 -bottom-2 w-3 h-3 rounded-full bg-neutral-700 z-10"></div>
                </div>
            </div>
        </AnimatedSection>
    );
};

// Achievements Section
const Achievements: React.FC = () => {
    const [showAllCertificates, setShowAllCertificates] = useState(false);

    return (
        <AnimatedSection id="achievements">
            <div className="max-w-5xl mx-auto px-6">
                <SectionTitle number="VIII">Achievements & Recognition</SectionTitle>
                
                {/* Achievements */}
                <div className="lorris-card rounded-xl p-6 md:p-8 mb-5">
                    <h3 className="text-sm font-semibold text-green-accent uppercase tracking-widest mb-4">Key Achievements</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {achievementsData.map((item, index) => (
                            <li key={index} className="flex items-start text-sm text-neutral-400 hover:text-neutral-200 transition-colors">
                                <span className="text-green-accent mr-2 mt-0.5 text-[10px]">&#9656;</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Publications */}
                <div className="lorris-card rounded-xl p-6 md:p-8 mb-5">
                    <h3 className="text-sm font-semibold text-green-accent uppercase tracking-widest mb-4">Research Publications</h3>
                    <div className="space-y-4">
                        {publicationsData.map((pub, index) => (
                            <div key={index} className="flex items-start group">
                                <span className="text-green-accent mr-3 mt-0.5 text-[10px]">&#9656;</span>
                                <div className="flex-1">
                                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="cursor-target text-base text-neutral-200 font-medium hover:text-green-accent transition-colors">
                                        {pub.title}
                                    </a>
                                    <p className="text-sm text-neutral-500 mt-1">
                                        Published in <a href={pub.url} target="_blank" rel="noopener noreferrer" className="cursor-target text-green-accent hover:underline">{pub.venue}</a> &bull; {pub.date || pub.year}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div className="lorris-card rounded-xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-green-accent uppercase tracking-widest">Certifications</h3>
                        <button 
                            onClick={() => setShowAllCertificates(!showAllCertificates)}
                            className="text-xs text-green-accent hover:text-green-accent/80 transition-colors flex items-center gap-1 uppercase tracking-wider"
                        >
                            {showAllCertificates ? 'Show Less' : 'View All'}
                            <svg className={`w-3 h-3 transition-transform duration-300 ${showAllCertificates ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    
                    {/* Major Certifications */}
                    <div className="space-y-3 mb-4">
                        {certificationsData.filter(cert => cert.isMajor).map((cert, index) => (
                            <div key={index} className="flex items-start">
                                <span className="text-green-accent mr-2 mt-0.5 text-[10px]">&#9656;</span>
                                <div className="flex-1">
                                    <span className="text-base text-neutral-200 font-medium">
                                        {cert.name}   <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cursor-target text-green-accent hover:underline">{cert.provider}</a>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional certifications */}
                    <div className="space-y-3 mb-4">
                        {certificationsData.filter(cert => !cert.isMajor).map((cert, index) => (
                            <div key={index} className="flex items-start">
                                <span className="text-green-accent mr-2 mt-0.5 text-[10px]">&#9656;</span>
                                <div className="flex-1">
                                    <span className="text-sm text-neutral-400">
                                        {cert.name}   <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cursor-target text-green-accent/70 hover:underline">{cert.provider}</a>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* All Certificates */}
                    {showAllCertificates && (
                        <div className="mt-4 pt-4 border-t border-neutral-800/50">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <a href="/certificates/Coursera%201.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 1</a>
                                <a href="/certificates/Coursera%202.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 2</a>
                                <a href="/certificates/Coursera%203.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 3</a>
                                <a href="/certificates/Coursera%204.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 4</a>
                                <a href="/certificates/Coursera%205.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 5</a>
                                <a href="/certificates/Coursera%206.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 6</a>
                                <a href="/certificates/Coursera%207.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 7</a>
                                <a href="/certificates/Coursera%208.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 8</a>
                                <a href="/certificates/Coursera%209.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">AWS Fundamentals 9</a>
                                <a href="/certificates/sql_basic%20certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">SQL Basic</a>
                                <a href="/certificates/sql_intermediate%20certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">SQL Intermediate</a>
                                <a href="/certificates/sql_advanced%20certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">SQL Advanced</a>
                                <a href="/certificates/ProdigyInfotech_Internship_Certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">Prodigy Infotech Internship</a>
                                <a href="/certificates/Training%20Certificate.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">Training Certificate</a>
                                <a href="/certificates/N_04_Jay_Gautam_DT_Certificate.png" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">Digital Technology</a>
                                <a href="/certificates/Health_in_Pixels_Startup_Hackathon_2025.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">Health in Pixels Hackathon</a>
                                <a href="/certificates/TechFiesta_2026_DDos_Me_Daddy.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">TechFiesta 2026</a>
                                <a href="/certificates/Innoverse%20Participation%20Certificate%20__name__.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-green-accent transition-colors p-2 bg-neutral-900/50 rounded-md">Innoverse Participation</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
};

// Research Interests
const ResearchInterests: React.FC = () => (
    <AnimatedSection id="research">
        <div className="max-w-5xl mx-auto px-6">
            <SectionTitle number="IX">Research Interests</SectionTitle>
            <div className="lorris-card rounded-xl p-6 md:p-8">
                <div className="flex flex-wrap gap-3">
                    {researchInterestsData.map((item, index) => (
                        <span key={index} className="px-4 py-2 text-sm text-neutral-300 bg-neutral-800/50 border border-neutral-700/50 rounded-md hover:border-green-accent/30 hover:text-green-accent transition-all duration-300">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </AnimatedSection>
);

// Beyond Work � Personal Blog / Experiences Section
const BeyondWork: React.FC = () => {
    const posts = [
        {
            title: 'Coming Soon',
            category: 'Adventures',
            excerpt: 'Exciting stories from my travels, hobbies, and life outside of code are on their way. Stay tuned!',
            date: 'March 2026',
            icon: (
                <svg className="w-5 h-5 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
    ];

    return (
        <AnimatedSection id="beyond-work">
            <div className="max-w-5xl mx-auto px-6">
                <SectionTitle number="XI">Beyond Work</SectionTitle>
                <div className="lorris-card rounded-xl p-6 md:p-8">
                    <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                        Life isn't just about code and algorithms. Here's where I share the other side, travel stories, new things I'm learning, and experiences that shape who I am beyond the keyboard.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {posts.map((post, index) => (
                            <div key={index} className="group p-5 rounded-lg bg-neutral-900/50 border border-neutral-800/50 hover:border-green-accent/30 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-accent/10 flex items-center justify-center group-hover:bg-green-accent/20 transition-colors">
                                        {post.icon}
                                    </div>
                                    <span className="text-xs text-green-accent/70 font-mono uppercase tracking-wider">{post.category}</span>
                                </div>
                                <h4 className="text-lg font-display font-semibold text-neutral-200 mb-2 group-hover:text-green-accent transition-colors">{post.title}</h4>
                                <p className="text-sm text-neutral-500 leading-relaxed mb-3">{post.excerpt}</p>
                                <div className="text-xs text-neutral-600 font-mono tracking-wider">{post.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

// Contact Section
const Contact: React.FC = () => (
    <AnimatedSection id="contact">
        <div className="max-w-3xl mx-auto px-6">
            <SectionTitle number="XII">Let's Talk</SectionTitle>
            <div className="text-center space-y-6">
                <p className="text-neutral-400 text-lg leading-relaxed">
                    Looking to start a project or just chat about tech. Feel free to contact me.
                </p>
                <ScrollFloat containerClassName="inline-block" textClassName="text-neutral-400 text-xl font-display" animationDuration={0.8}>
                    Let's build something great together
                </ScrollFloat>
                <a 
                    href="mailto:jaygaautam@gmail.com"
                    className="cursor-target inline-flex items-center gap-3 px-8 py-4 bg-green-accent text-dark-bg font-semibold rounded-md hover:shadow-glow-md transition-all duration-300 hover:-translate-y-0.5 text-base uppercase tracking-wider"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <TrueFocus sentence="Contact Me" blurAmount={3} borderColor="#0a0a0a" glowColor="rgba(10,10,10,0.4)" animationDuration={0.4} pauseBetweenAnimations={1.5} />
                </a>
                <p className="text-neutral-600 text-sm font-mono tracking-wider">
                    jaygaautam@gmail.com
                </p>
            </div>
        </div>
    </AnimatedSection>
);

// Footer   Lorris style
const Footer: React.FC = () => (
    <footer className="py-10 border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-600 font-mono tracking-wider">&copy;2026 Jay Gautam. All Rights Reserved.</p>
            <div className="flex items-center gap-4 text-sm text-neutral-600">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-target hover:text-green-accent transition-colors uppercase tracking-wider">LinkedIn</a>
                <span> </span>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="cursor-target hover:text-green-accent transition-colors uppercase tracking-wider">GitHub</a>
            </div>
        </div>
    </footer>
);

// Main App Component
function App() {
    const [currentView, setCurrentView] = useState('home');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const sectionIds = navLinks.flatMap(link => {
        const ids = [link.href.substring(1)];
        if (link.children) ids.push(...link.children.map(c => c.href.substring(1)));
        return ids;
    }).filter(id => id !== 'home');
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
            }, 300);
        } else if (targetElement && currentView === 'home') {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentView(view);
                window.scrollTo(0, 0);
                setIsTransitioning(false);
            }, 300);
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
            <Hackathons />
            <Achievements />
            <ResearchInterests />
            <BeyondWork />
            <Contact />
        </>
    );

    if (isLoading) {
        return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
    }

    return (
        <div className="font-sans bg-dark-bg text-neutral-300 min-h-screen">
            <MeshBackground />
            <SideDecorations />
            <CursorHalo />
            <TargetCursor targetSelector=".cursor-target" />
            <Navbar 
                activeSection={activeLink} 
                onLinkClick={handleNavClick} 
            />
            <main className={`relative z-[2] transition-all duration-500 ease-out ${
                isTransitioning 
                    ? 'opacity-0 translate-y-2' 
                    : 'opacity-100 translate-y-0'
            }`}>
                {HomeView()}
                <Footer />
            </main>
        </div>
    );
}

export default App;
