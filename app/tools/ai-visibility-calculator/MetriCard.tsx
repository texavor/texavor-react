import React from "react";
import { MoveUpRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string | React.ReactNode;
  value: string | number;
  subtext?: string | React.ReactNode;
  type?: "primary" | "secondary";
  className?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
}

const MetricCard = ({
  label,
  value,
  subtext,
  type = "secondary",
  className,
  labelClassName,
  icon,
}: MetricCardProps) => {
  const isPrimary = type === "primary";

  return (
    <div
      className={cn(
        "rounded-lg p-6 relative overflow-hidden transition-all duration-300 border group bg-card",
        isPrimary
          ? "border-accent/30 shadow-[0_0_15px_rgba(251,191,36,0.05)]"
          : "border-border shadow-none hover:border-primary/40 text-foreground",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <h3
            className={cn(
              "text-lg font-medium flex items-center gap-2 font-poppins",
              isPrimary ? "text-foreground" : "text-muted-foreground",
              labelClassName,
            )}
          >
            {icon && (
              <span
                className={cn(
                  "p-1.5 rounded-md flex items-center justify-center",
                  isPrimary
                    ? "bg-accent/10 text-accent"
                    : "bg-primary/10 text-primary",
                )}
              >
                {icon}
              </span>
            )}
            {label}
          </h3>
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 border",
              isPrimary
                ? "border-transparent bg-accent/10 text-accent group-hover:border-accent"
                : "border-border bg-background text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground",
            )}
          >
            <MoveUpRight className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div
            className={cn(
              "text-5xl font-bold tracking-tight mb-2 font-inter text-foreground break-words hyphens-auto",
            )}
          >
            {value}
          </div>
          {subtext && (
            <div
              className={cn(
                "text-sm font-medium flex items-center gap-1.5 font-inter",
                isPrimary
                  ? "text-muted-foreground"
                  : "text-muted-foreground/80",
              )}
            >
              <Info className="w-4 h-4" />
              {subtext}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
