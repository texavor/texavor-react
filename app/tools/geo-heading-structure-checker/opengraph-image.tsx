import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GEO Heading Structure Checker - Texavor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
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
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            background: "linear-gradient(to right, #10b981, #059669)",
            backgroundClip: "text",
            color: "transparent",
            margin: 0,
          }}
        >
          GEO Heading Structure Checker
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "#94a3b8",
            marginTop: 20,
          }}
        >
          Free H1-H6 Validator for AI Search Optimization
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
