'use client';

import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import {
  Quote,
  User,
  Briefcase,
  Smile,
  MousePointerClick,
  LayoutTemplate,
  Box,
  Smartphone,
  Grid2X2,
  Search,
  FileSearch,
  PenTool,
  Monitor,
  CloudUpload,
  Code2,
  Mail,
  Phone,
  MapPin,
  Globe,
  QrCode,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Send,
  Home as HomeIcon,
  GraduationCap,
  BookOpen,
  Download,
  Star,
  Menu
} from 'lucide-react';
import Image from 'next/image';
import {
  SiSupabase,
  SiHtml5,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiGit,
  SiGithub,
  SiPostgresql,
  SiVercel,
  SiFigma,
  SiTailwindcss,
  SiNodedotjs
} from 'react-icons/si';
import { FaJava, FaLinkedin } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

interface TechItem {
  name: string;
  icon: string;
}

interface Project {
  id: string;
  img: string;
  gallery?: string[];
  title: string;
  modalTitle: string;
  desc: string;
  about: string;
  techStack: TechItem[];
  link: string;
}

const projectsData: Project[] = [
  {
    id: 'todolist',
    img: '/assets/project_todolist.png',
    gallery: [
      '/assets/project_todolist.png',
      '/assets/todolist_2.png',
      '/assets/todolist_3.png'
    ],
    title: 'TODOLIST JR',
    modalTitle: 'Todo List',
    desc: 'WEB APPLICATION / BACKOFFICE',
    about: 'An end-to-end task tracking platform featuring robust JWT security, comprehensive CRUD capabilities, and an interactive analytics dashboard powered by Recharts. It offers seamless status-based filtering and a fluid, responsive user experience accented by smooth animations.',
    techStack: [
      { name: 'Next.js', icon: 'N' },
      { name: 'React', icon: '⚛' },
      { name: 'TypeScript', icon: 'TS' },
      { name: 'Tailwind CSS', icon: '〰' },
      { name: 'Node.js', icon: '⬢' },
      { name: 'Express', icon: 'ex' },
      { name: 'Prisma', icon: '▲' },
      { name: 'PostgreSQL', icon: '🐘' }
    ],
    link: 'https://todo-list-jr-tw2h.vercel.app/backoffice/signup'
  },
  {
    id: 'figma-designs',
    img: '/assets/figma1.png',
    gallery: [
      '/assets/figma1.png',
      '/assets/figma2.png',
      '/assets/figma3.png',
      '/assets/figma4.png'
    ],
    title: 'UI/UX FIGMA DESIGNS',
    modalTitle: 'UI/UX Figma Projects',
    desc: 'UI/UX DESIGN & PROTOTYPING',
    about: 'A showcase of intuitive and modern UI/UX design concepts created entirely in Figma. The designs prioritize user-centric layouts, elegant typography, seamless user flows, and high-fidelity prototyping to deliver engaging digital experiences.',
    techStack: [
      { name: 'Figma', icon: '🎨' },
      { name: 'Wireframing', icon: '📐' },
      { name: 'Prototyping', icon: '📱' },
      { name: 'UI/UX', icon: '✨' }
    ],
    link: 'https://www.figma.com/proto/YDvHALgAEykY68gp7LgpNO/Untitled?node-id=0-1&t=vgn5AZoROApoO0Ya-1'
  },
  {
    id: 'cafe-website',
    img: '/assets/cafe1.png',
    gallery: [
      '/assets/cafe1.png',
      '/assets/cafe2.png',
      '/assets/cafe3.png',
      '/assets/cafe4.png'
    ],
    title: 'CAFE WEBSITE',
    modalTitle: 'Cafe Website',
    desc: 'STATIC WEB DEVELOPMENT',
    about: 'A responsive cafe website built with vanilla HTML, CSS (SASS), and JavaScript. Includes Python scripts for content updates and is deployed seamlessly on Vercel.',
    techStack: [
      { name: 'HTML5', icon: '🌐' },
      { name: 'SASS', icon: '🎨' },
      { name: 'JavaScript', icon: 'JS' },
      { name: 'Python', icon: '🐍' },
      { name: 'Vercel', icon: '▲' }
    ],
    link: 'https://jirayu009-website.vercel.app/'
  },
  {
    id: 'portfolio-website',
    img: '/assets/portfolio-1.png',
    gallery: [
      '/assets/portfolio-1.png',
      '/assets/portfolio-2.png',
      '/assets/portfolio-3.png'
    ],
    title: 'PORTFOLIO WEBSITE',
    modalTitle: 'Portfolio Website',
    desc: 'PERSONAL PORTFOLIO / FRONT-END DEVELOPMENT',
    about: 'A responsive personal portfolio website designed to present my profile, education, skills, projects, and resume through a polished dark-themed interface with smooth interactions.',
    techStack: [
      { name: 'Next.js', icon: 'N' },
      { name: 'React', icon: '⚛' },
      { name: 'TypeScript', icon: 'TS' },
      { name: 'Tailwind CSS', icon: '〰' },
      { name: 'Vercel', icon: '▲' }
    ],
    link: 'https://jirayu-sangobwaja.vercel.app/'
  }
];

