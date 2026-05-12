"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import ScrambleText from "@/components/animations/ScrambleText";

// ─── EDIT YOUR JOURNEY HERE ───────────────────────────────────────────────────
const EVENTS = [
  {
    year: "2026",
    yearDisplay: "Jul — Nov 2026",
    yearDisplayFr: "Juil — Nov 2026",
    title: "University of Technology Sydney",
    titleFr: "University of Technology Sydney",
    subtitle: "International Exchange",
    subtitleFr: "Échange international",
    description: "Software engineering exchange broadening technical and cultural horizons on the other side of the world.",
    descriptionFr: "Échange en génie logiciel à l'UTS, élargissement des horizons techniques et culturels à l'autre bout du monde.",
    location: "Sydney, Australia",
    tag: "Exchange",
    tagFr: "Échange",
  },
  {
    year: "2024",
    yearDisplay: "2024 — present",
    yearDisplayFr: "2024 — présent",
    title: "Polytechnique Montréal",
    titleFr: "Polytechnique Montréal",
    subtitle: "Software Engineering · Distinction",
    subtitleFr: "Génie logiciel · Mention d'excellence",
    description: "Algorithms, systems programming, full-stack development, and embedded systems.",
    descriptionFr: "Algorithmes, programmation système, développement full-stack et systèmes embarqués.",
    location: "Montréal, QC",
    tag: "Education",
    tagFr: "Formation",
  },
  {
    year: "2023",
    yearDisplay: "2023 — 2024",
    yearDisplayFr: "2023 — 2024",
    title: "Polytechnique Montréal",
    titleFr: "Polytechnique Montréal",
    subtitle: "Preparatory Year",
    subtitleFr: "Année préparatoire",
    description: "Foundations in mathematics, physics, and computer science.",
    descriptionFr: "Fondements en mathématiques, physique et informatique.",
    location: "Montréal, QC",
    tag: "Education",
    tagFr: "Formation",
  },
  {
    year: "2020",
    yearDisplay: "2020 — 2023",
    yearDisplayFr: "2020 — 2023",
    title: "Lycée Saint-Paul — Angoulême",
    titleFr: "Lycée Saint-Paul — Angoulême",
    subtitle: "Baccalauréat · Mention Très Bien",
    subtitleFr: "Baccalauréat · Mention Très Bien",
    description: "French scientific baccalauréat with highest honors.",
    descriptionFr: "Baccalauréat scientifique avec mention très bien.",
    location: "Angoulême, France",
    tag: "Education",
    tagFr: "Formation",
  },
];
// ──────────────────────────────────────────────────────────────────────────────

function TimelineItem({
  event,
  index,
  locale,
}: {
  event: (typeof EVENTS)[0];
  index: number;
  locale: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  const title = locale === "fr" ? event.titleFr : event.title;
  const subtitle = locale === "fr" ? event.subtitleFr : event.subtitle;
  const description = locale === "fr" ? event.descriptionFr : event.description;
  const tag = locale === "fr" ? event.tagFr : event.tag;
  const yearDisplay = locale === "fr" ? event.yearDisplayFr : event.yearDisplay;

  return (
    <div ref={ref} className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      {/* Dot on the line */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-4 h-4 rounded-full border-2"
          style={{
            background: "var(--bg-deep)",
            borderColor: "var(--pink)",
            boxShadow: "0 0 12px rgba(255,42,157,0.6)",
          }}
        />
      </div>

      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}
      >
        {isLeft ? (
          <Card title={title} subtitle={subtitle} description={description} location={event.location} tag={tag} yearDisplay={yearDisplay} />
        ) : (
          <div className="md:hidden">
            <Card title={title} subtitle={subtitle} description={description} location={event.location} tag={tag} yearDisplay={yearDisplay} />
          </div>
        )}
        {!isLeft && (
          <div className="hidden md:block">
            <span className="text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--pink)", opacity: 0.15 }}>
              {event.year}
            </span>
          </div>
        )}
        {isLeft && (
          <div className="hidden md:block">
            <span className="text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--pink)", opacity: 0.15 }}>
              {event.year}
            </span>
          </div>
        )}
      </motion.div>

      {/* Right side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={isLeft ? "md:pl-12" : "md:text-right md:pr-12 md:col-start-1 md:row-start-1"}
      >
        {!isLeft ? (
          <Card title={title} subtitle={subtitle} description={description} location={event.location} tag={tag} yearDisplay={yearDisplay} />
        ) : (
          <div className="hidden md:block">
            <span className="text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--pink)", opacity: 0.15 }}>
              {event.year}
            </span>
          </div>
        )}
        {isLeft && (
          <div className="md:hidden">
            <Card title={title} subtitle={subtitle} description={description} location={event.location} tag={tag} yearDisplay={yearDisplay} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  description,
  location,
  tag,
  yearDisplay,
}: {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  tag: string;
  yearDisplay: string;
}) {
  return (
    <div className="rounded-2xl border-glow p-6 text-left" style={{ background: "var(--bg-card)" }}>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="text-xs px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(255,42,157,0.1)",
            color: "var(--pink)",
            border: "1px solid rgba(255,42,157,0.25)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {tag}
        </span>
        <span className="text-xs" style={{ color: "var(--pink)", fontFamily: "var(--font-mono)", opacity: 0.7 }}>
          {yearDisplay}
        </span>
        <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          📍 {location}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <p className="text-sm mb-2" style={{ color: "var(--pink)", fontFamily: "var(--font-mono)", opacity: 0.85 }}>
        {subtitle}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>
    </div>
  );
}

export default function Journey({ locale }: { locale: string }) {
  const t = useTranslations("journey");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section id="journey" className="py-20">
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase mb-4 block"
            style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}
          >
            <ScrambleText text={t("label")} />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {t("title")}
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "rgba(255,42,157,0.15)" }}
          />
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top hidden md:block"
            style={{ background: "var(--pink)", scaleY, boxShadow: "0 0 8px rgba(255,42,157,0.5)" }}
          />
          <div className="flex flex-col gap-16">
            {EVENTS.map((event, i) => (
              <TimelineItem key={i} event={event} index={i} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
