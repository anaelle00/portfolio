"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function useScramble(target: string, active: boolean) {
  const [text, setText] = useState(target);

  useEffect(() => {
    if (!active) { setText(target); return; }
    let iter = 0;
    const interval = setInterval(() => {
      setText(
        target.split("").map((char, i) => {
          if (i < iter) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      iter += 0.5;
      if (iter >= target.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [target, active]);

  return text;
}

export default function NotFound() {
  const [scramble, setScramble] = useState(false);

  useEffect(() => {
    setScramble(true);
    const t = setTimeout(() => setScramble(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const msgEn = useScramble("This page has been disconnected from the grid", scramble);
  const msgFr = useScramble("Cette page a été déconnectée du réseau", scramble);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Scanlines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,42,157,0.015) 2px, rgba(255,42,157,0.015) 4px)",
        }}
      />

      <div className="relative z-10 max-w-lg">
        {/* 404 with glitch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative mb-6 select-none"
        >
          <span
            className="font-bold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(6rem, 20vw, 12rem)",
              lineHeight: 1,
              background: "linear-gradient(135deg, #ff2a9d, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </span>
          {/* Glitch layers */}
          <motion.span
            aria-hidden
            className="absolute inset-0 font-bold flex items-center justify-center"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(6rem, 20vw, 12rem)",
              lineHeight: 1,
              color: "#00f0ff",
              opacity: 0.4,
              clipPath: "inset(30% 0 50% 0)",
            }}
            animate={{ x: [-3, 3, -3], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2.5 }}
          >
            404
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute inset-0 font-bold flex items-center justify-center"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(6rem, 20vw, 12rem)",
              lineHeight: 1,
              color: "#ff2a9d",
              opacity: 0.3,
              clipPath: "inset(60% 0 10% 0)",
            }}
            animate={{ x: [3, -3, 3], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2.5, delay: 0.05 }}
          >
            404
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p
            className="text-sm mb-1"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
          >
            {msgEn}
          </p>
          <p
            className="text-sm mb-10"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            {msgFr}
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--pink), var(--violet))",
              color: "white",
              boxShadow: "0 0 24px rgba(255,42,157,0.35)",
              fontFamily: "var(--font-display)",
            }}
          >
            ← Back to base / Retour à la base
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
