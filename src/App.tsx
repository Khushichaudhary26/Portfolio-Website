/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight, Github, Code2, Linkedin, Mail, FileText, Download, ArrowUp } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const internships = [
  {
    company: 'CSE Pathshala',
    role: 'C++ Programming: OOPs and DSA',
    period: "Jun' 25 - Jul' 25",
    description: 'Built a C++ Student Academic Tracker using OOP and file handling. Applied DSA concepts to enhance speed and scalability.'
  }
];

const projects = [
  {
    title: 'CollaborateX - A Real-Time Interactive Platform',
    category: 'Real-Time Workplace | WebSockets',
    description: 'A real-time collaborative workspace featuring interactive whiteboards, shared document editing, and instant messaging powered by WebSockets for seamless team coordination.',
    image: 'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?auto=format&fit=crop&q=80&w=1600&h=900',
    color: '#ff4e00',
    link: 'https://grand-faloodeh-99df55.netlify.app/',
    video: 'https://drive.google.com/file/d/1wWAxu4NEghDVm13zUYREnoV1XFC2ZVBa/preview'
  },
  {
    title: 'TaskOps - A Role-Based Task Management System',
    category: 'Task Management | JWT Auth',
    description: 'A robust task management platform with role-based access control, JWT authentication, and automated workflow tracking to streamline organizational productivity.',
    image: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=1600&h=900',
    color: '#0055ff',
    link: '#',
    video: 'https://drive.google.com/file/d/1JeIwJCNS5nfqxDaf72eeb5T6Jh1ROt3_/preview'
  },
  {
    title: 'GoalYatra - A Personal Productivity & Goal Tracking App',
    category: 'Goal Tracking | Productivity',
    description: 'A comprehensive productivity tool designed to help users set, track, and achieve their personal goals with an intuitive interface and visual progress indicators.',
    image: 'https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=1600&h=900',
    color: '#00ff55',
    link: 'https://roaring-queijadas-a0db0f.netlify.app/',
    video: 'https://drive.google.com/file/d/1tGhekKbEb8k9TqB4I9hL3Zq_BxIf-3t1/preview'
  },
];

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 3.5,
      ease: "power3.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
      onComplete: () => {
        tl.to(counterRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power4.inOut"
        })
        .to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power4.inOut"
        }, "-=0.6")
        .to(lineRef.current, {
          scaleX: 0,
          duration: 0.8,
          ease: "power4.inOut"
        }, "-=0.8")
        .to(preloaderRef.current, {
          yPercent: -100,
          duration: 1.5,
          ease: "expo.inOut",
          onComplete: onComplete
        });
      }
    });
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="overflow-hidden mb-4">
        <motion.div 
          ref={textRef}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium"
        >
          Portfolio 2026
        </motion.div>
      </div>
      
      <div ref={counterRef} className="relative">
        <span className="text-white text-[25vw] md:text-[15vw] font-bold tracking-tighter leading-none block tabular-nums">
          {progress.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="absolute bottom-20 left-10 right-10 md:left-20 md:right-20 h-[1px] bg-white/5">
        <motion.div 
          ref={lineRef}
          className="h-full bg-white origin-left"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </div>
  );
}

function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isPointer, setIsPointer] = useState(false);
  
  // Smoother spring for the cursor itself
  const springConfig = { damping: 30, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isPointer ? 2.5 : 1,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed top-0 left-0 w-2.5 h-2.5 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference invert"
    />
  );
}

