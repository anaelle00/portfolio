"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  color?: string;
}

export default function Marquee({ items, speed = 30, color = "var(--pink)" }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-medium flex items-center gap-3"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
          >
            <span style={{ color }}>◆</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
