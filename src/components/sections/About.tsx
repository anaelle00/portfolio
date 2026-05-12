"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ScrambleText from "@/components/animations/ScrambleText";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { value: parseInt(t("yearsValue")), label: t("stats.years"), suffix: "+" },
    { value: parseInt(t("projectsValue")), label: t("stats.projects"), suffix: "+" },
    { value: parseInt(t("techsValue")), label: t("stats.techs"), suffix: "+" },
  ];

  return (
    <section id="about" className="py-20">
      <div className="section-wrapper">
        {/* Section header */}
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
            <ScrambleText text="01. about" />
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0}
              className="text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("bio")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0.1}
              className="leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {t("bio2")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0.18}
              className="leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {t("bio3")}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0.25}
              className="grid grid-cols-3 gap-8 pt-6 border-t"
              style={{ borderColor: "rgba(255,42,157,0.12)" }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-3xl md:text-4xl font-bold mb-2 gradient-text"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            <div
              className="relative aspect-square rounded-2xl overflow-hidden border-glow w-full max-w-xs"
              style={{ background: "var(--bg-card)" }}
            >
              <Image
                src="/photo.jpeg"
                alt="Anaelle Mathe"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Corner accents */}
              {(["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"] as const).map(
                (pos) => (
                  <div
                    key={pos}
                    className={`absolute ${pos} w-5 h-5 m-3`}
                    style={{
                      borderTop: pos.includes("bottom") ? "none" : "1px solid var(--pink)",
                      borderBottom: pos.includes("top") ? "none" : "1px solid var(--pink)",
                      borderLeft: pos.includes("right") ? "none" : "1px solid var(--pink)",
                      borderRight: pos.includes("left") ? "none" : "1px solid var(--pink)",
                    }}
                  />
                )
              )}
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-2 px-4 py-2 rounded-xl text-xs"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,42,157,0.4)",
                color: "var(--cyan)",
                fontFamily: "var(--font-mono)",
                boxShadow: "0 0 20px rgba(0,240,255,0.2)",
              }}
            >
              &lt;software_engineer /&gt;
            </motion.div>
          </motion.div>
        </div>

        {/* What I value */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-20"
        >
          <p
            className="text-xs font-medium tracking-[0.3em] uppercase mb-8"
            style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}
          >
            {t("values.title")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: "code", icon: "⌨" },
              { key: "design", icon: "✦" },
              { key: "human", icon: "◎" },
            ].map(({ key, icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex items-start gap-4 rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(255,42,157,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,42,157,0.35)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(255,42,157,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,42,157,0.1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <span
                  className="text-2xl mt-0.5 shrink-0"
                  style={{ color: "var(--pink)" }}
                >
                  {icon}
                </span>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t(`values.${key}.label` as Parameters<typeof t>[0])}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {t(`values.${key}.desc` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