function NavBar() {
  const [inAboutSection, setInAboutSection] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const aboutSection = document.getElementById('about');
          const contactSection = document.getElementById('contact');
          
          let isOverWhite = false;

          if (aboutSection) {
            const rect = aboutSection.getBoundingClientRect();
            if (rect.top <= 80 && rect.bottom >= 80) {
              isOverWhite = true;
            }
          }

          if (!isOverWhite && contactSection) {
            const rect = contactSection.getBoundingClientRect();
            if (rect.top <= 80 && rect.bottom >= 80) {
              isOverWhite = true;
            }
          }

          setInAboutSection(isOverWhite);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 backdrop-blur-md border-none ${
        inAboutSection 
          ? 'bg-white/80 text-black' 
          : 'bg-black/80 text-white'
      }`}
    >
      <div className="text-display font-bold text-xl tracking-tight">KHUSHI CHAUDHARY</div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
        <a href="#education" className="hover:opacity-70 transition-opacity">Education</a>
        <a href="#certifications" className="hover:opacity-70 transition-opacity">Certifications</a>
        <a href="#experience" className="hover:opacity-70 transition-opacity">Experience</a>
        <a href="#work" className="hover:opacity-70 transition-opacity">Work</a>
      </div>
      <a href="#contact" className={`px-5 py-2.5 rounded-full border transition-colors text-sm font-medium ${
        inAboutSection
          ? 'border-black/20 hover:bg-black hover:text-white'
          : 'border-white/20 hover:bg-white hover:text-black'
      }`}>
        Let's Talk
      </a>
    </motion.nav>
  );
}

function SocialSidebar() {
  const icons = [
    { id: 'linkedin', icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/khushichaudhary26' },
    { id: 'github', icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/khushichaudhary2611' },
    { id: 'view-cv', icon: <FileText size={20} />, label: 'View CV', href: 'https://drive.google.com/file/d/1quc63kjRpfLB3brHUNNwGkezMYqPQVpx/view?usp=sharing' },
    { id: 'download-cv', icon: <Download size={20} />, label: 'Download CV', href: '/cv.pdf', download: 'cv.pdf' },
  ];

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-6">
      {icons.map((item) => (
        <motion.a
          key={item.id}
          href={item.href}
          target={item.id === 'download-cv' ? undefined : "_blank"}
          rel={item.id === 'download-cv' ? undefined : "noopener noreferrer"}
          download={item.download}
          className="relative group p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {item.icon}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl transform translate-x-2 group-hover:translate-x-0">
            {item.label}
          </div>
        </motion.a>
      ))}
    </div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for title lines
      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.5
      });

      // Reveal for subtitle
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden">
      <SocialSidebar />
      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto w-full z-10">
        <h1 ref={titleRef} className="text-display text-[12vw] leading-[0.85] tracking-tighter font-bold uppercase">
          <div className="overflow-hidden">
            <div className="hero-line">Crafting Bold</div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              & Memorable
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line">Websites</div>
          </div>
        </h1>
        
        <div 
          ref={subtitleRef}
          className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <p className="max-w-md text-lg text-white/60 font-medium leading-relaxed">
            Full Stack webdesigner & website developer with a strong focus animations and interactions. Turns idea into visuals.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-widest text-white/40">
            <span>Scroll to explore</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              ↓
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Background abstract element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-[#ff4e00]/20 to-transparent rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none" />
    </section>
  );
}

const Word: React.FC<{ children: React.ReactNode, progress: any, range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="mr-2 md:mr-3 lg:mr-4 mt-1 md:mt-2 inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

function About() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 45%"]
  });

  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(sectionScroll, [0, 1], [-100, 500]);
  const imageRotate = useTransform(sectionScroll, [0, 1], [-8, 8]);
  const imageScale = useTransform(sectionScroll, [0, 0.5, 1], [0.9, 1, 0.9]);

  const text = "I'm KHUSHI, a Computer Science student at Lovely Professional University. I build websites at the intersection of design and technology, turning ideas into powerful digital experiences that are useful and easy to use.";
  const words = text.split(" ");

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 pb-64 px-6 bg-white text-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-4 sticky top-32">About Me</h2>
            
            <motion.div 
              style={{ y: imageY, rotate: imageRotate, scale: imageScale }}
              className="mt-12 sticky top-48 hidden lg:block px-4 will-change-transform"
            >
              <div className="aspect-square w-full max-w-[300px] mx-auto bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl border border-black/5">
                <img 
                  src="/Khushi.jpeg" 
                  alt="About KHUSHI"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-8">
            <h3 ref={containerRef} className="text-display text-4xl md:text-5xl lg:text-6xl leading-tight font-medium tracking-tight flex flex-wrap">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </h3>
            
            <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-black/10 pt-16">
              <div>
                <h4 className="text-display text-2xl font-bold mb-6">Technical Skills</h4>
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold block mb-2">Languages</span>
                    <p className="text-lg text-black/60 font-medium">Python, C++, C, Java, JavaScript</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold block mb-2">Web Technologies</span>
                    <p className="text-lg text-black/60 font-medium">HTML, CSS, Tailwind CSS, React, Node.js, Express</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold block mb-2">Tools</span>
                    <p className="text-lg text-black/60 font-medium">MySQL, MongoDB, GitHub, Ubuntu, Postman</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-display text-2xl font-bold mb-6">Soft Skills</h4>
                <ul className="space-y-4 text-lg text-black/60 font-medium">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-black" /> Problem-solving</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-black" /> Teamwork</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-black" /> Adaptability</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-black" /> Basic project management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-medium leading-[1.15] tracking-tight mb-24 md:mb-32">
            I build digital products that combine design and technology to create memorable experiences.
          </h2>
          
          <div className="border-t border-white/10 pt-16 md:pt-20 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8">
            <div>
              <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium mb-4 md:mb-6">100+</div>
              <div className="text-xs text-[#888] uppercase tracking-[0.15em] font-medium">Solved Problems</div>
            </div>
            <div>
              <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium mb-4 md:mb-6">5500</div>
              <div className="text-xs text-[#888] uppercase tracking-[0.15em] font-medium">Linkedin Followers</div>
            </div>
            <div>
              <div className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium mb-4 md:mb-6">5+</div>
              <div className="text-xs text-[#888] uppercase tracking-[0.15em] font-medium">Projects Made</div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

function Education() {
  const education = [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Lovely Professional University',
      period: 'Currently Pursuing',
      description: 'Focusing on web development, problem-solving, and core computer science principles.'
    },
    {
      degree: '12th Standard',
      institution: 'Higher Secondary Education',
      period: 'Completed',
      description: 'Achieved 75% in final examinations.'
    },
    {
      degree: '10th Standard',
      institution: 'Secondary Education',
      period: 'Completed',
      description: 'Achieved 82% in final examinations.'
    }
  ];

  return (
    <section id="education" className="py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-16">Education</h2>
        <div className="space-y-12">
          {education.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-black/5 pb-12"
            >
              <div className="md:col-span-3">
                <span className="text-sm font-bold text-black/40">{item.period}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.degree}</h3>
                <p className="text-lg font-medium text-black/60 mb-4">{item.institution}</p>
                <p className="text-black/40 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const certs = [
    {
      title: 'C++ Programming Training',
      issuer: 'CSE Pathshala',
      date: '2025',
      description: 'Mastered Object-Oriented Programming and advanced Data Structures including Linked Lists, Stacks, and Queues.',
      link: '#'
    },
    {
      title: 'Data Structures and Algorithms',
      issuer: 'Professional Certification',
      date: '2024',
      description: 'Intensive focus on algorithmic efficiency, complexity analysis, and competitive programming patterns.',
      link: '#'
    },
    {
      title: 'Java Programming',
      issuer: 'Oracle Academy / Partner',
      date: '2024',
      description: 'Comprehensive study of Java core, multithreading, and enterprise application fundamentals.',
      link: '#'
    }
  ];

  return (
    <section id="certifications" className="py-32 px-6 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Progression</h2>
            <h3 className="text-display text-5xl md:text-7xl font-bold tracking-tighter uppercase">Learning<br/>Timeline</h3>
          </div>
          <p className="text-white/40 max-w-xs text-lg font-medium">
            A chronological journey of my technical skill acquisition and professional development.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          <div className="space-y-24 md:space-y-32">
            {certs.map((cert, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center group`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-white border-4 border-[#0a0a0a] -translate-x-1/2 z-20 transition-transform duration-300 group-hover:scale-150" />

                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-24 text-left md:text-right' : 'md:pl-24 text-left'} pl-12 md:pl-0`}>
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4 px-3 py-1 border border-white/10 rounded-full inline-block">
                      {cert.date}
                    </span>
                    <h4 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                      {cert.title}
                    </h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">
                      {cert.issuer}
                    </p>
                    <p className="text-white/50 text-lg leading-relaxed max-w-xl mb-6">
                      {cert.description}
                    </p>
                    
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white px-6 py-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      View Certificate <ArrowUpRight size={14} />
                    </motion.a>
                  </div>
                </div>

                {/* Empty Side for Balance */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical line
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: true,
        }
      });

      // Animate each project item
      const items = gsap.utils.toArray(".project-item");
      items.forEach((item: any) => {
        gsap.from(item.querySelector(".project-content"), {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.from(item.querySelector(".project-dot"), {
          scale: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.from(item.querySelector(".project-image-wrapper"), {
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-32 bg-black text-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-8">
          <h2 className="text-display text-5xl md:text-8xl font-bold tracking-tighter uppercase">
            Selected<br/>Works
          </h2>
          <p className="text-white/40 max-w-xs text-lg font-medium">
            A chronological showcase of my recent development projects and creative experiments.
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/40 via-white to-white/40" 
          />

          <div className="space-y-32 md:space-y-48">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="project-item relative pl-16 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="project-dot absolute left-4 md:left-8 w-4 h-4 rounded-full bg-white -translate-x-1/2 top-2 z-10 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Text Content */}
                  <div className="project-content lg:col-span-5 order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/30 px-3 py-1 border border-white/10 rounded-full">
                        2024
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-display text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                      {project.title.split(' - ').map((part, i) => (
                        <span key={i} className={i === 1 ? "text-lg md:text-xl font-medium opacity-40 block mt-3" : ""}>
                          {i === 1 ? `— ${part}` : part}
                        </span>
                      ))}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {['React', 'Node.js', 'Tailwind', 'GSAP'].map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {project.description && (
                      <p className="text-white/40 text-base leading-relaxed mb-10 max-w-md">
                        {project.description}
                      </p>
                    )}

                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest group"
                    >
                      <span className="border-b border-white/20 pb-1 group-hover:border-white transition-colors">View Repo</span>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowUpRight size={18} />
                      </div>
                    </a>
                  </div>

                  {/* Image/Video Content */}
                  <div className="project-image-wrapper lg:col-span-7 order-1 lg:order-2">
                    <div className="block relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900 group">
                      {project.video ? (
                        project.video.includes('drive.google.com') ? (
                          <iframe
                            src={project.video}
                            className="w-full h-full border-none"
                            allow="autoplay"
                            title={project.title}
                          />
                        ) : (
                          <video
                            src={project.video}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        )
                      ) : (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full h-full cursor-pointer"
                        >
                          <img 
                            src={project.image} 
                            alt={project.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <div className="px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
                              Live Demo <ArrowUpRight size={14} />
                            </div>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="pt-32 pb-12 px-6 relative overflow-hidden bg-[#f2f2f2] text-black">
      <div className="max-w-7xl mx-auto relative z-10 footer-content">
        <div className="mb-32">
          <h2 className="text-display text-[12vw] leading-[0.85] tracking-tighter font-bold uppercase mb-12">
            Have a project in mind?<br/>Let's get in touch!
          </h2>
          <a 
            href="mailto:khushichaudhary2006@gmail.com" 
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black border border-black rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-black hover:text-white"
          >
            Let's Talk
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Sitemap</span>
              <div className="flex flex-col gap-2 text-sm font-bold uppercase">
                <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
                <a href="#experience" className="hover:opacity-50 transition-opacity">Experience</a>
                <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
                <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Socials</span>
              <div className="flex flex-col gap-2 text-sm font-bold uppercase">
                <a href="https://www.linkedin.com/in/khushichaudhary26" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">LinkedIn</a>
                <a href="https://leetcode.com/u/8LT8lkPAuN/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">LeetCode</a>
                <a href="https://github.com/khushichaudhary2611" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">GitHub</a>
              </div>
            </div>
          </div>
          
          <div className="flex md:justify-end items-start gap-4">
            <a href="https://www.linkedin.com/in/khushichaudhary26" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"><Linkedin size={20} /></a>
            <a href="https://github.com/khushichaudhary2611" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"><Github size={20} /></a>
            <a href="https://leetcode.com/u/8LT8lkPAuN/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"><Code2 size={20} /></a>
            <a href="https://drive.google.com/file/d/1quc63kjRpfLB3brHUNNwGkezMYqPQVpx/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"><FileText size={20} /></a>
            <a href="/cv.pdf" download="cv.pdf" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"><Download size={20} /></a>
            <a href="mailto:khushichaudhary2006@gmail.com" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"><Mail size={20} /></a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-black/10 text-[10px] uppercase tracking-widest font-bold">
          <p>KHUSHI CHAUDHARY © {new Date().getFullYear()}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:opacity-50 transition-opacity">Infos & Credits</a>
          </div>
        </div>
      </div>
      
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
    </footer>
  );
}

const SectionSeparator = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => (
  <div className={`overflow-hidden ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
    <div className="mx-6 md:mx-20">
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={`h-[1px] origin-left ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'
        }`} 
      />
    </div>
  </div>
);

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 500) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center mix-blend-difference transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="text-black group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor clicks for smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Smooth reveal animation for the whole page
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.1 }
      );
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <CustomCursor />}
      {!isLoading && <ScrollToTop />}
      <main 
        ref={contentRef} 
        className={`bg-[#0a0a0a] min-h-screen selection:bg-[#ff4e00] selection:text-white ${isLoading ? 'invisible' : 'visible'}`}
      >
        <NavBar />
        <Hero />
        <SectionSeparator theme="dark" />
        <About />
        <SectionSeparator theme="light" />
        <Experience />
        <SectionSeparator theme="light" />
        <Education />
        <SectionSeparator theme="dark" />
        <Certifications />
        <SectionSeparator theme="dark" />
        <Work />
        <SectionSeparator theme="dark" />
        <Footer />
      </main>
    </>
  );
}
