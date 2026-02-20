import Image from "next/image";

export default function Integration() {
  const integrations = [
    { name: "WordPress", image: "/integration/wordpress.png" },
    { name: "Webflow", image: "/integration/webflow.png" },
    { name: "Shopify", image: "/integration/shopify.png" },
    { name: "Medium", image: "/integration/medium.png" },
    { name: "Hashnode", image: "/integration/hashnode.png" },
    { name: "Substack", image: "/integration/substack.png" },
    { name: "Dev.to", image: "/integration/devto.png" },
    { name: "Webhook", image: "/integration/webhook.png" },
  ];

  return (
    <section
      id="integrations"
      className="w-full py-24 md:py-32 bg-background tx-dot-bg border-y border-border relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent" />
            <p className="text-[11px] font-inter font-bold tracking-widest uppercase text-muted-foreground">
              INTEGRATIONS & ECOSYSTEM
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-6 tracking-tight leading-tight">
            Publish Everywhere,
            <br className="hidden md:block" />
            Manage From One Place
          </h2>
          <p className="text-lg font-inter text-muted-foreground max-w-2xl leading-relaxed">
            Seamlessly manage and schedule your articles across all major
            platforms from a single dashboard. Stop copy-pasting.
          </p>
        </div>

        {/* Bento Grid Layout - 1px borders, grayscale logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 bg-background/50 backdrop-blur-sm shadow-tx-sm rounded-xl border border-border overflow-hidden">
          {integrations.map((integration, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 flex flex-col items-center justify-center gap-5 group hover:bg-muted/80 transition-colors bg-card/80 border-r border-b border-border
                ${(i + 1) % 4 === 0 ? "md:border-r-0" : ""}
                ${(i + 1) % 2 === 0 ? "border-r-0 md:border-r" : ""}
                ${i >= 4 ? "md:border-b-0" : ""}
                ${i >= 6 ? "border-b-0" : ""}
              `}
            >
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image
                  src={integration.image}
                  alt={integration.name}
                  width={48}
                  height={48}
                  className={`w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ${
                    integration.name === "Medium"
                      ? "dark:invert dark:group-hover:brightness-200"
                      : "dark:group-hover:brightness-110"
                  }`}
                />
              </div>
              <span className="font-inter text-sm font-semibold text-muted-foreground/60 group-hover:text-foreground transition-colors">
                {integration.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
