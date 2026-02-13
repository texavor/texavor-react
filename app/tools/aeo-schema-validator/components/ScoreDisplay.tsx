import React from "react";
import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
  grade?: string;
  type?: "primary" | "secondary";
  className?: string;
}

const ScoreDisplay = ({
  score,
  grade: providedGrade,
  type = "secondary",
  className,
}: ScoreDisplayProps) => {
  const isPrimary = type === "primary";

  // Calculate grade from score if not provided
  let grade = providedGrade;
  if (!grade) {
    if (score >= 90) grade = "A";
    else if (score >= 80) grade = "B";
    else if (score >= 70) grade = "C";
    else if (score >= 60) grade = "D";
    else grade = "F";
  }

  // Determine color based on score
  let color = "text-red-500";
  let strokeColor = "#ef4444";

  if (score >= 80) {
    color = isPrimary ? "text-emerald-300" : "text-emerald-500";
    strokeColor = "#10b981";
  } else if (score >= 50) {
    color = isPrimary ? "text-yellow-300" : "text-yellow-500";
    strokeColor = "#eab308";
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl relative overflow-hidden transition-all duration-300",
        isPrimary
          ? "bg-[#104127] text-white shadow-lg border-none"
          : "bg-primary/5 dark:bg-zinc-900 border border-border/50",
        className,
      )}
    >
      {/* Dynamic Background for Primary */}
      {isPrimary && (
        <div
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 10% 90%, #1a5d3a 0%, transparent 60%), linear-gradient(to top right, #104127 0%, #0d3520 100%)",
          }}
        />
      )}

      <div className="relative w-40 h-40 flex items-center justify-center z-10">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className={
              isPrimary ? "text-white/10" : "text-gray-200 dark:text-gray-800"
            }
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "text-4xl font-bold font-poppins",
              isPrimary ? "text-white" : color,
            )}
          >
            {score}
          </span>
          <span
            className={cn(
              "text-sm font-medium uppercase tracking-wider",
              isPrimary ? "text-emerald-100/80" : "text-muted-foreground",
            )}
          >
            Score
          </span>
        </div>
      </div>

      <div className="mt-4 text-center z-10">
        <div
          className={cn(
            "text-sm mb-1",
            isPrimary ? "text-emerald-100/80" : "text-muted-foreground",
          )}
        >
          Grade
        </div>
        <div
          className={cn(
            "text-5xl font-bold font-poppins",
            isPrimary ? "text-white" : color,
          )}
        >
          {grade}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
