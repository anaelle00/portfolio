export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  stack: string[];
  imageSrc?: string;
  imageAlt?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  longDescriptionKey?: string;
}

export const projects: Project[] = [
  {
    id: "campuslift",
    titleKey: "projects.campuslift.title",
    descriptionKey: "projects.campuslift.description",
    longDescriptionKey: "projects.campuslift.longDescription",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"],
    imageSrc: "/images/campuslift.png",
    imageAlt: "CampusLift",
    github: "https://github.com/anaelle00/campuslift",
    featured: true,
  },
  {
    id: "placeholder1",
    titleKey: "projects.placeholder1.title",
    descriptionKey: "projects.placeholder1.description",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    imageSrc: "/images/pankration.png",
    imageAlt: "Pankration",
  },
  {
    id: "placeholder2",
    titleKey: "projects.placeholder2.title",
    descriptionKey: "projects.placeholder2.description",
    stack: ["C++", "AVR", "Embedded C", "Makefile"],
    imageSrc: "/images/robot.jpg",
    imageAlt: "Robot",
    github: "https://github.com/anaelle00/INF1900-Final-Project",
  },
  {
    id: "placeholder3",
    titleKey: "projects.placeholder3.title",
    descriptionKey: "projects.placeholder3.description",
    stack: ["React", "D3.js", "TypeScript", "Vite"],
  },
];
