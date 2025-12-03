import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  visual?: ReactNode;
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  visual,
  className = "",
}: FeatureCardProps) {
  return (
    <Card
      className={`p-8 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] rounded-2xl border border-border/50 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="text-[var(--green-primary)] w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground font-poppins">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed font-inter">
          {description}
        </p>
        {visual && (
          <div className="mt-6 rounded-xl overflow-hidden border border-border/50 shadow-sm">
            {visual}
          </div>
        )}
      </div>
    </Card>
  );
}
