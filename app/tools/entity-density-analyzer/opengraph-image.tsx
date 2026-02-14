import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Entity Density Analyzer - Texavor";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
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
          Entity Density Analyzer
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Analyze entity salience and optimize for semantic SEO
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
          <span>✓ Entity Recognition</span>
          <span>✓ Salience Scoring</span>
          <span>✓ Schema Tips</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
