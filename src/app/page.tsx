'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import Image from 'next/image';
import CosmicScene from './cosmic-scene';
import {
  ArrowUpRight, BookOpen, BriefcaseBusiness, Code2, Download,
  GraduationCap, Layers3, Mail, Phone, UserRound, X, ChevronLeft, ChevronRight, Copy, Check,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';

type PanelId = 'about' | 'projects' | 'skills' | 'education' | 'contact' | 'resume';

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  href: string;
  stack: string[];
};

const projects: Project[] = [
  {
    title: 'TodoList JR',
    category: 'Full-stack web application',
    description: 'Task management platform with authentication, CRUD workflows, filters and an analytics dashboard.',
    image: '/assets/project_todolist.png',
    gallery: ['/assets/project_todolist.png', '/assets/todolist_2.png', '/assets/todolist_3.png'],
    href: 'https://todo-list-jr-tw2h.vercel.app/backoffice/signup',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'UI/UX Figma Designs',
    category: 'Product design & prototyping',
    description: 'Mobile product concepts focused on clear user flows, modern visual systems and high-fidelity prototypes.',
    image: '/assets/figma1.png',
    gallery: ['/assets/figma1.png', '/assets/figma2.png', '/assets/figma3.png', '/assets/figma4.png'],
    href: 'https://www.figma.com/proto/YDvHALgAEykY68gp7LgpNO/Untitled?node-id=0-1&t=vgn5AZoROApoO0Ya-1',
    stack: ['Figma', 'Wireframes', 'Prototype', 'UI/UX'],
  },
  {
    title: 'Cafe Website',
    category: 'Responsive website',
    description: 'A warm, responsive cafe experience with clear menu navigation and a polished visual identity.',
    image: '/assets/cafe1.png',
    gallery: ['/assets/cafe1.png', '/assets/cafe2.png', '/assets/cafe3.png', '/assets/cafe4.png'],
    href: 'https://jirayu009-website.vercel.app/',
    stack: ['HTML', 'Sass', 'JavaScript', 'Vercel'],
  },
  {
    title: 'Orbit Portfolio',
    category: 'Interactive portfolio',
    description: 'A cinematic portfolio experience that turns personal information into an explorable interface.',
    image: '/assets/orbit-portfolio-home.png',
    gallery: ['/assets/orbit-portfolio-home.png', '/assets/orbit-portfolio-about.png', '/assets/orbit-portfolio-resume.png'],
    href: 'https://jirayu-sangobwaja.vercel.app/',
    stack: ['Next.js', 'React', 'TypeScript', 'CSS'],
  },
];

const skillGroups = [
  { title: 'Interface development', detail: 'My main focus', tools: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML & CSS'] },
  { title: 'Backend & data', detail: 'What I’m learning next', tools: ['Node.js', 'PostgreSQL', 'Supabase'] },
  { title: 'Design & delivery', detail: 'From prototype to deployment', tools: ['Figma', 'Git', 'Vercel'] },
];

// Phosphor Light SVGs, self-hosted with their MIT license.
function OrbitMark({ section }: { section: PanelId }) {
  const icons: Record<PanelId, string> = { about: 'user-circle', projects: 'browsers', skills: 'code', education: 'book-open', contact: 'envelope-simple', resume: 'file-arrow-down' };
  return <span className="section-glyph" aria-hidden="true" style={{ '--glyph': `url(/assets/icons/${icons[section]}.svg)` } as CSSProperties} />;
}

const navItems: Array<{ id: PanelId; label: string; eyebrow: string; icon: typeof UserRound; angle: number }> = [
  { id: 'about', label: 'About me', eyebrow: 'Profile', icon: UserRound, angle: -90 },
  { id: 'projects', label: 'Projects', eyebrow: 'Selected work', icon: BriefcaseBusiness, angle: -30 },
  { id: 'skills', label: 'Skills', eyebrow: 'Toolbox', icon: Code2, angle: 30 },
  { id: 'education', label: 'Education', eyebrow: 'Journey', icon: GraduationCap, angle: 90 },
  { id: 'contact', label: 'Contact', eyebrow: 'Say hello', icon: Mail, angle: 150 },
  { id: 'resume', label: 'Resume', eyebrow: 'Download CV', icon: Download, angle: 210 },
];

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return <div className="panel-title"><span>{eyebrow}</span><h2>{children}</h2></div>;
}

