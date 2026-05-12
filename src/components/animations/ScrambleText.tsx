"use client";

import { useEffect, useRef, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

export default function ScrambleText({ text, className = "", delay = 0 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      iterRef.current = 0;
      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, idx) => {
              if (idx < iterRef.current) return char;
              if (char === " ") return " ";
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        iterRef.current += 1 / 3;
        if (iterRef.current >= text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 30);
      frameRef.current = interval;
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [text, delay]);

  return (
    <span className={className} style={{ fontFamily: "var(--font-mono)" }}>
      {display}
    </span>
  );
}
