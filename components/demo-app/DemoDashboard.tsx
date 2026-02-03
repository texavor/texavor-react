"use client";

import { useState } from "react";
import { DemoSidebar } from "./DemoSidebar";
import DemoChart from "./DemoChart";
import { Bell, Search, PenTool, Sparkles, Settings } from "lucide-react";

export function DemoDashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DemoChart />;
      case "article":
        return (
          <PlaceholderView
            title="Article Writer"
            icon={<PenTool className="w-12 h-12 text-[#104127]" />}
            description="Draft, edit, and optimize your SEO content."
          />
        );
      case "keyword-discovery":
        return (
          <PlaceholderView
            title="Keyword Discovery"
            icon={<Sparkles className="w-12 h-12 text-[#104127]" />}
            description="Find high-opportunity keywords for your niche."
          />
        );
      case "settings":
        return (
          <PlaceholderView
            title="Settings"
            icon={<Settings className="w-12 h-12 text-[#104127]" />}
            description="Manage your team and preferences."
          />
        );
      default:
        // Default fallback for other mock pages
        return (
          <PlaceholderView
            title={activeView
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
            icon={<div className="w-12 h-12 rounded-full bg-gray-200" />}
            description="This feature is available in the full app."
          />
        );
    }
  };

  return (
    <div className="flex h-full w-full bg-[#fcfcfc] font-inter text-gray-900">
      {/* Sidebar */}
      <div className="h-full shrink-0 z-20 shadow-sm relative">
        <DemoSidebar activeView={activeView} onNavigate={setActiveView} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mock Header */}
        <header className="h-16 shrink-0 border-b border-gray-100 bg-white flex items-center justify-between px-6 z-10">
          <h1 className="text-lg font-semibold text-gray-800 capitalize">
            {activeView.replace("-", " ")}
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                disabled
                className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none cursor-default"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-500 relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto bg-gray-50/50 relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function PlaceholderView({
  title,
  icon,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-6 p-6 bg-white rounded-full shadow-sm border border-gray-100">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md">{description}</p>
      <div className="mt-8 px-4 py-2 bg-[#104127] text-white rounded-md text-sm font-medium opacity-50 cursor-not-allowed">
        Demo Mode Only
      </div>
    </div>
  );
}
