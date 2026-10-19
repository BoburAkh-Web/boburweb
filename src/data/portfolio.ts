// Edit all portfolio content here.
export type Project = {
  title: string;
  description: string;
  tags: string[];
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

export const projects: Project[] = [
  {
    title: "Bogizilol",
    description:
      "Multilingual restaurant platform with admin, chef, courier and customer panels, online ordering and an analytics dashboard.",
    tags: ["React", "TypeScript", "React Query", "Node/Express", "MongoDB"],
    live: "https://bogizilol.uz",
  },
  {
    title: "Sapphire Transportation",
    description: "Logistics landing page redesign with an interactive shipping cost calculator.",
    tags: ["React", "TypeScript", "Tailwind"],
    live: "https://eztransgroup.com",
  },
  {
    title: "CodeKids",
    description: "Educational platform with live multiplayer game rooms for kids.",
    tags: ["Node.js", "Socket.io", "PostgreSQL"],
    live: "https://umarxon7887.github.io/codekids/",
  },
  {
    title: "Gross Insurance",
    description: "Corporate insurance website built with Nuxt 3 and Vue 3.",
    tags: ["Nuxt 3", "Vue 3", "TypeScript"],
    live: "https://gross.uz",
  },
  {
    title: "Spartans AI",
    description: "AI-powered web application.",
    tags: ["AI", "Web"],
    live: "https://spartans-ai.vercel.app/",
  },
  {
    title: "Happy Quiz",
    description: "Interactive online quiz app.",
    tags: ["JavaScript", "Web"],
    live: "https://happy-quiz.netlify.app/",
  },
  {
    title: "Mahalla Extension",
    description: "Chrome extension that automates bulk data entry from Excel spreadsheets.",
    tags: ["JavaScript", "SheetJS"],
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
