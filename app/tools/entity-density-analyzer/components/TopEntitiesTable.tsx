import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Hash } from "lucide-react";

interface TopEntity {
  name: string;
  type: string;
  mentions: number;
  salience: number;
  first_mention_position: string;
  in_title: boolean;
  in_headings: boolean;
}

interface TopEntitiesTableProps {
  entities: TopEntity[];
}

export default function TopEntitiesTable({ entities }: TopEntitiesTableProps) {
  const getTypeColor = (type: string) => {
    const colors = {
      organization: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
      },
      person: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-300",
        border: "border-green-200 dark:border-green-800",
      },
      product: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-700 dark:text-orange-300",
        border: "border-orange-200 dark:border-orange-800",
      },
      location: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-300",
        border: "border-red-200 dark:border-red-800",
      },
    };
    return (
      colors[type as keyof typeof colors] || {
        bg: "bg-gray-100 dark:bg-gray-900/30",
        text: "text-gray-700 dark:text-gray-300",
        border: "border-gray-200 dark:border-gray-800",
      }
    );
  };

  const getSalienceBarColor = (salience: number) => {
    if (salience > 0.7) return "bg-green-500";
    if (salience > 0.4) return "bg-yellow-500";
    return "bg-gray-400";
  };

  return (
    <Card className="bg-card shadow-none border border-border rounded-xl">
      <CardHeader className="pb-3 border-b border-border/30">
        <h3 className="text-lg font-medium text-foreground font-poppins flex items-center gap-2">
          <span className="p-1.5 rounded-md flex items-center justify-center bg-accent/10 text-accent">
            <Hash className="w-5 h-5 text-current" />
          </span>
          Top Entities
        </h3>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mentions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Salience
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Signals
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {entities.map((entity, idx) => {
                const typeColors = getTypeColor(entity.type);
                return (
                  <tr
                    key={idx}
                    className="hover:bg-primary/5 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <td className="px-4 py-4 font-medium text-foreground">
                      {entity.name}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2.5 py-1 ${typeColors.bg} ${typeColors.text} ${typeColors.border} text-xs font-semibold rounded-md border`}
                      >
                        {entity.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Hash className="w-3 h-3 text-muted-foreground" />
                        <span className="font-bold text-foreground">
                          {entity.mentions}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 flex-1">
                          <div
                            className={`h-2 rounded-full ${getSalienceBarColor(entity.salience)}`}
                            style={{ width: `${entity.salience * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground min-w-[3rem] text-right">
                          {(entity.salience * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {entity.in_title && (
                          <span
                            title="In title"
                            className="text-indigo-600 dark:text-indigo-400"
                          >
                            <FileText className="w-4 h-4" />
                          </span>
                        )}
                        {entity.in_headings && (
                          <span
                            title="In headings"
                            className="text-purple-600 dark:text-purple-400"
                          >
                            📌
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
