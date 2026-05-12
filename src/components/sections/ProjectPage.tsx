"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProjectGallery, { GalleryItem } from "@/components/ui/ProjectGallery";

export interface ProjectData {
  slug: string;
  titleEn: string;
  titleFr: string;
  taglineEn: string;
  taglineFr: string;
  year: string;
  role: string;
  roleFr: string;
  type: string;
  typeFr: string;
  status: string;
  statusFr: string;
  github?: string;
  demo?: string;
  imageSrc?: string;
  contextEn: string;
  contextFr: string;
  myRoleEn: string;
  myRoleFr: string;
  stack: { category: string; items: string[] }[];
  challenges: {
    challengeEn: string;
    challengeFr: string;
    approachEn: string;
    approachFr: string;
    outcomeEn: string;
    outcomeFr: string;
  }[];
  gallery: GalleryItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

interface Props {
  data: ProjectData;
  locale: string;
}

export default function ProjectPage({ data, locale }: Props) {
  const t = useTranslations("projects");
  const fr = locale === "fr";

  const title = fr ? data.titleFr : data.titleEn;
  const tagline = fr ? data.taglineFr : data.taglineEn;
  const context = fr ? data.contextFr : data.contextEn;
  const myRole = fr ? data.myRoleFr : data.myRoleEn;
  const role = fr ? data.roleFr : data.role;
  const type = fr ? data.typeFr : data.type;
  const status = fr ? data.statusFr : data.status;

  return (
    <main style={{ paddingTop: "5rem" }}>
      {/* Hero */}
      <section className="py-16 border-b" style={{ borderColor: "rgba(255,42,157,0.1)" }}>
        <div className="section-wrapper">
          {/* Breadcrumb */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[var(--pink)]"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              ← {fr ? "Projets" : "Projects"}
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="font-bold mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: 1.1,
                }}
              >
                <span className="gradient-text">{title}</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
                className="text-lg mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {tagline}
              </motion.p>

              {/* Quick info bar */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
                className="flex flex-wrap gap-3"
              >
                {[
                  { label: fr ? "Année" : "Year", value: data.year },
                  { label: fr ? "Rôle" : "Role", value: role },
                  { label: fr ? "Type" : "Type", value: type },
                  { label: "Status", value: status },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="px-4 py-2 rounded-xl text-sm"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid rgba(255,42,157,0.15)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>{label}: </span>
                    <span style={{ color: "var(--text-primary)" }}>{value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero image */}
            {data.imageSrc && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="relative rounded-2xl overflow-hidden border-glow"
                style={{ aspectRatio: "16/10", background: "var(--bg-surface)" }}
              >
                <Image
                  src={data.imageSrc}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="py-16">
        <div className="section-wrapper">
          <div className="max-w-2xl">
            <SectionLabel text={fr ? "Le contexte" : "The why"} />
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {context.split("\n\n").map((p, i) => (
                <p key={i} className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {p}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* My role */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <div className="max-w-2xl">
            <SectionLabel text={fr ? "Mon rôle" : "My role"} />
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {myRole.split("\n\n").map((p, i) => (
                <p key={i} className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {p}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <SectionLabel text={fr ? "Stack technique" : "Tech stack"} />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {data.stack.map(({ category, items }) => (
              <div key={category}>
                <p
                  className="text-xs mb-3 tracking-wider uppercase"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(255,42,157,0.08)",
                        color: "var(--pink)",
                        border: "1px solid rgba(255,42,157,0.2)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Challenges */}
      {data.challenges.length > 0 && (
        <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
          <div className="section-wrapper">
            <SectionLabel text={fr ? "Défis & apprentissages" : "Challenges & learnings"} />
            <div className="flex flex-col gap-6">
              {data.challenges.map((c, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(255,42,157,0.12)",
                  }}
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p
                        className="text-xs mb-2 tracking-wider uppercase"
                        style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}
                      >
                        {fr ? "Défi" : "Challenge"}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {fr ? c.challengeFr : c.challengeEn}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs mb-2 tracking-wider uppercase"
                        style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}
                      >
                        {fr ? "Approche" : "Approach"}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {fr ? c.approachFr : c.approachEn}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs mb-2 tracking-wider uppercase"
                        style={{ color: "#00f064", fontFamily: "var(--font-mono)" }}
                      >
                        {fr ? "Résultat" : "Outcome"}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {fr ? c.outcomeFr : c.outcomeEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {data.gallery.length > 0 && (
        <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
          <div className="section-wrapper">
            <SectionLabel text={fr ? "Galerie" : "Gallery"} />
            <ProjectGallery items={data.gallery} />
          </div>
        </section>
      )}

      {/* Links */}
      <section className="py-16 border-t" style={{ borderColor: "rgba(255,42,157,0.08)" }}>
        <div className="section-wrapper">
          <SectionLabel text={fr ? "Liens" : "Links"} />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, var(--pink), var(--violet))",
                  color: "white",
                  boxShadow: "0 0 20px rgba(255,42,157,0.25)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {fr ? "Voir le code" : "View code"} ↗
              </a>
            )}
            {data.demo && (
              <a
                href={data.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  border: "1px solid rgba(255,42,157,0.35)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {fr ? "Démo live" : "Live demo"} ↗
              </a>
            )}
          </motion.div>
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
            ← {fr ? "Explorer d'autres projets" : "Explore other projects"}
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p
      className="text-xs font-medium tracking-[0.3em] uppercase mb-8"
      style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}
    >
      {text}
    </p>
  );
}
