import { useQuery } from "@tanstack/react-query";
import { fetchPlatformStats } from "@/lib/api/public-stats";

export const usePlatformStats = () => {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: fetchPlatformStats,
    // Matches server-side cache TTL of 1 hour
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
