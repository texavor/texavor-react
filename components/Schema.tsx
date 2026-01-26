import React from "react";

interface SchemaProps {
  script: Record<string, any>;
}

const Schema: React.FC<SchemaProps> = ({ script }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(script) }}
    />
  );
};

export default Schema;
