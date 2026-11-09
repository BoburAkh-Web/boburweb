import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { icons, ArrowUpRight, Github, Mail, Send, Moon, Sun, ExternalLink, MapPin, Menu, X, MessageCircleQuestion, Clock, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { heroStack, profile, projects, skills, yearsExperience, type Project } from "@/data/portfolio";
import heroImage from "@/assets/hero-dev-real.png.asset.json";
import { PortfolioChat, openPortfolioChat } from "@/components/PortfolioChat";
import { LangProvider, useLang } from "@/i18n/LangProvider";
import { LANGS } from "@/i18n/translations";
import { help } from "@/i18n/audiences";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bobur — Frontend Developer from Tashkent" },
      { name: "description", content: profile.tagline },
      { property: "og:title", content: "Bobur — Frontend Developer" },
      { property: "og:description", content: profile.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
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

// Counts a number up from zero the first time it scrolls into view.
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

// Nudges its child a few pixels toward the cursor, then springs it back.
function Magnetic({ children, strength = 0.18, radius = 8 }: { children: ReactNode; strength?: number; radius?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 240, damping: 20, mass: 0.5 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-radius, Math.min(radius, dx * strength)));
    y.set(Math.max(-radius, Math.min(radius, dy * strength)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}

// Thin lime bar at the very top that fills as the page is scrolled.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return <motion.div aria-hidden style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-highlight" />;
}

// Soft lime spotlight that trails the cursor. Desktop pointers only.
function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-800);
  const y = useMotionValue(-800);
  const sx = useSpring(x, { stiffness: 55, damping: 18, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 55, damping: 18, mass: 0.7 });
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 -z-10 hidden sm:block" style={{ x: sx, y: sy }}>
      <div className="size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-highlight/10 blur-3xl" />
    </motion.div>
  );
}

// Types a role, pauses, erases it and types the next one.
function TypeWords({ words, startDelay = 0 }: { words: string[]; startDelay?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (!started) {
      const t = window.setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(t);
    }
    const full = words[i % words.length] ?? "";
    if (reduce) {
      setText(full);
      return () => {};
    }
    if (!deleting) {
      if (text.length < full.length) {
        // Human-like pace: base 130ms with gentle variation, a longer beat at word starts.
        const base = 130 + Math.random() * 90;
        const beat = text.length === 0 ? 350 : 0;
        const t = window.setTimeout(() => setText(full.slice(0, text.length + 1)), base + beat);
        return () => clearTimeout(t);
      }
      // Hold the finished word longer so visitors can read it.
      const t = window.setTimeout(() => setDeleting(true), 3400);
      return () => clearTimeout(t);
    }
    if (text.length > 0) {
      const t = window.setTimeout(() => setText(full.slice(0, text.length - 1)), 55);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setDeleting(false);
      setI((n) => n + 1);
    }, 420);
    return () => clearTimeout(t);
  }, [started, startDelay, reduce, text, deleting, i, words]);

  return (
    <span className="inline-block text-highlight">
      <span aria-hidden>
        {reduce
          ? (words[i % words.length] ?? "")
          : text.split("").map((ch, idx) => (
              <span key={`${i}-${idx}`} className="char-in inline-block will-change-transform">
                {ch === " " ? " " : ch}
              </span>
            ))}
      </span>
      <span aria-hidden className="caret-glow ml-1 inline-block h-[0.8em] w-[3px] translate-y-[1px] rounded-full bg-highlight/70" />
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}

// Wordmark panel that lifts away once per visit.
function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (reduce || sessionStorage.getItem("intro-seen")) {
      setShow(false);
      return;
    }
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("intro-seen", "1");
    }, 1000);
    return () => clearTimeout(t);
  }, [reduce]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[70] grid place-items-center bg-background"
          id="intro-panel"
        >
          <p className="font-display text-4xl font-bold">
            bobur<span className="text-highlight">.</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
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

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border border-border p-0.5 text-xs font-semibold">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2 py-1 uppercase transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Navbar() {
  const { t } = useLang();
  const links = (["about", "projects", "skills", "resume", "pricing", "contact"] as const).map((id) => ({ id, label: t.nav[id] }));
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [active, setActive] = useState("about");

  // Light up the menu item for the section you are looking at.
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActive(best.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.3, 0.6, 1] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const shown = hover ?? active;
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(92%,760px)]"
    >
      <nav className="glass flex items-center justify-between rounded-full border border-border px-4 py-2 shadow-lg">
        <a href="#top" className="font-display text-lg font-bold">
          bobur<span className="text-highlight">.</span>
        </a>
        <div className="hidden gap-6 text-sm text-muted-foreground sm:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onMouseEnter={() => setHover(l.id)}
              onMouseLeave={() => setHover(null)}
              className={`relative transition-colors hover:text-foreground ${active === l.id ? "text-foreground" : ""}`}
            >
              {l.label}
              {shown === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-highlight"
                />
              )}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-muted sm:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex flex-col rounded-2xl bg-card border border-border p-2 shadow-lg sm:hidden"
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-medium transition-colors hover:bg-muted"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

