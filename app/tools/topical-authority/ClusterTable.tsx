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
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100/80";
      case "commercial":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:bg-emerald-100/80";
      case "transactional":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-100/80";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300";
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
    <div className="rounded-xl overflow-hidden bg-primary/5 dark:bg-zinc-900 shadow-lg shadow-green-900/5 border-none ring-1 ring-border/50">
      <div className="p-4 bg-slate-100/80 dark:bg-zinc-800/50 border-b border-border/20 flex justify-between items-center">
        <h3 className="font-poppins font-semibold text-lg flex items-center gap-2">
          {cluster.name}
          <Badge variant="outline" className="ml-2 bg-white dark:bg-zinc-800">
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
        <TableHeader className="bg-slate-100/80 dark:bg-zinc-800/50">
          <TableRow className="bg-primary hover:bg-primary border-b border-border/10">
            <TableHead className="w-[40%] text-xs uppercase tracking-wider font-semibold text-black font-bold">
              Keyword
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold text-black font-bold">
              Intent
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold text-black font-bold">
              Difficulty
            </TableHead>
            <TableHead className="text-right text-xs uppercase tracking-wider font-semibold text-black font-bold">
              Volume
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cluster.keywords.map((kw, i) => (
            <TableRow
              key={i}
              className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/50"
            >
              <TableCell className="font-medium text-base">{kw.term}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "rounded-md pointer-events-none shadow-none border-none",
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
