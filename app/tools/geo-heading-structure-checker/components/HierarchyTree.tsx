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
      <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50">
        <CardContent className="p-8 text-center text-muted-foreground">
          No heading structure detected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-primary/5 dark:bg-zinc-900 border border-border/50">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground font-poppins">
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