function Hero() {
  const { t, lang } = useLang();
  const words = t.greeting(profile.name, "").trim().split(" ");
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const picY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -60]);
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-16">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-lime-soft px-3 py-1 text-xs font-medium"
        >
          <MapPin className="size-3" /> {t.location} · {t.openToWork}
        </motion.p>
        <motion.h1
          key={lang}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="text-5xl font-bold leading-[1.02] sm:text-7xl"
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              className={`mr-[0.25em] inline-block ${w.replace(/[^\p{L}]/gu, "") === profile.name ? "text-highlight underline decoration-lime decoration-4 underline-offset-8" : ""}`}
            >
              {w}
            </motion.span>
          ))}
          <motion.span variants={fadeUp} className="inline-block">
            <TypeWords key={lang} words={t.roles} startDelay={1.15} />
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground"
        >
          {t.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          <span className="rounded-full border border-highlight/40 bg-lime-soft px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-highlight">
            {t.heroExperience}
          </span>
          {heroStack.map((s) => (
            <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {s}
            </span>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Magnetic>
            <Button asChild size="lg" className="rounded-full">
              <a href="#projects">
                {t.viewProjects} <ArrowUpRight />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
              <a href="#contact">{t.contact}</a>
            </Button>
          </Magnetic>
        </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <motion.div style={{ y: picY }} className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-highlight/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <img
                src={heroImage.url}
                alt="Illustration of Bobur coding at a desk at night"
                className="max-h-[380px] w-full object-cover lg:max-h-none"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-highlight/20" />
            </div>
          </motion.div>
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

// Three numbers that tick up when the visitor scrolls to them.
function Stats() {
  const { t } = useLang();
  const items = [
    { to: yearsExperience, suffix: "+", label: t.stats.experience },
    { to: projects.length, suffix: "", label: t.stats.projects },
    { to: LANGS.length, suffix: "", label: t.stats.languages },
  ];
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="card-glow rounded-2xl border border-border bg-card p-6 text-center">
              <p className="font-display text-4xl font-bold text-highlight">
                <Counter to={it.to} suffix={it.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{it.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-highlight">{eyebrow}</p>
      <h2 className="mb-5 text-4xl font-bold sm:text-5xl">{title}</h2>
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        className="mb-12 h-px w-28 origin-left bg-gradient-to-r from-highlight to-transparent"
      />
    </Reveal>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow={t.aboutEyebrow} title={t.aboutTitle} />
      <div className="grid gap-4 sm:grid-cols-2">
        {t.about.map((a, i) => (
          <Reveal key={i} delay={i * 0.08}>
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

function HowIHelp() {
  const { lang } = useLang();
  const h = help[lang];
  return (
    <section id="help" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow={h.eyebrow} title={h.title} />
      <Reveal>
        <p className="-mt-6 mb-12 max-w-2xl text-lg text-muted-foreground">{h.intro}</p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {h.audiences.map((a, i) => {
          const Icon = icons[a.icon as keyof typeof icons];
          return (
            <Reveal key={a.who} delay={(i % 3) * 0.08}>
              <div className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 grid size-11 place-items-center rounded-xl bg-lime-soft text-highlight">
                  {Icon && <Icon className="size-5" />}
                </div>
                <h3 className="text-xl font-semibold">{a.who}</h3>
                <p className="mt-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">{h.problemLabel}</p>
                <p className="mt-1 text-sm">{a.pain}</p>
                <p className="mt-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">{h.offerLabel}</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {a.offer.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lime" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal>
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h3 className="mb-6 text-2xl font-semibold">{h.whyTitle}</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {h.why.map((w) => (
              <div key={w.title}>
                <p className="font-semibold text-highlight">{w.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{w.detail}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-8 rounded-full">
            <a href="#contact">{h.cta} <ArrowUpRight className="size-4" /></a>
          </Button>
        </div>
      </Reveal>
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
      whileHover={reduce ? {} : { y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformPerspective: 900 }}
      className="card-glow h-full rounded-2xl border border-border bg-card"
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const { t } = useLang();
  return (
    <TiltCard>
      <div className="flex h-full flex-col p-5">
        <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
          {p.image ? (
            <img
              src={p.image}
              alt={`${p.title} ${t.screenshot}`}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          ) : (
            <div className="placeholder-art size-full" />
          )}
          {p.status && (
            <span className="absolute left-3 top-3 rounded-full bg-lime px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              {p.status}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-semibold">{p.title}</h3>
        <p className="mt-2 flex-1 text-muted-foreground">{t.projectDescriptions[i] ?? p.description}</p>
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
                {t.live} <ExternalLink />
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
  const { t } = useLang();
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow={t.workEyebrow} title={t.workTitle} />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1}>
            <ProjectCard p={p} i={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow={t.stackEyebrow} title={t.stackTitle} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {skills.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <Reveal key={s.name} delay={i * 0.04}>
              <div className="card-glow flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-transform duration-300 hover:-translate-y-1">
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

function ResumeSection() {
  const { t } = useLang();
  const olRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: olRef, offset: ["start 0.85", "end 0.6"] });
  const lineY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
  return (
    <section id="resume" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow={t.resumeEyebrow} title={t.resumeTitle} />
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold">{t.workHistory}</h3>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full bg-transparent"
              onClick={() => openPortfolioChat(t.faq[0]?.q)}
            >
              {t.askAssistant} <MessageCircleQuestion />
            </Button>
          </div>
          <ol ref={olRef} className="relative space-y-8 border-l border-border pl-6">
            <motion.span
              aria-hidden
              style={{ scaleY: lineY }}
              className="absolute -left-px top-0 h-full w-px origin-top bg-highlight"
            />
            {t.career.map((c, i) => (
              <li key={i} className="relative">
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="absolute -left-[30px] top-1.5 size-2.5 rounded-full bg-lime"
                />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-highlight">{c.period}</p>
                <h4 className="mt-1 text-lg font-semibold">{c.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="space-y-6">
          <Reveal delay={0.08}>
            <div className="card-glow rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-xl font-semibold">{t.education}</h3>
              {t.educationList.map((e, i) => (
                <div key={i}>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-highlight">{e.period}</p>
                  <h4 className="mt-1 font-semibold">{e.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="card-glow rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-xl font-semibold">{t.skills}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.name} className="rounded-full bg-lime-soft px-3 py-1 text-sm">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <Button size="lg" className="w-full rounded-full" onClick={() => openPortfolioChat(t.hireQuestion)}>
              {t.discussProject} <MessageCircleQuestion />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useLang();
  return (
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow={t.pricingEyebrow} title={t.pricingTitle} />
      <div className="grid gap-5 md:grid-cols-3">
        {t.pricing.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div
              className={`card-glow flex h-full flex-col rounded-2xl border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 ${
                i === 1 ? "border-highlight/50 shadow-[0_0_40px_-12px] shadow-highlight/30" : "border-border"
              }`}
            >
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-3 font-display text-3xl font-bold text-highlight">{p.price}</p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-4 text-highlight" /> {p.time}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-highlight" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="max-w-2xl text-sm text-muted-foreground">{t.pricingNote}</p>
          <Button asChild size="lg" className="rounded-full">
            <a href="#contact">{t.pricingCta} <ArrowUpRight className="size-4" /></a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  const { t } = useLang();
  const links = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Send, label: profile.telegram, href: profile.telegramUrl },
    { icon: Github, label: "GitHub", href: profile.github },
  ];
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-28">
      <SectionTitle eyebrow={t.contactEyebrow} title={t.contactTitle} />
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
                t.formHello(String(f.get("name"))),
              )}&body=${encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`)}`;
              toast.success(t.formOpening);
            }}
            className="space-y-3 rounded-2xl border border-border bg-card p-6"
          >
            <Input name="name" required placeholder={t.formName} className="h-11 focus-visible:border-highlight focus-visible:ring-2 focus-visible:ring-highlight/25" />
            <Input name="email" type="email" required placeholder="you@email.com" className="h-11 focus-visible:border-highlight focus-visible:ring-2 focus-visible:ring-highlight/25" />
            <Textarea name="message" required placeholder={t.formMessage} rows={5} className="focus-visible:border-highlight focus-visible:ring-2 focus-visible:ring-highlight/25" />
            <Button type="submit" size="lg" className="w-full rounded-full">
              {t.formSend} <Send />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
      {t.footer(profile.name, t.location)}
    </footer>
  );
}

function Page() {
  return (
    <main className="overflow-x-hidden">
      <Intro />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <HowIHelp />
      <Projects />
      <Skills />
      <ResumeSection />
      <Pricing />
      <Contact />
      <PortfolioChat />
      <Footer />
    </main>
  );
}
