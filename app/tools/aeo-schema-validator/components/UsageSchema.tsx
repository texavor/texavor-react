import React from "react";

const UsageSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Texavor AEO Schema Validator",
    applicationCategory: "SEOApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Validate your Schema Markup for Answer Engine Optimization (AEO) and AI Search readiness.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default UsageSchema;
