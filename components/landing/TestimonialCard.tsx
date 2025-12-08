import { Card } from "@/components/ui/card";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  image: string;
  quote: string;
  metrics?: string;
  className?: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  image,
  quote,
  metrics,
  className = "",
}: TestimonialCardProps) {
  return (
    <Card
      className={`p-6 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 rounded-2xl border border-border/50 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <p className="text-foreground leading-relaxed font-inter italic">
          &ldquo;{quote}&rdquo;
        </p>
        {metrics && (
          <div className="bg-[var(--green-light)] rounded-lg px-3 py-2">
            <p className="text-sm font-semibold text-[var(--green-primary)]">
              📈 {metrics}
            </p>
          </div>
        )}
        <div className="flex items-center gap-3 mt-2">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground font-poppins">{name}</p>
            <p className="text-sm text-muted-foreground font-inter">
              {role}
              {company && ` at ${company}`}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

