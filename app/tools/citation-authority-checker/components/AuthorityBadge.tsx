import { cn } from "@/lib/utils";

interface AuthorityBadgeProps {
  tier: "high" | "medium" | "low";
  label?: string;
}

export default function AuthorityBadge({ tier, label }: AuthorityBadgeProps) {
  const colors = {
    high: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medium:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const icons = {
    high: "🟢",
    medium: "🟡",
    low: "🔴",
  };

  const defaultLabels = {
    high: "High Authority",
    medium: "Medium",
    low: "Low",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-semibold rounded inline-flex items-center gap-1",
        colors[tier],
      )}
    >
      <span>{icons[tier]}</span>
      <span>{label || defaultLabels[tier]}</span>
    </span>
  );
}
