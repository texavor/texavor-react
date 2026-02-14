import { generateOgImage, size, contentType } from "@/lib/og-generator";

export const runtime = "nodejs";
export { size, contentType };

export const alt = "Texavor - AI Search Optimization";

export default async function Image() {
  return generateOgImage({
    title: "Texavor",
    description: "Optimize for AI Search (GEO) & ChatGPT",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4ade80" // green-400
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  });
}
