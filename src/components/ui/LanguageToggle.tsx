"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
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
      {routing.locales.map((l, i) => (
        <span key={l}>
          {i > 0 && <span style={{ color: "var(--text-muted)" }}> / </span>}
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
    </button>
  );
}
