import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anaellemathe.dev"),
  title: "Anaelle Mathe — Software Engineer · Montréal",
  description:
    "Software engineering student at Polytechnique Montréal. Full-stack developer — Next.js, Supabase, TypeScript.",
  keywords: [
    "software engineer",
    "web developer",
    "Next.js",
    "React",
    "TypeScript",
    "Polytechnique Montréal",
    "portfolio",
    "full-stack",
    "Anaelle Mathe",
  ],
  authors: [{ name: "Anaelle Mathe" }],
  creator: "Anaelle Mathe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anaellemathe.dev",
    title: "Anaelle Mathe — Software Engineer · Montréal",
    description:
      "Software engineering student at Polytechnique Montréal. Full-stack developer — Next.js, Supabase, TypeScript.",
    siteName: "Anaelle Mathe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anaelle Mathe — Software Engineer · Montréal",
    description:
      "Software engineering student at Polytechnique Montréal. Full-stack developer — Next.js, Supabase, TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
