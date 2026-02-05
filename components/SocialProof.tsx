"use client";

export default function SocialProof() {
  const stats = [
    {
      value: "10,000+",
      label: "Verified Authors",
      sublabel: "Building authority",
    },
    {
      value: "250,000+",
      label: "Articles Orchestrated",
      sublabel: "Across 5+ platforms",
    },
    {
      value: "4.9/5",
      label: "Editorial Rating",
      sublabel: "From technical teams",
    },
    {
      value: "< 30 sec",
      label: "Platform Sync",
      sublabel: "Dev.to, Medium, Hashnode",
    },
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
    <section className="w-full py-16 border-y border-border/40 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-center text-sm font-semibold text-muted-foreground mb-10 font-inter uppercase tracking-wider">
          Trusted by high-growth technical teams
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 divide-x divide-border/40 dark:divide-white/10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center px-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-4xl md:text-5xl font-bold text-primary dark:text-emerald-400 font-poppins mb-2">
                {stat.value}
              </p>
              <p className="text-sm font-bold text-foreground dark:text-white font-inter">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-inter">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="pt-8 border-t border-border/40 dark:border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simplified Logo Placeholders */}
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-2 group cursor-default"
              >
                <div
                  className={`w-8 h-8 ${logo.color} rounded-md flex items-center justify-center text-white font-bold text-xs`}
                >
                  {logo.name.charAt(0)}
                </div>
                <span className="font-bold text-lg font-poppins text-gray-800 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
