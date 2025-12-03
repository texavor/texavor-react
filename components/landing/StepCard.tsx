import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StepCardProps {
  stepNumber: number;
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function StepCard({
  stepNumber,
  icon,
  title,
  description,
  className = "",
}: StepCardProps) {
  return (
    <Card
      className={`p-8 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 rounded-2xl border border-border/50 relative ${className}`}
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[var(--green-primary)] text-white flex items-center justify-center text-xl font-bold shadow-lg">
        {stepNumber}
      </div>
      <div className="flex flex-col gap-4 mt-2">
        <div className="text-[var(--green-primary)] w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground font-poppins">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed font-inter">
          {description}
        </p>
      </div>
    </Card>
  );
}