function ImageCarousel({ images, alt, children }: { images: string[], alt: string, children?: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // เปลี่ยนรูปอัตโนมัติทุกๆ 5 วินาที

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <div
        className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative overflow-hidden bg-[#080808]">
            {/* Blurred Background Layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src={img}
                alt=""
                fill
                className="object-cover blur-[60px] opacity-40 scale-110"
                priority={idx === 0}
              />
            </div>

            {/* Main Sharp Image */}
            <Image
              src={img}
              alt={`${alt} ${idx + 1}`}
              fill
              className="object-contain object-center relative z-10 drop-shadow-2xl"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-[var(--accent-red)] text-white flex items-center justify-center transition-all duration-300 z-20 border border-white/10 opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-[var(--accent-red)] text-white flex items-center justify-center transition-all duration-300 z-20 border border-white/10 opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-[var(--accent-red)] w-4 sm:w-6' : 'bg-white/50 hover:bg-white w-1.5 sm:w-2'}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
      {children}
    </div>
  );
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -50px 0px' });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 2; // Jump by 2-12% for slower counting
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        // Wait at 100% before sliding up (Slower reveal)
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = 'unset';
          document.body.classList.add('is-loaded');
        }, 800);
      }
      setProgress(currentProgress);
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999999] bg-[#080808] flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] ${isLoading ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="text-[var(--text-main)] font-heading text-6xl md:text-8xl font-bold tracking-[10px]">
        {progress}<span className="text-[var(--accent-red)]">%</span>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-4">
        <div className="text-[0.6rem] tracking-[4px] text-[var(--text-muted)] uppercase">
          Loading Experience
        </div>
      </div>

      {/* Loading Progress Bar Line */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-[var(--accent-red)] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const SideNav = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'HOME', icon: HomeIcon, id: 'home' },
    { name: 'PROJECTS', icon: Briefcase, id: 'projects' },
    { name: 'ABOUT ME', icon: User, id: 'about' },
    { name: 'CONTACT', icon: Mail, id: 'contact' }
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6">
      {navItems.map((item, idx) => (
        <div key={idx} className="group relative flex items-center cursor-pointer" onClick={() => scrollTo(item.id)}>
          <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[var(--text-muted)] group-hover:text-white group-hover:bg-[var(--accent-red)] group-hover:border-[var(--accent-red)] transition-all duration-300 shadow-lg">
            <item.icon size={20} />
          </div>

          <div className="absolute left-full ml-4 px-4 py-2 bg-[#1a1a1a] border border-[var(--border-color)] rounded-lg text-[0.75rem] font-semibold tracking-[2px] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap text-white">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'HOME', icon: HomeIcon, id: 'home' },
    { name: 'PROJECTS', icon: Briefcase, id: 'projects' },
    { name: 'ABOUT ME', icon: User, id: 'about' },
    { name: 'CONTACT', icon: Mail, id: 'contact' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'ed174856-a111-4f28-8815-a5cb348212cf',
          ...formData
        })
      });

      if (response.status === 200) {
        setShowPopup(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowPopup(false), 5000); // auto close after 5s
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    // Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      lerp: 0.07, // Control the smoothness (lower = smoother/slower)
      wheelMultiplier: 0.8, // Slightly softer wheel scrolling
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsMobileMenuOpen(false);
      }
    };
    if (selectedProject || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);
  return (
    <>
      <Preloader />
      <div className="noise-overlay"></div>
      <SideNav />

      {/* Sticky Glass Header */}
      <header className="sticky top-0 z-[100] w-full flex justify-between items-center px-6 lg:px-10 py-5 text-[0.8rem] tracking-[2px] uppercase border-b border-white/5 bg-[#080808]/70 backdrop-blur-md text-[var(--text-muted)] transition-all duration-300">
        <div className="font-heading text-lg font-bold text-white tracking-[4px]">JIRAYU<span className="text-[var(--accent-red)]">.</span>S</div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2.5">
            AVAILABLE FOR FREELANCE
            <span className="pulse-dot"></span>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] hover:bg-white/5 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <div className={`fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-lg flex flex-col justify-center px-10 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
        <button
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[#111] text-[var(--text-muted)] hover:text-white hover:bg-[var(--accent-red)] hover:border-[var(--accent-red)] transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-8 max-w-md mx-auto w-full">
          <div className="font-heading text-sm text-[var(--accent-red)] tracking-[4px] mb-2">NAVIGATION</div>
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-6 cursor-pointer"
              onClick={() => scrollTo(item.id)}
            >
              <div className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[var(--text-muted)] group-hover:text-white group-hover:bg-[var(--accent-red)] group-hover:border-[var(--accent-red)] transition-all duration-300 shadow-lg">
                <item.icon size={24} />
              </div>
              <div className="font-heading text-4xl font-bold tracking-[2px] text-[var(--text-muted)] group-hover:text-white transition-colors duration-300">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky top-5 h-0 w-full z-20 pointer-events-none">
        <div className="rotating-badge absolute left-10 top-4 fill-[var(--text-muted)]">
          <svg viewBox="0 0 100 100" width="120" height="120">
            <defs>
              <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fontSize="12">
              <textPath href="#circle">
                BUILDING WEB APPLICATIONS •
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-10">
        {/* Hero Section */}
        <section id="home" className="relative pt-10 scroll-mt-24">
          <h1 className="huge-title text-center -mb-10 relative z-10 text-[var(--text-main)]">PORTFOLIO</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-10 lg:gap-10 mt-5 items-end text-center lg:text-left">

            <div className="flex flex-col items-center lg:items-start">
              <h2 className="font-heading text-4xl mb-5 leading-tight">CS STUDENT</h2>
              <ul className="list-none text-[0.85rem] tracking-[2px] text-[var(--text-muted)] mb-14 space-y-1">
                <li>SOFTWARE DEVELOPMENT</li>
                <li>FRONT-END DEV</li>
                <li>REACT & NEXT.JS</li>
              </ul>

              <div className="border-l-2 border-[var(--accent-red)] pl-5 relative text-left">
                <Quote className="text-[var(--accent-red)] w-6 h-6 mb-2.5" />
                <p className="text-[0.9rem] tracking-[1px] font-medium uppercase mb-4">I BUILD FUNCTIONAL, WELL-DESIGNED WEB APPLICATIONS AND LOVE SOLVING PROBLEMS.</p>
                <div className="font-heading italic text-2xl text-[var(--text-muted)]">Jirayu Sangobwaja</div>
              </div>
            </div>

            <div className="flex justify-center relative z-20">
              <div className="relative w-full max-w-[400px] flex justify-center items-end translate-y-10">
                {/* Breathing Aura */}
                <div className="absolute w-[90%] aspect-square rounded-full top-[10%] left-1/2 -translate-x-1/2 -z-10 blur-[50px] opacity-80 animate-pulse" style={{ animationDuration: '4s' }}>
                  <div className="absolute inset-0 bg-[#7a1010] rounded-full"></div>
                  <div className="absolute inset-8 bg-[#b91c1c] rounded-full opacity-60 blur-[20px]"></div>
                </div>
                <Image src="/assets/hero_portrait_v2.png" alt="Designer Portrait" width={400} height={500} className="w-full h-auto object-cover relative z-10 transition-transform duration-500 origin-bottom hover:scale-[1.03] cursor-pointer portrait-img" />
              </div>
            </div>

            <div className="pb-5 flex flex-col items-center lg:items-start">
              <h2 className="font-heading text-5xl leading-none mb-2.5">JIRAYU<br />SANGOBWAJA</h2>
              <p className="text-[0.9rem] text-[var(--accent-red)] tracking-[2px] font-semibold mb-5">CS STUDENT & DEVELOPER</p>
              <p className="text-[0.9rem] text-[var(--text-muted)] mb-8 max-w-[300px] text-center lg:text-left">I'm a Computer Science student passionate about front-end development. I'm actively looking for a software engineering internship to apply my skills and learn from real teams.</p>

              <a
                href="/RESUME_JIRAYU.pdf"
                target="_blank"
                className="group inline-flex items-center gap-3 bg-transparent border border-[var(--accent-red)] text-[var(--text-main)] hover:bg-[var(--accent-red)] px-8 py-3.5 rounded-full text-[0.8rem] font-bold tracking-[2px] uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(139,26,26,0.3)] mb-10"
              >
                DOWNLOAD CV
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </a>

              <div className="flex gap-7">
                <div className="text-center">
                  <div className="w-10 h-10 border border-[var(--border-color)] rounded-full flex items-center justify-center mx-auto mb-2.5 text-[var(--accent-red)]">
                    <Code2 size={18} />
                  </div>
                  <div className="font-heading text-2xl font-semibold mb-1">5+</div>
                  <div className="text-[0.6rem] tracking-[1px] text-[var(--text-muted)]">TECH<br />STACKS</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 border border-[var(--border-color)] rounded-full flex items-center justify-center mx-auto mb-2.5 text-[var(--accent-red)]">
                    <Briefcase size={18} />
                  </div>
                  <div className="font-heading text-2xl font-semibold mb-1">4+</div>
                  <div className="text-[0.6rem] tracking-[1px] text-[var(--text-muted)]">PROJECTS<br />BUILT</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 border border-[var(--border-color)] rounded-full flex items-center justify-center mx-auto mb-2.5 text-[var(--accent-red)]">
                    <Smile size={18} />
                  </div>
                  <div className="font-heading text-2xl font-semibold mb-1">100%</div>
                  <div className="text-[0.6rem] tracking-[1px] text-[var(--text-muted)]">READY TO<br />LEARN</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hollow & Solid Marquee Banner Breakout */}
        <div className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#050505] py-4 my-24 overflow-hidden flex items-center shadow-[0_0_40px_rgba(0,0,0,0.5)] transform -rotate-2 z-10 border-y border-white/5 hover:scale-[1.02] transition-transform duration-500">
          <div className="flex animate-marquee whitespace-nowrap items-center">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-5 font-heading text-2xl sm:text-3xl font-bold tracking-[4px] uppercase">
                <span className="text-transparent [-webkit-text-stroke:1px_var(--text-muted)] hover:[-webkit-text-stroke:1px_var(--accent-red)] hover:scale-105 transition-all duration-300 cursor-default">OPEN FOR INTERNSHIP</span>
                <Star className="text-[var(--accent-red)] fill-[var(--accent-red)]" size={20} />
                <span className="text-white hover:text-[var(--accent-red)] hover:scale-105 transition-all duration-300 cursor-default">FRONT-END DEVELOPER</span>
                <Star className="text-[var(--accent-red)] fill-[var(--accent-red)]" size={20} />
                <span className="text-transparent [-webkit-text-stroke:1px_var(--text-muted)] hover:[-webkit-text-stroke:1px_var(--accent-red)] hover:scale-105 transition-all duration-300 cursor-default">UI/UX DESIGNER</span>
                <Star className="text-[var(--accent-red)] fill-[var(--accent-red)]" size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* What I Do Section */}
        <section className="flex flex-col lg:flex-row gap-8 lg:gap-[60px]">
          <div className="flex-[0_0_200px] lg:sticky lg:top-32 h-fit">
            <h3 className="font-heading text-3xl font-semibold tracking-[2px] uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--text-muted)]">WHAT I DO</h3>
            <div className="w-12 h-[3px] bg-gradient-to-r from-[var(--accent-red)] to-transparent rounded-full mb-6"></div>
            <p className="text-[0.85rem] text-[var(--text-muted)] tracking-[1px] hidden lg:block leading-relaxed pr-4">Crafting digital experiences with precision, focusing on user-centric design and scalable architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1 relative z-10">
            {/* Subtle background glow for the grid area */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[var(--accent-red)]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            {[
              { icon: MousePointerClick, title: 'UI/UX DESIGN', desc: 'Designing intuitive and engaging user experiences that drive results.', span: 'lg:col-span-2 md:col-span-2' },
              { icon: LayoutTemplate, title: 'WEB DESIGN', desc: 'Building modern, responsive and high-performance websites.', span: 'col-span-1' },
              { icon: Box, title: 'INTERACTION DESIGN', desc: 'Creating meaningful interactions and smooth micro experiences.', span: 'col-span-1' },
              { icon: Smartphone, title: 'PROTOTYPING', desc: 'Turning ideas into clickable prototypes and user flows.', span: 'col-span-1' },
              { icon: Grid2X2, title: 'DESIGN SYSTEMS', desc: 'Building consistent design languages and reusable components.', span: 'col-span-1' }
            ].map((service, idx) => (
              <div key={idx} className={`group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] hover:border-[var(--accent-red)]/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden backdrop-blur-sm shadow-lg ${service.span}`}>
                {/* Hover Inner Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-red)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Top highlight line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-red)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--accent-red)] group-hover:border-[var(--accent-red)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-md">
                    <service.icon className="text-[var(--accent-red)] w-6 h-6 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h4 className="font-heading text-lg sm:text-xl tracking-[1.5px] mb-3 uppercase text-white group-hover:text-[var(--accent-red)] transition-colors duration-300 font-bold">{service.title}</h4>
                </div>
                <p className="text-[0.85rem] text-[var(--text-muted)] leading-relaxed relative z-10 font-light group-hover:text-white/80 transition-colors duration-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-0 border-t border-white/5 my-24 lg:my-32" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          {/* Education Section */}
          <section>
            <h3 className="font-heading text-3xl font-semibold tracking-[2px] uppercase mb-7">EDUCATION</h3>

            <div className="flex flex-col gap-10 mt-10">
              <ScrollReveal delay={0}>
                <div className="relative pl-8 border-l border-white/10 pb-4 group/edu">
                  <div className="absolute top-0 left-[-17px] w-8 h-8 rounded-full bg-[#0a0a0a] border border-[var(--accent-red)] flex items-center justify-center text-[var(--accent-red)] group-hover/edu:shadow-[0_0_15px_rgba(139,26,26,0.5)] transition-all duration-500">
                    <GraduationCap size={16} />
                  </div>
                  <div className="text-[0.75rem] text-[var(--accent-red)] font-semibold tracking-[2px] mb-2 -mt-1">2023 - PRESENT</div>
                  <h4 className="text-[1rem] tracking-[1px] mb-2 font-semibold text-[var(--text-main)] uppercase leading-tight group-hover/edu:text-white transition-colors duration-300">Rajamangala University of Technology Suvarnabhumi (Huntra)</h4>
                  <p className="text-[0.85rem] text-[var(--text-muted)] leading-relaxed max-w-[90%]">
                    Currently pursuing a Bachelor's degree in Computer Science. Focusing on software development, web technologies, and solidifying programming fundamentals through hands-on projects.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="relative pl-8 border-l border-white/10 group/edu">
                  <div className="absolute top-0 left-[-17px] w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-[var(--text-muted)] group-hover/edu:border-[var(--accent-red)] group-hover/edu:text-[var(--accent-red)] group-hover/edu:shadow-[0_0_15px_rgba(139,26,26,0.3)] transition-all duration-500">
                    <BookOpen size={16} />
                  </div>
                  <div className="text-[0.75rem] text-[var(--text-muted)] font-semibold tracking-[2px] mb-2 -mt-1 group-hover/edu:text-white transition-colors">2020 - 2023</div>
                  <h4 className="text-[1rem] tracking-[1px] mb-2 font-semibold text-[var(--text-main)] uppercase leading-tight group-hover/edu:text-white transition-colors duration-300">Ayutthaya Technological Commercial College</h4>
                  <p className="text-[0.85rem] text-[var(--text-muted)] leading-relaxed max-w-[90%]">
                    Vocational Certificate in Information Technology. Built a strong foundation in computer systems, basic programming, and business software applications.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Project Section */}
          <section id="projects" className="pt-10 -mt-10 scroll-mt-24">
            <div className="flex justify-between items-baseline mb-7">
              <h3 className="font-heading text-3xl font-semibold tracking-[2px] uppercase">PROJECT</h3>
              <a href="https://todo-list-jr-tw2h.vercel.app/backoffice/signup" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-red)] no-underline text-[0.9rem] tracking-[1px] transition-colors hover:text-[var(--text-main)]">View live &rarr;</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsData.map((work, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedProject(work)}
                  className="cursor-pointer group block no-underline text-inherit transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] group-hover:border-[var(--accent-red)]/40 transition-all duration-500 shadow-lg backdrop-blur-sm flex flex-col h-full overflow-hidden">
                    {/* Hover Inner Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-red)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Top highlight line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-red)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl mb-5 relative bg-[#111] z-10 group-hover:scale-[1.02] transition-transform duration-500">
                      <ImageCarousel images={work.gallery || [work.img]} alt={work.title} />

                      {/* Hover Overlay Badge */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                        <div className="bg-[var(--accent-red)] text-white text-[0.7rem] font-bold tracking-[2px] px-5 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                          VIEW PROJECT
                        </div>
                      </div>
                    </div>
                    <div className="px-2 pb-2 relative z-10">
                      <h4 className="font-heading text-lg tracking-[1px] mb-2 uppercase text-white group-hover:text-[var(--accent-red)] transition-colors flex items-center gap-2">
                        {work.title}
                        <span className="text-xs text-[var(--accent-red)] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 duration-300">↗</span>
                      </h4>
                      <p className="text-[0.75rem] text-[var(--text-muted)] tracking-[1px] uppercase line-clamp-2">{work.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <hr className="border-0 border-t border-white/5 my-24 lg:my-32" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 pb-20">
          {/* About Me Section */}
          <section id="about" className="pt-10 -mt-10 scroll-mt-24">
            <ScrollReveal>
              <h3 className="font-heading text-3xl font-semibold tracking-[2px] uppercase mb-4 text-[var(--text-main)]">ABOUT ME</h3>
              <div className="w-12 h-[3px] bg-[var(--accent-red)] mb-8 mx-auto lg:mx-0"></div>
            </ScrollReveal>
            <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">
              <div className="flex-1 w-full">
                <ScrollReveal delay={150}>
                  <p className="text-[0.95rem] mb-5 text-[var(--text-muted)] leading-relaxed font-light">Hi, I'm Jirayu Sangobwaja, a Computer Science student who loves turning ideas into functional, well-designed web applications. My focus is on front-end development with React and Next.js, and I'm currently expanding into backend technologies to become a stronger full-stack developer.</p>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <p className="text-[0.95rem] mb-7 text-[var(--text-muted)] leading-relaxed font-light">I'm looking for a Software Engineering Internship where I can apply what I've learned, collaborate with real teams, and keep leveling up my skills.</p>
                </ScrollReveal>
                <ScrollReveal delay={450}>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {['Frontend Development', 'React & Next.js', 'Problem solver', 'Always learning'].map((item, idx) => (
                      <span key={idx} className="bg-[#111] border border-white/5 px-4 py-2 rounded-full text-[0.7rem] tracking-[1px] text-[var(--text-muted)] hover:text-white hover:border-[var(--accent-red)] hover:bg-[var(--accent-red)]/10 hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Tools & Testimonial */}
          <section>
            <h3 className="font-heading text-3xl font-semibold tracking-[2px] uppercase mb-7">TOOLS I USE</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-10 w-full">
              {[
                { name: 'React', icon: <SiReact size={20} color="#61DAFB" /> },
                { name: 'Next.js', icon: <SiNextdotjs size={20} color="#ffffff" /> },
                { name: 'TypeScript', icon: <SiTypescript size={20} color="#3178C6" /> },
                { name: 'Tailwind CSS', icon: <SiTailwindcss size={20} color="#06B6D4" /> },
                { name: 'JavaScript', icon: <SiJavascript size={20} color="#F7DF1E" /> },
                { name: 'HTML5', icon: <SiHtml5 size={20} color="#E34F26" /> },
                { name: 'Node.js', icon: <SiNodedotjs size={20} color="#339933" /> },
                { name: 'Java', icon: <FaJava size={20} color="#007396" /> },
                { name: 'PostgreSQL', icon: <SiPostgresql size={20} color="#4169E1" /> },
                { name: 'Supabase', icon: <SiSupabase size={20} color="#3ECF8E" /> },
                { name: 'Git', icon: <SiGit size={20} color="#F05032" /> },
                { name: 'GitHub', icon: <SiGithub size={20} color="#ffffff" /> },
                { name: 'Vercel', icon: <SiVercel size={20} color="#ffffff" /> },
                { name: 'VS Code', icon: <VscVscode size={20} color="#007ACC" /> },
                { name: 'Figma', icon: <SiFigma size={20} color="#F24E1E" /> }
              ].map((tool, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#0a0a0a] border border-white/5 px-4 py-3 rounded-xl group cursor-pointer hover:border-[var(--accent-red)] hover:bg-[#111] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(139,26,26,0.15)] w-full">
                  <div className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0">{tool.icon}</div>
                  <span className="text-[0.7rem] sm:text-[0.75rem] font-semibold text-[var(--text-muted)] group-hover:text-white transition-colors tracking-[1px] truncate">{tool.name}</span>
                </div>
              ))}
            </div>

            <div className="relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] hover:border-[var(--accent-red)]/40 transition-all duration-500 overflow-hidden max-w-[500px] mx-auto lg:mx-0 group backdrop-blur-sm shadow-lg hover:-translate-y-2">
              {/* Hover Inner Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-red)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Top highlight line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-red)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <Quote className="absolute -top-4 -right-4 text-[var(--accent-red)]/10 w-24 h-24 rotate-180 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
              <p className="text-[0.95rem] italic mb-6 leading-relaxed text-[var(--text-main)] relative z-10 font-light">"Jirayu is an exceptional designer who delivers outstanding work on time and understands the user like no one else."</p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-red)]/20 border border-[var(--accent-red)]/30 flex items-center justify-center text-[var(--accent-red)] font-bold text-sm">
                  C
                </div>
                <div>
                  <div className="text-[0.8rem] font-bold text-white tracking-[1px]">Client Feedback</div>
                  <div className="text-[0.7rem] text-[var(--accent-red)] tracking-[1px] opacity-80">Freelance Project</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Form Section */}
        <section id="contact" className="mb-10 pt-10 -mt-10 scroll-mt-24">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-10 md:p-16 relative overflow-hidden group transition-all duration-500 hover:border-[var(--accent-red)]/30 shadow-2xl">
            {/* Minimalist Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-red)] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Subtle Corner Glow */}
            <div className="absolute -top-32 -right-32 w-[300px] h-[300px] bg-[var(--accent-red)] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 relative z-10">
              <div>
                <h3 className="font-heading text-4xl font-semibold tracking-[2px] uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--accent-red)]">CONTACT</h3>
                <p className="text-[0.9rem] text-[var(--text-muted)] mb-10 max-w-md leading-relaxed">
                  Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5 text-[0.95rem] group/info cursor-default">
                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/5 flex items-center justify-center text-[var(--accent-red)] group-hover/info:bg-[var(--accent-red)] group-hover/info:text-white transition-all duration-300">
                      <Mail size={18} />
                    </div>
                    <span className="tracking-[1px] text-[var(--text-muted)] group-hover/info:text-white transition-colors">diethekin007@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-5 text-[0.95rem] group/info cursor-default">
                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/5 flex items-center justify-center text-[var(--accent-red)] group-hover/info:bg-[var(--accent-red)] group-hover/info:text-white transition-all duration-300">
                      <Phone size={18} />
                    </div>
                    <span className="tracking-[1px] text-[var(--text-muted)] group-hover/info:text-white transition-colors">062-319-8944</span>
                  </div>
                </div>
              </div>

              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 group/input">
                    <label htmlFor="name" className="text-[0.7rem] tracking-[2px] text-[var(--text-muted)] group-focus-within/input:text-white transition-colors uppercase">Name</label>
                    <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-[#1a1a1a] border border-transparent rounded-xl px-5 py-4 text-[0.95rem] text-white focus:outline-none focus:border-[var(--accent-red)] focus:bg-[#222] transition-all placeholder:text-[#555]" placeholder="What's your name?" />
                  </div>
                  <div className="flex flex-col gap-2 group/input">
                    <label htmlFor="email" className="text-[0.7rem] tracking-[2px] text-[var(--text-muted)] group-focus-within/input:text-white transition-colors uppercase">Email</label>
                    <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-[#1a1a1a] border border-transparent rounded-xl px-5 py-4 text-[0.95rem] text-white focus:outline-none focus:border-[var(--accent-red)] focus:bg-[#222] transition-all placeholder:text-[#555]" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 group/input">
                  <label htmlFor="message" className="text-[0.7rem] tracking-[2px] text-[var(--text-muted)] group-focus-within/input:text-white transition-colors uppercase">Message</label>
                  <textarea id="message" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="bg-[#1a1a1a] border border-transparent rounded-xl px-5 py-4 text-[0.95rem] text-white focus:outline-none focus:border-[var(--accent-red)] focus:bg-[#222] transition-all resize-none placeholder:text-[#555]" placeholder="Tell me about your project..."></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="mt-4 self-start flex items-center gap-3 bg-[var(--accent-red)] hover:bg-[#ff4d4d] disabled:opacity-50 disabled:cursor-not-allowed text-white px-9 py-4 rounded-full text-[0.85rem] font-bold tracking-[2px] uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(163,71,71,0.3)]">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send size={18} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Minimalist Footer */}
        <footer className="border-t border-white/5 py-12 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[0.75rem] tracking-[1px] text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} Jirayu Sangobwaja. All rights reserved.
            </div>
            <div className="flex items-center gap-5">
              <a href="https://github.com/diethekin007" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-white transition-colors">
                <SiGithub size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[#0A66C2] transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-black/90 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full h-full sm:h-auto max-w-4xl bg-[#080808] sm:border border-[var(--border-color)] sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-400 text-left flex flex-col sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cinematic Hero Image */}
            <div className="relative w-full h-[30vh] sm:h-[350px] shrink-0">
              <ImageCarousel images={selectedProject.gallery || [selectedProject.img]} alt={selectedProject.title}>
                {/* Overlay Gradient to blend into background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent pointer-events-none"></div>

                {/* Floating Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-[var(--accent-red)] text-white flex items-center justify-center transition-all duration-300 z-30 border border-white/10"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </ImageCarousel>
            </div>

            {/* Content Area */}
            <div className="px-6 sm:px-10 pb-10 pt-4 relative z-10 overflow-y-auto custom-scrollbar flex-1">

              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[var(--border-color)] pb-8">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white uppercase tracking-widest mb-3 drop-shadow-lg">
                    {selectedProject.modalTitle}
                  </h2>
                  <p className="text-[var(--accent-red)] text-xs sm:text-sm tracking-[4px] uppercase font-semibold flex items-center gap-2">
                    <span className="w-8 h-px bg-[var(--accent-red)]"></span>
                    {selectedProject.desc}
                  </p>
                </div>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-[var(--accent-red)] border border-white/10 hover:border-[var(--accent-red)] text-white text-xs tracking-[2px] uppercase transition-all duration-300 no-underline whitespace-nowrap"
                >
                  View Live Site
                  <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>

              {/* Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16">

                {/* About Column */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-xs text-white/40 tracking-[3px] uppercase font-semibold">About the Project</h3>
                  <p className="text-slate-300 leading-relaxed font-light text-[0.95rem]">
                    {selectedProject.about}
                  </p>
                </div>

                {/* Tech Stack Column */}
                <div className="space-y-4">
                  <h3 className="text-xs text-white/40 tracking-[3px] uppercase font-semibold">Technologies</h3>
                  <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                    {selectedProject.techStack.map((tech, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <span className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-md text-[10px] text-[var(--accent-red)] group-hover:bg-[var(--accent-red)] group-hover:text-white group-hover:border-[var(--accent-red)] transition-colors duration-300">
                          {tech.icon}
                        </span>
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                          {tech.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Popup */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${showPopup ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>
        <div className={`bg-[#111] border border-[var(--border-color)] rounded-2xl p-8 md:p-12 max-w-sm w-full text-center relative z-10 shadow-2xl transition-all duration-500 transform ${showPopup ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>
          <div className="w-16 h-16 bg-[var(--accent-red)]/10 text-[var(--accent-red)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={28} />
          </div>
          <h3 className="font-heading text-2xl font-semibold tracking-[2px] mb-3">THANK YOU!</h3>
          <p className="text-[0.9rem] text-[var(--text-muted)] leading-relaxed mb-8">
            Your message has been sent successfully. I will get back to you as soon as possible!
          </p>
          <button
            onClick={() => setShowPopup(false)}
            className="w-full py-3 bg-[var(--accent-red)] hover:bg-[#a52020] text-white rounded-xl text-[0.85rem] font-semibold tracking-[2px] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}
