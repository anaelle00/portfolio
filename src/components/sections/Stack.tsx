"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Marquee from "@/components/ui/Marquee";
import ScrambleText from "@/components/animations/ScrambleText";

const TIERS = [
  {
    labelEn: "Daily drivers",
    labelFr: "Outils quotidiens",
    color: "var(--pink)",
    speed: 30,
    items: ["TypeScript", "React", "Next.js", "Vercel", "Angular", "Tailwind CSS", "Git", "GitHub", "C++",  "Visual Studio", "Microsoft Office"],
  },
  {
    labelEn: "Solid foundation",
    labelFr: "Bases solides",
    color: "var(--cyan)",
    speed: 22,
    items: ["Node.js", "Figma", "PostgreSQL", "Python", "Supabase", "JavaScript", "REST APIs", "Stripe", "Express", "Prisma", "MongoDB"],
  },
  {
    labelEn: "Currently exploring",
    labelFr: "En cours d'exploration",
    color: "var(--text-muted)",
    speed: 16,
    items: ["Playwright", "Vitest", "GitHub Actions", "Java", "FastAPI", "C#"],
  },
];

export default function Stack({ locale }: { locale?: string }) {
  const t = useTranslations("stack");
  const fr = locale === "fr";

  return (
    <section id="stack" className="py-20 overflow-hidden">
      <div className="section-wrapper mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase mb-4 block"
            style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}
          >
            <ScrambleText text="04. stack" />
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("title")}
          </h2>
        </motion.div>
      </div>

      <div className="space-y-10">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.labelEn}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <p
              className="section-wrapper text-xs tracking-[0.25em] uppercase mb-3"
              style={{ color: tier.color, fontFamily: "var(--font-mono)" }}
            >
              {fr ? tier.labelFr : tier.labelEn}
            </p>
            <Marquee items={tier.items} speed={tier.speed} color={tier.color} />
          </motion.div>
        ))}
      </div>

      <div className="section-wrapper mt-12">
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(to right, transparent, var(--pink), transparent)" }}
        />
      </div>
    </section>
  );
}
