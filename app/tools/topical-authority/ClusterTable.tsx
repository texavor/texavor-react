"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Copy, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KeywordData {
  term: string;
  volume: number;
  intent: string;
  difficulty: string;
}

interface ClusterData {
  name: string;
  count: number;
  total_volume: number;
  keywords: KeywordData[];
}

interface ClusterTableProps {
  cluster: ClusterData;
}

export default function ClusterTable({ cluster }: ClusterTableProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Keyword copied!");
  };

  const getIntentColor = (intent: string) => {
    switch (intent.toLowerCase()) {
      case "informational":
        return "bg-blue-100/50 text-blue-700 border-blue-200/50";
      case "commercial":
        return "bg-emerald-100/50 text-emerald-700 border-emerald-200/50";
      case "transactional":
        return "bg-purple-100/50 text-purple-700 border-purple-200/50";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "hard":
        return "text-red-500 font-bold";
      case "medium":
        return "text-yellow-500 font-bold";
      case "easy":
        return "text-green-500 font-bold";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-card border border-border shadow-none rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40">
      <div className="p-4 bg-muted/30 border-b border-border flex justify-between items-center">
        <h3 className="font-poppins font-semibold text-lg text-foreground flex items-center gap-2">
          {cluster.name}
          <Badge
            variant="outline"
            className="ml-2 bg-background border-border text-muted-foreground font-inter shadow-none"
          >
            {cluster.count} Keywords
          </Badge>
        </h3>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Total Vol:{" "}
          <span className="font-mono font-medium text-foreground">
            {cluster.total_volume.toLocaleString()}
          </span>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="w-[40%] text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Keyword
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Intent
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Difficulty
            </TableHead>
            <TableHead className="text-right text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
              Volume
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cluster.keywords.map((kw, i) => (
            <TableRow
              key={i}
              className="group hover:bg-muted/50 border-b border-border"
            >
              <TableCell className="font-medium text-sm text-foreground">
                {kw.term}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-md pointer-events-none shadow-none text-xs font-semibold uppercase tracking-wide",
                    getIntentColor(kw.intent),
                  )}
                >
                  {kw.intent}
                </Badge>
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "text-xs uppercase tracking-wider",
                    getDifficultyColor(kw.difficulty),
                  )}
                >
                  {kw.difficulty}
                </span>
              </TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">
                {kw.volume.toLocaleString()}
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(kw.term)}
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Keyword</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
