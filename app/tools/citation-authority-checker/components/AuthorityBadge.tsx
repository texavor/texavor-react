import { cn } from "@/lib/utils";

interface AuthorityBadgeProps {
  tier: "high" | "medium" | "low";
  label?: string;
}

export default function AuthorityBadge({ tier, label }: AuthorityBadgeProps) {
  const styles = {
    high: "border-emerald-500/20 text-emerald-700 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/10",
    medium:
      "border-amber-500/20 text-amber-700 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/10",
    low: "border-rose-500/20 text-rose-700 bg-rose-500/10 dark:text-rose-400 dark:bg-rose-500/10",
  };

  const dots = {
    high: "bg-emerald-500",
    medium: "bg-amber-500",
    low: "bg-rose-500",
  };

  const defaultLabels = {
    high: "High Authority",
    medium: "Medium",
    low: "Low",
  };

  return (
    <span
      className={cn(
        "px-2.5 py-1 text-xs font-semibold rounded-md border inline-flex items-center gap-2",
        styles[tier],
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dots[tier])} />
      <span>{label || defaultLabels[tier]}</span>
    </span>
  );
}
