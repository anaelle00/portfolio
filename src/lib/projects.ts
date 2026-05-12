export interface Project {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  stack: string[];
  imageSrc?: string;
  imageAlt?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "campuslift",
    slug: "campus-lift",
    titleKey: "projects.campuslift.title",
    descriptionKey: "projects.campuslift.description",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    imageSrc: "/images/campuslift.png",
    imageAlt: "CampusLift",
    github: "https://github.com/anaelle00/campuslift",
    demo: "https://campuslift.vercel.app",
    featured: true,
  },
  {
    id: "pankration",
    slug: "pankration",
    titleKey: "projects.pankration.title",
    descriptionKey: "projects.pankration.description",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    imageSrc: "/images/pankration.png",
    imageAlt: "Pankration",
    github: "https://gitlab.com/polytechnique-montr-al/log2995/20261/equipe-112/LOG2995-112",
  },
  {
    id: "robot",
    slug: "autonomous-robot",
    titleKey: "projects.robot.title",
    descriptionKey: "projects.robot.description",
    stack: ["C++", "AVR", "ATmega324PA", "Makefile"],
    imageSrc: "/images/robot.jpg",
    imageAlt: "Autonomous Robot",
    github: "https://github.com/anaelle00/INF1900-Final-Project",
  },
];
