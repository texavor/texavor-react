import React from "react";
import { X, Check } from "lucide-react";

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-3xl border-none shadow-none bg-white dark:bg-zinc-950">
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            <th className="p-6 md:p-8 text-lg font-bold text-primary dark:text-white w-1/4">
              Feature Category
            </th>
            <th className="p-6 md:p-8 bg-emerald-50 dark:bg-emerald-950/20 border-x border-emerald-100 dark:border-emerald-900/50 w-1/4 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <span className="text-2xl font-bold text-primary dark:text-emerald-400 block mb-1">
                Texavor
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700/70 dark:text-emerald-500/70">
                The Content OS
              </span>
            </th>
            <th className="p-6 md:p-8 text-lg font-semibold text-zinc-700 dark:text-zinc-300 w-1/4">
              RankPill
              <span className="block text-xs font-normal text-zinc-500 mt-1">
                Mass Generators
              </span>
            </th>
            <th className="p-6 md:p-8 text-lg font-semibold text-zinc-700 dark:text-zinc-300 w-1/4">
              Jasper / Copy.ai
              <span className="block text-xs font-normal text-zinc-500 mt-1">
                AI Writers
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          <tr>
            <td className="p-6 md:p-8 font-medium text-primary dark:text-zinc-200">
              Primary Goal
            </td>
            <td className="p-6 md:p-8 bg-emerald-50/50 dark:bg-emerald-950/10 border-x border-emerald-100 dark:border-emerald-900/30 font-bold text-primary dark:text-emerald-300">
              Lifecycle Management
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              Automated SEO Content
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              Content Generation
            </td>
          </tr>
          <tr>
            <td className="p-6 md:p-8 font-medium text-primary dark:text-zinc-200">
              Target Audience
            </td>
            <td className="p-6 md:p-8 bg-emerald-50/50 dark:bg-emerald-950/10 border-x border-emerald-100 dark:border-emerald-900/30 font-bold text-primary dark:text-emerald-300">
              Marketers, Writers, Small Biz
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              Beginners, Small Biz
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              General Marketers
            </td>
          </tr>
          <tr>
            <td className="p-6 md:p-8 font-medium text-primary dark:text-zinc-200">
              Publishing
            </td>
            <td className="p-6 md:p-8 bg-emerald-50/50 dark:bg-emerald-950/10 border-x border-emerald-100 dark:border-emerald-900/30 font-bold text-primary dark:text-emerald-300">
              Multi-Platform Sync
              <span className="block text-xs font-normal mt-1 opacity-80">
                Dev.to, Medium, Shopify...
              </span>
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              CMS Only
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              Manual Copy-Paste
            </td>
          </tr>
          <tr>
            <td className="p-6 md:p-8 font-medium text-primary dark:text-zinc-200">
              Maintenance
            </td>
            <td className="p-6 md:p-8 bg-emerald-50/50 dark:bg-emerald-950/10 border-x border-emerald-100 dark:border-emerald-900/30 font-bold text-primary dark:text-emerald-300">
              Freshness Score (Decay)
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              <X className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
            </td>
          </tr>
          <tr>
            <td className="p-6 md:p-8 font-medium text-primary dark:text-zinc-200">
              Research
            </td>
            <td className="p-6 md:p-8 bg-emerald-50/50 dark:bg-emerald-950/10 border-x border-emerald-100 dark:border-emerald-900/30 font-bold text-primary dark:text-emerald-300">
              Live Web Agent
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              Basic Keywords
            </td>
            <td className="p-6 md:p-8 text-zinc-600 dark:text-zinc-400">
              Training Data
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
