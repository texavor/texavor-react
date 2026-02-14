import { ImageResponse } from "next/og";
import { getDocData } from "@/lib/docs";

export const runtime = "nodejs";

export const alt = "Texavor Documentation";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const doc = getDocData(slug);

  const title = doc?.title || "Texavor Documentation";
  const category = doc?.category ? doc.category.replace("-", " ") : "Guide";

  // Brand Colors
  const bgDark = "#104127"; // Primary Green
  const bgDarker = "#0d3520";
  const accent = "#ffffff";
  const textMuted = "#dcfce7";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgDark,
        backgroundImage: `linear-gradient(to top right, ${bgDark}, ${bgDarker})`,
        position: "relative",
      }}
    >
      {/* Radial Gradient overlay simulation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
          padding: "40px 80px",
        }}
      >
        {/* Icon / Brand Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50px",
            padding: "12px 24px",
            marginBottom: "40px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: textMuted,
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          TEXAVOR • {category.toUpperCase()}
        </div>

        {/* Title */}
        <div
          style={{
            color: accent,
            fontSize: 80,
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "30px",
            textShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: textMuted,
            fontSize: 32,
            maxWidth: "800px",
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          Optimize your visibility in AI Search (GEO)
        </div>
      </div>

      {/* Branding Bottom Right */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          color: "rgba(255,255,255,0.5)",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.05em",
        }}
      >
        TEXAVOR.COM
      </div>
    </div>,
    {
      ...size,
    },
  );
}
