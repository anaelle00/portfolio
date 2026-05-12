"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./LanguageToggle";
import clsx from "clsx";

const navItems = ["about", "projects", "journey", "stack", "contact"] as const;

export default function Navigation() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "py-3"
            : "py-5"
        )}
        style={{
          background: scrolled
            ? "rgba(10, 10, 15, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,42,157,0.1)" : "none",
        }}
      >
        <div className="section-wrapper flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold tracking-tight text-lg hover:text-[var(--pink)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="gradient-text">AM</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-sm font-medium transition-colors duration-200 hover:text-[var(--pink)] relative group"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
              >
                {t(item)}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--pink)" }}
                />
              </button>
            ))}
            <LanguageToggle />
          </nav>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: "var(--pink)",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(4px, 4px)"
                        : i === 2
                        ? "rotate(-45deg) translate(4px, -4px)"
                        : "scaleX(0)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "rgba(10, 10, 15, 0.98)" }}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-3xl font-bold hover:text-[var(--pink)] transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t(item)}
              </button>
            ))}
            <LanguageToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
