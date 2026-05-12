"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrambleText from "@/components/animations/ScrambleText";

export default function Projects() {
  const t = useTranslations();
  const featured = projects.find((p) => p.featured);
  const grid = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20">
      <div className="section-wrapper">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase mb-4 block"
            style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}
          >
            <ScrambleText text="02. projects" />
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("projects.title")}
          </h2>
        </motion.div>

        {/* Featured project */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <div
              className="relative rounded-3xl overflow-hidden border-glow group"
              style={{ background: "var(--bg-card)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(255,42,157,0.04), rgba(0,240,255,0.02))",
                }}
              />

              <div className="relative grid md:grid-cols-2">
                {/* Image side */}
                <div
                  className="relative h-72 md:h-auto min-h-[280px] flex items-center justify-center overflow-hidden"
                  style={{ background: "var(--bg-surface)" }}
                >
                  {featured.imageSrc ? (
                    <Image
                      src={featured.imageSrc}
                      alt={featured.imageAlt ?? t(featured.titleKey)}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center"
                      priority
                    />
                  ) : null}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,42,157,0.12) 0%, rgba(168,85,247,0.08) 50%, rgba(0,240,255,0.08) 100%)",
                    }}
                  />
                  {!featured.imageSrc ? (
                    <span
                      className="relative text-7xl font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "var(--pink)", opacity: 0.3 }}
                    >
                      CL
                    </span>
                  ) : null}
                  <div
                    className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs"
                    style={{
                      background: "rgba(255,42,157,0.15)",
                      color: "var(--pink)",
                      border: "1px solid rgba(255,42,157,0.3)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ★ {t("projects.featured")}
                  </div>
                </div>

                {/* Content side */}
                <div className="p-12 md:p-16 flex flex-col justify-center gap-8">
                  <h3
                    className="text-2xl md:text-3xl font-bold group-hover:text-[var(--pink)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t(featured.titleKey)}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {t(featured.descriptionKey as Parameters<typeof t>[0])}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featured.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 rounded-full"
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
                  <div className="flex gap-4 pt-2 flex-wrap">
                    <a
                      href={`/projects/${featured.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, var(--pink), var(--violet))",
                        color: "white",
                        boxShadow: "0 0 20px rgba(255,42,157,0.3)",
                        fontFamily: "var(--font-display)",
                      }}
                      data-cursor-hover
                    >
                      {t("projects.learnMore")} →
                    </a>
                    {featured.demo && (
                      <a
                        href={featured.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                        style={{
                          border: "1px solid rgba(255,42,157,0.35)",
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-display)",
                        }}
                        data-cursor-hover
                      >
                        {t("projects.viewDemo")} ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {grid.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
