import { axiosInstance } from "@/lib/axiosInstance";

export interface PlatformStats {
  articles_created: number;
  articles_analyzed: number;
  words_processed: number;
  reading_minutes_generated: number;
  outlines_generated: number;
  keywords_discovered: number;
  competitor_analyses_run: number;
  ai_visibility_scans: number;
  public_tool_uses: number;
  countries_reached: number;
  avg_content_score: number;
  avg_readability_score: number;
  cached_at: string;
  cache_ttl_seconds: number;
}

export const fetchPlatformStats = async (): Promise<PlatformStats> => {
  const { data } = await axiosInstance.get<PlatformStats>(
    "/api/v1/public/stats",
  );
  return data;
};
