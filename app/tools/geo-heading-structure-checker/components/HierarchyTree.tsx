import { Card, CardContent } from "@/components/ui/card";

interface HierarchyNode {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
}

interface HierarchyTreeProps {
  nodes: HierarchyNode[];
}

export default function HierarchyTree({ nodes }: HierarchyTreeProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <Card className="bg-card shadow-none border border-border rounded-xl">
        <CardContent className="p-8 text-center text-muted-foreground">
          No heading structure detected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium flex items-center gap-2 font-poppins text-foreground mb-4">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" x2="12" y1="22.08" y2="12" />
            </svg>
          </span>
          Heading Hierarchy
        </h3>
        <div className="space-y-0">
          {nodes.map((node, index) => {
            // Calculate level from tag (h1 = 0, h2 = 1, h3 = 2, etc.)
            const level = parseInt(node.tag.substring(1)) - 1;

            return (
              <div
                key={index}
                className="flex items-start py-3 border-b border-border/30 last:border-b-0"
                style={{ paddingLeft: `${level * 1.5}rem` }}
              >
                <span className="px-2 py-0.5 text-xs font-bold bg-primary/10 text-primary rounded mr-3 uppercase w-12 text-center flex-shrink-0">
                  {node.tag}
                </span>
                <span
                  className={`text-gray-700 dark:text-gray-300 break-words ${
                    node.tag === "h1" ? "font-bold text-lg" : "text-sm"
                  }`}
                >
                  {node.text}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
