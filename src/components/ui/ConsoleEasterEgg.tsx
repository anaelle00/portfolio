"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%c\n  Hey curious dev 👀\n  Liked the code? Source: https://github.com/anaelle00/portfolio\n  Built with Next.js, GSAP, Lenis & a lot of ☕\n",
      "color: #ff2a9d; font-size: 14px; font-family: monospace;"
    );
  }, []);
  return null;
}
