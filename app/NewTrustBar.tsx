"use client";

export default function NewTrustBar() {
  const stats = [
    { value: "10,000+", label: "Active Writers", sublabel: "This month" },
    { value: "250,000+", label: "Articles Created", sublabel: "Since launch" },
    { value: "4.9/5", label: "User Rating", sublabel: "From 2,500+ reviews" },
    { value: "< 30 sec", label: "Content Generation", sublabel: "Average time" },
  ];

  const logos = [
    { name: "TechCorp", color: "bg-blue-500" },
    { name: "GrowthLabs", color: "bg-purple-500" },
    { name: "DigitalBoost", color: "bg-green-500" },
    { name: "InnovateTech", color: "bg-orange-500" },
    { name: "ContentPro", color: "bg-red-500" },
    { name: "WriteSmart", color: "bg-indigo-500" },
  ];

  return (
    <section className="w-full py-12 border-y border-border/50 bg-white/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-center text-sm text-muted-foreground mb-8 font-inter">
          Trusted by content creators worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-3xl md:text-4xl font-bold text-[var(--green-primary)] font-poppins">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-foreground mt-1 font-inter">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-inter">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="border-t border-border/30 pt-8">
          <p className="text-center text-sm text-muted-foreground mb-6 font-inter">
            Join thousands of companies already using Texavor
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {logos.map((logo, index) => (
              <div
                key={index}
                className={`w-12 h-12 ${logo.color} rounded-lg flex items-center justify-center text-white font-bold text-sm animate-fade-in`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {logo.name.charAt(0)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

