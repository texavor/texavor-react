import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Schema Markup Validator - Validate JSON-LD & Get AEO Insights";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #104127 0%, #0d3520 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Tool Name */}
      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color: "white",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Schema Markup Validator
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 36,
          color: "#a7f3d0",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        Validate JSON-LD &amp; Get AEO Insights
      </div>

      {/* Branding */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 28,
          color: "#d1fae5",
          fontWeight: 600,
        }}
      >
        Texavor.com
      </div>
    </div>,
    {
      ...size,
    },
  );
}
