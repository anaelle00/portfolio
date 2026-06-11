import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anaelle Mathe | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow — pink */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "#ff2a9d",
            filter: "blur(160px)",
            opacity: 0.22,
          }}
        />
        {/* Background glow — cyan */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "#00f0ff",
            filter: "blur(140px)",
            opacity: 0.14,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Decorative tag */}
          <div
            style={{
              fontSize: 18,
              color: "#ff2a9d",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              opacity: 0.9,
            }}
          >
            &lt;software_engineer /&gt;
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              background: "linear-gradient(135deg, #ff2a9d 0%, #a855f7 50%, #00f0ff 100%)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.05,
              textAlign: "center",
            }}
          >
            Anaelle Mathe
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: "#8b8b9e",
              letterSpacing: "0.05em",
              fontFamily: "sans-serif",
            }}
          >
            Software Engineer · Montréal
          </div>

          {/* Divider */}
          <div
            style={{
              width: 120,
              height: 2,
              background: "linear-gradient(to right, transparent, #ff2a9d, transparent)",
              marginTop: 8,
            }}
          />

          {/* Stack hint */}
          <div
            style={{
              fontSize: 16,
              color: "#5a5a6e",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
            }}
          >
            Next.js · TypeScript · React · Supabase
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
