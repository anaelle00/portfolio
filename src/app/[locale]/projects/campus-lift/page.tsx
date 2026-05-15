import { getLocale } from "next-intl/server";
import ProjectPage from "@/components/sections/ProjectPage";
import type { ProjectData } from "@/components/sections/ProjectPage";

const data: ProjectData = {
  slug: "campus-lift",
  titleEn: "CampusLift",
  titleFr: "CampusLift",
  taglineEn: "Crowdfunding platform empowering student-led campus initiatives",
  taglineFr: "Plateforme de crowdfunding pour les initiatives étudiantes",
  year: "2024–2025",
  role: "Co-founder & Full-stack Developer",
  roleFr: "Co-fondatrice & Développeuse full-stack",
  type: "Team project",
  typeFr: "Projet d'équipe",
  status: "Production",
  statusFr: "En production",
  demo: "https://campuslift.vercel.app",
  github: "https://github.com/anaelle00/campuslift",
  imageSrc: "/images/campuslift.png",
  contextEn: `Many student initiatives at universities lack the visibility and funding they need to come to life. Traditional funding channels are slow, opaque, and rarely accessible to undergraduates with a weekend-born idea.

CampusLift was built to fix that: a focused crowdfunding platform where student creators can publish projects, set goals and deadlines, and collect micro-pledges from their campus community, all in a few clicks.

What started as a hackathon idea became a production-ready app: 8 RLS-protected database tables, 109+ tests, Stripe-integrated payments, real-time funding progress, and a full moderation system.`,
  contextFr: `De nombreuses initiatives étudiantes manquent de visibilité et de financement pour voir le jour. Les canaux traditionnels sont lents, opaques et rarement accessibles à des étudiants avec une idée née un week-end.

CampusLift a été construit pour changer ça : une plateforme de crowdfunding ciblée où les créateurs étudiants peuvent publier des projets, fixer des objectifs et collecter des micro-dons auprès de leur communauté campus, en quelques clics.

Ce qui a commencé comme une idée de hackathon est devenu une app prête pour la production : 8 tables protégées par RLS, 109+ tests, paiements intégrés avec Stripe, progression du financement en temps réel et un système complet de modération.`,
  myRoleEn: `I led the full-stack architecture from the ground up: designed the database schema with Row Level Security policies, built the Stripe Checkout integration with idempotent webhook handling, implemented the real-time funding progress using Supabase Realtime subscriptions, and wrote the E2E test suite with Playwright.

I also set up the GitHub Actions CI pipeline (linting, type checking, test runs) and drove the project lifecycle state machine (draft → published → funded → archived).`,
  myRoleFr: `J'ai conduit l'architecture full-stack de bout en bout : conception du schéma de base de données avec les politiques RLS, intégration Stripe Checkout avec gestion idempotente des webhooks, mise en place de la progression en temps réel via Supabase Realtime, et rédaction de la suite de tests E2E avec Playwright.

J'ai également configuré le pipeline CI GitHub Actions et implémenté la machine à états du cycle de vie des projets (brouillon → publié → financé → archivé).`,
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
