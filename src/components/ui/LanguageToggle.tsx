"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { routing } from "@/i18n/routing";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [switching, setSwitching] = useState(false);

  const toggleLocale = async () => {
    if (switching) return;
    setSwitching(true);
    await new Promise((r) => setTimeout(r, 120));
    const nextLocale = locale === "en" ? "fr" : "en";
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || "/");
  };

  return (
    <button
      onClick={toggleLocale}
      className="font-mono text-xs tracking-widest transition-colors duration-200 hover:text-[var(--pink)]"
      style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
      aria-label="Toggle language"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          style={{ display: "inline-flex", gap: "0.25rem", alignItems: "center" }}
        >
          {routing.locales.map((l, i) => (
            <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              {i > 0 && <span style={{ color: "var(--text-muted)" }}>/</span>}
              <span
                style={{
                  color: l === locale ? "var(--pink)" : undefined,
                  fontWeight: l === locale ? 700 : 400,
                }}
              >
                {l.toUpperCase()}
              </span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
