'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight, BookOpen, BriefcaseBusiness, Code2, Download,
  GraduationCap, Layers3, Mail, Phone, UserRound, X,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';

type PanelId = 'about' | 'projects' | 'skills' | 'education' | 'contact' | 'resume';

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  stack: string[];
};

const projects: Project[] = [
  {
    title: 'TodoList JR',
    category: 'Full-stack web application',
    description: 'Task management platform with authentication, CRUD workflows, filters and an analytics dashboard.',
    image: '/assets/project_todolist.png',
    href: 'https://todo-list-jr-tw2h.vercel.app/backoffice/signup',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'UI/UX Figma Designs',
    category: 'Product design & prototyping',
    description: 'Mobile product concepts focused on clear user flows, modern visual systems and high-fidelity prototypes.',
    image: '/assets/figma1.png',
    href: 'https://www.figma.com/proto/YDvHALgAEykY68gp7LgpNO/Untitled?node-id=0-1&t=vgn5AZoROApoO0Ya-1',
    stack: ['Figma', 'Wireframes', 'Prototype', 'UI/UX'],
  },
  {
    title: 'Cafe Website',
    category: 'Responsive website',
    description: 'A warm, responsive cafe experience with clear menu navigation and a polished visual identity.',
    image: '/assets/cafe1.png',
    href: 'https://jirayu009-website.vercel.app/',
    stack: ['HTML', 'Sass', 'JavaScript', 'Vercel'],
  },
  {
    title: 'Orbit Portfolio',
    category: 'Interactive portfolio',
    description: 'A cinematic portfolio experience that turns personal information into an explorable interface.',
    image: '/assets/portfolio-1.png',
    href: 'https://jirayu-sangobwaja.vercel.app/',
    stack: ['Next.js', 'React', 'TypeScript', 'CSS'],
  },
];

const skillGroups = [
  { title: 'Interface development', detail: 'My main focus', tools: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML & CSS'] },
  { title: 'Backend & data', detail: 'What I’m learning next', tools: ['Node.js', 'PostgreSQL', 'Supabase'] },
  { title: 'Design & delivery', detail: 'From prototype to deployment', tools: ['Figma', 'Git', 'Vercel'] },
];

// Six related astronomical marks, drawn on the same 32px grid.
function OrbitMark({ section }: { section: PanelId }) {
  const paths: Record<PanelId, ReactNode> = {
    about: <><circle cx="16" cy="16" r="6" /><ellipse cx="16" cy="16" rx="13" ry="8" transform="rotate(-35 16 16)" /><circle cx="26" cy="9" r="2" fill="currentColor" /></>,
    projects: <><path d="m16 3 12 7v12l-12 7-12-7V10Z M4 10l12 7 12-7 M16 17v12" /><path d="m10 6 12 7" /></>,
    skills: <><path d="m11 8-8 8 8 8 M21 8l8 8-8 8 M19 4l-6 24" /><circle cx="16" cy="16" r="13" strokeDasharray="1 5" /></>,
    education: <><path d="m16 3 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z" /><circle cx="16" cy="16" r="12" strokeDasharray="2 5" /></>,
    contact: <><circle cx="16" cy="16" r="3" /><path d="M10 10a8.5 8.5 0 0 0 0 12 M22 10a8.5 8.5 0 0 1 0 12 M6 6a14 14 0 0 0 0 20 M26 6a14 14 0 0 1 0 20" /></>,
    resume: <><path d="M9 3h10l5 5v21H9Z M19 3v6h5 M13 14h7 M13 19h7 M13 24h4" /><path d="M5 8v17" /></>,
  };
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[section]}</svg>;
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

function GalaxyField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stars: Array<{ x: number; y: number; radius: number; phase: number }> = [];
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: window.innerWidth < 700 ? 180 : 440 }, () => ({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.25 + .2, phase: Math.random() * Math.PI * 2,
      }));
    };
    const draw = (time: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stars.forEach((star, index) => {
        const alpha = .3 + .35 * (1 + Math.sin((motion.matches ? 0 : time * .0005) + star.phase));
        context.fillStyle = index % 3 === 0 ? 'rgba(180,160,255,' + alpha + ')' : 'rgba(232,238,255,' + alpha + ')';
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
        if (star.radius > 1.35) {
          context.fillStyle = 'rgba(210,195,255,.15)';
          context.fillRect(star.x - 5, star.y - .4, 10, .8);
          context.fillRect(star.x - .4, star.y - 5, .8, 10);
        }
      });
      frame = requestAnimationFrame(draw);
    };
    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="galaxy-canvas" aria-hidden="true" />;
}

