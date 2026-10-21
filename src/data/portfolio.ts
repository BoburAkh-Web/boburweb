// Edit all portfolio content here.
import bogizilolImage from "@/assets/proj-bogizilol.png.asset.json";
import grossImage from "@/assets/proj-gross.png.asset.json";
import easycoddyImage from "@/assets/proj-easycoddy.png.asset.json";
import spartansImage from "@/assets/proj-spartans.png.asset.json";
import happyquizImage from "@/assets/proj-happyquiz.png.asset.json";
import sapphireImage from "@/assets/proj-sapphire.png.asset.json";
import eztransImage from "@/assets/proj-eztrans.png.asset.json";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  live?: string;
  github?: string;
  status?: "In progress";
};

export type Skill = { name: string; icon: string }; // icon = lucide-react icon name

export const profile = {
  name: "Jigar",
  role: "Frontend Developer",
  location: "Tashkent, Uzbekistan",
  tagline: "I build fast, animated web experiences with React, Vue and TypeScript.",
  email: "boburakhone@gmail.com",
  telegram: "@boobur_akh",
  telegramUrl: "https://t.me/boobur_akh",
  github: "https://github.com/BoburAkh-Web",
};

export const about: { title: string; detail: string }[] = [
  { title: "Junior Frontend Developer", detail: "Gross Insurance — Nuxt 3, Vue 3, TypeScript" },
  { title: "Computer Engineering student", detail: "Fergana State University" },
  { title: "IT mentor for kids", detail: "Newton learning center" },
  { title: "Freelancer", detail: "Building web products for clients" },
];

// Career timeline — answers "what's your experience / background" questions.
export const career: { period: string; title: string; detail: string }[] = [
  {
    period: "Present",
    title: "Junior Frontend Developer — Gross Insurance",
    detail:
      "Builds and maintains web products for an insurance company using Nuxt 3, Vue 3 and TypeScript. See the live site at https://gross.uz.",
  },
  {
    period: "Present",
    title: "Freelance web developer",
    detail:
      "Works directly with clients to design, build and ship web products end to end — landing pages, full platforms and Chrome extensions.",
  },
  {
    period: "Present",
    title: "IT mentor for kids — Newton learning center",
    detail: "Teaches programming fundamentals to kids, including live multiplayer coding activities like EasyCoddy.",
  },
];

// Education — shown in the resume section and used by the assistant.
export const education: { period: string; title: string; detail: string }[] = [
  {
    period: "Present",
    title: "Computer Engineering student — Fergana State University",
    detail: "Studies computer engineering alongside full-time development work.",
  },
];

// How to work with Jigar — answers hiring / collaboration questions.
export const collaboration = {
  openTo: "Full-time frontend roles and freelance projects, remote or on-site in Uzbekistan.",
  services: [
    "Frontend development with React, Vue 3 / Nuxt 3 and TypeScript",
    "Landing pages and marketing sites with modern animations",
    "Full web platforms (dashboards, admin panels, online ordering)",
    "Node.js / Express APIs with MongoDB or PostgreSQL",
    "Chrome extensions and browser automation",
  ],
  process: [
    "Reach out by email or Telegram with a short description of the project or role",
    "A quick call or chat to agree on scope, timeline and budget",
    "Building in small iterations with regular previews",
    "Launch plus support for fixes and improvements",
  ],
  compensation: "Budget and rates are discussed individually for each project — contact Jigar directly.",
  bestFor: [
    "Startups and small businesses that need a fast, animated web product",
    "Teams that need an extra frontend developer comfortable in both React and Vue",
    "Educational projects for kids and learners",
  ],
};


export const projects: Project[] = [
  {
    title: "Bogizilol",
    description:
      "Multilingual restaurant platform with admin, chef, courier and customer panels, online ordering and an analytics dashboard.",
    tags: ["React", "TypeScript", "React Query", "Node/Express", "MongoDB"],
    image: bogizilolImage.url,
    live: "https://bogizilol.uz",
  },
  {
    title: "Sapphire Transportation",
    description: "Logistics landing page redesign with an interactive shipping cost calculator.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: sapphireImage.url,
  },
  {
    title: "EZ Trans Group",
    description:
      "Logistics company website with live dispatch status, expedited service solutions and quote requests.",
    tags: ["Logistics", "Landing"],
    image: eztransImage.url,
    live: "https://logistic-app-akh.netlify.app/",
  },
  {
    title: "EasyCoddy",
    description: "Educational platform with live multiplayer game rooms for kids.",
    tags: ["Node.js", "Socket.io", "PostgreSQL"],
    image: easycoddyImage.url,
    live: "https://umarxon7887.github.io/codekids/",
  },
  {
    title: "Gross Insurance",
    description: "Corporate insurance website built with Nuxt 3 and Vue 3.",
    tags: ["Nuxt 3", "Vue 3", "TypeScript"],
    image: grossImage.url,
    live: "https://gross.uz",
  },
  {
    title: "Spartans AI",
    description: "AI-powered web application.",
    tags: ["AI", "Web"],
    image: spartansImage.url,
    live: "https://spartans-ai.vercel.app/",
  },
  {
    title: "Happy Quiz",
    description: "Interactive online quiz app.",
    tags: ["JavaScript", "Web"],
    image: happyquizImage.url,
    live: "https://happy-quiz.netlify.app/",
  },
];

export const skills: Skill[] = [
  { name: "React", icon: "Atom" },
  { name: "Vue 3", icon: "Triangle" },
  { name: "Nuxt 3", icon: "Mountain" },
  { name: "TypeScript", icon: "FileCode" },
  { name: "JavaScript", icon: "Braces" },
  { name: "Tailwind", icon: "Wind" },
  { name: "shadcn/ui", icon: "Component" },
  { name: "Node.js", icon: "Hexagon" },
  { name: "Express", icon: "Server" },
  { name: "MongoDB", icon: "Database" },
  { name: "Git", icon: "GitBranch" },
];
