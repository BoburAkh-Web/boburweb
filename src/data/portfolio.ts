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
  email: "you@example.com",
  telegram: "@username",
  telegramUrl: "https://t.me/username",
  github: "https://github.com/username",
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
    github: "#",
  },
  {
    title: "Sapphire Transportation",
    description: "Logistics landing page redesign with an interactive shipping cost calculator.",
    tags: ["React", "TypeScript", "Tailwind"],
    status: "In progress",
    github: "#",
  },
  {
    title: "CodeKids",
    description: "Educational platform with live multiplayer game rooms for kids.",
    tags: ["Node.js", "Socket.io", "PostgreSQL"],
    status: "In progress",
    github: "#",
  },
  {
    title: "Mahalla Extension",
    description: "Chrome extension that automates bulk data entry from Excel spreadsheets.",
    tags: ["JavaScript", "SheetJS"],
    github: "#",
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
