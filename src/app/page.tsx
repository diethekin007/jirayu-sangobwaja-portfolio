'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight, BookOpen, BriefcaseBusiness, Code2, Download,
  GraduationCap, Layers3, Mail, Phone, Sparkles, UserRound, X,
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

const skills = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML & CSS',
  'Node.js', 'PostgreSQL', 'Supabase', 'Git', 'Figma', 'Vercel',
];

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

function PanelContent({ panel }: { panel: PanelId }) {
  if (panel === 'about') {
    return (
      <div className="about-layout">
        <div className="about-portrait">
          <Image src="/assets/about_me.png" alt="Jirayu Sangobwaja" fill sizes="(max-width: 700px) 80vw, 340px" />
        </div>
        <div className="about-copy">
          <SectionTitle eyebrow="01 / Profile">About me</SectionTitle>
          <p className="panel-lead">I turn ideas into focused, functional digital experiences.</p>
          <p>I&apos;m Jirayu Sangobwaja, a Computer Science student who enjoys front-end development, interaction design and solving product problems with clean code.</p>
          <p>I&apos;m currently expanding into backend development while looking for a Software Engineering Internship where I can build, learn and collaborate with a real team.</p>
          <div className="mini-stats">
            <div><strong>4+</strong><span>Projects built</span></div>
            <div><strong>12+</strong><span>Tools used</span></div>
            <div><strong>100%</strong><span>Ready to learn</span></div>
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
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-image">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 700px) 90vw, 420px" />
              </div>
              <div className="project-copy">
                <span>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p>
                <div className="project-footer">
                  <div className="tag-row">{project.stack.map((item) => <em key={item}>{item}</em>)}</div>
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight /></a>
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
        <p className="panel-lead compact">The technologies I use to move from an idea to a polished product.</p>
        <div className="skill-grid">
          {skills.map((skill, index) => (
            <div className="skill-item" key={skill}>
              <span>{String(index + 1).padStart(2, '0')}</span><strong>{skill}</strong><Sparkles size={16} />
            </div>
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
        <p className="panel-lead">Have an opportunity, an idea or just want to talk about building something?</p>
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
  const angleRef = useRef(0);
  const interaction = useRef({ dragging: false, x: 0, moved: false, paused: false });

  useEffect(() => {
    let frame = 0;
    let previous = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animate = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 40) : 0;
      previous = time;
      if (!activePanel && !interaction.current.dragging && !interaction.current.paused && !reducedMotion.matches && !document.hidden) {
        angleRef.current += elapsed * 0.00015;
      }
      const stage = stageRef.current;
      if (stage) {
        const radius = Math.min(stage.clientWidth * 0.41, 310);
        stage.querySelectorAll<HTMLElement>('.orbit-item').forEach((item, index) => {
          const angle = angleRef.current + index * Math.PI / 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius * 0.68;
          const y = -Math.sin(angle) * radius * 0.3;
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
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActivePanel(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activePanel]);

  return (
    <main className={`orbit-page ${introDone ? 'is-ready' : ''}`}>
      <div className="space-field" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="nebula nebula-purple" aria-hidden="true" />
      <div className="nebula nebula-blue" aria-hidden="true" />
      <div className="galaxy-dust" aria-hidden="true" />
      <header className="orbit-header">
        <a className="brand" href="#home" aria-label="Jirayu home">JIRAYU<span>.</span>S</a>
        <div className="availability"><i /> Open for internship</div>
      </header>

      <section className="orbit-hero" id="home">
        <div className="hero-kicker"><span>CS Student</span><i /><span>Front-end developer</span></div>
        <p className="hero-index">Portfolio / 2026</p>
        <div className="orbit-stage" ref={stageRef}
          onPointerDown={(event) => {
            interaction.current.dragging = true;
            interaction.current.moved = false;
            interaction.current.x = event.clientX;
          }}
          onPointerMove={(event) => {
            if (!interaction.current.dragging) return;
            const distance = event.clientX - interaction.current.x;
            if (Math.abs(distance) > 2) interaction.current.moved = true;
            angleRef.current += distance * 0.009;
            interaction.current.x = event.clientX;
          }}
          onPointerUp={() => { interaction.current.dragging = false; }}
          onPointerCancel={() => { interaction.current.dragging = false; }}
          onPointerLeave={() => { interaction.current.dragging = false; interaction.current.paused = false; }}>
          <div className="orbit-halo halo-one" aria-hidden="true" />
          <div className="orbit-halo halo-two" aria-hidden="true" />
          <div className="orbit-halo halo-three" aria-hidden="true" />
          <div className="orbit-core" aria-hidden="true" />
          <div className="hero-name" aria-hidden="true"><span>JIRAYU</span><span>SANGOBWAJA</span></div>
          <div className="hero-portrait">
            <Image src="/assets/hero_portrait_v2.png" alt="Jirayu Sangobwaja" fill priority sizes="(max-width: 700px) 84vw, 520px" />
          </div>
          <div className="orbit-menu" aria-label="Portfolio sections">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button className="orbit-item" key={item.id}
                  onPointerEnter={() => { interaction.current.paused = true; }}
                  onPointerLeave={() => { interaction.current.paused = false; }}
                  onFocus={() => { interaction.current.paused = true; }}
                  onBlur={() => { interaction.current.paused = false; }}
                  onClick={() => { if (!interaction.current.moved) setActivePanel(item.id); }}>
                  <span className="orbit-icon"><Icon /></span>
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
        <div className="panel-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePanel(null); }}>
          <section className="content-panel" role="dialog" aria-modal="true" aria-label={`${activePanel} information`}>
            <div className="panel-glow" aria-hidden="true" />
            <button className="panel-close" onClick={() => setActivePanel(null)} aria-label="Close panel"><X /></button>
            <div className="panel-scroll"><PanelContent panel={activePanel} /></div>
            <nav className="panel-nav" aria-label="Switch section">
              {navItems.map((item) => {
                const Icon = item.icon;
                return <button className={activePanel === item.id ? 'active' : ''} key={item.id} onClick={() => setActivePanel(item.id)} aria-label={item.label}><Icon /></button>;
              })}
            </nav>
          </section>
        </div>
      )}
    </main>
  );
}
