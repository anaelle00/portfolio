import { getLocale } from "next-intl/server";
import ProjectPage from "@/components/sections/ProjectPage";
import type { ProjectData } from "@/components/sections/ProjectPage";

const data: ProjectData = {
  slug: "pankration",
  titleEn: "Pankration",
  titleFr: "Pankration",
  taglineEn: "Full-stack web application — university project",
  taglineFr: "Application web full-stack — projet universitaire",
  year: "2026",
  role: "Team project",
  roleFr: "Projet d'équipe",
  type: "University project",
  typeFr: "Projet universitaire",
  status: "Completed",
  statusFr: "Terminé",
  github: "https://gitlab.com/polytechnique-montr-al/log2995/20261/equipe-112/LOG2995-112",
  imageSrc: "/images/pankration.png",
  // TODO: Add full context, role description, challenges when available
  contextEn: `Pankration is a full-stack web application built as part of a university course at Polytechnique Montréal. The project explores modern full-stack development concepts including REST API design, database modelling, and interactive frontend development.

More details coming soon.`,
  contextFr: `Pankration est une application web full-stack réalisée dans le cadre d'un cours universitaire à Polytechnique Montréal. Le projet explore les concepts modernes du développement full-stack : conception d'API REST, modélisation de base de données et développement frontend interactif.

Plus de détails à venir.`,
  myRoleEn: `Full-stack development as part of a team. Details to be updated.`,
  myRoleFr: `Développement full-stack en équipe. Détails à compléter.`,
  stack: [
    { category: "Frontend", items: ["React", "TypeScript"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB"] },
  ],
  challenges: [],
  gallery: [],
};

export default async function PankrationPage() {
  const locale = await getLocale();
  return <ProjectPage data={data} locale={locale} />;
}
