"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProjectGallery from "@/components/ui/ProjectGallery";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-xs font-medium tracking-[0.3em] uppercase mb-8"
       style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}>
      {text}
    </p>
  );
}

const FEATURES = {
  en: [
    { title: "Filter by what matters", desc: "Max calories, min protein, max sugar with live sliders." },
    { title: "Multi-select categories and brands", desc: "OR logic across McDonald's, Starbucks, Subway, Sushi Shop, and dish types." },
    { title: "Cumulative tags", desc: "AND logic for high-protein, low-sugar, spicy, chicken, and more." },
    { title: "Natural-language AI agent", desc: "Describe a craving, the filters apply themselves." },
    { title: "Real menu data", desc: "~600 dishes across 4 chains with official nutrition values and product images." },
    { title: "Favorites", desc: "Per-user saved dishes, protected by Row Level Security." },
    { title: "Auth", desc: "Email and password with persistent sessions." },
    { title: "Detail screen", desc: "Full macros and outbound links to Uber Eats or Maps." },
  ],
  fr: [
    { title: "Filtres qui comptent", desc: "Calories max, protéines min, sucre max avec sliders en direct." },
    { title: "Multi-sélection catégories et marques", desc: "Logique OR sur McDonald's, Starbucks, Subway, Sushi Shop et types de plats." },
    { title: "Tags cumulatifs", desc: "Logique AND pour high-protein, low-sugar, spicy, chicken, etc." },
    { title: "Agent IA en langage naturel", desc: "Décris une envie, les filtres s'appliquent seuls." },
    { title: "Vraies données menu", desc: "~600 plats sur 4 chaînes avec valeurs nutritionnelles officielles et images produit." },
    { title: "Favoris", desc: "Plats sauvegardés par utilisateur, protégés par Row Level Security." },
    { title: "Authentification", desc: "Email et mot de passe avec sessions persistantes." },
    { title: "Écran détail", desc: "Macros complets et liens sortants vers Uber Eats ou Maps." },
  ],
};

const DATA_MODEL = {
  en: [
    { name: "brands", desc: "The chains, one to many to dishes." },
    { name: "categories", desc: "Dish form (burger, sushi), exactly one per dish." },
    { name: "dishes", desc: "The heart of the schema: name, calories, protein, sugar, brand_id, category_id, image_url." },
    { name: "tags", desc: "Cumulative properties (high_protein, spicy)." },
    { name: "dish_tags", desc: "Junction table for the many to many relationship between dishes and tags. Composite primary key." },
    { name: "favorites", desc: "Per user saved dishes, protected by Row Level Security." },
  ],
  fr: [
    { name: "brands", desc: "Les chaînes, en relation un à plusieurs avec les plats." },
    { name: "categories", desc: "Forme du plat (burger, sushi), exactement une par plat." },
    { name: "dishes", desc: "Le coeur du schéma : nom, calories, protéines, sucre, brand_id, category_id, image_url." },
    { name: "tags", desc: "Propriétés cumulatives (high_protein, spicy)." },
    { name: "dish_tags", desc: "Table de jonction pour la relation plusieurs à plusieurs entre plats et tags. Clé primaire composite." },
    { name: "favorites", desc: "Plats sauvegardés par utilisateur, protégés par Row Level Security." },
  ],
};