function PanelContent({ panel }: { panel: PanelId }) {
  if (panel === 'about') {
    return (
      <div className="about-layout">
        <div className="about-portrait">
          <Image src="/assets/about_me.png" alt="Jirayu Sangobwaja" fill sizes="(max-width: 700px) 80vw, 340px" />
        </div>
        <div className="about-copy">
          <SectionTitle eyebrow="01 / Profile">About me</SectionTitle>
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
    return (
      <div>
        <SectionTitle eyebrow="02 / Selected work">Projects</SectionTitle>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-image">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 700px) 90vw, 420px" />
              </div>
              <div className="project-copy">
                <span>{String(index + 1).padStart(2, '0')} / {project.category}</span><h3>{project.title}</h3><p>{project.description}</p>
                <div className="project-footer">
                  <div className="tag-row">{project.stack.map((item) => <em key={item}>{item}</em>)}</div>
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>View project <ArrowUpRight /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (panel === 'skills') {
    return (
      <div>
        <SectionTitle eyebrow="03 / Toolbox">Skills & tools</SectionTitle>
        <p className="panel-lead compact">What I build with, and what I’m learning.</p>
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <section className="skill-group" key={group.title}>
              <span className="group-index">0{index + 1} / {group.detail}</span>
              <h3>{group.title}</h3>
              <ul>{group.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (panel === 'education') {
    return (
      <div>
        <SectionTitle eyebrow="04 / Journey">Education</SectionTitle>
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
    return (
      <div className="contact-panel">
        <SectionTitle eyebrow="05 / Say hello">Let&apos;s connect</SectionTitle>
        <p className="panel-lead">Looking for a software engineering intern? I’d like to hear from you.</p>
        <div className="contact-links">
          <a href="mailto:diethekin007@gmail.com"><Mail /><span><small>Email</small>diethekin007@gmail.com</span><ArrowUpRight /></a>
          <a href="tel:+66623198944"><Phone /><span><small>Phone</small>062-319-8944</span><ArrowUpRight /></a>
          <a href="https://github.com/diethekin007" target="_blank" rel="noreferrer"><SiGithub /><span><small>GitHub</small>@diethekin007</span><ArrowUpRight /></a>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-panel">
      <SectionTitle eyebrow="06 / Resume">My experience</SectionTitle>
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
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const angleRef = useRef(0);
  const targetAngle = useRef(0);
  const interaction = useRef({ dragging: false, x: 0, startX: 0, time: 0, velocity: 0, moved: false, paused: false });

  useEffect(() => {
    let frame = 0;
    let previous = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animate = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 40) : 0;
      previous = time;
      if (!activePanel && !interaction.current.dragging && !interaction.current.paused && !reducedMotion.matches && !document.hidden) {
        targetAngle.current += elapsed * (0.00015 + interaction.current.velocity);
        interaction.current.velocity *= Math.exp(-elapsed / 280);
      }
      angleRef.current += (targetAngle.current - angleRef.current) * (1 - Math.exp(-elapsed / 65));
      const stage = stageRef.current;
      if (stage) {
        const radius = Math.min(stage.clientWidth * 0.43, 320);
        stage.querySelectorAll<HTMLElement>('.orbit-item').forEach((item, index) => {
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
    return () => cancelAnimationFrame(frame);
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
      dialog.showModal();
    }
    if (!activePanel) returnFocus.current?.focus({ preventScroll: true });
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActivePanel(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activePanel]);

  return (
    <main className={`orbit-page ${introDone ? 'is-ready' : ''}`}>
      <GalaxyField />
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
          <h1>Jirayu<br /><em>Sangobwaja.</em></h1>
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
        <dialog ref={dialogRef} className="panel-backdrop" aria-label={`${activePanel} information`} onCancel={() => setActivePanel(null)} onClick={(event) => { if (event.target === event.currentTarget) setActivePanel(null); }}>
          <section className="content-panel">
            <div className="panel-masthead"><span>JS / PERSONAL ARCHIVE</span><span>{navItems.find(item => item.id === activePanel)?.eyebrow}</span></div>
            <button className="panel-close" onClick={() => setActivePanel(null)} aria-label="Close panel"><X /></button>
            <div className="panel-scroll"><PanelContent panel={activePanel} /></div>
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
