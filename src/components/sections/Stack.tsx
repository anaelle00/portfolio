"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Marquee from "@/components/ui/Marquee";
import ScrambleText from "@/components/animations/ScrambleText";

const STACK_ITEMS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "Supabase",
  "Git",
  "Docker",
  "REST APIs",
  "GraphQL",
  "Framer Motion",
  "GSAP",
  "Figma",
  "Vercel",
];

const STACK_ITEMS_2 = [
  "Java",
  "Spring Boot",
  "MongoDB",
  "Redis",
  "AWS",
  "CI/CD",
  "Jest",
  "Vitest",
  "Prisma",
  "Express",
  "FastAPI",
  "Linux",
  "Bash",
  "VSCode",
  "GitHub Actions",
];

export default function Stack() {
  const t = useTranslations("stack");

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

      {/* Marquee rows */}
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Marquee items={STACK_ITEMS} speed={25} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Marquee items={STACK_ITEMS_2} speed={35} />
        </motion.div>
      </div>

      {/* Decorative divider */}
      <div className="section-wrapper mt-12">
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(to right, transparent, var(--pink), transparent)",
          }}
        />
      </div>
    </section>
  );
}