const LEARNINGS = {
  en: [
    { title: "Data integrity over speed", desc: 'I caught a bad value in my scraped Subway data (a tuna "sandwich" at 720 cal was actually a Power Bowl) by cross-checking the official PDF. Never trust a scraped source blindly; verify against the official one when a number looks off.' },
    { title: "Foreign keys constrain deletion order", desc: "Deleting dishes failed while dish_tags still referenced them. I learned to delete in dependency order, and why ON DELETE CASCADE exists." },
    { title: "Idempotent SQL", desc: "Re-running tag inserts threw duplicate-key errors until I used ON CONFLICT DO NOTHING. Now I write inserts to be safely re-runnable." },
    { title: "RLS is a two-way tool", desc: 'I first met Row Level Security as "why do my queries return nothing?", then used it deliberately to make sure a user can only ever read their own favorites.' },
    { title: "An agent must never outsmart its data", desc: "The AI returned a vegetarian tag that didn't exist in my database, which would return zero results. The fix: constrain the agent to only the tags actually populated. The agent reflects the data; it never exceeds it." },
    { title: "Keep secrets off the client", desc: "A mobile app can be inspected, so the Anthropic API key lives in a Supabase Edge Function, never in the app bundle." },
    { title: "Data reconciliation is the real work", desc: "Matching image URLs to dishes across sources with different naming conventions went from 50% to 100% match by building a rules-based normalizer with an ambiguity guard, so a wrong image never got linked." },
  ],
  fr: [
    { title: "L'intégrité des données passe avant la vitesse", desc: "J'ai attrapé une valeur erronée dans mes données Subway scrapées (un sandwich au thon à 720 cal était en fait un Power Bowl) en croisant avec le PDF officiel. Ne jamais faire confiance aveuglément à une source scrapée : vérifier contre l'officielle quand un chiffre semble louche." },
    { title: "Les clés étrangères contraignent l'ordre de suppression", desc: "La suppression de plats échouait tant que dish_tags les référençait encore. J'ai appris à supprimer dans l'ordre des dépendances, et pourquoi ON DELETE CASCADE existe." },
    { title: "SQL idempotent", desc: "Réexécuter des insertions de tags levait des erreurs de clé dupliquée jusqu'à ce que j'utilise ON CONFLICT DO NOTHING. Maintenant j'écris les insertions pour qu'elles puissent être relancées sans risque." },
    { title: "RLS est un outil dans les deux sens", desc: "J'ai d'abord rencontré Row Level Security comme \"pourquoi mes requêtes ne renvoient rien?\", puis je l'ai utilisé délibérément pour m'assurer qu'un utilisateur ne peut lire que ses propres favoris." },
    { title: "Un agent ne doit jamais dépasser ses données", desc: "L'IA a retourné un tag vegetarian qui n'existait pas dans ma base, ce qui aurait renvoyé zéro résultats. La correction : contraindre l'agent aux seuls tags réellement peuplés. L'agent reflète les données ; il ne les dépasse jamais." },
    { title: "Les secrets restent côté serveur", desc: "Une app mobile peut être inspectée, donc la clé API Anthropic vit dans une Edge Function Supabase, jamais dans le bundle de l'app." },
    { title: "La réconciliation des données est le vrai travail", desc: "Faire correspondre les URLs d'images aux plats entre des sources aux conventions de nommage différentes est passé de 50% à 100% grâce à un normaliseur à base de règles avec garde anti-ambiguité, pour qu'une mauvaise image ne soit jamais liée." },
  ],
};

const GALLERY = [
  { type: "image" as const, src: "/images/fuel/FUEL_demo.gif", alt: "FUEL app in motion", captionEn: "The app in motion", captionFr: "L'app en mouvement", contain: true },
  { type: "image" as const, src: "/images/fuel/discover.png", alt: "Discover screen", captionEn: "Discover screen with live sliders and filter chips", captionFr: "Écran de découverte avec sliders en direct et chips de filtres", contain: true },
  { type: "image" as const, src: "/images/fuel/agent.png", alt: "AI agent", captionEn: "The AI agent translating a natural language craving", captionFr: "L'agent IA qui traduit une envie exprimée en langage naturel", contain: true },
  { type: "image" as const, src: "/images/fuel/favorites.png", alt: "Favorites screen", captionEn: "Per user favorites, protected by RLS", captionFr: "Favoris par utilisateur, protégés par RLS", contain: true },
];

const STACK = [
  { category: "Frontend", items: ["React Native (Expo SDK 54)", "TypeScript", "Expo Router", "React Native Reanimated"] },
  { categoryFr: "Backend / DB", category: "Backend / DB", items: ["Supabase (PostgreSQL, Auth, RLS, Edge Functions)"] },
  { categoryFr: "Agent IA", category: "AI agent", items: ["Anthropic API (Claude Haiku)", "Supabase Edge Function (Deno)"] },
  { categoryFr: "Stockage", category: "Storage", items: ["AsyncStorage"] },
  { categoryFr: "Outillage", category: "Tooling", items: ["TypeScript", "ESLint", "sharp"] },
];

const ARCH_DIAGRAM = `Mobile app (React Native / Expo)
        │
        │  1. user types "spicy chicken under 500 cal"
        ▼
Supabase Edge Function  ──►  Anthropic API (Claude Haiku)
  (holds the API key,          returns structured JSON:
   never the app)              {tags:[spicy,chicken], calories_max:500}
        │
        │  2. JSON parsed, names mapped to IDs,
        │     merged with current filters
        ▼
Supabase Postgres  ──►  filtered dishes  ──►  list updates`;

