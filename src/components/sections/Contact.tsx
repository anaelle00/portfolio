"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ScrambleText from "@/components/animations/ScrambleText";
import LanguageToggle from "@/components/ui/LanguageToggle";

const EMAIL = "anaelle.mathe@etud.polymtl.ca";
const GITHUB = "https://github.com/anaelle00";
const LINKEDIN = "https://www.linkedin.com/in/anaelle-math%C3%A9";

export default function Contact() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <>
      <section id="contact" className="py-20">
        <div className="section-wrapper text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span
              className="text-xs font-medium tracking-[0.3em] uppercase mb-4 block"
              style={{ color: "var(--pink)", fontFamily: "var(--font-mono)" }}
            >
              <ScrambleText text="06. contact" />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold mb-6 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "var(--font-display)" }}
          >
            <span className="gradient-text">{t("title")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("subtitle")}
          </motion.p>

          {/* Availability disclaimer */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm mb-8"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            {t("availability")}
          </motion.p>

          {/* Email CTA */}
          <motion.a
            href={`mailto:${EMAIL}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-3 px-5 py-4 md:px-8 md:py-5 rounded-2xl text-sm md:text-xl font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(255,42,157,0.15), rgba(168,85,247,0.1))",
              border: "1px solid rgba(255,42,157,0.4)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-display)",
              boxShadow: "0 0 40px rgba(255,42,157,0.2)",
            }}
            data-cursor-hover
          >
            <span style={{ color: "var(--pink)" }}>✉</span>
            {EMAIL}
          </motion.a>

          {/* CV button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                border: "1px solid rgba(255,42,157,0.3)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-display)",
                background: "rgba(255,42,157,0.05)",
              }}
              data-cursor-hover
            >
              {t("downloadCv")} ↗
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-6"
          >
            {[
              { label: t("github"), href: GITHUB },
              { label: t("linkedin"), href: LINKEDIN },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:border-[var(--pink)]"
                style={{
                  color: "var(--text-secondary)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "var(--font-display)",
                }}
                data-cursor-hover
              >
                <span className="group-hover:text-[var(--pink)] transition-colors duration-200">
                  {label}
                </span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  ↗
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "rgba(255,42,157,0.1)" }}
      >
        <div className="section-wrapper flex items-center justify-between flex-wrap gap-4">
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            {tFooter("copyright")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/anaelle00/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors duration-200 hover:text-[var(--pink)]"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {tFooter("viewSource")} ↗
            </a>
            <LanguageToggle />
          </div>
        </div>
      </footer>
    </>
  );
}
