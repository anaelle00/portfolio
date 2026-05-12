"use client";

import { useEffect, useRef, ElementType } from "react";
import { gsap } from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  as: Tag = "span",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll(".char"));
    gsap.set(chars, { y: "100%", opacity: 0 });
    gsap.to(chars, {
      y: "0%",
      opacity: 1,
      duration: 0.7,
      stagger,
      delay,
      ease: "power3.out",
    });
  }, [delay, stagger, text]);

  return (
    <Tag ref={containerRef as React.LegacyRef<never>} className={`overflow-hidden inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          aria-hidden="true"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </Tag>
  );
}