export default function FuelPage({ locale }: { locale: string }) {
  const fr = locale === "fr";

  const gallery = GALLERY.map((item) => ({
    type: item.type,
    src: item.src,
    alt: item.alt,
    caption: fr ? item.captionFr : item.captionEn,
    contain: item.contain,
  }));

  return (
    <main style={{ paddingTop: "5rem" }}>
      {/* Hero */}
      <section className="py-16 border-b" style={{ borderColor: "rgba(255,42,157,0.1)" }}>
        <div className="section-wrapper">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[var(--pink)]"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {fr ? "← Projets" : "← Projects"}
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
                className="font-bold mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
              >
                <span className="gradient-text">FUEL</span>
              </motion.h1>
              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}
              >
                {fr
                  ? "Une app mobile de découverte alimentaire orientée nutrition pour les chaînes de restaurants, propulsée par un agent IA basé sur Claude."
                  : "A nutrition-first food discovery app for restaurant chains, powered by a Claude-based AI agent."}
              </motion.p>
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
                className="flex flex-wrap gap-3"
              >
                {[
                  { label: fr ? "Année" : "Year", value: "2026" },
                  { label: fr ? "Rôle" : "Role", value: fr ? "Projet solo" : "Solo project" },
                  { label: fr ? "Type" : "Type", value: fr ? "App mobile" : "Mobile app" },
                  { label: "Status", value: fr ? "Fonctionnelle, non publiée" : "Functional, unpublished" },
                ].map(({ label, value }) => (
                  <div key={label} className="px-4 py-2 rounded-xl text-sm"
                       style={{ background: "var(--bg-card)", border: "1px solid rgba(255,42,157,0.15)", fontFamily: "var(--font-mono)" }}>
                    <span style={{ color: "var(--text-muted)" }}>{label}: </span>
                    <span style={{ color: "var(--text-primary)" }}>{value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative rounded-2xl overflow-hidden border-glow"
              style={{ aspectRatio: "16/10", background: "var(--bg-surface)" }}
            >
              <Image
                src="/images/fuel/discover.png"
                alt="FUEL discover screen"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why I built this */}
      <section className="py-16">
        <div className="section-wrapper">
          <div className="max-w-2xl">
            <SectionLabel text={fr ? "Le contexte" : "The why"} />
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              {(fr ? [
                "En tant qu'étudiante en génie logiciel, j'ai commencé à sentir que je m'appuyais trop sur les outils d'IA pour faire le travail à ma place. FUEL est un exercice délibéré pour reconstruire l'habitude de comprendre ce que je construis : concevoir moi-même le modèle de données, raisonner sur les compromis, et écrire à la main les parties qui apprennent vraiment quelque chose.",
                "L'idée répond aussi à un vrai manque. Beaucoup d'apps suivent ce qu'on a mangé, mais presque aucune n'aide à décider quoi manger maintenant, à proximité, sous un budget macro donné. Les chaînes publient leurs données nutritionnelles complètes : un moteur de recherche orienté nutrition sur ces données est utile, et constructible par une seule personne.",
              ] : [
                "As a software engineering student, I noticed I was starting to lean too heavily on AI tools to do the work for me. FUEL was a deliberate exercise to rebuild the habit of understanding what I build: designing the data model myself, reasoning about trade offs, and writing by hand the parts that actually teach you something.",
                "The idea also answers a real gap. Plenty of apps track what you have eaten, but almost none help you decide what you can eat right now, near you, under your macro budget. Chains publish full nutrition data, so a nutrition-first search engine over that data is genuinely useful, and buildable by one person.",
              ]).map((p, i) => (
                <p key={i} className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <SectionLabel text={fr ? "Ce qu'elle fait" : "What it does"} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {(fr ? FEATURES.fr : FEATURES.en).map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.05}
                className="rounded-xl p-4"
                style={{ background: "var(--bg-card)", border: "1px solid rgba(255,42,157,0.12)" }}
              >
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-sm px-4 py-3 rounded-xl"
            style={{ color: "var(--cyan)", background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.2)", fontFamily: "var(--font-mono)", maxWidth: "480px" }}
          >
            {fr
              ? "FUEL ne gère pas les commandes. C'est la couche de décision qui vient avant Uber Eats."
              : "FUEL doesn't handle orders. It's the decision layer that comes before Uber Eats."}
          </motion.p>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <SectionLabel text={fr ? "Architecture en un coup d'oeil" : "Architecture at a glance"} />
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.pre
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-xs leading-relaxed p-6 rounded-2xl overflow-x-auto"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,42,157,0.15)",
                color: "var(--cyan)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {ARCH_DIAGRAM}
            </motion.pre>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              className="leading-relaxed self-center"
              style={{ color: "var(--text-secondary)" }}
            >
              {fr
                ? "L'idée centrale : l'agent ne produit jamais que les mêmes filtres que les contrôles manuels. C'est un traducteur devant un moteur de recherche existant, pas un second système. La clé API vit côté serveur dans l'Edge Function, donc elle n'est jamais expédiée dans le bundle mobile."
                : "The key idea: the agent only ever produces the same filters the manual controls do. It is a translator in front of an existing search engine, not a second system. The API key lives server side in the Edge Function, so it is never shipped inside the mobile bundle."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Data model */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <div className="max-w-2xl">
            <SectionLabel text={fr ? "Modèle de données" : "Data model"} />
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-3 mb-6"
            >
              {(fr ? DATA_MODEL.fr : DATA_MODEL.en).map((row) => (
                <div key={row.name} className="flex gap-4 text-sm">
                  <code
                    className="shrink-0 px-2 py-0.5 rounded text-xs self-start mt-0.5"
                    style={{ background: "rgba(255,42,157,0.1)", color: "var(--pink)", fontFamily: "var(--font-mono)" }}
                  >
                    {row.name}
                  </code>
                  <p style={{ color: "var(--text-secondary)" }}>{row.desc}</p>
                </div>
              ))}
            </motion.div>
            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {fr
                ? "Une règle de conception à laquelle je suis constamment revenue : la catégorie est ce qu'un plat est (exactement une, clé étrangère sur la ligne) ; les tags sont des propriétés qu'il a (plusieurs, table de jonction). Cette distinction a piloté tout le schéma, puis la logique de filtrage OR vs AND."
                : "A design rule I kept returning to: category is what a dish is (exactly one, foreign key on the row); tags are properties it has (several, junction table). That single distinction drove the whole schema, and later the OR vs AND filter logic."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <SectionLabel text={fr ? "Stack technique" : "Tech stack"} />
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {STACK.map(({ category, categoryFr, items }) => (
              <div key={category}>
                <p className="text-xs mb-3 tracking-wider uppercase"
                   style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {fr && categoryFr ? categoryFr : category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <span key={tech} className="text-sm px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(255,42,157,0.08)", color: "var(--pink)", border: "1px solid rgba(255,42,157,0.2)", fontFamily: "var(--font-mono)" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Things I learned */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <SectionLabel text={fr ? "Ce que j'ai appris à la dure" : "Things I learned the hard way"} />
          <div className="grid md:grid-cols-2 gap-4">
            {(fr ? LEARNINGS.fr : LEARNINGS.en).map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.07}
                className="rounded-2xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid rgba(255,42,157,0.12)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center font-bold"
                        style={{ background: "rgba(255,42,157,0.15)", color: "var(--pink)", fontFamily: "var(--font-mono)" }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <SectionLabel text={fr ? "Galerie" : "Gallery"} />
          <ProjectGallery items={gallery} />
        </div>
      </section>

      {/* Links */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <SectionLabel text={fr ? "Liens" : "Links"} />
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="https://github.com/anaelle00/FUEL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--pink), var(--violet))", color: "white", boxShadow: "0 0 20px rgba(255,42,157,0.25)", fontFamily: "var(--font-display)" }}
            >
              {fr ? "Voir le code" : "View code"} ↗
            </a>
            <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {fr ? "Fonctionne dans Expo Go avec les variables d'environnement requises." : "Runs on Expo Go with the required env variables."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Status */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <div className="max-w-2xl">
            <SectionLabel text={fr ? "Statut et suites possibles" : "Status and what could come next"} />
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-4"
            >
              {(fr ? [
                "FUEL est pleinement fonctionnelle sur la découverte, l'authentification, les favoris et l'agent IA. Elle n'est pas publiée sur les stores parce que c'est un projet personnel d'apprentissage, pas un produit destiné à être commercialisé.",
                "Pistes possibles pour la suite : géolocalisation avec PostGIS, plus de chaînes (le pipeline de collecte est réutilisable), un personnage de coach designé pour l'agent IA, et une touche de glow néon sur les valeurs nutritionnelles.",
              ] : [
                "FUEL is fully functional across discovery, auth, favorites and the AI agent. It is not published to app stores because it is a personal learning project, not a product I intend to ship commercially.",
                "Ideas I may explore next: geolocation with PostGIS, more chains (the collection pipeline is reusable), a designed coach character for the AI agent, and neon glow polish on the nutrition figures.",
              ]).map((p, i) => (
                <p key={i} className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.1)" }}>
        <div className="section-wrapper text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-[var(--pink)]"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            {fr ? "← Explorer d'autres projets" : "← Explore other projects"}
          </Link>
        </div>
      </section>
    </main>
  );
}
