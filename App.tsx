import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  capabilityModes,
  featuredProjects,
  navItems,
  recognition,
  sideQuests,
  site,
  timeline,
  type Project,
} from './constants';
import type { BlogPost } from './types';
import GradientText from './components/GradientText';
import LetterGlitch from './components/LetterGlitch';
import LightRays from './components/LightRays';
import TargetCursor from './components/TargetCursor';
import TechText from './components/TechText';
import TextLoop from './components/TextLoop';

const postModules = import.meta.glob<string>('./content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const asset = (file: string) => import.meta.env.BASE_URL + file.replace(/^\//, '');
const resourceHref = (href: string) => href.startsWith('http') ? href : asset(href);

function parsePost(raw: string, path: string): BlogPost {
  const matches = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  const frontmatter = matches?.[1] ?? '';
  const body = matches?.[2] ?? raw;
  const values = Object.fromEntries(
    frontmatter
      .split(/\r?\n/)
      .map((line) => line.match(/^([^:]+):\s*(.*)$/))
      .filter((entry): entry is RegExpMatchArray => Boolean(entry))
      .map((entry) => [entry[1].trim(), entry[2].trim().replace(/^['"]|['"]$/g, '')]),
  );
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'post';
  const tags = (values.tags ?? '')
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);

  return {
    slug,
    title: values.title ?? slug.replace(/-/g, ' '),
    date: values.date ?? '',
    description: values.description ?? '',
    tags,
    cover: values.cover,
    body: body.trim(),
  };
}

function getPosts() {
  return (Object.entries(postModules) as Array<[string, string]>)
    .map(([path, raw]) => parsePost(raw, path))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function formatDate(date: string) {
  const parsed = new Date(date + 'T00:00:00');
  return Number.isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
}

function Icon({ name, size = 18 }: { name: 'arrow' | 'github' | 'linkedin' | 'sun' | 'moon' | 'close' | 'menu'; size?: number }) {
  const paths = {
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    github: <path d="M12 2.6a9.4 9.4 0 0 0-3 18.3c.47.09.64-.2.64-.45v-1.64c-2.6.57-3.15-1.1-3.15-1.1-.43-1.08-1.04-1.36-1.04-1.36-.85-.58.06-.57.06-.57.94.07 1.44.97 1.44.97.84 1.43 2.2 1.02 2.74.78.09-.61.33-1.02.6-1.26-2.08-.24-4.27-1.04-4.27-4.67 0-1.04.37-1.88.97-2.55-.1-.24-.42-1.21.09-2.53 0 0 .79-.25 2.58.97a8.86 8.86 0 0 1 4.7 0c1.79-1.22 2.58-.97 2.58-.97.51 1.32.19 2.29.09 2.53.6.67.97 1.51.97 2.55 0 3.64-2.2 4.42-4.28 4.66.34.29.63.84.63 1.7v2.52c0 .25.17.55.65.45A9.4 9.4 0 0 0 12 2.6Z" />,
    linkedin: <><path d="M6.2 9.1H2.9V20h3.3V9.1Z" /><path d="M4.55 3a1.95 1.95 0 1 0 0 3.9 1.95 1.95 0 0 0 0-3.9Z" /><path d="M21.1 13.75c0-3.3-1.75-4.83-4.08-4.83-1.88 0-2.72 1.03-3.19 1.76V9.1h-3.3c.04 1.04 0 10.9 0 10.9h3.3v-6.1c0-.33.02-.66.12-.9.24-.66.79-1.35 1.71-1.35 1.2 0 1.68.92 1.68 2.26V20h3.3l.46-6.25Z" /></>,
    sun: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M20.6 15.3A8.7 8.7 0 0 1 8.7 3.4 8.75 8.75 0 1 0 20.6 15.3Z" />,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={['reveal', visible ? 'is-visible' : '', className].join(' ')}>{children}</div>;
}

function SectionHeading({ number, eyebrow, title, copy, technical = false }: { number: string; eyebrow: string; title: string; copy?: string; technical?: boolean }) {
  return (
    <div className="section-heading">
      <div className="section-index"><span>{number}</span><i /></div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        {technical ? <TechText as="h2">{title}</TechText> : <h2>{title}</h2>}
        {copy && <p className="section-copy">{copy}</p>}
      </div>
    </div>
  );
}

function Navbar({ theme, onThemeChange }: { theme: 'light' | 'dark'; onThemeChange: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Jay Gautam, home" onClick={closeMenu}><span className="brand-mark">JG</span><span>Jay Gautam<span className="brand-dot">.</span></span></a>
      <nav className={['site-nav', isOpen ? 'is-open' : ''].join(' ')} aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
        <a className="resume-nav" href={asset('resume.html')} target="_blank" rel="noreferrer">Resume <Icon name="arrow" size={15} /></a>
      </nav>
      <div className="nav-actions">
        <button className="icon-button theme-toggle" onClick={onThemeChange} aria-label={'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode'}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
        <button className="icon-button menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation" aria-expanded={isOpen}>{isOpen ? <Icon name="close" /> : <Icon name="menu" />}</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <Reveal className="hero-copy">
          <p className="hero-kicker"><span className="status-dot" /> Available for data-focused graduate roles</p>
          <h1>Data becomes <GradientText>direction.</GradientText></h1>
          <p className="hero-summary">I’m Jay, a Computer Science Engineering student at VIT Pune building data pipelines, analytical products, and the software systems that make them useful.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore selected work <Icon name="arrow" /></a>
            <a className="button button-quiet" href={asset('resume.html')} target="_blank" rel="noreferrer">Resume <span className="open-symbol">↗</span></a>
          </div>
          <TextLoop className="hero-footnote" items={['Data Engineering', 'Analytics', 'Systems']} />
        </Reveal>
        <Reveal className="hero-visual">
          <div className="profile-module">
            <div className="profile-orbit orbit-one"><span>Bronze</span><i /></div>
            <div className="profile-orbit orbit-two"><span>Gold</span><i /></div>
            <div className="profile-image-wrap"><img src={asset(site.profileImage)} alt="Portrait of Jay Gautam" /><span className="image-grain" /><span className="image-label">Portrait / replaceable asset</span></div>
            <div className="signal-card signal-card-top"><small>Current focus</small><strong>Useful data systems</strong></div>
            <div className="signal-card signal-card-bottom"><small>Working from</small><strong>Pune, India</strong></div>
            <div className="data-pulse"><i /><i /><i /><i /><i /></div>
          </div>
        </Reveal>
      </div>
      <div className="scroll-prompt"><span>Scroll to follow the signal</span><i /></div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about"><div className="container">
      <Reveal><SectionHeading number="01" eyebrow="The short version" title="A data-first engineer who can take the work all the way to the user." /></Reveal>
      <div className="about-layout">
        <Reveal><p className="statement">The part of engineering I enjoy most is the journey from <mark>messy input</mark> to a useful decision. That is why I’m moving toward data engineering and data science - while keeping the product, API, and database skills needed to ship complete systems.</p></Reveal>
        <Reveal className="fact-grid">
          <div className="fact-card"><span>01</span><strong>Data flows</strong><p>ETL, modelling, quality, and performance.</p></div>
          <div className="fact-card"><span>02</span><strong>Decision tools</strong><p>Analytics, dashboards, and applied ML.</p></div>
          <div className="fact-card"><span>03</span><strong>Complete systems</strong><p>APIs, databases, interfaces, and deployment.</p></div>
        </Reveal>
      </div>
    </div></section>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return <div className="project-visual"><img src={asset(project.image)} alt="" /><div className="visual-overlay" /><div className="visual-readout"><span className="readout-label">Project signal</span><span className="readout-bars"><i /><i /><i /><i /><i /></span></div></div>;
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={'featured-project tone-' + project.tone}>
      <ProjectVisual project={project} />
      <div className="project-content">
        <div className="project-topline"><span>0{index + 1}</span><span>{project.label}</span></div>
        <h3>{project.title}</h3><p className="project-pitch">{project.description}</p><p className="project-detail">{project.detail}</p><p className="project-metric">{project.metric}</p>
        <div className="project-bottom">
          <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="project-links"><a href={project.github} target="_blank" rel="noreferrer">Code <Icon name="github" size={15} /></a>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live <span>↗</span></a>}</div>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects"><div className="container">
      <Reveal><SectionHeading number="02" eyebrow="Selected body of work" title="Three projects that show how I think." copy="Each one starts with real input, builds a reliable pathway, and ends in something a person can use." technical /></Reveal>
      <div className="featured-projects">{featuredProjects.map((project, index) => <div key={project.title}><Reveal><FeaturedProjectCard project={project} index={index} /></Reveal></div>)}</div>
      <Reveal className="side-quests">
        <div className="side-quest-heading"><div><p className="eyebrow">Side Quests</p><h3>Experiments, civic ideas, and systems I explored along the way.</h3></div><a href={site.github} target="_blank" rel="noreferrer">All work on GitHub <Icon name="arrow" size={16} /></a></div>
        <div className="side-quest-grid">{sideQuests.map((project) => <article className="side-quest" key={project.title}><img src={asset(project.image)} alt="" /><div><p>{project.label}</p><h4>{project.title}</h4><span>{project.metric}</span></div><a href={project.github} target="_blank" rel="noreferrer" aria-label={'View ' + project.title + ' on GitHub'}><Icon name="arrow" /></a></article>)}</div>
      </Reveal>
    </div></section>
  );
}

type CapabilityKey = keyof typeof capabilityModes;
function Capabilities() {
  const [activeMode, setActiveMode] = useState<CapabilityKey>('pipeline');
  const active = capabilityModes[activeMode];
  const steps = ['Raw input', 'Model & validate', 'Analyze', 'Deliver'];
  return (
    <section className="section capabilities-section" id="capabilities"><div className="container">
      <Reveal><SectionHeading number="03" eyebrow="Click to explore" title="Three modes. One connected way of working." copy="The strongest data work is not isolated from the product. Select a mode to see the tools and perspective I bring to it." /></Reveal>
      <Reveal><div className="capability-console">
        <div className="mode-selector" role="tablist" aria-label="Capabilities">{(Object.keys(capabilityModes) as CapabilityKey[]).map((key, index) => <button key={key} role="tab" aria-selected={activeMode === key} className={activeMode === key ? 'is-active' : ''} onClick={() => setActiveMode(key)}><span>0{index + 1}</span>{key === 'pipeline' ? 'Build the pipeline' : key === 'insight' ? 'Find the insight' : 'Ship the system'}</button>)}</div>
        <div className="mode-display">
          <div className="mode-copy"><p className="eyebrow">{active.eyebrow}</p><h3>{active.title}</h3><p>{active.copy}</p><div className="skill-chips">{active.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
          <div className={'flow-diagram mode-' + activeMode} aria-label="Data workflow illustration">{steps.map((step, index) => <div key={step} className="flow-step"><span>{index + 1}</span><strong>{step}</strong></div>)}<div className="flow-line" /></div>
        </div>
      </div></Reveal>
    </div></section>
  );
}

function Journey() {
  return (
    <section className="section journey-section" id="journey"><div className="container">
      <Reveal><SectionHeading number="04" eyebrow="Experience & milestones" title="A chronological record of building, researching, and shipping." copy="The original timeline is back - now connecting professional experience with the research and milestones that shaped it." technical /></Reveal>
      <div className="experience-timeline">
        <span className="timeline-spine" aria-hidden="true" />
        {timeline.map((item, index) => <div key={item.title + item.period}><Reveal className={'timeline-row ' + (index % 2 ? 'timeline-right' : 'timeline-left')}>
          <article className="timeline-card"><p className="timeline-period">{item.period}</p><span className="timeline-type">{item.type}</span><h3>{item.title}</h3><p className="timeline-organization">{item.organization}</p><p>{item.copy}</p>{item.href && <a href={resourceHref(item.href)} target="_blank" rel="noreferrer">View reference <Icon name="arrow" size={15} /></a>}</article>
          <span className="timeline-node" aria-hidden="true" />
        </Reveal></div>)}
      </div>
    </div></section>
  );
}

function Recognition() {
  return <section className="section recognition-section" id="recognition"><div className="container">
    <Reveal><SectionHeading number="05" eyebrow="Selected recognition" title="Research, invention, and proof beyond the project grid." copy="These milestones are part of how I approach practical technology: explore carefully, build with intent, and document work that can stand up to review." technical /></Reveal>
    <div className="recognition-layout">
      <Reveal className="patent-card"><div><p className="eyebrow">{recognition.patent.label}</p><span className="recognition-mark">01</span></div><h3>{recognition.patent.title}</h3><p>{recognition.patent.copy}</p><footer><span>{recognition.patent.detail}</span><a href={recognition.patent.href} target="_blank" rel="noreferrer">View patent <Icon name="arrow" size={16} /></a></footer></Reveal>
      <Reveal className="publication-panel"><p className="eyebrow">Research publications</p>{recognition.publications.map((publication, index) => <a className="publication-link" href={publication.href} target="_blank" rel="noreferrer" key={publication.href}><span>0{index + 1}</span><div><h3>{publication.title}</h3><p>{publication.source}</p></div><Icon name="arrow" size={18} /></a>)}<div className="achievement-strip">{recognition.achievements.map((achievement) => <span key={achievement}>{achievement}</span>)}</div></Reveal>
    </div>
    <Reveal className="certificate-row"><div><p className="eyebrow">Certificates & achievements</p><h3>Evidence of continued learning.</h3></div><div className="certificate-list">{recognition.certificates.map((certificate) => <a href={resourceHref(certificate.href)} target="_blank" rel="noreferrer" key={certificate.title}><span>{certificate.issuer}</span><strong>{certificate.title}</strong><Icon name="arrow" size={15} /></a>)}</div></Reveal>
  </div></section>;
}

function inlineMarkdown(text: string): ReactNode[] {
  const pattern = /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\x60([^\x60]+)\x60/g;
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index! > cursor) parts.push(text.slice(cursor, match.index));
    if (match[1]) parts.push(<img key={'image-' + match.index} src={match[2]} alt={match[1]} />);
    else if (match[3]) parts.push(<a key={'link-' + match.index} href={match[4]} target="_blank" rel="noreferrer">{match[3]}</a>);
    else if (match[5]) parts.push(<strong key={'strong-' + match.index}>{match[5]}</strong>);
    else if (match[6]) parts.push(<code key={'code-' + match.index}>{match[6]}</code>);
    cursor = match.index! + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function MarkdownContent({ body }: { body: string }) {
  const nodes: ReactNode[] = [];
  const lines = body.split(/\r?\n/);
  let paragraph: string[] = [];
  let list: string[] = [];
  const flushParagraph = () => { if (paragraph.length) { nodes.push(<p key={'p-' + nodes.length}>{inlineMarkdown(paragraph.join(' '))}</p>); paragraph = []; } };
  const flushList = () => { if (list.length) { nodes.push(<ul key={'l-' + nodes.length}>{list.map((item, index) => <li key={index}>{inlineMarkdown(item)}</li>)}</ul>); list = []; } };
  lines.forEach((line) => {
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph(); flushList();
      const content = inlineMarkdown(heading[2]);
      nodes.push(heading[1].length === 1 ? <h1 key={'h-' + nodes.length}>{content}</h1> : heading[1].length === 2 ? <h2 key={'h-' + nodes.length}>{content}</h2> : <h3 key={'h-' + nodes.length}>{content}</h3>);
    } else if (/^-\s+/.test(line)) { flushParagraph(); list.push(line.replace(/^-\s+/, '')); }
    else if (/^>\s?/.test(line)) { flushParagraph(); flushList(); nodes.push(<blockquote key={'q-' + nodes.length}>{inlineMarkdown(line.replace(/^>\s?/, ''))}</blockquote>); }
    else if (!line.trim()) { flushParagraph(); flushList(); }
    else paragraph.push(line.trim());
  });
  flushParagraph(); flushList();
  return <div className="markdown-body">{nodes}</div>;
}

function BlogReader({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return <div className="reader-backdrop" role="presentation" onMouseDown={onClose}><article className="blog-reader" role="dialog" aria-modal="true" aria-label={post.title} onMouseDown={(event) => event.stopPropagation()}><button className="reader-close" onClick={onClose} aria-label="Close post"><Icon name="close" /></button><div className="reader-meta"><span>Beyond Work</span><span>{formatDate(post.date)}</span></div><h1>{post.title}</h1><p className="reader-description">{post.description}</p>{post.cover && <img className="reader-cover" src={asset(post.cover)} alt="" />}<MarkdownContent body={post.body} /></article></div>;
}

function BeyondWork() {
  const posts = useMemo(getPosts, []);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const openPost = (post: BlogPost) => { window.history.replaceState(null, '', '#post-' + post.slug); setSelected(post); };
  const closePost = () => { window.history.replaceState(null, '', '#beyond-work'); setSelected(null); };
  useEffect(() => {
    const slug = window.location.hash.replace('#post-', '');
    if (window.location.hash.startsWith('#post-')) setSelected(posts.find((post) => post.slug === slug) ?? null);
  }, [posts]);
  return (
    <section className="section beyond-section" id="beyond-work"><div className="container">
      <Reveal><SectionHeading number="06" eyebrow="Beyond Work" title="Notes from outside the sprint." copy="A small, growing notebook for experiments, learning, places, and the observations that shape how I work." /></Reveal>
      <Reveal><div className="blog-toolbar"><span><i /> Publishing from this site</span><span>{posts.length} {posts.length === 1 ? 'entry' : 'entries'}</span></div><div className="blog-grid">{posts.map((post, index) => <button className={'blog-card blog-card-' + (index % 3)} key={post.slug} onClick={() => openPost(post)}><div><span>{formatDate(post.date)}</span><span>Read note ↗</span></div><h3>{post.title}</h3><p>{post.description}</p><footer>{post.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</footer></button>)}</div></Reveal>
    </div>{selected && <BlogReader post={selected} onClose={closePost} />}</section>
  );
}

function Contact() {
  return <section className="contact-section" id="contact"><div className="container"><Reveal><div className="contact-panel"><p className="eyebrow">The next data point</p><h2>Let’s build something useful.</h2><p>I’m interested in entry-level data engineering, analytics, and data-science opportunities where strong fundamentals and a systems mindset can contribute from day one.</p><div className="contact-actions"><a className="button button-primary" href={'mailto:' + site.email}>Start a conversation <Icon name="arrow" /></a><a className="contact-link" href={site.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a><a className="contact-link" href={site.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a></div></div></Reveal></div></section>;
}

function Footer() {
  return <footer className="site-footer"><span>© {new Date().getFullYear()} Jay Gautam</span><span>Designed around signals, systems, and curiosity.</span></footer>;
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('jay-theme') as 'light' | 'dark') ?? 'dark');
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('jay-theme', theme); }, [theme]);
  return <div className="app-shell"><TargetCursor targetSelector="button, a" spinDuration={5} hoverDuration={0.16} /><LightRays /><div className="ambient-grid" aria-hidden="true" /><LetterGlitch className="ambient-glitch" text="DATA / SYSTEMS / CURIOUS" /><Navbar theme={theme} onThemeChange={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} /><main><Hero /><About /><Projects /><Capabilities /><Journey /><Recognition /><BeyondWork /><Contact /></main><Footer /></div>;
}