function ProjectGallery() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const project = projects[projectIndex];
  const step = (direction: number) => setImageIndex(index => (index + direction + project.gallery.length) % project.gallery.length);
  return <div className="project-observatory">
    <SectionTitle eyebrow="Selected work">Projects</SectionTitle>
    <div className="project-selector" aria-label="Choose project">{projects.map((item, index) => <button key={item.title} aria-pressed={index === projectIndex} onClick={() => { setProjectIndex(index); setImageIndex(0); }}>{item.title}</button>)}</div>
    <div className="project-exhibit">
      <div className="exhibit-gallery">
        <div className="exhibit-image" onTouchStart={event => { touchX.current = event.touches[0].clientX; }} onTouchEnd={event => { if(touchX.current !== null) { const distance = event.changedTouches[0].clientX - touchX.current; if(Math.abs(distance) > 40) step(distance < 0 ? 1 : -1); } touchX.current = null; }}>
          <Image key={project.gallery[imageIndex]} src={project.gallery[imageIndex]} alt={`${project.title}, screenshot ${imageIndex + 1}`} fill sizes="(max-width: 700px) 90vw, 650px" />
          <div className="gallery-controls"><button aria-label="Previous image" onClick={() => step(-1)}><ChevronLeft /></button><span aria-live="polite">{imageIndex + 1} / {project.gallery.length}</span><button aria-label="Next image" onClick={() => step(1)}><ChevronRight /></button></div>
        </div>
        <div className="gallery-thumbnails">{project.gallery.map((src, index) => <button key={src} aria-label={`Show screenshot ${index + 1}`} aria-pressed={index === imageIndex} onClick={() => setImageIndex(index)}><Image src={src} alt="" fill sizes="80px" /></button>)}</div>
      </div>
      <div className="exhibit-copy" key={project.title}><span>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><h4>Built with</h4><div className="tag-row">{project.stack.map(tool => <em key={tool}>{tool}</em>)}</div><a className="cosmic-action" href={project.href} target="_blank" rel="noreferrer">{projectIndex === 1 ? 'Open prototype' : 'Visit website'} <ArrowUpRight size={17} /></a></div>
    </div>
  </div>;
}

function ContactPanel() {
  const [status, setStatus] = useState('');
  const copy = async () => {
    try { await navigator.clipboard.writeText('diethekin007@gmail.com'); setStatus('Email copied'); }
    catch { setStatus('Copy unavailable. Select the email or use the email link.'); }
  };
  return <div className="contact-panel">
    <SectionTitle eyebrow="Say hello">Let’s connect.</SectionTitle>
    <p className="panel-lead">Looking for a software engineering intern? I’d like to hear from you.</p>
    <div className="email-feature"><Mail /><a href="mailto:diethekin007@gmail.com">diethekin007@gmail.com</a><button onClick={copy} aria-label="Copy email address">{status === 'Email copied' ? <Check /> : <Copy />}</button></div>
    <p className="copy-status" role="status">{status}</p>
    <div className="contact-links"><a href="tel:+66623198944"><Phone /><span><small>Phone</small>062-319-8944</span><ArrowUpRight /></a><a href="https://github.com/diethekin007" target="_blank" rel="noreferrer"><SiGithub /><span><small>GitHub</small>@diethekin007</span><ArrowUpRight /></a></div>
  </div>;
}

