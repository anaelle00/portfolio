"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
}

export default function ProjectGallery({ items }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!items.length) return null;

  const openLightbox = (i: number) => {
    if (items[i].type === "image") setLightboxIndex(i);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="relative rounded-xl overflow-hidden group cursor-pointer"
            style={{
              aspectRatio: "16/10",
              background: "var(--bg-surface)",
              border: "1px solid rgba(255,42,157,0.15)",
            }}
            onClick={() => openLightbox(i)}
          >
            {item.type === "image" ? (
              <>
                <Image
                  src={item.src}
                  alt={item.alt ?? ""}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  unoptimized={item.src.endsWith(".gif")}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(10,10,15,0.5)" }}
                >
                  <span style={{ color: "var(--pink)", fontSize: "1.5rem" }}>⊕</span>
                </div>
              </>
            ) : (
              <video
                src={item.src}
                controls
                className="w-full h-full object-cover"
                style={{
                  accentColor: "var(--pink)",
                }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {item.caption && (
              <div
                className="absolute bottom-0 inset-x-0 px-3 py-2 text-xs translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{
                  background: "rgba(10,10,15,0.85)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && items[lightboxIndex].type === "image" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,10,15,0.95)" }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={items[lightboxIndex].src}
                  alt={items[lightboxIndex].alt ?? ""}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  unoptimized={items[lightboxIndex].src.endsWith(".gif")}
                />
              </div>
              {items[lightboxIndex].caption && (
                <div
                  className="text-center py-3 text-sm"
                  style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {items[lightboxIndex].caption}
                </div>
              )}
            </motion.div>

            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,42,157,0.15)", border: "1px solid rgba(255,42,157,0.3)", color: "var(--pink)" }}
                >
                  ←
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,42,157,0.15)", border: "1px solid rgba(255,42,157,0.3)", color: "var(--pink)" }}
                >
                  →
                </button>
              </>
            )}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)", color: "var(--text-muted)" }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
