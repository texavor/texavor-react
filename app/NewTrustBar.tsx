"use client";

export default function NewTrustBar() {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Articles Generated" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <section className="w-full py-12 border-y border-border/50 bg-white/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-center text-sm text-muted-foreground mb-8 font-inter">
          Trusted by content creators worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-3xl md:text-4xl font-bold text-[var(--green-primary)] font-poppins">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-inter">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