function PanelContent({ panel }: { panel: PanelId }) {
  if (panel === 'about') {
    return (
      <div className="about-layout">
        <div className="about-portrait">
          <svg className="portrait-chart" viewBox="0 0 400 500" fill="none" aria-hidden="true"><path d="M200 15v25 M200 460v25 M15 250h25 M360 250h25" /><ellipse cx="200" cy="250" rx="165" ry="215" /><ellipse cx="200" cy="250" rx="145" ry="195" strokeDasharray="1 12" /><path d="m200 26 7 15-7 15-7-15Z M54 250l10-7 10 7-10 7Z M326 250l10-7 10 7-10 7Z" /><path d="M85 88 315 412 M315 88 85 412" strokeDasharray="2 18" /></svg>
          <Image src="/assets/about_me.png" alt="Jirayu Sangobwaja" fill sizes="(max-width: 700px) 80vw, 340px" />
          <span className="portrait-caption">Jirayu Sangobwaja · Computer Science</span>
        </div>
        <div className="about-copy">
          <SectionTitle eyebrow="Meet the person">About me</SectionTitle>
          <h3 className="profile-name">Jirayu<br /><em>Sangobwaja.</em></h3>
          <p className="panel-lead">Computer Science student.<br />Front-end developer in progress.</p>
          <p>I&apos;m Jirayu Sangobwaja, a Computer Science student who enjoys front-end development, interaction design and solving product problems with clean code.</p>
          <p>I&apos;m currently expanding into backend development while looking for a Software Engineering Internship where I can build, learn and collaborate with a real team.</p>
          <div className="mini-stats">
            <div><strong>04</strong><span>Selected projects</span></div>
            <div><strong>React</strong><span>Main focus</span></div>
            <div><strong>Open</strong><span>To internships</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (panel === 'projects') {
    return <ProjectGallery />;
  }

  if (panel === 'skills') {
    return (
      <div>
        <SectionTitle eyebrow="My toolkit">Skills & tools</SectionTitle>
        <p className="panel-lead compact">What I build with, and what I’m learning.</p>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <section className="skill-group" key={group.title}>
              <span className="group-index"><i aria-hidden="true" />{group.detail}</span>
              <h3>{group.title}</h3>
              <ul>{group.tools.map(tool => <li key={tool}><span aria-hidden="true">✧</span>{tool}</li>)}</ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (panel === 'education') {
    return (
      <div>
        <SectionTitle eyebrow="The journey so far">Education</SectionTitle>
        <div className="timeline">
          <article>
            <span>2023 — Present</span>
            <h3>Rajamangala University of Technology Suvarnabhumi</h3>
            <h4>Bachelor&apos;s degree · Computer Science</h4>
            <p>Studying software development, web technologies and programming fundamentals through hands-on projects.</p>
          </article>
          <article>
            <span>2020 — 2023</span>
            <h3>Ayutthaya Technological Commercial College</h3>
            <h4>Vocational Certificate · Information Technology</h4>
            <p>Built a foundation in computer systems, programming and business software applications.</p>
          </article>
        </div>
      </div>
    );
  }

  if (panel === 'contact') {
    return <ContactPanel />;
  }

  return (
    <div className="resume-panel">
      <SectionTitle eyebrow="Take a closer look">Resume</SectionTitle>
      <div className="resume-preview"><iframe src="/RESUME_JIRAYU.pdf#page=1&toolbar=0&navpanes=0" title="Jirayu resume preview" /><p>Preview unavailable? <a href="/RESUME_JIRAYU.pdf" target="_blank" rel="noreferrer">Open the PDF</a></p></div>
      <div className="resume-card">
        <div className="resume-icon"><BookOpen /></div>
        <div><span>Curriculum Vitae · PDF</span><h3>Jirayu Sangobwaja</h3><p>Education, technical skills, selected projects and contact information in one document.</p></div>
        <a href="/RESUME_JIRAYU.pdf" target="_blank" rel="noreferrer"><Download /> Download CV</a>
      </div>
    </div>
  );
}

export default function Home() {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const angleRef = useRef(0);
  const targetAngle = useRef(0);
  const interaction = useRef({ dragging: false, x: 0, startX: 0, time: 0, velocity: 0, moved: false, paused: false });
  const closePanel = () => {
    if (closeTimer.current) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setActivePanel(null); setClosing(false); closeTimer.current = null;
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 260);
  };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useEffect(() => {
    if (activePanel) return;
    let frame = 0;
    let previous = 0;
    const stage = stageRef.current;
    const items = stage ? Array.from(stage.querySelectorAll<HTMLElement>('.orbit-item')) : [];
    let radius = Math.min((stage?.clientWidth ?? 0) * 0.43, 320);
    const observer = new ResizeObserver(() => { radius = Math.min((stage?.clientWidth ?? 0) * 0.43, 320); });
    if (stage) observer.observe(stage);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animate = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 40) : 0;
      previous = time;
      if (!activePanel && !interaction.current.dragging && !interaction.current.paused && !reducedMotion.matches && !document.hidden) {
        targetAngle.current += elapsed * (0.00015 + interaction.current.velocity);
        interaction.current.velocity *= Math.exp(-elapsed / 280);
      }
      angleRef.current += (targetAngle.current - angleRef.current) * (1 - Math.exp(-elapsed / 65));
      if (stage) {
        items.forEach((item, index) => {
          const angle = angleRef.current + index * Math.PI / 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius * 0.55;
          const y = Math.sin(angle) * radius * 0.58 - Math.cos(angle) * radius * 0.22;
          item.style.transform = 'translate(-50%, -50%) translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
          item.style.opacity = String(0.64 + (Math.sin(angle) + 1) * 0.18);
        });
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [activePanel]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activePanel ? 'hidden' : '';
    const dialog = dialogRef.current;
    if (activePanel && dialog && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement;
      const source = returnFocus.current?.getBoundingClientRect();
      dialog.showModal();
      const panel = dialog.querySelector<HTMLElement>('.content-panel');
      if (panel && source) {
        const box = panel.getBoundingClientRect();
        panel.style.setProperty('--open-x', `${source.left + source.width / 2 - box.left}px`);
        panel.style.setProperty('--open-y', `${source.top + source.height / 2 - box.top}px`);
      }
    }
    if (!activePanel) returnFocus.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePanel]);

  return (
    <main className={`orbit-page ${introDone ? 'is-ready' : ''} ${activePanel ? 'panel-open' : ''}`}>
      <CosmicScene paused={Boolean(activePanel)} />
      <div className="nebula nebula-purple" aria-hidden="true" />
      <div className="nebula nebula-blue" aria-hidden="true" />
      <div className="galaxy-dust" aria-hidden="true" />
      <header className="orbit-header">
        <a className="brand" href="#home" aria-label="Jirayu home">JIRAYU<span>.</span>S</a>
        <div className="availability"><i /> Open for internship</div>
      </header>

      <section className="orbit-hero" id="home">
        <div className="identity-block">
          <span className="identity-eyebrow">Jirayu / Personal portfolio</span>
          <h1 className="animated-name" aria-label="Jirayu Sangobwaja"
            onPointerMove={(event) => {
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
              const box = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty('--name-x', `${(event.clientX - box.left - box.width / 2) * .018}px`);
              event.currentTarget.style.setProperty('--name-y', `${(event.clientY - box.top - box.height / 2) * .025}px`);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty('--name-x', '0px');
              event.currentTarget.style.setProperty('--name-y', '0px');
            }}>
            {['Jirayu', 'Sangobwaja.'].map((word, line) => <span className="name-line" aria-hidden="true" key={word}>
              {Array.from(word).map((letter, index) => <span className="name-letter" key={index} style={{ '--letter-delay': `${(index + line * 6) * 45}ms` } as CSSProperties}>{letter}</span>)}
            </span>)}
          </h1>
          <p>Computer Science student.<br />Building interfaces with React & Next.js.</p>
          <button onClick={() => setActivePanel('about')}>Meet the person <ArrowUpRight size={15} /></button>
        </div>
        <div className="hero-kicker"><span>CS Student</span><i /><span>Front-end developer</span></div>
        <p className="hero-index">Portfolio / 2026</p>
        <div className="orbit-stage" ref={stageRef}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return;
            interaction.current.dragging = true;
            interaction.current.moved = false;
            interaction.current.x = event.clientX;
            interaction.current.startX = event.clientX;
            interaction.current.time = event.timeStamp;
            interaction.current.velocity = 0;
          }}
          onPointerMove={(event) => {
            if (!interaction.current.dragging) return;
            const distance = event.clientX - interaction.current.x;
            if (Math.abs(event.clientX - interaction.current.startX) > 5) {
              interaction.current.moved = true;
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            const delta = distance * 0.005;
            targetAngle.current += delta;
            const elapsed = Math.max(8, event.timeStamp - interaction.current.time);
            interaction.current.velocity = interaction.current.velocity * .5 + Math.max(-.003, Math.min(.003, delta / elapsed)) * .5;
            interaction.current.x = event.clientX;
            interaction.current.time = event.timeStamp;
          }}
          onPointerUp={(event) => {
            interaction.current.dragging = false;
            interaction.current.paused = false;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => { interaction.current.dragging = false; interaction.current.velocity = 0; }}
          onLostPointerCapture={() => { interaction.current.dragging = false; }}
          onPointerLeave={() => { interaction.current.paused = false; }}
          onDragStart={(event) => event.preventDefault()}>
          <div className="orbit-halo halo-one" aria-hidden="true" />
          <div className="orbit-halo halo-two" aria-hidden="true" />
          <div className="orbit-halo halo-three" aria-hidden="true" />
          <div className="orbit-core" aria-hidden="true" />
          <div className="stellar-aura" aria-hidden="true" />
          <div className="stellar-ribbon ribbon-one" aria-hidden="true" />
          <div className="stellar-ribbon ribbon-two" aria-hidden="true" />
          <div className="hero-portrait">
            <Image src="/assets/hero_portrait_v2.png" alt="Jirayu Sangobwaja" draggable={false} fill priority sizes="(max-width: 700px) 84vw, 520px" />
          </div>
          <div className="orbit-menu" aria-label="Portfolio sections">
            {navItems.map((item) => {
              return (
                <button className="orbit-item" key={item.id}
                  onPointerEnter={() => { interaction.current.paused = true; }}
                  onPointerLeave={() => { interaction.current.paused = false; }}
                  onFocus={() => { interaction.current.paused = true; }}
                  onBlur={() => { interaction.current.paused = false; }}
                  onClick={() => { if (!interaction.current.moved) setActivePanel(item.id); }}>
                  <span className="orbit-icon"><OrbitMark section={item.id} /><span className="orbit-number">{String(navItems.indexOf(item) + 1).padStart(2, '0')}</span></span>
                  <span className="orbit-label"><small>{item.eyebrow}</small>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="hero-footer">
          <p>I build clear, thoughtful web experiences with code and design.</p>
          <button onClick={() => setActivePanel('projects')}><Layers3 /> Explore selected work</button>
          <span>Drag to rotate · Select to explore</span>
        </div>
      </section>

      {activePanel && (
        <dialog ref={dialogRef} className={`panel-backdrop ${closing ? 'is-closing' : ''}`} aria-label={`${activePanel} information`} onCancel={(event) => { event.preventDefault(); closePanel(); }} onClick={(event) => { if (event.target === event.currentTarget) closePanel(); }}>
          <section className={`content-panel panel-${activePanel}`}>
            <div className="panel-atmosphere" aria-hidden="true"><i /><i /><i /></div>
            <div className="panel-masthead"><span>JIRAYU<span className="masthead-star"> / </span>PERSONAL ARCHIVE</span><span>{navItems.find(item => item.id === activePanel)?.eyebrow}</span></div>
            <button className="panel-close" onClick={closePanel} aria-label="Close panel"><X /></button>
            <div className="panel-scroll" key={activePanel}><PanelContent panel={activePanel} /></div>
            <nav className="panel-nav" aria-label="Switch section">
              {navItems.map((item) => {
                return <button className={activePanel === item.id ? 'active' : ''} key={item.id} onClick={() => setActivePanel(item.id)} aria-label={item.label} aria-current={activePanel === item.id ? 'page' : undefined}><OrbitMark section={item.id} /><span>{item.label}</span></button>;
              })}
            </nav>
          </section>
        </dialog>
      )}
    </main>
  );
}


