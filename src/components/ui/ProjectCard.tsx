"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden border-glow flex flex-col h-full"
      style={{ background: "var(--bg-card)" }}
      data-cursor-hover
    >
      {/* Image placeholder */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ background: "var(--bg-surface)", height: "200px", flexShrink: 0 }}
      >
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={project.imageAlt ?? t(project.titleKey)}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-center"
          />
        ) : null}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255,42,157,0.1), rgba(0,240,255,0.08))",
          }}
        />
        {!project.imageSrc ? (
          <span
            className="text-6xl font-bold transition-opacity duration-300"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--pink)",
              opacity: 0.18,
            }}
          >
            {t(project.titleKey)[0]}
          </span>
        ) : null}
        <div
          className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to right, transparent, var(--pink), transparent)" }}
        />
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: "2rem", gap: "1.25rem" }}
      >
        <h3
          className="text-lg font-bold group-hover:text-[var(--pink)] transition-colors duration-200"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t(project.titleKey)}
        </h3>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {t(project.descriptionKey)}
        </p>

        {/* Stack chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: "0.7rem",
                padding: "0.3rem 0.65rem",
                borderRadius: "0.375rem",
                background: "rgba(255, 42, 157, 0.08)",
                color: "var(--pink)",
                border: "1px solid rgba(255,42,157,0.2)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.github && (
          <div style={{ paddingTop: "0.25rem" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {t("projects.viewCode")} ↗
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
