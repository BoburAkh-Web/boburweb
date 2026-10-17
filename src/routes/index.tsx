import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { icons, ArrowUpRight, Github, Mail, Send, Moon, Sun, ExternalLink, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { about, profile, projects, skills, type Project } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jigar — Frontend Developer from Tashkent" },
      { name: "description", content: profile.tagline },
      { property: "og:title", content: "Jigar — Frontend Developer" },
      { property: "og:description", content: profile.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-muted"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

function Navbar() {
  const links = ["About", "Projects", "Skills", "Contact"];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(92%,760px)]"
    >
      <nav className="glass flex items-center justify-between rounded-full border border-border px-4 py-2 shadow-lg">
        <a href="#top" className="font-display text-lg font-bold">
          jigar<span className="text-highlight">.</span>
        </a>
        <div className="hidden gap-6 text-sm text-muted-foreground sm:flex">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}

function Hero() {
  const words = `Hi, I'm ${profile.name} — ${profile.role}`.split(" ");
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-6">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-lime-soft px-3 py-1 text-xs font-medium"
        >
          <MapPin className="size-3" /> {profile.location} · Open to work
        </motion.p>
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="text-5xl font-bold leading-[1.02] sm:text-7xl md:text-8xl"
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              className={`mr-[0.25em] inline-block ${w === profile.name ? "text-highlight underline decoration-lime decoration-4 underline-offset-8" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground"
        >
          {profile.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button asChild size="lg" className="rounded-full">
            <a href="#projects">
              View Projects <ArrowUpRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
            <a href="#contact">Contact</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...skills, ...skills];
  return (
    <div className="overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
      <div className="marquee flex w-max gap-10">
        {items.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <span key={i} className="flex items-center gap-2 font-display text-xl text-muted-foreground">
              <Icon className="size-5 text-highlight" /> {s.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-highlight">{eyebrow}</p>
      <h2 className="mb-12 text-4xl font-bold sm:text-5xl">{title}</h2>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow="01 — About" title="A little about me" />
      <div className="grid gap-4 sm:grid-cols-2">
        {about.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <div className="card-glow h-full rounded-2xl border border-border bg-card p-6">
              <span className="mb-4 block size-2 rounded-full bg-lime" />
              <h3 className="text-xl font-semibold">{a.title}</h3>
              <p className="mt-1 text-muted-foreground">{a.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -6, y: ((e.clientX - r.left) / r.width - 0.5) * 6 });
  };
  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      animate={{ rotateX: t.x, rotateY: t.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformPerspective: 900 }}
      className="card-glow h-full rounded-2xl border border-border bg-card"
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <TiltCard>
      <div className="flex h-full flex-col p-5">
        <div className="placeholder-art relative mb-5 aspect-[16/9] rounded-xl">
          {p.status && (
            <span className="absolute left-3 top-3 rounded-full bg-lime px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              {p.status}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-semibold">{p.title}</h3>
        <p className="mt-2 flex-1 text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          {p.live && (
            <Button asChild size="sm" className="rounded-full">
              <a href={p.live} target="_blank" rel="noreferrer">
                Live <ExternalLink />
              </a>
            </Button>
          )}
          {p.github && (
            <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent">
              <a href={p.github} target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow="02 — Work" title="Selected projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow="03 — Stack" title="Tools I work with" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {skills.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <Reveal key={s.name} delay={i * 0.04}>
              <div className="card-glow flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:-translate-y-1">
                <span className="grid size-10 place-items-center rounded-lg bg-lime-soft">
                  <Icon className="size-5 text-highlight" />
                </span>
                <span className="font-medium">{s.name}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Send, label: profile.telegram, href: profile.telegramUrl },
    { icon: Github, label: "GitHub", href: profile.github },
  ];
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow="04 — Contact" title="Let's build something" />
      <div className="grid gap-8 md:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="space-y-3">
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="card-glow group flex items-center justify-between rounded-xl border border-border bg-card p-4"
              >
                <span className="flex items-center gap-3">
                  <Icon className="size-5 text-highlight" /> {label}
                </span>
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
                `Hello from ${f.get("name")}`,
              )}&body=${encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`)}`;
              toast.success("Opening your email app…");
            }}
            className="space-y-3 rounded-2xl border border-border bg-card p-6"
          >
            <Input name="name" required placeholder="Your name" className="h-11" />
            <Input name="email" type="email" required placeholder="you@email.com" className="h-11" />
            <Textarea name="message" required placeholder="Tell me about your project" rows={5} />
            <Button type="submit" size="lg" className="w-full rounded-full">
              Send message <Send />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {profile.name} · Built with React & care in {profile.location}
      </footer>
    </main>
  );
}
