import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Citation Opportunities Finder - Texavor";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
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
          Citation Opportunities Finder
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Find uncited claims and improve your E-E-A-T instantly
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
          <span>✓ Uncited Stats</span>
          <span>✓ Expert Claims</span>
          <span>✓ Impact Analysis</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
