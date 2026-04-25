import React, { useMemo, useState } from "react";

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
  cvUrl: "/CV.pdf", // put CV in /public/CV.pdf
};

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const cls =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10";
  return (
    <a
      href={href}
      target={href.startsWith("#") ? "_self" : "_blank"}
      rel={href.startsWith("#") ? undefined : "noreferrer"}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.99]",
        cls
      )}
    >
      {children}
    </a>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur",
        "transition hover:bg-white/[0.07] hover:border-white/15",
        className
      )}
    >
      {/* subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
      {children}
    </div>
  );
}

function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
}: {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-8">
          {kicker ? (
            <p className="text-xs font-semibold tracking-[0.22em] text-white/55">
              {kicker.toUpperCase()}
            </p>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function Icon({
  name,
}: {
  name: "github" | "linkedin" | "mail" | "arrow" | "spark";
}) {
  const cls = "h-4 w-4";
  if (name === "arrow") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
        <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
        <path d="M12 2l1.2 5.2L18 8.4l-4.8 1.2L12 15l-1.2-5.4L6 8.4l4.8-1.2L12 2zm7 9l.8 3.3 3.2.8-3.2.8L19 19l-.8-3.1-3.2-.8 3.2-.8L19 11z" />
      </svg>
    );
  }
  if (name === "github")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
        <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.9 3.19 9.05 7.62 10.52.56.1.76-.24.76-.54v-1.9c-3.1.68-3.75-1.3-3.75-1.3-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.11.08 1.7 1.14 1.7 1.14.99 1.7 2.6 1.21 3.24.92.1-.72.38-1.21.69-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.43-2.22 1.14-3-.11-.28-.49-1.42.11-2.96 0 0 .93-.3 3.05 1.14.88-.25 1.82-.37 2.76-.38.94.01 1.88.13 2.76.38 2.12-1.44 3.05-1.14 3.05-1.14.6 1.54.22 2.68.11 2.96.71.78 1.14 1.78 1.14 3 0 4.3-2.62 5.25-5.12 5.52.39.34.74 1.02.74 2.06v3.05c0 .3.2.65.77.54 4.42-1.47 7.6-5.62 7.6-10.52C23.25 5.48 18.27.5 12 .5z" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.28V9h3.42v1.56h.05c.48-.9 1.66-1.85 3.41-1.85 3.65 0 4.32 2.4 4.32 5.53v6.21zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
      <path d="M4 4h16a2 2 0 0 1 2 2v.2l-10 6.2L2 6.2V6a2 2 0 0 1 2-2zm18 5.1V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.1l9.4 5.8a1.2 1.2 0 0 0 1.2 0L22 9.1z" />
    </svg>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="group">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="mt-1 text-sm text-white/70">{p.oneLiner}</p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[11px] font-medium",
              p.badge === "Live"
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                : "border-white/10 bg-white/5 text-white/70"
            )}
          >
            {p.badge ?? (p.live ? "Live" : "Private")}
          </span>

          {p.live ? (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85 hover:bg-white/10 transition"
            >
              Open <Icon name="arrow" />
            </a>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/70">{p.impact}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      <ul className="mt-5 space-y-2 text-sm text-white/75">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Optional detail toggle (keeps main view clean) */}
      {p.caseStudy ? (
        <div className="mt-5">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
          >
            <Icon name="spark" />
            {open ? "Hide case study" : "View case study"}
          </button>

          {open ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-white/60">
                    PROBLEM
                  </div>
                  <p className="mt-1 text-sm text-white/75">{p.caseStudy.problem}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide text-white/60">
                    SOLUTION
                  </div>
                  <p className="mt-1 text-sm text-white/75">{p.caseStudy.solution}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-xs font-semibold tracking-wide text-white/60">
                  NOTES
                </div>
                <ul className="mt-2 space-y-2 text-sm text-white/75">
                  {p.caseStudy.notes.map((n) => (
                    <li key={n} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}

export default function App() {
  const projects: Project[] = useMemo(
    () => [
      {
        title: "Momoco Website",
        oneLiner: "Brand website + real deployment",
        impact: "A production website focused on responsive UI, clean structure, and maintainable updates.",
        stack: ["React", "Vite", "Tailwind", "Hosting"],
        bullets: [
          "Mobile-first responsive layout",
          "Performance-minded structure",
          "Deployed with real domain",
        ],
        live: "https://momoco-kh.com",
        badge: "Live",
      },
      {
        title: "Shop Easy",
        oneLiner: "Modern e-commerce UI demo",
        impact: "A polished UI demo showing component structure, fast builds, and responsive sections.",
        stack: ["React", "Vite", "Tailwind", "Vercel"],
        bullets: ["Clean UI cards + spacing system", "Fast Vite build workflow", "Responsive components"],
        live: "https://shop-easy-red.vercel.app/",
        badge: "Live",
      },
      {
        title: "Agent-System (Internal Dashboard)",
        oneLiner: "Orders + roles + commissions",
        impact: "A role-based system mindset: clear permissions, status locks, and reliable reporting.",
        stack: ["React", "TypeScript", "Supabase", "Postgres", "RLS"],
        bullets: [
          "Admin / Dealer / Sales Agent permissions",
          "Rules enforced server-side (avoid cheating)",
          "Commission reporting flow",
        ],
        badge: "Private",
        caseStudy: {
          problem: "Multiple roles needed different access + commission rules, and the system must prevent misuse.",
          solution: "Server-side permissions + status-based restrictions, with clear UI and admin oversight.",
          notes: [
            "Backend is source of truth (RLS mindset)",
            "Audit/traceability approach for updates",
            "Designed for daily real usage",
          ],
        },
      },
      {
        title: "Google Sheets ↔ Telegram Automation",
        oneLiner: "Queue worker + reminders for operations",
        impact: "Automation to reduce manual ops work: alerts, queueing, retries, and daily reminders.",
        stack: ["Google Apps Script", "Google Sheets", "Telegram Bot API"],
        bullets: ["Queue + retry logic (rate-limit friendly)", "Status workflow (queued/sent/error)", "Daily reminder automation"],
        badge: "Private",
        caseStudy: {
          problem: "Manual order alerts cause delays and mistakes when teams work fast.",
          solution: "Automated Telegram delivery from Sheets with queue + retry logic and clear statuses.",
          notes: ["Handles bursts safely", "Operational clarity for team", "Designed to be low-maintenance"],
        },
      },
    ],
    []
  );

  const skills = useMemo(
    () => [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "Postgres",
      "RLS (Row Level Security)",
      "Laravel (PHP)",
      "REST API",
      "Google Apps Script",
      "Telegram Bots",
      "Deployment (Vercel/Hosting)",
    ],
    []
  );

  const nav = [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      {/* Background: animated gradient + grid */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* moving glow */}
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[140px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] left-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-[140px] animate-[pulse_7s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-140px] right-[-160px] h-[520px] w-[520px] rounded-full bg-emerald-400/12 blur-[160px] animate-[pulse_8s_ease-in-out_infinite]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:52px_52px]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.7),transparent_45%)]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold">
              SR
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{ME.name}</div>
              <div className="text-[12px] text-white/60">{ME.title}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="text-sm text-white/70 hover:text-white transition"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={ME.cvUrl} variant="ghost">
              CV
            </Button>
            <Button href={`mailto:${ME.email}`}>Email</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 pt-14 pb-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                Available • {ME.location}
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                I build{" "}
                <span className="bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent">
                  clean, reliable web systems
                </span>{" "}
                for real-world work.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                I’m <span className="text-white">{ME.name}</span> — an{" "}
                <span className="text-white">{ME.title}</span>. I focus on UI polish,
                permission-safe dashboards, and automation workflows (Telegram + Google Sheets).
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>React + TypeScript</Pill>
                <Pill>Supabase + Postgres</Pill>
                <Pill>Telegram Bots</Pill>
                <Pill>Apps Script</Pill>
                <Pill>Dashboards</Pill>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={ME.linkedin} variant="primary">
                  <span className="inline-flex items-center gap-2">
                    <Icon name="linkedin" /> LinkedIn
                  </span>
                </Button>
                <Button href={ME.github} variant="ghost">
                  <span className="inline-flex items-center gap-2">
                    <Icon name="github" /> GitHub
                  </span>
                </Button>
                <Button href="#projects" variant="ghost">
                  View Projects
                </Button>
              </div>
            </div>

            <Card className="md:mt-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.22em] text-white/55">
                    QUICK CONTACT
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">Let’s work</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Fast reply
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <a
                  href={`mailto:${ME.email}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/80">
                      <Icon name="mail" />
                    </span>
                    <div>
                      <div className="text-white/70 text-xs">Email</div>
                      <div className="text-white">{ME.email}</div>
                    </div>
                  </div>
                  <span className="text-white/50">
                    <Icon name="arrow" />
                  </span>
                </a>

                <a
                  href={`tel:${ME.phone.replace(/\s|\(|\)/g, "")}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/80">
                      <Icon name="spark" />
                    </span>
                    <div>
                      <div className="text-white/70 text-xs">Phone</div>
                      <div className="text-white">{ME.phone}</div>
                    </div>
                  </div>
                  <span className="text-white/50">
                    <Icon name="arrow" />
                  </span>
                </a>

                <a
                  href={ME.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                >
                  <div>
                    <div className="text-white/70 text-xs">CV</div>
                    <div className="text-white">Download PDF</div>
                  </div>
                  <span className="text-white/50">
                    <Icon name="arrow" />
                  </span>
                </a>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
                  HIGHLIGHTS
                </div>
                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-200/70" />
                    UI polish + responsive layouts
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-200/70" />
                    Permission-safe dashboards
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-200/70" />
                    Automation for ops workflows
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* Projects */}
        <Section
          id="projects"
          kicker="Work"
          title="Projects"
          subtitle="Short, recruiter-friendly summaries. Expand only if you want details."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section
          id="skills"
          kicker="Toolkit"
          title="Skills"
          subtitle="Tools I use to build production-ready apps and automation."
        >
          <Card>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </Card>
        </Section>

        {/* About */}
        <Section
          id="about"
          kicker="About"
          title="How I work"
          subtitle="Systems first, clear UX, backend authority, and automation to reduce errors."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold">Principles</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                  Backend is the source of truth (permissions + rules)
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                  UI should be clean, fast, and easy for teams to use daily
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                  Automation reduces manual work and prevents mistakes
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold">What I’m targeting</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Roles where I can build websites + internal systems, improve workflows, and ship reliable
                features with good UI.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>IT Support + Web</Pill>
                <Pill>Frontend / Full-stack</Pill>
                <Pill>Automation</Pill>
                <Pill>Admin Dashboards</Pill>
              </div>
            </Card>
          </div>
        </Section>

        {/* Contact */}
        <Section
          id="contact"
          kicker="Contact"
          title="Let’s connect"
          subtitle="Email is best. I’ll reply with next steps."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <h3 className="text-lg font-semibold">Message</h3>
              <p className="mt-2 text-sm text-white/70">
                If you’re hiring, share the role + requirements and I’ll respond with how I fit and what I can build.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={`mailto:${ME.email}`}>Email me</Button>
                <Button href={ME.linkedin} variant="ghost">
                  LinkedIn
                </Button>
                <Button href={ME.github} variant="ghost">
                  GitHub
                </Button>
                <Button href={ME.cvUrl} variant="ghost">
                  CV
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold">Details</h3>
              <div className="mt-4 space-y-2 text-sm text-white/75">
                <div>
                  <div className="text-white/60 text-xs">Location</div>
                  <div className="text-white">{ME.location}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs">Email</div>
                  <div className="text-white">{ME.email}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs">Phone</div>
                  <div className="text-white">{ME.phone}</div>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} {ME.name}. Built with React + Tailwind.
            </div>
            <div className="hidden gap-6 text-sm md:flex">
              {nav.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  className="text-white/60 hover:text-white transition"
                >
                  {it.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}