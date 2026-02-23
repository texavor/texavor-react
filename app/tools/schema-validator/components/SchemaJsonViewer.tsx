"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronLeft, ChevronRight, FileCode } from "lucide-react";
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
    <Card className="border-border shadow-none bg-card overflow-hidden rounded-lg">
      <CardHeader className="border-b border-border py-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <span className="font-mono text-sm font-semibold text-foreground">
            Raw Schema Markup
          </span>
          {schemas.length > 1 && (
            <span className="text-xs text-muted-foreground ml-2 bg-background border border-border px-2 py-0.5 rounded-full">
              {currentIndex + 1} of {schemas.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {schemas.length > 1 && (
            <div className="flex items-center gap-1 mr-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-background border border-border"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-background border border-border"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCopy}
            className="h-8 gap-2 transition-all"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span className="text-xs">Copy JSON</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative group">
        <div className="max-h-[500px] overflow-auto custom-scrollbar bg-[#0d1117]">
          <pre className="p-4 text-xs md:text-sm font-mono leading-relaxed text-gray-300">
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
