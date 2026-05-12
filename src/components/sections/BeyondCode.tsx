"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ScrambleText from "@/components/animations/ScrambleText";

const ENGAGEMENTS = [
  { key: "eai", icon: "🌱" },
  { key: "climate", icon: "🌍" },
  { key: "datathon", icon: "📊" },
];

const PASSIONS = [
  { key: "art", icon: "🎨" },
  { key: "music", icon: "🥁" },
  { key: "dance", icon: "💃" },
];

function ItemCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4 rounded-2xl p-5 transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(255,42,157,0.1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,42,157,0.35)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(255,42,157,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,42,157,0.1)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
      }}
    >
      <span className="text-2xl mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function BeyondCode() {
  const t = useTranslations("beyond");

  return (
    <section id="beyond" className="py-20">
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
            <ScrambleText text={t("label")} />
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("title")}
          </h2>
          <p style={{ color: "var(--text-muted)" }}>{t("subtitle")}</p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Column 1 — Engagements */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}
            >
              {t("engagements")}
            </p>
            <div className="flex flex-col gap-4">
              {ENGAGEMENTS.map(({ key, icon }, i) => (
                <ItemCard
                  key={key}
                  icon={icon}
                  title={t(`items.${key}.title` as Parameters<typeof t>[0])}
                  desc={t(`items.${key}.desc` as Parameters<typeof t>[0])}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>

          {/* Column 2 — Passions */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}
            >
              {t("passions")}
            </p>
            <div className="flex flex-col gap-4">
              {PASSIONS.map(({ key, icon }, i) => (
                <ItemCard
                  key={key}
                  icon={icon}
                  title={t(`items.${key}.title` as Parameters<typeof t>[0])}
                  desc={t(`items.${key}.desc` as Parameters<typeof t>[0])}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
