import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alt Text Checker - Texavor";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
          }}
        >
          Alt Text Checker
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Audit images for WCAG compliance and visual search SEO
        </p>
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            gap: 30,
          }}
        >
          <span>✓ WCAG Accessibility</span>
          <span>✓ Google Lens Ready</span>
          <span>✓ AI Suggestions</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
