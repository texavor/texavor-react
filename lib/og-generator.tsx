import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Brand Colors
const bgDark = "#104127";
const bgDarker = "#0d3520";
const accent = "#ffffff";
const textMuted = "#dcfce7"; // green-50/90 approx

interface GenerateOgImageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export async function generateOgImage({
  title,
  description,
  icon,
}: GenerateOgImageProps) {
  // Load Fonts
  const poppinsBlack = await fetch(
    new URL(
      "https://unpkg.com/@fontsource/poppins@latest/files/poppins-latin-900-normal.woff",
    ),
  ).then((res) => res.arrayBuffer());

  const interMedium = await fetch(
    new URL(
      "https://unpkg.com/@fontsource/inter@latest/files/inter-latin-500-normal.woff",
    ),
  ).then((res) => res.arrayBuffer());

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
      {/* Radial Gradient overlay simulation via absolute div */}
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

      {/* Content Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
          padding: "40px 40px",
          maxWidth: "1100px", // Increased width
          width: "100%",
        }}
      >
        {/* Icon (Optional) */}
        {icon && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
              padding: "20px",
              borderRadius: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {icon}
          </div>
        )}

        {/* Huge Title - Poppins */}
        <div
          style={{
            color: accent,
            fontSize: 110,
            fontWeight: 900,
            fontFamily: '"Poppins"',
            lineHeight: 0.9,
            marginBottom: "30px",
            textShadow: "0 4px 12px rgba(0,0,0,0.2)",
            letterSpacing: "-0.03em",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        {/* Description - Inter */}
        {description && (
          <div
            style={{
              color: textMuted,
              fontSize: 48,
              fontWeight: 500,
              fontFamily: '"Inter"',
              lineHeight: 1.3,
              opacity: 0.9,
              maxWidth: "1000px", // Increased width specific for description
            }}
          >
            {description}
          </div>
        )}
      </div>

      {/* Branding Bottom Right */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          opacity: 0.8,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.05em",
            fontFamily: '"Inter"',
          }}
        >
          TEXAVOR
        </div>
      </div>

      {/* Decorative Element Top Right (White Circle Arrow) */}
      <div
        style={{
          position: "absolute",
          top: 48,
          right: 48,
          width: 80,
          height: 80,
          backgroundColor: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#104127"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 5H19V11" />
          <path d="M19 5L5 19" />
        </svg>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Poppins",
          data: poppinsBlack,
          style: "normal",
          weight: 900,
        },
        {
          name: "Inter",
          data: interMedium,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
