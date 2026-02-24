import { fetchPlatformStats } from "@/lib/api/public-stats";
import PlatformStatsStripClient from "./PlatformStatsStripClient";

export default async function PlatformStatsStrip() {
  let stats = null;

  try {
    stats = await fetchPlatformStats();
  } catch (error) {
    console.error("Failed to fetch platform stats directly on server:", error);
  }

  return <PlatformStatsStripClient stats={stats} />;
}
