import { getLocale } from "next-intl/server";
import ProjectPage from "@/components/sections/ProjectPage";
import type { ProjectData } from "@/components/sections/ProjectPage";

const data: ProjectData = {
  slug: "campus-lift",
  titleEn: "CampusLift",
  titleFr: "CampusLift",
  taglineEn: "Crowdfunding platform empowering student-led campus initiatives",
  taglineFr: "Plateforme de crowdfunding pour les initiatives étudiantes",
  year: "2026",
  role: "Solo developer",
  roleFr: "Développeuse solo",
  type: "Solo project",
  typeFr: "Projet solo",
  status: "Production",
  statusFr: "En production",
  demo: "https://campuslift.vercel.app",
  github: "https://github.com/anaelle00/campuslift",
  imageSrc: "/images/campuslift.png",
  contextEn: `I built CampusLift as a portfolio project to practice full-stack engineering at a level closer to what companies actually expect. It turned into a real product along the way.

The idea: a crowdfunding platform where students can publish campus initiatives, set goals, and collect micro-pledges from their community. Real Stripe payments, real-time progress updates, threaded discussions, and a full admin moderation system.

8 RLS-protected database tables, 109+ tests, and a CI pipeline that runs on every push.`,
  contextFr: `J'ai construit CampusLift comme projet portfolio pour pratiquer le développement full-stack à un niveau proche de ce qu'on attend en entreprise. Ça a fini par devenir un vrai produit.

L'idée : une plateforme de crowdfunding où les étudiants publient des initiatives campus, fixent des objectifs et collectent des micro-dons. Paiements Stripe réels, progression en temps réel, discussions filées et système complet de modération admin.

8 tables protégées par RLS, 109+ tests, et un pipeline CI qui tourne à chaque push.`,
  myRoleEn: `I built everything from scratch: database schema with Row Level Security policies, Stripe Checkout integration with idempotent webhook handling, real-time funding progress via Supabase Realtime subscriptions, and the Playwright E2E test suite.

I also set up the GitHub Actions CI pipeline (linting, type checking, test runs) and designed the project lifecycle state machine (draft → published → funded → archived).`,
  myRoleFr: `J'ai tout construit de zéro : schéma de base de données avec les politiques RLS, intégration Stripe Checkout avec gestion idempotente des webhooks, progression en temps réel via Supabase Realtime, et la suite de tests E2E avec Playwright.

J'ai aussi configuré le pipeline CI GitHub Actions et conçu la machine à états du cycle de vie des projets (brouillon → publié → financé → archivé).`,
  stack: [
    { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui"] },
    { category: "Backend", items: ["Supabase", "PostgreSQL 17", "Row Level Security", "Supabase Realtime"] },
    { category: "Payments & Email", items: ["Stripe Checkout", "Stripe Webhooks", "Resend"] },
    { category: "Testing & CI", items: ["Playwright", "Vitest", "GitHub Actions"] },
  ],
  challenges: [
    {
      challengeEn: "Real-time funding updates for all connected users",
      challengeFr: "Mises à jour du financement en temps réel pour tous les utilisateurs connectés",
      approachEn: "Supabase Realtime subscriptions on the pledges table, client-side aggregation",
      approachFr: "Abonnements Supabase Realtime sur la table des dons, agrégation côté client",
      outcomeEn: "Live progress bars update instantly across all open browser tabs",
      outcomeFr: "Les barres de progression se mettent à jour instantanément dans tous les onglets ouverts",
    },
    {
      challengeEn: "Reliable payment flow that survives network failures",
      challengeFr: "Flux de paiement fiable résistant aux pannes réseau",
      approachEn: "Stripe Checkout with idempotent webhook handling and atomic RPC functions in PostgreSQL",
      approachFr: "Stripe Checkout avec gestion idempotente des webhooks et fonctions RPC atomiques en PostgreSQL",
      outcomeEn: "Zero duplicate charges, consistent pledge counts even under retry storms",
      outcomeFr: "Zéro double débit, comptages de dons cohérents même en cas de retentatives",
    },
    {
      challengeEn: "Multi-state project lifecycle with fine-grained access control",
      challengeFr: "Cycle de vie multi-état avec contrôle d'accès fin",
      approachEn: "State machine (draft → published → funded → archived) enforced at the database level via RLS policies",
      approachFr: "Machine à états (brouillon → publié → financé → archivé) appliquée au niveau base de données via les politiques RLS",
      outcomeEn: "Creators, supporters, and admins each see and can do exactly what their role allows",
      outcomeFr: "Créateurs, supporters et admins voient et peuvent faire exactement ce que leur rôle autorise",
    },
  ],
  gallery: [],
};

export default async function CampusLiftPage() {
  const locale = await getLocale();
  return <ProjectPage data={data} locale={locale} />;
}
