"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface SchemaJsonViewerProps {
  schemas: any[];
}

// Dracula theme colors
const draculaColors = {
  background: "#282a36",
  foreground: "#f8f8f2",
  comment: "#6272a4",
  cyan: "#8be9fd",
  green: "#50fa7b",
  orange: "#ffb86c",
  pink: "#ff79c6",
  purple: "#bd93f9",
  red: "#ff5555",
  yellow: "#f1fa8c",
};

function syntaxHighlight(json: string) {
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = draculaColors.purple; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = draculaColors.green; // key
          return `<span style="color: ${cls}; font-style: italic;">${match}</span>`;
        } else {
          cls = draculaColors.yellow; // string
          return `<span style="color: ${cls}">${match}</span>`;
        }
      } else if (/true|false/.test(match)) {
        cls = draculaColors.pink; // boolean
        return `<span style="color: ${cls}; font-weight: bold;">${match}</span>`;
      } else if (/null/.test(match)) {
        cls = draculaColors.purple; // null
        return `<span style="color: ${cls}; font-weight: bold;">${match}</span>`;
      }
      return `<span style="color: ${cls}">${match}</span>`; // number
    },
  );
}

export default function SchemaJsonViewer({ schemas }: SchemaJsonViewerProps) {
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!schemas || schemas.length === 0) return null;

  const currentSchema = schemas[currentIndex];
  const jsonString = JSON.stringify(currentSchema, null, 2);
  const highlighted = syntaxHighlight(jsonString);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    toast.success("Schema copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? schemas.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === schemas.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card className="bg-secondary shadow-none border-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-foreground font-poppins">
              Raw Schema Markup
            </h3>
            {schemas.length > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} / {schemas.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        <pre
          className="rounded-lg overflow-x-auto text-sm border border-border/50 p-5"
          style={{
            background: draculaColors.background,
            color: draculaColors.foreground,
            fontFamily: "monospace",
            lineHeight: "1.6",
          }}
        >
          <code
            dangerouslySetInnerHTML={{ __html: highlighted }}
            style={{ fontSize: "0.875rem" }}
          />
        </pre>
      </CardContent>
    </Card>
  );
}
