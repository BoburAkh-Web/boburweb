import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { icons, ArrowUpRight, Github, Mail, Send, Moon, Sun, ExternalLink, MapPin, Menu, X, MessageCircleQuestion } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { heroStack, profile, projects, skills, type Project } from "@/data/portfolio";
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
  const links = (["about", "projects", "skills", "resume", "contact"] as const).map((id) => ({ id, label: t.nav[id] }));
  const [open, setOpen] = useState(false);
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
            <a key={l.id} href={`#${l.id}`} className="transition-colors hover:text-foreground">
              {l.label}
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
  const words = t.greeting(profile.name, t.role).split(" ");
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
          <Button asChild size="lg" className="rounded-full">
            <a href="#projects">
              {t.viewProjects} <ArrowUpRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
            <a href="#contact">{t.contact}</a>
          </Button>
        </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
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

function ResumeSection() {
  const { t } = useLang();
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
          <ol className="relative space-y-8 border-l border-border pl-6">
            {t.career.map((c, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[30px] top-1.5 size-2.5 rounded-full bg-lime" />
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
            <Input name="name" required placeholder={t.formName} className="h-11" />
            <Input name="email" type="email" required placeholder="you@email.com" className="h-11" />
            <Textarea name="message" required placeholder={t.formMessage} rows={5} />
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
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <HowIHelp />
      <Projects />
      <Skills />
      <ResumeSection />
      <Contact />
      <PortfolioChat />
      <Footer />
    </main>
  );
}
