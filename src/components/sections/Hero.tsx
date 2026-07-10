"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ScrambleText from "@/components/animations/ScrambleText";

const TYPEWRITER_SPEED = 80;
const PAUSE = 1800;
const DELETE_SPEED = 40;

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) {
            setTimeout(() => setIsDeleting(true), PAUSE);
          }
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      isDeleting ? DELETE_SPEED : TYPEWRITER_SPEED
    );
    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words]);

  return text;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function Hero() {
  const t = useTranslations("hero");
  const roles = t.raw("roles") as string[];
  const typewriterText = useTypewriter(roles);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient orbs — inline styles to guarantee rendering */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "#ff2a9d",
          filter: "blur(140px)",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "20%",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background: "#00f0ff",
          filter: "blur(120px)",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background: "#a855f7",
          filter: "blur(180px)",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="section-wrapper relative z-10"
        style={{ textAlign: "center" }}
      >
        {/* Greeting */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
          <span
            style={{
              color: "var(--pink)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "1.5rem",
            }}
          >
            <ScrambleText text={t("greeting")} delay={0.4} />
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.45}>
          <h1
            className="hero-title gradient-text text-glow-pink"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "1.25rem" }}
          >
            {t("name")}
          </h1>
        </motion.div>

        {/* Availability badge + location */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              borderRadius: "9999px",
              background: "rgba(0,240,100,0.08)",
              border: "1px solid rgba(0,240,100,0.25)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "#00f064",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#00f064", flexShrink: 0 }}
            />
            {t("availability")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
            }}
          >
            📍 {t("location")}
          </span>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.65}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              minHeight: "2rem",
              marginBottom: "1rem",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontWeight: 500,
              color: "var(--text-secondary)",
            }}
          >
            <span>{typewriterText}</span>
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.5rem",
                background: "var(--pink)",
                animation: "pulse 1s infinite",
              }}
            />
          </div>
          <p
            style={{
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.75,
              color: "var(--text-muted)",
              fontSize: "1rem",
            }}
          >
            {t("tagline")}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.85}
          style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}
        >
          <button
            onClick={scrollToAbout}
            className="group inline-flex items-center gap-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, var(--pink), var(--violet))",
              color: "white",
              padding: "1rem 2rem",
              fontSize: "0.875rem",
              boxShadow: "0 0 32px rgba(255,42,157,0.35)",
              fontFamily: "var(--font-display)",
              border: "none",
              cursor: "none",
            }}
            data-cursor-hover
          >
            {t("scrollHint")}
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </button>
          <a
            href="/cv.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{
              padding: "1rem 2rem",
              fontSize: "0.875rem",
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
              border: "1px solid rgba(255,42,157,0.35)",
              background: "rgba(255,42,157,0.05)",
              cursor: "none",
            }}
            data-cursor-hover
          >
            {t("downloadCv")} ↗
          </a>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          style={{
            width: "1px",
            height: "3rem",
            background: "linear-gradient(to bottom, var(--pink), transparent)",
          }}
          animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
