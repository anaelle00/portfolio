"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import ScrambleText from "@/components/animations/ScrambleText";

// ─── EDIT YOUR JOURNEY HERE ───────────────────────────────────────────────────
const EVENTS = [
  {
    year: "2022",
    title: "Polytechnique Montréal",
    titleFr: "Polytechnique Montréal",
    description: "Started the software engineering program. Dived into algorithms, systems programming, and full-stack development.",
    descriptionFr: "Début du programme de génie logiciel. Plongée dans les algorithmes, la programmation système et le développement full-stack.",
    location: "Montréal, Canada",
    tag: "Education",
    tagFr: "Formation",
  },
  {
    year: "2024",
    title: "CampusLift",
    titleFr: "CampusLift",
    description: "Co-built a carpooling platform for university students. From hackathon idea to a production-ready app.",
    descriptionFr: "Co-création d'une plateforme de covoiturage pour étudiants universitaires. D'une idée de hackathon à une app en production.",
    location: "Montréal, Canada",
    tag: "Project",
    tagFr: "Projet",
  },
  {
    year: "2025",
    title: "Exchange — Australia",
    titleFr: "Échange — Australie",
    description: "International exchange program. Broadening my technical and cultural horizons on the other side of the world.",
    descriptionFr: "Programme d'échange international. Élargissement de mes horizons techniques et culturels à l'autre bout du monde.",
    location: "Australia",
    tag: "Exchange",
    tagFr: "Échange",
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
  const description = locale === "fr" ? event.descriptionFr : event.description;
  const tag = locale === "fr" ? event.tagFr : event.tag;

  return (
    <div ref={ref} className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      {/* Dot on the line */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center"
      >
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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}
      >
        {isLeft ? (
          <Card year={event.year} title={title} description={description} location={event.location} tag={tag} />
        ) : (
          <div className="md:hidden">
            <Card year={event.year} title={title} description={description} location={event.location} tag={tag} />
          </div>
        )}
        {!isLeft && (
          <div className="hidden md:block">
            {/* right-side year label on desktop */}
            <span
              className="text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--pink)", opacity: 0.15 }}
            >
              {event.year}
            </span>
          </div>
        )}
        {isLeft && (
          <div className="hidden md:block">
            <span
              className="text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--pink)", opacity: 0.15 }}
            >
              {event.year}
            </span>
          </div>
        )}
      </motion.div>

      {/* Right side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={isLeft ? "md:pl-12" : "md:text-right md:pr-12 md:col-start-1 md:row-start-1"}
      >
        {!isLeft ? (
          <Card year={event.year} title={title} description={description} location={event.location} tag={tag} />
        ) : (
          <div className="hidden md:block">
            <span
              className="text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--pink)", opacity: 0.15 }}
            >
              {event.year}
            </span>
          </div>
        )}
        {isLeft && (
          <div className="md:hidden">
            <Card year={event.year} title={title} description={description} location={event.location} tag={tag} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Card({
  title,
  description,
  location,
  tag,
}: {
  year: string;
  title: string;
  description: string;
  location: string;
  tag: string;
}) {
  return (
    <div
      className="rounded-2xl border-glow p-6 text-left"
      style={{ background: "var(--bg-card)" }}
    >
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
        <span
          className="text-xs"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          📍 {location}
        </span>
      </div>
      <h3
        className="text-lg font-bold mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
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
        {/* Header */}
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
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("title")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line background */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "rgba(255,42,157,0.15)" }}
          />
          {/* Animated fill */}
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
