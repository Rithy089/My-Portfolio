import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  title: string;
  oneLiner: string;
  impact: string;
  stack: string[];
  bullets: string[];
  live?: string;
  badge?: "Live" | "Private";
  caseStudy?: {
    problem: string;
    solution: string;
    notes: string[];
  };
};

const ME = {
  name: "Say Rithy",
  title: "IT & Website Developer",
  location: "Phnom Penh, Cambodia",
  email: "sayrithy089@gmail.com",
  phone: "+855 (0)71 393 5400",
  github: "https://github.com/Rithy089",
  linkedin: "https://www.linkedin.com/in/rithy-say-a59aa32a0/",
  cvUrl: "/CV.pdf",
};

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/* ================= UI ================= */

function Pill({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "dark" }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-all sm:px-3",
        variant === "dark" 
          ? "bg-slate-800 text-slate-200 border border-slate-700" 
          : "bg-sky-50 text-sky-700 border border-sky-200"
      )}
    >
      {children}
    </motion.span>
  );
}

function Button({
  href,
  children,
  variant = "primary",
  fullWidth = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:px-5 sm:py-2.5";

  const styles = {
    primary: "bg-sky-600 text-white hover:bg-sky-700 shadow-md hover:shadow-lg",
    ghost: "border border-sky-200 bg-white/80 text-sky-700 hover:bg-sky-50 backdrop-blur-sm",
    outline: "border-2 border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50",
  }[variant];

  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={href.startsWith("#") ? "_self" : "_blank"}
      rel={href.startsWith("#") ? undefined : "noreferrer noopener"}
      className={cn(base, styles, fullWidth && "w-full")}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className={cn(
        "rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl sm:p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-12 scroll-mt-20 sm:py-16 sm:scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <div className="mt-2 h-1 w-12 bg-linear-to-r from-sky-400 to-sky-600 rounded-full mx-auto sm:mt-3"></div>
          )}
          {subtitle && (
            <p className="mt-3 text-base text-slate-500 max-w-2xl mx-auto sm:mt-4 sm:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/* ================= App ================= */

export default function App() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const projects: Project[] = useMemo(
    () => [
      {
        title: "Momoco Website",
        oneLiner: "Brand website + real deployment",
        impact: "Production-ready website with responsive UI and clean architecture.",
        stack: ["React", "Vite", "Tailwind"],
        bullets: [
          "Mobile-first responsive design",
          "Performance optimized with lazy loading",
          "Real domain deployment & SSL",
        ],
        live: "https://momoco-kh.com",
        badge: "Live",
      },
      {
        title: "Shop Easy",
        oneLiner: "E-commerce UI demo",
        impact: "Modern UI system with reusable components and smooth animations.",
        stack: ["React", "Vite", "Tailwind"],
        bullets: [
          "Clean card system with hover effects",
          "Fast build pipeline & hot reload",
          "Responsive layout across all devices",
        ],
        live: "https://shop-easy-red.vercel.app/",
        badge: "Live",
      },
      {
        title: "Agent-System Dashboard",
        oneLiner: "Roles + commissions system",
        impact: "Secure internal system with role-based architecture.",
        stack: ["React", "TypeScript", "Supabase"],
        bullets: [
          "Role-based access control (RBAC)",
          "Server-side security rules enforced",
          "Automated commission tracking",
        ],
        badge: "Private",
      },
      {
        title: "Google Sheets ↔ Telegram Automation",
        oneLiner: "Workflow automation system",
        impact: "Automated notifications and queue processing system saving 15+ hours weekly.",
        stack: ["Apps Script", "Telegram API", "Node.js"],
        bullets: [
          "Queue system with retry handling",
          "Real-time notifications & alerts",
          "Daily automated reports",
        ],
        badge: "Private",
      },
    ],
    []
  );

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 2);

  const navLinks = [
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80; // Height of fixed header + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollTo(id);
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsNavVisible(true);
      } 
      // Hide navbar when scrolling down and not at the top
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50/30 text-slate-800 font-sans overflow-x-hidden">
      {/* HEADER - With scroll hide/show animation */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
      >
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-sky-500 to-sky-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-base sm:text-lg">SR</span>
            </div>
            <div>
              <div className="font-bold text-slate-800 text-sm sm:text-lg">{ME.name}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">{ME.title}</div>
            </div>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors relative z-50"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 border border-sky-200 bg-white/80 text-sky-700 hover:bg-sky-50 backdrop-blur-sm"
              >
                {link.label}
              </a>
            ))}
            <Button href={ME.cvUrl} variant="outline">📄 CV</Button>
            <Button href={`mailto:${ME.email}`}>Contact</Button>
          </nav>
        </div>
      </motion.header>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-[57px] sm:h-[68px]"></div>

      {/* Mobile Menu Overlay - Doesn't push content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Slide-in menu from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-64 bg-white shadow-2xl z-40 sm:hidden"
            >
              <div className="flex flex-col pt-20 pb-6 px-5 h-full">
                {/* Close button at top */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* User info in menu */}
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <div className="font-semibold text-slate-800">{ME.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{ME.title}</div>
                  <div className="text-xs text-slate-400 mt-2">{ME.location}</div>
                </div>
                
                {/* Navigation links */}
                <div className="flex flex-col gap-2 flex-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="px-4 py-3 text-slate-700 hover:bg-sky-50 rounded-lg transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                  <hr className="my-2 border-slate-100" />
                  <a
                    href={ME.cvUrl}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-slate-700 hover:bg-sky-50 rounded-lg transition-colors font-medium"
                  >
                    📄 CV
                  </a>
                  <a
                    href={`mailto:${ME.email}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-center font-medium"
                  >
                    Contact
                  </a>
                </div>

                {/* Social links at bottom */}
                <div className="pt-4 mt-auto border-t border-slate-100">
                  <div className="flex justify-center gap-4">
                    <a
                      href={ME.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 hover:text-sky-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href={ME.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 hover:text-sky-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO - Mobile Optimized */}
      <section className="relative overflow-hidden py-16 sm:py-24 text-center px-4">
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              x: [0, 30, -20, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div 
            animate={{ 
              x: [0, -30, 20, 0],
              y: [0, 50, -30, 0],
              scale: [1, 0.9, 1.1, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-slate-600">Available for work</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            Building clean{" "}
            <span className="bg-linear-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent whitespace-nowrap">
              web systems
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-2"
          >
            I craft production-ready web applications with modern technologies, 
            focusing on performance, clean code, and exceptional user experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            <Button href={ME.github} variant="outline">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
            <Button href={ME.linkedin}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z"/>
              </svg>
              LinkedIn
            </Button>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <Section
        id="projects"
        title="Featured Projects"
        subtitle="Real production systems and automation tools I've built"
      >
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {displayedProjects.map((p) => (
              <Card key={p.title} className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">{p.title}</h3>
                  <span className={cn(
                    "text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded-full shrink-0 ml-2",
                    p.badge === "Live" 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-amber-100 text-amber-700 border border-amber-200"
                  )}>
                    {p.badge}
                  </span>
                </div>
                <p className="text-sky-600 font-medium text-xs sm:text-sm mb-2">{p.oneLiner}</p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{p.impact}</p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {p.stack.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>

                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 grow">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-xs sm:text-sm text-slate-600 flex items-start gap-1.5 sm:gap-2">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="flex-1">{b}</span>
                    </li>
                  ))}
                </ul>

                {p.live && (
                  <Button href={p.live} variant="outline" fullWidth>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Demo
                  </Button>
                )}
              </Card>
            ))}
          </AnimatePresence>
        </div>
        
        {projects.length > 2 && (
          <motion.div 
            className="text-center mt-8 sm:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="inline-flex items-center gap-2 text-sm sm:text-base text-sky-600 hover:text-sky-700 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllProjects ? "Show less" : `View ${projects.length - 2} more projects`}
              <motion.svg 
                animate={{ rotate: showAllProjects ? 180 : 0 }}
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </motion.div>
        )}
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Technical Skills" subtitle="Technologies I work with">
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          <Card className="bg-linear-to-br from-slate-50 to-white">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Frontend</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["React", "TypeScript", "Tailwind CSS", "Vite", "Next.js", "HTML5/CSS3"].map((s) => (
                <Pill key={s} variant="default">{s}</Pill>
              ))}
            </div>
          </Card>
          <Card className="bg-linear-to-br from-slate-50 to-white">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Backend & Tools</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["Supabase", "PostgreSQL", "Node.js", "Telegram API", "Apps Script", "Git"].map((s) => (
                <Pill key={s} variant="default">{s}</Pill>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* CONTACT - Mobile Optimized */}
      <Section id="contact" title="Get In Touch" subtitle="Let's work together">
        <div className="max-w-2xl mx-auto px-2 sm:px-0">
          <Card className="text-center">
            <motion.div 
              className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-sky-500 to-sky-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{ME.name}</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">{ME.title} • {ME.location}</p>
            
            <div className="space-y-2 sm:space-y-3 text-left bg-slate-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <motion.div 
                className="flex items-center gap-2 sm:gap-3 text-slate-700 text-sm sm:text-base"
                whileHover={{ x: 5 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${ME.email}`} className="hover:text-sky-600 transition truncate">{ME.email}</a>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 sm:gap-3 text-slate-700 text-sm sm:text-base"
                whileHover={{ x: 5 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${ME.phone}`} className="hover:text-sky-600 transition">{ME.phone}</a>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Button href={ME.github} variant="outline">GitHub</Button>
              <Button href={ME.linkedin} variant="outline">LinkedIn</Button>
              <Button href={`mailto:${ME.email}`}>Email Me</Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* FOOTER */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-8 sm:py-12 text-xs sm:text-sm text-slate-400 border-t border-slate-100 px-4"
      >
        <p>© {new Date().getFullYear()} {ME.name}. Built with React, Tailwind CSS & Framer Motion</p>
      </motion.footer>
    </div>
  );
}